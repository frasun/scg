export const PanelBody = ( props ) => (
	<div data-component="panel-body" data-testid={ props[ 'data-testid' ] }>
		{ props.children }
	</div>
);
export const __experimentalNumberControl = ( props ) => (
	<div
		data-component="number-control"
		data-testid={ props[ 'data-testid' ] }
	></div>
);
export const __experimentalInputControl = ( props ) => (
	<div
		data-component="input-control"
		data-testid={ props[ 'data-testid' ] }
	></div>
);
export const ToggleControl = ( props ) => (
	<div
		data-component="toggle-control"
		data-testid={ props[ 'data-testid' ] }
	></div>
);
export const ToolbarGroup = ( props ) => (
	<div data-component="toolbar-group" data-testid={ props[ 'data-testid' ] }>
		{ props.children }
	</div>
);
export const ToolbarButton = ( props ) => (
	<button
		data-component="toolbar-button"
		data-testid={ props[ 'data-testid' ] }
	>
		{ props.children }
	</button>
);

export const Button = ( { children, ...props } ) => (
	<div data-component="button" data-testid={ props[ 'data-testid' ] }>
		{ children }
	</div>
);
export const __experimentalText = ( { children, ...props } ) => (
	<div data-component="text" data-testid={ props[ 'data-testid' ] }>
		{ children }
	</div>
);
export const Flex = ( { children, ...props } ) => (
	<div data-component="flex" data-testid={ props[ 'data-testid' ] }>
		{ children }
	</div>
);
export const FlexItem = ( { children, ...props } ) => (
	<div data-component="flex-item" data-testid={ props[ 'data-testid' ] }>
		{ children }
	</div>
);
