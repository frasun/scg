export const useBlockProps = Object.assign( ( props ) => props, {
	save: jest.fn( ( props ) => props ),
} );

export const InspectorControls = ( { children } ) => (
	<div data-component="inspector-controls">{ children }</div>
);

export const useInnerBlocksProps = Object.assign(
	( blockProps, options ) => {
		const { template, templateLock, ...safeProps } = options;

		return {
			...blockProps,
			...safeProps,
		};
	},
	{
		save: ( blockProps = {}, options = {} ) => ( {
			...blockProps,
			...options,
		} ),
	}
);

export const RichText = ( { value, placeholder, tagName = 'p' } ) => {
	const Tag = tagName;
	return <Tag data-component="rich-text">{ value || placeholder }</Tag>;
};

RichText.Content = ( { value, tagName = 'div' } ) => {
	const Tag = tagName;
	return <Tag data-component="rich-text-content">{ value }</Tag>;
};

export const BlockControls = ( { children } ) => (
	<div data-component="block-controls">{ children }</div>
);

export const MediaUpload = ( { children } ) => (
	<div data-component="media-upload">{ children }</div>
);

export const MediaUploadCheck = ( { children } ) => (
	<div data-component="media-upload-check">{ children }</div>
);
