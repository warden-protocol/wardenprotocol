import { CHAIN_ID_ARBITRUM_SEPOLIA, CHAIN_ID_PYTHNET, CHAIN_ID_SOLANA, CONTRACTS } from '@certusone/wormhole-sdk';
import { NodeWallet, deriveAddress, getPostMessageCpiAccounts } from '@certusone/wormhole-sdk/lib/cjs/solana/index.js';
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
import * as fs from 'fs';
import { promisify } from 'util';

import { Env } from '../config/env.js';
import { config } from '../config/schema.js';
import { HelloWorld } from '../hello_world.js';

export const delay = promisify((ms: number, res: () => void) => setTimeout(res, ms));

export class RelayProcessor {
  async relay(ctx: StandardRelayerContext, next: Next) {
    ctx.logger.info(`Got a VAA: ${ctx.vaa} from with txhash: ${ctx.sourceTxHash}`);
    console.log(
      `Got a VAA: chain: ${ctx.vaa?.emitterChain}, storage_id: ${ctx.storage.job.id}, VAA payload: '${encoding.bytes.decode(ctx.vaa!.payload!)}'`,
    );

    return await next();
  }
}

export async function test(): Promise<void> {
  // const network = getWormholeNetwork(config.ENVIRONMENT);
  // const wh = await wormhole(network, [solana]);

  // const chainCtx = wh.getChain('Solana');
  // const [whm] = await chainCtx.parseTransaction(
  //   '25LFUgsd1xi7frUiSwiMwHRMrjuw4ZvysGcmPCocoDCiSvnuyQ8HkgG8aGTLaZKGXeDYohmRAQNCPsTLwDU5xqj8',
  // );
  // // it is also possible to search by txid but takes longer to show up
  // // e.g. await wh.getVaaByTxHash(txids[0].txid, "Uint8Array");
  // const vaa = await wh.getVaa(whm, 'Uint8Array');

  await delay(5000);

  let secretKey = Uint8Array.from([
    244, 119, 245, 215, 49, 134, 52, 88, 183, 171, 194, 169, 137, 210, 249, 223, 236, 232, 42, 93, 136, 172, 0, 165, 61,
    28, 181, 43, 94, 116, 47, 67, 123, 20, 205, 100, 94, 236, 97, 219, 12, 235, 192, 73, 7, 138, 57, 2, 111, 74, 49, 50,
    116, 165, 0, 111, 35, 17, 232, 178, 100, 39, 106, 133,
  ]);
  let keypair = Keypair.fromSecretKey(secretKey);
  const programId = 'JDMEHzr135MvYgeMHkSc4xjdWRE9W3tHXv5YeKPttTfm';

  const idl = fs.readFileSync('/Users/aabliazimov/Documents/work/wardenprotocol/relayers/hello_world.json', 'utf-8');

  const connection = new Connection('https://api.devnet.solana.com', 'processed');
  const parsedIdl = JSON.parse(idl);

  const program = new Program<HelloWorld>(parsedIdl as any, new PublicKey(programId), {
    connection: connection,
    publicKey: keypair.publicKey,
  });

  const helloMessage = Buffer.from('All your base are belong to us');

  const message = await getProgramSequenceTracker(connection, programId, CONTRACTS['TESTNET'].solana.core).then(
    (tracker) =>
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

  const wormholeAccountsSendMessage = getPostMessageCpiAccounts(
    program.programId,
    CONTRACTS['TESTNET'].solana.core,
    keypair.publicKey,
    message,
  );

  const instruction = await program.methods
    .sendMessage(helloMessage)
    .accounts({
      config: deriveAddress([Buffer.from('config')], programId),
      wormholeProgram: new PublicKey(CONTRACTS['TESTNET'].solana.core),
      ...wormholeAccountsSendMessage,
    })
    .instruction();

  // const wormholeAccountsInitialize = getPostMessageCpiAccounts(
  //   program.programId,
  //   CONTRACTS['TESTNET'].solana.core,
  //   keypair.publicKey,
  //   deriveAddress(
  //     [
  //       Buffer.from('sent'),
  //       (() => {
  //         const buf = Buffer.alloc(8);
  //         buf.writeBigUInt64LE(1n);
  //         return buf;
  //       })(),
  //     ],
  //     programId,
  //   ),
  // );

  // const instruction = await program.methods
  //   .initialize()
  //   .accounts({
  //     owner: keypair.publicKey,
  //     config: deriveAddress([Buffer.from('config')], programId),
  //     wormholeProgram: new PublicKey(CONTRACTS['TESTNET'].solana.core),
  //     ...wormholeAccountsInitialize,
  //   })
  //   .instruction();

  const tx = new Transaction().add(instruction);
  const result = await sendAndConfirmTransaction(connection, tx, [keypair]);

  console.log(result);
  // const network = getWormholeNetwork(config.ENVIRONMENT);
  // const wh = await wormhole(network, [solana]);

  // const chainCtx = wh.getChain('Solana');
  // const coreBridge = await chainCtx.getWormholeCore();

  // // Get local signer and parse the address
  // const {
  //   signer,
  //   address: { address },
  // } = await getStuff(chainCtx, config);

  // // prepare transactions to publish a message
  // const msgTxs = coreBridge.publishMessage(
  //   address.toUniversalAddress(),
  //   encoding.bytes.encode('lol'),
  //   1, // nonce
  //   0,
  // );

  // // submit post msg txs
  // const [txid] = await signSendWait(chainCtx, msgTxs, signer);
  // console.log('Origin txid: ', txid);

  // const [whm] = await chainCtx.parseTransaction(txid.txid);
  // // it is also possible to search by txid but takes longer to show up
  // // e.g. await wh.getVaaByTxHash(txids[0].txid, "Uint8Array");
  // const vaa = await wh.getVaa(whm, 'Uint8Array');
  // console.log(`VAA payload: '${encoding.bytes.decode(vaa!.payload!)}'`);

  // // prepare transactions to verify the VAA
  // const verifyTxs = coreBridge.verifyMessage(address.toUniversalAddress(), vaa!);
  // // submit verify txs
  // console.log('Verify txids: ', await signSendWait(chainCtx, verifyTxs, signer));
}

export function getWormholeNetwork(env: Environment): Network {
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

export async function getStuff<N extends Network, C extends Chain>(
  chain: ChainContext<N, C>,
  config: Env,
): Promise<TransferStuff<N, C>> {
  // read in from `.env`
  (await import('dotenv')).config();
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
          // take the middle priority fee
          percentile: 0.5,
          // juice the base fee taken from priority fee percentile
          percentileMultiple: 2,
          // at least 1 lamport/compute unit
          min: 1,
          // at most 1000 lamport/compute unit
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
