import type { Pagination } from "./types";

export const DEFAULT_PAGINATION: Pagination = {
	key: "0x",
	offset: BigInt(0),
	limit: BigInt(100),
	countTotal: true,
	reverse: false,
};
