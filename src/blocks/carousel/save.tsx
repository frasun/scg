import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default () => {
	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'wp-block-scg-carousel__wrapper',
	} );

	return (
		<section { ...blockProps }>
			<div { ...innerBlocksProps } />
		</section>
	);
};
