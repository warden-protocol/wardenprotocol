import { TokenBridgePayload, parseTokenTransferPayload, parseTokenTransferVaa } from '@certusone/wormhole-sdk';
import { Next, StandardRelayerContext, encodeEmitterAddress } from '@warden/wormhole-relayer-engine';
import { ChainId, isChainId, toChain, toChainId } from '@wormhole-foundation/sdk';
import { In, IsNull, Repository } from 'typeorm';

import { SolanaGmpWithTokenClient } from '../clients/solanaGmpWithTokenClient.js';
import { GmpRequest, WormholeRequestStatus } from '../database/entity/index.js';
import { WormholeDataSource } from '../database/wormholeDataSource.js';
import { rootLogger } from '../index.js';
import { delay } from '../utils.js';

export class RelayProcessor {
  supportedEmitters: Map<ChainId, [string, string]>;
  chainStartSequences: Partial<Record<ChainId, bigint>>;

  constructor(wormholeChainsToEmitters: string, wormholeStartSequences: string) {
    this.supportedEmitters = new Map<ChainId, [string, string]>();

    const chainsToEmitters = wormholeChainsToEmitters.split(',');

    for (const cte of chainsToEmitters) {
      const chainToEmitter = cte.split(':');
      this.supportedEmitters.set(toChainId(+chainToEmitter[0]), [chainToEmitter[1], chainToEmitter[2]]);
    }

    this.chainStartSequences = {};

    const startSequences = wormholeStartSequences.split(',').map((x) => x.split(':'));
    for (const startSequence of startSequences) {
      this.chainStartSequences[startSequence[0]] = startSequence[1];
    }
  }

  async listenToVaas(ctx: StandardRelayerContext, next: Next): Promise<void> {
    ctx.logger.info(`Got a VAA: ${ctx.vaa} from with txhash: ${ctx.sourceTxHash}`);

    const { payload } = ctx.tokenBridge;

    if (payload?.payloadType !== TokenBridgePayload.TransferWithPayload) {
      return await next();
    }

    if (!isChainId(ctx.vaa!.emitterChain)) {
      return await next();
    }

    if (!this.supportedEmitters.has(ctx.vaa!.emitterChain)) {
      return await next();
    }

    const [_, contract] = this.supportedEmitters.get(ctx.vaa!.emitterChain)!;

    const parsedVaa = parseTokenTransferPayload(ctx.vaa!.payload);
    const emitterAddress = parsedVaa.fromAddress?.toString('hex');

    if (emitterAddress != encodeEmitterAddress(ctx.vaa!.emitterChain, contract)) {
      return await next();
    }

    const repository = WormholeDataSource.getRepository(GmpRequest);
    const existingVaa = await repository.findOneBy({ hash: ctx.vaa!.hash.toString('hex') });

    if (existingVaa !== null) {
      return await next();
    }

    await repository.save({
      emitterAddress: ctx.vaa!.emitterAddress.toString('hex'),
      emitterChain: ctx.vaa!.emitterChain,
      hash: ctx.vaa!.hash.toString('hex'),
      sequence: ctx.vaa!.sequence.toString(),
      status: WormholeRequestStatus.ReceivedSignedVaa,
      timestamp: ctx.vaa!.timestamp.toString(),
      vaa: ctx.vaaBytes!.toString('base64'),
      errorReason: null,
    });

    return await next();
  }

  async relayVaas(): Promise<void> {
    const repository = WormholeDataSource.getRepository(GmpRequest);

    while (true) {
      await relayVaa(this.supportedEmitters, repository);
      await delay(5000);
    }
  }
}

async function relayVaa(
  supportedEmitters: Map<ChainId, [string, string]>,
  repository: Repository<GmpRequest>,
): Promise<void> {
  let receivedVaa: GmpRequest | null = null;

  try {
    for (const [chainId, _] of supportedEmitters) {
      receivedVaa = null;

      receivedVaa = await repository.findOneBy({
        emitterChain: chainId,
        status: In([WormholeRequestStatus.ReceivedSignedVaa, WormholeRequestStatus.PostedSignedVaa]),
        errorReason: IsNull(),
      });

      if (receivedVaa === null) {
        continue;
      }

      const vaaBytes = Buffer.from(receivedVaa.vaa, 'base64');
      const parsedVaa = parseTokenTransferVaa(vaaBytes);

      const targetChainId = toChainId(parsedVaa.toChain);
      const targetChain = toChain(parsedVaa.toChain);

      if (!supportedEmitters.has(targetChainId)) {
        continue;
      }

      const [_, targetContract] = supportedEmitters.get(targetChainId)!;

      if (receivedVaa.status == WormholeRequestStatus.ReceivedSignedVaa && targetChain == 'Solana') {
        await new SolanaGmpWithTokenClient(targetContract).postVaa(vaaBytes);

        receivedVaa.status = WormholeRequestStatus.PostedSignedVaa;
        await repository.save(receivedVaa);
      } else if (receivedVaa.status == WormholeRequestStatus.PostedSignedVaa && targetChain == 'Solana') {
        await new SolanaGmpWithTokenClient(targetContract).redeemWrapped(vaaBytes);

        receivedVaa.status = WormholeRequestStatus.RedeemedSignedVaa;
        await repository.save(receivedVaa);
      } else {
        throw new Error(`Chain is not supported: ${targetChain}`);
      }
    }
  } catch (error) {
    rootLogger.error(error);

    if (receivedVaa !== null) {
      receivedVaa.errorReason = error.toString();
      await repository.save(receivedVaa);
    }
  }
}
