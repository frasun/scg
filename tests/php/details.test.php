<?php
/**
 * Details block rendering tests.
 *
 * @package WordPress
 * @subpackage SCG
 */

/**
 * Tests for Details block render
 *
 * @group blocks
 */
class DetailsTest extends WP_UnitTestCase {
	/**
	 * Rendered block HTML Tag Processor object.
	 *
	 * @var WP_HTML_Tag_Processor
	 */
	private static $tags;

	/**
	 * Render block for tests
	 */
	public function set_up() {
		parent::set_up();

		$content = <<<HTML
			<!-- wp:scg/details {"isOpen":true} -->
			<div class="wp-block-scg-details">
				<div class="wp-block-scg-details__summary">
					<div class="wp-block-scg-details__summary-title">Summary</div>
				</div>
				<div class="wp-block-scg-details__content">Content</div>
			</div>
			<!-- /wp:scg/details -->
			HTML;

		$rendered   = do_blocks( $content );
		self::$tags = new WP_HTML_Tag_Processor( $rendered );
	}

	/**
	 * It can be open by default.
	 * Block container should have HTML attribute [data-open="true"].
	 *
	 * @covers SCG\modify_details_block_render
	 */
	public function test_is_open() {
		self::$tags->next_tag( array( 'class_name' => 'wp-block-scg-details' ) );
		$this->assertSame( self::$tags->get_attribute( 'data-open' ), 'true' );
	}

	/**
	 * It can be toggled.
	 * Block container should have HTML attribute [data-wp-bind--data-open] associated with isOpen value.
	 * Block summary element should have HTML attributes [data-wp-on--click, data-wp-on--keydown] with associated actions from the store.
	 *
	 * @covers SCG\modify_details_block_render
	 */
	public function test_toggle() {
		self::$tags->next_tag( array( 'class_name' => 'wp-block-scg-details' ) );
		$this->assertSame( self::$tags->get_attribute( 'data-wp-bind--data-open' ), 'context.isOpen' );

		self::$tags->next_tag( array( 'class_name' => 'wp-block-scg-details__summary' ) );
		$this->assertSame( self::$tags->get_attribute( 'data-wp-on--click' ), 'actions.toggle' );
		$this->assertSame( self::$tags->get_attribute( 'data-wp-on--keydown' ), 'actions.spaceToggle' );
	}


	/**
	 * Test accessibility by screen readers.
	 * Summary element should have [aria-expanded] defined by isOpen, [aria-controls] pointing to the content element, [role="button].
	 * Content elment should have [aria-labelby] pointing to the summary element, [aria-hidden] defined by !isOpen.
	 *
	 * @coversNothing
	 */
	public function test_aria() {
		self::$tags->next_tag( array( 'class_name' => 'wp-block-scg-details__summary' ) );
		$summary_id = self::$tags->get_attribute( 'id' );
		self::$tags->set_bookmark( 'summary' );

		$this->assertSame( self::$tags->get_attribute( 'aria-expanded' ), 'true' );
		$this->assertSame( self::$tags->get_attribute( 'data-wp-bind--aria-expanded' ), 'context.isOpen' );
		$this->assertSame( self::$tags->get_attribute( 'role' ), 'button' );

		self::$tags->next_tag( array( 'class_name' => 'wp-block-scg-details__content' ) );
		$content_id = self::$tags->get_attribute( 'id' );
		self::$tags->set_bookmark( 'content' );

		$this->assertSame( self::$tags->get_attribute( 'aria-hidden' ), 'false' );
		$this->assertSame( self::$tags->get_attribute( 'data-wp-bind--aria-hidden' ), '!context.isOpen' );

		self::$tags->seek( 'summary' );
		$this->assertSame( self::$tags->get_attribute( 'aria-controls' ), $content_id );

		self::$tags->seek( 'content' );
		$this->assertSame( self::$tags->get_attribute( 'aria-labelledby' ), $summary_id );
	}
}
