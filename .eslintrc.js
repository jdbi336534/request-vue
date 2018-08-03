// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    // 忽略indent
    'indent': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'semi': 0,
    'no-trailing-spaces': 0,
    'comma-dangle': 0,
    'generator-star-spacing': 0,
    'space-before-function-paren': 0,
    'new-cap': [2, {'newIsCap': false, 'capIsNew': false}],
    "no-tabs": "off",
    'camelcase': [0, {
      'properties': 'always'
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
