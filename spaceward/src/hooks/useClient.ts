import {
	createRpcQueryHooks,
	getSigningWardenClient,
	useRpcClient,
	warden,
} from "@wardenprotocol/wardenjs";
import { env } from "../env";
import { useChain } from "@cosmos-kit/react";
import { EncodeObject, OfflineDirectSigner, OfflineSigner, TxBodyEncodeObject, makeAuthInfoBytes, makeSignDoc } from "@cosmjs/proto-signing";
import { ToasterToast, useToast } from "@/components/ui/use-toast";
import { DeliverTxResponse, SigningStargateClient, StdFee, isDeliverTxSuccess } from "@cosmjs/stargate";
import { TxBody, TxRaw } from "@wardenprotocol/wardenjs/codegen/cosmos/tx/v1beta1/tx";
import { Any } from "@wardenprotocol/wardenjs/codegen/google/protobuf/any";
import { Int53 } from "@cosmjs/math";
import { PubKey } from "@wardenprotocol/wardenjs/codegen/ethermint/crypto/v1/ethsecp256k1/keys";
import { fromBase64 } from "@cosmjs/encoding";

export async function getSigningClient(signer: OfflineSigner) {
	return await getSigningWardenClient({
		signer,
		rpcEndpoint: env.rpcURL,
	});
}

const defaultFee: StdFee = {
	gas: '200000',
	amount: [{ denom: 'award', amount: '250000000000000' }],
};

export interface TxOptions {
	fee?: StdFee | null;
	toast?: Partial<ToasterToast>;
	onSuccess?: (res: DeliverTxResponse) => void;
}

export enum TxStatus {
	Failed = 'Transaction Failed',
	Successful = 'Transaction Successful',
	Broadcasting = 'Transaction confirmation in progress',
}

export function useTx() {
	const { address, getOfflineSignerDirect: getOfflineSigner, chain } = useChain(env.cosmoskitChainName);
	const { toast } = useToast();

	const tx = async (msgs: EncodeObject[], options: TxOptions) => {
		if (!address) {
			toast({
				title: 'Wallet not connected',
				description: 'Please connect the wallet',
			});
			return;
		}

		let signed: Uint8Array;
		const signer = getOfflineSigner();
		const client = await getSigningClient(signer);

		try {
			const fee = options.fee || defaultFee;
			const txBody = TxBody.fromPartial({
				messages: msgs,
				memo: '',
			});
			signed = await buildTxRaw(chain.chain_id, client, signer, txBody, fee);
		} catch (e: unknown) {
			console.error(e);
			toast({
				title: TxStatus.Failed,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				description: (e as any)?.message || 'An unexpected error has occured',
			});
			return;
		}

		const { id, update } = toast({
			title: TxStatus.Broadcasting,
			description: 'Waiting for transaction to be included in the block',
			duration: 999999,
		});

		if (client && signed) {
			try {
				const res = await client.broadcastTx(signed);
				if (isDeliverTxSuccess(res)) {
					if (options.onSuccess) options.onSuccess(res);

					update({
						id,
						title: options.toast?.title || TxStatus.Successful,
						description: options.toast?.description,
					});

					return res;
				} else {
					update({
						id,
						title: TxStatus.Failed,
						description: res?.rawLog ?? 'An unexpected error has occured',
						duration: 10000,
					});

					return res;
				}
			} catch (err) {
				update({
					id,
					title: TxStatus.Failed,
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					description: err?.message,
					duration: 10000,
				});
			}
		} else {
			update({
				id,
				title: TxStatus.Failed,
				description: "The transaction could't be signed or broadcasted",
				duration: 10000,
			});
		}
	};

	return { tx };
}

export function useQueryHooks() {
	const rpcQuery = useRpcClient({ rpcEndpoint: env.rpcURL });
	const rpc = rpcQuery.data;
	const isReady = !!rpcQuery.data;

	return {
		isReady,
		...createRpcQueryHooks({ rpc }),
	};
}

export function getClient() {
	return warden.ClientFactory.createRPCQueryClient({
		rpcEndpoint: env.rpcURL,
	});
}

async function buildTxRaw(
	chainId: string,
	client: SigningStargateClient,
	signer: OfflineDirectSigner,
	txBody: TxBody,
	fee: StdFee,
) {
	const walletAccounts = await signer.getAccounts();
	const signerAddress = walletAccounts[0].address;
	const account = await fetchAccount(signerAddress);

	const pubk = Any.fromPartial({
		typeUrl: PubKey.typeUrl,
		value: PubKey.encode({
			key: walletAccounts[0].pubkey,
		}).finish(),
	});

	const txBodyEncodeObject: TxBodyEncodeObject = {
		typeUrl: "/cosmos.tx.v1beta1.TxBody",
		value: txBody,
	};
	const txBodyBytes = client.registry.encode(txBodyEncodeObject);
	const gasLimit = Int53.fromString(fee.gas).toNumber();
	const authInfoBytes = makeAuthInfoBytes(
		[{ pubkey: pubk, sequence: account.sequence }],
		fee.amount,
		gasLimit,
		fee.granter,
		fee.payer,
	);
	const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, Number(account.accountNumber));
	const { signature, signed } = await signer.signDirect(signerAddress, signDoc);

	return TxRaw.encode({
		bodyBytes: signed.bodyBytes,
		authInfoBytes: signed.authInfoBytes,
		signatures: [fromBase64(signature.signature)],
	}).finish();
}

async function fetchAccount(address: string) {
	const rpcClient = await getClient();
	const { account } = await rpcClient.cosmos.auth.v1beta1.account({ address });
	if (!account) {
		throw new Error("Failed to retrieve account from chain", account);
	}
	return account;
}
