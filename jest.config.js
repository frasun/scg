const config = require( '@wordpress/scripts/config/jest-unit.config.js' );

module.exports = {
	...config,
	setupFilesAfterEnv: [ '<rootDir>/tests/js/jest.setup.js' ],
	testMatch: [ '<rootDir>/tests/js/*.test.js' ],
	transformIgnorePatterns: [ 'node_modules/(?!(wordpress-jest-mocks)/)' ],
	moduleNameMapper: {
		...config.moduleNameMapper,
		'^@wordpress/components$':
			'<rootDir>/node_modules/wordpress-jest-mocks/components.js',
		'^@wordpress/block-editor$':
			'<rootDir>/node_modules/wordpress-jest-mocks/block-editor.js',
		'^@wordpress/interactivity$':
			'<rootDir>/node_modules/wordpress-jest-mocks/interactivity.js',
		'^@wordpress/i18n$':
			'<rootDir>/node_modules/wordpress-jest-mocks/i18n.js',
	},
};
