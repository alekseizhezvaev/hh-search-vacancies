module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint', '@typescript-eslint/tslint', 'react', 'jest'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'react-app',
    'plugin:prettier/recommended',
  ],
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: false }],
    '@typescript-eslint/tslint/config': [
      'error',
      {
        rules: {
          'ordered-imports': [
            true,
            {
              'module-source-path': 'full',
              'grouped-imports': true,
              'import-sources-order': 'lowercase-first',
              groups: [
                {
                  match: '^core-js/stable',
                  order: 1,
                },
                {
                  match: '^react',
                  order: 2,
                },
                {
                  name: 'Root',
                  match: '^@src/',
                  order: 20,
                },
                {
                  name: 'Assets',
                  match: '^@assets/',
                  order: 60,
                },
                {
                  name: 'Parent directory',
                  match: '^[.][.]',
                  order: 80,
                },
                {
                  name: 'Current directory',
                  match: '^[.]',
                  order: 90,
                },
                {
                  name: 'Vendors & Packages',
                  match: '^[^\\.]',
                  order: 10,
                },
              ],
            },
          ],
        },
      },
    ],
    'import/no-default-export': 'warn',
    'react/self-closing-comp': 'warn',
    'jsx-a11y/anchor-is-valid': 0,
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
