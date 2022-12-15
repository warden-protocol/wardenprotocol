import { QueryClient } from "@cosmjs/stargate";
import { QueryAllContractStateResponse, QueryCodeResponse, QueryCodesResponse, QueryContractHistoryResponse, QueryContractInfoResponse, QueryContractsByCodeResponse, QueryRawContractStateResponse } from "cosmjs-types/cosmwasm/wasm/v1/query";
/**
 * An object containing a parsed JSON document. The result of JSON.parse().
 * This doesn't provide any type safety over `any` but expresses intent in the code.
 *
 * This type is returned by `queryContractSmart`.
 */
export declare type JsonObject = any;
export interface WasmExtension {
    readonly wasm: {
        readonly listCodeInfo: (paginationKey?: Uint8Array) => Promise<QueryCodesResponse>;
        /**
         * Downloads the original wasm bytecode by code ID.
         *
         * Throws an error if no code with this id
         */
        readonly getCode: (id: number) => Promise<QueryCodeResponse>;
        readonly listContractsByCodeId: (id: number, paginationKey?: Uint8Array) => Promise<QueryContractsByCodeResponse>;
        /**
         * Returns null when contract was not found at this address.
         */
        readonly getContractInfo: (address: string) => Promise<QueryContractInfoResponse>;
        /**
         * Returns null when contract history was not found for this address.
         */
        readonly getContractCodeHistory: (address: string, paginationKey?: Uint8Array) => Promise<QueryContractHistoryResponse>;
        /**
         * Returns all contract state.
         * This is an empty array if no such contract, or contract has no data.
         */
        readonly getAllContractState: (address: string, paginationKey?: Uint8Array) => Promise<QueryAllContractStateResponse>;
        /**
         * Returns the data at the key if present (unknown decoded json),
         * or null if no data at this (contract address, key) pair
         */
        readonly queryContractRaw: (address: string, key: Uint8Array) => Promise<QueryRawContractStateResponse>;
        /**
         * Makes a smart query on the contract and parses the response as JSON.
         * Throws error if no such contract exists, the query format is invalid or the response is invalid.
         */
        readonly queryContractSmart: (address: string, query: Record<string, unknown>) => Promise<JsonObject>;
    };
}
export declare function setupWasmExtension(base: QueryClient): WasmExtension;
