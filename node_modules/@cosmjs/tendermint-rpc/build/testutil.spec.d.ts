export declare const chainIdMatcher: RegExp;
export declare const anyMatcher: RegExp;
export interface ExpectedValues {
    /** The Tendermint version as reported by Tendermint itself */
    readonly version: string | RegExp;
    readonly appCreator: string;
    readonly p2pVersion: number;
    readonly blockVersion: number;
    readonly appVersion: number;
}
export interface TendermintInstance {
    readonly url: string;
    readonly version: string;
    /** rough block time in ms */
    readonly blockTime: number;
    /** Values we expect in the backend */
    readonly expected: ExpectedValues;
}
/**
 * Tendermint instances to be tested.
 *
 * Testing different versions: as a convention, the minor version number is encoded
 * in the port 111<version>, e.g. Tendermint 0.21.0 runs on port 11121. To start
 * a specific version use:
 *   TENDERMINT_VERSION=0.29.2 TENDERMINT_PORT=11129 ./scripts/tendermint/start.sh
 *
 * When more than 1 instances of tendermint are running, stop them manually:
 *   docker container ls | grep tendermint/tendermint
 *   docker container kill <container id from 1st column>
 */
export declare const tendermintInstances: readonly TendermintInstance[];
export declare const defaultInstance: TendermintInstance;
export declare function tendermintEnabled(): boolean;
export declare function pendingWithoutTendermint(): void;
export declare function tendermintSearchIndexUpdated(): Promise<void>;
export declare function buildKvTx(k: string, v: string): Uint8Array;
export declare function randomString(): string;
