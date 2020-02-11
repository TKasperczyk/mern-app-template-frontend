const path = require('path');

module.exports = {
    collectCoverageFrom: [
        '**/*.js',
        '!**/node_modules/**',
        '!<rootDir>/jest.config.js',
        '!<rootDir>/jest.setup.js',
        '!<rootDir>/tests/**',
        '!<rootDir>/coverage/**',
        '!<rootDir>/src/index.js',
        '!<rootDir>/src/setupProxy.js'
    ],
};