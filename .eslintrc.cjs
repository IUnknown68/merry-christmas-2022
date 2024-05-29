module.exports = {
  root: true,

  parserOptions: {
    project: './tsconfig.json',
  },

  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],

  rules: {
    'no-restricted-syntax': 'off',
    'no-console': 'off',
    'function-paren-newline': 'off',
    '@typescript-eslint/comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      enums:  'always-multiline',
      generics:  'always-multiline',
      tuples:  'always-multiline',
      functions: 'never',
    }],
  },
};
