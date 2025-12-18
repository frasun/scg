import { registerBlockType } from '@wordpress/blocks';
import type { BlockConfiguration } from '@wordpress/blocks';
import edit from './edit';
import metadata from './block.json';
import { pin as icon } from '@wordpress/icons';

import './style.scss';

export interface DataCounterBlock {
	/** End display value */
	value: number;
	/** Value increment size */
	step: number;
	/** Display prefix */
	prefix: string;
	/** Display suffix */
	suffix: string;
}

registerBlockType( metadata as BlockConfiguration< DataCounterBlock >, {
	edit,
	icon,
} );
