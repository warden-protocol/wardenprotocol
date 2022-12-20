import { AminoMsg, Coin } from "@cosmjs/amino";
import { AminoConverter } from "../..";
/** The initial commission rates to be used for creating a validator */
interface CommissionRates {
    readonly rate: string;
    readonly max_rate: string;
    readonly max_change_rate: string;
}
/** A validator description. */
interface Description {
    readonly moniker: string;
    readonly identity: string;
    readonly website: string;
    readonly security_contact: string;
    readonly details: string;
}
/** Creates a new validator. */
export interface AminoMsgCreateValidator extends AminoMsg {
    readonly type: "cosmos-sdk/MsgCreateValidator";
    readonly value: {
        readonly description: Description;
        readonly commission: CommissionRates;
        readonly min_self_delegation: string;
        /** Bech32 encoded delegator address */
        readonly delegator_address: string;
        /** Bech32 encoded validator address */
        readonly validator_address: string;
        /** Bech32 encoded public key */
        readonly pubkey: string;
        readonly value: Coin;
    };
}
export declare function isAminoMsgCreateValidator(msg: AminoMsg): msg is AminoMsgCreateValidator;
/** Edits an existing validator. */
export interface AminoMsgEditValidator extends AminoMsg {
    readonly type: "cosmos-sdk/MsgEditValidator";
    readonly value: {
        readonly description: Description;
        /** Bech32 encoded validator address */
        readonly validator_address: string;
        readonly commission_rate: string;
        readonly min_self_delegation: string;
    };
}
export declare function isAminoMsgEditValidator(msg: AminoMsg): msg is AminoMsgEditValidator;
/**
 * Performs a delegation from a delegate to a validator.
 *
 * @see https://docs.cosmos.network/master/modules/staking/03_messages.html#msgdelegate
 */
export interface AminoMsgDelegate extends AminoMsg {
    readonly type: "cosmos-sdk/MsgDelegate";
    readonly value: {
        /** Bech32 encoded delegator address */
        readonly delegator_address: string;
        /** Bech32 encoded validator address */
        readonly validator_address: string;
        readonly amount: Coin;
    };
}
export declare function isAminoMsgDelegate(msg: AminoMsg): msg is AminoMsgDelegate;
/** Performs a redelegation from a delegate and source validator to a destination validator */
export interface AminoMsgBeginRedelegate extends AminoMsg {
    readonly type: "cosmos-sdk/MsgBeginRedelegate";
    readonly value: {
        /** Bech32 encoded delegator address */
        readonly delegator_address: string;
        /** Bech32 encoded source validator address */
        readonly validator_src_address: string;
        /** Bech32 encoded destination validator address */
        readonly validator_dst_address: string;
        readonly amount: Coin;
    };
}
export declare function isAminoMsgBeginRedelegate(msg: AminoMsg): msg is AminoMsgBeginRedelegate;
/** Performs an undelegation from a delegate and a validator */
export interface AminoMsgUndelegate extends AminoMsg {
    readonly type: "cosmos-sdk/MsgUndelegate";
    readonly value: {
        /** Bech32 encoded delegator address */
        readonly delegator_address: string;
        /** Bech32 encoded validator address */
        readonly validator_address: string;
        readonly amount: Coin;
    };
}
export declare function isAminoMsgUndelegate(msg: AminoMsg): msg is AminoMsgUndelegate;
export declare function createStakingAminoConverters(prefix: string): Record<string, AminoConverter | "not_supported_by_chain">;
export {};
