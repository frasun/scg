<?php
/**
 * Theme blocks
 *
 * @package WordPress
 * @subpackage SCG
 */

namespace SCG;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Add custom block category
 *
 * @param array[] $categories Array of categories for block types.
 * @return array[]
 */
function add_block_category( $categories ) {
	$custom_category = array(
		array(
			'slug'  => 'scg',
			'title' => 'SCG',
			'icon'  => null,
		),
	);

	return array_merge( $custom_category, $categories );
}

/**
 * Register theme blocks
 */
function init_blocks() {
	$blocks = array( 'carousel', 'logo', 'header', 'details', 'accordion', 'cert' );

	foreach ( $blocks as $block_name ) {
		register_block_type( get_theme_file_path( "/build/blocks/{$block_name}" ) );
	}
}

/**
 * Modify core/cover block to include adminbar.
 *
 * @param string $block_content The block content.
 * @return string
 */
function modify_cover_block_render( $block_content ) {
	$tags = new \WP_HTML_Tag_Processor( $block_content );

	if ( $tags->next_tag( array( 'class_name' => 'wp-block-cover' ) ) ) {
		$style         = $tags->get_attribute( 'style' );
		$updated_style = str_replace( '100vh', 'calc(100vh - var(--wp-admin--admin-bar--height, 0px))', $style );
		$tags->set_attribute( 'style', $updated_style );
	}

	return $tags->get_updated_html();
}

/**
 * Modify available levels in core/heading block - remove h1 and h6.
 *
 * @param array  $args Array of arguments for registering a block type.
 * @param string $block_type Block type name including namespace.
 * @return array
 */
function modify_heading_block_levels( $args, $block_type ) {
	if ( 'core/heading' !== $block_type ) {
		return $args;
	}

	$args['attributes']['levelOptions']['default'] = array( 2, 3, 4, 5 );

	return $args;
}

/**
 * Modify scg/carousel block to add slider markup.
 *
 * @param string $block_content The block content.
 * @return string
 */
function modify_carousel_block_render( $block_content ) {
	$tags = new \WP_HTML_Tag_Processor( $block_content );

	if ( $tags->next_tag( array( 'class_name' => 'wp-block-scg-carousel' ) ) ) {
		$tags->set_attribute( 'data-wp-interactive', 'scg/carousel' );
		$tags->set_attribute( 'data-wp-init', 'callbacks.initCarousel' );
	}

	return $tags->get_updated_html();
}

/**
 * Modify scg/header block to add scroll event when element is transparent.
 *
 * @param string $block_content The block content.
 * @return string
 */
function modify_header_block_render( $block_content ) {
	$tags = new \WP_HTML_Tag_Processor( $block_content );

	if ( $tags->next_tag( array( 'class_name' => 'is-style-transparent' ) ) ) {
		$tags->set_attribute( 'data-wp-bind--data-is-scrolled', 'context.isScrolled' );
		$tags->set_attribute( 'data-wp-on-async-document--scroll', 'callbacks.onScroll' );
	}

	return $tags->get_updated_html();
}

/**
 * Modify scg/accordion block to add name attribute to details.
 *
 * Block markup:
 * <div class="wp-block-scg-accordion">         // depth: 1
 * * <div class="wp-block-scg-details">         // depth: 2
 * ** <div class="wp-block-scg-details-sumary"> // depth: 3
 *
 * @param string $block_content The block content.
 * @return string
 */
function modify_accordion_block_render( $block_content ) {
	$tags          = new \WP_HTML_Tag_Processor( $block_content );
	$name          = wp_unique_id( 'scg-accrodrion-' );
	$index         = 1;
	$is_active     = array();
	$depth         = 0;
	$depth_details = 2;
	$depth_summary = 3;

	/* Target only direct children elements. */
	while ( $tags->next_tag( array( 'tag_closers' => 'visit' ) ) ) {
		if ( 'DIV' === $tags->get_tag() ) {
			if ( $tags->is_tag_closer() ) {
				--$depth;
			} else {
				++$depth;
			}

			if ( $depth === $depth_details && $tags->has_class( 'wp-block-scg-details' ) ) {
				$context = json_decode( $tags->get_attribute( 'data-wp-context' ) );

				if ( isset( $context->accordion ) ) {
					continue;
				}

				$is_open = $context->{'isOpen'} ?? false;

				if ( $is_open ) {
					array_push( $is_active, $index );
				}

				$tags->set_attribute(
					'data-wp-context',
					wp_json_encode(
						array(
							'accordion' => $name,
							'key'       => $index,
							'isOpen'    => $is_open,
						)
					)
				);
				$tags->set_attribute( 'data-wp-watch', 'callbacks.onStateChange' );

				++$index;
			}

			if ( $depth === $depth_summary && $tags->has_class( 'wp-block-scg-details__summary' ) ) {
				$tags->set_attribute( 'data-wp-on-async--click', 'actions.emitToggle' );
				$tags->set_attribute( 'data-wp-on--keydown', 'actions.emitSpaceToggle' );
			}
		}
	}

	wp_interactivity_state(
		'scg/details',
		array(
			$name => $is_active,
		)
	);

	return $tags->get_updated_html();
}

/**
 * Modify scg/accordion block to add name attribute to details.
 *
 * @param string $block_content The block content.
 * @param array  $block The full block, including name and attributes.
 * @return string
 */
function modify_details_block_render( $block_content, $block ) {
	$tags    = new \WP_HTML_Tag_Processor( $block_content );
	$name    = wp_unique_id( 'scg-details-' );
	$summary = "{$name}-summary";
	$content = "{$name}-content";
	$context = array(
		'isOpen' => $block['attrs']['isOpen'] ?? false,
	);

	if ( $tags->next_tag( array( 'class_name' => 'wp-block-scg-details' ) ) ) {
		$tags->set_attribute( 'data-wp-interactive', 'scg/details' );
		$tags->set_attribute( 'data-wp-init', 'callbacks.setupAnimation' );
		$tags->set_attribute( 'data-wp-context', wp_json_encode( $context ) );
		$tags->set_attribute( 'data-wp-bind--data-open', 'context.isOpen' );
	}

	if ( $tags->next_tag( array( 'class_name' => 'wp-block-scg-details__summary' ) ) ) {
		$tags->set_attribute( 'data-wp-on-async--click', 'actions.toggle' );
		$tags->set_attribute( 'data-wp-on--keydown', 'actions.spaceToggle' );
		$tags->set_attribute( 'id', $summary );
		$tags->set_attribute( 'data-wp-bind--aria-expanded', 'context.isOpen' );
		$tags->set_attribute( 'aria-controls', $content );
		$tags->set_attribute( 'role', 'button' );
		$tags->set_attribute( 'tabindex', 0 );
	}

	if ( $tags->next_tag( array( 'class_name' => 'wp-block-scg-details__content' ) ) ) {
		$tags->set_attribute( 'id', $content );
		$tags->set_attribute( 'data-wp-bind--aria-hidden', '!context.isOpen' );
		$tags->set_attribute( 'aria-labelledby', $summary );
	}

	return $tags->get_updated_html();
}
