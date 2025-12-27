export const store = jest.fn( ( namespace, storeDef ) => {
	return storeDef;
} );

export const getContext = jest.fn( () => ( {} ) );

export const getElement = jest.fn( () => ( {
	ref: null,
	attributes: {},
} ) );
