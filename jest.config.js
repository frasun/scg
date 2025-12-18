const config = require( '@wordpress/scripts/config/jest-unit.config.js' );

module.exports = {
	...config,
	setupFilesAfterEnv: [ '<rootDir>/tests/js/jest.setup.js' ],
	testMatch: [ '<rootDir>/tests/js/*.test.js' ],
};
