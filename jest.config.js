// const { pathsToModuleNameMapper } = require('ts-jest/utils');
// const { paths } = require('./tsconfig.json').compilerOptions;


module.exports = {
  preset: 'jest-preset-angular',

  // this is what needs to be on to make jest run in terminal,
  // and it's also the thing due to wallaby.js is crashing
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],


  globalSetup: 'jest-preset-angular/global-setup',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
  },
  // moduleNameMapper: {
  //   ...pathsToModuleNameMapper(paths, { prefix: '<rootDir>' }),
  //   tslib: 'tslib/tslib.es6.js',
  // },
};
