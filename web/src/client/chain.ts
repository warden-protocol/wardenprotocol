import { chainDescriptor } from "@/keplr";
import { TxBody, TxRaw } from "@/proto/cosmos/tx/v1beta1/tx_pb";
import { sha256 } from "js-sha256";

const rpcUrl = chainDescriptor.rpc;

export interface RpcResponse<T> {
  jsonrpc: string;
  id: number;
  result: T;
  error?: {
    code: number;
    message: string;
    data: any;
  }
}

async function rpcRequest<T>(method: string, params: any) {
  const res = await fetch(rpcUrl, {
    method: "POST",
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: method,
      params: params,
      id: -1
    })
  });
  return await res.json() as RpcResponse<T>;
}

export interface BlockId {
  hash: string;
  parts: {
    total: number;
    hash: string;
  }
}

interface BlockResponse {
  block_id: BlockId;
  block: {
    header: {
      height: string;
      time: string;
      last_block_id: BlockId;
      last_commit_hash: string;
      data_hash: string;
      validators_hash: string;
      next_validators_hash: string;
      consensus_hash: string;
      app_hash: string;
      last_results_hash: string;
      evidence_hash: string;
      proposer_address: string;
    },
    data: {
      txs: string[];
    },
    evidence: {
      evidence: string[];
    },
    last_commit: {
      height: string;
      round: number;
      block_id: BlockId;
      signatures: {
        block_id_flag: number;
        validator_address: string;
        timestamp: string;
        signature: string;
      }[];
    }
  }
}

export interface BlockSearchResponse {
  blocks: BlockResponse[];
}

export interface StatusResponse {
  sync_info: {
    latest_block_height: string;
  },
}

export async function status(): Promise<RpcResponse<StatusResponse>> {
  return await rpcRequest<StatusResponse>("status", {});
}

export async function latestBlocks(count: number): Promise<BlockResponseParsed[]> {
  const statusRes = await status();
  const latestHeight = parseInt(statusRes.result.sync_info.latest_block_height, 10);
  const res = await rpcRequest<BlockSearchResponse>("block_search", { query: `block.height>${latestHeight-count} AND block.height<=${latestHeight}`, "per_page": count?.toString() });
  return res.result.blocks.map(parseBlockResponse);
}

export async function block(height: string | undefined) {
  const res = await rpcRequest<BlockResponse>("block", { height });
  return parseBlockResponse(res.result);
}

export type BlockResponseParsed = Omit<BlockResponse, "block"> & {
  block: Omit<BlockResponse["block"], "data"> & {
    data: Omit<BlockResponse["block"]["data"], "txs"> & {
      txs: TxParsed[];
    }
  }
};

function parseBlockResponse(res: BlockResponse): BlockResponseParsed {
  return {
    ...res,
    block: {
      ...res.block,
      data: {
        txs: res.block.data.txs.map(tx => parseTx(tx)),
      },
    },
  }
}

export async function txByHash(hash: string): Promise<TxByHashResponse> {
  const hashB64 = hexToBase64(hash);
  const res = await rpcRequest<TxByHashResult>("tx", { hash: hashB64 });
  return {
    ...res,
    result: res.result ? {
      ...res.result,
      tx: parseTx(res.result.tx),
    } : null,
  };
}

export type TxByHashResponse = Omit<RpcResponse<TxByHashResult>, "result"> & {
  result: Omit<TxByHashResult, "tx"> & {
    tx: TxParsed;
  } | null;
}

export interface TxByHashResult {
  hash: string,
  height: string,
  index: number,
  tx_result: TxResult,
  tx: string,
}

export interface TxResult {
  code: number,
  data: string,
  log: string,
  info: string,
  gas_wanted: string,
  gas_used: string,
  events: any[],
  codespace: string,
}

function hexToBase64(hexstring: string) {
  return btoa(hexstring.match(/\w{2}/g)!.map(function(a) {
    return String.fromCharCode(parseInt(a, 16));
  }).join(""));
}

export type TxParsed = Pick<TxRaw, "bodyBytes"> & {
  hash: string,
  body: TxBody,
}

function parseTx(tx: string): TxParsed {
  const bytes = Uint8Array.from(atob(tx), c => c.charCodeAt(0));
  const hash = sha256(bytes);
  const txRaw = TxRaw.fromBinary(bytes);
  const txBody = TxBody.fromBinary(txRaw.bodyBytes);
  return {
    ...txRaw,
    hash,
    body: txBody,
  }
}
