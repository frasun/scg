<?php
/**
 * Cert viewer block rendering tests.
 *
 * @package WordPress
 * @subpackage SCG
 */

/**
 * Tests for Cert viewer block
 *
 * @group blocks
 */
class CertViewerTest extends WP_UnitTestCase {
	/**
	 * Test moving block to footer.
	 *
	 * @covers \SCG\modify_cert_viewer_block_render
	 * @expectedDeprecated the_block_template_skip_link
	 */
	public function test_move_cert_viewer_to_footer() {
		$block_content = '<div class="wp-block-scg-cert-viewer"></div>';
		$result        = \SCG\modify_cert_viewer_block_render( $block_content );

		$this->assertSame( '', $result );

		ob_start();
		do_action( 'wp_footer' );
		$output = ob_get_clean();

		$this->assertStringContainsString( $block_content, $output );
	}
}
