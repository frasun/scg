import {
	callbacks,
	ANIMATION_TIME_PER_CHILD,
} from '../../src/blocks/carousel/view';
import { getElement } from '@wordpress/interactivity';

describe( 'carousel block', () => {
	it( 'has infinite loop animation', () => {
		const mockEl = document.createElement( 'div' );
		const wrapperEl = document.createElement( 'div' );
		wrapperEl.className = 'wp-block-scg-carousel__wrapper';
		const CHILDREN = 10;

		for ( let i = 0; i < CHILDREN; i++ ) {
			const childEl = document.createElement( 'img' );
			wrapperEl.appendChild( childEl );
		}

		mockEl.appendChild( wrapperEl );
		getElement.mockReturnValue( { ref: mockEl } );

		callbacks.initCarousel();

		expect( Array.from( wrapperEl.querySelectorAll( 'img' ) ).length ).toBe(
			CHILDREN * 2
		);
		expect( wrapperEl.style.animationPlayState ).toBe( 'running' );
		expect( wrapperEl.style.animationDuration ).toBe(
			`${ CHILDREN * ANIMATION_TIME_PER_CHILD }s`
		);
	} );
} );
