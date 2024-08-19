//@ts-nocheck
import { setPaginationParams } from "../../../helpers.js";
import { LCDClient } from "@cosmology/lcd";
import { QueryParamsRequest, QueryParamsResponseSDKType, QuerySpacesRequest, QuerySpacesResponseSDKType, QuerySpacesByOwnerRequest, QueryKeychainsRequest, QueryKeychainsResponseSDKType, QuerySpaceByIdRequest, QuerySpaceByIdResponseSDKType, QueryKeychainByIdRequest, QueryKeychainByIdResponseSDKType, QueryKeyRequestsRequest, QueryKeyRequestsResponseSDKType, QueryKeyRequestByIdRequest, QueryKeyRequestByIdResponseSDKType, QueryAllKeysRequest, QueryKeysResponseSDKType, QueryKeysBySpaceIdRequest, QueryKeyByIdRequest, QueryKeyResponseSDKType, QuerySignRequestsRequest, QuerySignRequestsResponseSDKType, QuerySignRequestByIdRequest, QuerySignRequestByIdResponseSDKType } from "./query.js";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.params = this.params.bind(this);
    this.spaces = this.spaces.bind(this);
    this.spacesByOwner = this.spacesByOwner.bind(this);
    this.keychains = this.keychains.bind(this);
    this.spaceById = this.spaceById.bind(this);
    this.keychainById = this.keychainById.bind(this);
    this.keyRequests = this.keyRequests.bind(this);
    this.keyRequestById = this.keyRequestById.bind(this);
    this.allKeys = this.allKeys.bind(this);
    this.keysBySpaceId = this.keysBySpaceId.bind(this);
    this.keyById = this.keyById.bind(this);
    this.signRequests = this.signRequests.bind(this);
    this.signRequestById = this.signRequestById.bind(this);
  }
  /* Parameters queries the parameters of the module. */
  async params(_params: QueryParamsRequest = {}): Promise<QueryParamsResponseSDKType> {
    const endpoint = `warden/warden/v1beta3/params`;
    return await this.req.get<QueryParamsResponseSDKType>(endpoint);
  }
  /* Queries a list of Spaces. */
  async spaces(params: QuerySpacesRequest = {
    pagination: undefined
  }): Promise<QuerySpacesResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `warden/warden/v1beta3/spaces`;
    return await this.req.get<QuerySpacesResponseSDKType>(endpoint, options);
  }
  /* Queries a list of Spaces that have the specified owner. */
  async spacesByOwner(params: QuerySpacesByOwnerRequest): Promise<QuerySpacesResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    if (typeof params?.owner !== "undefined") {
      options.params.owner = params.owner;
    }
    const endpoint = `warden/warden/v1beta3/spaces_by_owner`;
    return await this.req.get<QuerySpacesResponseSDKType>(endpoint, options);
  }
  /* Queries a list of Keychains. */
  async keychains(params: QueryKeychainsRequest = {
    pagination: undefined
  }): Promise<QueryKeychainsResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `warden/warden/v1beta3/keychains`;
    return await this.req.get<QueryKeychainsResponseSDKType>(endpoint, options);
  }
  /* Queries a Space by its id. */
  async spaceById(params: QuerySpaceByIdRequest): Promise<QuerySpaceByIdResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.id !== "undefined") {
      options.params.id = params.id;
    }
    const endpoint = `warden/warden/v1beta3/space_by_address`;
    return await this.req.get<QuerySpaceByIdResponseSDKType>(endpoint, options);
  }
  /* Queries a Keychain by its id. */
  async keychainById(params: QueryKeychainByIdRequest): Promise<QueryKeychainByIdResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.id !== "undefined") {
      options.params.id = params.id;
    }
    const endpoint = `warden/warden/v1beta3/keychain_by_id`;
    return await this.req.get<QueryKeychainByIdResponseSDKType>(endpoint, options);
  }
  /* Queries a list of KeyRequests. */
  async keyRequests(params: QueryKeyRequestsRequest): Promise<QueryKeyRequestsResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    if (typeof params?.keychainId !== "undefined") {
      options.params.keychain_id = params.keychainId;
    }
    if (typeof params?.status !== "undefined") {
      options.params.status = params.status;
    }
    if (typeof params?.spaceId !== "undefined") {
      options.params.space_id = params.spaceId;
    }
    const endpoint = `warden/warden/v1beta3/key_requests`;
    return await this.req.get<QueryKeyRequestsResponseSDKType>(endpoint, options);
  }
  /* Queries a KeyRequest by its id. */
  async keyRequestById(params: QueryKeyRequestByIdRequest): Promise<QueryKeyRequestByIdResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.id !== "undefined") {
      options.params.id = params.id;
    }
    const endpoint = `warden/warden/v1beta3/key_request_by_id`;
    return await this.req.get<QueryKeyRequestByIdResponseSDKType>(endpoint, options);
  }
  /* Queries a list of Keys. */
  async allKeys(params: QueryAllKeysRequest): Promise<QueryKeysResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    if (typeof params?.deriveAddresses !== "undefined") {
      options.params.derive_addresses = params.deriveAddresses;
    }
    const endpoint = `warden/warden/v1beta3/keys`;
    return await this.req.get<QueryKeysResponseSDKType>(endpoint, options);
  }
  /* Queries a list of Keys by their Space ID. */
  async keysBySpaceId(params: QueryKeysBySpaceIdRequest): Promise<QueryKeysResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    if (typeof params?.spaceId !== "undefined") {
      options.params.space_id = params.spaceId;
    }
    if (typeof params?.deriveAddresses !== "undefined") {
      options.params.derive_addresses = params.deriveAddresses;
    }
    const endpoint = `warden/warden/v1beta3/keys_by_space_id`;
    return await this.req.get<QueryKeysResponseSDKType>(endpoint, options);
  }
  /* Queries a Key by its ID. */
  async keyById(params: QueryKeyByIdRequest): Promise<QueryKeyResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.id !== "undefined") {
      options.params.id = params.id;
    }
    if (typeof params?.deriveAddresses !== "undefined") {
      options.params.derive_addresses = params.deriveAddresses;
    }
    const endpoint = `warden/warden/v1beta3/key_by_id`;
    return await this.req.get<QueryKeyResponseSDKType>(endpoint, options);
  }
  /* Queries a list of SignRequests. */
  async signRequests(params: QuerySignRequestsRequest): Promise<QuerySignRequestsResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    if (typeof params?.keychainId !== "undefined") {
      options.params.keychain_id = params.keychainId;
    }
    if (typeof params?.status !== "undefined") {
      options.params.status = params.status;
    }
    const endpoint = `warden/warden/v1beta3/get_sign_requests`;
    return await this.req.get<QuerySignRequestsResponseSDKType>(endpoint, options);
  }
  /* Queries a SignRequest by its id. */
  async signRequestById(params: QuerySignRequestByIdRequest): Promise<QuerySignRequestByIdResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.id !== "undefined") {
      options.params.id = params.id;
    }
    const endpoint = `warden/warden/v1beta3/signature_pb_request_by_id`;
    return await this.req.get<QuerySignRequestByIdResponseSDKType>(endpoint, options);
  }
}