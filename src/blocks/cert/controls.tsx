import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalInputControl as InputControl, // eslint-disable-line
	Button,
	__experimentalText as Text, // eslint-disable-line
	Flex,
	FlexItem,
} from '@wordpress/components';
import { Icon, page } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import type { BlockEditProps } from '@wordpress/blocks';
import type { CertBlock } from '.';

export default ( {
	setAttributes,
	attributes: { category, img, imgId, certId, certFilename, name },
}: BlockEditProps< CertBlock > ) => (
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
				onChange={ ( val ) => setAttributes( { category: val } ) }
				data-testid="category"
			/>
			<Flex className="components-base-control" direction="column">
				<FlexItem>
					<Text size={ 11 }>{ __( 'BADGE', 'scg' ) }</Text>
				</FlexItem>
				{ img && (
					<FlexItem className="wp-block-scg-cert__badge-control">
						<img src={ img } alt={ name } data-testid="img" />
					</FlexItem>
				) }
				<FlexItem>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( { id, url } ) => {
								setAttributes( {
									img: url,
									imgId: id,
								} );
							} }
							allowedTypes={ [ 'image' ] }
							value={ imgId }
							render={ ( { open } ) => (
								<Flex justify="start">
									<FlexItem>
										<Button
											onClick={ open }
											variant="secondary"
											data-testid="imgId"
										>
											{ imgId
												? __( 'Replace' )
												: __( 'Select' ) }
										</Button>
									</FlexItem>
									{ imgId && (
										<FlexItem>
											<Button
												isDestructive
												variant="secondary"
												onClick={ () =>
													setAttributes( {
														imgId: undefined,
														img: undefined,
													} )
												}
												data-testid="removeImg"
											>
												{ __( 'Remove' ) }
											</Button>
										</FlexItem>
									) }
								</Flex>
							) }
						/>
					</MediaUploadCheck>
				</FlexItem>
			</Flex>
			<Flex className="components-base-control" direction="column">
				<FlexItem>
					<Text size={ 11 }>{ __( 'DOCUMENT', 'scg' ) }</Text>
				</FlexItem>
				<FlexItem>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( { id, url, filename } ) => {
								setAttributes( {
									cert: url,
									certId: id,
									certFilename: filename,
								} );
							} }
							allowedTypes={ [ 'application/pdf' ] }
							value={ certId }
							render={ ( { open } ) => (
								<Flex direction="column">
									{ certFilename && (
										<FlexItem>
											<Flex justify="start">
												<FlexItem>
													<Icon icon={ page } />
												</FlexItem>
												<FlexItem>
													<Text
														weight="bold"
														data-testid="certFilename"
													>
														{ certFilename }
													</Text>
												</FlexItem>
											</Flex>
										</FlexItem>
									) }
									<FlexItem>
										<Flex justify="start">
											<FlexItem>
												<Button
													onClick={ open }
													variant="secondary"
													data-testid="certId"
												>
													{ certId
														? __( 'Replace' )
														: __( 'Select' ) }
												</Button>
											</FlexItem>
											{ certId && (
												<FlexItem>
													<Button
														isDestructive
														variant="secondary"
														onClick={ () =>
															setAttributes( {
																certId: undefined,
																cert: undefined,
																certFilename:
																	undefined,
															} )
														}
														data-testid="removeCertId"
													>
														{ __( 'Remove' ) }
													</Button>
												</FlexItem>
											) }
										</Flex>
									</FlexItem>
								</Flex>
							) }
						/>
					</MediaUploadCheck>
				</FlexItem>
			</Flex>
		</PanelBody>
	</InspectorControls>
);
