/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Duration } from "../../../google/protobuf/duration";
import { Timestamp } from "../../../google/protobuf/timestamp";
export const protobufPackage = "cosmos.group.v1";
/** Since: cosmos-sdk 0.46 */
/** VoteOption enumerates the valid vote options for a given proposal. */
export var VoteOption;
(function (VoteOption) {
    /**
     * VOTE_OPTION_UNSPECIFIED - VOTE_OPTION_UNSPECIFIED defines an unspecified vote option which will
     * return an error.
     */
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
/** ProposalStatus defines proposal statuses. */
export var ProposalStatus;
(function (ProposalStatus) {
    /** PROPOSAL_STATUS_UNSPECIFIED - An empty value is invalid and not allowed. */
    ProposalStatus[ProposalStatus["PROPOSAL_STATUS_UNSPECIFIED"] = 0] = "PROPOSAL_STATUS_UNSPECIFIED";
    /** PROPOSAL_STATUS_SUBMITTED - Initial status of a proposal when submitted. */
    ProposalStatus[ProposalStatus["PROPOSAL_STATUS_SUBMITTED"] = 1] = "PROPOSAL_STATUS_SUBMITTED";
    /**
     * PROPOSAL_STATUS_ACCEPTED - Final status of a proposal when the final tally is done and the outcome
     * passes the group policy's decision policy.
     */
    ProposalStatus[ProposalStatus["PROPOSAL_STATUS_ACCEPTED"] = 2] = "PROPOSAL_STATUS_ACCEPTED";
    /**
     * PROPOSAL_STATUS_REJECTED - Final status of a proposal when the final tally is done and the outcome
     * is rejected by the group policy's decision policy.
     */
    ProposalStatus[ProposalStatus["PROPOSAL_STATUS_REJECTED"] = 3] = "PROPOSAL_STATUS_REJECTED";
    /**
     * PROPOSAL_STATUS_ABORTED - Final status of a proposal when the group policy is modified before the
     * final tally.
     */
    ProposalStatus[ProposalStatus["PROPOSAL_STATUS_ABORTED"] = 4] = "PROPOSAL_STATUS_ABORTED";
    /**
     * PROPOSAL_STATUS_WITHDRAWN - A proposal can be withdrawn before the voting start time by the owner.
     * When this happens the final status is Withdrawn.
     */
    ProposalStatus[ProposalStatus["PROPOSAL_STATUS_WITHDRAWN"] = 5] = "PROPOSAL_STATUS_WITHDRAWN";
    ProposalStatus[ProposalStatus["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ProposalStatus || (ProposalStatus = {}));
export function proposalStatusFromJSON(object) {
    switch (object) {
        case 0:
        case "PROPOSAL_STATUS_UNSPECIFIED":
            return ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED;
        case 1:
        case "PROPOSAL_STATUS_SUBMITTED":
            return ProposalStatus.PROPOSAL_STATUS_SUBMITTED;
        case 2:
        case "PROPOSAL_STATUS_ACCEPTED":
            return ProposalStatus.PROPOSAL_STATUS_ACCEPTED;
        case 3:
        case "PROPOSAL_STATUS_REJECTED":
            return ProposalStatus.PROPOSAL_STATUS_REJECTED;
        case 4:
        case "PROPOSAL_STATUS_ABORTED":
            return ProposalStatus.PROPOSAL_STATUS_ABORTED;
        case 5:
        case "PROPOSAL_STATUS_WITHDRAWN":
            return ProposalStatus.PROPOSAL_STATUS_WITHDRAWN;
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
        case ProposalStatus.PROPOSAL_STATUS_SUBMITTED:
            return "PROPOSAL_STATUS_SUBMITTED";
        case ProposalStatus.PROPOSAL_STATUS_ACCEPTED:
            return "PROPOSAL_STATUS_ACCEPTED";
        case ProposalStatus.PROPOSAL_STATUS_REJECTED:
            return "PROPOSAL_STATUS_REJECTED";
        case ProposalStatus.PROPOSAL_STATUS_ABORTED:
            return "PROPOSAL_STATUS_ABORTED";
        case ProposalStatus.PROPOSAL_STATUS_WITHDRAWN:
            return "PROPOSAL_STATUS_WITHDRAWN";
        case ProposalStatus.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
/** ProposalExecutorResult defines types of proposal executor results. */
export var ProposalExecutorResult;
(function (ProposalExecutorResult) {
    /** PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED - An empty value is not allowed. */
    ProposalExecutorResult[ProposalExecutorResult["PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED"] = 0] = "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED";
    /** PROPOSAL_EXECUTOR_RESULT_NOT_RUN - We have not yet run the executor. */
    ProposalExecutorResult[ProposalExecutorResult["PROPOSAL_EXECUTOR_RESULT_NOT_RUN"] = 1] = "PROPOSAL_EXECUTOR_RESULT_NOT_RUN";
    /** PROPOSAL_EXECUTOR_RESULT_SUCCESS - The executor was successful and proposed action updated state. */
    ProposalExecutorResult[ProposalExecutorResult["PROPOSAL_EXECUTOR_RESULT_SUCCESS"] = 2] = "PROPOSAL_EXECUTOR_RESULT_SUCCESS";
    /** PROPOSAL_EXECUTOR_RESULT_FAILURE - The executor returned an error and proposed action didn't update state. */
    ProposalExecutorResult[ProposalExecutorResult["PROPOSAL_EXECUTOR_RESULT_FAILURE"] = 3] = "PROPOSAL_EXECUTOR_RESULT_FAILURE";
    ProposalExecutorResult[ProposalExecutorResult["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ProposalExecutorResult || (ProposalExecutorResult = {}));
export function proposalExecutorResultFromJSON(object) {
    switch (object) {
        case 0:
        case "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED":
            return ProposalExecutorResult.PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED;
        case 1:
        case "PROPOSAL_EXECUTOR_RESULT_NOT_RUN":
            return ProposalExecutorResult.PROPOSAL_EXECUTOR_RESULT_NOT_RUN;
        case 2:
        case "PROPOSAL_EXECUTOR_RESULT_SUCCESS":
            return ProposalExecutorResult.PROPOSAL_EXECUTOR_RESULT_SUCCESS;
        case 3:
        case "PROPOSAL_EXECUTOR_RESULT_FAILURE":
            return ProposalExecutorResult.PROPOSAL_EXECUTOR_RESULT_FAILURE;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ProposalExecutorResult.UNRECOGNIZED;
    }
}
export function proposalExecutorResultToJSON(object) {
    switch (object) {
        case ProposalExecutorResult.PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED:
            return "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED";
        case ProposalExecutorResult.PROPOSAL_EXECUTOR_RESULT_NOT_RUN:
            return "PROPOSAL_EXECUTOR_RESULT_NOT_RUN";
        case ProposalExecutorResult.PROPOSAL_EXECUTOR_RESULT_SUCCESS:
            return "PROPOSAL_EXECUTOR_RESULT_SUCCESS";
        case ProposalExecutorResult.PROPOSAL_EXECUTOR_RESULT_FAILURE:
            return "PROPOSAL_EXECUTOR_RESULT_FAILURE";
        case ProposalExecutorResult.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseMember() {
    return { address: "", weight: "", metadata: "", addedAt: undefined };
}
export const Member = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.weight !== "") {
            writer.uint32(18).string(message.weight);
        }
        if (message.metadata !== "") {
            writer.uint32(26).string(message.metadata);
        }
        if (message.addedAt !== undefined) {
            Timestamp.encode(toTimestamp(message.addedAt), writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMember();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.weight = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.metadata = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.addedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
            address: isSet(object.address) ? String(object.address) : "",
            weight: isSet(object.weight) ? String(object.weight) : "",
            metadata: isSet(object.metadata) ? String(object.metadata) : "",
            addedAt: isSet(object.addedAt) ? fromJsonTimestamp(object.addedAt) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.weight !== "") {
            obj.weight = message.weight;
        }
        if (message.metadata !== "") {
            obj.metadata = message.metadata;
        }
        if (message.addedAt !== undefined) {
            obj.addedAt = message.addedAt.toISOString();
        }
        return obj;
    },
    create(base) {
        return Member.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMember();
        message.address = object.address ?? "";
        message.weight = object.weight ?? "";
        message.metadata = object.metadata ?? "";
        message.addedAt = object.addedAt ?? undefined;
        return message;
    },
};
function createBaseMemberRequest() {
    return { address: "", weight: "", metadata: "" };
}
export const MemberRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.weight !== "") {
            writer.uint32(18).string(message.weight);
        }
        if (message.metadata !== "") {
            writer.uint32(26).string(message.metadata);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMemberRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.weight = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
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
            address: isSet(object.address) ? String(object.address) : "",
            weight: isSet(object.weight) ? String(object.weight) : "",
            metadata: isSet(object.metadata) ? String(object.metadata) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.weight !== "") {
            obj.weight = message.weight;
        }
        if (message.metadata !== "") {
            obj.metadata = message.metadata;
        }
        return obj;
    },
    create(base) {
        return MemberRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMemberRequest();
        message.address = object.address ?? "";
        message.weight = object.weight ?? "";
        message.metadata = object.metadata ?? "";
        return message;
    },
};
function createBaseThresholdDecisionPolicy() {
    return { threshold: "", windows: undefined };
}
export const ThresholdDecisionPolicy = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.threshold !== "") {
            writer.uint32(10).string(message.threshold);
        }
        if (message.windows !== undefined) {
            DecisionPolicyWindows.encode(message.windows, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseThresholdDecisionPolicy();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.threshold = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.windows = DecisionPolicyWindows.decode(reader, reader.uint32());
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
            threshold: isSet(object.threshold) ? String(object.threshold) : "",
            windows: isSet(object.windows) ? DecisionPolicyWindows.fromJSON(object.windows) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.threshold !== "") {
            obj.threshold = message.threshold;
        }
        if (message.windows !== undefined) {
            obj.windows = DecisionPolicyWindows.toJSON(message.windows);
        }
        return obj;
    },
    create(base) {
        return ThresholdDecisionPolicy.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseThresholdDecisionPolicy();
        message.threshold = object.threshold ?? "";
        message.windows = (object.windows !== undefined && object.windows !== null)
            ? DecisionPolicyWindows.fromPartial(object.windows)
            : undefined;
        return message;
    },
};
function createBasePercentageDecisionPolicy() {
    return { percentage: "", windows: undefined };
}
export const PercentageDecisionPolicy = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.percentage !== "") {
            writer.uint32(10).string(message.percentage);
        }
        if (message.windows !== undefined) {
            DecisionPolicyWindows.encode(message.windows, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePercentageDecisionPolicy();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.percentage = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.windows = DecisionPolicyWindows.decode(reader, reader.uint32());
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
            percentage: isSet(object.percentage) ? String(object.percentage) : "",
            windows: isSet(object.windows) ? DecisionPolicyWindows.fromJSON(object.windows) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.percentage !== "") {
            obj.percentage = message.percentage;
        }
        if (message.windows !== undefined) {
            obj.windows = DecisionPolicyWindows.toJSON(message.windows);
        }
        return obj;
    },
    create(base) {
        return PercentageDecisionPolicy.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBasePercentageDecisionPolicy();
        message.percentage = object.percentage ?? "";
        message.windows = (object.windows !== undefined && object.windows !== null)
            ? DecisionPolicyWindows.fromPartial(object.windows)
            : undefined;
        return message;
    },
};
function createBaseDecisionPolicyWindows() {
    return { votingPeriod: undefined, minExecutionPeriod: undefined };
}
export const DecisionPolicyWindows = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.votingPeriod !== undefined) {
            Duration.encode(message.votingPeriod, writer.uint32(10).fork()).ldelim();
        }
        if (message.minExecutionPeriod !== undefined) {
            Duration.encode(message.minExecutionPeriod, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDecisionPolicyWindows();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.votingPeriod = Duration.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.minExecutionPeriod = Duration.decode(reader, reader.uint32());
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
            votingPeriod: isSet(object.votingPeriod) ? Duration.fromJSON(object.votingPeriod) : undefined,
            minExecutionPeriod: isSet(object.minExecutionPeriod) ? Duration.fromJSON(object.minExecutionPeriod) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.votingPeriod !== undefined) {
            obj.votingPeriod = Duration.toJSON(message.votingPeriod);
        }
        if (message.minExecutionPeriod !== undefined) {
            obj.minExecutionPeriod = Duration.toJSON(message.minExecutionPeriod);
        }
        return obj;
    },
    create(base) {
        return DecisionPolicyWindows.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseDecisionPolicyWindows();
        message.votingPeriod = (object.votingPeriod !== undefined && object.votingPeriod !== null)
            ? Duration.fromPartial(object.votingPeriod)
            : undefined;
        message.minExecutionPeriod = (object.minExecutionPeriod !== undefined && object.minExecutionPeriod !== null)
            ? Duration.fromPartial(object.minExecutionPeriod)
            : undefined;
        return message;
    },
};
function createBaseGroupInfo() {
    return { id: 0, admin: "", metadata: "", version: 0, totalWeight: "", createdAt: undefined };
}
export const GroupInfo = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        if (message.admin !== "") {
            writer.uint32(18).string(message.admin);
        }
        if (message.metadata !== "") {
            writer.uint32(26).string(message.metadata);
        }
        if (message.version !== 0) {
            writer.uint32(32).uint64(message.version);
        }
        if (message.totalWeight !== "") {
            writer.uint32(42).string(message.totalWeight);
        }
        if (message.createdAt !== undefined) {
            Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupInfo();
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
                    message.admin = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.metadata = reader.string();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.version = longToNumber(reader.uint64());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.totalWeight = reader.string();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
            admin: isSet(object.admin) ? String(object.admin) : "",
            metadata: isSet(object.metadata) ? String(object.metadata) : "",
            version: isSet(object.version) ? Number(object.version) : 0,
            totalWeight: isSet(object.totalWeight) ? String(object.totalWeight) : "",
            createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        if (message.admin !== "") {
            obj.admin = message.admin;
        }
        if (message.metadata !== "") {
            obj.metadata = message.metadata;
        }
        if (message.version !== 0) {
            obj.version = Math.round(message.version);
        }
        if (message.totalWeight !== "") {
            obj.totalWeight = message.totalWeight;
        }
        if (message.createdAt !== undefined) {
            obj.createdAt = message.createdAt.toISOString();
        }
        return obj;
    },
    create(base) {
        return GroupInfo.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGroupInfo();
        message.id = object.id ?? 0;
        message.admin = object.admin ?? "";
        message.metadata = object.metadata ?? "";
        message.version = object.version ?? 0;
        message.totalWeight = object.totalWeight ?? "";
        message.createdAt = object.createdAt ?? undefined;
        return message;
    },
};
function createBaseGroupMember() {
    return { groupId: 0, member: undefined };
}
export const GroupMember = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.groupId !== 0) {
            writer.uint32(8).uint64(message.groupId);
        }
        if (message.member !== undefined) {
            Member.encode(message.member, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupMember();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.groupId = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.member = Member.decode(reader, reader.uint32());
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
            groupId: isSet(object.groupId) ? Number(object.groupId) : 0,
            member: isSet(object.member) ? Member.fromJSON(object.member) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.groupId !== 0) {
            obj.groupId = Math.round(message.groupId);
        }
        if (message.member !== undefined) {
            obj.member = Member.toJSON(message.member);
        }
        return obj;
    },
    create(base) {
        return GroupMember.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGroupMember();
        message.groupId = object.groupId ?? 0;
        message.member = (object.member !== undefined && object.member !== null)
            ? Member.fromPartial(object.member)
            : undefined;
        return message;
    },
};
function createBaseGroupPolicyInfo() {
    return {
        address: "",
        groupId: 0,
        admin: "",
        metadata: "",
        version: 0,
        decisionPolicy: undefined,
        createdAt: undefined,
    };
}
export const GroupPolicyInfo = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.groupId !== 0) {
            writer.uint32(16).uint64(message.groupId);
        }
        if (message.admin !== "") {
            writer.uint32(26).string(message.admin);
        }
        if (message.metadata !== "") {
            writer.uint32(34).string(message.metadata);
        }
        if (message.version !== 0) {
            writer.uint32(40).uint64(message.version);
        }
        if (message.decisionPolicy !== undefined) {
            Any.encode(message.decisionPolicy, writer.uint32(50).fork()).ldelim();
        }
        if (message.createdAt !== undefined) {
            Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(58).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGroupPolicyInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.groupId = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.admin = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.metadata = reader.string();
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.version = longToNumber(reader.uint64());
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.decisionPolicy = Any.decode(reader, reader.uint32());
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
            address: isSet(object.address) ? String(object.address) : "",
            groupId: isSet(object.groupId) ? Number(object.groupId) : 0,
            admin: isSet(object.admin) ? String(object.admin) : "",
            metadata: isSet(object.metadata) ? String(object.metadata) : "",
            version: isSet(object.version) ? Number(object.version) : 0,
            decisionPolicy: isSet(object.decisionPolicy) ? Any.fromJSON(object.decisionPolicy) : undefined,
            createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.groupId !== 0) {
            obj.groupId = Math.round(message.groupId);
        }
        if (message.admin !== "") {
            obj.admin = message.admin;
        }
        if (message.metadata !== "") {
            obj.metadata = message.metadata;
        }
        if (message.version !== 0) {
            obj.version = Math.round(message.version);
        }
        if (message.decisionPolicy !== undefined) {
            obj.decisionPolicy = Any.toJSON(message.decisionPolicy);
        }
        if (message.createdAt !== undefined) {
            obj.createdAt = message.createdAt.toISOString();
        }
        return obj;
    },
    create(base) {
        return GroupPolicyInfo.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGroupPolicyInfo();
        message.address = object.address ?? "";
        message.groupId = object.groupId ?? 0;
        message.admin = object.admin ?? "";
        message.metadata = object.metadata ?? "";
        message.version = object.version ?? 0;
        message.decisionPolicy = (object.decisionPolicy !== undefined && object.decisionPolicy !== null)
            ? Any.fromPartial(object.decisionPolicy)
            : undefined;
        message.createdAt = object.createdAt ?? undefined;
        return message;
    },
};
function createBaseProposal() {
    return {
        id: 0,
        groupPolicyAddress: "",
        metadata: "",
        proposers: [],
        submitTime: undefined,
        groupVersion: 0,
        groupPolicyVersion: 0,
        status: 0,
        finalTallyResult: undefined,
        votingPeriodEnd: undefined,
        executorResult: 0,
        messages: [],
        title: "",
        summary: "",
    };
}
export const Proposal = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        if (message.groupPolicyAddress !== "") {
            writer.uint32(18).string(message.groupPolicyAddress);
        }
        if (message.metadata !== "") {
            writer.uint32(26).string(message.metadata);
        }
        for (const v of message.proposers) {
            writer.uint32(34).string(v);
        }
        if (message.submitTime !== undefined) {
            Timestamp.encode(toTimestamp(message.submitTime), writer.uint32(42).fork()).ldelim();
        }
        if (message.groupVersion !== 0) {
            writer.uint32(48).uint64(message.groupVersion);
        }
        if (message.groupPolicyVersion !== 0) {
            writer.uint32(56).uint64(message.groupPolicyVersion);
        }
        if (message.status !== 0) {
            writer.uint32(64).int32(message.status);
        }
        if (message.finalTallyResult !== undefined) {
            TallyResult.encode(message.finalTallyResult, writer.uint32(74).fork()).ldelim();
        }
        if (message.votingPeriodEnd !== undefined) {
            Timestamp.encode(toTimestamp(message.votingPeriodEnd), writer.uint32(82).fork()).ldelim();
        }
        if (message.executorResult !== 0) {
            writer.uint32(88).int32(message.executorResult);
        }
        for (const v of message.messages) {
            Any.encode(v, writer.uint32(98).fork()).ldelim();
        }
        if (message.title !== "") {
            writer.uint32(106).string(message.title);
        }
        if (message.summary !== "") {
            writer.uint32(114).string(message.summary);
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
                    message.groupPolicyAddress = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.metadata = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.proposers.push(reader.string());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.submitTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    continue;
                case 6:
                    if (tag !== 48) {
                        break;
                    }
                    message.groupVersion = longToNumber(reader.uint64());
                    continue;
                case 7:
                    if (tag !== 56) {
                        break;
                    }
                    message.groupPolicyVersion = longToNumber(reader.uint64());
                    continue;
                case 8:
                    if (tag !== 64) {
                        break;
                    }
                    message.status = reader.int32();
                    continue;
                case 9:
                    if (tag !== 74) {
                        break;
                    }
                    message.finalTallyResult = TallyResult.decode(reader, reader.uint32());
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.votingPeriodEnd = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    continue;
                case 11:
                    if (tag !== 88) {
                        break;
                    }
                    message.executorResult = reader.int32();
                    continue;
                case 12:
                    if (tag !== 98) {
                        break;
                    }
                    message.messages.push(Any.decode(reader, reader.uint32()));
                    continue;
                case 13:
                    if (tag !== 106) {
                        break;
                    }
                    message.title = reader.string();
                    continue;
                case 14:
                    if (tag !== 114) {
                        break;
                    }
                    message.summary = reader.string();
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
            groupPolicyAddress: isSet(object.groupPolicyAddress) ? String(object.groupPolicyAddress) : "",
            metadata: isSet(object.metadata) ? String(object.metadata) : "",
            proposers: Array.isArray(object?.proposers) ? object.proposers.map((e) => String(e)) : [],
            submitTime: isSet(object.submitTime) ? fromJsonTimestamp(object.submitTime) : undefined,
            groupVersion: isSet(object.groupVersion) ? Number(object.groupVersion) : 0,
            groupPolicyVersion: isSet(object.groupPolicyVersion) ? Number(object.groupPolicyVersion) : 0,
            status: isSet(object.status) ? proposalStatusFromJSON(object.status) : 0,
            finalTallyResult: isSet(object.finalTallyResult) ? TallyResult.fromJSON(object.finalTallyResult) : undefined,
            votingPeriodEnd: isSet(object.votingPeriodEnd) ? fromJsonTimestamp(object.votingPeriodEnd) : undefined,
            executorResult: isSet(object.executorResult) ? proposalExecutorResultFromJSON(object.executorResult) : 0,
            messages: Array.isArray(object?.messages) ? object.messages.map((e) => Any.fromJSON(e)) : [],
            title: isSet(object.title) ? String(object.title) : "",
            summary: isSet(object.summary) ? String(object.summary) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        if (message.groupPolicyAddress !== "") {
            obj.groupPolicyAddress = message.groupPolicyAddress;
        }
        if (message.metadata !== "") {
            obj.metadata = message.metadata;
        }
        if (message.proposers?.length) {
            obj.proposers = message.proposers;
        }
        if (message.submitTime !== undefined) {
            obj.submitTime = message.submitTime.toISOString();
        }
        if (message.groupVersion !== 0) {
            obj.groupVersion = Math.round(message.groupVersion);
        }
        if (message.groupPolicyVersion !== 0) {
            obj.groupPolicyVersion = Math.round(message.groupPolicyVersion);
        }
        if (message.status !== 0) {
            obj.status = proposalStatusToJSON(message.status);
        }
        if (message.finalTallyResult !== undefined) {
            obj.finalTallyResult = TallyResult.toJSON(message.finalTallyResult);
        }
        if (message.votingPeriodEnd !== undefined) {
            obj.votingPeriodEnd = message.votingPeriodEnd.toISOString();
        }
        if (message.executorResult !== 0) {
            obj.executorResult = proposalExecutorResultToJSON(message.executorResult);
        }
        if (message.messages?.length) {
            obj.messages = message.messages.map((e) => Any.toJSON(e));
        }
        if (message.title !== "") {
            obj.title = message.title;
        }
        if (message.summary !== "") {
            obj.summary = message.summary;
        }
        return obj;
    },
    create(base) {
        return Proposal.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseProposal();
        message.id = object.id ?? 0;
        message.groupPolicyAddress = object.groupPolicyAddress ?? "";
        message.metadata = object.metadata ?? "";
        message.proposers = object.proposers?.map((e) => e) || [];
        message.submitTime = object.submitTime ?? undefined;
        message.groupVersion = object.groupVersion ?? 0;
        message.groupPolicyVersion = object.groupPolicyVersion ?? 0;
        message.status = object.status ?? 0;
        message.finalTallyResult = (object.finalTallyResult !== undefined && object.finalTallyResult !== null)
            ? TallyResult.fromPartial(object.finalTallyResult)
            : undefined;
        message.votingPeriodEnd = object.votingPeriodEnd ?? undefined;
        message.executorResult = object.executorResult ?? 0;
        message.messages = object.messages?.map((e) => Any.fromPartial(e)) || [];
        message.title = object.title ?? "";
        message.summary = object.summary ?? "";
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
    return { proposalId: 0, voter: "", option: 0, metadata: "", submitTime: undefined };
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
        if (message.metadata !== "") {
            writer.uint32(34).string(message.metadata);
        }
        if (message.submitTime !== undefined) {
            Timestamp.encode(toTimestamp(message.submitTime), writer.uint32(42).fork()).ldelim();
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
                    message.metadata = reader.string();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.submitTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
            metadata: isSet(object.metadata) ? String(object.metadata) : "",
            submitTime: isSet(object.submitTime) ? fromJsonTimestamp(object.submitTime) : undefined,
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
        if (message.metadata !== "") {
            obj.metadata = message.metadata;
        }
        if (message.submitTime !== undefined) {
            obj.submitTime = message.submitTime.toISOString();
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
        message.metadata = object.metadata ?? "";
        message.submitTime = object.submitTime ?? undefined;
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
