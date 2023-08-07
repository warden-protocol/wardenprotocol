import { AuthorizationType, StakeAuthorization } from '../../proto/cosmos/staking/authz.js';
export declare function createStakeAuthorization(allowAddress: string, denom: string, maxTokens: string | undefined, authorizationType: AuthorizationType): {
    message: StakeAuthorization;
    path: string;
};
//# sourceMappingURL=stake.d.ts.map