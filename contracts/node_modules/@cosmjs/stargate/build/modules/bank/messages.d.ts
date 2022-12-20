import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
export declare const bankTypes: ReadonlyArray<[string, GeneratedType]>;
export interface MsgSendEncodeObject extends EncodeObject {
    readonly typeUrl: "/cosmos.bank.v1beta1.MsgSend";
    readonly value: Partial<MsgSend>;
}
export declare function isMsgSendEncodeObject(encodeObject: EncodeObject): encodeObject is MsgSendEncodeObject;
