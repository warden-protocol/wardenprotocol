/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from '../useClient';

export default function useCosmosSlashingV1Beta1() {
  const client = useClient();
  const QueryParams = ( options: any) => {
    const key = { type: 'QueryParams',  };    
    return useQuery([key], () => {
      return  client.CosmosSlashingV1Beta1.query.queryParams().then( res => res.data );
    }, options);
  }
  
  const QuerySigningInfo = (cons_address: string,  options: any) => {
    const key = { type: 'QuerySigningInfo',  cons_address };    
    return useQuery([key], () => {
      const { cons_address } = key
      return  client.CosmosSlashingV1Beta1.query.querySigningInfo(cons_address).then( res => res.data );
    }, options);
  }
  
  const QuerySigningInfos = (query: any, options: any, perPage: number) => {
    const key = { type: 'QuerySigningInfos', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosSlashingV1Beta1.query.querySigningInfos(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  return {QueryParams,QuerySigningInfo,QuerySigningInfos,
  }
}
