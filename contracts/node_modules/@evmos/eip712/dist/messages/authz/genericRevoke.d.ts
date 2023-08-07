export declare const MSG_REVOKE_GENERIC_AUTHORIZATION_TYPES: {
    MsgValue: {
        name: string;
        type: string;
    }[];
};
export declare function createMsgRevokeGenericAuthorization(sender: string, granteeAddress: string, typeUrl: string): {
    type: string;
    value: {
        msg_type_url: string;
        grantee: string;
        granter: string;
    };
};
//# sourceMappingURL=genericRevoke.d.ts.map