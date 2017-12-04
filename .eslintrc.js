module.exports = {
  "extends": "airbnb",
  "plugins": [
    "import",
    "chai-friendly"
  ],
  "globals": {
    "describe": true,
    "it": true,
    "fetch": true,
    "context": true,
    "beforeEach": true,
    "afterEach": true
  },
  "rules": {
    "no-unused-expressions": 0,
    "chai-friendly/no-unused-expressions": 2
  }
};
