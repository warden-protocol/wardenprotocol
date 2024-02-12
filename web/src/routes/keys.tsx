// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardFooter,
// 	CardHeader,
// 	CardTitle,
// } from "@/components/ui/card";
// import { useLoaderData } from "react-router";
import { Link, Params } from "react-router-dom";
import { useKeplrAddress } from "../keplr";
import {
	MsgNewKeyRequest,
	MsgNewKeyRequestResponse,
} from "../proto/wardenprotocol/treasury/tx_pb";
import {
	KeyRequest,
	KeyRequestStatus,
	KeyType,
} from "../proto/wardenprotocol/treasury/key_pb";
import Keys from "../components/keys";
import KeyRequests from "../components/key-requests";
// import { spaceByAddress } from "../client/identity";
// import { useQuery } from "@tanstack/react-query";

import useSpaceAddress from "@/hooks/useSpaceAddress";

// import Address from "../components/address";
// import { MsgRemoveSpaceOwner } from "../proto/wardenprotocol/identity/tx_pb";
// import AddSpaceOwnerForm from "@/components/add-space-owner-form";
import { Button } from "@/components/ui/button";
// import {
// 	Breadcrumb,
// 	BreadcrumbItem,
// 	BreadcrumbLink,
// } from "@/components/ui/breadcrumb";
import { useBroadcaster } from "@/hooks/keplr";
// import SpaceIntentCard from "@/components/space-intent-card";
import useKeychainAddress from "@/hooks/useKeychainAddress";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { TxMsgData } from "cosmjs-types/cosmos/base/abci/v1beta1/abci";
import { keyRequestById } from "@/client/treasury";
import ProgressStep from "@/components/ui/progress-step";
import NewKeyButton from "@/components/new-key-button";

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

enum KeyRequesterState {
	IDLE = "idle",
	BROADCAST_KEY_REQUEST = "broadcast_key_request",
	WAITING_KEYCHAIN = "waiting_keychain",
	KEY_FULFILLED = "key_fulfilled",
	ERROR = "error",
}

function useKeyRequester() {
	const { broadcast } = useBroadcaster();
	const [state, setState] = useState<KeyRequesterState>(
		KeyRequesterState.IDLE
	);
	const [error, setError] = useState<string | undefined>(undefined);
	const [keyRequest, setKeyRequest] = useState<KeyRequest | undefined>(
		undefined
	);

	return {
		state,
		keyRequest,
		error,
		requestKey: async (
			keychainAddress: string,
			addr: string,
			spaceAddr: string
		) => {
			try {
				setState(KeyRequesterState.BROADCAST_KEY_REQUEST);

				const res = await broadcast([
					new MsgNewKeyRequest({
						keychainAddr: keychainAddress,
						creator: addr,
						spaceAddr,
						keyType: KeyType.ECDSA_SECP256K1,
						// keyType: KeyType.EDDSA_ED25519,
					}),
				]);

				setState(KeyRequesterState.WAITING_KEYCHAIN);

				if (!res || !res.result) {
					throw new Error("failed to broadcast tx");
				}

				if (res.result?.tx_result.code) {
					throw new Error(
						`tx failed with code ${res.result?.tx_result.code}`
					);
				}

				// parse tx msg response
				const bytes = Uint8Array.from(
					atob(res.result.tx_result.data),
					(c) => c.charCodeAt(0)
				);
				const msgData = TxMsgData.decode(bytes);
				const newKeyRequestResponse =
					MsgNewKeyRequestResponse.fromBinary(
						msgData.msgResponses[0].value
					);
				const keyRequestId = newKeyRequestResponse.id;

				// wait for sign request to be processed
				while (true) {
					const res = await keyRequestById(keyRequestId);
					setKeyRequest(res.keyRequest);
					if (res?.keyRequest?.status === KeyRequestStatus.PENDING) {
						await sleep(1000);
						continue;
					}

					if (res.keyRequest?.status === KeyRequestStatus.FULFILLED) {
						setState(KeyRequesterState.KEY_FULFILLED);
						return;
					}

					throw new Error(
						`key request rejected with reason: ${res.keyRequest?.rejectReason}`
					);
				}
			} catch (e) {
				setError(`${e}`);
				setState(KeyRequesterState.ERROR);
			}
		},
		reset: () => {
			if (
				state === KeyRequesterState.KEY_FULFILLED ||
				state === KeyRequesterState.ERROR
			) {
				setState(KeyRequesterState.IDLE);
			}
		},
	};
}

