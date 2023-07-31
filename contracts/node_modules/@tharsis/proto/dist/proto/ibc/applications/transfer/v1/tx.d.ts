import * as dependency_2 from "./../../../../cosmos/base/v1beta1/coin";
import * as dependency_3 from "./../../../core/client/v1/client";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.applications.transfer.v1 {
    class MsgTransfer extends pb_1.Message {
        constructor(data?: any[] | {
            source_port?: string;
            source_channel?: string;
            token?: dependency_2.cosmos.base.v1beta1.Coin;
            sender?: string;
            receiver?: string;
            timeout_height?: dependency_3.ibc.core.client.v1.Height;
            timeout_timestamp?: number;
        });
        get source_port(): string;
        set source_port(value: string);
        get source_channel(): string;
        set source_channel(value: string);
        get token(): dependency_2.cosmos.base.v1beta1.Coin;
        set token(value: dependency_2.cosmos.base.v1beta1.Coin);
        get sender(): string;
        set sender(value: string);
        get receiver(): string;
        set receiver(value: string);
        get timeout_height(): dependency_3.ibc.core.client.v1.Height;
        set timeout_height(value: dependency_3.ibc.core.client.v1.Height);
        get timeout_timestamp(): number;
        set timeout_timestamp(value: number);
        static fromObject(data: {
            source_port?: string;
            source_channel?: string;
            token?: ReturnType<typeof dependency_2.cosmos.base.v1beta1.Coin.prototype.toObject>;
            sender?: string;
            receiver?: string;
            timeout_height?: ReturnType<typeof dependency_3.ibc.core.client.v1.Height.prototype.toObject>;
            timeout_timestamp?: number;
        }): MsgTransfer;
        toObject(): {
            source_port?: string | undefined;
            source_channel?: string | undefined;
            token?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            sender?: string | undefined;
            receiver?: string | undefined;
            timeout_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
            timeout_timestamp?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgTransfer;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgTransfer;
    }
    class MsgTransferResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgTransferResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgTransferResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgTransferResponse;
    }
}
//# sourceMappingURL=tx.d.ts.map