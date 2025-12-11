<?php
/**
 * Helper functions
 *
 * @package WordPress
 * @subpackage SCG
 */

namespace SCG;

/**
 * Sanitizes SVG element.
 *
 * @return array
 */
function sanitize_svg() {
	$kses_defaults = wp_kses_allowed_html( 'post' );

	$svg_args = array(
		'svg'  => array(
			'xmlns'       => true,
			'width'       => true,
			'height'      => true,
			'viewbox'     => true,
			'role'        => true,
			'class'       => true,
			'fill'        => true,
			'aria-hidden' => true,
			'focusable'   => true,
		),
		'path' => array(
			'd'                 => true,
			'fill'              => true,
			'class'             => true,
			'stroke'            => true,
			'stroke-width'      => true,
			'stroke-miterlimit' => true,
			'stroke-linecap'    => true,
			'stroke-linejoin'   => true,
		),
		'g'    => array(
			'clip-path' => true,
		),
		'defs' => true,
		'rect' => array(
			'width'     => true,
			'height'    => true,
			'fill'      => true,
			'transform' => true,
		),
	);
	return array_merge( $kses_defaults, $svg_args );
}

/**
 * Sanitizes SVG element - wp_kses helper.
 *
 * @param string $content HTML content to sanitize.
 * @return string Sanitized HTML.
 */
function wp_kses_svg( $content ) {
	return wp_kses( $content, sanitize_svg() );
}

/**
 * Mask emails
 *
 * @param string $content Block content.
 * @return string
 */
function mask_emails( $content ) {
	return preg_replace_callback(
		'/([a-z0-9\+_\-]+(?:\.[a-z0-9\+_\-]+)*@(?:[a-z0-9\-]+\.)+[a-z]{2,6})/i',
		function ( $matches ) {
			return antispambot( $matches[0] );
		},
		$content
	);
}
