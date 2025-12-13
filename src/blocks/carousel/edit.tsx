import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import './editor.scss';

export default () => {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps( {
		className: 'wp-block-scg-carousel__wrapper',
	} );

	return (
		<section { ...blockProps }>
			<div { ...innerBlocksProps } />
		</section>
	);
};
