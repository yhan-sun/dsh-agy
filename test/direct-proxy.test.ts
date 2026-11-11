import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { createServer as createTcpServer } from 'node:net'
import test from 'node:test'
import { validDirectProxy } from '../src/common/direct-proxy.ts'
import { createIntegratedNetwork } from '../direct/legacy/src/integrated-network.ts'
import { ANTIGRAVITY_WIRE_ORIGIN } from '../direct/legacy/src/wire-identity.ts'

test('direct proxy accepts only an HTTP CONNECT URL without credentials', () => {
  for (const value of ['', 'http://127.0.0.1:7890', 'http://localhost:8080']) assert.equal(validDirectProxy(value), true)
  for (const value of ['socks5://127.0.0.1:1080', 'https://proxy.test', 'http://u:p@proxy.test', 'http://proxy.test/path', 'http://proxy.test/?q=1']) assert.equal(validDirectProxy(value), false)
})

test('OAuth and private transport both use the explicitly selected proxy', async () => {
  const requests: string[] = []
  const proxy = createTcpServer(socket => {
    socket.once('data', data => {
      requests.push(data.toString('utf8').split('\r\n')[0] ?? '')
      socket.end('HTTP/1.1 407 Proxy Authentication Required\r\nContent-Length: 0\r\nConnection: close\r\n\r\n')
    })
  })
  await new Promise<void>(resolve => proxy.listen(0, '127.0.0.1', resolve))
  const address = proxy.address()
  assert.ok(address && typeof address === 'object')
  const network = createIntegratedNetwork(() => `http://127.0.0.1:${address.port}`)
  try {
    await assert.rejects(network.fetchImpl('https://example.invalid/token'))
    await assert.rejects(network.transport.request({ url: `${ANTIGRAVITY_WIRE_ORIGIN}/v1internal:generateContent`, accessToken: 'fixture-token', body: '{}' }))
    assert.ok(requests.some(line => line.includes('example.invalid:443')))
    assert.ok(requests.some(line => line.includes(new URL(ANTIGRAVITY_WIRE_ORIGIN).hostname)))
  } finally {
    await network.close()
    await new Promise<void>(resolve => proxy.close(() => resolve()))
  }
})

test('empty direct proxy does not inherit the process proxy', async () => {
  let proxyConnections = 0
  const proxy = createTcpServer(socket => { proxyConnections++; socket.destroy() })
  const target = createServer((_req, res) => { res.end('fixture') })
  await Promise.all([
    new Promise<void>(resolve => proxy.listen(0, '127.0.0.1', resolve)),
    new Promise<void>(resolve => target.listen(0, '127.0.0.1', resolve)),
  ])
  const proxyAddress = proxy.address(), targetAddress = target.address()
  assert.ok(proxyAddress && typeof proxyAddress === 'object')
  assert.ok(targetAddress && typeof targetAddress === 'object')
  const previous = process.env.HTTP_PROXY
  process.env.HTTP_PROXY = `http://127.0.0.1:${proxyAddress.port}`
  const network = createIntegratedNetwork(() => '')
  try {
    const response = await network.fetchImpl(`http://127.0.0.1:${targetAddress.port}/`)
    assert.equal(await response.text(), 'fixture')
    assert.equal(proxyConnections, 0)
  } finally {
    await network.close()
    if (previous === undefined) delete process.env.HTTP_PROXY
    else process.env.HTTP_PROXY = previous
    await Promise.all([
      new Promise<void>(resolve => proxy.close(() => resolve())),
      new Promise<void>(resolve => target.close(() => resolve())),
    ])
  }
})
