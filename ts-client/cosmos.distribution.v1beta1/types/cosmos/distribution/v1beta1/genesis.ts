/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { DecCoin } from "../../base/v1beta1/coin";
import {
  DelegatorStartingInfo,
  FeePool,
  Params,
  ValidatorAccumulatedCommission,
  ValidatorCurrentRewards,
  ValidatorHistoricalRewards,
  ValidatorSlashEvent,
} from "./distribution";

export const protobufPackage = "cosmos.distribution.v1beta1";

/**
 * DelegatorWithdrawInfo is the address for where distributions rewards are
 * withdrawn to by default this struct is only used at genesis to feed in
 * default withdraw addresses.
 */
export interface DelegatorWithdrawInfo {
  /** delegator_address is the address of the delegator. */
  delegatorAddress: string;
  /** withdraw_address is the address to withdraw the delegation rewards to. */
  withdrawAddress: string;
}

/** ValidatorOutstandingRewardsRecord is used for import/export via genesis json. */
export interface ValidatorOutstandingRewardsRecord {
  /** validator_address is the address of the validator. */
  validatorAddress: string;
  /** outstanding_rewards represents the outstanding rewards of a validator. */
  outstandingRewards: DecCoin[];
}

/**
 * ValidatorAccumulatedCommissionRecord is used for import / export via genesis
 * json.
 */
export interface ValidatorAccumulatedCommissionRecord {
  /** validator_address is the address of the validator. */
  validatorAddress: string;
  /** accumulated is the accumulated commission of a validator. */
  accumulated: ValidatorAccumulatedCommission | undefined;
}

/**
 * ValidatorHistoricalRewardsRecord is used for import / export via genesis
 * json.
 */
export interface ValidatorHistoricalRewardsRecord {
  /** validator_address is the address of the validator. */
  validatorAddress: string;
  /** period defines the period the historical rewards apply to. */
  period: number;
  /** rewards defines the historical rewards of a validator. */
  rewards: ValidatorHistoricalRewards | undefined;
}

/** ValidatorCurrentRewardsRecord is used for import / export via genesis json. */
export interface ValidatorCurrentRewardsRecord {
  /** validator_address is the address of the validator. */
  validatorAddress: string;
  /** rewards defines the current rewards of a validator. */
  rewards: ValidatorCurrentRewards | undefined;
}

/** DelegatorStartingInfoRecord used for import / export via genesis json. */
export interface DelegatorStartingInfoRecord {
  /** delegator_address is the address of the delegator. */
  delegatorAddress: string;
  /** validator_address is the address of the validator. */
  validatorAddress: string;
  /** starting_info defines the starting info of a delegator. */
  startingInfo: DelegatorStartingInfo | undefined;
}

/** ValidatorSlashEventRecord is used for import / export via genesis json. */
export interface ValidatorSlashEventRecord {
  /** validator_address is the address of the validator. */
  validatorAddress: string;
  /** height defines the block height at which the slash event occurred. */
  height: number;
  /** period is the period of the slash event. */
  period: number;
  /** validator_slash_event describes the slash event. */
  validatorSlashEvent: ValidatorSlashEvent | undefined;
}

/** GenesisState defines the distribution module's genesis state. */
export interface GenesisState {
  /** params defines all the parameters of the module. */
  params:
    | Params
    | undefined;
  /** fee_pool defines the fee pool at genesis. */
  feePool:
    | FeePool
    | undefined;
  /** fee_pool defines the delegator withdraw infos at genesis. */
  delegatorWithdrawInfos: DelegatorWithdrawInfo[];
  /** fee_pool defines the previous proposer at genesis. */
  previousProposer: string;
  /** fee_pool defines the outstanding rewards of all validators at genesis. */
  outstandingRewards: ValidatorOutstandingRewardsRecord[];
  /** fee_pool defines the accumulated commissions of all validators at genesis. */
  validatorAccumulatedCommissions: ValidatorAccumulatedCommissionRecord[];
  /** fee_pool defines the historical rewards of all validators at genesis. */
  validatorHistoricalRewards: ValidatorHistoricalRewardsRecord[];
  /** fee_pool defines the current rewards of all validators at genesis. */
  validatorCurrentRewards: ValidatorCurrentRewardsRecord[];
  /** fee_pool defines the delegator starting infos at genesis. */
  delegatorStartingInfos: DelegatorStartingInfoRecord[];
  /** fee_pool defines the validator slash events at genesis. */
  validatorSlashEvents: ValidatorSlashEventRecord[];
}

function createBaseDelegatorWithdrawInfo(): DelegatorWithdrawInfo {
  return { delegatorAddress: "", withdrawAddress: "" };
}

