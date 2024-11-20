import {
  Config,
  createConfig,
  estimateFeesPerGas,
  estimateGas,
  getBlockNumber,
  getBytecode,
  getGasPrice,
  getTransactionCount,
  http,
  readContract,
} from '@wagmi/core';
import { delay } from '@warden-automated-orders/utils';
import { LRUCache } from 'lru-cache';
import {
  AbiEvent,
  AbiFunction,
  Account,
  Chain,
  Hex,
  Log,
  PublicClient,
  TransactionSerializable,
  bytesToHex,
  createPublicClient,
  createWalletClient,
  decodeEventLog,
  encodeFunctionData,
  hexToBytes,
  keccak256,
  serializeTransaction,
} from 'viem';
import { privateKeyToAccount, signTransaction } from 'viem/accounts';

import { IEvmConfiguration } from '../types/evm/configuration.js';
import { GasFeeData } from '../types/evm/gas.js';
import { IEventPollingConfiguration } from '../types/evm/pollingConfiguration.js';

import { FordefiService } from '@warden/fordefi-library';
import * as asn1 from '@lapo/asn1js';
import * as secp256k1 from '@noble/secp256k1';

export class EvmClient {
  signer: Hex;
  eventsFromBlocks: Map<string, bigint>;
  events: LRUCache<string, Log>;
  config: Config;
  client: PublicClient;
  fordefiService: FordefiService;

  constructor(
    private configuration: IEvmConfiguration,
    chain: Chain,
  ) {
    this.config = createConfig({
      chains: [chain],
      transports: {
        [chain.id]: http(this.configuration.rpcURL),
      },
    });

    this.client = createPublicClient({
      chain: chain,
      transport: http(this.configuration.rpcURL),
    });

    this.eventsFromBlocks = new Map<string, bigint>();

    if (this.configuration.eventsCacheSize) {
      this.events = new LRUCache<string, Log>({
        max: this.configuration.eventsCacheSize,
      });
    }

    if (this.configuration.fordefiConfiguration) {
      this.fordefiService = new FordefiService(this.configuration.fordefiConfiguration);
    }
  }

  public async initializeSigner() {
    const vaultName = this.configuration.vaultName;

    const vault = await this.fordefiService.getVault(vaultName);

    if (!vault) {
      throw new Error('Vault not found');
    }

    let uncompressedPublicKey = vault.public_key;
    if (uncompressedPublicKey[0] === 0x04) {
      uncompressedPublicKey = uncompressedPublicKey.slice(1);
    }

    const address = '0x' + bytesToHex(keccak256(uncompressedPublicKey).slice(-20));

    this.signer = address as Hex;
  }

  public async broadcastTx(): Promise<void> {
    // TODO: implementation
  }

  public async *pollEvents<T>(
    contractAddress: string,
    startBlock: bigint,
    eventAbi: AbiEvent,
    config: IEventPollingConfiguration,
  ): AsyncGenerator<[string, T]> {
    while (true) {
      await delay(config.pollingIntervalMsec);

      for (const event of this.events) {
        yield [event[0], event[1] as T];
      }

      const endBlock = await getBlockNumber(this.config);

      let fromBlock = BigInt(this.eventsFromBlocks.get(eventAbi.name) ?? startBlock);
      let toBlock = endBlock;

      do {
        if (fromBlock + config.pollingBlocks > endBlock) {
          toBlock = endBlock;
        } else {
          toBlock = fromBlock + config.pollingBlocks;
        }

        const logs = await this.client.getContractEvents({
          address: contractAddress as Hex,
          abi: [eventAbi],
          fromBlock: fromBlock,
          toBlock: toBlock,
          eventName: eventAbi.name,
        });

        for (const log of logs) {
          const id = this.getEventId(log);
          const event = this.decodeEventLog<T>(eventAbi, log);

          this.events.set(id, log);

          yield [id, event];
        }

        fromBlock = toBlock;

        this.eventsFromBlocks.set(eventAbi.name, fromBlock);
      } while (fromBlock < endBlock);
    }
  }

  public async isContract(address: string): Promise<boolean> {
    const code = await getBytecode(this.config, { address: address as Hex });
    return (code?.length ?? 0) > 0;
  }

  public async callView<T>(contractAddress: string, functionAbi: AbiFunction, args: unknown[]): Promise<T> {
    const result = await readContract(this.config, {
      abi: [functionAbi],
      functionName: functionAbi.name,
      args: args,
      address: contractAddress as Hex,
      account: this.signer,
    });

    return result as T;
  }

  public getEventId(event: Log): string {
    return `bk_${event.blockNumber}_ix_${event.logIndex}`;
  }

