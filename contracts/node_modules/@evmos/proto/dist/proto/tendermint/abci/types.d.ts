import * as dependency_1 from "./../crypto/proof";
import * as dependency_2 from "./../types/types";
import * as dependency_3 from "./../crypto/keys";
import * as dependency_4 from "./../types/params";
import * as dependency_5 from "./../../google/protobuf/timestamp";
import * as pb_1 from "google-protobuf";
export declare namespace tendermint.abci {
    enum CheckTxType {
        NEW = 0,
        RECHECK = 1
    }
    enum EvidenceType {
        UNKNOWN = 0,
        DUPLICATE_VOTE = 1,
        LIGHT_CLIENT_ATTACK = 2
    }
    class Request extends pb_1.Message {
        constructor(data?: any[] | ({} & (({
            echo?: RequestEcho;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            echo?: never;
            flush?: RequestFlush;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            echo?: never;
            flush?: never;
            info?: RequestInfo;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: RequestSetOption;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: RequestInitChain;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: RequestQuery;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: RequestBeginBlock;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: RequestCheckTx;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: RequestDeliverTx;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: RequestEndBlock;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: RequestCommit;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: RequestListSnapshots;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: RequestOfferSnapshot;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: RequestLoadSnapshotChunk;
            apply_snapshot_chunk?: never;
        } | {
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: RequestApplySnapshotChunk;
        }))));
        get echo(): RequestEcho;
        set echo(value: RequestEcho);
        get flush(): RequestFlush;
        set flush(value: RequestFlush);
        get info(): RequestInfo;
        set info(value: RequestInfo);
        get set_option(): RequestSetOption;
        set set_option(value: RequestSetOption);
        get init_chain(): RequestInitChain;
        set init_chain(value: RequestInitChain);
        get query(): RequestQuery;
        set query(value: RequestQuery);
        get begin_block(): RequestBeginBlock;
        set begin_block(value: RequestBeginBlock);
        get check_tx(): RequestCheckTx;
        set check_tx(value: RequestCheckTx);
        get deliver_tx(): RequestDeliverTx;
        set deliver_tx(value: RequestDeliverTx);
        get end_block(): RequestEndBlock;
        set end_block(value: RequestEndBlock);
        get commit(): RequestCommit;
        set commit(value: RequestCommit);
        get list_snapshots(): RequestListSnapshots;
        set list_snapshots(value: RequestListSnapshots);
        get offer_snapshot(): RequestOfferSnapshot;
        set offer_snapshot(value: RequestOfferSnapshot);
        get load_snapshot_chunk(): RequestLoadSnapshotChunk;
        set load_snapshot_chunk(value: RequestLoadSnapshotChunk);
        get apply_snapshot_chunk(): RequestApplySnapshotChunk;
        set apply_snapshot_chunk(value: RequestApplySnapshotChunk);
        get value(): "none" | "info" | "commit" | "echo" | "flush" | "set_option" | "init_chain" | "query" | "begin_block" | "check_tx" | "deliver_tx" | "end_block" | "list_snapshots" | "offer_snapshot" | "load_snapshot_chunk" | "apply_snapshot_chunk";
        static fromObject(data: {
            echo?: ReturnType<typeof RequestEcho.prototype.toObject>;
            flush?: ReturnType<typeof RequestFlush.prototype.toObject>;
            info?: ReturnType<typeof RequestInfo.prototype.toObject>;
            set_option?: ReturnType<typeof RequestSetOption.prototype.toObject>;
            init_chain?: ReturnType<typeof RequestInitChain.prototype.toObject>;
            query?: ReturnType<typeof RequestQuery.prototype.toObject>;
            begin_block?: ReturnType<typeof RequestBeginBlock.prototype.toObject>;
            check_tx?: ReturnType<typeof RequestCheckTx.prototype.toObject>;
            deliver_tx?: ReturnType<typeof RequestDeliverTx.prototype.toObject>;
            end_block?: ReturnType<typeof RequestEndBlock.prototype.toObject>;
            commit?: ReturnType<typeof RequestCommit.prototype.toObject>;
            list_snapshots?: ReturnType<typeof RequestListSnapshots.prototype.toObject>;
            offer_snapshot?: ReturnType<typeof RequestOfferSnapshot.prototype.toObject>;
            load_snapshot_chunk?: ReturnType<typeof RequestLoadSnapshotChunk.prototype.toObject>;
            apply_snapshot_chunk?: ReturnType<typeof RequestApplySnapshotChunk.prototype.toObject>;
        }): Request;
        toObject(): {
            echo?: {
                message?: string | undefined;
            } | undefined;
            flush?: {} | undefined;
            info?: {
                version?: string | undefined;
                block_version?: number | undefined;
                p2p_version?: number | undefined;
            } | undefined;
            set_option?: {
                key?: string | undefined;
                value?: string | undefined;
            } | undefined;
            init_chain?: {
                time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                chain_id?: string | undefined;
                consensus_params?: {
                    block?: {
                        max_bytes?: number | undefined;
                        max_gas?: number | undefined;
                    } | undefined;
                    evidence?: {
                        max_age_num_blocks?: number | undefined;
                        max_age_duration?: {
                            seconds?: number | undefined;
                            nanos?: number | undefined;
                        } | undefined;
                        max_bytes?: number | undefined;
                    } | undefined;
                    validator?: {
                        pub_key_types?: string[] | undefined;
                    } | undefined;
                    version?: {
                        app_version?: number | undefined;
                    } | undefined;
                } | undefined;
                validators?: {
                    pub_key?: {
                        ed25519?: Uint8Array | undefined;
                        secp256k1?: Uint8Array | undefined;
                    } | undefined;
                    power?: number | undefined;
                }[] | undefined;
                app_state_bytes?: Uint8Array | undefined;
                initial_height?: number | undefined;
            } | undefined;
            query?: {
                data?: Uint8Array | undefined;
                path?: string | undefined;
                height?: number | undefined;
                prove?: boolean | undefined;
            } | undefined;
            begin_block?: {
                hash?: Uint8Array | undefined;
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
                last_commit_info?: {
                    round?: number | undefined;
                    votes?: {
                        validator?: {
                            address?: Uint8Array | undefined;
                            power?: number | undefined;
                        } | undefined;
                        signed_last_block?: boolean | undefined;
                    }[] | undefined;
                } | undefined;
                byzantine_validators?: {
                    type?: EvidenceType | undefined;
                    validator?: {
                        address?: Uint8Array | undefined;
                        power?: number | undefined;
                    } | undefined;
                    height?: number | undefined;
                    time?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    total_voting_power?: number | undefined;
                }[] | undefined;
            } | undefined;
            check_tx?: {
                tx?: Uint8Array | undefined;
                type?: CheckTxType | undefined;
            } | undefined;
            deliver_tx?: {
                tx?: Uint8Array | undefined;
            } | undefined;
            end_block?: {
                height?: number | undefined;
            } | undefined;
            commit?: {} | undefined;
            list_snapshots?: {} | undefined;
            offer_snapshot?: {
                snapshot?: {
                    height?: number | undefined;
                    format?: number | undefined;
                    chunks?: number | undefined;
                    hash?: Uint8Array | undefined;
                    metadata?: Uint8Array | undefined;
                } | undefined;
                app_hash?: Uint8Array | undefined;
            } | undefined;
            load_snapshot_chunk?: {
                height?: number | undefined;
                format?: number | undefined;
                chunk?: number | undefined;
            } | undefined;
            apply_snapshot_chunk?: {
                index?: number | undefined;
                chunk?: Uint8Array | undefined;
                sender?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Request;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Request;
    }
    class RequestEcho extends pb_1.Message {
        constructor(data?: any[] | {
            message?: string;
        });
        get message(): string;
        set message(value: string);
        static fromObject(data: {
            message?: string;
        }): RequestEcho;
        toObject(): {
            message?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RequestEcho;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RequestEcho;
    }
    class RequestFlush extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): RequestFlush;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RequestFlush;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RequestFlush;
    }
    class RequestInfo extends pb_1.Message {
        constructor(data?: any[] | {
            version?: string;
            block_version?: number;
            p2p_version?: number;
        });
        get version(): string;
        set version(value: string);
        get block_version(): number;
        set block_version(value: number);
        get p2p_version(): number;
        set p2p_version(value: number);
        static fromObject(data: {
            version?: string;
            block_version?: number;
            p2p_version?: number;
        }): RequestInfo;
        toObject(): {
            version?: string | undefined;
            block_version?: number | undefined;
            p2p_version?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RequestInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RequestInfo;
    }
    class RequestSetOption extends pb_1.Message {
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
        }): RequestSetOption;
        toObject(): {
            key?: string | undefined;
            value?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RequestSetOption;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RequestSetOption;
    }
    class RequestInitChain extends pb_1.Message {
        constructor(data?: any[] | {
            time?: dependency_5.google.protobuf.Timestamp;
            chain_id?: string;
            consensus_params?: ConsensusParams;
            validators?: ValidatorUpdate[];
            app_state_bytes?: Uint8Array;
            initial_height?: number;
        });
        get time(): dependency_5.google.protobuf.Timestamp;
        set time(value: dependency_5.google.protobuf.Timestamp);
        get chain_id(): string;
        set chain_id(value: string);
        get consensus_params(): ConsensusParams;
        set consensus_params(value: ConsensusParams);
        get validators(): ValidatorUpdate[];
        set validators(value: ValidatorUpdate[]);
        get app_state_bytes(): Uint8Array;
        set app_state_bytes(value: Uint8Array);
        get initial_height(): number;
        set initial_height(value: number);
        static fromObject(data: {
            time?: ReturnType<typeof dependency_5.google.protobuf.Timestamp.prototype.toObject>;
            chain_id?: string;
            consensus_params?: ReturnType<typeof ConsensusParams.prototype.toObject>;
            validators?: ReturnType<typeof ValidatorUpdate.prototype.toObject>[];
            app_state_bytes?: Uint8Array;
            initial_height?: number;
        }): RequestInitChain;
        toObject(): {
            time?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
            chain_id?: string | undefined;
            consensus_params?: {
                block?: {
                    max_bytes?: number | undefined;
                    max_gas?: number | undefined;
                } | undefined;
                evidence?: {
                    max_age_num_blocks?: number | undefined;
                    max_age_duration?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    max_bytes?: number | undefined;
                } | undefined;
                validator?: {
                    pub_key_types?: string[] | undefined;
                } | undefined;
                version?: {
                    app_version?: number | undefined;
                } | undefined;
            } | undefined;
            validators?: {
                pub_key?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: number | undefined;
            }[] | undefined;
            app_state_bytes?: Uint8Array | undefined;
            initial_height?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RequestInitChain;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RequestInitChain;
    }
    class RequestQuery extends pb_1.Message {
        constructor(data?: any[] | {
            data?: Uint8Array;
            path?: string;
            height?: number;
            prove?: boolean;
        });
        get data(): Uint8Array;
        set data(value: Uint8Array);
        get path(): string;
        set path(value: string);
        get height(): number;
        set height(value: number);
        get prove(): boolean;
        set prove(value: boolean);
        static fromObject(data: {
            data?: Uint8Array;
            path?: string;
            height?: number;
            prove?: boolean;
        }): RequestQuery;
        toObject(): {
            data?: Uint8Array | undefined;
            path?: string | undefined;
            height?: number | undefined;
            prove?: boolean | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RequestQuery;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RequestQuery;
    }
    class RequestBeginBlock extends pb_1.Message {
        constructor(data?: any[] | {
            hash?: Uint8Array;
            header?: dependency_2.tendermint.types.Header;
            last_commit_info?: LastCommitInfo;
            byzantine_validators?: Evidence[];
        });
        get hash(): Uint8Array;
        set hash(value: Uint8Array);
        get header(): dependency_2.tendermint.types.Header;
        set header(value: dependency_2.tendermint.types.Header);
        get last_commit_info(): LastCommitInfo;
        set last_commit_info(value: LastCommitInfo);
        get byzantine_validators(): Evidence[];
        set byzantine_validators(value: Evidence[]);
        static fromObject(data: {
            hash?: Uint8Array;
            header?: ReturnType<typeof dependency_2.tendermint.types.Header.prototype.toObject>;
            last_commit_info?: ReturnType<typeof LastCommitInfo.prototype.toObject>;
            byzantine_validators?: ReturnType<typeof Evidence.prototype.toObject>[];
        }): RequestBeginBlock;
        toObject(): {
            hash?: Uint8Array | undefined;
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
            last_commit_info?: {
                round?: number | undefined;
                votes?: {
                    validator?: {
                        address?: Uint8Array | undefined;
                        power?: number | undefined;
                    } | undefined;
                    signed_last_block?: boolean | undefined;
                }[] | undefined;
            } | undefined;
            byzantine_validators?: {
                type?: EvidenceType | undefined;
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: number | undefined;
                } | undefined;
                height?: number | undefined;
                time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                total_voting_power?: number | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RequestBeginBlock;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RequestBeginBlock;
    }
    class RequestCheckTx extends pb_1.Message {
        constructor(data?: any[] | {
            tx?: Uint8Array;
            type?: CheckTxType;
        });
        get tx(): Uint8Array;
        set tx(value: Uint8Array);
        get type(): CheckTxType;
        set type(value: CheckTxType);
        static fromObject(data: {
            tx?: Uint8Array;
            type?: CheckTxType;
        }): RequestCheckTx;
        toObject(): {
            tx?: Uint8Array | undefined;
            type?: CheckTxType | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RequestCheckTx;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RequestCheckTx;
    }
    class RequestDeliverTx extends pb_1.Message {
        constructor(data?: any[] | {
            tx?: Uint8Array;
        });
        get tx(): Uint8Array;
        set tx(value: Uint8Array);
        static fromObject(data: {
            tx?: Uint8Array;
        }): RequestDeliverTx;
        toObject(): {
            tx?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RequestDeliverTx;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RequestDeliverTx;
    }
    class RequestEndBlock extends pb_1.Message {
        constructor(data?: any[] | {
            height?: number;
        });
        get height(): number;
        set height(value: number);
        static fromObject(data: {
            height?: number;
        }): RequestEndBlock;
        toObject(): {
            height?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RequestEndBlock;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RequestEndBlock;
    }
    class RequestCommit extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): RequestCommit;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RequestCommit;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RequestCommit;
    }
    class RequestListSnapshots extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): RequestListSnapshots;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RequestListSnapshots;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RequestListSnapshots;
    }
    class RequestOfferSnapshot extends pb_1.Message {
        constructor(data?: any[] | {
            snapshot?: Snapshot;
            app_hash?: Uint8Array;
        });
        get snapshot(): Snapshot;
        set snapshot(value: Snapshot);
        get app_hash(): Uint8Array;
        set app_hash(value: Uint8Array);
        static fromObject(data: {
            snapshot?: ReturnType<typeof Snapshot.prototype.toObject>;
            app_hash?: Uint8Array;
        }): RequestOfferSnapshot;
        toObject(): {
            snapshot?: {
                height?: number | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            } | undefined;
            app_hash?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RequestOfferSnapshot;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RequestOfferSnapshot;
    }
    class RequestLoadSnapshotChunk extends pb_1.Message {
        constructor(data?: any[] | {
            height?: number;
            format?: number;
            chunk?: number;
        });
        get height(): number;
        set height(value: number);
        get format(): number;
        set format(value: number);
        get chunk(): number;
        set chunk(value: number);
        static fromObject(data: {
            height?: number;
            format?: number;
            chunk?: number;
        }): RequestLoadSnapshotChunk;
        toObject(): {
            height?: number | undefined;
            format?: number | undefined;
            chunk?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RequestLoadSnapshotChunk;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RequestLoadSnapshotChunk;
    }
    class RequestApplySnapshotChunk extends pb_1.Message {
        constructor(data?: any[] | {
            index?: number;
            chunk?: Uint8Array;
            sender?: string;
        });
        get index(): number;
        set index(value: number);
        get chunk(): Uint8Array;
        set chunk(value: Uint8Array);
        get sender(): string;
        set sender(value: string);
        static fromObject(data: {
            index?: number;
            chunk?: Uint8Array;
            sender?: string;
        }): RequestApplySnapshotChunk;
        toObject(): {
            index?: number | undefined;
            chunk?: Uint8Array | undefined;
            sender?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RequestApplySnapshotChunk;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RequestApplySnapshotChunk;
    }
    class Response extends pb_1.Message {
        constructor(data?: any[] | ({} & (({
            exception?: ResponseException;
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            exception?: never;
            echo?: ResponseEcho;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            exception?: never;
            echo?: never;
            flush?: ResponseFlush;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            exception?: never;
            echo?: never;
            flush?: never;
            info?: ResponseInfo;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            exception?: never;
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: ResponseSetOption;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            exception?: never;
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: ResponseInitChain;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            exception?: never;
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: ResponseQuery;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            exception?: never;
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: ResponseBeginBlock;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            exception?: never;
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: ResponseCheckTx;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            exception?: never;
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: ResponseDeliverTx;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            exception?: never;
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: ResponseEndBlock;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            exception?: never;
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: ResponseCommit;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            exception?: never;
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: ResponseListSnapshots;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            exception?: never;
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: ResponseOfferSnapshot;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: never;
        } | {
            exception?: never;
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: ResponseLoadSnapshotChunk;
            apply_snapshot_chunk?: never;
        } | {
            exception?: never;
            echo?: never;
            flush?: never;
            info?: never;
            set_option?: never;
            init_chain?: never;
            query?: never;
            begin_block?: never;
            check_tx?: never;
            deliver_tx?: never;
            end_block?: never;
            commit?: never;
            list_snapshots?: never;
            offer_snapshot?: never;
            load_snapshot_chunk?: never;
            apply_snapshot_chunk?: ResponseApplySnapshotChunk;
        }))));
        get exception(): ResponseException;
        set exception(value: ResponseException);
        get echo(): ResponseEcho;
        set echo(value: ResponseEcho);
        get flush(): ResponseFlush;
        set flush(value: ResponseFlush);
        get info(): ResponseInfo;
        set info(value: ResponseInfo);
        get set_option(): ResponseSetOption;
        set set_option(value: ResponseSetOption);
        get init_chain(): ResponseInitChain;
        set init_chain(value: ResponseInitChain);
        get query(): ResponseQuery;
        set query(value: ResponseQuery);
        get begin_block(): ResponseBeginBlock;
        set begin_block(value: ResponseBeginBlock);
        get check_tx(): ResponseCheckTx;
        set check_tx(value: ResponseCheckTx);
        get deliver_tx(): ResponseDeliverTx;
        set deliver_tx(value: ResponseDeliverTx);
        get end_block(): ResponseEndBlock;
        set end_block(value: ResponseEndBlock);
        get commit(): ResponseCommit;
        set commit(value: ResponseCommit);
        get list_snapshots(): ResponseListSnapshots;
        set list_snapshots(value: ResponseListSnapshots);
        get offer_snapshot(): ResponseOfferSnapshot;
        set offer_snapshot(value: ResponseOfferSnapshot);
        get load_snapshot_chunk(): ResponseLoadSnapshotChunk;
        set load_snapshot_chunk(value: ResponseLoadSnapshotChunk);
        get apply_snapshot_chunk(): ResponseApplySnapshotChunk;
        set apply_snapshot_chunk(value: ResponseApplySnapshotChunk);
        get value(): "none" | "info" | "commit" | "echo" | "flush" | "set_option" | "init_chain" | "query" | "begin_block" | "check_tx" | "deliver_tx" | "end_block" | "list_snapshots" | "offer_snapshot" | "load_snapshot_chunk" | "apply_snapshot_chunk" | "exception";
        static fromObject(data: {
            exception?: ReturnType<typeof ResponseException.prototype.toObject>;
            echo?: ReturnType<typeof ResponseEcho.prototype.toObject>;
            flush?: ReturnType<typeof ResponseFlush.prototype.toObject>;
            info?: ReturnType<typeof ResponseInfo.prototype.toObject>;
            set_option?: ReturnType<typeof ResponseSetOption.prototype.toObject>;
            init_chain?: ReturnType<typeof ResponseInitChain.prototype.toObject>;
            query?: ReturnType<typeof ResponseQuery.prototype.toObject>;
            begin_block?: ReturnType<typeof ResponseBeginBlock.prototype.toObject>;
            check_tx?: ReturnType<typeof ResponseCheckTx.prototype.toObject>;
            deliver_tx?: ReturnType<typeof ResponseDeliverTx.prototype.toObject>;
            end_block?: ReturnType<typeof ResponseEndBlock.prototype.toObject>;
            commit?: ReturnType<typeof ResponseCommit.prototype.toObject>;
            list_snapshots?: ReturnType<typeof ResponseListSnapshots.prototype.toObject>;
            offer_snapshot?: ReturnType<typeof ResponseOfferSnapshot.prototype.toObject>;
            load_snapshot_chunk?: ReturnType<typeof ResponseLoadSnapshotChunk.prototype.toObject>;
            apply_snapshot_chunk?: ReturnType<typeof ResponseApplySnapshotChunk.prototype.toObject>;
        }): Response;
        toObject(): {
            exception?: {
                error?: string | undefined;
            } | undefined;
            echo?: {
                message?: string | undefined;
            } | undefined;
            flush?: {} | undefined;
            info?: {
                data?: string | undefined;
                version?: string | undefined;
                app_version?: number | undefined;
                last_block_height?: number | undefined;
                last_block_app_hash?: Uint8Array | undefined;
            } | undefined;
            set_option?: {
                code?: number | undefined;
                log?: string | undefined;
                info?: string | undefined;
            } | undefined;
            init_chain?: {
                consensus_params?: {
                    block?: {
                        max_bytes?: number | undefined;
                        max_gas?: number | undefined;
                    } | undefined;
                    evidence?: {
                        max_age_num_blocks?: number | undefined;
                        max_age_duration?: {
                            seconds?: number | undefined;
                            nanos?: number | undefined;
                        } | undefined;
                        max_bytes?: number | undefined;
                    } | undefined;
                    validator?: {
                        pub_key_types?: string[] | undefined;
                    } | undefined;
                    version?: {
                        app_version?: number | undefined;
                    } | undefined;
                } | undefined;
                validators?: {
                    pub_key?: {
                        ed25519?: Uint8Array | undefined;
                        secp256k1?: Uint8Array | undefined;
                    } | undefined;
                    power?: number | undefined;
                }[] | undefined;
                app_hash?: Uint8Array | undefined;
            } | undefined;
            query?: {
                code?: number | undefined;
                log?: string | undefined;
                info?: string | undefined;
                index?: number | undefined;
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                proof_ops?: {
                    ops?: {
                        type?: string | undefined;
                        key?: Uint8Array | undefined;
                        data?: Uint8Array | undefined;
                    }[] | undefined;
                } | undefined;
                height?: number | undefined;
                codespace?: string | undefined;
            } | undefined;
            begin_block?: {
                events?: {
                    type?: string | undefined;
                    attributes?: {
                        key?: Uint8Array | undefined;
                        value?: Uint8Array | undefined;
                        index?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            } | undefined;
            check_tx?: {
                code?: number | undefined;
                data?: Uint8Array | undefined;
                log?: string | undefined;
                info?: string | undefined;
                gas_wanted?: number | undefined;
                gas_used?: number | undefined;
                events?: {
                    type?: string | undefined;
                    attributes?: {
                        key?: Uint8Array | undefined;
                        value?: Uint8Array | undefined;
                        index?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
                codespace?: string | undefined;
            } | undefined;
            deliver_tx?: {
                code?: number | undefined;
                data?: Uint8Array | undefined;
                log?: string | undefined;
                info?: string | undefined;
                gas_wanted?: number | undefined;
                gas_used?: number | undefined;
                events?: {
                    type?: string | undefined;
                    attributes?: {
                        key?: Uint8Array | undefined;
                        value?: Uint8Array | undefined;
                        index?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
                codespace?: string | undefined;
            } | undefined;
            end_block?: {
                validator_updates?: {
                    pub_key?: {
                        ed25519?: Uint8Array | undefined;
                        secp256k1?: Uint8Array | undefined;
                    } | undefined;
                    power?: number | undefined;
                }[] | undefined;
                consensus_param_updates?: {
                    block?: {
                        max_bytes?: number | undefined;
                        max_gas?: number | undefined;
                    } | undefined;
                    evidence?: {
                        max_age_num_blocks?: number | undefined;
                        max_age_duration?: {
                            seconds?: number | undefined;
                            nanos?: number | undefined;
                        } | undefined;
                        max_bytes?: number | undefined;
                    } | undefined;
                    validator?: {
                        pub_key_types?: string[] | undefined;
                    } | undefined;
                    version?: {
                        app_version?: number | undefined;
                    } | undefined;
                } | undefined;
                events?: {
                    type?: string | undefined;
                    attributes?: {
                        key?: Uint8Array | undefined;
                        value?: Uint8Array | undefined;
                        index?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
            } | undefined;
            commit?: {
                data?: Uint8Array | undefined;
                retain_height?: number | undefined;
            } | undefined;
            list_snapshots?: {
                snapshots?: {
                    height?: number | undefined;
                    format?: number | undefined;
                    chunks?: number | undefined;
                    hash?: Uint8Array | undefined;
                    metadata?: Uint8Array | undefined;
                }[] | undefined;
            } | undefined;
            offer_snapshot?: {
                result?: ResponseOfferSnapshot.Result | undefined;
            } | undefined;
            load_snapshot_chunk?: {
                chunk?: Uint8Array | undefined;
            } | undefined;
            apply_snapshot_chunk?: {
                result?: ResponseApplySnapshotChunk.Result | undefined;
                refetch_chunks?: number[] | undefined;
                reject_senders?: string[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Response;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Response;
    }
    class ResponseException extends pb_1.Message {
        constructor(data?: any[] | {
            error?: string;
        });
        get error(): string;
        set error(value: string);
        static fromObject(data: {
            error?: string;
        }): ResponseException;
        toObject(): {
            error?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ResponseException;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ResponseException;
    }
    class ResponseEcho extends pb_1.Message {
        constructor(data?: any[] | {
            message?: string;
        });
        get message(): string;
        set message(value: string);
        static fromObject(data: {
            message?: string;
        }): ResponseEcho;
        toObject(): {
            message?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ResponseEcho;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ResponseEcho;
    }
    class ResponseFlush extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): ResponseFlush;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ResponseFlush;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ResponseFlush;
    }
    class ResponseInfo extends pb_1.Message {
        constructor(data?: any[] | {
            data?: string;
            version?: string;
            app_version?: number;
            last_block_height?: number;
            last_block_app_hash?: Uint8Array;
        });
        get data(): string;
        set data(value: string);
        get version(): string;
        set version(value: string);
        get app_version(): number;
        set app_version(value: number);
        get last_block_height(): number;
        set last_block_height(value: number);
        get last_block_app_hash(): Uint8Array;
        set last_block_app_hash(value: Uint8Array);
        static fromObject(data: {
            data?: string;
            version?: string;
            app_version?: number;
            last_block_height?: number;
            last_block_app_hash?: Uint8Array;
        }): ResponseInfo;
        toObject(): {
            data?: string | undefined;
            version?: string | undefined;
            app_version?: number | undefined;
            last_block_height?: number | undefined;
            last_block_app_hash?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ResponseInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ResponseInfo;
    }
    class ResponseSetOption extends pb_1.Message {
        constructor(data?: any[] | {
            code?: number;
            log?: string;
            info?: string;
        });
        get code(): number;
        set code(value: number);
        get log(): string;
        set log(value: string);
        get info(): string;
        set info(value: string);
        static fromObject(data: {
            code?: number;
            log?: string;
            info?: string;
        }): ResponseSetOption;
        toObject(): {
            code?: number | undefined;
            log?: string | undefined;
            info?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ResponseSetOption;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ResponseSetOption;
    }
    class ResponseInitChain extends pb_1.Message {
        constructor(data?: any[] | {
            consensus_params?: ConsensusParams;
            validators?: ValidatorUpdate[];
            app_hash?: Uint8Array;
        });
        get consensus_params(): ConsensusParams;
        set consensus_params(value: ConsensusParams);
        get validators(): ValidatorUpdate[];
        set validators(value: ValidatorUpdate[]);
        get app_hash(): Uint8Array;
        set app_hash(value: Uint8Array);
        static fromObject(data: {
            consensus_params?: ReturnType<typeof ConsensusParams.prototype.toObject>;
            validators?: ReturnType<typeof ValidatorUpdate.prototype.toObject>[];
            app_hash?: Uint8Array;
        }): ResponseInitChain;
        toObject(): {
            consensus_params?: {
                block?: {
                    max_bytes?: number | undefined;
                    max_gas?: number | undefined;
                } | undefined;
                evidence?: {
                    max_age_num_blocks?: number | undefined;
                    max_age_duration?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    max_bytes?: number | undefined;
                } | undefined;
                validator?: {
                    pub_key_types?: string[] | undefined;
                } | undefined;
                version?: {
                    app_version?: number | undefined;
                } | undefined;
            } | undefined;
            validators?: {
                pub_key?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: number | undefined;
            }[] | undefined;
            app_hash?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ResponseInitChain;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ResponseInitChain;
    }
    class ResponseQuery extends pb_1.Message {
        constructor(data?: any[] | {
            code?: number;
            log?: string;
            info?: string;
            index?: number;
            key?: Uint8Array;
            value?: Uint8Array;
            proof_ops?: dependency_1.tendermint.crypto.ProofOps;
            height?: number;
            codespace?: string;
        });
        get code(): number;
        set code(value: number);
        get log(): string;
        set log(value: string);
        get info(): string;
        set info(value: string);
        get index(): number;
        set index(value: number);
        get key(): Uint8Array;
        set key(value: Uint8Array);
        get value(): Uint8Array;
        set value(value: Uint8Array);
        get proof_ops(): dependency_1.tendermint.crypto.ProofOps;
        set proof_ops(value: dependency_1.tendermint.crypto.ProofOps);
        get height(): number;
        set height(value: number);
        get codespace(): string;
        set codespace(value: string);
        static fromObject(data: {
            code?: number;
            log?: string;
            info?: string;
            index?: number;
            key?: Uint8Array;
            value?: Uint8Array;
            proof_ops?: ReturnType<typeof dependency_1.tendermint.crypto.ProofOps.prototype.toObject>;
            height?: number;
            codespace?: string;
        }): ResponseQuery;
        toObject(): {
            code?: number | undefined;
            log?: string | undefined;
            info?: string | undefined;
            index?: number | undefined;
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
            proof_ops?: {
                ops?: {
                    type?: string | undefined;
                    key?: Uint8Array | undefined;
                    data?: Uint8Array | undefined;
                }[] | undefined;
            } | undefined;
            height?: number | undefined;
            codespace?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ResponseQuery;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ResponseQuery;
    }
    class ResponseBeginBlock extends pb_1.Message {
        constructor(data?: any[] | {
            events?: Event[];
        });
        get events(): Event[];
        set events(value: Event[]);
        static fromObject(data: {
            events?: ReturnType<typeof Event.prototype.toObject>[];
        }): ResponseBeginBlock;
        toObject(): {
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ResponseBeginBlock;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ResponseBeginBlock;
    }
    class ResponseCheckTx extends pb_1.Message {
        constructor(data?: any[] | {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gas_wanted?: number;
            gas_used?: number;
            events?: Event[];
            codespace?: string;
        });
        get code(): number;
        set code(value: number);
        get data(): Uint8Array;
        set data(value: Uint8Array);
        get log(): string;
        set log(value: string);
        get info(): string;
        set info(value: string);
        get gas_wanted(): number;
        set gas_wanted(value: number);
        get gas_used(): number;
        set gas_used(value: number);
        get events(): Event[];
        set events(value: Event[]);
        get codespace(): string;
        set codespace(value: string);
        static fromObject(data: {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gas_wanted?: number;
            gas_used?: number;
            events?: ReturnType<typeof Event.prototype.toObject>[];
            codespace?: string;
        }): ResponseCheckTx;
        toObject(): {
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gas_wanted?: number | undefined;
            gas_used?: number | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
            codespace?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ResponseCheckTx;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ResponseCheckTx;
    }
    class ResponseDeliverTx extends pb_1.Message {
        constructor(data?: any[] | {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gas_wanted?: number;
            gas_used?: number;
            events?: Event[];
            codespace?: string;
        });
        get code(): number;
        set code(value: number);
        get data(): Uint8Array;
        set data(value: Uint8Array);
        get log(): string;
        set log(value: string);
        get info(): string;
        set info(value: string);
        get gas_wanted(): number;
        set gas_wanted(value: number);
        get gas_used(): number;
        set gas_used(value: number);
        get events(): Event[];
        set events(value: Event[]);
        get codespace(): string;
        set codespace(value: string);
        static fromObject(data: {
            code?: number;
            data?: Uint8Array;
            log?: string;
            info?: string;
            gas_wanted?: number;
            gas_used?: number;
            events?: ReturnType<typeof Event.prototype.toObject>[];
            codespace?: string;
        }): ResponseDeliverTx;
        toObject(): {
            code?: number | undefined;
            data?: Uint8Array | undefined;
            log?: string | undefined;
            info?: string | undefined;
            gas_wanted?: number | undefined;
            gas_used?: number | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
            codespace?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ResponseDeliverTx;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ResponseDeliverTx;
    }
    class ResponseEndBlock extends pb_1.Message {
        constructor(data?: any[] | {
            validator_updates?: ValidatorUpdate[];
            consensus_param_updates?: ConsensusParams;
            events?: Event[];
        });
        get validator_updates(): ValidatorUpdate[];
        set validator_updates(value: ValidatorUpdate[]);
        get consensus_param_updates(): ConsensusParams;
        set consensus_param_updates(value: ConsensusParams);
        get events(): Event[];
        set events(value: Event[]);
        static fromObject(data: {
            validator_updates?: ReturnType<typeof ValidatorUpdate.prototype.toObject>[];
            consensus_param_updates?: ReturnType<typeof ConsensusParams.prototype.toObject>;
            events?: ReturnType<typeof Event.prototype.toObject>[];
        }): ResponseEndBlock;
        toObject(): {
            validator_updates?: {
                pub_key?: {
                    ed25519?: Uint8Array | undefined;
                    secp256k1?: Uint8Array | undefined;
                } | undefined;
                power?: number | undefined;
            }[] | undefined;
            consensus_param_updates?: {
                block?: {
                    max_bytes?: number | undefined;
                    max_gas?: number | undefined;
                } | undefined;
                evidence?: {
                    max_age_num_blocks?: number | undefined;
                    max_age_duration?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    max_bytes?: number | undefined;
                } | undefined;
                validator?: {
                    pub_key_types?: string[] | undefined;
                } | undefined;
                version?: {
                    app_version?: number | undefined;
                } | undefined;
            } | undefined;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ResponseEndBlock;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ResponseEndBlock;
    }
    class ResponseCommit extends pb_1.Message {
        constructor(data?: any[] | {
            data?: Uint8Array;
            retain_height?: number;
        });
        get data(): Uint8Array;
        set data(value: Uint8Array);
        get retain_height(): number;
        set retain_height(value: number);
        static fromObject(data: {
            data?: Uint8Array;
            retain_height?: number;
        }): ResponseCommit;
        toObject(): {
            data?: Uint8Array | undefined;
            retain_height?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ResponseCommit;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ResponseCommit;
    }
    class ResponseListSnapshots extends pb_1.Message {
        constructor(data?: any[] | {
            snapshots?: Snapshot[];
        });
        get snapshots(): Snapshot[];
        set snapshots(value: Snapshot[]);
        static fromObject(data: {
            snapshots?: ReturnType<typeof Snapshot.prototype.toObject>[];
        }): ResponseListSnapshots;
        toObject(): {
            snapshots?: {
                height?: number | undefined;
                format?: number | undefined;
                chunks?: number | undefined;
                hash?: Uint8Array | undefined;
                metadata?: Uint8Array | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ResponseListSnapshots;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ResponseListSnapshots;
    }
    class ResponseOfferSnapshot extends pb_1.Message {
        constructor(data?: any[] | {
            result?: ResponseOfferSnapshot.Result;
        });
        get result(): ResponseOfferSnapshot.Result;
        set result(value: ResponseOfferSnapshot.Result);
        static fromObject(data: {
            result?: ResponseOfferSnapshot.Result;
        }): ResponseOfferSnapshot;
        toObject(): {
            result?: ResponseOfferSnapshot.Result | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ResponseOfferSnapshot;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ResponseOfferSnapshot;
    }
    namespace ResponseOfferSnapshot {
        enum Result {
            UNKNOWN = 0,
            ACCEPT = 1,
            ABORT = 2,
            REJECT = 3,
            REJECT_FORMAT = 4,
            REJECT_SENDER = 5
        }
    }
    class ResponseLoadSnapshotChunk extends pb_1.Message {
        constructor(data?: any[] | {
            chunk?: Uint8Array;
        });
        get chunk(): Uint8Array;
        set chunk(value: Uint8Array);
        static fromObject(data: {
            chunk?: Uint8Array;
        }): ResponseLoadSnapshotChunk;
        toObject(): {
            chunk?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ResponseLoadSnapshotChunk;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ResponseLoadSnapshotChunk;
    }
    class ResponseApplySnapshotChunk extends pb_1.Message {
        constructor(data?: any[] | {
            result?: ResponseApplySnapshotChunk.Result;
            refetch_chunks?: number[];
            reject_senders?: string[];
        });
        get result(): ResponseApplySnapshotChunk.Result;
        set result(value: ResponseApplySnapshotChunk.Result);
        get refetch_chunks(): number[];
        set refetch_chunks(value: number[]);
        get reject_senders(): string[];
        set reject_senders(value: string[]);
        static fromObject(data: {
            result?: ResponseApplySnapshotChunk.Result;
            refetch_chunks?: number[];
            reject_senders?: string[];
        }): ResponseApplySnapshotChunk;
        toObject(): {
            result?: ResponseApplySnapshotChunk.Result | undefined;
            refetch_chunks?: number[] | undefined;
            reject_senders?: string[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ResponseApplySnapshotChunk;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ResponseApplySnapshotChunk;
    }
    namespace ResponseApplySnapshotChunk {
        enum Result {
            UNKNOWN = 0,
            ACCEPT = 1,
            ABORT = 2,
            RETRY = 3,
            RETRY_SNAPSHOT = 4,
            REJECT_SNAPSHOT = 5
        }
    }
    class ConsensusParams extends pb_1.Message {
        constructor(data?: any[] | {
            block?: BlockParams;
            evidence?: dependency_4.tendermint.types.EvidenceParams;
            validator?: dependency_4.tendermint.types.ValidatorParams;
            version?: dependency_4.tendermint.types.VersionParams;
        });
        get block(): BlockParams;
        set block(value: BlockParams);
        get evidence(): dependency_4.tendermint.types.EvidenceParams;
        set evidence(value: dependency_4.tendermint.types.EvidenceParams);
        get validator(): dependency_4.tendermint.types.ValidatorParams;
        set validator(value: dependency_4.tendermint.types.ValidatorParams);
        get version(): dependency_4.tendermint.types.VersionParams;
        set version(value: dependency_4.tendermint.types.VersionParams);
        static fromObject(data: {
            block?: ReturnType<typeof BlockParams.prototype.toObject>;
            evidence?: ReturnType<typeof dependency_4.tendermint.types.EvidenceParams.prototype.toObject>;
            validator?: ReturnType<typeof dependency_4.tendermint.types.ValidatorParams.prototype.toObject>;
            version?: ReturnType<typeof dependency_4.tendermint.types.VersionParams.prototype.toObject>;
        }): ConsensusParams;
        toObject(): {
            block?: {
                max_bytes?: number | undefined;
                max_gas?: number | undefined;
            } | undefined;
            evidence?: {
                max_age_num_blocks?: number | undefined;
                max_age_duration?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                max_bytes?: number | undefined;
            } | undefined;
            validator?: {
                pub_key_types?: string[] | undefined;
            } | undefined;
            version?: {
                app_version?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ConsensusParams;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ConsensusParams;
    }
    class BlockParams extends pb_1.Message {
        constructor(data?: any[] | {
            max_bytes?: number;
            max_gas?: number;
        });
        get max_bytes(): number;
        set max_bytes(value: number);
        get max_gas(): number;
        set max_gas(value: number);
        static fromObject(data: {
            max_bytes?: number;
            max_gas?: number;
        }): BlockParams;
        toObject(): {
            max_bytes?: number | undefined;
            max_gas?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BlockParams;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BlockParams;
    }
    class LastCommitInfo extends pb_1.Message {
        constructor(data?: any[] | {
            round?: number;
            votes?: VoteInfo[];
        });
        get round(): number;
        set round(value: number);
        get votes(): VoteInfo[];
        set votes(value: VoteInfo[]);
        static fromObject(data: {
            round?: number;
            votes?: ReturnType<typeof VoteInfo.prototype.toObject>[];
        }): LastCommitInfo;
        toObject(): {
            round?: number | undefined;
            votes?: {
                validator?: {
                    address?: Uint8Array | undefined;
                    power?: number | undefined;
                } | undefined;
                signed_last_block?: boolean | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): LastCommitInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): LastCommitInfo;
    }
    class Event extends pb_1.Message {
        constructor(data?: any[] | {
            type?: string;
            attributes?: EventAttribute[];
        });
        get type(): string;
        set type(value: string);
        get attributes(): EventAttribute[];
        set attributes(value: EventAttribute[]);
        static fromObject(data: {
            type?: string;
            attributes?: ReturnType<typeof EventAttribute.prototype.toObject>[];
        }): Event;
        toObject(): {
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Event;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Event;
    }
    class EventAttribute extends pb_1.Message {
        constructor(data?: any[] | {
            key?: Uint8Array;
            value?: Uint8Array;
            index?: boolean;
        });
        get key(): Uint8Array;
        set key(value: Uint8Array);
        get value(): Uint8Array;
        set value(value: Uint8Array);
        get index(): boolean;
        set index(value: boolean);
        static fromObject(data: {
            key?: Uint8Array;
            value?: Uint8Array;
            index?: boolean;
        }): EventAttribute;
        toObject(): {
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
            index?: boolean | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): EventAttribute;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): EventAttribute;
    }
    class TxResult extends pb_1.Message {
        constructor(data?: any[] | {
            height?: number;
            index?: number;
            tx?: Uint8Array;
            result?: ResponseDeliverTx;
        });
        get height(): number;
        set height(value: number);
        get index(): number;
        set index(value: number);
        get tx(): Uint8Array;
        set tx(value: Uint8Array);
        get result(): ResponseDeliverTx;
        set result(value: ResponseDeliverTx);
        static fromObject(data: {
            height?: number;
            index?: number;
            tx?: Uint8Array;
            result?: ReturnType<typeof ResponseDeliverTx.prototype.toObject>;
        }): TxResult;
        toObject(): {
            height?: number | undefined;
            index?: number | undefined;
            tx?: Uint8Array | undefined;
            result?: {
                code?: number | undefined;
                data?: Uint8Array | undefined;
                log?: string | undefined;
                info?: string | undefined;
                gas_wanted?: number | undefined;
                gas_used?: number | undefined;
                events?: {
                    type?: string | undefined;
                    attributes?: {
                        key?: Uint8Array | undefined;
                        value?: Uint8Array | undefined;
                        index?: boolean | undefined;
                    }[] | undefined;
                }[] | undefined;
                codespace?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TxResult;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TxResult;
    }
    class Validator extends pb_1.Message {
        constructor(data?: any[] | {
            address?: Uint8Array;
            power?: number;
        });
        get address(): Uint8Array;
        set address(value: Uint8Array);
        get power(): number;
        set power(value: number);
        static fromObject(data: {
            address?: Uint8Array;
            power?: number;
        }): Validator;
        toObject(): {
            address?: Uint8Array | undefined;
            power?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Validator;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Validator;
    }
    class ValidatorUpdate extends pb_1.Message {
        constructor(data?: any[] | {
            pub_key?: dependency_3.tendermint.crypto.PublicKey;
            power?: number;
        });
        get pub_key(): dependency_3.tendermint.crypto.PublicKey;
        set pub_key(value: dependency_3.tendermint.crypto.PublicKey);
        get power(): number;
        set power(value: number);
        static fromObject(data: {
            pub_key?: ReturnType<typeof dependency_3.tendermint.crypto.PublicKey.prototype.toObject>;
            power?: number;
        }): ValidatorUpdate;
        toObject(): {
            pub_key?: {
                ed25519?: Uint8Array | undefined;
                secp256k1?: Uint8Array | undefined;
            } | undefined;
            power?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ValidatorUpdate;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ValidatorUpdate;
    }
    class VoteInfo extends pb_1.Message {
        constructor(data?: any[] | {
            validator?: Validator;
            signed_last_block?: boolean;
        });
        get validator(): Validator;
        set validator(value: Validator);
        get signed_last_block(): boolean;
        set signed_last_block(value: boolean);
        static fromObject(data: {
            validator?: ReturnType<typeof Validator.prototype.toObject>;
            signed_last_block?: boolean;
        }): VoteInfo;
        toObject(): {
            validator?: {
                address?: Uint8Array | undefined;
                power?: number | undefined;
            } | undefined;
            signed_last_block?: boolean | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): VoteInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): VoteInfo;
    }
    class Evidence extends pb_1.Message {
        constructor(data?: any[] | {
            type?: EvidenceType;
            validator?: Validator;
            height?: number;
            time?: dependency_5.google.protobuf.Timestamp;
            total_voting_power?: number;
        });
        get type(): EvidenceType;
        set type(value: EvidenceType);
        get validator(): Validator;
        set validator(value: Validator);
        get height(): number;
        set height(value: number);
        get time(): dependency_5.google.protobuf.Timestamp;
        set time(value: dependency_5.google.protobuf.Timestamp);
        get total_voting_power(): number;
        set total_voting_power(value: number);
        static fromObject(data: {
            type?: EvidenceType;
            validator?: ReturnType<typeof Validator.prototype.toObject>;
            height?: number;
            time?: ReturnType<typeof dependency_5.google.protobuf.Timestamp.prototype.toObject>;
            total_voting_power?: number;
        }): Evidence;
        toObject(): {
            type?: EvidenceType | undefined;
            validator?: {
                address?: Uint8Array | undefined;
                power?: number | undefined;
            } | undefined;
            height?: number | undefined;
            time?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
            total_voting_power?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Evidence;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Evidence;
    }
    class Snapshot extends pb_1.Message {
        constructor(data?: any[] | {
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: Uint8Array;
        });
        get height(): number;
        set height(value: number);
        get format(): number;
        set format(value: number);
        get chunks(): number;
        set chunks(value: number);
        get hash(): Uint8Array;
        set hash(value: Uint8Array);
        get metadata(): Uint8Array;
        set metadata(value: Uint8Array);
        static fromObject(data: {
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: Uint8Array;
        }): Snapshot;
        toObject(): {
            height?: number | undefined;
            format?: number | undefined;
            chunks?: number | undefined;
            hash?: Uint8Array | undefined;
            metadata?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Snapshot;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Snapshot;
    }
}
//# sourceMappingURL=types.d.ts.map