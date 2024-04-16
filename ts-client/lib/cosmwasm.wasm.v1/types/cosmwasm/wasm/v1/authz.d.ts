import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Any } from "../../../google/protobuf/any";
import { AccessConfig } from "./types";
export declare const protobufPackage = "cosmwasm.wasm.v1";
/**
 * StoreCodeAuthorization defines authorization for wasm code upload.
 * Since: wasmd 0.42
 */
export interface StoreCodeAuthorization {
    /** Grants for code upload */
    grants: CodeGrant[];
}
/**
 * ContractExecutionAuthorization defines authorization for wasm execute.
 * Since: wasmd 0.30
 */
export interface ContractExecutionAuthorization {
    /** Grants for contract executions */
    grants: ContractGrant[];
}
/**
 * ContractMigrationAuthorization defines authorization for wasm contract
 * migration. Since: wasmd 0.30
 */
export interface ContractMigrationAuthorization {
    /** Grants for contract migrations */
    grants: ContractGrant[];
}
/** CodeGrant a granted permission for a single code */
export interface CodeGrant {
    /**
     * CodeHash is the unique identifier created by wasmvm
     * Wildcard "*" is used to specify any kind of grant.
     */
    codeHash: Uint8Array;
    /**
     * InstantiatePermission is the superset access control to apply
     * on contract creation.
     * Optional
     */
    instantiatePermission: AccessConfig | undefined;
}
/**
 * ContractGrant a granted permission for a single contract
 * Since: wasmd 0.30
 */
export interface ContractGrant {
    /** Contract is the bech32 address of the smart contract */
    contract: string;
    /**
     * Limit defines execution limits that are enforced and updated when the grant
     * is applied. When the limit lapsed the grant is removed.
     */
    limit: Any | undefined;
    /**
     * Filter define more fine-grained control on the message payload passed
     * to the contract in the operation. When no filter applies on execution, the
     * operation is prohibited.
     */
    filter: Any | undefined;
}
/**
 * MaxCallsLimit limited number of calls to the contract. No funds transferable.
 * Since: wasmd 0.30
 */
export interface MaxCallsLimit {
    /** Remaining number that is decremented on each execution */
    remaining: number;
}
/**
 * MaxFundsLimit defines the maximal amounts that can be sent to the contract.
 * Since: wasmd 0.30
 */
export interface MaxFundsLimit {
    /** Amounts is the maximal amount of tokens transferable to the contract. */
    amounts: Coin[];
}
/**
 * CombinedLimit defines the maximal amounts that can be sent to a contract and
 * the maximal number of calls executable. Both need to remain >0 to be valid.
 * Since: wasmd 0.30
 */
export interface CombinedLimit {
    /** Remaining number that is decremented on each execution */
    callsRemaining: number;
    /** Amounts is the maximal amount of tokens transferable to the contract. */
    amounts: Coin[];
}
/**
 * AllowAllMessagesFilter is a wildcard to allow any type of contract payload
 * message.
 * Since: wasmd 0.30
 */
export interface AllowAllMessagesFilter {
}
/**
 * AcceptedMessageKeysFilter accept only the specific contract message keys in
 * the json object to be executed.
 * Since: wasmd 0.30
 */
export interface AcceptedMessageKeysFilter {
    /** Messages is the list of unique keys */
    keys: string[];
}
/**
 * AcceptedMessagesFilter accept only the specific raw contract messages to be
 * executed.
 * Since: wasmd 0.30
 */
