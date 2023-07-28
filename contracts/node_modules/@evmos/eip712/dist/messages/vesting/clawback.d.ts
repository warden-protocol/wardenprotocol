export declare const MSG_CLAWBACK_TYPES: {
    MsgValue: {
        name: string;
        type: string;
    }[];
};
export declare function createMsgClawback(funder_address: string, account_address: string, dest_address?: string): {
    type: string;
    value: {
        funder_address: string;
        account_address: string;
        dest_address: string | undefined;
    };
};
//# sourceMappingURL=clawback.d.ts.map