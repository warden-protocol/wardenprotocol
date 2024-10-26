//@ts-nocheck
import { AccessConfig, AccessConfigAmino, AccessConfigSDKType } from "./types.js";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet, bytesFromBase64, base64FromBytes } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
import { fromBase64, toBase64, toUtf8, fromUtf8 } from "@cosmjs/encoding";
/** StoreCodeProposal gov proposal content type to submit WASM code to the system */
export interface StoreCodeProposal {
  $typeUrl?: "/cosmwasm.wasm.v1.StoreCodeProposal";
  /** Title is a short summary */
  title: string;
  /** Description is a human readable text */
  description: string;
  /** RunAs is the address that is passed to the contract's environment as sender */
  runAs: string;
  /** WASMByteCode can be raw or gzip compressed */
  wasmByteCode: Uint8Array;
  /** InstantiatePermission to apply on contract creation, optional */
  instantiatePermission?: AccessConfig;
  /** UnpinCode code on upload, optional */
  unpinCode: boolean;
  /** Source is the URL where the code is hosted */
  source: string;
  /**
   * Builder is the docker image used to build the code deterministically, used
   * for smart contract verification
   */
  builder: string;
  /**
   * CodeHash is the SHA256 sum of the code outputted by builder, used for smart
   * contract verification
   */
  codeHash: Uint8Array;
}
export interface StoreCodeProposalProtoMsg {
  typeUrl: "/cosmwasm.wasm.v1.StoreCodeProposal";
  value: Uint8Array;
}
/** StoreCodeProposal gov proposal content type to submit WASM code to the system */
export interface StoreCodeProposalAmino {
  /** Title is a short summary */
  title?: string;
  /** Description is a human readable text */
  description?: string;
  /** RunAs is the address that is passed to the contract's environment as sender */
  run_as?: string;
  /** WASMByteCode can be raw or gzip compressed */
  wasm_byte_code?: string;
  /** InstantiatePermission to apply on contract creation, optional */
  instantiate_permission?: AccessConfigAmino;
  /** UnpinCode code on upload, optional */
  unpin_code?: boolean;
  /** Source is the URL where the code is hosted */
  source?: string;
  /**
   * Builder is the docker image used to build the code deterministically, used
   * for smart contract verification
   */
  builder?: string;
  /**
   * CodeHash is the SHA256 sum of the code outputted by builder, used for smart
   * contract verification
   */
  code_hash?: string;
}
export interface StoreCodeProposalAminoMsg {
  type: "wasm/StoreCodeProposal";
  value: StoreCodeProposalAmino;
}
/** StoreCodeProposal gov proposal content type to submit WASM code to the system */
export interface StoreCodeProposalSDKType {
  $typeUrl?: "/cosmwasm.wasm.v1.StoreCodeProposal";
  title: string;
  description: string;
  run_as: string;
  wasm_byte_code: Uint8Array;
  instantiate_permission?: AccessConfigSDKType;
  unpin_code: boolean;
  source: string;
  builder: string;
  code_hash: Uint8Array;
}
/**
 * InstantiateContractProposal gov proposal content type to instantiate a
 * contract.
 */
export interface InstantiateContractProposal {
  $typeUrl?: "/cosmwasm.wasm.v1.InstantiateContractProposal";
  /** Title is a short summary */
  title: string;
  /** Description is a human readable text */
  description: string;
  /** RunAs is the address that is passed to the contract's environment as sender */
  runAs: string;
  /** Admin is an optional address that can execute migrations */
  admin: string;
  /** CodeID is the reference to the stored WASM code */
  codeId: bigint;
  /** Label is optional metadata to be stored with a constract instance. */
  label: string;
  /** Msg json encoded message to be passed to the contract on instantiation */
  msg: Uint8Array;
  /** Funds coins that are transferred to the contract on instantiation */
  funds: Coin[];
}
export interface InstantiateContractProposalProtoMsg {
  typeUrl: "/cosmwasm.wasm.v1.InstantiateContractProposal";
  value: Uint8Array;
}
/**
 * InstantiateContractProposal gov proposal content type to instantiate a
 * contract.
 */
export interface InstantiateContractProposalAmino {
  /** Title is a short summary */
  title?: string;
  /** Description is a human readable text */
  description?: string;
  /** RunAs is the address that is passed to the contract's environment as sender */
  run_as?: string;
  /** Admin is an optional address that can execute migrations */
  admin?: string;
  /** CodeID is the reference to the stored WASM code */
  code_id?: string;
  /** Label is optional metadata to be stored with a constract instance. */
  label?: string;
  /** Msg json encoded message to be passed to the contract on instantiation */
  msg?: any;
  /** Funds coins that are transferred to the contract on instantiation */
  funds?: CoinAmino[];
}
export interface InstantiateContractProposalAminoMsg {
  type: "wasm/InstantiateContractProposal";
  value: InstantiateContractProposalAmino;
}
/**
 * InstantiateContractProposal gov proposal content type to instantiate a
 * contract.
 */
export interface InstantiateContractProposalSDKType {
  $typeUrl?: "/cosmwasm.wasm.v1.InstantiateContractProposal";
  title: string;
  description: string;
  run_as: string;
  admin: string;
  code_id: bigint;
  label: string;
  msg: Uint8Array;
  funds: CoinSDKType[];
}
/**
 * InstantiateContract2Proposal gov proposal content type to instantiate
 * contract 2
 */
export interface InstantiateContract2Proposal {
  $typeUrl?: "/cosmwasm.wasm.v1.InstantiateContract2Proposal";
  /** Title is a short summary */
  title: string;
  /** Description is a human readable text */
  description: string;
  /** RunAs is the address that is passed to the contract's enviroment as sender */
  runAs: string;
  /** Admin is an optional address that can execute migrations */
  admin: string;
  /** CodeID is the reference to the stored WASM code */
  codeId: bigint;
  /** Label is optional metadata to be stored with a constract instance. */
  label: string;
  /** Msg json encode message to be passed to the contract on instantiation */
  msg: Uint8Array;
  /** Funds coins that are transferred to the contract on instantiation */
  funds: Coin[];
  /** Salt is an arbitrary value provided by the sender. Size can be 1 to 64. */
  salt: Uint8Array;
  /**
   * FixMsg include the msg value into the hash for the predictable address.
   * Default is false
   */
  fixMsg: boolean;
}
export interface InstantiateContract2ProposalProtoMsg {
  typeUrl: "/cosmwasm.wasm.v1.InstantiateContract2Proposal";
  value: Uint8Array;
}
/**
 * InstantiateContract2Proposal gov proposal content type to instantiate
 * contract 2
 */
export interface InstantiateContract2ProposalAmino {
  /** Title is a short summary */
  title?: string;
  /** Description is a human readable text */
  description?: string;
  /** RunAs is the address that is passed to the contract's enviroment as sender */
  run_as?: string;
  /** Admin is an optional address that can execute migrations */
  admin?: string;
  /** CodeID is the reference to the stored WASM code */
  code_id?: string;
  /** Label is optional metadata to be stored with a constract instance. */
  label?: string;
  /** Msg json encode message to be passed to the contract on instantiation */
  msg?: any;
  /** Funds coins that are transferred to the contract on instantiation */
  funds?: CoinAmino[];
  /** Salt is an arbitrary value provided by the sender. Size can be 1 to 64. */
  salt?: string;
  /**
   * FixMsg include the msg value into the hash for the predictable address.
   * Default is false
   */
  fix_msg?: boolean;
}
export interface InstantiateContract2ProposalAminoMsg {
  type: "wasm/InstantiateContract2Proposal";
  value: InstantiateContract2ProposalAmino;
}
/**
 * InstantiateContract2Proposal gov proposal content type to instantiate
 * contract 2
 */
export interface InstantiateContract2ProposalSDKType {
  $typeUrl?: "/cosmwasm.wasm.v1.InstantiateContract2Proposal";
  title: string;
  description: string;
  run_as: string;
  admin: string;
  code_id: bigint;
  label: string;
  msg: Uint8Array;
  funds: CoinSDKType[];
  salt: Uint8Array;
  fix_msg: boolean;
}
/** MigrateContractProposal gov proposal content type to migrate a contract. */
export interface MigrateContractProposal {
  $typeUrl?: "/cosmwasm.wasm.v1.MigrateContractProposal";
  /** Title is a short summary */
  title: string;
  /** Description is a human readable text */
  description: string;
  /** Contract is the address of the smart contract */
  contract: string;
  /** CodeID references the new WASM code */
  codeId: bigint;
  /** Msg json encoded message to be passed to the contract on migration */
  msg: Uint8Array;
}
export interface MigrateContractProposalProtoMsg {
  typeUrl: "/cosmwasm.wasm.v1.MigrateContractProposal";
  value: Uint8Array;
}
/** MigrateContractProposal gov proposal content type to migrate a contract. */
export interface MigrateContractProposalAmino {
  /** Title is a short summary */
  title?: string;
  /** Description is a human readable text */
  description?: string;
  /** Contract is the address of the smart contract */
  contract?: string;
  /** CodeID references the new WASM code */
  code_id?: string;
  /** Msg json encoded message to be passed to the contract on migration */
  msg?: any;
}
export interface MigrateContractProposalAminoMsg {
  type: "wasm/MigrateContractProposal";
  value: MigrateContractProposalAmino;
}
/** MigrateContractProposal gov proposal content type to migrate a contract. */
export interface MigrateContractProposalSDKType {
  $typeUrl?: "/cosmwasm.wasm.v1.MigrateContractProposal";
  title: string;
  description: string;
  contract: string;
  code_id: bigint;
  msg: Uint8Array;
}
/** SudoContractProposal gov proposal content type to call sudo on a contract. */
export interface SudoContractProposal {
  $typeUrl?: "/cosmwasm.wasm.v1.SudoContractProposal";
  /** Title is a short summary */
  title: string;
  /** Description is a human readable text */
  description: string;
  /** Contract is the address of the smart contract */
  contract: string;
  /** Msg json encoded message to be passed to the contract as sudo */
  msg: Uint8Array;
}
export interface SudoContractProposalProtoMsg {
  typeUrl: "/cosmwasm.wasm.v1.SudoContractProposal";
  value: Uint8Array;
}
/** SudoContractProposal gov proposal content type to call sudo on a contract. */
export interface SudoContractProposalAmino {
  /** Title is a short summary */
  title?: string;
  /** Description is a human readable text */
  description?: string;
  /** Contract is the address of the smart contract */
  contract?: string;
  /** Msg json encoded message to be passed to the contract as sudo */
  msg?: any;
}
export interface SudoContractProposalAminoMsg {
  type: "wasm/SudoContractProposal";
  value: SudoContractProposalAmino;
}
/** SudoContractProposal gov proposal content type to call sudo on a contract. */
export interface SudoContractProposalSDKType {
  $typeUrl?: "/cosmwasm.wasm.v1.SudoContractProposal";
  title: string;
  description: string;
  contract: string;
  msg: Uint8Array;
}
/**
 * ExecuteContractProposal gov proposal content type to call execute on a
 * contract.
 */
