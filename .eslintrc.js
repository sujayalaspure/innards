module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
      },
    ],
    'max-lines': ['error', {max: 200, skipBlankLines: true, skipComments: true}],
  },
};
