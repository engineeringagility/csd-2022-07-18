module.exports = {
    transform: {
        "^.+\\.ts$": [ "<rootDir>/jest.transform.js" ]
    },
    testEnvironment: "node",
    testMatch: [ "<rootDir>/src/**/*.spec.ts" ]
}
