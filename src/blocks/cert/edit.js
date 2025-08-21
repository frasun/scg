import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	__experimentalInputControl as InputControl, // eslint-disable-line
	Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Marker from './marker';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: 'is-layout-grid',
	} );
	const { name, category, img, imgId, certId } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Certificate details' ) }>
					<InputControl
						__next40pxDefaultSize
						label={ __( 'Name', 'scg' ) }
						value={ name }
						onChange={ ( val ) => setAttributes( { name: val } ) }
					/>
					<InputControl
						__next40pxDefaultSize
						label={ __( 'Category', 'scg' ) }
						value={ category }
						onChange={ ( val ) =>
							setAttributes( { category: val } )
						}
					/>
					<PanelRow title={ __( 'Badge', 'scg' ) }>
						{ img && <img src={ img } alt={ name } /> }
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) => {
									setAttributes( {
										img: media.url,
										imgId: media.id,
									} );
								} }
								allowedTypes={ [ 'image' ] }
								value={ imgId }
								render={ ( { open } ) => (
									<Button
										variant="secondary"
										onClick={ open }
									>
										{ imgId
											? __( 'Replace' )
											: __( 'Select' ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
					</PanelRow>
					<PanelRow title={ __( 'File', 'scg' ) }>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) => {
									setAttributes( {
										cert: media.url,
										certId: media.id,
									} );
								} }
								allowedTypes={ [ 'application/pdf', 'image' ] }
								value={ certId }
								render={ ( { open } ) => (
									<Button
										variant="secondary"
										onClick={ open }
									>
										{ certId
											? __( 'Replace' )
											: __( 'Select' ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
						{ certId && (
							<Button
								onClick={ () =>
									setAttributes( {
										certId: undefined,
										cert: undefined,
									} )
								}
							>
								{ __( 'Remove' ) }
							</Button>
						) }
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ category && (
					<div className="wp-block-scg-cert__category">
						{ category }
					</div>
				) }
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
		</>
	);
}
