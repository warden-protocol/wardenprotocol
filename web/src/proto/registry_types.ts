import { AnyMessage, MessageType } from "@bufbuild/protobuf";
import { LegacyAminoPubKey } from "./cosmos/crypto/multisig/keys_pb";
import { Keyring } from "./fusionchain/identity/keyring_pb";
import { MsgAddKeyringParty, MsgAddKeyringPartyResponse, MsgAddWorkspaceOwner, MsgAddWorkspaceOwnerResponse, MsgAppendChildWorkspace, MsgAppendChildWorkspaceResponse, MsgNewChildWorkspace, MsgNewChildWorkspaceResponse, MsgNewKeyring, MsgNewKeyringResponse, MsgNewWorkspace, MsgNewWorkspaceResponse, MsgRemoveWorkspaceOwner, MsgRemoveWorkspaceOwnerResponse, MsgUpdateWorkspace, MsgUpdateWorkspaceResponse } from "./fusionchain/identity/tx_pb";
import { QueryKeyringsRequest, QueryKeyringsResponse, QueryWorkspaceByAddressRequest, QueryWorkspaceByAddressResponse, QueryWorkspacesByOwnerRequest, QueryWorkspacesRequest, QueryWorkspacesResponse } from "./fusionchain/identity/query_pb";
import { Workspace } from "./fusionchain/identity/workspace_pb";
import { Action } from "./fusionchain/policy/action_pb";
import { BlackbirdPolicy, BlackbirdPolicyMetadata, PolicyParticipant, BlackbirdPolicyPayload, Policy, BoolparserPolicy } from "./fusionchain/policy/policy_pb";
import { MsgApproveAction, MsgApproveActionResponse, MsgNewPolicy, MsgNewPolicyResponse } from "./fusionchain/policy/tx_pb";
import { PolicyResponse, QueryActionsByAddressRequest, QueryActionsByAddressResponse, QueryActionsRequest, QueryActionsResponse, QueryPoliciesRequest, QueryPoliciesResponse, QueryPolicyByIdRequest, QueryPolicyByIdResponse, QueryVerifyRequest, QueryVerifyResponse } from "./fusionchain/policy/query_pb";
import { MsgBurn, MsgBurnResponse, MsgMint, MsgMintResponse, MsgSend, MsgSendResponse } from "./fusionchain/qassets/tx_pb";
import { Key, KeyRequest } from "./fusionchain/treasury/key_pb";
import { MsgFulfilSignatureRequest, MsgFulfilSignatureRequestResponse, MsgNewKey, MsgNewKeyRequest, MsgNewKeyRequestResponse, MsgNewSignTransactionRequest, MsgNewSignTransactionRequestResponse, MsgNewSignatureRequest, MsgNewSignatureRequestResponse, MsgSignedData, MsgUpdateKeyRequest, MsgUpdateKeyRequestResponse } from "./fusionchain/treasury/tx_pb";
import { QueryKeyRequestByIdRequest, QueryKeyRequestByIdResponse, QueryKeyRequestsRequest, QueryKeyRequestsResponse, QueryKeysRequest, QueryKeysResponse, QuerySignTransactionRequestByIdRequest, QuerySignTransactionRequestByIdResponse, QuerySignTransactionRequestsRequest, QuerySignTransactionRequestsResponse, QuerySignatureRequestByIdRequest, QuerySignatureRequestByIdResponse, QuerySignatureRequestsRequest, QuerySignatureRequestsResponse, SignTransactionRequestResponse} from "./fusionchain/treasury/query_pb";
import { SignRequest, SignTransactionRequest } from "./fusionchain/treasury/mpcsign_pb";
// import { Wallet } from "./fusionchain/treasury/wallet_pb";
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

  "fusionchain.identity.Keyring": Keyring,
  "fusionchain.identity.MsgAddKeyringParty": MsgAddKeyringParty,
  "fusionchain.identity.MsgAddKeyringPartyResponse": MsgAddKeyringPartyResponse,
  "fusionchain.identity.MsgAddWorkspaceOwner": MsgAddWorkspaceOwner,
  "fusionchain.identity.MsgAddWorkspaceOwnerResponse": MsgAddWorkspaceOwnerResponse,
  "fusionchain.identity.MsgAppendChildWorkspace": MsgAppendChildWorkspace,
  "fusionchain.identity.MsgAppendChildWorkspaceResponse": MsgAppendChildWorkspaceResponse,
  "fusionchain.identity.MsgNewChildWorkspace": MsgNewChildWorkspace,
  "fusionchain.identity.MsgNewChildWorkspaceResponse": MsgNewChildWorkspaceResponse,
  "fusionchain.identity.MsgNewKeyring": MsgNewKeyring,
  "fusionchain.identity.MsgNewKeyringResponse": MsgNewKeyringResponse,
  "fusionchain.identity.MsgNewWorkspace": MsgNewWorkspace,
  "fusionchain.identity.MsgNewWorkspaceResponse": MsgNewWorkspaceResponse,
  "fusionchain.identity.MsgRemoveWorkspaceOwner": MsgRemoveWorkspaceOwner,
  "fusionchain.identity.MsgRemoveWorkspaceOwnerResponse": MsgRemoveWorkspaceOwnerResponse,
  "fusionchain.identity.MsgUpdateWorkspace": MsgUpdateWorkspace,
  "fusionchain.identity.MsgUpdateWorkspaceResponse": MsgUpdateWorkspaceResponse,
  "fusionchain.identity.QueryKeyringsRequest": QueryKeyringsRequest,
  "fusionchain.identity.QueryKeyringsResponse": QueryKeyringsResponse,
  "fusionchain.identity.QueryWorkspaceByAddressRequest": QueryWorkspaceByAddressRequest,
  "fusionchain.identity.QueryWorkspaceByAddressResponse": QueryWorkspaceByAddressResponse,
  "fusionchain.identity.QueryWorkspacesByOwnerRequest": QueryWorkspacesByOwnerRequest,
  "fusionchain.identity.QueryWorkspacesRequest": QueryWorkspacesRequest,
  "fusionchain.identity.QueryWorkspacesResponse": QueryWorkspacesResponse,
  "fusionchain.identity.Workspace": Workspace,

  "fusionchain.policy.Action": Action,
  "fusionchain.policy.BlackbirdPolicy": BlackbirdPolicy,
  "fusionchain.policy.BlackbirdPolicyMetadata": BlackbirdPolicyMetadata,
  "fusionchain.policy.BlackbirdPolicyPayload": BlackbirdPolicyPayload,
  "fusionchain.policy.BoolparserPolicy": BoolparserPolicy,
  "fusionchain.policy.MsgApproveAction": MsgApproveAction,
  "fusionchain.policy.MsgApproveActionResponse": MsgApproveActionResponse,
  "fusionchain.policy.MsgNewPolicy": MsgNewPolicy,
  "fusionchain.policy.MsgNewPolicyResponse": MsgNewPolicyResponse,
  "fusionchain.policy.Policy": Policy,
  "fusionchain.policy.PolicyParticipant": PolicyParticipant,
  "fusionchain.policy.PolicyResponse": PolicyResponse,
  "fusionchain.policy.QueryActionsByAddressRequest": QueryActionsByAddressRequest,
  "fusionchain.policy.QueryActionsByAddressResponse": QueryActionsByAddressResponse,
  "fusionchain.policy.QueryActionsRequest": QueryActionsRequest,
  "fusionchain.policy.QueryActionsResponse": QueryActionsResponse,
  "fusionchain.policy.QueryPoliciesRequest": QueryPoliciesRequest,
  "fusionchain.policy.QueryPoliciesResponse": QueryPoliciesResponse,
  "fusionchain.policy.QueryPolicyByIdRequest": QueryPolicyByIdRequest,
  "fusionchain.policy.QueryPolicyByIdResponse": QueryPolicyByIdResponse,
  "fusionchain.policy.QueryVerifyRequest": QueryVerifyRequest,
  "fusionchain.policy.QueryVerifyResponse": QueryVerifyResponse,

  "fusionchain.qassets.MsgBurn": MsgBurn,
  "fusionchain.qassets.MsgBurnResponse": MsgBurnResponse,
  "fusionchain.qassets.MsgMint": MsgMint,
  "fusionchain.qassets.MsgMintResponse": MsgMintResponse,
  "fusionchain.qassets.MsgSend": MsgSend,
  "fusionchain.qassets.MsgSendResponse": MsgSendResponse,

  "fusionchain.treasury.Key": Key,
  "fusionchain.treasury.KeyRequest": KeyRequest,
  "fusionchain.treasury.MsgFulfilSignatureRequest": MsgFulfilSignatureRequest,
  "fusionchain.treasury.MsgFulfilSignatureRequestResponse": MsgFulfilSignatureRequestResponse,
  "fusionchain.treasury.MsgNewKey": MsgNewKey,
  "fusionchain.treasury.MsgNewKeyRequest": MsgNewKeyRequest,
  "fusionchain.treasury.MsgNewKeyRequestResponse": MsgNewKeyRequestResponse,
  "fusionchain.treasury.MsgNewSignTransactionRequest": MsgNewSignTransactionRequest,
  "fusionchain.treasury.MsgNewSignTransactionRequestResponse": MsgNewSignTransactionRequestResponse,
  "fusionchain.treasury.MsgNewSignatureRequest": MsgNewSignatureRequest,
  "fusionchain.treasury.MsgNewSignatureRequestResponse": MsgNewSignatureRequestResponse,
  // "fusionchain.treasury.MsgNewWalletRequest": MsgNewWalletRequest,
  // "fusionchain.treasury.MsgNewWalletRequestResponse": MsgNewWalletRequestResponse,
  "fusionchain.treasury.MsgSignedData": MsgSignedData,
  "fusionchain.treasury.MsgUpdateKeyRequest": MsgUpdateKeyRequest,
  "fusionchain.treasury.MsgUpdateKeyRequestResponse": MsgUpdateKeyRequestResponse,
  "fusionchain.treasury.QueryKeyRequestByIdRequest": QueryKeyRequestByIdRequest,
  "fusionchain.treasury.QueryKeyRequestByIdResponse": QueryKeyRequestByIdResponse,
  "fusionchain.treasury.QueryKeyRequestsRequest": QueryKeyRequestsRequest,
  "fusionchain.treasury.QueryKeyRequestsResponse": QueryKeyRequestsResponse,
  "fusionchain.treasury.QueryKeysRequest": QueryKeysRequest,
  "fusionchain.treasury.QueryKeysResponse": QueryKeysResponse,
  "fusionchain.treasury.QuerySignTransactionRequestByIdRequest": QuerySignTransactionRequestByIdRequest,
  "fusionchain.treasury.QuerySignTransactionRequestByIdResponse": QuerySignTransactionRequestByIdResponse,
  "fusionchain.treasury.QuerySignTransactionRequestsRequest": QuerySignTransactionRequestsRequest,
  "fusionchain.treasury.QuerySignTransactionRequestsResponse": QuerySignTransactionRequestsResponse,
  "fusionchain.treasury.QuerySignatureRequestByIdRequest": QuerySignatureRequestByIdRequest,
  "fusionchain.treasury.QuerySignatureRequestByIdResponse": QuerySignatureRequestByIdResponse,
  "fusionchain.treasury.QuerySignatureRequestsRequest": QuerySignatureRequestsRequest,
  "fusionchain.treasury.QuerySignatureRequestsResponse": QuerySignatureRequestsResponse,
  // "fusionchain.treasury.QueryWalletByIdRequest": QueryWalletByIdRequest,
  // "fusionchain.treasury.QueryWalletByIdResponse": QueryWalletByIdResponse,
  // "fusionchain.treasury.QueryWalletsRequest": QueryWalletsRequest,
  // "fusionchain.treasury.QueryWalletsResponse": QueryWalletsResponse,
  "fusionchain.treasury.SignRequest": SignRequest,
  "fusionchain.treasury.SignTransactionRequest": SignTransactionRequest,
  "fusionchain.treasury.SignTransactionRequestResponse": SignTransactionRequestResponse,
  // "fusionchain.treasury.Wallet": Wallet,
  // "fusionchain.treasury.WalletResponse": WalletResponse,
}
