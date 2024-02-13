/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Plan } from "../../../../cosmos/upgrade/v1beta1/upgrade";
import { Any } from "../../../../google/protobuf/any";

export const protobufPackage = "ibc.core.client.v1";

/**
 * IdentifiedClientState defines a client state with an additional client
 * identifier field.
 */
export interface IdentifiedClientState {
  /** client identifier */
  clientId: string;
  /** client state */
  clientState: Any | undefined;
}

/**
 * ConsensusStateWithHeight defines a consensus state with an additional height
 * field.
 */
export interface ConsensusStateWithHeight {
  /** consensus state height */
  height:
    | Height
    | undefined;
  /** consensus state */
  consensusState: Any | undefined;
}

/**
 * ClientConsensusStates defines all the stored consensus states for a given
 * client.
 */
export interface ClientConsensusStates {
  /** client identifier */
  clientId: string;
  /** consensus states and their heights associated with the client */
  consensusStates: ConsensusStateWithHeight[];
}

/**
 * Height is a monotonically increasing data type
 * that can be compared against another Height for the purposes of updating and
 * freezing clients
 *
 * Normally the RevisionHeight is incremented at each height while keeping
 * RevisionNumber the same. However some consensus algorithms may choose to
 * reset the height in certain conditions e.g. hard forks, state-machine
 * breaking changes In these cases, the RevisionNumber is incremented so that
 * height continues to be monitonically increasing even as the RevisionHeight
 * gets reset
 */
export interface Height {
  /** the revision that the client is currently on */
  revisionNumber: number;
  /** the height within the given revision */
  revisionHeight: number;
}

/** Params defines the set of IBC light client parameters. */
export interface Params {
  /**
   * allowed_clients defines the list of allowed client state types which can be created
   * and interacted with. If a client type is removed from the allowed clients list, usage
   * of this client will be disabled until it is added again to the list.
   */
  allowedClients: string[];
}

/**
 * ClientUpdateProposal is a legacy governance proposal. If it passes, the substitute
 * client's latest consensus state is copied over to the subject client. The proposal
 * handler may fail if the subject and the substitute do not match in client and
 * chain parameters (with exception to latest height, frozen height, and chain-id).
 *
 * Deprecated: Please use MsgRecoverClient in favour of this message type.
 *
 * @deprecated
 */
export interface ClientUpdateProposal {
  /** the title of the update proposal */
  title: string;
  /** the description of the proposal */
  description: string;
  /** the client identifier for the client to be updated if the proposal passes */
  subjectClientId: string;
  /**
   * the substitute client identifier for the client standing in for the subject
   * client
   */
  substituteClientId: string;
}

/**
 * UpgradeProposal is a gov Content type for initiating an IBC breaking
 * upgrade.
 *
 * Deprecated: Please use MsgIBCSoftwareUpgrade in favour of this message type.
 *
 * @deprecated
 */
export interface UpgradeProposal {
  title: string;
  description: string;
  plan:
    | Plan
    | undefined;
  /**
   * An UpgradedClientState must be provided to perform an IBC breaking upgrade.
   * This will make the chain commit to the correct upgraded (self) client state
   * before the upgrade occurs, so that connecting chains can verify that the
   * new upgraded client is valid by verifying a proof on the previous version
   * of the chain. This will allow IBC connections to persist smoothly across
   * planned chain upgrades
   */
  upgradedClientState: Any | undefined;
}

function createBaseIdentifiedClientState(): IdentifiedClientState {
  return { clientId: "", clientState: undefined };
}

