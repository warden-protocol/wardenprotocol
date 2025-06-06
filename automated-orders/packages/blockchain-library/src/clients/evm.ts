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
import { delay, logInfo } from '@warden-automated-orders/utils';
import { LRUCache } from 'lru-cache';
import {
  AbiEvent,
  AbiFunction,
  Chain,
  Hex,
  Log,
  PublicClient,
  TransactionSerializable,
  createPublicClient,
  decodeEventLog,
  encodeFunctionData,
  parseTransaction,
  parseSignature,
  serializeTransaction,
  TransactionReceiptNotFoundError,
  Hash,
} from 'viem';
import { keccak256, hexToBytes } from 'viem';
import { AwsKmsSigner } from '@warden-automated-orders/aws-kms-signer';
import { IEvmConfiguration } from '../types/evm/configuration.js';
import { GasFeeData } from '../types/evm/gas.js';
import { IEventPollingConfiguration } from '../types/evm/pollingConfiguration.js';
import BN from 'bn.js';

import asn1 from 'asn1.js';
const { define } = asn1;
import secp256k1 from 'secp256k1';
const { ecdsaRecover } = secp256k1;

/* eslint-disable @typescript-eslint/no-explicit-any */
const EcdsaSigAsnParse = define('EcdsaSig', function(this: any) {
  this.seq().obj(
    this.key('r').int(),
    this.key('s').int(),
  );
});

export class EvmClient {
  signer: Hex;
  eventsFromBlocks: Map<string, bigint>;
  events: LRUCache<string, Log>;
  config: Config;
  client: PublicClient;
  awsKmsSigner: AwsKmsSigner;

  constructor(private configuration: IEvmConfiguration, chain: Chain) {
    this.config = createConfig({
      chains: [chain],
      transports: {
        [chain.id]: http(this.configuration.rpcURL),
      },
    });

    this.client = createPublicClient({
      chain: chain,
      transport: http(this.configuration.rpcURL, {
        timeout: this.configuration.publicClientTimeout,
      }),
    });

    this.eventsFromBlocks = new Map<string, bigint>();

    if (this.configuration.eventsCacheSize) {
      this.events = new LRUCache<string, Log>({
        max: this.configuration.eventsCacheSize,
      });
    }

    if (this.configuration.awsKmsSignerConfig) {
      this.awsKmsSigner = new AwsKmsSigner(this.configuration.awsKmsSignerConfig);
    }
  }

  public async init() {
    this.signer = (await this.awsKmsSigner.getAddress()) as Hex;
  }

  public async broadcastTx(rawTransaction: Hex, transactionSignature: Hex): Promise<void> {
    const ethRequest = parseTransaction(rawTransaction);
    const signature = parseSignature(transactionSignature);

    const serialized = serializeTransaction(
      ethRequest as TransactionSerializable,
      signature,
    );

    await this.client.sendRawTransaction({
      serializedTransaction: serialized,
    });
  }

  public async transactionExists(transaction: Hex, transactionSignature: Hex): Promise<boolean> {
    try {
      const ethRequest = parseTransaction(transaction);
      const signature = parseSignature(transactionSignature);

      const serialized = serializeTransaction(
        ethRequest as TransactionSerializable,
        signature,
      );

      const transactionHash = keccak256(serialized);

      await this.client.getTransactionReceipt({
        hash: transactionHash,
      });
    } catch (error) {
      if (error instanceof TransactionReceiptNotFoundError) {
        return false;
      }

      throw error;
    }

    return true;
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

  public async callView<T>(
    contractAddress: string,
    functionAbi: AbiFunction,
    args: unknown[],
  ): Promise<T> {
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

  public async getGasFees(
    from: string,
    to: string,
    data: string,
    value: bigint,
  ): Promise<GasFeeData> {
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

  public async sendTransaction(
    contractAddress: string,
    functionAbi: AbiFunction,
    args: unknown[],
  ): Promise<Hash> {
    const data = encodeFunctionData({
      abi: [functionAbi],
      functionName: functionAbi.name,
      args: args,
    });

    logInfo(`${this.signer} prepares tx to sign and send`);
    const gas = await this.getGasFees(this.signer, contractAddress, data, 0n);
    const nonce = await this.getNextNonce(this.signer);

    const transaction: TransactionSerializable = {
      chainId: this.config.chains[0].id,
      to: contractAddress as Hex,
      data: data as Hex,
      gas: gas.gasLimit,
      maxFeePerGas: gas.maxFeePerGas,
      maxPriorityFeePerGas: gas.maxPriorityFeePerGas,
      nonce: nonce,
      type: 'eip1559',
      value: 0n,
    };

    const unsignedSerializedTransaction = serializeTransaction(transaction);

    const transactionHash = keccak256(unsignedSerializedTransaction as Hex);
    const hashBytes = hexToBytes(transactionHash);

    const signatureDER = await this.awsKmsSigner.signTransactionHash(hashBytes);

    const decodedSignature = EcdsaSigAsnParse.decode(Buffer.from(signatureDER), 'der');

    const r = decodedSignature.r;

    const secp256k1N = new BN("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", 16); // max value on the curve
    const secp256k1halfN = secp256k1N.div(new BN(2)); // half of the curve
    const s = decodedSignature.s.gt(secp256k1halfN) ? secp256k1N.sub(decodedSignature.s) : decodedSignature.s;

    const rBuffer = r.toArrayLike(Buffer, 'be', 32);
    const sBuffer = s.toArrayLike(Buffer, 'be', 32);

    const signatureCompact = Uint8Array.from(Buffer.concat([rBuffer, sBuffer]));

    let vValue: bigint | undefined;

    for (let recovery = 0; recovery <= 3; recovery++) {
      const recoveredPublicKey = ecdsaRecover(
        signatureCompact,
        recovery,
        hashBytes,
        false,
      );
      const recoveredAddress =
        '0x' + keccak256(recoveredPublicKey.slice(1)).slice(-40);
      if (recoveredAddress.toLowerCase() === this.signer.toLowerCase()) {
        vValue = BigInt(recovery);
        break;
      }
    }

    if (vValue === undefined) {
      throw new Error('Failed to recover public key from signature.');
    }

    const signature = {
      v: vValue,
      r: ('0x' + rBuffer.toString('hex')) as Hex,
      s: ('0x' + sBuffer.toString('hex')) as Hex,
    };

    const serializedSignedTransaction = serializeTransaction(transaction, signature);

    const serializedSignedTransactionHex = serializedSignedTransaction as Hex;

    const txHash = await this.client.sendRawTransaction({ serializedTransaction: serializedSignedTransactionHex });

    logInfo(`Call to ${contractAddress}, tx hash ${txHash}`);

    return txHash;
  }

  private decodeEventLog<T>(eventAbi: AbiEvent, log: Log): T {
    return decodeEventLog({
      abi: [eventAbi],
      topics: log.topics,
      data: log.data,
    }) as T;
  }
}
