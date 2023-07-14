import jestConfig from "./jest.config";

delete jestConfig.coverageThreshold;
jestConfig.testRegex = ".*\\.e2e-spec\\.ts$";

export default jestConfig;
