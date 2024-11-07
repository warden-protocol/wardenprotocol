import { AbiEventFragment, EventLog } from 'web3';

export interface OrderCreated extends EventLog {
  returnValues: {
    from: string;
    to: string;
    amount: bigint;
  };
}

export const OrderCreatedAbi: AbiEventFragment = {
  anonymous: false,
  inputs: [
    { indexed: true, internalType: 'address', name: 'from', type: 'address' },
    { indexed: true, internalType: 'address', name: 'to', type: 'address' },
    { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
  ],
  name: 'Transfer',
  type: 'event',
};
