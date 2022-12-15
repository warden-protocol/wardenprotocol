import { AminoMsg } from "@cosmjs/amino";
import { AminoConverters } from "../../aminotypes";
interface Any {
    readonly type_url: string;
    readonly value: Uint8Array;
}
/** Supports submitting arbitrary evidence */
export interface AminoMsgSubmitEvidence extends AminoMsg {
    readonly type: "cosmos-sdk/MsgSubmitEvidence";
    readonly value: {
        /** Bech32 account address */
        readonly submitter: string;
        readonly evidence: Any;
    };
}
export declare function isAminoMsgSubmitEvidence(msg: AminoMsg): msg is AminoMsgSubmitEvidence;
export declare function createEvidenceAminoConverters(): AminoConverters;
export {};
