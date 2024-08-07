//@ts-nocheck
import * as _71 from "./marketmap/module/v1/module.js";
import * as _72 from "./marketmap/v1/genesis.js";
import * as _73 from "./marketmap/v1/market.js";
import * as _74 from "./marketmap/v1/params.js";
import * as _75 from "./marketmap/v1/query.js";
import * as _76 from "./marketmap/v1/tx.js";
import * as _77 from "./oracle/module/v1/module.js";
import * as _78 from "./oracle/v1/genesis.js";
import * as _79 from "./oracle/v1/query.js";
import * as _80 from "./oracle/v1/tx.js";
import * as _81 from "./types/v1/currency_pair.js";
import * as _175 from "./marketmap/v1/tx.amino.js";
import * as _176 from "./oracle/v1/tx.amino.js";
import * as _177 from "./marketmap/v1/tx.registry.js";
import * as _178 from "./oracle/v1/tx.registry.js";
import * as _179 from "./marketmap/v1/query.lcd.js";
import * as _180 from "./oracle/v1/query.lcd.js";
import * as _181 from "./marketmap/v1/query.rpc.Query.js";
import * as _182 from "./oracle/v1/query.rpc.Query.js";
import * as _183 from "./marketmap/v1/tx.rpc.msg.js";
import * as _184 from "./oracle/v1/tx.rpc.msg.js";
import * as _203 from "./lcd.js";
import * as _204 from "./rpc.query.js";
import * as _205 from "./rpc.tx.js";
export namespace slinky {
  export namespace marketmap {
    export namespace module {
      export const v1 = {
        ..._71
      };
    }
    export const v1 = {
      ..._72,
      ..._73,
      ..._74,
      ..._75,
      ..._76,
      ..._175,
      ..._177,
      ..._179,
      ..._181,
      ..._183
    };
  }
  export namespace oracle {
    export namespace module {
      export const v1 = {
        ..._77
      };
    }
    export const v1 = {
      ..._78,
      ..._79,
      ..._80,
      ..._176,
      ..._178,
      ..._180,
      ..._182,
      ..._184
    };
  }
  export namespace types {
    export const v1 = {
      ..._81
    };
  }
  export const ClientFactory = {
    ..._203,
    ..._204,
    ..._205
  };
}