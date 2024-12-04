import { assets } from "chain-registry";

import {
	encodePubkey,
	makeAuthInfoBytes,
	Registry,
	type EncodeObject,
} from "@cosmjs/proto-signing";
import {
	AminoTypes,
	createDefaultAminoConverters,
	defaultRegistryTypes,
	type StargateClient,
	type StdFee,
} from "@cosmjs/stargate";
import { cosmos } from "@wardenprotocol/wardenjs";
import erc20Abi from "@/contracts/eip155/erc20Abi";
import { getProvider, isSupportedNetwork } from "@/lib/eth";
import type { BalanceEntry } from "../assets/types";
import { encodeSecp256k1Pubkey, makeSignDoc, StdSignDoc } from "@cosmjs/amino";
import { Int53 } from "@cosmjs/math";
import { SignMode } from "@wardenprotocol/wardenjs/codegen/cosmos/tx/signing/v1beta1/signing";
import { getEnabledCosmosChains } from "@/config/tokens";
import {
	Account,
	Chain,
	Client,
	SendTransactionParameters,
	getContract,
	parseUnits,
	Transport,
	SendTransactionRequest,
	assertRequest,
	formatTransactionRequest,
	TransactionRequest,
	isAddress,
	encodeFunctionData,
} from "viem";
import { extract } from "viem/utils";
import { parseAccount } from "viem/accounts";
import { isValidBech32 } from "@/utils/validate";

export function prepareEth<
	c extends Chain | undefined,
	acc extends Account | undefined,
	request extends SendTransactionRequest<c, chainOverride>,
	chainOverride extends Chain | undefined = undefined,
>(
	client: Client<Transport, c, acc>,
	parameters: SendTransactionParameters<c, acc, chainOverride, request>,
) {
	const {
		account: account_ = client.account,
		chain = client.chain,
		accessList,
		// authorizationList,
		blobs,
		data,
		gas,
		gasPrice,
		maxFeePerBlobGas,
		maxFeePerGas,
		maxPriorityFeePerGas,
		nonce,
		value,
		...rest
	} = parameters;

	if (typeof account_ === "undefined") throw new Error("account not found");
	const account = account_ ? parseAccount(account_) : null;
	const to = rest.to;

	assertRequest(parameters);

	if (account?.type === "json-rpc" || account === null) {
		const chainId = client.chain?.id;
		if (!chainId) throw new Error("chainId not found");

		const chainFormat =
			client.chain?.formatters?.transactionRequest?.format;
		const format: typeof formatTransactionRequest =
			chainFormat || formatTransactionRequest;

		const request = {
			// Pick out extra data that might exist on the chain's transaction request type.
			...extract(rest, { format: chainFormat }),
			accessList,
			// authorizationList,
			blobs,
			chainId,
			data,
			from: account?.address,
			gas,
			gasPrice,
			maxFeePerBlobGas,
			maxFeePerGas,
			maxPriorityFeePerGas,
			nonce,
			to,
			value,
		} as TransactionRequest;

		return { request, format };
	}

	throw new Error(`unsupported account type: ${account?.type}`);
}

type EthPrepare = ReturnType<typeof prepareEth>;
export type EthRequest = EthPrepare["request"];
export type EthFormat = EthPrepare["format"];

function typedStartsWith<T extends string>(
	prefix: T,
	str?: string,
): str is `${T}${string}` {
	return Boolean(str?.startsWith(prefix));
}

type TxType = "eth" | "cosmos";
export type TxBuild<T extends TxType> = T extends "eth"
	? {
			tx: EthPrepare["request"];
			type: T;
		}
	: {
			fee: StdFee;
			msgs: EncodeObject[];
			type: T;
		};

