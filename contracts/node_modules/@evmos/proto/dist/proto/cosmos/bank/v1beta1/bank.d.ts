import * as dependency_3 from "./../../base/v1beta1/coin";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.bank.v1beta1 {
    class Params extends pb_1.Message {
        constructor(data?: any[] | {
            send_enabled?: SendEnabled[];
            default_send_enabled?: boolean;
        });
        get send_enabled(): SendEnabled[];
        set send_enabled(value: SendEnabled[]);
        get default_send_enabled(): boolean;
        set default_send_enabled(value: boolean);
        static fromObject(data: {
            send_enabled?: ReturnType<typeof SendEnabled.prototype.toObject>[];
            default_send_enabled?: boolean;
        }): Params;
        toObject(): {
            send_enabled?: {
                denom?: string | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
            default_send_enabled?: boolean | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Params;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Params;
    }
    class SendEnabled extends pb_1.Message {
        constructor(data?: any[] | {
            denom?: string;
            enabled?: boolean;
        });
        get denom(): string;
        set denom(value: string);
        get enabled(): boolean;
        set enabled(value: boolean);
        static fromObject(data: {
            denom?: string;
            enabled?: boolean;
        }): SendEnabled;
        toObject(): {
            denom?: string | undefined;
            enabled?: boolean | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SendEnabled;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SendEnabled;
    }
    class Input extends pb_1.Message {
        constructor(data?: any[] | {
            address?: string;
            coins?: dependency_3.cosmos.base.v1beta1.Coin[];
        });
        get address(): string;
        set address(value: string);
        get coins(): dependency_3.cosmos.base.v1beta1.Coin[];
        set coins(value: dependency_3.cosmos.base.v1beta1.Coin[]);
        static fromObject(data: {
            address?: string;
            coins?: ReturnType<typeof dependency_3.cosmos.base.v1beta1.Coin.prototype.toObject>[];
        }): Input;
        toObject(): {
            address?: string | undefined;
            coins?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Input;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Input;
    }
    class Output extends pb_1.Message {
        constructor(data?: any[] | {
            address?: string;
            coins?: dependency_3.cosmos.base.v1beta1.Coin[];
        });
        get address(): string;
        set address(value: string);
        get coins(): dependency_3.cosmos.base.v1beta1.Coin[];
        set coins(value: dependency_3.cosmos.base.v1beta1.Coin[]);
        static fromObject(data: {
            address?: string;
            coins?: ReturnType<typeof dependency_3.cosmos.base.v1beta1.Coin.prototype.toObject>[];
        }): Output;
        toObject(): {
            address?: string | undefined;
            coins?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Output;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Output;
    }
    class Supply extends pb_1.Message {
        constructor(data?: any[] | {
            total?: dependency_3.cosmos.base.v1beta1.Coin[];
        });
        get total(): dependency_3.cosmos.base.v1beta1.Coin[];
        set total(value: dependency_3.cosmos.base.v1beta1.Coin[]);
        static fromObject(data: {
            total?: ReturnType<typeof dependency_3.cosmos.base.v1beta1.Coin.prototype.toObject>[];
        }): Supply;
        toObject(): {
            total?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Supply;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Supply;
    }
    class DenomUnit extends pb_1.Message {
        constructor(data?: any[] | {
            denom?: string;
            exponent?: number;
            aliases?: string[];
        });
        get denom(): string;
        set denom(value: string);
        get exponent(): number;
        set exponent(value: number);
        get aliases(): string[];
        set aliases(value: string[]);
        static fromObject(data: {
            denom?: string;
            exponent?: number;
            aliases?: string[];
        }): DenomUnit;
        toObject(): {
            denom?: string | undefined;
            exponent?: number | undefined;
            aliases?: string[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DenomUnit;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DenomUnit;
    }
    class Metadata extends pb_1.Message {
        constructor(data?: any[] | {
            description?: string;
            denom_units?: DenomUnit[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
        });
        get description(): string;
        set description(value: string);
        get denom_units(): DenomUnit[];
        set denom_units(value: DenomUnit[]);
        get base(): string;
        set base(value: string);
        get display(): string;
        set display(value: string);
        get name(): string;
        set name(value: string);
        get symbol(): string;
        set symbol(value: string);
        static fromObject(data: {
            description?: string;
            denom_units?: ReturnType<typeof DenomUnit.prototype.toObject>[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
        }): Metadata;
        toObject(): {
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
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Metadata;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Metadata;
    }
}
//# sourceMappingURL=bank.d.ts.map