export const DelegatorWithdrawInfo = {
  encode(message: DelegatorWithdrawInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.withdrawAddress !== "") {
      writer.uint32(18).string(message.withdrawAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DelegatorWithdrawInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegatorWithdrawInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.delegatorAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.withdrawAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DelegatorWithdrawInfo {
    return {
      delegatorAddress: isSet(object.delegatorAddress) ? String(object.delegatorAddress) : "",
      withdrawAddress: isSet(object.withdrawAddress) ? String(object.withdrawAddress) : "",
    };
  },

  toJSON(message: DelegatorWithdrawInfo): unknown {
    const obj: any = {};
    if (message.delegatorAddress !== "") {
      obj.delegatorAddress = message.delegatorAddress;
    }
    if (message.withdrawAddress !== "") {
      obj.withdrawAddress = message.withdrawAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DelegatorWithdrawInfo>, I>>(base?: I): DelegatorWithdrawInfo {
    return DelegatorWithdrawInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DelegatorWithdrawInfo>, I>>(object: I): DelegatorWithdrawInfo {
    const message = createBaseDelegatorWithdrawInfo();
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.withdrawAddress = object.withdrawAddress ?? "";
    return message;
  },
};

function createBaseValidatorOutstandingRewardsRecord(): ValidatorOutstandingRewardsRecord {
  return { validatorAddress: "", outstandingRewards: [] };
}

export const ValidatorOutstandingRewardsRecord = {
  encode(message: ValidatorOutstandingRewardsRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    for (const v of message.outstandingRewards) {
      DecCoin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorOutstandingRewardsRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorOutstandingRewardsRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validatorAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.outstandingRewards.push(DecCoin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatorOutstandingRewardsRecord {
    return {
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
      outstandingRewards: Array.isArray(object?.outstandingRewards)
        ? object.outstandingRewards.map((e: any) => DecCoin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ValidatorOutstandingRewardsRecord): unknown {
    const obj: any = {};
    if (message.validatorAddress !== "") {
      obj.validatorAddress = message.validatorAddress;
    }
    if (message.outstandingRewards?.length) {
      obj.outstandingRewards = message.outstandingRewards.map((e) => DecCoin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatorOutstandingRewardsRecord>, I>>(
    base?: I,
  ): ValidatorOutstandingRewardsRecord {
    return ValidatorOutstandingRewardsRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatorOutstandingRewardsRecord>, I>>(
    object: I,
  ): ValidatorOutstandingRewardsRecord {
    const message = createBaseValidatorOutstandingRewardsRecord();
    message.validatorAddress = object.validatorAddress ?? "";
    message.outstandingRewards = object.outstandingRewards?.map((e) => DecCoin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseValidatorAccumulatedCommissionRecord(): ValidatorAccumulatedCommissionRecord {
  return { validatorAddress: "", accumulated: undefined };
}

export const ValidatorAccumulatedCommissionRecord = {
  encode(message: ValidatorAccumulatedCommissionRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (message.accumulated !== undefined) {
      ValidatorAccumulatedCommission.encode(message.accumulated, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorAccumulatedCommissionRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorAccumulatedCommissionRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validatorAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.accumulated = ValidatorAccumulatedCommission.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatorAccumulatedCommissionRecord {
    return {
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
      accumulated: isSet(object.accumulated) ? ValidatorAccumulatedCommission.fromJSON(object.accumulated) : undefined,
    };
  },

  toJSON(message: ValidatorAccumulatedCommissionRecord): unknown {
    const obj: any = {};
    if (message.validatorAddress !== "") {
      obj.validatorAddress = message.validatorAddress;
    }
    if (message.accumulated !== undefined) {
      obj.accumulated = ValidatorAccumulatedCommission.toJSON(message.accumulated);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatorAccumulatedCommissionRecord>, I>>(
    base?: I,
  ): ValidatorAccumulatedCommissionRecord {
    return ValidatorAccumulatedCommissionRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatorAccumulatedCommissionRecord>, I>>(
    object: I,
  ): ValidatorAccumulatedCommissionRecord {
    const message = createBaseValidatorAccumulatedCommissionRecord();
    message.validatorAddress = object.validatorAddress ?? "";
    message.accumulated = (object.accumulated !== undefined && object.accumulated !== null)
      ? ValidatorAccumulatedCommission.fromPartial(object.accumulated)
      : undefined;
    return message;
  },
};

function createBaseValidatorHistoricalRewardsRecord(): ValidatorHistoricalRewardsRecord {
  return { validatorAddress: "", period: 0, rewards: undefined };
}

export const ValidatorHistoricalRewardsRecord = {
  encode(message: ValidatorHistoricalRewardsRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (message.period !== 0) {
      writer.uint32(16).uint64(message.period);
    }
    if (message.rewards !== undefined) {
      ValidatorHistoricalRewards.encode(message.rewards, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorHistoricalRewardsRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorHistoricalRewardsRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validatorAddress = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.period = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.rewards = ValidatorHistoricalRewards.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatorHistoricalRewardsRecord {
    return {
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
      period: isSet(object.period) ? Number(object.period) : 0,
      rewards: isSet(object.rewards) ? ValidatorHistoricalRewards.fromJSON(object.rewards) : undefined,
    };
  },

  toJSON(message: ValidatorHistoricalRewardsRecord): unknown {
    const obj: any = {};
    if (message.validatorAddress !== "") {
      obj.validatorAddress = message.validatorAddress;
    }
    if (message.period !== 0) {
      obj.period = Math.round(message.period);
    }
    if (message.rewards !== undefined) {
      obj.rewards = ValidatorHistoricalRewards.toJSON(message.rewards);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatorHistoricalRewardsRecord>, I>>(
    base?: I,
  ): ValidatorHistoricalRewardsRecord {
    return ValidatorHistoricalRewardsRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatorHistoricalRewardsRecord>, I>>(
    object: I,
  ): ValidatorHistoricalRewardsRecord {
    const message = createBaseValidatorHistoricalRewardsRecord();
    message.validatorAddress = object.validatorAddress ?? "";
    message.period = object.period ?? 0;
    message.rewards = (object.rewards !== undefined && object.rewards !== null)
      ? ValidatorHistoricalRewards.fromPartial(object.rewards)
      : undefined;
    return message;
  },
};

function createBaseValidatorCurrentRewardsRecord(): ValidatorCurrentRewardsRecord {
  return { validatorAddress: "", rewards: undefined };
}

export const ValidatorCurrentRewardsRecord = {
  encode(message: ValidatorCurrentRewardsRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (message.rewards !== undefined) {
      ValidatorCurrentRewards.encode(message.rewards, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorCurrentRewardsRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorCurrentRewardsRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validatorAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.rewards = ValidatorCurrentRewards.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatorCurrentRewardsRecord {
    return {
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
      rewards: isSet(object.rewards) ? ValidatorCurrentRewards.fromJSON(object.rewards) : undefined,
    };
  },

  toJSON(message: ValidatorCurrentRewardsRecord): unknown {
    const obj: any = {};
    if (message.validatorAddress !== "") {
      obj.validatorAddress = message.validatorAddress;
    }
    if (message.rewards !== undefined) {
      obj.rewards = ValidatorCurrentRewards.toJSON(message.rewards);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatorCurrentRewardsRecord>, I>>(base?: I): ValidatorCurrentRewardsRecord {
    return ValidatorCurrentRewardsRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatorCurrentRewardsRecord>, I>>(
    object: I,
  ): ValidatorCurrentRewardsRecord {
    const message = createBaseValidatorCurrentRewardsRecord();
    message.validatorAddress = object.validatorAddress ?? "";
    message.rewards = (object.rewards !== undefined && object.rewards !== null)
      ? ValidatorCurrentRewards.fromPartial(object.rewards)
      : undefined;
    return message;
  },
};

function createBaseDelegatorStartingInfoRecord(): DelegatorStartingInfoRecord {
  return { delegatorAddress: "", validatorAddress: "", startingInfo: undefined };
}

export const DelegatorStartingInfoRecord = {
  encode(message: DelegatorStartingInfoRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    if (message.startingInfo !== undefined) {
      DelegatorStartingInfo.encode(message.startingInfo, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DelegatorStartingInfoRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegatorStartingInfoRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.delegatorAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.validatorAddress = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.startingInfo = DelegatorStartingInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DelegatorStartingInfoRecord {
    return {
      delegatorAddress: isSet(object.delegatorAddress) ? String(object.delegatorAddress) : "",
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
      startingInfo: isSet(object.startingInfo) ? DelegatorStartingInfo.fromJSON(object.startingInfo) : undefined,
    };
  },

  toJSON(message: DelegatorStartingInfoRecord): unknown {
    const obj: any = {};
    if (message.delegatorAddress !== "") {
      obj.delegatorAddress = message.delegatorAddress;
    }
    if (message.validatorAddress !== "") {
      obj.validatorAddress = message.validatorAddress;
    }
    if (message.startingInfo !== undefined) {
      obj.startingInfo = DelegatorStartingInfo.toJSON(message.startingInfo);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DelegatorStartingInfoRecord>, I>>(base?: I): DelegatorStartingInfoRecord {
    return DelegatorStartingInfoRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DelegatorStartingInfoRecord>, I>>(object: I): DelegatorStartingInfoRecord {
    const message = createBaseDelegatorStartingInfoRecord();
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    message.startingInfo = (object.startingInfo !== undefined && object.startingInfo !== null)
      ? DelegatorStartingInfo.fromPartial(object.startingInfo)
      : undefined;
    return message;
  },
};

function createBaseValidatorSlashEventRecord(): ValidatorSlashEventRecord {
  return { validatorAddress: "", height: 0, period: 0, validatorSlashEvent: undefined };
}

export const ValidatorSlashEventRecord = {
  encode(message: ValidatorSlashEventRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (message.height !== 0) {
      writer.uint32(16).uint64(message.height);
    }
    if (message.period !== 0) {
      writer.uint32(24).uint64(message.period);
    }
    if (message.validatorSlashEvent !== undefined) {
      ValidatorSlashEvent.encode(message.validatorSlashEvent, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorSlashEventRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorSlashEventRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validatorAddress = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.height = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.period = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.validatorSlashEvent = ValidatorSlashEvent.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatorSlashEventRecord {
    return {
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
      height: isSet(object.height) ? Number(object.height) : 0,
      period: isSet(object.period) ? Number(object.period) : 0,
      validatorSlashEvent: isSet(object.validatorSlashEvent)
        ? ValidatorSlashEvent.fromJSON(object.validatorSlashEvent)
        : undefined,
    };
  },

  toJSON(message: ValidatorSlashEventRecord): unknown {
    const obj: any = {};
    if (message.validatorAddress !== "") {
      obj.validatorAddress = message.validatorAddress;
    }
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.period !== 0) {
      obj.period = Math.round(message.period);
    }
    if (message.validatorSlashEvent !== undefined) {
      obj.validatorSlashEvent = ValidatorSlashEvent.toJSON(message.validatorSlashEvent);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatorSlashEventRecord>, I>>(base?: I): ValidatorSlashEventRecord {
    return ValidatorSlashEventRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatorSlashEventRecord>, I>>(object: I): ValidatorSlashEventRecord {
    const message = createBaseValidatorSlashEventRecord();
    message.validatorAddress = object.validatorAddress ?? "";
    message.height = object.height ?? 0;
    message.period = object.period ?? 0;
    message.validatorSlashEvent = (object.validatorSlashEvent !== undefined && object.validatorSlashEvent !== null)
      ? ValidatorSlashEvent.fromPartial(object.validatorSlashEvent)
      : undefined;
    return message;
  },
};

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    feePool: undefined,
    delegatorWithdrawInfos: [],
    previousProposer: "",
    outstandingRewards: [],
    validatorAccumulatedCommissions: [],
    validatorHistoricalRewards: [],
    validatorCurrentRewards: [],
    delegatorStartingInfos: [],
    validatorSlashEvents: [],
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.feePool !== undefined) {
      FeePool.encode(message.feePool, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.delegatorWithdrawInfos) {
      DelegatorWithdrawInfo.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.previousProposer !== "") {
      writer.uint32(34).string(message.previousProposer);
    }
    for (const v of message.outstandingRewards) {
      ValidatorOutstandingRewardsRecord.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.validatorAccumulatedCommissions) {
      ValidatorAccumulatedCommissionRecord.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.validatorHistoricalRewards) {
      ValidatorHistoricalRewardsRecord.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.validatorCurrentRewards) {
      ValidatorCurrentRewardsRecord.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.delegatorStartingInfos) {
      DelegatorStartingInfoRecord.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.validatorSlashEvents) {
      ValidatorSlashEventRecord.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.feePool = FeePool.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.delegatorWithdrawInfos.push(DelegatorWithdrawInfo.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.previousProposer = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.outstandingRewards.push(ValidatorOutstandingRewardsRecord.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.validatorAccumulatedCommissions.push(
            ValidatorAccumulatedCommissionRecord.decode(reader, reader.uint32()),
          );
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.validatorHistoricalRewards.push(ValidatorHistoricalRewardsRecord.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.validatorCurrentRewards.push(ValidatorCurrentRewardsRecord.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.delegatorStartingInfos.push(DelegatorStartingInfoRecord.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.validatorSlashEvents.push(ValidatorSlashEventRecord.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      feePool: isSet(object.feePool) ? FeePool.fromJSON(object.feePool) : undefined,
      delegatorWithdrawInfos: Array.isArray(object?.delegatorWithdrawInfos)
        ? object.delegatorWithdrawInfos.map((e: any) => DelegatorWithdrawInfo.fromJSON(e))
        : [],
      previousProposer: isSet(object.previousProposer) ? String(object.previousProposer) : "",
      outstandingRewards: Array.isArray(object?.outstandingRewards)
        ? object.outstandingRewards.map((e: any) => ValidatorOutstandingRewardsRecord.fromJSON(e))
        : [],
      validatorAccumulatedCommissions: Array.isArray(object?.validatorAccumulatedCommissions)
        ? object.validatorAccumulatedCommissions.map((e: any) => ValidatorAccumulatedCommissionRecord.fromJSON(e))
        : [],
      validatorHistoricalRewards: Array.isArray(object?.validatorHistoricalRewards)
        ? object.validatorHistoricalRewards.map((e: any) => ValidatorHistoricalRewardsRecord.fromJSON(e))
        : [],
      validatorCurrentRewards: Array.isArray(object?.validatorCurrentRewards)
        ? object.validatorCurrentRewards.map((e: any) => ValidatorCurrentRewardsRecord.fromJSON(e))
        : [],
      delegatorStartingInfos: Array.isArray(object?.delegatorStartingInfos)
        ? object.delegatorStartingInfos.map((e: any) => DelegatorStartingInfoRecord.fromJSON(e))
        : [],
      validatorSlashEvents: Array.isArray(object?.validatorSlashEvents)
        ? object.validatorSlashEvents.map((e: any) => ValidatorSlashEventRecord.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.feePool !== undefined) {
      obj.feePool = FeePool.toJSON(message.feePool);
    }
    if (message.delegatorWithdrawInfos?.length) {
      obj.delegatorWithdrawInfos = message.delegatorWithdrawInfos.map((e) => DelegatorWithdrawInfo.toJSON(e));
    }
    if (message.previousProposer !== "") {
      obj.previousProposer = message.previousProposer;
    }
    if (message.outstandingRewards?.length) {
      obj.outstandingRewards = message.outstandingRewards.map((e) => ValidatorOutstandingRewardsRecord.toJSON(e));
    }
    if (message.validatorAccumulatedCommissions?.length) {
      obj.validatorAccumulatedCommissions = message.validatorAccumulatedCommissions.map((e) =>
        ValidatorAccumulatedCommissionRecord.toJSON(e)
      );
    }
    if (message.validatorHistoricalRewards?.length) {
      obj.validatorHistoricalRewards = message.validatorHistoricalRewards.map((e) =>
        ValidatorHistoricalRewardsRecord.toJSON(e)
      );
    }
    if (message.validatorCurrentRewards?.length) {
      obj.validatorCurrentRewards = message.validatorCurrentRewards.map((e) => ValidatorCurrentRewardsRecord.toJSON(e));
    }
    if (message.delegatorStartingInfos?.length) {
      obj.delegatorStartingInfos = message.delegatorStartingInfos.map((e) => DelegatorStartingInfoRecord.toJSON(e));
    }
    if (message.validatorSlashEvents?.length) {
      obj.validatorSlashEvents = message.validatorSlashEvents.map((e) => ValidatorSlashEventRecord.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.feePool = (object.feePool !== undefined && object.feePool !== null)
      ? FeePool.fromPartial(object.feePool)
      : undefined;
    message.delegatorWithdrawInfos = object.delegatorWithdrawInfos?.map((e) => DelegatorWithdrawInfo.fromPartial(e)) ||
      [];
    message.previousProposer = object.previousProposer ?? "";
    message.outstandingRewards =
      object.outstandingRewards?.map((e) => ValidatorOutstandingRewardsRecord.fromPartial(e)) || [];
    message.validatorAccumulatedCommissions =
      object.validatorAccumulatedCommissions?.map((e) => ValidatorAccumulatedCommissionRecord.fromPartial(e)) || [];
    message.validatorHistoricalRewards =
      object.validatorHistoricalRewards?.map((e) => ValidatorHistoricalRewardsRecord.fromPartial(e)) || [];
    message.validatorCurrentRewards =
      object.validatorCurrentRewards?.map((e) => ValidatorCurrentRewardsRecord.fromPartial(e)) || [];
    message.delegatorStartingInfos =
      object.delegatorStartingInfos?.map((e) => DelegatorStartingInfoRecord.fromPartial(e)) || [];
    message.validatorSlashEvents = object.validatorSlashEvents?.map((e) => ValidatorSlashEventRecord.fromPartial(e)) ||
      [];
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
