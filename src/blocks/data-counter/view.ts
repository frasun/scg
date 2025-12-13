import { store, getContext, getElement } from '@wordpress/interactivity';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import formatNumber from './format';
import {
	REDUCED_MOTION_QUERY,
	WITH_MOTION_QUERY,
} from '../../scripts/constants';

interface DataCounter {
	/** Final display value of counter */
	value: number;
	/** Incremental step for animation */
	step: number;
}

store( 'scg/data-counter', {
	callbacks: {
		init: () => {
			const { value, step } = getContext< DataCounter >();
			const element = getElement().ref as HTMLElement;
			const timeline = gsap.timeline();
			const animation = gsap.matchMedia();

			gsap.registerPlugin( ScrollTrigger );

			animation.add(
				{
					reducedMotion: REDUCED_MOTION_QUERY,
					withMotion: WITH_MOTION_QUERY,
				},
				( context ) => {
					const { withMotion } =
						context.conditions as gsap.Conditions;

					timeline.progress( 0 ).pause();
					timeline.to( element, {
						scrollTrigger: {
							trigger: element,
							onEnter: () => {
								timeline.play();
							},
							onEnterBack: () => {
								timeline.play();
							},
							onLeave: () => {
								timeline.pause();
							},
							onLeaveBack: () => {
								timeline.pause();
							},
						},
						textContent: value,
						startAt: {
							textContent: 0,
						},
						snap: {
							textContent: step,
						},
						duration: withMotion ? 3 : 0,
						onUpdate: () => {
							element.textContent = formatNumber(
								Number( element.textContent ),
								document.documentElement.lang
							);
						},
					} );
				}
			);
		},
	},
} );
