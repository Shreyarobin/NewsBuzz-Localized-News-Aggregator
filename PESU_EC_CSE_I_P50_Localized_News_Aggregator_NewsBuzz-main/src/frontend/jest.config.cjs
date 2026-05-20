module.exports = {
  testEnvironment: "jsdom",

  // Run setup file (mocks, polyfills, fetch, etc.)
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // Allow Babel to transform JSX / ES module syntax
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  // Handle CSS imports
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },

  // Coverage collection
  collectCoverageFrom: ["src/**/*.{js,jsx}", "!src/main.jsx"],

  // Mock import.meta.env for Vite projects
  globals: {
    "import.meta": {
      env: {
        VITE_API_URL: "http://localhost:4000"
      }
    }
  }
};
