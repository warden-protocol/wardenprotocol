//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { QueryClient, createProtobufRpcClient, ProtobufRpcClient } from "@cosmjs/stargate";
import { ReactQueryParams } from "../../../react-query.js";
import { useQuery } from "@tanstack/react-query";
import { QueryParamsRequest, QueryParamsResponse, QuerySpacesRequest, QuerySpacesResponse, QuerySpacesByOwnerRequest, QueryKeychainsRequest, QueryKeychainsResponse, QuerySpaceByAddressRequest, QuerySpaceByAddressResponse, QueryKeychainByAddressRequest, QueryKeychainByAddressResponse, QueryKeyRequestsRequest, QueryKeyRequestsResponse, QueryKeyRequestByIdRequest, QueryKeyRequestByIdResponse, QueryKeysRequest, QueryKeysResponse, QuerySignatureRequestsRequest, QuerySignatureRequestsResponse, QuerySignatureRequestByIdRequest, QuerySignatureRequestByIdResponse, QuerySignTransactionRequestsRequest, QuerySignTransactionRequestsResponse, QuerySignTransactionRequestByIdRequest, QuerySignTransactionRequestByIdResponse } from "./query.js";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of Spaces items. */
  spaces(request?: QuerySpacesRequest): Promise<QuerySpacesResponse>;
  /** Queries a list of Spaces that has the specified owner. */
  spacesByOwner(request: QuerySpacesByOwnerRequest): Promise<QuerySpacesResponse>;
  /** Queries a list of Keychains items. */
  keychains(request?: QueryKeychainsRequest): Promise<QueryKeychainsResponse>;
  /** Queries a list of SpaceByAddress items. */
  spaceByAddress(request: QuerySpaceByAddressRequest): Promise<QuerySpaceByAddressResponse>;
  /** Queries a list of KeychainById items. */
  keychainByAddress(request: QueryKeychainByAddressRequest): Promise<QueryKeychainByAddressResponse>;
  /** Queries a list of KeyRequests items. */
  keyRequests(request: QueryKeyRequestsRequest): Promise<QueryKeyRequestsResponse>;
  /** Queries a single KeyRequest by its id. */
  keyRequestById(request: QueryKeyRequestByIdRequest): Promise<QueryKeyRequestByIdResponse>;
  /** Queries a list of Keys items. */
  keys(request: QueryKeysRequest): Promise<QueryKeysResponse>;
  /** Queries a list of SignatureRequests items. */
  signatureRequests(request: QuerySignatureRequestsRequest): Promise<QuerySignatureRequestsResponse>;
  /** Queries a single SignatureRequest by its id. */
  signatureRequestById(request: QuerySignatureRequestByIdRequest): Promise<QuerySignatureRequestByIdResponse>;
  /** Queries a list of SignTransactionRequests items. */
  signTransactionRequests(request: QuerySignTransactionRequestsRequest): Promise<QuerySignTransactionRequestsResponse>;
  /** Queries a list of SignTransactionRequestById items. */
  signTransactionRequestById(request: QuerySignTransactionRequestByIdRequest): Promise<QuerySignTransactionRequestByIdResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.spaces = this.spaces.bind(this);
    this.spacesByOwner = this.spacesByOwner.bind(this);
    this.keychains = this.keychains.bind(this);
    this.spaceByAddress = this.spaceByAddress.bind(this);
    this.keychainByAddress = this.keychainByAddress.bind(this);
    this.keyRequests = this.keyRequests.bind(this);
    this.keyRequestById = this.keyRequestById.bind(this);
    this.keys = this.keys.bind(this);
    this.signatureRequests = this.signatureRequests.bind(this);
    this.signatureRequestById = this.signatureRequestById.bind(this);
    this.signTransactionRequests = this.signTransactionRequests.bind(this);
    this.signTransactionRequestById = this.signTransactionRequestById.bind(this);
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  spaces(request: QuerySpacesRequest = {
    pagination: undefined
  }): Promise<QuerySpacesResponse> {
    const data = QuerySpacesRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta1.Query", "Spaces", data);
    return promise.then(data => QuerySpacesResponse.decode(new BinaryReader(data)));
  }
  spacesByOwner(request: QuerySpacesByOwnerRequest): Promise<QuerySpacesResponse> {
    const data = QuerySpacesByOwnerRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta1.Query", "SpacesByOwner", data);
    return promise.then(data => QuerySpacesResponse.decode(new BinaryReader(data)));
  }
  keychains(request: QueryKeychainsRequest = {
    pagination: undefined
  }): Promise<QueryKeychainsResponse> {
    const data = QueryKeychainsRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta1.Query", "Keychains", data);
    return promise.then(data => QueryKeychainsResponse.decode(new BinaryReader(data)));
  }
  spaceByAddress(request: QuerySpaceByAddressRequest): Promise<QuerySpaceByAddressResponse> {
    const data = QuerySpaceByAddressRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta1.Query", "SpaceByAddress", data);
    return promise.then(data => QuerySpaceByAddressResponse.decode(new BinaryReader(data)));
  }
  keychainByAddress(request: QueryKeychainByAddressRequest): Promise<QueryKeychainByAddressResponse> {
    const data = QueryKeychainByAddressRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta1.Query", "KeychainByAddress", data);
    return promise.then(data => QueryKeychainByAddressResponse.decode(new BinaryReader(data)));
  }
  keyRequests(request: QueryKeyRequestsRequest): Promise<QueryKeyRequestsResponse> {
    const data = QueryKeyRequestsRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta1.Query", "KeyRequests", data);
    return promise.then(data => QueryKeyRequestsResponse.decode(new BinaryReader(data)));
  }
  keyRequestById(request: QueryKeyRequestByIdRequest): Promise<QueryKeyRequestByIdResponse> {
    const data = QueryKeyRequestByIdRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta1.Query", "KeyRequestById", data);
    return promise.then(data => QueryKeyRequestByIdResponse.decode(new BinaryReader(data)));
  }
  keys(request: QueryKeysRequest): Promise<QueryKeysResponse> {
    const data = QueryKeysRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta1.Query", "Keys", data);
    return promise.then(data => QueryKeysResponse.decode(new BinaryReader(data)));
  }
  signatureRequests(request: QuerySignatureRequestsRequest): Promise<QuerySignatureRequestsResponse> {
    const data = QuerySignatureRequestsRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta1.Query", "SignatureRequests", data);
    return promise.then(data => QuerySignatureRequestsResponse.decode(new BinaryReader(data)));
  }
  signatureRequestById(request: QuerySignatureRequestByIdRequest): Promise<QuerySignatureRequestByIdResponse> {
    const data = QuerySignatureRequestByIdRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta1.Query", "SignatureRequestById", data);
    return promise.then(data => QuerySignatureRequestByIdResponse.decode(new BinaryReader(data)));
  }
  signTransactionRequests(request: QuerySignTransactionRequestsRequest): Promise<QuerySignTransactionRequestsResponse> {
    const data = QuerySignTransactionRequestsRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta1.Query", "SignTransactionRequests", data);
    return promise.then(data => QuerySignTransactionRequestsResponse.decode(new BinaryReader(data)));
  }
  signTransactionRequestById(request: QuerySignTransactionRequestByIdRequest): Promise<QuerySignTransactionRequestByIdResponse> {
    const data = QuerySignTransactionRequestByIdRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta1.Query", "SignTransactionRequestById", data);
    return promise.then(data => QuerySignTransactionRequestByIdResponse.decode(new BinaryReader(data)));
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
    spaceByAddress(request: QuerySpaceByAddressRequest): Promise<QuerySpaceByAddressResponse> {
      return queryService.spaceByAddress(request);
    },
    keychainByAddress(request: QueryKeychainByAddressRequest): Promise<QueryKeychainByAddressResponse> {
      return queryService.keychainByAddress(request);
    },
    keyRequests(request: QueryKeyRequestsRequest): Promise<QueryKeyRequestsResponse> {
      return queryService.keyRequests(request);
    },
    keyRequestById(request: QueryKeyRequestByIdRequest): Promise<QueryKeyRequestByIdResponse> {
      return queryService.keyRequestById(request);
    },
    keys(request: QueryKeysRequest): Promise<QueryKeysResponse> {
      return queryService.keys(request);
    },
    signatureRequests(request: QuerySignatureRequestsRequest): Promise<QuerySignatureRequestsResponse> {
      return queryService.signatureRequests(request);
    },
    signatureRequestById(request: QuerySignatureRequestByIdRequest): Promise<QuerySignatureRequestByIdResponse> {
      return queryService.signatureRequestById(request);
    },
    signTransactionRequests(request: QuerySignTransactionRequestsRequest): Promise<QuerySignTransactionRequestsResponse> {
      return queryService.signTransactionRequests(request);
    },
    signTransactionRequestById(request: QuerySignTransactionRequestByIdRequest): Promise<QuerySignTransactionRequestByIdResponse> {
      return queryService.signTransactionRequestById(request);
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
export interface UseSpaceByAddressQuery<TData> extends ReactQueryParams<QuerySpaceByAddressResponse, TData> {
  request: QuerySpaceByAddressRequest;
}
export interface UseKeychainByAddressQuery<TData> extends ReactQueryParams<QueryKeychainByAddressResponse, TData> {
  request: QueryKeychainByAddressRequest;
}
export interface UseKeyRequestsQuery<TData> extends ReactQueryParams<QueryKeyRequestsResponse, TData> {
  request: QueryKeyRequestsRequest;
}
export interface UseKeyRequestByIdQuery<TData> extends ReactQueryParams<QueryKeyRequestByIdResponse, TData> {
  request: QueryKeyRequestByIdRequest;
}
export interface UseKeysQuery<TData> extends ReactQueryParams<QueryKeysResponse, TData> {
  request: QueryKeysRequest;
}
export interface UseSignatureRequestsQuery<TData> extends ReactQueryParams<QuerySignatureRequestsResponse, TData> {
  request: QuerySignatureRequestsRequest;
}
export interface UseSignatureRequestByIdQuery<TData> extends ReactQueryParams<QuerySignatureRequestByIdResponse, TData> {
  request: QuerySignatureRequestByIdRequest;
}
export interface UseSignTransactionRequestsQuery<TData> extends ReactQueryParams<QuerySignTransactionRequestsResponse, TData> {
  request: QuerySignTransactionRequestsRequest;
}
export interface UseSignTransactionRequestByIdQuery<TData> extends ReactQueryParams<QuerySignTransactionRequestByIdResponse, TData> {
  request: QuerySignTransactionRequestByIdRequest;
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
  const useSpaceByAddress = <TData = QuerySpaceByAddressResponse,>({
    request,
    options
  }: UseSpaceByAddressQuery<TData>) => {
    return useQuery<QuerySpaceByAddressResponse, Error, TData>(["spaceByAddressQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.spaceByAddress(request);
    }, options);
  };
  const useKeychainByAddress = <TData = QueryKeychainByAddressResponse,>({
    request,
    options
  }: UseKeychainByAddressQuery<TData>) => {
    return useQuery<QueryKeychainByAddressResponse, Error, TData>(["keychainByAddressQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.keychainByAddress(request);
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
  const useKeys = <TData = QueryKeysResponse,>({
    request,
    options
  }: UseKeysQuery<TData>) => {
    return useQuery<QueryKeysResponse, Error, TData>(["keysQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.keys(request);
    }, options);
  };
  const useSignatureRequests = <TData = QuerySignatureRequestsResponse,>({
    request,
    options
  }: UseSignatureRequestsQuery<TData>) => {
    return useQuery<QuerySignatureRequestsResponse, Error, TData>(["signatureRequestsQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.signatureRequests(request);
    }, options);
  };
  const useSignatureRequestById = <TData = QuerySignatureRequestByIdResponse,>({
    request,
    options
  }: UseSignatureRequestByIdQuery<TData>) => {
    return useQuery<QuerySignatureRequestByIdResponse, Error, TData>(["signatureRequestByIdQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.signatureRequestById(request);
    }, options);
  };
  const useSignTransactionRequests = <TData = QuerySignTransactionRequestsResponse,>({
    request,
    options
  }: UseSignTransactionRequestsQuery<TData>) => {
    return useQuery<QuerySignTransactionRequestsResponse, Error, TData>(["signTransactionRequestsQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.signTransactionRequests(request);
    }, options);
  };
  const useSignTransactionRequestById = <TData = QuerySignTransactionRequestByIdResponse,>({
    request,
    options
  }: UseSignTransactionRequestByIdQuery<TData>) => {
    return useQuery<QuerySignTransactionRequestByIdResponse, Error, TData>(["signTransactionRequestByIdQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.signTransactionRequestById(request);
    }, options);
  };
  return {
    /** Parameters queries the parameters of the module. */useParams,
    /** Queries a list of Spaces items. */useSpaces,
    /** Queries a list of Spaces that has the specified owner. */useSpacesByOwner,
    /** Queries a list of Keychains items. */useKeychains,
    /** Queries a list of SpaceByAddress items. */useSpaceByAddress,
    /** Queries a list of KeychainById items. */useKeychainByAddress,
    /** Queries a list of KeyRequests items. */useKeyRequests,
    /** Queries a single KeyRequest by its id. */useKeyRequestById,
    /** Queries a list of Keys items. */useKeys,
    /** Queries a list of SignatureRequests items. */useSignatureRequests,
    /** Queries a single SignatureRequest by its id. */useSignatureRequestById,
    /** Queries a list of SignTransactionRequests items. */useSignTransactionRequests,
    /** Queries a list of SignTransactionRequestById items. */useSignTransactionRequestById
  };
};