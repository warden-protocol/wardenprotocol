import { CHAIN_ID_SOLANA, TokenBridgePayload } from '@certusone/wormhole-sdk';
import {
  Environment,
  RedisStorage,
  RelayerApp,
  StandardRelayerContext,
  logging,
  providers,
  sourceTx,
  spawnMissedVaaWorker,
  stagingArea,
  tokenBridgeContracts,
} from '@wormhole-foundation/relayer-engine';
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
import 'dotenv/config';
import winston from 'winston';

import { Env } from './config/env.js';
import { config } from './config/schema.js';

// export const WORMHOLE_CONTRACTS = CONTRACTS['TESTNET'];
// export const CORE_BRIDGE_PID = new PublicKey(WORMHOLE_CONTRACTS.solana.core);

async function feedEm(app: RelayerApp<StandardRelayerContext>) {
  // rando token transfer VAA from Sol
  setInterval(async () => {
    const tmpvaa = Buffer.from(
      'AQAAAAABAJhoIpjSRXkgBWn36i/ULs79LzTVnCusLvAvB27UO8CRB2vhOHrQweHWXnZAoUKpeIZ2VtvmLwSLMvAYa4Oy/SMBZLGAxQAAc38AATsmQJ+Kre0/XdyhhGlapqD6gpsMhcr4SFYySJbSFMqYAAAAAAAAXc8gAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACYloABpuIV/6rgYT7aH9jRhjANdrEOdwa6ztVmKDwAAAAAAEAAW2a5rLTM8HWUwGlnaPu04jKXcYMsSSWWEt1y+axX9vtACC+6/ZVk+zI95lF4zZqA44cLkY+fu0ikgdvAuPVrcr6rXsiYmFzaWNfcmVjaXBpZW50Ijp7InJlY2lwaWVudCI6ImMyVnBNV1ptWkd0dGR6Sm1jbkE0TW1zM09EaDZlWGx0Ym5kNWRuSmphemRuY1hremF6Um1OMk5sIn19',
      'base64',
    );
    await app.processVaa(tmpvaa);
  }, 1000);
}

export const rootLogger = winston.createLogger({
  level: 'debug',
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.simple(),
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`),
  ),
});

export async function main() {
  const app = new RelayerApp<StandardRelayerContext>(config.ENVIRONMENT);
  const redis = {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    username: config.REDIS_USERNAME,
    password: config.REDIS_PASSWORD,
  };

  const store = new RedisStorage({
    attempts: config.REDIS_ATTEMPTS,
    namespace: config.APP_NAME,
    queueName: config.REDIS_QUEUE,
    redis,
  });

  app.spy(config.SPY_URL);
  app.useStorage(store);
  app.logger(rootLogger);

  // middleware
  app.use(logging(rootLogger));
  app.use(providers());

  // app.use(
  //   wallets(config.ENVIRONMENT, {
  //     logger: rootLogger,
  //     namespace: config.APP_NAME,
  //     privateKeys: {
  //       [CHAIN_ID_OSMOSIS]: [
  //         '',
  //       ],
  //     },
  //     metrics: { enabled: true, registry: store.registry },
  //   }),
  // );

  app.use(tokenBridgeContracts());
  app.use(
    stagingArea({
      namespace: config.APP_NAME,
      redis,
    }),
  );
  app.use(sourceTx());

  app.chain(CHAIN_ID_SOLANA).address('3u8hJUVTA4jH1wYAyUur7FFZVQ8H635K3tSHHF4ssjQ5', async (ctx, next) => {
    ctx.logger.info(`Got a VAA: ${ctx.vaa} from with txhash: ${ctx.sourceTxHash}`);

    const { payload } = ctx.tokenBridge;

    await ctx.wallets.onSei(async (x) => {
      ctx.logger.info(x);
    });

    switch (payload?.payloadType) {
      case TokenBridgePayload.Transfer:
        ctx.logger.info(
          `Processing token transfer: ${payload.tokenChain}:${payload.tokenAddress?.toString('hex')}}` +
            `, amount: ${payload.amount}, receiver: ${payload.toChain}:${payload.to?.toString('hex')}`,
        );
        break;
      case TokenBridgePayload.TransferWithPayload:
        ctx.logger.info(
          `Processing token transfer: ${payload.tokenChain}:${payload.tokenAddress?.toString('hex')}}` +
            `, amount: ${payload.amount}, receiver: ${payload.toChain}:${payload.to?.toString('hex')}` +
            `, sender: ${payload.fromAddress?.toString('hex')}` +
            `, receiver: ${payload.toChain}:${payload.to?.toString('hex')}` +
            `, payload: ${payload.tokenTransferPayload?.toString('hex')}`,
        );
        break;
    }

    const network = getWormholeNetwork(config.ENVIRONMENT);
    const wh = await wormhole(network, [evm, solana]);

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
      0, // nonce
      0, // consistency (0,1)
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
  });

  app.use(async (err, ctx, next) => {
    ctx.logger.error('Error middleware triggered');

    await next();
  });

  await Promise.all([
    spawnMissedVaaWorker(app, {
      namespace: config.APP_NAME,
      wormholeRpcs: [''],
      registry: store.registry,
      logger: rootLogger,
      redis,
    }),

    feedEm(app),

    await app.listen(),
  ]);
}

function getWormholeNetwork(env: Environment): Network {
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

main()
  .catch((error) => console.error('Unhandled error:', error))
  .finally(() => process.exit());
