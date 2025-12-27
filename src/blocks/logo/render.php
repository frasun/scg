<?php
/**
 * SCG Logo block
 *
 * @package WordPress
 * @subpackage SCG
 */

defined( 'ABSPATH' ) || exit;

use function SCG\wp_kses_svg;

$wrapper_attributes = get_block_wrapper_attributes();

$logo_file = file_get_contents( get_theme_file_path( '/assets/images/logo.svg') ); // @codingStandardsIgnoreLine.
?>

<?php if ( $attributes['isLink'] ) : ?>
	<?php
		$url = isset( $attributes['url'] ) ? $attributes['url'] : get_home_url();
	?>
	<a href="<?php echo esc_url( $url ); ?>" <?php echo wp_kses_data( $wrapper_attributes ); ?> aria-label="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
		<?php echo wp_kses_svg( $logo_file ); // @codingStandardsIgnoreLine. ?>
	</a>
<?php else : ?>
	<div <?php echo wp_kses_data( $wrapper_attributes ); ?>>
		<?php echo wp_kses_svg( $logo_file ); // @codingStandardsIgnoreLine. ?>
	</div>
<?php endif; ?>