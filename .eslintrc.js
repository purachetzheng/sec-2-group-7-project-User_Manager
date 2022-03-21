module.exports = {
  env: {
    node: true,
  },

  rules: {
    'vue/require-default-prop': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },

  root: true,

  extends: ['plugin:vue/vue3-recommended', 'prettier', 'plugin:vue/vue3-essential', '@vue/prettier'],

  parserOptions: {
    ecmaVersion: 2020,
  },
};
