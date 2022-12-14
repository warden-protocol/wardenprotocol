import { AminoMsg } from "@cosmjs/amino";
import { AminoConverters } from "../../aminotypes";
/** Unjails a jailed validator */
export interface AminoMsgUnjail extends AminoMsg {
    readonly type: "cosmos-sdk/MsgUnjail";
    readonly value: {
        /** Bech32 account address */
        readonly validator_addr: string;
    };
}
export declare function isAminoMsgUnjail(msg: AminoMsg): msg is AminoMsgUnjail;
export declare function createSlashingAminoConverters(): AminoConverters;
