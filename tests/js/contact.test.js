import { getContext, getElement } from '@wordpress/interactivity';
import {
	callbacks,
	DEFAULT_LAT,
	DEFAULT_LNG,
	DEFAULT_ZOOM,
	PREFERRED_ZOOM,
} from '../../src/blocks/contact/view';
import fetchMapsAPI from '../../src/blocks/contact/maps';

jest.mock( '../../src/blocks/contact/maps', () => jest.fn() );

describe( 'contact block', () => {
	let mockMap;
	let mockMarker;

	beforeEach( () => {
		mockMap = jest.fn();
		mockMarker = jest.fn();

		// Mock Google Maps API
		global.google = {
			maps: {
				importLibrary: jest.fn( ( lib ) => {
					if ( lib === 'maps' ) {
						return Promise.resolve( { Map: mockMap } );
					}
					if ( lib === 'marker' ) {
						return Promise.resolve( {
							AdvancedMarkerElement: mockMarker,
						} );
					}
				} ),
			},
		};
	} );

	afterEach( () => {
		delete global.google;
		jest.clearAllMocks();
	} );

	it( 'sets up maps and initializes', async () => {
		const mockApiKey = 'test-api-key';
		const mockMapId = 'test-map-id';
		const mockLat = 40.7128;
		const mockLng = -74.006;
		const mockElement = document.createElement( 'div' );

		getContext.mockReturnValue( {
			apiKey: mockApiKey,
			mapId: mockMapId,
			lat: mockLat,
			lng: mockLng,
		} );

		getElement.mockReturnValue( {
			ref: mockElement,
		} );

		fetchMapsAPI.mockResolvedValue( undefined );

		// Run setupMaps generator
		const setupGen = callbacks.setupMaps();
		await setupGen.next().value; // Yield fetchMapsAPI
		setupGen.next(); // Calls initMap

		expect( fetchMapsAPI ).toHaveBeenCalledWith( mockApiKey );
	} );

	it( 'initializes map with coordinates', async () => {
		const mockApiKey = 'test-api-key';
		const mockMapId = 'test-map-id';
		const mockLat = 40.7128;
		const mockLng = -74.006;
		const mockElement = document.createElement( 'div' );

		getContext.mockReturnValue( {
			apiKey: mockApiKey,
			mapId: mockMapId,
			lat: mockLat,
			lng: mockLng,
		} );

		getElement.mockReturnValue( {
			ref: mockElement,
		} );

		// Run initMap generator
		const initGen = callbacks.initMap();
		await initGen.next().value; // Import maps library
		await initGen.next( { Map: mockMap } ).value; // Import marker library
		initGen.next( { AdvancedMarkerElement: mockMarker } ); // Complete

		expect( mockMap ).toHaveBeenCalledWith(
			mockElement,
			expect.objectContaining( {
				mapId: mockMapId,
				center: { lat: mockLat, lng: mockLng },
				zoom: PREFERRED_ZOOM,
			} )
		);

		expect( mockMarker ).toHaveBeenCalledWith(
			expect.objectContaining( {
				position: { lat: mockLat, lng: mockLng },
			} )
		);
	} );

	it( 'uses default coordinates when lat/lng not provided', async () => {
		const mockElement = document.createElement( 'div' );

		getContext.mockReturnValue( {
			apiKey: 'test-key',
			mapId: 'test-map',
			lat: null,
			lng: null,
		} );

		getElement.mockReturnValue( {
			ref: mockElement,
		} );

		const initGen = callbacks.initMap();
		await initGen.next().value;
		await initGen.next( { Map: mockMap } ).value;
		initGen.next( { AdvancedMarkerElement: mockMarker } );

		expect( mockMap ).toHaveBeenCalledWith(
			mockElement,
			expect.objectContaining( {
				center: { lat: DEFAULT_LAT, lng: DEFAULT_LNG },
				zoom: DEFAULT_ZOOM,
			} )
		);
	} );
} );
