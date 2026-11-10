# Maintainer notes

- This repository is a community fork of `amlyczz/dsh-agy-link`, based on commit `2e2c4ee4f2c1e9d24e5602da3548a8ff44dc7a93`. Keep the MIT license and attribution intact.
- Do not publish to npm or create a GitHub Release/tag unless the user explicitly asks for that release action. A push to this GitHub repository does not authorize an npm release.
- Before creating a version release, run `pnpm run check`, `pnpm run build`, and the full `pnpm test` suite. Do not perform real Google OAuth or send requests using a user's account as part of routine verification.
- Use isolated test fixtures for credentials. Never commit local DSH profiles, `.gemini` data, OAuth tokens, proxy credentials, or generated package archives.
