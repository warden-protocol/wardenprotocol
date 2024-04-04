/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from '../useClient';

export default function useWardenWardenV1Beta2() {
  const client = useClient();
  const QueryParams = ( options: any) => {
    const key = { type: 'QueryParams',  };
    return useQuery([key], () => {
      return  client.WardenWardenV1Beta2.query.queryParams().then( res => res.data );
    }, options);
  }

  const QuerySpaces = (query: any, options: any, perPage: number) => {
    const key = { type: 'QuerySpaces', query };
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.WardenWardenV1Beta2.query.querySpaces(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }

  const QuerySpacesByOwner = (query: any, options: any, perPage: number) => {
    const key = { type: 'QuerySpacesByOwner', query };
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.WardenWardenV1Beta2.query.querySpacesByOwner(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }

  const QueryKeychains = (query: any, options: any, perPage: number) => {
    const key = { type: 'QueryKeychains', query };
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.WardenWardenV1Beta2.query.queryKeychains(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }

  const QuerySpaceById = (query: any, options: any) => {
    const key = { type: 'QuerySpaceById', query };
    return useQuery([key], () => {
      const {query } = key
      return  client.WardenWardenV1Beta2.query.querySpaceById(query ?? undefined).then( res => res.data );
    }, options);
  }

  const QueryKeychainById = (query: any, options: any) => {
    const key = { type: 'QueryKeychainById', query };
    return useQuery([key], () => {
      const {query } = key
      return  client.WardenWardenV1Beta2.query.queryKeychainById(query ?? undefined).then( res => res.data );
    }, options);
  }

  const QueryKeyRequests = (query: any, options: any, perPage: number) => {
    const key = { type: 'QueryKeyRequests', query };
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.WardenWardenV1Beta2.query.queryKeyRequests(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }

  const QueryKeyRequestById = (query: any, options: any) => {
    const key = { type: 'QueryKeyRequestById', query };
    return useQuery([key], () => {
      const {query } = key
      return  client.WardenWardenV1Beta2.query.queryKeyRequestById(query ?? undefined).then( res => res.data );
    }, options);
  }

  const QueryAllKeys = (query: any, options: any, perPage: number) => {
    const key = { type: 'QueryAllKeys', query };
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.WardenWardenV1Beta2.query.queryAllKeys(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }

  const QueryKeysBySpaceId = (query: any, options: any, perPage: number) => {
    const key = { type: 'QueryKeysBySpaceId', query };
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.WardenWardenV1Beta2.query.queryKeysBySpaceId(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }

  const QueryKeyById = (query: any, options: any) => {
    const key = { type: 'QueryKeyById', query };
    return useQuery([key], () => {
      const {query } = key
      return  client.WardenWardenV1Beta2.query.queryKeyById(query ?? undefined).then( res => res.data );
    }, options);
  }

  const QuerySignatureRequests = (query: any, options: any, perPage: number) => {
    const key = { type: 'QuerySignatureRequests', query };
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.WardenWardenV1Beta2.query.querySignatureRequests(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }

  const QuerySignatureRequestById = (query: any, options: any) => {
    const key = { type: 'QuerySignatureRequestById', query };
    return useQuery([key], () => {
      const {query } = key
      return  client.WardenWardenV1Beta2.query.querySignatureRequestById(query ?? undefined).then( res => res.data );
    }, options);
  }

  const QuerySignTransactionRequests = (query: any, options: any, perPage: number) => {
    const key = { type: 'QuerySignTransactionRequests', query };
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.WardenWardenV1Beta2.query.querySignTransactionRequests(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }

  const QuerySignTransactionRequestById = (query: any, options: any) => {
    const key = { type: 'QuerySignTransactionRequestById', query };
    return useQuery([key], () => {
      const {query } = key
      return  client.WardenWardenV1Beta2.query.querySignTransactionRequestById(query ?? undefined).then( res => res.data );
    }, options);
  }

  return {QueryParams,QuerySpaces,QuerySpacesByOwner,QueryKeychains,QuerySpaceById,QueryKeychainById,QueryKeyRequests,QueryKeyRequestById,QueryAllKeys,QueryKeysBySpaceId,QueryKeyById,QuerySignatureRequests,QuerySignatureRequestById,QuerySignTransactionRequests,QuerySignTransactionRequestById,
  }
}
