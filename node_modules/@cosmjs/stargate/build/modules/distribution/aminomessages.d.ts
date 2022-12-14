import { AminoMsg, Coin } from "@cosmjs/amino";
import { AminoConverter } from "../..";
/** Changes the withdraw address for a delegator (or validator self-delegation) */
export interface AminoMsgSetWithdrawAddress extends AminoMsg {
    readonly type: "cosmos-sdk/MsgModifyWithdrawAddress";
    readonly value: {
        /** Bech32 account address */
        readonly delegator_address: string;
        /** Bech32 account address */
        readonly withdraw_address: string;
    };
}
export declare function isAminoMsgSetWithdrawAddress(msg: AminoMsg): msg is AminoMsgSetWithdrawAddress;
/** Message for delegation withdraw from a single validator */
export interface AminoMsgWithdrawDelegatorReward extends AminoMsg {
    readonly type: "cosmos-sdk/MsgWithdrawDelegationReward";
    readonly value: {
        /** Bech32 account address */
        readonly delegator_address: string;
        /** Bech32 account address */
        readonly validator_address: string;
    };
}
export declare function isAminoMsgWithdrawDelegatorReward(msg: AminoMsg): msg is AminoMsgWithdrawDelegatorReward;
/** Message for validator withdraw */
export interface AminoMsgWithdrawValidatorCommission extends AminoMsg {
    readonly type: "cosmos-sdk/MsgWithdrawValidatorCommission";
    readonly value: {
        /** Bech32 account address */
        readonly validator_address: string;
    };
}
export declare function isAminoMsgWithdrawValidatorCommission(msg: AminoMsg): msg is AminoMsgWithdrawValidatorCommission;
/** Allows an account to directly fund the community pool. */
export interface AminoMsgFundCommunityPool extends AminoMsg {
    readonly type: "cosmos-sdk/MsgFundCommunityPool";
    readonly value: {
        readonly amount: readonly Coin[];
        /** Bech32 account address */
        readonly depositor: string;
    };
}
export declare function isAminoMsgFundCommunityPool(msg: AminoMsg): msg is AminoMsgFundCommunityPool;
export declare function createDistributionAminoConverters(): Record<string, AminoConverter | "not_supported_by_chain">;
