import { registerBlockType } from '@wordpress/blocks';
import type { BlockConfiguration } from '@wordpress/blocks';
import type { ExperimentalBlock } from '@/types';
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { details as icon } from '@wordpress/icons';

import './style.scss';
import './editor.scss';

export interface DetailsBlock {
	/** Block open state */
	isOpen: boolean;
	/** Block title */
	summary: string;
	/** Whether title has icon */
	hasIcon: boolean;
	/** Icon image url */
	icon: string;
	/** Icon attachment image id */
	iconId: number;
}

registerBlockType(
	metadata as BlockConfiguration< DetailsBlock >,
	{
		edit,
		save,
		icon,
		__experimentalLabel: ( attributes, { context } ) => {
			const { summary } = attributes;

			const customName = attributes?.metadata?.name;
			const hasSummary = summary?.trim().length > 0;

			// In the list view, use the block's summary as the label.
			// If the summary is empty, fall back to the default label.
			if ( context === 'list-view' && ( customName || hasSummary ) ) {
				return customName || summary;
			}
		},
	} as ExperimentalBlock< DetailsBlock >
);
