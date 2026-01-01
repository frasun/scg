export const useBlockProps = Object.assign( ( props ) => props, {
	save: jest.fn( ( props ) => props ),
} );

export const InspectorControls = ( { children, ...props } ) => (
	<div
		data-component="inspector-controls"
		data-testid={ props[ 'data-testid' ] }
	>
		{ children }
	</div>
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

export const RichText = ( { value, placeholder, tagName = 'p', ...props } ) => {
	const Tag = tagName;
	return (
		<Tag data-component="rich-text" data-testid={ props[ 'data-testid' ] }>
			{ value || placeholder }
		</Tag>
	);
};

RichText.Content = ( { value, tagName = 'div', ...props } ) => {
	const Tag = tagName;
	return (
		<Tag
			data-component="rich-text-content"
			data-testid={ props[ 'data-testid' ] }
		>
			{ value }
		</Tag>
	);
};

export const BlockControls = ( { children, ...props } ) => (
	<div data-component="block-controls" data-testid={ props[ 'data-testid' ] }>
		{ children }
	</div>
);

export const MediaUpload = ( { render: Render, ...props } ) => (
	<div data-component="media-upload" data-testid={ props[ 'data-testid' ] }>
		<Render />
	</div>
);

export const MediaUploadCheck = ( { children, ...props } ) => (
	<div
		data-component="media-upload-check"
		data-testid={ props[ 'data-testid' ] }
	>
		{ children }
	</div>
);
