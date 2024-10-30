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
	ceil?: boolean;
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
};

export const bigintToFixed = (
	v: bigint | undefined,
	{
		ceil,
		compact,
		decimals,
		format,
		display: _display,
	}: ToFixedFormatOptions,
) => {
	const display = _display
		? decimals < _display
			? decimals
			: _display
		: decimals;

	const unit = BigInt(10) ** BigInt(decimals);
	const int = (v ?? BigInt(0)) / unit;
	let fra = (v ?? BigInt(0)) % unit;

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

	let plusOne = false;

	if (display < decimals) {
		const _unit = BigInt(10) ** BigInt(decimals - display);

		if (ceil) {
			plusOne = Boolean(fra % _unit);
		}

		fra = fra / _unit;

		if (plusOne && (fra + BigInt(1)) < BigInt(10) ** BigInt(display)) {
			++fra;
		}
	}

	const padded = fra.toString(10).padStart(display, "0");
	const trimmed = padded.replace(/0+$/, "");
	return `${format ? int.toLocaleString("en-US") : int}${trimmed ? `.${trimmed}` : ""}`;
};

export const negToZero = (num: number) => (num < 0 ? 0 : num);

export const displayPagination = (
	page: number,
	total: number,
	display: number,
) => {
	const from = negToZero(page - Math.floor(display / 2));
	const d = !from ? display + 1 : display;
	const result = !from ? [] : [0];
	const last = total - 1;

	for (let i = from; i < from + d; ++i) {
		if (i >= last) {
			break;
		}

		result.push(i);
	}

	if (last !== 0) {
		result.push(total - 1);
	}

	return result;
};
