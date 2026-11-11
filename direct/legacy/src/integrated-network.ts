import { Agent, ProxyAgent, fetch as undiciFetch } from 'undici'
import { validDirectProxy } from '../../../src/common/direct-proxy.ts'
import { createPrivateTransport } from './private-transport.ts'

/** Per-backend networking: no global dispatcher or silent proxy fallback. */
export function createIntegratedNetwork(readProxy: () => string) {
  const direct = new Agent()
  const proxies = new Map<string, ProxyAgent>()
  const transport = createPrivateTransport({ proxyUrl: readProxy })
  const fetchImpl: typeof fetch = async (input, init) => {
    const proxy = readProxy()
    if (!validDirectProxy(proxy)) throw new Error('Invalid direct HTTP proxy')
    let dispatcher: Agent | ProxyAgent = direct
    if (proxy !== '') {
      let existing = proxies.get(proxy)
      if (!existing) { existing = new ProxyAgent(proxy); proxies.set(proxy, existing) }
      dispatcher = existing
    }
    const callerSignal = init?.signal ?? undefined
    const timeout = AbortSignal.timeout(10_000)
    const signal = callerSignal ? AbortSignal.any([callerSignal, timeout]) : timeout
    return await undiciFetch(input as Parameters<typeof undiciFetch>[0], {
      ...init as Parameters<typeof undiciFetch>[1],
      redirect: 'error',
      signal,
      dispatcher,
    }) as unknown as Response
  }
  return {
    transport,
    fetchImpl,
    close: async () => { await Promise.allSettled([direct.close(), ...Array.from(proxies.values(), proxy => proxy.close())]) },
  }
}
