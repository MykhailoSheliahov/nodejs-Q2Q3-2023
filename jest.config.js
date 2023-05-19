module.exports = {
  preset: "ts-jest",
  collectCoverageFrom: ['./04-testing/src/**'],
  silent: false,
  verbose: true,
  coverageReporters: ['text'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
