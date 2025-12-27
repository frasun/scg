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

$context = array(
	'value' => $attributes['value'] ?? 1000,
	'step'  => $attributes['step'] ?? 1,
);
$prefix  = $attributes['prefix'] ?? '+';
$suffix  = $attributes['suffix'] ?? '';
?>
<p
	<?php echo get_block_wrapper_attributes(array('class' => 'has-animations')); // @codingStandardsIgnoreLine. ?>
	<?php echo wp_interactivity_data_wp_context( $context ); // @codingStandardsIgnoreLine. ?>
	data-wp-interactive="scg/data-counter">
		<?php echo wp_kses_post( sprintf( '%1$s<span data-wp-init="callbacks.init">%2$s</span>%3$s', $prefix, 0, $suffix ) ); ?>
</p>