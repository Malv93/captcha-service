/** @type {import('ts-jest').JestConfigWithTsJest} **/
export const testEnvironment = "node";
export const testMatch = ['**/__tests__/**/*.test.ts']
export const transform = {
  "^.+.tsx?$": ["ts-jest", {}],
};