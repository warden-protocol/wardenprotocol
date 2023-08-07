import * as dependency_1 from "./../../base/v1beta1/coin";
import * as dependency_2 from "./gov";
import * as dependency_5 from "./../../../google/protobuf/any";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.gov.v1beta1 {
    class MsgSubmitProposal extends pb_1.Message {
        constructor(data?: any[] | {
            content?: dependency_5.google.protobuf.Any;
            initial_deposit?: dependency_1.cosmos.base.v1beta1.Coin[];
            proposer?: string;
        });
        get content(): dependency_5.google.protobuf.Any;
        set content(value: dependency_5.google.protobuf.Any);
        get initial_deposit(): dependency_1.cosmos.base.v1beta1.Coin[];
        set initial_deposit(value: dependency_1.cosmos.base.v1beta1.Coin[]);
        get proposer(): string;
        set proposer(value: string);
        static fromObject(data: {
            content?: ReturnType<typeof dependency_5.google.protobuf.Any.prototype.toObject>;
            initial_deposit?: ReturnType<typeof dependency_1.cosmos.base.v1beta1.Coin.prototype.toObject>[];
            proposer?: string;
        }): MsgSubmitProposal;
        toObject(): {
            content?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            initial_deposit?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            proposer?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgSubmitProposal;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgSubmitProposal;
    }
    class MsgSubmitProposalResponse extends pb_1.Message {
        constructor(data?: any[] | {
            proposal_id?: number;
        });
        get proposal_id(): number;
        set proposal_id(value: number);
        static fromObject(data: {
            proposal_id?: number;
        }): MsgSubmitProposalResponse;
        toObject(): {
            proposal_id?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgSubmitProposalResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgSubmitProposalResponse;
    }
    class MsgVote extends pb_1.Message {
        constructor(data?: any[] | {
            proposal_id?: number;
            voter?: string;
            option?: dependency_2.cosmos.gov.v1beta1.VoteOption;
        });
        get proposal_id(): number;
        set proposal_id(value: number);
        get voter(): string;
        set voter(value: string);
        get option(): dependency_2.cosmos.gov.v1beta1.VoteOption;
        set option(value: dependency_2.cosmos.gov.v1beta1.VoteOption);
        static fromObject(data: {
            proposal_id?: number;
            voter?: string;
            option?: dependency_2.cosmos.gov.v1beta1.VoteOption;
        }): MsgVote;
        toObject(): {
            proposal_id?: number | undefined;
            voter?: string | undefined;
            option?: dependency_2.cosmos.gov.v1beta1.VoteOption | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgVote;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgVote;
    }
    class MsgVoteResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgVoteResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgVoteResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgVoteResponse;
    }
    class MsgVoteWeighted extends pb_1.Message {
        constructor(data?: any[] | {
            proposal_id?: number;
            voter?: string;
            options?: dependency_2.cosmos.gov.v1beta1.WeightedVoteOption[];
        });
        get proposal_id(): number;
        set proposal_id(value: number);
        get voter(): string;
        set voter(value: string);
        get options(): dependency_2.cosmos.gov.v1beta1.WeightedVoteOption[];
        set options(value: dependency_2.cosmos.gov.v1beta1.WeightedVoteOption[]);
        static fromObject(data: {
            proposal_id?: number;
            voter?: string;
            options?: ReturnType<typeof dependency_2.cosmos.gov.v1beta1.WeightedVoteOption.prototype.toObject>[];
        }): MsgVoteWeighted;
        toObject(): {
            proposal_id?: number | undefined;
            voter?: string | undefined;
            options?: {
                option?: dependency_2.cosmos.gov.v1beta1.VoteOption | undefined;
                weight?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgVoteWeighted;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgVoteWeighted;
    }
    class MsgVoteWeightedResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgVoteWeightedResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgVoteWeightedResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgVoteWeightedResponse;
    }
    class MsgDeposit extends pb_1.Message {
        constructor(data?: any[] | {
            proposal_id?: number;
            depositor?: string;
            amount?: dependency_1.cosmos.base.v1beta1.Coin[];
        });
        get proposal_id(): number;
        set proposal_id(value: number);
        get depositor(): string;
        set depositor(value: string);
        get amount(): dependency_1.cosmos.base.v1beta1.Coin[];
        set amount(value: dependency_1.cosmos.base.v1beta1.Coin[]);
        static fromObject(data: {
            proposal_id?: number;
            depositor?: string;
            amount?: ReturnType<typeof dependency_1.cosmos.base.v1beta1.Coin.prototype.toObject>[];
        }): MsgDeposit;
        toObject(): {
            proposal_id?: number | undefined;
            depositor?: string | undefined;
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgDeposit;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgDeposit;
    }
    class MsgDepositResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgDepositResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgDepositResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgDepositResponse;
    }
}
//# sourceMappingURL=tx.d.ts.map