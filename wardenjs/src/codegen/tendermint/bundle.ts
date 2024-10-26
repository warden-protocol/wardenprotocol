//@ts-nocheck
import * as _104 from "./abci/types.js";
import * as _105 from "./crypto/keys.js";
import * as _106 from "./crypto/proof.js";
import * as _107 from "./libs/bits/types.js";
import * as _108 from "./p2p/types.js";
import * as _109 from "./types/block.js";
import * as _110 from "./types/evidence.js";
import * as _111 from "./types/params.js";
import * as _112 from "./types/types.js";
import * as _113 from "./types/validator.js";
import * as _114 from "./version/types.js";
export namespace tendermint {
  export const abci = {
    ..._104
  };
  export const crypto = {
    ..._105,
    ..._106
  };
  export namespace libs {
    export const bits = {
      ..._107
    };
  }
  export const p2p = {
    ..._108
  };
  export const types = {
    ..._109,
    ..._110,
    ..._111,
    ..._112,
    ..._113
  };
  export const version = {
    ..._114
  };
}