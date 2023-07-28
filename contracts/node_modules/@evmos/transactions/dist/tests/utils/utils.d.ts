import { Fee, Chain, Sender } from '../../messages/common';
import { TxContext } from '../../messages/base';
export declare class TestingClient {
    readonly denom = "aevmos";
    readonly amount1 = "1000000000000000000";
    readonly amount2 = "999999999999";
    readonly amount3 = "100000000";
    readonly addr1 = "evmos1pmk2r32ssqwps42y3c9d4clqlca403yd9wymgr";
    readonly addr2 = "evmos12nml2w93uva0smjw3c36stczfay0k67ny94ecz";
    readonly addr3 = "evmos1xqnm0wf0rmntujjmpsz8nr28324qqyzy5k02u0";
    readonly addrVal1 = "evmosvaloper14rajuselkxsvqtqv20lamd08t8zxg8qdw3r3xm";
    readonly addrVal2 = "evmosvaloper1ex3wpda6mpczlgtcm2dsd60ltz39g5a7wqewls";
    readonly addrHex1 = "0xe2D61e49ff8a9d724CC54d338D8076F878aC6b71";
    readonly addrHex2 = "0xC1c85eB8278F783C5FE2103F1e4ac041B094160a";
    readonly chainId = 9001;
    readonly memo = "Transaction Memo";
    readonly proposalId1 = 42;
    readonly voteOption1 = 1;
    get context(): TxContext;
    get fee(): Fee;
    get chain(): Chain;
    get sender(): Sender;
    private generatePubKey;
    get validatorParams(): {
        moniker: string;
        identity: string;
        website: string;
        securityContact: string;
        details: string;
        validatorAddress: string;
        commissionRate: string;
        minSelfDelegation: string;
    };
}
declare const client: TestingClient;
export default client;
//# sourceMappingURL=utils.d.ts.map