function progressForState(state: KeyRequesterState) {
	switch (state) {
		case KeyRequesterState.IDLE:
			return 0;
		case KeyRequesterState.BROADCAST_KEY_REQUEST:
			return 10;
		case KeyRequesterState.WAITING_KEYCHAIN:
			return 50;
		case KeyRequesterState.KEY_FULFILLED:
			return 100;
		default:
			return 0;
	}
}

function KeyRequestDialog({
	state,
	error,
	keyRequest,
	reset,
}: {
	state: KeyRequesterState;
	error: string | undefined;
	keyRequest: KeyRequest | undefined;
	reset: () => void;
}) {
	return (
		<AlertDialog open={state !== "idle"}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>New key request</AlertDialogTitle>
					<AlertDialogDescription>
						<div className="flex flex-col gap-4">
							<ProgressStep
								loading={
									state ===
									KeyRequesterState.BROADCAST_KEY_REQUEST
								}
								done={
									progressForState(state) >
									progressForState(
										KeyRequesterState.BROADCAST_KEY_REQUEST
									)
								}
							>
								<span className="font-bold">Request key</span>
								<span>
									Use Keplr to sign and broadcast a new key
									request for this space
								</span>
							</ProgressStep>

							<ProgressStep
								loading={
									state === KeyRequesterState.WAITING_KEYCHAIN
								}
								done={
									progressForState(state) >
									progressForState(
										KeyRequesterState.WAITING_KEYCHAIN
									)
								}
							>
								<span className="font-bold">
									Waiting for keychain
								</span>
								<span>
									The keychain will pick up your request,
									generate a new key, and send it back to
									Warden
								</span>
							</ProgressStep>

							<ProgressStep
								loading={false}
								done={
									progressForState(state) >=
									progressForState(
										KeyRequesterState.KEY_FULFILLED
									)
								}
							>
								<span className="font-bold">Key generated</span>
								<span>Your new key is ready to be used</span>
							</ProgressStep>

							{state === KeyRequesterState.ERROR && (
								<div className="flex flex-col gap-2 mt-4">
									<span className="text-red-800">
										{error}
									</span>
									<div className="flex flex-row gap-4">
										<Button
											size="sm"
											variant="secondary"
											onClick={() => reset()}
										>
											Close
										</Button>
									</div>
								</div>
							)}

							{state === KeyRequesterState.KEY_FULFILLED && (
								<div className="flex flex-col gap-2 mt-4">
									<div className="flex flex-row gap-4">
										<Link to={`/keys/${keyRequest?.id}`}>
											<Button size="sm">
												Open key #
												{keyRequest?.id.toString()}
											</Button>
										</Link>
										<Button
											size="sm"
											variant="secondary"
											onClick={() => reset()}
										>
											Close
										</Button>
									</div>
								</div>
							)}
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
			</AlertDialogContent>
		</AlertDialog>
	);
}

function KeysPage() {
	const addr = useKeplrAddress();
	const [keychainAddress, __] = useKeychainAddress();

	const { state, error, keyRequest, requestKey, reset } = useKeyRequester();

	const [spaceAddress, _] = useSpaceAddress();

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2 border-b">
				<div>
					<h2 className="text-4xl">Keys</h2>
					<p className="text-muted-foreground">
						Keys are used to derive blockchain addresses and sign
						transactions.
					</p>
				</div>
				<div>
					{/* <Button
						className="flex flex-col"
						onClick={() =>
							requestKey(keychainAddress, addr, spaceAddress)
						}
					>
						<span>New Key</span>
					</Button> */}
                    <NewKeyButton />
					<KeyRequestDialog
						state={state}
						error={error}
						keyRequest={keyRequest}
						reset={reset}
					/>
				</div>
			</div>
			<div className="h-full flex-1 flex-col space-y-8 flex">
				<KeyRequests spaceAddr={spaceAddress} />
				<Keys spaceAddr={spaceAddress} />
			</div>
		</div>
	);
}

export async function loader({ params }: { params: Params<string> }) {
	if (!params.spaceAddr) {
		throw new Error("No space address provided");
	}
	return {
		spaceAddr: params.spaceAddr,
	};
}

export default KeysPage;
