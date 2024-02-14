/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from '../useClient';

export default function useCosmosAuthV1Beta1() {
  const client = useClient();
  const QueryAccounts = (query: any, options: any, perPage: number) => {
    const key = { type: 'QueryAccounts', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosAuthV1Beta1.query.queryAccounts(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryAccount = (address: string,  options: any) => {
    const key = { type: 'QueryAccount',  address };    
    return useQuery([key], () => {
      const { address } = key
      return  client.CosmosAuthV1Beta1.query.queryAccount(address).then( res => res.data );
    }, options);
  }
  
  const QueryAccountAddressByID = (id: string, query: any, options: any) => {
    const key = { type: 'QueryAccountAddressByID',  id, query };    
    return useQuery([key], () => {
      const { id,query } = key
      return  client.CosmosAuthV1Beta1.query.queryAccountAddressById(id, query ?? undefined).then( res => res.data );
    }, options);
  }
  
  const QueryParams = ( options: any) => {
    const key = { type: 'QueryParams',  };    
    return useQuery([key], () => {
      return  client.CosmosAuthV1Beta1.query.queryParams().then( res => res.data );
    }, options);
  }
  
  const QueryModuleAccounts = ( options: any) => {
    const key = { type: 'QueryModuleAccounts',  };    
    return useQuery([key], () => {
      return  client.CosmosAuthV1Beta1.query.queryModuleAccounts().then( res => res.data );
    }, options);
  }
  
  const QueryModuleAccountByName = (name: string,  options: any) => {
    const key = { type: 'QueryModuleAccountByName',  name };    
    return useQuery([key], () => {
      const { name } = key
      return  client.CosmosAuthV1Beta1.query.queryModuleAccountByName(name).then( res => res.data );
    }, options);
  }
  
  const QueryBech32Prefix = ( options: any) => {
    const key = { type: 'QueryBech32Prefix',  };    
    return useQuery([key], () => {
      return  client.CosmosAuthV1Beta1.query.queryBech32Prefix().then( res => res.data );
    }, options);
  }
  
  const QueryAddressBytesToString = (address_bytes: string,  options: any) => {
    const key = { type: 'QueryAddressBytesToString',  address_bytes };    
    return useQuery([key], () => {
      const { address_bytes } = key
      return  client.CosmosAuthV1Beta1.query.queryAddressBytesToString(address_bytes).then( res => res.data );
    }, options);
  }
  
  const QueryAddressStringToBytes = (address_string: string,  options: any) => {
    const key = { type: 'QueryAddressStringToBytes',  address_string };    
    return useQuery([key], () => {
      const { address_string } = key
      return  client.CosmosAuthV1Beta1.query.queryAddressStringToBytes(address_string).then( res => res.data );
    }, options);
  }
  
  const QueryAccountInfo = (address: string,  options: any) => {
    const key = { type: 'QueryAccountInfo',  address };    
    return useQuery([key], () => {
      const { address } = key
      return  client.CosmosAuthV1Beta1.query.queryAccountInfo(address).then( res => res.data );
    }, options);
  }
  
  return {QueryAccounts,QueryAccount,QueryAccountAddressByID,QueryParams,QueryModuleAccounts,QueryModuleAccountByName,QueryBech32Prefix,QueryAddressBytesToString,QueryAddressStringToBytes,QueryAccountInfo,
  }
}
