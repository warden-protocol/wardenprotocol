/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from '../useClient';

export default function useIbcCoreConnectionV1() {
  const client = useClient();
  const QueryConnection = (connection_id: string,  options: any) => {
    const key = { type: 'QueryConnection',  connection_id };    
    return useQuery([key], () => {
      const { connection_id } = key
      return  client.IbcCoreConnectionV1.query.queryConnection(connection_id).then( res => res.data );
    }, options);
  }
  
  const QueryConnections = (query: any, options: any, perPage: number) => {
    const key = { type: 'QueryConnections', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.IbcCoreConnectionV1.query.queryConnections(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryClientConnections = (client_id: string,  options: any) => {
    const key = { type: 'QueryClientConnections',  client_id };    
    return useQuery([key], () => {
      const { client_id } = key
      return  client.IbcCoreConnectionV1.query.queryClientConnections(client_id).then( res => res.data );
    }, options);
  }
  
  const QueryConnectionClientState = (connection_id: string,  options: any) => {
    const key = { type: 'QueryConnectionClientState',  connection_id };    
    return useQuery([key], () => {
      const { connection_id } = key
      return  client.IbcCoreConnectionV1.query.queryConnectionClientState(connection_id).then( res => res.data );
    }, options);
  }
  
  const QueryConnectionConsensusState = (connection_id: string, revision_number: string, revision_height: string,  options: any) => {
    const key = { type: 'QueryConnectionConsensusState',  connection_id,  revision_number,  revision_height };    
    return useQuery([key], () => {
      const { connection_id,  revision_number,  revision_height } = key
      return  client.IbcCoreConnectionV1.query.queryConnectionConsensusState(connection_id, revision_number, revision_height).then( res => res.data );
    }, options);
  }
  
  const QueryConnectionParams = ( options: any) => {
    const key = { type: 'QueryConnectionParams',  };    
    return useQuery([key], () => {
      return  client.IbcCoreConnectionV1.query.queryConnectionParams().then( res => res.data );
    }, options);
  }
  
  return {QueryConnection,QueryConnections,QueryClientConnections,QueryConnectionClientState,QueryConnectionConsensusState,QueryConnectionParams,
  }
}
