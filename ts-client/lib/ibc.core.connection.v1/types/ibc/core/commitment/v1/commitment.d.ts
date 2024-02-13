import _m0 from "protobufjs/minimal";
import { CommitmentProof } from "../../../../cosmos/ics23/v1/proofs";
export declare const protobufPackage = "ibc.core.commitment.v1";
/**
 * MerkleRoot defines a merkle root hash.
 * In the Cosmos SDK, the AppHash of a block header becomes the root.
 */
export interface MerkleRoot {
    hash: Uint8Array;
}
/**
 * MerklePrefix is merkle path prefixed to the key.
 * The constructed key from the Path and the key will be append(Path.KeyPath,
 * append(Path.KeyPrefix, key...))
 */
export interface MerklePrefix {
    keyPrefix: Uint8Array;
}
/**
 * MerklePath is the path used to verify commitment proofs, which can be an
 * arbitrary structured object (defined by a commitment type).
 * MerklePath is represented from root-to-leaf
 */
export interface MerklePath {
    keyPath: string[];
}
/**
 * MerkleProof is a wrapper type over a chain of CommitmentProofs.
 * It demonstrates membership or non-membership for an element or set of
 * elements, verifiable in conjunction with a known commitment root. Proofs
 * should be succinct.
 * MerkleProofs are ordered from leaf-to-root
 */
