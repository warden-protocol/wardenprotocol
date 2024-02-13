/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Coin } from "../../base/v1beta1/coin";
import { CompactBitArray } from "../../crypto/multisig/v1beta1/multisig";
import { SignMode, signModeFromJSON, signModeToJSON } from "../signing/v1beta1/signing";

export const protobufPackage = "cosmos.tx.v1beta1";

/** Tx is the standard type used for broadcasting transactions. */
export interface Tx {
  /** body is the processable content of the transaction */
  body:
    | TxBody
    | undefined;
  /**
   * auth_info is the authorization related content of the transaction,
   * specifically signers, signer modes and fee
   */
  authInfo:
    | AuthInfo
    | undefined;
  /**
   * signatures is a list of signatures that matches the length and order of
   * AuthInfo's signer_infos to allow connecting signature meta information like
   * public key and signing mode by position.
   */
  signatures: Uint8Array[];
}

/**
 * TxRaw is a variant of Tx that pins the signer's exact binary representation
 * of body and auth_info. This is used for signing, broadcasting and
 * verification. The binary `serialize(tx: TxRaw)` is stored in Tendermint and
 * the hash `sha256(serialize(tx: TxRaw))` becomes the "txhash", commonly used
 * as the transaction ID.
 */
export interface TxRaw {
  /**
   * body_bytes is a protobuf serialization of a TxBody that matches the
   * representation in SignDoc.
   */
  bodyBytes: Uint8Array;
  /**
   * auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
   * representation in SignDoc.
   */
  authInfoBytes: Uint8Array;
  /**
   * signatures is a list of signatures that matches the length and order of
   * AuthInfo's signer_infos to allow connecting signature meta information like
   * public key and signing mode by position.
   */
  signatures: Uint8Array[];
}

/** SignDoc is the type used for generating sign bytes for SIGN_MODE_DIRECT. */
export interface SignDoc {
  /**
   * body_bytes is protobuf serialization of a TxBody that matches the
   * representation in TxRaw.
   */
  bodyBytes: Uint8Array;
  /**
   * auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
   * representation in TxRaw.
   */
  authInfoBytes: Uint8Array;
  /**
   * chain_id is the unique identifier of the chain this transaction targets.
   * It prevents signed transactions from being used on another chain by an
   * attacker
   */
  chainId: string;
  /** account_number is the account number of the account in state */
  accountNumber: number;
}

/**
 * SignDocDirectAux is the type used for generating sign bytes for
 * SIGN_MODE_DIRECT_AUX.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SignDocDirectAux {
  /**
   * body_bytes is protobuf serialization of a TxBody that matches the
   * representation in TxRaw.
   */
  bodyBytes: Uint8Array;
  /** public_key is the public key of the signing account. */
  publicKey:
    | Any
    | undefined;
  /**
   * chain_id is the identifier of the chain this transaction targets.
   * It prevents signed transactions from being used on another chain by an
   * attacker.
   */
  chainId: string;
  /** account_number is the account number of the account in state. */
  accountNumber: number;
  /** sequence is the sequence number of the signing account. */
  sequence: number;
  /**
   * tips have been depreacted and should not be used
   *
   * @deprecated
   */
  tip: Tip | undefined;
}

/** TxBody is the body of a transaction that all signers sign over. */
export interface TxBody {
  /**
   * messages is a list of messages to be executed. The required signers of
   * those messages define the number and order of elements in AuthInfo's
   * signer_infos and Tx's signatures. Each required signer address is added to
   * the list only the first time it occurs.
   * By convention, the first required signer (usually from the first message)
   * is referred to as the primary signer and pays the fee for the whole
   * transaction.
   */
  messages: Any[];
  /**
   * memo is any arbitrary note/comment to be added to the transaction.
   * WARNING: in clients, any publicly exposed text should not be called memo,
   * but should be called `note` instead (see https://github.com/cosmos/cosmos-sdk/issues/9122).
   */
  memo: string;
  /**
   * timeout is the block height after which this transaction will not
   * be processed by the chain
   */
  timeoutHeight: number;
  /**
   * extension_options are arbitrary options that can be added by chains
   * when the default options are not sufficient. If any of these are present
   * and can't be handled, the transaction will be rejected
   */
  extensionOptions: Any[];
  /**
   * extension_options are arbitrary options that can be added by chains
   * when the default options are not sufficient. If any of these are present
   * and can't be handled, they will be ignored
   */
  nonCriticalExtensionOptions: Any[];
}

