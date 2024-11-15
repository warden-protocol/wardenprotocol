import { AbiEvent } from 'viem';

export interface OrderRegistered extends EventLog {
  returnValues: {
    creator: string;
    execution: string;
  };
}

export const OrderRegisteredAbi: AbiEvent = {
  anonymous: false,
  inputs: [
    { indexed: true, internalType: 'address', name: 'creator', type: 'address' },
    { indexed: false, internalType: 'address', name: 'execution', type: 'address' },
  ],
  name: 'Registered',
  type: 'event',
};
