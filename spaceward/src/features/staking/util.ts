import type {
	Coin,
	DecCoin,
} from "@wardenprotocol/wardenjs/codegen/cosmos/base/v1beta1/coin";
import type { Params as DistributionParams } from "@wardenprotocol/wardenjs/codegen/cosmos/distribution/v1beta1/distribution";

import type {
	Validator,
	DelegationResponse,
	Pool,
} from "@wardenprotocol/wardenjs/codegen/cosmos/staking/v1beta1/staking";
import { bigintToFixed } from "@/lib/math";

export const getDelegationsData = (delegations?: DelegationResponse[]) => {
	const delegationsByAddress: Record<string, number> = {};
	let availableWard = BigInt(0);

	for (let i = 0; i < (delegations?.length ?? 0); i++) {
		const delegation = delegations![i];
		delegationsByAddress[delegation.delegation.validatorAddress] = i;

		if (delegation.balance.denom === "award") {
			availableWard += BigInt(delegation.balance.amount);
		}
	}

	return {
		availableWard,
		delegationsByAddress,
	};
};

export const getParamData = ({
	distributionParams,
	inflation,
	pool,
	totalSupply,
}: {
	distributionParams?: DistributionParams;
	/** @deprecated somrthing wrong with type */
	inflation?: Uint8Array;
	pool?: Pool;
	totalSupply?: Coin[];
}) => {
	const bondedTokens = pool?.bondedTokens
		? BigInt(pool.bondedTokens)
		: undefined;

	const communityTax = distributionParams?.communityTax
		? Number(distributionParams.communityTax)
		: 0;

	let total = BigInt(0);

	for (const supply of totalSupply ?? []) {
		if (supply.denom === "award") {
			total += BigInt(supply.amount);
		}
	}

	// fixme inflation is Uint8Array; possible type bug
	const infl = BigInt(
		inflation
			? Array.from(inflation)
					.map((x) => String.fromCharCode(x))
					.join("")
			: "0",
	);

	// APR = inflation * (1 - community_tax) * total_supply / bonded_tokens
	const apr = bondedTokens
		? (infl *
				BigInt(
					(1 - communityTax) *
						// using 3 sign precision
						1000,
				) *
				total) /
			// precision above
			BigInt(1000) /
			bondedTokens
		: BigInt(0);

	return { bondedTokens, apr };
};

/** @deprecated smth with reward amount */
export const formatReward = (reward?: DecCoin[]) => {
	const rewardNum =
		reward?.reduce((total, item) => {
			return item.denom === "award" ? total + BigInt(item.amount) : total;
		}, BigInt(0)) ?? BigInt(0);

	// fixme
	return bigintToFixed(rewardNum, {
		decimals: 18 + 18,
		display: 6,
		format: true,
	});
};

export const getValidatorData = (validators?: Validator[]) => {
	let stakedWard = BigInt(0);
	const validatorsByAddress: Record<string, number> = {};

	for (let i = 0; i < (validators?.length ?? 0); i++) {
		const validator = validators![i];
		stakedWard += BigInt(validator.tokens);
		validatorsByAddress[validator.operatorAddress] = i;
	}

	return { stakedWard, validatorsByAddress };
};

const B0 = BigInt(0);
const B10000 = BigInt(10000);

export const getVotingPower = (
	bondedTokens?: bigint,
	validator?: Validator,
) => {
	if (!bondedTokens || !validator) {
		return B0;
	}

	return (BigInt(validator.tokens) * B10000) / bondedTokens;
};

const DAY_SEC = BigInt(86400);

export const getDaysFromBigint = (seconds?: bigint) =>
	((seconds ?? B0) / DAY_SEC).toString();

const NAN_REGEX = /[^\d.]/g;

export const numRestrict = (value: string) => {
	const v = value.replace("e", "").replaceAll(NAN_REGEX, "");
	return v.split(".").slice(0, 2).join(".");
};

export const strToBigint = (str: string, decimals: number = 6) => {
	const [int, fra] = str.split(".");
	return BigInt(int + (fra ?? "").padEnd(decimals, "0").slice(0, decimals));
};
