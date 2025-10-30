import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactPlugin from 'eslint-plugin-react';
import securityPlugin from 'eslint-plugin-security';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import pluginReactRefresh from 'eslint-plugin-react-refresh';

import userRules from './eslint_Rules/user.rules.js';
import unusedImportRules from './eslint_Rules/unusedImport.rules.js';
import airbnbRules from './eslint_Rules/airbnb.rules.js';
import importRules from './eslint_Rules/import.rules.js';

export default defineConfig([
  //  reactHooksPlugin.configs.flat.recommended,
  //  securityPlugin.configs.recommended,
  {
    ignores: ['node_modules', 'eslint.config.js', '.vscode', 'eslint_Rules/*'],
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
      'react-refresh': pluginReactRefresh,
    },
    rules: {
       ...airbnbRules,
       ...userRules,
       ...unusedImportRules,
      'react-refresh/only-export-components': 'error',
      'prettier/prettier': ['error'],
      // ...importRules,
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
