import { GeneratedType } from "@cosmjs/proto-signing";
import { QuerySignTransactionRequestByIdResponse } from "./types/warden/warden/query";
import { MsgFulfilSignatureRequestResponse } from "./types/warden/warden/tx";
import { QuerySignTransactionRequestsRequest } from "./types/warden/warden/query";
import { QueryKeyRequestsResponse } from "./types/warden/warden/query";
import { Key } from "./types/warden/warden/key";
import { MsgAddKeychainPartyResponse } from "./types/warden/warden/tx";
import { MsgUpdateKeychainResponse } from "./types/warden/warden/tx";
import { QuerySignatureRequestByIdRequest } from "./types/warden/warden/query";
import { MsgUpdateParamsResponse } from "./types/warden/warden/tx";
import { MsgUpdateKeyRequest } from "./types/warden/warden/tx";
import { WalletKeyResponse } from "./types/warden/warden/query";
import { MsgNewKeyRequest } from "./types/warden/warden/tx";
import { QuerySpacesByOwnerRequest } from "./types/warden/warden/query";
import { QueryKeyRequestsRequest } from "./types/warden/warden/query";
import { QueryKeysRequest } from "./types/warden/warden/query";
import { MsgAddSpaceOwner } from "./types/warden/warden/tx";
import { MsgNewKeychain } from "./types/warden/warden/tx";
import { MsgUpdateSpaceResponse } from "./types/warden/warden/tx";
import { QueryKeysResponse } from "./types/warden/warden/query";
import { SignTransactionRequest } from "./types/warden/warden/signature";
import { MsgRemoveSpaceOwnerResponse } from "./types/warden/warden/tx";
import { QueryKeyRequestByIdRequest } from "./types/warden/warden/query";
import { QuerySignatureRequestByIdResponse } from "./types/warden/warden/query";
import { MsgNewSpace } from "./types/warden/warden/tx";
import { Params } from "./types/warden/warden/params";
import { MetadataEthereum } from "./types/warden/warden/tx";
import { QueryKeychainsRequest } from "./types/warden/warden/query";
import { MsgUpdateKeyRequestResponse } from "./types/warden/warden/tx";
import { MsgNewSignatureRequest } from "./types/warden/warden/tx";
import { MsgNewSignatureRequestResponse } from "./types/warden/warden/tx";
import { Keychain } from "./types/warden/warden/keychain";
import { MsgNewKeychainResponse } from "./types/warden/warden/tx";
import { MsgUpdateKeychain } from "./types/warden/warden/tx";
import { QueryParamsResponse } from "./types/warden/warden/query";
import { QuerySpaceByIdResponse } from "./types/warden/warden/query";
import { QuerySignTransactionRequestByIdRequest } from "./types/warden/warden/query";
import { MsgUpdateParams } from "./types/warden/warden/tx";
import { MsgAddSpaceOwnerResponse } from "./types/warden/warden/tx";
import { MsgNewSignTransactionRequestResponse } from "./types/warden/warden/tx";
import { QueryKeychainsResponse } from "./types/warden/warden/query";
import { QueryKeyRequestByIdResponse } from "./types/warden/warden/query";
import { SignTransactionRequestResponse } from "./types/warden/warden/query";
import { MsgNewSpaceResponse } from "./types/warden/warden/tx";
import { MsgRemoveSpaceOwner } from "./types/warden/warden/tx";
import { GenesisState } from "./types/warden/warden/genesis";
import { QueryKeychainByIdRequest } from "./types/warden/warden/query";
import { QuerySignatureRequestsRequest } from "./types/warden/warden/query";
import { QuerySignTransactionRequestsResponse } from "./types/warden/warden/query";
import { SignRequest } from "./types/warden/warden/signature";
import { Space } from "./types/warden/warden/space";
import { QueryParamsRequest } from "./types/warden/warden/query";
import { QuerySpacesRequest } from "./types/warden/warden/query";
import { QuerySpacesResponse } from "./types/warden/warden/query";
import { QueryKeychainByIdResponse } from "./types/warden/warden/query";
import { QuerySignatureRequestsResponse } from "./types/warden/warden/query";
import { KeyRequest } from "./types/warden/warden/key";
import { MsgSignedData } from "./types/warden/warden/tx";
import { MsgFulfilSignatureRequest } from "./types/warden/warden/tx";
import { MsgAddKeychainParty } from "./types/warden/warden/tx";
import { KeychainFees } from "./types/warden/warden/keychain";
import { MsgNewSignTransactionRequest } from "./types/warden/warden/tx";
import { QuerySpaceByIdRequest } from "./types/warden/warden/query";
import { KeyResponse } from "./types/warden/warden/query";
import { MsgUpdateSpace } from "./types/warden/warden/tx";
import { MsgNewKeyRequestResponse } from "./types/warden/warden/tx";
import { MsgNewKey } from "./types/warden/warden/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/warden.warden.QuerySignTransactionRequestByIdResponse", QuerySignTransactionRequestByIdResponse],
    ["/warden.warden.MsgFulfilSignatureRequestResponse", MsgFulfilSignatureRequestResponse],
    ["/warden.warden.QuerySignTransactionRequestsRequest", QuerySignTransactionRequestsRequest],
    ["/warden.warden.QueryKeyRequestsResponse", QueryKeyRequestsResponse],
    ["/warden.warden.Key", Key],
    ["/warden.warden.MsgAddKeychainPartyResponse", MsgAddKeychainPartyResponse],
    ["/warden.warden.MsgUpdateKeychainResponse", MsgUpdateKeychainResponse],
    ["/warden.warden.QuerySignatureRequestByIdRequest", QuerySignatureRequestByIdRequest],
    ["/warden.warden.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/warden.warden.MsgUpdateKeyRequest", MsgUpdateKeyRequest],
    ["/warden.warden.WalletKeyResponse", WalletKeyResponse],
    ["/warden.warden.MsgNewKeyRequest", MsgNewKeyRequest],
    ["/warden.warden.QuerySpacesByOwnerRequest", QuerySpacesByOwnerRequest],
    ["/warden.warden.QueryKeyRequestsRequest", QueryKeyRequestsRequest],
    ["/warden.warden.QueryKeysRequest", QueryKeysRequest],
    ["/warden.warden.MsgAddSpaceOwner", MsgAddSpaceOwner],
    ["/warden.warden.MsgNewKeychain", MsgNewKeychain],
    ["/warden.warden.MsgUpdateSpaceResponse", MsgUpdateSpaceResponse],
    ["/warden.warden.QueryKeysResponse", QueryKeysResponse],
    ["/warden.warden.SignTransactionRequest", SignTransactionRequest],
    ["/warden.warden.MsgRemoveSpaceOwnerResponse", MsgRemoveSpaceOwnerResponse],
    ["/warden.warden.QueryKeyRequestByIdRequest", QueryKeyRequestByIdRequest],
    ["/warden.warden.QuerySignatureRequestByIdResponse", QuerySignatureRequestByIdResponse],
    ["/warden.warden.MsgNewSpace", MsgNewSpace],
    ["/warden.warden.Params", Params],
    ["/warden.warden.MetadataEthereum", MetadataEthereum],
    ["/warden.warden.QueryKeychainsRequest", QueryKeychainsRequest],
    ["/warden.warden.MsgUpdateKeyRequestResponse", MsgUpdateKeyRequestResponse],
    ["/warden.warden.MsgNewSignatureRequest", MsgNewSignatureRequest],
    ["/warden.warden.MsgNewSignatureRequestResponse", MsgNewSignatureRequestResponse],
    ["/warden.warden.Keychain", Keychain],
    ["/warden.warden.MsgNewKeychainResponse", MsgNewKeychainResponse],
    ["/warden.warden.MsgUpdateKeychain", MsgUpdateKeychain],
    ["/warden.warden.QueryParamsResponse", QueryParamsResponse],
    ["/warden.warden.QuerySpaceByIdResponse", QuerySpaceByIdResponse],
    ["/warden.warden.QuerySignTransactionRequestByIdRequest", QuerySignTransactionRequestByIdRequest],
    ["/warden.warden.MsgUpdateParams", MsgUpdateParams],
    ["/warden.warden.MsgAddSpaceOwnerResponse", MsgAddSpaceOwnerResponse],
    ["/warden.warden.MsgNewSignTransactionRequestResponse", MsgNewSignTransactionRequestResponse],
    ["/warden.warden.QueryKeychainsResponse", QueryKeychainsResponse],
    ["/warden.warden.QueryKeyRequestByIdResponse", QueryKeyRequestByIdResponse],
    ["/warden.warden.SignTransactionRequestResponse", SignTransactionRequestResponse],
    ["/warden.warden.MsgNewSpaceResponse", MsgNewSpaceResponse],
    ["/warden.warden.MsgRemoveSpaceOwner", MsgRemoveSpaceOwner],
    ["/warden.warden.GenesisState", GenesisState],
    ["/warden.warden.QueryKeychainByIdRequest", QueryKeychainByIdRequest],
    ["/warden.warden.QuerySignatureRequestsRequest", QuerySignatureRequestsRequest],
    ["/warden.warden.QuerySignTransactionRequestsResponse", QuerySignTransactionRequestsResponse],
    ["/warden.warden.SignRequest", SignRequest],
    ["/warden.warden.Space", Space],
    ["/warden.warden.QueryParamsRequest", QueryParamsRequest],
    ["/warden.warden.QuerySpacesRequest", QuerySpacesRequest],
    ["/warden.warden.QuerySpacesResponse", QuerySpacesResponse],
    ["/warden.warden.QueryKeychainByIdResponse", QueryKeychainByIdResponse],
    ["/warden.warden.QuerySignatureRequestsResponse", QuerySignatureRequestsResponse],
    ["/warden.warden.KeyRequest", KeyRequest],
    ["/warden.warden.MsgSignedData", MsgSignedData],
    ["/warden.warden.MsgFulfilSignatureRequest", MsgFulfilSignatureRequest],
    ["/warden.warden.MsgAddKeychainParty", MsgAddKeychainParty],
    ["/warden.warden.KeychainFees", KeychainFees],
    ["/warden.warden.MsgNewSignTransactionRequest", MsgNewSignTransactionRequest],
    ["/warden.warden.QuerySpaceByIdRequest", QuerySpaceByIdRequest],
    ["/warden.warden.KeyResponse", KeyResponse],
    ["/warden.warden.MsgUpdateSpace", MsgUpdateSpace],
    ["/warden.warden.MsgNewKeyRequestResponse", MsgNewKeyRequestResponse],
    ["/warden.warden.MsgNewKey", MsgNewKey],
    
];

export { msgTypes }