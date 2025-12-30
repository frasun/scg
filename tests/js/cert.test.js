import { render, screen } from '@testing-library/react';
import Cert from '../../src/blocks/cert/edit';
import metadata from '../../src/blocks/cert/block.json';
import { state, actions, callbacks } from '../../src/blocks/cert-viewer/view';
import { getContext } from '@wordpress/interactivity';

const CATEGORY = 'test category';
const IMAGE = 'https://test/image.jpg';
const CERT_URL = 'https://test/cert.pdf';
const attributes = {
	name: metadata.attributes.name.default,
};

jest.mock( '../../src/blocks/cert/controls', () => {
	return jest.fn( () => null );
} );

jest.mock( '../../src/blocks/cert/marker', () => {
	return jest.fn( () => <div data-testid="marker" /> );
} );

describe( 'cert block', () => {
	it( 'displays category if provided', () => {
		const { container } = render(
			<Cert attributes={ { ...attributes, category: CATEGORY } } />
		);
		const categoryElement = container.querySelector(
			'.wp-block-scg-cert__category'
		);

		expect( categoryElement ).toBeInTheDocument();
		expect( categoryElement ).toHaveTextContent( CATEGORY );
	} );

	it( 'displays cert image if provided', () => {
		const { container } = render(
			<Cert attributes={ { ...attributes, img: IMAGE } } />
		);
		const badgeElement = container.querySelector(
			'.wp-block-scg-cert__badge'
		);

		expect( badgeElement ).toBeInTheDocument();
		expect( badgeElement ).toHaveAttribute( 'src', IMAGE );
		expect( badgeElement ).toHaveAttribute( 'alt', attributes.name );
	} );

	it( 'displays marker icon if it links to a certificate', () => {
		render( <Cert attributes={ { ...attributes, certId: 123 } } /> );

		expect( screen.getByTestId( 'marker' ) ).toBeInTheDocument();
	} );

	it( "doesn't display elements if attributes not explicitly set", () => {
		const { container } = render( <Cert attributes={ attributes } /> );
		const categoryElement = container.querySelector(
			'.wp-block-scg-cert__category'
		);
		const badgeElement = container.querySelector(
			'.wp-block-scg-cert__badge'
		);
		const marker = container.querySelector( '[data-testid="marker"]' );

		expect( categoryElement ).not.toBeInTheDocument();
		expect( badgeElement ).not.toBeInTheDocument();
		expect( marker ).not.toBeInTheDocument();
	} );

	it( 'opens modal with certificate', () => {
		actions.openModal = jest.fn();
		getContext.mockReturnValue( { certUrl: CERT_URL } );

		actions.onCertClick();
		callbacks.handleUrlChange().next();

		expect( actions.openModal ).toHaveBeenCalled();

		state.isModalOpen = false;
		actions.onCertClick();
		expect( actions.openModal ).toHaveBeenCalledWith( false );
	} );
} );
