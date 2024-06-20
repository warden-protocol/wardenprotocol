interface CompactConf {
	unit: string;
	moreThan: bigint;
}

const COMPACT_UTIL: CompactConf[] = [
	{
		unit: "B",
		moreThan: BigInt(1_000_000_000),
	},
	{
		unit: "M",
		moreThan: BigInt(1_000_000),
	},
	{
		unit: "K",
		moreThan: BigInt(1_000),
	},
];

interface ToFixedFormatOptions {
	compact?: boolean;
	decimals: number;
	format?: boolean;
	display?: number;
}

export const bigintToFloat = (v: bigint, decimals: number): number => {
	const unit = BigInt(10) ** BigInt(decimals);

	const int = v / unit;
	const fra = v % unit;

	if (!fra) {
		return Number(int);
	}

	return Number(int) + Number(fra) / Number(unit);

}

export const bigintToFixed = (
	v: bigint | undefined,
	{ compact, decimals, format, display: _display }: ToFixedFormatOptions,
) => {
	const display = _display
		? decimals < _display
			? decimals
			: _display
		: decimals;

	const unit = BigInt(10) ** BigInt(decimals);
	const int = (v ?? BigInt(0)) / unit;
	const fra = (v ?? BigInt(0)) % unit;

	if (compact) {
		for (const { unit, moreThan } of COMPACT_UTIL) {
			if (int >= moreThan) {
				const amount = int / moreThan;
				const mod = int % moreThan;

				return mod > BigInt(0)
					? `${amount}.${mod.toString().padStart(2, "0").slice(0, 2)}${unit}`
					: `${amount}${unit}`;
			}
		}
	}

	if (!fra) {
		return int.toString(10);
	}

	const padded = fra.toString(10).padStart(decimals, "0").slice(0, display);
	const trimmed = padded.replace(/0+$/, "");
	return `${format ? int.toLocaleString("en-US") : int}.${trimmed}`;
};
