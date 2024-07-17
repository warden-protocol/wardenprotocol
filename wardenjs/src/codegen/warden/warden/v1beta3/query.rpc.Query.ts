//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { QueryClient, createProtobufRpcClient, ProtobufRpcClient } from "@cosmjs/stargate";
import { ReactQueryParams } from "../../../react-query.js";
import { useQuery } from "@tanstack/react-query";
import { QueryParamsRequest, QueryParamsResponse, QuerySpacesRequest, QuerySpacesResponse, QuerySpacesByOwnerRequest, QueryKeychainsRequest, QueryKeychainsResponse, QuerySpaceByIdRequest, QuerySpaceByIdResponse, QueryKeychainByIdRequest, QueryKeychainByIdResponse, QueryKeyRequestsRequest, QueryKeyRequestsResponse, QueryKeyRequestByIdRequest, QueryKeyRequestByIdResponse, QueryAllKeysRequest, QueryKeysResponse, QueryKeysBySpaceIdRequest, QueryKeyByIdRequest, QueryKeyResponse, QuerySignRequestsRequest, QuerySignRequestsResponse, QuerySignRequestByIdRequest, QuerySignRequestByIdResponse } from "./query.js";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of Spaces. */
  spaces(request?: QuerySpacesRequest): Promise<QuerySpacesResponse>;
  /** Queries a list of Spaces that have the specified owner. */
  spacesByOwner(request: QuerySpacesByOwnerRequest): Promise<QuerySpacesResponse>;
  /** Queries a list of Keychains. */
  keychains(request?: QueryKeychainsRequest): Promise<QueryKeychainsResponse>;
  /** Queries a Space by its id. */
  spaceById(request: QuerySpaceByIdRequest): Promise<QuerySpaceByIdResponse>;
  /** Queries a Keychain by its id. */
  keychainById(request: QueryKeychainByIdRequest): Promise<QueryKeychainByIdResponse>;
  /** Queries a list of KeyRequests. */
  keyRequests(request: QueryKeyRequestsRequest): Promise<QueryKeyRequestsResponse>;
  /** Queries a KeyRequest by its id. */
  keyRequestById(request: QueryKeyRequestByIdRequest): Promise<QueryKeyRequestByIdResponse>;
  /** Queries a list of Keys. */
  allKeys(request: QueryAllKeysRequest): Promise<QueryKeysResponse>;
  /** Queries a list of Keys by their Space ID. */
  keysBySpaceId(request: QueryKeysBySpaceIdRequest): Promise<QueryKeysResponse>;
  /** Queries a Key by its ID. */
  keyById(request: QueryKeyByIdRequest): Promise<QueryKeyResponse>;
  /** Queries a list of SignRequests. */
  signRequests(request: QuerySignRequestsRequest): Promise<QuerySignRequestsResponse>;
  /** Queries a SignRequest by its id. */
  signRequestById(request: QuerySignRequestByIdRequest): Promise<QuerySignRequestByIdResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
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
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  spaces(request: QuerySpacesRequest = {
    pagination: undefined
  }): Promise<QuerySpacesResponse> {
    const data = QuerySpacesRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Query", "Spaces", data);
    return promise.then(data => QuerySpacesResponse.decode(new BinaryReader(data)));
  }
  spacesByOwner(request: QuerySpacesByOwnerRequest): Promise<QuerySpacesResponse> {
    const data = QuerySpacesByOwnerRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Query", "SpacesByOwner", data);
    return promise.then(data => QuerySpacesResponse.decode(new BinaryReader(data)));
  }
  keychains(request: QueryKeychainsRequest = {
    pagination: undefined
  }): Promise<QueryKeychainsResponse> {
    const data = QueryKeychainsRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Query", "Keychains", data);
    return promise.then(data => QueryKeychainsResponse.decode(new BinaryReader(data)));
  }
  spaceById(request: QuerySpaceByIdRequest): Promise<QuerySpaceByIdResponse> {
    const data = QuerySpaceByIdRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Query", "SpaceById", data);
    return promise.then(data => QuerySpaceByIdResponse.decode(new BinaryReader(data)));
  }
  keychainById(request: QueryKeychainByIdRequest): Promise<QueryKeychainByIdResponse> {
    const data = QueryKeychainByIdRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Query", "KeychainById", data);
    return promise.then(data => QueryKeychainByIdResponse.decode(new BinaryReader(data)));
  }
  keyRequests(request: QueryKeyRequestsRequest): Promise<QueryKeyRequestsResponse> {
    const data = QueryKeyRequestsRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Query", "KeyRequests", data);
    return promise.then(data => QueryKeyRequestsResponse.decode(new BinaryReader(data)));
  }
  keyRequestById(request: QueryKeyRequestByIdRequest): Promise<QueryKeyRequestByIdResponse> {
    const data = QueryKeyRequestByIdRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Query", "KeyRequestById", data);
    return promise.then(data => QueryKeyRequestByIdResponse.decode(new BinaryReader(data)));
  }
  allKeys(request: QueryAllKeysRequest): Promise<QueryKeysResponse> {
    const data = QueryAllKeysRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Query", "AllKeys", data);
    return promise.then(data => QueryKeysResponse.decode(new BinaryReader(data)));
  }
  keysBySpaceId(request: QueryKeysBySpaceIdRequest): Promise<QueryKeysResponse> {
    const data = QueryKeysBySpaceIdRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Query", "KeysBySpaceId", data);
    return promise.then(data => QueryKeysResponse.decode(new BinaryReader(data)));
  }
  keyById(request: QueryKeyByIdRequest): Promise<QueryKeyResponse> {
    const data = QueryKeyByIdRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Query", "KeyById", data);
    return promise.then(data => QueryKeyResponse.decode(new BinaryReader(data)));
  }
  signRequests(request: QuerySignRequestsRequest): Promise<QuerySignRequestsResponse> {
    const data = QuerySignRequestsRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Query", "SignRequests", data);
    return promise.then(data => QuerySignRequestsResponse.decode(new BinaryReader(data)));
  }
  signRequestById(request: QuerySignRequestByIdRequest): Promise<QuerySignRequestByIdResponse> {
    const data = QuerySignRequestByIdRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Query", "SignRequestById", data);
    return promise.then(data => QuerySignRequestByIdResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    spaces(request?: QuerySpacesRequest): Promise<QuerySpacesResponse> {
      return queryService.spaces(request);
    },
    spacesByOwner(request: QuerySpacesByOwnerRequest): Promise<QuerySpacesResponse> {
      return queryService.spacesByOwner(request);
    },
    keychains(request?: QueryKeychainsRequest): Promise<QueryKeychainsResponse> {
      return queryService.keychains(request);
    },
    spaceById(request: QuerySpaceByIdRequest): Promise<QuerySpaceByIdResponse> {
      return queryService.spaceById(request);
    },
    keychainById(request: QueryKeychainByIdRequest): Promise<QueryKeychainByIdResponse> {
      return queryService.keychainById(request);
    },
    keyRequests(request: QueryKeyRequestsRequest): Promise<QueryKeyRequestsResponse> {
      return queryService.keyRequests(request);
    },
    keyRequestById(request: QueryKeyRequestByIdRequest): Promise<QueryKeyRequestByIdResponse> {
      return queryService.keyRequestById(request);
    },
    allKeys(request: QueryAllKeysRequest): Promise<QueryKeysResponse> {
      return queryService.allKeys(request);
    },
    keysBySpaceId(request: QueryKeysBySpaceIdRequest): Promise<QueryKeysResponse> {
      return queryService.keysBySpaceId(request);
    },
    keyById(request: QueryKeyByIdRequest): Promise<QueryKeyResponse> {
      return queryService.keyById(request);
    },
    signRequests(request: QuerySignRequestsRequest): Promise<QuerySignRequestsResponse> {
      return queryService.signRequests(request);
    },
    signRequestById(request: QuerySignRequestByIdRequest): Promise<QuerySignRequestByIdResponse> {
      return queryService.signRequestById(request);
    }
  };
};
export interface UseParamsQuery<TData> extends ReactQueryParams<QueryParamsResponse, TData> {
  request?: QueryParamsRequest;
}
export interface UseSpacesQuery<TData> extends ReactQueryParams<QuerySpacesResponse, TData> {
  request?: QuerySpacesRequest;
}
export interface UseSpacesByOwnerQuery<TData> extends ReactQueryParams<QuerySpacesResponse, TData> {
  request: QuerySpacesByOwnerRequest;
}
export interface UseKeychainsQuery<TData> extends ReactQueryParams<QueryKeychainsResponse, TData> {
  request?: QueryKeychainsRequest;
}
export interface UseSpaceByIdQuery<TData> extends ReactQueryParams<QuerySpaceByIdResponse, TData> {
  request: QuerySpaceByIdRequest;
}
export interface UseKeychainByIdQuery<TData> extends ReactQueryParams<QueryKeychainByIdResponse, TData> {
  request: QueryKeychainByIdRequest;
}
export interface UseKeyRequestsQuery<TData> extends ReactQueryParams<QueryKeyRequestsResponse, TData> {
  request: QueryKeyRequestsRequest;
}
export interface UseKeyRequestByIdQuery<TData> extends ReactQueryParams<QueryKeyRequestByIdResponse, TData> {
  request: QueryKeyRequestByIdRequest;
}
export interface UseAllKeysQuery<TData> extends ReactQueryParams<QueryKeysResponse, TData> {
  request: QueryAllKeysRequest;
}
export interface UseKeysBySpaceIdQuery<TData> extends ReactQueryParams<QueryKeysResponse, TData> {
  request: QueryKeysBySpaceIdRequest;
}
export interface UseKeyByIdQuery<TData> extends ReactQueryParams<QueryKeyResponse, TData> {
  request: QueryKeyByIdRequest;
}
export interface UseSignRequestsQuery<TData> extends ReactQueryParams<QuerySignRequestsResponse, TData> {
  request: QuerySignRequestsRequest;
}
export interface UseSignRequestByIdQuery<TData> extends ReactQueryParams<QuerySignRequestByIdResponse, TData> {
  request: QuerySignRequestByIdRequest;
}
const _queryClients: WeakMap<ProtobufRpcClient, QueryClientImpl> = new WeakMap();
const getQueryService = (rpc: ProtobufRpcClient | undefined): QueryClientImpl | undefined => {
  if (!rpc) return;
  if (_queryClients.has(rpc)) {
    return _queryClients.get(rpc);
  }
  const queryService = new QueryClientImpl(rpc);
  _queryClients.set(rpc, queryService);
  return queryService;
};
export const createRpcQueryHooks = (rpc: ProtobufRpcClient | undefined) => {
  const queryService = getQueryService(rpc);
  const useParams = <TData = QueryParamsResponse,>({
    request,
    options
  }: UseParamsQuery<TData>) => {
    return useQuery<QueryParamsResponse, Error, TData>(["paramsQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.params(request);
    }, options);
  };
  const useSpaces = <TData = QuerySpacesResponse,>({
    request,
    options
  }: UseSpacesQuery<TData>) => {
    return useQuery<QuerySpacesResponse, Error, TData>(["spacesQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.spaces(request);
    }, options);
  };
  const useSpacesByOwner = <TData = QuerySpacesResponse,>({
    request,
    options
  }: UseSpacesByOwnerQuery<TData>) => {
    return useQuery<QuerySpacesResponse, Error, TData>(["spacesByOwnerQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.spacesByOwner(request);
    }, options);
  };
  const useKeychains = <TData = QueryKeychainsResponse,>({
    request,
    options
  }: UseKeychainsQuery<TData>) => {
    return useQuery<QueryKeychainsResponse, Error, TData>(["keychainsQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.keychains(request);
    }, options);
  };
  const useSpaceById = <TData = QuerySpaceByIdResponse,>({
    request,
    options
  }: UseSpaceByIdQuery<TData>) => {
    return useQuery<QuerySpaceByIdResponse, Error, TData>(["spaceByIdQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.spaceById(request);
    }, options);
  };
  const useKeychainById = <TData = QueryKeychainByIdResponse,>({
    request,
    options
  }: UseKeychainByIdQuery<TData>) => {
    return useQuery<QueryKeychainByIdResponse, Error, TData>(["keychainByIdQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.keychainById(request);
    }, options);
  };
  const useKeyRequests = <TData = QueryKeyRequestsResponse,>({
    request,
    options
  }: UseKeyRequestsQuery<TData>) => {
    return useQuery<QueryKeyRequestsResponse, Error, TData>(["keyRequestsQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.keyRequests(request);
    }, options);
  };
  const useKeyRequestById = <TData = QueryKeyRequestByIdResponse,>({
    request,
    options
  }: UseKeyRequestByIdQuery<TData>) => {
    return useQuery<QueryKeyRequestByIdResponse, Error, TData>(["keyRequestByIdQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.keyRequestById(request);
    }, options);
  };
  const useAllKeys = <TData = QueryKeysResponse,>({
    request,
    options
  }: UseAllKeysQuery<TData>) => {
    return useQuery<QueryKeysResponse, Error, TData>(["allKeysQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.allKeys(request);
    }, options);
  };
  const useKeysBySpaceId = <TData = QueryKeysResponse,>({
    request,
    options
  }: UseKeysBySpaceIdQuery<TData>) => {
    return useQuery<QueryKeysResponse, Error, TData>(["keysBySpaceIdQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.keysBySpaceId(request);
    }, options);
  };
  const useKeyById = <TData = QueryKeyResponse,>({
    request,
    options
  }: UseKeyByIdQuery<TData>) => {
    return useQuery<QueryKeyResponse, Error, TData>(["keyByIdQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.keyById(request);
    }, options);
  };
  const useSignRequests = <TData = QuerySignRequestsResponse,>({
    request,
    options
  }: UseSignRequestsQuery<TData>) => {
    return useQuery<QuerySignRequestsResponse, Error, TData>(["signRequestsQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.signRequests(request);
    }, options);
  };
  const useSignRequestById = <TData = QuerySignRequestByIdResponse,>({
    request,
    options
  }: UseSignRequestByIdQuery<TData>) => {
    return useQuery<QuerySignRequestByIdResponse, Error, TData>(["signRequestByIdQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.signRequestById(request);
    }, options);
  };
  return {
    /** Parameters queries the parameters of the module. */useParams,
    /** Queries a list of Spaces. */useSpaces,
    /** Queries a list of Spaces that have the specified owner. */useSpacesByOwner,
    /** Queries a list of Keychains. */useKeychains,
    /** Queries a Space by its id. */useSpaceById,
    /** Queries a Keychain by its id. */useKeychainById,
    /** Queries a list of KeyRequests. */useKeyRequests,
    /** Queries a KeyRequest by its id. */useKeyRequestById,
    /** Queries a list of Keys. */useAllKeys,
    /** Queries a list of Keys by their Space ID. */useKeysBySpaceId,
    /** Queries a Key by its ID. */useKeyById,
    /** Queries a list of SignRequests. */useSignRequests,
    /** Queries a SignRequest by its id. */useSignRequestById
  };
};