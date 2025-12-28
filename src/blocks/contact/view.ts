import { getContext, getElement, store } from '@wordpress/interactivity';
import fetchMapsAPI from './maps';

interface Contact {
	/** Map address latitude */
	lat: number;
	/** Map address longitude */
	lng: number;
	/** Maps API Key */
	apiKey: string;
	/** Map ID */
	mapId: string;
}

const MAP_OPTIONS = {
	cameraControl: false,
	streetViewControl: false,
	mapTypeControl: false,
	fullscreenControl: false,
	rotateControl: false,
	scaleControl: true,
	zoomControl: true,
	clickableIcons: false,
};
export const DEFAULT_LAT = -33.861838;
export const DEFAULT_LNG = 151.362549;
export const DEFAULT_ZOOM = 8;
export const PREFERRED_ZOOM = 15;
const PIN = `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12.8281" r="12" fill="#F9A51A"/></svg>`;

export const { callbacks } = store( 'scg/contact', {
	callbacks: {
		*setupMaps() {
			const { apiKey } = getContext< Contact >();
			yield fetchMapsAPI( apiKey );

			callbacks.initMap();
		},
		*initMap() {
			const { lat, lng, mapId } = getContext< Contact >();
			// @ts-expect-error
			const { Map } = yield google.maps.importLibrary( 'maps' );
			const { AdvancedMarkerElement } =
				// @ts-expect-error
				yield google.maps.importLibrary( 'marker' );

			const element = getElement().ref as HTMLElement;
			const latitude = lat ?? DEFAULT_LAT;
			const longitude = lng ?? DEFAULT_LNG;
			const position = { lat: latitude, lng: longitude };
			const map = new Map( element, {
				mapId,
				center: position,
				zoom: lat ? PREFERRED_ZOOM : DEFAULT_ZOOM,
				...MAP_OPTIONS,
			} );
			const parser = new DOMParser();
			const pin = parser.parseFromString(
				PIN,
				'image/svg+xml'
			).documentElement;

			new AdvancedMarkerElement( {
				map,
				position,
				content: pin,
			} );
		},
	},
} );
