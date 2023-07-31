import * as dependency_2 from "./../../crypto/multisig/v1beta1/multisig";
import * as dependency_3 from "./../../base/v1beta1/coin";
import * as dependency_4 from "./../signing/v1beta1/signing";
import * as dependency_5 from "./../../../google/protobuf/any";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.tx.v1beta1 {
    class Tx extends pb_1.Message {
        constructor(data?: any[] | {
            body?: TxBody;
            auth_info?: AuthInfo;
            signatures?: Uint8Array[];
        });
        get body(): TxBody;
        set body(value: TxBody);
        get auth_info(): AuthInfo;
        set auth_info(value: AuthInfo);
        get signatures(): Uint8Array[];
        set signatures(value: Uint8Array[]);
        static fromObject(data: {
            body?: ReturnType<typeof TxBody.prototype.toObject>;
            auth_info?: ReturnType<typeof AuthInfo.prototype.toObject>;
            signatures?: Uint8Array[];
        }): Tx;
        toObject(): {
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
                            mode?: dependency_4.cosmos.tx.signing.v1beta1.SignMode | undefined;
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
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Tx;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Tx;
    }
    class TxRaw extends pb_1.Message {
        constructor(data?: any[] | {
            body_bytes?: Uint8Array;
            auth_info_bytes?: Uint8Array;
            signatures?: Uint8Array[];
        });
        get body_bytes(): Uint8Array;
        set body_bytes(value: Uint8Array);
        get auth_info_bytes(): Uint8Array;
        set auth_info_bytes(value: Uint8Array);
        get signatures(): Uint8Array[];
        set signatures(value: Uint8Array[]);
        static fromObject(data: {
            body_bytes?: Uint8Array;
            auth_info_bytes?: Uint8Array;
            signatures?: Uint8Array[];
        }): TxRaw;
        toObject(): {
            body_bytes?: Uint8Array | undefined;
            auth_info_bytes?: Uint8Array | undefined;
            signatures?: Uint8Array[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TxRaw;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TxRaw;
    }
    class SignDoc extends pb_1.Message {
        constructor(data?: any[] | {
            body_bytes?: Uint8Array;
            auth_info_bytes?: Uint8Array;
            chain_id?: string;
            account_number?: number;
        });
        get body_bytes(): Uint8Array;
        set body_bytes(value: Uint8Array);
        get auth_info_bytes(): Uint8Array;
        set auth_info_bytes(value: Uint8Array);
        get chain_id(): string;
        set chain_id(value: string);
        get account_number(): number;
        set account_number(value: number);
        static fromObject(data: {
            body_bytes?: Uint8Array;
            auth_info_bytes?: Uint8Array;
            chain_id?: string;
            account_number?: number;
        }): SignDoc;
        toObject(): {
            body_bytes?: Uint8Array | undefined;
            auth_info_bytes?: Uint8Array | undefined;
            chain_id?: string | undefined;
            account_number?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SignDoc;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SignDoc;
    }
    class TxBody extends pb_1.Message {
        constructor(data?: any[] | {
            messages?: dependency_5.google.protobuf.Any[];
            memo?: string;
            timeout_height?: number;
            extension_options?: dependency_5.google.protobuf.Any[];
            non_critical_extension_options?: dependency_5.google.protobuf.Any[];
        });
        get messages(): dependency_5.google.protobuf.Any[];
        set messages(value: dependency_5.google.protobuf.Any[]);
        get memo(): string;
        set memo(value: string);
        get timeout_height(): number;
        set timeout_height(value: number);
        get extension_options(): dependency_5.google.protobuf.Any[];
        set extension_options(value: dependency_5.google.protobuf.Any[]);
        get non_critical_extension_options(): dependency_5.google.protobuf.Any[];
        set non_critical_extension_options(value: dependency_5.google.protobuf.Any[]);
        static fromObject(data: {
            messages?: ReturnType<typeof dependency_5.google.protobuf.Any.prototype.toObject>[];
            memo?: string;
            timeout_height?: number;
            extension_options?: ReturnType<typeof dependency_5.google.protobuf.Any.prototype.toObject>[];
            non_critical_extension_options?: ReturnType<typeof dependency_5.google.protobuf.Any.prototype.toObject>[];
        }): TxBody;
        toObject(): {
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
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TxBody;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TxBody;
    }
    class AuthInfo extends pb_1.Message {
        constructor(data?: any[] | {
            signer_infos?: SignerInfo[];
            fee?: Fee;
        });
        get signer_infos(): SignerInfo[];
        set signer_infos(value: SignerInfo[]);
        get fee(): Fee;
        set fee(value: Fee);
        static fromObject(data: {
            signer_infos?: ReturnType<typeof SignerInfo.prototype.toObject>[];
            fee?: ReturnType<typeof Fee.prototype.toObject>;
        }): AuthInfo;
        toObject(): {
            signer_infos?: {
                public_key?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                mode_info?: {
                    single?: {
                        mode?: dependency_4.cosmos.tx.signing.v1beta1.SignMode | undefined;
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
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AuthInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AuthInfo;
    }
    class SignerInfo extends pb_1.Message {
        constructor(data?: any[] | {
            public_key?: dependency_5.google.protobuf.Any;
            mode_info?: ModeInfo;
            sequence?: number;
        });
        get public_key(): dependency_5.google.protobuf.Any;
        set public_key(value: dependency_5.google.protobuf.Any);
        get mode_info(): ModeInfo;
        set mode_info(value: ModeInfo);
        get sequence(): number;
        set sequence(value: number);
        static fromObject(data: {
            public_key?: ReturnType<typeof dependency_5.google.protobuf.Any.prototype.toObject>;
            mode_info?: ReturnType<typeof ModeInfo.prototype.toObject>;
            sequence?: number;
        }): SignerInfo;
        toObject(): {
            public_key?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            mode_info?: {
                single?: {
                    mode?: dependency_4.cosmos.tx.signing.v1beta1.SignMode | undefined;
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
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SignerInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SignerInfo;
    }
    class ModeInfo extends pb_1.Message {
        constructor(data?: any[] | ({} & (({
            single?: ModeInfo.Single;
            multi?: never;
        } | {
            single?: never;
            multi?: ModeInfo.Multi;
        }))));
        get single(): ModeInfo.Single;
        set single(value: ModeInfo.Single);
        get multi(): ModeInfo.Multi;
        set multi(value: ModeInfo.Multi);
        get sum(): "single" | "none" | "multi";
        static fromObject(data: {
            single?: ReturnType<typeof ModeInfo.Single.prototype.toObject>;
            multi?: ReturnType<typeof ModeInfo.Multi.prototype.toObject>;
        }): ModeInfo;
        toObject(): {
            single?: {
                mode?: dependency_4.cosmos.tx.signing.v1beta1.SignMode | undefined;
            } | undefined;
            multi?: {
                bitarray?: {
                    extra_bits_stored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                mode_infos?: {
                    single?: {
                        mode?: dependency_4.cosmos.tx.signing.v1beta1.SignMode | undefined;
                    } | undefined;
                    multi?: any | undefined;
                }[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ModeInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ModeInfo;
    }
    namespace ModeInfo {
        class Single extends pb_1.Message {
            constructor(data?: any[] | {
                mode?: dependency_4.cosmos.tx.signing.v1beta1.SignMode;
            });
            get mode(): dependency_4.cosmos.tx.signing.v1beta1.SignMode;
            set mode(value: dependency_4.cosmos.tx.signing.v1beta1.SignMode);
            static fromObject(data: {
                mode?: dependency_4.cosmos.tx.signing.v1beta1.SignMode;
            }): Single;
            toObject(): {
                mode?: dependency_4.cosmos.tx.signing.v1beta1.SignMode | undefined;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Single;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): Single;
        }
        class Multi extends pb_1.Message {
            constructor(data?: any[] | {
                bitarray?: dependency_2.cosmos.crypto.multisig.v1beta1.CompactBitArray;
                mode_infos?: ModeInfo[];
            });
            get bitarray(): dependency_2.cosmos.crypto.multisig.v1beta1.CompactBitArray;
            set bitarray(value: dependency_2.cosmos.crypto.multisig.v1beta1.CompactBitArray);
            get mode_infos(): ModeInfo[];
            set mode_infos(value: ModeInfo[]);
            static fromObject(data: {
                bitarray?: ReturnType<typeof dependency_2.cosmos.crypto.multisig.v1beta1.CompactBitArray.prototype.toObject>;
                mode_infos?: ReturnType<typeof ModeInfo.prototype.toObject>[];
            }): Multi;
            toObject(): {
                bitarray?: {
                    extra_bits_stored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                mode_infos?: {
                    single?: {
                        mode?: dependency_4.cosmos.tx.signing.v1beta1.SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extra_bits_stored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        mode_infos?: any[] | undefined;
                    } | undefined;
                }[] | undefined;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Multi;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): Multi;
        }
    }
    class Fee extends pb_1.Message {
        constructor(data?: any[] | {
            amount?: dependency_3.cosmos.base.v1beta1.Coin[];
            gas_limit?: number;
            payer?: string;
            granter?: string;
        });
        get amount(): dependency_3.cosmos.base.v1beta1.Coin[];
        set amount(value: dependency_3.cosmos.base.v1beta1.Coin[]);
        get gas_limit(): number;
        set gas_limit(value: number);
        get payer(): string;
        set payer(value: string);
        get granter(): string;
        set granter(value: string);
        static fromObject(data: {
            amount?: ReturnType<typeof dependency_3.cosmos.base.v1beta1.Coin.prototype.toObject>[];
            gas_limit?: number;
            payer?: string;
            granter?: string;
        }): Fee;
        toObject(): {
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            gas_limit?: number | undefined;
            payer?: string | undefined;
            granter?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Fee;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Fee;
    }
}
//# sourceMappingURL=tx.d.ts.map