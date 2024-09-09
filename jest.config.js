module.exports = {
  preset: "ts-jest",
  collectCoverageFrom: ['./04-testing/src/**'],
  silent: false,
  verbose: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