export interface ExecuteContractProposal {
  $typeUrl?: "/cosmwasm.wasm.v1.ExecuteContractProposal";
  /** Title is a short summary */
  title: string;
  /** Description is a human readable text */
  description: string;
  /** RunAs is the address that is passed to the contract's environment as sender */
  runAs: string;
  /** Contract is the address of the smart contract */
  contract: string;
  /** Msg json encoded message to be passed to the contract as execute */
  msg: Uint8Array;
  /** Funds coins that are transferred to the contract on instantiation */
  funds: Coin[];
}
export interface ExecuteContractProposalProtoMsg {
  typeUrl: "/cosmwasm.wasm.v1.ExecuteContractProposal";
  value: Uint8Array;
}
/**
 * ExecuteContractProposal gov proposal content type to call execute on a
 * contract.
 */
export interface ExecuteContractProposalAmino {
  /** Title is a short summary */
  title?: string;
  /** Description is a human readable text */
  description?: string;
  /** RunAs is the address that is passed to the contract's environment as sender */
  run_as?: string;
  /** Contract is the address of the smart contract */
  contract?: string;
  /** Msg json encoded message to be passed to the contract as execute */
  msg?: any;
  /** Funds coins that are transferred to the contract on instantiation */
  funds?: CoinAmino[];
}
export interface ExecuteContractProposalAminoMsg {
  type: "wasm/ExecuteContractProposal";
  value: ExecuteContractProposalAmino;
}
/**
 * ExecuteContractProposal gov proposal content type to call execute on a
 * contract.
 */
export interface ExecuteContractProposalSDKType {
  $typeUrl?: "/cosmwasm.wasm.v1.ExecuteContractProposal";
  title: string;
  description: string;
  run_as: string;
  contract: string;
  msg: Uint8Array;
  funds: CoinSDKType[];
}
/** UpdateAdminProposal gov proposal content type to set an admin for a contract. */
export interface UpdateAdminProposal {
  $typeUrl?: "/cosmwasm.wasm.v1.UpdateAdminProposal";
  /** Title is a short summary */
  title: string;
  /** Description is a human readable text */
  description: string;
  /** NewAdmin address to be set */
  newAdmin: string;
  /** Contract is the address of the smart contract */
  contract: string;
}
export interface UpdateAdminProposalProtoMsg {
  typeUrl: "/cosmwasm.wasm.v1.UpdateAdminProposal";
  value: Uint8Array;
}
/** UpdateAdminProposal gov proposal content type to set an admin for a contract. */
export interface UpdateAdminProposalAmino {
  /** Title is a short summary */
  title?: string;
  /** Description is a human readable text */
  description?: string;
  /** NewAdmin address to be set */
  new_admin?: string;
  /** Contract is the address of the smart contract */
  contract?: string;
}
export interface UpdateAdminProposalAminoMsg {
  type: "wasm/UpdateAdminProposal";
  value: UpdateAdminProposalAmino;
}
/** UpdateAdminProposal gov proposal content type to set an admin for a contract. */
export interface UpdateAdminProposalSDKType {
  $typeUrl?: "/cosmwasm.wasm.v1.UpdateAdminProposal";
  title: string;
  description: string;
  new_admin: string;
  contract: string;
}
/**
 * ClearAdminProposal gov proposal content type to clear the admin of a
 * contract.
 */
export interface ClearAdminProposal {
  $typeUrl?: "/cosmwasm.wasm.v1.ClearAdminProposal";
  /** Title is a short summary */
  title: string;
  /** Description is a human readable text */
  description: string;
  /** Contract is the address of the smart contract */
  contract: string;
}
export interface ClearAdminProposalProtoMsg {
  typeUrl: "/cosmwasm.wasm.v1.ClearAdminProposal";
  value: Uint8Array;
}
/**
 * ClearAdminProposal gov proposal content type to clear the admin of a
 * contract.
 */
export interface ClearAdminProposalAmino {
  /** Title is a short summary */
  title?: string;
  /** Description is a human readable text */
  description?: string;
  /** Contract is the address of the smart contract */
  contract?: string;
}
export interface ClearAdminProposalAminoMsg {
  type: "wasm/ClearAdminProposal";
  value: ClearAdminProposalAmino;
}
/**
 * ClearAdminProposal gov proposal content type to clear the admin of a
 * contract.
 */
export interface ClearAdminProposalSDKType {
  $typeUrl?: "/cosmwasm.wasm.v1.ClearAdminProposal";
  title: string;
  description: string;
  contract: string;
}
/**
 * PinCodesProposal gov proposal content type to pin a set of code ids in the
 * wasmvm cache.
 */
export interface PinCodesProposal {
  $typeUrl?: "/cosmwasm.wasm.v1.PinCodesProposal";
  /** Title is a short summary */
  title: string;
  /** Description is a human readable text */
  description: string;
  /** CodeIDs references the new WASM codes */
  codeIds: bigint[];
}
export interface PinCodesProposalProtoMsg {
  typeUrl: "/cosmwasm.wasm.v1.PinCodesProposal";
  value: Uint8Array;
}
/**
 * PinCodesProposal gov proposal content type to pin a set of code ids in the
 * wasmvm cache.
 */
export interface PinCodesProposalAmino {
  /** Title is a short summary */
  title?: string;
  /** Description is a human readable text */
  description?: string;
  /** CodeIDs references the new WASM codes */
  code_ids?: string[];
}
export interface PinCodesProposalAminoMsg {
  type: "wasm/PinCodesProposal";
  value: PinCodesProposalAmino;
}
/**
 * PinCodesProposal gov proposal content type to pin a set of code ids in the
 * wasmvm cache.
 */
export interface PinCodesProposalSDKType {
  $typeUrl?: "/cosmwasm.wasm.v1.PinCodesProposal";
  title: string;
  description: string;
  code_ids: bigint[];
}
/**
 * UnpinCodesProposal gov proposal content type to unpin a set of code ids in
 * the wasmvm cache.
 */
export interface UnpinCodesProposal {
  $typeUrl?: "/cosmwasm.wasm.v1.UnpinCodesProposal";
  /** Title is a short summary */
  title: string;
  /** Description is a human readable text */
  description: string;
  /** CodeIDs references the WASM codes */
  codeIds: bigint[];
}
export interface UnpinCodesProposalProtoMsg {
  typeUrl: "/cosmwasm.wasm.v1.UnpinCodesProposal";
  value: Uint8Array;
}
/**
 * UnpinCodesProposal gov proposal content type to unpin a set of code ids in
 * the wasmvm cache.
 */
export interface UnpinCodesProposalAmino {
  /** Title is a short summary */
  title?: string;
  /** Description is a human readable text */
  description?: string;
  /** CodeIDs references the WASM codes */
  code_ids?: string[];
}
export interface UnpinCodesProposalAminoMsg {
  type: "wasm/UnpinCodesProposal";
  value: UnpinCodesProposalAmino;
}
/**
 * UnpinCodesProposal gov proposal content type to unpin a set of code ids in
 * the wasmvm cache.
 */
export interface UnpinCodesProposalSDKType {
  $typeUrl?: "/cosmwasm.wasm.v1.UnpinCodesProposal";
  title: string;
  description: string;
  code_ids: bigint[];
}
/**
 * AccessConfigUpdate contains the code id and the access config to be
 * applied.
 */
export interface AccessConfigUpdate {
  /** CodeID is the reference to the stored WASM code to be updated */
  codeId: bigint;
  /** InstantiatePermission to apply to the set of code ids */
  instantiatePermission: AccessConfig;
}
export interface AccessConfigUpdateProtoMsg {
  typeUrl: "/cosmwasm.wasm.v1.AccessConfigUpdate";
  value: Uint8Array;
}
/**
 * AccessConfigUpdate contains the code id and the access config to be
 * applied.
 */
export interface AccessConfigUpdateAmino {
  /** CodeID is the reference to the stored WASM code to be updated */
  code_id?: string;
  /** InstantiatePermission to apply to the set of code ids */
  instantiate_permission?: AccessConfigAmino;
}
export interface AccessConfigUpdateAminoMsg {
  type: "wasm/AccessConfigUpdate";
  value: AccessConfigUpdateAmino;
}
/**
 * AccessConfigUpdate contains the code id and the access config to be
 * applied.
 */
export interface AccessConfigUpdateSDKType {
  code_id: bigint;
  instantiate_permission: AccessConfigSDKType;
}
/**
 * UpdateInstantiateConfigProposal gov proposal content type to update
 * instantiate config to a  set of code ids.
 */
