import { AbiFunctionFragment, Bytes } from 'web3';

export interface IExecutionData {
  caller: string;
  to: string;
  chainId: bigint;
  data: Bytes;
  value: bigint;
}

export const CanExecuteOrderAbi: AbiFunctionFragment = {
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

export const IsExecutedOrderAbi: AbiFunctionFragment = {
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

export const ExecutionDataAbi: AbiFunctionFragment = {
  type: 'function',
  name: 'executionData',
  inputs: [],
  outputs: [
    {
      name: 'executionData',
      type: 'tuple',
      internalType: 'struct ExecutionData',
      components: [
        {
          name: 'caller',
          type: 'address',
          internalType: 'address',
        },
        {
          name: 'to',
          type: 'address',
          internalType: 'address',
        },
        {
          name: 'chainId',
          type: 'uint256',
          internalType: 'uint256',
        },
        {
          name: 'data',
          type: 'bytes',
          internalType: 'bytes',
        },
        {
          name: 'value',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
    },
  ],
  stateMutability: 'view',
};

export const ExecuteAbi: AbiFunctionFragment = {
  type: 'function',
  name: 'execute',
  inputs: [
    {
      name: 'nonce',
      type: 'uint256',
      internalType: 'uint256',
    },
    {
      name: 'gas',
      type: 'uint256',
      internalType: 'uint256',
    },
    {
      name: 'gasPrice',
      type: 'uint256',
      internalType: 'uint256',
    },
    {
      name: 'maxPriorityFeePerGas',
      type: 'uint256',
      internalType: 'uint256',
    },
    {
      name: 'maxFeePerGas',
      type: 'uint256',
      internalType: 'uint256',
    },
  ],
  outputs: [
    {
      name: '',
      type: 'bool',
      internalType: 'bool',
    },
  ],
  stateMutability: 'nonpayable',
};
