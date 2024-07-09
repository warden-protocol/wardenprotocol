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

import { Env } from '../config/env.js';
import { config } from '../config/schema.js';

export class RelayProcessor {
  async relay(ctx: StandardRelayerContext, next: Next) {
    ctx.logger.info(`Got a VAA: ${ctx.vaa} from with txhash: ${ctx.sourceTxHash}`);
    console.log(`Got a VAA: chain = ${ctx.vaa?.emitterChain}, txhash: ${ctx.vaa?.id.emitterAddress}`);
    console.log(`VAA payload: '${encoding.bytes.decode(ctx.vaa!.payload!)}'`);

    if (ctx.vaa?.emitterChain == 26) {
      return next();
    }

    if (ctx.vaa?.id?.emitterAddress !== '2b1246c9eefa3c466792253111f35fec1ee8ee5e9debc412d2e9adadfecdcc72') {
      return next();
    }

    const network = getWormholeNetwork(config.ENVIRONMENT);
    const wh = await wormhole(network, [solana]);

    const chainCtx = wh.getChain('Solana');
    const coreBridge = await chainCtx.getWormholeCore();

    // Get local signer and parse the address
    const {
      signer,
      address: { address },
    } = await getStuff(chainCtx, config);

    // prepare transactions to publish a message
    const msgTxs = coreBridge.publishMessage(
      address.toUniversalAddress(),
      encoding.bytes.encode('lol'),
      1, // nonce
      0,
    );

    // submit post msg txs
    const [txid] = await signSendWait(chainCtx, msgTxs, signer);
    console.log('Origin txid: ', txid);

    const [whm] = await chainCtx.parseTransaction(txid.txid);
    // it is also possible to search by txid but takes longer to show up
    // e.g. await wh.getVaaByTxHash(txids[0].txid, "Uint8Array");
    const vaa = await wh.getVaa(whm, 'Uint8Array');
    console.log(`VAA payload: '${encoding.bytes.decode(vaa!.payload!)}'`);

    // prepare transactions to verify the VAA
    const verifyTxs = coreBridge.verifyMessage(address.toUniversalAddress(), vaa!);
    // submit verify txs
    console.log('Verify txids: ', await signSendWait(chainCtx, verifyTxs, signer));

    // // First, post the VAA to the core bridge
    // await postVaaSolana(connection, wallet.signTransaction, CORE_BRIDGE_PID, wallet.key(), vaaBytes);

    // const program = createHelloWorldProgramInterface(connection, programId);
    // const parsed = isBytes(wormholeMessage) ? parseVaa(wormholeMessage) : wormholeMessage;

    // const ix = program.methods
    //   .receiveMessage([...parsed.hash])
    //   .accounts({
    //     payer: new PublicKey(payer),
    //     config: deriveConfigKey(programId),
    //     wormholeProgram: new PublicKey(wormholeProgramId),
    //     posted: derivePostedVaaKey(wormholeProgramId, parsed.hash),
    //     foreignEmitter: deriveForeignEmitterKey(programId, parsed.emitterChain),
    //     received: deriveReceivedKey(programId, parsed.emitterChain, parsed.sequence),
    //   })
    //   .instruction();

    // const transaction = new Transaction().add(ix);
    // const { blockhash } = await connection.getLatestBlockhash(commitment);
    // transaction.recentBlockhash = blockhash;
    // transaction.feePayer = new PublicKey(payerAddress);

    // const signed = await wallet.signTxn(transaction);
    // const txid = await connection.sendRawTransaction(signed);

    // await connection.confirmTransaction(txid);

    await next();
  }
}

export async function test(): Promise<void> {
  const network = getWormholeNetwork(config.ENVIRONMENT);
  const wh = await wormhole(network, [solana]);

  const chainCtx = wh.getChain('Solana');
  const coreBridge = await chainCtx.getWormholeCore();

  // Get local signer and parse the address
  const {
    signer,
    address: { address },
  } = await getStuff(chainCtx, config);

  // prepare transactions to publish a message
  const msgTxs = coreBridge.publishMessage(
    address.toUniversalAddress(),
    encoding.bytes.encode('lol'),
    1, // nonce
    0,
  );

  // submit post msg txs
  const [txid] = await signSendWait(chainCtx, msgTxs, signer);
  console.log('Origin txid: ', txid);

  const [whm] = await chainCtx.parseTransaction(txid.txid);
  // it is also possible to search by txid but takes longer to show up
  // e.g. await wh.getVaaByTxHash(txids[0].txid, "Uint8Array");
  const vaa = await wh.getVaa(whm, 'Uint8Array');
  console.log(`VAA payload: '${encoding.bytes.decode(vaa!.payload!)}'`);

  // prepare transactions to verify the VAA
  const verifyTxs = coreBridge.verifyMessage(address.toUniversalAddress(), vaa!);
  // submit verify txs
  console.log('Verify txids: ', await signSendWait(chainCtx, verifyTxs, signer));
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
