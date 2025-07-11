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
			'xmlns'   => true,
			'width'   => true,
			'height'  => true,
			'viewbox' => true,
			'role'    => true,
		),
		'path' => array(
			'd'     => true,
			'fill'  => true,
			'class' => true,
		),
	);
	return array_merge( $kses_defaults, $svg_args );
}
