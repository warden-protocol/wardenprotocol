import * as dependency_2 from "./staking";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.staking.v1beta1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            params?: dependency_2.cosmos.staking.v1beta1.Params;
            last_total_power?: Uint8Array;
            last_validator_powers?: LastValidatorPower[];
            validators?: dependency_2.cosmos.staking.v1beta1.Validator[];
            delegations?: dependency_2.cosmos.staking.v1beta1.Delegation[];
            unbonding_delegations?: dependency_2.cosmos.staking.v1beta1.UnbondingDelegation[];
            redelegations?: dependency_2.cosmos.staking.v1beta1.Redelegation[];
            exported?: boolean;
        });
        get params(): dependency_2.cosmos.staking.v1beta1.Params;
        set params(value: dependency_2.cosmos.staking.v1beta1.Params);
        get last_total_power(): Uint8Array;
        set last_total_power(value: Uint8Array);
        get last_validator_powers(): LastValidatorPower[];
        set last_validator_powers(value: LastValidatorPower[]);
        get validators(): dependency_2.cosmos.staking.v1beta1.Validator[];
        set validators(value: dependency_2.cosmos.staking.v1beta1.Validator[]);
        get delegations(): dependency_2.cosmos.staking.v1beta1.Delegation[];
        set delegations(value: dependency_2.cosmos.staking.v1beta1.Delegation[]);
        get unbonding_delegations(): dependency_2.cosmos.staking.v1beta1.UnbondingDelegation[];
        set unbonding_delegations(value: dependency_2.cosmos.staking.v1beta1.UnbondingDelegation[]);
        get redelegations(): dependency_2.cosmos.staking.v1beta1.Redelegation[];
        set redelegations(value: dependency_2.cosmos.staking.v1beta1.Redelegation[]);
        get exported(): boolean;
        set exported(value: boolean);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_2.cosmos.staking.v1beta1.Params.prototype.toObject>;
            last_total_power?: Uint8Array;
            last_validator_powers?: ReturnType<typeof LastValidatorPower.prototype.toObject>[];
            validators?: ReturnType<typeof dependency_2.cosmos.staking.v1beta1.Validator.prototype.toObject>[];
            delegations?: ReturnType<typeof dependency_2.cosmos.staking.v1beta1.Delegation.prototype.toObject>[];
            unbonding_delegations?: ReturnType<typeof dependency_2.cosmos.staking.v1beta1.UnbondingDelegation.prototype.toObject>[];
            redelegations?: ReturnType<typeof dependency_2.cosmos.staking.v1beta1.Redelegation.prototype.toObject>[];
            exported?: boolean;
        }): GenesisState;
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
            last_total_power?: Uint8Array | undefined;
            last_validator_powers?: {
                address?: string | undefined;
                power?: number | undefined;
            }[] | undefined;
            validators?: {
                operator_address?: string | undefined;
                consensus_pubkey?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                jailed?: boolean | undefined;
                status?: dependency_2.cosmos.staking.v1beta1.BondStatus | undefined;
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
            delegations?: {
                delegator_address?: string | undefined;
                validator_address?: string | undefined;
                shares?: string | undefined;
            }[] | undefined;
            unbonding_delegations?: {
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
            redelegations?: {
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
            }[] | undefined;
            exported?: boolean | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GenesisState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GenesisState;
    }
    class LastValidatorPower extends pb_1.Message {
        constructor(data?: any[] | {
            address?: string;
            power?: number;
        });
        get address(): string;
        set address(value: string);
        get power(): number;
        set power(value: number);
        static fromObject(data: {
            address?: string;
            power?: number;
        }): LastValidatorPower;
        toObject(): {
            address?: string | undefined;
            power?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): LastValidatorPower;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): LastValidatorPower;
    }
}
//# sourceMappingURL=genesis.d.ts.map