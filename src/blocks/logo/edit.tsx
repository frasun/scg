import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Logo from './logo';
import type { BlockEditProps } from '@wordpress/blocks';
import type { LogoBlock } from '.';

export default function ( {
	attributes,
	setAttributes,
}: BlockEditProps< LogoBlock > ) {
	const { isLink, url } = attributes;

	const setUrl = ( value ) => {
		if ( value.length && ! isLink ) {
			setAttributes( { isLink: true } );
		}
		setAttributes( { url: value } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<ToggleControl
						__nextHasNoMarginBottom
						checked={ isLink }
						label={ __( 'Link to homepage', 'scg' ) }
						onChange={ ( val ) => setAttributes( { isLink: val } ) }
					/>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Link href url', 'scg' ) }
						value={ url }
						onChange={ setUrl }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<Logo />
			</div>
		</>
	);
}
