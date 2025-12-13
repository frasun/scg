import { registerBlockType } from '@wordpress/blocks';
import type { BlockConfiguration } from '@wordpress/blocks';
import { gallery as icon } from '@wordpress/icons';

import edit from './edit';
import save from './save';
import metadata from './block.json';

import './style.scss';

registerBlockType( metadata as BlockConfiguration, {
	edit,
	save,
	icon,
} );
