/// <reference path="../types.d.ts" />
/// <reference types="node" />
import { GeneratedType, OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { StdFee } from "@cosmjs/stargate";
import { Env } from "./env";
import { UnionToIntersection, Return, Constructor } from "./helpers";
import { IgntModule } from "./modules";
import { EventEmitter } from "events";
import { ChainInfo } from "@keplr-wallet/types";
export declare class IgniteClient extends EventEmitter {
    static plugins: IgntModule[];
    env: Env;
    signer?: OfflineSigner;
    registry: Array<[string, GeneratedType]>;
    static plugin<T extends IgntModule | IgntModule[]>(plugin: T): (typeof IgniteClient & Constructor<UnionToIntersection<Return<T>["module"]>>) | (typeof IgniteClient & Constructor<Return<T>["module"]>);
    signAndBroadcast(msgs: EncodeObject[], fee: StdFee, memo: string): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    constructor(env: Env, signer?: OfflineSigner);
    useSigner(signer: OfflineSigner): void;
    removeSigner(): void;
    useKeplr(keplrChainInfo?: Partial<ChainInfo>): Promise<void>;
}
