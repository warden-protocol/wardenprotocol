import { Metadata } from '../../proto/cosmos/bank/bank';
import { createMsgConvertCoin } from './msgConvertCoin';
import { createMsgConvertERC20 } from './msgConvertERC20';
import { createMsgRegisterERC20 } from './msgRegisterERC20';
import { createMsgRegisterCoin } from './msgRegisterCoin';
import { MsgConvertCoin, MsgConvertERC20 } from '../../proto/evmos/erc20/tx';
import { RegisterERC20Proposal, RegisterCoinProposal, } from '../../proto/evmos/erc20/erc20';
import { from, to, denom, hex, ibcDenom } from '../../proto/tests/utils';
import { JSONOptions } from '../../proto/tests/common';
describe('test ERC20 Module message generation', () => {
    it('correctly wraps msgConvertCoin', () => {
        const amount = '10000000';
        const msg = createMsgConvertCoin(denom, amount, hex, from);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            coin: {
                amount,
                denom,
            },
            receiver: hex,
            sender: from,
        });
        expect(msg.path).toStrictEqual(MsgConvertCoin.typeName);
    });
    it('correctly wraps msgConvertERC20', () => {
        const amount = '10000000';
        const msg = createMsgConvertERC20(hex, amount, to, from);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            contract_address: hex,
            amount,
            receiver: to,
            sender: from,
        });
        expect(msg.path).toStrictEqual(MsgConvertERC20.typeName);
    });
    it('correctly wraps msgRegisterERC20', () => {
        const title = 'Register Test ERC20';
        const description = title;
        const msg = createMsgRegisterERC20(title, description, [hex]);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            title,
            description: title,
            erc20addresses: [hex],
        });
        expect(msg.path).toStrictEqual(RegisterERC20Proposal.typeName);
    });
    it('correctly wraps msgRegisterCoin', () => {
        const title = 'Register Test IBC Coin';
        const description = title;
        const metadataDescr = 'This is one IBC coin';
        const denomUnit1 = { denom: ibcDenom, exponent: 0, aliases: ['stuosmo'] };
        const denomUnit2 = { denom: 'stosmo', exponent: 6, aliases: [] };
        const denomUnits = [denomUnit1, denomUnit2];
        const displayName = 'stosmo';
        const completeName = 'Stride Staked Osmo';
        const symbol = 'stOSMO';
        const uri = '';
        const uriHash = '';
        const metadata = new Metadata({
            description: metadataDescr,
            denomUnits,
            base: ibcDenom,
            display: displayName,
            name: completeName,
            symbol,
            uri,
            uriHash,
        });
        const msg = createMsgRegisterCoin(title, description, [metadata]);
        const expMeta = {
            description: metadataDescr,
            denom_units: denomUnits,
            base: ibcDenom,
            display: displayName,
            name: completeName,
            symbol,
            uri,
            uri_hash: uriHash,
        };
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            title,
            description: title,
            metadata: [expMeta],
        });
        expect(msg.path).toStrictEqual(RegisterCoinProposal.typeName);
    });
});
//# sourceMappingURL=erc20.spec.js.map