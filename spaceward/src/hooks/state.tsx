import { useQuery, useQueryClient } from "@tanstack/react-query";

export function createGlobalState<T>(
	queryKey: unknown,
	initialData: T | null = null,
) {
	return function () {
		const queryClient = useQueryClient();

		const { data } = useQuery({
			queryKey: [queryKey],
			queryFn: () => Promise.resolve(initialData),
			cacheTime: Infinity,
			refetchInterval: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			refetchIntervalInBackground: false,
		});

		function setData(nextData: Partial<T>) {
			queryClient.setQueryData([queryKey], { ...data, ...nextData });
		}

		function resetData() {
			queryClient.invalidateQueries({
				queryKey: [queryKey],
			});
			queryClient.refetchQueries({
				queryKey: [queryKey],
			});
		}

		return { data, setData, resetData };
	};
}
