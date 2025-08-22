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

$context = array(
	'pdf'           => null,
	'page'          => null,
	'canvas'        => null,
	'canvasContext' => null,
);
?>
<div
	<?php echo get_block_wrapper_attributes(); // @codingStandardsIgnoreLine. ?>
	<?php echo wp_interactivity_data_wp_context( $context ); // @codingStandardsIgnoreLine. ?>
	data-wp-interactive="scg/cert"
	data-wp-init="callbacks.loadDocument"
>
	<canvas></canvas>
</div>