export interface UpdateInstantiateConfigProposal {
  $typeUrl?: "/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal";
  /** Title is a short summary */
  title: string;
  /** Description is a human readable text */
  description: string;
  /**
   * AccessConfigUpdate contains the list of code ids and the access config
   * to be applied.
   */
  accessConfigUpdates: AccessConfigUpdate[];
}
export interface UpdateInstantiateConfigProposalProtoMsg {
  typeUrl: "/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal";
  value: Uint8Array;
}
/**
 * UpdateInstantiateConfigProposal gov proposal content type to update
 * instantiate config to a  set of code ids.
 */
export interface UpdateInstantiateConfigProposalAmino {
  /** Title is a short summary */
  title?: string;
  /** Description is a human readable text */
  description?: string;
  /**
   * AccessConfigUpdate contains the list of code ids and the access config
   * to be applied.
   */
  access_config_updates?: AccessConfigUpdateAmino[];
}
export interface UpdateInstantiateConfigProposalAminoMsg {
  type: "wasm/UpdateInstantiateConfigProposal";
  value: UpdateInstantiateConfigProposalAmino;
}
/**
 * UpdateInstantiateConfigProposal gov proposal content type to update
 * instantiate config to a  set of code ids.
 */
export interface UpdateInstantiateConfigProposalSDKType {
  $typeUrl?: "/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal";
  title: string;
  description: string;
  access_config_updates: AccessConfigUpdateSDKType[];
}
/**
 * StoreAndInstantiateContractProposal gov proposal content type to store
 * and instantiate the contract.
 */
export interface StoreAndInstantiateContractProposal {
  $typeUrl?: "/cosmwasm.wasm.v1.StoreAndInstantiateContractProposal";
  /** Title is a short summary */
  title: string;
  /** Description is a human readable text */
  description: string;
  /** RunAs is the address that is passed to the contract's environment as sender */
  runAs: string;
  /** WASMByteCode can be raw or gzip compressed */
  wasmByteCode: Uint8Array;
  /** InstantiatePermission to apply on contract creation, optional */
  instantiatePermission?: AccessConfig;
  /** UnpinCode code on upload, optional */
  unpinCode: boolean;
  /** Admin is an optional address that can execute migrations */
  admin: string;
  /** Label is optional metadata to be stored with a constract instance. */
  label: string;
  /** Msg json encoded message to be passed to the contract on instantiation */
  msg: Uint8Array;
  /** Funds coins that are transferred to the contract on instantiation */
  funds: Coin[];
  /** Source is the URL where the code is hosted */
  source: string;
  /**
   * Builder is the docker image used to build the code deterministically, used
   * for smart contract verification
   */
  builder: string;
  /**
   * CodeHash is the SHA256 sum of the code outputted by builder, used for smart
   * contract verification
   */
  codeHash: Uint8Array;
}
export interface StoreAndInstantiateContractProposalProtoMsg {
  typeUrl: "/cosmwasm.wasm.v1.StoreAndInstantiateContractProposal";
  value: Uint8Array;
}
/**
 * StoreAndInstantiateContractProposal gov proposal content type to store
 * and instantiate the contract.
 */
export interface StoreAndInstantiateContractProposalAmino {
  /** Title is a short summary */
  title?: string;
  /** Description is a human readable text */
  description?: string;
  /** RunAs is the address that is passed to the contract's environment as sender */
  run_as?: string;
  /** WASMByteCode can be raw or gzip compressed */
  wasm_byte_code?: string;
  /** InstantiatePermission to apply on contract creation, optional */
  instantiate_permission?: AccessConfigAmino;
  /** UnpinCode code on upload, optional */
  unpin_code?: boolean;
  /** Admin is an optional address that can execute migrations */
  admin?: string;
  /** Label is optional metadata to be stored with a constract instance. */
  label?: string;
  /** Msg json encoded message to be passed to the contract on instantiation */
  msg?: any;
  /** Funds coins that are transferred to the contract on instantiation */
  funds?: CoinAmino[];
  /** Source is the URL where the code is hosted */
  source?: string;
  /**
   * Builder is the docker image used to build the code deterministically, used
   * for smart contract verification
   */
  builder?: string;
  /**
   * CodeHash is the SHA256 sum of the code outputted by builder, used for smart
   * contract verification
   */
  code_hash?: string;
}
export interface StoreAndInstantiateContractProposalAminoMsg {
  type: "wasm/StoreAndInstantiateContractProposal";
  value: StoreAndInstantiateContractProposalAmino;
}
/**
 * StoreAndInstantiateContractProposal gov proposal content type to store
 * and instantiate the contract.
 */
