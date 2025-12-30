<?php
/**
 * Header block rendering tests.
 *
 * @package WordPress
 * @subpackage SCG
 */

/**
 * Tests for Header block render
 *
 * @group blocks
 */
class HeaderTest extends WP_UnitTestCase {
	/**
	 * It is closed by default.
	 * Should have [data-open="false"] on main element and [aria-expanded="false"] on toggle element.
	 *
	 * @coversNothing
	 */
	public function test_is_open() {
		$block  = array(
			'blockName' => 'scg/header',
		);
		$output = render_block( $block );
		$tags   = new WP_HTML_Tag_Processor( $output );

		$tags->next_tag( array( 'class_name' => 'wp-block-scg-header' ) );
		$this->assertSame( 'false', $tags->get_attribute( 'data-is-open' ) );

		$tags->next_tag( array( 'class_name' => 'wp-block-scg-header__toggle' ) );
		$this->assertSame( 'false', $tags->get_attribute( 'aria-expanded' ) );
	}

	/**
	 * It changes state on scroll.
	 * Should have [data-is-scrolled="false"] and [data-wp-bind--data-is-scrolled, data-wp-on-document--scroll] on main element.
	 *
	 * @coversNothing
	 */
	public function test_is_scrolled() {
		$block  = array(
			'blockName' => 'scg/header',
			'attrs'     => array(
				'className' => 'is-style-transparent',
			),
		);
		$output = render_block( $block );
		$tags   = new WP_HTML_Tag_Processor( $output );

		$tags->next_tag( array( 'class_name' => 'wp-block-scg-header' ) );
		$this->assertSame( 'false', $tags->get_attribute( 'data-is-scrolled' ) );
		$this->assertSame( 'context.isScrolled', $tags->get_attribute( 'data-wp-bind--data-is-scrolled' ) );
		$this->assertSame( 'callbacks.onScroll', $tags->get_attribute( 'data-wp-on-document--scroll' ) );
	}
}
