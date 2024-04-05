import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgNewSignTransactionRequest } from "./types/warden/warden/v1beta2/tx";
import { QueryAllKeysRequest } from "./types/warden/warden/v1beta2/query";
import { QuerySignTransactionRequestsResponse } from "./types/warden/warden/v1beta2/query";
import { MsgAddSpaceOwnerResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgNewKeyRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { QuerySpacesRequest } from "./types/warden/warden/v1beta2/query";
import { QueryKeysResponse } from "./types/warden/warden/v1beta2/query";
import { WalletKeyResponse } from "./types/warden/warden/v1beta2/query";
import { Keychain } from "./types/warden/warden/v1beta2/keychain";
import { QuerySignatureRequestsResponse } from "./types/warden/warden/v1beta2/query";
import { SignTransactionRequest } from "./types/warden/warden/v1beta2/signature";
import { Space } from "./types/warden/warden/v1beta2/space";
import { MsgAddKeychainPartyResponse } from "./types/warden/warden/v1beta2/tx";
import { KeyRequest } from "./types/warden/warden/v1beta2/key";
import { MsgNewKey } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateKeyRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { QuerySpacesResponse } from "./types/warden/warden/v1beta2/query";
import { MsgNewSpaceResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgFulfilSignatureRequest } from "./types/warden/warden/v1beta2/tx";
import { MsgNewKeychain } from "./types/warden/warden/v1beta2/tx";
import { QueryKeysBySpaceIdRequest } from "./types/warden/warden/v1beta2/query";
import { GenesisState } from "./types/warden/warden/v1beta2/genesis";
import { QuerySpaceByIdRequest } from "./types/warden/warden/v1beta2/query";
import { QueryKeyRequestByIdRequest } from "./types/warden/warden/v1beta2/query";
import { QuerySignatureRequestByIdRequest } from "./types/warden/warden/v1beta2/query";
import { SignRequest } from "./types/warden/warden/v1beta2/signature";
import { MsgAddKeychainParty } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateSpaceResponse } from "./types/warden/warden/v1beta2/tx";
import { QueryParamsResponse } from "./types/warden/warden/v1beta2/query";
import { MsgUpdateParamsResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateKeyRequest } from "./types/warden/warden/v1beta2/tx";
import { QueryKeychainsResponse } from "./types/warden/warden/v1beta2/query";
import { QueryKeyRequestsRequest } from "./types/warden/warden/v1beta2/query";
import { QuerySignatureRequestByIdResponse } from "./types/warden/warden/v1beta2/query";
import { QuerySignTransactionRequestsRequest } from "./types/warden/warden/v1beta2/query";
import { MsgNewKeychainResponse } from "./types/warden/warden/v1beta2/tx";
import { QuerySpacesByOwnerRequest } from "./types/warden/warden/v1beta2/query";
import { MsgSignedData } from "./types/warden/warden/v1beta2/tx";
import { MetadataEthereum } from "./types/warden/warden/v1beta2/tx";
import { QueryKeychainByIdRequest } from "./types/warden/warden/v1beta2/query";
import { QueryKeyByIdRequest } from "./types/warden/warden/v1beta2/query";
import { Key } from "./types/warden/warden/v1beta2/key";
import { MsgNewKeyRequest } from "./types/warden/warden/v1beta2/tx";
import { MsgNewSignatureRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { KeychainFees } from "./types/warden/warden/v1beta2/keychain";
import { MsgAddSpaceOwner } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateKey } from "./types/warden/warden/v1beta2/tx";
import { QuerySpaceByIdResponse } from "./types/warden/warden/v1beta2/query";
import { QueryKeyResponse } from "./types/warden/warden/v1beta2/query";
import { QuerySignatureRequestsRequest } from "./types/warden/warden/v1beta2/query";
import { MsgUpdateParams } from "./types/warden/warden/v1beta2/tx";
import { MsgRemoveSpaceOwner } from "./types/warden/warden/v1beta2/tx";
import { MsgRemoveSpaceOwnerResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateSpace } from "./types/warden/warden/v1beta2/tx";
import { MsgFulfilSignatureRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { QuerySignTransactionRequestByIdResponse } from "./types/warden/warden/v1beta2/query";
import { Params } from "./types/warden/warden/v1beta2/params";
import { MsgNewSpace } from "./types/warden/warden/v1beta2/tx";
import { QueryKeychainByIdResponse } from "./types/warden/warden/v1beta2/query";
import { QueryKeyRequestByIdResponse } from "./types/warden/warden/v1beta2/query";
import { SignTransactionRequestResponse } from "./types/warden/warden/v1beta2/query";
import { MsgUpdateKeychain } from "./types/warden/warden/v1beta2/tx";
import { MsgNewSignatureRequest } from "./types/warden/warden/v1beta2/tx";
import { QueryKeychainsRequest } from "./types/warden/warden/v1beta2/query";
import { MsgNewSignTransactionRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { QueryParamsRequest } from "./types/warden/warden/v1beta2/query";
import { QueryKeyRequestsResponse } from "./types/warden/warden/v1beta2/query";
import { QuerySignTransactionRequestByIdRequest } from "./types/warden/warden/v1beta2/query";
import { MsgUpdateKeychainResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateKeyResponse } from "./types/warden/warden/v1beta2/tx";
export { MsgNewSignTransactionRequest, QueryAllKeysRequest, QuerySignTransactionRequestsResponse, MsgAddSpaceOwnerResponse, MsgNewKeyRequestResponse, QuerySpacesRequest, QueryKeysResponse, WalletKeyResponse, Keychain, QuerySignatureRequestsResponse, SignTransactionRequest, Space, MsgAddKeychainPartyResponse, KeyRequest, MsgNewKey, MsgUpdateKeyRequestResponse, QuerySpacesResponse, MsgNewSpaceResponse, MsgFulfilSignatureRequest, MsgNewKeychain, QueryKeysBySpaceIdRequest, GenesisState, QuerySpaceByIdRequest, QueryKeyRequestByIdRequest, QuerySignatureRequestByIdRequest, SignRequest, MsgAddKeychainParty, MsgUpdateSpaceResponse, QueryParamsResponse, MsgUpdateParamsResponse, MsgUpdateKeyRequest, QueryKeychainsResponse, QueryKeyRequestsRequest, QuerySignatureRequestByIdResponse, QuerySignTransactionRequestsRequest, MsgNewKeychainResponse, QuerySpacesByOwnerRequest, MsgSignedData, MetadataEthereum, QueryKeychainByIdRequest, QueryKeyByIdRequest, Key, MsgNewKeyRequest, MsgNewSignatureRequestResponse, KeychainFees, MsgAddSpaceOwner, MsgUpdateKey, QuerySpaceByIdResponse, QueryKeyResponse, QuerySignatureRequestsRequest, MsgUpdateParams, MsgRemoveSpaceOwner, MsgRemoveSpaceOwnerResponse, MsgUpdateSpace, MsgFulfilSignatureRequestResponse, QuerySignTransactionRequestByIdResponse, Params, MsgNewSpace, QueryKeychainByIdResponse, QueryKeyRequestByIdResponse, SignTransactionRequestResponse, MsgUpdateKeychain, MsgNewSignatureRequest, QueryKeychainsRequest, MsgNewSignTransactionRequestResponse, QueryParamsRequest, QueryKeyRequestsResponse, QuerySignTransactionRequestByIdRequest, MsgUpdateKeychainResponse, MsgUpdateKeyResponse };
type sendMsgNewSignTransactionRequestParams = {
    value: MsgNewSignTransactionRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAllKeysRequestParams = {
    value: QueryAllKeysRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestsResponseParams = {
    value: QuerySignTransactionRequestsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddSpaceOwnerResponseParams = {
    value: MsgAddSpaceOwnerResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeyRequestResponseParams = {
    value: MsgNewKeyRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesRequestParams = {
    value: QuerySpacesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeysResponseParams = {
    value: QueryKeysResponse;
    fee?: StdFee;
    memo?: string;
};
type sendWalletKeyResponseParams = {
    value: WalletKeyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendKeychainParams = {
    value: Keychain;
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
type sendSpaceParams = {
    value: Space;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddKeychainPartyResponseParams = {
    value: MsgAddKeychainPartyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendKeyRequestParams = {
    value: KeyRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeyParams = {
    value: MsgNewKey;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyRequestResponseParams = {
    value: MsgUpdateKeyRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesResponseParams = {
    value: QuerySpacesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSpaceResponseParams = {
    value: MsgNewSpaceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgFulfilSignatureRequestParams = {
    value: MsgFulfilSignatureRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeychainParams = {
    value: MsgNewKeychain;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeysBySpaceIdRequestParams = {
    value: QueryKeysBySpaceIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpaceByIdRequestParams = {
    value: QuerySpaceByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestByIdRequestParams = {
    value: QueryKeyRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestByIdRequestParams = {
    value: QuerySignatureRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendSignRequestParams = {
    value: SignRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddKeychainPartyParams = {
    value: MsgAddKeychainParty;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateSpaceResponseParams = {
    value: MsgUpdateSpaceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyRequestParams = {
    value: MsgUpdateKeyRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainsResponseParams = {
    value: QueryKeychainsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestsRequestParams = {
    value: QueryKeyRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestByIdResponseParams = {
    value: QuerySignatureRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestsRequestParams = {
    value: QuerySignTransactionRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeychainResponseParams = {
    value: MsgNewKeychainResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesByOwnerRequestParams = {
    value: QuerySpacesByOwnerRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSignedDataParams = {
    value: MsgSignedData;
    fee?: StdFee;
    memo?: string;
};
type sendMetadataEthereumParams = {
    value: MetadataEthereum;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainByIdRequestParams = {
    value: QueryKeychainByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyByIdRequestParams = {
    value: QueryKeyByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendKeyParams = {
    value: Key;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeyRequestParams = {
    value: MsgNewKeyRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignatureRequestResponseParams = {
    value: MsgNewSignatureRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendKeychainFeesParams = {
    value: KeychainFees;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddSpaceOwnerParams = {
    value: MsgAddSpaceOwner;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyParams = {
    value: MsgUpdateKey;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpaceByIdResponseParams = {
    value: QuerySpaceByIdResponse;
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
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRemoveSpaceOwnerParams = {
    value: MsgRemoveSpaceOwner;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRemoveSpaceOwnerResponseParams = {
    value: MsgRemoveSpaceOwnerResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateSpaceParams = {
    value: MsgUpdateSpace;
    fee?: StdFee;
    memo?: string;
};
type sendMsgFulfilSignatureRequestResponseParams = {
    value: MsgFulfilSignatureRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestByIdResponseParams = {
    value: QuerySignTransactionRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSpaceParams = {
    value: MsgNewSpace;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainByIdResponseParams = {
    value: QueryKeychainByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestByIdResponseParams = {
    value: QueryKeyRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendSignTransactionRequestResponseParams = {
    value: SignTransactionRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeychainParams = {
    value: MsgUpdateKeychain;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignatureRequestParams = {
    value: MsgNewSignatureRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainsRequestParams = {
    value: QueryKeychainsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignTransactionRequestResponseParams = {
    value: MsgNewSignTransactionRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestsResponseParams = {
    value: QueryKeyRequestsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestByIdRequestParams = {
    value: QuerySignTransactionRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeychainResponseParams = {
    value: MsgUpdateKeychainResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyResponseParams = {
    value: MsgUpdateKeyResponse;
    fee?: StdFee;
    memo?: string;
};
type msgNewSignTransactionRequestParams = {
    value: MsgNewSignTransactionRequest;
};
type queryAllKeysRequestParams = {
    value: QueryAllKeysRequest;
};
type querySignTransactionRequestsResponseParams = {
    value: QuerySignTransactionRequestsResponse;
};
type msgAddSpaceOwnerResponseParams = {
    value: MsgAddSpaceOwnerResponse;
};
type msgNewKeyRequestResponseParams = {
    value: MsgNewKeyRequestResponse;
};
type querySpacesRequestParams = {
    value: QuerySpacesRequest;
};
type queryKeysResponseParams = {
    value: QueryKeysResponse;
};
type walletKeyResponseParams = {
    value: WalletKeyResponse;
};
type keychainParams = {
    value: Keychain;
};
type querySignatureRequestsResponseParams = {
    value: QuerySignatureRequestsResponse;
};
type signTransactionRequestParams = {
    value: SignTransactionRequest;
};
type spaceParams = {
    value: Space;
};
type msgAddKeychainPartyResponseParams = {
    value: MsgAddKeychainPartyResponse;
};
type keyRequestParams = {
    value: KeyRequest;
};
type msgNewKeyParams = {
    value: MsgNewKey;
};
type msgUpdateKeyRequestResponseParams = {
    value: MsgUpdateKeyRequestResponse;
};
type querySpacesResponseParams = {
    value: QuerySpacesResponse;
};
type msgNewSpaceResponseParams = {
    value: MsgNewSpaceResponse;
};
type msgFulfilSignatureRequestParams = {
    value: MsgFulfilSignatureRequest;
};
type msgNewKeychainParams = {
    value: MsgNewKeychain;
};
type queryKeysBySpaceIdRequestParams = {
    value: QueryKeysBySpaceIdRequest;
};
type genesisStateParams = {
    value: GenesisState;
};
type querySpaceByIdRequestParams = {
    value: QuerySpaceByIdRequest;
};
type queryKeyRequestByIdRequestParams = {
    value: QueryKeyRequestByIdRequest;
};
type querySignatureRequestByIdRequestParams = {
    value: QuerySignatureRequestByIdRequest;
};
type signRequestParams = {
    value: SignRequest;
};
type msgAddKeychainPartyParams = {
    value: MsgAddKeychainParty;
};
type msgUpdateSpaceResponseParams = {
    value: MsgUpdateSpaceResponse;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type msgUpdateKeyRequestParams = {
    value: MsgUpdateKeyRequest;
};
type queryKeychainsResponseParams = {
    value: QueryKeychainsResponse;
};
type queryKeyRequestsRequestParams = {
    value: QueryKeyRequestsRequest;
};
type querySignatureRequestByIdResponseParams = {
    value: QuerySignatureRequestByIdResponse;
};
type querySignTransactionRequestsRequestParams = {
    value: QuerySignTransactionRequestsRequest;
};
type msgNewKeychainResponseParams = {
    value: MsgNewKeychainResponse;
};
type querySpacesByOwnerRequestParams = {
    value: QuerySpacesByOwnerRequest;
};
type msgSignedDataParams = {
    value: MsgSignedData;
};
type metadataEthereumParams = {
    value: MetadataEthereum;
};
type queryKeychainByIdRequestParams = {
    value: QueryKeychainByIdRequest;
};
type queryKeyByIdRequestParams = {
    value: QueryKeyByIdRequest;
};
type keyParams = {
    value: Key;
};
type msgNewKeyRequestParams = {
    value: MsgNewKeyRequest;
};
type msgNewSignatureRequestResponseParams = {
    value: MsgNewSignatureRequestResponse;
};
type keychainFeesParams = {
    value: KeychainFees;
};
type msgAddSpaceOwnerParams = {
    value: MsgAddSpaceOwner;
};
type msgUpdateKeyParams = {
    value: MsgUpdateKey;
};
type querySpaceByIdResponseParams = {
    value: QuerySpaceByIdResponse;
};
type queryKeyResponseParams = {
    value: QueryKeyResponse;
};
type querySignatureRequestsRequestParams = {
    value: QuerySignatureRequestsRequest;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type msgRemoveSpaceOwnerParams = {
    value: MsgRemoveSpaceOwner;
};
type msgRemoveSpaceOwnerResponseParams = {
    value: MsgRemoveSpaceOwnerResponse;
};
type msgUpdateSpaceParams = {
    value: MsgUpdateSpace;
};
type msgFulfilSignatureRequestResponseParams = {
    value: MsgFulfilSignatureRequestResponse;
};
type querySignTransactionRequestByIdResponseParams = {
    value: QuerySignTransactionRequestByIdResponse;
};
type paramsParams = {
    value: Params;
};
type msgNewSpaceParams = {
    value: MsgNewSpace;
};
type queryKeychainByIdResponseParams = {
    value: QueryKeychainByIdResponse;
};
type queryKeyRequestByIdResponseParams = {
    value: QueryKeyRequestByIdResponse;
};
type signTransactionRequestResponseParams = {
    value: SignTransactionRequestResponse;
};
type msgUpdateKeychainParams = {
    value: MsgUpdateKeychain;
};
type msgNewSignatureRequestParams = {
    value: MsgNewSignatureRequest;
};
type queryKeychainsRequestParams = {
    value: QueryKeychainsRequest;
};
type msgNewSignTransactionRequestResponseParams = {
    value: MsgNewSignTransactionRequestResponse;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type queryKeyRequestsResponseParams = {
    value: QueryKeyRequestsResponse;
};
type querySignTransactionRequestByIdRequestParams = {
    value: QuerySignTransactionRequestByIdRequest;
};
type msgUpdateKeychainResponseParams = {
    value: MsgUpdateKeychainResponse;
};
type msgUpdateKeyResponseParams = {
    value: MsgUpdateKeyResponse;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgNewSignTransactionRequest({ value, fee, memo }: sendMsgNewSignTransactionRequestParams): Promise<DeliverTxResponse>;
    sendQueryAllKeysRequest({ value, fee, memo }: sendQueryAllKeysRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestsResponse({ value, fee, memo }: sendQuerySignTransactionRequestsResponseParams): Promise<DeliverTxResponse>;
    sendMsgAddSpaceOwnerResponse({ value, fee, memo }: sendMsgAddSpaceOwnerResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewKeyRequestResponse({ value, fee, memo }: sendMsgNewKeyRequestResponseParams): Promise<DeliverTxResponse>;
    sendQuerySpacesRequest({ value, fee, memo }: sendQuerySpacesRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeysResponse({ value, fee, memo }: sendQueryKeysResponseParams): Promise<DeliverTxResponse>;
    sendWalletKeyResponse({ value, fee, memo }: sendWalletKeyResponseParams): Promise<DeliverTxResponse>;
    sendKeychain({ value, fee, memo }: sendKeychainParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestsResponse({ value, fee, memo }: sendQuerySignatureRequestsResponseParams): Promise<DeliverTxResponse>;
    sendSignTransactionRequest({ value, fee, memo }: sendSignTransactionRequestParams): Promise<DeliverTxResponse>;
    sendSpace({ value, fee, memo }: sendSpaceParams): Promise<DeliverTxResponse>;
    sendMsgAddKeychainPartyResponse({ value, fee, memo }: sendMsgAddKeychainPartyResponseParams): Promise<DeliverTxResponse>;
    sendKeyRequest({ value, fee, memo }: sendKeyRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewKey({ value, fee, memo }: sendMsgNewKeyParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeyRequestResponse({ value, fee, memo }: sendMsgUpdateKeyRequestResponseParams): Promise<DeliverTxResponse>;
    sendQuerySpacesResponse({ value, fee, memo }: sendQuerySpacesResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewSpaceResponse({ value, fee, memo }: sendMsgNewSpaceResponseParams): Promise<DeliverTxResponse>;
    sendMsgFulfilSignatureRequest({ value, fee, memo }: sendMsgFulfilSignatureRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewKeychain({ value, fee, memo }: sendMsgNewKeychainParams): Promise<DeliverTxResponse>;
    sendQueryKeysBySpaceIdRequest({ value, fee, memo }: sendQueryKeysBySpaceIdRequestParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendQuerySpaceByIdRequest({ value, fee, memo }: sendQuerySpaceByIdRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestByIdRequest({ value, fee, memo }: sendQueryKeyRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestByIdRequest({ value, fee, memo }: sendQuerySignatureRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendSignRequest({ value, fee, memo }: sendSignRequestParams): Promise<DeliverTxResponse>;
    sendMsgAddKeychainParty({ value, fee, memo }: sendMsgAddKeychainPartyParams): Promise<DeliverTxResponse>;
    sendMsgUpdateSpaceResponse({ value, fee, memo }: sendMsgUpdateSpaceResponseParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeyRequest({ value, fee, memo }: sendMsgUpdateKeyRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeychainsResponse({ value, fee, memo }: sendQueryKeychainsResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestsRequest({ value, fee, memo }: sendQueryKeyRequestsRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestByIdResponse({ value, fee, memo }: sendQuerySignatureRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestsRequest({ value, fee, memo }: sendQuerySignTransactionRequestsRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewKeychainResponse({ value, fee, memo }: sendMsgNewKeychainResponseParams): Promise<DeliverTxResponse>;
    sendQuerySpacesByOwnerRequest({ value, fee, memo }: sendQuerySpacesByOwnerRequestParams): Promise<DeliverTxResponse>;
    sendMsgSignedData({ value, fee, memo }: sendMsgSignedDataParams): Promise<DeliverTxResponse>;
    sendMetadataEthereum({ value, fee, memo }: sendMetadataEthereumParams): Promise<DeliverTxResponse>;
    sendQueryKeychainByIdRequest({ value, fee, memo }: sendQueryKeychainByIdRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeyByIdRequest({ value, fee, memo }: sendQueryKeyByIdRequestParams): Promise<DeliverTxResponse>;
    sendKey({ value, fee, memo }: sendKeyParams): Promise<DeliverTxResponse>;
    sendMsgNewKeyRequest({ value, fee, memo }: sendMsgNewKeyRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewSignatureRequestResponse({ value, fee, memo }: sendMsgNewSignatureRequestResponseParams): Promise<DeliverTxResponse>;
    sendKeychainFees({ value, fee, memo }: sendKeychainFeesParams): Promise<DeliverTxResponse>;
    sendMsgAddSpaceOwner({ value, fee, memo }: sendMsgAddSpaceOwnerParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKey({ value, fee, memo }: sendMsgUpdateKeyParams): Promise<DeliverTxResponse>;
    sendQuerySpaceByIdResponse({ value, fee, memo }: sendQuerySpaceByIdResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeyResponse({ value, fee, memo }: sendQueryKeyResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestsRequest({ value, fee, memo }: sendQuerySignatureRequestsRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendMsgRemoveSpaceOwner({ value, fee, memo }: sendMsgRemoveSpaceOwnerParams): Promise<DeliverTxResponse>;
    sendMsgRemoveSpaceOwnerResponse({ value, fee, memo }: sendMsgRemoveSpaceOwnerResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateSpace({ value, fee, memo }: sendMsgUpdateSpaceParams): Promise<DeliverTxResponse>;
    sendMsgFulfilSignatureRequestResponse({ value, fee, memo }: sendMsgFulfilSignatureRequestResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestByIdResponse({ value, fee, memo }: sendQuerySignTransactionRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendMsgNewSpace({ value, fee, memo }: sendMsgNewSpaceParams): Promise<DeliverTxResponse>;
    sendQueryKeychainByIdResponse({ value, fee, memo }: sendQueryKeychainByIdResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestByIdResponse({ value, fee, memo }: sendQueryKeyRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendSignTransactionRequestResponse({ value, fee, memo }: sendSignTransactionRequestResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeychain({ value, fee, memo }: sendMsgUpdateKeychainParams): Promise<DeliverTxResponse>;
    sendMsgNewSignatureRequest({ value, fee, memo }: sendMsgNewSignatureRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeychainsRequest({ value, fee, memo }: sendQueryKeychainsRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewSignTransactionRequestResponse({ value, fee, memo }: sendMsgNewSignTransactionRequestResponseParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestsResponse({ value, fee, memo }: sendQueryKeyRequestsResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestByIdRequest({ value, fee, memo }: sendQuerySignTransactionRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeychainResponse({ value, fee, memo }: sendMsgUpdateKeychainResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeyResponse({ value, fee, memo }: sendMsgUpdateKeyResponseParams): Promise<DeliverTxResponse>;
    msgNewSignTransactionRequest({ value }: msgNewSignTransactionRequestParams): EncodeObject;
    queryAllKeysRequest({ value }: queryAllKeysRequestParams): EncodeObject;
    querySignTransactionRequestsResponse({ value }: querySignTransactionRequestsResponseParams): EncodeObject;
    msgAddSpaceOwnerResponse({ value }: msgAddSpaceOwnerResponseParams): EncodeObject;
    msgNewKeyRequestResponse({ value }: msgNewKeyRequestResponseParams): EncodeObject;
    querySpacesRequest({ value }: querySpacesRequestParams): EncodeObject;
    queryKeysResponse({ value }: queryKeysResponseParams): EncodeObject;
    walletKeyResponse({ value }: walletKeyResponseParams): EncodeObject;
    keychain({ value }: keychainParams): EncodeObject;
    querySignatureRequestsResponse({ value }: querySignatureRequestsResponseParams): EncodeObject;
    signTransactionRequest({ value }: signTransactionRequestParams): EncodeObject;
    space({ value }: spaceParams): EncodeObject;
    msgAddKeychainPartyResponse({ value }: msgAddKeychainPartyResponseParams): EncodeObject;
    keyRequest({ value }: keyRequestParams): EncodeObject;
    msgNewKey({ value }: msgNewKeyParams): EncodeObject;
    msgUpdateKeyRequestResponse({ value }: msgUpdateKeyRequestResponseParams): EncodeObject;
    querySpacesResponse({ value }: querySpacesResponseParams): EncodeObject;
    msgNewSpaceResponse({ value }: msgNewSpaceResponseParams): EncodeObject;
    msgFulfilSignatureRequest({ value }: msgFulfilSignatureRequestParams): EncodeObject;
    msgNewKeychain({ value }: msgNewKeychainParams): EncodeObject;
    queryKeysBySpaceIdRequest({ value }: queryKeysBySpaceIdRequestParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    querySpaceByIdRequest({ value }: querySpaceByIdRequestParams): EncodeObject;
    queryKeyRequestByIdRequest({ value }: queryKeyRequestByIdRequestParams): EncodeObject;
    querySignatureRequestByIdRequest({ value }: querySignatureRequestByIdRequestParams): EncodeObject;
    signRequest({ value }: signRequestParams): EncodeObject;
    msgAddKeychainParty({ value }: msgAddKeychainPartyParams): EncodeObject;
    msgUpdateSpaceResponse({ value }: msgUpdateSpaceResponseParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    msgUpdateKeyRequest({ value }: msgUpdateKeyRequestParams): EncodeObject;
    queryKeychainsResponse({ value }: queryKeychainsResponseParams): EncodeObject;
    queryKeyRequestsRequest({ value }: queryKeyRequestsRequestParams): EncodeObject;
    querySignatureRequestByIdResponse({ value }: querySignatureRequestByIdResponseParams): EncodeObject;
    querySignTransactionRequestsRequest({ value }: querySignTransactionRequestsRequestParams): EncodeObject;
    msgNewKeychainResponse({ value }: msgNewKeychainResponseParams): EncodeObject;
    querySpacesByOwnerRequest({ value }: querySpacesByOwnerRequestParams): EncodeObject;
    msgSignedData({ value }: msgSignedDataParams): EncodeObject;
    metadataEthereum({ value }: metadataEthereumParams): EncodeObject;
    queryKeychainByIdRequest({ value }: queryKeychainByIdRequestParams): EncodeObject;
    queryKeyByIdRequest({ value }: queryKeyByIdRequestParams): EncodeObject;
    key({ value }: keyParams): EncodeObject;
    msgNewKeyRequest({ value }: msgNewKeyRequestParams): EncodeObject;
    msgNewSignatureRequestResponse({ value }: msgNewSignatureRequestResponseParams): EncodeObject;
    keychainFees({ value }: keychainFeesParams): EncodeObject;
    msgAddSpaceOwner({ value }: msgAddSpaceOwnerParams): EncodeObject;
    msgUpdateKey({ value }: msgUpdateKeyParams): EncodeObject;
    querySpaceByIdResponse({ value }: querySpaceByIdResponseParams): EncodeObject;
    queryKeyResponse({ value }: queryKeyResponseParams): EncodeObject;
    querySignatureRequestsRequest({ value }: querySignatureRequestsRequestParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    msgRemoveSpaceOwner({ value }: msgRemoveSpaceOwnerParams): EncodeObject;
    msgRemoveSpaceOwnerResponse({ value }: msgRemoveSpaceOwnerResponseParams): EncodeObject;
    msgUpdateSpace({ value }: msgUpdateSpaceParams): EncodeObject;
    msgFulfilSignatureRequestResponse({ value }: msgFulfilSignatureRequestResponseParams): EncodeObject;
    querySignTransactionRequestByIdResponse({ value }: querySignTransactionRequestByIdResponseParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    msgNewSpace({ value }: msgNewSpaceParams): EncodeObject;
    queryKeychainByIdResponse({ value }: queryKeychainByIdResponseParams): EncodeObject;
    queryKeyRequestByIdResponse({ value }: queryKeyRequestByIdResponseParams): EncodeObject;
    signTransactionRequestResponse({ value }: signTransactionRequestResponseParams): EncodeObject;
    msgUpdateKeychain({ value }: msgUpdateKeychainParams): EncodeObject;
    msgNewSignatureRequest({ value }: msgNewSignatureRequestParams): EncodeObject;
    queryKeychainsRequest({ value }: queryKeychainsRequestParams): EncodeObject;
    msgNewSignTransactionRequestResponse({ value }: msgNewSignTransactionRequestResponseParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    queryKeyRequestsResponse({ value }: queryKeyRequestsResponseParams): EncodeObject;
    querySignTransactionRequestByIdRequest({ value }: querySignTransactionRequestByIdRequestParams): EncodeObject;
    msgUpdateKeychainResponse({ value }: msgUpdateKeychainResponseParams): EncodeObject;
    msgUpdateKeyResponse({ value }: msgUpdateKeyResponseParams): EncodeObject;
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
