module.exports = {
  automock: false,
  collectCoverage: true,
  coverageReporters: ['lcov'],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy'
  }
}
