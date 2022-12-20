import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing";
import { MsgDelegate, MsgUndelegate } from "cosmjs-types/cosmos/staking/v1beta1/tx";
export declare const stakingTypes: ReadonlyArray<[string, GeneratedType]>;
export interface MsgDelegateEncodeObject extends EncodeObject {
    readonly typeUrl: "/cosmos.staking.v1beta1.MsgDelegate";
    readonly value: Partial<MsgDelegate>;
}
export declare function isMsgDelegateEncodeObject(object: EncodeObject): object is MsgDelegateEncodeObject;
export interface MsgUndelegateEncodeObject extends EncodeObject {
    readonly typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate";
    readonly value: Partial<MsgUndelegate>;
}
export declare function isMsgUndelegateEncodeObject(object: EncodeObject): object is MsgUndelegateEncodeObject;
