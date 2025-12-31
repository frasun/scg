import {
	getContext,
	getElement,
	store,
	getConfig,
} from '@wordpress/interactivity';
import fetchMapsAPI from './maps';

interface Contact {
	/** Map address latitude */
	lat: number;
	/** Map address longitude */
	lng: number;
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
const DEFAULT_LOCALE = 'en-US';
const PIN = `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12.8281" r="12" fill="#F9A51A"/></svg>`;

type Position = {
	lat: number;
	lng: number;
};

const getLanguage = () => {
	const locale = document.documentElement.lang;
	let language = locale;
	try {
		new Intl.Locale( locale );
	} catch {
		language = DEFAULT_LOCALE;
	}

	return language;
};

export const { callbacks } = store( 'scg/contact', {
	callbacks: {
		*setupMaps() {
			const { apiKey } = getConfig();

			if ( ! apiKey ) {
				return;
			}

			if ( ! globalThis.google ) {
				yield fetchMapsAPI( apiKey, getLanguage() );
			}

			callbacks.initMap();
		},
		initMap() {
			const { lat, lng } = getContext< Contact >();
			const latitude = lat ?? DEFAULT_LAT;
			const longitude = lng ?? DEFAULT_LNG;
			const position = { lat: latitude, lng: longitude };
			const zoom = lat ? PREFERRED_ZOOM : DEFAULT_ZOOM;

			callbacks.renderMap( position, zoom );
		},
		*renderMap( center: Position, zoom: number ) {
			const { mapId } = getConfig();

			if ( ! mapId ) {
				return;
			}

			const { lat, lng } = getContext< Contact >();
			// @ts-expect-error
			const { Map } = yield google.maps.importLibrary( 'maps' );
			const element = getElement().ref as HTMLElement;
			const map = new Map( element, {
				mapId,
				center,
				zoom,
				...MAP_OPTIONS,
			} );

			if ( lat && lng ) {
				callbacks.renderPin( map, { lat, lng } );
			}
		},
		*renderPin( map: any, position: Position ) {
			const { AdvancedMarkerElement } =
				// @ts-expect-error
				yield google.maps.importLibrary( 'marker' );
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
