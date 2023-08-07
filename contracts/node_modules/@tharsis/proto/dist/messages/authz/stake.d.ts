import * as authzStake from '../../proto/cosmos/staking/v1beta1/authz';
export declare const stakeAuthTypes: typeof authzStake.cosmos.staking.v1beta1.AuthorizationType;
export declare function createStakeAuthorization(allowAddress: string, denom: string, maxTokens: string | undefined, authorizationType: authzStake.cosmos.staking.v1beta1.AuthorizationType): {
    message: authzStake.cosmos.staking.v1beta1.StakeAuthorization;
    path: string;
};
//# sourceMappingURL=stake.d.ts.map