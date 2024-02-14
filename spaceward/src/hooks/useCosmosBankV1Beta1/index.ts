/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from '../useClient';

export default function useCosmosBankV1Beta1() {
  const client = useClient();
  const QueryBalance = (address: string, query: any, options: any) => {
    const key = { type: 'QueryBalance',  address, query };    
    return useQuery([key], () => {
      const { address,query } = key
      return  client.CosmosBankV1Beta1.query.queryBalance(address, query ?? undefined).then( res => res.data );
    }, options);
  }
  
  const QueryAllBalances = (address: string, query: any, options: any, perPage: number) => {
    const key = { type: 'QueryAllBalances',  address, query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const { address,query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosBankV1Beta1.query.queryAllBalances(address, query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QuerySpendableBalances = (address: string, query: any, options: any, perPage: number) => {
    const key = { type: 'QuerySpendableBalances',  address, query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const { address,query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosBankV1Beta1.query.querySpendableBalances(address, query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QuerySpendableBalanceByDenom = (address: string, query: any, options: any) => {
    const key = { type: 'QuerySpendableBalanceByDenom',  address, query };    
    return useQuery([key], () => {
      const { address,query } = key
      return  client.CosmosBankV1Beta1.query.querySpendableBalanceByDenom(address, query ?? undefined).then( res => res.data );
    }, options);
  }
  
  const QueryTotalSupply = (query: any, options: any, perPage: number) => {
    const key = { type: 'QueryTotalSupply', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosBankV1Beta1.query.queryTotalSupply(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QuerySupplyOf = (query: any, options: any) => {
    const key = { type: 'QuerySupplyOf', query };    
    return useQuery([key], () => {
      const {query } = key
      return  client.CosmosBankV1Beta1.query.querySupplyOf(query ?? undefined).then( res => res.data );
    }, options);
  }
  
  const QueryParams = ( options: any) => {
    const key = { type: 'QueryParams',  };    
    return useQuery([key], () => {
      return  client.CosmosBankV1Beta1.query.queryParams().then( res => res.data );
    }, options);
  }
  
  const QueryDenomMetadata = (denom: string,  options: any) => {
    const key = { type: 'QueryDenomMetadata',  denom };    
    return useQuery([key], () => {
      const { denom } = key
      return  client.CosmosBankV1Beta1.query.queryDenomMetadata(denom).then( res => res.data );
    }, options);
  }
  
  const QueryDenomMetadataByQueryString = (query: any, options: any) => {
    const key = { type: 'QueryDenomMetadataByQueryString', query };    
    return useQuery([key], () => {
      const {query } = key
      return  client.CosmosBankV1Beta1.query.queryDenomMetadataByQueryString(query ?? undefined).then( res => res.data );
    }, options);
  }
  
  const QueryDenomsMetadata = (query: any, options: any, perPage: number) => {
    const key = { type: 'QueryDenomsMetadata', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosBankV1Beta1.query.queryDenomsMetadata(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryDenomOwners = (denom: string, query: any, options: any, perPage: number) => {
    const key = { type: 'QueryDenomOwners',  denom, query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const { denom,query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosBankV1Beta1.query.queryDenomOwners(denom, query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryDenomOwnersByQuery = (query: any, options: any, perPage: number) => {
    const key = { type: 'QueryDenomOwnersByQuery', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosBankV1Beta1.query.queryDenomOwnersByQuery(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QuerySendEnabled = (query: any, options: any, perPage: number) => {
    const key = { type: 'QuerySendEnabled', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosBankV1Beta1.query.querySendEnabled(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  return {QueryBalance,QueryAllBalances,QuerySpendableBalances,QuerySpendableBalanceByDenom,QueryTotalSupply,QuerySupplyOf,QueryParams,QueryDenomMetadata,QueryDenomMetadataByQueryString,QueryDenomsMetadata,QueryDenomOwners,QueryDenomOwnersByQuery,QuerySendEnabled,
  }
}
