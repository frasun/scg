<?php
/**
 * Contact block rendering tests.
 *
 * @package WordPress
 * @subpackage SCG
 */

/**
 * Tests for Contact block
 *
 * @group blocks
 */
class ContactTest extends WP_UnitTestCase {
	/**
	 * It displays map when coordinations are provided.
	 * Should pass Google Maps API key, Map ID to block and lat/lng coords to block.
	 *
	 * @coversNothing
	 */
	public function test_map() {
		$test_api_key = 'test-api-key-123';
		$test_map_id  = 'test-map-id-456';
		$test_lat     = 1.21345;
		$test_lng     = 123.1234;

		update_option( 'google_maps_api_key', $test_api_key );
		update_option( 'google_maps_map_id', $test_map_id );

		$content = <<<HTML
			<!-- wp:scg/contact {"lat":{$test_lat},"lng":{$test_lng}} -->
			<div class="wp-block-scg-contact">
				<div class="wp-block-scg-contact__content"></div>
				<div class="wp-block-scg-contact__map"></div>
			</div>
			<!-- /wp:scg/contact -->
			HTML;

		$rendered = do_blocks( $content );
		$tags     = new WP_HTML_Tag_Processor( $rendered );

		$tags->next_tag( array( 'class_name' => 'wp-block-scg-contact' ) );
		$this->assertSame( 'scg/contact', $tags->get_attribute( 'data-wp-interactive' ) );

		$context = json_decode( $tags->get_attribute( 'data-wp-context' ), true );
		$this->assertSame( $test_api_key, $context['apiKey'] );
		$this->assertSame( $test_map_id, $context['mapId'] );
		$this->assertSame( $test_lat, $context['lat'] );
		$this->assertSame( $test_lng, $context['lng'] );

		$tags->next_tag( array( 'class_name' => 'wp-block-scg-contact__map' ) );
		$this->assertSame( 'callbacks.setupMaps', $tags->get_attribute( 'data-wp-init' ) );
	}
}
