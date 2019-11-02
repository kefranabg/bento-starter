module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/prettier'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warning' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warning' : 'off',
    'vue/require-default-prop': 'off',
    'import/no-unresolved': 'off',
    'no-param-reassign': 'off',
    'no-return-assign': 'off',
    'no-var': 2,
    'prefer-const': 2
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
