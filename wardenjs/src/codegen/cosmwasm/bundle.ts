//@ts-nocheck
import * as _65 from "./wasm/v1/authz.js";
import * as _66 from "./wasm/v1/genesis.js";
import * as _67 from "./wasm/v1/ibc.js";
import * as _68 from "./wasm/v1/proposal.js";
import * as _69 from "./wasm/v1/query.js";
import * as _70 from "./wasm/v1/tx.js";
import * as _71 from "./wasm/v1/types.js";
import * as _198 from "./wasm/v1/tx.amino.js";
import * as _199 from "./wasm/v1/tx.registry.js";
import * as _200 from "./wasm/v1/query.lcd.js";
import * as _201 from "./wasm/v1/query.rpc.Query.js";
import * as _202 from "./wasm/v1/tx.rpc.msg.js";
import * as _241 from "./lcd.js";
import * as _242 from "./rpc.query.js";
import * as _243 from "./rpc.tx.js";
export namespace cosmwasm {
  export namespace wasm {
    export const v1 = {
      ..._65,
      ..._66,
      ..._67,
      ..._68,
      ..._69,
      ..._70,
      ..._71,
      ..._198,
      ..._199,
      ..._200,
      ..._201,
      ..._202
    };
  }
  export const ClientFactory = {
    ..._241,
    ..._242,
    ..._243
  };
}