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
    'no-console': isProd ? ['error', { allow: ['warn', 'error'] }] : 'off',
    'no-debugger': isProd ? 'error' : 'off',
    'linebreak-style': 0,
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
  },
};
