export const PanelBody = ( { children } ) => (
	<div data-component="panel-body">{ children }</div>
);
export const __experimentalNumberControl = () => (
	<div data-component="number-control"></div>
);
export const __experimentalInputControl = () => (
	<div data-component="input-control"></div>
);
export const ToggleControl = () => <div data-component="toggle-control"></div>;
export const ToolbarGroup = ( { children } ) => (
	<div data-component="toolbar-group">{ children }</div>
);
export const ToolbarButton = ( { children, onClick } ) => (
	<button data-component="toolbar-button" onClick={ onClick }>
		{ children }
	</button>
);
