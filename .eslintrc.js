module.exports = {
    extends: 'airbnb',
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true
    },
    rules: {
        indent: ['error', 4],
        'comma-dangle': 0,
        'react/jsx-filename-extension': 0,
        'react/prefer-stateless-function': 0,
        'react/jsx-indent': ['error', 4]
        'react/no-danger': 0
    }
};
