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
const msgTypes = [
    ["/warden.warden.MsgAddKeychainParty", MsgAddKeychainParty],
    ["/warden.warden.QueryKeyRequestByIdResponse", QueryKeyRequestByIdResponse],
    ["/warden.warden.Keychain", Keychain],
    ["/warden.warden.MsgAddKeychainPartyResponse", MsgAddKeychainPartyResponse],
    ["/warden.warden.QueryKeyRequestsResponse", QueryKeyRequestsResponse],
    ["/warden.warden.QuerySignatureRequestsRequest", QuerySignatureRequestsRequest],
    ["/warden.warden.KeyRequest", KeyRequest],
    ["/warden.warden.MsgUpdateSpace", MsgUpdateSpace],
    ["/warden.warden.MsgFulfilSignatureRequestResponse", MsgFulfilSignatureRequestResponse],
    ["/warden.warden.QueryKeychainByIdRequest", QueryKeychainByIdRequest],
    ["/warden.warden.SignRequest", SignRequest],
    ["/warden.warden.MsgNewSignTransactionRequest", MsgNewSignTransactionRequest],
    ["/warden.warden.Params", Params],
    ["/warden.warden.QueryKeyRequestsRequest", QueryKeyRequestsRequest],
    ["/warden.warden.Space", Space],
    ["/warden.warden.MsgNewSpace", MsgNewSpace],
    ["/warden.warden.MsgUpdateKeychainResponse", MsgUpdateKeychainResponse],
    ["/warden.warden.MsgNewSignTransactionRequestResponse", MsgNewSignTransactionRequestResponse],
    ["/warden.warden.QuerySpaceByIdResponse", QuerySpaceByIdResponse],
    ["/warden.warden.WalletKeyResponse", WalletKeyResponse],
    ["/warden.warden.QuerySignatureRequestsResponse", QuerySignatureRequestsResponse],
    ["/warden.warden.QueryParamsRequest", QueryParamsRequest],
    ["/warden.warden.QuerySpacesResponse", QuerySpacesResponse],
    ["/warden.warden.SignTransactionRequestResponse", SignTransactionRequestResponse],
    ["/warden.warden.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/warden.warden.MetadataEthereum", MetadataEthereum],
    ["/warden.warden.QuerySpacesByOwnerRequest", QuerySpacesByOwnerRequest],
    ["/warden.warden.QuerySignatureRequestByIdRequest", QuerySignatureRequestByIdRequest],
    ["/warden.warden.MsgAddSpaceOwnerResponse", MsgAddSpaceOwnerResponse],
    ["/warden.warden.MsgFulfilSignatureRequest", MsgFulfilSignatureRequest],
    ["/warden.warden.GenesisState", GenesisState],
    ["/warden.warden.Key", Key],
    ["/warden.warden.MsgNewKeyRequestResponse", MsgNewKeyRequestResponse],
    ["/warden.warden.QuerySignTransactionRequestsRequest", QuerySignTransactionRequestsRequest],
    ["/warden.warden.QuerySignTransactionRequestsResponse", QuerySignTransactionRequestsResponse],
    ["/warden.warden.MsgNewKeychainResponse", MsgNewKeychainResponse],
    ["/warden.warden.MsgNewSignatureRequest", MsgNewSignatureRequest],
    ["/warden.warden.QuerySpacesRequest", QuerySpacesRequest],
    ["/warden.warden.QueryKeysResponse", QueryKeysResponse],
    ["/warden.warden.QuerySignatureRequestByIdResponse", QuerySignatureRequestByIdResponse],
    ["/warden.warden.MsgSignedData", MsgSignedData],
    ["/warden.warden.QueryParamsResponse", QueryParamsResponse],
    ["/warden.warden.QueryKeychainsRequest", QueryKeychainsRequest],
    ["/warden.warden.SignTransactionRequest", SignTransactionRequest],
    ["/warden.warden.MsgNewSpaceResponse", MsgNewSpaceResponse],
    ["/warden.warden.MsgRemoveSpaceOwner", MsgRemoveSpaceOwner],
    ["/warden.warden.MsgNewKey", MsgNewKey],
    ["/warden.warden.QueryKeysRequest", QueryKeysRequest],
    ["/warden.warden.MsgRemoveSpaceOwnerResponse", MsgRemoveSpaceOwnerResponse],
    ["/warden.warden.MsgNewKeychain", MsgNewKeychain],
    ["/warden.warden.MsgUpdateKeychain", MsgUpdateKeychain],
    ["/warden.warden.MsgUpdateKeyRequest", MsgUpdateKeyRequest],
    ["/warden.warden.QueryKeyRequestByIdRequest", QueryKeyRequestByIdRequest],
    ["/warden.warden.QuerySignTransactionRequestByIdRequest", QuerySignTransactionRequestByIdRequest],
    ["/warden.warden.QuerySignTransactionRequestByIdResponse", QuerySignTransactionRequestByIdResponse],
    ["/warden.warden.MsgAddSpaceOwner", MsgAddSpaceOwner],
    ["/warden.warden.MsgUpdateSpaceResponse", MsgUpdateSpaceResponse],
    ["/warden.warden.MsgNewKeyRequest", MsgNewKeyRequest],
    ["/warden.warden.QuerySpaceByIdRequest", QuerySpaceByIdRequest],
    ["/warden.warden.QueryKeychainByIdResponse", QueryKeychainByIdResponse],
    ["/warden.warden.MsgUpdateParams", MsgUpdateParams],
    ["/warden.warden.KeychainFees", KeychainFees],
    ["/warden.warden.MsgUpdateKeyRequestResponse", MsgUpdateKeyRequestResponse],
    ["/warden.warden.MsgNewSignatureRequestResponse", MsgNewSignatureRequestResponse],
    ["/warden.warden.QueryKeychainsResponse", QueryKeychainsResponse],
    ["/warden.warden.KeyResponse", KeyResponse],
];
export { msgTypes };
