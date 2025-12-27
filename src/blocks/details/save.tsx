import { __ } from '@wordpress/i18n';
import {
	useInnerBlocksProps,
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';
import MarkerIcon from './marker';
import type { BlockSaveProps } from '@wordpress/blocks';
import type { DetailsBlock } from '.';

export const DEFAULT_TITLE = __( 'SCG Details', 'scg' );

export default ( { attributes }: BlockSaveProps< DetailsBlock > ) => {
	const { icon, hasIcon } = attributes;
	const title =
		! attributes.summary || ! attributes.summary.trim().length
			? DEFAULT_TITLE
			: attributes.summary;

	return (
		<div { ...useBlockProps.save() }>
			<div className="wp-block-scg-details__summary">
				{ hasIcon && icon && (
					<img
						src={ icon }
						alt="icon"
						loading="lazy"
						width={ 48 }
						height={ 48 }
					/>
				) }
				<div className="wp-block-scg-details__summary-title">
					<RichText.Content value={ title } tagName="p" />
				</div>
				<MarkerIcon />
			</div>
			<div
				{ ...useInnerBlocksProps.save( {
					className: 'wp-block-scg-details__content',
				} ) }
			/>
		</div>
	);
};
