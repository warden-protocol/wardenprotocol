interface ToFixedFormatOptions {
	decimals: number;
	format?: boolean;
}

export const bigintToFixed = (
	v: bigint,
	{ decimals, format }: ToFixedFormatOptions,
) => {
	const unit = BigInt(10) ** BigInt(decimals);
	const int = v / unit;
	const fra = v % unit;

	if (!fra) {
		return int.toString(10);
	}

	const padded = fra.toString(10).padStart(decimals, "0");
	const trimmed = padded.replace(/0+$/, "");
	return `${format ? int.toLocaleString("en-US") : int}.${trimmed}`;
};
