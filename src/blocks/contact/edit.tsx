import {
	useInnerBlocksProps,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalNumberControl as NumberControl, // eslint-disable-line
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import type { BlockEditProps } from '@wordpress/blocks';
import type { ContactBlock } from '.';

export default ( {
	attributes,
	setAttributes,
}: BlockEditProps< ContactBlock > ) => {
	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps( {
		className: 'wp-block-scg-contact__content',
	} );
	const { lat, lng } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Marker position', 'scg' ) }>
					<NumberControl
						__next40pxDefaultSize
						label={ __( 'Latitude', 'scg' ) }
						onChange={ ( val ) => {
							setAttributes( { lat: parseFloat( val ) } );
						} }
						value={ lat }
					/>
					<NumberControl
						__next40pxDefaultSize
						label={ __( 'Longitude', 'scg' ) }
						onChange={ ( val ) => {
							setAttributes( { lng: parseFloat( val ) } );
						} }
						value={ lng }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div { ...innerBlockProps } />
				<div className="wp-block-scg-contact__map"></div>
			</div>
		</>
	);
};
