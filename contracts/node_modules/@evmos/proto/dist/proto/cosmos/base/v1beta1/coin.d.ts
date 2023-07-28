import * as pb_1 from "google-protobuf";
export declare namespace cosmos.base.v1beta1 {
    class Coin extends pb_1.Message {
        constructor(data?: any[] | {
            denom?: string;
            amount?: string;
        });
        get denom(): string;
        set denom(value: string);
        get amount(): string;
        set amount(value: string);
        static fromObject(data: {
            denom?: string;
            amount?: string;
        }): Coin;
        toObject(): {
            denom?: string | undefined;
            amount?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Coin;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Coin;
    }
    class DecCoin extends pb_1.Message {
        constructor(data?: any[] | {
            denom?: string;
            amount?: string;
        });
        get denom(): string;
        set denom(value: string);
        get amount(): string;
        set amount(value: string);
        static fromObject(data: {
            denom?: string;
            amount?: string;
        }): DecCoin;
        toObject(): {
            denom?: string | undefined;
            amount?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DecCoin;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DecCoin;
    }
    class IntProto extends pb_1.Message {
        constructor(data?: any[] | {
            int?: string;
        });
        get int(): string;
        set int(value: string);
        static fromObject(data: {
            int?: string;
        }): IntProto;
        toObject(): {
            int?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): IntProto;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): IntProto;
    }
    class DecProto extends pb_1.Message {
        constructor(data?: any[] | {
            dec?: string;
        });
        get dec(): string;
        set dec(value: string);
        static fromObject(data: {
            dec?: string;
        }): DecProto;
        toObject(): {
            dec?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DecProto;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DecProto;
    }
}
//# sourceMappingURL=coin.d.ts.map