//@ts-nocheck
import { MsgSubmitProposal, MsgVote, MsgVoteWeighted, MsgDeposit } from "./tx";
export const AminoConverter = {
  "/cosmos.gov.v1beta1.MsgSubmitProposal": {
    aminoType: "cosmos-sdk/MsgSubmitProposal",
    toAmino: MsgSubmitProposal.toAmino,
    fromAmino: MsgSubmitProposal.fromAmino
  },
  "/cosmos.gov.v1beta1.MsgVote": {
    aminoType: "cosmos-sdk/MsgVote",
    toAmino: MsgVote.toAmino,
    fromAmino: MsgVote.fromAmino
  },
  "/cosmos.gov.v1beta1.MsgVoteWeighted": {
    aminoType: "cosmos-sdk/MsgVoteWeighted",
    toAmino: MsgVoteWeighted.toAmino,
    fromAmino: MsgVoteWeighted.fromAmino
  },
  "/cosmos.gov.v1beta1.MsgDeposit": {
    aminoType: "cosmos-sdk/MsgDeposit",
    toAmino: MsgDeposit.toAmino,
    fromAmino: MsgDeposit.fromAmino
  }
};