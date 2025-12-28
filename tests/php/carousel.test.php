<?php
/**
 * Carousel block rendering tests.
 *
 * @package WordPress
 * @subpackage SCG
 */

/**
 * Tests for Carousel block
 *
 * @group blocks
 */
class CarouselTest extends WP_UnitTestCase {
	/**
	 * It has inifinite loop animation.
	 * Should add iAPI directives.
	 *
	 * @coversNothing
	 */
	public function test_loop() {
		$content = <<<HTML
			<!-- wp:scg/carousel -->
			<div class="wp-block-scg-carousel">
				<div class="wp-block-scg-carousel__wrapper"></div>
			</div>
			<!-- /wp:scg/details -->
			HTML;

		$output = do_blocks( $content );
		$tags   = new WP_HTML_Tag_Processor( $output );

		$tags->next_tag( array( 'class_name' => 'wp-block-scg-carousel' ) );

		$this->assertSame( 'scg/carousel', $tags->get_attribute( 'data-wp-interactive' ) );
		$this->assertSame( 'callbacks.initCarousel', $tags->get_attribute( 'data-wp-init' ) );
	}
}
