import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgUpdateParams } from "./types/warden/warden/tx";
import { MsgNewSignatureRequest } from "./types/warden/warden/tx";
import { KeychainFees } from "./types/warden/warden/keychain";
import { Space } from "./types/warden/warden/space";
import { QueryKeysRequest } from "./types/warden/warden/query";
import { KeyResponse } from "./types/warden/warden/query";
import { MsgAddKeychainPartyResponse } from "./types/warden/warden/tx";
import { MsgUpdateKeychain } from "./types/warden/warden/tx";
import { QuerySpacesResponse } from "./types/warden/warden/query";
import { QuerySignTransactionRequestsResponse } from "./types/warden/warden/query";
import { MsgUpdateKeyRequestResponse } from "./types/warden/warden/tx";
import { Keychain } from "./types/warden/warden/keychain";
import { Key } from "./types/warden/warden/key";
import { QuerySpaceByIdRequest } from "./types/warden/warden/query";
import { QueryKeychainByIdResponse } from "./types/warden/warden/query";
import { QueryKeyRequestByIdRequest } from "./types/warden/warden/query";
import { MsgNewSignatureRequestResponse } from "./types/warden/warden/tx";
import { Params } from "./types/warden/warden/params";
import { QueryKeyRequestsResponse } from "./types/warden/warden/query";
import { MsgUpdateKeychainResponse } from "./types/warden/warden/tx";
import { SignRequest } from "./types/warden/warden/signature";
import { MsgNewKeychainResponse } from "./types/warden/warden/tx";
import { MsgNewSignTransactionRequest } from "./types/warden/warden/tx";
import { MsgRemoveSpaceOwner } from "./types/warden/warden/tx";
import { MsgNewKeychain } from "./types/warden/warden/tx";
import { MsgFulfilSignatureRequest } from "./types/warden/warden/tx";
import { MsgUpdateSpace } from "./types/warden/warden/tx";
import { MsgNewKeyRequest } from "./types/warden/warden/tx";
import { QueryParamsResponse } from "./types/warden/warden/query";
import { QueryKeysResponse } from "./types/warden/warden/query";
import { MsgUpdateParamsResponse } from "./types/warden/warden/tx";
import { QuerySignTransactionRequestByIdRequest } from "./types/warden/warden/query";
import { MsgAddSpaceOwnerResponse } from "./types/warden/warden/tx";
import { QuerySpacesByOwnerRequest } from "./types/warden/warden/query";
import { QueryKeychainsRequest } from "./types/warden/warden/query";
import { QuerySignatureRequestsResponse } from "./types/warden/warden/query";
import { QueryKeychainsResponse } from "./types/warden/warden/query";
import { QuerySignTransactionRequestByIdResponse } from "./types/warden/warden/query";
import { MsgAddKeychainParty } from "./types/warden/warden/tx";
import { QuerySignatureRequestsRequest } from "./types/warden/warden/query";
import { QuerySignatureRequestByIdRequest } from "./types/warden/warden/query";
import { MsgUpdateKeyRequest } from "./types/warden/warden/tx";
import { KeyRequest } from "./types/warden/warden/key";
import { QuerySpaceByIdResponse } from "./types/warden/warden/query";
import { QueryKeyRequestByIdResponse } from "./types/warden/warden/query";
import { MsgNewKeyRequestResponse } from "./types/warden/warden/tx";
import { MetadataEthereum } from "./types/warden/warden/tx";
import { QuerySignTransactionRequestsRequest } from "./types/warden/warden/query";
import { MsgRemoveSpaceOwnerResponse } from "./types/warden/warden/tx";
import { GenesisState } from "./types/warden/warden/genesis";
import { QuerySpacesRequest } from "./types/warden/warden/query";
import { MsgSignedData } from "./types/warden/warden/tx";
import { MsgUpdateSpaceResponse } from "./types/warden/warden/tx";
import { MsgNewSignTransactionRequestResponse } from "./types/warden/warden/tx";
import { QueryParamsRequest } from "./types/warden/warden/query";
import { QueryKeychainByIdRequest } from "./types/warden/warden/query";
import { MsgAddSpaceOwner } from "./types/warden/warden/tx";
import { MsgNewKey } from "./types/warden/warden/tx";
import { MsgFulfilSignatureRequestResponse } from "./types/warden/warden/tx";
import { QuerySignatureRequestByIdResponse } from "./types/warden/warden/query";
import { SignTransactionRequestResponse } from "./types/warden/warden/query";
import { MsgNewSpaceResponse } from "./types/warden/warden/tx";
import { MsgNewSpace } from "./types/warden/warden/tx";
import { QueryKeyRequestsRequest } from "./types/warden/warden/query";
import { WalletKeyResponse } from "./types/warden/warden/query";
import { SignTransactionRequest } from "./types/warden/warden/signature";
export { MsgUpdateParams, MsgNewSignatureRequest, KeychainFees, Space, QueryKeysRequest, KeyResponse, MsgAddKeychainPartyResponse, MsgUpdateKeychain, QuerySpacesResponse, QuerySignTransactionRequestsResponse, MsgUpdateKeyRequestResponse, Keychain, Key, QuerySpaceByIdRequest, QueryKeychainByIdResponse, QueryKeyRequestByIdRequest, MsgNewSignatureRequestResponse, Params, QueryKeyRequestsResponse, MsgUpdateKeychainResponse, SignRequest, MsgNewKeychainResponse, MsgNewSignTransactionRequest, MsgRemoveSpaceOwner, MsgNewKeychain, MsgFulfilSignatureRequest, MsgUpdateSpace, MsgNewKeyRequest, QueryParamsResponse, QueryKeysResponse, MsgUpdateParamsResponse, QuerySignTransactionRequestByIdRequest, MsgAddSpaceOwnerResponse, QuerySpacesByOwnerRequest, QueryKeychainsRequest, QuerySignatureRequestsResponse, QueryKeychainsResponse, QuerySignTransactionRequestByIdResponse, MsgAddKeychainParty, QuerySignatureRequestsRequest, QuerySignatureRequestByIdRequest, MsgUpdateKeyRequest, KeyRequest, QuerySpaceByIdResponse, QueryKeyRequestByIdResponse, MsgNewKeyRequestResponse, MetadataEthereum, QuerySignTransactionRequestsRequest, MsgRemoveSpaceOwnerResponse, GenesisState, QuerySpacesRequest, MsgSignedData, MsgUpdateSpaceResponse, MsgNewSignTransactionRequestResponse, QueryParamsRequest, QueryKeychainByIdRequest, MsgAddSpaceOwner, MsgNewKey, MsgFulfilSignatureRequestResponse, QuerySignatureRequestByIdResponse, SignTransactionRequestResponse, MsgNewSpaceResponse, MsgNewSpace, QueryKeyRequestsRequest, WalletKeyResponse, SignTransactionRequest };
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignatureRequestParams = {
    value: MsgNewSignatureRequest;
    fee?: StdFee;
    memo?: string;
};
type sendKeychainFeesParams = {
    value: KeychainFees;
    fee?: StdFee;
    memo?: string;
};
type sendSpaceParams = {
    value: Space;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeysRequestParams = {
    value: QueryKeysRequest;
    fee?: StdFee;
    memo?: string;
};
type sendKeyResponseParams = {
    value: KeyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddKeychainPartyResponseParams = {
    value: MsgAddKeychainPartyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeychainParams = {
    value: MsgUpdateKeychain;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesResponseParams = {
    value: QuerySpacesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestsResponseParams = {
    value: QuerySignTransactionRequestsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyRequestResponseParams = {
    value: MsgUpdateKeyRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendKeychainParams = {
    value: Keychain;
    fee?: StdFee;
    memo?: string;
};
type sendKeyParams = {
    value: Key;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpaceByIdRequestParams = {
    value: QuerySpaceByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainByIdResponseParams = {
    value: QueryKeychainByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestByIdRequestParams = {
    value: QueryKeyRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignatureRequestResponseParams = {
    value: MsgNewSignatureRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestsResponseParams = {
    value: QueryKeyRequestsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeychainResponseParams = {
    value: MsgUpdateKeychainResponse;
    fee?: StdFee;
    memo?: string;
};
type sendSignRequestParams = {
    value: SignRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeychainResponseParams = {
    value: MsgNewKeychainResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignTransactionRequestParams = {
    value: MsgNewSignTransactionRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRemoveSpaceOwnerParams = {
    value: MsgRemoveSpaceOwner;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeychainParams = {
    value: MsgNewKeychain;
    fee?: StdFee;
    memo?: string;
};
type sendMsgFulfilSignatureRequestParams = {
    value: MsgFulfilSignatureRequest;
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
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeysResponseParams = {
    value: QueryKeysResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestByIdRequestParams = {
    value: QuerySignTransactionRequestByIdRequest;
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
type sendQueryKeychainsRequestParams = {
    value: QueryKeychainsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestsResponseParams = {
    value: QuerySignatureRequestsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainsResponseParams = {
    value: QueryKeychainsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestByIdResponseParams = {
    value: QuerySignTransactionRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddKeychainPartyParams = {
    value: MsgAddKeychainParty;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestsRequestParams = {
    value: QuerySignatureRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestByIdRequestParams = {
    value: QuerySignatureRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyRequestParams = {
    value: MsgUpdateKeyRequest;
    fee?: StdFee;
    memo?: string;
};
type sendKeyRequestParams = {
    value: KeyRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpaceByIdResponseParams = {
    value: QuerySpaceByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestByIdResponseParams = {
    value: QueryKeyRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeyRequestResponseParams = {
    value: MsgNewKeyRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMetadataEthereumParams = {
    value: MetadataEthereum;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestsRequestParams = {
    value: QuerySignTransactionRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRemoveSpaceOwnerResponseParams = {
    value: MsgRemoveSpaceOwnerResponse;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesRequestParams = {
    value: QuerySpacesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSignedDataParams = {
    value: MsgSignedData;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateSpaceResponseParams = {
    value: MsgUpdateSpaceResponse;
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
type sendQueryKeychainByIdRequestParams = {
    value: QueryKeychainByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddSpaceOwnerParams = {
    value: MsgAddSpaceOwner;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeyParams = {
    value: MsgNewKey;
    fee?: StdFee;
    memo?: string;
};
type sendMsgFulfilSignatureRequestResponseParams = {
    value: MsgFulfilSignatureRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestByIdResponseParams = {
    value: QuerySignatureRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendSignTransactionRequestResponseParams = {
    value: SignTransactionRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSpaceResponseParams = {
    value: MsgNewSpaceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSpaceParams = {
    value: MsgNewSpace;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestsRequestParams = {
    value: QueryKeyRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendWalletKeyResponseParams = {
    value: WalletKeyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendSignTransactionRequestParams = {
    value: SignTransactionRequest;
    fee?: StdFee;
    memo?: string;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type msgNewSignatureRequestParams = {
    value: MsgNewSignatureRequest;
};
type keychainFeesParams = {
    value: KeychainFees;
};
type spaceParams = {
    value: Space;
};
type queryKeysRequestParams = {
    value: QueryKeysRequest;
};
type keyResponseParams = {
    value: KeyResponse;
};
type msgAddKeychainPartyResponseParams = {
    value: MsgAddKeychainPartyResponse;
};
type msgUpdateKeychainParams = {
    value: MsgUpdateKeychain;
};
type querySpacesResponseParams = {
    value: QuerySpacesResponse;
};
type querySignTransactionRequestsResponseParams = {
    value: QuerySignTransactionRequestsResponse;
};
type msgUpdateKeyRequestResponseParams = {
    value: MsgUpdateKeyRequestResponse;
};
type keychainParams = {
    value: Keychain;
};
type keyParams = {
    value: Key;
};
type querySpaceByIdRequestParams = {
    value: QuerySpaceByIdRequest;
};
type queryKeychainByIdResponseParams = {
    value: QueryKeychainByIdResponse;
};
type queryKeyRequestByIdRequestParams = {
    value: QueryKeyRequestByIdRequest;
};
type msgNewSignatureRequestResponseParams = {
    value: MsgNewSignatureRequestResponse;
};
type paramsParams = {
    value: Params;
};
type queryKeyRequestsResponseParams = {
    value: QueryKeyRequestsResponse;
};
type msgUpdateKeychainResponseParams = {
    value: MsgUpdateKeychainResponse;
};
type signRequestParams = {
    value: SignRequest;
};
type msgNewKeychainResponseParams = {
    value: MsgNewKeychainResponse;
};
type msgNewSignTransactionRequestParams = {
    value: MsgNewSignTransactionRequest;
};
type msgRemoveSpaceOwnerParams = {
    value: MsgRemoveSpaceOwner;
};
type msgNewKeychainParams = {
    value: MsgNewKeychain;
};
type msgFulfilSignatureRequestParams = {
    value: MsgFulfilSignatureRequest;
};
type msgUpdateSpaceParams = {
    value: MsgUpdateSpace;
};
type msgNewKeyRequestParams = {
    value: MsgNewKeyRequest;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type queryKeysResponseParams = {
    value: QueryKeysResponse;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type querySignTransactionRequestByIdRequestParams = {
    value: QuerySignTransactionRequestByIdRequest;
};
type msgAddSpaceOwnerResponseParams = {
    value: MsgAddSpaceOwnerResponse;
};
type querySpacesByOwnerRequestParams = {
    value: QuerySpacesByOwnerRequest;
};
type queryKeychainsRequestParams = {
    value: QueryKeychainsRequest;
};
type querySignatureRequestsResponseParams = {
    value: QuerySignatureRequestsResponse;
};
type queryKeychainsResponseParams = {
    value: QueryKeychainsResponse;
};
type querySignTransactionRequestByIdResponseParams = {
    value: QuerySignTransactionRequestByIdResponse;
};
type msgAddKeychainPartyParams = {
    value: MsgAddKeychainParty;
};
type querySignatureRequestsRequestParams = {
    value: QuerySignatureRequestsRequest;
};
type querySignatureRequestByIdRequestParams = {
    value: QuerySignatureRequestByIdRequest;
};
type msgUpdateKeyRequestParams = {
    value: MsgUpdateKeyRequest;
};
type keyRequestParams = {
    value: KeyRequest;
};
type querySpaceByIdResponseParams = {
    value: QuerySpaceByIdResponse;
};
type queryKeyRequestByIdResponseParams = {
    value: QueryKeyRequestByIdResponse;
};
type msgNewKeyRequestResponseParams = {
    value: MsgNewKeyRequestResponse;
};
type metadataEthereumParams = {
    value: MetadataEthereum;
};
type querySignTransactionRequestsRequestParams = {
    value: QuerySignTransactionRequestsRequest;
};
type msgRemoveSpaceOwnerResponseParams = {
    value: MsgRemoveSpaceOwnerResponse;
};
type genesisStateParams = {
    value: GenesisState;
};
type querySpacesRequestParams = {
    value: QuerySpacesRequest;
};
type msgSignedDataParams = {
    value: MsgSignedData;
};
type msgUpdateSpaceResponseParams = {
    value: MsgUpdateSpaceResponse;
};
type msgNewSignTransactionRequestResponseParams = {
    value: MsgNewSignTransactionRequestResponse;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type queryKeychainByIdRequestParams = {
    value: QueryKeychainByIdRequest;
};
type msgAddSpaceOwnerParams = {
    value: MsgAddSpaceOwner;
};
type msgNewKeyParams = {
    value: MsgNewKey;
};
type msgFulfilSignatureRequestResponseParams = {
    value: MsgFulfilSignatureRequestResponse;
};
type querySignatureRequestByIdResponseParams = {
    value: QuerySignatureRequestByIdResponse;
};
type signTransactionRequestResponseParams = {
    value: SignTransactionRequestResponse;
};
type msgNewSpaceResponseParams = {
    value: MsgNewSpaceResponse;
};
type msgNewSpaceParams = {
    value: MsgNewSpace;
};
type queryKeyRequestsRequestParams = {
    value: QueryKeyRequestsRequest;
};
type walletKeyResponseParams = {
    value: WalletKeyResponse;
};
type signTransactionRequestParams = {
    value: SignTransactionRequest;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendMsgNewSignatureRequest({ value, fee, memo }: sendMsgNewSignatureRequestParams): Promise<DeliverTxResponse>;
    sendKeychainFees({ value, fee, memo }: sendKeychainFeesParams): Promise<DeliverTxResponse>;
    sendSpace({ value, fee, memo }: sendSpaceParams): Promise<DeliverTxResponse>;
    sendQueryKeysRequest({ value, fee, memo }: sendQueryKeysRequestParams): Promise<DeliverTxResponse>;
    sendKeyResponse({ value, fee, memo }: sendKeyResponseParams): Promise<DeliverTxResponse>;
    sendMsgAddKeychainPartyResponse({ value, fee, memo }: sendMsgAddKeychainPartyResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeychain({ value, fee, memo }: sendMsgUpdateKeychainParams): Promise<DeliverTxResponse>;
    sendQuerySpacesResponse({ value, fee, memo }: sendQuerySpacesResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestsResponse({ value, fee, memo }: sendQuerySignTransactionRequestsResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeyRequestResponse({ value, fee, memo }: sendMsgUpdateKeyRequestResponseParams): Promise<DeliverTxResponse>;
    sendKeychain({ value, fee, memo }: sendKeychainParams): Promise<DeliverTxResponse>;
    sendKey({ value, fee, memo }: sendKeyParams): Promise<DeliverTxResponse>;
    sendQuerySpaceByIdRequest({ value, fee, memo }: sendQuerySpaceByIdRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeychainByIdResponse({ value, fee, memo }: sendQueryKeychainByIdResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestByIdRequest({ value, fee, memo }: sendQueryKeyRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewSignatureRequestResponse({ value, fee, memo }: sendMsgNewSignatureRequestResponseParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestsResponse({ value, fee, memo }: sendQueryKeyRequestsResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeychainResponse({ value, fee, memo }: sendMsgUpdateKeychainResponseParams): Promise<DeliverTxResponse>;
    sendSignRequest({ value, fee, memo }: sendSignRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewKeychainResponse({ value, fee, memo }: sendMsgNewKeychainResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewSignTransactionRequest({ value, fee, memo }: sendMsgNewSignTransactionRequestParams): Promise<DeliverTxResponse>;
    sendMsgRemoveSpaceOwner({ value, fee, memo }: sendMsgRemoveSpaceOwnerParams): Promise<DeliverTxResponse>;
    sendMsgNewKeychain({ value, fee, memo }: sendMsgNewKeychainParams): Promise<DeliverTxResponse>;
    sendMsgFulfilSignatureRequest({ value, fee, memo }: sendMsgFulfilSignatureRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateSpace({ value, fee, memo }: sendMsgUpdateSpaceParams): Promise<DeliverTxResponse>;
    sendMsgNewKeyRequest({ value, fee, memo }: sendMsgNewKeyRequestParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeysResponse({ value, fee, memo }: sendQueryKeysResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestByIdRequest({ value, fee, memo }: sendQuerySignTransactionRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendMsgAddSpaceOwnerResponse({ value, fee, memo }: sendMsgAddSpaceOwnerResponseParams): Promise<DeliverTxResponse>;
    sendQuerySpacesByOwnerRequest({ value, fee, memo }: sendQuerySpacesByOwnerRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeychainsRequest({ value, fee, memo }: sendQueryKeychainsRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestsResponse({ value, fee, memo }: sendQuerySignatureRequestsResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeychainsResponse({ value, fee, memo }: sendQueryKeychainsResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestByIdResponse({ value, fee, memo }: sendQuerySignTransactionRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgAddKeychainParty({ value, fee, memo }: sendMsgAddKeychainPartyParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestsRequest({ value, fee, memo }: sendQuerySignatureRequestsRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestByIdRequest({ value, fee, memo }: sendQuerySignatureRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeyRequest({ value, fee, memo }: sendMsgUpdateKeyRequestParams): Promise<DeliverTxResponse>;
    sendKeyRequest({ value, fee, memo }: sendKeyRequestParams): Promise<DeliverTxResponse>;
    sendQuerySpaceByIdResponse({ value, fee, memo }: sendQuerySpaceByIdResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestByIdResponse({ value, fee, memo }: sendQueryKeyRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewKeyRequestResponse({ value, fee, memo }: sendMsgNewKeyRequestResponseParams): Promise<DeliverTxResponse>;
    sendMetadataEthereum({ value, fee, memo }: sendMetadataEthereumParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestsRequest({ value, fee, memo }: sendQuerySignTransactionRequestsRequestParams): Promise<DeliverTxResponse>;
    sendMsgRemoveSpaceOwnerResponse({ value, fee, memo }: sendMsgRemoveSpaceOwnerResponseParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendQuerySpacesRequest({ value, fee, memo }: sendQuerySpacesRequestParams): Promise<DeliverTxResponse>;
    sendMsgSignedData({ value, fee, memo }: sendMsgSignedDataParams): Promise<DeliverTxResponse>;
    sendMsgUpdateSpaceResponse({ value, fee, memo }: sendMsgUpdateSpaceResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewSignTransactionRequestResponse({ value, fee, memo }: sendMsgNewSignTransactionRequestResponseParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeychainByIdRequest({ value, fee, memo }: sendQueryKeychainByIdRequestParams): Promise<DeliverTxResponse>;
    sendMsgAddSpaceOwner({ value, fee, memo }: sendMsgAddSpaceOwnerParams): Promise<DeliverTxResponse>;
    sendMsgNewKey({ value, fee, memo }: sendMsgNewKeyParams): Promise<DeliverTxResponse>;
    sendMsgFulfilSignatureRequestResponse({ value, fee, memo }: sendMsgFulfilSignatureRequestResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestByIdResponse({ value, fee, memo }: sendQuerySignatureRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendSignTransactionRequestResponse({ value, fee, memo }: sendSignTransactionRequestResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewSpaceResponse({ value, fee, memo }: sendMsgNewSpaceResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewSpace({ value, fee, memo }: sendMsgNewSpaceParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestsRequest({ value, fee, memo }: sendQueryKeyRequestsRequestParams): Promise<DeliverTxResponse>;
    sendWalletKeyResponse({ value, fee, memo }: sendWalletKeyResponseParams): Promise<DeliverTxResponse>;
    sendSignTransactionRequest({ value, fee, memo }: sendSignTransactionRequestParams): Promise<DeliverTxResponse>;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    msgNewSignatureRequest({ value }: msgNewSignatureRequestParams): EncodeObject;
    keychainFees({ value }: keychainFeesParams): EncodeObject;
    space({ value }: spaceParams): EncodeObject;
    queryKeysRequest({ value }: queryKeysRequestParams): EncodeObject;
    keyResponse({ value }: keyResponseParams): EncodeObject;
    msgAddKeychainPartyResponse({ value }: msgAddKeychainPartyResponseParams): EncodeObject;
    msgUpdateKeychain({ value }: msgUpdateKeychainParams): EncodeObject;
    querySpacesResponse({ value }: querySpacesResponseParams): EncodeObject;
    querySignTransactionRequestsResponse({ value }: querySignTransactionRequestsResponseParams): EncodeObject;
    msgUpdateKeyRequestResponse({ value }: msgUpdateKeyRequestResponseParams): EncodeObject;
    keychain({ value }: keychainParams): EncodeObject;
    key({ value }: keyParams): EncodeObject;
    querySpaceByIdRequest({ value }: querySpaceByIdRequestParams): EncodeObject;
    queryKeychainByIdResponse({ value }: queryKeychainByIdResponseParams): EncodeObject;
    queryKeyRequestByIdRequest({ value }: queryKeyRequestByIdRequestParams): EncodeObject;
    msgNewSignatureRequestResponse({ value }: msgNewSignatureRequestResponseParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    queryKeyRequestsResponse({ value }: queryKeyRequestsResponseParams): EncodeObject;
    msgUpdateKeychainResponse({ value }: msgUpdateKeychainResponseParams): EncodeObject;
    signRequest({ value }: signRequestParams): EncodeObject;
    msgNewKeychainResponse({ value }: msgNewKeychainResponseParams): EncodeObject;
    msgNewSignTransactionRequest({ value }: msgNewSignTransactionRequestParams): EncodeObject;
    msgRemoveSpaceOwner({ value }: msgRemoveSpaceOwnerParams): EncodeObject;
    msgNewKeychain({ value }: msgNewKeychainParams): EncodeObject;
    msgFulfilSignatureRequest({ value }: msgFulfilSignatureRequestParams): EncodeObject;
    msgUpdateSpace({ value }: msgUpdateSpaceParams): EncodeObject;
    msgNewKeyRequest({ value }: msgNewKeyRequestParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    queryKeysResponse({ value }: queryKeysResponseParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    querySignTransactionRequestByIdRequest({ value }: querySignTransactionRequestByIdRequestParams): EncodeObject;
    msgAddSpaceOwnerResponse({ value }: msgAddSpaceOwnerResponseParams): EncodeObject;
    querySpacesByOwnerRequest({ value }: querySpacesByOwnerRequestParams): EncodeObject;
    queryKeychainsRequest({ value }: queryKeychainsRequestParams): EncodeObject;
    querySignatureRequestsResponse({ value }: querySignatureRequestsResponseParams): EncodeObject;
    queryKeychainsResponse({ value }: queryKeychainsResponseParams): EncodeObject;
    querySignTransactionRequestByIdResponse({ value }: querySignTransactionRequestByIdResponseParams): EncodeObject;
    msgAddKeychainParty({ value }: msgAddKeychainPartyParams): EncodeObject;
    querySignatureRequestsRequest({ value }: querySignatureRequestsRequestParams): EncodeObject;
    querySignatureRequestByIdRequest({ value }: querySignatureRequestByIdRequestParams): EncodeObject;
    msgUpdateKeyRequest({ value }: msgUpdateKeyRequestParams): EncodeObject;
    keyRequest({ value }: keyRequestParams): EncodeObject;
    querySpaceByIdResponse({ value }: querySpaceByIdResponseParams): EncodeObject;
    queryKeyRequestByIdResponse({ value }: queryKeyRequestByIdResponseParams): EncodeObject;
    msgNewKeyRequestResponse({ value }: msgNewKeyRequestResponseParams): EncodeObject;
    metadataEthereum({ value }: metadataEthereumParams): EncodeObject;
    querySignTransactionRequestsRequest({ value }: querySignTransactionRequestsRequestParams): EncodeObject;
    msgRemoveSpaceOwnerResponse({ value }: msgRemoveSpaceOwnerResponseParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    querySpacesRequest({ value }: querySpacesRequestParams): EncodeObject;
    msgSignedData({ value }: msgSignedDataParams): EncodeObject;
    msgUpdateSpaceResponse({ value }: msgUpdateSpaceResponseParams): EncodeObject;
    msgNewSignTransactionRequestResponse({ value }: msgNewSignTransactionRequestResponseParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    queryKeychainByIdRequest({ value }: queryKeychainByIdRequestParams): EncodeObject;
    msgAddSpaceOwner({ value }: msgAddSpaceOwnerParams): EncodeObject;
    msgNewKey({ value }: msgNewKeyParams): EncodeObject;
    msgFulfilSignatureRequestResponse({ value }: msgFulfilSignatureRequestResponseParams): EncodeObject;
    querySignatureRequestByIdResponse({ value }: querySignatureRequestByIdResponseParams): EncodeObject;
    signTransactionRequestResponse({ value }: signTransactionRequestResponseParams): EncodeObject;
    msgNewSpaceResponse({ value }: msgNewSpaceResponseParams): EncodeObject;
    msgNewSpace({ value }: msgNewSpaceParams): EncodeObject;
    queryKeyRequestsRequest({ value }: queryKeyRequestsRequestParams): EncodeObject;
    walletKeyResponse({ value }: walletKeyResponseParams): EncodeObject;
    signTransactionRequest({ value }: signTransactionRequestParams): EncodeObject;
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
