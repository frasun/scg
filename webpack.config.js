const path = require( 'path' );
const [
	scriptsConfig,
	moduleConfig,
] = require( '@wordpress/scripts/config/webpack.config' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );

const scriptsEntry =
	typeof scriptsConfig.entry === 'function'
		? scriptsConfig.entry()
		: scriptsConfig.entry;

const moduleEntry =
	typeof moduleConfig.entry === 'function'
		? moduleConfig.entry()
		: moduleConfig.entry;

module.exports = [
	{
		...scriptsConfig,
		entry: {
			...scriptsEntry,
			'scg-theme': path.resolve(
				process.cwd(),
				'src/styles',
				'scg-theme.scss'
			),
			'scg-content': path.resolve(
				process.cwd(),
				'src/styles',
				'scg-content.scss'
			),
			'scg-editor': path.resolve(
				process.cwd(),
				'src/styles',
				'scg-editor.scss'
			),
			'scg-editor-scripts': path.resolve(
				process.cwd(),
				'src/scripts',
				'scg-editor.js'
			),
			'scg-admin-login': path.resolve(
				process.cwd(),
				'src/styles',
				'scg-login.scss'
			),
		},
		plugins: [
			...scriptsConfig.plugins,
			new RemoveEmptyScriptsPlugin( {
				stage: RemoveEmptyScriptsPlugin.STAGE_AFTER_PROCESS_PLUGINS,
			} ),
		],
		stats: { warnings: false },
	},
	{
		...moduleConfig,
		entry: {
			...moduleEntry,
			'scg-scripts': path.resolve(
				process.cwd(),
				'src/scripts',
				'scg.ts'
			),
		},
		resolve: {
			...moduleConfig.resolve,
			alias: {
				...moduleConfig.resolve?.alias,
				pdfjs: path.resolve(
					process.cwd(),
					'node_modules/pdfjs-dist/legacy/build',
					'pdf.min.mjs'
				),
			},
		},
	},
];