export interface StoreAndInstantiateContractProposalSDKType {
  $typeUrl?: "/cosmwasm.wasm.v1.StoreAndInstantiateContractProposal";
  title: string;
  description: string;
  run_as: string;
  wasm_byte_code: Uint8Array;
  instantiate_permission?: AccessConfigSDKType;
  unpin_code: boolean;
  admin: string;
  label: string;
  msg: Uint8Array;
  funds: CoinSDKType[];
  source: string;
  builder: string;
  code_hash: Uint8Array;
}
function createBaseStoreCodeProposal(): StoreCodeProposal {
  return {
    $typeUrl: "/cosmwasm.wasm.v1.StoreCodeProposal",
    title: "",
    description: "",
    runAs: "",
    wasmByteCode: new Uint8Array(),
    instantiatePermission: undefined,
    unpinCode: false,
    source: "",
    builder: "",
    codeHash: new Uint8Array()
  };
}
export const StoreCodeProposal = {
  typeUrl: "/cosmwasm.wasm.v1.StoreCodeProposal",
  encode(message: StoreCodeProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.runAs !== "") {
      writer.uint32(26).string(message.runAs);
    }
    if (message.wasmByteCode.length !== 0) {
      writer.uint32(34).bytes(message.wasmByteCode);
    }
    if (message.instantiatePermission !== undefined) {
      AccessConfig.encode(message.instantiatePermission, writer.uint32(58).fork()).ldelim();
    }
    if (message.unpinCode === true) {
      writer.uint32(64).bool(message.unpinCode);
    }
    if (message.source !== "") {
      writer.uint32(74).string(message.source);
    }
    if (message.builder !== "") {
      writer.uint32(82).string(message.builder);
    }
    if (message.codeHash.length !== 0) {
      writer.uint32(90).bytes(message.codeHash);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): StoreCodeProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoreCodeProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.runAs = reader.string();
          break;
        case 4:
          message.wasmByteCode = reader.bytes();
          break;
        case 7:
          message.instantiatePermission = AccessConfig.decode(reader, reader.uint32());
          break;
        case 8:
          message.unpinCode = reader.bool();
          break;
        case 9:
          message.source = reader.string();
          break;
        case 10:
          message.builder = reader.string();
          break;
        case 11:
          message.codeHash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): StoreCodeProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      runAs: isSet(object.runAs) ? String(object.runAs) : "",
      wasmByteCode: isSet(object.wasmByteCode) ? bytesFromBase64(object.wasmByteCode) : new Uint8Array(),
      instantiatePermission: isSet(object.instantiatePermission) ? AccessConfig.fromJSON(object.instantiatePermission) : undefined,
      unpinCode: isSet(object.unpinCode) ? Boolean(object.unpinCode) : false,
      source: isSet(object.source) ? String(object.source) : "",
      builder: isSet(object.builder) ? String(object.builder) : "",
      codeHash: isSet(object.codeHash) ? bytesFromBase64(object.codeHash) : new Uint8Array()
    };
  },
  toJSON(message: StoreCodeProposal): JsonSafe<StoreCodeProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.runAs !== undefined && (obj.runAs = message.runAs);
    message.wasmByteCode !== undefined && (obj.wasmByteCode = base64FromBytes(message.wasmByteCode !== undefined ? message.wasmByteCode : new Uint8Array()));
    message.instantiatePermission !== undefined && (obj.instantiatePermission = message.instantiatePermission ? AccessConfig.toJSON(message.instantiatePermission) : undefined);
    message.unpinCode !== undefined && (obj.unpinCode = message.unpinCode);
    message.source !== undefined && (obj.source = message.source);
    message.builder !== undefined && (obj.builder = message.builder);
    message.codeHash !== undefined && (obj.codeHash = base64FromBytes(message.codeHash !== undefined ? message.codeHash : new Uint8Array()));
    return obj;
  },
  fromPartial(object: Partial<StoreCodeProposal>): StoreCodeProposal {
    const message = createBaseStoreCodeProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.runAs = object.runAs ?? "";
    message.wasmByteCode = object.wasmByteCode ?? new Uint8Array();
    message.instantiatePermission = object.instantiatePermission !== undefined && object.instantiatePermission !== null ? AccessConfig.fromPartial(object.instantiatePermission) : undefined;
    message.unpinCode = object.unpinCode ?? false;
    message.source = object.source ?? "";
    message.builder = object.builder ?? "";
    message.codeHash = object.codeHash ?? new Uint8Array();
    return message;
  },
  fromAmino(object: StoreCodeProposalAmino): StoreCodeProposal {
    const message = createBaseStoreCodeProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.run_as !== undefined && object.run_as !== null) {
      message.runAs = object.run_as;
    }
    if (object.wasm_byte_code !== undefined && object.wasm_byte_code !== null) {
      message.wasmByteCode = fromBase64(object.wasm_byte_code);
    }
    if (object.instantiate_permission !== undefined && object.instantiate_permission !== null) {
      message.instantiatePermission = AccessConfig.fromAmino(object.instantiate_permission);
    }
    if (object.unpin_code !== undefined && object.unpin_code !== null) {
      message.unpinCode = object.unpin_code;
    }
    if (object.source !== undefined && object.source !== null) {
      message.source = object.source;
    }
    if (object.builder !== undefined && object.builder !== null) {
      message.builder = object.builder;
    }
    if (object.code_hash !== undefined && object.code_hash !== null) {
      message.codeHash = bytesFromBase64(object.code_hash);
    }
    return message;
  },
  toAmino(message: StoreCodeProposal): StoreCodeProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    obj.run_as = message.runAs === "" ? undefined : message.runAs;
    obj.wasm_byte_code = message.wasmByteCode ? toBase64(message.wasmByteCode) : undefined;
    obj.instantiate_permission = message.instantiatePermission ? AccessConfig.toAmino(message.instantiatePermission) : undefined;
    obj.unpin_code = message.unpinCode === false ? undefined : message.unpinCode;
    obj.source = message.source === "" ? undefined : message.source;
    obj.builder = message.builder === "" ? undefined : message.builder;
    obj.code_hash = message.codeHash ? base64FromBytes(message.codeHash) : undefined;
    return obj;
  },
  fromAminoMsg(object: StoreCodeProposalAminoMsg): StoreCodeProposal {
    return StoreCodeProposal.fromAmino(object.value);
  },
  toAminoMsg(message: StoreCodeProposal): StoreCodeProposalAminoMsg {
    return {
      type: "wasm/StoreCodeProposal",
      value: StoreCodeProposal.toAmino(message)
    };
  },
  fromProtoMsg(message: StoreCodeProposalProtoMsg): StoreCodeProposal {
    return StoreCodeProposal.decode(message.value);
  },
  toProto(message: StoreCodeProposal): Uint8Array {
    return StoreCodeProposal.encode(message).finish();
  },
  toProtoMsg(message: StoreCodeProposal): StoreCodeProposalProtoMsg {
    return {
      typeUrl: "/cosmwasm.wasm.v1.StoreCodeProposal",
      value: StoreCodeProposal.encode(message).finish()
    };
  }
};
function createBaseInstantiateContractProposal(): InstantiateContractProposal {
  return {
    $typeUrl: "/cosmwasm.wasm.v1.InstantiateContractProposal",
    title: "",
    description: "",
    runAs: "",
    admin: "",
    codeId: BigInt(0),
    label: "",
    msg: new Uint8Array(),
    funds: []
  };
}
export const InstantiateContractProposal = {
  typeUrl: "/cosmwasm.wasm.v1.InstantiateContractProposal",
  encode(message: InstantiateContractProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.runAs !== "") {
      writer.uint32(26).string(message.runAs);
    }
    if (message.admin !== "") {
      writer.uint32(34).string(message.admin);
    }
    if (message.codeId !== BigInt(0)) {
      writer.uint32(40).uint64(message.codeId);
    }
    if (message.label !== "") {
      writer.uint32(50).string(message.label);
    }
    if (message.msg.length !== 0) {
      writer.uint32(58).bytes(message.msg);
    }
    for (const v of message.funds) {
      Coin.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): InstantiateContractProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstantiateContractProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.runAs = reader.string();
          break;
        case 4:
          message.admin = reader.string();
          break;
        case 5:
          message.codeId = reader.uint64();
          break;
        case 6:
          message.label = reader.string();
          break;
        case 7:
          message.msg = reader.bytes();
          break;
        case 8:
          message.funds.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): InstantiateContractProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      runAs: isSet(object.runAs) ? String(object.runAs) : "",
      admin: isSet(object.admin) ? String(object.admin) : "",
      codeId: isSet(object.codeId) ? BigInt(object.codeId.toString()) : BigInt(0),
      label: isSet(object.label) ? String(object.label) : "",
      msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(),
      funds: Array.isArray(object?.funds) ? object.funds.map((e: any) => Coin.fromJSON(e)) : []
    };
  },
  toJSON(message: InstantiateContractProposal): JsonSafe<InstantiateContractProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.runAs !== undefined && (obj.runAs = message.runAs);
    message.admin !== undefined && (obj.admin = message.admin);
    message.codeId !== undefined && (obj.codeId = (message.codeId || BigInt(0)).toString());
    message.label !== undefined && (obj.label = message.label);
    message.msg !== undefined && (obj.msg = base64FromBytes(message.msg !== undefined ? message.msg : new Uint8Array()));
    if (message.funds) {
      obj.funds = message.funds.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.funds = [];
    }
    return obj;
  },
  fromPartial(object: Partial<InstantiateContractProposal>): InstantiateContractProposal {
    const message = createBaseInstantiateContractProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.runAs = object.runAs ?? "";
    message.admin = object.admin ?? "";
    message.codeId = object.codeId !== undefined && object.codeId !== null ? BigInt(object.codeId.toString()) : BigInt(0);
    message.label = object.label ?? "";
    message.msg = object.msg ?? new Uint8Array();
    message.funds = object.funds?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: InstantiateContractProposalAmino): InstantiateContractProposal {
    const message = createBaseInstantiateContractProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.run_as !== undefined && object.run_as !== null) {
      message.runAs = object.run_as;
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin;
    }
    if (object.code_id !== undefined && object.code_id !== null) {
      message.codeId = BigInt(object.code_id);
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = object.label;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = toUtf8(JSON.stringify(object.msg));
    }
    message.funds = object.funds?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: InstantiateContractProposal): InstantiateContractProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    obj.run_as = message.runAs === "" ? undefined : message.runAs;
    obj.admin = message.admin === "" ? undefined : message.admin;
    obj.code_id = message.codeId !== BigInt(0) ? message.codeId.toString() : undefined;
    obj.label = message.label === "" ? undefined : message.label;
    obj.msg = message.msg ? JSON.parse(fromUtf8(message.msg)) : undefined;
    if (message.funds) {
      obj.funds = message.funds.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.funds = message.funds;
    }
    return obj;
  },
  fromAminoMsg(object: InstantiateContractProposalAminoMsg): InstantiateContractProposal {
    return InstantiateContractProposal.fromAmino(object.value);
  },
  toAminoMsg(message: InstantiateContractProposal): InstantiateContractProposalAminoMsg {
    return {
      type: "wasm/InstantiateContractProposal",
      value: InstantiateContractProposal.toAmino(message)
    };
  },
  fromProtoMsg(message: InstantiateContractProposalProtoMsg): InstantiateContractProposal {
    return InstantiateContractProposal.decode(message.value);
  },
  toProto(message: InstantiateContractProposal): Uint8Array {
    return InstantiateContractProposal.encode(message).finish();
  },
  toProtoMsg(message: InstantiateContractProposal): InstantiateContractProposalProtoMsg {
    return {
      typeUrl: "/cosmwasm.wasm.v1.InstantiateContractProposal",
      value: InstantiateContractProposal.encode(message).finish()
    };
  }
};
function createBaseInstantiateContract2Proposal(): InstantiateContract2Proposal {
  return {
    $typeUrl: "/cosmwasm.wasm.v1.InstantiateContract2Proposal",
    title: "",
    description: "",
    runAs: "",
    admin: "",
    codeId: BigInt(0),
    label: "",
    msg: new Uint8Array(),
    funds: [],
    salt: new Uint8Array(),
    fixMsg: false
  };
}
export const InstantiateContract2Proposal = {
  typeUrl: "/cosmwasm.wasm.v1.InstantiateContract2Proposal",
  encode(message: InstantiateContract2Proposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.runAs !== "") {
      writer.uint32(26).string(message.runAs);
    }
    if (message.admin !== "") {
      writer.uint32(34).string(message.admin);
    }
    if (message.codeId !== BigInt(0)) {
      writer.uint32(40).uint64(message.codeId);
    }
    if (message.label !== "") {
      writer.uint32(50).string(message.label);
    }
    if (message.msg.length !== 0) {
      writer.uint32(58).bytes(message.msg);
    }
    for (const v of message.funds) {
      Coin.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.salt.length !== 0) {
      writer.uint32(74).bytes(message.salt);
    }
    if (message.fixMsg === true) {
      writer.uint32(80).bool(message.fixMsg);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): InstantiateContract2Proposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstantiateContract2Proposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.runAs = reader.string();
          break;
        case 4:
          message.admin = reader.string();
          break;
        case 5:
          message.codeId = reader.uint64();
          break;
        case 6:
          message.label = reader.string();
          break;
        case 7:
          message.msg = reader.bytes();
          break;
        case 8:
          message.funds.push(Coin.decode(reader, reader.uint32()));
          break;
        case 9:
          message.salt = reader.bytes();
          break;
        case 10:
          message.fixMsg = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): InstantiateContract2Proposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      runAs: isSet(object.runAs) ? String(object.runAs) : "",
      admin: isSet(object.admin) ? String(object.admin) : "",
      codeId: isSet(object.codeId) ? BigInt(object.codeId.toString()) : BigInt(0),
      label: isSet(object.label) ? String(object.label) : "",
      msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(),
      funds: Array.isArray(object?.funds) ? object.funds.map((e: any) => Coin.fromJSON(e)) : [],
      salt: isSet(object.salt) ? bytesFromBase64(object.salt) : new Uint8Array(),
      fixMsg: isSet(object.fixMsg) ? Boolean(object.fixMsg) : false
    };
  },
  toJSON(message: InstantiateContract2Proposal): JsonSafe<InstantiateContract2Proposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.runAs !== undefined && (obj.runAs = message.runAs);
    message.admin !== undefined && (obj.admin = message.admin);
    message.codeId !== undefined && (obj.codeId = (message.codeId || BigInt(0)).toString());
    message.label !== undefined && (obj.label = message.label);
    message.msg !== undefined && (obj.msg = base64FromBytes(message.msg !== undefined ? message.msg : new Uint8Array()));
    if (message.funds) {
      obj.funds = message.funds.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.funds = [];
    }
    message.salt !== undefined && (obj.salt = base64FromBytes(message.salt !== undefined ? message.salt : new Uint8Array()));
    message.fixMsg !== undefined && (obj.fixMsg = message.fixMsg);
    return obj;
  },
  fromPartial(object: Partial<InstantiateContract2Proposal>): InstantiateContract2Proposal {
    const message = createBaseInstantiateContract2Proposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.runAs = object.runAs ?? "";
    message.admin = object.admin ?? "";
    message.codeId = object.codeId !== undefined && object.codeId !== null ? BigInt(object.codeId.toString()) : BigInt(0);
    message.label = object.label ?? "";
    message.msg = object.msg ?? new Uint8Array();
    message.funds = object.funds?.map(e => Coin.fromPartial(e)) || [];
    message.salt = object.salt ?? new Uint8Array();
    message.fixMsg = object.fixMsg ?? false;
    return message;
  },
  fromAmino(object: InstantiateContract2ProposalAmino): InstantiateContract2Proposal {
    const message = createBaseInstantiateContract2Proposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.run_as !== undefined && object.run_as !== null) {
      message.runAs = object.run_as;
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin;
    }
    if (object.code_id !== undefined && object.code_id !== null) {
      message.codeId = BigInt(object.code_id);
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = object.label;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = toUtf8(JSON.stringify(object.msg));
    }
    message.funds = object.funds?.map(e => Coin.fromAmino(e)) || [];
    if (object.salt !== undefined && object.salt !== null) {
      message.salt = bytesFromBase64(object.salt);
    }
    if (object.fix_msg !== undefined && object.fix_msg !== null) {
      message.fixMsg = object.fix_msg;
    }
    return message;
  },
  toAmino(message: InstantiateContract2Proposal): InstantiateContract2ProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    obj.run_as = message.runAs === "" ? undefined : message.runAs;
    obj.admin = message.admin === "" ? undefined : message.admin;
    obj.code_id = message.codeId !== BigInt(0) ? message.codeId.toString() : undefined;
    obj.label = message.label === "" ? undefined : message.label;
    obj.msg = message.msg ? JSON.parse(fromUtf8(message.msg)) : undefined;
    if (message.funds) {
      obj.funds = message.funds.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.funds = message.funds;
    }
    obj.salt = message.salt ? base64FromBytes(message.salt) : undefined;
    obj.fix_msg = message.fixMsg === false ? undefined : message.fixMsg;
    return obj;
  },
  fromAminoMsg(object: InstantiateContract2ProposalAminoMsg): InstantiateContract2Proposal {
    return InstantiateContract2Proposal.fromAmino(object.value);
  },
  toAminoMsg(message: InstantiateContract2Proposal): InstantiateContract2ProposalAminoMsg {
    return {
      type: "wasm/InstantiateContract2Proposal",
      value: InstantiateContract2Proposal.toAmino(message)
    };
  },
  fromProtoMsg(message: InstantiateContract2ProposalProtoMsg): InstantiateContract2Proposal {
    return InstantiateContract2Proposal.decode(message.value);
  },
  toProto(message: InstantiateContract2Proposal): Uint8Array {
    return InstantiateContract2Proposal.encode(message).finish();
  },
  toProtoMsg(message: InstantiateContract2Proposal): InstantiateContract2ProposalProtoMsg {
    return {
      typeUrl: "/cosmwasm.wasm.v1.InstantiateContract2Proposal",
      value: InstantiateContract2Proposal.encode(message).finish()
    };
  }
};
function createBaseMigrateContractProposal(): MigrateContractProposal {
  return {
    $typeUrl: "/cosmwasm.wasm.v1.MigrateContractProposal",
    title: "",
    description: "",
    contract: "",
    codeId: BigInt(0),
    msg: new Uint8Array()
  };
}
export const MigrateContractProposal = {
  typeUrl: "/cosmwasm.wasm.v1.MigrateContractProposal",
  encode(message: MigrateContractProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.contract !== "") {
      writer.uint32(34).string(message.contract);
    }
    if (message.codeId !== BigInt(0)) {
      writer.uint32(40).uint64(message.codeId);
    }
    if (message.msg.length !== 0) {
      writer.uint32(50).bytes(message.msg);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MigrateContractProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMigrateContractProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 4:
          message.contract = reader.string();
          break;
        case 5:
          message.codeId = reader.uint64();
          break;
        case 6:
          message.msg = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MigrateContractProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      contract: isSet(object.contract) ? String(object.contract) : "",
      codeId: isSet(object.codeId) ? BigInt(object.codeId.toString()) : BigInt(0),
      msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array()
    };
  },
  toJSON(message: MigrateContractProposal): JsonSafe<MigrateContractProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.contract !== undefined && (obj.contract = message.contract);
    message.codeId !== undefined && (obj.codeId = (message.codeId || BigInt(0)).toString());
    message.msg !== undefined && (obj.msg = base64FromBytes(message.msg !== undefined ? message.msg : new Uint8Array()));
    return obj;
  },
  fromPartial(object: Partial<MigrateContractProposal>): MigrateContractProposal {
    const message = createBaseMigrateContractProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.contract = object.contract ?? "";
    message.codeId = object.codeId !== undefined && object.codeId !== null ? BigInt(object.codeId.toString()) : BigInt(0);
    message.msg = object.msg ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MigrateContractProposalAmino): MigrateContractProposal {
    const message = createBaseMigrateContractProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = object.contract;
    }
    if (object.code_id !== undefined && object.code_id !== null) {
      message.codeId = BigInt(object.code_id);
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = toUtf8(JSON.stringify(object.msg));
    }
    return message;
  },
  toAmino(message: MigrateContractProposal): MigrateContractProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    obj.contract = message.contract === "" ? undefined : message.contract;
    obj.code_id = message.codeId !== BigInt(0) ? message.codeId.toString() : undefined;
    obj.msg = message.msg ? JSON.parse(fromUtf8(message.msg)) : undefined;
    return obj;
  },
  fromAminoMsg(object: MigrateContractProposalAminoMsg): MigrateContractProposal {
    return MigrateContractProposal.fromAmino(object.value);
  },
  toAminoMsg(message: MigrateContractProposal): MigrateContractProposalAminoMsg {
    return {
      type: "wasm/MigrateContractProposal",
      value: MigrateContractProposal.toAmino(message)
    };
  },
  fromProtoMsg(message: MigrateContractProposalProtoMsg): MigrateContractProposal {
    return MigrateContractProposal.decode(message.value);
  },
  toProto(message: MigrateContractProposal): Uint8Array {
    return MigrateContractProposal.encode(message).finish();
  },
  toProtoMsg(message: MigrateContractProposal): MigrateContractProposalProtoMsg {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MigrateContractProposal",
      value: MigrateContractProposal.encode(message).finish()
    };
  }
};
function createBaseSudoContractProposal(): SudoContractProposal {
  return {
    $typeUrl: "/cosmwasm.wasm.v1.SudoContractProposal",
    title: "",
    description: "",
    contract: "",
    msg: new Uint8Array()
  };
}
export const SudoContractProposal = {
  typeUrl: "/cosmwasm.wasm.v1.SudoContractProposal",
  encode(message: SudoContractProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.contract !== "") {
      writer.uint32(26).string(message.contract);
    }
    if (message.msg.length !== 0) {
      writer.uint32(34).bytes(message.msg);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SudoContractProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSudoContractProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.contract = reader.string();
          break;
        case 4:
          message.msg = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SudoContractProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      contract: isSet(object.contract) ? String(object.contract) : "",
      msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array()
    };
  },
  toJSON(message: SudoContractProposal): JsonSafe<SudoContractProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.contract !== undefined && (obj.contract = message.contract);
    message.msg !== undefined && (obj.msg = base64FromBytes(message.msg !== undefined ? message.msg : new Uint8Array()));
    return obj;
  },
  fromPartial(object: Partial<SudoContractProposal>): SudoContractProposal {
    const message = createBaseSudoContractProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.contract = object.contract ?? "";
    message.msg = object.msg ?? new Uint8Array();
    return message;
  },
  fromAmino(object: SudoContractProposalAmino): SudoContractProposal {
    const message = createBaseSudoContractProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = object.contract;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = toUtf8(JSON.stringify(object.msg));
    }
    return message;
  },
  toAmino(message: SudoContractProposal): SudoContractProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    obj.contract = message.contract === "" ? undefined : message.contract;
    obj.msg = message.msg ? JSON.parse(fromUtf8(message.msg)) : undefined;
    return obj;
  },
  fromAminoMsg(object: SudoContractProposalAminoMsg): SudoContractProposal {
    return SudoContractProposal.fromAmino(object.value);
  },
  toAminoMsg(message: SudoContractProposal): SudoContractProposalAminoMsg {
    return {
      type: "wasm/SudoContractProposal",
      value: SudoContractProposal.toAmino(message)
    };
  },
  fromProtoMsg(message: SudoContractProposalProtoMsg): SudoContractProposal {
    return SudoContractProposal.decode(message.value);
  },
  toProto(message: SudoContractProposal): Uint8Array {
    return SudoContractProposal.encode(message).finish();
  },
  toProtoMsg(message: SudoContractProposal): SudoContractProposalProtoMsg {
    return {
      typeUrl: "/cosmwasm.wasm.v1.SudoContractProposal",
      value: SudoContractProposal.encode(message).finish()
    };
  }
};
function createBaseExecuteContractProposal(): ExecuteContractProposal {
  return {
    $typeUrl: "/cosmwasm.wasm.v1.ExecuteContractProposal",
    title: "",
    description: "",
    runAs: "",
    contract: "",
    msg: new Uint8Array(),
    funds: []
  };
}
export const ExecuteContractProposal = {
  typeUrl: "/cosmwasm.wasm.v1.ExecuteContractProposal",
  encode(message: ExecuteContractProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.runAs !== "") {
      writer.uint32(26).string(message.runAs);
    }
    if (message.contract !== "") {
      writer.uint32(34).string(message.contract);
    }
    if (message.msg.length !== 0) {
      writer.uint32(42).bytes(message.msg);
    }
    for (const v of message.funds) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ExecuteContractProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteContractProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.runAs = reader.string();
          break;
        case 4:
          message.contract = reader.string();
          break;
        case 5:
          message.msg = reader.bytes();
          break;
        case 6:
          message.funds.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ExecuteContractProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      runAs: isSet(object.runAs) ? String(object.runAs) : "",
      contract: isSet(object.contract) ? String(object.contract) : "",
      msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(),
      funds: Array.isArray(object?.funds) ? object.funds.map((e: any) => Coin.fromJSON(e)) : []
    };
  },
  toJSON(message: ExecuteContractProposal): JsonSafe<ExecuteContractProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.runAs !== undefined && (obj.runAs = message.runAs);
    message.contract !== undefined && (obj.contract = message.contract);
    message.msg !== undefined && (obj.msg = base64FromBytes(message.msg !== undefined ? message.msg : new Uint8Array()));
    if (message.funds) {
      obj.funds = message.funds.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.funds = [];
    }
    return obj;
  },
  fromPartial(object: Partial<ExecuteContractProposal>): ExecuteContractProposal {
    const message = createBaseExecuteContractProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.runAs = object.runAs ?? "";
    message.contract = object.contract ?? "";
    message.msg = object.msg ?? new Uint8Array();
    message.funds = object.funds?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ExecuteContractProposalAmino): ExecuteContractProposal {
    const message = createBaseExecuteContractProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.run_as !== undefined && object.run_as !== null) {
      message.runAs = object.run_as;
    }
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = object.contract;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = toUtf8(JSON.stringify(object.msg));
    }
    message.funds = object.funds?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: ExecuteContractProposal): ExecuteContractProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    obj.run_as = message.runAs === "" ? undefined : message.runAs;
    obj.contract = message.contract === "" ? undefined : message.contract;
    obj.msg = message.msg ? JSON.parse(fromUtf8(message.msg)) : undefined;
    if (message.funds) {
      obj.funds = message.funds.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.funds = message.funds;
    }
    return obj;
  },
  fromAminoMsg(object: ExecuteContractProposalAminoMsg): ExecuteContractProposal {
    return ExecuteContractProposal.fromAmino(object.value);
  },
  toAminoMsg(message: ExecuteContractProposal): ExecuteContractProposalAminoMsg {
    return {
      type: "wasm/ExecuteContractProposal",
      value: ExecuteContractProposal.toAmino(message)
    };
  },
  fromProtoMsg(message: ExecuteContractProposalProtoMsg): ExecuteContractProposal {
    return ExecuteContractProposal.decode(message.value);
  },
  toProto(message: ExecuteContractProposal): Uint8Array {
    return ExecuteContractProposal.encode(message).finish();
  },
  toProtoMsg(message: ExecuteContractProposal): ExecuteContractProposalProtoMsg {
    return {
      typeUrl: "/cosmwasm.wasm.v1.ExecuteContractProposal",
      value: ExecuteContractProposal.encode(message).finish()
    };
  }
};
function createBaseUpdateAdminProposal(): UpdateAdminProposal {
  return {
    $typeUrl: "/cosmwasm.wasm.v1.UpdateAdminProposal",
    title: "",
    description: "",
    newAdmin: "",
    contract: ""
  };
}
export const UpdateAdminProposal = {
  typeUrl: "/cosmwasm.wasm.v1.UpdateAdminProposal",
  encode(message: UpdateAdminProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.newAdmin !== "") {
      writer.uint32(26).string(message.newAdmin);
    }
    if (message.contract !== "") {
      writer.uint32(34).string(message.contract);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): UpdateAdminProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateAdminProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.newAdmin = reader.string();
          break;
        case 4:
          message.contract = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): UpdateAdminProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      newAdmin: isSet(object.newAdmin) ? String(object.newAdmin) : "",
      contract: isSet(object.contract) ? String(object.contract) : ""
    };
  },
  toJSON(message: UpdateAdminProposal): JsonSafe<UpdateAdminProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.newAdmin !== undefined && (obj.newAdmin = message.newAdmin);
    message.contract !== undefined && (obj.contract = message.contract);
    return obj;
  },
  fromPartial(object: Partial<UpdateAdminProposal>): UpdateAdminProposal {
    const message = createBaseUpdateAdminProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.newAdmin = object.newAdmin ?? "";
    message.contract = object.contract ?? "";
    return message;
  },
  fromAmino(object: UpdateAdminProposalAmino): UpdateAdminProposal {
    const message = createBaseUpdateAdminProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.new_admin !== undefined && object.new_admin !== null) {
      message.newAdmin = object.new_admin;
    }
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = object.contract;
    }
    return message;
  },
  toAmino(message: UpdateAdminProposal): UpdateAdminProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    obj.new_admin = message.newAdmin === "" ? undefined : message.newAdmin;
    obj.contract = message.contract === "" ? undefined : message.contract;
    return obj;
  },
  fromAminoMsg(object: UpdateAdminProposalAminoMsg): UpdateAdminProposal {
    return UpdateAdminProposal.fromAmino(object.value);
  },
  toAminoMsg(message: UpdateAdminProposal): UpdateAdminProposalAminoMsg {
    return {
      type: "wasm/UpdateAdminProposal",
      value: UpdateAdminProposal.toAmino(message)
    };
  },
  fromProtoMsg(message: UpdateAdminProposalProtoMsg): UpdateAdminProposal {
    return UpdateAdminProposal.decode(message.value);
  },
  toProto(message: UpdateAdminProposal): Uint8Array {
    return UpdateAdminProposal.encode(message).finish();
  },
  toProtoMsg(message: UpdateAdminProposal): UpdateAdminProposalProtoMsg {
    return {
      typeUrl: "/cosmwasm.wasm.v1.UpdateAdminProposal",
      value: UpdateAdminProposal.encode(message).finish()
    };
  }
};
function createBaseClearAdminProposal(): ClearAdminProposal {
  return {
    $typeUrl: "/cosmwasm.wasm.v1.ClearAdminProposal",
    title: "",
    description: "",
    contract: ""
  };
}
export const ClearAdminProposal = {
  typeUrl: "/cosmwasm.wasm.v1.ClearAdminProposal",
  encode(message: ClearAdminProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.contract !== "") {
      writer.uint32(26).string(message.contract);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ClearAdminProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClearAdminProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.contract = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ClearAdminProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      contract: isSet(object.contract) ? String(object.contract) : ""
    };
  },
  toJSON(message: ClearAdminProposal): JsonSafe<ClearAdminProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.contract !== undefined && (obj.contract = message.contract);
    return obj;
  },
  fromPartial(object: Partial<ClearAdminProposal>): ClearAdminProposal {
    const message = createBaseClearAdminProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.contract = object.contract ?? "";
    return message;
  },
  fromAmino(object: ClearAdminProposalAmino): ClearAdminProposal {
    const message = createBaseClearAdminProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = object.contract;
    }
    return message;
  },
  toAmino(message: ClearAdminProposal): ClearAdminProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    obj.contract = message.contract === "" ? undefined : message.contract;
    return obj;
  },
  fromAminoMsg(object: ClearAdminProposalAminoMsg): ClearAdminProposal {
    return ClearAdminProposal.fromAmino(object.value);
  },
  toAminoMsg(message: ClearAdminProposal): ClearAdminProposalAminoMsg {
    return {
      type: "wasm/ClearAdminProposal",
      value: ClearAdminProposal.toAmino(message)
    };
  },
  fromProtoMsg(message: ClearAdminProposalProtoMsg): ClearAdminProposal {
    return ClearAdminProposal.decode(message.value);
  },
  toProto(message: ClearAdminProposal): Uint8Array {
    return ClearAdminProposal.encode(message).finish();
  },
  toProtoMsg(message: ClearAdminProposal): ClearAdminProposalProtoMsg {
    return {
      typeUrl: "/cosmwasm.wasm.v1.ClearAdminProposal",
      value: ClearAdminProposal.encode(message).finish()
    };
  }
};
function createBasePinCodesProposal(): PinCodesProposal {
  return {
    $typeUrl: "/cosmwasm.wasm.v1.PinCodesProposal",
    title: "",
    description: "",
    codeIds: []
  };
}
export const PinCodesProposal = {
  typeUrl: "/cosmwasm.wasm.v1.PinCodesProposal",
  encode(message: PinCodesProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    writer.uint32(26).fork();
    for (const v of message.codeIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PinCodesProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePinCodesProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.codeIds.push(reader.uint64());
            }
          } else {
            message.codeIds.push(reader.uint64());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PinCodesProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      codeIds: Array.isArray(object?.codeIds) ? object.codeIds.map((e: any) => BigInt(e.toString())) : []
    };
  },
  toJSON(message: PinCodesProposal): JsonSafe<PinCodesProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    if (message.codeIds) {
      obj.codeIds = message.codeIds.map(e => (e || BigInt(0)).toString());
    } else {
      obj.codeIds = [];
    }
    return obj;
  },
  fromPartial(object: Partial<PinCodesProposal>): PinCodesProposal {
    const message = createBasePinCodesProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.codeIds = object.codeIds?.map(e => BigInt(e.toString())) || [];
    return message;
  },
  fromAmino(object: PinCodesProposalAmino): PinCodesProposal {
    const message = createBasePinCodesProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    message.codeIds = object.code_ids?.map(e => BigInt(e)) || [];
    return message;
  },
  toAmino(message: PinCodesProposal): PinCodesProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    if (message.codeIds) {
      obj.code_ids = message.codeIds.map(e => e.toString());
    } else {
      obj.code_ids = message.codeIds;
    }
    return obj;
  },
  fromAminoMsg(object: PinCodesProposalAminoMsg): PinCodesProposal {
    return PinCodesProposal.fromAmino(object.value);
  },
  toAminoMsg(message: PinCodesProposal): PinCodesProposalAminoMsg {
    return {
      type: "wasm/PinCodesProposal",
      value: PinCodesProposal.toAmino(message)
    };
  },
  fromProtoMsg(message: PinCodesProposalProtoMsg): PinCodesProposal {
    return PinCodesProposal.decode(message.value);
  },
  toProto(message: PinCodesProposal): Uint8Array {
    return PinCodesProposal.encode(message).finish();
  },
  toProtoMsg(message: PinCodesProposal): PinCodesProposalProtoMsg {
    return {
      typeUrl: "/cosmwasm.wasm.v1.PinCodesProposal",
      value: PinCodesProposal.encode(message).finish()
    };
  }
};
function createBaseUnpinCodesProposal(): UnpinCodesProposal {
  return {
    $typeUrl: "/cosmwasm.wasm.v1.UnpinCodesProposal",
    title: "",
    description: "",
    codeIds: []
  };
}
export const UnpinCodesProposal = {
  typeUrl: "/cosmwasm.wasm.v1.UnpinCodesProposal",
  encode(message: UnpinCodesProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    writer.uint32(26).fork();
    for (const v of message.codeIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): UnpinCodesProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnpinCodesProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.codeIds.push(reader.uint64());
            }
          } else {
            message.codeIds.push(reader.uint64());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): UnpinCodesProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      codeIds: Array.isArray(object?.codeIds) ? object.codeIds.map((e: any) => BigInt(e.toString())) : []
    };
  },
  toJSON(message: UnpinCodesProposal): JsonSafe<UnpinCodesProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    if (message.codeIds) {
      obj.codeIds = message.codeIds.map(e => (e || BigInt(0)).toString());
    } else {
      obj.codeIds = [];
    }
    return obj;
  },
  fromPartial(object: Partial<UnpinCodesProposal>): UnpinCodesProposal {
    const message = createBaseUnpinCodesProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.codeIds = object.codeIds?.map(e => BigInt(e.toString())) || [];
    return message;
  },
  fromAmino(object: UnpinCodesProposalAmino): UnpinCodesProposal {
    const message = createBaseUnpinCodesProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    message.codeIds = object.code_ids?.map(e => BigInt(e)) || [];
    return message;
  },
  toAmino(message: UnpinCodesProposal): UnpinCodesProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    if (message.codeIds) {
      obj.code_ids = message.codeIds.map(e => e.toString());
    } else {
      obj.code_ids = message.codeIds;
    }
    return obj;
  },
  fromAminoMsg(object: UnpinCodesProposalAminoMsg): UnpinCodesProposal {
    return UnpinCodesProposal.fromAmino(object.value);
  },
  toAminoMsg(message: UnpinCodesProposal): UnpinCodesProposalAminoMsg {
    return {
      type: "wasm/UnpinCodesProposal",
      value: UnpinCodesProposal.toAmino(message)
    };
  },
  fromProtoMsg(message: UnpinCodesProposalProtoMsg): UnpinCodesProposal {
    return UnpinCodesProposal.decode(message.value);
  },
  toProto(message: UnpinCodesProposal): Uint8Array {
    return UnpinCodesProposal.encode(message).finish();
  },
  toProtoMsg(message: UnpinCodesProposal): UnpinCodesProposalProtoMsg {
    return {
      typeUrl: "/cosmwasm.wasm.v1.UnpinCodesProposal",
      value: UnpinCodesProposal.encode(message).finish()
    };
  }
};
function createBaseAccessConfigUpdate(): AccessConfigUpdate {
  return {
    codeId: BigInt(0),
    instantiatePermission: AccessConfig.fromPartial({})
  };
}
export const AccessConfigUpdate = {
  typeUrl: "/cosmwasm.wasm.v1.AccessConfigUpdate",
  encode(message: AccessConfigUpdate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.codeId !== BigInt(0)) {
      writer.uint32(8).uint64(message.codeId);
    }
    if (message.instantiatePermission !== undefined) {
      AccessConfig.encode(message.instantiatePermission, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AccessConfigUpdate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccessConfigUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeId = reader.uint64();
          break;
        case 2:
          message.instantiatePermission = AccessConfig.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AccessConfigUpdate {
    return {
      codeId: isSet(object.codeId) ? BigInt(object.codeId.toString()) : BigInt(0),
      instantiatePermission: isSet(object.instantiatePermission) ? AccessConfig.fromJSON(object.instantiatePermission) : undefined
    };
  },
  toJSON(message: AccessConfigUpdate): JsonSafe<AccessConfigUpdate> {
    const obj: any = {};
    message.codeId !== undefined && (obj.codeId = (message.codeId || BigInt(0)).toString());
    message.instantiatePermission !== undefined && (obj.instantiatePermission = message.instantiatePermission ? AccessConfig.toJSON(message.instantiatePermission) : undefined);
    return obj;
  },
  fromPartial(object: Partial<AccessConfigUpdate>): AccessConfigUpdate {
    const message = createBaseAccessConfigUpdate();
    message.codeId = object.codeId !== undefined && object.codeId !== null ? BigInt(object.codeId.toString()) : BigInt(0);
    message.instantiatePermission = object.instantiatePermission !== undefined && object.instantiatePermission !== null ? AccessConfig.fromPartial(object.instantiatePermission) : undefined;
    return message;
  },
  fromAmino(object: AccessConfigUpdateAmino): AccessConfigUpdate {
    const message = createBaseAccessConfigUpdate();
    if (object.code_id !== undefined && object.code_id !== null) {
      message.codeId = BigInt(object.code_id);
    }
    if (object.instantiate_permission !== undefined && object.instantiate_permission !== null) {
      message.instantiatePermission = AccessConfig.fromAmino(object.instantiate_permission);
    }
    return message;
  },
  toAmino(message: AccessConfigUpdate): AccessConfigUpdateAmino {
    const obj: any = {};
    obj.code_id = message.codeId !== BigInt(0) ? message.codeId.toString() : undefined;
    obj.instantiate_permission = message.instantiatePermission ? AccessConfig.toAmino(message.instantiatePermission) : undefined;
    return obj;
  },
  fromAminoMsg(object: AccessConfigUpdateAminoMsg): AccessConfigUpdate {
    return AccessConfigUpdate.fromAmino(object.value);
  },
  toAminoMsg(message: AccessConfigUpdate): AccessConfigUpdateAminoMsg {
    return {
      type: "wasm/AccessConfigUpdate",
      value: AccessConfigUpdate.toAmino(message)
    };
  },
  fromProtoMsg(message: AccessConfigUpdateProtoMsg): AccessConfigUpdate {
    return AccessConfigUpdate.decode(message.value);
  },
  toProto(message: AccessConfigUpdate): Uint8Array {
    return AccessConfigUpdate.encode(message).finish();
  },
  toProtoMsg(message: AccessConfigUpdate): AccessConfigUpdateProtoMsg {
    return {
      typeUrl: "/cosmwasm.wasm.v1.AccessConfigUpdate",
      value: AccessConfigUpdate.encode(message).finish()
    };
  }
};
function createBaseUpdateInstantiateConfigProposal(): UpdateInstantiateConfigProposal {
  return {
    $typeUrl: "/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal",
    title: "",
    description: "",
    accessConfigUpdates: []
  };
}
export const UpdateInstantiateConfigProposal = {
  typeUrl: "/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal",
  encode(message: UpdateInstantiateConfigProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.accessConfigUpdates) {
      AccessConfigUpdate.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): UpdateInstantiateConfigProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateInstantiateConfigProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.accessConfigUpdates.push(AccessConfigUpdate.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): UpdateInstantiateConfigProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      accessConfigUpdates: Array.isArray(object?.accessConfigUpdates) ? object.accessConfigUpdates.map((e: any) => AccessConfigUpdate.fromJSON(e)) : []
    };
  },
  toJSON(message: UpdateInstantiateConfigProposal): JsonSafe<UpdateInstantiateConfigProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    if (message.accessConfigUpdates) {
      obj.accessConfigUpdates = message.accessConfigUpdates.map(e => e ? AccessConfigUpdate.toJSON(e) : undefined);
    } else {
      obj.accessConfigUpdates = [];
    }
    return obj;
  },
  fromPartial(object: Partial<UpdateInstantiateConfigProposal>): UpdateInstantiateConfigProposal {
    const message = createBaseUpdateInstantiateConfigProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.accessConfigUpdates = object.accessConfigUpdates?.map(e => AccessConfigUpdate.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: UpdateInstantiateConfigProposalAmino): UpdateInstantiateConfigProposal {
    const message = createBaseUpdateInstantiateConfigProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    message.accessConfigUpdates = object.access_config_updates?.map(e => AccessConfigUpdate.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: UpdateInstantiateConfigProposal): UpdateInstantiateConfigProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    if (message.accessConfigUpdates) {
      obj.access_config_updates = message.accessConfigUpdates.map(e => e ? AccessConfigUpdate.toAmino(e) : undefined);
    } else {
      obj.access_config_updates = message.accessConfigUpdates;
    }
    return obj;
  },
  fromAminoMsg(object: UpdateInstantiateConfigProposalAminoMsg): UpdateInstantiateConfigProposal {
    return UpdateInstantiateConfigProposal.fromAmino(object.value);
  },
  toAminoMsg(message: UpdateInstantiateConfigProposal): UpdateInstantiateConfigProposalAminoMsg {
    return {
      type: "wasm/UpdateInstantiateConfigProposal",
      value: UpdateInstantiateConfigProposal.toAmino(message)
    };
  },
  fromProtoMsg(message: UpdateInstantiateConfigProposalProtoMsg): UpdateInstantiateConfigProposal {
    return UpdateInstantiateConfigProposal.decode(message.value);
  },
  toProto(message: UpdateInstantiateConfigProposal): Uint8Array {
    return UpdateInstantiateConfigProposal.encode(message).finish();
  },
  toProtoMsg(message: UpdateInstantiateConfigProposal): UpdateInstantiateConfigProposalProtoMsg {
    return {
      typeUrl: "/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal",
      value: UpdateInstantiateConfigProposal.encode(message).finish()
    };
  }
};
function createBaseStoreAndInstantiateContractProposal(): StoreAndInstantiateContractProposal {
  return {
    $typeUrl: "/cosmwasm.wasm.v1.StoreAndInstantiateContractProposal",
    title: "",
    description: "",
    runAs: "",
    wasmByteCode: new Uint8Array(),
    instantiatePermission: undefined,
    unpinCode: false,
    admin: "",
    label: "",
    msg: new Uint8Array(),
    funds: [],
    source: "",
    builder: "",
    codeHash: new Uint8Array()
  };
}
export const StoreAndInstantiateContractProposal = {
  typeUrl: "/cosmwasm.wasm.v1.StoreAndInstantiateContractProposal",
  encode(message: StoreAndInstantiateContractProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.runAs !== "") {
      writer.uint32(26).string(message.runAs);
    }
    if (message.wasmByteCode.length !== 0) {
      writer.uint32(34).bytes(message.wasmByteCode);
    }
    if (message.instantiatePermission !== undefined) {
      AccessConfig.encode(message.instantiatePermission, writer.uint32(42).fork()).ldelim();
    }
    if (message.unpinCode === true) {
      writer.uint32(48).bool(message.unpinCode);
    }
    if (message.admin !== "") {
      writer.uint32(58).string(message.admin);
    }
    if (message.label !== "") {
      writer.uint32(66).string(message.label);
    }
    if (message.msg.length !== 0) {
      writer.uint32(74).bytes(message.msg);
    }
    for (const v of message.funds) {
      Coin.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    if (message.source !== "") {
      writer.uint32(90).string(message.source);
    }
    if (message.builder !== "") {
      writer.uint32(98).string(message.builder);
    }
    if (message.codeHash.length !== 0) {
      writer.uint32(106).bytes(message.codeHash);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): StoreAndInstantiateContractProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoreAndInstantiateContractProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.runAs = reader.string();
          break;
        case 4:
          message.wasmByteCode = reader.bytes();
          break;
        case 5:
          message.instantiatePermission = AccessConfig.decode(reader, reader.uint32());
          break;
        case 6:
          message.unpinCode = reader.bool();
          break;
        case 7:
          message.admin = reader.string();
          break;
        case 8:
          message.label = reader.string();
          break;
        case 9:
          message.msg = reader.bytes();
          break;
        case 10:
          message.funds.push(Coin.decode(reader, reader.uint32()));
          break;
        case 11:
          message.source = reader.string();
          break;
        case 12:
          message.builder = reader.string();
          break;
        case 13:
          message.codeHash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): StoreAndInstantiateContractProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      runAs: isSet(object.runAs) ? String(object.runAs) : "",
      wasmByteCode: isSet(object.wasmByteCode) ? bytesFromBase64(object.wasmByteCode) : new Uint8Array(),
      instantiatePermission: isSet(object.instantiatePermission) ? AccessConfig.fromJSON(object.instantiatePermission) : undefined,
      unpinCode: isSet(object.unpinCode) ? Boolean(object.unpinCode) : false,
      admin: isSet(object.admin) ? String(object.admin) : "",
      label: isSet(object.label) ? String(object.label) : "",
      msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(),
      funds: Array.isArray(object?.funds) ? object.funds.map((e: any) => Coin.fromJSON(e)) : [],
      source: isSet(object.source) ? String(object.source) : "",
      builder: isSet(object.builder) ? String(object.builder) : "",
      codeHash: isSet(object.codeHash) ? bytesFromBase64(object.codeHash) : new Uint8Array()
    };
  },
  toJSON(message: StoreAndInstantiateContractProposal): JsonSafe<StoreAndInstantiateContractProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.runAs !== undefined && (obj.runAs = message.runAs);
    message.wasmByteCode !== undefined && (obj.wasmByteCode = base64FromBytes(message.wasmByteCode !== undefined ? message.wasmByteCode : new Uint8Array()));
    message.instantiatePermission !== undefined && (obj.instantiatePermission = message.instantiatePermission ? AccessConfig.toJSON(message.instantiatePermission) : undefined);
    message.unpinCode !== undefined && (obj.unpinCode = message.unpinCode);
    message.admin !== undefined && (obj.admin = message.admin);
    message.label !== undefined && (obj.label = message.label);
    message.msg !== undefined && (obj.msg = base64FromBytes(message.msg !== undefined ? message.msg : new Uint8Array()));
    if (message.funds) {
      obj.funds = message.funds.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.funds = [];
    }
    message.source !== undefined && (obj.source = message.source);
    message.builder !== undefined && (obj.builder = message.builder);
    message.codeHash !== undefined && (obj.codeHash = base64FromBytes(message.codeHash !== undefined ? message.codeHash : new Uint8Array()));
    return obj;
  },
  fromPartial(object: Partial<StoreAndInstantiateContractProposal>): StoreAndInstantiateContractProposal {
    const message = createBaseStoreAndInstantiateContractProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.runAs = object.runAs ?? "";
    message.wasmByteCode = object.wasmByteCode ?? new Uint8Array();
    message.instantiatePermission = object.instantiatePermission !== undefined && object.instantiatePermission !== null ? AccessConfig.fromPartial(object.instantiatePermission) : undefined;
    message.unpinCode = object.unpinCode ?? false;
    message.admin = object.admin ?? "";
    message.label = object.label ?? "";
    message.msg = object.msg ?? new Uint8Array();
    message.funds = object.funds?.map(e => Coin.fromPartial(e)) || [];
    message.source = object.source ?? "";
    message.builder = object.builder ?? "";
    message.codeHash = object.codeHash ?? new Uint8Array();
    return message;
  },
  fromAmino(object: StoreAndInstantiateContractProposalAmino): StoreAndInstantiateContractProposal {
    const message = createBaseStoreAndInstantiateContractProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.run_as !== undefined && object.run_as !== null) {
      message.runAs = object.run_as;
    }
    if (object.wasm_byte_code !== undefined && object.wasm_byte_code !== null) {
      message.wasmByteCode = fromBase64(object.wasm_byte_code);
    }
    if (object.instantiate_permission !== undefined && object.instantiate_permission !== null) {
      message.instantiatePermission = AccessConfig.fromAmino(object.instantiate_permission);
    }
    if (object.unpin_code !== undefined && object.unpin_code !== null) {
      message.unpinCode = object.unpin_code;
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin;
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = object.label;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = toUtf8(JSON.stringify(object.msg));
    }
    message.funds = object.funds?.map(e => Coin.fromAmino(e)) || [];
    if (object.source !== undefined && object.source !== null) {
      message.source = object.source;
    }
    if (object.builder !== undefined && object.builder !== null) {
      message.builder = object.builder;
    }
    if (object.code_hash !== undefined && object.code_hash !== null) {
      message.codeHash = bytesFromBase64(object.code_hash);
    }
    return message;
  },
  toAmino(message: StoreAndInstantiateContractProposal): StoreAndInstantiateContractProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    obj.run_as = message.runAs === "" ? undefined : message.runAs;
    obj.wasm_byte_code = message.wasmByteCode ? toBase64(message.wasmByteCode) : undefined;
    obj.instantiate_permission = message.instantiatePermission ? AccessConfig.toAmino(message.instantiatePermission) : undefined;
    obj.unpin_code = message.unpinCode === false ? undefined : message.unpinCode;
    obj.admin = message.admin === "" ? undefined : message.admin;
    obj.label = message.label === "" ? undefined : message.label;
    obj.msg = message.msg ? JSON.parse(fromUtf8(message.msg)) : undefined;
    if (message.funds) {
      obj.funds = message.funds.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.funds = message.funds;
    }
    obj.source = message.source === "" ? undefined : message.source;
    obj.builder = message.builder === "" ? undefined : message.builder;
    obj.code_hash = message.codeHash ? base64FromBytes(message.codeHash) : undefined;
    return obj;
  },
  fromAminoMsg(object: StoreAndInstantiateContractProposalAminoMsg): StoreAndInstantiateContractProposal {
    return StoreAndInstantiateContractProposal.fromAmino(object.value);
  },
  toAminoMsg(message: StoreAndInstantiateContractProposal): StoreAndInstantiateContractProposalAminoMsg {
    return {
      type: "wasm/StoreAndInstantiateContractProposal",
      value: StoreAndInstantiateContractProposal.toAmino(message)
    };
  },
  fromProtoMsg(message: StoreAndInstantiateContractProposalProtoMsg): StoreAndInstantiateContractProposal {
    return StoreAndInstantiateContractProposal.decode(message.value);
  },
  toProto(message: StoreAndInstantiateContractProposal): Uint8Array {
    return StoreAndInstantiateContractProposal.encode(message).finish();
  },
  toProtoMsg(message: StoreAndInstantiateContractProposal): StoreAndInstantiateContractProposalProtoMsg {
    return {
      typeUrl: "/cosmwasm.wasm.v1.StoreAndInstantiateContractProposal",
      value: StoreAndInstantiateContractProposal.encode(message).finish()
    };
  }
};