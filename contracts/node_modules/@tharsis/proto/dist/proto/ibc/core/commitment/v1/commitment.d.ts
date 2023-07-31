import * as dependency_2 from "./../../../../proofs";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.core.commitment.v1 {
    class MerkleRoot extends pb_1.Message {
        constructor(data?: any[] | {
            hash?: Uint8Array;
        });
        get hash(): Uint8Array;
        set hash(value: Uint8Array);
        static fromObject(data: {
            hash?: Uint8Array;
        }): MerkleRoot;
        toObject(): {
            hash?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MerkleRoot;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MerkleRoot;
    }
    class MerklePrefix extends pb_1.Message {
        constructor(data?: any[] | {
            key_prefix?: Uint8Array;
        });
        get key_prefix(): Uint8Array;
        set key_prefix(value: Uint8Array);
        static fromObject(data: {
            key_prefix?: Uint8Array;
        }): MerklePrefix;
        toObject(): {
            key_prefix?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MerklePrefix;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MerklePrefix;
    }
    class MerklePath extends pb_1.Message {
        constructor(data?: any[] | {
            key_path?: string[];
        });
        get key_path(): string[];
        set key_path(value: string[]);
        static fromObject(data: {
            key_path?: string[];
        }): MerklePath;
        toObject(): {
            key_path?: string[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MerklePath;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MerklePath;
    }
    class MerkleProof extends pb_1.Message {
        constructor(data?: any[] | {
            proofs?: dependency_2.ics23.CommitmentProof[];
        });
        get proofs(): dependency_2.ics23.CommitmentProof[];
        set proofs(value: dependency_2.ics23.CommitmentProof[]);
        static fromObject(data: {
            proofs?: ReturnType<typeof dependency_2.ics23.CommitmentProof.prototype.toObject>[];
        }): MerkleProof;
        toObject(): {
            proofs?: {
                exist?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    leaf?: {
                        hash?: dependency_2.ics23.HashOp | undefined;
                        prehash_key?: dependency_2.ics23.HashOp | undefined;
                        prehash_value?: dependency_2.ics23.HashOp | undefined;
                        length?: dependency_2.ics23.LengthOp | undefined;
                        prefix?: Uint8Array | undefined;
                    } | undefined;
                    path?: {
                        hash?: dependency_2.ics23.HashOp | undefined;
                        prefix?: Uint8Array | undefined;
                        suffix?: Uint8Array | undefined;
                    }[] | undefined;
                } | undefined;
                nonexist?: {
                    key?: Uint8Array | undefined;
                    left?: {
                        key?: Uint8Array | undefined;
                        value?: Uint8Array | undefined;
                        leaf?: {
                            hash?: dependency_2.ics23.HashOp | undefined;
                            prehash_key?: dependency_2.ics23.HashOp | undefined;
                            prehash_value?: dependency_2.ics23.HashOp | undefined;
                            length?: dependency_2.ics23.LengthOp | undefined;
                            prefix?: Uint8Array | undefined;
                        } | undefined;
                        path?: {
                            hash?: dependency_2.ics23.HashOp | undefined;
                            prefix?: Uint8Array | undefined;
                            suffix?: Uint8Array | undefined;
                        }[] | undefined;
                    } | undefined;
                    right?: {
                        key?: Uint8Array | undefined;
                        value?: Uint8Array | undefined;
                        leaf?: {
                            hash?: dependency_2.ics23.HashOp | undefined;
                            prehash_key?: dependency_2.ics23.HashOp | undefined;
                            prehash_value?: dependency_2.ics23.HashOp | undefined;
                            length?: dependency_2.ics23.LengthOp | undefined;
                            prefix?: Uint8Array | undefined;
                        } | undefined;
                        path?: {
                            hash?: dependency_2.ics23.HashOp | undefined;
                            prefix?: Uint8Array | undefined;
                            suffix?: Uint8Array | undefined;
                        }[] | undefined;
                    } | undefined;
                } | undefined;
                batch?: {
                    entries?: {
                        exist?: {
                            key?: Uint8Array | undefined;
                            value?: Uint8Array | undefined;
                            leaf?: {
                                hash?: dependency_2.ics23.HashOp | undefined;
                                prehash_key?: dependency_2.ics23.HashOp | undefined;
                                prehash_value?: dependency_2.ics23.HashOp | undefined;
                                length?: dependency_2.ics23.LengthOp | undefined;
                                prefix?: Uint8Array | undefined;
                            } | undefined;
                            path?: {
                                hash?: dependency_2.ics23.HashOp | undefined;
                                prefix?: Uint8Array | undefined;
                                suffix?: Uint8Array | undefined;
                            }[] | undefined;
                        } | undefined;
                        nonexist?: {
                            key?: Uint8Array | undefined;
                            left?: {
                                key?: Uint8Array | undefined;
                                value?: Uint8Array | undefined;
                                leaf?: {
                                    hash?: dependency_2.ics23.HashOp | undefined;
                                    prehash_key?: dependency_2.ics23.HashOp | undefined;
                                    prehash_value?: dependency_2.ics23.HashOp | undefined;
                                    length?: dependency_2.ics23.LengthOp | undefined;
                                    prefix?: Uint8Array | undefined;
                                } | undefined;
                                path?: {
                                    hash?: dependency_2.ics23.HashOp | undefined;
                                    prefix?: Uint8Array | undefined;
                                    suffix?: Uint8Array | undefined;
                                }[] | undefined;
                            } | undefined;
                            right?: {
                                key?: Uint8Array | undefined;
                                value?: Uint8Array | undefined;
                                leaf?: {
                                    hash?: dependency_2.ics23.HashOp | undefined;
                                    prehash_key?: dependency_2.ics23.HashOp | undefined;
                                    prehash_value?: dependency_2.ics23.HashOp | undefined;
                                    length?: dependency_2.ics23.LengthOp | undefined;
                                    prefix?: Uint8Array | undefined;
                                } | undefined;
                                path?: {
                                    hash?: dependency_2.ics23.HashOp | undefined;
                                    prefix?: Uint8Array | undefined;
                                    suffix?: Uint8Array | undefined;
                                }[] | undefined;
                            } | undefined;
                        } | undefined;
                    }[] | undefined;
                } | undefined;
                compressed?: {
                    entries?: {
                        exist?: {
                            key?: Uint8Array | undefined;
                            value?: Uint8Array | undefined;
                            leaf?: {
                                hash?: dependency_2.ics23.HashOp | undefined;
                                prehash_key?: dependency_2.ics23.HashOp | undefined;
                                prehash_value?: dependency_2.ics23.HashOp | undefined;
                                length?: dependency_2.ics23.LengthOp | undefined;
                                prefix?: Uint8Array | undefined;
                            } | undefined;
                            path?: number[] | undefined;
                        } | undefined;
                        nonexist?: {
                            key?: Uint8Array | undefined;
                            left?: {
                                key?: Uint8Array | undefined;
                                value?: Uint8Array | undefined;
                                leaf?: {
                                    hash?: dependency_2.ics23.HashOp | undefined;
                                    prehash_key?: dependency_2.ics23.HashOp | undefined;
                                    prehash_value?: dependency_2.ics23.HashOp | undefined;
                                    length?: dependency_2.ics23.LengthOp | undefined;
                                    prefix?: Uint8Array | undefined;
                                } | undefined;
                                path?: number[] | undefined;
                            } | undefined;
                            right?: {
                                key?: Uint8Array | undefined;
                                value?: Uint8Array | undefined;
                                leaf?: {
                                    hash?: dependency_2.ics23.HashOp | undefined;
                                    prehash_key?: dependency_2.ics23.HashOp | undefined;
                                    prehash_value?: dependency_2.ics23.HashOp | undefined;
                                    length?: dependency_2.ics23.LengthOp | undefined;
                                    prefix?: Uint8Array | undefined;
                                } | undefined;
                                path?: number[] | undefined;
                            } | undefined;
                        } | undefined;
                    }[] | undefined;
                    lookup_inners?: {
                        hash?: dependency_2.ics23.HashOp | undefined;
                        prefix?: Uint8Array | undefined;
                        suffix?: Uint8Array | undefined;
                    }[] | undefined;
                } | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MerkleProof;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MerkleProof;
    }
}
//# sourceMappingURL=commitment.d.ts.map