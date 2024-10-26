//@ts-nocheck
import * as _93 from "./marketmap/module/v1/module.js";
import * as _94 from "./marketmap/v1/genesis.js";
import * as _95 from "./marketmap/v1/market.js";
import * as _96 from "./marketmap/v1/params.js";
import * as _97 from "./marketmap/v1/query.js";
import * as _98 from "./marketmap/v1/tx.js";
import * as _99 from "./oracle/module/v1/module.js";
import * as _100 from "./oracle/v1/genesis.js";
import * as _101 from "./oracle/v1/query.js";
import * as _102 from "./oracle/v1/tx.js";
import * as _103 from "./types/v1/currency_pair.js";
import * as _213 from "./marketmap/v1/tx.amino.js";
import * as _214 from "./oracle/v1/tx.amino.js";
import * as _215 from "./marketmap/v1/tx.registry.js";
import * as _216 from "./oracle/v1/tx.registry.js";
import * as _217 from "./marketmap/v1/query.lcd.js";
import * as _218 from "./oracle/v1/query.lcd.js";
import * as _219 from "./marketmap/v1/query.rpc.Query.js";
import * as _220 from "./oracle/v1/query.rpc.Query.js";
import * as _221 from "./marketmap/v1/tx.rpc.msg.js";
import * as _222 from "./oracle/v1/tx.rpc.msg.js";
import * as _247 from "./lcd.js";
import * as _248 from "./rpc.query.js";
import * as _249 from "./rpc.tx.js";
export namespace slinky {
  export namespace marketmap {
    export namespace module {
      export const v1 = {
        ..._93
      };
    }
    export const v1 = {
      ..._94,
      ..._95,
      ..._96,
      ..._97,
      ..._98,
      ..._213,
      ..._215,
      ..._217,
      ..._219,
      ..._221
    };
  }
  export namespace oracle {
    export namespace module {
      export const v1 = {
        ..._99
      };
    }
    export const v1 = {
      ..._100,
      ..._101,
      ..._102,
      ..._214,
      ..._216,
      ..._218,
      ..._220,
      ..._222
    };
  }
  export namespace types {
    export const v1 = {
      ..._103
    };
  }
  export const ClientFactory = {
    ..._247,
    ..._248,
    ..._249
  };
}