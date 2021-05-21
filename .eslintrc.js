module.exports = {
  extends: ['react-app', 'prettier'],

  env: {
    browser: true,
  },

  parserOptions: {
    ecmaVersion: 11,
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['warn', 'error'] }] : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 0,
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
  },
};
