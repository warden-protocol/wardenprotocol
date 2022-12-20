import { Pubkey } from "./pubkeys";
export declare function rawEd25519PubkeyToRawAddress(pubkeyData: Uint8Array): Uint8Array;
export declare function rawSecp256k1PubkeyToRawAddress(pubkeyData: Uint8Array): Uint8Array;
export declare function pubkeyToRawAddress(pubkey: Pubkey): Uint8Array;
export declare function pubkeyToAddress(pubkey: Pubkey, prefix: string): string;
