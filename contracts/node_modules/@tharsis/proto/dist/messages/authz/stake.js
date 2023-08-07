"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStakeAuthorization = exports.stakeAuthTypes = void 0;
const coin = __importStar(require("../../proto/cosmos/base/v1beta1/coin"));
const authzStake = __importStar(require("../../proto/cosmos/staking/v1beta1/authz"));
exports.stakeAuthTypes = authzStake.cosmos.staking.v1beta1.AuthorizationType;
function createStakeAuthorization(allowAddress, denom, maxTokens, authorizationType) {
    const msg = new authzStake.cosmos.staking.v1beta1.StakeAuthorization({
        allow_list: new authzStake.cosmos.staking.v1beta1.StakeAuthorization.Validators({
            address: [allowAddress],
        }),
        max_tokens: maxTokens
            ? new coin.cosmos.base.v1beta1.Coin({
                denom,
                amount: maxTokens,
            })
            : undefined,
        authorization_type: authorizationType,
    });
    return {
        message: msg,
        path: 'cosmos.staking.v1beta1.StakeAuthorization',
    };
}
exports.createStakeAuthorization = createStakeAuthorization;
//# sourceMappingURL=stake.js.map