export declare const MSG_CANCEL_REVENUE_TYPES: {
    MsgValue: {
        name: string;
        type: string;
    }[];
};
export declare function createMsgCancelRevenue(contract_address: string, deployer_address: string): {
    type: string;
    value: {
        contract_address: string;
        deployer_address: string;
    };
};
//# sourceMappingURL=cancelRevenue.d.ts.map