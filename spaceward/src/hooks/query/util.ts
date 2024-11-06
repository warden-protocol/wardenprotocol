import type { Expression } from "@/types/shield";
import { DEFAULT_PAGINATION } from "./constants";
import type { Pagination } from "./types";

export const createPagination = (pagination: Partial<Pagination>) => {
	return { ...DEFAULT_PAGINATION, ...pagination };
};

type WithParameter<Key extends string, V> = { [key in Key]: V };

export function selectWithExpression<
	Key extends string,
	Data extends WithParameter<Key, string>,
>(name: Key, data: Data) {
	const { [name]: expression, ...rest } = data;

	try {
		const data = JSON.parse(expression, (k, v) => {
			if (typeof v === "object") {
				if (["arguments", "elements"].includes(k)) {
					return Array.from(v);
				}
				const { Value, ...rest } = v;

				if (!Value) {
					return Object.entries(rest).reduce(
						(acc, [k, v]) => {
							return {
								...acc,
								[k
									.split("_")
									.map((x, i) =>
										i ? x[0].toUpperCase() + x.slice(1) : x,
									)
									.join("")]: v,
							};
						},
						{} as Record<string, any>,
					);
				}

				return Value;
			}

			return v;
		});

		return { [name]: data, ...rest } as Omit<Data, Key> & {
			[key in Key]: Expression;
		};
	} catch (e) {
		console.error(e);
		throw e;
	}
}
