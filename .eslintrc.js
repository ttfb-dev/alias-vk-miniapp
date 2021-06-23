const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  extends: ['react-app', 'prettier'],

  env: {
    browser: true,
    es6: true,
  },

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 11,
    ecmaFeatures: { jsx: true },
  },

  plugins: ['simple-import-sort', 'import'],

  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-debugger': isProd ? 'error' : 'off',
    'linebreak-style': 0,
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages. `react` related packages come first.
          ['^react', '^@?\\w'],
          // Internal packages.
          ['^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
};
