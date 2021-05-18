module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],

  env: {
    browser: true,
  },

  // plugins: ['prettier'],

  rules: {
    'linebreak-style': 0,
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
  },
};
