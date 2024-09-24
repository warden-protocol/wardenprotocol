import { extReplacer } from "@/utils/formatting";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";

export function createGlobalState<T>(
	queryKey: unknown,
	initialData: T | null = null,
) {
	const prefix = "globalState";

	return function () {
		const queryClient = useQueryClient();

		const { data } = useQuery({
			queryKey: [prefix, queryKey],
			queryFn: () => Promise.resolve(initialData),
			cacheTime: Infinity,
			refetchInterval: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			refetchIntervalInBackground: false,
		});

		const ref = useRef(data);

		useEffect(() => {
			ref.current = data;
		}, [data]);

		const setData = useCallback(
			(nextData: Partial<T>) => {
				queryClient.setQueryData([prefix, queryKey], {
					...ref.current,
					...nextData,
				});
			},
			[queryClient],
		);

		const resetData = useCallback(() => {
			queryClient.invalidateQueries({
				queryKey: [prefix, queryKey],
			});

			queryClient.refetchQueries({
				queryKey: [prefix, queryKey],
			});
		}, [queryClient]);

		return { data, setData, resetData };
	};
}

export function createPersistantState<T>(
	queryKey: unknown,
	initialData: T | null = null,
) {
	const prefix = "persistantState";
	const lsKey = `${prefix}:${queryKey}`;

	const getData = (): T | null => {
		try {
			if (typeof window === "undefined" || !window.localStorage) {
				throw new Error("no window.localStorage");
			}

			const raw = window.localStorage.getItem(lsKey);

			if (!raw) {
				return initialData;
			}

			const data = JSON.parse(raw, (_, v) => {
				if (typeof v === "object") {
					if (v.type === "bigint") {
						return BigInt(v.value);
					} else if (v.type === "Uint8Array") {
						return Uint8Array.from(v.value);
					}
				}

				return v;
			});
			return data;
		} catch {
			return initialData;
		}
	};

	return function () {
		const queryClient = useQueryClient();

		const { data } = useQuery({
			queryKey: [prefix, queryKey],
			queryFn: () => Promise.resolve(getData()),
			cacheTime: Infinity,
			refetchInterval: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			refetchIntervalInBackground: false,
		});

		const ref = useRef(data);
		ref.current = data;

		const setData = useCallback(
			(nextData: Partial<T>) => {
				if (typeof window === "undefined" || !window.localStorage) {
					throw new Error("no window.localStorage");
				}

				const _data = { ...ref.current, ...nextData };

				window.localStorage.setItem(
					lsKey,
					JSON.stringify(_data, extReplacer),
				);
				queryClient.setQueryData([prefix, queryKey], _data);
			},
			[queryClient],
		);

		const resetData = useCallback(() => {
			if (typeof window === "undefined" || !window.localStorage) {
				throw new Error("no window.localStorage");
			}

			window.localStorage.removeItem(lsKey);

			queryClient.invalidateQueries({
				queryKey: [prefix, queryKey],
			});

			queryClient.refetchQueries({
				queryKey: [prefix, queryKey],
			});
		}, [queryClient]);

		return { data, setData, resetData };
	};
}
