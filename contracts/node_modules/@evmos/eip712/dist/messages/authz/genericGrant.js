export const MSG_GENERIC_AUTHORIZATION_TYPES = {
    MsgValue: [
        { name: 'granter', type: 'string' },
        { name: 'grantee', type: 'string' },
        { name: 'grant', type: 'TypeGrant' },
    ],
    TypeGrant: [
        { name: 'authorization', type: 'TypeGrantAuthorization' },
        { name: 'expiration', type: 'string' },
    ],
    TypeGrantAuthorization: [
        { name: 'type', type: 'string' },
        { name: 'value', type: 'TypeGrantAuthorizationValue' },
    ],
    TypeGrantAuthorizationValue: [{ name: 'msg', type: 'string' }],
};
export function createMsgGenericAuthorization(sender, granteeAddress, typeUrl, expires) {
    const date = new Date();
    date.setTime(expires * 1000);
    let time = date.toISOString();
    time = time.replace('.000Z', 'Z');
    return {
        type: 'cosmos-sdk/MsgGrant',
        value: {
            grant: {
                authorization: {
                    type: 'cosmos-sdk/GenericAuthorization',
                    value: {
                        msg: typeUrl,
                    },
                },
                expiration: time,
            },
            grantee: granteeAddress,
            granter: sender,
        },
    };
}
//# sourceMappingURL=genericGrant.js.map