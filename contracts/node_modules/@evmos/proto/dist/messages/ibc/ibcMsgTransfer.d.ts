import { MsgTransfer } from '../../proto/cosmos-ibc/ibc/applications/tx.js';
export declare function createIBCMsgTransfer(sourcePort: string, sourceChannel: string, amount: string, denom: string, sender: string, receiver: string, revisionNumber: number, revisionHeight: number, timeoutTimestamp: string, memo?: string): {
    message: MsgTransfer;
    path: string;
};
//# sourceMappingURL=ibcMsgTransfer.d.ts.map