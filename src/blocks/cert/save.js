import { useBlockProps } from '@wordpress/block-editor';
import Marker from './marker';

export default ( { attributes } ) => {
	const { name, category, img, certId } = attributes;
	const blockProps = useBlockProps.save( { className: 'is-layout-grid' } );

	return (
		<div { ...blockProps }>
			<div className="wp-block-scg-cert__category">{ category }</div>
			<div className="wp-block-scg-cert__details is-layout-flex ">
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
	);
};
