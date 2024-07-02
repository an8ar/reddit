import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^next/navigation$': require.resolve('next/navigation'),
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>tests/utils/setup-tests.ts'],
  testMatch: ['<rootDir>/tests/**/*.(spec|test).[jt]s?(x)'],
};

export default createJestConfig(config);
