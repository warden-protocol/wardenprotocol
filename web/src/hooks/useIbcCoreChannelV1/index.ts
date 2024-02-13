/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from '../useClient';

export default function useIbcCoreChannelV1() {
  const client = useClient();
  const QueryChannel = (channel_id: string, port_id: string,  options: any) => {
    const key = { type: 'QueryChannel',  channel_id,  port_id };    
    return useQuery([key], () => {
      const { channel_id,  port_id } = key
      return  client.IbcCoreChannelV1.query.queryChannel(channel_id, port_id).then( res => res.data );
    }, options);
  }
  
  const QueryChannels = (query: any, options: any, perPage: number) => {
    const key = { type: 'QueryChannels', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.IbcCoreChannelV1.query.queryChannels(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryConnectionChannels = (connection: string, query: any, options: any, perPage: number) => {
    const key = { type: 'QueryConnectionChannels',  connection, query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const { connection,query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.IbcCoreChannelV1.query.queryConnectionChannels(connection, query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryChannelClientState = (channel_id: string, port_id: string,  options: any) => {
    const key = { type: 'QueryChannelClientState',  channel_id,  port_id };    
    return useQuery([key], () => {
      const { channel_id,  port_id } = key
      return  client.IbcCoreChannelV1.query.queryChannelClientState(channel_id, port_id).then( res => res.data );
    }, options);
  }
  
  const QueryChannelConsensusState = (channel_id: string, port_id: string, revision_number: string, revision_height: string,  options: any) => {
    const key = { type: 'QueryChannelConsensusState',  channel_id,  port_id,  revision_number,  revision_height };    
    return useQuery([key], () => {
      const { channel_id,  port_id,  revision_number,  revision_height } = key
      return  client.IbcCoreChannelV1.query.queryChannelConsensusState(channel_id, port_id, revision_number, revision_height).then( res => res.data );
    }, options);
  }
  
  const QueryPacketCommitment = (channel_id: string, port_id: string, sequence: string,  options: any) => {
    const key = { type: 'QueryPacketCommitment',  channel_id,  port_id,  sequence };    
    return useQuery([key], () => {
      const { channel_id,  port_id,  sequence } = key
      return  client.IbcCoreChannelV1.query.queryPacketCommitment(channel_id, port_id, sequence).then( res => res.data );
    }, options);
  }
  
  const QueryPacketCommitments = (channel_id: string, port_id: string, query: any, options: any, perPage: number) => {
    const key = { type: 'QueryPacketCommitments',  channel_id,  port_id, query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const { channel_id,  port_id,query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.IbcCoreChannelV1.query.queryPacketCommitments(channel_id, port_id, query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryPacketReceipt = (channel_id: string, port_id: string, sequence: string,  options: any) => {
    const key = { type: 'QueryPacketReceipt',  channel_id,  port_id,  sequence };    
    return useQuery([key], () => {
      const { channel_id,  port_id,  sequence } = key
      return  client.IbcCoreChannelV1.query.queryPacketReceipt(channel_id, port_id, sequence).then( res => res.data );
    }, options);
  }
  
  const QueryPacketAcknowledgement = (channel_id: string, port_id: string, sequence: string,  options: any) => {
    const key = { type: 'QueryPacketAcknowledgement',  channel_id,  port_id,  sequence };    
    return useQuery([key], () => {
      const { channel_id,  port_id,  sequence } = key
      return  client.IbcCoreChannelV1.query.queryPacketAcknowledgement(channel_id, port_id, sequence).then( res => res.data );
    }, options);
  }
  
  const QueryPacketAcknowledgements = (channel_id: string, port_id: string, query: any, options: any, perPage: number) => {
    const key = { type: 'QueryPacketAcknowledgements',  channel_id,  port_id, query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const { channel_id,  port_id,query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.IbcCoreChannelV1.query.queryPacketAcknowledgements(channel_id, port_id, query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryUnreceivedPackets = (channel_id: string, port_id: string, packet_commitment_sequences: string,  options: any) => {
    const key = { type: 'QueryUnreceivedPackets',  channel_id,  port_id,  packet_commitment_sequences };    
    return useQuery([key], () => {
      const { channel_id,  port_id,  packet_commitment_sequences } = key
      return  client.IbcCoreChannelV1.query.queryUnreceivedPackets(channel_id, port_id, packet_commitment_sequences).then( res => res.data );
    }, options);
  }
  
  const QueryUnreceivedAcks = (channel_id: string, port_id: string, packet_ack_sequences: string,  options: any) => {
    const key = { type: 'QueryUnreceivedAcks',  channel_id,  port_id,  packet_ack_sequences };    
    return useQuery([key], () => {
      const { channel_id,  port_id,  packet_ack_sequences } = key
      return  client.IbcCoreChannelV1.query.queryUnreceivedAcks(channel_id, port_id, packet_ack_sequences).then( res => res.data );
    }, options);
  }
  
  const QueryNextSequenceReceive = (channel_id: string, port_id: string,  options: any) => {
    const key = { type: 'QueryNextSequenceReceive',  channel_id,  port_id };    
    return useQuery([key], () => {
      const { channel_id,  port_id } = key
      return  client.IbcCoreChannelV1.query.queryNextSequenceReceive(channel_id, port_id).then( res => res.data );
    }, options);
  }
  
  const QueryNextSequenceSend = (channel_id: string, port_id: string,  options: any) => {
    const key = { type: 'QueryNextSequenceSend',  channel_id,  port_id };    
    return useQuery([key], () => {
      const { channel_id,  port_id } = key
      return  client.IbcCoreChannelV1.query.queryNextSequenceSend(channel_id, port_id).then( res => res.data );
    }, options);
  }
  
  return {QueryChannel,QueryChannels,QueryConnectionChannels,QueryChannelClientState,QueryChannelConsensusState,QueryPacketCommitment,QueryPacketCommitments,QueryPacketReceipt,QueryPacketAcknowledgement,QueryPacketAcknowledgements,QueryUnreceivedPackets,QueryUnreceivedAcks,QueryNextSequenceReceive,QueryNextSequenceSend,
  }
}
