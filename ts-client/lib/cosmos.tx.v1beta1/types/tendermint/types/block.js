/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { EvidenceList } from "./evidence";
import { Commit, Data, Header } from "./types";
export const protobufPackage = "tendermint.types";
function createBaseBlock() {
    return { header: undefined, data: undefined, evidence: undefined, lastCommit: undefined };
}
export const Block = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.header !== undefined) {
            Header.encode(message.header, writer.uint32(10).fork()).ldelim();
        }
        if (message.data !== undefined) {
            Data.encode(message.data, writer.uint32(18).fork()).ldelim();
        }
        if (message.evidence !== undefined) {
            EvidenceList.encode(message.evidence, writer.uint32(26).fork()).ldelim();
        }
        if (message.lastCommit !== undefined) {
            Commit.encode(message.lastCommit, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBlock();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.header = Header.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.data = Data.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.evidence = EvidenceList.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.lastCommit = Commit.decode(reader, reader.uint32());
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
            header: isSet(object.header) ? Header.fromJSON(object.header) : undefined,
            data: isSet(object.data) ? Data.fromJSON(object.data) : undefined,
            evidence: isSet(object.evidence) ? EvidenceList.fromJSON(object.evidence) : undefined,
            lastCommit: isSet(object.lastCommit) ? Commit.fromJSON(object.lastCommit) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.header !== undefined) {
            obj.header = Header.toJSON(message.header);
        }
        if (message.data !== undefined) {
            obj.data = Data.toJSON(message.data);
        }
        if (message.evidence !== undefined) {
            obj.evidence = EvidenceList.toJSON(message.evidence);
        }
        if (message.lastCommit !== undefined) {
            obj.lastCommit = Commit.toJSON(message.lastCommit);
        }
        return obj;
    },
    create(base) {
        return Block.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseBlock();
        message.header = (object.header !== undefined && object.header !== null)
            ? Header.fromPartial(object.header)
            : undefined;
        message.data = (object.data !== undefined && object.data !== null) ? Data.fromPartial(object.data) : undefined;
        message.evidence = (object.evidence !== undefined && object.evidence !== null)
            ? EvidenceList.fromPartial(object.evidence)
            : undefined;
        message.lastCommit = (object.lastCommit !== undefined && object.lastCommit !== null)
            ? Commit.fromPartial(object.lastCommit)
            : undefined;
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
