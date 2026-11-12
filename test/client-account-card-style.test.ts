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
    /\.agy-account-header \{[^}]*flex-wrap: nowrap !important/,
    /\.agy-account-identity \{[^}]*flex-wrap: nowrap !important/,
    /\.agy-account-state \{[^}]*white-space: nowrap !important/,
    /\.agy-account-name \{[^}]*white-space: nowrap !important/,
  ]
  for (const pattern of heuristics) assert.match(source, pattern)
})

test('account identity and its actions share one header row', () => {
  // The 564px settings column cannot stack a text-labelled action bar under the
  // email without pushing the row to two lines, so every per-account action is
  // a 28px icon button and the header never wraps.
  const actions = source.slice(source.indexOf("className: 'agy-card-actions'"), source.indexOf('// Quota details'))
  assert.ok(actions.length > 0, 'card actions render')
  for (const label of ['account.disableTitle', 'account.enableTitle', 'account.syncTitle', 'account.warmupTitle', 'proxy.button', 'account.removeTitle']) {
    assert.ok(actions.includes(`t('${label}')`), `${label} is used as an accessible name`)
  }
  // Every row action is an icon button, not a text button.
  const iconButtons = actions.match(/agy-account-icon-action/g) ?? []
  assert.ok(iconButtons.length >= 5, `expected >=5 icon actions, saw ${iconButtons.length}`)
  assert.equal(/\.agy-card-actions \{[^}]*flex-wrap: nowrap/.test(source), true, 'the action cluster never wraps')
  assert.match(source, /\.agy-account-icon-action \{[^}]*width: 28px !important/)
})

test('the toolbar keeps service state and its actions on one line', () => {
  const start = source.indexOf("className: 'agy-toolbar'")
  assert.ok(start > 0, 'the toolbar renders')
  const toolbar = source.slice(start, source.indexOf('renderToastBanner', start))
  assert.match(toolbar, /className: 'agy-console-status'/)
  assert.match(toolbar, /className: 'agy-toolbar-actions'/)
  assert.match(toolbar, /agy-toolbar-btn agy-toolbar-btn-primary/)
  const css = source.slice(source.indexOf('.agy-toolbar {'), source.indexOf('.agy-toolbar-actions {'))
  assert.match(css, /flex-wrap: nowrap/)
  assert.match(css, /justify-content: space-between/)
  // The state label may ellipsize; the buttons must never shrink.
  const actionsCss = source.slice(source.indexOf('.agy-toolbar-actions {'), source.indexOf('.agy-toolbar-actions {') + 200)
  assert.match(actionsCss, /flex: 0 0 auto/)
})

test('dropdowns wear the DSH control skin instead of the native menulist', () => {
  const start = source.indexOf('.agy-select {')
  assert.ok(start > 0, 'the select skin exists')
  const block = source.slice(start, start + 2600)
  assert.match(block, /appearance: none !important/)
  assert.match(block, /-webkit-appearance: none !important/)
  assert.match(block, /height: 30px !important/)
  assert.match(block, /border-radius: 8px !important/)
  assert.match(block, /background-image: url\("data:image\/svg\+xml/, 'the chevron is drawn by the skin')
  assert.match(block, /background-position: right 7px center !important/)
  assert.match(block, /border-color: var\(--agy-border-input-focus\) !important/)
  // The dark sheet needs its own chevron colour.
  assert.match(source, /body\[data-ds-dark-theme\] \.agy-select[\s\S]{0,600}stroke='%23cbd5e1'/)
  // No leftover rule may re-impose the old 6px radius.
  assert.equal(/\.agy-select \{ border-radius: 6px !important; \}/.test(source), false)
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
