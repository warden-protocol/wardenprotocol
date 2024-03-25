import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { QueryKeychainByAddressRequest } from "./types/warden/warden/v1beta1/query";
import { QueryKeysRequest } from "./types/warden/warden/v1beta1/query";
import { QuerySignTransactionRequestsRequest } from "./types/warden/warden/v1beta1/query";
import { MsgUpdateKeyRequest } from "./types/warden/warden/v1beta1/tx";
import { Params } from "./types/warden/warden/v1beta1/params";
import { QuerySpaceByAddressRequest } from "./types/warden/warden/v1beta1/query";
import { QuerySignTransactionRequestByIdRequest } from "./types/warden/warden/v1beta1/query";
import { MsgAddSpaceOwner } from "./types/warden/warden/v1beta1/tx";
import { MsgNewSignatureRequestResponse } from "./types/warden/warden/v1beta1/tx";
import { QueryKeychainByAddressResponse } from "./types/warden/warden/v1beta1/query";
import { QueryKeysResponse } from "./types/warden/warden/v1beta1/query";
import { MsgUpdateParams } from "./types/warden/warden/v1beta1/tx";
import { MsgNewKeyRequest } from "./types/warden/warden/v1beta1/tx";
import { MsgUpdateSpaceResponse } from "./types/warden/warden/v1beta1/tx";
import { MsgNewKeyRequestResponse } from "./types/warden/warden/v1beta1/tx";
import { MsgUpdateKeyRequestResponse } from "./types/warden/warden/v1beta1/tx";
import { GenesisState } from "./types/warden/warden/v1beta1/genesis";
import { QuerySignatureRequestByIdRequest } from "./types/warden/warden/v1beta1/query";
import { SignTransactionRequest } from "./types/warden/warden/v1beta1/signature";
import { MsgNewKey } from "./types/warden/warden/v1beta1/tx";
import { MsgNewSignTransactionRequestResponse } from "./types/warden/warden/v1beta1/tx";
import { MetadataEthereum } from "./types/warden/warden/v1beta1/tx";
import { QueryKeyRequestByIdResponse } from "./types/warden/warden/v1beta1/query";
import { MsgAddSpaceOwnerResponse } from "./types/warden/warden/v1beta1/tx";
import { QuerySignatureRequestsResponse } from "./types/warden/warden/v1beta1/query";
import { QuerySignTransactionRequestsResponse } from "./types/warden/warden/v1beta1/query";
import { QuerySignatureRequestByIdResponse } from "./types/warden/warden/v1beta1/query";
import { MsgNewKeychain } from "./types/warden/warden/v1beta1/tx";
import { MsgAddKeychainParty } from "./types/warden/warden/v1beta1/tx";
import { MsgAddKeychainPartyResponse } from "./types/warden/warden/v1beta1/tx";
import { MsgFulfilSignatureRequest } from "./types/warden/warden/v1beta1/tx";
import { MsgNewSignTransactionRequest } from "./types/warden/warden/v1beta1/tx";
import { QueryParamsResponse } from "./types/warden/warden/v1beta1/query";
import { WalletKeyResponse } from "./types/warden/warden/v1beta1/query";
import { MsgNewKeychainResponse } from "./types/warden/warden/v1beta1/tx";
import { MsgUpdateKeychainResponse } from "./types/warden/warden/v1beta1/tx";
import { QuerySpacesResponse } from "./types/warden/warden/v1beta1/query";
import { QueryKeychainsRequest } from "./types/warden/warden/v1beta1/query";
import { QuerySpacesRequest } from "./types/warden/warden/v1beta1/query";
import { MsgNewSpaceResponse } from "./types/warden/warden/v1beta1/tx";
import { QueryParamsRequest } from "./types/warden/warden/v1beta1/query";
import { KeyResponse } from "./types/warden/warden/v1beta1/query";
import { MsgNewSpace } from "./types/warden/warden/v1beta1/tx";
import { MsgRemoveSpaceOwner } from "./types/warden/warden/v1beta1/tx";
import { KeyRequest } from "./types/warden/warden/v1beta1/key";
import { KeychainFees } from "./types/warden/warden/v1beta1/keychain";
import { QuerySpaceByAddressResponse } from "./types/warden/warden/v1beta1/query";
import { QuerySignatureRequestsRequest } from "./types/warden/warden/v1beta1/query";
import { MsgFulfilSignatureRequestResponse } from "./types/warden/warden/v1beta1/tx";
import { Space } from "./types/warden/warden/v1beta1/space";
import { QuerySpacesByOwnerRequest } from "./types/warden/warden/v1beta1/query";
import { SignTransactionRequestResponse } from "./types/warden/warden/v1beta1/query";
import { MsgUpdateSpace } from "./types/warden/warden/v1beta1/tx";
import { QueryKeyRequestByIdRequest } from "./types/warden/warden/v1beta1/query";
import { MsgRemoveSpaceOwnerResponse } from "./types/warden/warden/v1beta1/tx";
import { MsgSignedData } from "./types/warden/warden/v1beta1/tx";
import { QueryKeyRequestsRequest } from "./types/warden/warden/v1beta1/query";
import { QuerySignTransactionRequestByIdResponse } from "./types/warden/warden/v1beta1/query";
import { MsgUpdateParamsResponse } from "./types/warden/warden/v1beta1/tx";
import { MsgNewSignatureRequest } from "./types/warden/warden/v1beta1/tx";
import { QueryKeyRequestsResponse } from "./types/warden/warden/v1beta1/query";
import { SignRequest } from "./types/warden/warden/v1beta1/signature";
import { Keychain } from "./types/warden/warden/v1beta1/keychain";
import { QueryKeychainsResponse } from "./types/warden/warden/v1beta1/query";
import { MsgUpdateKeychain } from "./types/warden/warden/v1beta1/tx";
import { Key } from "./types/warden/warden/v1beta1/key";
export { QueryKeychainByAddressRequest, QueryKeysRequest, QuerySignTransactionRequestsRequest, MsgUpdateKeyRequest, Params, QuerySpaceByAddressRequest, QuerySignTransactionRequestByIdRequest, MsgAddSpaceOwner, MsgNewSignatureRequestResponse, QueryKeychainByAddressResponse, QueryKeysResponse, MsgUpdateParams, MsgNewKeyRequest, MsgUpdateSpaceResponse, MsgNewKeyRequestResponse, MsgUpdateKeyRequestResponse, GenesisState, QuerySignatureRequestByIdRequest, SignTransactionRequest, MsgNewKey, MsgNewSignTransactionRequestResponse, MetadataEthereum, QueryKeyRequestByIdResponse, MsgAddSpaceOwnerResponse, QuerySignatureRequestsResponse, QuerySignTransactionRequestsResponse, QuerySignatureRequestByIdResponse, MsgNewKeychain, MsgAddKeychainParty, MsgAddKeychainPartyResponse, MsgFulfilSignatureRequest, MsgNewSignTransactionRequest, QueryParamsResponse, WalletKeyResponse, MsgNewKeychainResponse, MsgUpdateKeychainResponse, QuerySpacesResponse, QueryKeychainsRequest, QuerySpacesRequest, MsgNewSpaceResponse, QueryParamsRequest, KeyResponse, MsgNewSpace, MsgRemoveSpaceOwner, KeyRequest, KeychainFees, QuerySpaceByAddressResponse, QuerySignatureRequestsRequest, MsgFulfilSignatureRequestResponse, Space, QuerySpacesByOwnerRequest, SignTransactionRequestResponse, MsgUpdateSpace, QueryKeyRequestByIdRequest, MsgRemoveSpaceOwnerResponse, MsgSignedData, QueryKeyRequestsRequest, QuerySignTransactionRequestByIdResponse, MsgUpdateParamsResponse, MsgNewSignatureRequest, QueryKeyRequestsResponse, SignRequest, Keychain, QueryKeychainsResponse, MsgUpdateKeychain, Key };
type sendQueryKeychainByAddressRequestParams = {
    value: QueryKeychainByAddressRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeysRequestParams = {
    value: QueryKeysRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestsRequestParams = {
    value: QuerySignTransactionRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyRequestParams = {
    value: MsgUpdateKeyRequest;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpaceByAddressRequestParams = {
    value: QuerySpaceByAddressRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestByIdRequestParams = {
    value: QuerySignTransactionRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddSpaceOwnerParams = {
    value: MsgAddSpaceOwner;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignatureRequestResponseParams = {
    value: MsgNewSignatureRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainByAddressResponseParams = {
    value: QueryKeychainByAddressResponse;
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
type sendMsgNewKeyRequestParams = {
    value: MsgNewKeyRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateSpaceResponseParams = {
    value: MsgUpdateSpaceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeyRequestResponseParams = {
    value: MsgNewKeyRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyRequestResponseParams = {
    value: MsgUpdateKeyRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestByIdRequestParams = {
    value: QuerySignatureRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendSignTransactionRequestParams = {
    value: SignTransactionRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeyParams = {
    value: MsgNewKey;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignTransactionRequestResponseParams = {
    value: MsgNewSignTransactionRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMetadataEthereumParams = {
    value: MetadataEthereum;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestByIdResponseParams = {
    value: QueryKeyRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddSpaceOwnerResponseParams = {
    value: MsgAddSpaceOwnerResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestsResponseParams = {
    value: QuerySignatureRequestsResponse;
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
type sendMsgNewKeychainParams = {
    value: MsgNewKeychain;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddKeychainPartyParams = {
    value: MsgAddKeychainParty;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddKeychainPartyResponseParams = {
    value: MsgAddKeychainPartyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgFulfilSignatureRequestParams = {
    value: MsgFulfilSignatureRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignTransactionRequestParams = {
    value: MsgNewSignTransactionRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendWalletKeyResponseParams = {
    value: WalletKeyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeychainResponseParams = {
    value: MsgNewKeychainResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeychainResponseParams = {
    value: MsgUpdateKeychainResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesResponseParams = {
    value: QuerySpacesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainsRequestParams = {
    value: QueryKeychainsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesRequestParams = {
    value: QuerySpacesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSpaceResponseParams = {
    value: MsgNewSpaceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendKeyResponseParams = {
    value: KeyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSpaceParams = {
    value: MsgNewSpace;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRemoveSpaceOwnerParams = {
    value: MsgRemoveSpaceOwner;
    fee?: StdFee;
    memo?: string;
};
type sendKeyRequestParams = {
    value: KeyRequest;
    fee?: StdFee;
    memo?: string;
};
type sendKeychainFeesParams = {
    value: KeychainFees;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpaceByAddressResponseParams = {
    value: QuerySpaceByAddressResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestsRequestParams = {
    value: QuerySignatureRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgFulfilSignatureRequestResponseParams = {
    value: MsgFulfilSignatureRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendSpaceParams = {
    value: Space;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesByOwnerRequestParams = {
    value: QuerySpacesByOwnerRequest;
    fee?: StdFee;
    memo?: string;
};
type sendSignTransactionRequestResponseParams = {
    value: SignTransactionRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateSpaceParams = {
    value: MsgUpdateSpace;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestByIdRequestParams = {
    value: QueryKeyRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRemoveSpaceOwnerResponseParams = {
    value: MsgRemoveSpaceOwnerResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSignedDataParams = {
    value: MsgSignedData;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestsRequestParams = {
    value: QueryKeyRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestByIdResponseParams = {
    value: QuerySignTransactionRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignatureRequestParams = {
    value: MsgNewSignatureRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestsResponseParams = {
    value: QueryKeyRequestsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendSignRequestParams = {
    value: SignRequest;
    fee?: StdFee;
    memo?: string;
};
type sendKeychainParams = {
    value: Keychain;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainsResponseParams = {
    value: QueryKeychainsResponse;
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
type queryKeychainByAddressRequestParams = {
    value: QueryKeychainByAddressRequest;
};
type queryKeysRequestParams = {
    value: QueryKeysRequest;
};
type querySignTransactionRequestsRequestParams = {
    value: QuerySignTransactionRequestsRequest;
};
type msgUpdateKeyRequestParams = {
    value: MsgUpdateKeyRequest;
};
type paramsParams = {
    value: Params;
};
type querySpaceByAddressRequestParams = {
    value: QuerySpaceByAddressRequest;
};
type querySignTransactionRequestByIdRequestParams = {
    value: QuerySignTransactionRequestByIdRequest;
};
type msgAddSpaceOwnerParams = {
    value: MsgAddSpaceOwner;
};
type msgNewSignatureRequestResponseParams = {
    value: MsgNewSignatureRequestResponse;
};
type queryKeychainByAddressResponseParams = {
    value: QueryKeychainByAddressResponse;
};
type queryKeysResponseParams = {
    value: QueryKeysResponse;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type msgNewKeyRequestParams = {
    value: MsgNewKeyRequest;
};
type msgUpdateSpaceResponseParams = {
    value: MsgUpdateSpaceResponse;
};
type msgNewKeyRequestResponseParams = {
    value: MsgNewKeyRequestResponse;
};
type msgUpdateKeyRequestResponseParams = {
    value: MsgUpdateKeyRequestResponse;
};
type genesisStateParams = {
    value: GenesisState;
};
type querySignatureRequestByIdRequestParams = {
    value: QuerySignatureRequestByIdRequest;
};
type signTransactionRequestParams = {
    value: SignTransactionRequest;
};
type msgNewKeyParams = {
    value: MsgNewKey;
};
type msgNewSignTransactionRequestResponseParams = {
    value: MsgNewSignTransactionRequestResponse;
};
type metadataEthereumParams = {
    value: MetadataEthereum;
};
type queryKeyRequestByIdResponseParams = {
    value: QueryKeyRequestByIdResponse;
};
type msgAddSpaceOwnerResponseParams = {
    value: MsgAddSpaceOwnerResponse;
};
type querySignatureRequestsResponseParams = {
    value: QuerySignatureRequestsResponse;
};
type querySignTransactionRequestsResponseParams = {
    value: QuerySignTransactionRequestsResponse;
};
type querySignatureRequestByIdResponseParams = {
    value: QuerySignatureRequestByIdResponse;
};
type msgNewKeychainParams = {
    value: MsgNewKeychain;
};
type msgAddKeychainPartyParams = {
    value: MsgAddKeychainParty;
};
type msgAddKeychainPartyResponseParams = {
    value: MsgAddKeychainPartyResponse;
};
type msgFulfilSignatureRequestParams = {
    value: MsgFulfilSignatureRequest;
};
type msgNewSignTransactionRequestParams = {
    value: MsgNewSignTransactionRequest;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type walletKeyResponseParams = {
    value: WalletKeyResponse;
};
type msgNewKeychainResponseParams = {
    value: MsgNewKeychainResponse;
};
type msgUpdateKeychainResponseParams = {
    value: MsgUpdateKeychainResponse;
};
type querySpacesResponseParams = {
    value: QuerySpacesResponse;
};
type queryKeychainsRequestParams = {
    value: QueryKeychainsRequest;
};
type querySpacesRequestParams = {
    value: QuerySpacesRequest;
};
type msgNewSpaceResponseParams = {
    value: MsgNewSpaceResponse;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type keyResponseParams = {
    value: KeyResponse;
};
type msgNewSpaceParams = {
    value: MsgNewSpace;
};
type msgRemoveSpaceOwnerParams = {
    value: MsgRemoveSpaceOwner;
};
type keyRequestParams = {
    value: KeyRequest;
};
type keychainFeesParams = {
    value: KeychainFees;
};
type querySpaceByAddressResponseParams = {
    value: QuerySpaceByAddressResponse;
};
type querySignatureRequestsRequestParams = {
    value: QuerySignatureRequestsRequest;
};
type msgFulfilSignatureRequestResponseParams = {
    value: MsgFulfilSignatureRequestResponse;
};
type spaceParams = {
    value: Space;
};
type querySpacesByOwnerRequestParams = {
    value: QuerySpacesByOwnerRequest;
};
type signTransactionRequestResponseParams = {
    value: SignTransactionRequestResponse;
};
type msgUpdateSpaceParams = {
    value: MsgUpdateSpace;
};
type queryKeyRequestByIdRequestParams = {
    value: QueryKeyRequestByIdRequest;
};
type msgRemoveSpaceOwnerResponseParams = {
    value: MsgRemoveSpaceOwnerResponse;
};
type msgSignedDataParams = {
    value: MsgSignedData;
};
type queryKeyRequestsRequestParams = {
    value: QueryKeyRequestsRequest;
};
type querySignTransactionRequestByIdResponseParams = {
    value: QuerySignTransactionRequestByIdResponse;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type msgNewSignatureRequestParams = {
    value: MsgNewSignatureRequest;
};
type queryKeyRequestsResponseParams = {
    value: QueryKeyRequestsResponse;
};
type signRequestParams = {
    value: SignRequest;
};
type keychainParams = {
    value: Keychain;
};
type queryKeychainsResponseParams = {
    value: QueryKeychainsResponse;
};
type msgUpdateKeychainParams = {
    value: MsgUpdateKeychain;
};
type keyParams = {
    value: Key;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendQueryKeychainByAddressRequest({ value, fee, memo }: sendQueryKeychainByAddressRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeysRequest({ value, fee, memo }: sendQueryKeysRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestsRequest({ value, fee, memo }: sendQuerySignTransactionRequestsRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeyRequest({ value, fee, memo }: sendMsgUpdateKeyRequestParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendQuerySpaceByAddressRequest({ value, fee, memo }: sendQuerySpaceByAddressRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestByIdRequest({ value, fee, memo }: sendQuerySignTransactionRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendMsgAddSpaceOwner({ value, fee, memo }: sendMsgAddSpaceOwnerParams): Promise<DeliverTxResponse>;
    sendMsgNewSignatureRequestResponse({ value, fee, memo }: sendMsgNewSignatureRequestResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeychainByAddressResponse({ value, fee, memo }: sendQueryKeychainByAddressResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeysResponse({ value, fee, memo }: sendQueryKeysResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendMsgNewKeyRequest({ value, fee, memo }: sendMsgNewKeyRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateSpaceResponse({ value, fee, memo }: sendMsgUpdateSpaceResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewKeyRequestResponse({ value, fee, memo }: sendMsgNewKeyRequestResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeyRequestResponse({ value, fee, memo }: sendMsgUpdateKeyRequestResponseParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestByIdRequest({ value, fee, memo }: sendQuerySignatureRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendSignTransactionRequest({ value, fee, memo }: sendSignTransactionRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewKey({ value, fee, memo }: sendMsgNewKeyParams): Promise<DeliverTxResponse>;
    sendMsgNewSignTransactionRequestResponse({ value, fee, memo }: sendMsgNewSignTransactionRequestResponseParams): Promise<DeliverTxResponse>;
    sendMetadataEthereum({ value, fee, memo }: sendMetadataEthereumParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestByIdResponse({ value, fee, memo }: sendQueryKeyRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgAddSpaceOwnerResponse({ value, fee, memo }: sendMsgAddSpaceOwnerResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestsResponse({ value, fee, memo }: sendQuerySignatureRequestsResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestsResponse({ value, fee, memo }: sendQuerySignTransactionRequestsResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestByIdResponse({ value, fee, memo }: sendQuerySignatureRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewKeychain({ value, fee, memo }: sendMsgNewKeychainParams): Promise<DeliverTxResponse>;
    sendMsgAddKeychainParty({ value, fee, memo }: sendMsgAddKeychainPartyParams): Promise<DeliverTxResponse>;
    sendMsgAddKeychainPartyResponse({ value, fee, memo }: sendMsgAddKeychainPartyResponseParams): Promise<DeliverTxResponse>;
    sendMsgFulfilSignatureRequest({ value, fee, memo }: sendMsgFulfilSignatureRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewSignTransactionRequest({ value, fee, memo }: sendMsgNewSignTransactionRequestParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendWalletKeyResponse({ value, fee, memo }: sendWalletKeyResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewKeychainResponse({ value, fee, memo }: sendMsgNewKeychainResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeychainResponse({ value, fee, memo }: sendMsgUpdateKeychainResponseParams): Promise<DeliverTxResponse>;
    sendQuerySpacesResponse({ value, fee, memo }: sendQuerySpacesResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeychainsRequest({ value, fee, memo }: sendQueryKeychainsRequestParams): Promise<DeliverTxResponse>;
    sendQuerySpacesRequest({ value, fee, memo }: sendQuerySpacesRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewSpaceResponse({ value, fee, memo }: sendMsgNewSpaceResponseParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendKeyResponse({ value, fee, memo }: sendKeyResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewSpace({ value, fee, memo }: sendMsgNewSpaceParams): Promise<DeliverTxResponse>;
    sendMsgRemoveSpaceOwner({ value, fee, memo }: sendMsgRemoveSpaceOwnerParams): Promise<DeliverTxResponse>;
    sendKeyRequest({ value, fee, memo }: sendKeyRequestParams): Promise<DeliverTxResponse>;
    sendKeychainFees({ value, fee, memo }: sendKeychainFeesParams): Promise<DeliverTxResponse>;
    sendQuerySpaceByAddressResponse({ value, fee, memo }: sendQuerySpaceByAddressResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestsRequest({ value, fee, memo }: sendQuerySignatureRequestsRequestParams): Promise<DeliverTxResponse>;
    sendMsgFulfilSignatureRequestResponse({ value, fee, memo }: sendMsgFulfilSignatureRequestResponseParams): Promise<DeliverTxResponse>;
    sendSpace({ value, fee, memo }: sendSpaceParams): Promise<DeliverTxResponse>;
    sendQuerySpacesByOwnerRequest({ value, fee, memo }: sendQuerySpacesByOwnerRequestParams): Promise<DeliverTxResponse>;
    sendSignTransactionRequestResponse({ value, fee, memo }: sendSignTransactionRequestResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateSpace({ value, fee, memo }: sendMsgUpdateSpaceParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestByIdRequest({ value, fee, memo }: sendQueryKeyRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendMsgRemoveSpaceOwnerResponse({ value, fee, memo }: sendMsgRemoveSpaceOwnerResponseParams): Promise<DeliverTxResponse>;
    sendMsgSignedData({ value, fee, memo }: sendMsgSignedDataParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestsRequest({ value, fee, memo }: sendQueryKeyRequestsRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestByIdResponse({ value, fee, memo }: sendQuerySignTransactionRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewSignatureRequest({ value, fee, memo }: sendMsgNewSignatureRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestsResponse({ value, fee, memo }: sendQueryKeyRequestsResponseParams): Promise<DeliverTxResponse>;
    sendSignRequest({ value, fee, memo }: sendSignRequestParams): Promise<DeliverTxResponse>;
    sendKeychain({ value, fee, memo }: sendKeychainParams): Promise<DeliverTxResponse>;
    sendQueryKeychainsResponse({ value, fee, memo }: sendQueryKeychainsResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeychain({ value, fee, memo }: sendMsgUpdateKeychainParams): Promise<DeliverTxResponse>;
    sendKey({ value, fee, memo }: sendKeyParams): Promise<DeliverTxResponse>;
    queryKeychainByAddressRequest({ value }: queryKeychainByAddressRequestParams): EncodeObject;
    queryKeysRequest({ value }: queryKeysRequestParams): EncodeObject;
    querySignTransactionRequestsRequest({ value }: querySignTransactionRequestsRequestParams): EncodeObject;
    msgUpdateKeyRequest({ value }: msgUpdateKeyRequestParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    querySpaceByAddressRequest({ value }: querySpaceByAddressRequestParams): EncodeObject;
    querySignTransactionRequestByIdRequest({ value }: querySignTransactionRequestByIdRequestParams): EncodeObject;
    msgAddSpaceOwner({ value }: msgAddSpaceOwnerParams): EncodeObject;
    msgNewSignatureRequestResponse({ value }: msgNewSignatureRequestResponseParams): EncodeObject;
    queryKeychainByAddressResponse({ value }: queryKeychainByAddressResponseParams): EncodeObject;
    queryKeysResponse({ value }: queryKeysResponseParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    msgNewKeyRequest({ value }: msgNewKeyRequestParams): EncodeObject;
    msgUpdateSpaceResponse({ value }: msgUpdateSpaceResponseParams): EncodeObject;
    msgNewKeyRequestResponse({ value }: msgNewKeyRequestResponseParams): EncodeObject;
    msgUpdateKeyRequestResponse({ value }: msgUpdateKeyRequestResponseParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    querySignatureRequestByIdRequest({ value }: querySignatureRequestByIdRequestParams): EncodeObject;
    signTransactionRequest({ value }: signTransactionRequestParams): EncodeObject;
    msgNewKey({ value }: msgNewKeyParams): EncodeObject;
    msgNewSignTransactionRequestResponse({ value }: msgNewSignTransactionRequestResponseParams): EncodeObject;
    metadataEthereum({ value }: metadataEthereumParams): EncodeObject;
    queryKeyRequestByIdResponse({ value }: queryKeyRequestByIdResponseParams): EncodeObject;
    msgAddSpaceOwnerResponse({ value }: msgAddSpaceOwnerResponseParams): EncodeObject;
    querySignatureRequestsResponse({ value }: querySignatureRequestsResponseParams): EncodeObject;
    querySignTransactionRequestsResponse({ value }: querySignTransactionRequestsResponseParams): EncodeObject;
    querySignatureRequestByIdResponse({ value }: querySignatureRequestByIdResponseParams): EncodeObject;
    msgNewKeychain({ value }: msgNewKeychainParams): EncodeObject;
    msgAddKeychainParty({ value }: msgAddKeychainPartyParams): EncodeObject;
    msgAddKeychainPartyResponse({ value }: msgAddKeychainPartyResponseParams): EncodeObject;
    msgFulfilSignatureRequest({ value }: msgFulfilSignatureRequestParams): EncodeObject;
    msgNewSignTransactionRequest({ value }: msgNewSignTransactionRequestParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    walletKeyResponse({ value }: walletKeyResponseParams): EncodeObject;
    msgNewKeychainResponse({ value }: msgNewKeychainResponseParams): EncodeObject;
    msgUpdateKeychainResponse({ value }: msgUpdateKeychainResponseParams): EncodeObject;
    querySpacesResponse({ value }: querySpacesResponseParams): EncodeObject;
    queryKeychainsRequest({ value }: queryKeychainsRequestParams): EncodeObject;
    querySpacesRequest({ value }: querySpacesRequestParams): EncodeObject;
    msgNewSpaceResponse({ value }: msgNewSpaceResponseParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    keyResponse({ value }: keyResponseParams): EncodeObject;
    msgNewSpace({ value }: msgNewSpaceParams): EncodeObject;
    msgRemoveSpaceOwner({ value }: msgRemoveSpaceOwnerParams): EncodeObject;
    keyRequest({ value }: keyRequestParams): EncodeObject;
    keychainFees({ value }: keychainFeesParams): EncodeObject;
    querySpaceByAddressResponse({ value }: querySpaceByAddressResponseParams): EncodeObject;
    querySignatureRequestsRequest({ value }: querySignatureRequestsRequestParams): EncodeObject;
    msgFulfilSignatureRequestResponse({ value }: msgFulfilSignatureRequestResponseParams): EncodeObject;
    space({ value }: spaceParams): EncodeObject;
    querySpacesByOwnerRequest({ value }: querySpacesByOwnerRequestParams): EncodeObject;
    signTransactionRequestResponse({ value }: signTransactionRequestResponseParams): EncodeObject;
    msgUpdateSpace({ value }: msgUpdateSpaceParams): EncodeObject;
    queryKeyRequestByIdRequest({ value }: queryKeyRequestByIdRequestParams): EncodeObject;
    msgRemoveSpaceOwnerResponse({ value }: msgRemoveSpaceOwnerResponseParams): EncodeObject;
    msgSignedData({ value }: msgSignedDataParams): EncodeObject;
    queryKeyRequestsRequest({ value }: queryKeyRequestsRequestParams): EncodeObject;
    querySignTransactionRequestByIdResponse({ value }: querySignTransactionRequestByIdResponseParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    msgNewSignatureRequest({ value }: msgNewSignatureRequestParams): EncodeObject;
    queryKeyRequestsResponse({ value }: queryKeyRequestsResponseParams): EncodeObject;
    signRequest({ value }: signRequestParams): EncodeObject;
    keychain({ value }: keychainParams): EncodeObject;
    queryKeychainsResponse({ value }: queryKeychainsResponseParams): EncodeObject;
    msgUpdateKeychain({ value }: msgUpdateKeychainParams): EncodeObject;
    key({ value }: keyParams): EncodeObject;
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
