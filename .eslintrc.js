module.exports = {
    extends: [
        'next/core-web-vitals',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended'
    ],
    plugins: [
        'react',
        'react-hooks',
        'jsx-a11y'
    ],
    rules: {
        'react/react-in-jsx-scope': 'off', // Not needed in Next.js
        'react/prop-types': 'off', // If you're not using PropTypes
        'no-unused-vars': ['warn', {
            'argsIgnorePattern': '^_',
            'varsIgnorePattern': '^_'
        }],
        'jsx-a11y/anchor-is-valid': ['error', {
            'components': ['Link'],
            'specialLink': ['hrefLeft', 'hrefRight'],
            'aspects': ['invalidHref', 'preferButton']
        }]
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    }
};