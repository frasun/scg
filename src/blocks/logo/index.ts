import { registerBlockType } from '@wordpress/blocks';
import { siteLogo as icon } from '@wordpress/icons';
import edit from './edit';
import metadata from './block.json';
import './style.scss';
import type { BlockConfiguration } from '@wordpress/blocks';

export interface LogoBlock {
	/** Whether logo is a link */
	isLink: boolean;
	/** Link url */
	url: string;
}

registerBlockType( metadata as BlockConfiguration< LogoBlock >, {
	edit,
	icon,
} );
