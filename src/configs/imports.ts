import type { OptionsStylistic, TypedFlatConfigItem } from '../types'

import { pluginAntfu, pluginImport } from '../plugins'

export async function imports(options: OptionsStylistic = {}): Promise<TypedFlatConfigItem[]> {
  const {
    stylistic = true,
  } = options

  return [
    {
      name: 'adrianub/imports/rules',
      plugins: {
        adrianub: pluginAntfu,
        import: pluginImport,
      },
      rules: {
        'adrianub/import-dedupe': 'error',
        'adrianub/no-import-dist': 'error',
        'adrianub/no-import-node-modules-by-path': 'error',

        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',

        ...stylistic
          ? {
              'import/newline-after-import': ['error', { count: 1 }],
            }
          : {},
      },
    },
  ]
}
