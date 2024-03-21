import { GeneratedType } from "@cosmjs/proto-signing";
import { SignRequest } from "./types/warden/warden/v1beta2/signature";
import { Space } from "./types/warden/warden/v1beta2/space";
import { MsgNewKey } from "./types/warden/warden/v1beta2/tx";
import { QueryKeyRequestsRequest } from "./types/warden/warden/v1beta2/query";
import { QueryKeyRequestByIdResponse } from "./types/warden/warden/v1beta2/query";
import { MsgNewSpaceResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgRemoveSpaceOwnerResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgNewKeychainResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateSpaceResponse } from "./types/warden/warden/v1beta2/tx";
import { Params } from "./types/warden/warden/v1beta2/params";
import { QuerySpaceByIdRequest } from "./types/warden/warden/v1beta2/query";
import { QuerySignTransactionRequestsRequest } from "./types/warden/warden/v1beta2/query";
import { QueryParamsRequest } from "./types/warden/warden/v1beta2/query";
import { QueryKeychainByIdRequest } from "./types/warden/warden/v1beta2/query";
import { QueryKeysRequest } from "./types/warden/warden/v1beta2/query";
import { QuerySignatureRequestsResponse } from "./types/warden/warden/v1beta2/query";
import { SignTransactionRequestResponse } from "./types/warden/warden/v1beta2/query";
import { MsgAddSpaceOwnerResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateKeyRequest } from "./types/warden/warden/v1beta2/tx";
import { KeyRequest } from "./types/warden/warden/v1beta2/key";
import { QuerySpacesResponse } from "./types/warden/warden/v1beta2/query";
import { QueryKeychainByIdResponse } from "./types/warden/warden/v1beta2/query";
import { MsgFulfilSignatureRequest } from "./types/warden/warden/v1beta2/tx";
import { MsgFulfilSignatureRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { SignTransactionRequest } from "./types/warden/warden/v1beta2/signature";
import { QueryParamsResponse } from "./types/warden/warden/v1beta2/query";
import { QuerySignTransactionRequestByIdRequest } from "./types/warden/warden/v1beta2/query";
import { MsgAddSpaceOwner } from "./types/warden/warden/v1beta2/tx";
import { MsgNewKeychain } from "./types/warden/warden/v1beta2/tx";
import { MsgNewSignatureRequest } from "./types/warden/warden/v1beta2/tx";
import { QuerySpacesRequest } from "./types/warden/warden/v1beta2/query";
import { QuerySpacesByOwnerRequest } from "./types/warden/warden/v1beta2/query";
import { QuerySpaceByIdResponse } from "./types/warden/warden/v1beta2/query";
import { MsgUpdateSpace } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateKeychainResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgRemoveSpaceOwner } from "./types/warden/warden/v1beta2/tx";
import { MsgAddKeychainPartyResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateKeychain } from "./types/warden/warden/v1beta2/tx";
import { QueryKeychainsRequest } from "./types/warden/warden/v1beta2/query";
import { QueryKeyRequestByIdRequest } from "./types/warden/warden/v1beta2/query";
import { QueryKeysResponse } from "./types/warden/warden/v1beta2/query";
import { MsgNewKeyRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgNewSpace } from "./types/warden/warden/v1beta2/tx";
import { MsgNewSignTransactionRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgNewSignatureRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgNewSignTransactionRequest } from "./types/warden/warden/v1beta2/tx";
import { QuerySignatureRequestByIdResponse } from "./types/warden/warden/v1beta2/query";
import { KeychainFees } from "./types/warden/warden/v1beta2/keychain";
import { MsgUpdateParamsResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgSignedData } from "./types/warden/warden/v1beta2/tx";
import { QueryKeychainsResponse } from "./types/warden/warden/v1beta2/query";
import { QuerySignTransactionRequestByIdResponse } from "./types/warden/warden/v1beta2/query";
import { Keychain } from "./types/warden/warden/v1beta2/keychain";
import { MsgUpdateKeyRequestResponse } from "./types/warden/warden/v1beta2/tx";
import { MsgUpdateParams } from "./types/warden/warden/v1beta2/tx";
import { QueryKeyRequestsResponse } from "./types/warden/warden/v1beta2/query";
import { KeyResponse } from "./types/warden/warden/v1beta2/query";
import { QuerySignatureRequestsRequest } from "./types/warden/warden/v1beta2/query";
import { QuerySignatureRequestByIdRequest } from "./types/warden/warden/v1beta2/query";
import { QuerySignTransactionRequestsResponse } from "./types/warden/warden/v1beta2/query";
import { Key } from "./types/warden/warden/v1beta2/key";
import { GenesisState } from "./types/warden/warden/v1beta2/genesis";
import { MsgAddKeychainParty } from "./types/warden/warden/v1beta2/tx";
import { MsgNewKeyRequest } from "./types/warden/warden/v1beta2/tx";
import { WalletKeyResponse } from "./types/warden/warden/v1beta2/query";
import { MetadataEthereum } from "./types/warden/warden/v1beta2/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/warden.warden.v1beta2.SignRequest", SignRequest],
    ["/warden.warden.v1beta2.Space", Space],
    ["/warden.warden.v1beta2.MsgNewKey", MsgNewKey],
    ["/warden.warden.v1beta2.QueryKeyRequestsRequest", QueryKeyRequestsRequest],
    ["/warden.warden.v1beta2.QueryKeyRequestByIdResponse", QueryKeyRequestByIdResponse],
    ["/warden.warden.v1beta2.MsgNewSpaceResponse", MsgNewSpaceResponse],
    ["/warden.warden.v1beta2.MsgRemoveSpaceOwnerResponse", MsgRemoveSpaceOwnerResponse],
    ["/warden.warden.v1beta2.MsgNewKeychainResponse", MsgNewKeychainResponse],
    ["/warden.warden.v1beta2.MsgUpdateSpaceResponse", MsgUpdateSpaceResponse],
    ["/warden.warden.v1beta2.Params", Params],
    ["/warden.warden.v1beta2.QuerySpaceByIdRequest", QuerySpaceByIdRequest],
    ["/warden.warden.v1beta2.QuerySignTransactionRequestsRequest", QuerySignTransactionRequestsRequest],
    ["/warden.warden.v1beta2.QueryParamsRequest", QueryParamsRequest],
    ["/warden.warden.v1beta2.QueryKeychainByIdRequest", QueryKeychainByIdRequest],
    ["/warden.warden.v1beta2.QueryKeysRequest", QueryKeysRequest],
    ["/warden.warden.v1beta2.QuerySignatureRequestsResponse", QuerySignatureRequestsResponse],
    ["/warden.warden.v1beta2.SignTransactionRequestResponse", SignTransactionRequestResponse],
    ["/warden.warden.v1beta2.MsgAddSpaceOwnerResponse", MsgAddSpaceOwnerResponse],
    ["/warden.warden.v1beta2.MsgUpdateKeyRequest", MsgUpdateKeyRequest],
    ["/warden.warden.v1beta2.KeyRequest", KeyRequest],
    ["/warden.warden.v1beta2.QuerySpacesResponse", QuerySpacesResponse],
    ["/warden.warden.v1beta2.QueryKeychainByIdResponse", QueryKeychainByIdResponse],
    ["/warden.warden.v1beta2.MsgFulfilSignatureRequest", MsgFulfilSignatureRequest],
    ["/warden.warden.v1beta2.MsgFulfilSignatureRequestResponse", MsgFulfilSignatureRequestResponse],
    ["/warden.warden.v1beta2.SignTransactionRequest", SignTransactionRequest],
    ["/warden.warden.v1beta2.QueryParamsResponse", QueryParamsResponse],
    ["/warden.warden.v1beta2.QuerySignTransactionRequestByIdRequest", QuerySignTransactionRequestByIdRequest],
    ["/warden.warden.v1beta2.MsgAddSpaceOwner", MsgAddSpaceOwner],
    ["/warden.warden.v1beta2.MsgNewKeychain", MsgNewKeychain],
    ["/warden.warden.v1beta2.MsgNewSignatureRequest", MsgNewSignatureRequest],
    ["/warden.warden.v1beta2.QuerySpacesRequest", QuerySpacesRequest],
    ["/warden.warden.v1beta2.QuerySpacesByOwnerRequest", QuerySpacesByOwnerRequest],
    ["/warden.warden.v1beta2.QuerySpaceByIdResponse", QuerySpaceByIdResponse],
    ["/warden.warden.v1beta2.MsgUpdateSpace", MsgUpdateSpace],
    ["/warden.warden.v1beta2.MsgUpdateKeychainResponse", MsgUpdateKeychainResponse],
    ["/warden.warden.v1beta2.MsgRemoveSpaceOwner", MsgRemoveSpaceOwner],
    ["/warden.warden.v1beta2.MsgAddKeychainPartyResponse", MsgAddKeychainPartyResponse],
    ["/warden.warden.v1beta2.MsgUpdateKeychain", MsgUpdateKeychain],
    ["/warden.warden.v1beta2.QueryKeychainsRequest", QueryKeychainsRequest],
    ["/warden.warden.v1beta2.QueryKeyRequestByIdRequest", QueryKeyRequestByIdRequest],
    ["/warden.warden.v1beta2.QueryKeysResponse", QueryKeysResponse],
    ["/warden.warden.v1beta2.MsgNewKeyRequestResponse", MsgNewKeyRequestResponse],
    ["/warden.warden.v1beta2.MsgNewSpace", MsgNewSpace],
    ["/warden.warden.v1beta2.MsgNewSignTransactionRequestResponse", MsgNewSignTransactionRequestResponse],
    ["/warden.warden.v1beta2.MsgNewSignatureRequestResponse", MsgNewSignatureRequestResponse],
    ["/warden.warden.v1beta2.MsgNewSignTransactionRequest", MsgNewSignTransactionRequest],
    ["/warden.warden.v1beta2.QuerySignatureRequestByIdResponse", QuerySignatureRequestByIdResponse],
    ["/warden.warden.v1beta2.KeychainFees", KeychainFees],
    ["/warden.warden.v1beta2.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/warden.warden.v1beta2.MsgSignedData", MsgSignedData],
    ["/warden.warden.v1beta2.QueryKeychainsResponse", QueryKeychainsResponse],
    ["/warden.warden.v1beta2.QuerySignTransactionRequestByIdResponse", QuerySignTransactionRequestByIdResponse],
    ["/warden.warden.v1beta2.Keychain", Keychain],
    ["/warden.warden.v1beta2.MsgUpdateKeyRequestResponse", MsgUpdateKeyRequestResponse],
    ["/warden.warden.v1beta2.MsgUpdateParams", MsgUpdateParams],
    ["/warden.warden.v1beta2.QueryKeyRequestsResponse", QueryKeyRequestsResponse],
    ["/warden.warden.v1beta2.KeyResponse", KeyResponse],
    ["/warden.warden.v1beta2.QuerySignatureRequestsRequest", QuerySignatureRequestsRequest],
    ["/warden.warden.v1beta2.QuerySignatureRequestByIdRequest", QuerySignatureRequestByIdRequest],
    ["/warden.warden.v1beta2.QuerySignTransactionRequestsResponse", QuerySignTransactionRequestsResponse],
    ["/warden.warden.v1beta2.Key", Key],
    ["/warden.warden.v1beta2.GenesisState", GenesisState],
    ["/warden.warden.v1beta2.MsgAddKeychainParty", MsgAddKeychainParty],
    ["/warden.warden.v1beta2.MsgNewKeyRequest", MsgNewKeyRequest],
    ["/warden.warden.v1beta2.WalletKeyResponse", WalletKeyResponse],
    ["/warden.warden.v1beta2.MetadataEthereum", MetadataEthereum],
    
];

export { msgTypes }