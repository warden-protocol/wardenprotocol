//@ts-nocheck
import * as _87 from "./marketmap/module/v1/module.js";
import * as _88 from "./marketmap/v1/genesis.js";
import * as _89 from "./marketmap/v1/market.js";
import * as _90 from "./marketmap/v1/params.js";
import * as _91 from "./marketmap/v1/query.js";
import * as _92 from "./marketmap/v1/tx.js";
import * as _93 from "./oracle/module/v1/module.js";
import * as _94 from "./oracle/v1/genesis.js";
import * as _95 from "./oracle/v1/query.js";
import * as _96 from "./oracle/v1/tx.js";
import * as _97 from "./types/v1/currency_pair.js";
import * as _202 from "./marketmap/v1/tx.amino.js";
import * as _203 from "./oracle/v1/tx.amino.js";
import * as _204 from "./marketmap/v1/tx.registry.js";
import * as _205 from "./oracle/v1/tx.registry.js";
import * as _206 from "./marketmap/v1/query.lcd.js";
import * as _207 from "./oracle/v1/query.lcd.js";
import * as _208 from "./marketmap/v1/query.rpc.Query.js";
import * as _209 from "./oracle/v1/query.rpc.Query.js";
import * as _210 from "./marketmap/v1/tx.rpc.msg.js";
import * as _211 from "./oracle/v1/tx.rpc.msg.js";
import * as _233 from "./lcd.js";
import * as _234 from "./rpc.query.js";
import * as _235 from "./rpc.tx.js";
export namespace slinky {
  export namespace marketmap {
    export namespace module {
      export const v1 = {
        ..._87
      };
    }
    export const v1 = {
      ..._88,
      ..._89,
      ..._90,
      ..._91,
      ..._92,
      ..._202,
      ..._204,
      ..._206,
      ..._208,
      ..._210
    };
  }
  export namespace oracle {
    export namespace module {
      export const v1 = {
        ..._93
      };
    }
    export const v1 = {
      ..._94,
      ..._95,
      ..._96,
      ..._203,
      ..._205,
      ..._207,
      ..._209,
      ..._211
    };
  }
  export namespace types {
    export const v1 = {
      ..._97
    };
  }
  export const ClientFactory = {
    ..._233,
    ..._234,
    ..._235
  };
}