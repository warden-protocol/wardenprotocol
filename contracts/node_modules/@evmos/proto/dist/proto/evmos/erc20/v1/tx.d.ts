import * as dependency_3 from "./../../../cosmos/base/v1beta1/coin";
import * as pb_1 from "google-protobuf";
export declare namespace evmos.erc20.v1 {
    class MsgConvertCoin extends pb_1.Message {
        constructor(data?: any[] | {
            coin?: dependency_3.cosmos.base.v1beta1.Coin;
            receiver?: string;
            sender?: string;
        });
        get coin(): dependency_3.cosmos.base.v1beta1.Coin;
        set coin(value: dependency_3.cosmos.base.v1beta1.Coin);
        get receiver(): string;
        set receiver(value: string);
        get sender(): string;
        set sender(value: string);
        static fromObject(data: {
            coin?: ReturnType<typeof dependency_3.cosmos.base.v1beta1.Coin.prototype.toObject>;
            receiver?: string;
            sender?: string;
        }): MsgConvertCoin;
        toObject(): {
            coin?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            receiver?: string | undefined;
            sender?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgConvertCoin;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgConvertCoin;
    }
    class MsgConvertCoinResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgConvertCoinResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgConvertCoinResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgConvertCoinResponse;
    }
    class MsgConvertERC20 extends pb_1.Message {
        constructor(data?: any[] | {
            contract_address?: string;
            amount?: string;
            receiver?: string;
            sender?: string;
        });
        get contract_address(): string;
        set contract_address(value: string);
        get amount(): string;
        set amount(value: string);
        get receiver(): string;
        set receiver(value: string);
        get sender(): string;
        set sender(value: string);
        static fromObject(data: {
            contract_address?: string;
            amount?: string;
            receiver?: string;
            sender?: string;
        }): MsgConvertERC20;
        toObject(): {
            contract_address?: string | undefined;
            amount?: string | undefined;
            receiver?: string | undefined;
            sender?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgConvertERC20;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgConvertERC20;
    }
    class MsgConvertERC20Response extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgConvertERC20Response;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgConvertERC20Response;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgConvertERC20Response;
    }
}
//# sourceMappingURL=tx.d.ts.map