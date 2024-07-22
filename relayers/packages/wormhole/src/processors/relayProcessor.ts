import {
  CHAIN_ID_ARBITRUM_SEPOLIA,
  CHAIN_ID_SEPOLIA,
  CHAIN_ID_SOLANA,
  SignedVaa,
  TokenBridgePayload,
  parseTokenTransferPayload,
  tryNativeToHexString,
} from '@certusone/wormhole-sdk';
import { Keypair } from '@solana/web3.js';
import { Next, StandardRelayerContext, encodeEmitterAddress } from '@warden/wormhole-relayer-engine';
import { Chain, ChainAddress, ChainContext, Network, Signer, Wormhole, encoding } from '@wormhole-foundation/sdk';
import { chainToChainId } from '@wormhole-foundation/sdk';
import evm from '@wormhole-foundation/sdk/evm';
import cosmwasm from '@wormhole-foundation/sdk/platforms/cosmwasm';
import solana from '@wormhole-foundation/sdk/solana';
import bs58 from 'bs58';

import { SolanaGmpWithTokenClient } from '../clients/solanaGmpWithTokenClient.js';
import { config } from '../config/schema.js';
import { GmpRequest, WormholeRequestStatus } from '../database/entity/index.js';
import { WormholeDataSource } from '../database/wormholeDataSource.js';

export class RelayProcessor {
  async relay(ctx: StandardRelayerContext, next: Next) {
    ctx.logger.info(`Got a VAA: ${ctx.vaa} from with txhash: ${ctx.sourceTxHash}`);
    console.log(
      `Got a VAA: chain: ${ctx.vaa?.emitterChain}, storage_id: ${ctx.storage.job.id}, VAA payload: '${encoding.bytes.decode(ctx.vaa!.payload!)}'`,
    );

    const { payload } = ctx.tokenBridge;

    if (
      payload?.payloadType !== TokenBridgePayload.Transfer &&
      payload?.payloadType !== TokenBridgePayload.TransferWithPayload
    ) {
      return await next();
    }

    const parsed = parseTokenTransferPayload(ctx.vaa!.payload);
    const emitterAddress = parsed.fromAddress?.toString('hex');

    if (emitterAddress != encodeEmitterAddress(CHAIN_ID_SEPOLIA, config.ETHEREUM_GMP_CONTRACT_ADDRESS)) {
      return await next();
    }

    const repository = WormholeDataSource.getRepository(GmpRequest);
    const existing = await repository.findOneBy({ hash: ctx.vaa!.hash.toString('hex') });

    if (existing !== null) {
      return await next();
    }

    await repository.save({
      emitterAddress: ctx.vaa!.emitterAddress.toString('hex'),
      emitterChain: ctx.vaa!.emitterChain,
      hash: ctx.vaa!.hash.toString('hex'),
      sequence: ctx.vaa!.sequence.toString(),
      status: WormholeRequestStatus.ReceivedSignedVaa,
      timestamp: ctx.vaa!.timestamp.toString(),
      vaa: ctx.vaaBytes!.toString('hex'),
    });

    return await next();
  }
}
