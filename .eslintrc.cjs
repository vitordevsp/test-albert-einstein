module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'no-useless-catch': "off",

    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "semi": [
      "warn",
      "never"
    ],
    "quotes": [
      "warn",
      "single"
    ],
    "object-curly-spacing": [
      "warn",
      "always"
    ],
    "no-trailing-spaces": "warn",
    "comma-dangle": [
      "warn",
      "always-multiline"
    ],
    "comma-spacing": [
      "warn",
      {
        "before": false,
        "after": true
      }
    ],
    "eol-last": [
      "warn",
      "always"
    ],
    "array-bracket-spacing": [
      "warn",
      "never"
    ],
    "computed-property-spacing": [
      "warn",
      "never"
    ],
    "no-multiple-empty-lines": [
      "warn",
      {
        "max": 1,
        "maxEOF": 0
      }
    ],
    "no-console": [
      "warn",
      {
        "allow": [
          "warn",
          "error"
        ]
      }
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "keyword-spacing": [
      "warn",
      {
        "before": true,
        "after": true
      }
    ]
  },
}
