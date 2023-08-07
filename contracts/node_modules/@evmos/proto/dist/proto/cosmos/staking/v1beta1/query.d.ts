import * as dependency_1 from "./../../base/query/v1beta1/pagination";
import * as dependency_4 from "./staking";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.staking.v1beta1 {
    class QueryValidatorsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            status?: string;
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get status(): string;
        set status(value: string);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            status?: string;
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryValidatorsRequest;
        toObject(): {
            status?: string | undefined;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryValidatorsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryValidatorsRequest;
    }
    class QueryValidatorsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            validators?: dependency_4.cosmos.staking.v1beta1.Validator[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get validators(): dependency_4.cosmos.staking.v1beta1.Validator[];
        set validators(value: dependency_4.cosmos.staking.v1beta1.Validator[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            validators?: ReturnType<typeof dependency_4.cosmos.staking.v1beta1.Validator.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryValidatorsResponse;
        toObject(): {
            validators?: {
                operator_address?: string | undefined;
                consensus_pubkey?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                jailed?: boolean | undefined;
                status?: dependency_4.cosmos.staking.v1beta1.BondStatus | undefined;
                tokens?: string | undefined;
                delegator_shares?: string | undefined;
                description?: {
                    moniker?: string | undefined;
                    identity?: string | undefined;
                    website?: string | undefined;
                    security_contact?: string | undefined;
                    details?: string | undefined;
                } | undefined;
                unbonding_height?: number | undefined;
                unbonding_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                commission?: {
                    commission_rates?: {
                        rate?: string | undefined;
                        max_rate?: string | undefined;
                        max_change_rate?: string | undefined;
                    } | undefined;
                    update_time?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                } | undefined;
                min_self_delegation?: string | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryValidatorsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryValidatorsResponse;
    }
    class QueryValidatorRequest extends pb_1.Message {
        constructor(data?: any[] | {
            validator_addr?: string;
        });
        get validator_addr(): string;
        set validator_addr(value: string);
        static fromObject(data: {
            validator_addr?: string;
        }): QueryValidatorRequest;
        toObject(): {
            validator_addr?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryValidatorRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryValidatorRequest;
    }
    class QueryValidatorResponse extends pb_1.Message {
        constructor(data?: any[] | {
            validator?: dependency_4.cosmos.staking.v1beta1.Validator;
        });
        get validator(): dependency_4.cosmos.staking.v1beta1.Validator;
        set validator(value: dependency_4.cosmos.staking.v1beta1.Validator);
        static fromObject(data: {
            validator?: ReturnType<typeof dependency_4.cosmos.staking.v1beta1.Validator.prototype.toObject>;
        }): QueryValidatorResponse;
        toObject(): {
            validator?: {
                operator_address?: string | undefined;
                consensus_pubkey?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                jailed?: boolean | undefined;
                status?: dependency_4.cosmos.staking.v1beta1.BondStatus | undefined;
                tokens?: string | undefined;
                delegator_shares?: string | undefined;
                description?: {
                    moniker?: string | undefined;
                    identity?: string | undefined;
                    website?: string | undefined;
                    security_contact?: string | undefined;
                    details?: string | undefined;
                } | undefined;
                unbonding_height?: number | undefined;
                unbonding_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                commission?: {
                    commission_rates?: {
                        rate?: string | undefined;
                        max_rate?: string | undefined;
                        max_change_rate?: string | undefined;
                    } | undefined;
                    update_time?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                } | undefined;
                min_self_delegation?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryValidatorResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryValidatorResponse;
    }
    class QueryValidatorDelegationsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            validator_addr?: string;
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get validator_addr(): string;
        set validator_addr(value: string);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            validator_addr?: string;
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryValidatorDelegationsRequest;
        toObject(): {
            validator_addr?: string | undefined;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryValidatorDelegationsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryValidatorDelegationsRequest;
    }
    class QueryValidatorDelegationsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            delegation_responses?: dependency_4.cosmos.staking.v1beta1.DelegationResponse[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get delegation_responses(): dependency_4.cosmos.staking.v1beta1.DelegationResponse[];
        set delegation_responses(value: dependency_4.cosmos.staking.v1beta1.DelegationResponse[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            delegation_responses?: ReturnType<typeof dependency_4.cosmos.staking.v1beta1.DelegationResponse.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryValidatorDelegationsResponse;
        toObject(): {
            delegation_responses?: {
                delegation?: {
                    delegator_address?: string | undefined;
                    validator_address?: string | undefined;
                    shares?: string | undefined;
                } | undefined;
                balance?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryValidatorDelegationsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryValidatorDelegationsResponse;
    }
    class QueryValidatorUnbondingDelegationsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            validator_addr?: string;
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get validator_addr(): string;
        set validator_addr(value: string);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            validator_addr?: string;
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryValidatorUnbondingDelegationsRequest;
        toObject(): {
            validator_addr?: string | undefined;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryValidatorUnbondingDelegationsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryValidatorUnbondingDelegationsRequest;
    }
    class QueryValidatorUnbondingDelegationsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            unbonding_responses?: dependency_4.cosmos.staking.v1beta1.UnbondingDelegation[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get unbonding_responses(): dependency_4.cosmos.staking.v1beta1.UnbondingDelegation[];
        set unbonding_responses(value: dependency_4.cosmos.staking.v1beta1.UnbondingDelegation[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            unbonding_responses?: ReturnType<typeof dependency_4.cosmos.staking.v1beta1.UnbondingDelegation.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryValidatorUnbondingDelegationsResponse;
        toObject(): {
            unbonding_responses?: {
                delegator_address?: string | undefined;
                validator_address?: string | undefined;
                entries?: {
                    creation_height?: number | undefined;
                    completion_time?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    initial_balance?: string | undefined;
                    balance?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryValidatorUnbondingDelegationsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryValidatorUnbondingDelegationsResponse;
    }
    class QueryDelegationRequest extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_addr?: string;
            validator_addr?: string;
        });
        get delegator_addr(): string;
        set delegator_addr(value: string);
        get validator_addr(): string;
        set validator_addr(value: string);
        static fromObject(data: {
            delegator_addr?: string;
            validator_addr?: string;
        }): QueryDelegationRequest;
        toObject(): {
            delegator_addr?: string | undefined;
            validator_addr?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDelegationRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDelegationRequest;
    }
    class QueryDelegationResponse extends pb_1.Message {
        constructor(data?: any[] | {
            delegation_response?: dependency_4.cosmos.staking.v1beta1.DelegationResponse;
        });
        get delegation_response(): dependency_4.cosmos.staking.v1beta1.DelegationResponse;
        set delegation_response(value: dependency_4.cosmos.staking.v1beta1.DelegationResponse);
        static fromObject(data: {
            delegation_response?: ReturnType<typeof dependency_4.cosmos.staking.v1beta1.DelegationResponse.prototype.toObject>;
        }): QueryDelegationResponse;
        toObject(): {
            delegation_response?: {
                delegation?: {
                    delegator_address?: string | undefined;
                    validator_address?: string | undefined;
                    shares?: string | undefined;
                } | undefined;
                balance?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDelegationResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDelegationResponse;
    }
    class QueryUnbondingDelegationRequest extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_addr?: string;
            validator_addr?: string;
        });
        get delegator_addr(): string;
        set delegator_addr(value: string);
        get validator_addr(): string;
        set validator_addr(value: string);
        static fromObject(data: {
            delegator_addr?: string;
            validator_addr?: string;
        }): QueryUnbondingDelegationRequest;
        toObject(): {
            delegator_addr?: string | undefined;
            validator_addr?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryUnbondingDelegationRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryUnbondingDelegationRequest;
    }
    class QueryUnbondingDelegationResponse extends pb_1.Message {
        constructor(data?: any[] | {
            unbond?: dependency_4.cosmos.staking.v1beta1.UnbondingDelegation;
        });
        get unbond(): dependency_4.cosmos.staking.v1beta1.UnbondingDelegation;
        set unbond(value: dependency_4.cosmos.staking.v1beta1.UnbondingDelegation);
        static fromObject(data: {
            unbond?: ReturnType<typeof dependency_4.cosmos.staking.v1beta1.UnbondingDelegation.prototype.toObject>;
        }): QueryUnbondingDelegationResponse;
        toObject(): {
            unbond?: {
                delegator_address?: string | undefined;
                validator_address?: string | undefined;
                entries?: {
                    creation_height?: number | undefined;
                    completion_time?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    initial_balance?: string | undefined;
                    balance?: string | undefined;
                }[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryUnbondingDelegationResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryUnbondingDelegationResponse;
    }
    class QueryDelegatorDelegationsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_addr?: string;
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get delegator_addr(): string;
        set delegator_addr(value: string);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            delegator_addr?: string;
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryDelegatorDelegationsRequest;
        toObject(): {
            delegator_addr?: string | undefined;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDelegatorDelegationsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDelegatorDelegationsRequest;
    }
    class QueryDelegatorDelegationsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            delegation_responses?: dependency_4.cosmos.staking.v1beta1.DelegationResponse[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get delegation_responses(): dependency_4.cosmos.staking.v1beta1.DelegationResponse[];
        set delegation_responses(value: dependency_4.cosmos.staking.v1beta1.DelegationResponse[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            delegation_responses?: ReturnType<typeof dependency_4.cosmos.staking.v1beta1.DelegationResponse.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryDelegatorDelegationsResponse;
        toObject(): {
            delegation_responses?: {
                delegation?: {
                    delegator_address?: string | undefined;
                    validator_address?: string | undefined;
                    shares?: string | undefined;
                } | undefined;
                balance?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDelegatorDelegationsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDelegatorDelegationsResponse;
    }
    class QueryDelegatorUnbondingDelegationsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_addr?: string;
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get delegator_addr(): string;
        set delegator_addr(value: string);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            delegator_addr?: string;
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryDelegatorUnbondingDelegationsRequest;
        toObject(): {
            delegator_addr?: string | undefined;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDelegatorUnbondingDelegationsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDelegatorUnbondingDelegationsRequest;
    }
    class QueryDelegatorUnbondingDelegationsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            unbonding_responses?: dependency_4.cosmos.staking.v1beta1.UnbondingDelegation[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get unbonding_responses(): dependency_4.cosmos.staking.v1beta1.UnbondingDelegation[];
        set unbonding_responses(value: dependency_4.cosmos.staking.v1beta1.UnbondingDelegation[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            unbonding_responses?: ReturnType<typeof dependency_4.cosmos.staking.v1beta1.UnbondingDelegation.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryDelegatorUnbondingDelegationsResponse;
        toObject(): {
            unbonding_responses?: {
                delegator_address?: string | undefined;
                validator_address?: string | undefined;
                entries?: {
                    creation_height?: number | undefined;
                    completion_time?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    initial_balance?: string | undefined;
                    balance?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDelegatorUnbondingDelegationsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDelegatorUnbondingDelegationsResponse;
    }
    class QueryRedelegationsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_addr?: string;
            src_validator_addr?: string;
            dst_validator_addr?: string;
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get delegator_addr(): string;
        set delegator_addr(value: string);
        get src_validator_addr(): string;
        set src_validator_addr(value: string);
        get dst_validator_addr(): string;
        set dst_validator_addr(value: string);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            delegator_addr?: string;
            src_validator_addr?: string;
            dst_validator_addr?: string;
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryRedelegationsRequest;
        toObject(): {
            delegator_addr?: string | undefined;
            src_validator_addr?: string | undefined;
            dst_validator_addr?: string | undefined;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryRedelegationsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryRedelegationsRequest;
    }
    class QueryRedelegationsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            redelegation_responses?: dependency_4.cosmos.staking.v1beta1.RedelegationResponse[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get redelegation_responses(): dependency_4.cosmos.staking.v1beta1.RedelegationResponse[];
        set redelegation_responses(value: dependency_4.cosmos.staking.v1beta1.RedelegationResponse[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            redelegation_responses?: ReturnType<typeof dependency_4.cosmos.staking.v1beta1.RedelegationResponse.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryRedelegationsResponse;
        toObject(): {
            redelegation_responses?: {
                redelegation?: {
                    delegator_address?: string | undefined;
                    validator_src_address?: string | undefined;
                    validator_dst_address?: string | undefined;
                    entries?: {
                        creation_height?: number | undefined;
                        completion_time?: {
                            seconds?: number | undefined;
                            nanos?: number | undefined;
                        } | undefined;
                        initial_balance?: string | undefined;
                        shares_dst?: string | undefined;
                    }[] | undefined;
                } | undefined;
                entries?: {
                    redelegation_entry?: {
                        creation_height?: number | undefined;
                        completion_time?: {
                            seconds?: number | undefined;
                            nanos?: number | undefined;
                        } | undefined;
                        initial_balance?: string | undefined;
                        shares_dst?: string | undefined;
                    } | undefined;
                    balance?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryRedelegationsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryRedelegationsResponse;
    }
    class QueryDelegatorValidatorsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_addr?: string;
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get delegator_addr(): string;
        set delegator_addr(value: string);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            delegator_addr?: string;
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryDelegatorValidatorsRequest;
        toObject(): {
            delegator_addr?: string | undefined;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDelegatorValidatorsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDelegatorValidatorsRequest;
    }
    class QueryDelegatorValidatorsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            validators?: dependency_4.cosmos.staking.v1beta1.Validator[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get validators(): dependency_4.cosmos.staking.v1beta1.Validator[];
        set validators(value: dependency_4.cosmos.staking.v1beta1.Validator[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            validators?: ReturnType<typeof dependency_4.cosmos.staking.v1beta1.Validator.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryDelegatorValidatorsResponse;
        toObject(): {
            validators?: {
                operator_address?: string | undefined;
                consensus_pubkey?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                jailed?: boolean | undefined;
                status?: dependency_4.cosmos.staking.v1beta1.BondStatus | undefined;
                tokens?: string | undefined;
                delegator_shares?: string | undefined;
                description?: {
                    moniker?: string | undefined;
                    identity?: string | undefined;
                    website?: string | undefined;
                    security_contact?: string | undefined;
                    details?: string | undefined;
                } | undefined;
                unbonding_height?: number | undefined;
                unbonding_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                commission?: {
                    commission_rates?: {
                        rate?: string | undefined;
                        max_rate?: string | undefined;
                        max_change_rate?: string | undefined;
                    } | undefined;
                    update_time?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                } | undefined;
                min_self_delegation?: string | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDelegatorValidatorsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDelegatorValidatorsResponse;
    }
    class QueryDelegatorValidatorRequest extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_addr?: string;
            validator_addr?: string;
        });
        get delegator_addr(): string;
        set delegator_addr(value: string);
        get validator_addr(): string;
        set validator_addr(value: string);
        static fromObject(data: {
            delegator_addr?: string;
            validator_addr?: string;
        }): QueryDelegatorValidatorRequest;
        toObject(): {
            delegator_addr?: string | undefined;
            validator_addr?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDelegatorValidatorRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDelegatorValidatorRequest;
    }
    class QueryDelegatorValidatorResponse extends pb_1.Message {
        constructor(data?: any[] | {
            validator?: dependency_4.cosmos.staking.v1beta1.Validator;
        });
        get validator(): dependency_4.cosmos.staking.v1beta1.Validator;
        set validator(value: dependency_4.cosmos.staking.v1beta1.Validator);
        static fromObject(data: {
            validator?: ReturnType<typeof dependency_4.cosmos.staking.v1beta1.Validator.prototype.toObject>;
        }): QueryDelegatorValidatorResponse;
        toObject(): {
            validator?: {
                operator_address?: string | undefined;
                consensus_pubkey?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                jailed?: boolean | undefined;
                status?: dependency_4.cosmos.staking.v1beta1.BondStatus | undefined;
                tokens?: string | undefined;
                delegator_shares?: string | undefined;
                description?: {
                    moniker?: string | undefined;
                    identity?: string | undefined;
                    website?: string | undefined;
                    security_contact?: string | undefined;
                    details?: string | undefined;
                } | undefined;
                unbonding_height?: number | undefined;
                unbonding_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                commission?: {
                    commission_rates?: {
                        rate?: string | undefined;
                        max_rate?: string | undefined;
                        max_change_rate?: string | undefined;
                    } | undefined;
                    update_time?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                } | undefined;
                min_self_delegation?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDelegatorValidatorResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDelegatorValidatorResponse;
    }
    class QueryHistoricalInfoRequest extends pb_1.Message {
        constructor(data?: any[] | {
            height?: number;
        });
        get height(): number;
        set height(value: number);
        static fromObject(data: {
            height?: number;
        }): QueryHistoricalInfoRequest;
        toObject(): {
            height?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryHistoricalInfoRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryHistoricalInfoRequest;
    }
    class QueryHistoricalInfoResponse extends pb_1.Message {
        constructor(data?: any[] | {
            hist?: dependency_4.cosmos.staking.v1beta1.HistoricalInfo;
        });
        get hist(): dependency_4.cosmos.staking.v1beta1.HistoricalInfo;
        set hist(value: dependency_4.cosmos.staking.v1beta1.HistoricalInfo);
        static fromObject(data: {
            hist?: ReturnType<typeof dependency_4.cosmos.staking.v1beta1.HistoricalInfo.prototype.toObject>;
        }): QueryHistoricalInfoResponse;
        toObject(): {
            hist?: {
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
                valset?: {
                    operator_address?: string | undefined;
                    consensus_pubkey?: {
                        type_url?: string | undefined;
                        value?: Uint8Array | undefined;
                    } | undefined;
                    jailed?: boolean | undefined;
                    status?: dependency_4.cosmos.staking.v1beta1.BondStatus | undefined;
                    tokens?: string | undefined;
                    delegator_shares?: string | undefined;
                    description?: {
                        moniker?: string | undefined;
                        identity?: string | undefined;
                        website?: string | undefined;
                        security_contact?: string | undefined;
                        details?: string | undefined;
                    } | undefined;
                    unbonding_height?: number | undefined;
                    unbonding_time?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    commission?: {
                        commission_rates?: {
                            rate?: string | undefined;
                            max_rate?: string | undefined;
                            max_change_rate?: string | undefined;
                        } | undefined;
                        update_time?: {
                            seconds?: number | undefined;
                            nanos?: number | undefined;
                        } | undefined;
                    } | undefined;
                    min_self_delegation?: string | undefined;
                }[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryHistoricalInfoResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryHistoricalInfoResponse;
    }
    class QueryPoolRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): QueryPoolRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryPoolRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryPoolRequest;
    }
    class QueryPoolResponse extends pb_1.Message {
        constructor(data?: any[] | {
            pool?: dependency_4.cosmos.staking.v1beta1.Pool;
        });
        get pool(): dependency_4.cosmos.staking.v1beta1.Pool;
        set pool(value: dependency_4.cosmos.staking.v1beta1.Pool);
        static fromObject(data: {
            pool?: ReturnType<typeof dependency_4.cosmos.staking.v1beta1.Pool.prototype.toObject>;
        }): QueryPoolResponse;
        toObject(): {
            pool?: {
                not_bonded_tokens?: string | undefined;
                bonded_tokens?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryPoolResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryPoolResponse;
    }
    class QueryParamsRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): QueryParamsRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsRequest;
    }
    class QueryParamsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            params?: dependency_4.cosmos.staking.v1beta1.Params;
        });
        get params(): dependency_4.cosmos.staking.v1beta1.Params;
        set params(value: dependency_4.cosmos.staking.v1beta1.Params);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_4.cosmos.staking.v1beta1.Params.prototype.toObject>;
        }): QueryParamsResponse;
        toObject(): {
            params?: {
                unbonding_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                max_validators?: number | undefined;
                max_entries?: number | undefined;
                historical_entries?: number | undefined;
                bond_denom?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsResponse;
    }
}
//# sourceMappingURL=query.d.ts.map