export interface AcceptedMessagesFilter {
    /** Messages is the list of raw contract messages */
    messages: Uint8Array[];
}
export declare const StoreCodeAuthorization: {
    encode(message: StoreCodeAuthorization, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StoreCodeAuthorization;
    fromJSON(object: any): StoreCodeAuthorization;
    toJSON(message: StoreCodeAuthorization): unknown;
    create<I extends {
        grants?: {
            codeHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        }[];
    } & {
        grants?: {
            codeHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        }[] & ({
            codeHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        } & {
            codeHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            } & {
                permission?: import("./types").AccessType;
                addresses?: string[] & string[] & { [K in Exclude<keyof I["grants"][number]["instantiatePermission"]["addresses"], keyof string[]>]: never; };
            } & { [K_1 in Exclude<keyof I["grants"][number]["instantiatePermission"], keyof AccessConfig>]: never; };
        } & { [K_2 in Exclude<keyof I["grants"][number], keyof CodeGrant>]: never; })[] & { [K_3 in Exclude<keyof I["grants"], keyof {
            codeHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I, "grants">]: never; }>(base?: I): StoreCodeAuthorization;
    fromPartial<I_1 extends {
        grants?: {
            codeHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        }[];
    } & {
        grants?: {
            codeHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        }[] & ({
            codeHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        } & {
            codeHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            } & {
                permission?: import("./types").AccessType;
                addresses?: string[] & string[] & { [K_5 in Exclude<keyof I_1["grants"][number]["instantiatePermission"]["addresses"], keyof string[]>]: never; };
            } & { [K_6 in Exclude<keyof I_1["grants"][number]["instantiatePermission"], keyof AccessConfig>]: never; };
        } & { [K_7 in Exclude<keyof I_1["grants"][number], keyof CodeGrant>]: never; })[] & { [K_8 in Exclude<keyof I_1["grants"], keyof {
            codeHash?: Uint8Array;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        }[]>]: never; };
    } & { [K_9 in Exclude<keyof I_1, "grants">]: never; }>(object: I_1): StoreCodeAuthorization;
};
export declare const ContractExecutionAuthorization: {
    encode(message: ContractExecutionAuthorization, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ContractExecutionAuthorization;
    fromJSON(object: any): ContractExecutionAuthorization;
    toJSON(message: ContractExecutionAuthorization): unknown;
    create<I extends {
        grants?: {
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[];
    } & {
        grants?: {
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[] & ({
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["grants"][number]["limit"], keyof Any>]: never; };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_1 in Exclude<keyof I["grants"][number]["filter"], keyof Any>]: never; };
        } & { [K_2 in Exclude<keyof I["grants"][number], keyof ContractGrant>]: never; })[] & { [K_3 in Exclude<keyof I["grants"], keyof {
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I, "grants">]: never; }>(base?: I): ContractExecutionAuthorization;
    fromPartial<I_1 extends {
        grants?: {
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[];
    } & {
        grants?: {
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[] & ({
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_5 in Exclude<keyof I_1["grants"][number]["limit"], keyof Any>]: never; };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_6 in Exclude<keyof I_1["grants"][number]["filter"], keyof Any>]: never; };
        } & { [K_7 in Exclude<keyof I_1["grants"][number], keyof ContractGrant>]: never; })[] & { [K_8 in Exclude<keyof I_1["grants"], keyof {
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[]>]: never; };
    } & { [K_9 in Exclude<keyof I_1, "grants">]: never; }>(object: I_1): ContractExecutionAuthorization;
};
export declare const ContractMigrationAuthorization: {
    encode(message: ContractMigrationAuthorization, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ContractMigrationAuthorization;
    fromJSON(object: any): ContractMigrationAuthorization;
    toJSON(message: ContractMigrationAuthorization): unknown;
    create<I extends {
        grants?: {
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[];
    } & {
        grants?: {
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[] & ({
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["grants"][number]["limit"], keyof Any>]: never; };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_1 in Exclude<keyof I["grants"][number]["filter"], keyof Any>]: never; };
        } & { [K_2 in Exclude<keyof I["grants"][number], keyof ContractGrant>]: never; })[] & { [K_3 in Exclude<keyof I["grants"], keyof {
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I, "grants">]: never; }>(base?: I): ContractMigrationAuthorization;
    fromPartial<I_1 extends {
        grants?: {
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[];
    } & {
        grants?: {
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[] & ({
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_5 in Exclude<keyof I_1["grants"][number]["limit"], keyof Any>]: never; };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_6 in Exclude<keyof I_1["grants"][number]["filter"], keyof Any>]: never; };
        } & { [K_7 in Exclude<keyof I_1["grants"][number], keyof ContractGrant>]: never; })[] & { [K_8 in Exclude<keyof I_1["grants"], keyof {
            contract?: string;
            limit?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            filter?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[]>]: never; };
    } & { [K_9 in Exclude<keyof I_1, "grants">]: never; }>(object: I_1): ContractMigrationAuthorization;
};
export declare const CodeGrant: {
    encode(message: CodeGrant, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CodeGrant;
    fromJSON(object: any): CodeGrant;
    toJSON(message: CodeGrant): unknown;
    create<I extends {
        codeHash?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        };
    } & {
        codeHash?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        } & {
            permission?: import("./types").AccessType;
            addresses?: string[] & string[] & { [K in Exclude<keyof I["instantiatePermission"]["addresses"], keyof string[]>]: never; };
        } & { [K_1 in Exclude<keyof I["instantiatePermission"], keyof AccessConfig>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof CodeGrant>]: never; }>(base?: I): CodeGrant;
    fromPartial<I_1 extends {
        codeHash?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        };
    } & {
        codeHash?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        } & {
            permission?: import("./types").AccessType;
            addresses?: string[] & string[] & { [K_3 in Exclude<keyof I_1["instantiatePermission"]["addresses"], keyof string[]>]: never; };
        } & { [K_4 in Exclude<keyof I_1["instantiatePermission"], keyof AccessConfig>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof CodeGrant>]: never; }>(object: I_1): CodeGrant;
};
export declare const ContractGrant: {
    encode(message: ContractGrant, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ContractGrant;
    fromJSON(object: any): ContractGrant;
    toJSON(message: ContractGrant): unknown;
    create<I extends {
        contract?: string;
        limit?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        filter?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        contract?: string;
        limit?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["limit"], keyof Any>]: never; };
        filter?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_1 in Exclude<keyof I["filter"], keyof Any>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof ContractGrant>]: never; }>(base?: I): ContractGrant;
    fromPartial<I_1 extends {
        contract?: string;
        limit?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        filter?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        contract?: string;
        limit?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_3 in Exclude<keyof I_1["limit"], keyof Any>]: never; };
        filter?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_4 in Exclude<keyof I_1["filter"], keyof Any>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof ContractGrant>]: never; }>(object: I_1): ContractGrant;
};
export declare const MaxCallsLimit: {
    encode(message: MaxCallsLimit, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MaxCallsLimit;
    fromJSON(object: any): MaxCallsLimit;
    toJSON(message: MaxCallsLimit): unknown;
    create<I extends {
        remaining?: number;
    } & {
        remaining?: number;
    } & { [K in Exclude<keyof I, "remaining">]: never; }>(base?: I): MaxCallsLimit;
    fromPartial<I_1 extends {
        remaining?: number;
    } & {
        remaining?: number;
    } & { [K_1 in Exclude<keyof I_1, "remaining">]: never; }>(object: I_1): MaxCallsLimit;
};
export declare const MaxFundsLimit: {
    encode(message: MaxFundsLimit, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MaxFundsLimit;
    fromJSON(object: any): MaxFundsLimit;
    toJSON(message: MaxFundsLimit): unknown;
    create<I extends {
        amounts?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        amounts?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["amounts"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["amounts"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, "amounts">]: never; }>(base?: I): MaxFundsLimit;
    fromPartial<I_1 extends {
        amounts?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        amounts?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["amounts"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["amounts"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "amounts">]: never; }>(object: I_1): MaxFundsLimit;
};
export declare const CombinedLimit: {
    encode(message: CombinedLimit, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CombinedLimit;
    fromJSON(object: any): CombinedLimit;
    toJSON(message: CombinedLimit): unknown;
    create<I extends {
        callsRemaining?: number;
        amounts?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        callsRemaining?: number;
        amounts?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["amounts"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["amounts"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof CombinedLimit>]: never; }>(base?: I): CombinedLimit;
    fromPartial<I_1 extends {
        callsRemaining?: number;
        amounts?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        callsRemaining?: number;
        amounts?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["amounts"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["amounts"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof CombinedLimit>]: never; }>(object: I_1): CombinedLimit;
};
export declare const AllowAllMessagesFilter: {
    encode(_: AllowAllMessagesFilter, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AllowAllMessagesFilter;
    fromJSON(_: any): AllowAllMessagesFilter;
    toJSON(_: AllowAllMessagesFilter): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): AllowAllMessagesFilter;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): AllowAllMessagesFilter;
};
export declare const AcceptedMessageKeysFilter: {
    encode(message: AcceptedMessageKeysFilter, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AcceptedMessageKeysFilter;
    fromJSON(object: any): AcceptedMessageKeysFilter;
    toJSON(message: AcceptedMessageKeysFilter): unknown;
    create<I extends {
        keys?: string[];
    } & {
        keys?: string[] & string[] & { [K in Exclude<keyof I["keys"], keyof string[]>]: never; };
    } & { [K_1 in Exclude<keyof I, "keys">]: never; }>(base?: I): AcceptedMessageKeysFilter;
    fromPartial<I_1 extends {
        keys?: string[];
    } & {
        keys?: string[] & string[] & { [K_2 in Exclude<keyof I_1["keys"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "keys">]: never; }>(object: I_1): AcceptedMessageKeysFilter;
};
export declare const AcceptedMessagesFilter: {
    encode(message: AcceptedMessagesFilter, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AcceptedMessagesFilter;
    fromJSON(object: any): AcceptedMessagesFilter;
    toJSON(message: AcceptedMessagesFilter): unknown;
    create<I extends {
        messages?: Uint8Array[];
    } & {
        messages?: Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["messages"], keyof Uint8Array[]>]: never; };
    } & { [K_1 in Exclude<keyof I, "messages">]: never; }>(base?: I): AcceptedMessagesFilter;
    fromPartial<I_1 extends {
        messages?: Uint8Array[];
    } & {
        messages?: Uint8Array[] & Uint8Array[] & { [K_2 in Exclude<keyof I_1["messages"], keyof Uint8Array[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "messages">]: never; }>(object: I_1): AcceptedMessagesFilter;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
