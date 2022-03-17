const { pathsToModuleNameMapper } = require('ts-jest');
const { paths } = require('./tsconfig.json').compilerOptions;

const PATH_MAP = pathsToModuleNameMapper(paths, { prefix: '<rootDir>' });

module.exports = {
  preset: 'jest-preset-angular',

  // this is what needs to be on to make jest run in terminal,
  // and it's also the thing due to wallaby.js is crashing
	// ___________________________________________________
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
	// ___________________________________________________


  globalSetup: 'jest-preset-angular/global-setup',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
	roots: ['<rootDir>/src/'],
	testMatch: ['**/+(*.)+(spec).+(ts)'],

  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
  },
	collectCoverage: true,
	coverageReporters: ['html', 'clover', 'json', 'lcov', ['text', { 'skipFull': true }]],
	coverageThreshold: {
		'global': {
			// 'branches': 36,
			// 'functions': 44,
			// 'lines': 59,
			'statements': 56
		},
	},
	coverageDirectory: 'coverage/my-app',
	moduleNameMapper: PATH_MAP

};
