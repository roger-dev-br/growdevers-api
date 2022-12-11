export default {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/tests"],
    transform: {
        ".+\\.ts$": "ts-jest",
    },

    // Configurações de cobertura de código
    collectCoverageFrom: ["<rootDir>/src/app/**/*.ts"],
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
    clearMocks: true,
};
