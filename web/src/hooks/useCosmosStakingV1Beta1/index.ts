/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from '../useClient';

export default function useCosmosStakingV1Beta1() {
  const client = useClient();
  const QueryValidators = (query: any, options: any, perPage: number) => {
    const key = { type: 'QueryValidators', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosStakingV1Beta1.query.queryValidators(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryValidator = (validator_addr: string,  options: any) => {
    const key = { type: 'QueryValidator',  validator_addr };    
    return useQuery([key], () => {
      const { validator_addr } = key
      return  client.CosmosStakingV1Beta1.query.queryValidator(validator_addr).then( res => res.data );
    }, options);
  }
  
  const QueryValidatorDelegations = (validator_addr: string, query: any, options: any, perPage: number) => {
    const key = { type: 'QueryValidatorDelegations',  validator_addr, query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const { validator_addr,query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosStakingV1Beta1.query.queryValidatorDelegations(validator_addr, query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryValidatorUnbondingDelegations = (validator_addr: string, query: any, options: any, perPage: number) => {
    const key = { type: 'QueryValidatorUnbondingDelegations',  validator_addr, query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const { validator_addr,query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosStakingV1Beta1.query.queryValidatorUnbondingDelegations(validator_addr, query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryDelegation = (validator_addr: string, delegator_addr: string,  options: any) => {
    const key = { type: 'QueryDelegation',  validator_addr,  delegator_addr };    
    return useQuery([key], () => {
      const { validator_addr,  delegator_addr } = key
      return  client.CosmosStakingV1Beta1.query.queryDelegation(validator_addr, delegator_addr).then( res => res.data );
    }, options);
  }
  
  const QueryUnbondingDelegation = (validator_addr: string, delegator_addr: string,  options: any) => {
    const key = { type: 'QueryUnbondingDelegation',  validator_addr,  delegator_addr };    
    return useQuery([key], () => {
      const { validator_addr,  delegator_addr } = key
      return  client.CosmosStakingV1Beta1.query.queryUnbondingDelegation(validator_addr, delegator_addr).then( res => res.data );
    }, options);
  }
  
  const QueryDelegatorDelegations = (delegator_addr: string, query: any, options: any, perPage: number) => {
    const key = { type: 'QueryDelegatorDelegations',  delegator_addr, query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const { delegator_addr,query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosStakingV1Beta1.query.queryDelegatorDelegations(delegator_addr, query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryDelegatorUnbondingDelegations = (delegator_addr: string, query: any, options: any, perPage: number) => {
    const key = { type: 'QueryDelegatorUnbondingDelegations',  delegator_addr, query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const { delegator_addr,query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosStakingV1Beta1.query.queryDelegatorUnbondingDelegations(delegator_addr, query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryRedelegations = (delegator_addr: string, query: any, options: any, perPage: number) => {
    const key = { type: 'QueryRedelegations',  delegator_addr, query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const { delegator_addr,query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosStakingV1Beta1.query.queryRedelegations(delegator_addr, query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryDelegatorValidators = (delegator_addr: string, query: any, options: any, perPage: number) => {
    const key = { type: 'QueryDelegatorValidators',  delegator_addr, query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const { delegator_addr,query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.CosmosStakingV1Beta1.query.queryDelegatorValidators(delegator_addr, query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryDelegatorValidator = (delegator_addr: string, validator_addr: string,  options: any) => {
    const key = { type: 'QueryDelegatorValidator',  delegator_addr,  validator_addr };    
    return useQuery([key], () => {
      const { delegator_addr,  validator_addr } = key
      return  client.CosmosStakingV1Beta1.query.queryDelegatorValidator(delegator_addr, validator_addr).then( res => res.data );
    }, options);
  }
  
  const QueryHistoricalInfo = (height: string,  options: any) => {
    const key = { type: 'QueryHistoricalInfo',  height };    
    return useQuery([key], () => {
      const { height } = key
      return  client.CosmosStakingV1Beta1.query.queryHistoricalInfo(height).then( res => res.data );
    }, options);
  }
  
  const QueryPool = ( options: any) => {
    const key = { type: 'QueryPool',  };    
    return useQuery([key], () => {
      return  client.CosmosStakingV1Beta1.query.queryPool().then( res => res.data );
    }, options);
  }
  
  const QueryParams = ( options: any) => {
    const key = { type: 'QueryParams',  };    
    return useQuery([key], () => {
      return  client.CosmosStakingV1Beta1.query.queryParams().then( res => res.data );
    }, options);
  }
  
  return {QueryValidators,QueryValidator,QueryValidatorDelegations,QueryValidatorUnbondingDelegations,QueryDelegation,QueryUnbondingDelegation,QueryDelegatorDelegations,QueryDelegatorUnbondingDelegations,QueryRedelegations,QueryDelegatorValidators,QueryDelegatorValidator,QueryHistoricalInfo,QueryPool,QueryParams,
  }
}