  public async getNextNonce(account: string): Promise<number> {
    const transactionsCount = await getTransactionCount(this.config, {
      address: account as Hex,
    });

    return transactionsCount;
  }

  public async getGasFees(from: string, to: string, data: string, value: bigint): Promise<GasFeeData> {
    const feeData = await estimateFeesPerGas(this.config);
    const gasPrice = await getGasPrice(this.config);
    const gasLimit = await estimateGas(this.config, {
      account: from as Hex,
      to: to as Hex,
      value: value,
      data: data as Hex,
    });

    return {
      gasLimit,
      gasPrice,
      maxFeePerGas: feeData.maxFeePerGas,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    };
  }

  public async sendTransaction(contractAddress: string, functionAbi: AbiFunction, args: unknown[]): Promise<void> {
    const data = encodeFunctionData({
      abi: [functionAbi],
      functionName: functionAbi.name,
      args: args,
    });
  
    const gas = await this.getGasFees(this.signer, contractAddress, data, 0n);
    const nonce = await this.getNextNonce(this.signer);
  
    const transaction = {
      chainId: BigInt(this.config.chains[0].id),
      to: contractAddress as Hex,
      data: data as Hex,
      gasLimit: gas.gasLimit,
      maxFeePerGas: gas.maxFeePerGas,
      maxPriorityFeePerGas: gas.maxPriorityFeePerGas,
      nonce: BigInt(nonce),
      value: 0n,
    };
  
    const fordAccount = new FordefiAccount(this.signer, this.fordefiService, Number(transaction.chainId));
  
    const wallet = createWalletClient({
      transport: http(this.configuration.rpcURL),
      account: fordAccount,
    });
  
    await wallet.sendTransaction({
      ...transaction,
      account: fordAccount,
    });
  }

  private decodeEventLog<T>(eventAbi: AbiEvent, log: Log): T {
    return decodeEventLog({
      abi: [eventAbi],
      topics: log.topics,
      data: log.data,
    }) as T;
  }
}

class FordefiAccount implements Account {
  address: Hex;
  type: 'json-rpc' = 'json-rpc'; // Account type set to 'json-rpc'
  fordefiService: FordefiService;
  chainId: number;

  constructor(address: Hex, fordefiService: FordefiService, chainId: number) {
    this.address = address;
    this.fordefiService = fordefiService;
    this.chainId = chainId;
  }

  async signTransaction(transaction: TransactionSerializable): Promise<Hex> {
    // Serialize the transaction without signature
    const unsignedTransaction = serializeTransaction(transaction);

    // Compute the Keccak256 hash of the serialized transaction
    const transactionHashBytes = keccak256(unsignedTransaction);

    // Sign the transaction hash using FordefiService
    const signatureDER = await this.fordefiService.signTransactionHash(transactionHashBytes);

    // Parse the DER-encoded signature to extract r and s
    const { r, s } = derDecode(signatureDER);

    // Compute the recovery parameter v
    const recoveryParam = await getRecoveryParam(transactionHashBytes, r, s, this.address);

    const v = BigInt(recoveryParam + this.chainId * 2 + 35);

    // Build the signed transaction
    const signedTransaction = serializeTransaction(transaction, { r, s, v });

    return signedTransaction as Hex;
  }
}

function derDecode(signature: Uint8Array): { r: bigint; s: bigint } {
  const asn1obj = asn1.decode(signature);

  if (asn1obj.typeName() !== 'SEQUENCE' || asn1obj.sub.length !== 2) {
    throw new Error('Invalid DER signature format');
  }

  const r = BigInt('0x' + asn1obj.sub[0].toHexString().replace(/^0x/, ''));
  const s = BigInt('0x' + asn1obj.sub[1].toHexString().replace(/^0x/, ''));

  return { r, s };
}

async function getRecoveryParam(
  msgHash: Uint8Array,
  r: bigint,
  s: bigint,
  expectedAddress: Hex,
): Promise<number> {
  const signature = new Uint8Array(64);
  signature.set(hexToBytes(r.toString(16).padStart(64, '0')), 0);
  signature.set(hexToBytes(s.toString(16).padStart(64, '0')), 32);

  for (let recoveryParam = 0; recoveryParam < 2; recoveryParam++) {
    const publicKey = secp256k1.recoverPublicKey(msgHash, signature, recoveryParam, false);

    const publicKeyBytes = hexToBytes(publicKey);

    // Compute the Ethereum address from the public key
    const addressBytes = keccak256(publicKeyBytes.slice(1)).slice(-20);
    const address = '0x' + bytesToHex(addressBytes);

    if (address.toLowerCase() === expectedAddress.toLowerCase()) {
      return recoveryParam;
    }
  }

  throw new Error('Failed to compute recovery parameter');
}
