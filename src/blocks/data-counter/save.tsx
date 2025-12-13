import { useBlockProps } from '@wordpress/block-editor';
import formatNumber from './format';
import type { BlockSaveProps } from '@wordpress/blocks';
import type { DataCounterBlock } from '.';

export default ( { attributes }: BlockSaveProps< DataCounterBlock > ) => {
	const { value, prefix, suffix } = attributes;
	const displayedValue = formatNumber( value );
	const blockProps = useBlockProps.save();

	return (
		<p { ...blockProps }>{ `${ prefix }${ displayedValue }${ suffix }` }</p>
	);
};
