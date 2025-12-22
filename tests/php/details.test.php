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
	 * It can be open by default.
	 * Block container should have HTML attribute [data-open="true"].
	 *
	 * @covers SCG\modify_details_block_render
	 */
	public function test_is_open() {
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

		$rendered = do_blocks( $content );
		$tags     = new WP_HTML_Tag_Processor( $rendered );

		$tags->next_tag( array( 'class_name' => 'wp-block-scg-details' ) );
		$this->assertSame( $tags->get_attribute( 'data-open' ), 'true' );
	}

	/**
	 * It can be toggled.
	 * Block container should have HTML attribute [data-wp-bind--data-open] associated with isOpen value.
	 * Block summary element should have HTML attributes [data-wp-on--click, data-wp-on--keydown] with associated actions from the store.
	 *
	 * @covers SCG\modify_details_block_render
	 */
	public function test_toggle() {
		$content = <<<HTML
			<!-- wp:scg/details -->
			<div class="wp-block-scg-details">
				<div class="wp-block-scg-details__summary">
					<div class="wp-block-scg-details__summary-title">Summary</div>
				</div>
				<div class="wp-block-scg-details__content">Content</div>
			</div>
			<!-- /wp:scg/details -->
			HTML;

		$rendered = do_blocks( $content );
		$tags     = new WP_HTML_Tag_Processor( $rendered );

		$tags->next_tag( array( 'class_name' => 'wp-block-scg-details' ) );
		$this->assertSame( $tags->get_attribute( 'data-wp-bind--data-open' ), 'context.isOpen' );

		$tags->next_tag( array( 'class_name' => 'wp-block-scg-details__summary' ) );
		$this->assertSame( $tags->get_attribute( 'data-wp-on--click' ), 'actions.toggle' );
		$this->assertSame( $tags->get_attribute( 'data-wp-on--keydown' ), 'actions.spaceToggle' );
	}
}
