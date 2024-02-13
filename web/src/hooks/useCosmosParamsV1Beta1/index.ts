/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from '../useClient';

export default function useCosmosParamsV1Beta1() {
  const client = useClient();
  const QueryParams = (query: any, options: any) => {
    const key = { type: 'QueryParams', query };    
    return useQuery([key], () => {
      const {query } = key
      return  client.CosmosParamsV1Beta1.query.queryParams(query ?? undefined).then( res => res.data );
    }, options);
  }
  
  const QuerySubspaces = ( options: any) => {
    const key = { type: 'QuerySubspaces',  };    
    return useQuery([key], () => {
      return  client.CosmosParamsV1Beta1.query.querySubspaces().then( res => res.data );
    }, options);
  }
  
  return {QueryParams,QuerySubspaces,
  }
}
