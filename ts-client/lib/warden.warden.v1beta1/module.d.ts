import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgUpdateSpaceResponse } from "./types/warden/warden/v1beta1/tx";
import { MsgNewSignTransactionRequest } from "./types/warden/warden/v1beta1/tx";
import { QueryKeysResponse } from "./types/warden/warden/v1beta1/query";
import { MsgUpdateParams } from "./types/warden/warden/v1beta1/tx";
import { Space } from "./types/warden/warden/v1beta1/space";
import { SignTransactionRequest } from "./types/warden/warden/v1beta1/signature";
import { QueryKeyRequestsResponse } from "./types/warden/warden/v1beta1/query";
import { MsgNewKeyRequestResponse } from "./types/warden/warden/v1beta1/tx";
import { MsgNewKeychain } from "./types/warden/warden/v1beta1/tx";
import { SignRequest } from "./types/warden/warden/v1beta1/signature";
import { MsgNewSpace } from "./types/warden/warden/v1beta1/tx";
import { MsgUpdateSpace } from "./types/warden/warden/v1beta1/tx";
import { MsgNewKeyRequest } from "./types/warden/warden/v1beta1/tx";
import { MsgNewSignatureRequestResponse } from "./types/warden/warden/v1beta1/tx";
import { QueryKeyRequestByIdResponse } from "./types/warden/warden/v1beta1/query";
import { MsgNewKeychainResponse } from "./types/warden/warden/v1beta1/tx";
import { MsgUpdateKeychain } from "./types/warden/warden/v1beta1/tx";
import { QueryKeychainByAddressResponse } from "./types/warden/warden/v1beta1/query";
import { MsgNewSpaceResponse } from "./types/warden/warden/v1beta1/tx";
import { QuerySignTransactionRequestByIdRequest } from "./types/warden/warden/v1beta1/query";
import { MsgAddKeychainParty } from "./types/warden/warden/v1beta1/tx";
import { GenesisState } from "./types/warden/warden/v1beta1/genesis";
import { Key } from "./types/warden/warden/v1beta1/key";
import { QueryKeychainsResponse } from "./types/warden/warden/v1beta1/query";
import { QuerySignatureRequestsRequest } from "./types/warden/warden/v1beta1/query";
import { MsgAddSpaceOwnerResponse } from "./types/warden/warden/v1beta1/tx";
import { QuerySpacesByOwnerRequest } from "./types/warden/warden/v1beta1/query";
import { QueryKeyRequestByIdRequest } from "./types/warden/warden/v1beta1/query";
import { QuerySignTransactionRequestsRequest } from "./types/warden/warden/v1beta1/query";
import { MsgAddSpaceOwner } from "./types/warden/warden/v1beta1/tx";
import { MsgNewSignTransactionRequestResponse } from "./types/warden/warden/v1beta1/tx";
import { QuerySpaceByAddressResponse } from "./types/warden/warden/v1beta1/query";
import { QueryKeyRequestsRequest } from "./types/warden/warden/v1beta1/query";
import { MsgNewSignatureRequest } from "./types/warden/warden/v1beta1/tx";
import { MetadataEthereum } from "./types/warden/warden/v1beta1/tx";
import { KeyRequest } from "./types/warden/warden/v1beta1/key";
import { QuerySpaceByAddressRequest } from "./types/warden/warden/v1beta1/query";
import { MsgNewKey } from "./types/warden/warden/v1beta1/tx";
import { QuerySignatureRequestsResponse } from "./types/warden/warden/v1beta1/query";
import { MsgSignedData } from "./types/warden/warden/v1beta1/tx";
import { MsgFulfilSignatureRequest } from "./types/warden/warden/v1beta1/tx";
import { QueryKeychainsRequest } from "./types/warden/warden/v1beta1/query";
import { QueryKeychainByAddressRequest } from "./types/warden/warden/v1beta1/query";
import { MsgUpdateParamsResponse } from "./types/warden/warden/v1beta1/tx";
import { MsgUpdateKeyRequestResponse } from "./types/warden/warden/v1beta1/tx";
import { MsgFulfilSignatureRequestResponse } from "./types/warden/warden/v1beta1/tx";
import { KeyResponse } from "./types/warden/warden/v1beta1/query";
import { QuerySignTransactionRequestsResponse } from "./types/warden/warden/v1beta1/query";
import { QuerySignatureRequestByIdResponse } from "./types/warden/warden/v1beta1/query";
import { QuerySignTransactionRequestByIdResponse } from "./types/warden/warden/v1beta1/query";
import { MsgRemoveSpaceOwnerResponse } from "./types/warden/warden/v1beta1/tx";
import { MsgUpdateKeychainResponse } from "./types/warden/warden/v1beta1/tx";
import { KeychainFees } from "./types/warden/warden/v1beta1/keychain";
import { QuerySpacesRequest } from "./types/warden/warden/v1beta1/query";
import { MsgAddKeychainPartyResponse } from "./types/warden/warden/v1beta1/tx";
import { QuerySpacesResponse } from "./types/warden/warden/v1beta1/query";
import { WalletKeyResponse } from "./types/warden/warden/v1beta1/query";
import { QuerySignatureRequestByIdRequest } from "./types/warden/warden/v1beta1/query";
import { SignTransactionRequestResponse } from "./types/warden/warden/v1beta1/query";
import { Keychain } from "./types/warden/warden/v1beta1/keychain";
import { Params } from "./types/warden/warden/v1beta1/params";
import { QueryKeysRequest } from "./types/warden/warden/v1beta1/query";
import { MsgUpdateKeyRequest } from "./types/warden/warden/v1beta1/tx";
import { MsgRemoveSpaceOwner } from "./types/warden/warden/v1beta1/tx";
import { QueryParamsRequest } from "./types/warden/warden/v1beta1/query";
import { QueryParamsResponse } from "./types/warden/warden/v1beta1/query";
export { MsgUpdateSpaceResponse, MsgNewSignTransactionRequest, QueryKeysResponse, MsgUpdateParams, Space, SignTransactionRequest, QueryKeyRequestsResponse, MsgNewKeyRequestResponse, MsgNewKeychain, SignRequest, MsgNewSpace, MsgUpdateSpace, MsgNewKeyRequest, MsgNewSignatureRequestResponse, QueryKeyRequestByIdResponse, MsgNewKeychainResponse, MsgUpdateKeychain, QueryKeychainByAddressResponse, MsgNewSpaceResponse, QuerySignTransactionRequestByIdRequest, MsgAddKeychainParty, GenesisState, Key, QueryKeychainsResponse, QuerySignatureRequestsRequest, MsgAddSpaceOwnerResponse, QuerySpacesByOwnerRequest, QueryKeyRequestByIdRequest, QuerySignTransactionRequestsRequest, MsgAddSpaceOwner, MsgNewSignTransactionRequestResponse, QuerySpaceByAddressResponse, QueryKeyRequestsRequest, MsgNewSignatureRequest, MetadataEthereum, KeyRequest, QuerySpaceByAddressRequest, MsgNewKey, QuerySignatureRequestsResponse, MsgSignedData, MsgFulfilSignatureRequest, QueryKeychainsRequest, QueryKeychainByAddressRequest, MsgUpdateParamsResponse, MsgUpdateKeyRequestResponse, MsgFulfilSignatureRequestResponse, KeyResponse, QuerySignTransactionRequestsResponse, QuerySignatureRequestByIdResponse, QuerySignTransactionRequestByIdResponse, MsgRemoveSpaceOwnerResponse, MsgUpdateKeychainResponse, KeychainFees, QuerySpacesRequest, MsgAddKeychainPartyResponse, QuerySpacesResponse, WalletKeyResponse, QuerySignatureRequestByIdRequest, SignTransactionRequestResponse, Keychain, Params, QueryKeysRequest, MsgUpdateKeyRequest, MsgRemoveSpaceOwner, QueryParamsRequest, QueryParamsResponse };
type sendMsgUpdateSpaceResponseParams = {
    value: MsgUpdateSpaceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignTransactionRequestParams = {
    value: MsgNewSignTransactionRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeysResponseParams = {
    value: QueryKeysResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendSpaceParams = {
    value: Space;
    fee?: StdFee;
    memo?: string;
};
type sendSignTransactionRequestParams = {
    value: SignTransactionRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestsResponseParams = {
    value: QueryKeyRequestsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeyRequestResponseParams = {
    value: MsgNewKeyRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeychainParams = {
    value: MsgNewKeychain;
    fee?: StdFee;
    memo?: string;
};
type sendSignRequestParams = {
    value: SignRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSpaceParams = {
    value: MsgNewSpace;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateSpaceParams = {
    value: MsgUpdateSpace;
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
type sendQueryKeyRequestByIdResponseParams = {
    value: QueryKeyRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeychainResponseParams = {
    value: MsgNewKeychainResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeychainParams = {
    value: MsgUpdateKeychain;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainByAddressResponseParams = {
    value: QueryKeychainByAddressResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSpaceResponseParams = {
    value: MsgNewSpaceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestByIdRequestParams = {
    value: QuerySignTransactionRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddKeychainPartyParams = {
    value: MsgAddKeychainParty;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendKeyParams = {
    value: Key;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainsResponseParams = {
    value: QueryKeychainsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestsRequestParams = {
    value: QuerySignatureRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddSpaceOwnerResponseParams = {
    value: MsgAddSpaceOwnerResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesByOwnerRequestParams = {
    value: QuerySpacesByOwnerRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestByIdRequestParams = {
    value: QueryKeyRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestsRequestParams = {
    value: QuerySignTransactionRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddSpaceOwnerParams = {
    value: MsgAddSpaceOwner;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignTransactionRequestResponseParams = {
    value: MsgNewSignTransactionRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpaceByAddressResponseParams = {
    value: QuerySpaceByAddressResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestsRequestParams = {
    value: QueryKeyRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignatureRequestParams = {
    value: MsgNewSignatureRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMetadataEthereumParams = {
    value: MetadataEthereum;
    fee?: StdFee;
    memo?: string;
};
type sendKeyRequestParams = {
    value: KeyRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpaceByAddressRequestParams = {
    value: QuerySpaceByAddressRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeyParams = {
    value: MsgNewKey;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestsResponseParams = {
    value: QuerySignatureRequestsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSignedDataParams = {
    value: MsgSignedData;
    fee?: StdFee;
    memo?: string;
};
type sendMsgFulfilSignatureRequestParams = {
    value: MsgFulfilSignatureRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainsRequestParams = {
    value: QueryKeychainsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainByAddressRequestParams = {
    value: QueryKeychainByAddressRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyRequestResponseParams = {
    value: MsgUpdateKeyRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgFulfilSignatureRequestResponseParams = {
    value: MsgFulfilSignatureRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendKeyResponseParams = {
    value: KeyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestsResponseParams = {
    value: QuerySignTransactionRequestsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestByIdResponseParams = {
    value: QuerySignatureRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestByIdResponseParams = {
    value: QuerySignTransactionRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRemoveSpaceOwnerResponseParams = {
    value: MsgRemoveSpaceOwnerResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeychainResponseParams = {
    value: MsgUpdateKeychainResponse;
    fee?: StdFee;
    memo?: string;
};
type sendKeychainFeesParams = {
    value: KeychainFees;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesRequestParams = {
    value: QuerySpacesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddKeychainPartyResponseParams = {
    value: MsgAddKeychainPartyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesResponseParams = {
    value: QuerySpacesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendWalletKeyResponseParams = {
    value: WalletKeyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestByIdRequestParams = {
    value: QuerySignatureRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendSignTransactionRequestResponseParams = {
    value: SignTransactionRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendKeychainParams = {
    value: Keychain;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeysRequestParams = {
    value: QueryKeysRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyRequestParams = {
    value: MsgUpdateKeyRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRemoveSpaceOwnerParams = {
    value: MsgRemoveSpaceOwner;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type msgUpdateSpaceResponseParams = {
    value: MsgUpdateSpaceResponse;
};
type msgNewSignTransactionRequestParams = {
    value: MsgNewSignTransactionRequest;
};
type queryKeysResponseParams = {
    value: QueryKeysResponse;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type spaceParams = {
    value: Space;
};
type signTransactionRequestParams = {
    value: SignTransactionRequest;
};
type queryKeyRequestsResponseParams = {
    value: QueryKeyRequestsResponse;
};
type msgNewKeyRequestResponseParams = {
    value: MsgNewKeyRequestResponse;
};
type msgNewKeychainParams = {
    value: MsgNewKeychain;
};
type signRequestParams = {
    value: SignRequest;
};
type msgNewSpaceParams = {
    value: MsgNewSpace;
};
type msgUpdateSpaceParams = {
    value: MsgUpdateSpace;
};
type msgNewKeyRequestParams = {
    value: MsgNewKeyRequest;
};
type msgNewSignatureRequestResponseParams = {
    value: MsgNewSignatureRequestResponse;
};
type queryKeyRequestByIdResponseParams = {
    value: QueryKeyRequestByIdResponse;
};
type msgNewKeychainResponseParams = {
    value: MsgNewKeychainResponse;
};
type msgUpdateKeychainParams = {
    value: MsgUpdateKeychain;
};
type queryKeychainByAddressResponseParams = {
    value: QueryKeychainByAddressResponse;
};
type msgNewSpaceResponseParams = {
    value: MsgNewSpaceResponse;
};
type querySignTransactionRequestByIdRequestParams = {
    value: QuerySignTransactionRequestByIdRequest;
};
type msgAddKeychainPartyParams = {
    value: MsgAddKeychainParty;
};
type genesisStateParams = {
    value: GenesisState;
};
type keyParams = {
    value: Key;
};
type queryKeychainsResponseParams = {
    value: QueryKeychainsResponse;
};
type querySignatureRequestsRequestParams = {
    value: QuerySignatureRequestsRequest;
};
type msgAddSpaceOwnerResponseParams = {
    value: MsgAddSpaceOwnerResponse;
};
type querySpacesByOwnerRequestParams = {
    value: QuerySpacesByOwnerRequest;
};
type queryKeyRequestByIdRequestParams = {
    value: QueryKeyRequestByIdRequest;
};
type querySignTransactionRequestsRequestParams = {
    value: QuerySignTransactionRequestsRequest;
};
type msgAddSpaceOwnerParams = {
    value: MsgAddSpaceOwner;
};
type msgNewSignTransactionRequestResponseParams = {
    value: MsgNewSignTransactionRequestResponse;
};
type querySpaceByAddressResponseParams = {
    value: QuerySpaceByAddressResponse;
};
type queryKeyRequestsRequestParams = {
    value: QueryKeyRequestsRequest;
};
type msgNewSignatureRequestParams = {
    value: MsgNewSignatureRequest;
};
type metadataEthereumParams = {
    value: MetadataEthereum;
};
type keyRequestParams = {
    value: KeyRequest;
};
type querySpaceByAddressRequestParams = {
    value: QuerySpaceByAddressRequest;
};
type msgNewKeyParams = {
    value: MsgNewKey;
};
type querySignatureRequestsResponseParams = {
    value: QuerySignatureRequestsResponse;
};
type msgSignedDataParams = {
    value: MsgSignedData;
};
type msgFulfilSignatureRequestParams = {
    value: MsgFulfilSignatureRequest;
};
type queryKeychainsRequestParams = {
    value: QueryKeychainsRequest;
};
type queryKeychainByAddressRequestParams = {
    value: QueryKeychainByAddressRequest;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type msgUpdateKeyRequestResponseParams = {
    value: MsgUpdateKeyRequestResponse;
};
type msgFulfilSignatureRequestResponseParams = {
    value: MsgFulfilSignatureRequestResponse;
};
type keyResponseParams = {
    value: KeyResponse;
};
type querySignTransactionRequestsResponseParams = {
    value: QuerySignTransactionRequestsResponse;
};
type querySignatureRequestByIdResponseParams = {
    value: QuerySignatureRequestByIdResponse;
};
type querySignTransactionRequestByIdResponseParams = {
    value: QuerySignTransactionRequestByIdResponse;
};
type msgRemoveSpaceOwnerResponseParams = {
    value: MsgRemoveSpaceOwnerResponse;
};
type msgUpdateKeychainResponseParams = {
    value: MsgUpdateKeychainResponse;
};
type keychainFeesParams = {
    value: KeychainFees;
};
type querySpacesRequestParams = {
    value: QuerySpacesRequest;
};
type msgAddKeychainPartyResponseParams = {
    value: MsgAddKeychainPartyResponse;
};
type querySpacesResponseParams = {
    value: QuerySpacesResponse;
};
type walletKeyResponseParams = {
    value: WalletKeyResponse;
};
type querySignatureRequestByIdRequestParams = {
    value: QuerySignatureRequestByIdRequest;
};
type signTransactionRequestResponseParams = {
    value: SignTransactionRequestResponse;
};
type keychainParams = {
    value: Keychain;
};
type paramsParams = {
    value: Params;
};
type queryKeysRequestParams = {
    value: QueryKeysRequest;
};
type msgUpdateKeyRequestParams = {
    value: MsgUpdateKeyRequest;
};
type msgRemoveSpaceOwnerParams = {
    value: MsgRemoveSpaceOwner;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgUpdateSpaceResponse({ value, fee, memo }: sendMsgUpdateSpaceResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewSignTransactionRequest({ value, fee, memo }: sendMsgNewSignTransactionRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeysResponse({ value, fee, memo }: sendQueryKeysResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendSpace({ value, fee, memo }: sendSpaceParams): Promise<DeliverTxResponse>;
    sendSignTransactionRequest({ value, fee, memo }: sendSignTransactionRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestsResponse({ value, fee, memo }: sendQueryKeyRequestsResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewKeyRequestResponse({ value, fee, memo }: sendMsgNewKeyRequestResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewKeychain({ value, fee, memo }: sendMsgNewKeychainParams): Promise<DeliverTxResponse>;
    sendSignRequest({ value, fee, memo }: sendSignRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewSpace({ value, fee, memo }: sendMsgNewSpaceParams): Promise<DeliverTxResponse>;
    sendMsgUpdateSpace({ value, fee, memo }: sendMsgUpdateSpaceParams): Promise<DeliverTxResponse>;
    sendMsgNewKeyRequest({ value, fee, memo }: sendMsgNewKeyRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewSignatureRequestResponse({ value, fee, memo }: sendMsgNewSignatureRequestResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestByIdResponse({ value, fee, memo }: sendQueryKeyRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewKeychainResponse({ value, fee, memo }: sendMsgNewKeychainResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeychain({ value, fee, memo }: sendMsgUpdateKeychainParams): Promise<DeliverTxResponse>;
    sendQueryKeychainByAddressResponse({ value, fee, memo }: sendQueryKeychainByAddressResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewSpaceResponse({ value, fee, memo }: sendMsgNewSpaceResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestByIdRequest({ value, fee, memo }: sendQuerySignTransactionRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendMsgAddKeychainParty({ value, fee, memo }: sendMsgAddKeychainPartyParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendKey({ value, fee, memo }: sendKeyParams): Promise<DeliverTxResponse>;
    sendQueryKeychainsResponse({ value, fee, memo }: sendQueryKeychainsResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestsRequest({ value, fee, memo }: sendQuerySignatureRequestsRequestParams): Promise<DeliverTxResponse>;
    sendMsgAddSpaceOwnerResponse({ value, fee, memo }: sendMsgAddSpaceOwnerResponseParams): Promise<DeliverTxResponse>;
    sendQuerySpacesByOwnerRequest({ value, fee, memo }: sendQuerySpacesByOwnerRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestByIdRequest({ value, fee, memo }: sendQueryKeyRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestsRequest({ value, fee, memo }: sendQuerySignTransactionRequestsRequestParams): Promise<DeliverTxResponse>;
    sendMsgAddSpaceOwner({ value, fee, memo }: sendMsgAddSpaceOwnerParams): Promise<DeliverTxResponse>;
    sendMsgNewSignTransactionRequestResponse({ value, fee, memo }: sendMsgNewSignTransactionRequestResponseParams): Promise<DeliverTxResponse>;
    sendQuerySpaceByAddressResponse({ value, fee, memo }: sendQuerySpaceByAddressResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestsRequest({ value, fee, memo }: sendQueryKeyRequestsRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewSignatureRequest({ value, fee, memo }: sendMsgNewSignatureRequestParams): Promise<DeliverTxResponse>;
    sendMetadataEthereum({ value, fee, memo }: sendMetadataEthereumParams): Promise<DeliverTxResponse>;
    sendKeyRequest({ value, fee, memo }: sendKeyRequestParams): Promise<DeliverTxResponse>;
    sendQuerySpaceByAddressRequest({ value, fee, memo }: sendQuerySpaceByAddressRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewKey({ value, fee, memo }: sendMsgNewKeyParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestsResponse({ value, fee, memo }: sendQuerySignatureRequestsResponseParams): Promise<DeliverTxResponse>;
    sendMsgSignedData({ value, fee, memo }: sendMsgSignedDataParams): Promise<DeliverTxResponse>;
    sendMsgFulfilSignatureRequest({ value, fee, memo }: sendMsgFulfilSignatureRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeychainsRequest({ value, fee, memo }: sendQueryKeychainsRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeychainByAddressRequest({ value, fee, memo }: sendQueryKeychainByAddressRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeyRequestResponse({ value, fee, memo }: sendMsgUpdateKeyRequestResponseParams): Promise<DeliverTxResponse>;
    sendMsgFulfilSignatureRequestResponse({ value, fee, memo }: sendMsgFulfilSignatureRequestResponseParams): Promise<DeliverTxResponse>;
    sendKeyResponse({ value, fee, memo }: sendKeyResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestsResponse({ value, fee, memo }: sendQuerySignTransactionRequestsResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestByIdResponse({ value, fee, memo }: sendQuerySignatureRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestByIdResponse({ value, fee, memo }: sendQuerySignTransactionRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgRemoveSpaceOwnerResponse({ value, fee, memo }: sendMsgRemoveSpaceOwnerResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeychainResponse({ value, fee, memo }: sendMsgUpdateKeychainResponseParams): Promise<DeliverTxResponse>;
    sendKeychainFees({ value, fee, memo }: sendKeychainFeesParams): Promise<DeliverTxResponse>;
    sendQuerySpacesRequest({ value, fee, memo }: sendQuerySpacesRequestParams): Promise<DeliverTxResponse>;
    sendMsgAddKeychainPartyResponse({ value, fee, memo }: sendMsgAddKeychainPartyResponseParams): Promise<DeliverTxResponse>;
    sendQuerySpacesResponse({ value, fee, memo }: sendQuerySpacesResponseParams): Promise<DeliverTxResponse>;
    sendWalletKeyResponse({ value, fee, memo }: sendWalletKeyResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestByIdRequest({ value, fee, memo }: sendQuerySignatureRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendSignTransactionRequestResponse({ value, fee, memo }: sendSignTransactionRequestResponseParams): Promise<DeliverTxResponse>;
    sendKeychain({ value, fee, memo }: sendKeychainParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendQueryKeysRequest({ value, fee, memo }: sendQueryKeysRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeyRequest({ value, fee, memo }: sendMsgUpdateKeyRequestParams): Promise<DeliverTxResponse>;
    sendMsgRemoveSpaceOwner({ value, fee, memo }: sendMsgRemoveSpaceOwnerParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    msgUpdateSpaceResponse({ value }: msgUpdateSpaceResponseParams): EncodeObject;
    msgNewSignTransactionRequest({ value }: msgNewSignTransactionRequestParams): EncodeObject;
    queryKeysResponse({ value }: queryKeysResponseParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    space({ value }: spaceParams): EncodeObject;
    signTransactionRequest({ value }: signTransactionRequestParams): EncodeObject;
    queryKeyRequestsResponse({ value }: queryKeyRequestsResponseParams): EncodeObject;
    msgNewKeyRequestResponse({ value }: msgNewKeyRequestResponseParams): EncodeObject;
    msgNewKeychain({ value }: msgNewKeychainParams): EncodeObject;
    signRequest({ value }: signRequestParams): EncodeObject;
    msgNewSpace({ value }: msgNewSpaceParams): EncodeObject;
    msgUpdateSpace({ value }: msgUpdateSpaceParams): EncodeObject;
    msgNewKeyRequest({ value }: msgNewKeyRequestParams): EncodeObject;
    msgNewSignatureRequestResponse({ value }: msgNewSignatureRequestResponseParams): EncodeObject;
    queryKeyRequestByIdResponse({ value }: queryKeyRequestByIdResponseParams): EncodeObject;
    msgNewKeychainResponse({ value }: msgNewKeychainResponseParams): EncodeObject;
    msgUpdateKeychain({ value }: msgUpdateKeychainParams): EncodeObject;
    queryKeychainByAddressResponse({ value }: queryKeychainByAddressResponseParams): EncodeObject;
    msgNewSpaceResponse({ value }: msgNewSpaceResponseParams): EncodeObject;
    querySignTransactionRequestByIdRequest({ value }: querySignTransactionRequestByIdRequestParams): EncodeObject;
    msgAddKeychainParty({ value }: msgAddKeychainPartyParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    key({ value }: keyParams): EncodeObject;
    queryKeychainsResponse({ value }: queryKeychainsResponseParams): EncodeObject;
    querySignatureRequestsRequest({ value }: querySignatureRequestsRequestParams): EncodeObject;
    msgAddSpaceOwnerResponse({ value }: msgAddSpaceOwnerResponseParams): EncodeObject;
    querySpacesByOwnerRequest({ value }: querySpacesByOwnerRequestParams): EncodeObject;
    queryKeyRequestByIdRequest({ value }: queryKeyRequestByIdRequestParams): EncodeObject;
    querySignTransactionRequestsRequest({ value }: querySignTransactionRequestsRequestParams): EncodeObject;
    msgAddSpaceOwner({ value }: msgAddSpaceOwnerParams): EncodeObject;
    msgNewSignTransactionRequestResponse({ value }: msgNewSignTransactionRequestResponseParams): EncodeObject;
    querySpaceByAddressResponse({ value }: querySpaceByAddressResponseParams): EncodeObject;
    queryKeyRequestsRequest({ value }: queryKeyRequestsRequestParams): EncodeObject;
    msgNewSignatureRequest({ value }: msgNewSignatureRequestParams): EncodeObject;
    metadataEthereum({ value }: metadataEthereumParams): EncodeObject;
    keyRequest({ value }: keyRequestParams): EncodeObject;
    querySpaceByAddressRequest({ value }: querySpaceByAddressRequestParams): EncodeObject;
    msgNewKey({ value }: msgNewKeyParams): EncodeObject;
    querySignatureRequestsResponse({ value }: querySignatureRequestsResponseParams): EncodeObject;
    msgSignedData({ value }: msgSignedDataParams): EncodeObject;
    msgFulfilSignatureRequest({ value }: msgFulfilSignatureRequestParams): EncodeObject;
    queryKeychainsRequest({ value }: queryKeychainsRequestParams): EncodeObject;
    queryKeychainByAddressRequest({ value }: queryKeychainByAddressRequestParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    msgUpdateKeyRequestResponse({ value }: msgUpdateKeyRequestResponseParams): EncodeObject;
    msgFulfilSignatureRequestResponse({ value }: msgFulfilSignatureRequestResponseParams): EncodeObject;
    keyResponse({ value }: keyResponseParams): EncodeObject;
    querySignTransactionRequestsResponse({ value }: querySignTransactionRequestsResponseParams): EncodeObject;
    querySignatureRequestByIdResponse({ value }: querySignatureRequestByIdResponseParams): EncodeObject;
    querySignTransactionRequestByIdResponse({ value }: querySignTransactionRequestByIdResponseParams): EncodeObject;
    msgRemoveSpaceOwnerResponse({ value }: msgRemoveSpaceOwnerResponseParams): EncodeObject;
    msgUpdateKeychainResponse({ value }: msgUpdateKeychainResponseParams): EncodeObject;
    keychainFees({ value }: keychainFeesParams): EncodeObject;
    querySpacesRequest({ value }: querySpacesRequestParams): EncodeObject;
    msgAddKeychainPartyResponse({ value }: msgAddKeychainPartyResponseParams): EncodeObject;
    querySpacesResponse({ value }: querySpacesResponseParams): EncodeObject;
    walletKeyResponse({ value }: walletKeyResponseParams): EncodeObject;
    querySignatureRequestByIdRequest({ value }: querySignatureRequestByIdRequestParams): EncodeObject;
    signTransactionRequestResponse({ value }: signTransactionRequestResponseParams): EncodeObject;
    keychain({ value }: keychainParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    queryKeysRequest({ value }: queryKeysRequestParams): EncodeObject;
    msgUpdateKeyRequest({ value }: msgUpdateKeyRequestParams): EncodeObject;
    msgRemoveSpaceOwner({ value }: msgRemoveSpaceOwnerParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
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
        WardenWardenV1Beta1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
