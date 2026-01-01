import { render, screen } from '@testing-library/react';
import Details from '../../src/blocks/details/edit';
import DetailsSave, { DEFAULT_TITLE } from '../../src/blocks/details/save';
import metadata from '../../src/blocks/details/block.json';
import { actions } from '../../src/blocks/details/view';
import { getContext } from '@wordpress/interactivity';

const defaultAttributes = {
	isOpen: metadata.attributes.isOpen.default,
	summary: metadata.attributes.summary.default,
	hasIcon: metadata.attributes.hasIcon.default,
	icon: 'https://localhost/wp-content/themes/scg/assets/images/details-icon.svg',
};

describe( 'details block', () => {
	describe( 'edit', () => {
		it( 'displays icon if provided', () => {
			const { container } = render(
				<Details attributes={ defaultAttributes } />
			);
			const image = container.querySelector( 'img' );

			expect( image ).toBeInTheDocument();
			expect( image.src ).toEqual( defaultAttributes.icon );

			// Control.
			expect( screen.getByTestId( 'iconId' ) ).toBeInTheDocument();
		} );

		it( "doesn't display icon if disabled", () => {
			const { container } = render(
				<Details
					attributes={ { ...defaultAttributes, hasIcon: false } }
				/>
			);
			const image = container.querySelector( 'img' );

			expect( image ).not.toBeInTheDocument();

			// Control.
			expect( screen.queryByTestId( 'iconId' ) ).not.toBeInTheDocument();
		} );

		it( "doesn't display icon if it is not provided", () => {
			const { container } = render(
				<Details attributes={ { ...defaultAttributes, icon: null } } />
			);
			const image = container.querySelector( 'img' );

			expect( image ).not.toBeInTheDocument();
		} );

		it( 'can be open by default', () => {
			const { container } = render(
				<Details
					attributes={ { ...defaultAttributes, isOpen: true } }
				/>
			);

			const el = container.querySelector( '[data-open]' );
			expect( el ).toHaveAttribute( 'data-open', 'true' );

			// Control.
			expect( screen.getByTestId( 'isOpen' ) ).toBeInTheDocument();
		} );
	} );

	describe( 'save', () => {
		it( 'displays icon if provided', () => {
			const { container } = render(
				<DetailsSave attributes={ defaultAttributes } />
			);
			const image = container.querySelector( 'img' );

			expect( image ).toBeInTheDocument();
			expect( image.src ).toEqual( defaultAttributes.icon );
		} );

		it( "doesn't display icon if disabled", () => {
			const { container } = render(
				<DetailsSave
					attributes={ { ...defaultAttributes, hasIcon: false } }
				/>
			);
			const image = container.querySelector( 'img' );

			expect( image ).not.toBeInTheDocument();
		} );

		it( "doesn't display icon if it is not provided", () => {
			const { container } = render(
				<DetailsSave
					attributes={ { ...defaultAttributes, icon: null } }
				/>
			);
			const image = container.querySelector( 'img' );

			expect( image ).not.toBeInTheDocument();
		} );

		it( 'defers to default title if summary is empty', () => {
			const { container } = render(
				<DetailsSave
					attributes={ { ...defaultAttributes, summary: '   ' } }
				/>
			);
			const title = container.querySelector(
				'.wp-block-scg-details__summary-title p'
			);

			expect( title ).toHaveTextContent( DEFAULT_TITLE );
		} );
	} );

	describe( 'view', () => {
		it( 'can be toggled', () => {
			const mockContext = { isOpen: false };
			getContext.mockReturnValue( mockContext );

			// On click.
			actions.toggle();
			expect( mockContext.isOpen ).toBe( true );

			actions.toggle();
			expect( mockContext.isOpen ).toBe( false );

			// With Space key.
			actions.spaceToggle(
				new KeyboardEvent( 'keydown', { code: 'Space' } )
			);
			expect( mockContext.isOpen ).toBe( true );

			actions.spaceToggle(
				new KeyboardEvent( 'keydown', { code: 'Space' } )
			);
			expect( mockContext.isOpen ).toBe( false );
		} );
	} );
} );
