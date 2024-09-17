//@ts-nocheck
import * as _86 from "./marketmap/module/v1/module.js";
import * as _87 from "./marketmap/v1/genesis.js";
import * as _88 from "./marketmap/v1/market.js";
import * as _89 from "./marketmap/v1/params.js";
import * as _90 from "./marketmap/v1/query.js";
import * as _91 from "./marketmap/v1/tx.js";
import * as _92 from "./oracle/module/v1/module.js";
import * as _93 from "./oracle/v1/genesis.js";
import * as _94 from "./oracle/v1/query.js";
import * as _95 from "./oracle/v1/tx.js";
import * as _96 from "./types/v1/currency_pair.js";
import * as _201 from "./marketmap/v1/tx.amino.js";
import * as _202 from "./oracle/v1/tx.amino.js";
import * as _203 from "./marketmap/v1/tx.registry.js";
import * as _204 from "./oracle/v1/tx.registry.js";
import * as _205 from "./marketmap/v1/query.lcd.js";
import * as _206 from "./oracle/v1/query.lcd.js";
import * as _207 from "./marketmap/v1/query.rpc.Query.js";
import * as _208 from "./oracle/v1/query.rpc.Query.js";
import * as _209 from "./marketmap/v1/tx.rpc.msg.js";
import * as _210 from "./oracle/v1/tx.rpc.msg.js";
import * as _232 from "./lcd.js";
import * as _233 from "./rpc.query.js";
import * as _234 from "./rpc.tx.js";
export namespace slinky {
  export namespace marketmap {
    export namespace module {
      export const v1 = {
        ..._86
      };
    }
    export const v1 = {
      ..._87,
      ..._88,
      ..._89,
      ..._90,
      ..._91,
      ..._201,
      ..._203,
      ..._205,
      ..._207,
      ..._209
    };
  }
  export namespace oracle {
    export namespace module {
      export const v1 = {
        ..._92
      };
    }
    export const v1 = {
      ..._93,
      ..._94,
      ..._95,
      ..._202,
      ..._204,
      ..._206,
      ..._208,
      ..._210
    };
  }
  export namespace types {
    export const v1 = {
      ..._96
    };
  }
  export const ClientFactory = {
    ..._232,
    ..._233,
    ..._234
  };
}