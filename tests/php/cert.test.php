<?php
/**
 * Cert block rendering tests.
 *
 * @package WordPress
 * @subpackage SCG
 */

use function SCG\wp_kses_svg;

/**
 * Tests for Cert block
 *
 * @group blocks
 */
class CertTest extends WP_UnitTestCase {
	/**
	 * It displays category if provided.
	 * Should render category element.
	 *
	 * @coversNothing
	 */
	public function test_category() {
		$test_category = 'test';
		$block         = array(
			'blockName' => 'scg/cert',
			'attrs'     => array(
				'category' => $test_category,
			),
		);

		$output   = render_block( $block );
		$expected = "<div class=\"wp-block-scg-cert__category\"><span>{$test_category}</span></div>";

		$this->assertStringContainsString( $expected, $output );
	}

	/**
	 * It displays cert image if provided.
	 * Should render image element.
	 *
	 * @coversNothing
	 */
	public function test_badge() {
		$test_name = 'test';
		$img_id    = $this->factory()->attachment->create_object(
			array(
				'file'           => 'test-image.jpg',
				'post_mime_type' => 'image/jpeg',
				'post_title'     => 'Test Image',
			)
		);

		$block = array(
			'blockName' => 'scg/cert',
			'attrs'     => array(
				'imgId' => $img_id,
				'name'  => $test_name,
			),
		);

		$output             = render_block( $block );
		$expected_element   = 'wp-block-scg-cert__badge';
		$expected_image_url = wp_get_attachment_url( $img_id );
		$expected_image_alt = "alt=\"{$test_name}\"";

		$this->assertStringContainsString( $expected_element, $output );
		$this->assertStringContainsString( $expected_image_url, $output );
		$this->assertStringContainsString( $expected_image_alt, $output );
	}

	/**
	 * It displays marker icon if links to a certificate.
	 * Should render marker element.
	 *
	 * @coversNothing
	 */
	public function test_marker() {
		$marker = wp_kses_svg( file_get_contents( get_theme_file_path( '/assets/images/marker-icon.svg' ) ) ); // @codingStandardsIgnoreLine.
		$block  = array(
			'blockName' => 'scg/cert',
			'attrs'     => array(
				'cert' => 'test',
			),
		);

		$output = render_block( $block );

		$this->assertStringContainsString( $marker, $output );
	}

	/**
	 * It doesn't display elements if attributes not explicitly set.
	 *
	 * @coversNothing
	 */
	public function test_default() {
		$marker = wp_kses_svg( file_get_contents( get_theme_file_path( '/assets/images/marker-icon.svg' ) ) ); // @codingStandardsIgnoreLine.
		$block  = array(
			'blockName' => 'scg/cert',
		);

		$output = render_block( $block );

		$this->assertStringNotContainsString( 'wp-block-scg-cert__category', $output );
		$this->assertStringNotContainsString( 'wp-block-scg-cert__badge', $output );
		$this->assertStringNotContainsString( $marker, $output );
	}

	/**
	 * It opens modal with certificate.
	 * Should have directives [data-wp-interactive, data-wp-on--click] and [data-wp-context={certUrl:$cert}].
	 *
	 * @coversNothing
	 */
	public function test_modal() {
		$test_cert = 'test';
		$block     = array(
			'blockName' => 'scg/cert',
			'attrs'     => array(
				'cert' => $test_cert,
			),
		);

		$output = render_block( $block );
		$tags   = new WP_HTML_Tag_Processor( $output );

		$tags->next_tag( array( 'class_name' => 'wp-block-scg-cert' ) );

		$this->assertSame( 'scg/cert-viewer', $tags->get_attribute( 'data-wp-interactive' ) );
		$this->assertSame( 'actions.onCertClick', $tags->get_attribute( 'data-wp-on--click' ) );

		$context = json_decode( $tags->get_attribute( 'data-wp-context' ), true );
		$this->assertSame( $test_cert, $context['certUrl'] );
	}
}
