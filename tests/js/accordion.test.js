import { actions, state, callbacks } from '../../src/blocks/details/view';
import { getContext } from '@wordpress/interactivity';

const ACCORDION_ID = 'accordion-1';
const INDEX = 3;
const ACTIVE = INDEX - 1;

describe( 'accordion block', () => {
	test( 'only one child at a time can be expanded', () => {
		const details1 = {
			accordion: ACCORDION_ID,
			key: ACTIVE,
			isOpen: false,
		};
		const details2 = {
			accordion: ACCORDION_ID,
			key: INDEX,
			isOpen: true,
		};

		state[ ACCORDION_ID ] = [ INDEX ];

		// On click.
		getContext.mockReturnValue( details1 );
		actions.emitToggle();
		expect( state ).toEqual( { [ ACCORDION_ID ]: [ ACTIVE ] } );
		callbacks.onStateChange();
		expect( details1.isOpen ).toBe( true );

		getContext.mockReturnValue( details2 );
		callbacks.onStateChange();
		expect( details2.isOpen ).toBe( false );

		// On Space.
		actions.emitSpaceToggle(
			new KeyboardEvent( 'keydown', { code: 'Space' } )
		);
		expect( state ).toEqual( { [ ACCORDION_ID ]: [ INDEX ] } );
		callbacks.onStateChange();
		expect( details2.isOpen ).toBe( true );

		getContext.mockReturnValue( details1 );
		callbacks.onStateChange();
		expect( details1.isOpen ).toBe( false );
	} );
} );
