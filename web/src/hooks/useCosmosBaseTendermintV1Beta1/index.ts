/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from '../useClient';

export default function useCosmosBaseTendermintV1Beta1() {
  const client = useClient();
  const ServiceGetNodeInfo = ( options: any) => {
    const key = { type: 'ServiceGetNodeInfo',  };    
    return useQuery([key], () => {
      return  client.CosmosBaseTendermintV1Beta1.query.serviceGetNodeInfo().then( res => res.data );
    }, options);
  }
  
  const ServiceGetSyncing = ( options: any) => {
    const key = { type: 'ServiceGetSyncing',  };    
    return useQuery([key], () => {
      return  client.CosmosBaseTendermintV1Beta1.query.serviceGetSyncing().then( res => res.data );
    }, options);
  }
  
  const ServiceGetLatestBlock = ( options: any) => {
    const key = { type: 'ServiceGetLatestBlock',  };    
    return useQuery([key], () => {
      return  client.CosmosBaseTendermintV1Beta1.query.serviceGetLatestBlock().then( res => res.data );
    }, options);
  }
  
  const ServiceGetBlockByHeight = (height: string,  options: any) => {
    const key = { type: 'ServiceGetBlockByHeight',  height };    
    return useQuery([key], () => {
      const { height } = key
      return  client.CosmosBaseTendermintV1Beta1.query.serviceGetBlockByHeight(height).then( res => res.data );
    }, options);
  }
  
  const ServiceGetLatestValidatorSet = (query: any, options: any, perPage: number) => {
    const key = { type: 'ServiceGetLatestValidatorSet', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosBaseTendermintV1Beta1.query.serviceGetLatestValidatorSet(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const ServiceGetValidatorSetByHeight = (height: string, query: any, options: any, perPage: number) => {
    const key = { type: 'ServiceGetValidatorSetByHeight',  height, query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const { height,query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosBaseTendermintV1Beta1.query.serviceGetValidatorSetByHeight(height, query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const ServiceABCIQuery = (query: any, options: any) => {
    const key = { type: 'ServiceABCIQuery', query };    
    return useQuery([key], () => {
      const {query } = key
      return  client.CosmosBaseTendermintV1Beta1.query.serviceAbciquery(query ?? undefined).then( res => res.data );
    }, options);
  }
  
  return {ServiceGetNodeInfo,ServiceGetSyncing,ServiceGetLatestBlock,ServiceGetBlockByHeight,ServiceGetLatestValidatorSet,ServiceGetValidatorSetByHeight,ServiceABCIQuery,
  }
}
