import type { CommonActions } from "@/utils/common";
import type { Coin } from "@wardenprotocol/wardenjs/codegen/cosmos/base/v1beta1/coin";
import type { Validator } from "@wardenprotocol/wardenjs/codegen/cosmos/staking/v1beta1/staking";
import type { Dispatch } from "react";

type Columns = "comission" | "power" | "status";
type ModalTypes = "stake" | "redelegate" | "details";
type SortDirection = "asc" | "desc";

export type ByAddress = Record<string, number>;

export interface StakingState {
	modal?: ModalTypes | undefined;
	address?: string;
	tab: "all" | "my";
	txPending: boolean;
	sortKey?: Columns;
	sortDropdown?: Columns;
	sortDirection?: SortDirection;
}

export type StakingDispatch = Dispatch<CommonActions<StakingState>>;

export interface ModalProps {
	validator: Validator;
	dispatch: StakingDispatch;
}

export interface StakedValidator extends Validator {
	stakedAmount?: Coin
}
