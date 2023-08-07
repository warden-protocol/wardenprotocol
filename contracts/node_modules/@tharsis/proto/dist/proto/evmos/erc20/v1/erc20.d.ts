import * as dependency_2 from "./../../../cosmos/bank/v1beta1/bank";
import * as pb_1 from "google-protobuf";
export declare namespace evmos.erc20.v1 {
    enum Owner {
        OWNER_UNSPECIFIED = 0,
        OWNER_MODULE = 1,
        OWNER_EXTERNAL = 2
    }
    class TokenPair extends pb_1.Message {
        constructor(data?: any[] | {
            erc20_address?: string;
            denom?: string;
            enabled?: boolean;
            contract_owner?: Owner;
        });
        get erc20_address(): string;
        set erc20_address(value: string);
        get denom(): string;
        set denom(value: string);
        get enabled(): boolean;
        set enabled(value: boolean);
        get contract_owner(): Owner;
        set contract_owner(value: Owner);
        static fromObject(data: {
            erc20_address?: string;
            denom?: string;
            enabled?: boolean;
            contract_owner?: Owner;
        }): TokenPair;
        toObject(): {
            erc20_address?: string | undefined;
            denom?: string | undefined;
            enabled?: boolean | undefined;
            contract_owner?: Owner | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TokenPair;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TokenPair;
    }
    class RegisterCoinProposal extends pb_1.Message {
        constructor(data?: any[] | {
            title?: string;
            description?: string;
            metadata?: dependency_2.cosmos.bank.v1beta1.Metadata;
        });
        get title(): string;
        set title(value: string);
        get description(): string;
        set description(value: string);
        get metadata(): dependency_2.cosmos.bank.v1beta1.Metadata;
        set metadata(value: dependency_2.cosmos.bank.v1beta1.Metadata);
        static fromObject(data: {
            title?: string;
            description?: string;
            metadata?: ReturnType<typeof dependency_2.cosmos.bank.v1beta1.Metadata.prototype.toObject>;
        }): RegisterCoinProposal;
        toObject(): {
            title?: string | undefined;
            description?: string | undefined;
            metadata?: {
                description?: string | undefined;
                denom_units?: {
                    denom?: string | undefined;
                    exponent?: number | undefined;
                    aliases?: string[] | undefined;
                }[] | undefined;
                base?: string | undefined;
                display?: string | undefined;
                name?: string | undefined;
                symbol?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RegisterCoinProposal;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RegisterCoinProposal;
    }
    class RegisterERC20Proposal extends pb_1.Message {
        constructor(data?: any[] | {
            title?: string;
            description?: string;
            erc20address?: string;
        });
        get title(): string;
        set title(value: string);
        get description(): string;
        set description(value: string);
        get erc20address(): string;
        set erc20address(value: string);
        static fromObject(data: {
            title?: string;
            description?: string;
            erc20address?: string;
        }): RegisterERC20Proposal;
        toObject(): {
            title?: string | undefined;
            description?: string | undefined;
            erc20address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RegisterERC20Proposal;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RegisterERC20Proposal;
    }
    class ToggleTokenConversionProposal extends pb_1.Message {
        constructor(data?: any[] | {
            title?: string;
            description?: string;
            token?: string;
        });
        get title(): string;
        set title(value: string);
        get description(): string;
        set description(value: string);
        get token(): string;
        set token(value: string);
        static fromObject(data: {
            title?: string;
            description?: string;
            token?: string;
        }): ToggleTokenConversionProposal;
        toObject(): {
            title?: string | undefined;
            description?: string | undefined;
            token?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ToggleTokenConversionProposal;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ToggleTokenConversionProposal;
    }
}
//# sourceMappingURL=erc20.d.ts.map