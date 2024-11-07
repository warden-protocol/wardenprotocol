import { AbiEventFragment, EventLog } from 'web3';

export interface OrderCreated extends EventLog {
  returnValues: {
    order: string;
  };
}

export const OrderCreatedAbi: AbiEventFragment = {
  anonymous: false,
  inputs: [{ indexed: true, internalType: 'address', name: 'order', type: 'address' }],
  name: 'OrderCreated',
  type: 'event',
};
