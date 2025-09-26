import { AbiEvent } from 'viem';

import { IEvent } from '../evm/event.js';

export interface IOrderRegistered extends IEvent {
  args: {
    creator: string;
    execution: string;
  };
}

export const OrderRegisteredAbi: AbiEvent = {
  anonymous: false,
  inputs: [
    { indexed: true, internalType: 'address', name: 'creator', type: 'address' },
    { indexed: true, internalType: 'address', name: 'execution', type: 'address' },
  ],
  name: 'Registered',
  type: 'event',
};
