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
const msgTypes = [
    ["/warden.warden.MsgUpdateParams", MsgUpdateParams],
    ["/warden.warden.MsgNewSignatureRequest", MsgNewSignatureRequest],
    ["/warden.warden.KeychainFees", KeychainFees],
    ["/warden.warden.Space", Space],
    ["/warden.warden.QueryKeysRequest", QueryKeysRequest],
    ["/warden.warden.KeyResponse", KeyResponse],
    ["/warden.warden.MsgAddKeychainPartyResponse", MsgAddKeychainPartyResponse],
    ["/warden.warden.MsgUpdateKeychain", MsgUpdateKeychain],
    ["/warden.warden.QuerySpacesResponse", QuerySpacesResponse],
    ["/warden.warden.QuerySignTransactionRequestsResponse", QuerySignTransactionRequestsResponse],
    ["/warden.warden.MsgUpdateKeyRequestResponse", MsgUpdateKeyRequestResponse],
    ["/warden.warden.Keychain", Keychain],
    ["/warden.warden.Key", Key],
    ["/warden.warden.QuerySpaceByIdRequest", QuerySpaceByIdRequest],
    ["/warden.warden.QueryKeychainByIdResponse", QueryKeychainByIdResponse],
    ["/warden.warden.QueryKeyRequestByIdRequest", QueryKeyRequestByIdRequest],
    ["/warden.warden.MsgNewSignatureRequestResponse", MsgNewSignatureRequestResponse],
    ["/warden.warden.Params", Params],
    ["/warden.warden.QueryKeyRequestsResponse", QueryKeyRequestsResponse],
    ["/warden.warden.MsgUpdateKeychainResponse", MsgUpdateKeychainResponse],
    ["/warden.warden.SignRequest", SignRequest],
    ["/warden.warden.MsgNewKeychainResponse", MsgNewKeychainResponse],
    ["/warden.warden.MsgNewSignTransactionRequest", MsgNewSignTransactionRequest],
    ["/warden.warden.MsgRemoveSpaceOwner", MsgRemoveSpaceOwner],
    ["/warden.warden.MsgNewKeychain", MsgNewKeychain],
    ["/warden.warden.MsgFulfilSignatureRequest", MsgFulfilSignatureRequest],
    ["/warden.warden.MsgUpdateSpace", MsgUpdateSpace],
    ["/warden.warden.MsgNewKeyRequest", MsgNewKeyRequest],
    ["/warden.warden.QueryParamsResponse", QueryParamsResponse],
    ["/warden.warden.QueryKeysResponse", QueryKeysResponse],
    ["/warden.warden.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/warden.warden.QuerySignTransactionRequestByIdRequest", QuerySignTransactionRequestByIdRequest],
    ["/warden.warden.MsgAddSpaceOwnerResponse", MsgAddSpaceOwnerResponse],
    ["/warden.warden.QuerySpacesByOwnerRequest", QuerySpacesByOwnerRequest],
    ["/warden.warden.QueryKeychainsRequest", QueryKeychainsRequest],
    ["/warden.warden.QuerySignatureRequestsResponse", QuerySignatureRequestsResponse],
    ["/warden.warden.QueryKeychainsResponse", QueryKeychainsResponse],
    ["/warden.warden.QuerySignTransactionRequestByIdResponse", QuerySignTransactionRequestByIdResponse],
    ["/warden.warden.MsgAddKeychainParty", MsgAddKeychainParty],
    ["/warden.warden.QuerySignatureRequestsRequest", QuerySignatureRequestsRequest],
    ["/warden.warden.QuerySignatureRequestByIdRequest", QuerySignatureRequestByIdRequest],
    ["/warden.warden.MsgUpdateKeyRequest", MsgUpdateKeyRequest],
    ["/warden.warden.KeyRequest", KeyRequest],
    ["/warden.warden.QuerySpaceByIdResponse", QuerySpaceByIdResponse],
    ["/warden.warden.QueryKeyRequestByIdResponse", QueryKeyRequestByIdResponse],
    ["/warden.warden.MsgNewKeyRequestResponse", MsgNewKeyRequestResponse],
    ["/warden.warden.MetadataEthereum", MetadataEthereum],
    ["/warden.warden.QuerySignTransactionRequestsRequest", QuerySignTransactionRequestsRequest],
    ["/warden.warden.MsgRemoveSpaceOwnerResponse", MsgRemoveSpaceOwnerResponse],
    ["/warden.warden.GenesisState", GenesisState],
    ["/warden.warden.QuerySpacesRequest", QuerySpacesRequest],
    ["/warden.warden.MsgSignedData", MsgSignedData],
    ["/warden.warden.MsgUpdateSpaceResponse", MsgUpdateSpaceResponse],
    ["/warden.warden.MsgNewSignTransactionRequestResponse", MsgNewSignTransactionRequestResponse],
    ["/warden.warden.QueryParamsRequest", QueryParamsRequest],
    ["/warden.warden.QueryKeychainByIdRequest", QueryKeychainByIdRequest],
    ["/warden.warden.MsgAddSpaceOwner", MsgAddSpaceOwner],
    ["/warden.warden.MsgNewKey", MsgNewKey],
    ["/warden.warden.MsgFulfilSignatureRequestResponse", MsgFulfilSignatureRequestResponse],
    ["/warden.warden.QuerySignatureRequestByIdResponse", QuerySignatureRequestByIdResponse],
    ["/warden.warden.SignTransactionRequestResponse", SignTransactionRequestResponse],
    ["/warden.warden.MsgNewSpaceResponse", MsgNewSpaceResponse],
    ["/warden.warden.MsgNewSpace", MsgNewSpace],
    ["/warden.warden.QueryKeyRequestsRequest", QueryKeyRequestsRequest],
    ["/warden.warden.WalletKeyResponse", WalletKeyResponse],
    ["/warden.warden.SignTransactionRequest", SignTransactionRequest],
];
export { msgTypes };
