import { Timestamp } from '@bufbuild/protobuf';
import { MsgGrant, MsgRevoke } from '../../proto/cosmos/authz/tx.js';
import { Grant } from '../../proto/cosmos/authz/authz.js';
import { createAnyMessage } from '../common.js';
export function createMsgGrant(granter, grantee, grantMessage, seconds) {
    const msg = new MsgGrant({
        granter,
        grantee,
        grant: new Grant({
            authorization: createAnyMessage(grantMessage),
            expiration: new Timestamp({
                seconds: BigInt(seconds),
                nanos: 0,
            }),
        }),
    });
    return {
        message: msg,
        path: MsgGrant.typeName,
    };
}
export var RevokeMessages;
(function (RevokeMessages) {
    RevokeMessages["REVOKE_MSG_DELEGATE"] = "/cosmos.staking.v1beta1.MsgDelegate";
    RevokeMessages["REVOKE_MSG_WITHDRAW_DELEGATOR_REWARDS"] = "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward";
})(RevokeMessages || (RevokeMessages = {}));
export function createMsgRevoke(granter, grantee, type) {
    const msg = new MsgRevoke({
        granter,
        grantee,
        msgTypeUrl: type,
    });
    return {
        message: msg,
        path: MsgRevoke.typeName,
    };
}
//# sourceMappingURL=authz.js.map