// Editor scripts.
import { __ } from '@wordpress/i18n';
import {
	registerBlockStyle,
	unregisterBlockStyle,
	registerBlockVariation,
	unregisterBlockType,
} from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

domReady( function () {
	unregisterBlockType( 'core/details' );
	unregisterBlockStyle( 'core/image', 'rounded' );
} );

// Add block styles to core blocks.
registerBlockStyle( 'core/list', {
	name: 'spaced',
	label: __( 'With spacing', 'scg' ),
} );

registerBlockStyle( 'core/list', {
	name: 'inside',
	label: __( 'Marker inside', 'scg' ),
} );

registerBlockStyle( 'core/navigation', {
	name: 'main',
	label: __( 'Main Navigation', 'scg' ),
} );

registerBlockStyle( 'core/cover', {
	name: 'page-splash',
	label: __( 'Page Splash', 'scg' ),
} );

registerBlockStyle( 'core/cover', {
	name: 'section-splash',
	label: __( 'Section Splash', 'scg' ),
} );

registerBlockStyle( 'core/paragraph', {
	name: 'with-stroke',
	label: __( 'With outline', 'scg' ),
} );

// Register block variations.
registerBlockVariation( 'core/spacer', {
	name: 'scg/spacer',
	title: __( 'SCG Spacer', 'scg' ),
	isDefault: true,
	category: 'scg',
	attributes: {
		height: '1px',
	},
} );
