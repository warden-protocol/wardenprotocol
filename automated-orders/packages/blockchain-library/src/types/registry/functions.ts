import { AbiFunction } from 'viem';

export const AddTransactionAbi: AbiFunction = {
    type: "function",
    name: "addTransaction",
    inputs: [
        {
            name: "txHash",
            type: "bytes32",
            internalType: "bytes32"
        }
    ],
    outputs: [],
    stateMutability: "nonpayable"
};

export const ExecutionsAbi: AbiFunction = {
    type: "function",
    name: "executions",
    inputs: [
        {
            name: "executionAddress",
            type: "address",
            internalType: "address"
        }
    ],
    outputs: [
        {
            name: "orderCreator",
            type: "address",
            internalType: "address"
        }
    ],
    stateMutability: "view"
};

export const RegisterAbi: AbiFunction = {
    type: "function",
    name: "register",
    inputs: [
        {
            name: "execution",
            type: "address",
            internalType: "address"
        }
    ],
    outputs: [],
    stateMutability: "nonpayable"
};

export const TransactionsAbi: AbiFunction = {
    type: "function",
    name: "transactions",
    inputs: [
        {
            name: "creator",
            type: "address",
            internalType: "address"
        },
        {
            name: "txHash",
            type: "bytes32",
            internalType: "bytes32"
        }
    ],
    outputs: [
        {
            name: "tx",
            type: "bytes",
            internalType: "bytes"
        }
    ],
    stateMutability: "view"
};
