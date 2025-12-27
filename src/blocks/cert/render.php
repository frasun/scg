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

defined( 'ABSPATH' ) || exit;

use function SCG\wp_kses_svg;

$context  = array(
	'certUrl' => $attributes['cert'] ?? false,
);
$category = $attributes['category'] ?? null;
$img      = $attributes['imgId'] ?? null;
$name     = $attributes['name'] ?? '';
?>
<div
	<?php echo get_block_wrapper_attributes(array('class' => 'is-layout-grid')); // @codingStandardsIgnoreLine. ?>
	<?php echo wp_interactivity_data_wp_context( $context ); // @codingStandardsIgnoreLine. ?>
	data-wp-interactive="scg/cert-viewer"
	data-wp-on--click="actions.onCertClick"
	tabindex="0">
		<?php if ( isset( $category ) ) : ?>
			<div class="wp-block-scg-cert__category"><span><?php echo esc_html( $category ); ?></span></div>
		<?php endif; ?>
		<div class="wp-block-scg-cert__details">
			<?php
			if ( isset( $img ) ) {
				echo wp_get_attachment_image(
					$img,
					'medium',
					true,
					array(
						'class' => 'wp-block-scg-cert__badge',
						'alt'   => $name,
					)
				);
			}
			?>
			<p class="wp-block-scg-cert__name"><?php echo esc_html( $name ); ?></p>
			<?php
			if ( isset( $attributes['cert'] ) ) {
				$marker = file_get_contents( get_theme_file_path( '/assets/images/marker-icon.svg') ); // @codingStandardsIgnoreLine.
				echo wp_kses_svg( $marker ); // @codingStandardsIgnoreLine.
			}
			?>
	</div>
</div>