export declare const MSG_GENERIC_AUTHORIZATION_TYPES: {
    MsgValue: {
        name: string;
        type: string;
    }[];
    TypeGrant: {
        name: string;
        type: string;
    }[];
    TypeGrantAuthorization: {
        name: string;
        type: string;
    }[];
    TypeGrantAuthorizationValue: {
        name: string;
        type: string;
    }[];
};
export declare function createMsgGenericAuthorization(sender: string, granteeAddress: string, typeUrl: string, expires: number): {
    type: string;
    value: {
        grant: {
            authorization: {
                type: string;
                value: {
                    msg: string;
                };
            };
            expiration: string;
        };
        grantee: string;
        granter: string;
    };
};
//# sourceMappingURL=genericGrant.d.ts.map