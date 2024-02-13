/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from '../useClient';

export default function useWardenWarden() {
  const client = useClient();
  const QueryParams = ( options: any) => {
    const key = { type: 'QueryParams',  };    
    return useQuery([key], () => {
      return  client.WardenWarden.query.queryParams().then( res => res.data );
    }, options);
  }
  
  const QuerySpaces = (query: any, options: any, perPage: number) => {
    const key = { type: 'QuerySpaces', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.WardenWarden.query.querySpaces(query ?? undefined).then( res => ({...res.data,pageParam}) );
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
      return  client.WardenWarden.query.querySpacesByOwner(query ?? undefined).then( res => ({...res.data,pageParam}) );
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
      return  client.WardenWarden.query.queryKeychains(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QuerySpaceByAddress = (query: any, options: any) => {
    const key = { type: 'QuerySpaceByAddress', query };    
    return useQuery([key], () => {
      const {query } = key
      return  client.WardenWarden.query.querySpaceByAddress(query ?? undefined).then( res => res.data );
    }, options);
  }
  
  const QueryKeychainByAddress = (query: any, options: any) => {
    const key = { type: 'QueryKeychainByAddress', query };    
    return useQuery([key], () => {
      const {query } = key
      return  client.WardenWarden.query.queryKeychainByAddress(query ?? undefined).then( res => res.data );
    }, options);
  }
  
  const QueryKeyRequests = (query: any, options: any, perPage: number) => {
    const key = { type: 'QueryKeyRequests', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.WardenWarden.query.queryKeyRequests(query ?? undefined).then( res => ({...res.data,pageParam}) );
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
      return  client.WardenWarden.query.queryKeyRequestById(query ?? undefined).then( res => res.data );
    }, options);
  }
  
  const QueryKeys = (query: any, options: any, perPage: number) => {
    const key = { type: 'QueryKeys', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.WardenWarden.query.queryKeys(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QuerySignatureRequests = (query: any, options: any, perPage: number) => {
    const key = { type: 'QuerySignatureRequests', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.WardenWarden.query.querySignatureRequests(query ?? undefined).then( res => ({...res.data,pageParam}) );
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
      return  client.WardenWarden.query.querySignatureRequestById(query ?? undefined).then( res => res.data );
    }, options);
  }
  
  const QuerySignTransactionRequests = (query: any, options: any, perPage: number) => {
    const key = { type: 'QuerySignTransactionRequests', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.WardenWarden.query.querySignTransactionRequests(query ?? undefined).then( res => ({...res.data,pageParam}) );
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
      return  client.WardenWarden.query.querySignTransactionRequestById(query ?? undefined).then( res => res.data );
    }, options);
  }
  
  return {QueryParams,QuerySpaces,QuerySpacesByOwner,QueryKeychains,QuerySpaceByAddress,QueryKeychainByAddress,QueryKeyRequests,QueryKeyRequestById,QueryKeys,QuerySignatureRequests,QuerySignatureRequestById,QuerySignTransactionRequests,QuerySignTransactionRequestById,
  }
}
