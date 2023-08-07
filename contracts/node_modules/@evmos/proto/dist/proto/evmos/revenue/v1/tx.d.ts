import * as pb_1 from "google-protobuf";
export declare namespace evmos.revenue.v1 {
    class MsgRegisterRevenue extends pb_1.Message {
        constructor(data?: any[] | {
            contract_address?: string;
            deployer_address?: string;
            withdrawer_address?: string;
            nonces?: number[];
        });
        get contract_address(): string;
        set contract_address(value: string);
        get deployer_address(): string;
        set deployer_address(value: string);
        get withdrawer_address(): string;
        set withdrawer_address(value: string);
        get nonces(): number[];
        set nonces(value: number[]);
        static fromObject(data: {
            contract_address?: string;
            deployer_address?: string;
            withdrawer_address?: string;
            nonces?: number[];
        }): MsgRegisterRevenue;
        toObject(): {
            contract_address?: string | undefined;
            deployer_address?: string | undefined;
            withdrawer_address?: string | undefined;
            nonces?: number[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgRegisterRevenue;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgRegisterRevenue;
    }
    class MsgRegisterRevenueResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgRegisterRevenueResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgRegisterRevenueResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgRegisterRevenueResponse;
    }
    class MsgUpdateRevenue extends pb_1.Message {
        constructor(data?: any[] | {
            contract_address?: string;
            deployer_address?: string;
            withdrawer_address?: string;
        });
        get contract_address(): string;
        set contract_address(value: string);
        get deployer_address(): string;
        set deployer_address(value: string);
        get withdrawer_address(): string;
        set withdrawer_address(value: string);
        static fromObject(data: {
            contract_address?: string;
            deployer_address?: string;
            withdrawer_address?: string;
        }): MsgUpdateRevenue;
        toObject(): {
            contract_address?: string | undefined;
            deployer_address?: string | undefined;
            withdrawer_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgUpdateRevenue;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgUpdateRevenue;
    }
    class MsgUpdateRevenueResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgUpdateRevenueResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgUpdateRevenueResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgUpdateRevenueResponse;
    }
    class MsgCancelRevenue extends pb_1.Message {
        constructor(data?: any[] | {
            contract_address?: string;
            deployer_address?: string;
        });
        get contract_address(): string;
        set contract_address(value: string);
        get deployer_address(): string;
        set deployer_address(value: string);
        static fromObject(data: {
            contract_address?: string;
            deployer_address?: string;
        }): MsgCancelRevenue;
        toObject(): {
            contract_address?: string | undefined;
            deployer_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgCancelRevenue;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgCancelRevenue;
    }
    class MsgCancelRevenueResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgCancelRevenueResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgCancelRevenueResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgCancelRevenueResponse;
    }
}
//# sourceMappingURL=tx.d.ts.map