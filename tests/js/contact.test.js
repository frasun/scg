import {
	callbacks,
	DEFAULT_LAT,
	DEFAULT_LNG,
	DEFAULT_ZOOM,
	PREFERRED_ZOOM,
} from '../../src/blocks/contact/view';
import { getConfig, getContext } from '@wordpress/interactivity';

describe( 'contact block', () => {
	const mockConfig = { apiKey: 123, mapId: 1234 };

	describe( 'handles API key and map id', () => {
		let setupMaps, initMap;

		beforeAll( () => {
			initMap = callbacks.initMap;
			callbacks.initMap = jest.fn();
		} );

		beforeEach( () => {
			setupMaps = callbacks.setupMaps();
		} );

		afterAll( () => {
			callbacks.initMap = initMap;
		} );

		it( "doesn't init map if keys are not provided", async () => {
			await setupMaps.next().value;
			setupMaps.next();

			expect( callbacks.initMap ).not.toHaveBeenCalled();
		} );

		it( 'inits map if keys are provided', async () => {
			getConfig.mockReturnValue( mockConfig );

			await setupMaps.next().value;
			setupMaps.next();

			expect( callbacks.initMap ).toHaveBeenCalled();
		} );
	} );

	describe( 'renders map', () => {
		let renderMapSpy, renderPinSpy;

		beforeAll( async () => {
			global.google = {
				maps: {
					importLibrary: () =>
						Promise.resolve( {
							Map: jest.fn(),
						} ),
				},
			};

			renderMapSpy = jest.spyOn( callbacks, 'renderMap' );
			renderPinSpy = jest.spyOn( callbacks, 'renderPin' );
		} );

		it( 'displays map with default position and zoom', async () => {
			callbacks.initMap();

			expect( renderMapSpy ).toHaveBeenCalledWith(
				{ lat: DEFAULT_LAT, lng: DEFAULT_LNG },
				DEFAULT_ZOOM
			);

			await renderMap();

			expect( renderPinSpy ).not.toHaveBeenCalled();
		} );

		it( 'displays map with pin for given cords and preferred zoom', async () => {
			const mockLat = 1;
			const mockLng = 2;
			getContext.mockReturnValue( { lat: mockLat, lng: mockLng } );

			callbacks.initMap();

			expect( renderMapSpy ).toHaveBeenCalledWith(
				{ lat: mockLat, lng: mockLng },
				PREFERRED_ZOOM
			);

			await renderMap();

			expect( renderPinSpy ).toHaveBeenCalled();
		} );
	} );
} );

const renderMap = async () => {
	const renderMapGen = callbacks.renderMap();
	const mapsLibrary = await renderMapGen.next().value;
	renderMapGen.next( mapsLibrary );
};
