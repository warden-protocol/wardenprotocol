import { AbiFunction } from 'viem';

export const CanExecuteOrderAbi: AbiFunction = {
  type: 'function',
  name: 'canExecute',
  inputs: [],
  outputs: [
    {
      name: '',
      type: 'bool',
      internalType: 'bool',
    },
  ],
  stateMutability: 'view',
};

export const IsExecutedOrderAbi: AbiFunction = {
  type: 'function',
  name: 'isExecuted',
  inputs: [],
  outputs: [
    {
      name: '',
      type: 'bool',
      internalType: 'bool',
    },
  ],
  stateMutability: 'view',
};
