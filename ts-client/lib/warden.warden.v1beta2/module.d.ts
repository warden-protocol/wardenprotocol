import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { QueryKeysBySpaceIdRequest } from "./types/warden/warden/v1beta2/query";
import { QuerySignatureRequestByIdRequest } from "./types/warden/warden/v1beta2/query";
import { MsgNewSignTransactionRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { QueryParamsResponse } from "./types/warden/warden/v1beta2/query";
import { QuerySpacesResponse } from "./types/warden/warden/v1beta2/query";
import { QueryKeychainByIdResponse } from "./types/warden/warden/v1beta2/query";
import { QueryKeysResponse } from "./types/warden/warden/v1beta2/query";
import { SignTransactionRequestResponse } from "./types/warden/warden/v1beta2/query";
import { MsgUpdateKeychainResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateKeyRequest } from "./types/warden/warden/v1beta2/tx";
import { GenesisState } from "./types/warden/warden/v1beta2/genesis";
import { QuerySpacesByOwnerRequest } from "./types/warden/warden/v1beta2/query";
import { QueryAllKeysRequest } from "./types/warden/warden/v1beta2/query";
import { MsgNewSpace } from "./types/warden/warden/v1beta2/tx";
import { MsgAddKeychainPartyResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgNewKeyRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { Keychain } from "./types/warden/warden/v1beta2/keychain";
import { MsgAddKeychainParty } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateKeyResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgNewSignatureRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { QueryKeyRequestByIdResponse } from "./types/warden/warden/v1beta2/query";
import { MsgSignedData } from "./types/warden/warden/v1beta2/tx";
import { MsgNewKey } from "./types/warden/warden/v1beta2/tx";
import { QuerySignTransactionRequestByIdResponse } from "./types/warden/warden/v1beta2/query";
import { QueryKeyRequestsResponse } from "./types/warden/warden/v1beta2/query";
import { MsgAddSpaceOwnerResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgRemoveSpaceOwnerResponse } from "./types/warden/warden/v1beta2/tx";
import { Params } from "./types/warden/warden/v1beta2/params";
import { QuerySpaceByIdResponse } from "./types/warden/warden/v1beta2/query";
import { MsgNewSpaceResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgNewSignatureRequest } from "./types/warden/warden/v1beta2/tx";
import { MsgFulfilSignatureRequest } from "./types/warden/warden/v1beta2/tx";
import { WalletKeyResponse } from "./types/warden/warden/v1beta2/query";
import { QuerySignatureRequestByIdResponse } from "./types/warden/warden/v1beta2/query";
import { MsgUpdateParams } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateSpaceResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgNewKeyRequest } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateKey } from "./types/warden/warden/v1beta2/tx";
import { QueryKeyRequestsRequest } from "./types/warden/warden/v1beta2/query";
import { QuerySignTransactionRequestsResponse } from "./types/warden/warden/v1beta2/query";
import { MsgNewKeychain } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateKeyRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { KeychainFees } from "./types/warden/warden/v1beta2/keychain";
import { QueryParamsRequest } from "./types/warden/warden/v1beta2/query";
import { QueryKeychainsRequest } from "./types/warden/warden/v1beta2/query";
import { QueryKeychainsResponse } from "./types/warden/warden/v1beta2/query";
import { QueryKeyByIdRequest } from "./types/warden/warden/v1beta2/query";
import { QuerySignTransactionRequestByIdRequest } from "./types/warden/warden/v1beta2/query";
import { MsgFulfilSignatureRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { SignRequest } from "./types/warden/warden/v1beta2/signature";
import { QuerySignTransactionRequestsRequest } from "./types/warden/warden/v1beta2/query";
import { MsgUpdateParamsResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateKeychain } from "./types/warden/warden/v1beta2/tx";
import { Key } from "./types/warden/warden/v1beta2/key";
import { QuerySignatureRequestsResponse } from "./types/warden/warden/v1beta2/query";
import { SignTransactionRequest } from "./types/warden/warden/v1beta2/signature";
import { MsgRemoveSpaceOwner } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateSpace } from "./types/warden/warden/v1beta2/tx";
import { MsgNewSignTransactionRequest } from "./types/warden/warden/v1beta2/tx";
import { QuerySpacesRequest } from "./types/warden/warden/v1beta2/query";
import { QueryKeyResponse } from "./types/warden/warden/v1beta2/query";
import { QuerySignatureRequestsRequest } from "./types/warden/warden/v1beta2/query";
import { Space } from "./types/warden/warden/v1beta2/space";
import { MsgAddSpaceOwner } from "./types/warden/warden/v1beta2/tx";
import { MsgNewKeychainResponse } from "./types/warden/warden/v1beta2/tx";
import { KeyRequest } from "./types/warden/warden/v1beta2/key";
import { QueryKeyRequestByIdRequest } from "./types/warden/warden/v1beta2/query";
import { MetadataEthereum } from "./types/warden/warden/v1beta2/tx";
import { QuerySpaceByIdRequest } from "./types/warden/warden/v1beta2/query";
import { QueryKeychainByIdRequest } from "./types/warden/warden/v1beta2/query";
export { QueryKeysBySpaceIdRequest, QuerySignatureRequestByIdRequest, MsgNewSignTransactionRequestResponse, QueryParamsResponse, QuerySpacesResponse, QueryKeychainByIdResponse, QueryKeysResponse, SignTransactionRequestResponse, MsgUpdateKeychainResponse, MsgUpdateKeyRequest, GenesisState, QuerySpacesByOwnerRequest, QueryAllKeysRequest, MsgNewSpace, MsgAddKeychainPartyResponse, MsgNewKeyRequestResponse, Keychain, MsgAddKeychainParty, MsgUpdateKeyResponse, MsgNewSignatureRequestResponse, QueryKeyRequestByIdResponse, MsgSignedData, MsgNewKey, QuerySignTransactionRequestByIdResponse, QueryKeyRequestsResponse, MsgAddSpaceOwnerResponse, MsgRemoveSpaceOwnerResponse, Params, QuerySpaceByIdResponse, MsgNewSpaceResponse, MsgNewSignatureRequest, MsgFulfilSignatureRequest, WalletKeyResponse, QuerySignatureRequestByIdResponse, MsgUpdateParams, MsgUpdateSpaceResponse, MsgNewKeyRequest, MsgUpdateKey, QueryKeyRequestsRequest, QuerySignTransactionRequestsResponse, MsgNewKeychain, MsgUpdateKeyRequestResponse, KeychainFees, QueryParamsRequest, QueryKeychainsRequest, QueryKeychainsResponse, QueryKeyByIdRequest, QuerySignTransactionRequestByIdRequest, MsgFulfilSignatureRequestResponse, SignRequest, QuerySignTransactionRequestsRequest, MsgUpdateParamsResponse, MsgUpdateKeychain, Key, QuerySignatureRequestsResponse, SignTransactionRequest, MsgRemoveSpaceOwner, MsgUpdateSpace, MsgNewSignTransactionRequest, QuerySpacesRequest, QueryKeyResponse, QuerySignatureRequestsRequest, Space, MsgAddSpaceOwner, MsgNewKeychainResponse, KeyRequest, QueryKeyRequestByIdRequest, MetadataEthereum, QuerySpaceByIdRequest, QueryKeychainByIdRequest };
type sendQueryKeysBySpaceIdRequestParams = {
    value: QueryKeysBySpaceIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestByIdRequestParams = {
    value: QuerySignatureRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignTransactionRequestResponseParams = {
    value: MsgNewSignTransactionRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesResponseParams = {
    value: QuerySpacesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainByIdResponseParams = {
    value: QueryKeychainByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeysResponseParams = {
    value: QueryKeysResponse;
    fee?: StdFee;
    memo?: string;
};
type sendSignTransactionRequestResponseParams = {
    value: SignTransactionRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeychainResponseParams = {
    value: MsgUpdateKeychainResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyRequestParams = {
    value: MsgUpdateKeyRequest;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesByOwnerRequestParams = {
    value: QuerySpacesByOwnerRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAllKeysRequestParams = {
    value: QueryAllKeysRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSpaceParams = {
    value: MsgNewSpace;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddKeychainPartyResponseParams = {
    value: MsgAddKeychainPartyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeyRequestResponseParams = {
    value: MsgNewKeyRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendKeychainParams = {
    value: Keychain;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddKeychainPartyParams = {
    value: MsgAddKeychainParty;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyResponseParams = {
    value: MsgUpdateKeyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignatureRequestResponseParams = {
    value: MsgNewSignatureRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestByIdResponseParams = {
    value: QueryKeyRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSignedDataParams = {
    value: MsgSignedData;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeyParams = {
    value: MsgNewKey;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestByIdResponseParams = {
    value: QuerySignTransactionRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestsResponseParams = {
    value: QueryKeyRequestsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddSpaceOwnerResponseParams = {
    value: MsgAddSpaceOwnerResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRemoveSpaceOwnerResponseParams = {
    value: MsgRemoveSpaceOwnerResponse;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpaceByIdResponseParams = {
    value: QuerySpaceByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSpaceResponseParams = {
    value: MsgNewSpaceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignatureRequestParams = {
    value: MsgNewSignatureRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgFulfilSignatureRequestParams = {
    value: MsgFulfilSignatureRequest;
    fee?: StdFee;
    memo?: string;
};
type sendWalletKeyResponseParams = {
    value: WalletKeyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestByIdResponseParams = {
    value: QuerySignatureRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateSpaceResponseParams = {
    value: MsgUpdateSpaceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeyRequestParams = {
    value: MsgNewKeyRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyParams = {
    value: MsgUpdateKey;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestsRequestParams = {
    value: QueryKeyRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestsResponseParams = {
    value: QuerySignTransactionRequestsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeychainParams = {
    value: MsgNewKeychain;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyRequestResponseParams = {
    value: MsgUpdateKeyRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendKeychainFeesParams = {
    value: KeychainFees;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainsRequestParams = {
    value: QueryKeychainsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainsResponseParams = {
    value: QueryKeychainsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyByIdRequestParams = {
    value: QueryKeyByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestByIdRequestParams = {
    value: QuerySignTransactionRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgFulfilSignatureRequestResponseParams = {
    value: MsgFulfilSignatureRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendSignRequestParams = {
    value: SignRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestsRequestParams = {
    value: QuerySignTransactionRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeychainParams = {
    value: MsgUpdateKeychain;
    fee?: StdFee;
    memo?: string;
};
type sendKeyParams = {
    value: Key;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestsResponseParams = {
    value: QuerySignatureRequestsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendSignTransactionRequestParams = {
    value: SignTransactionRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRemoveSpaceOwnerParams = {
    value: MsgRemoveSpaceOwner;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateSpaceParams = {
    value: MsgUpdateSpace;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignTransactionRequestParams = {
    value: MsgNewSignTransactionRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesRequestParams = {
    value: QuerySpacesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyResponseParams = {
    value: QueryKeyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestsRequestParams = {
    value: QuerySignatureRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendSpaceParams = {
    value: Space;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddSpaceOwnerParams = {
    value: MsgAddSpaceOwner;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeychainResponseParams = {
    value: MsgNewKeychainResponse;
    fee?: StdFee;
    memo?: string;
};
type sendKeyRequestParams = {
    value: KeyRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestByIdRequestParams = {
    value: QueryKeyRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMetadataEthereumParams = {
    value: MetadataEthereum;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpaceByIdRequestParams = {
    value: QuerySpaceByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainByIdRequestParams = {
    value: QueryKeychainByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type queryKeysBySpaceIdRequestParams = {
    value: QueryKeysBySpaceIdRequest;
};
type querySignatureRequestByIdRequestParams = {
    value: QuerySignatureRequestByIdRequest;
};
type msgNewSignTransactionRequestResponseParams = {
    value: MsgNewSignTransactionRequestResponse;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type querySpacesResponseParams = {
    value: QuerySpacesResponse;
};
type queryKeychainByIdResponseParams = {
    value: QueryKeychainByIdResponse;
};
type queryKeysResponseParams = {
    value: QueryKeysResponse;
};
type signTransactionRequestResponseParams = {
    value: SignTransactionRequestResponse;
};
type msgUpdateKeychainResponseParams = {
    value: MsgUpdateKeychainResponse;
};
type msgUpdateKeyRequestParams = {
    value: MsgUpdateKeyRequest;
};
type genesisStateParams = {
    value: GenesisState;
};
type querySpacesByOwnerRequestParams = {
    value: QuerySpacesByOwnerRequest;
};
type queryAllKeysRequestParams = {
    value: QueryAllKeysRequest;
};
type msgNewSpaceParams = {
    value: MsgNewSpace;
};
type msgAddKeychainPartyResponseParams = {
    value: MsgAddKeychainPartyResponse;
};
type msgNewKeyRequestResponseParams = {
    value: MsgNewKeyRequestResponse;
};
type keychainParams = {
    value: Keychain;
};
type msgAddKeychainPartyParams = {
    value: MsgAddKeychainParty;
};
type msgUpdateKeyResponseParams = {
    value: MsgUpdateKeyResponse;
};
type msgNewSignatureRequestResponseParams = {
    value: MsgNewSignatureRequestResponse;
};
type queryKeyRequestByIdResponseParams = {
    value: QueryKeyRequestByIdResponse;
};
type msgSignedDataParams = {
    value: MsgSignedData;
};
type msgNewKeyParams = {
    value: MsgNewKey;
};
type querySignTransactionRequestByIdResponseParams = {
    value: QuerySignTransactionRequestByIdResponse;
};
type queryKeyRequestsResponseParams = {
    value: QueryKeyRequestsResponse;
};
type msgAddSpaceOwnerResponseParams = {
    value: MsgAddSpaceOwnerResponse;
};
type msgRemoveSpaceOwnerResponseParams = {
    value: MsgRemoveSpaceOwnerResponse;
};
type paramsParams = {
    value: Params;
};
type querySpaceByIdResponseParams = {
    value: QuerySpaceByIdResponse;
};
type msgNewSpaceResponseParams = {
    value: MsgNewSpaceResponse;
};
type msgNewSignatureRequestParams = {
    value: MsgNewSignatureRequest;
};
type msgFulfilSignatureRequestParams = {
    value: MsgFulfilSignatureRequest;
};
type walletKeyResponseParams = {
    value: WalletKeyResponse;
};
type querySignatureRequestByIdResponseParams = {
    value: QuerySignatureRequestByIdResponse;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type msgUpdateSpaceResponseParams = {
    value: MsgUpdateSpaceResponse;
};
type msgNewKeyRequestParams = {
    value: MsgNewKeyRequest;
};
type msgUpdateKeyParams = {
    value: MsgUpdateKey;
};
type queryKeyRequestsRequestParams = {
    value: QueryKeyRequestsRequest;
};
type querySignTransactionRequestsResponseParams = {
    value: QuerySignTransactionRequestsResponse;
};
type msgNewKeychainParams = {
    value: MsgNewKeychain;
};
type msgUpdateKeyRequestResponseParams = {
    value: MsgUpdateKeyRequestResponse;
};
type keychainFeesParams = {
    value: KeychainFees;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type queryKeychainsRequestParams = {
    value: QueryKeychainsRequest;
};
type queryKeychainsResponseParams = {
    value: QueryKeychainsResponse;
};
type queryKeyByIdRequestParams = {
    value: QueryKeyByIdRequest;
};
type querySignTransactionRequestByIdRequestParams = {
    value: QuerySignTransactionRequestByIdRequest;
};
type msgFulfilSignatureRequestResponseParams = {
    value: MsgFulfilSignatureRequestResponse;
};
type signRequestParams = {
    value: SignRequest;
};
type querySignTransactionRequestsRequestParams = {
    value: QuerySignTransactionRequestsRequest;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type msgUpdateKeychainParams = {
    value: MsgUpdateKeychain;
};
type keyParams = {
    value: Key;
};
type querySignatureRequestsResponseParams = {
    value: QuerySignatureRequestsResponse;
};
type signTransactionRequestParams = {
    value: SignTransactionRequest;
};
type msgRemoveSpaceOwnerParams = {
    value: MsgRemoveSpaceOwner;
};
type msgUpdateSpaceParams = {
    value: MsgUpdateSpace;
};
type msgNewSignTransactionRequestParams = {
    value: MsgNewSignTransactionRequest;
};
type querySpacesRequestParams = {
    value: QuerySpacesRequest;
};
type queryKeyResponseParams = {
    value: QueryKeyResponse;
};
type querySignatureRequestsRequestParams = {
    value: QuerySignatureRequestsRequest;
};
type spaceParams = {
    value: Space;
};
type msgAddSpaceOwnerParams = {
    value: MsgAddSpaceOwner;
};
type msgNewKeychainResponseParams = {
    value: MsgNewKeychainResponse;
};
type keyRequestParams = {
    value: KeyRequest;
};
type queryKeyRequestByIdRequestParams = {
    value: QueryKeyRequestByIdRequest;
};
type metadataEthereumParams = {
    value: MetadataEthereum;
};
type querySpaceByIdRequestParams = {
    value: QuerySpaceByIdRequest;
};
type queryKeychainByIdRequestParams = {
    value: QueryKeychainByIdRequest;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendQueryKeysBySpaceIdRequest({ value, fee, memo }: sendQueryKeysBySpaceIdRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestByIdRequest({ value, fee, memo }: sendQuerySignatureRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewSignTransactionRequestResponse({ value, fee, memo }: sendMsgNewSignTransactionRequestResponseParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendQuerySpacesResponse({ value, fee, memo }: sendQuerySpacesResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeychainByIdResponse({ value, fee, memo }: sendQueryKeychainByIdResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeysResponse({ value, fee, memo }: sendQueryKeysResponseParams): Promise<DeliverTxResponse>;
    sendSignTransactionRequestResponse({ value, fee, memo }: sendSignTransactionRequestResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeychainResponse({ value, fee, memo }: sendMsgUpdateKeychainResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeyRequest({ value, fee, memo }: sendMsgUpdateKeyRequestParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendQuerySpacesByOwnerRequest({ value, fee, memo }: sendQuerySpacesByOwnerRequestParams): Promise<DeliverTxResponse>;
    sendQueryAllKeysRequest({ value, fee, memo }: sendQueryAllKeysRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewSpace({ value, fee, memo }: sendMsgNewSpaceParams): Promise<DeliverTxResponse>;
    sendMsgAddKeychainPartyResponse({ value, fee, memo }: sendMsgAddKeychainPartyResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewKeyRequestResponse({ value, fee, memo }: sendMsgNewKeyRequestResponseParams): Promise<DeliverTxResponse>;
    sendKeychain({ value, fee, memo }: sendKeychainParams): Promise<DeliverTxResponse>;
    sendMsgAddKeychainParty({ value, fee, memo }: sendMsgAddKeychainPartyParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeyResponse({ value, fee, memo }: sendMsgUpdateKeyResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewSignatureRequestResponse({ value, fee, memo }: sendMsgNewSignatureRequestResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestByIdResponse({ value, fee, memo }: sendQueryKeyRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgSignedData({ value, fee, memo }: sendMsgSignedDataParams): Promise<DeliverTxResponse>;
    sendMsgNewKey({ value, fee, memo }: sendMsgNewKeyParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestByIdResponse({ value, fee, memo }: sendQuerySignTransactionRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestsResponse({ value, fee, memo }: sendQueryKeyRequestsResponseParams): Promise<DeliverTxResponse>;
    sendMsgAddSpaceOwnerResponse({ value, fee, memo }: sendMsgAddSpaceOwnerResponseParams): Promise<DeliverTxResponse>;
    sendMsgRemoveSpaceOwnerResponse({ value, fee, memo }: sendMsgRemoveSpaceOwnerResponseParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendQuerySpaceByIdResponse({ value, fee, memo }: sendQuerySpaceByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewSpaceResponse({ value, fee, memo }: sendMsgNewSpaceResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewSignatureRequest({ value, fee, memo }: sendMsgNewSignatureRequestParams): Promise<DeliverTxResponse>;
    sendMsgFulfilSignatureRequest({ value, fee, memo }: sendMsgFulfilSignatureRequestParams): Promise<DeliverTxResponse>;
    sendWalletKeyResponse({ value, fee, memo }: sendWalletKeyResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestByIdResponse({ value, fee, memo }: sendQuerySignatureRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendMsgUpdateSpaceResponse({ value, fee, memo }: sendMsgUpdateSpaceResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewKeyRequest({ value, fee, memo }: sendMsgNewKeyRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKey({ value, fee, memo }: sendMsgUpdateKeyParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestsRequest({ value, fee, memo }: sendQueryKeyRequestsRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestsResponse({ value, fee, memo }: sendQuerySignTransactionRequestsResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewKeychain({ value, fee, memo }: sendMsgNewKeychainParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeyRequestResponse({ value, fee, memo }: sendMsgUpdateKeyRequestResponseParams): Promise<DeliverTxResponse>;
    sendKeychainFees({ value, fee, memo }: sendKeychainFeesParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeychainsRequest({ value, fee, memo }: sendQueryKeychainsRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeychainsResponse({ value, fee, memo }: sendQueryKeychainsResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeyByIdRequest({ value, fee, memo }: sendQueryKeyByIdRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestByIdRequest({ value, fee, memo }: sendQuerySignTransactionRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendMsgFulfilSignatureRequestResponse({ value, fee, memo }: sendMsgFulfilSignatureRequestResponseParams): Promise<DeliverTxResponse>;
    sendSignRequest({ value, fee, memo }: sendSignRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestsRequest({ value, fee, memo }: sendQuerySignTransactionRequestsRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeychain({ value, fee, memo }: sendMsgUpdateKeychainParams): Promise<DeliverTxResponse>;
    sendKey({ value, fee, memo }: sendKeyParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestsResponse({ value, fee, memo }: sendQuerySignatureRequestsResponseParams): Promise<DeliverTxResponse>;
    sendSignTransactionRequest({ value, fee, memo }: sendSignTransactionRequestParams): Promise<DeliverTxResponse>;
    sendMsgRemoveSpaceOwner({ value, fee, memo }: sendMsgRemoveSpaceOwnerParams): Promise<DeliverTxResponse>;
    sendMsgUpdateSpace({ value, fee, memo }: sendMsgUpdateSpaceParams): Promise<DeliverTxResponse>;
    sendMsgNewSignTransactionRequest({ value, fee, memo }: sendMsgNewSignTransactionRequestParams): Promise<DeliverTxResponse>;
    sendQuerySpacesRequest({ value, fee, memo }: sendQuerySpacesRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeyResponse({ value, fee, memo }: sendQueryKeyResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestsRequest({ value, fee, memo }: sendQuerySignatureRequestsRequestParams): Promise<DeliverTxResponse>;
    sendSpace({ value, fee, memo }: sendSpaceParams): Promise<DeliverTxResponse>;
    sendMsgAddSpaceOwner({ value, fee, memo }: sendMsgAddSpaceOwnerParams): Promise<DeliverTxResponse>;
    sendMsgNewKeychainResponse({ value, fee, memo }: sendMsgNewKeychainResponseParams): Promise<DeliverTxResponse>;
    sendKeyRequest({ value, fee, memo }: sendKeyRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestByIdRequest({ value, fee, memo }: sendQueryKeyRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendMetadataEthereum({ value, fee, memo }: sendMetadataEthereumParams): Promise<DeliverTxResponse>;
    sendQuerySpaceByIdRequest({ value, fee, memo }: sendQuerySpaceByIdRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeychainByIdRequest({ value, fee, memo }: sendQueryKeychainByIdRequestParams): Promise<DeliverTxResponse>;
    queryKeysBySpaceIdRequest({ value }: queryKeysBySpaceIdRequestParams): EncodeObject;
    querySignatureRequestByIdRequest({ value }: querySignatureRequestByIdRequestParams): EncodeObject;
    msgNewSignTransactionRequestResponse({ value }: msgNewSignTransactionRequestResponseParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    querySpacesResponse({ value }: querySpacesResponseParams): EncodeObject;
    queryKeychainByIdResponse({ value }: queryKeychainByIdResponseParams): EncodeObject;
    queryKeysResponse({ value }: queryKeysResponseParams): EncodeObject;
    signTransactionRequestResponse({ value }: signTransactionRequestResponseParams): EncodeObject;
    msgUpdateKeychainResponse({ value }: msgUpdateKeychainResponseParams): EncodeObject;
    msgUpdateKeyRequest({ value }: msgUpdateKeyRequestParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    querySpacesByOwnerRequest({ value }: querySpacesByOwnerRequestParams): EncodeObject;
    queryAllKeysRequest({ value }: queryAllKeysRequestParams): EncodeObject;
    msgNewSpace({ value }: msgNewSpaceParams): EncodeObject;
    msgAddKeychainPartyResponse({ value }: msgAddKeychainPartyResponseParams): EncodeObject;
    msgNewKeyRequestResponse({ value }: msgNewKeyRequestResponseParams): EncodeObject;
    keychain({ value }: keychainParams): EncodeObject;
    msgAddKeychainParty({ value }: msgAddKeychainPartyParams): EncodeObject;
    msgUpdateKeyResponse({ value }: msgUpdateKeyResponseParams): EncodeObject;
    msgNewSignatureRequestResponse({ value }: msgNewSignatureRequestResponseParams): EncodeObject;
    queryKeyRequestByIdResponse({ value }: queryKeyRequestByIdResponseParams): EncodeObject;
    msgSignedData({ value }: msgSignedDataParams): EncodeObject;
    msgNewKey({ value }: msgNewKeyParams): EncodeObject;
    querySignTransactionRequestByIdResponse({ value }: querySignTransactionRequestByIdResponseParams): EncodeObject;
    queryKeyRequestsResponse({ value }: queryKeyRequestsResponseParams): EncodeObject;
    msgAddSpaceOwnerResponse({ value }: msgAddSpaceOwnerResponseParams): EncodeObject;
    msgRemoveSpaceOwnerResponse({ value }: msgRemoveSpaceOwnerResponseParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    querySpaceByIdResponse({ value }: querySpaceByIdResponseParams): EncodeObject;
    msgNewSpaceResponse({ value }: msgNewSpaceResponseParams): EncodeObject;
    msgNewSignatureRequest({ value }: msgNewSignatureRequestParams): EncodeObject;
    msgFulfilSignatureRequest({ value }: msgFulfilSignatureRequestParams): EncodeObject;
    walletKeyResponse({ value }: walletKeyResponseParams): EncodeObject;
    querySignatureRequestByIdResponse({ value }: querySignatureRequestByIdResponseParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    msgUpdateSpaceResponse({ value }: msgUpdateSpaceResponseParams): EncodeObject;
    msgNewKeyRequest({ value }: msgNewKeyRequestParams): EncodeObject;
    msgUpdateKey({ value }: msgUpdateKeyParams): EncodeObject;
    queryKeyRequestsRequest({ value }: queryKeyRequestsRequestParams): EncodeObject;
    querySignTransactionRequestsResponse({ value }: querySignTransactionRequestsResponseParams): EncodeObject;
    msgNewKeychain({ value }: msgNewKeychainParams): EncodeObject;
    msgUpdateKeyRequestResponse({ value }: msgUpdateKeyRequestResponseParams): EncodeObject;
    keychainFees({ value }: keychainFeesParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    queryKeychainsRequest({ value }: queryKeychainsRequestParams): EncodeObject;
    queryKeychainsResponse({ value }: queryKeychainsResponseParams): EncodeObject;
    queryKeyByIdRequest({ value }: queryKeyByIdRequestParams): EncodeObject;
    querySignTransactionRequestByIdRequest({ value }: querySignTransactionRequestByIdRequestParams): EncodeObject;
    msgFulfilSignatureRequestResponse({ value }: msgFulfilSignatureRequestResponseParams): EncodeObject;
    signRequest({ value }: signRequestParams): EncodeObject;
    querySignTransactionRequestsRequest({ value }: querySignTransactionRequestsRequestParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    msgUpdateKeychain({ value }: msgUpdateKeychainParams): EncodeObject;
    key({ value }: keyParams): EncodeObject;
    querySignatureRequestsResponse({ value }: querySignatureRequestsResponseParams): EncodeObject;
    signTransactionRequest({ value }: signTransactionRequestParams): EncodeObject;
    msgRemoveSpaceOwner({ value }: msgRemoveSpaceOwnerParams): EncodeObject;
    msgUpdateSpace({ value }: msgUpdateSpaceParams): EncodeObject;
    msgNewSignTransactionRequest({ value }: msgNewSignTransactionRequestParams): EncodeObject;
    querySpacesRequest({ value }: querySpacesRequestParams): EncodeObject;
    queryKeyResponse({ value }: queryKeyResponseParams): EncodeObject;
    querySignatureRequestsRequest({ value }: querySignatureRequestsRequestParams): EncodeObject;
    space({ value }: spaceParams): EncodeObject;
    msgAddSpaceOwner({ value }: msgAddSpaceOwnerParams): EncodeObject;
    msgNewKeychainResponse({ value }: msgNewKeychainResponseParams): EncodeObject;
    keyRequest({ value }: keyRequestParams): EncodeObject;
    queryKeyRequestByIdRequest({ value }: queryKeyRequestByIdRequestParams): EncodeObject;
    metadataEthereum({ value }: metadataEthereumParams): EncodeObject;
    querySpaceByIdRequest({ value }: querySpaceByIdRequestParams): EncodeObject;
    queryKeychainByIdRequest({ value }: queryKeychainByIdRequestParams): EncodeObject;
};
interface QueryClientOptions {
    addr: string;
}
export declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Api<unknown>;
declare class SDKModule {
    query: ReturnType<typeof queryClient>;
    tx: ReturnType<typeof txClient>;
    structure: Record<string, unknown>;
    registry: Array<[string, GeneratedType]>;
    constructor(client: IgniteClient);
    updateTX(client: IgniteClient): void;
}
declare const IgntModule: (test: IgniteClient) => {
    module: {
        WardenWardenV1Beta2: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
