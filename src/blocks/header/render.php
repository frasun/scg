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

// Generates a unique id for aria-controls.
$unique_id = wp_unique_id( 'p-' );
$context   = array(
	'isOpen'     => false,
	'isScrolled' => false,
);

?>
<div
	<?php echo get_block_wrapper_attributes(array('class' => 'has-animations')); // @codingStandardsIgnoreLine. ?>
	<?php echo wp_interactivity_data_wp_context( $context ); // @codingStandardsIgnoreLine. ?>
	data-wp-interactive="scg/header"
	data-wp-bind--data-is-open="context.isOpen"
	data-wp-on-window--resize="callbacks.onResize"
	data-wp-watch="callbacks.onChange"
	data-wp-init="callbacks.onInit">
	<div class="wp-block-scg-header__bg--scroll"></div>
	<div class="wp-block-scg-header__bg"></div>
	<?php echo wp_kses_svg( $content ); // @codingStandardsIgnoreLine. ?>
	<button
		class="wp-block-scg-header__toggle"
		data-wp-on--click="actions.toggleOpen"
		aria-label="<?php esc_attr_e( 'Toggle menu', 'scg' ); ?>"
		aria-controls="<?php echo esc_attr( $unique_id ); ?>"
		data-wp-bind--aria-expanded="context.isOpen"></button>
</div>