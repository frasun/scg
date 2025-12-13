/* eslint-disable react/jsx-no-target-blank */

import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalInputControl as InputControl, // eslint-disable-line
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Marker from '../cert/marker';

import './style.scss';
import type { BlockEditProps } from '@wordpress/blocks';
import type { JobOfferBlock } from '.';

export default ( {
	attributes,
	setAttributes,
}: BlockEditProps< JobOfferBlock > ) => {
	const blockProps = useBlockProps();
	const { url, position } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Job offer details', 'scg' ) }>
					<InputControl
						__next40pxDefaultSize
						label={ __( 'Position', 'scg' ) }
						value={ position }
						onChange={ ( val ) => {
							setAttributes( {
								position: val,
							} );
						} }
					/>
					<InputControl
						__next40pxDefaultSize
						label={ __( 'Ad link', 'scg' ) }
						value={ url }
						onChange={ ( val ) => {
							setAttributes( {
								url: val,
							} );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<a
				href={ url }
				target="_blank"
				{ ...blockProps }
				onClick={ ( e ) => e.preventDefault() }
			>
				<span>{ position }</span>
				<Marker />
			</a>
		</>
	);
};
