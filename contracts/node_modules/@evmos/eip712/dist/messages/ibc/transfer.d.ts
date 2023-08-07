export declare const CREATE_IBC_MSG_TRANSFER_TYPES: (memo?: string) => {
    MsgValue: {
        name: string;
        type: string;
    }[];
    TypeToken: {
        name: string;
        type: string;
    }[];
    TypeTimeoutHeight: {
        name: string;
        type: string;
    }[];
};
export declare function createIBCMsgTransfer(receiver: string, sender: string, sourceChannel: string, sourcePort: string, revisionHeight: number, revisionNumber: number, timeoutTimestamp: string, amount: string, denom: string, memo?: string): {
    type: string;
    value: {
        memo?: string | undefined;
        receiver: string;
        sender: string;
        source_channel: string;
        source_port: string;
        timeout_height: {
            revision_height: string;
            revision_number: string;
        };
        timeout_timestamp: string;
        token: {
            amount: string;
            denom: string;
        };
    };
};
//# sourceMappingURL=transfer.d.ts.map