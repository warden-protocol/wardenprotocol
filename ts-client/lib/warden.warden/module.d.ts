import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgAddKeychainParty } from "./types/warden/warden/tx";
import { QueryKeyRequestByIdResponse } from "./types/warden/warden/query";
import { Keychain } from "./types/warden/warden/keychain";
import { MsgAddKeychainPartyResponse } from "./types/warden/warden/tx";
import { QueryKeyRequestsResponse } from "./types/warden/warden/query";
import { QuerySignatureRequestsRequest } from "./types/warden/warden/query";
import { KeyRequest } from "./types/warden/warden/key";
import { MsgUpdateSpace } from "./types/warden/warden/tx";
import { MsgFulfilSignatureRequestResponse } from "./types/warden/warden/tx";
import { QueryKeychainByIdRequest } from "./types/warden/warden/query";
import { SignRequest } from "./types/warden/warden/signature";
import { MsgNewSignTransactionRequest } from "./types/warden/warden/tx";
import { Params } from "./types/warden/warden/params";
import { QueryKeyRequestsRequest } from "./types/warden/warden/query";
import { Space } from "./types/warden/warden/space";
import { MsgNewSpace } from "./types/warden/warden/tx";
import { MsgUpdateKeychainResponse } from "./types/warden/warden/tx";
import { MsgNewSignTransactionRequestResponse } from "./types/warden/warden/tx";
import { QuerySpaceByIdResponse } from "./types/warden/warden/query";
import { WalletKeyResponse } from "./types/warden/warden/query";
import { QuerySignatureRequestsResponse } from "./types/warden/warden/query";
import { QueryParamsRequest } from "./types/warden/warden/query";
import { QuerySpacesResponse } from "./types/warden/warden/query";
import { SignTransactionRequestResponse } from "./types/warden/warden/query";
import { MsgUpdateParamsResponse } from "./types/warden/warden/tx";
import { MetadataEthereum } from "./types/warden/warden/tx";
import { QuerySpacesByOwnerRequest } from "./types/warden/warden/query";
import { QuerySignatureRequestByIdRequest } from "./types/warden/warden/query";
import { MsgAddSpaceOwnerResponse } from "./types/warden/warden/tx";
import { MsgFulfilSignatureRequest } from "./types/warden/warden/tx";
import { GenesisState } from "./types/warden/warden/genesis";
import { Key } from "./types/warden/warden/key";
import { MsgNewKeyRequestResponse } from "./types/warden/warden/tx";
import { QuerySignTransactionRequestsRequest } from "./types/warden/warden/query";
import { QuerySignTransactionRequestsResponse } from "./types/warden/warden/query";
import { MsgNewKeychainResponse } from "./types/warden/warden/tx";
import { MsgNewSignatureRequest } from "./types/warden/warden/tx";
import { QuerySpacesRequest } from "./types/warden/warden/query";
import { QueryKeysResponse } from "./types/warden/warden/query";
import { QuerySignatureRequestByIdResponse } from "./types/warden/warden/query";
import { MsgSignedData } from "./types/warden/warden/tx";
import { QueryParamsResponse } from "./types/warden/warden/query";
import { QueryKeychainsRequest } from "./types/warden/warden/query";
import { SignTransactionRequest } from "./types/warden/warden/signature";
import { MsgNewSpaceResponse } from "./types/warden/warden/tx";
import { MsgRemoveSpaceOwner } from "./types/warden/warden/tx";
import { MsgNewKey } from "./types/warden/warden/tx";
import { QueryKeysRequest } from "./types/warden/warden/query";
import { MsgRemoveSpaceOwnerResponse } from "./types/warden/warden/tx";
import { MsgNewKeychain } from "./types/warden/warden/tx";
import { MsgUpdateKeychain } from "./types/warden/warden/tx";
import { MsgUpdateKeyRequest } from "./types/warden/warden/tx";
import { QueryKeyRequestByIdRequest } from "./types/warden/warden/query";
import { QuerySignTransactionRequestByIdRequest } from "./types/warden/warden/query";
import { QuerySignTransactionRequestByIdResponse } from "./types/warden/warden/query";
import { MsgAddSpaceOwner } from "./types/warden/warden/tx";
import { MsgUpdateSpaceResponse } from "./types/warden/warden/tx";
import { MsgNewKeyRequest } from "./types/warden/warden/tx";
import { QuerySpaceByIdRequest } from "./types/warden/warden/query";
import { QueryKeychainByIdResponse } from "./types/warden/warden/query";
import { MsgUpdateParams } from "./types/warden/warden/tx";
import { KeychainFees } from "./types/warden/warden/keychain";
import { MsgUpdateKeyRequestResponse } from "./types/warden/warden/tx";
import { MsgNewSignatureRequestResponse } from "./types/warden/warden/tx";
import { QueryKeychainsResponse } from "./types/warden/warden/query";
import { KeyResponse } from "./types/warden/warden/query";
export { MsgAddKeychainParty, QueryKeyRequestByIdResponse, Keychain, MsgAddKeychainPartyResponse, QueryKeyRequestsResponse, QuerySignatureRequestsRequest, KeyRequest, MsgUpdateSpace, MsgFulfilSignatureRequestResponse, QueryKeychainByIdRequest, SignRequest, MsgNewSignTransactionRequest, Params, QueryKeyRequestsRequest, Space, MsgNewSpace, MsgUpdateKeychainResponse, MsgNewSignTransactionRequestResponse, QuerySpaceByIdResponse, WalletKeyResponse, QuerySignatureRequestsResponse, QueryParamsRequest, QuerySpacesResponse, SignTransactionRequestResponse, MsgUpdateParamsResponse, MetadataEthereum, QuerySpacesByOwnerRequest, QuerySignatureRequestByIdRequest, MsgAddSpaceOwnerResponse, MsgFulfilSignatureRequest, GenesisState, Key, MsgNewKeyRequestResponse, QuerySignTransactionRequestsRequest, QuerySignTransactionRequestsResponse, MsgNewKeychainResponse, MsgNewSignatureRequest, QuerySpacesRequest, QueryKeysResponse, QuerySignatureRequestByIdResponse, MsgSignedData, QueryParamsResponse, QueryKeychainsRequest, SignTransactionRequest, MsgNewSpaceResponse, MsgRemoveSpaceOwner, MsgNewKey, QueryKeysRequest, MsgRemoveSpaceOwnerResponse, MsgNewKeychain, MsgUpdateKeychain, MsgUpdateKeyRequest, QueryKeyRequestByIdRequest, QuerySignTransactionRequestByIdRequest, QuerySignTransactionRequestByIdResponse, MsgAddSpaceOwner, MsgUpdateSpaceResponse, MsgNewKeyRequest, QuerySpaceByIdRequest, QueryKeychainByIdResponse, MsgUpdateParams, KeychainFees, MsgUpdateKeyRequestResponse, MsgNewSignatureRequestResponse, QueryKeychainsResponse, KeyResponse };
type sendMsgAddKeychainPartyParams = {
    value: MsgAddKeychainParty;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestByIdResponseParams = {
    value: QueryKeyRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendKeychainParams = {
    value: Keychain;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddKeychainPartyResponseParams = {
    value: MsgAddKeychainPartyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestsResponseParams = {
    value: QueryKeyRequestsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestsRequestParams = {
    value: QuerySignatureRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendKeyRequestParams = {
    value: KeyRequest;
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
type sendQueryKeychainByIdRequestParams = {
    value: QueryKeychainByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendSignRequestParams = {
    value: SignRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignTransactionRequestParams = {
    value: MsgNewSignTransactionRequest;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestsRequestParams = {
    value: QueryKeyRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendSpaceParams = {
    value: Space;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSpaceParams = {
    value: MsgNewSpace;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeychainResponseParams = {
    value: MsgUpdateKeychainResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignTransactionRequestResponseParams = {
    value: MsgNewSignTransactionRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpaceByIdResponseParams = {
    value: QuerySpaceByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendWalletKeyResponseParams = {
    value: WalletKeyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestsResponseParams = {
    value: QuerySignatureRequestsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesResponseParams = {
    value: QuerySpacesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendSignTransactionRequestResponseParams = {
    value: SignTransactionRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
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
type sendQuerySignatureRequestByIdRequestParams = {
    value: QuerySignatureRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddSpaceOwnerResponseParams = {
    value: MsgAddSpaceOwnerResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgFulfilSignatureRequestParams = {
    value: MsgFulfilSignatureRequest;
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
type sendMsgNewKeyRequestResponseParams = {
    value: MsgNewKeyRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestsRequestParams = {
    value: QuerySignTransactionRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestsResponseParams = {
    value: QuerySignTransactionRequestsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeychainResponseParams = {
    value: MsgNewKeychainResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignatureRequestParams = {
    value: MsgNewSignatureRequest;
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
type sendQuerySignatureRequestByIdResponseParams = {
    value: QuerySignatureRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSignedDataParams = {
    value: MsgSignedData;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainsRequestParams = {
    value: QueryKeychainsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendSignTransactionRequestParams = {
    value: SignTransactionRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSpaceResponseParams = {
    value: MsgNewSpaceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRemoveSpaceOwnerParams = {
    value: MsgRemoveSpaceOwner;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeyParams = {
    value: MsgNewKey;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeysRequestParams = {
    value: QueryKeysRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRemoveSpaceOwnerResponseParams = {
    value: MsgRemoveSpaceOwnerResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeychainParams = {
    value: MsgNewKeychain;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeychainParams = {
    value: MsgUpdateKeychain;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyRequestParams = {
    value: MsgUpdateKeyRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestByIdRequestParams = {
    value: QueryKeyRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestByIdRequestParams = {
    value: QuerySignTransactionRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestByIdResponseParams = {
    value: QuerySignTransactionRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddSpaceOwnerParams = {
    value: MsgAddSpaceOwner;
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
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendKeychainFeesParams = {
    value: KeychainFees;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyRequestResponseParams = {
    value: MsgUpdateKeyRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignatureRequestResponseParams = {
    value: MsgNewSignatureRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainsResponseParams = {
    value: QueryKeychainsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendKeyResponseParams = {
    value: KeyResponse;
    fee?: StdFee;
    memo?: string;
};
type msgAddKeychainPartyParams = {
    value: MsgAddKeychainParty;
};
type queryKeyRequestByIdResponseParams = {
    value: QueryKeyRequestByIdResponse;
};
type keychainParams = {
    value: Keychain;
};
type msgAddKeychainPartyResponseParams = {
    value: MsgAddKeychainPartyResponse;
};
type queryKeyRequestsResponseParams = {
    value: QueryKeyRequestsResponse;
};
type querySignatureRequestsRequestParams = {
    value: QuerySignatureRequestsRequest;
};
type keyRequestParams = {
    value: KeyRequest;
};
type msgUpdateSpaceParams = {
    value: MsgUpdateSpace;
};
type msgFulfilSignatureRequestResponseParams = {
    value: MsgFulfilSignatureRequestResponse;
};
type queryKeychainByIdRequestParams = {
    value: QueryKeychainByIdRequest;
};
type signRequestParams = {
    value: SignRequest;
};
type msgNewSignTransactionRequestParams = {
    value: MsgNewSignTransactionRequest;
};
type paramsParams = {
    value: Params;
};
type queryKeyRequestsRequestParams = {
    value: QueryKeyRequestsRequest;
};
type spaceParams = {
    value: Space;
};
type msgNewSpaceParams = {
    value: MsgNewSpace;
};
type msgUpdateKeychainResponseParams = {
    value: MsgUpdateKeychainResponse;
};
type msgNewSignTransactionRequestResponseParams = {
    value: MsgNewSignTransactionRequestResponse;
};
type querySpaceByIdResponseParams = {
    value: QuerySpaceByIdResponse;
};
type walletKeyResponseParams = {
    value: WalletKeyResponse;
};
type querySignatureRequestsResponseParams = {
    value: QuerySignatureRequestsResponse;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type querySpacesResponseParams = {
    value: QuerySpacesResponse;
};
type signTransactionRequestResponseParams = {
    value: SignTransactionRequestResponse;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type metadataEthereumParams = {
    value: MetadataEthereum;
};
type querySpacesByOwnerRequestParams = {
    value: QuerySpacesByOwnerRequest;
};
type querySignatureRequestByIdRequestParams = {
    value: QuerySignatureRequestByIdRequest;
};
type msgAddSpaceOwnerResponseParams = {
    value: MsgAddSpaceOwnerResponse;
};
type msgFulfilSignatureRequestParams = {
    value: MsgFulfilSignatureRequest;
};
type genesisStateParams = {
    value: GenesisState;
};
type keyParams = {
    value: Key;
};
type msgNewKeyRequestResponseParams = {
    value: MsgNewKeyRequestResponse;
};
type querySignTransactionRequestsRequestParams = {
    value: QuerySignTransactionRequestsRequest;
};
type querySignTransactionRequestsResponseParams = {
    value: QuerySignTransactionRequestsResponse;
};
type msgNewKeychainResponseParams = {
    value: MsgNewKeychainResponse;
};
type msgNewSignatureRequestParams = {
    value: MsgNewSignatureRequest;
};
type querySpacesRequestParams = {
    value: QuerySpacesRequest;
};
type queryKeysResponseParams = {
    value: QueryKeysResponse;
};
type querySignatureRequestByIdResponseParams = {
    value: QuerySignatureRequestByIdResponse;
};
type msgSignedDataParams = {
    value: MsgSignedData;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type queryKeychainsRequestParams = {
    value: QueryKeychainsRequest;
};
type signTransactionRequestParams = {
    value: SignTransactionRequest;
};
type msgNewSpaceResponseParams = {
    value: MsgNewSpaceResponse;
};
type msgRemoveSpaceOwnerParams = {
    value: MsgRemoveSpaceOwner;
};
type msgNewKeyParams = {
    value: MsgNewKey;
};
type queryKeysRequestParams = {
    value: QueryKeysRequest;
};
type msgRemoveSpaceOwnerResponseParams = {
    value: MsgRemoveSpaceOwnerResponse;
};
type msgNewKeychainParams = {
    value: MsgNewKeychain;
};
type msgUpdateKeychainParams = {
    value: MsgUpdateKeychain;
};
type msgUpdateKeyRequestParams = {
    value: MsgUpdateKeyRequest;
};
type queryKeyRequestByIdRequestParams = {
    value: QueryKeyRequestByIdRequest;
};
type querySignTransactionRequestByIdRequestParams = {
    value: QuerySignTransactionRequestByIdRequest;
};
type querySignTransactionRequestByIdResponseParams = {
    value: QuerySignTransactionRequestByIdResponse;
};
type msgAddSpaceOwnerParams = {
    value: MsgAddSpaceOwner;
};
type msgUpdateSpaceResponseParams = {
    value: MsgUpdateSpaceResponse;
};
type msgNewKeyRequestParams = {
    value: MsgNewKeyRequest;
};
type querySpaceByIdRequestParams = {
    value: QuerySpaceByIdRequest;
};
type queryKeychainByIdResponseParams = {
    value: QueryKeychainByIdResponse;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type keychainFeesParams = {
    value: KeychainFees;
};
type msgUpdateKeyRequestResponseParams = {
    value: MsgUpdateKeyRequestResponse;
};
type msgNewSignatureRequestResponseParams = {
    value: MsgNewSignatureRequestResponse;
};
type queryKeychainsResponseParams = {
    value: QueryKeychainsResponse;
};
type keyResponseParams = {
    value: KeyResponse;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgAddKeychainParty({ value, fee, memo }: sendMsgAddKeychainPartyParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestByIdResponse({ value, fee, memo }: sendQueryKeyRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendKeychain({ value, fee, memo }: sendKeychainParams): Promise<DeliverTxResponse>;
    sendMsgAddKeychainPartyResponse({ value, fee, memo }: sendMsgAddKeychainPartyResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestsResponse({ value, fee, memo }: sendQueryKeyRequestsResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestsRequest({ value, fee, memo }: sendQuerySignatureRequestsRequestParams): Promise<DeliverTxResponse>;
    sendKeyRequest({ value, fee, memo }: sendKeyRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateSpace({ value, fee, memo }: sendMsgUpdateSpaceParams): Promise<DeliverTxResponse>;
    sendMsgFulfilSignatureRequestResponse({ value, fee, memo }: sendMsgFulfilSignatureRequestResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeychainByIdRequest({ value, fee, memo }: sendQueryKeychainByIdRequestParams): Promise<DeliverTxResponse>;
    sendSignRequest({ value, fee, memo }: sendSignRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewSignTransactionRequest({ value, fee, memo }: sendMsgNewSignTransactionRequestParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestsRequest({ value, fee, memo }: sendQueryKeyRequestsRequestParams): Promise<DeliverTxResponse>;
    sendSpace({ value, fee, memo }: sendSpaceParams): Promise<DeliverTxResponse>;
    sendMsgNewSpace({ value, fee, memo }: sendMsgNewSpaceParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeychainResponse({ value, fee, memo }: sendMsgUpdateKeychainResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewSignTransactionRequestResponse({ value, fee, memo }: sendMsgNewSignTransactionRequestResponseParams): Promise<DeliverTxResponse>;
    sendQuerySpaceByIdResponse({ value, fee, memo }: sendQuerySpaceByIdResponseParams): Promise<DeliverTxResponse>;
    sendWalletKeyResponse({ value, fee, memo }: sendWalletKeyResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestsResponse({ value, fee, memo }: sendQuerySignatureRequestsResponseParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendQuerySpacesResponse({ value, fee, memo }: sendQuerySpacesResponseParams): Promise<DeliverTxResponse>;
    sendSignTransactionRequestResponse({ value, fee, memo }: sendSignTransactionRequestResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendMetadataEthereum({ value, fee, memo }: sendMetadataEthereumParams): Promise<DeliverTxResponse>;
    sendQuerySpacesByOwnerRequest({ value, fee, memo }: sendQuerySpacesByOwnerRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestByIdRequest({ value, fee, memo }: sendQuerySignatureRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendMsgAddSpaceOwnerResponse({ value, fee, memo }: sendMsgAddSpaceOwnerResponseParams): Promise<DeliverTxResponse>;
    sendMsgFulfilSignatureRequest({ value, fee, memo }: sendMsgFulfilSignatureRequestParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendKey({ value, fee, memo }: sendKeyParams): Promise<DeliverTxResponse>;
    sendMsgNewKeyRequestResponse({ value, fee, memo }: sendMsgNewKeyRequestResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestsRequest({ value, fee, memo }: sendQuerySignTransactionRequestsRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestsResponse({ value, fee, memo }: sendQuerySignTransactionRequestsResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewKeychainResponse({ value, fee, memo }: sendMsgNewKeychainResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewSignatureRequest({ value, fee, memo }: sendMsgNewSignatureRequestParams): Promise<DeliverTxResponse>;
    sendQuerySpacesRequest({ value, fee, memo }: sendQuerySpacesRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeysResponse({ value, fee, memo }: sendQueryKeysResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestByIdResponse({ value, fee, memo }: sendQuerySignatureRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgSignedData({ value, fee, memo }: sendMsgSignedDataParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeychainsRequest({ value, fee, memo }: sendQueryKeychainsRequestParams): Promise<DeliverTxResponse>;
    sendSignTransactionRequest({ value, fee, memo }: sendSignTransactionRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewSpaceResponse({ value, fee, memo }: sendMsgNewSpaceResponseParams): Promise<DeliverTxResponse>;
    sendMsgRemoveSpaceOwner({ value, fee, memo }: sendMsgRemoveSpaceOwnerParams): Promise<DeliverTxResponse>;
    sendMsgNewKey({ value, fee, memo }: sendMsgNewKeyParams): Promise<DeliverTxResponse>;
    sendQueryKeysRequest({ value, fee, memo }: sendQueryKeysRequestParams): Promise<DeliverTxResponse>;
    sendMsgRemoveSpaceOwnerResponse({ value, fee, memo }: sendMsgRemoveSpaceOwnerResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewKeychain({ value, fee, memo }: sendMsgNewKeychainParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeychain({ value, fee, memo }: sendMsgUpdateKeychainParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeyRequest({ value, fee, memo }: sendMsgUpdateKeyRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestByIdRequest({ value, fee, memo }: sendQueryKeyRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestByIdRequest({ value, fee, memo }: sendQuerySignTransactionRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestByIdResponse({ value, fee, memo }: sendQuerySignTransactionRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgAddSpaceOwner({ value, fee, memo }: sendMsgAddSpaceOwnerParams): Promise<DeliverTxResponse>;
    sendMsgUpdateSpaceResponse({ value, fee, memo }: sendMsgUpdateSpaceResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewKeyRequest({ value, fee, memo }: sendMsgNewKeyRequestParams): Promise<DeliverTxResponse>;
    sendQuerySpaceByIdRequest({ value, fee, memo }: sendQuerySpaceByIdRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeychainByIdResponse({ value, fee, memo }: sendQueryKeychainByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendKeychainFees({ value, fee, memo }: sendKeychainFeesParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeyRequestResponse({ value, fee, memo }: sendMsgUpdateKeyRequestResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewSignatureRequestResponse({ value, fee, memo }: sendMsgNewSignatureRequestResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeychainsResponse({ value, fee, memo }: sendQueryKeychainsResponseParams): Promise<DeliverTxResponse>;
    sendKeyResponse({ value, fee, memo }: sendKeyResponseParams): Promise<DeliverTxResponse>;
    msgAddKeychainParty({ value }: msgAddKeychainPartyParams): EncodeObject;
    queryKeyRequestByIdResponse({ value }: queryKeyRequestByIdResponseParams): EncodeObject;
    keychain({ value }: keychainParams): EncodeObject;
    msgAddKeychainPartyResponse({ value }: msgAddKeychainPartyResponseParams): EncodeObject;
    queryKeyRequestsResponse({ value }: queryKeyRequestsResponseParams): EncodeObject;
    querySignatureRequestsRequest({ value }: querySignatureRequestsRequestParams): EncodeObject;
    keyRequest({ value }: keyRequestParams): EncodeObject;
    msgUpdateSpace({ value }: msgUpdateSpaceParams): EncodeObject;
    msgFulfilSignatureRequestResponse({ value }: msgFulfilSignatureRequestResponseParams): EncodeObject;
    queryKeychainByIdRequest({ value }: queryKeychainByIdRequestParams): EncodeObject;
    signRequest({ value }: signRequestParams): EncodeObject;
    msgNewSignTransactionRequest({ value }: msgNewSignTransactionRequestParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    queryKeyRequestsRequest({ value }: queryKeyRequestsRequestParams): EncodeObject;
    space({ value }: spaceParams): EncodeObject;
    msgNewSpace({ value }: msgNewSpaceParams): EncodeObject;
    msgUpdateKeychainResponse({ value }: msgUpdateKeychainResponseParams): EncodeObject;
    msgNewSignTransactionRequestResponse({ value }: msgNewSignTransactionRequestResponseParams): EncodeObject;
    querySpaceByIdResponse({ value }: querySpaceByIdResponseParams): EncodeObject;
    walletKeyResponse({ value }: walletKeyResponseParams): EncodeObject;
    querySignatureRequestsResponse({ value }: querySignatureRequestsResponseParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    querySpacesResponse({ value }: querySpacesResponseParams): EncodeObject;
    signTransactionRequestResponse({ value }: signTransactionRequestResponseParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    metadataEthereum({ value }: metadataEthereumParams): EncodeObject;
    querySpacesByOwnerRequest({ value }: querySpacesByOwnerRequestParams): EncodeObject;
    querySignatureRequestByIdRequest({ value }: querySignatureRequestByIdRequestParams): EncodeObject;
    msgAddSpaceOwnerResponse({ value }: msgAddSpaceOwnerResponseParams): EncodeObject;
    msgFulfilSignatureRequest({ value }: msgFulfilSignatureRequestParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    key({ value }: keyParams): EncodeObject;
    msgNewKeyRequestResponse({ value }: msgNewKeyRequestResponseParams): EncodeObject;
    querySignTransactionRequestsRequest({ value }: querySignTransactionRequestsRequestParams): EncodeObject;
    querySignTransactionRequestsResponse({ value }: querySignTransactionRequestsResponseParams): EncodeObject;
    msgNewKeychainResponse({ value }: msgNewKeychainResponseParams): EncodeObject;
    msgNewSignatureRequest({ value }: msgNewSignatureRequestParams): EncodeObject;
    querySpacesRequest({ value }: querySpacesRequestParams): EncodeObject;
    queryKeysResponse({ value }: queryKeysResponseParams): EncodeObject;
    querySignatureRequestByIdResponse({ value }: querySignatureRequestByIdResponseParams): EncodeObject;
    msgSignedData({ value }: msgSignedDataParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    queryKeychainsRequest({ value }: queryKeychainsRequestParams): EncodeObject;
    signTransactionRequest({ value }: signTransactionRequestParams): EncodeObject;
    msgNewSpaceResponse({ value }: msgNewSpaceResponseParams): EncodeObject;
    msgRemoveSpaceOwner({ value }: msgRemoveSpaceOwnerParams): EncodeObject;
    msgNewKey({ value }: msgNewKeyParams): EncodeObject;
    queryKeysRequest({ value }: queryKeysRequestParams): EncodeObject;
    msgRemoveSpaceOwnerResponse({ value }: msgRemoveSpaceOwnerResponseParams): EncodeObject;
    msgNewKeychain({ value }: msgNewKeychainParams): EncodeObject;
    msgUpdateKeychain({ value }: msgUpdateKeychainParams): EncodeObject;
    msgUpdateKeyRequest({ value }: msgUpdateKeyRequestParams): EncodeObject;
    queryKeyRequestByIdRequest({ value }: queryKeyRequestByIdRequestParams): EncodeObject;
    querySignTransactionRequestByIdRequest({ value }: querySignTransactionRequestByIdRequestParams): EncodeObject;
    querySignTransactionRequestByIdResponse({ value }: querySignTransactionRequestByIdResponseParams): EncodeObject;
    msgAddSpaceOwner({ value }: msgAddSpaceOwnerParams): EncodeObject;
    msgUpdateSpaceResponse({ value }: msgUpdateSpaceResponseParams): EncodeObject;
    msgNewKeyRequest({ value }: msgNewKeyRequestParams): EncodeObject;
    querySpaceByIdRequest({ value }: querySpaceByIdRequestParams): EncodeObject;
    queryKeychainByIdResponse({ value }: queryKeychainByIdResponseParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    keychainFees({ value }: keychainFeesParams): EncodeObject;
    msgUpdateKeyRequestResponse({ value }: msgUpdateKeyRequestResponseParams): EncodeObject;
    msgNewSignatureRequestResponse({ value }: msgNewSignatureRequestResponseParams): EncodeObject;
    queryKeychainsResponse({ value }: queryKeychainsResponseParams): EncodeObject;
    keyResponse({ value }: keyResponseParams): EncodeObject;
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
