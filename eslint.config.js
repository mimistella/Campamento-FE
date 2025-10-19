import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import securityPlugin from 'eslint-plugin-security';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';

export default defineConfig([
  {
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        confirm: 'readonly',
        alert: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      prettier: prettierPlugin,
      'jsx-a11y': jsxA11yPlugin,
      security: securityPlugin,
      import: importPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      // Reglas generales
      'no-var': 'error',
      'prefer-const': 'warn',
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      // 'no-console': 'warn',
      'no-debugger': 'error',
      // 'no-alert': 'error',

      // Reglas específicas de React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/jsx-pascal-case': 'error',

      // Reglas de React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Integración con Prettier
      'prettier/prettier': 'error',
      'camelcase': 'error',

      // Reglas de importación
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/no-named-as-default': 'error',
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              pattern: '@**', // todos los alias que empiezan con @
              group: 'internal',
              position: 'after', // va después de los externos
            },
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // Accesibilidad
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      // 'jsx-a11y/label-has-associated-control': 'warn',
      'jsx-a11y/alt-text': 'warn',

      // Seguridad
      // 'security/detect-object-injection': 'error',
      'security/detect-non-literal-fs-filename': 'error',

      // Reglas para eliminar imports no usados
      'unused-imports/no-unused-imports': 'error', // elimina imports completos
      'unused-imports/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],

      // Buenas prácticas
      'no-unused-vars': 'off',
      'no-duplicate-imports': 'error',
      // 'no-magic-numbers': ['error', { ignoreArrayIndexes: true }],
      'consistent-return': 'warn',
      eqeqeq: ['error', 'always'],

      // Optimización de rendimiento
      'react/jsx-no-bind': [
        'warn',
        {
          allowFunctions: false,
          allowArrowFunctions: true,
          ignoreRefs: true,
        },
      ],

      // Reglas de seguridad
      'no-eval': 'error',
      'no-new-func': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        alias: {
          map: [
            ['@assets', './src/assets'],
            ['@components', './src/components'],
            ['@context', './src/context'],
            ['@constants', './src/constants'],
            ['@forms', './src/forms'],
            ['@hooks', './src/hooks'],
            ['@pages', './src/pages'],
            ['@providers', './src/providers'],
          ],
          extensions: ['.js', '.jsx'],
        },
      },
    },
    files: ['**/*.jsx', '**/*.js'],
  },
]);
