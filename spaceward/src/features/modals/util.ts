import { assets } from "chain-registry";
import {
	AbiCoder,
	concat,
	keccak256,
	parseUnits,
	toUtf8Bytes,
	Transaction,
} from "ethers";

import type { EncodeObject } from "@cosmjs/proto-signing";
import type {  StdFee } from "@cosmjs/stargate";
import { cosmos } from "@wardenprotocol/wardenjs";
import erc20Abi from "@/contracts/eip155/erc20Abi";
import { getProvider, isSupportedNetwork } from "@/lib/eth";
import type { BalanceEntry } from "../assets/types";
import { getAbiItem } from "../assets/util";

function typedStartsWith<T extends string>(
	prefix: T,
	str?: string,
): str is `${T}${string}` {
	return Boolean(str?.startsWith(prefix));
}

type TxType = "eth" | "cosmos";
export type TxBuild<T extends TxType> = T extends "eth"
	? {
			provider: ReturnType<typeof getProvider>;
			tx: Transaction;
			type: T;
		}
	: {
			fee: StdFee;
			msgs: EncodeObject[];
			type: T;
		};

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
			const tx = Transaction.from({
				type: 2, // 2: Dynamic fee transaction
				chainId: item.chainId,
				nonce,
				to,
				value: amount,
				...feeData,
				gasLimit,
			});

			return { provider, tx, type: "eth" };
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

			const tx = Transaction.from({
				type: 2, // 2: Dynamic fee transaction
				chainId: item.chainId,
				nonce,
				data,
				to: item.erc20Token,
				...feeData,
			});

			const gasLimit = await provider.estimateGas({ ...tx, from });
			// fixme gas limit
			tx.gasLimit = gasLimit * BigInt(2);
			return { provider, tx, type: "eth" } as TxBuild<"eth">;
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

	// todo remove hardcoded fees
	const feeToken = chainAssets?.find((x) => x.symbol === "OSMO");

	if (!feeToken) {
		throw new Error("fee token not found");
	}

	const fee: StdFee = {
		amount: [{ denom: feeToken.base, amount: "225" }],
		gas: "90000",
	};

	return {
		type: "cosmos",
		msgs: [msg],
		fee,
	} as TxBuild<"cosmos">;
}
