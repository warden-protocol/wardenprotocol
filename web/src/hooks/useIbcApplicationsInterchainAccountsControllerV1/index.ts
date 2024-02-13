/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from '../useClient';

export default function useIbcApplicationsInterchainAccountsControllerV1() {
  const client = useClient();
  const QueryInterchainAccount = (owner: string, connection_id: string,  options: any) => {
    const key = { type: 'QueryInterchainAccount',  owner,  connection_id };    
    return useQuery([key], () => {
      const { owner,  connection_id } = key
      return  client.IbcApplicationsInterchainAccountsControllerV1.query.queryInterchainAccount(owner, connection_id).then( res => res.data );
    }, options);
  }
  
  const QueryParams = ( options: any) => {
    const key = { type: 'QueryParams',  };    
    return useQuery([key], () => {
      return  client.IbcApplicationsInterchainAccountsControllerV1.query.queryParams().then( res => res.data );
    }, options);
  }
  
  return {QueryInterchainAccount,QueryParams,
  }
}
