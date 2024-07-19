import {
  CHAIN_ID_ARBITRUM_SEPOLIA,
  CHAIN_ID_SEPOLIA,
  CHAIN_ID_SOLANA,
  SignedVaa,
  parseTokenTransferPayload,
  tryNativeToHexString,
} from '@certusone/wormhole-sdk';
import { Keypair } from '@solana/web3.js';
import { Next, StandardRelayerContext } from '@warden/wormhole-relayer-engine';
import { Chain, ChainAddress, ChainContext, Network, Signer, Wormhole, encoding } from '@wormhole-foundation/sdk';
import { chainToChainId } from '@wormhole-foundation/sdk';
import evm from '@wormhole-foundation/sdk/evm';
import cosmwasm from '@wormhole-foundation/sdk/platforms/cosmwasm';
import solana from '@wormhole-foundation/sdk/solana';
import bs58 from 'bs58';

import { SolanaGmpWithTokenClient } from '../clients/solanaGmpWithTokenClient.js';
import { config } from '../config/schema.js';

export class RelayProcessor {
  async relay(ctx: StandardRelayerContext, next: Next) {
    ctx.logger.info(`Got a VAA: ${ctx.vaa} from with txhash: ${ctx.sourceTxHash}`);
    console.log(
      `Got a VAA: chain: ${ctx.vaa?.emitterChain}, storage_id: ${ctx.storage.job.id}, VAA payload: '${encoding.bytes.decode(ctx.vaa!.payload!)}'`,
    );

    if (ctx.vaa?.emitterChain != CHAIN_ID_SEPOLIA) {
      return await next();
    }

    const client = new SolanaGmpWithTokenClient();

    // client.redeemWrapped();

    const tes2 = parseTokenTransferPayload(ctx.vaa.payload);
    // await client.redeemWrapped(
    //   Keypair.fromSecretKey(
    //     bs58.decode('59gdFVEWn6K63CHtWFreZFBcdAZeFRV3LaJEQ5XeWDBwKx5KvVvmgEi8Cr1Wr3DWhXt4EbaJqTuEX88qQWYauWvG'),
    //   ),
    //   '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
    //   chainToChainId('Sepolia'),
    //   ctx.vaaBytes!,
    // );

    // if (
    //   ctx.vaa?.emitterChain != CHAIN_ID_ARBITRUM_SEPOLIA ||
    //   ctx.vaa.id.emitterAddress == '000000000000000000000000e0418c44f06b0b0d7d1706e01706316dbb0b210e'
    // ) {
    //   return await next();
    // }

    // const tes = parseTokenTransferPayload(ctx.vaa.payload);
    // const addr = tryNativeToHexString('Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr', chainToChainId('Solana'));
    // const encoded_string = bs58.encode(ctx.vaa.emitterAddress);

    return await next();
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
