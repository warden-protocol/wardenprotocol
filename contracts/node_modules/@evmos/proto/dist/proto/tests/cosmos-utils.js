import { Any } from '@bufbuild/protobuf';
import { Coin } from '../cosmos/base/coin';
import { GenericAuthorization, GrantAuthorization } from '../cosmos/authz/authz';
import { MsgSend } from '../cosmos/bank/tx';
import { MsgWithdrawDelegatorReward } from '../cosmos/distribution/tx';
import { MsgVote } from '../cosmos/gov/tx';
import { VoteOption } from '../cosmos/gov/gov';
import { MsgDelegate } from '../cosmos/staking/tx';
import { MsgTransfer } from '../cosmos-ibc/ibc/applications/tx';
import { Height } from '../cosmos-ibc/ibc/core/client';
import { from, to, val, denom } from './utils';
export const genTestEmptyMsg = () => new MsgSend();
export const genTestGrantAuthorization = () => {
    const auth = new GenericAuthorization({
        msg: 'cosmos-sdk/MsgSend',
    });
    const authAny = new Any({
        typeUrl: `/${GenericAuthorization.typeName}`,
        value: auth.toBinary(),
    });
    return [
        new GrantAuthorization({
            granter: from,
            grantee: to,
            authorization: authAny,
        }),
        'Cixldm1vczFwbWsycjMyc3Nxd3BzNDJ5M2M5ZDRjbHFsY2E0MDN5ZDl3eW1nchIsZXZtb3MxMm5tbDJ3OTN1dmEwc21qdzNjMzZzdGN6ZmF5MGs2N255OTRlY3oaQgoqL2Nvc21vcy5hdXRoei52MWJldGExLkdlbmVyaWNBdXRob3JpemF0aW9uEhQKEmNvc21vcy1zZGsvTXNnU2VuZA==',
    ];
};
export const genTestMsgSend = () => {
    const coin = new Coin({
        amount: '100000000',
        denom,
    });
    return [
        new MsgSend({
            fromAddress: from,
            toAddress: to,
            amount: [coin],
        }),
        'Cixldm1vczFwbWsycjMyc3Nxd3BzNDJ5M2M5ZDRjbHFsY2E0MDN5ZDl3eW1nchIsZXZtb3MxMm5tbDJ3OTN1dmEwc21qdzNjMzZzdGN6ZmF5MGs2N255OTRlY3oaEwoGYWV2bW9zEgkxMDAwMDAwMDA=',
    ];
};
export const genTestMsgWithdrawDelegatorReward = () => [
    new MsgWithdrawDelegatorReward({
        delegatorAddress: from,
        validatorAddress: val,
    }),
    'Cixldm1vczFwbWsycjMyc3Nxd3BzNDJ5M2M5ZDRjbHFsY2E0MDN5ZDl3eW1nchIzZXZtb3N2YWxvcGVyMTRyYWp1c2Vsa3hzdnF0cXYyMGxhbWQwOHQ4enhnOHFkdzNyM3ht',
];
export const genTestMsgVote = () => [
    new MsgVote({
        proposalId: BigInt(10),
        voter: from,
        option: VoteOption.YES,
    }),
    'CAoSLGV2bW9zMXBtazJyMzJzc3F3cHM0MnkzYzlkNGNscWxjYTQwM3lkOXd5bWdyGAE=',
];
export const genTestMsgDelegate = () => {
    const coin = new Coin({
        amount: '999999999999',
        denom,
    });
    return [
        new MsgDelegate({
            delegatorAddress: from,
            validatorAddress: val,
            amount: coin,
        }),
        'Cixldm1vczFwbWsycjMyc3Nxd3BzNDJ5M2M5ZDRjbHFsY2E0MDN5ZDl3eW1nchIzZXZtb3N2YWxvcGVyMTRyYWp1c2Vsa3hzdnF0cXYyMGxhbWQwOHQ4enhnOHFkdzNyM3htGhYKBmFldm1vcxIMOTk5OTk5OTk5OTk5',
    ];
};
export const genTestMsgIBCTransfer = () => {
    const coin = new Coin({
        amount: '999999999999',
        denom,
    });
    const height = new Height();
    return [
        new MsgTransfer({
            sourcePort: 'transfer',
            sourceChannel: 'channel-0',
            token: coin,
            sender: from,
            receiver: to,
            timeoutHeight: height,
            memo: '',
        }),
        'Cgh0cmFuc2ZlchIJY2hhbm5lbC0wGhYKBmFldm1vcxIMOTk5OTk5OTk5OTk5Iixldm1vczFwbWsycjMyc3Nxd3BzNDJ5M2M5ZDRjbHFsY2E0MDN5ZDl3eW1nciosZXZtb3MxMm5tbDJ3OTN1dmEwc21qdzNjMzZzdGN6ZmF5MGs2N255OTRlY3oyAA==',
    ];
};
//# sourceMappingURL=cosmos-utils.js.map