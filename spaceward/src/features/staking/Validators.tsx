import type { Validator } from "@wardenprotocol/wardenjs/codegen/cosmos/staking/v1beta1/staking";
import ValidatorRow from "./ValidatorRow";

interface ValidatorsProps {
	openStakeModal: (address: string) => void;
	validators?: Validator[];
	bondedTokens?: bigint;
}

export default function Validators({ validators, ...props }: ValidatorsProps) {
	return (
		<div>
			{validators?.map((validator, i) => (
				<ValidatorRow {...props} {...validator} key={i} />
			))}
		</div>
	);
}
