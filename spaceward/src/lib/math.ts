interface ToFixedFormatOptions {
	decimals: number;
	format?: boolean;
	display?: number;
}

export const bigintToFixed = (
	v: bigint,
	{ decimals, format, display: _display }: ToFixedFormatOptions,
) => {
	const display = _display
		? decimals < _display
			? decimals
			: _display
		: decimals;

	const unit = BigInt(10) ** BigInt(decimals);
	const int = v / unit;
	const fra = v % unit;

	if (!fra) {
		return int.toString(10);
	}

	const padded = fra.toString(10).padStart(decimals, "0").slice(0, display);
	const trimmed = padded.replace(/0+$/, "");
	return `${format ? int.toLocaleString("en-US") : int}.${trimmed}`;
};
