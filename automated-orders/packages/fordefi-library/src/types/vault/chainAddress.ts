import { EnrichedChain } from './enrichedChain.js';

export interface ChainsAddress {
  /** The address as bech32 */
  address: string;
  /** @deprecated */
  chain: string;
  /** Enriched chain of the address. */
  enriched_chain: EnrichedChain;
}
