import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import type { Template, TemplateArray } from '@wordpress/blocks';

const spacer: Template = [ 'core/spacer', { height: '1px' } ];
const template: TemplateArray = [ spacer, [ 'scg/details' ], spacer ];

export default () => {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template,
	} );

	return <div { ...innerBlocksProps } />;
};
