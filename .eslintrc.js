const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  extends: ['react-app', 'prettier'],

  env: {
    browser: true,
  },

  parserOptions: {
    ecmaVersion: 11,
  },

  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-debugger': isProd ? 'error' : 'off',
    'linebreak-style': 0,
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
  },
};
