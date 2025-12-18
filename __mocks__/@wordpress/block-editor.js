export const useBlockProps = Object.assign( () => ( {} ), {
	save: () => ( {} ),
} );

export const InspectorControls = ( { children } ) => (
	<div data-component="inspector-controls">{ children }</div>
);
