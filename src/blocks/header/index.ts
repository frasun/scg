import { registerBlockType } from '@wordpress/blocks';
import type { BlockConfiguration } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { header as icon } from '@wordpress/icons';

import './style.scss';
import './editor.scss';

registerBlockType( metadata as BlockConfiguration, {
	edit,
	save,
	icon,
} );
