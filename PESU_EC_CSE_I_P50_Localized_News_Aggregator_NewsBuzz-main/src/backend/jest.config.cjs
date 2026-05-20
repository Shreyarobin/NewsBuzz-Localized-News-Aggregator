// jest.config.cjs
module.exports = {
  testEnvironment: "node",

 // Load environment before tests
  setupFiles: ["<rootDir>/setupTests.js"],

 // Load MongoMemoryServer AFTER env
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  transform: {},

  testMatch: [
    "**/tests/**/*.test.js",
    "**/tests/**/*.test.mjs",
    "**/tests/**/*.test.cjs"
  ],

  verbose: true,

  collectCoverageFrom: [
    "controllers/**/*.js",
    "services/**/*.js",
    "routes/**/*.js",
    "middleware/**/*.js",
    "models/**/*.js",

    "!node_modules/**",
    "!tests/**",
    "!coverage/**",
    "!jest.config.cjs",
    "!eslint.config.js"
  ],

  coverageThreshold: {
    global: {
      statements: 75,
      branches: 75,
      functions: 75,
      lines: 75
    }
  },

  coverageReporters: ["text", "text-summary", "html", "lcov"],

  coverageDirectory: "coverage",

  testPathIgnorePatterns: [
    "/node_modules/",
    "/coverage/"
  ],

  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/tests/",
    "/coverage/",
    "routes/news.js",
    "services/feedFetcher.js",
    "routes/newsRoutes.js",
    "routes/feedRoutes.js",
    "routes/userRoutes.js",
    "controllerMissingLines.test.js",
    "articleController.test.js"
  ]
};
