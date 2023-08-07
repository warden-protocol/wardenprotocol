import * as dependency_2 from "./../../../../tendermint/abci/types";
import * as dependency_3 from "./../../../../google/protobuf/any";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.base.abci.v1beta1 {
    class TxResponse extends pb_1.Message {
        constructor(data?: any[] | {
            height?: number;
            txhash?: string;
            codespace?: string;
            code?: number;
            data?: string;
            raw_log?: string;
            logs?: ABCIMessageLog[];
            info?: string;
            gas_wanted?: number;
            gas_used?: number;
            tx?: dependency_3.google.protobuf.Any;
            timestamp?: string;
            events?: dependency_2.tendermint.abci.Event[];
        });
        get height(): number;
        set height(value: number);
        get txhash(): string;
        set txhash(value: string);
        get codespace(): string;
        set codespace(value: string);
        get code(): number;
        set code(value: number);
        get data(): string;
        set data(value: string);
        get raw_log(): string;
        set raw_log(value: string);
        get logs(): ABCIMessageLog[];
        set logs(value: ABCIMessageLog[]);
        get info(): string;
        set info(value: string);
        get gas_wanted(): number;
        set gas_wanted(value: number);
        get gas_used(): number;
        set gas_used(value: number);
        get tx(): dependency_3.google.protobuf.Any;
        set tx(value: dependency_3.google.protobuf.Any);
        get timestamp(): string;
        set timestamp(value: string);
        get events(): dependency_2.tendermint.abci.Event[];
        set events(value: dependency_2.tendermint.abci.Event[]);
        static fromObject(data: {
            height?: number;
            txhash?: string;
            codespace?: string;
            code?: number;
            data?: string;
            raw_log?: string;
            logs?: ReturnType<typeof ABCIMessageLog.prototype.toObject>[];
            info?: string;
            gas_wanted?: number;
            gas_used?: number;
            tx?: ReturnType<typeof dependency_3.google.protobuf.Any.prototype.toObject>;
            timestamp?: string;
            events?: ReturnType<typeof dependency_2.tendermint.abci.Event.prototype.toObject>[];
        }): TxResponse;
        toObject(): {
            height?: number | undefined;
            txhash?: string | undefined;
            codespace?: string | undefined;
            code?: number | undefined;
            data?: string | undefined;
            raw_log?: string | undefined;
            logs?: {
                msg_index?: number | undefined;
                log?: string | undefined;
                events?: {
                    type?: string | undefined;
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
            info?: string | undefined;
            gas_wanted?: number | undefined;
            gas_used?: number | undefined;
            tx?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            timestamp?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TxResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TxResponse;
    }
    class ABCIMessageLog extends pb_1.Message {
        constructor(data?: any[] | {
            msg_index?: number;
            log?: string;
            events?: StringEvent[];
        });
        get msg_index(): number;
        set msg_index(value: number);
        get log(): string;
        set log(value: string);
        get events(): StringEvent[];
        set events(value: StringEvent[]);
        static fromObject(data: {
            msg_index?: number;
            log?: string;
            events?: ReturnType<typeof StringEvent.prototype.toObject>[];
        }): ABCIMessageLog;
        toObject(): {
            msg_index?: number | undefined;
            log?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ABCIMessageLog;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ABCIMessageLog;
    }
    class StringEvent extends pb_1.Message {
        constructor(data?: any[] | {
            type?: string;
            attributes?: Attribute[];
        });
        get type(): string;
        set type(value: string);
        get attributes(): Attribute[];
        set attributes(value: Attribute[]);
        static fromObject(data: {
            type?: string;
            attributes?: ReturnType<typeof Attribute.prototype.toObject>[];
        }): StringEvent;
        toObject(): {
            type?: string | undefined;
            attributes?: {
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): StringEvent;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): StringEvent;
    }
    class Attribute extends pb_1.Message {
        constructor(data?: any[] | {
            key?: string;
            value?: string;
        });
        get key(): string;
        set key(value: string);
        get value(): string;
        set value(value: string);
        static fromObject(data: {
            key?: string;
            value?: string;
        }): Attribute;
        toObject(): {
            key?: string | undefined;
            value?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Attribute;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Attribute;
    }
    class GasInfo extends pb_1.Message {
        constructor(data?: any[] | {
            gas_wanted?: number;
            gas_used?: number;
        });
        get gas_wanted(): number;
        set gas_wanted(value: number);
        get gas_used(): number;
        set gas_used(value: number);
        static fromObject(data: {
            gas_wanted?: number;
            gas_used?: number;
        }): GasInfo;
        toObject(): {
            gas_wanted?: number | undefined;
            gas_used?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GasInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GasInfo;
    }
    class Result extends pb_1.Message {
        constructor(data?: any[] | {
            data?: Uint8Array;
            log?: string;
            events?: dependency_2.tendermint.abci.Event[];
        });
        get data(): Uint8Array;
        set data(value: Uint8Array);
        get log(): string;
        set log(value: string);
        get events(): dependency_2.tendermint.abci.Event[];
        set events(value: dependency_2.tendermint.abci.Event[]);
        static fromObject(data: {
            data?: Uint8Array;
            log?: string;
            events?: ReturnType<typeof dependency_2.tendermint.abci.Event.prototype.toObject>[];
        }): Result;
        toObject(): {
            data?: Uint8Array | undefined;
            log?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Result;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Result;
    }
    class SimulationResponse extends pb_1.Message {
        constructor(data?: any[] | {
            gas_info?: GasInfo;
            result?: Result;
        });
        get gas_info(): GasInfo;
        set gas_info(value: GasInfo);
        get result(): Result;
        set result(value: Result);
        static fromObject(data: {
            gas_info?: ReturnType<typeof GasInfo.prototype.toObject>;
            result?: ReturnType<typeof Result.prototype.toObject>;
        }): SimulationResponse;
        toObject(): {
            gas_info?: {
                gas_wanted?: number | undefined;
                gas_used?: number | undefined;
            } | undefined;
            result?: {
                data?: Uint8Array | undefined;
                log?: string | undefined;
                events?: {
                    type?: string | undefined;
                    attributes?: {
                        key?: Uint8Array | undefined;
                        value?: Uint8Array | undefined;
                        index?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SimulationResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SimulationResponse;
    }
    class MsgData extends pb_1.Message {
        constructor(data?: any[] | {
            msg_type?: string;
            data?: Uint8Array;
        });
        get msg_type(): string;
        set msg_type(value: string);
        get data(): Uint8Array;
        set data(value: Uint8Array);
        static fromObject(data: {
            msg_type?: string;
            data?: Uint8Array;
        }): MsgData;
        toObject(): {
            msg_type?: string | undefined;
            data?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgData;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgData;
    }
    class TxMsgData extends pb_1.Message {
        constructor(data?: any[] | {
            data?: MsgData[];
        });
        get data(): MsgData[];
        set data(value: MsgData[]);
        static fromObject(data: {
            data?: ReturnType<typeof MsgData.prototype.toObject>[];
        }): TxMsgData;
        toObject(): {
            data?: {
                msg_type?: string | undefined;
                data?: Uint8Array | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TxMsgData;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TxMsgData;
    }
    class SearchTxsResult extends pb_1.Message {
        constructor(data?: any[] | {
            total_count?: number;
            count?: number;
            page_number?: number;
            page_total?: number;
            limit?: number;
            txs?: TxResponse[];
        });
        get total_count(): number;
        set total_count(value: number);
        get count(): number;
        set count(value: number);
        get page_number(): number;
        set page_number(value: number);
        get page_total(): number;
        set page_total(value: number);
        get limit(): number;
        set limit(value: number);
        get txs(): TxResponse[];
        set txs(value: TxResponse[]);
        static fromObject(data: {
            total_count?: number;
            count?: number;
            page_number?: number;
            page_total?: number;
            limit?: number;
            txs?: ReturnType<typeof TxResponse.prototype.toObject>[];
        }): SearchTxsResult;
        toObject(): {
            total_count?: number | undefined;
            count?: number | undefined;
            page_number?: number | undefined;
            page_total?: number | undefined;
            limit?: number | undefined;
            txs?: {
                height?: number | undefined;
                txhash?: string | undefined;
                codespace?: string | undefined;
                code?: number | undefined;
                data?: string | undefined;
                raw_log?: string | undefined;
                logs?: {
                    msg_index?: number | undefined;
                    log?: string | undefined;
                    events?: {
                        type?: string | undefined;
                        attributes?: {
                            key?: string | undefined;
                            value?: string | undefined;
                        }[] | undefined;
                    }[] | undefined;
                }[] | undefined;
                info?: string | undefined;
                gas_wanted?: number | undefined;
                gas_used?: number | undefined;
                tx?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                timestamp?: string | undefined;
                events?: {
                    type?: string | undefined;
                    attributes?: {
                        key?: Uint8Array | undefined;
                        value?: Uint8Array | undefined;
                        index?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SearchTxsResult;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SearchTxsResult;
    }
}
//# sourceMappingURL=abci.d.ts.map