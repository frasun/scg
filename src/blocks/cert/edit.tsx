import { useBlockProps } from '@wordpress/block-editor';
import Marker from './marker';
import Controls from './controls';
import type { BlockEditProps } from '@wordpress/blocks';
import type { CertBlock } from '.';

export default ( props: BlockEditProps< CertBlock > ) => {
	const blockProps = useBlockProps( {
		className: 'is-layout-grid',
	} );
	const { name, category, img, certId } = props.attributes;

	return (
		<>
			<Controls { ...props } />
			<div { ...blockProps }>
				{ category && (
					<div className="wp-block-scg-cert__category">
						{ category }
					</div>
				) }
				<div className="wp-block-scg-cert__details">
					{ img && (
						<img
							src={ img }
							alt={ name }
							className="wp-block-scg-cert__badge"
							loading="lazy"
						/>
					) }
					<p className="wp-block-scg-cert__name">{ name }</p>
					{ certId && <Marker /> }
				</div>
			</div>
		</>
	);
};
