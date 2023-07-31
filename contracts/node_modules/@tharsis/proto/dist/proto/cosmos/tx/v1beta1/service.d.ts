import * as dependency_2 from "./../../base/abci/v1beta1/abci";
import * as dependency_3 from "./tx";
import * as dependency_5 from "./../../base/query/v1beta1/pagination";
import * as dependency_6 from "./../../../tendermint/types/block";
import * as dependency_7 from "./../../../tendermint/types/types";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.tx.v1beta1 {
    enum OrderBy {
        ORDER_BY_UNSPECIFIED = 0,
        ORDER_BY_ASC = 1,
        ORDER_BY_DESC = 2
    }
    enum BroadcastMode {
        BROADCAST_MODE_UNSPECIFIED = 0,
        BROADCAST_MODE_BLOCK = 1,
        BROADCAST_MODE_SYNC = 2,
        BROADCAST_MODE_ASYNC = 3
    }
    class GetTxsEventRequest extends pb_1.Message {
        constructor(data?: any[] | {
            events?: string[];
            pagination?: dependency_5.cosmos.base.query.v1beta1.PageRequest;
            order_by?: OrderBy;
        });
        get events(): string[];
        set events(value: string[]);
        get pagination(): dependency_5.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_5.cosmos.base.query.v1beta1.PageRequest);
        get order_by(): OrderBy;
        set order_by(value: OrderBy);
        static fromObject(data: {
            events?: string[];
            pagination?: ReturnType<typeof dependency_5.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
            order_by?: OrderBy;
        }): GetTxsEventRequest;
        toObject(): {
            events?: string[] | undefined;
            pagination?: {
                key?: Uint8Array | undefined;
                offset?: number | undefined;
                limit?: number | undefined;
                count_total?: boolean | undefined;
                reverse?: boolean | undefined;
            } | undefined;
            order_by?: OrderBy | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetTxsEventRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetTxsEventRequest;
    }
    class GetTxsEventResponse extends pb_1.Message {
        constructor(data?: any[] | {
            txs?: dependency_3.cosmos.tx.v1beta1.Tx[];
            tx_responses?: dependency_2.cosmos.base.abci.v1beta1.TxResponse[];
            pagination?: dependency_5.cosmos.base.query.v1beta1.PageResponse;
        });
        get txs(): dependency_3.cosmos.tx.v1beta1.Tx[];
        set txs(value: dependency_3.cosmos.tx.v1beta1.Tx[]);
        get tx_responses(): dependency_2.cosmos.base.abci.v1beta1.TxResponse[];
        set tx_responses(value: dependency_2.cosmos.base.abci.v1beta1.TxResponse[]);
        get pagination(): dependency_5.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_5.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            txs?: ReturnType<typeof dependency_3.cosmos.tx.v1beta1.Tx.prototype.toObject>[];
            tx_responses?: ReturnType<typeof dependency_2.cosmos.base.abci.v1beta1.TxResponse.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_5.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): GetTxsEventResponse;
        toObject(): {
            txs?: {
                body?: {
                    messages?: {
                        type_url?: string | undefined;
                        value?: Uint8Array | undefined;
                    }[] | undefined;
                    memo?: string | undefined;
                    timeout_height?: number | undefined;
                    extension_options?: {
                        type_url?: string | undefined;
                        value?: Uint8Array | undefined;
                    }[] | undefined;
                    non_critical_extension_options?: {
                        type_url?: string | undefined;
                        value?: Uint8Array | undefined;
                    }[] | undefined;
                } | undefined;
                auth_info?: {
                    signer_infos?: {
                        public_key?: {
                            type_url?: string | undefined;
                            value?: Uint8Array | undefined;
                        } | undefined;
                        mode_info?: {
                            single?: {
                                mode?: import("../signing/v1beta1/signing").cosmos.tx.signing.v1beta1.SignMode | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extra_bits_stored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                mode_infos?: any[] | undefined;
                            } | undefined;
                        } | undefined;
                        sequence?: number | undefined;
                    }[] | undefined;
                    fee?: {
                        amount?: {
                            denom?: string | undefined;
                            amount?: string | undefined;
                        }[] | undefined;
                        gas_limit?: number | undefined;
                        payer?: string | undefined;
                        granter?: string | undefined;
                    } | undefined;
                } | undefined;
                signatures?: Uint8Array[] | undefined;
            }[] | undefined;
            tx_responses?: {
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
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetTxsEventResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetTxsEventResponse;
    }
    class BroadcastTxRequest extends pb_1.Message {
        constructor(data?: any[] | {
            tx_bytes?: Uint8Array;
            mode?: BroadcastMode;
        });
        get tx_bytes(): Uint8Array;
        set tx_bytes(value: Uint8Array);
        get mode(): BroadcastMode;
        set mode(value: BroadcastMode);
        static fromObject(data: {
            tx_bytes?: Uint8Array;
            mode?: BroadcastMode;
        }): BroadcastTxRequest;
        toObject(): {
            tx_bytes?: Uint8Array | undefined;
            mode?: BroadcastMode | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BroadcastTxRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BroadcastTxRequest;
    }
    class BroadcastTxResponse extends pb_1.Message {
        constructor(data?: any[] | {
            tx_response?: dependency_2.cosmos.base.abci.v1beta1.TxResponse;
        });
        get tx_response(): dependency_2.cosmos.base.abci.v1beta1.TxResponse;
        set tx_response(value: dependency_2.cosmos.base.abci.v1beta1.TxResponse);
        static fromObject(data: {
            tx_response?: ReturnType<typeof dependency_2.cosmos.base.abci.v1beta1.TxResponse.prototype.toObject>;
        }): BroadcastTxResponse;
        toObject(): {
            tx_response?: {
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
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BroadcastTxResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BroadcastTxResponse;
    }
    class SimulateRequest extends pb_1.Message {
        constructor(data?: any[] | {
            tx?: dependency_3.cosmos.tx.v1beta1.Tx;
            tx_bytes?: Uint8Array;
        });
        get tx(): dependency_3.cosmos.tx.v1beta1.Tx;
        set tx(value: dependency_3.cosmos.tx.v1beta1.Tx);
        get tx_bytes(): Uint8Array;
        set tx_bytes(value: Uint8Array);
        static fromObject(data: {
            tx?: ReturnType<typeof dependency_3.cosmos.tx.v1beta1.Tx.prototype.toObject>;
            tx_bytes?: Uint8Array;
        }): SimulateRequest;
        toObject(): {
            tx?: {
                body?: {
                    messages?: {
                        type_url?: string | undefined;
                        value?: Uint8Array | undefined;
                    }[] | undefined;
                    memo?: string | undefined;
                    timeout_height?: number | undefined;
                    extension_options?: {
                        type_url?: string | undefined;
                        value?: Uint8Array | undefined;
                    }[] | undefined;
                    non_critical_extension_options?: {
                        type_url?: string | undefined;
                        value?: Uint8Array | undefined;
                    }[] | undefined;
                } | undefined;
                auth_info?: {
                    signer_infos?: {
                        public_key?: {
                            type_url?: string | undefined;
                            value?: Uint8Array | undefined;
                        } | undefined;
                        mode_info?: {
                            single?: {
                                mode?: import("../signing/v1beta1/signing").cosmos.tx.signing.v1beta1.SignMode | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extra_bits_stored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                mode_infos?: any[] | undefined;
                            } | undefined;
                        } | undefined;
                        sequence?: number | undefined;
                    }[] | undefined;
                    fee?: {
                        amount?: {
                            denom?: string | undefined;
                            amount?: string | undefined;
                        }[] | undefined;
                        gas_limit?: number | undefined;
                        payer?: string | undefined;
                        granter?: string | undefined;
                    } | undefined;
                } | undefined;
                signatures?: Uint8Array[] | undefined;
            } | undefined;
            tx_bytes?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SimulateRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SimulateRequest;
    }
    class SimulateResponse extends pb_1.Message {
        constructor(data?: any[] | {
            gas_info?: dependency_2.cosmos.base.abci.v1beta1.GasInfo;
            result?: dependency_2.cosmos.base.abci.v1beta1.Result;
        });
        get gas_info(): dependency_2.cosmos.base.abci.v1beta1.GasInfo;
        set gas_info(value: dependency_2.cosmos.base.abci.v1beta1.GasInfo);
        get result(): dependency_2.cosmos.base.abci.v1beta1.Result;
        set result(value: dependency_2.cosmos.base.abci.v1beta1.Result);
        static fromObject(data: {
            gas_info?: ReturnType<typeof dependency_2.cosmos.base.abci.v1beta1.GasInfo.prototype.toObject>;
            result?: ReturnType<typeof dependency_2.cosmos.base.abci.v1beta1.Result.prototype.toObject>;
        }): SimulateResponse;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SimulateResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SimulateResponse;
    }
    class GetTxRequest extends pb_1.Message {
        constructor(data?: any[] | {
            hash?: string;
        });
        get hash(): string;
        set hash(value: string);
        static fromObject(data: {
            hash?: string;
        }): GetTxRequest;
        toObject(): {
            hash?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetTxRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetTxRequest;
    }
    class GetTxResponse extends pb_1.Message {
        constructor(data?: any[] | {
            tx?: dependency_3.cosmos.tx.v1beta1.Tx;
            tx_response?: dependency_2.cosmos.base.abci.v1beta1.TxResponse;
        });
        get tx(): dependency_3.cosmos.tx.v1beta1.Tx;
        set tx(value: dependency_3.cosmos.tx.v1beta1.Tx);
        get tx_response(): dependency_2.cosmos.base.abci.v1beta1.TxResponse;
        set tx_response(value: dependency_2.cosmos.base.abci.v1beta1.TxResponse);
        static fromObject(data: {
            tx?: ReturnType<typeof dependency_3.cosmos.tx.v1beta1.Tx.prototype.toObject>;
            tx_response?: ReturnType<typeof dependency_2.cosmos.base.abci.v1beta1.TxResponse.prototype.toObject>;
        }): GetTxResponse;
        toObject(): {
            tx?: {
                body?: {
                    messages?: {
                        type_url?: string | undefined;
                        value?: Uint8Array | undefined;
                    }[] | undefined;
                    memo?: string | undefined;
                    timeout_height?: number | undefined;
                    extension_options?: {
                        type_url?: string | undefined;
                        value?: Uint8Array | undefined;
                    }[] | undefined;
                    non_critical_extension_options?: {
                        type_url?: string | undefined;
                        value?: Uint8Array | undefined;
                    }[] | undefined;
                } | undefined;
                auth_info?: {
                    signer_infos?: {
                        public_key?: {
                            type_url?: string | undefined;
                            value?: Uint8Array | undefined;
                        } | undefined;
                        mode_info?: {
                            single?: {
                                mode?: import("../signing/v1beta1/signing").cosmos.tx.signing.v1beta1.SignMode | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extra_bits_stored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                mode_infos?: any[] | undefined;
                            } | undefined;
                        } | undefined;
                        sequence?: number | undefined;
                    }[] | undefined;
                    fee?: {
                        amount?: {
                            denom?: string | undefined;
                            amount?: string | undefined;
                        }[] | undefined;
                        gas_limit?: number | undefined;
                        payer?: string | undefined;
                        granter?: string | undefined;
                    } | undefined;
                } | undefined;
                signatures?: Uint8Array[] | undefined;
            } | undefined;
            tx_response?: {
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
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetTxResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetTxResponse;
    }
    class GetBlockWithTxsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            height?: number;
            pagination?: dependency_5.cosmos.base.query.v1beta1.PageRequest;
        });
        get height(): number;
        set height(value: number);
        get pagination(): dependency_5.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_5.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            height?: number;
            pagination?: ReturnType<typeof dependency_5.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): GetBlockWithTxsRequest;
        toObject(): {
            height?: number | undefined;
            pagination?: {
                key?: Uint8Array | undefined;
                offset?: number | undefined;
                limit?: number | undefined;
                count_total?: boolean | undefined;
                reverse?: boolean | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetBlockWithTxsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetBlockWithTxsRequest;
    }
    class GetBlockWithTxsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            txs?: dependency_3.cosmos.tx.v1beta1.Tx[];
            block_id?: dependency_7.tendermint.types.BlockID;
            block?: dependency_6.tendermint.types.Block;
            pagination?: dependency_5.cosmos.base.query.v1beta1.PageResponse;
        });
        get txs(): dependency_3.cosmos.tx.v1beta1.Tx[];
        set txs(value: dependency_3.cosmos.tx.v1beta1.Tx[]);
        get block_id(): dependency_7.tendermint.types.BlockID;
        set block_id(value: dependency_7.tendermint.types.BlockID);
        get block(): dependency_6.tendermint.types.Block;
        set block(value: dependency_6.tendermint.types.Block);
        get pagination(): dependency_5.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_5.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            txs?: ReturnType<typeof dependency_3.cosmos.tx.v1beta1.Tx.prototype.toObject>[];
            block_id?: ReturnType<typeof dependency_7.tendermint.types.BlockID.prototype.toObject>;
            block?: ReturnType<typeof dependency_6.tendermint.types.Block.prototype.toObject>;
            pagination?: ReturnType<typeof dependency_5.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): GetBlockWithTxsResponse;
        toObject(): {
            txs?: {
                body?: {
                    messages?: {
                        type_url?: string | undefined;
                        value?: Uint8Array | undefined;
                    }[] | undefined;
                    memo?: string | undefined;
                    timeout_height?: number | undefined;
                    extension_options?: {
                        type_url?: string | undefined;
                        value?: Uint8Array | undefined;
                    }[] | undefined;
                    non_critical_extension_options?: {
                        type_url?: string | undefined;
                        value?: Uint8Array | undefined;
                    }[] | undefined;
                } | undefined;
                auth_info?: {
                    signer_infos?: {
                        public_key?: {
                            type_url?: string | undefined;
                            value?: Uint8Array | undefined;
                        } | undefined;
                        mode_info?: {
                            single?: {
                                mode?: import("../signing/v1beta1/signing").cosmos.tx.signing.v1beta1.SignMode | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extra_bits_stored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                mode_infos?: any[] | undefined;
                            } | undefined;
                        } | undefined;
                        sequence?: number | undefined;
                    }[] | undefined;
                    fee?: {
                        amount?: {
                            denom?: string | undefined;
                            amount?: string | undefined;
                        }[] | undefined;
                        gas_limit?: number | undefined;
                        payer?: string | undefined;
                        granter?: string | undefined;
                    } | undefined;
                } | undefined;
                signatures?: Uint8Array[] | undefined;
            }[] | undefined;
            block_id?: {
                hash?: Uint8Array | undefined;
                part_set_header?: {
                    total?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            block?: {
                header?: {
                    version?: {
                        block?: number | undefined;
                        app?: number | undefined;
                    } | undefined;
                    chain_id?: string | undefined;
                    height?: number | undefined;
                    time?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    last_block_id?: {
                        hash?: Uint8Array | undefined;
                        part_set_header?: {
                            total?: number | undefined;
                            hash?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    last_commit_hash?: Uint8Array | undefined;
                    data_hash?: Uint8Array | undefined;
                    validators_hash?: Uint8Array | undefined;
                    next_validators_hash?: Uint8Array | undefined;
                    consensus_hash?: Uint8Array | undefined;
                    app_hash?: Uint8Array | undefined;
                    last_results_hash?: Uint8Array | undefined;
                    evidence_hash?: Uint8Array | undefined;
                    proposer_address?: Uint8Array | undefined;
                } | undefined;
                data?: {
                    txs?: Uint8Array[] | undefined;
                } | undefined;
                evidence?: {
                    evidence?: {
                        duplicate_vote_evidence?: {
                            vote_a?: {
                                type?: dependency_7.tendermint.types.SignedMsgType | undefined;
                                height?: number | undefined;
                                round?: number | undefined;
                                block_id?: {
                                    hash?: Uint8Array | undefined;
                                    part_set_header?: {
                                        total?: number | undefined;
                                        hash?: Uint8Array | undefined;
                                    } | undefined;
                                } | undefined;
                                timestamp?: {
                                    seconds?: number | undefined;
                                    nanos?: number | undefined;
                                } | undefined;
                                validator_address?: Uint8Array | undefined;
                                validator_index?: number | undefined;
                                signature?: Uint8Array | undefined;
                            } | undefined;
                            vote_b?: {
                                type?: dependency_7.tendermint.types.SignedMsgType | undefined;
                                height?: number | undefined;
                                round?: number | undefined;
                                block_id?: {
                                    hash?: Uint8Array | undefined;
                                    part_set_header?: {
                                        total?: number | undefined;
                                        hash?: Uint8Array | undefined;
                                    } | undefined;
                                } | undefined;
                                timestamp?: {
                                    seconds?: number | undefined;
                                    nanos?: number | undefined;
                                } | undefined;
                                validator_address?: Uint8Array | undefined;
                                validator_index?: number | undefined;
                                signature?: Uint8Array | undefined;
                            } | undefined;
                            total_voting_power?: number | undefined;
                            validator_power?: number | undefined;
                            timestamp?: {
                                seconds?: number | undefined;
                                nanos?: number | undefined;
                            } | undefined;
                        } | undefined;
                        light_client_attack_evidence?: {
                            conflicting_block?: {
                                signed_header?: {
                                    header?: {
                                        version?: {
                                            block?: number | undefined;
                                            app?: number | undefined;
                                        } | undefined;
                                        chain_id?: string | undefined;
                                        height?: number | undefined;
                                        time?: {
                                            seconds?: number | undefined;
                                            nanos?: number | undefined;
                                        } | undefined;
                                        last_block_id?: {
                                            hash?: Uint8Array | undefined;
                                            part_set_header?: {
                                                total?: number | undefined;
                                                hash?: Uint8Array | undefined;
                                            } | undefined;
                                        } | undefined;
                                        last_commit_hash?: Uint8Array | undefined;
                                        data_hash?: Uint8Array | undefined;
                                        validators_hash?: Uint8Array | undefined;
                                        next_validators_hash?: Uint8Array | undefined;
                                        consensus_hash?: Uint8Array | undefined;
                                        app_hash?: Uint8Array | undefined;
                                        last_results_hash?: Uint8Array | undefined;
                                        evidence_hash?: Uint8Array | undefined;
                                        proposer_address?: Uint8Array | undefined;
                                    } | undefined;
                                    commit?: {
                                        height?: number | undefined;
                                        round?: number | undefined;
                                        block_id?: {
                                            hash?: Uint8Array | undefined;
                                            part_set_header?: {
                                                total?: number | undefined;
                                                hash?: Uint8Array | undefined;
                                            } | undefined;
                                        } | undefined;
                                        signatures?: {
                                            block_id_flag?: dependency_7.tendermint.types.BlockIDFlag | undefined;
                                            validator_address?: Uint8Array | undefined;
                                            timestamp?: {
                                                seconds?: number | undefined;
                                                nanos?: number | undefined;
                                            } | undefined;
                                            signature?: Uint8Array | undefined;
                                        }[] | undefined;
                                    } | undefined;
                                } | undefined;
                                validator_set?: {
                                    validators?: {
                                        address?: Uint8Array | undefined;
                                        pub_key?: {
                                            ed25519?: Uint8Array | undefined;
                                            secp256k1?: Uint8Array | undefined;
                                        } | undefined;
                                        voting_power?: number | undefined;
                                        proposer_priority?: number | undefined;
                                    }[] | undefined;
                                    proposer?: {
                                        address?: Uint8Array | undefined;
                                        pub_key?: {
                                            ed25519?: Uint8Array | undefined;
                                            secp256k1?: Uint8Array | undefined;
                                        } | undefined;
                                        voting_power?: number | undefined;
                                        proposer_priority?: number | undefined;
                                    } | undefined;
                                    total_voting_power?: number | undefined;
                                } | undefined;
                            } | undefined;
                            common_height?: number | undefined;
                            byzantine_validators?: {
                                address?: Uint8Array | undefined;
                                pub_key?: {
                                    ed25519?: Uint8Array | undefined;
                                    secp256k1?: Uint8Array | undefined;
                                } | undefined;
                                voting_power?: number | undefined;
                                proposer_priority?: number | undefined;
                            }[] | undefined;
                            total_voting_power?: number | undefined;
                            timestamp?: {
                                seconds?: number | undefined;
                                nanos?: number | undefined;
                            } | undefined;
                        } | undefined;
                    }[] | undefined;
                } | undefined;
                last_commit?: {
                    height?: number | undefined;
                    round?: number | undefined;
                    block_id?: {
                        hash?: Uint8Array | undefined;
                        part_set_header?: {
                            total?: number | undefined;
                            hash?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    signatures?: {
                        block_id_flag?: dependency_7.tendermint.types.BlockIDFlag | undefined;
                        validator_address?: Uint8Array | undefined;
                        timestamp?: {
                            seconds?: number | undefined;
                            nanos?: number | undefined;
                        } | undefined;
                        signature?: Uint8Array | undefined;
                    }[] | undefined;
                } | undefined;
            } | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetBlockWithTxsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetBlockWithTxsResponse;
    }
}
//# sourceMappingURL=service.d.ts.map