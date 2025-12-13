import { registerBlockType } from '@wordpress/blocks';
import type { BlockConfiguration } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { postAuthor as icon } from '@wordpress/icons';
import './style.scss';

export interface JobOfferBlock {
	url: string;
	position: string;
}

registerBlockType( metadata as BlockConfiguration< JobOfferBlock >, {
	edit,
	save,
	icon,
} );
