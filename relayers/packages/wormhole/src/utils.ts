import { Environment } from '@warden/wormhole-relayer-engine';
import { Network } from '@wormhole-foundation/sdk';
import { promisify } from 'util';

export const delay = promisify((ms: number, res: () => void) => setTimeout(res, ms));

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
