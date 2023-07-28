import { MsgGrant, MsgRevoke } from '../../proto/cosmos/authz/tx.js';
import { MessageGenerated } from '../common.js';
export declare function createMsgGrant(granter: string, grantee: string, grantMessage: MessageGenerated, seconds: number): {
    message: MsgGrant;
    path: string;
};
export declare enum RevokeMessages {
    REVOKE_MSG_DELEGATE = "/cosmos.staking.v1beta1.MsgDelegate",
    REVOKE_MSG_WITHDRAW_DELEGATOR_REWARDS = "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward"
}
export declare function createMsgRevoke(granter: string, grantee: string, type: string | RevokeMessages): {
    message: MsgRevoke;
    path: string;
};
//# sourceMappingURL=authz.d.ts.map