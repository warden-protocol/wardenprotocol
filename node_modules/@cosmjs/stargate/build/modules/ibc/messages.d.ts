import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing";
import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";
export declare const ibcTypes: ReadonlyArray<[string, GeneratedType]>;
export interface MsgTransferEncodeObject extends EncodeObject {
    readonly typeUrl: "/ibc.applications.transfer.v1.MsgTransfer";
    readonly value: Partial<MsgTransfer>;
}
export declare function isMsgTransferEncodeObject(object: EncodeObject): object is MsgTransferEncodeObject;
