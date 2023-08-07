export declare const MSG_UPDATE_REVENUE_TYPES: {
    MsgValue: {
        name: string;
        type: string;
    }[];
};
export declare function createMsgUpdateRevenue(contract_address: string, deployer_address: string, withdrawer_address: string): {
    type: string;
    value: {
        contract_address: string;
        deployer_address: string;
        withdrawer_address: string;
    };
};
//# sourceMappingURL=updateRevenue.d.ts.map