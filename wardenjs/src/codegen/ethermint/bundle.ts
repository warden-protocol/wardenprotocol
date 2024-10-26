//@ts-nocheck
import * as _72 from "./crypto/v1/ethsecp256k1/keys.js";
import * as _73 from "./evm/v1/events.js";
import * as _74 from "./evm/v1/evm.js";
import * as _75 from "./evm/v1/genesis.js";
import * as _76 from "./evm/v1/query.js";
import * as _77 from "./evm/v1/tx.js";
import * as _78 from "./feemarket/v1/events.js";
import * as _79 from "./feemarket/v1/feemarket.js";
import * as _80 from "./feemarket/v1/genesis.js";
import * as _81 from "./feemarket/v1/query.js";
import * as _82 from "./feemarket/v1/tx.js";
import * as _83 from "./types/v1/account.js";
import * as _84 from "./types/v1/dynamic_fee.js";
import * as _85 from "./types/v1/indexer.js";
import * as _86 from "./types/v1/web3.js";
import * as _203 from "./evm/v1/tx.amino.js";
import * as _204 from "./feemarket/v1/tx.amino.js";
import * as _205 from "./evm/v1/tx.registry.js";
import * as _206 from "./feemarket/v1/tx.registry.js";
import * as _207 from "./evm/v1/query.lcd.js";
import * as _208 from "./feemarket/v1/query.lcd.js";
import * as _209 from "./evm/v1/query.rpc.Query.js";
import * as _210 from "./feemarket/v1/query.rpc.Query.js";
import * as _211 from "./evm/v1/tx.rpc.msg.js";
import * as _212 from "./feemarket/v1/tx.rpc.msg.js";
import * as _244 from "./lcd.js";
import * as _245 from "./rpc.query.js";
import * as _246 from "./rpc.tx.js";
export namespace ethermint {
  export namespace crypto {
    export namespace v1 {
      export const ethsecp256k1 = {
        ..._72
      };
    }
  }
  export namespace evm {
    export const v1 = {
      ..._73,
      ..._74,
      ..._75,
      ..._76,
      ..._77,
      ..._203,
      ..._205,
      ..._207,
      ..._209,
      ..._211
    };
  }
  export namespace feemarket {
    export const v1 = {
      ..._78,
      ..._79,
      ..._80,
      ..._81,
      ..._82,
      ..._204,
      ..._206,
      ..._208,
      ..._210,
      ..._212
    };
  }
  export namespace types {
    export const v1 = {
      ..._83,
      ..._84,
      ..._85,
      ..._86
    };
  }
  export const ClientFactory = {
    ..._244,
    ..._245,
    ..._246
  };
}