// bump.config.ts
import { defineConfig } from 'bumpp'
import { red, green } from 'yoctocolors'

export default defineConfig({
  all: true,

  // this runs *after* bumpp has updated the version (but before commit/tag)
  execute: async (ctx) => {
    console.log(ctx)
    const op = ctx as any
    const oldVersion = op.state?.currentVersion
    const newVersion = op.state?.newVersion

    console.log(`version: ${red(oldVersion)} → ${green(newVersion)}`)
  },
})
