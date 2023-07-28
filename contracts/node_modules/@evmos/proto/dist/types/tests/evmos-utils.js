import { Coin } from '../cosmos/base/coin';
import { PubKey } from '../ethermint/crypto/keys';
import { MsgConvertCoin } from '../evmos/erc20/tx';
import { MsgRegisterRevenue } from '../evmos/revenue/tx';
import { from, denom, hex } from './utils';
export const genTestETHSECP256k1PubKey = () => [
    new PubKey({
        key: new Uint8Array([
            10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192, 55, 41, 81, 135,
            37, 92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5, 178, 20, 10, 253, 14,
            105, 23,
        ]),
    }),
    'CiMKIQKIsfUxuHhx28A3KVGHJVyuS6DEvDfKcmEFshQK/Q5pFw==',
];
export const genTestMsgConvertCoin = () => {
    const coin = new Coin({
        amount: '999999999999000',
        denom,
    });
    return [
        new MsgConvertCoin({
            coin,
            receiver: hex,
            sender: from,
        }),
        'ChkKBmFldm1vcxIPOTk5OTk5OTk5OTk5MDAwEioweGUyRDYxZTQ5ZmY4YTlkNzI0Q0M1NGQzMzhEODA3NkY4NzhhQzZiNzEaLGV2bW9zMXBtazJyMzJzc3F3cHM0MnkzYzlkNGNscWxjYTQwM3lkOXd5bWdy',
    ];
};
export const genTestMsgRegisterRevenue = () => [
    new MsgRegisterRevenue({
        contractAddress: hex,
        deployerAddress: from,
        withdrawerAddress: from,
        nonces: [BigInt(1)],
    }),
    'CioweGUyRDYxZTQ5ZmY4YTlkNzI0Q0M1NGQzMzhEODA3NkY4NzhhQzZiNzESLGV2bW9zMXBtazJyMzJzc3F3cHM0MnkzYzlkNGNscWxjYTQwM3lkOXd5bWdyGixldm1vczFwbWsycjMyc3Nxd3BzNDJ5M2M5ZDRjbHFsY2E0MDN5ZDl3eW1nciIBAQ==',
];
//# sourceMappingURL=evmos-utils.js.map