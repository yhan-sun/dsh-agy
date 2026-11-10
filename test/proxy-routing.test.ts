import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createServer, type Server, type Socket } from 'node:net'
import { agyFetch } from '../src/host/net.ts'

async function withProxy(kind: 'http' | 'socks5', run: (url: string) => Promise<void>): Promise<void> {
  const sockets = new Set<Socket>()
  const server: Server = createServer(socket => {
    sockets.add(socket)
    socket.on('close', () => sockets.delete(socket))
    let stage = 0
    let pending = Buffer.alloc(0)
    socket.on('data', chunk => {
      pending = Buffer.concat([pending, chunk])
      if (kind === 'socks5' && stage === 0 && pending.length >= 3) {
        const size = 2 + pending[1]!
        if (pending.length < size) return
        pending = pending.subarray(size)
        socket.write(Buffer.from([5, 0]))
        stage = 1
      }
      if (kind === 'socks5' && stage === 1 && pending.length >= 5) {
        const addressType = pending[3]
        const size = addressType === 1 ? 10 : addressType === 4 ? 22 : 7 + pending[4]!
        if (pending.length < size) return
        pending = pending.subarray(size)
        socket.write(Buffer.from([5, 0, 0, 1, 127, 0, 0, 1, 0, 1]))
        stage = 2
      }
      if (kind === 'http' && stage === 0 && pending.includes('\r\n\r\n')) {
        assert.match(pending.toString(), /^GET http:\/\/example\.invalid\/test /u)
        stage = 2
      }
      if (stage === 2 && pending.includes('\r\n\r\n')) {
        assert.match(pending.toString(), /^GET /u)
        socket.end('HTTP/1.1 200 OK\r\nContent-Length: 2\r\nConnection: close\r\n\r\nok')
        stage = 3
      }
    })
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  const address = server.address()
  if (!address || typeof address === 'string') throw new Error('No local proxy address')
  try {
    await run(`${kind}://127.0.0.1:${address.port}`)
  } finally {
    for (const socket of sockets) socket.destroy()
    await new Promise<void>(resolve => server.close(() => resolve()))
  }
}

for (const kind of ['http', 'socks5'] as const) {
  test(`Google request transport uses an explicit ${kind} proxy`, async () => {
    await withProxy(kind, async proxy => {
      const response = await agyFetch('http://example.invalid/test', {}, proxy)
      assert.equal(await response.text(), 'ok')
    })
  })
}

test('invalid proxy is rejected before a request can fall back to direct access', async () => {
  assert.throws(() => agyFetch('http://example.invalid/', {}, 'ftp://user:secret@proxy.invalid'), /Invalid proxy URL/u)
})
