import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgNewKeychain } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateKeychain } from "./types/warden/warden/v1beta2/tx";
import { Space } from "./types/warden/warden/v1beta2/space";
import { MsgUpdateKeychainResponse } from "./types/warden/warden/v1beta2/tx";
import { QuerySpacesByOwnerRequest } from "./types/warden/warden/v1beta2/query";
import { QueryKeyRequestsResponse } from "./types/warden/warden/v1beta2/query";
import { SignTransactionRequestResponse } from "./types/warden/warden/v1beta2/query";
import { MsgRemoveSpaceOwner } from "./types/warden/warden/v1beta2/tx";
import { KeyRequest } from "./types/warden/warden/v1beta2/key";
import { MsgNewSignatureRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { QueryKeychainsRequest } from "./types/warden/warden/v1beta2/query";
import { QueryKeychainByIdRequest } from "./types/warden/warden/v1beta2/query";
import { MsgRemoveSpaceOwnerResponse } from "./types/warden/warden/v1beta2/tx";
import { QueryKeychainsResponse } from "./types/warden/warden/v1beta2/query";
import { QueryKeyRequestsRequest } from "./types/warden/warden/v1beta2/query";
import { MsgNewKeyRequest } from "./types/warden/warden/v1beta2/tx";
import { MsgAddSpaceOwner } from "./types/warden/warden/v1beta2/tx";
import { MsgNewSignatureRequest } from "./types/warden/warden/v1beta2/tx";
import { QuerySpacesResponse } from "./types/warden/warden/v1beta2/query";
import { QuerySignTransactionRequestByIdRequest } from "./types/warden/warden/v1beta2/query";
import { Key } from "./types/warden/warden/v1beta2/key";
import { KeychainFees } from "./types/warden/warden/v1beta2/keychain";
import { QueryKeychainByIdResponse } from "./types/warden/warden/v1beta2/query";
import { MsgNewKeyRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgAddKeychainPartyResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateSpaceResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgNewSignTransactionRequest } from "./types/warden/warden/v1beta2/tx";
import { Params } from "./types/warden/warden/v1beta2/params";
import { QuerySpaceByIdRequest } from "./types/warden/warden/v1beta2/query";
import { QueryKeyRequestByIdRequest } from "./types/warden/warden/v1beta2/query";
import { MsgNewSpace } from "./types/warden/warden/v1beta2/tx";
import { WalletKeyResponse } from "./types/warden/warden/v1beta2/query";
import { MsgUpdateKeyRequest } from "./types/warden/warden/v1beta2/tx";
import { MsgNewSignTransactionRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { QueryParamsResponse } from "./types/warden/warden/v1beta2/query";
import { QuerySignatureRequestByIdRequest } from "./types/warden/warden/v1beta2/query";
import { MsgNewKey } from "./types/warden/warden/v1beta2/tx";
import { MsgAddKeychainParty } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateKeyRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { QuerySignTransactionRequestsRequest } from "./types/warden/warden/v1beta2/query";
import { QuerySignTransactionRequestsResponse } from "./types/warden/warden/v1beta2/query";
import { Keychain } from "./types/warden/warden/v1beta2/keychain";
import { QuerySignatureRequestsResponse } from "./types/warden/warden/v1beta2/query";
import { QueryParamsRequest } from "./types/warden/warden/v1beta2/query";
import { MetadataEthereum } from "./types/warden/warden/v1beta2/tx";
import { MsgFulfilSignatureRequest } from "./types/warden/warden/v1beta2/tx";
import { MsgSignedData } from "./types/warden/warden/v1beta2/tx";
import { QueryKeysRequest } from "./types/warden/warden/v1beta2/query";
import { GenesisState } from "./types/warden/warden/v1beta2/genesis";
import { MsgAddSpaceOwnerResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateSpace } from "./types/warden/warden/v1beta2/tx";
import { QuerySpacesRequest } from "./types/warden/warden/v1beta2/query";
import { QueryKeysResponse } from "./types/warden/warden/v1beta2/query";
import { KeyResponse } from "./types/warden/warden/v1beta2/query";
import { SignTransactionRequest } from "./types/warden/warden/v1beta2/signature";
import { MsgNewSpaceResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgNewKeychainResponse } from "./types/warden/warden/v1beta2/tx";
import { QuerySpaceByIdResponse } from "./types/warden/warden/v1beta2/query";
import { QuerySignatureRequestByIdResponse } from "./types/warden/warden/v1beta2/query";
import { SignRequest } from "./types/warden/warden/v1beta2/signature";
import { MsgUpdateParamsResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgFulfilSignatureRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { QueryKeyRequestByIdResponse } from "./types/warden/warden/v1beta2/query";
import { QuerySignatureRequestsRequest } from "./types/warden/warden/v1beta2/query";
import { QuerySignTransactionRequestByIdResponse } from "./types/warden/warden/v1beta2/query";
import { MsgUpdateParams } from "./types/warden/warden/v1beta2/tx";
export { MsgNewKeychain, MsgUpdateKeychain, Space, MsgUpdateKeychainResponse, QuerySpacesByOwnerRequest, QueryKeyRequestsResponse, SignTransactionRequestResponse, MsgRemoveSpaceOwner, KeyRequest, MsgNewSignatureRequestResponse, QueryKeychainsRequest, QueryKeychainByIdRequest, MsgRemoveSpaceOwnerResponse, QueryKeychainsResponse, QueryKeyRequestsRequest, MsgNewKeyRequest, MsgAddSpaceOwner, MsgNewSignatureRequest, QuerySpacesResponse, QuerySignTransactionRequestByIdRequest, Key, KeychainFees, QueryKeychainByIdResponse, MsgNewKeyRequestResponse, MsgAddKeychainPartyResponse, MsgUpdateSpaceResponse, MsgNewSignTransactionRequest, Params, QuerySpaceByIdRequest, QueryKeyRequestByIdRequest, MsgNewSpace, WalletKeyResponse, MsgUpdateKeyRequest, MsgNewSignTransactionRequestResponse, QueryParamsResponse, QuerySignatureRequestByIdRequest, MsgNewKey, MsgAddKeychainParty, MsgUpdateKeyRequestResponse, QuerySignTransactionRequestsRequest, QuerySignTransactionRequestsResponse, Keychain, QuerySignatureRequestsResponse, QueryParamsRequest, MetadataEthereum, MsgFulfilSignatureRequest, MsgSignedData, QueryKeysRequest, GenesisState, MsgAddSpaceOwnerResponse, MsgUpdateSpace, QuerySpacesRequest, QueryKeysResponse, KeyResponse, SignTransactionRequest, MsgNewSpaceResponse, MsgNewKeychainResponse, QuerySpaceByIdResponse, QuerySignatureRequestByIdResponse, SignRequest, MsgUpdateParamsResponse, MsgFulfilSignatureRequestResponse, QueryKeyRequestByIdResponse, QuerySignatureRequestsRequest, QuerySignTransactionRequestByIdResponse, MsgUpdateParams };
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
type sendSpaceParams = {
    value: Space;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeychainResponseParams = {
    value: MsgUpdateKeychainResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesByOwnerRequestParams = {
    value: QuerySpacesByOwnerRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestsResponseParams = {
    value: QueryKeyRequestsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendSignTransactionRequestResponseParams = {
    value: SignTransactionRequestResponse;
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
type sendMsgNewSignatureRequestResponseParams = {
    value: MsgNewSignatureRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainsRequestParams = {
    value: QueryKeychainsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainByIdRequestParams = {
    value: QueryKeychainByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRemoveSpaceOwnerResponseParams = {
    value: MsgRemoveSpaceOwnerResponse;
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
type sendMsgNewKeyRequestParams = {
    value: MsgNewKeyRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddSpaceOwnerParams = {
    value: MsgAddSpaceOwner;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewSignatureRequestParams = {
    value: MsgNewSignatureRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpacesResponseParams = {
    value: QuerySpacesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestByIdRequestParams = {
    value: QuerySignTransactionRequestByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendKeyParams = {
    value: Key;
    fee?: StdFee;
    memo?: string;
};
type sendKeychainFeesParams = {
    value: KeychainFees;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeychainByIdResponseParams = {
    value: QueryKeychainByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewKeyRequestResponseParams = {
    value: MsgNewKeyRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddKeychainPartyResponseParams = {
    value: MsgAddKeychainPartyResponse;
    fee?: StdFee;
    memo?: string;
};
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
type sendParamsParams = {
    value: Params;
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
type sendMsgNewSpaceParams = {
    value: MsgNewSpace;
    fee?: StdFee;
    memo?: string;
};
type sendWalletKeyResponseParams = {
    value: WalletKeyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyRequestParams = {
    value: MsgUpdateKeyRequest;
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
type sendMsgAddKeychainPartyParams = {
    value: MsgAddKeychainParty;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateKeyRequestResponseParams = {
    value: MsgUpdateKeyRequestResponse;
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
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMetadataEthereumParams = {
    value: MetadataEthereum;
    fee?: StdFee;
    memo?: string;
};
type sendMsgFulfilSignatureRequestParams = {
    value: MsgFulfilSignatureRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSignedDataParams = {
    value: MsgSignedData;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeysRequestParams = {
    value: QueryKeysRequest;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAddSpaceOwnerResponseParams = {
    value: MsgAddSpaceOwnerResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateSpaceParams = {
    value: MsgUpdateSpace;
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
type sendKeyResponseParams = {
    value: KeyResponse;
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
type sendMsgNewKeychainResponseParams = {
    value: MsgNewKeychainResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySpaceByIdResponseParams = {
    value: QuerySpaceByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestByIdResponseParams = {
    value: QuerySignatureRequestByIdResponse;
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
type sendMsgFulfilSignatureRequestResponseParams = {
    value: MsgFulfilSignatureRequestResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryKeyRequestByIdResponseParams = {
    value: QueryKeyRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignatureRequestsRequestParams = {
    value: QuerySignatureRequestsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySignTransactionRequestByIdResponseParams = {
    value: QuerySignTransactionRequestByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type msgNewKeychainParams = {
    value: MsgNewKeychain;
};
type msgUpdateKeychainParams = {
    value: MsgUpdateKeychain;
};
type spaceParams = {
    value: Space;
};
type msgUpdateKeychainResponseParams = {
    value: MsgUpdateKeychainResponse;
};
type querySpacesByOwnerRequestParams = {
    value: QuerySpacesByOwnerRequest;
};
type queryKeyRequestsResponseParams = {
    value: QueryKeyRequestsResponse;
};
type signTransactionRequestResponseParams = {
    value: SignTransactionRequestResponse;
};
type msgRemoveSpaceOwnerParams = {
    value: MsgRemoveSpaceOwner;
};
type keyRequestParams = {
    value: KeyRequest;
};
type msgNewSignatureRequestResponseParams = {
    value: MsgNewSignatureRequestResponse;
};
type queryKeychainsRequestParams = {
    value: QueryKeychainsRequest;
};
type queryKeychainByIdRequestParams = {
    value: QueryKeychainByIdRequest;
};
type msgRemoveSpaceOwnerResponseParams = {
    value: MsgRemoveSpaceOwnerResponse;
};
type queryKeychainsResponseParams = {
    value: QueryKeychainsResponse;
};
type queryKeyRequestsRequestParams = {
    value: QueryKeyRequestsRequest;
};
type msgNewKeyRequestParams = {
    value: MsgNewKeyRequest;
};
type msgAddSpaceOwnerParams = {
    value: MsgAddSpaceOwner;
};
type msgNewSignatureRequestParams = {
    value: MsgNewSignatureRequest;
};
type querySpacesResponseParams = {
    value: QuerySpacesResponse;
};
type querySignTransactionRequestByIdRequestParams = {
    value: QuerySignTransactionRequestByIdRequest;
};
type keyParams = {
    value: Key;
};
type keychainFeesParams = {
    value: KeychainFees;
};
type queryKeychainByIdResponseParams = {
    value: QueryKeychainByIdResponse;
};
type msgNewKeyRequestResponseParams = {
    value: MsgNewKeyRequestResponse;
};
type msgAddKeychainPartyResponseParams = {
    value: MsgAddKeychainPartyResponse;
};
type msgUpdateSpaceResponseParams = {
    value: MsgUpdateSpaceResponse;
};
type msgNewSignTransactionRequestParams = {
    value: MsgNewSignTransactionRequest;
};
type paramsParams = {
    value: Params;
};
type querySpaceByIdRequestParams = {
    value: QuerySpaceByIdRequest;
};
type queryKeyRequestByIdRequestParams = {
    value: QueryKeyRequestByIdRequest;
};
type msgNewSpaceParams = {
    value: MsgNewSpace;
};
type walletKeyResponseParams = {
    value: WalletKeyResponse;
};
type msgUpdateKeyRequestParams = {
    value: MsgUpdateKeyRequest;
};
type msgNewSignTransactionRequestResponseParams = {
    value: MsgNewSignTransactionRequestResponse;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type querySignatureRequestByIdRequestParams = {
    value: QuerySignatureRequestByIdRequest;
};
type msgNewKeyParams = {
    value: MsgNewKey;
};
type msgAddKeychainPartyParams = {
    value: MsgAddKeychainParty;
};
type msgUpdateKeyRequestResponseParams = {
    value: MsgUpdateKeyRequestResponse;
};
type querySignTransactionRequestsRequestParams = {
    value: QuerySignTransactionRequestsRequest;
};
type querySignTransactionRequestsResponseParams = {
    value: QuerySignTransactionRequestsResponse;
};
type keychainParams = {
    value: Keychain;
};
type querySignatureRequestsResponseParams = {
    value: QuerySignatureRequestsResponse;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type metadataEthereumParams = {
    value: MetadataEthereum;
};
type msgFulfilSignatureRequestParams = {
    value: MsgFulfilSignatureRequest;
};
type msgSignedDataParams = {
    value: MsgSignedData;
};
type queryKeysRequestParams = {
    value: QueryKeysRequest;
};
type genesisStateParams = {
    value: GenesisState;
};
type msgAddSpaceOwnerResponseParams = {
    value: MsgAddSpaceOwnerResponse;
};
type msgUpdateSpaceParams = {
    value: MsgUpdateSpace;
};
type querySpacesRequestParams = {
    value: QuerySpacesRequest;
};
type queryKeysResponseParams = {
    value: QueryKeysResponse;
};
type keyResponseParams = {
    value: KeyResponse;
};
type signTransactionRequestParams = {
    value: SignTransactionRequest;
};
type msgNewSpaceResponseParams = {
    value: MsgNewSpaceResponse;
};
type msgNewKeychainResponseParams = {
    value: MsgNewKeychainResponse;
};
type querySpaceByIdResponseParams = {
    value: QuerySpaceByIdResponse;
};
type querySignatureRequestByIdResponseParams = {
    value: QuerySignatureRequestByIdResponse;
};
type signRequestParams = {
    value: SignRequest;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type msgFulfilSignatureRequestResponseParams = {
    value: MsgFulfilSignatureRequestResponse;
};
type queryKeyRequestByIdResponseParams = {
    value: QueryKeyRequestByIdResponse;
};
type querySignatureRequestsRequestParams = {
    value: QuerySignatureRequestsRequest;
};
type querySignTransactionRequestByIdResponseParams = {
    value: QuerySignTransactionRequestByIdResponse;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgNewKeychain({ value, fee, memo }: sendMsgNewKeychainParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeychain({ value, fee, memo }: sendMsgUpdateKeychainParams): Promise<DeliverTxResponse>;
    sendSpace({ value, fee, memo }: sendSpaceParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeychainResponse({ value, fee, memo }: sendMsgUpdateKeychainResponseParams): Promise<DeliverTxResponse>;
    sendQuerySpacesByOwnerRequest({ value, fee, memo }: sendQuerySpacesByOwnerRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestsResponse({ value, fee, memo }: sendQueryKeyRequestsResponseParams): Promise<DeliverTxResponse>;
    sendSignTransactionRequestResponse({ value, fee, memo }: sendSignTransactionRequestResponseParams): Promise<DeliverTxResponse>;
    sendMsgRemoveSpaceOwner({ value, fee, memo }: sendMsgRemoveSpaceOwnerParams): Promise<DeliverTxResponse>;
    sendKeyRequest({ value, fee, memo }: sendKeyRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewSignatureRequestResponse({ value, fee, memo }: sendMsgNewSignatureRequestResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeychainsRequest({ value, fee, memo }: sendQueryKeychainsRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeychainByIdRequest({ value, fee, memo }: sendQueryKeychainByIdRequestParams): Promise<DeliverTxResponse>;
    sendMsgRemoveSpaceOwnerResponse({ value, fee, memo }: sendMsgRemoveSpaceOwnerResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeychainsResponse({ value, fee, memo }: sendQueryKeychainsResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestsRequest({ value, fee, memo }: sendQueryKeyRequestsRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewKeyRequest({ value, fee, memo }: sendMsgNewKeyRequestParams): Promise<DeliverTxResponse>;
    sendMsgAddSpaceOwner({ value, fee, memo }: sendMsgAddSpaceOwnerParams): Promise<DeliverTxResponse>;
    sendMsgNewSignatureRequest({ value, fee, memo }: sendMsgNewSignatureRequestParams): Promise<DeliverTxResponse>;
    sendQuerySpacesResponse({ value, fee, memo }: sendQuerySpacesResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestByIdRequest({ value, fee, memo }: sendQuerySignTransactionRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendKey({ value, fee, memo }: sendKeyParams): Promise<DeliverTxResponse>;
    sendKeychainFees({ value, fee, memo }: sendKeychainFeesParams): Promise<DeliverTxResponse>;
    sendQueryKeychainByIdResponse({ value, fee, memo }: sendQueryKeychainByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewKeyRequestResponse({ value, fee, memo }: sendMsgNewKeyRequestResponseParams): Promise<DeliverTxResponse>;
    sendMsgAddKeychainPartyResponse({ value, fee, memo }: sendMsgAddKeychainPartyResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateSpaceResponse({ value, fee, memo }: sendMsgUpdateSpaceResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewSignTransactionRequest({ value, fee, memo }: sendMsgNewSignTransactionRequestParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendQuerySpaceByIdRequest({ value, fee, memo }: sendQuerySpaceByIdRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestByIdRequest({ value, fee, memo }: sendQueryKeyRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewSpace({ value, fee, memo }: sendMsgNewSpaceParams): Promise<DeliverTxResponse>;
    sendWalletKeyResponse({ value, fee, memo }: sendWalletKeyResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeyRequest({ value, fee, memo }: sendMsgUpdateKeyRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewSignTransactionRequestResponse({ value, fee, memo }: sendMsgNewSignTransactionRequestResponseParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestByIdRequest({ value, fee, memo }: sendQuerySignatureRequestByIdRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewKey({ value, fee, memo }: sendMsgNewKeyParams): Promise<DeliverTxResponse>;
    sendMsgAddKeychainParty({ value, fee, memo }: sendMsgAddKeychainPartyParams): Promise<DeliverTxResponse>;
    sendMsgUpdateKeyRequestResponse({ value, fee, memo }: sendMsgUpdateKeyRequestResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestsRequest({ value, fee, memo }: sendQuerySignTransactionRequestsRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestsResponse({ value, fee, memo }: sendQuerySignTransactionRequestsResponseParams): Promise<DeliverTxResponse>;
    sendKeychain({ value, fee, memo }: sendKeychainParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestsResponse({ value, fee, memo }: sendQuerySignatureRequestsResponseParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendMetadataEthereum({ value, fee, memo }: sendMetadataEthereumParams): Promise<DeliverTxResponse>;
    sendMsgFulfilSignatureRequest({ value, fee, memo }: sendMsgFulfilSignatureRequestParams): Promise<DeliverTxResponse>;
    sendMsgSignedData({ value, fee, memo }: sendMsgSignedDataParams): Promise<DeliverTxResponse>;
    sendQueryKeysRequest({ value, fee, memo }: sendQueryKeysRequestParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendMsgAddSpaceOwnerResponse({ value, fee, memo }: sendMsgAddSpaceOwnerResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateSpace({ value, fee, memo }: sendMsgUpdateSpaceParams): Promise<DeliverTxResponse>;
    sendQuerySpacesRequest({ value, fee, memo }: sendQuerySpacesRequestParams): Promise<DeliverTxResponse>;
    sendQueryKeysResponse({ value, fee, memo }: sendQueryKeysResponseParams): Promise<DeliverTxResponse>;
    sendKeyResponse({ value, fee, memo }: sendKeyResponseParams): Promise<DeliverTxResponse>;
    sendSignTransactionRequest({ value, fee, memo }: sendSignTransactionRequestParams): Promise<DeliverTxResponse>;
    sendMsgNewSpaceResponse({ value, fee, memo }: sendMsgNewSpaceResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewKeychainResponse({ value, fee, memo }: sendMsgNewKeychainResponseParams): Promise<DeliverTxResponse>;
    sendQuerySpaceByIdResponse({ value, fee, memo }: sendQuerySpaceByIdResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestByIdResponse({ value, fee, memo }: sendQuerySignatureRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendSignRequest({ value, fee, memo }: sendSignRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendMsgFulfilSignatureRequestResponse({ value, fee, memo }: sendMsgFulfilSignatureRequestResponseParams): Promise<DeliverTxResponse>;
    sendQueryKeyRequestByIdResponse({ value, fee, memo }: sendQueryKeyRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendQuerySignatureRequestsRequest({ value, fee, memo }: sendQuerySignatureRequestsRequestParams): Promise<DeliverTxResponse>;
    sendQuerySignTransactionRequestByIdResponse({ value, fee, memo }: sendQuerySignTransactionRequestByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    msgNewKeychain({ value }: msgNewKeychainParams): EncodeObject;
    msgUpdateKeychain({ value }: msgUpdateKeychainParams): EncodeObject;
    space({ value }: spaceParams): EncodeObject;
    msgUpdateKeychainResponse({ value }: msgUpdateKeychainResponseParams): EncodeObject;
    querySpacesByOwnerRequest({ value }: querySpacesByOwnerRequestParams): EncodeObject;
    queryKeyRequestsResponse({ value }: queryKeyRequestsResponseParams): EncodeObject;
    signTransactionRequestResponse({ value }: signTransactionRequestResponseParams): EncodeObject;
    msgRemoveSpaceOwner({ value }: msgRemoveSpaceOwnerParams): EncodeObject;
    keyRequest({ value }: keyRequestParams): EncodeObject;
    msgNewSignatureRequestResponse({ value }: msgNewSignatureRequestResponseParams): EncodeObject;
    queryKeychainsRequest({ value }: queryKeychainsRequestParams): EncodeObject;
    queryKeychainByIdRequest({ value }: queryKeychainByIdRequestParams): EncodeObject;
    msgRemoveSpaceOwnerResponse({ value }: msgRemoveSpaceOwnerResponseParams): EncodeObject;
    queryKeychainsResponse({ value }: queryKeychainsResponseParams): EncodeObject;
    queryKeyRequestsRequest({ value }: queryKeyRequestsRequestParams): EncodeObject;
    msgNewKeyRequest({ value }: msgNewKeyRequestParams): EncodeObject;
    msgAddSpaceOwner({ value }: msgAddSpaceOwnerParams): EncodeObject;
    msgNewSignatureRequest({ value }: msgNewSignatureRequestParams): EncodeObject;
    querySpacesResponse({ value }: querySpacesResponseParams): EncodeObject;
    querySignTransactionRequestByIdRequest({ value }: querySignTransactionRequestByIdRequestParams): EncodeObject;
    key({ value }: keyParams): EncodeObject;
    keychainFees({ value }: keychainFeesParams): EncodeObject;
    queryKeychainByIdResponse({ value }: queryKeychainByIdResponseParams): EncodeObject;
    msgNewKeyRequestResponse({ value }: msgNewKeyRequestResponseParams): EncodeObject;
    msgAddKeychainPartyResponse({ value }: msgAddKeychainPartyResponseParams): EncodeObject;
    msgUpdateSpaceResponse({ value }: msgUpdateSpaceResponseParams): EncodeObject;
    msgNewSignTransactionRequest({ value }: msgNewSignTransactionRequestParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    querySpaceByIdRequest({ value }: querySpaceByIdRequestParams): EncodeObject;
    queryKeyRequestByIdRequest({ value }: queryKeyRequestByIdRequestParams): EncodeObject;
    msgNewSpace({ value }: msgNewSpaceParams): EncodeObject;
    walletKeyResponse({ value }: walletKeyResponseParams): EncodeObject;
    msgUpdateKeyRequest({ value }: msgUpdateKeyRequestParams): EncodeObject;
    msgNewSignTransactionRequestResponse({ value }: msgNewSignTransactionRequestResponseParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    querySignatureRequestByIdRequest({ value }: querySignatureRequestByIdRequestParams): EncodeObject;
    msgNewKey({ value }: msgNewKeyParams): EncodeObject;
    msgAddKeychainParty({ value }: msgAddKeychainPartyParams): EncodeObject;
    msgUpdateKeyRequestResponse({ value }: msgUpdateKeyRequestResponseParams): EncodeObject;
    querySignTransactionRequestsRequest({ value }: querySignTransactionRequestsRequestParams): EncodeObject;
    querySignTransactionRequestsResponse({ value }: querySignTransactionRequestsResponseParams): EncodeObject;
    keychain({ value }: keychainParams): EncodeObject;
    querySignatureRequestsResponse({ value }: querySignatureRequestsResponseParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    metadataEthereum({ value }: metadataEthereumParams): EncodeObject;
    msgFulfilSignatureRequest({ value }: msgFulfilSignatureRequestParams): EncodeObject;
    msgSignedData({ value }: msgSignedDataParams): EncodeObject;
    queryKeysRequest({ value }: queryKeysRequestParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    msgAddSpaceOwnerResponse({ value }: msgAddSpaceOwnerResponseParams): EncodeObject;
    msgUpdateSpace({ value }: msgUpdateSpaceParams): EncodeObject;
    querySpacesRequest({ value }: querySpacesRequestParams): EncodeObject;
    queryKeysResponse({ value }: queryKeysResponseParams): EncodeObject;
    keyResponse({ value }: keyResponseParams): EncodeObject;
    signTransactionRequest({ value }: signTransactionRequestParams): EncodeObject;
    msgNewSpaceResponse({ value }: msgNewSpaceResponseParams): EncodeObject;
    msgNewKeychainResponse({ value }: msgNewKeychainResponseParams): EncodeObject;
    querySpaceByIdResponse({ value }: querySpaceByIdResponseParams): EncodeObject;
    querySignatureRequestByIdResponse({ value }: querySignatureRequestByIdResponseParams): EncodeObject;
    signRequest({ value }: signRequestParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    msgFulfilSignatureRequestResponse({ value }: msgFulfilSignatureRequestResponseParams): EncodeObject;
    queryKeyRequestByIdResponse({ value }: queryKeyRequestByIdResponseParams): EncodeObject;
    querySignatureRequestsRequest({ value }: querySignatureRequestsRequestParams): EncodeObject;
    querySignTransactionRequestByIdResponse({ value }: querySignTransactionRequestByIdResponseParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
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
