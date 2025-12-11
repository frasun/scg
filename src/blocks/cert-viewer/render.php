<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 * @package SCG
 */

use function SCG\wp_kses_svg;

// Initial block context.
$context = array(
	'pdf'           => null,
	'page'          => null,
	'canvas'        => null,
	'canvasContext' => null,
);

$icons = array(
	'prev' => file_get_contents( get_theme_file_path( '/assets/images/prev-icon.svg') ), // @codingStandardsIgnoreLine
	'next' => file_get_contents( get_theme_file_path( '/assets/images/next-icon.svg') ), // @codingStandardsIgnoreLine
	'zoom_in' => file_get_contents( get_theme_file_path( '/assets/images/zoom-in-icon.svg') ), // @codingStandardsIgnoreLine
	'zoom_out' => file_get_contents( get_theme_file_path( '/assets/images/zoom-out-icon.svg') ), // @codingStandardsIgnoreLine
)
?>
<div
	role="dialog"
	aria-modal="true"
	aria-label="<?php esc_html_e( 'Certificate viewer', 'scg' ); ?>"
	<?php echo get_block_wrapper_attributes(); // @codingStandardsIgnoreLine. ?>
	<?php echo wp_interactivity_data_wp_context( $context ); // @codingStandardsIgnoreLine. ?>
	data-wp-interactive="scg/cert-viewer"
	data-wp-watch--url="callbacks.handleUrlChange"
	data-wp-watch--open="callbacks.handleModalOpen"
	data-wp-bind--hidden="!state.isModalOpen"
	data-wp-bind--inert="!state.isModalOpen"
	data-wp-on-async-document--keydown="callbacks.escClose"
	data-wp-init--animation="callbacks.setupAnimation"
	data-wp-init="callbacks.setupPDFJS"
	hidden>
	<div class="wp-block-scg-cert-viewer__modal" data-wp-bind--hidden="state.documentLoading">
		<div class="wp-block-scg-cert-viewer__canvas" tabindex="0">
			<div class="wp-block-scg-cert-viewer__error" data-wp-bind--hidden="!state.error" aria-hidden="!state.error" role="alert"><?php esc_html_e( 'A problem occured while loading this document. Please try again later.', 'scg' ); ?></div>
			<canvas data-wp-bind--hidden="state.error" aria-hidden="state.error" aria-label="Certificate document"></canvas>
		</div>
		<button class="wp-block-scg-cert-viewer__control wp-block-scg-cert-viewer__control--prev" type="button" data-wp-on-async--click="actions.prevPage" data-wp-bind--disabled="!state.hasPrevPage" data-wp-bind--hidden="!state.hasPages" wp-bind--inert="!state.hasPrevPage" aria-label="<?php esc_html_e( 'Previous page', 'scg' ); ?>">
			<?php echo wp_kses_svg( $icons['prev'] ); // @codingStandardsIgnoreLine. ?>
		</button>
		<button class="wp-block-scg-cert-viewer__control wp-block-scg-cert-viewer__control--next" type="button" data-wp-on-async--click="actions.nextPage" data-wp-bind--disabled="!state.hasNextPage" data-wp-bind--hidden="!state.hasPages" wp-bind--inert="!state.hasNextPage" aria-label="<?php esc_html_e( 'Next page', 'scg' ); ?>">
			<?php echo wp_kses_svg( $icons['next'] ); // @codingStandardsIgnoreLine. ?>
		</button>
		<button class="wp-block-scg-cert-viewer__control wp-block-scg-cert-viewer__control--close" type="button" data-wp-on-async--click="actions.closeModal" aria-label="<?php esc_html_e( 'Close', 'scg' ); ?>"></button>
		<button class="wp-block-scg-cert-viewer__control wp-block-scg-cert-viewer__control--zoom-in" type="button" data-wp-on-async--click="actions.zoomIn" data-wp-bind--disabled="!state.canZoomIn" data-wp-bind--hidden="state.error" wp-bind--inert="state.error" aria-label="<?php esc_html_e( 'Zoom In', 'scg' ); ?>">
			<?php echo wp_kses_svg( $icons['zoom_in'] ); // @codingStandardsIgnoreLine. ?>
		</button>
		<button class="wp-block-scg-cert-viewer__control wp-block-scg-cert-viewer__control--zoom-out" type="button" data-wp-on-async--click="actions.zoomOut" data-wp-bind--disabled="!state.canZoomOut" data-wp-bind--hidden="state.error" wp-bind--inert="state.error" aria-label="<?php esc_html_e( 'Zoom Out', 'scg' ); ?>">
			<?php echo wp_kses_svg( $icons['zoom_out'] ); // @codingStandardsIgnoreLine. ?>
		</button>
	</div>
	<div class="wp-block-scg-cert-viewer__loading" data-wp-bind--hidden="!state.isLoading" aria-hidden="!state.isLoading" role="status">
		<img src="<?php echo esc_attr( get_theme_file_uri( '/assets/images/spinner.svg' ) ); ?>" alt="Loading" aria-hidden="true" />
		<span class="sr-only"><?php esc_html_e( 'Loading', 'scg' ); ?></span>
	</div>
	<div class="wp-block-scg-cert-viewer__backdrop"></div>
</div>