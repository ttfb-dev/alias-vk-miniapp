module.exports = {
  '*.js(x)': ['yarn lint:eslint', 'yarn lint:prettier'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['yarn lint:prettier --parser json'],
  'package.json': ['yarn lint:prettier'],
  '*.scss': ['yarn lint:stylelint', 'yarn lint:prettier'],
  '*.md': ['yarn lint:prettier'],

  // '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged'],
};
