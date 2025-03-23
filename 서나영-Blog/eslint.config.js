import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-config-prettier';  // Prettier 설정 추가
import prettierPlugin from 'eslint-plugin-prettier';  // Prettier 플러그인 추가

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,  // React 추천 규칙 적용
      ...react.configs['jsx-runtime'].rules, // JSX 런타임 관련 규칙
      'react/jsx-no-target-blank': 'off',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error',  // Prettier 규칙을 위반하면 ESLint에서 에러로 처리
    },
  },
]
