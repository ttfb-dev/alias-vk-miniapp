module.exports = {
  '{*.js,*.jsx}': ['yarn lint:js', 'yarn format'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['yarn format --parser json'],
  'package.json': ['yarn format'],
  '*.scss': ['yarn lint:css', 'yarn format'],
  '*.md': ['yarn format'],

  // '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged'],
};
