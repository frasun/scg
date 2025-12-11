import { store, getElement, getContext } from '@wordpress/interactivity';
import { gsap } from 'gsap';
import { state as themeState } from '../../scripts/scg.ts';

const MOBILE_WIDTH = 781;
const MOBILE_HEIGHT = 799;
const MENU_LINKS = 'a:not([target="_blank"])';
const ANIMATION_MEDIA_QUERY = `((max-width: ${ MOBILE_WIDTH }px) or (max-height: ${ MOBILE_HEIGHT }px)) and (prefers-reduced-motion: no-preference)`;
const MENU_ITEMS =
	'.wp-block-scg-header :where(.wp-block-navigation-item, .wp-block-template-part, .trp-block-container)';
const MOBILE_MENU = '.wp-block-scg-header__menu';
const MOBILE_NAVIGATION = '.wp-block-scg-header__bg';
const LOGO_PATH = '.wp-block-scg-logo .scg-logo--main';

interface HeaderContext {
	isOpen: boolean;
	isScrolled: boolean;
	animationTimeline?: gsap.core.Timeline;
	element: HTMLElement;
}

const { callbacks } = store( 'scg/header', {
	actions: {
		toggleOpen: () => {
			const ctx = getContext< HeaderContext >();
			ctx.isOpen = ! ctx.isOpen;
		},
	},
	callbacks: {
		onScroll: () => {
			if ( themeState.scrollY !== null ) {
				return;
			}

			const ctx = getContext< HeaderContext >();
			ctx.isScrolled = window.scrollY > 0;
		},
		onResize: () => {
			const ctx = getContext< HeaderContext >();

			if ( window.innerWidth >= MOBILE_WIDTH ) {
				ctx.isOpen = false;
			}
		},
		// Set initial context.
		onInit: () => {
			const ctx = getContext< HeaderContext >();

			ctx.element = getElement().ref as HTMLElement;
			ctx.isScrolled = window.scrollY > 0;
			ctx.animationTimeline = gsap.timeline();

			callbacks.handleLinkClick();
			callbacks.initAnimation();
		},
		// Handle context changes.
		onChange: () => {
			const ctx = getContext< HeaderContext >();

			if ( ctx.isOpen ) {
				if ( themeState.isMobile ) {
					document.documentElement.style.overflow = 'hidden';
				}

				if ( ctx.animationTimeline ) {
					ctx.animationTimeline.play( 0 );
				}
			} else {
				if ( themeState.isMobile ) {
					document.documentElement.style.overflow = '';
				}

				if ( ctx.animationTimeline ) {
					ctx.animationTimeline.reverse();
				}
			}
		},
		// Close mobile menu when user clicks on link inside block content.
		handleLinkClick: () => {
			const ctx = getContext< HeaderContext >();
			const links = ctx.element.querySelectorAll( MENU_LINKS );

			for ( const link of Array.from( links ) ) {
				link.addEventListener( 'click', () => {
					ctx.isOpen = false;
				} );
			}
		},
		// Mobile menu animation.
		initAnimation: () => {
			const ctx = getContext< HeaderContext >();
			const animation = gsap.matchMedia();

			animation.add(
				ANIMATION_MEDIA_QUERY,
				() => {
					if ( ! ctx.animationTimeline ) {
						return;
					}

					ctx.animationTimeline.pause();

					ctx.animationTimeline
						.set( MENU_ITEMS, {
							opacity: 0,
							y: 10,
						} )
						.to( MOBILE_NAVIGATION, {
							height: 'var(--mobile-menu-height)',
							duration: 0.65,
							ease: 'power3.inOut',
						} )
						.to( LOGO_PATH, {
							fill: 'var(--wp--preset--color--base)',
							duration: 0.01,
						} )
						.to(
							MOBILE_MENU,
							{
								duration: 0.01,
								display: 'flex',
							},
							'-=0.5'
						)
						.to(
							MENU_ITEMS,
							{
								duration: 0.35,
								opacity: 1,
								y: 0,
								stagger: 0.05,
								ease: 'back.out',
							},
							'-=0.5'
						)
						.to(
							MOBILE_NAVIGATION,
							{
								border: 'var(--navigation--border)',
								ease: 'back.out',
								duration: 0.5,
							},
							'-=0.35'
						)
						.eventCallback( 'onReverseComplete', () => {
							callbacks.resetAnimation( ctx.animationTimeline );
						} )
						.eventCallback( 'onComplete', () => {} );

					return () => {
						callbacks.resetAnimation( ctx.animationTimeline );
					};
				},
				ctx.element
			);
		},
		resetAnimation: (
			animationTimeline: HeaderContext[ 'animationTimeline' ]
		) => {
			if ( animationTimeline ) {
				animationTimeline.revert();
			}
		},
	},
} );
