export declare function rawEd25519PubkeyToRawAddress(pubkeyData: Uint8Array): Uint8Array;
export declare function rawSecp256k1PubkeyToRawAddress(pubkeyData: Uint8Array): Uint8Array;
export declare function pubkeyToRawAddress(type: "ed25519" | "secp256k1", data: Uint8Array): Uint8Array;
export declare function pubkeyToAddress(type: "ed25519" | "secp256k1", data: Uint8Array): string;