export function capitalize<T extends string>(s?: T): Capitalize<T> {
	return (!s ? "" : s.charAt(0).toUpperCase() + s.slice(1)) as Capitalize<T>;
}
export async function buildTransaction({
	address,
	item,
	from,
	to,
	amount: _amount,
}: {
	address: `0x${string}`;
	item: BalanceEntry;
	from: string;
	to: string;
	amount: string;
}) {
	if (typedStartsWith("eip155:", item.type)) {
		if (!isAddress(from) || !isAddress(to)) {
			throw new Error("invalid eip155 address", { cause: { from, to } });
		}

		if (!isSupportedNetwork(item.chainName)) {
			throw new Error(`Unsupported network: ${item.chainName}`);
		}

		const amount = parseUnits(_amount, item.decimals);
		const { provider } = getProvider(item.chainName);
		const nonce = await provider.getTransactionCount({ address: from });
		const feeData = await provider.estimateFeesPerGas();
		const gasLimit = BigInt(21000);

		if (item.type === "eip155:native") {
			const { request } = prepareEth(provider, {
				account: from,
				chain: provider.chain,
				nonce,
				to,
				value: amount,
				gas: gasLimit,
				...feeData,
			});

			return { tx: request, type: "eth" };
		} else if (item.type === "eip155:erc20") {
			if (!item.erc20Token) {
				throw new Error("missing token contract address");
			}

			const contract = getContract({
				address: item.erc20Token,
				abi: erc20Abi,
				client: provider,
			});

			const data = encodeFunctionData({
				abi: erc20Abi,
				functionName: "transfer",
				args: [to, amount],
			});

			const { request } = prepareEth(provider, {
				account: from,
				chain: provider.chain,
				nonce,
				to: item.erc20Token,
				data,
				...feeData,
			});

			// fixme gas limit
			const gasLimit =
				(await contract.estimateGas.transfer([to, amount], {})) *
				BigInt(2);

			request.gas = gasLimit;
			return { tx: request, type: "eth" } as TxBuild<"eth">;
		} else {
			throw new Error(`unsupported type: ${item.type}`);
		}
	}

	if (!isValidBech32(from) || !isValidBech32(to)) {
		throw new Error("invalid cosmos address", { cause: { from, to } });
	}

	const { send } = cosmos.bank.v1beta1.MessageComposer.withTypeUrl;
	const amount = parseUnits(_amount, item.decimals).toString();

	const chainAssets = assets.find(
		(x) => x.chain_name === item.chainName,
	)?.assets;

	const asset = chainAssets?.find((x) => x.symbol === item.token);

	if (!asset) {
		throw new Error("asset not found");
	}

	const msg = send({
		amount: [{ denom: asset.base, amount }],
		toAddress: to,
		fromAddress: from,
	});

	const feeToken = chainAssets?.[0];

	if (!feeToken) {
		throw new Error("fee token not found");
	}

	const feeAmount =
		getEnabledCosmosChains(address).find((x) => x.chainName === item.chainName)
			?.feeAmount ?? "225";

	const fee: StdFee = {
		// fixme remove hardcoded fees
		amount: [{ denom: feeToken.base, amount: feeAmount }],
		gas: "200000",
	};

	return {
		type: "cosmos",
		msgs: [msg],
		fee,
	} as TxBuild<"cosmos">;
}

const aminoTypes = new AminoTypes(createDefaultAminoConverters());
const registry = new Registry(defaultRegistryTypes);

export async function createAminoSignDoc({
	tx,
	client,
	address,
}: {
	tx: TxBuild<"cosmos">;
	client: StargateClient;
	address: string;
}) {
	const { accountNumber, sequence } = await client.getSequence(address);
	const chainId = await client.getChainId();

	return makeSignDoc(
		tx.msgs.map((x) => aminoTypes.toAmino(x)),
		tx.fee,
		chainId,
		// memo
		"",
		accountNumber,
		sequence,
	);
}

export function prepareTx(signDoc: StdSignDoc, pubkey: Uint8Array) {
	const signedTxBody = {
		messages: signDoc.msgs.map((msg) => aminoTypes.fromAmino(msg)),
		memo: signDoc.memo,
		timeoutHeight: 0,
	};

	const signedGasLimit = Int53.fromString(signDoc.fee.gas).toNumber();
	const signedSequence = Int53.fromString(signDoc.sequence).toNumber();
	const signedAuthInfoBytes = makeAuthInfoBytes(
		[
			{
				pubkey: encodePubkey(encodeSecp256k1Pubkey(pubkey)),
				sequence: signedSequence,
			},
		],
		signDoc.fee.amount,
		signedGasLimit,
		signDoc.fee.granter,
		signDoc.fee.payer,
		SignMode.SIGN_MODE_LEGACY_AMINO_JSON,
	);

	return {
		signedTxBodyBytes: registry.encode({
			typeUrl: "/cosmos.tx.v1beta1.TxBody",
			value: signedTxBody,
		}),
		signedAuthInfoBytes,
	};
}
