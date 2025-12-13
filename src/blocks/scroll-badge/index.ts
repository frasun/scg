import { registerBlockType, BlockConfiguration } from '@wordpress/blocks';
import './style.scss';

import edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata as BlockConfiguration, {
	edit,
	save,
} );
