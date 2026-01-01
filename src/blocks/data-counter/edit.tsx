import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalNumberControl as NumberControl, // eslint-disable-line
	__experimentalInputControl as InputControl, // eslint-disable-line
} from '@wordpress/components';
import formatNumber from './format';
import type { BlockEditProps } from '@wordpress/blocks';
import type { DataCounterBlock } from '.';

export default ( {
	attributes,
	setAttributes,
}: BlockEditProps< DataCounterBlock > ) => {
	const { value, step, prefix, suffix } = attributes;
	const displayedValue = formatNumber( value, document.documentElement.lang );
	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Data point', 'scg' ) }>
					<NumberControl
						__next40pxDefaultSize
						label={ __( 'Numerical value', 'scg' ) }
						value={ value }
						onChange={ ( val ) =>
							setAttributes( { value: Number( val ) } )
						}
						data-testid="value"
					/>
					<NumberControl
						__next40pxDefaultSize
						label={ __( 'Increment by', 'scg' ) }
						value={ step }
						onChange={ ( val ) =>
							setAttributes( { step: Number( val ) } )
						}
						data-testid="step"
					/>
					<InputControl
						__next40pxDefaultSize
						label={ __( 'Prefix', 'scg' ) }
						value={ prefix }
						onChange={ ( val ) => setAttributes( { prefix: val } ) }
						data-testid="prefix"
					/>
					<InputControl
						__next40pxDefaultSize
						label={ __( 'Suffix', 'scg' ) }
						value={ suffix }
						onChange={ ( val ) => setAttributes( { suffix: val } ) }
						data-testid="suffix"
					/>
				</PanelBody>
			</InspectorControls>
			<p
				{ ...blockProps }
			>{ `${ prefix }${ displayedValue }${ suffix }` }</p>
		</>
	);
};
