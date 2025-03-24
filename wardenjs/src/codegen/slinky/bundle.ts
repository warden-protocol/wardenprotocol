//@ts-nocheck
import * as _88 from "./marketmap/module/v1/module.js";
import * as _89 from "./marketmap/v1/genesis.js";
import * as _90 from "./marketmap/v1/market.js";
import * as _91 from "./marketmap/v1/params.js";
import * as _92 from "./marketmap/v1/query.js";
import * as _93 from "./marketmap/v1/tx.js";
import * as _94 from "./oracle/module/v1/module.js";
import * as _95 from "./oracle/v1/genesis.js";
import * as _96 from "./oracle/v1/query.js";
import * as _97 from "./oracle/v1/tx.js";
import * as _98 from "./types/v1/currency_pair.js";
import * as _212 from "./marketmap/v1/tx.amino.js";
import * as _213 from "./oracle/v1/tx.amino.js";
import * as _214 from "./marketmap/v1/tx.registry.js";
import * as _215 from "./oracle/v1/tx.registry.js";
import * as _216 from "./marketmap/v1/query.lcd.js";
import * as _217 from "./oracle/v1/query.lcd.js";
import * as _218 from "./marketmap/v1/query.rpc.Query.js";
import * as _219 from "./oracle/v1/query.rpc.Query.js";
import * as _220 from "./marketmap/v1/tx.rpc.msg.js";
import * as _221 from "./oracle/v1/tx.rpc.msg.js";
import * as _248 from "./lcd.js";
import * as _249 from "./rpc.query.js";
import * as _250 from "./rpc.tx.js";
export namespace slinky {
  export namespace marketmap {
    export namespace module {
      export const v1 = {
        ..._88
      };
    }
    export const v1 = {
      ..._89,
      ..._90,
      ..._91,
      ..._92,
      ..._93,
      ..._212,
      ..._214,
      ..._216,
      ..._218,
      ..._220
    };
  }
  export namespace oracle {
    export namespace module {
      export const v1 = {
        ..._94
      };
    }
    export const v1 = {
      ..._95,
      ..._96,
      ..._97,
      ..._213,
      ..._215,
      ..._217,
      ..._219,
      ..._221
    };
  }
  export namespace types {
    export const v1 = {
      ..._98
    };
  }
  export const ClientFactory = {
    ..._248,
    ..._249,
    ..._250
  };
}