<?php
/**
 * Theme assets
 *
 * @package WordPress
 * @subpackage SCG
 */

namespace SCG;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Enqueue theme styles and scripts.
 */
function enqueue_theme_assets() {
	// Styles.
	$styles_uri      = '/build/scg-theme.css';
	$styles_dep_path = '/build/scg-theme.asset.php';
	$styles          = include get_theme_file_path( $styles_dep_path );

	if ( $styles ) {
		wp_enqueue_style(
			'scg-theme-styles',
			get_theme_file_uri( $styles_uri ),
			$styles['dependencies'] ?? array(),
			$styles['version'] ?? SCG_THEME_VERSION
		);
	}

	// Scripts.
	$script_uri      = '/build/scg-scripts.js';
	$script_dep_path = '/build/scg-scripts.asset.php';
	$script          = include get_theme_file_path( $script_dep_path );

	if ( $script ) {
		wp_enqueue_script_module(
			'scg-theme-scripts',
			get_theme_file_uri( $script_uri ),
			$script['dependencies'] ?? array(),
			$script['version'] ?? SCG_THEME_VERSION
		);
	}
}

/**
 * Enqueue content styles.
 */
function enqueue_editor_content_assets() {
	// Styles.
	$styles_uri      = '/build/scg-content.css';
	$styles_dep_path = '/build/scg-content.asset.php';
	$styles          = include get_theme_file_path( $styles_dep_path );

	if ( $styles ) {
		wp_enqueue_style(
			'scg-content-styles',
			get_theme_file_uri( $styles_uri ),
			$styles['dependencies'] ?? array(),
			$styles['version'] ?? SCG_THEME_VERSION
		);
	}

	// Editor only styles.
	if ( is_admin() ) {
		$styles_uri      = '/build/scg-editor.css';
		$styles_dep_path = '/build/scg-editor.asset.php';
		$styles          = include get_theme_file_path( $styles_dep_path );

		if ( $styles ) {
			wp_enqueue_style(
				'scg-editor-styles',
				get_theme_file_uri( $styles_uri ),
				$styles['dependencies'] ?? array(),
				$styles['version'] ?? SCG_THEME_VERSION
			);
		}
	}
}

/**
 * Enqueue editor styles and scripts.
 */
function enqueue_block_editor_assets() {
	// Scripts.
	$script_uri      = '/build/scg-editor-scripts.js';
	$script_dep_path = '/build/scg-editor-scripts.asset.php';
	$script          = include get_theme_file_path( $script_dep_path );

	if ( $script ) {
		wp_enqueue_script_module(
			'scg-editor-scripts',
			get_theme_file_uri( $script_uri ),
			$script['dependencies'],
			$script['version'] ?? SCG_THEME_VERSION
		);
	}
}
