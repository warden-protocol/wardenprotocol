export declare const MSG_REGISTER_REVENUE_TYPES: {
    MsgValue: {
        name: string;
        type: string;
    }[];
};
export declare function createMsgRegisterRevenue(contract_address: string, deployer_address: string, withdrawer_address: string, nonces: number[]): {
    type: string;
    value: {
        contract_address: string;
        deployer_address: string;
        withdrawer_address: string;
        nonces: number[];
    };
};
//# sourceMappingURL=registerRevenue.d.ts.map