//@ts-nocheck
import { MsgEthereumTxResponseSDKType } from "./tx.js";
import { LCDClient } from "@cosmology/lcd";
import { QueryAccountRequest, QueryAccountResponseSDKType, QueryCosmosAccountRequest, QueryCosmosAccountResponseSDKType, QueryValidatorAccountRequest, QueryValidatorAccountResponseSDKType, QueryBalanceRequest, QueryBalanceResponseSDKType, QueryStorageRequest, QueryStorageResponseSDKType, QueryCodeRequest, QueryCodeResponseSDKType, QueryParamsRequest, QueryParamsResponseSDKType, EthCallRequest, EstimateGasResponseSDKType, QueryTraceTxRequest, QueryTraceTxResponseSDKType, QueryTraceBlockRequest, QueryTraceBlockResponseSDKType, QueryBaseFeeRequest, QueryBaseFeeResponseSDKType } from "./query.js";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.account = this.account.bind(this);
    this.cosmosAccount = this.cosmosAccount.bind(this);
    this.validatorAccount = this.validatorAccount.bind(this);
    this.balance = this.balance.bind(this);
    this.storage = this.storage.bind(this);
    this.code = this.code.bind(this);
    this.params = this.params.bind(this);
    this.ethCall = this.ethCall.bind(this);
    this.estimateGas = this.estimateGas.bind(this);
    this.traceTx = this.traceTx.bind(this);
    this.traceBlock = this.traceBlock.bind(this);
    this.baseFee = this.baseFee.bind(this);
  }
  /* Account queries an Ethereum account. */
  async account(params: QueryAccountRequest): Promise<QueryAccountResponseSDKType> {
    const endpoint = `evmos/evm/v1/account/${params.address}`;
    return await this.req.get<QueryAccountResponseSDKType>(endpoint);
  }
  /* CosmosAccount queries an Ethereum account's Cosmos Address. */
  async cosmosAccount(params: QueryCosmosAccountRequest): Promise<QueryCosmosAccountResponseSDKType> {
    const endpoint = `evmos/evm/v1/cosmos_account/${params.address}`;
    return await this.req.get<QueryCosmosAccountResponseSDKType>(endpoint);
  }
  /* ValidatorAccount queries an Ethereum account's from a validator consensus
   Address. */
  async validatorAccount(params: QueryValidatorAccountRequest): Promise<QueryValidatorAccountResponseSDKType> {
    const endpoint = `evmos/evm/v1/validator_account/${params.consAddress}`;
    return await this.req.get<QueryValidatorAccountResponseSDKType>(endpoint);
  }
  /* Balance queries the balance of a the EVM denomination for a single
   EthAccount. */
  async balance(params: QueryBalanceRequest): Promise<QueryBalanceResponseSDKType> {
    const endpoint = `evmos/evm/v1/balances/${params.address}`;
    return await this.req.get<QueryBalanceResponseSDKType>(endpoint);
  }
  /* Storage queries the balance of all coins for a single account. */
  async storage(params: QueryStorageRequest): Promise<QueryStorageResponseSDKType> {
    const endpoint = `evmos/evm/v1/storage/${params.address}/${params.key}`;
    return await this.req.get<QueryStorageResponseSDKType>(endpoint);
  }
  /* Code queries the balance of all coins for a single account. */
  async code(params: QueryCodeRequest): Promise<QueryCodeResponseSDKType> {
    const endpoint = `evmos/evm/v1/codes/${params.address}`;
    return await this.req.get<QueryCodeResponseSDKType>(endpoint);
  }
  /* Params queries the parameters of x/evm module. */
  async params(_params: QueryParamsRequest = {}): Promise<QueryParamsResponseSDKType> {
    const endpoint = `evmos/evm/v1/params`;
    return await this.req.get<QueryParamsResponseSDKType>(endpoint);
  }
  /* EthCall implements the `eth_call` rpc api */
  async ethCall(params: EthCallRequest): Promise<MsgEthereumTxResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.args !== "undefined") {
      options.params.args = params.args;
    }
    if (typeof params?.gasCap !== "undefined") {
      options.params.gas_cap = params.gasCap;
    }
    if (typeof params?.proposerAddress !== "undefined") {
      options.params.proposer_address = params.proposerAddress;
    }
    if (typeof params?.chainId !== "undefined") {
      options.params.chain_id = params.chainId;
    }
    const endpoint = `evmos/evm/v1/eth_call`;
    return await this.req.get<MsgEthereumTxResponseSDKType>(endpoint, options);
  }
  /* EstimateGas implements the `eth_estimateGas` rpc api */
  async estimateGas(params: EthCallRequest): Promise<EstimateGasResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.args !== "undefined") {
      options.params.args = params.args;
    }
    if (typeof params?.gasCap !== "undefined") {
      options.params.gas_cap = params.gasCap;
    }
    if (typeof params?.proposerAddress !== "undefined") {
      options.params.proposer_address = params.proposerAddress;
    }
    if (typeof params?.chainId !== "undefined") {
      options.params.chain_id = params.chainId;
    }
    const endpoint = `evmos/evm/v1/estimate_gas`;
    return await this.req.get<EstimateGasResponseSDKType>(endpoint, options);
  }
  /* TraceTx implements the `debug_traceTransaction` rpc api */
  async traceTx(params: QueryTraceTxRequest): Promise<QueryTraceTxResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.msg !== "undefined") {
      options.params.msg = params.msg;
    }
    if (typeof params?.traceConfig !== "undefined") {
      options.params.trace_config = params.traceConfig;
    }
    if (typeof params?.predecessors !== "undefined") {
      options.params.predecessors = params.predecessors;
    }
    if (typeof params?.blockNumber !== "undefined") {
      options.params.block_number = params.blockNumber;
    }
    if (typeof params?.blockHash !== "undefined") {
      options.params.block_hash = params.blockHash;
    }
    if (typeof params?.blockTime !== "undefined") {
      options.params.block_time = params.blockTime;
    }
    if (typeof params?.proposerAddress !== "undefined") {
      options.params.proposer_address = params.proposerAddress;
    }
    if (typeof params?.chainId !== "undefined") {
      options.params.chain_id = params.chainId;
    }
    if (typeof params?.blockMaxGas !== "undefined") {
      options.params.block_max_gas = params.blockMaxGas;
    }
    const endpoint = `evmos/evm/v1/trace_tx`;
    return await this.req.get<QueryTraceTxResponseSDKType>(endpoint, options);
  }
  /* TraceBlock implements the `debug_traceBlockByNumber` and `debug_traceBlockByHash` rpc api */
  async traceBlock(params: QueryTraceBlockRequest): Promise<QueryTraceBlockResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.txs !== "undefined") {
      options.params.txs = params.txs;
    }
    if (typeof params?.traceConfig !== "undefined") {
      options.params.trace_config = params.traceConfig;
    }
    if (typeof params?.blockNumber !== "undefined") {
      options.params.block_number = params.blockNumber;
    }
    if (typeof params?.blockHash !== "undefined") {
      options.params.block_hash = params.blockHash;
    }
    if (typeof params?.blockTime !== "undefined") {
      options.params.block_time = params.blockTime;
    }
    if (typeof params?.proposerAddress !== "undefined") {
      options.params.proposer_address = params.proposerAddress;
    }
    if (typeof params?.chainId !== "undefined") {
      options.params.chain_id = params.chainId;
    }
    if (typeof params?.blockMaxGas !== "undefined") {
      options.params.block_max_gas = params.blockMaxGas;
    }
    const endpoint = `evmos/evm/v1/trace_block`;
    return await this.req.get<QueryTraceBlockResponseSDKType>(endpoint, options);
  }
  /* BaseFee queries the base fee of the parent block of the current block,
   it's similar to feemarket module's method, but also checks london hardfork status. */
  async baseFee(_params: QueryBaseFeeRequest = {}): Promise<QueryBaseFeeResponseSDKType> {
    const endpoint = `evmos/evm/v1/base_fee`;
    return await this.req.get<QueryBaseFeeResponseSDKType>(endpoint);
  }
}