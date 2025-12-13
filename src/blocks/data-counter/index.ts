import { registerBlockType } from '@wordpress/blocks';
import type { BlockConfiguration } from '@wordpress/blocks';
import edit from './edit';
import metadata from './block.json';
import { pin as icon } from '@wordpress/icons';

import './style.scss';

export interface DataCounterBlock {
	value: number;
	step: number;
	prefix: string;
	suffix: string;
}

registerBlockType( metadata as BlockConfiguration< DataCounterBlock >, {
	edit,
	icon,
} );
