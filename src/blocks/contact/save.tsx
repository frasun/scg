import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default () => {
	const blockProps = useBlockProps.save();
	const innerBlockProps = useInnerBlocksProps.save( {
		className: 'wp-block-scg-contact__content',
	} );

	return (
		<div { ...blockProps }>
			<div { ...innerBlockProps } />
			<div className="wp-block-scg-contact__map"></div>
		</div>
	);
};
