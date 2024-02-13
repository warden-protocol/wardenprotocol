/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Duration } from "../../../google/protobuf/duration";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Coin } from "../../base/v1beta1/coin";
export const protobufPackage = "cosmos.gov.v1beta1";
/** VoteOption enumerates the valid vote options for a given governance proposal. */
export var VoteOption;
(function (VoteOption) {
    /** VOTE_OPTION_UNSPECIFIED - VOTE_OPTION_UNSPECIFIED defines a no-op vote option. */
    VoteOption[VoteOption["VOTE_OPTION_UNSPECIFIED"] = 0] = "VOTE_OPTION_UNSPECIFIED";
    /** VOTE_OPTION_YES - VOTE_OPTION_YES defines a yes vote option. */
    VoteOption[VoteOption["VOTE_OPTION_YES"] = 1] = "VOTE_OPTION_YES";
    /** VOTE_OPTION_ABSTAIN - VOTE_OPTION_ABSTAIN defines an abstain vote option. */
    VoteOption[VoteOption["VOTE_OPTION_ABSTAIN"] = 2] = "VOTE_OPTION_ABSTAIN";
    /** VOTE_OPTION_NO - VOTE_OPTION_NO defines a no vote option. */
    VoteOption[VoteOption["VOTE_OPTION_NO"] = 3] = "VOTE_OPTION_NO";
    /** VOTE_OPTION_NO_WITH_VETO - VOTE_OPTION_NO_WITH_VETO defines a no with veto vote option. */
    VoteOption[VoteOption["VOTE_OPTION_NO_WITH_VETO"] = 4] = "VOTE_OPTION_NO_WITH_VETO";
    VoteOption[VoteOption["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(VoteOption || (VoteOption = {}));
export function voteOptionFromJSON(object) {
    switch (object) {
        case 0:
        case "VOTE_OPTION_UNSPECIFIED":
            return VoteOption.VOTE_OPTION_UNSPECIFIED;
        case 1:
        case "VOTE_OPTION_YES":
            return VoteOption.VOTE_OPTION_YES;
        case 2:
        case "VOTE_OPTION_ABSTAIN":
            return VoteOption.VOTE_OPTION_ABSTAIN;
        case 3:
        case "VOTE_OPTION_NO":
            return VoteOption.VOTE_OPTION_NO;
        case 4:
        case "VOTE_OPTION_NO_WITH_VETO":
            return VoteOption.VOTE_OPTION_NO_WITH_VETO;
        case -1:
        case "UNRECOGNIZED":
        default:
            return VoteOption.UNRECOGNIZED;
    }
}
export function voteOptionToJSON(object) {
    switch (object) {
        case VoteOption.VOTE_OPTION_UNSPECIFIED:
            return "VOTE_OPTION_UNSPECIFIED";
        case VoteOption.VOTE_OPTION_YES:
            return "VOTE_OPTION_YES";
        case VoteOption.VOTE_OPTION_ABSTAIN:
            return "VOTE_OPTION_ABSTAIN";
        case VoteOption.VOTE_OPTION_NO:
            return "VOTE_OPTION_NO";
        case VoteOption.VOTE_OPTION_NO_WITH_VETO:
            return "VOTE_OPTION_NO_WITH_VETO";
        case VoteOption.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
/** ProposalStatus enumerates the valid statuses of a proposal. */
export var ProposalStatus;
(function (ProposalStatus) {
    /** PROPOSAL_STATUS_UNSPECIFIED - PROPOSAL_STATUS_UNSPECIFIED defines the default proposal status. */
    ProposalStatus[ProposalStatus["PROPOSAL_STATUS_UNSPECIFIED"] = 0] = "PROPOSAL_STATUS_UNSPECIFIED";
    /**
     * PROPOSAL_STATUS_DEPOSIT_PERIOD - PROPOSAL_STATUS_DEPOSIT_PERIOD defines a proposal status during the deposit
     * period.
     */
    ProposalStatus[ProposalStatus["PROPOSAL_STATUS_DEPOSIT_PERIOD"] = 1] = "PROPOSAL_STATUS_DEPOSIT_PERIOD";
    /**
     * PROPOSAL_STATUS_VOTING_PERIOD - PROPOSAL_STATUS_VOTING_PERIOD defines a proposal status during the voting
     * period.
     */
    ProposalStatus[ProposalStatus["PROPOSAL_STATUS_VOTING_PERIOD"] = 2] = "PROPOSAL_STATUS_VOTING_PERIOD";
    /**
     * PROPOSAL_STATUS_PASSED - PROPOSAL_STATUS_PASSED defines a proposal status of a proposal that has
     * passed.
     */
    ProposalStatus[ProposalStatus["PROPOSAL_STATUS_PASSED"] = 3] = "PROPOSAL_STATUS_PASSED";
    /**
     * PROPOSAL_STATUS_REJECTED - PROPOSAL_STATUS_REJECTED defines a proposal status of a proposal that has
     * been rejected.
     */
    ProposalStatus[ProposalStatus["PROPOSAL_STATUS_REJECTED"] = 4] = "PROPOSAL_STATUS_REJECTED";
    /**
     * PROPOSAL_STATUS_FAILED - PROPOSAL_STATUS_FAILED defines a proposal status of a proposal that has
     * failed.
     */
    ProposalStatus[ProposalStatus["PROPOSAL_STATUS_FAILED"] = 5] = "PROPOSAL_STATUS_FAILED";
    ProposalStatus[ProposalStatus["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ProposalStatus || (ProposalStatus = {}));
export function proposalStatusFromJSON(object) {
    switch (object) {
        case 0:
        case "PROPOSAL_STATUS_UNSPECIFIED":
            return ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED;
        case 1:
        case "PROPOSAL_STATUS_DEPOSIT_PERIOD":
            return ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD;
        case 2:
        case "PROPOSAL_STATUS_VOTING_PERIOD":
            return ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD;
        case 3:
        case "PROPOSAL_STATUS_PASSED":
            return ProposalStatus.PROPOSAL_STATUS_PASSED;
        case 4:
        case "PROPOSAL_STATUS_REJECTED":
            return ProposalStatus.PROPOSAL_STATUS_REJECTED;
        case 5:
        case "PROPOSAL_STATUS_FAILED":
            return ProposalStatus.PROPOSAL_STATUS_FAILED;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ProposalStatus.UNRECOGNIZED;
    }
}
export function proposalStatusToJSON(object) {
    switch (object) {
        case ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED:
            return "PROPOSAL_STATUS_UNSPECIFIED";
        case ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD:
            return "PROPOSAL_STATUS_DEPOSIT_PERIOD";
        case ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD:
            return "PROPOSAL_STATUS_VOTING_PERIOD";
        case ProposalStatus.PROPOSAL_STATUS_PASSED:
            return "PROPOSAL_STATUS_PASSED";
        case ProposalStatus.PROPOSAL_STATUS_REJECTED:
            return "PROPOSAL_STATUS_REJECTED";
        case ProposalStatus.PROPOSAL_STATUS_FAILED:
            return "PROPOSAL_STATUS_FAILED";
        case ProposalStatus.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseWeightedVoteOption() {
    return { option: 0, weight: "" };
}
export const WeightedVoteOption = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.option !== 0) {
            writer.uint32(8).int32(message.option);
        }
        if (message.weight !== "") {
            writer.uint32(18).string(message.weight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseWeightedVoteOption();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.option = reader.int32();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.weight = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            option: isSet(object.option) ? voteOptionFromJSON(object.option) : 0,
            weight: isSet(object.weight) ? String(object.weight) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.option !== 0) {
            obj.option = voteOptionToJSON(message.option);
        }
        if (message.weight !== "") {
            obj.weight = message.weight;
        }
        return obj;
    },
    create(base) {
        return WeightedVoteOption.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseWeightedVoteOption();
        message.option = object.option ?? 0;
        message.weight = object.weight ?? "";
        return message;
    },
};
function createBaseTextProposal() {
    return { title: "", description: "" };
}
export const TextProposal = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.title !== "") {
            writer.uint32(10).string(message.title);
        }
        if (message.description !== "") {
            writer.uint32(18).string(message.description);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTextProposal();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.title = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.description = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            title: isSet(object.title) ? String(object.title) : "",
            description: isSet(object.description) ? String(object.description) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.title !== "") {
            obj.title = message.title;
        }
        if (message.description !== "") {
            obj.description = message.description;
        }
        return obj;
    },
    create(base) {
        return TextProposal.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTextProposal();
        message.title = object.title ?? "";
        message.description = object.description ?? "";
        return message;
    },
};
function createBaseDeposit() {
    return { proposalId: 0, depositor: "", amount: [] };
}
export const Deposit = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.depositor !== "") {
            writer.uint32(18).string(message.depositor);
        }
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDeposit();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.proposalId = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.depositor = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.amount.push(Coin.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
            depositor: isSet(object.depositor) ? String(object.depositor) : "",
            amount: Array.isArray(object?.amount) ? object.amount.map((e) => Coin.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposalId !== 0) {
            obj.proposalId = Math.round(message.proposalId);
        }
        if (message.depositor !== "") {
            obj.depositor = message.depositor;
        }
        if (message.amount?.length) {
            obj.amount = message.amount.map((e) => Coin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return Deposit.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseDeposit();
        message.proposalId = object.proposalId ?? 0;
        message.depositor = object.depositor ?? "";
        message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
        return message;
    },
};
function createBaseProposal() {
    return {
        proposalId: 0,
        content: undefined,
        status: 0,
        finalTallyResult: undefined,
        submitTime: undefined,
        depositEndTime: undefined,
        totalDeposit: [],
        votingStartTime: undefined,
        votingEndTime: undefined,
    };
}
export const Proposal = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.content !== undefined) {
            Any.encode(message.content, writer.uint32(18).fork()).ldelim();
        }
        if (message.status !== 0) {
            writer.uint32(24).int32(message.status);
        }
        if (message.finalTallyResult !== undefined) {
            TallyResult.encode(message.finalTallyResult, writer.uint32(34).fork()).ldelim();
        }
        if (message.submitTime !== undefined) {
            Timestamp.encode(toTimestamp(message.submitTime), writer.uint32(42).fork()).ldelim();
        }
        if (message.depositEndTime !== undefined) {
            Timestamp.encode(toTimestamp(message.depositEndTime), writer.uint32(50).fork()).ldelim();
        }
        for (const v of message.totalDeposit) {
            Coin.encode(v, writer.uint32(58).fork()).ldelim();
        }
        if (message.votingStartTime !== undefined) {
            Timestamp.encode(toTimestamp(message.votingStartTime), writer.uint32(66).fork()).ldelim();
        }
        if (message.votingEndTime !== undefined) {
            Timestamp.encode(toTimestamp(message.votingEndTime), writer.uint32(74).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseProposal();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.proposalId = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.content = Any.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.status = reader.int32();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.finalTallyResult = TallyResult.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.submitTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.depositEndTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.totalDeposit.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.votingStartTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    continue;
                case 9:
                    if (tag !== 74) {
                        break;
                    }
                    message.votingEndTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
            content: isSet(object.content) ? Any.fromJSON(object.content) : undefined,
            status: isSet(object.status) ? proposalStatusFromJSON(object.status) : 0,
            finalTallyResult: isSet(object.finalTallyResult) ? TallyResult.fromJSON(object.finalTallyResult) : undefined,
            submitTime: isSet(object.submitTime) ? fromJsonTimestamp(object.submitTime) : undefined,
            depositEndTime: isSet(object.depositEndTime) ? fromJsonTimestamp(object.depositEndTime) : undefined,
            totalDeposit: Array.isArray(object?.totalDeposit) ? object.totalDeposit.map((e) => Coin.fromJSON(e)) : [],
            votingStartTime: isSet(object.votingStartTime) ? fromJsonTimestamp(object.votingStartTime) : undefined,
            votingEndTime: isSet(object.votingEndTime) ? fromJsonTimestamp(object.votingEndTime) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposalId !== 0) {
            obj.proposalId = Math.round(message.proposalId);
        }
        if (message.content !== undefined) {
            obj.content = Any.toJSON(message.content);
        }
        if (message.status !== 0) {
            obj.status = proposalStatusToJSON(message.status);
        }
        if (message.finalTallyResult !== undefined) {
            obj.finalTallyResult = TallyResult.toJSON(message.finalTallyResult);
        }
        if (message.submitTime !== undefined) {
            obj.submitTime = message.submitTime.toISOString();
        }
        if (message.depositEndTime !== undefined) {
            obj.depositEndTime = message.depositEndTime.toISOString();
        }
        if (message.totalDeposit?.length) {
            obj.totalDeposit = message.totalDeposit.map((e) => Coin.toJSON(e));
        }
        if (message.votingStartTime !== undefined) {
            obj.votingStartTime = message.votingStartTime.toISOString();
        }
        if (message.votingEndTime !== undefined) {
            obj.votingEndTime = message.votingEndTime.toISOString();
        }
        return obj;
    },
    create(base) {
        return Proposal.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseProposal();
        message.proposalId = object.proposalId ?? 0;
        message.content = (object.content !== undefined && object.content !== null)
            ? Any.fromPartial(object.content)
            : undefined;
        message.status = object.status ?? 0;
        message.finalTallyResult = (object.finalTallyResult !== undefined && object.finalTallyResult !== null)
            ? TallyResult.fromPartial(object.finalTallyResult)
            : undefined;
        message.submitTime = object.submitTime ?? undefined;
        message.depositEndTime = object.depositEndTime ?? undefined;
        message.totalDeposit = object.totalDeposit?.map((e) => Coin.fromPartial(e)) || [];
        message.votingStartTime = object.votingStartTime ?? undefined;
        message.votingEndTime = object.votingEndTime ?? undefined;
        return message;
    },
};
function createBaseTallyResult() {
    return { yes: "", abstain: "", no: "", noWithVeto: "" };
}
export const TallyResult = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.yes !== "") {
            writer.uint32(10).string(message.yes);
        }
        if (message.abstain !== "") {
            writer.uint32(18).string(message.abstain);
        }
        if (message.no !== "") {
            writer.uint32(26).string(message.no);
        }
        if (message.noWithVeto !== "") {
            writer.uint32(34).string(message.noWithVeto);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTallyResult();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.yes = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.abstain = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.no = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.noWithVeto = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            yes: isSet(object.yes) ? String(object.yes) : "",
            abstain: isSet(object.abstain) ? String(object.abstain) : "",
            no: isSet(object.no) ? String(object.no) : "",
            noWithVeto: isSet(object.noWithVeto) ? String(object.noWithVeto) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.yes !== "") {
            obj.yes = message.yes;
        }
        if (message.abstain !== "") {
            obj.abstain = message.abstain;
        }
        if (message.no !== "") {
            obj.no = message.no;
        }
        if (message.noWithVeto !== "") {
            obj.noWithVeto = message.noWithVeto;
        }
        return obj;
    },
    create(base) {
        return TallyResult.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTallyResult();
        message.yes = object.yes ?? "";
        message.abstain = object.abstain ?? "";
        message.no = object.no ?? "";
        message.noWithVeto = object.noWithVeto ?? "";
        return message;
    },
};
function createBaseVote() {
    return { proposalId: 0, voter: "", option: 0, options: [] };
}
export const Vote = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.voter !== "") {
            writer.uint32(18).string(message.voter);
        }
        if (message.option !== 0) {
            writer.uint32(24).int32(message.option);
        }
        for (const v of message.options) {
            WeightedVoteOption.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseVote();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.proposalId = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.voter = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.option = reader.int32();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.options.push(WeightedVoteOption.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
            voter: isSet(object.voter) ? String(object.voter) : "",
            option: isSet(object.option) ? voteOptionFromJSON(object.option) : 0,
            options: Array.isArray(object?.options) ? object.options.map((e) => WeightedVoteOption.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposalId !== 0) {
            obj.proposalId = Math.round(message.proposalId);
        }
        if (message.voter !== "") {
            obj.voter = message.voter;
        }
        if (message.option !== 0) {
            obj.option = voteOptionToJSON(message.option);
        }
        if (message.options?.length) {
            obj.options = message.options.map((e) => WeightedVoteOption.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return Vote.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseVote();
        message.proposalId = object.proposalId ?? 0;
        message.voter = object.voter ?? "";
        message.option = object.option ?? 0;
        message.options = object.options?.map((e) => WeightedVoteOption.fromPartial(e)) || [];
        return message;
    },
};
function createBaseDepositParams() {
    return { minDeposit: [], maxDepositPeriod: undefined };
}
export const DepositParams = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.minDeposit) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.maxDepositPeriod !== undefined) {
            Duration.encode(message.maxDepositPeriod, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDepositParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.minDeposit.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.maxDepositPeriod = Duration.decode(reader, reader.uint32());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            minDeposit: Array.isArray(object?.minDeposit) ? object.minDeposit.map((e) => Coin.fromJSON(e)) : [],
            maxDepositPeriod: isSet(object.maxDepositPeriod) ? Duration.fromJSON(object.maxDepositPeriod) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.minDeposit?.length) {
            obj.minDeposit = message.minDeposit.map((e) => Coin.toJSON(e));
        }
        if (message.maxDepositPeriod !== undefined) {
            obj.maxDepositPeriod = Duration.toJSON(message.maxDepositPeriod);
        }
        return obj;
    },
    create(base) {
        return DepositParams.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseDepositParams();
        message.minDeposit = object.minDeposit?.map((e) => Coin.fromPartial(e)) || [];
        message.maxDepositPeriod = (object.maxDepositPeriod !== undefined && object.maxDepositPeriod !== null)
            ? Duration.fromPartial(object.maxDepositPeriod)
            : undefined;
        return message;
    },
};
function createBaseVotingParams() {
    return { votingPeriod: undefined };
}
export const VotingParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.votingPeriod !== undefined) {
            Duration.encode(message.votingPeriod, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseVotingParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.votingPeriod = Duration.decode(reader, reader.uint32());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { votingPeriod: isSet(object.votingPeriod) ? Duration.fromJSON(object.votingPeriod) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.votingPeriod !== undefined) {
            obj.votingPeriod = Duration.toJSON(message.votingPeriod);
        }
        return obj;
    },
    create(base) {
        return VotingParams.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseVotingParams();
        message.votingPeriod = (object.votingPeriod !== undefined && object.votingPeriod !== null)
            ? Duration.fromPartial(object.votingPeriod)
            : undefined;
        return message;
    },
};
function createBaseTallyParams() {
    return { quorum: new Uint8Array(0), threshold: new Uint8Array(0), vetoThreshold: new Uint8Array(0) };
}
export const TallyParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.quorum.length !== 0) {
            writer.uint32(10).bytes(message.quorum);
        }
        if (message.threshold.length !== 0) {
            writer.uint32(18).bytes(message.threshold);
        }
        if (message.vetoThreshold.length !== 0) {
            writer.uint32(26).bytes(message.vetoThreshold);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTallyParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.quorum = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.threshold = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.vetoThreshold = reader.bytes();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            quorum: isSet(object.quorum) ? bytesFromBase64(object.quorum) : new Uint8Array(0),
            threshold: isSet(object.threshold) ? bytesFromBase64(object.threshold) : new Uint8Array(0),
            vetoThreshold: isSet(object.vetoThreshold) ? bytesFromBase64(object.vetoThreshold) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.quorum.length !== 0) {
            obj.quorum = base64FromBytes(message.quorum);
        }
        if (message.threshold.length !== 0) {
            obj.threshold = base64FromBytes(message.threshold);
        }
        if (message.vetoThreshold.length !== 0) {
            obj.vetoThreshold = base64FromBytes(message.vetoThreshold);
        }
        return obj;
    },
    create(base) {
        return TallyParams.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTallyParams();
        message.quorum = object.quorum ?? new Uint8Array(0);
        message.threshold = object.threshold ?? new Uint8Array(0);
        message.vetoThreshold = object.vetoThreshold ?? new Uint8Array(0);
        return message;
    },
};
const tsProtoGlobalThis = (() => {
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }
    if (typeof self !== "undefined") {
        return self;
    }
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof global !== "undefined") {
        return global;
    }
    throw "Unable to locate global object";
})();
function bytesFromBase64(b64) {
    if (tsProtoGlobalThis.Buffer) {
        return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
    }
    else {
        const bin = tsProtoGlobalThis.atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
            arr[i] = bin.charCodeAt(i);
        }
        return arr;
    }
}
function base64FromBytes(arr) {
    if (tsProtoGlobalThis.Buffer) {
        return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
    }
    else {
        const bin = [];
        arr.forEach((byte) => {
            bin.push(String.fromCharCode(byte));
        });
        return tsProtoGlobalThis.btoa(bin.join(""));
    }
}
function toTimestamp(date) {
    const seconds = date.getTime() / 1000;
    const nanos = (date.getTime() % 1000) * 1000000;
    return { seconds, nanos };
}
function fromTimestamp(t) {
    let millis = (t.seconds || 0) * 1000;
    millis += (t.nanos || 0) / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return o;
    }
    else if (typeof o === "string") {
        return new Date(o);
    }
    else {
        return fromTimestamp(Timestamp.fromJSON(o));
    }
}
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
