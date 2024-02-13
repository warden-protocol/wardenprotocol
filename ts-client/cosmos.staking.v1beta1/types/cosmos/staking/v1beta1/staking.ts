/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Duration } from "../../../google/protobuf/duration";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { ValidatorUpdate } from "../../../tendermint/abci/types";
import { Header } from "../../../tendermint/types/types";
import { Coin } from "../../base/v1beta1/coin";

export const protobufPackage = "cosmos.staking.v1beta1";

/** BondStatus is the status of a validator. */
export enum BondStatus {
  /** BOND_STATUS_UNSPECIFIED - UNSPECIFIED defines an invalid validator status. */
  BOND_STATUS_UNSPECIFIED = 0,
  /** BOND_STATUS_UNBONDED - UNBONDED defines a validator that is not bonded. */
  BOND_STATUS_UNBONDED = 1,
  /** BOND_STATUS_UNBONDING - UNBONDING defines a validator that is unbonding. */
  BOND_STATUS_UNBONDING = 2,
  /** BOND_STATUS_BONDED - BONDED defines a validator that is bonded. */
  BOND_STATUS_BONDED = 3,
  UNRECOGNIZED = -1,
}

export function bondStatusFromJSON(object: any): BondStatus {
  switch (object) {
    case 0:
    case "BOND_STATUS_UNSPECIFIED":
      return BondStatus.BOND_STATUS_UNSPECIFIED;
    case 1:
    case "BOND_STATUS_UNBONDED":
      return BondStatus.BOND_STATUS_UNBONDED;
    case 2:
    case "BOND_STATUS_UNBONDING":
      return BondStatus.BOND_STATUS_UNBONDING;
    case 3:
    case "BOND_STATUS_BONDED":
      return BondStatus.BOND_STATUS_BONDED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BondStatus.UNRECOGNIZED;
  }
}

