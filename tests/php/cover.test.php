<?php
/**
 * Cover block tests.
 *
 * @package WordPress
 * @subpackage SCG
 */

use function SCG\add_responsive_section_images;

/**
 * Tests for core/cover block extension
 *
 * @group blocks
 */
class CoverTest extends WP_UnitTestCase {
	/**
	 * Rendered block HTML Tag Processor object.
	 *
	 * @var string
	 */
	private static $rendered;

	/**
	 * Cover block background image fixture
	 *
	 * @var array<string,mixed>
	 */
	private static $img_url;

	/**
	 * Render block before all tests.
	 */
	public static function set_up_before_class() {
		$img_id  = self::factory()->attachment->create_object(
			array(
				'file'           => 'test-image.jpg',
				'post_mime_type' => 'image/jpeg',
				'post_title'     => 'Test Image',
			)
		);
		$img_url = wp_get_attachment_url( $img_id );

		$block = <<<HTML
		<!-- wp:cover {"url":"{$img_url}","id":{$img_id},"hasParallax":true,"minHeight":100,"minHeightUnit":"vh","className":"is-style-page-splash"} -->
		<div class="wp-block-cover has-parallax is-style-page-splash" style="min-height:100vh">
			<div class="wp-block-cover__image-background wp-image-{$img_id} has-parallax" style="background-image:url({$img_url})"></div>
		</div>
		<!-- /wp::cover -->
		HTML;

		self::$rendered = do_blocks( $block );
		self::$img_url  = array(
			'medium' => wp_get_attachment_image_url( $img_id, 'medium' ) ?? false,
			'large'  => wp_get_attachment_image_url( $img_id, 'large' ) ?? false,
		);
	}

	/**
	 * It should set 100% height CSS variable.
	 *
	 * @coversNothing
	 */
	public function test_set_height() {
		$tags = new \WP_HTML_Tag_Processor( self::$rendered );
		$tags->next_tag( array( 'class_name' => 'is-style-page-splash' ) );
		$style   = $tags->get_attribute( 'style' );
		$css_var = 'var(--viewport-height)';

		$this->assertStringContainsString( $css_var, $style );
		$this->assertStringNotContainsString( 'min-height:100vh', $style );
	}

	/**
	 * It should add styles with responsive images for block background.
	 *
	 * @covers SCG\add_responsive_section_images
	 */
	public function test_splash_images() {
		ob_start();
		add_responsive_section_images();
		$css    = ob_get_clean();
		$medium = self::$img_url['medium'];
		$large  = self::$img_url['large'];

		$this->assertStringContainsString( "background-image: url('{$medium}')", $css );
		$this->assertStringContainsString( "background-image: url('{$large}')", $css );
	}
}
