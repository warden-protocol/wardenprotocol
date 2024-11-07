import { AbiFunctionFragment } from 'web3';

export const CanExecuteOrderAbi: AbiFunctionFragment = {
  constant: true,
  inputs: [],
  name: 'canExecute',
  outputs: [
    {
      name: '',
      type: 'bool',
    },
  ],
  payable: false,
  stateMutability: 'view',
  type: 'function',
};

export const IsExecutedOrderAbi: AbiFunctionFragment = {
  constant: true,
  inputs: [],
  name: 'isExecuted',
  outputs: [
    {
      name: '',
      type: 'bool',
    },
  ],
  payable: false,
  stateMutability: 'view',
  type: 'function',
};
