export class TestingClient {
    constructor() {
        this.denom = 'aevmos';
        this.amount1 = '1000000000000000000';
        this.amount2 = '999999999999';
        this.amount3 = '100000000';
        this.addr1 = 'evmos1pmk2r32ssqwps42y3c9d4clqlca403yd9wymgr';
        this.addr2 = 'evmos12nml2w93uva0smjw3c36stczfay0k67ny94ecz';
        this.addr3 = 'evmos1xqnm0wf0rmntujjmpsz8nr28324qqyzy5k02u0';
        this.addrVal1 = 'evmosvaloper14rajuselkxsvqtqv20lamd08t8zxg8qdw3r3xm';
        this.addrVal2 = 'evmosvaloper1ex3wpda6mpczlgtcm2dsd60ltz39g5a7wqewls';
        this.addrHex1 = '0xe2D61e49ff8a9d724CC54d338D8076F878aC6b71';
        this.addrHex2 = '0xC1c85eB8278F783C5FE2103F1e4ac041B094160a';
        this.chainId = 9001;
        this.memo = 'Transaction Memo';
        this.proposalId1 = 42;
        this.voteOption1 = 1;
        this.generatePubKey = () => {
            const bytes = new Uint8Array([
                10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192, 55, 41, 81, 135,
                37, 92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5, 178, 20, 10, 253,
            ]);
            return Buffer.from(bytes).toString('base64');
        };
    }
    get context() {
        const { chain, sender, fee, memo } = this;
        return {
            chain,
            sender,
            fee,
            memo,
        };
    }
    get fee() {
        const amount = this.amount3;
        const { denom } = this;
        const gas = '500000';
        return {
            amount,
            denom,
            gas,
        };
    }
    get chain() {
        const { chainId } = this;
        const cosmosChainId = `evmos_${chainId}-2`;
        return {
            chainId,
            cosmosChainId,
        };
    }
    get sender() {
        const accountAddress = this.addr1;
        const sequence = 20;
        const accountNumber = 1908021;
        const pubkey = this.generatePubKey();
        return {
            accountAddress,
            sequence,
            accountNumber,
            pubkey,
        };
    }
    get validatorParams() {
        const moniker = 'test moniker';
        const identity = 'test identity';
        const website = 'test website';
        const securityContact = 'test security contact';
        const details = 'test details';
        const validatorAddress = this.addrVal1;
        const commissionRate = '0.1';
        const minSelfDelegation = this.amount1;
        return {
            moniker,
            identity,
            website,
            securityContact,
            details,
            validatorAddress,
            commissionRate,
            minSelfDelegation,
        };
    }
}
const client = new TestingClient();
export default client;
//# sourceMappingURL=utils.js.map