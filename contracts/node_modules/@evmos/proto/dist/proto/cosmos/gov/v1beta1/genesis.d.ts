import * as dependency_2 from "./gov";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.gov.v1beta1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            starting_proposal_id?: number;
            deposits?: dependency_2.cosmos.gov.v1beta1.Deposit[];
            votes?: dependency_2.cosmos.gov.v1beta1.Vote[];
            proposals?: dependency_2.cosmos.gov.v1beta1.Proposal[];
            deposit_params?: dependency_2.cosmos.gov.v1beta1.DepositParams;
            voting_params?: dependency_2.cosmos.gov.v1beta1.VotingParams;
            tally_params?: dependency_2.cosmos.gov.v1beta1.TallyParams;
        });
        get starting_proposal_id(): number;
        set starting_proposal_id(value: number);
        get deposits(): dependency_2.cosmos.gov.v1beta1.Deposit[];
        set deposits(value: dependency_2.cosmos.gov.v1beta1.Deposit[]);
        get votes(): dependency_2.cosmos.gov.v1beta1.Vote[];
        set votes(value: dependency_2.cosmos.gov.v1beta1.Vote[]);
        get proposals(): dependency_2.cosmos.gov.v1beta1.Proposal[];
        set proposals(value: dependency_2.cosmos.gov.v1beta1.Proposal[]);
        get deposit_params(): dependency_2.cosmos.gov.v1beta1.DepositParams;
        set deposit_params(value: dependency_2.cosmos.gov.v1beta1.DepositParams);
        get voting_params(): dependency_2.cosmos.gov.v1beta1.VotingParams;
        set voting_params(value: dependency_2.cosmos.gov.v1beta1.VotingParams);
        get tally_params(): dependency_2.cosmos.gov.v1beta1.TallyParams;
        set tally_params(value: dependency_2.cosmos.gov.v1beta1.TallyParams);
        static fromObject(data: {
            starting_proposal_id?: number;
            deposits?: ReturnType<typeof dependency_2.cosmos.gov.v1beta1.Deposit.prototype.toObject>[];
            votes?: ReturnType<typeof dependency_2.cosmos.gov.v1beta1.Vote.prototype.toObject>[];
            proposals?: ReturnType<typeof dependency_2.cosmos.gov.v1beta1.Proposal.prototype.toObject>[];
            deposit_params?: ReturnType<typeof dependency_2.cosmos.gov.v1beta1.DepositParams.prototype.toObject>;
            voting_params?: ReturnType<typeof dependency_2.cosmos.gov.v1beta1.VotingParams.prototype.toObject>;
            tally_params?: ReturnType<typeof dependency_2.cosmos.gov.v1beta1.TallyParams.prototype.toObject>;
        }): GenesisState;
        toObject(): {
            starting_proposal_id?: number | undefined;
            deposits?: {
                proposal_id?: number | undefined;
                depositor?: string | undefined;
                amount?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            votes?: {
                proposal_id?: number | undefined;
                voter?: string | undefined;
                option?: dependency_2.cosmos.gov.v1beta1.VoteOption | undefined;
                options?: {
                    option?: dependency_2.cosmos.gov.v1beta1.VoteOption | undefined;
                    weight?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            proposals?: {
                proposal_id?: number | undefined;
                content?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                status?: dependency_2.cosmos.gov.v1beta1.ProposalStatus | undefined;
                final_tally_result?: {
                    yes?: string | undefined;
                    abstain?: string | undefined;
                    no?: string | undefined;
                    no_with_veto?: string | undefined;
                } | undefined;
                submit_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                deposit_end_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                total_deposit?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                voting_start_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                voting_end_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
            }[] | undefined;
            deposit_params?: {
                min_deposit?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                max_deposit_period?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
            } | undefined;
            voting_params?: {
                voting_period?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
            } | undefined;
            tally_params?: {
                quorum?: Uint8Array | undefined;
                threshold?: Uint8Array | undefined;
                veto_threshold?: Uint8Array | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GenesisState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GenesisState;
    }
}
//# sourceMappingURL=genesis.d.ts.map