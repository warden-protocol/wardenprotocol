import { RequestArguments } from "@metamask/providers";
import useMetaMaskContext from "./useMetaMaskContext";

export type Request = (params: RequestArguments) => Promise<unknown | null>;

/**
 * Utility hook to consume the provider `request` method with the available provider.
 *
 * @returns The `request` function.
 */
export const useMetaMaskRequest = () => {
	const { provider, setError } = useMetaMaskContext();

	/**
	 * `provider.request` wrapper.
	 *
	 * @param params - The request params.
	 * @param params.method - The method to call.
	 * @param params.params - The method params.
	 * @returns The result of the request.
	 */
	const request: Request = async ({ method, params }) => {
		try {
			const data =
				(await provider?.request({
					method,
					params,
				} as RequestArguments)) ?? null;

			return data;
		} catch (requestError: any) {
			setError(requestError);

			return null;
		}
	};

	return request;
};
