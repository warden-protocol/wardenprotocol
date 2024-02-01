import { AnyMessage, MessageType } from "@bufbuild/protobuf";
import { LegacyAminoPubKey } from "./cosmos/crypto/multisig/keys_pb";
import { Keychain } from "./wardenprotocol/identity/keychain_pb";
import { MsgAddKeychainParty, MsgAddKeychainPartyResponse, MsgAddSpaceOwner, MsgAddSpaceOwnerResponse, MsgAppendChildSpace, MsgAppendChildSpaceResponse, MsgNewChildSpace, MsgNewChildSpaceResponse, MsgNewKeychain, MsgNewKeychainResponse, MsgNewSpace, MsgNewSpaceResponse, MsgRemoveSpaceOwner, MsgRemoveSpaceOwnerResponse, MsgUpdateSpace, MsgUpdateSpaceResponse } from "./wardenprotocol/identity/tx_pb";
import { QueryKeychainsRequest, QueryKeychainsResponse, QuerySpaceByAddressRequest, QuerySpaceByAddressResponse, QuerySpacesByOwnerRequest, QuerySpacesRequest, QuerySpacesResponse } from "./wardenprotocol/identity/query_pb";
import { Space } from "./wardenprotocol/identity/space_pb";
import { Action } from "./wardenprotocol/intent/action_pb";
import { IntentParticipant, Intent, BoolparserIntent } from "./wardenprotocol/intent/intent_pb";
import { MsgApproveAction, MsgApproveActionResponse, MsgNewIntent, MsgNewIntentResponse } from "./wardenprotocol/intent/tx_pb";
import { IntentResponse, QueryActionsByAddressRequest, QueryActionsByAddressResponse, QueryActionsRequest, QueryActionsResponse, QueryIntentsRequest, QueryIntentsResponse, QueryIntentByIdRequest, QueryIntentByIdResponse } from "./wardenprotocol/intent/query_pb";
import { Key, KeyRequest } from "./wardenprotocol/treasury/key_pb";
import { MsgFulfilSignatureRequest, MsgFulfilSignatureRequestResponse, MsgNewKey, MsgNewKeyRequest, MsgNewKeyRequestResponse, MsgNewSignTransactionRequest, MsgNewSignTransactionRequestResponse, MsgNewSignatureRequest, MsgNewSignatureRequestResponse, MsgSignedData, MsgUpdateKeyRequest, MsgUpdateKeyRequestResponse } from "./wardenprotocol/treasury/tx_pb";
import { QueryKeyRequestByIdRequest, QueryKeyRequestByIdResponse, QueryKeyRequestsRequest, QueryKeyRequestsResponse, QueryKeysRequest, QueryKeysResponse, QuerySignTransactionRequestByIdRequest, QuerySignTransactionRequestByIdResponse, QuerySignTransactionRequestsRequest, QuerySignTransactionRequestsResponse, QuerySignatureRequestByIdRequest, QuerySignatureRequestByIdResponse, QuerySignatureRequestsRequest, QuerySignatureRequestsResponse, SignTransactionRequestResponse} from "./wardenprotocol/treasury/query_pb";
import { SignRequest, SignTransactionRequest } from "./wardenprotocol/treasury/signature_pb";
// import { Wallet } from "./wardenprotocol/treasury/wallet_pb";
import { MsgExec, MsgExecResponse, MsgGrant, MsgGrantResponse, MsgRevoke, MsgRevokeResponse } from "./cosmos/authz/v1beta1/tx_pb";
import { MsgMultiSend, MsgMultiSendResponse, MsgSend as BankMsgSend, MsgSendResponse as BankMsgSendResponse } from "./cosmos/bank/v1beta1/tx_pb";
import { MsgData, TxMsgData } from "./cosmos/base/abci/v1beta1/abci_pb";
import { MsgDescriptor } from "./cosmos/base/reflection/v2alpha1/reflection_pb";
import { MsgVerifyInvariant, MsgVerifyInvariantResponse } from "./cosmos/crisis/v1beta1/tx_pb";
import { MsgFundCommunityPool, MsgFundCommunityPoolResponse, MsgSetWithdrawAddress, MsgSetWithdrawAddressResponse, MsgWithdrawDelegatorReward, MsgWithdrawDelegatorRewardResponse, MsgWithdrawValidatorCommission, MsgWithdrawValidatorCommissionResponse } from "./cosmos/distribution/v1beta1/tx_pb";
import { MsgSubmitEvidence, MsgSubmitEvidenceResponse } from "./cosmos/evidence/v1beta1/tx_pb";
import { AllowedMsgAllowance } from "./cosmos/feegrant/v1beta1/feegrant_pb";
import { MsgGrantAllowance, MsgGrantAllowanceResponse, MsgRevokeAllowance, MsgRevokeAllowanceResponse } from "./cosmos/feegrant/v1beta1/tx_pb";
import { MsgDeposit, MsgDepositResponse, MsgSubmitProposal, MsgSubmitProposalResponse, MsgVote, MsgVoteResponse, MsgVoteWeighted, MsgVoteWeightedResponse } from "./cosmos/gov/v1beta1/tx_pb";
import { MsgUnjail, MsgUnjailResponse } from "./cosmos/slashing/v1beta1/tx_pb";
import { MsgBeginRedelegate, MsgBeginRedelegateResponse, MsgCreateValidator, MsgCreateValidatorResponse, MsgDelegate, MsgDelegateResponse, MsgEditValidator, MsgEditValidatorResponse, MsgUndelegate, MsgUndelegateResponse } from "./cosmos/staking/v1beta1/tx_pb";
import { MsgCreateVestingAccount, MsgCreateVestingAccountResponse } from "./cosmos/vesting/v1beta1/tx_pb";
import { MsgAddCodeUploadParamsAddresses, MsgAddCodeUploadParamsAddressesResponse, MsgClearAdmin, MsgClearAdminResponse, MsgExecuteContract, MsgExecuteContractResponse, MsgInstantiateContract, MsgInstantiateContract2, MsgInstantiateContract2Response, MsgInstantiateContractResponse, MsgMigrateContract, MsgMigrateContractResponse, MsgPinCodes, MsgPinCodesResponse, MsgRemoveCodeUploadParamsAddresses, MsgRemoveCodeUploadParamsAddressesResponse, MsgStoreAndInstantiateContract, MsgStoreAndInstantiateContractResponse, MsgStoreCode, MsgStoreCodeResponse, MsgSudoContract, MsgSudoContractResponse, MsgUnpinCodes, MsgUnpinCodesResponse, MsgUpdateAdmin, MsgUpdateAdminResponse, MsgUpdateInstantiateConfig, MsgUpdateInstantiateConfigResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./cosmwasm/wasm/v1/tx_pb";
import { MsgIBCCloseChannel, MsgIBCSend, MsgIBCSendResponse } from "./cosmwasm/wasm/v1/ibc_pb";
import { MsgEthereumTx, MsgEthereumTxResponse } from "./ethermint/evm/v1/tx_pb";

export const types: Record<string, MessageType<AnyMessage>> = {
  "cosmos.authz.v1beta1.MsgExec": MsgExec,
  "cosmos.authz.v1beta1.MsgExecResponse": MsgExecResponse,
  "cosmos.authz.v1beta1.MsgGrant": MsgGrant,
  "cosmos.authz.v1beta1.MsgGrantResponse": MsgGrantResponse,
  "cosmos.authz.v1beta1.MsgRevoke": MsgRevoke,
  "cosmos.authz.v1beta1.MsgRevokeResponse": MsgRevokeResponse,

  "cosmos.bank.v1beta1.MsgMultiSend": MsgMultiSend,
  "cosmos.bank.v1beta1.MsgMultiSendResponse": MsgMultiSendResponse,
  "cosmos.bank.v1beta1.MsgSend": BankMsgSend,
  "cosmos.bank.v1beta1.MsgSendResponse": BankMsgSendResponse,

  "cosmos.base.abci.v1beta1.MsgData": MsgData,
  "cosmos.base.abci.v1beta1.TxMsgData": TxMsgData,
  "cosmos.base.reflection.v2alpha1.MsgDescriptor": MsgDescriptor,

  "cosmos.crisis.v1beta1.MsgVerifyInvariant": MsgVerifyInvariant,
  "cosmos.crisis.v1beta1.MsgVerifyInvariantResponse": MsgVerifyInvariantResponse,

  "cosmos.distribution.v1beta1.MsgFundCommunityPool": MsgFundCommunityPool,
  "cosmos.distribution.v1beta1.MsgFundCommunityPoolResponse": MsgFundCommunityPoolResponse,
  "cosmos.distribution.v1beta1.MsgSetWithdrawAddress": MsgSetWithdrawAddress,
  "cosmos.distribution.v1beta1.MsgSetWithdrawAddressResponse": MsgSetWithdrawAddressResponse,
  "cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward": MsgWithdrawDelegatorReward,
  "cosmos.distribution.v1beta1.MsgWithdrawDelegatorRewardResponse": MsgWithdrawDelegatorRewardResponse,
  "cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission": MsgWithdrawValidatorCommission,
  "cosmos.distribution.v1beta1.MsgWithdrawValidatorCommissionResponse": MsgWithdrawValidatorCommissionResponse,

  "cosmos.evidence.v1beta1.MsgSubmitEvidence": MsgSubmitEvidence,
  "cosmos.evidence.v1beta1.MsgSubmitEvidenceResponse": MsgSubmitEvidenceResponse,

  "cosmos.feegrant.v1beta1.AllowedMsgAllowance": AllowedMsgAllowance,
  "cosmos.feegrant.v1beta1.MsgGrantAllowance": MsgGrantAllowance,
  "cosmos.feegrant.v1beta1.MsgGrantAllowanceResponse": MsgGrantAllowanceResponse,
  "cosmos.feegrant.v1beta1.MsgRevokeAllowance": MsgRevokeAllowance,
  "cosmos.feegrant.v1beta1.MsgRevokeAllowanceResponse": MsgRevokeAllowanceResponse,

  "cosmos.gov.v1beta1.MsgDeposit": MsgDeposit,
  "cosmos.gov.v1beta1.MsgDepositResponse": MsgDepositResponse,
  "cosmos.gov.v1beta1.MsgSubmitProposal": MsgSubmitProposal,
  "cosmos.gov.v1beta1.MsgSubmitProposalResponse": MsgSubmitProposalResponse,
  "cosmos.gov.v1beta1.MsgVote": MsgVote,
  "cosmos.gov.v1beta1.MsgVoteResponse": MsgVoteResponse,
  "cosmos.gov.v1beta1.MsgVoteWeighted": MsgVoteWeighted,
  "cosmos.gov.v1beta1.MsgVoteWeightedResponse": MsgVoteWeightedResponse,

  "cosmos.slashing.v1beta1.MsgUnjail": MsgUnjail,
  "cosmos.slashing.v1beta1.MsgUnjailResponse": MsgUnjailResponse,

  "cosmos.staking.v1beta1.MsgBeginRedelegate": MsgBeginRedelegate,
  "cosmos.staking.v1beta1.MsgBeginRedelegateResponse": MsgBeginRedelegateResponse,
  "cosmos.staking.v1beta1.MsgCreateValidator": MsgCreateValidator,
  "cosmos.staking.v1beta1.MsgCreateValidatorResponse": MsgCreateValidatorResponse,
  "cosmos.staking.v1beta1.MsgDelegate": MsgDelegate,
  "cosmos.staking.v1beta1.MsgDelegateResponse": MsgDelegateResponse,
  "cosmos.staking.v1beta1.MsgEditValidator": MsgEditValidator,
  "cosmos.staking.v1beta1.MsgEditValidatorResponse": MsgEditValidatorResponse,
  "cosmos.staking.v1beta1.MsgUndelegate": MsgUndelegate,
  "cosmos.staking.v1beta1.MsgUndelegateResponse": MsgUndelegateResponse,

  "cosmos.vesting.v1beta1.MsgCreateVestingAccount": MsgCreateVestingAccount,
  "cosmos.vesting.v1beta1.MsgCreateVestingAccountResponse": MsgCreateVestingAccountResponse,

  "cosmwasm.wasm.v1.MsgAddCodeUploadParamsAddresses": MsgAddCodeUploadParamsAddresses,
  "cosmwasm.wasm.v1.MsgAddCodeUploadParamsAddressesResponse": MsgAddCodeUploadParamsAddressesResponse,
  "cosmwasm.wasm.v1.MsgClearAdmin": MsgClearAdmin,
  "cosmwasm.wasm.v1.MsgClearAdminResponse": MsgClearAdminResponse,
  "cosmwasm.wasm.v1.MsgExecuteContract": MsgExecuteContract,
  "cosmwasm.wasm.v1.MsgExecuteContractResponse": MsgExecuteContractResponse,
  "cosmwasm.wasm.v1.MsgIBCCloseChannel": MsgIBCCloseChannel,
  "cosmwasm.wasm.v1.MsgIBCSend": MsgIBCSend,
  "cosmwasm.wasm.v1.MsgIBCSendResponse": MsgIBCSendResponse,
  "cosmwasm.wasm.v1.MsgInstantiateContract": MsgInstantiateContract,
  "cosmwasm.wasm.v1.MsgInstantiateContract2": MsgInstantiateContract2,
  "cosmwasm.wasm.v1.MsgInstantiateContract2Response": MsgInstantiateContract2Response,
  "cosmwasm.wasm.v1.MsgInstantiateContractResponse": MsgInstantiateContractResponse,
  "cosmwasm.wasm.v1.MsgMigrateContract": MsgMigrateContract,
  "cosmwasm.wasm.v1.MsgMigrateContractResponse": MsgMigrateContractResponse,
  "cosmwasm.wasm.v1.MsgPinCodes": MsgPinCodes,
  "cosmwasm.wasm.v1.MsgPinCodesResponse": MsgPinCodesResponse,
  "cosmwasm.wasm.v1.MsgRemoveCodeUploadParamsAddresses": MsgRemoveCodeUploadParamsAddresses,
  "cosmwasm.wasm.v1.MsgRemoveCodeUploadParamsAddressesResponse": MsgRemoveCodeUploadParamsAddressesResponse,
  "cosmwasm.wasm.v1.MsgStoreAndInstantiateContract": MsgStoreAndInstantiateContract,
  "cosmwasm.wasm.v1.MsgStoreAndInstantiateContractResponse": MsgStoreAndInstantiateContractResponse,
  "cosmwasm.wasm.v1.MsgStoreCode": MsgStoreCode,
  "cosmwasm.wasm.v1.MsgStoreCodeResponse": MsgStoreCodeResponse,
  "cosmwasm.wasm.v1.MsgSudoContract": MsgSudoContract,
  "cosmwasm.wasm.v1.MsgSudoContractResponse": MsgSudoContractResponse,
  "cosmwasm.wasm.v1.MsgUnpinCodes": MsgUnpinCodes,
  "cosmwasm.wasm.v1.MsgUnpinCodesResponse": MsgUnpinCodesResponse,
  "cosmwasm.wasm.v1.MsgUpdateAdmin": MsgUpdateAdmin,
  "cosmwasm.wasm.v1.MsgUpdateAdminResponse": MsgUpdateAdminResponse,
  "cosmwasm.wasm.v1.MsgUpdateInstantiateConfig": MsgUpdateInstantiateConfig,
  "cosmwasm.wasm.v1.MsgUpdateInstantiateConfigResponse": MsgUpdateInstantiateConfigResponse,
  "cosmwasm.wasm.v1.MsgUpdateParams": MsgUpdateParams,
  "cosmwasm.wasm.v1.MsgUpdateParamsResponse": MsgUpdateParamsResponse,

  "ethermint.evm.v1.MsgEthereumTx": MsgEthereumTx,
  "ethermint.evm.v1.MsgEthereumTxResponse": MsgEthereumTxResponse,

  "cosmos.crypto.multisig.LegacyAminoPubKey": LegacyAminoPubKey,

  "wardenprotocol.identity.Keychain": Keychain,
  "wardenprotocol.identity.MsgAddKeychainParty": MsgAddKeychainParty,
  "wardenprotocol.identity.MsgAddKeychainPartyResponse": MsgAddKeychainPartyResponse,
  "wardenprotocol.identity.MsgAddSpaceOwner": MsgAddSpaceOwner,
  "wardenprotocol.identity.MsgAddSpaceOwnerResponse": MsgAddSpaceOwnerResponse,
  "wardenprotocol.identity.MsgAppendChildSpace": MsgAppendChildSpace,
  "wardenprotocol.identity.MsgAppendChildSpaceResponse": MsgAppendChildSpaceResponse,
  "wardenprotocol.identity.MsgNewChildSpace": MsgNewChildSpace,
  "wardenprotocol.identity.MsgNewChildSpaceResponse": MsgNewChildSpaceResponse,
  "wardenprotocol.identity.MsgNewKeychain": MsgNewKeychain,
  "wardenprotocol.identity.MsgNewKeychainResponse": MsgNewKeychainResponse,
  "wardenprotocol.identity.MsgNewSpace": MsgNewSpace,
  "wardenprotocol.identity.MsgNewSpaceResponse": MsgNewSpaceResponse,
  "wardenprotocol.identity.MsgRemoveSpaceOwner": MsgRemoveSpaceOwner,
  "wardenprotocol.identity.MsgRemoveSpaceOwnerResponse": MsgRemoveSpaceOwnerResponse,
  "wardenprotocol.identity.MsgUpdateSpace": MsgUpdateSpace,
  "wardenprotocol.identity.MsgUpdateSpaceResponse": MsgUpdateSpaceResponse,
  "wardenprotocol.identity.QueryKeychainsRequest": QueryKeychainsRequest,
  "wardenprotocol.identity.QueryKeychainsResponse": QueryKeychainsResponse,
  "wardenprotocol.identity.QuerySpaceByAddressRequest": QuerySpaceByAddressRequest,
  "wardenprotocol.identity.QuerySpaceByAddressResponse": QuerySpaceByAddressResponse,
  "wardenprotocol.identity.QuerySpacesByOwnerRequest": QuerySpacesByOwnerRequest,
  "wardenprotocol.identity.QuerySpacesRequest": QuerySpacesRequest,
  "wardenprotocol.identity.QuerySpacesResponse": QuerySpacesResponse,
  "wardenprotocol.identity.Space": Space,

  "wardenprotocol.intent.Action": Action,
  "wardenprotocol.intent.BoolparserIntent": BoolparserIntent,
  "wardenprotocol.intent.MsgApproveAction": MsgApproveAction,
  "wardenprotocol.intent.MsgApproveActionResponse": MsgApproveActionResponse,
  "wardenprotocol.intent.MsgNewIntent": MsgNewIntent,
  "wardenprotocol.intent.MsgNewIntentResponse": MsgNewIntentResponse,
  "wardenprotocol.intent.Intent": Intent,
  "wardenprotocol.intent.IntentParticipant": IntentParticipant,
  "wardenprotocol.intent.IntentResponse": IntentResponse,
  "wardenprotocol.intent.QueryActionsByAddressRequest": QueryActionsByAddressRequest,
  "wardenprotocol.intent.QueryActionsByAddressResponse": QueryActionsByAddressResponse,
  "wardenprotocol.intent.QueryActionsRequest": QueryActionsRequest,
  "wardenprotocol.intent.QueryActionsResponse": QueryActionsResponse,
  "wardenprotocol.intent.QueryIntentsRequest": QueryIntentsRequest,
  "wardenprotocol.intent.QueryIntentsResponse": QueryIntentsResponse,
  "wardenprotocol.intent.QueryIntentByIdRequest": QueryIntentByIdRequest,
  "wardenprotocol.intent.QueryIntentByIdResponse": QueryIntentByIdResponse,

  "wardenprotocol.treasury.Key": Key,
  "wardenprotocol.treasury.KeyRequest": KeyRequest,
  "wardenprotocol.treasury.MsgFulfilSignatureRequest": MsgFulfilSignatureRequest,
  "wardenprotocol.treasury.MsgFulfilSignatureRequestResponse": MsgFulfilSignatureRequestResponse,
  "wardenprotocol.treasury.MsgNewKey": MsgNewKey,
  "wardenprotocol.treasury.MsgNewKeyRequest": MsgNewKeyRequest,
  "wardenprotocol.treasury.MsgNewKeyRequestResponse": MsgNewKeyRequestResponse,
  "wardenprotocol.treasury.MsgNewSignTransactionRequest": MsgNewSignTransactionRequest,
  "wardenprotocol.treasury.MsgNewSignTransactionRequestResponse": MsgNewSignTransactionRequestResponse,
  "wardenprotocol.treasury.MsgNewSignatureRequest": MsgNewSignatureRequest,
  "wardenprotocol.treasury.MsgNewSignatureRequestResponse": MsgNewSignatureRequestResponse,
  // "wardenprotocol.treasury.MsgNewWalletRequest": MsgNewWalletRequest,
  // "wardenprotocol.treasury.MsgNewWalletRequestResponse": MsgNewWalletRequestResponse,
  "wardenprotocol.treasury.MsgSignedData": MsgSignedData,
  "wardenprotocol.treasury.MsgUpdateKeyRequest": MsgUpdateKeyRequest,
  "wardenprotocol.treasury.MsgUpdateKeyRequestResponse": MsgUpdateKeyRequestResponse,
  "wardenprotocol.treasury.QueryKeyRequestByIdRequest": QueryKeyRequestByIdRequest,
  "wardenprotocol.treasury.QueryKeyRequestByIdResponse": QueryKeyRequestByIdResponse,
  "wardenprotocol.treasury.QueryKeyRequestsRequest": QueryKeyRequestsRequest,
  "wardenprotocol.treasury.QueryKeyRequestsResponse": QueryKeyRequestsResponse,
  "wardenprotocol.treasury.QueryKeysRequest": QueryKeysRequest,
  "wardenprotocol.treasury.QueryKeysResponse": QueryKeysResponse,
  "wardenprotocol.treasury.QuerySignTransactionRequestByIdRequest": QuerySignTransactionRequestByIdRequest,
  "wardenprotocol.treasury.QuerySignTransactionRequestByIdResponse": QuerySignTransactionRequestByIdResponse,
  "wardenprotocol.treasury.QuerySignTransactionRequestsRequest": QuerySignTransactionRequestsRequest,
  "wardenprotocol.treasury.QuerySignTransactionRequestsResponse": QuerySignTransactionRequestsResponse,
  "wardenprotocol.treasury.QuerySignatureRequestByIdRequest": QuerySignatureRequestByIdRequest,
  "wardenprotocol.treasury.QuerySignatureRequestByIdResponse": QuerySignatureRequestByIdResponse,
  "wardenprotocol.treasury.QuerySignatureRequestsRequest": QuerySignatureRequestsRequest,
  "wardenprotocol.treasury.QuerySignatureRequestsResponse": QuerySignatureRequestsResponse,
  // "wardenprotocol.treasury.QueryWalletByIdRequest": QueryWalletByIdRequest,
  // "wardenprotocol.treasury.QueryWalletByIdResponse": QueryWalletByIdResponse,
  // "wardenprotocol.treasury.QueryWalletsRequest": QueryWalletsRequest,
  // "wardenprotocol.treasury.QueryWalletsResponse": QueryWalletsResponse,
  "wardenprotocol.treasury.SignRequest": SignRequest,
  "wardenprotocol.treasury.SignTransactionRequest": SignTransactionRequest,
  "wardenprotocol.treasury.SignTransactionRequestResponse": SignTransactionRequestResponse,
  // "wardenprotocol.treasury.Wallet": Wallet,
  // "wardenprotocol.treasury.WalletResponse": WalletResponse,
}
