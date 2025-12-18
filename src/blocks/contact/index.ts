import { registerBlockType } from '@wordpress/blocks';
import type { BlockConfiguration } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import metadata from './block.json';

import './style.scss';
import './editor.scss';

export interface ContactBlock {
	/** Location latitude */
	lat: number;
	/** Location longitude */
	lng: number;
}

registerBlockType( metadata as BlockConfiguration< ContactBlock >, {
	edit,
	save,
} );
