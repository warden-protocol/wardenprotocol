/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Deposit, DepositParams, Params, Proposal, TallyParams, Vote, VotingParams } from "./gov";
export const protobufPackage = "cosmos.gov.v1";
function createBaseGenesisState() {
    return {
        startingProposalId: 0,
        deposits: [],
        votes: [],
        proposals: [],
        depositParams: undefined,
        votingParams: undefined,
        tallyParams: undefined,
        params: undefined,
        constitution: "",
    };
}
export const GenesisState = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.startingProposalId !== 0) {
            writer.uint32(8).uint64(message.startingProposalId);
        }
        for (const v of message.deposits) {
            Deposit.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.votes) {
            Vote.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.proposals) {
            Proposal.encode(v, writer.uint32(34).fork()).ldelim();
        }
        if (message.depositParams !== undefined) {
            DepositParams.encode(message.depositParams, writer.uint32(42).fork()).ldelim();
        }
        if (message.votingParams !== undefined) {
            VotingParams.encode(message.votingParams, writer.uint32(50).fork()).ldelim();
        }
        if (message.tallyParams !== undefined) {
            TallyParams.encode(message.tallyParams, writer.uint32(58).fork()).ldelim();
        }
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(66).fork()).ldelim();
        }
        if (message.constitution !== "") {
            writer.uint32(74).string(message.constitution);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.startingProposalId = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.deposits.push(Deposit.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.votes.push(Vote.decode(reader, reader.uint32()));
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.proposals.push(Proposal.decode(reader, reader.uint32()));
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.depositParams = DepositParams.decode(reader, reader.uint32());
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.votingParams = VotingParams.decode(reader, reader.uint32());
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.tallyParams = TallyParams.decode(reader, reader.uint32());
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.params = Params.decode(reader, reader.uint32());
                    continue;
                case 9:
                    if (tag !== 74) {
                        break;
                    }
                    message.constitution = reader.string();
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
            startingProposalId: isSet(object.startingProposalId) ? Number(object.startingProposalId) : 0,
            deposits: Array.isArray(object?.deposits) ? object.deposits.map((e) => Deposit.fromJSON(e)) : [],
            votes: Array.isArray(object?.votes) ? object.votes.map((e) => Vote.fromJSON(e)) : [],
            proposals: Array.isArray(object?.proposals) ? object.proposals.map((e) => Proposal.fromJSON(e)) : [],
            depositParams: isSet(object.depositParams) ? DepositParams.fromJSON(object.depositParams) : undefined,
            votingParams: isSet(object.votingParams) ? VotingParams.fromJSON(object.votingParams) : undefined,
            tallyParams: isSet(object.tallyParams) ? TallyParams.fromJSON(object.tallyParams) : undefined,
            params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
            constitution: isSet(object.constitution) ? String(object.constitution) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.startingProposalId !== 0) {
            obj.startingProposalId = Math.round(message.startingProposalId);
        }
        if (message.deposits?.length) {
            obj.deposits = message.deposits.map((e) => Deposit.toJSON(e));
        }
        if (message.votes?.length) {
            obj.votes = message.votes.map((e) => Vote.toJSON(e));
        }
        if (message.proposals?.length) {
            obj.proposals = message.proposals.map((e) => Proposal.toJSON(e));
        }
        if (message.depositParams !== undefined) {
            obj.depositParams = DepositParams.toJSON(message.depositParams);
        }
        if (message.votingParams !== undefined) {
            obj.votingParams = VotingParams.toJSON(message.votingParams);
        }
        if (message.tallyParams !== undefined) {
            obj.tallyParams = TallyParams.toJSON(message.tallyParams);
        }
        if (message.params !== undefined) {
            obj.params = Params.toJSON(message.params);
        }
        if (message.constitution !== "") {
            obj.constitution = message.constitution;
        }
        return obj;
    },
    create(base) {
        return GenesisState.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.startingProposalId = object.startingProposalId ?? 0;
        message.deposits = object.deposits?.map((e) => Deposit.fromPartial(e)) || [];
        message.votes = object.votes?.map((e) => Vote.fromPartial(e)) || [];
        message.proposals = object.proposals?.map((e) => Proposal.fromPartial(e)) || [];
        message.depositParams = (object.depositParams !== undefined && object.depositParams !== null)
            ? DepositParams.fromPartial(object.depositParams)
            : undefined;
        message.votingParams = (object.votingParams !== undefined && object.votingParams !== null)
            ? VotingParams.fromPartial(object.votingParams)
            : undefined;
        message.tallyParams = (object.tallyParams !== undefined && object.tallyParams !== null)
            ? TallyParams.fromPartial(object.tallyParams)
            : undefined;
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        message.constitution = object.constitution ?? "";
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
