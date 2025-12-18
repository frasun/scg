import { render } from '@testing-library/react';
import DataCounter from '../../src/blocks/data-counter/edit';
import formatNumber from '../../src/blocks/data-counter/format';

const attributes = {
	value: 2000,
	step: 100,
	suffix: '',
	prefix: '',
};

describe( 'data-counter block', () => {
	it( 'formats big numbers', () => {
		expect( formatNumber( 2200 ) ).toEqual( '2.2K' );
		expect( formatNumber( 1234567 ) ).toEqual( '1.2mln' );
	} );

	describe( 'formats numbers according to user locale', () => {
		const tests = [
			[ 'English (default)', 'en-US', '1.2K' ],
			[ 'Polish', 'pl-PL', '1,2K' ],
			[ 'French', 'fr-FR', '1,2K' ],
			[ 'Japanese', 'ja-JP', '1.2K' ],
			// [ 'Arabic', 'ar-SA', '1.2K' ],
			[ 'missing locale', null, '1.2K' ],
		];

		for ( const testCase of tests ) {
			const [ lang, locale, result ] = testCase;

			test( `${ lang }`, () => {
				expect( formatNumber( 1200, locale ) ).toEqual( result );
			} );
		}
	} );

	it( 'displays prefix and suffix if provided', () => {
		const prefix = 'test';
		const suffix = 'test';
		const { container } = render(
			<DataCounter attributes={ { ...attributes, prefix, suffix } } />
		);

		expect( container ).toHaveTextContent(
			`${ prefix }${ formatNumber( attributes.value ) }${ suffix }`
		);
	} );
} );
