import { warden } from "@wardenprotocol/wardenjs";
import { env } from "@/env";
import type { getClient } from "@/hooks/useClient";
import type { QueuedAction } from "./hooks";

type GetStatus = (client: Awaited<ReturnType<typeof getClient>>) => Promise<{
	pending: boolean;
	error: boolean;
	done: boolean;
	next?: "eth" | "eth-raw" | "cosmos";
	value?: any;
}>;

export const getActionHandler = ({
	action,
	data,
	snapRequestId,
	walletConnectRequestId,
	walletConnectTopic,
}: QueuedAction) => {
	let getStatus: GetStatus;

	if (!action?.result) {
		throw new Error("invalid action result");
	}

	const { typeUrl, value } = action.result;

	switch (typeUrl) {
		case warden.warden.v1beta3.MsgNewSignRequestResponse.typeUrl: {
			const { id } =
				warden.warden.v1beta3.MsgNewSignRequestResponse.decode(value);

			getStatus = async (client) => {
				const { signRequest } =
					await client.warden.warden.v1beta3.signRequestById({
						id,
					});

				switch (signRequest?.status) {
					case warden.warden.v1beta3.SignRequestStatus
						.SIGN_REQUEST_STATUS_PENDING:
						return {
							pending: true,
							error: false,
							done: false,
						};
					case warden.warden.v1beta3.SignRequestStatus
						.SIGN_REQUEST_STATUS_FULFILLED:
						const analyzers = (
							data as Parameters<
								typeof warden.warden.v1beta3.MsgNewSignRequest.encode
							>[0]
						).analyzers;

						return {
							pending: false,
							error: false,
							done: true,
							next: analyzers.includes(
								env.ethereumAnalyzerContract,
							)
								? "eth"
								: analyzers.includes(env.aminoAnalyzerContract)
									? "cosmos"
									: // fixme
										(walletConnectRequestId &&
												walletConnectTopic) ||
										  snapRequestId
										? "eth-raw"
										: undefined,
							value: signRequest?.signedData,
						};

					default:
						return {
							pending: false,
							error: true,
							done: true,
						};
				}
			};
			break;
		}
		case warden.warden.v1beta3.MsgNewKeyRequestResponse.typeUrl: {
			const { id } =
				warden.warden.v1beta3.MsgNewKeyRequestResponse.decode(value);

			getStatus = async (client) => {
				const { keyRequest } =
					await client.warden.warden.v1beta3.keyRequestById({
						id,
					});

				switch (keyRequest?.status) {
					case warden.warden.v1beta3.KeyRequestStatus
						.KEY_REQUEST_STATUS_PENDING:
						return {
							pending: true,
							error: false,
							done: false,
						};
					case warden.warden.v1beta3.KeyRequestStatus
						.KEY_REQUEST_STATUS_FULFILLED:
						return {
							pending: false,
							error: false,
							done: true,
							value: keyRequest.id,
						};
					default:
						return {
							pending: false,
							error: true,
							done: true,
						};
				}
			};
			break;
		}
		default:
			throw new Error(`action type not implemented: ${typeUrl}`);
	}

	return { getStatus };
};
