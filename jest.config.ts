import type { Config } from '@jest/types';

// Or async function
export default async (): Promise<Config.InitialOptions> => {
  return {
    globalSetup: './jest.globalSetup.ts',
    globalTeardown: './jest.globalTeardown.ts',
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    testTimeout: 10000,
    testMatch: ['**/src/**/*.test.ts'],
  };
};
