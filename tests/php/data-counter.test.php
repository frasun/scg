<?php
/**
 * Data Counter block rendering tests.
 *
 * @package WordPress
 * @subpackage SCG
 */

/**
 * Tests for Data Counter block render
 *
 * @group blocks
 */
class DataCounterTest extends WP_UnitTestCase {
	/**
	 * It displays prefix and suffix if provided
	 *
	 * @dataProvider prefix_suffix_provider
	 * @coversNothing
	 *
	 * @param string|null $prefix Prefix value.
	 * @param string|null $suffix Suffix value.
	 * @param string      $expected_before Expected output with given prefix.
	 * @param string      $expected_after Expected output with given suffix.
	 */
	public function test_prefix_and_suffix( $prefix, $suffix, $expected_before, $expected_after ) {
		$block = array(
			'blockName' => 'scg/data-counter',
			'attrs'     => array(
				'prefix' => $prefix,
				'suffix' => $suffix,
			),
		);

		$output = render_block( $block );

		$this->assertStringContainsString( $expected_before, $output );
		$this->assertStringContainsString( $expected_after, $output );
	}

	/**
	 * Different set of prefixes and suffixes
	 */
	public function prefix_suffix_provider() {
		return array(
			'both prefix and suffix' => array(
				'test',
				'test',
				'test<span',
				'</span>test',
			),
			'only prefix'            => array(
				'Before: ',
				'',
				'Before: <span',
				'</span>',
			),
			'only suffix'            => array(
				'',
				' items',
				'<span',
				'</span> items',
			),
			'empty both'             => array(
				null,
				null,
				'<span',
				'</span>',
			),
		);
	}

	/**
	 * It animates value when in view. Should render 0 value and a wp-init directive.
	 *
	 * @dataProvider init_value_provider
	 * @coversNothing
	 *
	 * @param number $value End display value.
	 */
	public function test_init_value( $value ) {
		$block = array(
			'blockName' => 'scg/data-counter',
			'attrs'     => array(
				'value' => $value,
			),
		);

		$output = render_block( $block );

		$this->assertStringContainsString( '<span data-wp-init="callbacks.init">0</span>', $output );
	}

	/**
	 * Different set of initial values
	 */
	public function init_value_provider() {
		return array(
			'1000'    => array( 1000 ),
			'100'     => array( 100 ),
			'10'      => array( 10 ),
			'1000000' => array( 1000000 ),
			'1'       => array( 1 ),
		);
	}
}
