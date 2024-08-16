import { assets } from "chain-registry";
import {
	AbiCoder,
	concat,
	keccak256,
	parseUnits,
	toUtf8Bytes,
	//	Transaction,
	TransactionLike,
} from "ethers";

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
	type SigningStargateClient,
	type StdFee,
} from "@cosmjs/stargate";
import { cosmos } from "@wardenprotocol/wardenjs";
import erc20Abi from "@/contracts/eip155/erc20Abi";
import { getProvider, isSupportedNetwork } from "@/lib/eth";
import type { BalanceEntry } from "../assets/types";
import { getAbiItem } from "../assets/util";
import { COSMOS_CHAINS } from "../assets/hooks";
import { encodeSecp256k1Pubkey, makeSignDoc, StdSignDoc } from "@cosmjs/amino";
import { Int53 } from "@cosmjs/math";
import { SignMode } from "@wardenprotocol/wardenjs/codegen/cosmos/tx/signing/v1beta1/signing";

function typedStartsWith<T extends string>(
	prefix: T,
	str?: string,
): str is `${T}${string}` {
	return Boolean(str?.startsWith(prefix));
}

type TxType = "eth" | "cosmos";
export type TxBuild<T extends TxType> = T extends "eth"
	? {
			tx: TransactionLike;
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
	item,
	from,
	to,
	amount: _amount,
}: {
	item: BalanceEntry;
	from: string;
	to: string;
	amount: string;
}) {
	if (typedStartsWith("eip155:", item.type)) {
		if (!isSupportedNetwork(item.chainName)) {
			throw new Error(`Unsupported network: ${item.chainName}`);
		}

		const amount = parseUnits(_amount, item.decimals);
		const provider = getProvider(item.chainName);
		const nonce = await provider.getTransactionCount(from);
		const feeData = await provider.getFeeData();
		const gasLimit = BigInt(21000);

		if (item.type === "eip155:native") {
			const tx: TransactionLike = {
				type: 2, // 2: Dynamic fee transaction
				chainId: item.chainId,
				nonce,
				to,
				value: amount,
				...feeData,
				gasLimit,
			};

			return { tx, type: "eth" };
		} else if (item.type === "eip155:erc20") {
			if (!item.erc20Token) {
				throw new Error("missing token contract address");
			}

			const abiItem = getAbiItem(erc20Abi, "transfer")!;
			const signature = `${abiItem.name}(${abiItem.inputs.map((x) => x.type).join(",")})`;
			const sigHash = keccak256(toUtf8Bytes(signature));
			const selector = sigHash.slice(0, 10);
			const abiCoder = AbiCoder.defaultAbiCoder();

			const params = abiCoder.encode(
				abiItem.inputs.map((x) => x.type),
				[to, amount],
			);

			const data = concat([selector, params]);

			const tx: TransactionLike = {
				type: 2, // 2: Dynamic fee transaction
				chainId: item.chainId,
				nonce,
				data,
				to: item.erc20Token,
				...feeData,
			};

			const gasLimit = await provider.estimateGas({ ...tx, from });
			// fixme gas limit
			tx.gasLimit = gasLimit * BigInt(2);
			return { tx, type: "eth" } as TxBuild<"eth">;
		} else {
			throw new Error(`unsupported type: ${item.type}`);
		}
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
		COSMOS_CHAINS.find((x) => x.chainName === item.chainName)?.feeAmount ??
		"225";

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
	client: SigningStargateClient;
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
