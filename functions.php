<?php
/**
 * Theme functions and definitions
 *
 * @package WordPress
 * @subpackage SCG
 */

namespace SCG;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

require_once __DIR__ . '/includes/assets.php';
require_once __DIR__ . '/includes/blocks.php';
require_once __DIR__ . '/includes/helpers.php';
require_once __DIR__ . '/includes/setup.php';

define( 'SCG_THEME_VERSION', '1.0.0' );

/**
 * Setup.
 */
add_action( 'after_setup_theme', __NAMESPACE__ . '\setup_theme' );

/**
 * Styles and scripts.
 */
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_theme_assets' );
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\enqueue_editor_content_assets' );
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_editor_assets' );

/**
 * Blocks.
 */
add_filter( 'block_categories_all', __NAMESPACE__ . '\add_block_category', 10, 2 );
add_action( 'init', __NAMESPACE__ . '\init_blocks' );
add_filter( 'render_block_core/cover', __NAMESPACE__ . '\modify_cover_block_render' );
add_filter( 'register_block_type_args', __NAMESPACE__ . '\modify_heading_block_levels', 10, 2 );
add_filter( 'render_block_scg/carousel', __NAMESPACE__ . '\modify_carousel_block_render' );
add_filter( 'render_block_scg/header', __NAMESPACE__ . '\modify_header_block_render' );
add_filter( 'render_block_scg/accordion', __NAMESPACE__ . '\modify_accordion_block_render', 10, 2 );
add_filter( 'render_block_scg/details', __NAMESPACE__ . '\modify_details_block_render', 10, 2 );
add_filter( 'render_block_scg/cert', __NAMESPACE__ . '\modify_cert_block_render', 10, 2 );

/**
 * Patterns.
 */
add_filter( 'should_load_remote_block_patterns', '__return_false' );
