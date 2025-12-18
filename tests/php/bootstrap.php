<?php
/**
 * PHPUnit bootstrap
 *
 * @package WordPress
 * @subpackage SCG
 */

// Include polyfills.
require_once __DIR__ . '/../../vendor/yoast/phpunit-polyfills/phpunitpolyfills-autoload.php';

// Include wp-env bootstrap.php.
$_tests_dir = getenv( 'WP_TESTS_DIR' );
require $_tests_dir . '/includes/bootstrap.php';