/**
 * AuthInfo describes the fee and signer modes that are used to sign a
 * transaction.
 */
export interface AuthInfo {
  /**
   * signer_infos defines the signing modes for the required signers. The number
   * and order of elements must match the required signers from TxBody's
   * messages. The first element is the primary signer and the one which pays
   * the fee.
   */
  signerInfos: SignerInfo[];
  /**
   * Fee is the fee and gas limit for the transaction. The first signer is the
   * primary signer and the one which pays the fee. The fee can be calculated
   * based on the cost of evaluating the body and doing signature verification
   * of the signers. This can be estimated via simulation.
   */
  fee:
    | Fee
    | undefined;
  /**
   * Tip is the optional tip used for transactions fees paid in another denom.
   *
   * This field is ignored if the chain didn't enable tips, i.e. didn't add the
   * `TipDecorator` in its posthandler.
   *
   * Since: cosmos-sdk 0.46
   *
   * @deprecated
   */
  tip: Tip | undefined;
}

/**
 * SignerInfo describes the public key and signing mode of a single top-level
 * signer.
 */
export interface SignerInfo {
  /**
   * public_key is the public key of the signer. It is optional for accounts
   * that already exist in state. If unset, the verifier can use the required \
   * signer address for this position and lookup the public key.
   */
  publicKey:
    | Any
    | undefined;
  /**
   * mode_info describes the signing mode of the signer and is a nested
   * structure to support nested multisig pubkey's
   */
  modeInfo:
    | ModeInfo
    | undefined;
  /**
   * sequence is the sequence of the account, which describes the
   * number of committed transactions signed by a given address. It is used to
   * prevent replay attacks.
   */
  sequence: number;
}

/** ModeInfo describes the signing mode of a single or nested multisig signer. */
export interface ModeInfo {
  /** single represents a single signer */
  single?:
    | ModeInfo_Single
    | undefined;
  /** multi represents a nested multisig signer */
  multi?: ModeInfo_Multi | undefined;
}

/**
 * Single is the mode info for a single signer. It is structured as a message
 * to allow for additional fields such as locale for SIGN_MODE_TEXTUAL in the
 * future
 */
export interface ModeInfo_Single {
  /** mode is the signing mode of the single signer */
  mode: SignMode;
}

/** Multi is the mode info for a multisig public key */
export interface ModeInfo_Multi {
  /** bitarray specifies which keys within the multisig are signing */
  bitarray:
    | CompactBitArray
    | undefined;
  /**
   * mode_infos is the corresponding modes of the signers of the multisig
   * which could include nested multisig public keys
   */
  modeInfos: ModeInfo[];
}

/**
 * Fee includes the amount of coins paid in fees and the maximum
 * gas to be used by the transaction. The ratio yields an effective "gasprice",
 * which must be above some miminum to be accepted into the mempool.
 */
export interface Fee {
  /** amount is the amount of coins to be paid as a fee */
  amount: Coin[];
  /**
   * gas_limit is the maximum gas that can be used in transaction processing
   * before an out of gas error occurs
   */
  gasLimit: number;
  /**
   * if unset, the first signer is responsible for paying the fees. If set, the specified account must pay the fees.
   * the payer must be a tx signer (and thus have signed this field in AuthInfo).
   * setting this field does *not* change the ordering of required signers for the transaction.
   */
  payer: string;
  /**
   * if set, the fee payer (either the first signer or the value of the payer field) requests that a fee grant be used
   * to pay fees instead of the fee payer's own balance. If an appropriate fee grant does not exist or the chain does
   * not support fee grants, this will fail
   */
  granter: string;
}

/**
 * Tip is the tip used for meta-transactions.
 *
 * Since: cosmos-sdk 0.46
 *
 * @deprecated
 */
export interface Tip {
  /** amount is the amount of the tip */
  amount: Coin[];
  /** tipper is the address of the account paying for the tip */
  tipper: string;
}

