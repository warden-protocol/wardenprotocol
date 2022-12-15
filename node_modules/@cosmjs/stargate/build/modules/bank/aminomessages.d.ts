import { AminoMsg, Coin } from "@cosmjs/amino";
import { AminoConverters } from "../../aminotypes";
/** A high level transaction of the coin module */
export interface AminoMsgSend extends AminoMsg {
    readonly type: "cosmos-sdk/MsgSend";
    readonly value: {
        /** Bech32 account address */
        readonly from_address: string;
        /** Bech32 account address */
        readonly to_address: string;
        readonly amount: readonly Coin[];
    };
}
export declare function isAminoMsgSend(msg: AminoMsg): msg is AminoMsgSend;
interface Input {
    /** Bech32 account address */
    readonly address: string;
    readonly coins: readonly Coin[];
}
interface Output {
    /** Bech32 account address */
    readonly address: string;
    readonly coins: readonly Coin[];
}
/** A high level transaction of the coin module */
export interface AminoMsgMultiSend extends AminoMsg {
    readonly type: "cosmos-sdk/MsgMultiSend";
    readonly value: {
        readonly inputs: readonly Input[];
        readonly outputs: readonly Output[];
    };
}
export declare function isAminoMsgMultiSend(msg: AminoMsg): msg is AminoMsgMultiSend;
export declare function createBankAminoConverters(): AminoConverters;
export {};
