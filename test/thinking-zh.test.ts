import assert from 'node:assert/strict'
import test from 'node:test'
import { JSDOM } from 'jsdom'
import {
  cacheKeyFor,
  cleanThoughtText,
  disposeThinkingTranslationForTest,
  firstLine,
  hashText,
  installThinkingTranslation,
} from '../src/client/thinking-zh.ts'

const META = ['window', 'document', 'Element', 'Node', 'MutationObserver'] as const

/** Run `body` with a jsdom document installed as the ambient browser globals. */
async function withDom(body: (dom: JSDOM) => Promise<void> | void): Promise<void> {
  const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', { pretendToBeVisual: true })
  const g = globalThis as unknown as Record<string, unknown>
  const saved = new Map<string, unknown>()
  for (const key of META) saved.set(key, g[key])
  g.window = dom.window
  g.document = dom.window.document
  g.Element = dom.window.Element
  g.Node = dom.window.Node
  g.MutationObserver = dom.window.MutationObserver
  try {
    await body(dom)
  } finally {
    disposeThinkingTranslationForTest()
    for (const key of META) {
      if (saved.get(key) === undefined) delete g[key]
      else g[key] = saved.get(key)
    }
    dom.window.close()
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function reasoningRow(doc: Document, text: string, state = 'ok'): HTMLElement {
  const row = doc.createElement('div')
  row.setAttribute('data-variant', 'think')
  row.setAttribute('data-state', state)
  const summary = doc.createElement('span')
  summary.className = 'x_summary'
  const summaryText = doc.createElement('span')
  summaryText.className = 'x_summaryText'
  summaryText.textContent = `[agy · 528 tokens] ${text}`
  summary.appendChild(summaryText)
  const body = doc.createElement('div')
  body.className = 'x_thinkBody'
  body.textContent = `[agy · 528 tokens] ${text}`
  row.appendChild(summary)
  row.appendChild(body)
  doc.body.appendChild(row)
  return row
}

test('the token banner is stripped before translation', () => {
  assert.equal(cleanThoughtText('[agy · 528 tokens] The error indicates a failure.'), 'The error indicates a failure.')
  assert.equal(cleanThoughtText('[agy] waiting for the slot'), 'waiting for the slot')
  assert.equal(cleanThoughtText('  plain thought  '), '  plain thought')
  assert.equal(cleanThoughtText('[agy · 12 tokens]'), '')
})

test('the collapsed summary is the first translated line', () => {
  assert.equal(firstLine('第一段。\n\n第二段。'), '第一段。')
  assert.equal(firstLine('\n\n只有一段'), '只有一段')
  assert.equal(firstLine(''), '')
})

test('cache keys are stable and content-addressed', () => {
  assert.equal(hashText('abc'), hashText('abc'))
  assert.notEqual(hashText('abc'), hashText('abd'))
  assert.match(hashText('abc'), /^[0-9a-f]+$/)
  assert.equal(cacheKeyFor('x'), 'agy-think-zh:' + hashText('x'))
})

test('a settled reasoning row gets a Chinese summary and body above the English original', async () => {
  await withDom(async (dom) => {
    const row = reasoningRow(dom.window.document, 'The error indicates a failure to prepare a git-hosted package.')
    const calls: string[] = []
    const dispose = installThinkingTranslation({
      enabled: () => true,
      translate: async (text) => {
        calls.push(text)
        return '这个错误说明准备 git 托管的包时失败了。\n\n请检查网络。'
      },
    })
    await sleep(350)

    assert.deepEqual(calls, ['The error indicates a failure to prepare a git-hosted package.'], 'only the prose is sent')
    const summary = row.querySelector('.x_summaryText') as HTMLElement
    assert.equal(summary.getAttribute('data-agy-zh-hidden'), 'true', 'the English summary is hidden, not rewritten')
    const zhSummary = row.querySelector('.agy-think-zh-summary') as HTMLElement
    assert.ok(zhSummary, 'a Chinese summary node is appended')
    assert.equal(zhSummary.textContent, '这个错误说明准备 git 托管的包时失败了。', 'the summary is the first translated line')

    const body = row.querySelector('.x_thinkBody') as HTMLElement
    const zhBody = body.firstElementChild as HTMLElement
    assert.equal(zhBody.className, 'agy-think-zh-body', 'the Chinese block leads the body')
    assert.equal((zhBody.querySelector('.agy-think-zh') as HTMLElement).textContent, '这个错误说明准备 git 托管的包时失败了。\n\n请检查网络。')
    assert.equal((zhBody.querySelector('.agy-think-zh-sep') as HTMLElement).textContent, '原文 · English')
    assert.ok(body.textContent?.includes('The error indicates'), 'the English original is still present')

    // A remount (virtualizer) re-applies from cache without a second request.
    row.querySelector('.agy-think-zh-summary')?.remove()
    row.querySelector('.agy-think-zh-body')?.remove()
    ;(row.querySelector('.x_summaryText') as HTMLElement).removeAttribute('data-agy-zh-hidden')
    dom.window.document.body.appendChild(dom.window.document.createComment('nudge'))
    await sleep(350)
    assert.equal(calls.length, 1, 'the cached translation is reused')
    assert.ok(row.querySelector('.agy-think-zh-body'), 'the Chinese block is re-attached')

    dispose()
    assert.equal(row.querySelector('.agy-think-zh-body'), null, 'dispose removes injected nodes')
    assert.equal(summary.getAttribute('data-agy-zh-hidden'), null, 'dispose restores the English summary')
  })
})

test('a running reasoning block is left alone until it settles', async () => {
  await withDom(async (dom) => {
    const row = reasoningRow(dom.window.document, 'Still reasoning about the repository layout.', 'running')
    let calls = 0
    installThinkingTranslation({ enabled: () => true, translate: async () => { calls++; return '正在思考仓库结构。' } })
    await sleep(320)
    assert.equal(calls, 0, 'a running block must not compete with the live run')
    assert.equal(row.querySelector('.agy-think-zh-summary'), null)

    row.setAttribute('data-state', 'ok')
    await sleep(320)
    assert.equal(calls, 1, 'settling the block triggers the translation')
    assert.ok(row.querySelector('.agy-think-zh-summary'))
  })
})

test('the feature gate disables every DOM change', async () => {
  await withDom(async (dom) => {
    const row = reasoningRow(dom.window.document, 'A thought that should stay English for now.')
    let calls = 0
    installThinkingTranslation({ enabled: () => false, translate: async () => { calls++; return '不应出现' } })
    await sleep(320)
    assert.equal(calls, 0)
    assert.equal(row.querySelector('.agy-think-zh-summary'), null)
    assert.equal((row.querySelector('.x_summaryText') as HTMLElement).getAttribute('data-agy-zh-hidden'), null)
  })
})

test('short banners and failed translations do not produce empty nodes', async () => {
  await withDom(async (dom) => {
    const row = reasoningRow(dom.window.document, 'Hmm')
    let calls = 0
    installThinkingTranslation({ enabled: () => true, translate: async () => { calls++; return null } })
    await sleep(320)
    assert.equal(calls, 0, 'a summary shorter than the minimum is skipped')
    assert.equal(row.querySelector('.agy-think-zh-summary'), null)

    const longRow = reasoningRow(dom.window.document, 'A long enough English thought that deserves a translation attempt.')
    await sleep(320)
    assert.equal(calls, 1, 'a long summary is attempted once')
    assert.equal(longRow.querySelector('.agy-think-zh-summary'), null, 'a failed translation adds nothing')
  })
})
