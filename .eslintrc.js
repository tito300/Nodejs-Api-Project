module.exports = {
    "extends": ["airbnb-base",
                "prettier"],
    "rules": {
        "no-unused-vars": 0,
        "linebreak-style": ["error", "windows"],
        "no-underscore-dangle": 0,
        "no-use-before-define": 0,
        "quote-props": ["error", "consistent"],
        "no-undef": 0,
        "consistent-return": 0,
        "func-names": 0,
        "prettier/prettier": [
            "error",
            {
              "trailingComma": "es5",
              "singleQuote": true,
              "printWidth": 80,
            }
          ],
        "prefer-destructuring": 0  
    },
    "env": {
        "browser": false,
        "node": true,
        "jquery": false,
        "jest": true
      },  
    "plugins":[
        "prettier",
        "eslint-plugin-prettier"
    ]
};