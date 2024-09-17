import { ChainId } from "@wormhole-foundation/sdk";

export interface GatewayTransferWithPayload {
    chain: ChainId;    // chain Id of the Cosmos chain we're sending to
    contract: string; // address of contract (base64 encoded bech32)
    fee: number;      // fee for transfer (0 for now)
    nonce: number;    // 0
    payload: string;  // payload for IBC hooks on the destination cosmos chain (base64 encoded)            
}