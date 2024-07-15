import { CHAIN_ID_ARBITRUM_SEPOLIA, CONTRACTS } from '@certusone/wormhole-sdk';
import { deriveAddress, getPostMessageCpiAccounts } from '@certusone/wormhole-sdk/lib/cjs/solana/index.js';
import { getProgramSequenceTracker } from '@certusone/wormhole-sdk/lib/cjs/solana/wormhole/index.js';
import { Program, Provider } from '@coral-xyz/anchor';
import { Connection, Keypair, Transaction, clusterApiUrl, sendAndConfirmTransaction } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import { Environment, Next, StandardRelayerContext } from '@warden/wormhole-relayer-engine';
import {
  Chain,
  ChainAddress,
  ChainContext,
  Network,
  Signer,
  Wormhole,
  encoding,
  signSendWait,
  wormhole,
} from '@wormhole-foundation/sdk';
import evm from '@wormhole-foundation/sdk/evm';
import cosmwasm from '@wormhole-foundation/sdk/platforms/cosmwasm';
import solana from '@wormhole-foundation/sdk/solana';
import bs58 from 'bs58';
import * as fs from 'fs';
import { promisify } from 'util';

import { Gmp, IDL } from '../../contracts/solana/target/types/gmp.js';
import { config } from '../config/schema.js';

export const delay = promisify((ms: number, res: () => void) => setTimeout(res, ms));

export class RelayProcessor {
  async relay(ctx: StandardRelayerContext, next: Next) {
    ctx.logger.info(`Got a VAA: ${ctx.vaa} from with txhash: ${ctx.sourceTxHash}`);
    console.log(
      `Got a VAA: chain: ${ctx.vaa?.emitterChain}, storage_id: ${ctx.storage.job.id}, VAA payload: '${encoding.bytes.decode(ctx.vaa!.payload!)}'`,
    );

    if (
      ctx.vaa?.emitterChain != CHAIN_ID_ARBITRUM_SEPOLIA ||
      ctx.vaa.id.emitterAddress == '000000000000000000000000e0418c44f06b0b0d7d1706e01706316dbb0b210e'
    ) {
      return await next();
    }

    return await next();
  }
}

export async function initialize(): Promise<void> {
  const wormholeCore = CONTRACTS[getWormholeContractsNetwork(config.ENVIRONMENT)].solana.core;
  const programId = new PublicKey(config.SOLANA_CONTRACT_ADDRESS);
  const keypair = Keypair.fromSecretKey(bs58.decode(config.SOL_PRIVATE_KEY));

  const connection = new Connection(config.SOLANA_RPC, 'processed');

  const program = new Program<Gmp>(IDL, new PublicKey(programId), {
    connection: connection,
    publicKey: keypair.publicKey,
  });

  const message = await getProgramSequenceTracker(connection, programId, wormholeCore).then((tracker) =>
    deriveAddress(
      [
        Buffer.from('sent'),
        (() => {
          const buf = Buffer.alloc(8);
          buf.writeBigUInt64LE(tracker.sequence + 1n);
          return buf;
        })(),
      ],
      programId,
    ),
  );

  const wormholeAccountsInitialize = getPostMessageCpiAccounts(
    program.programId,
    wormholeCore,
    keypair.publicKey,
    deriveAddress(
      [
        Buffer.from('sent'),
        (() => {
          const buf = Buffer.alloc(8);
          buf.writeBigUInt64LE(1n);
          return buf;
        })(),
      ],
      programId,
    ),
  );

  const instruction = await program.methods
    .initialize()
    .accounts({
      owner: keypair.publicKey,
      config: deriveAddress([Buffer.from('config')], programId),
      wormholeProgram: new PublicKey(wormholeCore),
      ...wormholeAccountsInitialize,
    })
    .instruction();

  const tx = new Transaction().add(instruction);
  const result = await sendAndConfirmTransaction(connection, tx, [keypair]);

  console.log(result);
}

export async function send(payload: string): Promise<void> {
  const wormholeCore = CONTRACTS[getWormholeContractsNetwork(config.ENVIRONMENT)].solana.core;
  const programId = new PublicKey(config.SOLANA_CONTRACT_ADDRESS);
  const keypair = Keypair.fromSecretKey(bs58.decode(config.SOL_PRIVATE_KEY));

  const connection = new Connection(config.SOLANA_RPC, 'processed');

  const program = new Program<Gmp>(IDL, programId, {
    connection: connection,
    publicKey: keypair.publicKey,
  });

  const tracker = await getProgramSequenceTracker(connection, programId, wormholeCore);
  const message = deriveAddress(
    [
      Buffer.from('sent'),
      (() => {
        const buf = Buffer.alloc(8);
        buf.writeBigUInt64LE(tracker.sequence + 1n);
        return buf;
      })(),
    ],
    programId,
  );

  const wormholeAccounts = getPostMessageCpiAccounts(program.programId, wormholeCore, keypair.publicKey, message);
  const instruction = await program.methods
    .sendMessage(Buffer.from(payload))
    .accounts({
      config: deriveAddress([Buffer.from('config')], programId),
      wormholeProgram: wormholeCore,
      ...wormholeAccounts,
    })
    .instruction();

  const tx = new Transaction().add(instruction);
  const txhash = await sendAndConfirmTransaction(connection, tx, [keypair]);

  console.log(txhash);
  // ctx.logger.info(`Solana txhash: ${txhash}`);
}

export function getWormholeContractsNetwork(env: Environment): string {
  switch (env) {
    case Environment.MAINNET:
      return 'MAINNET';
    case Environment.TESTNET:
      return 'TESTNET';
    case Environment.DEVNET:
      return 'DEVNET';
    default:
      throw new Error(`${env} is not supported`);
  }
}

export function getWormholeSdkNetwork(env: Environment): Network {
  switch (env) {
    case Environment.MAINNET:
      return 'Mainnet';
    case Environment.TESTNET:
      return 'Testnet';
    case Environment.DEVNET:
      return 'Devnet';
    default:
      throw new Error(`${env} is not supported`);
  }
}

export interface TransferStuff<N extends Network, C extends Chain> {
  chain: ChainContext<N, C>;
  signer: Signer<N, C>;
  address: ChainAddress<C>;
}

export async function getSigner<N extends Network, C extends Chain>(
  chain: ChainContext<N, C>,
): Promise<TransferStuff<N, C>> {
  let signer: Signer;
  const platform = chain.platform.utils()._platform;

  switch (platform) {
    case 'Evm':
      signer = await (await evm()).getSigner(await chain.getRpc(), config.EVM_PRIVATE_KEY);
      break;

    case 'Solana':
      signer = await (
        await solana()
      ).getSigner(await chain.getRpc(), config.SOL_PRIVATE_KEY, {
        debug: true,
        priorityFee: {
          percentile: 0.5,
          percentileMultiple: 2,
          min: 1,
          max: 1000,
        },
      });
      break;

    case 'Cosmwasm':
      signer = await cosmwasm.getSigner(await chain.getRpc(), config.COSMOS_MNEMONIC);
      break;

    default:
      throw new Error('Unrecognized platform: ' + platform);
  }

  return {
    chain,
    signer: signer as Signer<N, C>,
    address: Wormhole.chainAddress(chain.chain, signer.address()),
  };
}
