import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

const direct = resolve(import.meta.dirname, 'direct/legacy')
export default defineConfig({
  resolve: {
    alias: {
      'dsh-antigravity-auth/wire-identity': resolve(direct, 'src/wire-identity.ts'),
      'dsh-antigravity-auth/invariant': resolve(direct, 'src/invariant.ts'),
      'dsh-antigravity-auth/project-context': resolve(direct, 'src/project-context.ts'),
      'dsh-antigravity-auth': resolve(direct, 'src/index.ts'),
    },
  },
  test: {
    include: ['direct/legacy/tests/**/*.spec.{ts,tsx}'],
    setupFiles: ['direct/vitest.setup.ts'],
    pool: 'forks',
    restoreMocks: true,
  },
})
