module.exports = {
    extends: "standard",
    // add your custom rules here
    rules: {
        'space-before-function-paren': ['error', 'never'],
        'keyword-spacing': ['error', { 'overrides': {
                'if': { 'after': false },
                'for': { 'after': false },
                'while': { 'after': false },
                'else': { 'before': false }
            }}],
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
};
