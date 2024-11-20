export interface MasterPublicKey {
  /** The ID of the key. */
  id: string;
  /** The xpub encoding of the key. For more details, see https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#serialization-format */
  xpub: string;
}