/**
 * AuxSignerData is the intermediary format that an auxiliary signer (e.g. a
 * tipper) builds and sends to the fee payer (who will build and broadcast the
 * actual tx). AuxSignerData is not a valid tx in itself, and will be rejected
 * by the node if sent directly as-is.
 *
 * Since: cosmos-sdk 0.46
 */
export interface AuxSignerData {
  /**
   * address is the bech32-encoded address of the auxiliary signer. If using
   * AuxSignerData across different chains, the bech32 prefix of the target
   * chain (where the final transaction is broadcasted) should be used.
   */
  address: string;
  /**
   * sign_doc is the SIGN_MODE_DIRECT_AUX sign doc that the auxiliary signer
   * signs. Note: we use the same sign doc even if we're signing with
   * LEGACY_AMINO_JSON.
   */
  signDoc:
    | SignDocDirectAux
    | undefined;
  /** mode is the signing mode of the single signer. */
  mode: SignMode;
  /** sig is the signature of the sign doc. */
  sig: Uint8Array;
}

function createBaseTx(): Tx {
  return { body: undefined, authInfo: undefined, signatures: [] };
}

export const Tx = {
  encode(message: Tx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.body !== undefined) {
      TxBody.encode(message.body, writer.uint32(10).fork()).ldelim();
    }
    if (message.authInfo !== undefined) {
      AuthInfo.encode(message.authInfo, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.signatures) {
      writer.uint32(26).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tx {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.body = TxBody.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.authInfo = AuthInfo.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.signatures.push(reader.bytes());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Tx {
    return {
      body: isSet(object.body) ? TxBody.fromJSON(object.body) : undefined,
      authInfo: isSet(object.authInfo) ? AuthInfo.fromJSON(object.authInfo) : undefined,
      signatures: Array.isArray(object?.signatures) ? object.signatures.map((e: any) => bytesFromBase64(e)) : [],
    };
  },

  toJSON(message: Tx): unknown {
    const obj: any = {};
    if (message.body !== undefined) {
      obj.body = TxBody.toJSON(message.body);
    }
    if (message.authInfo !== undefined) {
      obj.authInfo = AuthInfo.toJSON(message.authInfo);
    }
    if (message.signatures?.length) {
      obj.signatures = message.signatures.map((e) => base64FromBytes(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Tx>, I>>(base?: I): Tx {
    return Tx.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Tx>, I>>(object: I): Tx {
    const message = createBaseTx();
    message.body = (object.body !== undefined && object.body !== null) ? TxBody.fromPartial(object.body) : undefined;
    message.authInfo = (object.authInfo !== undefined && object.authInfo !== null)
      ? AuthInfo.fromPartial(object.authInfo)
      : undefined;
    message.signatures = object.signatures?.map((e) => e) || [];
    return message;
  },
};

function createBaseTxRaw(): TxRaw {
  return { bodyBytes: new Uint8Array(0), authInfoBytes: new Uint8Array(0), signatures: [] };
}

export const TxRaw = {
  encode(message: TxRaw, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bodyBytes.length !== 0) {
      writer.uint32(10).bytes(message.bodyBytes);
    }
    if (message.authInfoBytes.length !== 0) {
      writer.uint32(18).bytes(message.authInfoBytes);
    }
    for (const v of message.signatures) {
      writer.uint32(26).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxRaw {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxRaw();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.bodyBytes = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.authInfoBytes = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.signatures.push(reader.bytes());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TxRaw {
    return {
      bodyBytes: isSet(object.bodyBytes) ? bytesFromBase64(object.bodyBytes) : new Uint8Array(0),
      authInfoBytes: isSet(object.authInfoBytes) ? bytesFromBase64(object.authInfoBytes) : new Uint8Array(0),
      signatures: Array.isArray(object?.signatures) ? object.signatures.map((e: any) => bytesFromBase64(e)) : [],
    };
  },

  toJSON(message: TxRaw): unknown {
    const obj: any = {};
    if (message.bodyBytes.length !== 0) {
      obj.bodyBytes = base64FromBytes(message.bodyBytes);
    }
    if (message.authInfoBytes.length !== 0) {
      obj.authInfoBytes = base64FromBytes(message.authInfoBytes);
    }
    if (message.signatures?.length) {
      obj.signatures = message.signatures.map((e) => base64FromBytes(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TxRaw>, I>>(base?: I): TxRaw {
    return TxRaw.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TxRaw>, I>>(object: I): TxRaw {
    const message = createBaseTxRaw();
    message.bodyBytes = object.bodyBytes ?? new Uint8Array(0);
    message.authInfoBytes = object.authInfoBytes ?? new Uint8Array(0);
    message.signatures = object.signatures?.map((e) => e) || [];
    return message;
  },
};

function createBaseSignDoc(): SignDoc {
  return { bodyBytes: new Uint8Array(0), authInfoBytes: new Uint8Array(0), chainId: "", accountNumber: 0 };
}

export const SignDoc = {
  encode(message: SignDoc, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bodyBytes.length !== 0) {
      writer.uint32(10).bytes(message.bodyBytes);
    }
    if (message.authInfoBytes.length !== 0) {
      writer.uint32(18).bytes(message.authInfoBytes);
    }
    if (message.chainId !== "") {
      writer.uint32(26).string(message.chainId);
    }
    if (message.accountNumber !== 0) {
      writer.uint32(32).uint64(message.accountNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignDoc {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignDoc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.bodyBytes = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.authInfoBytes = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.chainId = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.accountNumber = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignDoc {
    return {
      bodyBytes: isSet(object.bodyBytes) ? bytesFromBase64(object.bodyBytes) : new Uint8Array(0),
      authInfoBytes: isSet(object.authInfoBytes) ? bytesFromBase64(object.authInfoBytes) : new Uint8Array(0),
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      accountNumber: isSet(object.accountNumber) ? Number(object.accountNumber) : 0,
    };
  },

  toJSON(message: SignDoc): unknown {
    const obj: any = {};
    if (message.bodyBytes.length !== 0) {
      obj.bodyBytes = base64FromBytes(message.bodyBytes);
    }
    if (message.authInfoBytes.length !== 0) {
      obj.authInfoBytes = base64FromBytes(message.authInfoBytes);
    }
    if (message.chainId !== "") {
      obj.chainId = message.chainId;
    }
    if (message.accountNumber !== 0) {
      obj.accountNumber = Math.round(message.accountNumber);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignDoc>, I>>(base?: I): SignDoc {
    return SignDoc.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignDoc>, I>>(object: I): SignDoc {
    const message = createBaseSignDoc();
    message.bodyBytes = object.bodyBytes ?? new Uint8Array(0);
    message.authInfoBytes = object.authInfoBytes ?? new Uint8Array(0);
    message.chainId = object.chainId ?? "";
    message.accountNumber = object.accountNumber ?? 0;
    return message;
  },
};

function createBaseSignDocDirectAux(): SignDocDirectAux {
  return {
    bodyBytes: new Uint8Array(0),
    publicKey: undefined,
    chainId: "",
    accountNumber: 0,
    sequence: 0,
    tip: undefined,
  };
}

export const SignDocDirectAux = {
  encode(message: SignDocDirectAux, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bodyBytes.length !== 0) {
      writer.uint32(10).bytes(message.bodyBytes);
    }
    if (message.publicKey !== undefined) {
      Any.encode(message.publicKey, writer.uint32(18).fork()).ldelim();
    }
    if (message.chainId !== "") {
      writer.uint32(26).string(message.chainId);
    }
    if (message.accountNumber !== 0) {
      writer.uint32(32).uint64(message.accountNumber);
    }
    if (message.sequence !== 0) {
      writer.uint32(40).uint64(message.sequence);
    }
    if (message.tip !== undefined) {
      Tip.encode(message.tip, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignDocDirectAux {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignDocDirectAux();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.bodyBytes = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.publicKey = Any.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.chainId = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.accountNumber = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.sequence = longToNumber(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.tip = Tip.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignDocDirectAux {
    return {
      bodyBytes: isSet(object.bodyBytes) ? bytesFromBase64(object.bodyBytes) : new Uint8Array(0),
      publicKey: isSet(object.publicKey) ? Any.fromJSON(object.publicKey) : undefined,
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      accountNumber: isSet(object.accountNumber) ? Number(object.accountNumber) : 0,
      sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
      tip: isSet(object.tip) ? Tip.fromJSON(object.tip) : undefined,
    };
  },

  toJSON(message: SignDocDirectAux): unknown {
    const obj: any = {};
    if (message.bodyBytes.length !== 0) {
      obj.bodyBytes = base64FromBytes(message.bodyBytes);
    }
    if (message.publicKey !== undefined) {
      obj.publicKey = Any.toJSON(message.publicKey);
    }
    if (message.chainId !== "") {
      obj.chainId = message.chainId;
    }
    if (message.accountNumber !== 0) {
      obj.accountNumber = Math.round(message.accountNumber);
    }
    if (message.sequence !== 0) {
      obj.sequence = Math.round(message.sequence);
    }
    if (message.tip !== undefined) {
      obj.tip = Tip.toJSON(message.tip);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignDocDirectAux>, I>>(base?: I): SignDocDirectAux {
    return SignDocDirectAux.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignDocDirectAux>, I>>(object: I): SignDocDirectAux {
    const message = createBaseSignDocDirectAux();
    message.bodyBytes = object.bodyBytes ?? new Uint8Array(0);
    message.publicKey = (object.publicKey !== undefined && object.publicKey !== null)
      ? Any.fromPartial(object.publicKey)
      : undefined;
    message.chainId = object.chainId ?? "";
    message.accountNumber = object.accountNumber ?? 0;
    message.sequence = object.sequence ?? 0;
    message.tip = (object.tip !== undefined && object.tip !== null) ? Tip.fromPartial(object.tip) : undefined;
    return message;
  },
};

function createBaseTxBody(): TxBody {
  return { messages: [], memo: "", timeoutHeight: 0, extensionOptions: [], nonCriticalExtensionOptions: [] };
}

export const TxBody = {
  encode(message: TxBody, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.messages) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.memo !== "") {
      writer.uint32(18).string(message.memo);
    }
    if (message.timeoutHeight !== 0) {
      writer.uint32(24).uint64(message.timeoutHeight);
    }
    for (const v of message.extensionOptions) {
      Any.encode(v!, writer.uint32(8186).fork()).ldelim();
    }
    for (const v of message.nonCriticalExtensionOptions) {
      Any.encode(v!, writer.uint32(16378).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxBody {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxBody();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.messages.push(Any.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.memo = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.timeoutHeight = longToNumber(reader.uint64() as Long);
          continue;
        case 1023:
          if (tag !== 8186) {
            break;
          }

          message.extensionOptions.push(Any.decode(reader, reader.uint32()));
          continue;
        case 2047:
          if (tag !== 16378) {
            break;
          }

          message.nonCriticalExtensionOptions.push(Any.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TxBody {
    return {
      messages: Array.isArray(object?.messages) ? object.messages.map((e: any) => Any.fromJSON(e)) : [],
      memo: isSet(object.memo) ? String(object.memo) : "",
      timeoutHeight: isSet(object.timeoutHeight) ? Number(object.timeoutHeight) : 0,
      extensionOptions: Array.isArray(object?.extensionOptions)
        ? object.extensionOptions.map((e: any) => Any.fromJSON(e))
        : [],
      nonCriticalExtensionOptions: Array.isArray(object?.nonCriticalExtensionOptions)
        ? object.nonCriticalExtensionOptions.map((e: any) => Any.fromJSON(e))
        : [],
    };
  },

  toJSON(message: TxBody): unknown {
    const obj: any = {};
    if (message.messages?.length) {
      obj.messages = message.messages.map((e) => Any.toJSON(e));
    }
    if (message.memo !== "") {
      obj.memo = message.memo;
    }
    if (message.timeoutHeight !== 0) {
      obj.timeoutHeight = Math.round(message.timeoutHeight);
    }
    if (message.extensionOptions?.length) {
      obj.extensionOptions = message.extensionOptions.map((e) => Any.toJSON(e));
    }
    if (message.nonCriticalExtensionOptions?.length) {
      obj.nonCriticalExtensionOptions = message.nonCriticalExtensionOptions.map((e) => Any.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TxBody>, I>>(base?: I): TxBody {
    return TxBody.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TxBody>, I>>(object: I): TxBody {
    const message = createBaseTxBody();
    message.messages = object.messages?.map((e) => Any.fromPartial(e)) || [];
    message.memo = object.memo ?? "";
    message.timeoutHeight = object.timeoutHeight ?? 0;
    message.extensionOptions = object.extensionOptions?.map((e) => Any.fromPartial(e)) || [];
    message.nonCriticalExtensionOptions = object.nonCriticalExtensionOptions?.map((e) => Any.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAuthInfo(): AuthInfo {
  return { signerInfos: [], fee: undefined, tip: undefined };
}

export const AuthInfo = {
  encode(message: AuthInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.signerInfos) {
      SignerInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Fee.encode(message.fee, writer.uint32(18).fork()).ldelim();
    }
    if (message.tip !== undefined) {
      Tip.encode(message.tip, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signerInfos.push(SignerInfo.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fee = Fee.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.tip = Tip.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthInfo {
    return {
      signerInfos: Array.isArray(object?.signerInfos) ? object.signerInfos.map((e: any) => SignerInfo.fromJSON(e)) : [],
      fee: isSet(object.fee) ? Fee.fromJSON(object.fee) : undefined,
      tip: isSet(object.tip) ? Tip.fromJSON(object.tip) : undefined,
    };
  },

  toJSON(message: AuthInfo): unknown {
    const obj: any = {};
    if (message.signerInfos?.length) {
      obj.signerInfos = message.signerInfos.map((e) => SignerInfo.toJSON(e));
    }
    if (message.fee !== undefined) {
      obj.fee = Fee.toJSON(message.fee);
    }
    if (message.tip !== undefined) {
      obj.tip = Tip.toJSON(message.tip);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthInfo>, I>>(base?: I): AuthInfo {
    return AuthInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthInfo>, I>>(object: I): AuthInfo {
    const message = createBaseAuthInfo();
    message.signerInfos = object.signerInfos?.map((e) => SignerInfo.fromPartial(e)) || [];
    message.fee = (object.fee !== undefined && object.fee !== null) ? Fee.fromPartial(object.fee) : undefined;
    message.tip = (object.tip !== undefined && object.tip !== null) ? Tip.fromPartial(object.tip) : undefined;
    return message;
  },
};

function createBaseSignerInfo(): SignerInfo {
  return { publicKey: undefined, modeInfo: undefined, sequence: 0 };
}

export const SignerInfo = {
  encode(message: SignerInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.publicKey !== undefined) {
      Any.encode(message.publicKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.modeInfo !== undefined) {
      ModeInfo.encode(message.modeInfo, writer.uint32(18).fork()).ldelim();
    }
    if (message.sequence !== 0) {
      writer.uint32(24).uint64(message.sequence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignerInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignerInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.publicKey = Any.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.modeInfo = ModeInfo.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.sequence = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignerInfo {
    return {
      publicKey: isSet(object.publicKey) ? Any.fromJSON(object.publicKey) : undefined,
      modeInfo: isSet(object.modeInfo) ? ModeInfo.fromJSON(object.modeInfo) : undefined,
      sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
    };
  },

  toJSON(message: SignerInfo): unknown {
    const obj: any = {};
    if (message.publicKey !== undefined) {
      obj.publicKey = Any.toJSON(message.publicKey);
    }
    if (message.modeInfo !== undefined) {
      obj.modeInfo = ModeInfo.toJSON(message.modeInfo);
    }
    if (message.sequence !== 0) {
      obj.sequence = Math.round(message.sequence);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SignerInfo>, I>>(base?: I): SignerInfo {
    return SignerInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SignerInfo>, I>>(object: I): SignerInfo {
    const message = createBaseSignerInfo();
    message.publicKey = (object.publicKey !== undefined && object.publicKey !== null)
      ? Any.fromPartial(object.publicKey)
      : undefined;
    message.modeInfo = (object.modeInfo !== undefined && object.modeInfo !== null)
      ? ModeInfo.fromPartial(object.modeInfo)
      : undefined;
    message.sequence = object.sequence ?? 0;
    return message;
  },
};

function createBaseModeInfo(): ModeInfo {
  return { single: undefined, multi: undefined };
}

export const ModeInfo = {
  encode(message: ModeInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.single !== undefined) {
      ModeInfo_Single.encode(message.single, writer.uint32(10).fork()).ldelim();
    }
    if (message.multi !== undefined) {
      ModeInfo_Multi.encode(message.multi, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModeInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModeInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.single = ModeInfo_Single.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.multi = ModeInfo_Multi.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModeInfo {
    return {
      single: isSet(object.single) ? ModeInfo_Single.fromJSON(object.single) : undefined,
      multi: isSet(object.multi) ? ModeInfo_Multi.fromJSON(object.multi) : undefined,
    };
  },

  toJSON(message: ModeInfo): unknown {
    const obj: any = {};
    if (message.single !== undefined) {
      obj.single = ModeInfo_Single.toJSON(message.single);
    }
    if (message.multi !== undefined) {
      obj.multi = ModeInfo_Multi.toJSON(message.multi);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ModeInfo>, I>>(base?: I): ModeInfo {
    return ModeInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ModeInfo>, I>>(object: I): ModeInfo {
    const message = createBaseModeInfo();
    message.single = (object.single !== undefined && object.single !== null)
      ? ModeInfo_Single.fromPartial(object.single)
      : undefined;
    message.multi = (object.multi !== undefined && object.multi !== null)
      ? ModeInfo_Multi.fromPartial(object.multi)
      : undefined;
    return message;
  },
};

function createBaseModeInfo_Single(): ModeInfo_Single {
  return { mode: 0 };
}

export const ModeInfo_Single = {
  encode(message: ModeInfo_Single, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mode !== 0) {
      writer.uint32(8).int32(message.mode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModeInfo_Single {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModeInfo_Single();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.mode = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModeInfo_Single {
    return { mode: isSet(object.mode) ? signModeFromJSON(object.mode) : 0 };
  },

  toJSON(message: ModeInfo_Single): unknown {
    const obj: any = {};
    if (message.mode !== 0) {
      obj.mode = signModeToJSON(message.mode);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ModeInfo_Single>, I>>(base?: I): ModeInfo_Single {
    return ModeInfo_Single.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ModeInfo_Single>, I>>(object: I): ModeInfo_Single {
    const message = createBaseModeInfo_Single();
    message.mode = object.mode ?? 0;
    return message;
  },
};

function createBaseModeInfo_Multi(): ModeInfo_Multi {
  return { bitarray: undefined, modeInfos: [] };
}

export const ModeInfo_Multi = {
  encode(message: ModeInfo_Multi, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bitarray !== undefined) {
      CompactBitArray.encode(message.bitarray, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.modeInfos) {
      ModeInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModeInfo_Multi {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModeInfo_Multi();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.bitarray = CompactBitArray.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.modeInfos.push(ModeInfo.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModeInfo_Multi {
    return {
      bitarray: isSet(object.bitarray) ? CompactBitArray.fromJSON(object.bitarray) : undefined,
      modeInfos: Array.isArray(object?.modeInfos) ? object.modeInfos.map((e: any) => ModeInfo.fromJSON(e)) : [],
    };
  },

  toJSON(message: ModeInfo_Multi): unknown {
    const obj: any = {};
    if (message.bitarray !== undefined) {
      obj.bitarray = CompactBitArray.toJSON(message.bitarray);
    }
    if (message.modeInfos?.length) {
      obj.modeInfos = message.modeInfos.map((e) => ModeInfo.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ModeInfo_Multi>, I>>(base?: I): ModeInfo_Multi {
    return ModeInfo_Multi.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ModeInfo_Multi>, I>>(object: I): ModeInfo_Multi {
    const message = createBaseModeInfo_Multi();
    message.bitarray = (object.bitarray !== undefined && object.bitarray !== null)
      ? CompactBitArray.fromPartial(object.bitarray)
      : undefined;
    message.modeInfos = object.modeInfos?.map((e) => ModeInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseFee(): Fee {
  return { amount: [], gasLimit: 0, payer: "", granter: "" };
}

export const Fee = {
  encode(message: Fee, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.gasLimit !== 0) {
      writer.uint32(16).uint64(message.gasLimit);
    }
    if (message.payer !== "") {
      writer.uint32(26).string(message.payer);
    }
    if (message.granter !== "") {
      writer.uint32(34).string(message.granter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Fee {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amount.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.gasLimit = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.payer = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.granter = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Fee {
    return {
      amount: Array.isArray(object?.amount) ? object.amount.map((e: any) => Coin.fromJSON(e)) : [],
      gasLimit: isSet(object.gasLimit) ? Number(object.gasLimit) : 0,
      payer: isSet(object.payer) ? String(object.payer) : "",
      granter: isSet(object.granter) ? String(object.granter) : "",
    };
  },

  toJSON(message: Fee): unknown {
    const obj: any = {};
    if (message.amount?.length) {
      obj.amount = message.amount.map((e) => Coin.toJSON(e));
    }
    if (message.gasLimit !== 0) {
      obj.gasLimit = Math.round(message.gasLimit);
    }
    if (message.payer !== "") {
      obj.payer = message.payer;
    }
    if (message.granter !== "") {
      obj.granter = message.granter;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Fee>, I>>(base?: I): Fee {
    return Fee.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Fee>, I>>(object: I): Fee {
    const message = createBaseFee();
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    message.gasLimit = object.gasLimit ?? 0;
    message.payer = object.payer ?? "";
    message.granter = object.granter ?? "";
    return message;
  },
};

function createBaseTip(): Tip {
  return { amount: [], tipper: "" };
}

export const Tip = {
  encode(message: Tip, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.tipper !== "") {
      writer.uint32(18).string(message.tipper);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tip {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTip();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amount.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.tipper = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Tip {
    return {
      amount: Array.isArray(object?.amount) ? object.amount.map((e: any) => Coin.fromJSON(e)) : [],
      tipper: isSet(object.tipper) ? String(object.tipper) : "",
    };
  },

  toJSON(message: Tip): unknown {
    const obj: any = {};
    if (message.amount?.length) {
      obj.amount = message.amount.map((e) => Coin.toJSON(e));
    }
    if (message.tipper !== "") {
      obj.tipper = message.tipper;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Tip>, I>>(base?: I): Tip {
    return Tip.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Tip>, I>>(object: I): Tip {
    const message = createBaseTip();
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    message.tipper = object.tipper ?? "";
    return message;
  },
};

function createBaseAuxSignerData(): AuxSignerData {
  return { address: "", signDoc: undefined, mode: 0, sig: new Uint8Array(0) };
}

export const AuxSignerData = {
  encode(message: AuxSignerData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.signDoc !== undefined) {
      SignDocDirectAux.encode(message.signDoc, writer.uint32(18).fork()).ldelim();
    }
    if (message.mode !== 0) {
      writer.uint32(24).int32(message.mode);
    }
    if (message.sig.length !== 0) {
      writer.uint32(34).bytes(message.sig);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuxSignerData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuxSignerData();
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

          message.signDoc = SignDocDirectAux.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.mode = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.sig = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuxSignerData {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      signDoc: isSet(object.signDoc) ? SignDocDirectAux.fromJSON(object.signDoc) : undefined,
      mode: isSet(object.mode) ? signModeFromJSON(object.mode) : 0,
      sig: isSet(object.sig) ? bytesFromBase64(object.sig) : new Uint8Array(0),
    };
  },

  toJSON(message: AuxSignerData): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.signDoc !== undefined) {
      obj.signDoc = SignDocDirectAux.toJSON(message.signDoc);
    }
    if (message.mode !== 0) {
      obj.mode = signModeToJSON(message.mode);
    }
    if (message.sig.length !== 0) {
      obj.sig = base64FromBytes(message.sig);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuxSignerData>, I>>(base?: I): AuxSignerData {
    return AuxSignerData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuxSignerData>, I>>(object: I): AuxSignerData {
    const message = createBaseAuxSignerData();
    message.address = object.address ?? "";
    message.signDoc = (object.signDoc !== undefined && object.signDoc !== null)
      ? SignDocDirectAux.fromPartial(object.signDoc)
      : undefined;
    message.mode = object.mode ?? 0;
    message.sig = object.sig ?? new Uint8Array(0);
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

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

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
