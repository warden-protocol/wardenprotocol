import { DEFAULT_PAGINATION } from "./constants";
import type { Pagination } from "./types";

export const createPagination = (pagination: Partial<Pagination>) => {
	return { ...DEFAULT_PAGINATION, ...pagination };
};
