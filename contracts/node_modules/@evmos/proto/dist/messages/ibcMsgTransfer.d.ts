import * as ibcMsg from '../proto/ibc/applications/transfer/v1/tx';
export declare function createIBCMsgTransfer(sourcePort: string, sourceChannel: string, amount: string, denom: string, sender: string, receiver: string, revisionNumber: number, revisionHeight: number, timeoutTimestamp: string): {
    message: ibcMsg.ibc.applications.transfer.v1.MsgTransfer;
    path: string;
};
//# sourceMappingURL=ibcMsgTransfer.d.ts.map