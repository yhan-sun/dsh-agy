import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { Context } from '@deepseek-ai/cordis'
import { mountDirectBackend } from '../direct/legacy/src/integrated-host.ts'
import { createAuthStore } from '../direct/legacy/src/auth-store.ts'
import { defaultConfig } from '../src/common/types.ts'

test('direct backend mounts in isolation without an account or network traffic', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'dsh-agy-direct-'))
  const previousHome = process.env.DSH_HOME
  const originalFetch = globalThis.fetch
  process.env.DSH_HOME = dir
  let requests = 0
  globalThis.fetch = (async () => { requests++; throw new Error('Unexpected network request') }) as typeof fetch
  const makeNetwork: typeof import('../direct/legacy/src/integrated-network.ts').createIntegratedNetwork = () => ({
    transport: { request: async () => { requests++; throw new Error('Unexpected private request') } },
    fetchImpl: async () => { requests++; throw new Error('Unexpected OAuth request') },
    close: async () => {},
  })
  const ctx = new Context()
  let registrations = 0
  const unprovide = [
    ctx.provide('llm', { listProviders: () => [], registerAdapter: () => { registrations++; return () => {} } }),
    ctx.provide('attachments', {}),
    ctx.provide('commands', { register: () => () => {} }),
    ctx.provide('connection', { fetch: { register: () => () => {} } }),
    ctx.provide('webServer', { host: '127.0.0.1' }),
  ]
  try {
    await Promise.race([
      mountDirectBackend(ctx, defaultConfig, () => () => {}, makeNetwork),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('direct backend did not mount')), 3000)),
    ])
    await new Promise<void>((resolve) => setTimeout(resolve, 30))
    assert.ok(ctx.get('antigravityAuth'), 'direct auth is available to child services')
    assert.equal(registrations, 0, 'no provider is registered without a direct login')
    assert.equal(requests, 0, 'mounting must not use a Google account or contact the network')
  } finally {
    await ctx.fiber.dispose()
    for (const dispose of unprovide.reverse()) await dispose()
    globalThis.fetch = originalFetch
    if (previousHome === undefined) delete process.env.DSH_HOME
    else process.env.DSH_HOME = previousHome
    await rm(dir, { recursive: true, force: true })
  }
})

test('direct capabilities stay off until selected and unregister when turned off', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'dsh-agy-direct-capabilities-'))
  const previousHome = process.env.DSH_HOME
  const originalFetch = globalThis.fetch
  process.env.DSH_HOME = dir
  let requests = 0
  globalThis.fetch = (async () => { requests++; throw new Error('Unexpected network request') }) as typeof fetch
  const makeNetwork: typeof import('../direct/legacy/src/integrated-network.ts').createIntegratedNetwork = () => ({
    transport: { request: async () => { requests++; throw new Error('Unexpected private request') } },
    fetchImpl: async () => { requests++; throw new Error('Unexpected OAuth request') },
    close: async () => {},
  })
  await createAuthStore(join(dir, 'agy-link', 'direct', 'auth.json')).commit({ refreshToken: 'fixture-refresh', projectId: 'fixture-project' })
  const ctx = new Context()
  const listeners = new Set<() => void>()
  const cfg = defaultConfig()
  let providers = 0
  let searches = 0
  let removed = 0
  const tools = new Set<string>()
  const unprovide = [
    ctx.provide('llm', { listProviders: () => [], registerAdapter: () => { providers++; return () => {} } }),
    ctx.provide('attachments', {}),
    ctx.provide('commands', { register: () => () => {} }),
    ctx.provide('web', { registerSearchProvider: () => { searches++; return () => { removed++ } } }),
    ctx.provide('fs', {}),
    ctx.provide('tools', { register: (tool: { name: string }) => { tools.add(tool.name); return () => { tools.delete(tool.name) } } }),
  ]
  try {
    await mountDirectBackend(ctx, () => cfg, listener => { listeners.add(listener); return () => { listeners.delete(listener) } }, makeNetwork)
    const waitFor = async (predicate: () => boolean) => {
      for (let i = 0; i < 100 && !predicate(); i++) await new Promise<void>(resolve => setTimeout(resolve, 10))
      assert.ok(predicate(), 'expected registration change did not occur')
    }
    await waitFor(() => providers === 1 && listeners.size >= 3)
    assert.equal(searches, 0, 'search starts disabled')
    assert.equal(tools.size, 0, 'image and video tools start disabled')
    cfg.directSearch = true
    for (const listener of listeners) listener()
    await waitFor(() => searches === 1)
    cfg.directSearch = false
    for (const listener of listeners) listener()
    await waitFor(() => removed === 1)
    cfg.directImage = true
    cfg.directVideo = true
    for (const listener of listeners) listener()
    await waitFor(() => tools.has('generate_image') && tools.has('list_images') && tools.has('analyze_video'))
    cfg.directImage = false
    cfg.directVideo = false
    for (const listener of listeners) listener()
    await waitFor(() => tools.size === 0)
    assert.equal(requests, 0)
  } finally {
    await ctx.fiber.dispose()
    for (const dispose of unprovide.reverse()) await dispose()
    globalThis.fetch = originalFetch
    if (previousHome === undefined) delete process.env.DSH_HOME
    else process.env.DSH_HOME = previousHome
    await rm(dir, { recursive: true, force: true })
  }
})
