// bump.config.ts
import { defineConfig } from 'bumpp'
import { red, green } from 'yoctocolors'

export default defineConfig({
  commit: true,
  release: 'patch',
  tag: true,
  push: true,
})
