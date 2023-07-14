/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from "@jest/types";

const jestConfig: Config.InitialOptions = {
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    "./src/**/*.(t|j)s"
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: "./coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A list of reporter names that Jest uses when writing coverage reports
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    }
  },

  // Force coverage collection from ignored files using an array of glob patterns
  // forceCoverageMatch: [],

  // A set of global variables that need to be available in all test environments
  globals: {
    "NODE_ENV": "test"
  },

  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  maxWorkers: "50%",

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: [
    "node_modules",
    "<rootDir>/src"
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: [
    "js",
    "ts",
    "json"
  ],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
  },

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  // The root directory that Jest should scan for tests and modules within
  rootDir: ".",

  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "<rootDir>/test"
  ],

  // The number of seconds after which a test is considered as slow and reported as such in the results.
  slowTestThreshold: 6,

  // The test environment that will be used for testing
  testEnvironment: "node",

  // Options that will be passed to the testEnvironment
  // testEnvironmentOptions: {},

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  // testPathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // The regexp pattern or array of patterns that Jest uses to detect test files
  testRegex: ".*\\.test\\.ts$",

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
};

export default jestConfig;
