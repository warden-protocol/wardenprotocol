/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from '../useClient';

export default function useCosmwasmWasmV1() {
  const client = useClient();
  const QueryContractInfo = (address: string,  options: any) => {
    const key = { type: 'QueryContractInfo',  address };    
    return useQuery([key], () => {
      const { address } = key
      return  client.CosmwasmWasmV1.query.queryContractInfo(address).then( res => res.data );
    }, options);
  }
  
  const QueryContractHistory = (address: string, query: any, options: any, perPage: number) => {
    const key = { type: 'QueryContractHistory',  address, query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const { address,query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmwasmWasmV1.query.queryContractHistory(address, query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryContractsByCode = (code_id: string, query: any, options: any, perPage: number) => {
    const key = { type: 'QueryContractsByCode',  code_id, query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const { code_id,query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmwasmWasmV1.query.queryContractsByCode(code_id, query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryAllContractState = (address: string, query: any, options: any, perPage: number) => {
    const key = { type: 'QueryAllContractState',  address, query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const { address,query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmwasmWasmV1.query.queryAllContractState(address, query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryRawContractState = (address: string, query_data: string,  options: any) => {
    const key = { type: 'QueryRawContractState',  address,  query_data };    
    return useQuery([key], () => {
      const { address,  query_data } = key
      return  client.CosmwasmWasmV1.query.queryRawContractState(address, query_data).then( res => res.data );
    }, options);
  }
  
  const QuerySmartContractState = (address: string, query_data: string,  options: any) => {
    const key = { type: 'QuerySmartContractState',  address,  query_data };    
    return useQuery([key], () => {
      const { address,  query_data } = key
      return  client.CosmwasmWasmV1.query.querySmartContractState(address, query_data).then( res => res.data );
    }, options);
  }
  
  const QueryCode = (code_id: string,  options: any) => {
    const key = { type: 'QueryCode',  code_id };    
    return useQuery([key], () => {
      const { code_id } = key
      return  client.CosmwasmWasmV1.query.queryCode(code_id).then( res => res.data );
    }, options);
  }
  
  const QueryCodes = (query: any, options: any, perPage: number) => {
    const key = { type: 'QueryCodes', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmwasmWasmV1.query.queryCodes(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryPinnedCodes = (query: any, options: any, perPage: number) => {
    const key = { type: 'QueryPinnedCodes', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmwasmWasmV1.query.queryPinnedCodes(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryParams = ( options: any) => {
    const key = { type: 'QueryParams',  };    
    return useQuery([key], () => {
      return  client.CosmwasmWasmV1.query.queryParams().then( res => res.data );
    }, options);
  }
  
  const QueryContractsByCreator = (creator_address: string, query: any, options: any, perPage: number) => {
    const key = { type: 'QueryContractsByCreator',  creator_address, query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const { creator_address,query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmwasmWasmV1.query.queryContractsByCreator(creator_address, query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  return {QueryContractInfo,QueryContractHistory,QueryContractsByCode,QueryAllContractState,QueryRawContractState,QuerySmartContractState,QueryCode,QueryCodes,QueryPinnedCodes,QueryParams,QueryContractsByCreator,
  }
}
