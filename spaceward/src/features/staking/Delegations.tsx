import { useAddressContext } from "@/hooks/useAddressContext";
import { useQueryHooks } from "@/hooks/useClient";
import ValidatorRow from "./ValidatorRow";
import { Amount } from "@/utils/interfaces";

interface DelegationRowProps {
	address: string;
	amount: Amount;
	openStakeModal: (address: string) => void;
}

function DelegationRow(props: DelegationRowProps) {
	const {
		cosmos: {
			staking: { v1beta1: staking },
		},
	} = useQueryHooks();

	const query = staking.useValidator({
		request: { validatorAddr: props.address },
	});

	return query.data ? (
		<ValidatorRow
			stakedAmount={props.amount}
			openStakeModal={props.openStakeModal}
			{...query.data.validator}
		/>
	) : null;
}

interface DelegationsProps {
	openStakeModal: (address: string) => void;
}

export default function Delegations(props: DelegationsProps) {
	const {
		cosmos: {
			staking: { v1beta1: staking },
		},
	} = useQueryHooks();

	const { address } = useAddressContext();

	const query = staking.useDelegatorDelegations({
		request: { delegatorAddr: address },
	});

	return (
		<div>
			{query.data?.delegationResponses.map((delegationResponse, i) => (
				<DelegationRow
					amount={delegationResponse.balance}
					address={delegationResponse.delegation.validatorAddress}
					key={i}
					openStakeModal={props.openStakeModal}
				/>
			))}
		</div>
	);
}
