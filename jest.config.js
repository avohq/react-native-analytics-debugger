module.exports = {
  preset: "react-native",
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js"
  },
  transformIgnorePatterns: ["!<rootDir>/node_modules/react-runtime"],
  testMatch: ["<rootDir>/src/__tests__/**/*.[jt]s?(x)"],
  testPathIgnorePatterns: ["\\.snap$", "<rootDir>/node_modules/", "testUtils.js"]
};
