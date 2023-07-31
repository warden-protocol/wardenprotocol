import * as authz from '../../proto/cosmos/authz/v1beta1/tx';
import { MessageGenerated } from '../utils';
export declare function createMsgGrant(granter: string, grantee: string, grantMessage: MessageGenerated, seconds: number): {
    message: authz.cosmos.authz.v1beta1.MsgGrant;
    path: string;
};
export declare enum RevokeMessages {
    REVOKE_MSG_DELEGATE = "/cosmos.staking.v1beta1.MsgDelegate",
    REVOKE_MSG_WITHDRAW_DELEGATOR_REWARDS = "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward"
}
export declare function createMsgRevoke(granter: string, grantee: string, type: string | RevokeMessages): {
    message: authz.cosmos.authz.v1beta1.MsgRevoke;
    path: string;
};
//# sourceMappingURL=authz.d.ts.map