export function bondStatusToJSON(object: BondStatus): string {
  switch (object) {
    case BondStatus.BOND_STATUS_UNSPECIFIED:
      return "BOND_STATUS_UNSPECIFIED";
    case BondStatus.BOND_STATUS_UNBONDED:
      return "BOND_STATUS_UNBONDED";
    case BondStatus.BOND_STATUS_UNBONDING:
      return "BOND_STATUS_UNBONDING";
    case BondStatus.BOND_STATUS_BONDED:
      return "BOND_STATUS_BONDED";
    case BondStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Infraction indicates the infraction a validator commited. */
export enum Infraction {
  /** INFRACTION_UNSPECIFIED - UNSPECIFIED defines an empty infraction. */
  INFRACTION_UNSPECIFIED = 0,
  /** INFRACTION_DOUBLE_SIGN - DOUBLE_SIGN defines a validator that double-signs a block. */
  INFRACTION_DOUBLE_SIGN = 1,
  /** INFRACTION_DOWNTIME - DOWNTIME defines a validator that missed signing too many blocks. */
  INFRACTION_DOWNTIME = 2,
  UNRECOGNIZED = -1,
}

export function infractionFromJSON(object: any): Infraction {
  switch (object) {
    case 0:
    case "INFRACTION_UNSPECIFIED":
      return Infraction.INFRACTION_UNSPECIFIED;
    case 1:
    case "INFRACTION_DOUBLE_SIGN":
      return Infraction.INFRACTION_DOUBLE_SIGN;
    case 2:
    case "INFRACTION_DOWNTIME":
      return Infraction.INFRACTION_DOWNTIME;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Infraction.UNRECOGNIZED;
  }
}

export function infractionToJSON(object: Infraction): string {
  switch (object) {
    case Infraction.INFRACTION_UNSPECIFIED:
      return "INFRACTION_UNSPECIFIED";
    case Infraction.INFRACTION_DOUBLE_SIGN:
      return "INFRACTION_DOUBLE_SIGN";
    case Infraction.INFRACTION_DOWNTIME:
      return "INFRACTION_DOWNTIME";
    case Infraction.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * HistoricalInfo contains header and validator information for a given block.
 * It is stored as part of staking module's state, which persists the `n` most
 * recent HistoricalInfo
 * (`n` is set by the staking module's `historical_entries` parameter).
 */
export interface HistoricalInfo {
  header: Header | undefined;
  valset: Validator[];
}

/**
 * CommissionRates defines the initial commission rates to be used for creating
 * a validator.
 */
export interface CommissionRates {
  /** rate is the commission rate charged to delegators, as a fraction. */
  rate: string;
  /** max_rate defines the maximum commission rate which validator can ever charge, as a fraction. */
  maxRate: string;
  /** max_change_rate defines the maximum daily increase of the validator commission, as a fraction. */
  maxChangeRate: string;
}

/** Commission defines commission parameters for a given validator. */
export interface Commission {
  /** commission_rates defines the initial commission rates to be used for creating a validator. */
  commissionRates:
    | CommissionRates
    | undefined;
  /** update_time is the last time the commission rate was changed. */
  updateTime: Date | undefined;
}

/** Description defines a validator description. */
export interface Description {
  /** moniker defines a human-readable name for the validator. */
  moniker: string;
  /** identity defines an optional identity signature (ex. UPort or Keybase). */
  identity: string;
  /** website defines an optional website link. */
  website: string;
  /** security_contact defines an optional email for security contact. */
  securityContact: string;
  /** details define other optional details. */
  details: string;
}

/**
 * Validator defines a validator, together with the total amount of the
 * Validator's bond shares and their exchange rate to coins. Slashing results in
 * a decrease in the exchange rate, allowing correct calculation of future
 * undelegations without iterating over delegators. When coins are delegated to
 * this validator, the validator is credited with a delegation whose number of
 * bond shares is based on the amount of coins delegated divided by the current
 * exchange rate. Voting power can be calculated as total bonded shares
 * multiplied by exchange rate.
 */
export interface Validator {
  /** operator_address defines the address of the validator's operator; bech encoded in JSON. */
  operatorAddress: string;
  /** consensus_pubkey is the consensus public key of the validator, as a Protobuf Any. */
  consensusPubkey:
    | Any
    | undefined;
  /** jailed defined whether the validator has been jailed from bonded status or not. */
  jailed: boolean;
  /** status is the validator status (bonded/unbonding/unbonded). */
  status: BondStatus;
  /** tokens define the delegated tokens (incl. self-delegation). */
  tokens: string;
  /** delegator_shares defines total shares issued to a validator's delegators. */
  delegatorShares: string;
  /** description defines the description terms for the validator. */
  description:
    | Description
    | undefined;
  /** unbonding_height defines, if unbonding, the height at which this validator has begun unbonding. */
  unbondingHeight: number;
  /** unbonding_time defines, if unbonding, the min time for the validator to complete unbonding. */
  unbondingTime:
    | Date
    | undefined;
  /** commission defines the commission parameters. */
  commission:
    | Commission
    | undefined;
  /**
   * min_self_delegation is the validator's self declared minimum self delegation.
   *
   * Since: cosmos-sdk 0.46
   */
  minSelfDelegation: string;
  /** strictly positive if this validator's unbonding has been stopped by external modules */
  unbondingOnHoldRefCount: number;
  /** list of unbonding ids, each uniquely identifing an unbonding of this validator */
  unbondingIds: number[];
}

/** ValAddresses defines a repeated set of validator addresses. */
export interface ValAddresses {
  addresses: string[];
}

/**
 * DVPair is struct that just has a delegator-validator pair with no other data.
 * It is intended to be used as a marshalable pointer. For example, a DVPair can
 * be used to construct the key to getting an UnbondingDelegation from state.
 */
export interface DVPair {
  delegatorAddress: string;
  validatorAddress: string;
}

/** DVPairs defines an array of DVPair objects. */
export interface DVPairs {
  pairs: DVPair[];
}

/**
 * DVVTriplet is struct that just has a delegator-validator-validator triplet
 * with no other data. It is intended to be used as a marshalable pointer. For
 * example, a DVVTriplet can be used to construct the key to getting a
 * Redelegation from state.
 */
export interface DVVTriplet {
  delegatorAddress: string;
  validatorSrcAddress: string;
  validatorDstAddress: string;
}

/** DVVTriplets defines an array of DVVTriplet objects. */
export interface DVVTriplets {
  triplets: DVVTriplet[];
}

/**
 * Delegation represents the bond with tokens held by an account. It is
 * owned by one delegator, and is associated with the voting power of one
 * validator.
 */
export interface Delegation {
  /** delegator_address is the encoded address of the delegator. */
  delegatorAddress: string;
  /** validator_address is the encoded address of the validator. */
  validatorAddress: string;
  /** shares define the delegation shares received. */
  shares: string;
}

/**
 * UnbondingDelegation stores all of a single delegator's unbonding bonds
 * for a single validator in an time-ordered list.
 */
export interface UnbondingDelegation {
  /** delegator_address is the encoded address of the delegator. */
  delegatorAddress: string;
  /** validator_address is the encoded address of the validator. */
  validatorAddress: string;
  /** entries are the unbonding delegation entries. */
  entries: UnbondingDelegationEntry[];
}

/** UnbondingDelegationEntry defines an unbonding object with relevant metadata. */
export interface UnbondingDelegationEntry {
  /** creation_height is the height which the unbonding took place. */
  creationHeight: number;
  /** completion_time is the unix time for unbonding completion. */
  completionTime:
    | Date
    | undefined;
  /** initial_balance defines the tokens initially scheduled to receive at completion. */
  initialBalance: string;
  /** balance defines the tokens to receive at completion. */
  balance: string;
  /** Incrementing id that uniquely identifies this entry */
  unbondingId: number;
  /** Strictly positive if this entry's unbonding has been stopped by external modules */
  unbondingOnHoldRefCount: number;
}

/** RedelegationEntry defines a redelegation object with relevant metadata. */
export interface RedelegationEntry {
  /** creation_height  defines the height which the redelegation took place. */
  creationHeight: number;
  /** completion_time defines the unix time for redelegation completion. */
  completionTime:
    | Date
    | undefined;
  /** initial_balance defines the initial balance when redelegation started. */
  initialBalance: string;
  /** shares_dst is the amount of destination-validator shares created by redelegation. */
  sharesDst: string;
  /** Incrementing id that uniquely identifies this entry */
  unbondingId: number;
  /** Strictly positive if this entry's unbonding has been stopped by external modules */
  unbondingOnHoldRefCount: number;
}

/**
 * Redelegation contains the list of a particular delegator's redelegating bonds
 * from a particular source validator to a particular destination validator.
 */
export interface Redelegation {
  /** delegator_address is the bech32-encoded address of the delegator. */
  delegatorAddress: string;
  /** validator_src_address is the validator redelegation source operator address. */
  validatorSrcAddress: string;
  /** validator_dst_address is the validator redelegation destination operator address. */
  validatorDstAddress: string;
  /** entries are the redelegation entries. */
  entries: RedelegationEntry[];
}

/** Params defines the parameters for the x/staking module. */
export interface Params {
  /** unbonding_time is the time duration of unbonding. */
  unbondingTime:
    | Duration
    | undefined;
  /** max_validators is the maximum number of validators. */
  maxValidators: number;
  /** max_entries is the max entries for either unbonding delegation or redelegation (per pair/trio). */
  maxEntries: number;
  /** historical_entries is the number of historical entries to persist. */
  historicalEntries: number;
  /** bond_denom defines the bondable coin denomination. */
  bondDenom: string;
  /** min_commission_rate is the chain-wide minimum commission rate that a validator can charge their delegators */
  minCommissionRate: string;
}

/**
 * DelegationResponse is equivalent to Delegation except that it contains a
 * balance in addition to shares which is more suitable for client responses.
 */
export interface DelegationResponse {
  delegation: Delegation | undefined;
  balance: Coin | undefined;
}

/**
 * RedelegationEntryResponse is equivalent to a RedelegationEntry except that it
 * contains a balance in addition to shares which is more suitable for client
 * responses.
 */
export interface RedelegationEntryResponse {
  redelegationEntry: RedelegationEntry | undefined;
  balance: string;
}

/**
 * RedelegationResponse is equivalent to a Redelegation except that its entries
 * contain a balance in addition to shares which is more suitable for client
 * responses.
 */
export interface RedelegationResponse {
  redelegation: Redelegation | undefined;
  entries: RedelegationEntryResponse[];
}

/**
 * Pool is used for tracking bonded and not-bonded token supply of the bond
 * denomination.
 */
export interface Pool {
  notBondedTokens: string;
  bondedTokens: string;
}

/**
 * ValidatorUpdates defines an array of abci.ValidatorUpdate objects.
 * TODO: explore moving this to proto/cosmos/base to separate modules from tendermint dependence
 */
export interface ValidatorUpdates {
  updates: ValidatorUpdate[];
}

function createBaseHistoricalInfo(): HistoricalInfo {
  return { header: undefined, valset: [] };
}

export const HistoricalInfo = {
  encode(message: HistoricalInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.header !== undefined) {
      Header.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.valset) {
      Validator.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HistoricalInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHistoricalInfo();
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

          message.valset.push(Validator.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HistoricalInfo {
    return {
      header: isSet(object.header) ? Header.fromJSON(object.header) : undefined,
      valset: Array.isArray(object?.valset) ? object.valset.map((e: any) => Validator.fromJSON(e)) : [],
    };
  },

  toJSON(message: HistoricalInfo): unknown {
    const obj: any = {};
    if (message.header !== undefined) {
      obj.header = Header.toJSON(message.header);
    }
    if (message.valset?.length) {
      obj.valset = message.valset.map((e) => Validator.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HistoricalInfo>, I>>(base?: I): HistoricalInfo {
    return HistoricalInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HistoricalInfo>, I>>(object: I): HistoricalInfo {
    const message = createBaseHistoricalInfo();
    message.header = (object.header !== undefined && object.header !== null)
      ? Header.fromPartial(object.header)
      : undefined;
    message.valset = object.valset?.map((e) => Validator.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCommissionRates(): CommissionRates {
  return { rate: "", maxRate: "", maxChangeRate: "" };
}

export const CommissionRates = {
  encode(message: CommissionRates, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rate !== "") {
      writer.uint32(10).string(message.rate);
    }
    if (message.maxRate !== "") {
      writer.uint32(18).string(message.maxRate);
    }
    if (message.maxChangeRate !== "") {
      writer.uint32(26).string(message.maxChangeRate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommissionRates {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommissionRates();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rate = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.maxRate = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.maxChangeRate = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommissionRates {
    return {
      rate: isSet(object.rate) ? String(object.rate) : "",
      maxRate: isSet(object.maxRate) ? String(object.maxRate) : "",
      maxChangeRate: isSet(object.maxChangeRate) ? String(object.maxChangeRate) : "",
    };
  },

  toJSON(message: CommissionRates): unknown {
    const obj: any = {};
    if (message.rate !== "") {
      obj.rate = message.rate;
    }
    if (message.maxRate !== "") {
      obj.maxRate = message.maxRate;
    }
    if (message.maxChangeRate !== "") {
      obj.maxChangeRate = message.maxChangeRate;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CommissionRates>, I>>(base?: I): CommissionRates {
    return CommissionRates.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CommissionRates>, I>>(object: I): CommissionRates {
    const message = createBaseCommissionRates();
    message.rate = object.rate ?? "";
    message.maxRate = object.maxRate ?? "";
    message.maxChangeRate = object.maxChangeRate ?? "";
    return message;
  },
};

function createBaseCommission(): Commission {
  return { commissionRates: undefined, updateTime: undefined };
}

export const Commission = {
  encode(message: Commission, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.commissionRates !== undefined) {
      CommissionRates.encode(message.commissionRates, writer.uint32(10).fork()).ldelim();
    }
    if (message.updateTime !== undefined) {
      Timestamp.encode(toTimestamp(message.updateTime), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Commission {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommission();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.commissionRates = CommissionRates.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.updateTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Commission {
    return {
      commissionRates: isSet(object.commissionRates) ? CommissionRates.fromJSON(object.commissionRates) : undefined,
      updateTime: isSet(object.updateTime) ? fromJsonTimestamp(object.updateTime) : undefined,
    };
  },

  toJSON(message: Commission): unknown {
    const obj: any = {};
    if (message.commissionRates !== undefined) {
      obj.commissionRates = CommissionRates.toJSON(message.commissionRates);
    }
    if (message.updateTime !== undefined) {
      obj.updateTime = message.updateTime.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Commission>, I>>(base?: I): Commission {
    return Commission.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Commission>, I>>(object: I): Commission {
    const message = createBaseCommission();
    message.commissionRates = (object.commissionRates !== undefined && object.commissionRates !== null)
      ? CommissionRates.fromPartial(object.commissionRates)
      : undefined;
    message.updateTime = object.updateTime ?? undefined;
    return message;
  },
};

function createBaseDescription(): Description {
  return { moniker: "", identity: "", website: "", securityContact: "", details: "" };
}

export const Description = {
  encode(message: Description, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.moniker !== "") {
      writer.uint32(10).string(message.moniker);
    }
    if (message.identity !== "") {
      writer.uint32(18).string(message.identity);
    }
    if (message.website !== "") {
      writer.uint32(26).string(message.website);
    }
    if (message.securityContact !== "") {
      writer.uint32(34).string(message.securityContact);
    }
    if (message.details !== "") {
      writer.uint32(42).string(message.details);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Description {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.moniker = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.identity = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.website = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.securityContact = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.details = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Description {
    return {
      moniker: isSet(object.moniker) ? String(object.moniker) : "",
      identity: isSet(object.identity) ? String(object.identity) : "",
      website: isSet(object.website) ? String(object.website) : "",
      securityContact: isSet(object.securityContact) ? String(object.securityContact) : "",
      details: isSet(object.details) ? String(object.details) : "",
    };
  },

  toJSON(message: Description): unknown {
    const obj: any = {};
    if (message.moniker !== "") {
      obj.moniker = message.moniker;
    }
    if (message.identity !== "") {
      obj.identity = message.identity;
    }
    if (message.website !== "") {
      obj.website = message.website;
    }
    if (message.securityContact !== "") {
      obj.securityContact = message.securityContact;
    }
    if (message.details !== "") {
      obj.details = message.details;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Description>, I>>(base?: I): Description {
    return Description.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Description>, I>>(object: I): Description {
    const message = createBaseDescription();
    message.moniker = object.moniker ?? "";
    message.identity = object.identity ?? "";
    message.website = object.website ?? "";
    message.securityContact = object.securityContact ?? "";
    message.details = object.details ?? "";
    return message;
  },
};

function createBaseValidator(): Validator {
  return {
    operatorAddress: "",
    consensusPubkey: undefined,
    jailed: false,
    status: 0,
    tokens: "",
    delegatorShares: "",
    description: undefined,
    unbondingHeight: 0,
    unbondingTime: undefined,
    commission: undefined,
    minSelfDelegation: "",
    unbondingOnHoldRefCount: 0,
    unbondingIds: [],
  };
}

export const Validator = {
  encode(message: Validator, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operatorAddress !== "") {
      writer.uint32(10).string(message.operatorAddress);
    }
    if (message.consensusPubkey !== undefined) {
      Any.encode(message.consensusPubkey, writer.uint32(18).fork()).ldelim();
    }
    if (message.jailed === true) {
      writer.uint32(24).bool(message.jailed);
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    if (message.tokens !== "") {
      writer.uint32(42).string(message.tokens);
    }
    if (message.delegatorShares !== "") {
      writer.uint32(50).string(message.delegatorShares);
    }
    if (message.description !== undefined) {
      Description.encode(message.description, writer.uint32(58).fork()).ldelim();
    }
    if (message.unbondingHeight !== 0) {
      writer.uint32(64).int64(message.unbondingHeight);
    }
    if (message.unbondingTime !== undefined) {
      Timestamp.encode(toTimestamp(message.unbondingTime), writer.uint32(74).fork()).ldelim();
    }
    if (message.commission !== undefined) {
      Commission.encode(message.commission, writer.uint32(82).fork()).ldelim();
    }
    if (message.minSelfDelegation !== "") {
      writer.uint32(90).string(message.minSelfDelegation);
    }
    if (message.unbondingOnHoldRefCount !== 0) {
      writer.uint32(96).int64(message.unbondingOnHoldRefCount);
    }
    writer.uint32(106).fork();
    for (const v of message.unbondingIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Validator {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.operatorAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.consensusPubkey = Any.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.jailed = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.tokens = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.delegatorShares = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.description = Description.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.unbondingHeight = longToNumber(reader.int64() as Long);
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.unbondingTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.commission = Commission.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.minSelfDelegation = reader.string();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.unbondingOnHoldRefCount = longToNumber(reader.int64() as Long);
          continue;
        case 13:
          if (tag === 104) {
            message.unbondingIds.push(longToNumber(reader.uint64() as Long));

            continue;
          }

          if (tag === 106) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.unbondingIds.push(longToNumber(reader.uint64() as Long));
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Validator {
    return {
      operatorAddress: isSet(object.operatorAddress) ? String(object.operatorAddress) : "",
      consensusPubkey: isSet(object.consensusPubkey) ? Any.fromJSON(object.consensusPubkey) : undefined,
      jailed: isSet(object.jailed) ? Boolean(object.jailed) : false,
      status: isSet(object.status) ? bondStatusFromJSON(object.status) : 0,
      tokens: isSet(object.tokens) ? String(object.tokens) : "",
      delegatorShares: isSet(object.delegatorShares) ? String(object.delegatorShares) : "",
      description: isSet(object.description) ? Description.fromJSON(object.description) : undefined,
      unbondingHeight: isSet(object.unbondingHeight) ? Number(object.unbondingHeight) : 0,
      unbondingTime: isSet(object.unbondingTime) ? fromJsonTimestamp(object.unbondingTime) : undefined,
      commission: isSet(object.commission) ? Commission.fromJSON(object.commission) : undefined,
      minSelfDelegation: isSet(object.minSelfDelegation) ? String(object.minSelfDelegation) : "",
      unbondingOnHoldRefCount: isSet(object.unbondingOnHoldRefCount) ? Number(object.unbondingOnHoldRefCount) : 0,
      unbondingIds: Array.isArray(object?.unbondingIds) ? object.unbondingIds.map((e: any) => Number(e)) : [],
    };
  },

  toJSON(message: Validator): unknown {
    const obj: any = {};
    if (message.operatorAddress !== "") {
      obj.operatorAddress = message.operatorAddress;
    }
    if (message.consensusPubkey !== undefined) {
      obj.consensusPubkey = Any.toJSON(message.consensusPubkey);
    }
    if (message.jailed === true) {
      obj.jailed = message.jailed;
    }
    if (message.status !== 0) {
      obj.status = bondStatusToJSON(message.status);
    }
    if (message.tokens !== "") {
      obj.tokens = message.tokens;
    }
    if (message.delegatorShares !== "") {
      obj.delegatorShares = message.delegatorShares;
    }
    if (message.description !== undefined) {
      obj.description = Description.toJSON(message.description);
    }
    if (message.unbondingHeight !== 0) {
      obj.unbondingHeight = Math.round(message.unbondingHeight);
    }
    if (message.unbondingTime !== undefined) {
      obj.unbondingTime = message.unbondingTime.toISOString();
    }
    if (message.commission !== undefined) {
      obj.commission = Commission.toJSON(message.commission);
    }
    if (message.minSelfDelegation !== "") {
      obj.minSelfDelegation = message.minSelfDelegation;
    }
    if (message.unbondingOnHoldRefCount !== 0) {
      obj.unbondingOnHoldRefCount = Math.round(message.unbondingOnHoldRefCount);
    }
    if (message.unbondingIds?.length) {
      obj.unbondingIds = message.unbondingIds.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Validator>, I>>(base?: I): Validator {
    return Validator.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Validator>, I>>(object: I): Validator {
    const message = createBaseValidator();
    message.operatorAddress = object.operatorAddress ?? "";
    message.consensusPubkey = (object.consensusPubkey !== undefined && object.consensusPubkey !== null)
      ? Any.fromPartial(object.consensusPubkey)
      : undefined;
    message.jailed = object.jailed ?? false;
    message.status = object.status ?? 0;
    message.tokens = object.tokens ?? "";
    message.delegatorShares = object.delegatorShares ?? "";
    message.description = (object.description !== undefined && object.description !== null)
      ? Description.fromPartial(object.description)
      : undefined;
    message.unbondingHeight = object.unbondingHeight ?? 0;
    message.unbondingTime = object.unbondingTime ?? undefined;
    message.commission = (object.commission !== undefined && object.commission !== null)
      ? Commission.fromPartial(object.commission)
      : undefined;
    message.minSelfDelegation = object.minSelfDelegation ?? "";
    message.unbondingOnHoldRefCount = object.unbondingOnHoldRefCount ?? 0;
    message.unbondingIds = object.unbondingIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseValAddresses(): ValAddresses {
  return { addresses: [] };
}

export const ValAddresses = {
  encode(message: ValAddresses, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.addresses) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValAddresses {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValAddresses();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.addresses.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValAddresses {
    return { addresses: Array.isArray(object?.addresses) ? object.addresses.map((e: any) => String(e)) : [] };
  },

  toJSON(message: ValAddresses): unknown {
    const obj: any = {};
    if (message.addresses?.length) {
      obj.addresses = message.addresses;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValAddresses>, I>>(base?: I): ValAddresses {
    return ValAddresses.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValAddresses>, I>>(object: I): ValAddresses {
    const message = createBaseValAddresses();
    message.addresses = object.addresses?.map((e) => e) || [];
    return message;
  },
};

function createBaseDVPair(): DVPair {
  return { delegatorAddress: "", validatorAddress: "" };
}

export const DVPair = {
  encode(message: DVPair, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DVPair {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDVPair();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DVPair {
    return {
      delegatorAddress: isSet(object.delegatorAddress) ? String(object.delegatorAddress) : "",
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
    };
  },

  toJSON(message: DVPair): unknown {
    const obj: any = {};
    if (message.delegatorAddress !== "") {
      obj.delegatorAddress = message.delegatorAddress;
    }
    if (message.validatorAddress !== "") {
      obj.validatorAddress = message.validatorAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DVPair>, I>>(base?: I): DVPair {
    return DVPair.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DVPair>, I>>(object: I): DVPair {
    const message = createBaseDVPair();
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    return message;
  },
};

function createBaseDVPairs(): DVPairs {
  return { pairs: [] };
}

export const DVPairs = {
  encode(message: DVPairs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.pairs) {
      DVPair.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DVPairs {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDVPairs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pairs.push(DVPair.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DVPairs {
    return { pairs: Array.isArray(object?.pairs) ? object.pairs.map((e: any) => DVPair.fromJSON(e)) : [] };
  },

  toJSON(message: DVPairs): unknown {
    const obj: any = {};
    if (message.pairs?.length) {
      obj.pairs = message.pairs.map((e) => DVPair.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DVPairs>, I>>(base?: I): DVPairs {
    return DVPairs.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DVPairs>, I>>(object: I): DVPairs {
    const message = createBaseDVPairs();
    message.pairs = object.pairs?.map((e) => DVPair.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDVVTriplet(): DVVTriplet {
  return { delegatorAddress: "", validatorSrcAddress: "", validatorDstAddress: "" };
}

export const DVVTriplet = {
  encode(message: DVVTriplet, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.validatorSrcAddress !== "") {
      writer.uint32(18).string(message.validatorSrcAddress);
    }
    if (message.validatorDstAddress !== "") {
      writer.uint32(26).string(message.validatorDstAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DVVTriplet {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDVVTriplet();
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

          message.validatorSrcAddress = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.validatorDstAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DVVTriplet {
    return {
      delegatorAddress: isSet(object.delegatorAddress) ? String(object.delegatorAddress) : "",
      validatorSrcAddress: isSet(object.validatorSrcAddress) ? String(object.validatorSrcAddress) : "",
      validatorDstAddress: isSet(object.validatorDstAddress) ? String(object.validatorDstAddress) : "",
    };
  },

  toJSON(message: DVVTriplet): unknown {
    const obj: any = {};
    if (message.delegatorAddress !== "") {
      obj.delegatorAddress = message.delegatorAddress;
    }
    if (message.validatorSrcAddress !== "") {
      obj.validatorSrcAddress = message.validatorSrcAddress;
    }
    if (message.validatorDstAddress !== "") {
      obj.validatorDstAddress = message.validatorDstAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DVVTriplet>, I>>(base?: I): DVVTriplet {
    return DVVTriplet.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DVVTriplet>, I>>(object: I): DVVTriplet {
    const message = createBaseDVVTriplet();
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.validatorSrcAddress = object.validatorSrcAddress ?? "";
    message.validatorDstAddress = object.validatorDstAddress ?? "";
    return message;
  },
};

function createBaseDVVTriplets(): DVVTriplets {
  return { triplets: [] };
}

export const DVVTriplets = {
  encode(message: DVVTriplets, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.triplets) {
      DVVTriplet.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DVVTriplets {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDVVTriplets();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.triplets.push(DVVTriplet.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DVVTriplets {
    return { triplets: Array.isArray(object?.triplets) ? object.triplets.map((e: any) => DVVTriplet.fromJSON(e)) : [] };
  },

  toJSON(message: DVVTriplets): unknown {
    const obj: any = {};
    if (message.triplets?.length) {
      obj.triplets = message.triplets.map((e) => DVVTriplet.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DVVTriplets>, I>>(base?: I): DVVTriplets {
    return DVVTriplets.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DVVTriplets>, I>>(object: I): DVVTriplets {
    const message = createBaseDVVTriplets();
    message.triplets = object.triplets?.map((e) => DVVTriplet.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDelegation(): Delegation {
  return { delegatorAddress: "", validatorAddress: "", shares: "" };
}

export const Delegation = {
  encode(message: Delegation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    if (message.shares !== "") {
      writer.uint32(26).string(message.shares);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Delegation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegation();
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

          message.shares = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Delegation {
    return {
      delegatorAddress: isSet(object.delegatorAddress) ? String(object.delegatorAddress) : "",
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
      shares: isSet(object.shares) ? String(object.shares) : "",
    };
  },

  toJSON(message: Delegation): unknown {
    const obj: any = {};
    if (message.delegatorAddress !== "") {
      obj.delegatorAddress = message.delegatorAddress;
    }
    if (message.validatorAddress !== "") {
      obj.validatorAddress = message.validatorAddress;
    }
    if (message.shares !== "") {
      obj.shares = message.shares;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Delegation>, I>>(base?: I): Delegation {
    return Delegation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Delegation>, I>>(object: I): Delegation {
    const message = createBaseDelegation();
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    message.shares = object.shares ?? "";
    return message;
  },
};

function createBaseUnbondingDelegation(): UnbondingDelegation {
  return { delegatorAddress: "", validatorAddress: "", entries: [] };
}

export const UnbondingDelegation = {
  encode(message: UnbondingDelegation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    for (const v of message.entries) {
      UnbondingDelegationEntry.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnbondingDelegation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnbondingDelegation();
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

          message.entries.push(UnbondingDelegationEntry.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UnbondingDelegation {
    return {
      delegatorAddress: isSet(object.delegatorAddress) ? String(object.delegatorAddress) : "",
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
      entries: Array.isArray(object?.entries)
        ? object.entries.map((e: any) => UnbondingDelegationEntry.fromJSON(e))
        : [],
    };
  },

  toJSON(message: UnbondingDelegation): unknown {
    const obj: any = {};
    if (message.delegatorAddress !== "") {
      obj.delegatorAddress = message.delegatorAddress;
    }
    if (message.validatorAddress !== "") {
      obj.validatorAddress = message.validatorAddress;
    }
    if (message.entries?.length) {
      obj.entries = message.entries.map((e) => UnbondingDelegationEntry.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UnbondingDelegation>, I>>(base?: I): UnbondingDelegation {
    return UnbondingDelegation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UnbondingDelegation>, I>>(object: I): UnbondingDelegation {
    const message = createBaseUnbondingDelegation();
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    message.entries = object.entries?.map((e) => UnbondingDelegationEntry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUnbondingDelegationEntry(): UnbondingDelegationEntry {
  return {
    creationHeight: 0,
    completionTime: undefined,
    initialBalance: "",
    balance: "",
    unbondingId: 0,
    unbondingOnHoldRefCount: 0,
  };
}

export const UnbondingDelegationEntry = {
  encode(message: UnbondingDelegationEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creationHeight !== 0) {
      writer.uint32(8).int64(message.creationHeight);
    }
    if (message.completionTime !== undefined) {
      Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(18).fork()).ldelim();
    }
    if (message.initialBalance !== "") {
      writer.uint32(26).string(message.initialBalance);
    }
    if (message.balance !== "") {
      writer.uint32(34).string(message.balance);
    }
    if (message.unbondingId !== 0) {
      writer.uint32(40).uint64(message.unbondingId);
    }
    if (message.unbondingOnHoldRefCount !== 0) {
      writer.uint32(48).int64(message.unbondingOnHoldRefCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnbondingDelegationEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnbondingDelegationEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.creationHeight = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.initialBalance = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.balance = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.unbondingId = longToNumber(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.unbondingOnHoldRefCount = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UnbondingDelegationEntry {
    return {
      creationHeight: isSet(object.creationHeight) ? Number(object.creationHeight) : 0,
      completionTime: isSet(object.completionTime) ? fromJsonTimestamp(object.completionTime) : undefined,
      initialBalance: isSet(object.initialBalance) ? String(object.initialBalance) : "",
      balance: isSet(object.balance) ? String(object.balance) : "",
      unbondingId: isSet(object.unbondingId) ? Number(object.unbondingId) : 0,
      unbondingOnHoldRefCount: isSet(object.unbondingOnHoldRefCount) ? Number(object.unbondingOnHoldRefCount) : 0,
    };
  },

  toJSON(message: UnbondingDelegationEntry): unknown {
    const obj: any = {};
    if (message.creationHeight !== 0) {
      obj.creationHeight = Math.round(message.creationHeight);
    }
    if (message.completionTime !== undefined) {
      obj.completionTime = message.completionTime.toISOString();
    }
    if (message.initialBalance !== "") {
      obj.initialBalance = message.initialBalance;
    }
    if (message.balance !== "") {
      obj.balance = message.balance;
    }
    if (message.unbondingId !== 0) {
      obj.unbondingId = Math.round(message.unbondingId);
    }
    if (message.unbondingOnHoldRefCount !== 0) {
      obj.unbondingOnHoldRefCount = Math.round(message.unbondingOnHoldRefCount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UnbondingDelegationEntry>, I>>(base?: I): UnbondingDelegationEntry {
    return UnbondingDelegationEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UnbondingDelegationEntry>, I>>(object: I): UnbondingDelegationEntry {
    const message = createBaseUnbondingDelegationEntry();
    message.creationHeight = object.creationHeight ?? 0;
    message.completionTime = object.completionTime ?? undefined;
    message.initialBalance = object.initialBalance ?? "";
    message.balance = object.balance ?? "";
    message.unbondingId = object.unbondingId ?? 0;
    message.unbondingOnHoldRefCount = object.unbondingOnHoldRefCount ?? 0;
    return message;
  },
};

function createBaseRedelegationEntry(): RedelegationEntry {
  return {
    creationHeight: 0,
    completionTime: undefined,
    initialBalance: "",
    sharesDst: "",
    unbondingId: 0,
    unbondingOnHoldRefCount: 0,
  };
}

export const RedelegationEntry = {
  encode(message: RedelegationEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creationHeight !== 0) {
      writer.uint32(8).int64(message.creationHeight);
    }
    if (message.completionTime !== undefined) {
      Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(18).fork()).ldelim();
    }
    if (message.initialBalance !== "") {
      writer.uint32(26).string(message.initialBalance);
    }
    if (message.sharesDst !== "") {
      writer.uint32(34).string(message.sharesDst);
    }
    if (message.unbondingId !== 0) {
      writer.uint32(40).uint64(message.unbondingId);
    }
    if (message.unbondingOnHoldRefCount !== 0) {
      writer.uint32(48).int64(message.unbondingOnHoldRefCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RedelegationEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedelegationEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.creationHeight = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.initialBalance = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.sharesDst = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.unbondingId = longToNumber(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.unbondingOnHoldRefCount = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RedelegationEntry {
    return {
      creationHeight: isSet(object.creationHeight) ? Number(object.creationHeight) : 0,
      completionTime: isSet(object.completionTime) ? fromJsonTimestamp(object.completionTime) : undefined,
      initialBalance: isSet(object.initialBalance) ? String(object.initialBalance) : "",
      sharesDst: isSet(object.sharesDst) ? String(object.sharesDst) : "",
      unbondingId: isSet(object.unbondingId) ? Number(object.unbondingId) : 0,
      unbondingOnHoldRefCount: isSet(object.unbondingOnHoldRefCount) ? Number(object.unbondingOnHoldRefCount) : 0,
    };
  },

  toJSON(message: RedelegationEntry): unknown {
    const obj: any = {};
    if (message.creationHeight !== 0) {
      obj.creationHeight = Math.round(message.creationHeight);
    }
    if (message.completionTime !== undefined) {
      obj.completionTime = message.completionTime.toISOString();
    }
    if (message.initialBalance !== "") {
      obj.initialBalance = message.initialBalance;
    }
    if (message.sharesDst !== "") {
      obj.sharesDst = message.sharesDst;
    }
    if (message.unbondingId !== 0) {
      obj.unbondingId = Math.round(message.unbondingId);
    }
    if (message.unbondingOnHoldRefCount !== 0) {
      obj.unbondingOnHoldRefCount = Math.round(message.unbondingOnHoldRefCount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RedelegationEntry>, I>>(base?: I): RedelegationEntry {
    return RedelegationEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RedelegationEntry>, I>>(object: I): RedelegationEntry {
    const message = createBaseRedelegationEntry();
    message.creationHeight = object.creationHeight ?? 0;
    message.completionTime = object.completionTime ?? undefined;
    message.initialBalance = object.initialBalance ?? "";
    message.sharesDst = object.sharesDst ?? "";
    message.unbondingId = object.unbondingId ?? 0;
    message.unbondingOnHoldRefCount = object.unbondingOnHoldRefCount ?? 0;
    return message;
  },
};

function createBaseRedelegation(): Redelegation {
  return { delegatorAddress: "", validatorSrcAddress: "", validatorDstAddress: "", entries: [] };
}

export const Redelegation = {
  encode(message: Redelegation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.validatorSrcAddress !== "") {
      writer.uint32(18).string(message.validatorSrcAddress);
    }
    if (message.validatorDstAddress !== "") {
      writer.uint32(26).string(message.validatorDstAddress);
    }
    for (const v of message.entries) {
      RedelegationEntry.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Redelegation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedelegation();
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

          message.validatorSrcAddress = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.validatorDstAddress = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.entries.push(RedelegationEntry.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Redelegation {
    return {
      delegatorAddress: isSet(object.delegatorAddress) ? String(object.delegatorAddress) : "",
      validatorSrcAddress: isSet(object.validatorSrcAddress) ? String(object.validatorSrcAddress) : "",
      validatorDstAddress: isSet(object.validatorDstAddress) ? String(object.validatorDstAddress) : "",
      entries: Array.isArray(object?.entries) ? object.entries.map((e: any) => RedelegationEntry.fromJSON(e)) : [],
    };
  },

  toJSON(message: Redelegation): unknown {
    const obj: any = {};
    if (message.delegatorAddress !== "") {
      obj.delegatorAddress = message.delegatorAddress;
    }
    if (message.validatorSrcAddress !== "") {
      obj.validatorSrcAddress = message.validatorSrcAddress;
    }
    if (message.validatorDstAddress !== "") {
      obj.validatorDstAddress = message.validatorDstAddress;
    }
    if (message.entries?.length) {
      obj.entries = message.entries.map((e) => RedelegationEntry.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Redelegation>, I>>(base?: I): Redelegation {
    return Redelegation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Redelegation>, I>>(object: I): Redelegation {
    const message = createBaseRedelegation();
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.validatorSrcAddress = object.validatorSrcAddress ?? "";
    message.validatorDstAddress = object.validatorDstAddress ?? "";
    message.entries = object.entries?.map((e) => RedelegationEntry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseParams(): Params {
  return {
    unbondingTime: undefined,
    maxValidators: 0,
    maxEntries: 0,
    historicalEntries: 0,
    bondDenom: "",
    minCommissionRate: "",
  };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.unbondingTime !== undefined) {
      Duration.encode(message.unbondingTime, writer.uint32(10).fork()).ldelim();
    }
    if (message.maxValidators !== 0) {
      writer.uint32(16).uint32(message.maxValidators);
    }
    if (message.maxEntries !== 0) {
      writer.uint32(24).uint32(message.maxEntries);
    }
    if (message.historicalEntries !== 0) {
      writer.uint32(32).uint32(message.historicalEntries);
    }
    if (message.bondDenom !== "") {
      writer.uint32(42).string(message.bondDenom);
    }
    if (message.minCommissionRate !== "") {
      writer.uint32(50).string(message.minCommissionRate);
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

          message.unbondingTime = Duration.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.maxValidators = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.maxEntries = reader.uint32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.historicalEntries = reader.uint32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.bondDenom = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.minCommissionRate = reader.string();
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
      unbondingTime: isSet(object.unbondingTime) ? Duration.fromJSON(object.unbondingTime) : undefined,
      maxValidators: isSet(object.maxValidators) ? Number(object.maxValidators) : 0,
      maxEntries: isSet(object.maxEntries) ? Number(object.maxEntries) : 0,
      historicalEntries: isSet(object.historicalEntries) ? Number(object.historicalEntries) : 0,
      bondDenom: isSet(object.bondDenom) ? String(object.bondDenom) : "",
      minCommissionRate: isSet(object.minCommissionRate) ? String(object.minCommissionRate) : "",
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.unbondingTime !== undefined) {
      obj.unbondingTime = Duration.toJSON(message.unbondingTime);
    }
    if (message.maxValidators !== 0) {
      obj.maxValidators = Math.round(message.maxValidators);
    }
    if (message.maxEntries !== 0) {
      obj.maxEntries = Math.round(message.maxEntries);
    }
    if (message.historicalEntries !== 0) {
      obj.historicalEntries = Math.round(message.historicalEntries);
    }
    if (message.bondDenom !== "") {
      obj.bondDenom = message.bondDenom;
    }
    if (message.minCommissionRate !== "") {
      obj.minCommissionRate = message.minCommissionRate;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.unbondingTime = (object.unbondingTime !== undefined && object.unbondingTime !== null)
      ? Duration.fromPartial(object.unbondingTime)
      : undefined;
    message.maxValidators = object.maxValidators ?? 0;
    message.maxEntries = object.maxEntries ?? 0;
    message.historicalEntries = object.historicalEntries ?? 0;
    message.bondDenom = object.bondDenom ?? "";
    message.minCommissionRate = object.minCommissionRate ?? "";
    return message;
  },
};

function createBaseDelegationResponse(): DelegationResponse {
  return { delegation: undefined, balance: undefined };
}

export const DelegationResponse = {
  encode(message: DelegationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegation !== undefined) {
      Delegation.encode(message.delegation, writer.uint32(10).fork()).ldelim();
    }
    if (message.balance !== undefined) {
      Coin.encode(message.balance, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DelegationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.delegation = Delegation.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.balance = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DelegationResponse {
    return {
      delegation: isSet(object.delegation) ? Delegation.fromJSON(object.delegation) : undefined,
      balance: isSet(object.balance) ? Coin.fromJSON(object.balance) : undefined,
    };
  },

  toJSON(message: DelegationResponse): unknown {
    const obj: any = {};
    if (message.delegation !== undefined) {
      obj.delegation = Delegation.toJSON(message.delegation);
    }
    if (message.balance !== undefined) {
      obj.balance = Coin.toJSON(message.balance);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DelegationResponse>, I>>(base?: I): DelegationResponse {
    return DelegationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DelegationResponse>, I>>(object: I): DelegationResponse {
    const message = createBaseDelegationResponse();
    message.delegation = (object.delegation !== undefined && object.delegation !== null)
      ? Delegation.fromPartial(object.delegation)
      : undefined;
    message.balance = (object.balance !== undefined && object.balance !== null)
      ? Coin.fromPartial(object.balance)
      : undefined;
    return message;
  },
};

function createBaseRedelegationEntryResponse(): RedelegationEntryResponse {
  return { redelegationEntry: undefined, balance: "" };
}

export const RedelegationEntryResponse = {
  encode(message: RedelegationEntryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.redelegationEntry !== undefined) {
      RedelegationEntry.encode(message.redelegationEntry, writer.uint32(10).fork()).ldelim();
    }
    if (message.balance !== "") {
      writer.uint32(34).string(message.balance);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RedelegationEntryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedelegationEntryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.redelegationEntry = RedelegationEntry.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.balance = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RedelegationEntryResponse {
    return {
      redelegationEntry: isSet(object.redelegationEntry)
        ? RedelegationEntry.fromJSON(object.redelegationEntry)
        : undefined,
      balance: isSet(object.balance) ? String(object.balance) : "",
    };
  },

  toJSON(message: RedelegationEntryResponse): unknown {
    const obj: any = {};
    if (message.redelegationEntry !== undefined) {
      obj.redelegationEntry = RedelegationEntry.toJSON(message.redelegationEntry);
    }
    if (message.balance !== "") {
      obj.balance = message.balance;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RedelegationEntryResponse>, I>>(base?: I): RedelegationEntryResponse {
    return RedelegationEntryResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RedelegationEntryResponse>, I>>(object: I): RedelegationEntryResponse {
    const message = createBaseRedelegationEntryResponse();
    message.redelegationEntry = (object.redelegationEntry !== undefined && object.redelegationEntry !== null)
      ? RedelegationEntry.fromPartial(object.redelegationEntry)
      : undefined;
    message.balance = object.balance ?? "";
    return message;
  },
};

function createBaseRedelegationResponse(): RedelegationResponse {
  return { redelegation: undefined, entries: [] };
}

export const RedelegationResponse = {
  encode(message: RedelegationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.redelegation !== undefined) {
      Redelegation.encode(message.redelegation, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.entries) {
      RedelegationEntryResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RedelegationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedelegationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.redelegation = Redelegation.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.entries.push(RedelegationEntryResponse.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RedelegationResponse {
    return {
      redelegation: isSet(object.redelegation) ? Redelegation.fromJSON(object.redelegation) : undefined,
      entries: Array.isArray(object?.entries)
        ? object.entries.map((e: any) => RedelegationEntryResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RedelegationResponse): unknown {
    const obj: any = {};
    if (message.redelegation !== undefined) {
      obj.redelegation = Redelegation.toJSON(message.redelegation);
    }
    if (message.entries?.length) {
      obj.entries = message.entries.map((e) => RedelegationEntryResponse.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RedelegationResponse>, I>>(base?: I): RedelegationResponse {
    return RedelegationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RedelegationResponse>, I>>(object: I): RedelegationResponse {
    const message = createBaseRedelegationResponse();
    message.redelegation = (object.redelegation !== undefined && object.redelegation !== null)
      ? Redelegation.fromPartial(object.redelegation)
      : undefined;
    message.entries = object.entries?.map((e) => RedelegationEntryResponse.fromPartial(e)) || [];
    return message;
  },
};

function createBasePool(): Pool {
  return { notBondedTokens: "", bondedTokens: "" };
}

export const Pool = {
  encode(message: Pool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.notBondedTokens !== "") {
      writer.uint32(10).string(message.notBondedTokens);
    }
    if (message.bondedTokens !== "") {
      writer.uint32(18).string(message.bondedTokens);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Pool {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.notBondedTokens = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.bondedTokens = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Pool {
    return {
      notBondedTokens: isSet(object.notBondedTokens) ? String(object.notBondedTokens) : "",
      bondedTokens: isSet(object.bondedTokens) ? String(object.bondedTokens) : "",
    };
  },

  toJSON(message: Pool): unknown {
    const obj: any = {};
    if (message.notBondedTokens !== "") {
      obj.notBondedTokens = message.notBondedTokens;
    }
    if (message.bondedTokens !== "") {
      obj.bondedTokens = message.bondedTokens;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Pool>, I>>(base?: I): Pool {
    return Pool.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Pool>, I>>(object: I): Pool {
    const message = createBasePool();
    message.notBondedTokens = object.notBondedTokens ?? "";
    message.bondedTokens = object.bondedTokens ?? "";
    return message;
  },
};

function createBaseValidatorUpdates(): ValidatorUpdates {
  return { updates: [] };
}

export const ValidatorUpdates = {
  encode(message: ValidatorUpdates, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.updates) {
      ValidatorUpdate.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorUpdates {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorUpdates();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.updates.push(ValidatorUpdate.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatorUpdates {
    return {
      updates: Array.isArray(object?.updates) ? object.updates.map((e: any) => ValidatorUpdate.fromJSON(e)) : [],
    };
  },

  toJSON(message: ValidatorUpdates): unknown {
    const obj: any = {};
    if (message.updates?.length) {
      obj.updates = message.updates.map((e) => ValidatorUpdate.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatorUpdates>, I>>(base?: I): ValidatorUpdates {
    return ValidatorUpdates.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatorUpdates>, I>>(object: I): ValidatorUpdates {
    const message = createBaseValidatorUpdates();
    message.updates = object.updates?.map((e) => ValidatorUpdate.fromPartial(e)) || [];
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

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
