const mockContext = {};
const mockStores = {};

export const store = jest.fn( ( namespace, storeDef ) => {
	const storeInstance = {
		...storeDef,
		state: storeDef.state || {},
		actions: storeDef.actions || {},
		callbacks: storeDef.callbacks || {},
	};
	mockStores[ namespace ] = storeInstance;
	return storeInstance;
} );

export const getContext = jest.fn( () => mockContext );
export const getElement = jest.fn( () => ( { ref: null } ) );
