import { useAddressContext } from "@/hooks/useAddressContext";
import { useQueryHooks } from "@/hooks/useClient";

import {
	BondStatus,
} from "@wardenprotocol/wardenjs/codegen/cosmos/staking/v1beta1/staking";
import ValidatorRow from "./ValidatorRow";

interface ValidatorsProps {
	openStakeModal: (address: string) => void;
}

export default function Validators(props: ValidatorsProps) {
	const {
		cosmos: {
			staking: { v1beta1: staking },
		},
	} = useQueryHooks();

	const query = staking.useValidators({
		request: {
			// @ts-expect-error string expected; fixme possible type bug
			status: BondStatus.BOND_STATUS_UNSPECIFIED,
		},
	});

	return (
		<div>
			{query.data?.validators.map((validator, i) => (
				<ValidatorRow
					{...validator}
					key={i}
					openStakeModal={props.openStakeModal}
				/>
			))}
		</div>
	);
}
