module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    parserOptions: {
      ecmaVersion: 2019,
      sourceType: 'module',
    },
    env: {
      browser: true,
      jasmine: true,
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-console': ['error'],
      'no-return-assign': 'off',
      'lines-between-class-members': ['error', 'always', {
        'exceptAfterSingleLine': true,
      }],
      'no-multiple-empty-lines': ['error', {'max': 1, 'maxBOF': 0}],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'],
          next: '*',
        },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        {
          blankLine: 'always',
          prev: [
            'block',
            'block-like',
            'cjs-export',
            'class',
            'export',
            'import',
            'if',
          ],
          next: '*',
        },
        {
          blankLine: 'any',
          prev: ['export', 'import'],
          next: ['export', 'import'],
        },
      ],
      'import/prefer-default-export': 'off',
      'max-classes-per-file': 'off',
      'prefer-destructuring': 'off',
      'class-methods-use-this': 'off',
      'no-empty': ['error', {'allowEmptyCatch': true}],
      'func-names': 'off',
      'no-unused-expressions': ['error', {
        allowShortCircuit: true,
        allowTernary: true,
      }],
      'no-unused-vars': 'off',
      'no-unexpected-multiline': ['error'],
      // prettier issue https://github.com/prettier/prettier/issues/3806
      'operator-linebreak': 'off',
      '@typescript-eslint/explicit-member-accessibility': ['error', {
        accessibility: 'no-public',
      }],
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/typedef': ['off'],
      '@typescript-eslint/no-explicit-any': ['error'],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars-experimental': 1, // 1 = warning
      '@typescript-eslint/consistent-type-assertions': ['error', {
        assertionStyle: 'angle-bracket',
      }],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-use-before-define': ['error', {
        functions: false,
      }],
      '@typescript-eslint/member-ordering': ['error', {
        default: [
          'public-abstract-field',
          'protected-abstract-field',
          'private-abstract-field',
  
          'public-static-field',
          'protected-static-field',
          'private-static-field',
  
          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
  
          'public-constructor',
          'protected-constructor',
          'private-constructor',
  
          'public-static-method',
          'protected-static-method',
          'private-static-method',
  
          "public-abstract-method",
          "protected-abstract-method",
          "private-abstract-method",
  
          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
        ],
      }],
    },
  };
  