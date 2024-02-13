import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { QueryKeysRequest } from "./types/warden/warden/query";
import { MsgUpdateKeychain } from "./types/warden/warden/tx";
import { MetadataEthereum } from "./types/warden/warden/tx";
import { QuerySpacesByOwnerRequest } from "./types/warden/warden/query";
import { QueryKeychainsRequest } from "./types/warden/warden/query";
import { QueryKeychainByAddressRequest } from "./types/warden/warden/query";
import { MsgUpdateKeychainResponse } from "./types/warden/warden/tx";
import { KeyRequest } from "./types/warden/warden/key";
import { SignRequest } from "./types/warden/warden/signature";
import { MsgUpdateParamsResponse } from "./types/warden/warden/tx";
import { MsgRemoveSpaceOwnerResponse } from "./types/warden/warden/tx";
import { MsgNewSignatureRequestResponse } from "./types/warden/warden/tx";
import { Key } from "./types/warden/warden/key";
import { QuerySpaceByAddressResponse } from "./types/warden/warden/query";
import { QuerySignatureRequestsResponse } from "./types/warden/warden/query";
import { MsgUpdateKeyRequestResponse } from "./types/warden/warden/tx";
import { MsgAddKeychainPartyResponse } from "./types/warden/warden/tx";
import { MsgNewKeyRequestResponse } from "./types/warden/warden/tx";
import { MsgAddSpaceOwnerResponse } from "./types/warden/warden/tx";
import { QueryKeyRequestByIdResponse } from "./types/warden/warden/query";
import { WalletKeyResponse } from "./types/warden/warden/query";
import { QuerySignatureRequestsRequest } from "./types/warden/warden/query";
import { QuerySignTransactionRequestsResponse } from "./types/warden/warden/query";
import { MsgNewKeychain } from "./types/warden/warden/tx";
import { Params } from "./types/warden/warden/params";
import { QueryKeychainsResponse } from "./types/warden/warden/query";
import { QuerySpaceByAddressRequest } from "./types/warden/warden/query";
import { MsgNewSignTransactionRequestResponse } from "./types/warden/warden/tx";
import { MsgRemoveSpaceOwner } from "./types/warden/warden/tx";
import { MsgUpdateSpace } from "./types/warden/warden/tx";
import { MsgNewKeyRequest } from "./types/warden/warden/tx";
import { MsgNewSignatureRequest } from "./types/warden/warden/tx";
import { Space } from "./types/warden/warden/space";
import { GenesisState } from "./types/warden/warden/genesis";
import { KeyResponse } from "./types/warden/warden/query";
import { QuerySignTransactionRequestByIdResponse } from "./types/warden/warden/query";
import { MsgNewKeychainResponse } from "./types/warden/warden/tx";
import { MsgUpdateParams } from "./types/warden/warden/tx";
import { QueryKeychainByAddressResponse } from "./types/warden/warden/query";
import { QuerySignatureRequestByIdRequest } from "./types/warden/warden/query";
import { MsgNewKey } from "./types/warden/warden/tx";
import { QuerySpacesResponse } from "./types/warden/warden/query";
import { QueryKeyRequestByIdRequest } from "./types/warden/warden/query";
import { MsgAddSpaceOwner } from "./types/warden/warden/tx";
import { MsgUpdateKeyRequest } from "./types/warden/warden/tx";
import { QueryKeysResponse } from "./types/warden/warden/query";
import { QuerySignTransactionRequestByIdRequest } from "./types/warden/warden/query";
import { MsgNewSpaceResponse } from "./types/warden/warden/tx";
import { MsgFulfilSignatureRequestResponse } from "./types/warden/warden/tx";
import { Keychain } from "./types/warden/warden/keychain";
import { KeychainFees } from "./types/warden/warden/keychain";
import { MsgNewSpace } from "./types/warden/warden/tx";
import { MsgAddKeychainParty } from "./types/warden/warden/tx";
import { QueryParamsRequest } from "./types/warden/warden/query";
import { QueryKeyRequestsRequest } from "./types/warden/warden/query";
import { SignTransactionRequestResponse } from "./types/warden/warden/query";
import { MsgSignedData } from "./types/warden/warden/tx";
import { QuerySpacesRequest } from "./types/warden/warden/query";
import { QueryKeyRequestsResponse } from "./types/warden/warden/query";
import { QuerySignTransactionRequestsRequest } from "./types/warden/warden/query";
import { QueryParamsResponse } from "./types/warden/warden/query";
import { MsgNewSignTransactionRequest } from "./types/warden/warden/tx";
import { SignTransactionRequest } from "./types/warden/warden/signature";
import { QuerySignatureRequestByIdResponse } from "./types/warden/warden/query";
import { MsgUpdateSpaceResponse } from "./types/warden/warden/tx";
import { MsgFulfilSignatureRequest } from "./types/warden/warden/tx";
export { QueryKeysRequest, MsgUpdateKeychain, MetadataEthereum, QuerySpacesByOwnerRequest, QueryKeychainsRequest, QueryKeychainByAddressRequest, MsgUpdateKeychainResponse, KeyRequest, SignRequest, MsgUpdateParamsResponse, MsgRemoveSpaceOwnerResponse, MsgNewSignatureRequestResponse, Key, QuerySpaceByAddressResponse, QuerySignatureRequestsResponse, MsgUpdateKeyRequestResponse, MsgAddKeychainPartyResponse, MsgNewKeyRequestResponse, MsgAddSpaceOwnerResponse, QueryKeyRequestByIdResponse, WalletKeyResponse, QuerySignatureRequestsRequest, QuerySignTransactionRequestsResponse, MsgNewKeychain, Params, QueryKeychainsResponse, QuerySpaceByAddressRequest, MsgNewSignTransactionRequestResponse, MsgRemoveSpaceOwner, MsgUpdateSpace, MsgNewKeyRequest, MsgNewSignatureRequest, Space, GenesisState, KeyResponse, QuerySignTransactionRequestByIdResponse, MsgNewKeychainResponse, MsgUpdateParams, QueryKeychainByAddressResponse, QuerySignatureRequestByIdRequest, MsgNewKey, QuerySpacesResponse, QueryKeyRequestByIdRequest, MsgAddSpaceOwner, MsgUpdateKeyRequest, QueryKeysResponse, QuerySignTransactionRequestByIdRequest, MsgNewSpaceResponse, MsgFulfilSignatureRequestResponse, Keychain, KeychainFees, MsgNewSpace, MsgAddKeychainParty, QueryParamsRequest, QueryKeyRequestsRequest, SignTransactionRequestResponse, MsgSignedData, QuerySpacesRequest, QueryKeyRequestsResponse, QuerySignTransactionRequestsRequest, QueryParamsResponse, MsgNewSignTransactionRequest, SignTransactionRequest, QuerySignatureRequestByIdResponse, MsgUpdateSpaceResponse, MsgFulfilSignatureRequest };
type sendQueryKeysRequestParams = {
    value: QueryKeysRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeychainParams = {
    value: MsgUpdateKeychain;
    fee?: StdFee;
    memo?: string;
};
type sendMetadataEthereumParams = {
    value: MetadataEthereum;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesByOwnerRequestParams = {
    value: QuerySpacesByOwnerRequest;
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
type sendMsgUpdateKeychainResponseParams = {
    value: MsgUpdateKeychainResponse;
    fee?: StdFee;
    memo?: string;
};
type sendKeyRequestParams = {
    value: KeyRequest;
    fee?: StdFee;
    memo?: string;
};
type sendSignRequestParams = {
    value: SignRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRemoveSpaceOwnerResponseParams = {
    value: MsgRemoveSpaceOwnerResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignatureRequestResponseParams = {
    value: MsgNewSignatureRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendKeyParams = {
    value: Key;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpaceByAddressResponseParams = {
    value: QuerySpaceByAddressResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestsResponseParams = {
    value: QuerySignatureRequestsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyRequestResponseParams = {
    value: MsgUpdateKeyRequestResponse;
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
type sendMsgAddSpaceOwnerResponseParams = {
    value: MsgAddSpaceOwnerResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestByIdResponseParams = {
    value: QueryKeyRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendWalletKeyResponseParams = {
    value: WalletKeyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestsRequestParams = {
    value: QuerySignatureRequestsRequest;
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
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainsResponseParams = {
    value: QueryKeychainsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpaceByAddressRequestParams = {
    value: QuerySpaceByAddressRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignTransactionRequestResponseParams = {
    value: MsgNewSignTransactionRequestResponse;
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
type sendMsgNewKeyRequestParams = {
    value: MsgNewKeyRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignatureRequestParams = {
    value: MsgNewSignatureRequest;
    fee?: StdFee;
    memo?: string;
};
type sendSpaceParams = {
    value: Space;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendKeyResponseParams = {
    value: KeyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestByIdResponseParams = {
    value: QuerySignTransactionRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeychainResponseParams = {
    value: MsgNewKeychainResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainByAddressResponseParams = {
    value: QueryKeychainByAddressResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestByIdRequestParams = {
    value: QuerySignatureRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeyParams = {
    value: MsgNewKey;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesResponseParams = {
    value: QuerySpacesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestByIdRequestParams = {
    value: QueryKeyRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddSpaceOwnerParams = {
    value: MsgAddSpaceOwner;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyRequestParams = {
    value: MsgUpdateKeyRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeysResponseParams = {
    value: QueryKeysResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestByIdRequestParams = {
    value: QuerySignTransactionRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSpaceResponseParams = {
    value: MsgNewSpaceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgFulfilSignatureRequestResponseParams = {
    value: MsgFulfilSignatureRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendKeychainParams = {
    value: Keychain;
    fee?: StdFee;
    memo?: string;
};
type sendKeychainFeesParams = {
    value: KeychainFees;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSpaceParams = {
    value: MsgNewSpace;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddKeychainPartyParams = {
    value: MsgAddKeychainParty;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestsRequestParams = {
    value: QueryKeyRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendSignTransactionRequestResponseParams = {
    value: SignTransactionRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSignedDataParams = {
    value: MsgSignedData;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesRequestParams = {
    value: QuerySpacesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestsResponseParams = {
    value: QueryKeyRequestsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestsRequestParams = {
    value: QuerySignTransactionRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignTransactionRequestParams = {
    value: MsgNewSignTransactionRequest;
    fee?: StdFee;
    memo?: string;
};
type sendSignTransactionRequestParams = {
    value: SignTransactionRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestByIdResponseParams = {
    value: QuerySignatureRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateSpaceResponseParams = {
    value: MsgUpdateSpaceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgFulfilSignatureRequestParams = {
    value: MsgFulfilSignatureRequest;
    fee?: StdFee;
    memo?: string;
};
type queryKeysRequestParams = {
    value: QueryKeysRequest;
};
type msgUpdateKeychainParams = {
    value: MsgUpdateKeychain;
};
type metadataEthereumParams = {
    value: MetadataEthereum;
};
type querySpacesByOwnerRequestParams = {
    value: QuerySpacesByOwnerRequest;
};
type queryKeychainsRequestParams = {
    value: QueryKeychainsRequest;
};
type queryKeychainByAddressRequestParams = {
    value: QueryKeychainByAddressRequest;
};
type msgUpdateKeychainResponseParams = {
    value: MsgUpdateKeychainResponse;
};
type keyRequestParams = {
    value: KeyRequest;
};
type signRequestParams = {
    value: SignRequest;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type msgRemoveSpaceOwnerResponseParams = {
    value: MsgRemoveSpaceOwnerResponse;
};
type msgNewSignatureRequestResponseParams = {
    value: MsgNewSignatureRequestResponse;
};
type keyParams = {
    value: Key;
};
type querySpaceByAddressResponseParams = {
    value: QuerySpaceByAddressResponse;
};
type querySignatureRequestsResponseParams = {
    value: QuerySignatureRequestsResponse;
};
type msgUpdateKeyRequestResponseParams = {
    value: MsgUpdateKeyRequestResponse;
};
type msgAddKeychainPartyResponseParams = {
    value: MsgAddKeychainPartyResponse;
};
type msgNewKeyRequestResponseParams = {
    value: MsgNewKeyRequestResponse;
};
type msgAddSpaceOwnerResponseParams = {
    value: MsgAddSpaceOwnerResponse;
};
type queryKeyRequestByIdResponseParams = {
    value: QueryKeyRequestByIdResponse;
};
type walletKeyResponseParams = {
    value: WalletKeyResponse;
};
type querySignatureRequestsRequestParams = {
    value: QuerySignatureRequestsRequest;
};
type querySignTransactionRequestsResponseParams = {
    value: QuerySignTransactionRequestsResponse;
};
type msgNewKeychainParams = {
    value: MsgNewKeychain;
};
type paramsParams = {
    value: Params;
};
type queryKeychainsResponseParams = {
    value: QueryKeychainsResponse;
};
type querySpaceByAddressRequestParams = {
    value: QuerySpaceByAddressRequest;
};
type msgNewSignTransactionRequestResponseParams = {
    value: MsgNewSignTransactionRequestResponse;
};
type msgRemoveSpaceOwnerParams = {
    value: MsgRemoveSpaceOwner;
};
type msgUpdateSpaceParams = {
    value: MsgUpdateSpace;
};
type msgNewKeyRequestParams = {
    value: MsgNewKeyRequest;
};
type msgNewSignatureRequestParams = {
    value: MsgNewSignatureRequest;
};
type spaceParams = {
    value: Space;
};
type genesisStateParams = {
    value: GenesisState;
};
type keyResponseParams = {
    value: KeyResponse;
};
type querySignTransactionRequestByIdResponseParams = {
    value: QuerySignTransactionRequestByIdResponse;
};
type msgNewKeychainResponseParams = {
    value: MsgNewKeychainResponse;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type queryKeychainByAddressResponseParams = {
    value: QueryKeychainByAddressResponse;
};
type querySignatureRequestByIdRequestParams = {
    value: QuerySignatureRequestByIdRequest;
};
type msgNewKeyParams = {
    value: MsgNewKey;
};
type querySpacesResponseParams = {
    value: QuerySpacesResponse;
};
type queryKeyRequestByIdRequestParams = {
    value: QueryKeyRequestByIdRequest;
};
type msgAddSpaceOwnerParams = {
    value: MsgAddSpaceOwner;
};
type msgUpdateKeyRequestParams = {
    value: MsgUpdateKeyRequest;
};
type queryKeysResponseParams = {
    value: QueryKeysResponse;
};
type querySignTransactionRequestByIdRequestParams = {
    value: QuerySignTransactionRequestByIdRequest;
};
type msgNewSpaceResponseParams = {
    value: MsgNewSpaceResponse;
};
type msgFulfilSignatureRequestResponseParams = {
    value: MsgFulfilSignatureRequestResponse;
};
type keychainParams = {
    value: Keychain;
};
type keychainFeesParams = {
    value: KeychainFees;
};
type msgNewSpaceParams = {
    value: MsgNewSpace;
};
type msgAddKeychainPartyParams = {
    value: MsgAddKeychainParty;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type queryKeyRequestsRequestParams = {
    value: QueryKeyRequestsRequest;
};
type signTransactionRequestResponseParams = {
    value: SignTransactionRequestResponse;
};
type msgSignedDataParams = {
    value: MsgSignedData;
};
type querySpacesRequestParams = {
    value: QuerySpacesRequest;
};
type queryKeyRequestsResponseParams = {
    value: QueryKeyRequestsResponse;
};
type querySignTransactionRequestsRequestParams = {
    value: QuerySignTransactionRequestsRequest;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type msgNewSignTransactionRequestParams = {
    value: MsgNewSignTransactionRequest;
};
type signTransactionRequestParams = {
    value: SignTransactionRequest;
};
type querySignatureRequestByIdResponseParams = {
    value: QuerySignatureRequestByIdResponse;
};
type msgUpdateSpaceResponseParams = {
    value: MsgUpdateSpaceResponse;
};
type msgFulfilSignatureRequestParams = {
    value: MsgFulfilSignatureRequest;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendQueryKeysRequest({ value, fee, memo }: sendQueryKeysRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeychain({ value, fee, memo }: sendMsgUpdateKeychainParams): Promise<DeliverTxResponse>;
    sendMetadataEthereum({ value, fee, memo }: sendMetadataEthereumParams): Promise<DeliverTxResponse>;
    sendQuerySpacesByOwnerRequest({ value, fee, memo }: sendQuerySpacesByOwnerRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeychainsRequest({ value, fee, memo }: sendQueryKeychainsRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeychainByAddressRequest({ value, fee, memo }: sendQueryKeychainByAddressRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeychainResponse({ value, fee, memo }: sendMsgUpdateKeychainResponseParams): Promise<DeliverTxResponse>;
    sendKeyRequest({ value, fee, memo }: sendKeyRequestParams): Promise<DeliverTxResponse>;
    sendSignRequest({ value, fee, memo }: sendSignRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendMsgRemoveSpaceOwnerResponse({ value, fee, memo }: sendMsgRemoveSpaceOwnerResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewSignatureRequestResponse({ value, fee, memo }: sendMsgNewSignatureRequestResponseParams): Promise<DeliverTxResponse>;
    sendKey({ value, fee, memo }: sendKeyParams): Promise<DeliverTxResponse>;
    sendQuerySpaceByAddressResponse({ value, fee, memo }: sendQuerySpaceByAddressResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestsResponse({ value, fee, memo }: sendQuerySignatureRequestsResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeyRequestResponse({ value, fee, memo }: sendMsgUpdateKeyRequestResponseParams): Promise<DeliverTxResponse>;
    sendMsgAddKeychainPartyResponse({ value, fee, memo }: sendMsgAddKeychainPartyResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewKeyRequestResponse({ value, fee, memo }: sendMsgNewKeyRequestResponseParams): Promise<DeliverTxResponse>;
    sendMsgAddSpaceOwnerResponse({ value, fee, memo }: sendMsgAddSpaceOwnerResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestByIdResponse({ value, fee, memo }: sendQueryKeyRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendWalletKeyResponse({ value, fee, memo }: sendWalletKeyResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestsRequest({ value, fee, memo }: sendQuerySignatureRequestsRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestsResponse({ value, fee, memo }: sendQuerySignTransactionRequestsResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewKeychain({ value, fee, memo }: sendMsgNewKeychainParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendQueryKeychainsResponse({ value, fee, memo }: sendQueryKeychainsResponseParams): Promise<DeliverTxResponse>;
    sendQuerySpaceByAddressRequest({ value, fee, memo }: sendQuerySpaceByAddressRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewSignTransactionRequestResponse({ value, fee, memo }: sendMsgNewSignTransactionRequestResponseParams): Promise<DeliverTxResponse>;
    sendMsgRemoveSpaceOwner({ value, fee, memo }: sendMsgRemoveSpaceOwnerParams): Promise<DeliverTxResponse>;
    sendMsgUpdateSpace({ value, fee, memo }: sendMsgUpdateSpaceParams): Promise<DeliverTxResponse>;
    sendMsgNewKeyRequest({ value, fee, memo }: sendMsgNewKeyRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewSignatureRequest({ value, fee, memo }: sendMsgNewSignatureRequestParams): Promise<DeliverTxResponse>;
    sendSpace({ value, fee, memo }: sendSpaceParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendKeyResponse({ value, fee, memo }: sendKeyResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestByIdResponse({ value, fee, memo }: sendQuerySignTransactionRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewKeychainResponse({ value, fee, memo }: sendMsgNewKeychainResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendQueryKeychainByAddressResponse({ value, fee, memo }: sendQueryKeychainByAddressResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestByIdRequest({ value, fee, memo }: sendQuerySignatureRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewKey({ value, fee, memo }: sendMsgNewKeyParams): Promise<DeliverTxResponse>;
    sendQuerySpacesResponse({ value, fee, memo }: sendQuerySpacesResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestByIdRequest({ value, fee, memo }: sendQueryKeyRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendMsgAddSpaceOwner({ value, fee, memo }: sendMsgAddSpaceOwnerParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeyRequest({ value, fee, memo }: sendMsgUpdateKeyRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeysResponse({ value, fee, memo }: sendQueryKeysResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestByIdRequest({ value, fee, memo }: sendQuerySignTransactionRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewSpaceResponse({ value, fee, memo }: sendMsgNewSpaceResponseParams): Promise<DeliverTxResponse>;
    sendMsgFulfilSignatureRequestResponse({ value, fee, memo }: sendMsgFulfilSignatureRequestResponseParams): Promise<DeliverTxResponse>;
    sendKeychain({ value, fee, memo }: sendKeychainParams): Promise<DeliverTxResponse>;
    sendKeychainFees({ value, fee, memo }: sendKeychainFeesParams): Promise<DeliverTxResponse>;
    sendMsgNewSpace({ value, fee, memo }: sendMsgNewSpaceParams): Promise<DeliverTxResponse>;
    sendMsgAddKeychainParty({ value, fee, memo }: sendMsgAddKeychainPartyParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestsRequest({ value, fee, memo }: sendQueryKeyRequestsRequestParams): Promise<DeliverTxResponse>;
    sendSignTransactionRequestResponse({ value, fee, memo }: sendSignTransactionRequestResponseParams): Promise<DeliverTxResponse>;
    sendMsgSignedData({ value, fee, memo }: sendMsgSignedDataParams): Promise<DeliverTxResponse>;
    sendQuerySpacesRequest({ value, fee, memo }: sendQuerySpacesRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestsResponse({ value, fee, memo }: sendQueryKeyRequestsResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestsRequest({ value, fee, memo }: sendQuerySignTransactionRequestsRequestParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewSignTransactionRequest({ value, fee, memo }: sendMsgNewSignTransactionRequestParams): Promise<DeliverTxResponse>;
    sendSignTransactionRequest({ value, fee, memo }: sendSignTransactionRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestByIdResponse({ value, fee, memo }: sendQuerySignatureRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateSpaceResponse({ value, fee, memo }: sendMsgUpdateSpaceResponseParams): Promise<DeliverTxResponse>;
    sendMsgFulfilSignatureRequest({ value, fee, memo }: sendMsgFulfilSignatureRequestParams): Promise<DeliverTxResponse>;
    queryKeysRequest({ value }: queryKeysRequestParams): EncodeObject;
    msgUpdateKeychain({ value }: msgUpdateKeychainParams): EncodeObject;
    metadataEthereum({ value }: metadataEthereumParams): EncodeObject;
    querySpacesByOwnerRequest({ value }: querySpacesByOwnerRequestParams): EncodeObject;
    queryKeychainsRequest({ value }: queryKeychainsRequestParams): EncodeObject;
    queryKeychainByAddressRequest({ value }: queryKeychainByAddressRequestParams): EncodeObject;
    msgUpdateKeychainResponse({ value }: msgUpdateKeychainResponseParams): EncodeObject;
    keyRequest({ value }: keyRequestParams): EncodeObject;
    signRequest({ value }: signRequestParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    msgRemoveSpaceOwnerResponse({ value }: msgRemoveSpaceOwnerResponseParams): EncodeObject;
    msgNewSignatureRequestResponse({ value }: msgNewSignatureRequestResponseParams): EncodeObject;
    key({ value }: keyParams): EncodeObject;
    querySpaceByAddressResponse({ value }: querySpaceByAddressResponseParams): EncodeObject;
    querySignatureRequestsResponse({ value }: querySignatureRequestsResponseParams): EncodeObject;
    msgUpdateKeyRequestResponse({ value }: msgUpdateKeyRequestResponseParams): EncodeObject;
    msgAddKeychainPartyResponse({ value }: msgAddKeychainPartyResponseParams): EncodeObject;
    msgNewKeyRequestResponse({ value }: msgNewKeyRequestResponseParams): EncodeObject;
    msgAddSpaceOwnerResponse({ value }: msgAddSpaceOwnerResponseParams): EncodeObject;
    queryKeyRequestByIdResponse({ value }: queryKeyRequestByIdResponseParams): EncodeObject;
    walletKeyResponse({ value }: walletKeyResponseParams): EncodeObject;
    querySignatureRequestsRequest({ value }: querySignatureRequestsRequestParams): EncodeObject;
    querySignTransactionRequestsResponse({ value }: querySignTransactionRequestsResponseParams): EncodeObject;
    msgNewKeychain({ value }: msgNewKeychainParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    queryKeychainsResponse({ value }: queryKeychainsResponseParams): EncodeObject;
    querySpaceByAddressRequest({ value }: querySpaceByAddressRequestParams): EncodeObject;
    msgNewSignTransactionRequestResponse({ value }: msgNewSignTransactionRequestResponseParams): EncodeObject;
    msgRemoveSpaceOwner({ value }: msgRemoveSpaceOwnerParams): EncodeObject;
    msgUpdateSpace({ value }: msgUpdateSpaceParams): EncodeObject;
    msgNewKeyRequest({ value }: msgNewKeyRequestParams): EncodeObject;
    msgNewSignatureRequest({ value }: msgNewSignatureRequestParams): EncodeObject;
    space({ value }: spaceParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    keyResponse({ value }: keyResponseParams): EncodeObject;
    querySignTransactionRequestByIdResponse({ value }: querySignTransactionRequestByIdResponseParams): EncodeObject;
    msgNewKeychainResponse({ value }: msgNewKeychainResponseParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    queryKeychainByAddressResponse({ value }: queryKeychainByAddressResponseParams): EncodeObject;
    querySignatureRequestByIdRequest({ value }: querySignatureRequestByIdRequestParams): EncodeObject;
    msgNewKey({ value }: msgNewKeyParams): EncodeObject;
    querySpacesResponse({ value }: querySpacesResponseParams): EncodeObject;
    queryKeyRequestByIdRequest({ value }: queryKeyRequestByIdRequestParams): EncodeObject;
    msgAddSpaceOwner({ value }: msgAddSpaceOwnerParams): EncodeObject;
    msgUpdateKeyRequest({ value }: msgUpdateKeyRequestParams): EncodeObject;
    queryKeysResponse({ value }: queryKeysResponseParams): EncodeObject;
    querySignTransactionRequestByIdRequest({ value }: querySignTransactionRequestByIdRequestParams): EncodeObject;
    msgNewSpaceResponse({ value }: msgNewSpaceResponseParams): EncodeObject;
    msgFulfilSignatureRequestResponse({ value }: msgFulfilSignatureRequestResponseParams): EncodeObject;
    keychain({ value }: keychainParams): EncodeObject;
    keychainFees({ value }: keychainFeesParams): EncodeObject;
    msgNewSpace({ value }: msgNewSpaceParams): EncodeObject;
    msgAddKeychainParty({ value }: msgAddKeychainPartyParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    queryKeyRequestsRequest({ value }: queryKeyRequestsRequestParams): EncodeObject;
    signTransactionRequestResponse({ value }: signTransactionRequestResponseParams): EncodeObject;
    msgSignedData({ value }: msgSignedDataParams): EncodeObject;
    querySpacesRequest({ value }: querySpacesRequestParams): EncodeObject;
    queryKeyRequestsResponse({ value }: queryKeyRequestsResponseParams): EncodeObject;
    querySignTransactionRequestsRequest({ value }: querySignTransactionRequestsRequestParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    msgNewSignTransactionRequest({ value }: msgNewSignTransactionRequestParams): EncodeObject;
    signTransactionRequest({ value }: signTransactionRequestParams): EncodeObject;
    querySignatureRequestByIdResponse({ value }: querySignatureRequestByIdResponseParams): EncodeObject;
    msgUpdateSpaceResponse({ value }: msgUpdateSpaceResponseParams): EncodeObject;
    msgFulfilSignatureRequest({ value }: msgFulfilSignatureRequestParams): EncodeObject;
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
        WardenWarden: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
