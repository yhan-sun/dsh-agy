import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

// Style regressions in the account console are invisible to any behavioural
// test: 0.6.4 shrank every card and capped the email badge at 135px, so users
// saw "q98646558@gm" and a visibly smaller panel. These assertions guard the
// presentation contract directly on the source of truth.
const source = fs.readFileSync(new URL('../src/client/index.ts', import.meta.url), 'utf8')

test('account cards are titled by the Google address, not the generated alias', () => {
  assert.match(source, /const effectiveEmail = acc\.email \|\| ''/, 'the email is the preferred card identity')
  assert.match(source, /const accountTitle = effectiveEmail \|\| displayAlias/, 'email wins, alias is only a fallback')
  assert.match(source, /className: 'agy-account-name-text' \}, accountTitle\)/, 'the header renders the resolved title')
  // The alias is still available on hover for users who wonder which login is
  // which, but it must not occupy its own row.
  assert.match(source, /title: accountTitle === displayAlias \? displayAlias : `\$\{accountTitle\} · \$\{displayAlias\}`/, 'alias stays in the tooltip')
  assert.equal(source.includes('agy-account-submeta'), false, 'the separate email row is gone')
})

test('the account title keeps its full address without a fixed width cap', () => {
  const start = source.indexOf('const effectiveEmail')
  assert.ok(start >= 0, 'card identity block exists')
  const block = source.slice(start, start + 900)
  assert.equal(/maxWidth:\s*'\d+px'/.test(block), false, 'no fixed width cap on the email title')
})

test('priority controls are compact ghost buttons, not native browser buttons', () => {
  const start = source.indexOf('.agy-account-order-button {')
  assert.ok(start >= 0)
  const block = source.slice(start, start + 700)
  assert.match(block, /width: 20px !important/)
  assert.match(block, /height: 20px !important/)
  assert.match(block, /border: 1px solid var\(--agy-border-btn\) !important/, 'the button owns a real border')
  assert.match(block, /background: var\(--agy-bg-btn\) !important/, 'the button owns its background')
  assert.match(block, /border-radius: 5px !important/)
})

test('the identity row never wraps badges onto a second line', () => {
  const heuristics = [
    /\.agy-account-identity \{[^}]*flex-wrap: nowrap !important/,
    /\.agy-account-state \{[^}]*white-space: nowrap !important/,
    /\.agy-account-email \{[^}]*white-space: nowrap !important/,
    /\.agy-account-name \{[^}]*white-space: nowrap !important/,
  ]
  for (const pattern of heuristics) assert.match(source, pattern)
})

test('account cards keep comfortable, readable density', () => {
  // Reverting the 0.6.4 compaction: cards were 10px 14px with an 8px gap.
  assert.ok(source.includes("padding: '14px 16px'"), 'card padding is back to the roomy value')
  assert.match(source, /\.agy-pool > \.agy-account-card \{\n\tmargin-bottom: 0 !important;/, 'the pool owns card spacing through one gap')
})

test('quota rows keep percent and reset countdown on one line', () => {
  const start = source.indexOf('const renderLine')
  assert.ok(start >= 0)
  const block = source.slice(start, start + 2800)
  assert.match(block, /width: '72px'[^\n]*flexShrink: 0/, 'the window label column stays fixed so bars line up')
  assert.match(block, /minWidth: '210px'[^\n]*flexShrink: 0[^\n]*whiteSpace: 'nowrap'/, 'the reset cluster is wide enough and cannot wrap')
  assert.match(block, /className: 'agy-quota-line'[^\n]*fontSize: '12px'/, 'the row keeps a readable font size')
  const css = source.slice(source.indexOf('.agy-quota-line > div:last-child {'), source.indexOf('.agy-quota-line > div:last-child {') + 300)
  assert.match(css, /min-width: 210px !important/)
})

test('the account pool rows do not reuse host desktop setting classes', () => {
  const poolStart = source.indexOf("className: 'agy-pool'")
  assert.ok(poolStart > 0, 'the pool section renders')
  const pool = source.slice(poolStart, source.indexOf('renderedAccountCards', poolStart))
  assert.ok(pool.length > 0)
  assert.equal(pool.includes('dshDesktopSettingsToggleRow'), false, 'host toggle-row padding/gap must not leak into the pool')
  assert.match(pool, /className: 'agy-mode-row'/)
  assert.match(pool, /className: `agy-mode-seg-btn/)
  assert.match(source, /\.agy-pool \{[^}]*gap: 10px/)
})

test('a hot-reloaded bundle refreshes the injected stylesheet instead of keeping the stale one', () => {
  // DSH swaps plugin client code without reloading the document; guarding on
  // "the style tag exists" made every CSS update invisible until a restart.
  const start = source.indexOf('function injectGlobalStyles')
  assert.ok(start >= 0)
  const block = source.slice(start, start + 1400)
  assert.match(block, /let st = document\.getElementById\(styleId\)/)
  assert.match(block, /st\.textContent !== GLOBAL_CSS\) st\.textContent = GLOBAL_CSS/)
  assert.equal(/if \(document\.getElementById\(styleId\) === null\)/.test(block), false, 'must not skip an existing tag')
})
