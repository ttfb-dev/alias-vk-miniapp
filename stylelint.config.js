module.exports = {
  extends: [
    // 'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-css-modules',
    // 'stylelint-config-rational-order',
  ],
  plugins: ['stylelint-scss', 'stylelint-order', 'stylelint-config-rational-order/plugin'],
  rules: {
    'selector-class-pattern': /^[a-z-][a-zA-Z]*(-(enter|leave)(-(active|to))?)?$/,
    'selector-id-pattern': /^[a-z][a-zA-Z]*$/,
    'selector-max-universal': 1,
    'selector-max-type': [0, { ignore: ['child', 'descendant', 'compounded'] }],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['font-named-instance', 'composes', '@import', '@extend', '@include', '@mixin', '@at-root'],
      },
    ],
    'order/properties-order': [],
    'plugin/rational-order': [
      true,
      {
        'border-in-box-model': false,
        'empty-line-between-groups': true,
      },
    ],

    'scss/dollar-variable-colon-space-after': 'always',
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/dollar-variable-pattern': /^[a-z0-9-]+$/,
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/operator-no-newline-before': true,
    'scss/operator-no-unspaced': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
};