export interface MerkleProof {
    proofs: CommitmentProof[];
}
export declare const MerkleRoot: {
    encode(message: MerkleRoot, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MerkleRoot;
    fromJSON(object: any): MerkleRoot;
    toJSON(message: MerkleRoot): unknown;
    create<I extends {
        hash?: Uint8Array;
    } & {
        hash?: Uint8Array;
    } & { [K in Exclude<keyof I, "hash">]: never; }>(base?: I): MerkleRoot;
    fromPartial<I_1 extends {
        hash?: Uint8Array;
    } & {
        hash?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "hash">]: never; }>(object: I_1): MerkleRoot;
};
export declare const MerklePrefix: {
    encode(message: MerklePrefix, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MerklePrefix;
    fromJSON(object: any): MerklePrefix;
    toJSON(message: MerklePrefix): unknown;
    create<I extends {
        keyPrefix?: Uint8Array;
    } & {
        keyPrefix?: Uint8Array;
    } & { [K in Exclude<keyof I, "keyPrefix">]: never; }>(base?: I): MerklePrefix;
    fromPartial<I_1 extends {
        keyPrefix?: Uint8Array;
    } & {
        keyPrefix?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "keyPrefix">]: never; }>(object: I_1): MerklePrefix;
};
export declare const MerklePath: {
    encode(message: MerklePath, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MerklePath;
    fromJSON(object: any): MerklePath;
    toJSON(message: MerklePath): unknown;
    create<I extends {
        keyPath?: string[];
    } & {
        keyPath?: string[] & string[] & { [K in Exclude<keyof I["keyPath"], keyof string[]>]: never; };
    } & { [K_1 in Exclude<keyof I, "keyPath">]: never; }>(base?: I): MerklePath;
    fromPartial<I_1 extends {
        keyPath?: string[];
    } & {
        keyPath?: string[] & string[] & { [K_2 in Exclude<keyof I_1["keyPath"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "keyPath">]: never; }>(object: I_1): MerklePath;
};
export declare const MerkleProof: {
    encode(message: MerkleProof, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MerkleProof;
    fromJSON(object: any): MerkleProof;
    toJSON(message: MerkleProof): unknown;
    create<I extends {
        proofs?: {
            exist?: {
                key?: Uint8Array;
                value?: Uint8Array;
                leaf?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                    prefix?: Uint8Array;
                };
                path?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            };
            nonexist?: {
                key?: Uint8Array;
                left?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
                right?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
            };
            batch?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                    };
                }[];
            };
            compressed?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: number[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                    };
                }[];
                lookupInners?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            };
        }[];
    } & {
        proofs?: {
            exist?: {
                key?: Uint8Array;
                value?: Uint8Array;
                leaf?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                    prefix?: Uint8Array;
                };
                path?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            };
            nonexist?: {
                key?: Uint8Array;
                left?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
                right?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
            };
            batch?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                    };
                }[];
            };
            compressed?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: number[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                    };
                }[];
                lookupInners?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            };
        }[] & ({
            exist?: {
                key?: Uint8Array;
                value?: Uint8Array;
                leaf?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                    prefix?: Uint8Array;
                };
                path?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            };
            nonexist?: {
                key?: Uint8Array;
                left?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
                right?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
            };
            batch?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                    };
                }[];
            };
            compressed?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: number[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                    };
                }[];
                lookupInners?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            };
        } & {
            exist?: {
                key?: Uint8Array;
                value?: Uint8Array;
                leaf?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                    prefix?: Uint8Array;
                };
                path?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            } & {
                key?: Uint8Array;
                value?: Uint8Array;
                leaf?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                    prefix?: Uint8Array;
                } & {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                    prefix?: Uint8Array;
                } & { [K in Exclude<keyof I["proofs"][number]["exist"]["leaf"], keyof import("../../../../cosmos/ics23/v1/proofs").LeafOp>]: never; };
                path?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[] & ({
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                } & {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                } & { [K_1 in Exclude<keyof I["proofs"][number]["exist"]["path"][number], keyof import("../../../../cosmos/ics23/v1/proofs").InnerOp>]: never; })[] & { [K_2 in Exclude<keyof I["proofs"][number]["exist"]["path"], keyof {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[]>]: never; };
            } & { [K_3 in Exclude<keyof I["proofs"][number]["exist"], keyof import("../../../../cosmos/ics23/v1/proofs").ExistenceProof>]: never; };
            nonexist?: {
                key?: Uint8Array;
                left?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
                right?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
            } & {
                key?: Uint8Array;
                left?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                } & {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    } & {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    } & { [K_4 in Exclude<keyof I["proofs"][number]["nonexist"]["left"]["leaf"], keyof import("../../../../cosmos/ics23/v1/proofs").LeafOp>]: never; };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[] & ({
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    } & {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    } & { [K_5 in Exclude<keyof I["proofs"][number]["nonexist"]["left"]["path"][number], keyof import("../../../../cosmos/ics23/v1/proofs").InnerOp>]: never; })[] & { [K_6 in Exclude<keyof I["proofs"][number]["nonexist"]["left"]["path"], keyof {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[]>]: never; };
                } & { [K_7 in Exclude<keyof I["proofs"][number]["nonexist"]["left"], keyof import("../../../../cosmos/ics23/v1/proofs").ExistenceProof>]: never; };
                right?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                } & {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    } & {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    } & { [K_8 in Exclude<keyof I["proofs"][number]["nonexist"]["right"]["leaf"], keyof import("../../../../cosmos/ics23/v1/proofs").LeafOp>]: never; };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[] & ({
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    } & {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    } & { [K_9 in Exclude<keyof I["proofs"][number]["nonexist"]["right"]["path"][number], keyof import("../../../../cosmos/ics23/v1/proofs").InnerOp>]: never; })[] & { [K_10 in Exclude<keyof I["proofs"][number]["nonexist"]["right"]["path"], keyof {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[]>]: never; };
                } & { [K_11 in Exclude<keyof I["proofs"][number]["nonexist"]["right"], keyof import("../../../../cosmos/ics23/v1/proofs").ExistenceProof>]: never; };
            } & { [K_12 in Exclude<keyof I["proofs"][number]["nonexist"], keyof import("../../../../cosmos/ics23/v1/proofs").NonExistenceProof>]: never; };
            batch?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                    };
                }[];
            } & {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                    };
                }[] & ({
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                    };
                } & {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[];
                    } & {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        } & {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        } & { [K_13 in Exclude<keyof I["proofs"][number]["batch"]["entries"][number]["exist"]["leaf"], keyof import("../../../../cosmos/ics23/v1/proofs").LeafOp>]: never; };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[] & ({
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        } & {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        } & { [K_14 in Exclude<keyof I["proofs"][number]["batch"]["entries"][number]["exist"]["path"][number], keyof import("../../../../cosmos/ics23/v1/proofs").InnerOp>]: never; })[] & { [K_15 in Exclude<keyof I["proofs"][number]["batch"]["entries"][number]["exist"]["path"], keyof {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[]>]: never; };
                    } & { [K_16 in Exclude<keyof I["proofs"][number]["batch"]["entries"][number]["exist"], keyof import("../../../../cosmos/ics23/v1/proofs").ExistenceProof>]: never; };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                    } & {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        } & {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            } & {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            } & { [K_17 in Exclude<keyof I["proofs"][number]["batch"]["entries"][number]["nonexist"]["left"]["leaf"], keyof import("../../../../cosmos/ics23/v1/proofs").LeafOp>]: never; };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[] & ({
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            } & {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            } & { [K_18 in Exclude<keyof I["proofs"][number]["batch"]["entries"][number]["nonexist"]["left"]["path"][number], keyof import("../../../../cosmos/ics23/v1/proofs").InnerOp>]: never; })[] & { [K_19 in Exclude<keyof I["proofs"][number]["batch"]["entries"][number]["nonexist"]["left"]["path"], keyof {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[]>]: never; };
                        } & { [K_20 in Exclude<keyof I["proofs"][number]["batch"]["entries"][number]["nonexist"]["left"], keyof import("../../../../cosmos/ics23/v1/proofs").ExistenceProof>]: never; };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        } & {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            } & {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            } & { [K_21 in Exclude<keyof I["proofs"][number]["batch"]["entries"][number]["nonexist"]["right"]["leaf"], keyof import("../../../../cosmos/ics23/v1/proofs").LeafOp>]: never; };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[] & ({
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            } & {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            } & { [K_22 in Exclude<keyof I["proofs"][number]["batch"]["entries"][number]["nonexist"]["right"]["path"][number], keyof import("../../../../cosmos/ics23/v1/proofs").InnerOp>]: never; })[] & { [K_23 in Exclude<keyof I["proofs"][number]["batch"]["entries"][number]["nonexist"]["right"]["path"], keyof {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[]>]: never; };
                        } & { [K_24 in Exclude<keyof I["proofs"][number]["batch"]["entries"][number]["nonexist"]["right"], keyof import("../../../../cosmos/ics23/v1/proofs").ExistenceProof>]: never; };
                    } & { [K_25 in Exclude<keyof I["proofs"][number]["batch"]["entries"][number]["nonexist"], keyof import("../../../../cosmos/ics23/v1/proofs").NonExistenceProof>]: never; };
                } & { [K_26 in Exclude<keyof I["proofs"][number]["batch"]["entries"][number], keyof import("../../../../cosmos/ics23/v1/proofs").BatchEntry>]: never; })[] & { [K_27 in Exclude<keyof I["proofs"][number]["batch"]["entries"], keyof {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                    };
                }[]>]: never; };
            } & { [K_28 in Exclude<keyof I["proofs"][number]["batch"], "entries">]: never; };
            compressed?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: number[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                    };
                }[];
                lookupInners?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            } & {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: number[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                    };
                }[] & ({
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: number[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                    };
                } & {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: number[];
                    } & {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        } & {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        } & { [K_29 in Exclude<keyof I["proofs"][number]["compressed"]["entries"][number]["exist"]["leaf"], keyof import("../../../../cosmos/ics23/v1/proofs").LeafOp>]: never; };
                        path?: number[] & number[] & { [K_30 in Exclude<keyof I["proofs"][number]["compressed"]["entries"][number]["exist"]["path"], keyof number[]>]: never; };
                    } & { [K_31 in Exclude<keyof I["proofs"][number]["compressed"]["entries"][number]["exist"], keyof import("../../../../cosmos/ics23/v1/proofs").CompressedExistenceProof>]: never; };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                    } & {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        } & {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            } & {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            } & { [K_32 in Exclude<keyof I["proofs"][number]["compressed"]["entries"][number]["nonexist"]["left"]["leaf"], keyof import("../../../../cosmos/ics23/v1/proofs").LeafOp>]: never; };
                            path?: number[] & number[] & { [K_33 in Exclude<keyof I["proofs"][number]["compressed"]["entries"][number]["nonexist"]["left"]["path"], keyof number[]>]: never; };
                        } & { [K_34 in Exclude<keyof I["proofs"][number]["compressed"]["entries"][number]["nonexist"]["left"], keyof import("../../../../cosmos/ics23/v1/proofs").CompressedExistenceProof>]: never; };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        } & {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            } & {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            } & { [K_35 in Exclude<keyof I["proofs"][number]["compressed"]["entries"][number]["nonexist"]["right"]["leaf"], keyof import("../../../../cosmos/ics23/v1/proofs").LeafOp>]: never; };
                            path?: number[] & number[] & { [K_36 in Exclude<keyof I["proofs"][number]["compressed"]["entries"][number]["nonexist"]["right"]["path"], keyof number[]>]: never; };
                        } & { [K_37 in Exclude<keyof I["proofs"][number]["compressed"]["entries"][number]["nonexist"]["right"], keyof import("../../../../cosmos/ics23/v1/proofs").CompressedExistenceProof>]: never; };
                    } & { [K_38 in Exclude<keyof I["proofs"][number]["compressed"]["entries"][number]["nonexist"], keyof import("../../../../cosmos/ics23/v1/proofs").CompressedNonExistenceProof>]: never; };
                } & { [K_39 in Exclude<keyof I["proofs"][number]["compressed"]["entries"][number], keyof import("../../../../cosmos/ics23/v1/proofs").CompressedBatchEntry>]: never; })[] & { [K_40 in Exclude<keyof I["proofs"][number]["compressed"]["entries"], keyof {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: number[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                    };
                }[]>]: never; };
                lookupInners?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[] & ({
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                } & {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                } & { [K_41 in Exclude<keyof I["proofs"][number]["compressed"]["lookupInners"][number], keyof import("../../../../cosmos/ics23/v1/proofs").InnerOp>]: never; })[] & { [K_42 in Exclude<keyof I["proofs"][number]["compressed"]["lookupInners"], keyof {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[]>]: never; };
            } & { [K_43 in Exclude<keyof I["proofs"][number]["compressed"], keyof import("../../../../cosmos/ics23/v1/proofs").CompressedBatchProof>]: never; };
        } & { [K_44 in Exclude<keyof I["proofs"][number], keyof CommitmentProof>]: never; })[] & { [K_45 in Exclude<keyof I["proofs"], keyof {
            exist?: {
                key?: Uint8Array;
                value?: Uint8Array;
                leaf?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                    prefix?: Uint8Array;
                };
                path?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            };
            nonexist?: {
                key?: Uint8Array;
                left?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
                right?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
            };
            batch?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                    };
                }[];
            };
            compressed?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: number[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                    };
                }[];
                lookupInners?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            };
        }[]>]: never; };
    } & { [K_46 in Exclude<keyof I, "proofs">]: never; }>(base?: I): MerkleProof;
    fromPartial<I_1 extends {
        proofs?: {
            exist?: {
                key?: Uint8Array;
                value?: Uint8Array;
                leaf?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                    prefix?: Uint8Array;
                };
                path?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            };
            nonexist?: {
                key?: Uint8Array;
                left?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
                right?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
            };
            batch?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                    };
                }[];
            };
            compressed?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: number[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                    };
                }[];
                lookupInners?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            };
        }[];
    } & {
        proofs?: {
            exist?: {
                key?: Uint8Array;
                value?: Uint8Array;
                leaf?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                    prefix?: Uint8Array;
                };
                path?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            };
            nonexist?: {
                key?: Uint8Array;
                left?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
                right?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
            };
            batch?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                    };
                }[];
            };
            compressed?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: number[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                    };
                }[];
                lookupInners?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            };
        }[] & ({
            exist?: {
                key?: Uint8Array;
                value?: Uint8Array;
                leaf?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                    prefix?: Uint8Array;
                };
                path?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            };
            nonexist?: {
                key?: Uint8Array;
                left?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
                right?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
            };
            batch?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                    };
                }[];
            };
            compressed?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: number[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                    };
                }[];
                lookupInners?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            };
        } & {
            exist?: {
                key?: Uint8Array;
                value?: Uint8Array;
                leaf?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                    prefix?: Uint8Array;
                };
                path?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            } & {
                key?: Uint8Array;
                value?: Uint8Array;
                leaf?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                    prefix?: Uint8Array;
                } & {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                    prefix?: Uint8Array;
                } & { [K_47 in Exclude<keyof I_1["proofs"][number]["exist"]["leaf"], keyof import("../../../../cosmos/ics23/v1/proofs").LeafOp>]: never; };
                path?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[] & ({
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                } & {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                } & { [K_48 in Exclude<keyof I_1["proofs"][number]["exist"]["path"][number], keyof import("../../../../cosmos/ics23/v1/proofs").InnerOp>]: never; })[] & { [K_49 in Exclude<keyof I_1["proofs"][number]["exist"]["path"], keyof {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[]>]: never; };
            } & { [K_50 in Exclude<keyof I_1["proofs"][number]["exist"], keyof import("../../../../cosmos/ics23/v1/proofs").ExistenceProof>]: never; };
            nonexist?: {
                key?: Uint8Array;
                left?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
                right?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
            } & {
                key?: Uint8Array;
                left?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                } & {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    } & {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    } & { [K_51 in Exclude<keyof I_1["proofs"][number]["nonexist"]["left"]["leaf"], keyof import("../../../../cosmos/ics23/v1/proofs").LeafOp>]: never; };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[] & ({
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    } & {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    } & { [K_52 in Exclude<keyof I_1["proofs"][number]["nonexist"]["left"]["path"][number], keyof import("../../../../cosmos/ics23/v1/proofs").InnerOp>]: never; })[] & { [K_53 in Exclude<keyof I_1["proofs"][number]["nonexist"]["left"]["path"], keyof {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[]>]: never; };
                } & { [K_54 in Exclude<keyof I_1["proofs"][number]["nonexist"]["left"], keyof import("../../../../cosmos/ics23/v1/proofs").ExistenceProof>]: never; };
                right?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                } & {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    } & {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    } & { [K_55 in Exclude<keyof I_1["proofs"][number]["nonexist"]["right"]["leaf"], keyof import("../../../../cosmos/ics23/v1/proofs").LeafOp>]: never; };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[] & ({
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    } & {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    } & { [K_56 in Exclude<keyof I_1["proofs"][number]["nonexist"]["right"]["path"][number], keyof import("../../../../cosmos/ics23/v1/proofs").InnerOp>]: never; })[] & { [K_57 in Exclude<keyof I_1["proofs"][number]["nonexist"]["right"]["path"], keyof {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[]>]: never; };
                } & { [K_58 in Exclude<keyof I_1["proofs"][number]["nonexist"]["right"], keyof import("../../../../cosmos/ics23/v1/proofs").ExistenceProof>]: never; };
            } & { [K_59 in Exclude<keyof I_1["proofs"][number]["nonexist"], keyof import("../../../../cosmos/ics23/v1/proofs").NonExistenceProof>]: never; };
            batch?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                    };
                }[];
            } & {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                    };
                }[] & ({
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                    };
                } & {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[];
                    } & {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        } & {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        } & { [K_60 in Exclude<keyof I_1["proofs"][number]["batch"]["entries"][number]["exist"]["leaf"], keyof import("../../../../cosmos/ics23/v1/proofs").LeafOp>]: never; };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[] & ({
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        } & {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        } & { [K_61 in Exclude<keyof I_1["proofs"][number]["batch"]["entries"][number]["exist"]["path"][number], keyof import("../../../../cosmos/ics23/v1/proofs").InnerOp>]: never; })[] & { [K_62 in Exclude<keyof I_1["proofs"][number]["batch"]["entries"][number]["exist"]["path"], keyof {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[]>]: never; };
                    } & { [K_63 in Exclude<keyof I_1["proofs"][number]["batch"]["entries"][number]["exist"], keyof import("../../../../cosmos/ics23/v1/proofs").ExistenceProof>]: never; };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                    } & {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        } & {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            } & {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            } & { [K_64 in Exclude<keyof I_1["proofs"][number]["batch"]["entries"][number]["nonexist"]["left"]["leaf"], keyof import("../../../../cosmos/ics23/v1/proofs").LeafOp>]: never; };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[] & ({
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            } & {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            } & { [K_65 in Exclude<keyof I_1["proofs"][number]["batch"]["entries"][number]["nonexist"]["left"]["path"][number], keyof import("../../../../cosmos/ics23/v1/proofs").InnerOp>]: never; })[] & { [K_66 in Exclude<keyof I_1["proofs"][number]["batch"]["entries"][number]["nonexist"]["left"]["path"], keyof {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[]>]: never; };
                        } & { [K_67 in Exclude<keyof I_1["proofs"][number]["batch"]["entries"][number]["nonexist"]["left"], keyof import("../../../../cosmos/ics23/v1/proofs").ExistenceProof>]: never; };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        } & {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            } & {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            } & { [K_68 in Exclude<keyof I_1["proofs"][number]["batch"]["entries"][number]["nonexist"]["right"]["leaf"], keyof import("../../../../cosmos/ics23/v1/proofs").LeafOp>]: never; };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[] & ({
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            } & {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            } & { [K_69 in Exclude<keyof I_1["proofs"][number]["batch"]["entries"][number]["nonexist"]["right"]["path"][number], keyof import("../../../../cosmos/ics23/v1/proofs").InnerOp>]: never; })[] & { [K_70 in Exclude<keyof I_1["proofs"][number]["batch"]["entries"][number]["nonexist"]["right"]["path"], keyof {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[]>]: never; };
                        } & { [K_71 in Exclude<keyof I_1["proofs"][number]["batch"]["entries"][number]["nonexist"]["right"], keyof import("../../../../cosmos/ics23/v1/proofs").ExistenceProof>]: never; };
                    } & { [K_72 in Exclude<keyof I_1["proofs"][number]["batch"]["entries"][number]["nonexist"], keyof import("../../../../cosmos/ics23/v1/proofs").NonExistenceProof>]: never; };
                } & { [K_73 in Exclude<keyof I_1["proofs"][number]["batch"]["entries"][number], keyof import("../../../../cosmos/ics23/v1/proofs").BatchEntry>]: never; })[] & { [K_74 in Exclude<keyof I_1["proofs"][number]["batch"]["entries"], keyof {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                    };
                }[]>]: never; };
            } & { [K_75 in Exclude<keyof I_1["proofs"][number]["batch"], "entries">]: never; };
            compressed?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: number[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                    };
                }[];
                lookupInners?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            } & {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: number[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                    };
                }[] & ({
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: number[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                    };
                } & {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: number[];
                    } & {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        } & {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        } & { [K_76 in Exclude<keyof I_1["proofs"][number]["compressed"]["entries"][number]["exist"]["leaf"], keyof import("../../../../cosmos/ics23/v1/proofs").LeafOp>]: never; };
                        path?: number[] & number[] & { [K_77 in Exclude<keyof I_1["proofs"][number]["compressed"]["entries"][number]["exist"]["path"], keyof number[]>]: never; };
                    } & { [K_78 in Exclude<keyof I_1["proofs"][number]["compressed"]["entries"][number]["exist"], keyof import("../../../../cosmos/ics23/v1/proofs").CompressedExistenceProof>]: never; };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                    } & {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        } & {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            } & {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            } & { [K_79 in Exclude<keyof I_1["proofs"][number]["compressed"]["entries"][number]["nonexist"]["left"]["leaf"], keyof import("../../../../cosmos/ics23/v1/proofs").LeafOp>]: never; };
                            path?: number[] & number[] & { [K_80 in Exclude<keyof I_1["proofs"][number]["compressed"]["entries"][number]["nonexist"]["left"]["path"], keyof number[]>]: never; };
                        } & { [K_81 in Exclude<keyof I_1["proofs"][number]["compressed"]["entries"][number]["nonexist"]["left"], keyof import("../../../../cosmos/ics23/v1/proofs").CompressedExistenceProof>]: never; };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        } & {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            } & {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            } & { [K_82 in Exclude<keyof I_1["proofs"][number]["compressed"]["entries"][number]["nonexist"]["right"]["leaf"], keyof import("../../../../cosmos/ics23/v1/proofs").LeafOp>]: never; };
                            path?: number[] & number[] & { [K_83 in Exclude<keyof I_1["proofs"][number]["compressed"]["entries"][number]["nonexist"]["right"]["path"], keyof number[]>]: never; };
                        } & { [K_84 in Exclude<keyof I_1["proofs"][number]["compressed"]["entries"][number]["nonexist"]["right"], keyof import("../../../../cosmos/ics23/v1/proofs").CompressedExistenceProof>]: never; };
                    } & { [K_85 in Exclude<keyof I_1["proofs"][number]["compressed"]["entries"][number]["nonexist"], keyof import("../../../../cosmos/ics23/v1/proofs").CompressedNonExistenceProof>]: never; };
                } & { [K_86 in Exclude<keyof I_1["proofs"][number]["compressed"]["entries"][number], keyof import("../../../../cosmos/ics23/v1/proofs").CompressedBatchEntry>]: never; })[] & { [K_87 in Exclude<keyof I_1["proofs"][number]["compressed"]["entries"], keyof {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: number[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                    };
                }[]>]: never; };
                lookupInners?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[] & ({
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                } & {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                } & { [K_88 in Exclude<keyof I_1["proofs"][number]["compressed"]["lookupInners"][number], keyof import("../../../../cosmos/ics23/v1/proofs").InnerOp>]: never; })[] & { [K_89 in Exclude<keyof I_1["proofs"][number]["compressed"]["lookupInners"], keyof {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[]>]: never; };
            } & { [K_90 in Exclude<keyof I_1["proofs"][number]["compressed"], keyof import("../../../../cosmos/ics23/v1/proofs").CompressedBatchProof>]: never; };
        } & { [K_91 in Exclude<keyof I_1["proofs"][number], keyof CommitmentProof>]: never; })[] & { [K_92 in Exclude<keyof I_1["proofs"], keyof {
            exist?: {
                key?: Uint8Array;
                value?: Uint8Array;
                leaf?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                    prefix?: Uint8Array;
                };
                path?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            };
            nonexist?: {
                key?: Uint8Array;
                left?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
                right?: {
                    key?: Uint8Array;
                    value?: Uint8Array;
                    leaf?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                        prefix?: Uint8Array;
                    };
                    path?: {
                        hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                        prefix?: Uint8Array;
                        suffix?: Uint8Array;
                    }[];
                };
            };
            batch?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prefix?: Uint8Array;
                            suffix?: Uint8Array;
                        }[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prefix?: Uint8Array;
                                suffix?: Uint8Array;
                            }[];
                        };
                    };
                }[];
            };
            compressed?: {
                entries?: {
                    exist?: {
                        key?: Uint8Array;
                        value?: Uint8Array;
                        leaf?: {
                            hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                            length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                            prefix?: Uint8Array;
                        };
                        path?: number[];
                    };
                    nonexist?: {
                        key?: Uint8Array;
                        left?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                        right?: {
                            key?: Uint8Array;
                            value?: Uint8Array;
                            leaf?: {
                                hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashKey?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                prehashValue?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                                length?: import("../../../../cosmos/ics23/v1/proofs").LengthOp;
                                prefix?: Uint8Array;
                            };
                            path?: number[];
                        };
                    };
                }[];
                lookupInners?: {
                    hash?: import("../../../../cosmos/ics23/v1/proofs").HashOp;
                    prefix?: Uint8Array;
                    suffix?: Uint8Array;
                }[];
            };
        }[]>]: never; };
    } & { [K_93 in Exclude<keyof I_1, "proofs">]: never; }>(object: I_1): MerkleProof;
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
