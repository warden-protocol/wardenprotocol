import { Coin } from '../../proto/cosmos/base/coin.js';
import { StakeAuthorization, StakeAuthorization_Validators, } from '../../proto/cosmos/staking/authz.js';
export function createStakeAuthorization(allowAddress, denom, maxTokens, authorizationType) {
    const msg = new StakeAuthorization({
        validators: {
            value: new StakeAuthorization_Validators({
                address: [allowAddress],
            }),
            case: 'allowList',
        },
        maxTokens: maxTokens
            ? new Coin({
                denom,
                amount: maxTokens,
            })
            : undefined,
        authorizationType,
    });
    return {
        message: msg,
        path: StakeAuthorization.typeName,
    };
}
//# sourceMappingURL=stake.js.map