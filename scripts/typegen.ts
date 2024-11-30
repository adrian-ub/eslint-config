import fs from 'node:fs/promises'

import { builtinRules } from 'eslint/use-at-your-own-risk'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'

import { astro, combine, comments, formatters, imports, javascript, jsdoc, jsonc, markdown, node, perfectionist, regexp, sortPackageJson, stylistic, test, toml, typescript, unicorn, unocss, yaml } from '../src'

const configs = await combine(
  {
    plugins: {
      '': {
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  },
  astro(),
  comments(),
  formatters(),
  imports(),
  javascript(),
  jsdoc(),
  jsonc(),
  markdown(),
  node(),
  perfectionist(),
  sortPackageJson(),
  stylistic(),
  test(),
  toml(),
  regexp(),
  typescript(),
  unicorn(),
  unocss(),
  yaml(),
)

const configNames = configs.map(i => i.name).filter(Boolean) as string[]

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
})

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`

await fs.writeFile('src/typegen.d.ts', dts)
