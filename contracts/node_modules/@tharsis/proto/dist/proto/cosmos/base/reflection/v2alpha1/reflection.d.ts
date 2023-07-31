import * as pb_1 from "google-protobuf";
export declare namespace cosmos.base.reflection.v2alpha1 {
    class AppDescriptor extends pb_1.Message {
        constructor(data?: any[] | {
            authn?: AuthnDescriptor;
            chain?: ChainDescriptor;
            codec?: CodecDescriptor;
            configuration?: ConfigurationDescriptor;
            query_services?: QueryServicesDescriptor;
            tx?: TxDescriptor;
        });
        get authn(): AuthnDescriptor;
        set authn(value: AuthnDescriptor);
        get chain(): ChainDescriptor;
        set chain(value: ChainDescriptor);
        get codec(): CodecDescriptor;
        set codec(value: CodecDescriptor);
        get configuration(): ConfigurationDescriptor;
        set configuration(value: ConfigurationDescriptor);
        get query_services(): QueryServicesDescriptor;
        set query_services(value: QueryServicesDescriptor);
        get tx(): TxDescriptor;
        set tx(value: TxDescriptor);
        static fromObject(data: {
            authn?: ReturnType<typeof AuthnDescriptor.prototype.toObject>;
            chain?: ReturnType<typeof ChainDescriptor.prototype.toObject>;
            codec?: ReturnType<typeof CodecDescriptor.prototype.toObject>;
            configuration?: ReturnType<typeof ConfigurationDescriptor.prototype.toObject>;
            query_services?: ReturnType<typeof QueryServicesDescriptor.prototype.toObject>;
            tx?: ReturnType<typeof TxDescriptor.prototype.toObject>;
        }): AppDescriptor;
        toObject(): {
            authn?: {
                sign_modes?: {
                    name?: string | undefined;
                    number?: number | undefined;
                    authn_info_provider_method_fullname?: string | undefined;
                }[] | undefined;
            } | undefined;
            chain?: {
                id?: string | undefined;
            } | undefined;
            codec?: {
                interfaces?: {
                    fullname?: string | undefined;
                    interface_accepting_messages?: {
                        fullname?: string | undefined;
                        field_descriptor_names?: string[] | undefined;
                    }[] | undefined;
                    interface_implementers?: {
                        fullname?: string | undefined;
                        type_url?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
            } | undefined;
            configuration?: {
                bech32_account_address_prefix?: string | undefined;
            } | undefined;
            query_services?: {
                query_services?: {
                    fullname?: string | undefined;
                    is_module?: boolean | undefined;
                    methods?: {
                        name?: string | undefined;
                        full_query_path?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
            } | undefined;
            tx?: {
                fullname?: string | undefined;
                msgs?: {
                    msg_type_url?: string | undefined;
                }[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AppDescriptor;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AppDescriptor;
    }
    class TxDescriptor extends pb_1.Message {
        constructor(data?: any[] | {
            fullname?: string;
            msgs?: MsgDescriptor[];
        });
        get fullname(): string;
        set fullname(value: string);
        get msgs(): MsgDescriptor[];
        set msgs(value: MsgDescriptor[]);
        static fromObject(data: {
            fullname?: string;
            msgs?: ReturnType<typeof MsgDescriptor.prototype.toObject>[];
        }): TxDescriptor;
        toObject(): {
            fullname?: string | undefined;
            msgs?: {
                msg_type_url?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TxDescriptor;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TxDescriptor;
    }
    class AuthnDescriptor extends pb_1.Message {
        constructor(data?: any[] | {
            sign_modes?: SigningModeDescriptor[];
        });
        get sign_modes(): SigningModeDescriptor[];
        set sign_modes(value: SigningModeDescriptor[]);
        static fromObject(data: {
            sign_modes?: ReturnType<typeof SigningModeDescriptor.prototype.toObject>[];
        }): AuthnDescriptor;
        toObject(): {
            sign_modes?: {
                name?: string | undefined;
                number?: number | undefined;
                authn_info_provider_method_fullname?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AuthnDescriptor;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AuthnDescriptor;
    }
    class SigningModeDescriptor extends pb_1.Message {
        constructor(data?: any[] | {
            name?: string;
            number?: number;
            authn_info_provider_method_fullname?: string;
        });
        get name(): string;
        set name(value: string);
        get number(): number;
        set number(value: number);
        get authn_info_provider_method_fullname(): string;
        set authn_info_provider_method_fullname(value: string);
        static fromObject(data: {
            name?: string;
            number?: number;
            authn_info_provider_method_fullname?: string;
        }): SigningModeDescriptor;
        toObject(): {
            name?: string | undefined;
            number?: number | undefined;
            authn_info_provider_method_fullname?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SigningModeDescriptor;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SigningModeDescriptor;
    }
    class ChainDescriptor extends pb_1.Message {
        constructor(data?: any[] | {
            id?: string;
        });
        get id(): string;
        set id(value: string);
        static fromObject(data: {
            id?: string;
        }): ChainDescriptor;
        toObject(): {
            id?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ChainDescriptor;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ChainDescriptor;
    }
    class CodecDescriptor extends pb_1.Message {
        constructor(data?: any[] | {
            interfaces?: InterfaceDescriptor[];
        });
        get interfaces(): InterfaceDescriptor[];
        set interfaces(value: InterfaceDescriptor[]);
        static fromObject(data: {
            interfaces?: ReturnType<typeof InterfaceDescriptor.prototype.toObject>[];
        }): CodecDescriptor;
        toObject(): {
            interfaces?: {
                fullname?: string | undefined;
                interface_accepting_messages?: {
                    fullname?: string | undefined;
                    field_descriptor_names?: string[] | undefined;
                }[] | undefined;
                interface_implementers?: {
                    fullname?: string | undefined;
                    type_url?: string | undefined;
                }[] | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CodecDescriptor;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CodecDescriptor;
    }
    class InterfaceDescriptor extends pb_1.Message {
        constructor(data?: any[] | {
            fullname?: string;
            interface_accepting_messages?: InterfaceAcceptingMessageDescriptor[];
            interface_implementers?: InterfaceImplementerDescriptor[];
        });
        get fullname(): string;
        set fullname(value: string);
        get interface_accepting_messages(): InterfaceAcceptingMessageDescriptor[];
        set interface_accepting_messages(value: InterfaceAcceptingMessageDescriptor[]);
        get interface_implementers(): InterfaceImplementerDescriptor[];
        set interface_implementers(value: InterfaceImplementerDescriptor[]);
        static fromObject(data: {
            fullname?: string;
            interface_accepting_messages?: ReturnType<typeof InterfaceAcceptingMessageDescriptor.prototype.toObject>[];
            interface_implementers?: ReturnType<typeof InterfaceImplementerDescriptor.prototype.toObject>[];
        }): InterfaceDescriptor;
        toObject(): {
            fullname?: string | undefined;
            interface_accepting_messages?: {
                fullname?: string | undefined;
                field_descriptor_names?: string[] | undefined;
            }[] | undefined;
            interface_implementers?: {
                fullname?: string | undefined;
                type_url?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): InterfaceDescriptor;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): InterfaceDescriptor;
    }
    class InterfaceImplementerDescriptor extends pb_1.Message {
        constructor(data?: any[] | {
            fullname?: string;
            type_url?: string;
        });
        get fullname(): string;
        set fullname(value: string);
        get type_url(): string;
        set type_url(value: string);
        static fromObject(data: {
            fullname?: string;
            type_url?: string;
        }): InterfaceImplementerDescriptor;
        toObject(): {
            fullname?: string | undefined;
            type_url?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): InterfaceImplementerDescriptor;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): InterfaceImplementerDescriptor;
    }
    class InterfaceAcceptingMessageDescriptor extends pb_1.Message {
        constructor(data?: any[] | {
            fullname?: string;
            field_descriptor_names?: string[];
        });
        get fullname(): string;
        set fullname(value: string);
        get field_descriptor_names(): string[];
        set field_descriptor_names(value: string[]);
        static fromObject(data: {
            fullname?: string;
            field_descriptor_names?: string[];
        }): InterfaceAcceptingMessageDescriptor;
        toObject(): {
            fullname?: string | undefined;
            field_descriptor_names?: string[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): InterfaceAcceptingMessageDescriptor;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): InterfaceAcceptingMessageDescriptor;
    }
    class ConfigurationDescriptor extends pb_1.Message {
        constructor(data?: any[] | {
            bech32_account_address_prefix?: string;
        });
        get bech32_account_address_prefix(): string;
        set bech32_account_address_prefix(value: string);
        static fromObject(data: {
            bech32_account_address_prefix?: string;
        }): ConfigurationDescriptor;
        toObject(): {
            bech32_account_address_prefix?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ConfigurationDescriptor;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ConfigurationDescriptor;
    }
    class MsgDescriptor extends pb_1.Message {
        constructor(data?: any[] | {
            msg_type_url?: string;
        });
        get msg_type_url(): string;
        set msg_type_url(value: string);
        static fromObject(data: {
            msg_type_url?: string;
        }): MsgDescriptor;
        toObject(): {
            msg_type_url?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgDescriptor;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgDescriptor;
    }
    class GetAuthnDescriptorRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): GetAuthnDescriptorRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetAuthnDescriptorRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetAuthnDescriptorRequest;
    }
    class GetAuthnDescriptorResponse extends pb_1.Message {
        constructor(data?: any[] | {
            authn?: AuthnDescriptor;
        });
        get authn(): AuthnDescriptor;
        set authn(value: AuthnDescriptor);
        static fromObject(data: {
            authn?: ReturnType<typeof AuthnDescriptor.prototype.toObject>;
        }): GetAuthnDescriptorResponse;
        toObject(): {
            authn?: {
                sign_modes?: {
                    name?: string | undefined;
                    number?: number | undefined;
                    authn_info_provider_method_fullname?: string | undefined;
                }[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetAuthnDescriptorResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetAuthnDescriptorResponse;
    }
    class GetChainDescriptorRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): GetChainDescriptorRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetChainDescriptorRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetChainDescriptorRequest;
    }
    class GetChainDescriptorResponse extends pb_1.Message {
        constructor(data?: any[] | {
            chain?: ChainDescriptor;
        });
        get chain(): ChainDescriptor;
        set chain(value: ChainDescriptor);
        static fromObject(data: {
            chain?: ReturnType<typeof ChainDescriptor.prototype.toObject>;
        }): GetChainDescriptorResponse;
        toObject(): {
            chain?: {
                id?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetChainDescriptorResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetChainDescriptorResponse;
    }
    class GetCodecDescriptorRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): GetCodecDescriptorRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetCodecDescriptorRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetCodecDescriptorRequest;
    }
    class GetCodecDescriptorResponse extends pb_1.Message {
        constructor(data?: any[] | {
            codec?: CodecDescriptor;
        });
        get codec(): CodecDescriptor;
        set codec(value: CodecDescriptor);
        static fromObject(data: {
            codec?: ReturnType<typeof CodecDescriptor.prototype.toObject>;
        }): GetCodecDescriptorResponse;
        toObject(): {
            codec?: {
                interfaces?: {
                    fullname?: string | undefined;
                    interface_accepting_messages?: {
                        fullname?: string | undefined;
                        field_descriptor_names?: string[] | undefined;
                    }[] | undefined;
                    interface_implementers?: {
                        fullname?: string | undefined;
                        type_url?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetCodecDescriptorResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetCodecDescriptorResponse;
    }
    class GetConfigurationDescriptorRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): GetConfigurationDescriptorRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetConfigurationDescriptorRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetConfigurationDescriptorRequest;
    }
    class GetConfigurationDescriptorResponse extends pb_1.Message {
        constructor(data?: any[] | {
            config?: ConfigurationDescriptor;
        });
        get config(): ConfigurationDescriptor;
        set config(value: ConfigurationDescriptor);
        static fromObject(data: {
            config?: ReturnType<typeof ConfigurationDescriptor.prototype.toObject>;
        }): GetConfigurationDescriptorResponse;
        toObject(): {
            config?: {
                bech32_account_address_prefix?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetConfigurationDescriptorResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetConfigurationDescriptorResponse;
    }
    class GetQueryServicesDescriptorRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): GetQueryServicesDescriptorRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetQueryServicesDescriptorRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetQueryServicesDescriptorRequest;
    }
    class GetQueryServicesDescriptorResponse extends pb_1.Message {
        constructor(data?: any[] | {
            queries?: QueryServicesDescriptor;
        });
        get queries(): QueryServicesDescriptor;
        set queries(value: QueryServicesDescriptor);
        static fromObject(data: {
            queries?: ReturnType<typeof QueryServicesDescriptor.prototype.toObject>;
        }): GetQueryServicesDescriptorResponse;
        toObject(): {
            queries?: {
                query_services?: {
                    fullname?: string | undefined;
                    is_module?: boolean | undefined;
                    methods?: {
                        name?: string | undefined;
                        full_query_path?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetQueryServicesDescriptorResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetQueryServicesDescriptorResponse;
    }
    class GetTxDescriptorRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): GetTxDescriptorRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetTxDescriptorRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetTxDescriptorRequest;
    }
    class GetTxDescriptorResponse extends pb_1.Message {
        constructor(data?: any[] | {
            tx?: TxDescriptor;
        });
        get tx(): TxDescriptor;
        set tx(value: TxDescriptor);
        static fromObject(data: {
            tx?: ReturnType<typeof TxDescriptor.prototype.toObject>;
        }): GetTxDescriptorResponse;
        toObject(): {
            tx?: {
                fullname?: string | undefined;
                msgs?: {
                    msg_type_url?: string | undefined;
                }[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetTxDescriptorResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetTxDescriptorResponse;
    }
    class QueryServicesDescriptor extends pb_1.Message {
        constructor(data?: any[] | {
            query_services?: QueryServiceDescriptor[];
        });
        get query_services(): QueryServiceDescriptor[];
        set query_services(value: QueryServiceDescriptor[]);
        static fromObject(data: {
            query_services?: ReturnType<typeof QueryServiceDescriptor.prototype.toObject>[];
        }): QueryServicesDescriptor;
        toObject(): {
            query_services?: {
                fullname?: string | undefined;
                is_module?: boolean | undefined;
                methods?: {
                    name?: string | undefined;
                    full_query_path?: string | undefined;
                }[] | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryServicesDescriptor;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryServicesDescriptor;
    }
    class QueryServiceDescriptor extends pb_1.Message {
        constructor(data?: any[] | {
            fullname?: string;
            is_module?: boolean;
            methods?: QueryMethodDescriptor[];
        });
        get fullname(): string;
        set fullname(value: string);
        get is_module(): boolean;
        set is_module(value: boolean);
        get methods(): QueryMethodDescriptor[];
        set methods(value: QueryMethodDescriptor[]);
        static fromObject(data: {
            fullname?: string;
            is_module?: boolean;
            methods?: ReturnType<typeof QueryMethodDescriptor.prototype.toObject>[];
        }): QueryServiceDescriptor;
        toObject(): {
            fullname?: string | undefined;
            is_module?: boolean | undefined;
            methods?: {
                name?: string | undefined;
                full_query_path?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryServiceDescriptor;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryServiceDescriptor;
    }
    class QueryMethodDescriptor extends pb_1.Message {
        constructor(data?: any[] | {
            name?: string;
            full_query_path?: string;
        });
        get name(): string;
        set name(value: string);
        get full_query_path(): string;
        set full_query_path(value: string);
        static fromObject(data: {
            name?: string;
            full_query_path?: string;
        }): QueryMethodDescriptor;
        toObject(): {
            name?: string | undefined;
            full_query_path?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryMethodDescriptor;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryMethodDescriptor;
    }
}
//# sourceMappingURL=reflection.d.ts.map