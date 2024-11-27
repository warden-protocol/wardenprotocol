import { EvmClient } from './evm.js';
import { Hex } from 'viem';
import { IWardenRegistryConfiguration } from '../types/registry/configuration.js';
import { TransactionsAbi } from '../types/registry/functions.js';

export class WardenRegistryClient {
    constructor(
        private configuration: IWardenRegistryConfiguration,
        private evm: EvmClient,
    ) { }

    async getTransaction(transactionHash: Hex): Promise<Hex> {
        return this.evm.callView<Hex>(
            this.configuration.contractAddress,
            TransactionsAbi,
            [transactionHash]
        );
    }
}