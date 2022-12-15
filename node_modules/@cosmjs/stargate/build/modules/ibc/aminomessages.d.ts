import { AminoMsg, Coin } from "@cosmjs/amino";
import { AminoConverters } from "../../aminotypes";
interface AminoHeight {
    /** 0 values must be omitted (https://github.com/cosmos/cosmos-sdk/blob/v0.42.7/x/ibc/core/02-client/types/client.pb.go#L252). */
    readonly revision_number?: string;
    /** 0 values must be omitted (https://github.com/cosmos/cosmos-sdk/blob/v0.42.7/x/ibc/core/02-client/types/client.pb.go#L254). */
    readonly revision_height?: string;
}
/** Transfers fungible tokens (i.e Coins) between ICS20 enabled chains */
export interface AminoMsgTransfer extends AminoMsg {
    readonly type: "cosmos-sdk/MsgTransfer";
    readonly value: {
        readonly source_port: string;
        readonly source_channel: string;
        readonly token?: Coin;
        /** Bech32 account address */
        readonly sender: string;
        /** Bech32 account address */
        readonly receiver: string;
        /**
         * The timeout as a (revision_number, revision_height) pair.
         *
         * This fied is is non-optional (https://github.com/cosmos/cosmos-sdk/blob/v0.42.7/x/ibc/applications/transfer/types/tx.pb.go#L49).
         * In order to not set the timeout height, set it to {}.
         */
        readonly timeout_height: AminoHeight;
        /**
         * Timeout timestamp in nanoseconds since Unix epoch. The timeout is disabled when set to 0.
         *
         * 0 values must be omitted (https://github.com/cosmos/cosmos-sdk/blob/v0.42.7/x/ibc/applications/transfer/types/tx.pb.go#L52).
         */
        readonly timeout_timestamp?: string;
    };
}
export declare function isAminoMsgTransfer(msg: AminoMsg): msg is AminoMsgTransfer;
export declare function createIbcAminoConverters(): AminoConverters;
export {};
