import assert from 'node:assert/strict'
import test from 'node:test'
import { JSDOM } from 'jsdom'
import { TOOLTIP_CSS, installAgyTooltips, placeTooltip } from '../src/client/tooltip.ts'

const META = ['window', 'document', 'Element', 'Node', 'MouseEvent', 'FocusEvent'] as const

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
  g.MouseEvent = dom.window.MouseEvent
  g.FocusEvent = dom.window.FocusEvent
  try {
    await body(dom)
  } finally {
    for (const key of META) {
      if (saved.get(key) === undefined) delete g[key]
      else g[key] = saved.get(key)
    }
    dom.window.close()
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

test('the tooltip sits above the anchor and stays inside the viewport', () => {
  assert.deepEqual(placeTooltip({ top: 300, bottom: 328, left: 400, width: 28 }, { width: 120, height: 28 }, { width: 1000, height: 800 }), { top: 264, left: 354 })
  // No room above: flip below.
  const below = placeTooltip({ top: 4, bottom: 32, left: 400, width: 28 }, { width: 120, height: 28 }, { width: 1000, height: 800 })
  assert.equal(below.top, 40)
  // Anchored at the right edge: clamp instead of overflowing.
  const right = placeTooltip({ top: 300, bottom: 328, left: 980, width: 28 }, { width: 120, height: 28 }, { width: 1000, height: 800 })
  assert.equal(right.left, 872)
  // Never negative when the bubble is wider than the viewport.
  const narrow = placeTooltip({ top: 300, bottom: 328, left: 0, width: 28 }, { width: 400, height: 28 }, { width: 320, height: 800 })
  assert.equal(narrow.left, 8)
})

test('hovering an icon action shows its label after the delay and hides on leave', async () => {
  await withDom(async (dom) => {
    const dispose = installAgyTooltips()
    const button = dom.window.document.createElement('button')
    button.setAttribute('data-agy-tip', '同步此账号的额度')
    dom.window.document.body.appendChild(button)

    const tip = dom.window.document.querySelector('.agy-tip') as HTMLElement
    assert.ok(tip, 'the layer creates exactly one tooltip node')
    assert.equal(tip.getAttribute('role'), 'tooltip')
    assert.equal(tip.dataset.visible, 'false', 'the bubble starts hidden')

    button.dispatchEvent(new dom.window.MouseEvent('pointerover', { bubbles: true }))
    await sleep(10)
    assert.equal(tip.dataset.visible, 'false', 'the delay keeps it from flashing on a pass-through hover')
    await sleep(180)
    assert.equal(tip.dataset.visible, 'true')
    assert.equal(tip.textContent, '同步此账号的额度')

    button.dispatchEvent(new dom.window.MouseEvent('pointerout', { bubbles: true }))
    assert.equal(tip.dataset.visible, 'false', 'leaving the button hides the bubble immediately')

    dispose()
    assert.equal(dom.window.document.querySelector('.agy-tip'), null, 'dispose removes the node')
    assert.equal(dom.window.document.getElementById('dsh-agy-link-tooltip-css'), null, 'dispose removes the stylesheet')
  })
})

test('keyboard focus shows the label without waiting, and Escape dismisses it', async () => {
  await withDom(async (dom) => {
    const dispose = installAgyTooltips()
    const button = dom.window.document.createElement('button')
    button.setAttribute('data-agy-tip', '移除此账号')
    dom.window.document.body.appendChild(button)

    button.dispatchEvent(new dom.window.FocusEvent('focusin', { bubbles: true }))
    const tip = dom.window.document.querySelector('.agy-tip') as HTMLElement
    assert.equal(tip.dataset.visible, 'true', 'focus is intentional: no delay')
    assert.equal(tip.textContent, '移除此账号')

    dom.window.document.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    assert.equal(tip.dataset.visible, 'false')
    dispose()
  })
})

test('clicking or scrolling dismisses an open bubble', async () => {
  await withDom(async (dom) => {
    const dispose = installAgyTooltips()
    const button = dom.window.document.createElement('button')
    button.setAttribute('data-agy-tip', '代理设置')
    dom.window.document.body.appendChild(button)
    button.dispatchEvent(new dom.window.FocusEvent('focusin', { bubbles: true }))
    const tip = dom.window.document.querySelector('.agy-tip') as HTMLElement
    assert.equal(tip.dataset.visible, 'true')

    dom.window.document.dispatchEvent(new dom.window.MouseEvent('pointerdown', { bubbles: true }))
    assert.equal(tip.dataset.visible, 'false', 'a click dismisses the tooltip')

    button.dispatchEvent(new dom.window.FocusEvent('focusin', { bubbles: true }))
    assert.equal(tip.dataset.visible, 'true')
    dom.window.dispatchEvent(new dom.window.Event('scroll'))
    assert.equal(tip.dataset.visible, 'false', 'scrolling the panel must not leave a floating bubble')
    dispose()
  })
})

test('the tooltip skin uses the DSH token colours and is pointer-transparent', () => {
  assert.match(TOOLTIP_CSS, /--dsw-alias-tooltip-bg/)
  assert.match(TOOLTIP_CSS, /pointer-events: none/)
  assert.match(TOOLTIP_CSS, /position: fixed/)
  assert.match(TOOLTIP_CSS, /z-index: 100000/, 'the bubble must clear the settings modal')
  assert.match(TOOLTIP_CSS, /prefers-reduced-motion/)
})
