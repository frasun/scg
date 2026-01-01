<?php
/**
 * Accordion block rendering tests.
 *
 * @package WordPress
 * @subpackage SCG
 */

/**
 * Tests for Accordion block render
 *
 * @group blocks
 */
class AccordionTest extends WP_UnitTestCase {
	/**
	 * HTML Tag Processor object.
	 *
	 * @var WP_HTML_Tag_Processor
	 */
	private static $tags;

	/**
	 * Rendered block HTML Tag Processor object.
	 *
	 * @var string
	 */
	private static $rendered;

	/**
	 * Render block for tests.
	 */
	public static function set_up_before_class() {
		/**
		 * Render the set of sample elements:
		 * [1] accordion with two children scg/details elements that both have {isOpen: true}
		 * [2] accordion with two children scg/details elements with the 2nd one with {isOpen: true}
		 * [3] accordion with two children scg/details elements without isOpen set
		 */
		$content = <<<'HTML'
			<!-- wp:scg/accordion -->
			<div class="wp-block-scg-accordion">
				<!-- wp:scg/details {"isOpen":true} -->
				<div class="wp-block-scg-details">
					<div class="wp-block-scg-details__summary">
						<div class="wp-block-scg-details__summary-title">Summary</div>
					</div>
					<div class="wp-block-scg-details__content">Content</div>
				</div>
				<!-- /wp:scg/details -->
				<!-- wp:scg/details {"isOpen":true} -->
				<div class="wp-block-scg-details">
					<div class="wp-block-scg-details__summary">
						<div class="wp-block-scg-details__summary-title">Summary</div>
					</div>
					<div class="wp-block-scg-details__content">Content</div>
				</div>
				<!-- /wp:scg/details -->
			</div>
			<!-- /wp:scg/accordion -->
			<!-- wp:scg/accordion -->
			<div class="wp-block-scg-accordion">
				<!-- wp:scg/details -->
				<div class="wp-block-scg-details">
					<div class="wp-block-scg-details__summary">
						<div class="wp-block-scg-details__summary-title">Summary</div>
					</div>
					<div class="wp-block-scg-details__content">Content</div>
				</div>
				<!-- /wp:scg/details -->
				<!-- wp:scg/details {"isOpen":true} -->
				<div class="wp-block-scg-details">
					<div class="wp-block-scg-details__summary">
						<div class="wp-block-scg-details__summary-title">Summary</div>
					</div>
					<div class="wp-block-scg-details__content">Content</div>
				</div>
				<!-- /wp:scg/details -->
			</div>
			<!-- /wp:scg/accordion -->
			 <!-- wp:scg/accordion -->
			<div class="wp-block-scg-accordion">
				<!-- wp:scg/details -->
				<div class="wp-block-scg-details">
					<div class="wp-block-scg-details__summary">
						<div class="wp-block-scg-details__summary-title">Summary</div>
					</div>
					<div class="wp-block-scg-details__content">Content</div>
				</div>
				<!-- /wp:scg/details -->
				<!-- wp:scg/details -->
				<div class="wp-block-scg-details">
					<div class="wp-block-scg-details__summary">
						<div class="wp-block-scg-details__summary-title">Summary</div>
					</div>
					<div class="wp-block-scg-details__content">Content</div>
				</div>
				<!-- /wp:scg/details -->
			</div>
			<!-- /wp:scg/accordion -->
			HTML;

		self::$rendered = do_blocks( $content );
	}

	/**
	 * Initiate HTML Tag Processor object for testing
	 */
	public function set_up() {
		parent::set_up();

		self::$tags = new WP_HTML_Tag_Processor( self::$rendered );
	}

	/**
	 * All children scg/details elements should have associated accordion in [data-wp-context].
	 *
	 * @coversNothing
	 */
	public function test_children() {
		while ( self::$tags->next_tag( array( 'tag_closers' => 'skip' ) ) ) {
			if ( self::$tags->has_class( 'wp-block-scg-accordion' ) ) {
				$name  = null;
				$index = 0;
			}

			if ( self::$tags->has_class( 'wp-block-scg-details' ) ) {
				$context = json_decode( self::$tags->get_attribute( 'data-wp-context' ), true );

				if ( $name ) {
					$this->assertSame( $name, $context['accordion'] );
				} else {
					$name = $context['accordion'];
				}

				$this->assertSame( ++$index, $context['key'] );
			}
		}
	}

	/**
	 * Only one child at a time can be expanded.
	 * Interactivity state should be set for all accordions.
	 *
	 * @coversNothing
	 */
	public function test_state() {
		$accordions = array();

		while ( self::$tags->next_tag( array( 'tag_closers' => 'skip' ) ) ) {
			if ( self::$tags->has_class( 'wp-block-scg-accordion' ) ) {
				$name = null;
			}

			if ( self::$tags->has_class( 'wp-block-scg-details' ) ) {
				$context = json_decode( self::$tags->get_attribute( 'data-wp-context' ), true );

				if ( ! $name ) {
					$name = $context['accordion'];
					array_push( $accordions, $name );
				}
			}
		}

		$expected = array(
			$accordions[0] => array( 1, 2 ),        // [1]
			$accordions[1] => array( 2 ),           // [2]
			$accordions[2] => array(),              // [3]
		);

		$this->assertEquals( $expected, wp_interactivity_state( 'scg/details' ) );
	}

	/**
	 * Only one child at a time can be expanded.
	 * Summary elements of scg/details inside accordion should use emitToggle events.
	 *
	 * @coversNothing
	 */
	public function test_emit_toggle() {
		while ( self::$tags->next_tag( array( 'tag_closers' => 'skip' ) ) ) {
			if ( self::$tags->has_class( 'wp-block-scg-details__summary' ) ) {
				$this->assertSame( 'actions.emitToggle', self::$tags->get_attribute( 'data-wp-on--click' ) );
				$this->assertSame( 'actions.emitSpaceToggle', self::$tags->get_attribute( 'data-wp-on--keydown' ) );
			}
		}
	}
}
