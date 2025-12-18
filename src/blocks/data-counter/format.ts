const DEFAULT_LOCALE = 'en-US';

export default ( value: number, locale = DEFAULT_LOCALE ) => {
	let language = locale;
	try {
		new Intl.Locale( locale );
	} catch {
		language = DEFAULT_LOCALE;
	}

	const absValue = Math.abs( value );
	let scaled = value;
	let suffix = '';

	if ( absValue >= 1000000 ) {
		scaled = value / 1000000;
		suffix = 'mln';
	} else if ( value >= 1000 ) {
		scaled = value / 1000;
		suffix = 'K';
	}

	const val = new Intl.NumberFormat( language, {
		maximumFractionDigits: 1,
	} ).format( scaled );

	return `${ val }${ suffix }`;
};
