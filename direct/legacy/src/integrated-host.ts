/** Mount the direct backend as internal child services of the unified plugin. */
import type { Context } from '@deepseek-ai/cordis'
import * as auth from './index.ts'
import * as search from './search.ts'
import * as image from './image.ts'
import * as video from './video.ts'
import type { PluginConfig } from '../../../src/common/types.ts'
import { createIntegratedNetwork } from './integrated-network.ts'

type DirectSettings = Pick<PluginConfig, 'directSearch' | 'directImage' | 'directVideo' | 'directProxyUrl'>
type Watch = (listener: () => void) => () => void

/** Called only after the user enabled the experimental backend and restarted. */
export async function mountDirectBackend(ctx: Context, getConfig: () => DirectSettings, watch: Watch, makeNetwork = createIntegratedNetwork): Promise<void> {
  const network = makeNetwork(() => getConfig().directProxyUrl)
  ctx.effect(() => () => network.close())
  const authFiber = ctx.plugin({ name: auth.name, inject: auth.inject, apply: (child: Context) => auth.apply(child, network) })
  ctx.plugin({ name: search.name, inject: search.inject, apply: (child: Context) => search.apply(child, {
    enabled: { get: () => getConfig().directSearch } as search.Config['enabled'],
    model: search.ANTIGRAVITY_SEARCH_MODEL,
    maxResults: 10,
  }, watch, network.transport) })
  ctx.plugin({ name: image.name, inject: image.inject, apply: (child: Context) => image.apply(child, {
    enabled: { get: () => getConfig().directImage } as image.Config['enabled'],
    model: image.ANTIGRAVITY_IMAGE_MODEL,
    n: 1,
  }, watch, network.transport) })
  ctx.plugin({ name: video.name, inject: video.inject, apply: (child: Context) => video.apply(child, {
    enabled: { get: () => getConfig().directVideo } as video.Config['enabled'],
    model: video.ANTIGRAVITY_VIDEO_MODEL,
    maxBytes: 32 * 1024 * 1024,
  }, watch, network.transport) })
  await authFiber
}
