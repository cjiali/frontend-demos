module.exports = {
    // specify which environments you want to enable
    env: {
        browser: true,
        es2021: true, // enables ES12
        node: true,
    },
    //  Extend the set of enabled rules from base configurations
    extends: ["eslint:recommended"],
    // Specify the JavaScript language options you want to support.
    parserOptions: {
        ecmaVersion: 2021, // Specify the version of ECMAScript syntax by setting to 2015 (same as 6), 2016 (same as 7), etc.
        sourceType: "module", // Set to "script" (default) or "module" if your code is in ECMAScript modules.
        // An object indicating which additional language features you'd like to use
        ecmaFeatures: {
            // globalReturn: true, // Allow return statements in the global scope
            // impliedStrict: true, // Enable global strict mode (if ecmaVersion is 5 or greater)
            // jsx: true, // Enable JSX
            experimentalObjectRestSpread: true,
        },
    },
    /**
     * To change a rule setting, you must set the rule ID equal to one of these values:
     * "off" or 0 - turn the rule off
     * "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
     * "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
     */
    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
    },
};