export const IdentifiedClientState = {
  encode(message: IdentifiedClientState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    if (message.clientState !== undefined) {
      Any.encode(message.clientState, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IdentifiedClientState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIdentifiedClientState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clientId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.clientState = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IdentifiedClientState {
    return {
      clientId: isSet(object.clientId) ? String(object.clientId) : "",
      clientState: isSet(object.clientState) ? Any.fromJSON(object.clientState) : undefined,
    };
  },

  toJSON(message: IdentifiedClientState): unknown {
    const obj: any = {};
    if (message.clientId !== "") {
      obj.clientId = message.clientId;
    }
    if (message.clientState !== undefined) {
      obj.clientState = Any.toJSON(message.clientState);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IdentifiedClientState>, I>>(base?: I): IdentifiedClientState {
    return IdentifiedClientState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IdentifiedClientState>, I>>(object: I): IdentifiedClientState {
    const message = createBaseIdentifiedClientState();
    message.clientId = object.clientId ?? "";
    message.clientState = (object.clientState !== undefined && object.clientState !== null)
      ? Any.fromPartial(object.clientState)
      : undefined;
    return message;
  },
};

function createBaseConsensusStateWithHeight(): ConsensusStateWithHeight {
  return { height: undefined, consensusState: undefined };
}

export const ConsensusStateWithHeight = {
  encode(message: ConsensusStateWithHeight, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== undefined) {
      Height.encode(message.height, writer.uint32(10).fork()).ldelim();
    }
    if (message.consensusState !== undefined) {
      Any.encode(message.consensusState, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsensusStateWithHeight {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsensusStateWithHeight();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.height = Height.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.consensusState = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConsensusStateWithHeight {
    return {
      height: isSet(object.height) ? Height.fromJSON(object.height) : undefined,
      consensusState: isSet(object.consensusState) ? Any.fromJSON(object.consensusState) : undefined,
    };
  },

  toJSON(message: ConsensusStateWithHeight): unknown {
    const obj: any = {};
    if (message.height !== undefined) {
      obj.height = Height.toJSON(message.height);
    }
    if (message.consensusState !== undefined) {
      obj.consensusState = Any.toJSON(message.consensusState);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConsensusStateWithHeight>, I>>(base?: I): ConsensusStateWithHeight {
    return ConsensusStateWithHeight.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConsensusStateWithHeight>, I>>(object: I): ConsensusStateWithHeight {
    const message = createBaseConsensusStateWithHeight();
    message.height = (object.height !== undefined && object.height !== null)
      ? Height.fromPartial(object.height)
      : undefined;
    message.consensusState = (object.consensusState !== undefined && object.consensusState !== null)
      ? Any.fromPartial(object.consensusState)
      : undefined;
    return message;
  },
};

function createBaseClientConsensusStates(): ClientConsensusStates {
  return { clientId: "", consensusStates: [] };
}

export const ClientConsensusStates = {
  encode(message: ClientConsensusStates, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    for (const v of message.consensusStates) {
      ConsensusStateWithHeight.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClientConsensusStates {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClientConsensusStates();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clientId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.consensusStates.push(ConsensusStateWithHeight.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClientConsensusStates {
    return {
      clientId: isSet(object.clientId) ? String(object.clientId) : "",
      consensusStates: Array.isArray(object?.consensusStates)
        ? object.consensusStates.map((e: any) => ConsensusStateWithHeight.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ClientConsensusStates): unknown {
    const obj: any = {};
    if (message.clientId !== "") {
      obj.clientId = message.clientId;
    }
    if (message.consensusStates?.length) {
      obj.consensusStates = message.consensusStates.map((e) => ConsensusStateWithHeight.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClientConsensusStates>, I>>(base?: I): ClientConsensusStates {
    return ClientConsensusStates.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClientConsensusStates>, I>>(object: I): ClientConsensusStates {
    const message = createBaseClientConsensusStates();
    message.clientId = object.clientId ?? "";
    message.consensusStates = object.consensusStates?.map((e) => ConsensusStateWithHeight.fromPartial(e)) || [];
    return message;
  },
};

function createBaseHeight(): Height {
  return { revisionNumber: 0, revisionHeight: 0 };
}

export const Height = {
  encode(message: Height, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.revisionNumber !== 0) {
      writer.uint32(8).uint64(message.revisionNumber);
    }
    if (message.revisionHeight !== 0) {
      writer.uint32(16).uint64(message.revisionHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Height {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeight();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.revisionNumber = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.revisionHeight = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Height {
    return {
      revisionNumber: isSet(object.revisionNumber) ? Number(object.revisionNumber) : 0,
      revisionHeight: isSet(object.revisionHeight) ? Number(object.revisionHeight) : 0,
    };
  },

  toJSON(message: Height): unknown {
    const obj: any = {};
    if (message.revisionNumber !== 0) {
      obj.revisionNumber = Math.round(message.revisionNumber);
    }
    if (message.revisionHeight !== 0) {
      obj.revisionHeight = Math.round(message.revisionHeight);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Height>, I>>(base?: I): Height {
    return Height.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Height>, I>>(object: I): Height {
    const message = createBaseHeight();
    message.revisionNumber = object.revisionNumber ?? 0;
    message.revisionHeight = object.revisionHeight ?? 0;
    return message;
  },
};

function createBaseParams(): Params {
  return { allowedClients: [] };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.allowedClients) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
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

          message.allowedClients.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      allowedClients: Array.isArray(object?.allowedClients) ? object.allowedClients.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.allowedClients?.length) {
      obj.allowedClients = message.allowedClients;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.allowedClients = object.allowedClients?.map((e) => e) || [];
    return message;
  },
};

function createBaseClientUpdateProposal(): ClientUpdateProposal {
  return { title: "", description: "", subjectClientId: "", substituteClientId: "" };
}

export const ClientUpdateProposal = {
  encode(message: ClientUpdateProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.subjectClientId !== "") {
      writer.uint32(26).string(message.subjectClientId);
    }
    if (message.substituteClientId !== "") {
      writer.uint32(34).string(message.substituteClientId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClientUpdateProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClientUpdateProposal();
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
        case 3:
          if (tag !== 26) {
            break;
          }

          message.subjectClientId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.substituteClientId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClientUpdateProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      subjectClientId: isSet(object.subjectClientId) ? String(object.subjectClientId) : "",
      substituteClientId: isSet(object.substituteClientId) ? String(object.substituteClientId) : "",
    };
  },

  toJSON(message: ClientUpdateProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.subjectClientId !== "") {
      obj.subjectClientId = message.subjectClientId;
    }
    if (message.substituteClientId !== "") {
      obj.substituteClientId = message.substituteClientId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClientUpdateProposal>, I>>(base?: I): ClientUpdateProposal {
    return ClientUpdateProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClientUpdateProposal>, I>>(object: I): ClientUpdateProposal {
    const message = createBaseClientUpdateProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.subjectClientId = object.subjectClientId ?? "";
    message.substituteClientId = object.substituteClientId ?? "";
    return message;
  },
};

function createBaseUpgradeProposal(): UpgradeProposal {
  return { title: "", description: "", plan: undefined, upgradedClientState: undefined };
}

export const UpgradeProposal = {
  encode(message: UpgradeProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.plan !== undefined) {
      Plan.encode(message.plan, writer.uint32(26).fork()).ldelim();
    }
    if (message.upgradedClientState !== undefined) {
      Any.encode(message.upgradedClientState, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpgradeProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpgradeProposal();
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
        case 3:
          if (tag !== 26) {
            break;
          }

          message.plan = Plan.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.upgradedClientState = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpgradeProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      plan: isSet(object.plan) ? Plan.fromJSON(object.plan) : undefined,
      upgradedClientState: isSet(object.upgradedClientState) ? Any.fromJSON(object.upgradedClientState) : undefined,
    };
  },

  toJSON(message: UpgradeProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.plan !== undefined) {
      obj.plan = Plan.toJSON(message.plan);
    }
    if (message.upgradedClientState !== undefined) {
      obj.upgradedClientState = Any.toJSON(message.upgradedClientState);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpgradeProposal>, I>>(base?: I): UpgradeProposal {
    return UpgradeProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpgradeProposal>, I>>(object: I): UpgradeProposal {
    const message = createBaseUpgradeProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.plan = (object.plan !== undefined && object.plan !== null) ? Plan.fromPartial(object.plan) : undefined;
    message.upgradedClientState = (object.upgradedClientState !== undefined && object.upgradedClientState !== null)
      ? Any.fromPartial(object.upgradedClientState)
      : undefined;
    return message;
  },
};

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
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

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
