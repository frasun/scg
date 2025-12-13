import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	RichText,
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import Marker from './marker';
import type { BlockEditProps, TemplateArray } from '@wordpress/blocks';
import type { InnerBlocks } from '@wordpress/block-editor';
import type { DetailsBlock } from '.';

const TEMPLATE: TemplateArray = [
	[
		'core/columns',
		{
			metadata: { name: __( 'Content', 'scg' ) },
			templateLock: false,
			className: 'wp-block-scg-details__content',
		},
		[
			[
				'core/column',
				{},
				[
					[
						'core/paragraph',
						{
							fontSize: '32',
							content:
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dictum mollis enim at cursus',
						},
					],
				],
			],
			[
				'core/column',
				{},
				[
					[
						'core/paragraph',
						{
							content:
								'Vivamus vitae justo ac lorem varius tincidunt. Morbi porttitor magna at odio sagittis, efficitur iaculis tortor hendrerit. Nulla scelerisque id mauris in volutpat. Ut efficitur et magna vel gravida. In venenatis, augue sit amet congue blandit, ligula sapien sagittis nibh, non tempus neque dolor id velit.',
						},
					],
					[
						'core/paragraph',
						{
							content:
								'Suspendisse imperdiet, odio id fringilla pellentesque, lectus nibh feugiat eros, id gravida nunc neque cursus arcu. Vestibulum scelerisque interdum egestas. Suspendisse ultricies aliquam iaculis. Maecenas ac bibendum libero, eu placerat mauris.',
						},
					],
				],
			],
		],
	],
];

export default ( {
	attributes,
	setAttributes,
}: BlockEditProps< DetailsBlock > ) => {
	const { isOpen, summary, hasIcon, icon, iconId } = attributes;
	const blockProps = useBlockProps( {
		'data-open': isOpen.toString(),
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: TEMPLATE,
		templateLock: 'insert',
		className: 'wp-block-scg-details__content',
	} as InnerBlocks.Props & { className?: string } );

	return (
		<>
			{ hasIcon && (
				<BlockControls>
					<ToolbarGroup>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) => {
									setAttributes( {
										icon: media.url,
										iconId: media.id,
									} );
								} }
								allowedTypes={ [ 'image' ] }
								value={ iconId }
								render={ ( { open } ) => (
									<ToolbarButton onClick={ open }>
										{ icon
											? __( 'Replace icon' )
											: __( 'Select' ) }
									</ToolbarButton>
								) }
							/>
						</MediaUploadCheck>
					</ToolbarGroup>
				</BlockControls>
			) }
			<InspectorControls>
				<PanelBody>
					<ToggleControl
						__nextHasNoMarginBottom
						checked={ isOpen }
						label={ __( 'Open', 'scg' ) }
						onChange={ ( val ) => setAttributes( { isOpen: val } ) }
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						checked={ hasIcon }
						label={ __( 'Has icon', 'scg' ) }
						onChange={ ( val ) =>
							setAttributes( { hasIcon: val } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="wp-block-scg-details__summary">
					{ hasIcon && icon && (
						<img src={ icon } alt="icon" loading="lazy" />
					) }
					<div className="wp-block-scg-details__summary-title">
						<RichText
							identifier="summary"
							aria-label={ __(
								'Write summary. Press Enter to expand or collapse the details.'
							) }
							placeholder={ __( 'Section title', 'scg' ) }
							allowedFormats={ [] }
							// @ts-ignore
							withoutInteractiveFormatting
							disableLineBreaks
							value={ summary }
							onChange={ ( val ) =>
								setAttributes( { summary: val } )
							}
							tagName="p"
							spellCheck="false"
						/>
					</div>
					<Marker />
				</div>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
};
