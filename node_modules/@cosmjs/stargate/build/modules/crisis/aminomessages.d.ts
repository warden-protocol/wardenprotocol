import { AminoMsg } from "@cosmjs/amino";
import { AminoConverters } from "../../aminotypes";
/** Verifies a particular invariance */
export interface AminoMsgVerifyInvariant extends AminoMsg {
    readonly type: "cosmos-sdk/MsgVerifyInvariant";
    readonly value: {
        /** Bech32 account address */
        readonly sender: string;
        readonly invariant_module_name: string;
        readonly invariant_route: string;
    };
}
export declare function isAminoMsgVerifyInvariant(msg: AminoMsg): msg is AminoMsgVerifyInvariant;
export declare function createCrysisAminoConverters(): AminoConverters;
