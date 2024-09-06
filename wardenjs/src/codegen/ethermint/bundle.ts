//@ts-nocheck
import * as _66 from "./crypto/v1/ethsecp256k1/keys.js";
import * as _67 from "./evm/v1/events.js";
import * as _68 from "./evm/v1/evm.js";
import * as _69 from "./evm/v1/genesis.js";
import * as _70 from "./evm/v1/query.js";
import * as _71 from "./evm/v1/tx.js";
import * as _72 from "./feemarket/v1/events.js";
import * as _73 from "./feemarket/v1/feemarket.js";
import * as _74 from "./feemarket/v1/genesis.js";
import * as _75 from "./feemarket/v1/query.js";
import * as _76 from "./feemarket/v1/tx.js";
import * as _77 from "./types/v1/dynamic_fee.js";
import * as _78 from "./types/v1/indexer.js";
import * as _79 from "./types/v1/web3.js";
import * as _190 from "./evm/v1/tx.amino.js";
import * as _191 from "./feemarket/v1/tx.amino.js";
import * as _192 from "./evm/v1/tx.registry.js";
import * as _193 from "./feemarket/v1/tx.registry.js";
import * as _194 from "./evm/v1/query.lcd.js";
import * as _195 from "./feemarket/v1/query.lcd.js";
import * as _196 from "./evm/v1/query.rpc.Query.js";
import * as _197 from "./feemarket/v1/query.rpc.Query.js";
import * as _198 from "./evm/v1/tx.rpc.msg.js";
import * as _199 from "./feemarket/v1/tx.rpc.msg.js";
import * as _228 from "./lcd.js";
import * as _229 from "./rpc.query.js";
import * as _230 from "./rpc.tx.js";
export namespace ethermint {
  export namespace crypto {
    export namespace v1 {
      export const ethsecp256k1 = {
        ..._66
      };
    }
  }
  export namespace evm {
    export const v1 = {
      ..._67,
      ..._68,
      ..._69,
      ..._70,
      ..._71,
      ..._190,
      ..._192,
      ..._194,
      ..._196,
      ..._198
    };
  }
  export namespace feemarket {
    export const v1 = {
      ..._72,
      ..._73,
      ..._74,
      ..._75,
      ..._76,
      ..._191,
      ..._193,
      ..._195,
      ..._197,
      ..._199
    };
  }
  export namespace types {
    export const v1 = {
      ..._77,
      ..._78,
      ..._79
    };
  }
  export const ClientFactory = {
    ..._228,
    ..._229,
    ..._230
  };
}