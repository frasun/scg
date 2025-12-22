<?php
/**
 * PHPUnit bootstrap
 *
 * @package WordPress
 * @subpackage SCG
 */

// Tests env location.
$tests = getenv( 'WP_TESTS_DIR' );

// Include polyfills.
define( 'WP_TESTS_PHPUNIT_POLYFILLS_PATH', dirname( __DIR__, 2 ) . '/vendor/yoast/phpunit-polyfills/phpunitpolyfills-autoload.php' );

// Include WP test functions.
require_once $tests . '/includes/functions.php';

// Activate theme.
tests_add_filter(
	'muplugins_loaded',
	function () {
		switch_theme( 'scg' );
	}
);

require $tests . '/includes/bootstrap.php';
