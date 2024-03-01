import { KeychainFees } from "./types/warden/warden/keychain";
import { MsgAddSpaceOwner } from "./types/warden/warden/tx";
import { QueryKeyRequestsRequest } from "./types/warden/warden/query";
import { WalletKeyResponse } from "./types/warden/warden/query";
import { MsgNewSpace } from "./types/warden/warden/tx";
import { MsgUpdateKeyRequestResponse } from "./types/warden/warden/tx";
import { SignTransactionRequest } from "./types/warden/warden/signature";
import { QuerySignatureRequestByIdRequest } from "./types/warden/warden/query";
import { MsgUpdateParams } from "./types/warden/warden/tx";
import { MsgNewSignatureRequest } from "./types/warden/warden/tx";
import { KeyRequest } from "./types/warden/warden/key";
import { QuerySpacesRequest } from "./types/warden/warden/query";
import { QueryKeychainsResponse } from "./types/warden/warden/query";
import { QueryKeysResponse } from "./types/warden/warden/query";
import { MsgAddKeychainPartyResponse } from "./types/warden/warden/tx";
import { MsgUpdateKeychainResponse } from "./types/warden/warden/tx";
import { MsgAddKeychainParty } from "./types/warden/warden/tx";
import { SignRequest } from "./types/warden/warden/signature";
import { Space } from "./types/warden/warden/space";
import { QueryKeyRequestByIdRequest } from "./types/warden/warden/query";
import { QuerySignTransactionRequestsResponse } from "./types/warden/warden/query";
import { MsgNewSpaceResponse } from "./types/warden/warden/tx";
import { QueryParamsResponse } from "./types/warden/warden/query";
import { QueryKeyRequestByIdResponse } from "./types/warden/warden/query";
import { MsgNewKeyRequestResponse } from "./types/warden/warden/tx";
import { MsgUpdateKeyRequest } from "./types/warden/warden/tx";
import { Params } from "./types/warden/warden/params";
import { QueryKeychainByAddressResponse } from "./types/warden/warden/query";
import { QuerySignatureRequestsRequest } from "./types/warden/warden/query";
import { MsgSignedData } from "./types/warden/warden/tx";
import { MetadataEthereum } from "./types/warden/warden/tx";
import { QuerySpaceByAddressResponse } from "./types/warden/warden/query";
import { QueryKeychainByAddressRequest } from "./types/warden/warden/query";
import { MsgUpdateKeychain } from "./types/warden/warden/tx";
import { QuerySignTransactionRequestByIdResponse } from "./types/warden/warden/query";
import { MsgUpdateSpace } from "./types/warden/warden/tx";
import { MsgFulfilSignatureRequest } from "./types/warden/warden/tx";
import { QueryKeychainsRequest } from "./types/warden/warden/query";
import { QuerySpaceByAddressRequest } from "./types/warden/warden/query";
import { QuerySignTransactionRequestByIdRequest } from "./types/warden/warden/query";
import { MsgNewSignTransactionRequestResponse } from "./types/warden/warden/tx";
import { Key } from "./types/warden/warden/key";
import { QuerySignatureRequestByIdResponse } from "./types/warden/warden/query";
import { MsgRemoveSpaceOwner } from "./types/warden/warden/tx";
import { MsgNewKeyRequest } from "./types/warden/warden/tx";
import { MsgNewSignTransactionRequest } from "./types/warden/warden/tx";
import { Keychain } from "./types/warden/warden/keychain";
import { QuerySpacesByOwnerRequest } from "./types/warden/warden/query";
import { QueryKeysRequest } from "./types/warden/warden/query";
import { QuerySignatureRequestsResponse } from "./types/warden/warden/query";
import { QuerySignTransactionRequestsRequest } from "./types/warden/warden/query";
import { GenesisState } from "./types/warden/warden/genesis";
import { MsgUpdateParamsResponse } from "./types/warden/warden/tx";
import { MsgNewKeychainResponse } from "./types/warden/warden/tx";
import { QuerySpacesResponse } from "./types/warden/warden/query";
import { KeyResponse } from "./types/warden/warden/query";
import { MsgNewSignatureRequestResponse } from "./types/warden/warden/tx";
import { SignTransactionRequestResponse } from "./types/warden/warden/query";
import { MsgNewKeychain } from "./types/warden/warden/tx";
import { MsgNewKey } from "./types/warden/warden/tx";
import { QueryParamsRequest } from "./types/warden/warden/query";
import { QueryKeyRequestsResponse } from "./types/warden/warden/query";
import { MsgUpdateSpaceResponse } from "./types/warden/warden/tx";
import { MsgFulfilSignatureRequestResponse } from "./types/warden/warden/tx";
import { MsgAddSpaceOwnerResponse } from "./types/warden/warden/tx";
import { MsgRemoveSpaceOwnerResponse } from "./types/warden/warden/tx";
const msgTypes = [
    ["/warden.warden.KeychainFees", KeychainFees],
    ["/warden.warden.MsgAddSpaceOwner", MsgAddSpaceOwner],
    ["/warden.warden.QueryKeyRequestsRequest", QueryKeyRequestsRequest],
    ["/warden.warden.WalletKeyResponse", WalletKeyResponse],
    ["/warden.warden.MsgNewSpace", MsgNewSpace],
    ["/warden.warden.MsgUpdateKeyRequestResponse", MsgUpdateKeyRequestResponse],
    ["/warden.warden.SignTransactionRequest", SignTransactionRequest],
    ["/warden.warden.QuerySignatureRequestByIdRequest", QuerySignatureRequestByIdRequest],
    ["/warden.warden.MsgUpdateParams", MsgUpdateParams],
    ["/warden.warden.MsgNewSignatureRequest", MsgNewSignatureRequest],
    ["/warden.warden.KeyRequest", KeyRequest],
    ["/warden.warden.QuerySpacesRequest", QuerySpacesRequest],
    ["/warden.warden.QueryKeychainsResponse", QueryKeychainsResponse],
    ["/warden.warden.QueryKeysResponse", QueryKeysResponse],
    ["/warden.warden.MsgAddKeychainPartyResponse", MsgAddKeychainPartyResponse],
    ["/warden.warden.MsgUpdateKeychainResponse", MsgUpdateKeychainResponse],
    ["/warden.warden.MsgAddKeychainParty", MsgAddKeychainParty],
    ["/warden.warden.SignRequest", SignRequest],
    ["/warden.warden.Space", Space],
    ["/warden.warden.QueryKeyRequestByIdRequest", QueryKeyRequestByIdRequest],
    ["/warden.warden.QuerySignTransactionRequestsResponse", QuerySignTransactionRequestsResponse],
    ["/warden.warden.MsgNewSpaceResponse", MsgNewSpaceResponse],
    ["/warden.warden.QueryParamsResponse", QueryParamsResponse],
    ["/warden.warden.QueryKeyRequestByIdResponse", QueryKeyRequestByIdResponse],
    ["/warden.warden.MsgNewKeyRequestResponse", MsgNewKeyRequestResponse],
    ["/warden.warden.MsgUpdateKeyRequest", MsgUpdateKeyRequest],
    ["/warden.warden.Params", Params],
    ["/warden.warden.QueryKeychainByAddressResponse", QueryKeychainByAddressResponse],
    ["/warden.warden.QuerySignatureRequestsRequest", QuerySignatureRequestsRequest],
    ["/warden.warden.MsgSignedData", MsgSignedData],
    ["/warden.warden.MetadataEthereum", MetadataEthereum],
    ["/warden.warden.QuerySpaceByAddressResponse", QuerySpaceByAddressResponse],
    ["/warden.warden.QueryKeychainByAddressRequest", QueryKeychainByAddressRequest],
    ["/warden.warden.MsgUpdateKeychain", MsgUpdateKeychain],
    ["/warden.warden.QuerySignTransactionRequestByIdResponse", QuerySignTransactionRequestByIdResponse],
    ["/warden.warden.MsgUpdateSpace", MsgUpdateSpace],
    ["/warden.warden.MsgFulfilSignatureRequest", MsgFulfilSignatureRequest],
    ["/warden.warden.QueryKeychainsRequest", QueryKeychainsRequest],
    ["/warden.warden.QuerySpaceByAddressRequest", QuerySpaceByAddressRequest],
    ["/warden.warden.QuerySignTransactionRequestByIdRequest", QuerySignTransactionRequestByIdRequest],
    ["/warden.warden.MsgNewSignTransactionRequestResponse", MsgNewSignTransactionRequestResponse],
    ["/warden.warden.Key", Key],
    ["/warden.warden.QuerySignatureRequestByIdResponse", QuerySignatureRequestByIdResponse],
    ["/warden.warden.MsgRemoveSpaceOwner", MsgRemoveSpaceOwner],
    ["/warden.warden.MsgNewKeyRequest", MsgNewKeyRequest],
    ["/warden.warden.MsgNewSignTransactionRequest", MsgNewSignTransactionRequest],
    ["/warden.warden.Keychain", Keychain],
    ["/warden.warden.QuerySpacesByOwnerRequest", QuerySpacesByOwnerRequest],
    ["/warden.warden.QueryKeysRequest", QueryKeysRequest],
    ["/warden.warden.QuerySignatureRequestsResponse", QuerySignatureRequestsResponse],
    ["/warden.warden.QuerySignTransactionRequestsRequest", QuerySignTransactionRequestsRequest],
    ["/warden.warden.GenesisState", GenesisState],
    ["/warden.warden.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/warden.warden.MsgNewKeychainResponse", MsgNewKeychainResponse],
    ["/warden.warden.QuerySpacesResponse", QuerySpacesResponse],
    ["/warden.warden.KeyResponse", KeyResponse],
    ["/warden.warden.MsgNewSignatureRequestResponse", MsgNewSignatureRequestResponse],
    ["/warden.warden.SignTransactionRequestResponse", SignTransactionRequestResponse],
    ["/warden.warden.MsgNewKeychain", MsgNewKeychain],
    ["/warden.warden.MsgNewKey", MsgNewKey],
    ["/warden.warden.QueryParamsRequest", QueryParamsRequest],
    ["/warden.warden.QueryKeyRequestsResponse", QueryKeyRequestsResponse],
    ["/warden.warden.MsgUpdateSpaceResponse", MsgUpdateSpaceResponse],
    ["/warden.warden.MsgFulfilSignatureRequestResponse", MsgFulfilSignatureRequestResponse],
    ["/warden.warden.MsgAddSpaceOwnerResponse", MsgAddSpaceOwnerResponse],
    ["/warden.warden.MsgRemoveSpaceOwnerResponse", MsgRemoveSpaceOwnerResponse],
];
export { msgTypes };
