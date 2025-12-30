import { state, actions, callbacks } from '../../src/blocks/cert-viewer/view';

describe( 'cert-viewer block', () => {
	it( 'is closed by default', () => {
		expect( state.isModalOpen ).toBe( false );
	} );

	it( 'can be closed with keyboard', () => {
		state.isModalOpen = true;
		callbacks.escClose(
			new KeyboardEvent( 'keydown', { code: 'Escape' } )
		);

		expect( state.isModalOpen ).toBe( false );
	} );

	it( 'can zoom in and out', () => {
		callbacks.zoom = jest.fn();

		actions.zoomIn();

		expect( state.zoom ).toBe( 1 );
		expect( state.canZoomIn ).toBe( false );
		expect( callbacks.zoom ).toHaveBeenCalled();

		actions.zoomOut();

		expect( state.zoom ).toBe( 0 );
		expect( state.canZoomIn ).toBe( true );
		expect( callbacks.zoom ).toHaveBeenCalled();
	} );

	it( 'has page navigation for multipage document', () => {
		// Default.
		expect( state.hasPages ).toBe( false );
		expect( state.hasPrevPage ).toBe( false );
		expect( state.hasNextPage ).toBe( false );

		// Multipage
		state.pages = 100;
		state.currentPage = 10;

		expect( state.hasPages ).toBe( true );
		expect( state.hasPrevPage ).toBe( true );
		expect( state.hasNextPage ).toBe( true );
	} );
} );
