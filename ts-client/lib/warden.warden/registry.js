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
const msgTypes = [
    ["/warden.warden.QueryKeysRequest", QueryKeysRequest],
    ["/warden.warden.MsgUpdateKeychain", MsgUpdateKeychain],
    ["/warden.warden.MetadataEthereum", MetadataEthereum],
    ["/warden.warden.QuerySpacesByOwnerRequest", QuerySpacesByOwnerRequest],
    ["/warden.warden.QueryKeychainsRequest", QueryKeychainsRequest],
    ["/warden.warden.QueryKeychainByAddressRequest", QueryKeychainByAddressRequest],
    ["/warden.warden.MsgUpdateKeychainResponse", MsgUpdateKeychainResponse],
    ["/warden.warden.KeyRequest", KeyRequest],
    ["/warden.warden.SignRequest", SignRequest],
    ["/warden.warden.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/warden.warden.MsgRemoveSpaceOwnerResponse", MsgRemoveSpaceOwnerResponse],
    ["/warden.warden.MsgNewSignatureRequestResponse", MsgNewSignatureRequestResponse],
    ["/warden.warden.Key", Key],
    ["/warden.warden.QuerySpaceByAddressResponse", QuerySpaceByAddressResponse],
    ["/warden.warden.QuerySignatureRequestsResponse", QuerySignatureRequestsResponse],
    ["/warden.warden.MsgUpdateKeyRequestResponse", MsgUpdateKeyRequestResponse],
    ["/warden.warden.MsgAddKeychainPartyResponse", MsgAddKeychainPartyResponse],
    ["/warden.warden.MsgNewKeyRequestResponse", MsgNewKeyRequestResponse],
    ["/warden.warden.MsgAddSpaceOwnerResponse", MsgAddSpaceOwnerResponse],
    ["/warden.warden.QueryKeyRequestByIdResponse", QueryKeyRequestByIdResponse],
    ["/warden.warden.WalletKeyResponse", WalletKeyResponse],
    ["/warden.warden.QuerySignatureRequestsRequest", QuerySignatureRequestsRequest],
    ["/warden.warden.QuerySignTransactionRequestsResponse", QuerySignTransactionRequestsResponse],
    ["/warden.warden.MsgNewKeychain", MsgNewKeychain],
    ["/warden.warden.Params", Params],
    ["/warden.warden.QueryKeychainsResponse", QueryKeychainsResponse],
    ["/warden.warden.QuerySpaceByAddressRequest", QuerySpaceByAddressRequest],
    ["/warden.warden.MsgNewSignTransactionRequestResponse", MsgNewSignTransactionRequestResponse],
    ["/warden.warden.MsgRemoveSpaceOwner", MsgRemoveSpaceOwner],
    ["/warden.warden.MsgUpdateSpace", MsgUpdateSpace],
    ["/warden.warden.MsgNewKeyRequest", MsgNewKeyRequest],
    ["/warden.warden.MsgNewSignatureRequest", MsgNewSignatureRequest],
    ["/warden.warden.Space", Space],
    ["/warden.warden.GenesisState", GenesisState],
    ["/warden.warden.KeyResponse", KeyResponse],
    ["/warden.warden.QuerySignTransactionRequestByIdResponse", QuerySignTransactionRequestByIdResponse],
    ["/warden.warden.MsgNewKeychainResponse", MsgNewKeychainResponse],
    ["/warden.warden.MsgUpdateParams", MsgUpdateParams],
    ["/warden.warden.QueryKeychainByAddressResponse", QueryKeychainByAddressResponse],
    ["/warden.warden.QuerySignatureRequestByIdRequest", QuerySignatureRequestByIdRequest],
    ["/warden.warden.MsgNewKey", MsgNewKey],
    ["/warden.warden.QuerySpacesResponse", QuerySpacesResponse],
    ["/warden.warden.QueryKeyRequestByIdRequest", QueryKeyRequestByIdRequest],
    ["/warden.warden.MsgAddSpaceOwner", MsgAddSpaceOwner],
    ["/warden.warden.MsgUpdateKeyRequest", MsgUpdateKeyRequest],
    ["/warden.warden.QueryKeysResponse", QueryKeysResponse],
    ["/warden.warden.QuerySignTransactionRequestByIdRequest", QuerySignTransactionRequestByIdRequest],
    ["/warden.warden.MsgNewSpaceResponse", MsgNewSpaceResponse],
    ["/warden.warden.MsgFulfilSignatureRequestResponse", MsgFulfilSignatureRequestResponse],
    ["/warden.warden.Keychain", Keychain],
    ["/warden.warden.KeychainFees", KeychainFees],
    ["/warden.warden.MsgNewSpace", MsgNewSpace],
    ["/warden.warden.MsgAddKeychainParty", MsgAddKeychainParty],
    ["/warden.warden.QueryParamsRequest", QueryParamsRequest],
    ["/warden.warden.QueryKeyRequestsRequest", QueryKeyRequestsRequest],
    ["/warden.warden.SignTransactionRequestResponse", SignTransactionRequestResponse],
    ["/warden.warden.MsgSignedData", MsgSignedData],
    ["/warden.warden.QuerySpacesRequest", QuerySpacesRequest],
    ["/warden.warden.QueryKeyRequestsResponse", QueryKeyRequestsResponse],
    ["/warden.warden.QuerySignTransactionRequestsRequest", QuerySignTransactionRequestsRequest],
    ["/warden.warden.QueryParamsResponse", QueryParamsResponse],
    ["/warden.warden.MsgNewSignTransactionRequest", MsgNewSignTransactionRequest],
    ["/warden.warden.SignTransactionRequest", SignTransactionRequest],
    ["/warden.warden.QuerySignatureRequestByIdResponse", QuerySignatureRequestByIdResponse],
    ["/warden.warden.MsgUpdateSpaceResponse", MsgUpdateSpaceResponse],
    ["/warden.warden.MsgFulfilSignatureRequest", MsgFulfilSignatureRequest],
];
export { msgTypes };
