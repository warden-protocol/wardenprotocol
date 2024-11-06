import { Web3 } from 'web3';

import { IEvmConfiguration } from '../types/evm/configuration.js';

export class EvmClient {
  web3: Web3;

  constructor(private configuration: IEvmConfiguration) {
    this.web3 = new Web3(this.configuration.rpcURL);
  }

  async broadcastTx(): Promise<void> {
    // TODO: implementation
  }
}
