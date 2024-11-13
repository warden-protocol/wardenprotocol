import { AbiEventFragment, EventLog } from 'web3';

export interface OrderCreated extends EventLog {
  returnValues: {
    creator: string;
    execution: string;
  };
}

export const OrderRegisteredAbi: AbiEventFragment = {
  anonymous: false,
  inputs: [
    { indexed: true, internalType: 'address', name: 'creator', type: 'address' },
    { indexed: false, internalType: 'address', name: 'execution', type: 'address' },
  ],
  name: 'Registered',
  type: 'event',
};
