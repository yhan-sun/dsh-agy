# Direct transport sources

These sources are part of this repository and are not installed as a separate
DSH plugin or package. `legacy/src` and `legacy/tests` originate from the
local `dsh-antigravity-auth` fork based on
`suntianc/dsh-antigravity-auth` commit `57d1004e8727f17b4745de6f674ad56e93a3f858`.
Their MIT license is in `legacy/LICENSE`.

`core/src` comes from `@cortexkit/antigravity-auth-core` 2.2.0,
upstream tag `v2.2.0`, commit `351c2bf09f007792e7bc183ba73d11e2c57146fe`.
Its MIT license is in `core/LICENSE`. Imports in the direct source point to
this in-repository copy. Direct OAuth requires a local OAuth client identity in
`~/.dsh/agy-link/direct/oauth-client.json` (0600, fields `clientId` and
`clientSecret`) or the paired environment variables `AGY_CLIENT_ID` and
`AGY_CLIENT_SECRET`. Availability and Google account acceptance are not
guaranteed. Never commit client secrets, user credentials or account records.

The direct transport is experimental, disabled by default, and maintains its
own credentials independently from AGY. It must not be used as an automatic
fallback from AGY. Changes to model routing, capabilities or credentials must
be covered by offline tests; routine verification must not use real accounts.

The built host bundle also includes Undici, under the MIT license reproduced in
[UNDICI-LICENSE](UNDICI-LICENSE).
