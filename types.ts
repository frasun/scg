import type { BlockConfiguration } from '@wordpress/blocks';

export type ExperimentalBlock< T extends Record< string, any > > =
	BlockConfiguration< T > & {
		/** Label to display in Components Navigation */
		__experimentalLabel?: (
			attributes: T & { metadata?: Record< string, string > },
			settings: { context: string }
		) => string;
	};
