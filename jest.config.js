module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  'collectCoverage': true,
  'collectCoverageFrom': [
    'src/**/*.{js,vue}',
    '!**/node_modules/**'
  ],
  // 'moduleFileExtensions': [
  //   'js',
  //   'json',
  //   'vue'
  // ],
  'moduleNameMapper': {
    '^@/(.*)$': '<rootDir>/src/assets/$1',
    '^@static/(.*)$': '<rootDir>/src/assets/$1',
    '^@frontend/(.*)$': '<rootDir>/src/$1',
    '^@fixtures/(.*)$': '<rootDir>/fixtures/$1'
  },
  // 'roots': [
  //   'src'
  // ],
  'testMatch': [
    '**/*.spec.js'
  ],
  'transform': {
    // '^.+\\.vue$': 'vue-jest',
    // '^.+\\.js': 'babel-jest',
    '^.+\\.svg': '<rootDir>/svgTransform.js',
    // '.+\\.(png|jpg)$': 'jest-transform-stub'
  },
  'transformIgnorePatterns': [
    '/node_modules/'
  ]
  // 'snapshotSerializers': [
  //   'jest-serializer-vue'
  // ],
  // 'watchPlugins': [
  //   'jest-watch-typeahead/filename',
  //   'jest-watch-typeahead/testname'
  // ]
}
