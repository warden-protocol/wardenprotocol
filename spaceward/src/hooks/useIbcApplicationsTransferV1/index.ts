/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from '../useClient';

export default function useIbcApplicationsTransferV1() {
  const client = useClient();
  const QueryDenomTraces = (query: any, options: any, perPage: number) => {
    const key = { type: 'QueryDenomTraces', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.IbcApplicationsTransferV1.query.queryDenomTraces(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryDenomTrace = (hash: string,  options: any) => {
    const key = { type: 'QueryDenomTrace',  hash };    
    return useQuery([key], () => {
      const { hash } = key
      return  client.IbcApplicationsTransferV1.query.queryDenomTrace(hash).then( res => res.data );
    }, options);
  }
  
  const QueryParams = ( options: any) => {
    const key = { type: 'QueryParams',  };    
    return useQuery([key], () => {
      return  client.IbcApplicationsTransferV1.query.queryParams().then( res => res.data );
    }, options);
  }
  
  const QueryDenomHash = (trace: string,  options: any) => {
    const key = { type: 'QueryDenomHash',  trace };    
    return useQuery([key], () => {
      const { trace } = key
      return  client.IbcApplicationsTransferV1.query.queryDenomHash(trace).then( res => res.data );
    }, options);
  }
  
  const QueryEscrowAddress = (channel_id: string, port_id: string,  options: any) => {
    const key = { type: 'QueryEscrowAddress',  channel_id,  port_id };    
    return useQuery([key], () => {
      const { channel_id,  port_id } = key
      return  client.IbcApplicationsTransferV1.query.queryEscrowAddress(channel_id, port_id).then( res => res.data );
    }, options);
  }
  
  const QueryTotalEscrowForDenom = (denom: string,  options: any) => {
    const key = { type: 'QueryTotalEscrowForDenom',  denom };    
    return useQuery([key], () => {
      const { denom } = key
      return  client.IbcApplicationsTransferV1.query.queryTotalEscrowForDenom(denom).then( res => res.data );
    }, options);
  }
  
  return {QueryDenomTraces,QueryDenomTrace,QueryParams,QueryDenomHash,QueryEscrowAddress,QueryTotalEscrowForDenom,
  }
}
