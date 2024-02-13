/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Duration } from "../../../google/protobuf/duration";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Coin } from "../../base/v1beta1/coin";
export const protobufPackage = "cosmos.gov.v1";
/** Since: cosmos-sdk 0.46 */
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
        id: 0,
        messages: [],
        status: 0,
        finalTallyResult: undefined,
        submitTime: undefined,
        depositEndTime: undefined,
        totalDeposit: [],
        votingStartTime: undefined,
        votingEndTime: undefined,
        metadata: "",
        title: "",
        summary: "",
        proposer: "",
        expedited: false,
        failedReason: "",
    };
}
export const Proposal = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        for (const v of message.messages) {
            Any.encode(v, writer.uint32(18).fork()).ldelim();
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
        if (message.metadata !== "") {
            writer.uint32(82).string(message.metadata);
        }
        if (message.title !== "") {
            writer.uint32(90).string(message.title);
        }
        if (message.summary !== "") {
            writer.uint32(98).string(message.summary);
        }
        if (message.proposer !== "") {
            writer.uint32(106).string(message.proposer);
        }
        if (message.expedited === true) {
            writer.uint32(112).bool(message.expedited);
        }
        if (message.failedReason !== "") {
            writer.uint32(122).string(message.failedReason);
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
                    message.id = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.messages.push(Any.decode(reader, reader.uint32()));
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
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.metadata = reader.string();
                    continue;
                case 11:
                    if (tag !== 90) {
                        break;
                    }
                    message.title = reader.string();
                    continue;
                case 12:
                    if (tag !== 98) {
                        break;
                    }
                    message.summary = reader.string();
                    continue;
                case 13:
                    if (tag !== 106) {
                        break;
                    }
                    message.proposer = reader.string();
                    continue;
                case 14:
                    if (tag !== 112) {
                        break;
                    }
                    message.expedited = reader.bool();
                    continue;
                case 15:
                    if (tag !== 122) {
                        break;
                    }
                    message.failedReason = reader.string();
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
            id: isSet(object.id) ? Number(object.id) : 0,
            messages: Array.isArray(object?.messages) ? object.messages.map((e) => Any.fromJSON(e)) : [],
            status: isSet(object.status) ? proposalStatusFromJSON(object.status) : 0,
            finalTallyResult: isSet(object.finalTallyResult) ? TallyResult.fromJSON(object.finalTallyResult) : undefined,
            submitTime: isSet(object.submitTime) ? fromJsonTimestamp(object.submitTime) : undefined,
            depositEndTime: isSet(object.depositEndTime) ? fromJsonTimestamp(object.depositEndTime) : undefined,
            totalDeposit: Array.isArray(object?.totalDeposit) ? object.totalDeposit.map((e) => Coin.fromJSON(e)) : [],
            votingStartTime: isSet(object.votingStartTime) ? fromJsonTimestamp(object.votingStartTime) : undefined,
            votingEndTime: isSet(object.votingEndTime) ? fromJsonTimestamp(object.votingEndTime) : undefined,
            metadata: isSet(object.metadata) ? String(object.metadata) : "",
            title: isSet(object.title) ? String(object.title) : "",
            summary: isSet(object.summary) ? String(object.summary) : "",
            proposer: isSet(object.proposer) ? String(object.proposer) : "",
            expedited: isSet(object.expedited) ? Boolean(object.expedited) : false,
            failedReason: isSet(object.failedReason) ? String(object.failedReason) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        if (message.messages?.length) {
            obj.messages = message.messages.map((e) => Any.toJSON(e));
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
        if (message.metadata !== "") {
            obj.metadata = message.metadata;
        }
        if (message.title !== "") {
            obj.title = message.title;
        }
        if (message.summary !== "") {
            obj.summary = message.summary;
        }
        if (message.proposer !== "") {
            obj.proposer = message.proposer;
        }
        if (message.expedited === true) {
            obj.expedited = message.expedited;
        }
        if (message.failedReason !== "") {
            obj.failedReason = message.failedReason;
        }
        return obj;
    },
    create(base) {
        return Proposal.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseProposal();
        message.id = object.id ?? 0;
        message.messages = object.messages?.map((e) => Any.fromPartial(e)) || [];
        message.status = object.status ?? 0;
        message.finalTallyResult = (object.finalTallyResult !== undefined && object.finalTallyResult !== null)
            ? TallyResult.fromPartial(object.finalTallyResult)
            : undefined;
        message.submitTime = object.submitTime ?? undefined;
        message.depositEndTime = object.depositEndTime ?? undefined;
        message.totalDeposit = object.totalDeposit?.map((e) => Coin.fromPartial(e)) || [];
        message.votingStartTime = object.votingStartTime ?? undefined;
        message.votingEndTime = object.votingEndTime ?? undefined;
        message.metadata = object.metadata ?? "";
        message.title = object.title ?? "";
        message.summary = object.summary ?? "";
        message.proposer = object.proposer ?? "";
        message.expedited = object.expedited ?? false;
        message.failedReason = object.failedReason ?? "";
        return message;
    },
};
function createBaseTallyResult() {
    return { yesCount: "", abstainCount: "", noCount: "", noWithVetoCount: "" };
}
export const TallyResult = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.yesCount !== "") {
            writer.uint32(10).string(message.yesCount);
        }
        if (message.abstainCount !== "") {
            writer.uint32(18).string(message.abstainCount);
        }
        if (message.noCount !== "") {
            writer.uint32(26).string(message.noCount);
        }
        if (message.noWithVetoCount !== "") {
            writer.uint32(34).string(message.noWithVetoCount);
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
                    message.yesCount = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.abstainCount = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.noCount = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.noWithVetoCount = reader.string();
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
            yesCount: isSet(object.yesCount) ? String(object.yesCount) : "",
            abstainCount: isSet(object.abstainCount) ? String(object.abstainCount) : "",
            noCount: isSet(object.noCount) ? String(object.noCount) : "",
            noWithVetoCount: isSet(object.noWithVetoCount) ? String(object.noWithVetoCount) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.yesCount !== "") {
            obj.yesCount = message.yesCount;
        }
        if (message.abstainCount !== "") {
            obj.abstainCount = message.abstainCount;
        }
        if (message.noCount !== "") {
            obj.noCount = message.noCount;
        }
        if (message.noWithVetoCount !== "") {
            obj.noWithVetoCount = message.noWithVetoCount;
        }
        return obj;
    },
    create(base) {
        return TallyResult.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTallyResult();
        message.yesCount = object.yesCount ?? "";
        message.abstainCount = object.abstainCount ?? "";
        message.noCount = object.noCount ?? "";
        message.noWithVetoCount = object.noWithVetoCount ?? "";
        return message;
    },
};
function createBaseVote() {
    return { proposalId: 0, voter: "", options: [], metadata: "" };
}
export const Vote = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.voter !== "") {
            writer.uint32(18).string(message.voter);
        }
        for (const v of message.options) {
            WeightedVoteOption.encode(v, writer.uint32(34).fork()).ldelim();
        }
        if (message.metadata !== "") {
            writer.uint32(42).string(message.metadata);
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
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.options.push(WeightedVoteOption.decode(reader, reader.uint32()));
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.metadata = reader.string();
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
            options: Array.isArray(object?.options) ? object.options.map((e) => WeightedVoteOption.fromJSON(e)) : [],
            metadata: isSet(object.metadata) ? String(object.metadata) : "",
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
        if (message.options?.length) {
            obj.options = message.options.map((e) => WeightedVoteOption.toJSON(e));
        }
        if (message.metadata !== "") {
            obj.metadata = message.metadata;
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
        message.options = object.options?.map((e) => WeightedVoteOption.fromPartial(e)) || [];
        message.metadata = object.metadata ?? "";
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
    return { quorum: "", threshold: "", vetoThreshold: "" };
}
export const TallyParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.quorum !== "") {
            writer.uint32(10).string(message.quorum);
        }
        if (message.threshold !== "") {
            writer.uint32(18).string(message.threshold);
        }
        if (message.vetoThreshold !== "") {
            writer.uint32(26).string(message.vetoThreshold);
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
                    message.quorum = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.threshold = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.vetoThreshold = reader.string();
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
            quorum: isSet(object.quorum) ? String(object.quorum) : "",
            threshold: isSet(object.threshold) ? String(object.threshold) : "",
            vetoThreshold: isSet(object.vetoThreshold) ? String(object.vetoThreshold) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.quorum !== "") {
            obj.quorum = message.quorum;
        }
        if (message.threshold !== "") {
            obj.threshold = message.threshold;
        }
        if (message.vetoThreshold !== "") {
            obj.vetoThreshold = message.vetoThreshold;
        }
        return obj;
    },
    create(base) {
        return TallyParams.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTallyParams();
        message.quorum = object.quorum ?? "";
        message.threshold = object.threshold ?? "";
        message.vetoThreshold = object.vetoThreshold ?? "";
        return message;
    },
};
function createBaseParams() {
    return {
        minDeposit: [],
        maxDepositPeriod: undefined,
        votingPeriod: undefined,
        quorum: "",
        threshold: "",
        vetoThreshold: "",
        minInitialDepositRatio: "",
        proposalCancelRatio: "",
        proposalCancelDest: "",
        expeditedVotingPeriod: undefined,
        expeditedThreshold: "",
        expeditedMinDeposit: [],
        burnVoteQuorum: false,
        burnProposalDepositPrevote: false,
        burnVoteVeto: false,
        minDepositRatio: "",
    };
}
export const Params = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.minDeposit) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.maxDepositPeriod !== undefined) {
            Duration.encode(message.maxDepositPeriod, writer.uint32(18).fork()).ldelim();
        }
        if (message.votingPeriod !== undefined) {
            Duration.encode(message.votingPeriod, writer.uint32(26).fork()).ldelim();
        }
        if (message.quorum !== "") {
            writer.uint32(34).string(message.quorum);
        }
        if (message.threshold !== "") {
            writer.uint32(42).string(message.threshold);
        }
        if (message.vetoThreshold !== "") {
            writer.uint32(50).string(message.vetoThreshold);
        }
        if (message.minInitialDepositRatio !== "") {
            writer.uint32(58).string(message.minInitialDepositRatio);
        }
        if (message.proposalCancelRatio !== "") {
            writer.uint32(66).string(message.proposalCancelRatio);
        }
        if (message.proposalCancelDest !== "") {
            writer.uint32(74).string(message.proposalCancelDest);
        }
        if (message.expeditedVotingPeriod !== undefined) {
            Duration.encode(message.expeditedVotingPeriod, writer.uint32(82).fork()).ldelim();
        }
        if (message.expeditedThreshold !== "") {
            writer.uint32(90).string(message.expeditedThreshold);
        }
        for (const v of message.expeditedMinDeposit) {
            Coin.encode(v, writer.uint32(98).fork()).ldelim();
        }
        if (message.burnVoteQuorum === true) {
            writer.uint32(104).bool(message.burnVoteQuorum);
        }
        if (message.burnProposalDepositPrevote === true) {
            writer.uint32(112).bool(message.burnProposalDepositPrevote);
        }
        if (message.burnVoteVeto === true) {
            writer.uint32(120).bool(message.burnVoteVeto);
        }
        if (message.minDepositRatio !== "") {
            writer.uint32(130).string(message.minDepositRatio);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseParams();
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
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.votingPeriod = Duration.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.quorum = reader.string();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.threshold = reader.string();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.vetoThreshold = reader.string();
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.minInitialDepositRatio = reader.string();
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.proposalCancelRatio = reader.string();
                    continue;
                case 9:
                    if (tag !== 74) {
                        break;
                    }
                    message.proposalCancelDest = reader.string();
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.expeditedVotingPeriod = Duration.decode(reader, reader.uint32());
                    continue;
                case 11:
                    if (tag !== 90) {
                        break;
                    }
                    message.expeditedThreshold = reader.string();
                    continue;
                case 12:
                    if (tag !== 98) {
                        break;
                    }
                    message.expeditedMinDeposit.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 13:
                    if (tag !== 104) {
                        break;
                    }
                    message.burnVoteQuorum = reader.bool();
                    continue;
                case 14:
                    if (tag !== 112) {
                        break;
                    }
                    message.burnProposalDepositPrevote = reader.bool();
                    continue;
                case 15:
                    if (tag !== 120) {
                        break;
                    }
                    message.burnVoteVeto = reader.bool();
                    continue;
                case 16:
                    if (tag !== 130) {
                        break;
                    }
                    message.minDepositRatio = reader.string();
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
            votingPeriod: isSet(object.votingPeriod) ? Duration.fromJSON(object.votingPeriod) : undefined,
            quorum: isSet(object.quorum) ? String(object.quorum) : "",
            threshold: isSet(object.threshold) ? String(object.threshold) : "",
            vetoThreshold: isSet(object.vetoThreshold) ? String(object.vetoThreshold) : "",
            minInitialDepositRatio: isSet(object.minInitialDepositRatio) ? String(object.minInitialDepositRatio) : "",
            proposalCancelRatio: isSet(object.proposalCancelRatio) ? String(object.proposalCancelRatio) : "",
            proposalCancelDest: isSet(object.proposalCancelDest) ? String(object.proposalCancelDest) : "",
            expeditedVotingPeriod: isSet(object.expeditedVotingPeriod)
                ? Duration.fromJSON(object.expeditedVotingPeriod)
                : undefined,
            expeditedThreshold: isSet(object.expeditedThreshold) ? String(object.expeditedThreshold) : "",
            expeditedMinDeposit: Array.isArray(object?.expeditedMinDeposit)
                ? object.expeditedMinDeposit.map((e) => Coin.fromJSON(e))
                : [],
            burnVoteQuorum: isSet(object.burnVoteQuorum) ? Boolean(object.burnVoteQuorum) : false,
            burnProposalDepositPrevote: isSet(object.burnProposalDepositPrevote)
                ? Boolean(object.burnProposalDepositPrevote)
                : false,
            burnVoteVeto: isSet(object.burnVoteVeto) ? Boolean(object.burnVoteVeto) : false,
            minDepositRatio: isSet(object.minDepositRatio) ? String(object.minDepositRatio) : "",
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
        if (message.votingPeriod !== undefined) {
            obj.votingPeriod = Duration.toJSON(message.votingPeriod);
        }
        if (message.quorum !== "") {
            obj.quorum = message.quorum;
        }
        if (message.threshold !== "") {
            obj.threshold = message.threshold;
        }
        if (message.vetoThreshold !== "") {
            obj.vetoThreshold = message.vetoThreshold;
        }
        if (message.minInitialDepositRatio !== "") {
            obj.minInitialDepositRatio = message.minInitialDepositRatio;
        }
        if (message.proposalCancelRatio !== "") {
            obj.proposalCancelRatio = message.proposalCancelRatio;
        }
        if (message.proposalCancelDest !== "") {
            obj.proposalCancelDest = message.proposalCancelDest;
        }
        if (message.expeditedVotingPeriod !== undefined) {
            obj.expeditedVotingPeriod = Duration.toJSON(message.expeditedVotingPeriod);
        }
        if (message.expeditedThreshold !== "") {
            obj.expeditedThreshold = message.expeditedThreshold;
        }
        if (message.expeditedMinDeposit?.length) {
            obj.expeditedMinDeposit = message.expeditedMinDeposit.map((e) => Coin.toJSON(e));
        }
        if (message.burnVoteQuorum === true) {
            obj.burnVoteQuorum = message.burnVoteQuorum;
        }
        if (message.burnProposalDepositPrevote === true) {
            obj.burnProposalDepositPrevote = message.burnProposalDepositPrevote;
        }
        if (message.burnVoteVeto === true) {
            obj.burnVoteVeto = message.burnVoteVeto;
        }
        if (message.minDepositRatio !== "") {
            obj.minDepositRatio = message.minDepositRatio;
        }
        return obj;
    },
    create(base) {
        return Params.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseParams();
        message.minDeposit = object.minDeposit?.map((e) => Coin.fromPartial(e)) || [];
        message.maxDepositPeriod = (object.maxDepositPeriod !== undefined && object.maxDepositPeriod !== null)
            ? Duration.fromPartial(object.maxDepositPeriod)
            : undefined;
        message.votingPeriod = (object.votingPeriod !== undefined && object.votingPeriod !== null)
            ? Duration.fromPartial(object.votingPeriod)
            : undefined;
        message.quorum = object.quorum ?? "";
        message.threshold = object.threshold ?? "";
        message.vetoThreshold = object.vetoThreshold ?? "";
        message.minInitialDepositRatio = object.minInitialDepositRatio ?? "";
        message.proposalCancelRatio = object.proposalCancelRatio ?? "";
        message.proposalCancelDest = object.proposalCancelDest ?? "";
        message.expeditedVotingPeriod =
            (object.expeditedVotingPeriod !== undefined && object.expeditedVotingPeriod !== null)
                ? Duration.fromPartial(object.expeditedVotingPeriod)
                : undefined;
        message.expeditedThreshold = object.expeditedThreshold ?? "";
        message.expeditedMinDeposit = object.expeditedMinDeposit?.map((e) => Coin.fromPartial(e)) || [];
        message.burnVoteQuorum = object.burnVoteQuorum ?? false;
        message.burnProposalDepositPrevote = object.burnProposalDepositPrevote ?? false;
        message.burnVoteVeto = object.burnVoteVeto ?? false;
        message.minDepositRatio = object.minDepositRatio ?? "";
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
