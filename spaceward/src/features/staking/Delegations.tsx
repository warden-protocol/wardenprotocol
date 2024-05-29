import { useQueryHooks } from "@/hooks/useClient";
import ValidatorRow from "./ValidatorRow";
import type { Amount } from "@/utils/interfaces";
import type { DelegationResponse } from "@wardenprotocol/wardenjs/codegen/cosmos/staking/v1beta1/staking";

interface DelegationRowProps {
	address: string;
	amount?: Amount;
	openStakeModal: (address: string) => void;
	bondedTokens?: bigint;
}

function DelegationRow({ address, ...props }: DelegationRowProps) {
	const {
		cosmos: {
			staking: { v1beta1: staking },
		},
	} = useQueryHooks();

	const query = staking.useValidator({
		request: { validatorAddr: address },
	});

	return query.data ? (
		<ValidatorRow {...query.data.validator} {...props} />
	) : null;
}

interface DelegationsProps {
	openStakeModal: (address: string) => void;
	delegations?: DelegationResponse[];
	bondedTokens?: bigint;
}

export default function Delegations({
	delegations,
	...props
}: DelegationsProps) {
	return (
		<div>
			{delegations?.map((delegationResponse, i) => (
				<DelegationRow
					address={delegationResponse.delegation.validatorAddress}
					key={i}
					{...props}
				/>
			))}
		</div>
	);
}
