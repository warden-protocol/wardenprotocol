import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing";
import { MsgDeposit, MsgSubmitProposal, MsgVote } from "cosmjs-types/cosmos/gov/v1beta1/tx";
export declare const govTypes: ReadonlyArray<[string, GeneratedType]>;
export interface MsgDepositEncodeObject extends EncodeObject {
    readonly typeUrl: "/cosmos.gov.v1beta1.MsgDeposit";
    readonly value: Partial<MsgDeposit>;
}
export declare function isMsgDepositEncodeObject(object: EncodeObject): object is MsgSubmitProposalEncodeObject;
export interface MsgSubmitProposalEncodeObject extends EncodeObject {
    readonly typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal";
    readonly value: Partial<MsgSubmitProposal>;
}
export declare function isMsgSubmitProposalEncodeObject(object: EncodeObject): object is MsgSubmitProposalEncodeObject;
export interface MsgVoteEncodeObject extends EncodeObject {
    readonly typeUrl: "/cosmos.gov.v1beta1.MsgVote";
    readonly value: Partial<MsgVote>;
}
export declare function isMsgVoteEncodeObject(object: EncodeObject): object is MsgVoteEncodeObject;
