import { registerBlockType } from '@wordpress/blocks';
import type { BlockConfiguration } from '@wordpress/blocks';
import type { ExperimentalBlock } from '@/types';
import edit from './edit';
import metadata from './block.json';

import './style.scss';
import './editor.scss';

export interface CertBlock {
	name: string;
	category: string;
	img: string;
	imgId: number;
	cert: string;
	certId: number;
	certFilename: string;
}

registerBlockType(
	metadata as BlockConfiguration< CertBlock >,
	{
		edit,
		__experimentalLabel: ( attributes, { context } ) => {
			const { name } = attributes;

			const customName = attributes?.metadata?.name;
			const hasName = name?.trim().length > 0;

			if ( context === 'list-view' && ( customName || hasName ) ) {
				return customName || name;
			}
		},
	} as ExperimentalBlock< CertBlock >
);
