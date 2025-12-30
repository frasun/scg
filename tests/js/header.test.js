import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../../src/blocks/header/edit';
import {
	actions,
	callbacks,
	MENU_LINKS,
	MOBILE_WIDTH,
} from '../../src/blocks/header/view';
import { getContext } from '@wordpress/interactivity';

describe( 'header block', () => {
	describe( 'editor', () => {
		const OPEN = 'data-is-open';
		const SCROLLED = 'data-is-scrolled';
		let container, block;

		beforeEach( () => {
			( { container } = render( <Header /> ) );
			block = container.querySelector( 'div' );
		} );

		it( 'is closed by default', () => {
			expect( block ).toHaveAttribute( OPEN, 'false' );
		} );

		it( 'toggles mobile menu', () => {
			fireEvent.click( screen.getByRole( 'button' ) );
			expect( block ).toHaveAttribute( OPEN, 'true' );
		} );

		it( 'changes state on scroll', () => {
			expect( block ).toHaveAttribute( SCROLLED, 'false' );

			document.documentElement.scrollTop = 100;
			fireEvent.scroll( document );
			expect( block ).toHaveAttribute( SCROLLED, 'true' );

			document.documentElement.scrollTop = 0;
			fireEvent.scroll( document );
			expect( block ).toHaveAttribute( SCROLLED, 'false' );
		} );
	} );

	describe( 'view', () => {
		const el = document.createElement( 'div' );

		for ( let i = 0; i < 10; i++ ) {
			const link = document.createElement( 'a' );
			el.appendChild( link );
		}

		const mockContext = { isOpen: false, isScrolled: false, element: el };
		getContext.mockReturnValue( mockContext );

		it( 'toggles mobile menu', () => {
			actions.toggleOpen();
			expect( mockContext.isOpen ).toBe( true );

			actions.toggleOpen();
			expect( mockContext.isOpen ).toBe( false );
		} );

		it( 'closes menu when the same page menu link is clicked', () => {
			mockContext.isOpen = true;
			callbacks.handleLinkClick();

			const link = el.querySelector( MENU_LINKS );
			link.click();

			expect( mockContext.isOpen ).toBe( false );
		} );

		it( 'closes menu on page resize', () => {
			mockContext.isOpen = true;
			window.innerWidth = MOBILE_WIDTH + 1;

			callbacks.onResize();
			expect( mockContext.isOpen ).toBe( false );

			mockContext.isOpen = true;
			window.innerWidth = MOBILE_WIDTH - 1;

			callbacks.onResize();
			expect( mockContext.isOpen ).toBe( true );
		} );

		it( 'changes state on scroll', () => {
			window.scrollY = 100;

			callbacks.onScroll();
			expect( mockContext.isScrolled ).toBe( true );

			window.scrollY = 0;

			callbacks.onScroll();
			expect( mockContext.isScrolled ).toBe( false );
		} );
	} );
} );
