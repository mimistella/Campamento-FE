//import js from '@eslint/js';
// plugins: { js }, extends: ['js/recommended'],
export default {
  "constructor-super": [
      2
    ],
    "for-direction": [
      2
    ],
    "getter-return": [
      2,
      {
        "allowImplicit": false
      }
    ],
    "no-async-promise-executor": [
      2
    ],
    "no-case-declarations": [
      2
    ],
    "no-class-assign": [
      2
    ],
    "no-compare-neg-zero": [
      2
    ],
    "no-cond-assign": [
      2,
      "except-parens"
    ],
    "no-const-assign": [
      2
    ],
    "no-constant-binary-expression": [
      2
    ],
    "no-constant-condition": [
      2,
      {
        "checkLoops": "allExceptWhileTrue"
      }
    ],
    "no-control-regex": [
      2
    ],
    "no-debugger": [
      2
    ],
    "no-delete-var": [
      2
    ],
    "no-dupe-args": [
      2
    ],
    "no-dupe-class-members": [
      2
    ],
    "no-dupe-else-if": [
      2
    ],
    "no-dupe-keys": [
      2
    ],
    "no-duplicate-case": [
      2
    ],
    "no-empty": [
      2,
      {
        "allowEmptyCatch": false
      }
    ],
    "no-empty-character-class": [
      2
    ],
    "no-empty-pattern": [
      2,
      {
        "allowObjectPatternsAsParameters": false
      }
    ],
    "no-empty-static-block": [
      2
    ],
    "no-ex-assign": [
      2
    ],
    "no-extra-boolean-cast": [
      2,
      {}
    ],
    "no-fallthrough": [
      2,
      {
        "allowEmptyCase": false,
        "reportUnusedFallthroughComment": false
      }
    ],
    "no-func-assign": [
      2
    ],
    "no-global-assign": [
      2,
      {
        "exceptions": []
      }
    ],
    "no-import-assign": [
      2
    ],
    "no-invalid-regexp": [
      2,
      {}
    ],
    "no-irregular-whitespace": [
      2,
      {
        "skipComments": false,
        "skipJSXText": false,
        "skipRegExps": false,
        "skipStrings": true,
        "skipTemplates": false
      }
    ],
    "no-loss-of-precision": [
      2
    ],
    "no-misleading-character-class": [
      2,
      {
        "allowEscape": false
      }
    ],
    "no-new-native-nonconstructor": [
      2
    ],
    "no-nonoctal-decimal-escape": [
      2
    ],
    "no-obj-calls": [
      2
    ],
    "no-octal": [
      2
    ],
    "no-prototype-builtins": [
      2
    ],
    "no-redeclare": [
      2,
      {
        "builtinGlobals": true
      }
    ],
    "no-regex-spaces": [
      2
    ],
    "no-self-assign": [
      2,
      {
        "props": true
      }
    ],
    "no-setter-return": [
      2
    ],
    "no-shadow-restricted-names": [
      2,
      {
        "reportGlobalThis": false
      }
    ],
    "no-sparse-arrays": [
      2
    ],
    "no-this-before-super": [
      2
    ],
    "no-undef": [
      2,
      {
        "typeof": false
      }
    ],
    "no-unexpected-multiline": [
      2
    ],
    "no-unreachable": [
      2
    ],
    "no-unsafe-finally": [
      2
    ],
    "no-unsafe-negation": [
      2,
      {
        "enforceForOrderingRelations": false
      }
    ],
    "no-unsafe-optional-chaining": [
      2,
      {
        "disallowArithmeticOperators": false
      }
    ],
    "no-unused-labels": [
      2
    ],
    "no-unused-private-class-members": [
      2
    ],
    "no-unused-vars": [
      2
    ],
    "no-useless-backreference": [
      2
    ],
    "no-useless-catch": [
      2
    ],
    "no-useless-escape": [
      2,
      {
        "allowRegexCharacters": []
      }
    ],
    "no-with": [
      2
    ],
    "require-yield": [
      2
    ],
    "use-isnan": [
      2,
      {
        "enforceForIndexOf": false,
        "enforceForSwitchCase": true
      }
    ],
    "valid-typeof": [
      2,
      {
        "requireStringLiterals": false
      }
    ]
}