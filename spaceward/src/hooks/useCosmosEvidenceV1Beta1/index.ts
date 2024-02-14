/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from '../useClient';

export default function useCosmosEvidenceV1Beta1() {
  const client = useClient();
  const QueryEvidence = (hash: string, query: any, options: any) => {
    const key = { type: 'QueryEvidence',  hash, query };    
    return useQuery([key], () => {
      const { hash,query } = key
      return  client.CosmosEvidenceV1Beta1.query.queryEvidence(hash, query ?? undefined).then( res => res.data );
    }, options);
  }
  
  const QueryAllEvidence = (query: any, options: any, perPage: number) => {
    const key = { type: 'QueryAllEvidence', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosEvidenceV1Beta1.query.queryAllEvidence(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  return {QueryEvidence,QueryAllEvidence,
  }
}
