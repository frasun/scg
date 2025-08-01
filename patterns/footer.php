<?php
/**
 * Title: Site Footer
 * Slug: scg/footer
 * Categories: footer
 *
 * @package WordPress
 * @subpackage SCG
 */

?>
<!-- wp:group {"layout":{"type":"constrained"},"style":{"spacing":{"padding":{"top":"var:preset|spacing|128","bottom":"var:preset|spacing|128"},"blockGap":"var:preset|spacing|128"}},"backgroundColor":"base","textColor":"white"} -->
<div class="wp-block-group is-layout-constrained has-base-background-color has-background has-white-color has-text-color" style="padding-top:var(--wp--preset--spacing--128);padding-bottom:var(--wp--preset--spacing--128);">
	<!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|32-fixed","left":"var:preset|spacing|32-fixed"}}}} -->
	<div class="wp-block-columns are-vertically-aligned-center">
		<!-- wp:column {"verticalAlignment":"center"} -->
		<div class="wp-block-column is-vertically-aligned-center">
			<!-- wp:paragraph {"style":{"layout":{"selfStretch":"fill","flexSize":null}},"fontSize":"80","fontFamily":"headings"} -->
			<p class="has-headings-font-family has-80-font-size">Transport<br><mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-accent-color">Excellence</mark></p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->
		<!-- wp:column {"verticalAlignment":"center"} -->
		<div class="wp-block-column is-vertically-aligned-center">
			<!-- wp:paragraph {"style":{"layout":{"selfStretch":"fill","flexSize":null}},"fontSize":"32"} -->
			<p class="has-32-font-size">For all inquires please contact us at <strong>contact@scgtransport.com</strong> <br>or <strong>0048 539 926 274</strong></p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
	<!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"},"className":"scg-footer__bottom","fontSize":"14"} -->
	<div class="wp-block-group scg-site-footer__bottom has-14-font-size">
		<!-- wp:group {"className":"scg-site-footer__bottom","layout":{"type":"flex","flexWrap":"wrap"}} -->
		<div class="wp-block-group scg-site-footer__bottom">
			<!-- wp:scg/logo {"isLink":false, "className": "is-style-secondary"} /-->
			<!-- wp:paragraph -->
			<p>&copy; <?php echo esc_html( sprintf( '%1$s %2$s %3$s', __( 'Copyright', 'scg' ), gmdate( 'Y' ), get_bloginfo( 'name' ) ) ); ?></p>
			<!-- /wp:paragraph -->
			<!-- wp:navigation {"overlayMenu":"never"} -->
				<!-- wp:navigation-link {"label":"Privacy Policy","type":"page","url":"#","kind":"post-type"} /-->
				<!-- wp:navigation-link {"label":"Terms and conditions","type":"page","url":"#","kind":"post-type"} /-->
			<!-- /wp:navigation -->
		</div>
		<!-- /wp:group -->
		<!-- wp:template-part {"slug":"social-media-links","theme":"scg"} /-->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->