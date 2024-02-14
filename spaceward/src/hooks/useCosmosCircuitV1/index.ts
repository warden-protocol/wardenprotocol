/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from '../useClient';

export default function useCosmosCircuitV1() {
  const client = useClient();
  const QueryAccount = (address: string,  options: any) => {
    const key = { type: 'QueryAccount',  address };    
    return useQuery([key], () => {
      const { address } = key
      return  client.CosmosCircuitV1.query.queryAccount(address).then( res => res.data );
    }, options);
  }
  
  const QueryAccounts = (query: any, options: any, perPage: number) => {
    const key = { type: 'QueryAccounts', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosCircuitV1.query.queryAccounts(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryDisabledList = ( options: any) => {
    const key = { type: 'QueryDisabledList',  };    
    return useQuery([key], () => {
      return  client.CosmosCircuitV1.query.queryDisabledList().then( res => res.data );
    }, options);
  }
  
  return {QueryAccount,QueryAccounts,QueryDisabledList,
  }
}
