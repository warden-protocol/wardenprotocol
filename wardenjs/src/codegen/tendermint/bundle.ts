//@ts-nocheck
import * as _70 from "./abci/types.js";
import * as _71 from "./crypto/keys.js";
import * as _72 from "./crypto/proof.js";
import * as _73 from "./libs/bits/types.js";
import * as _74 from "./p2p/types.js";
import * as _75 from "./types/block.js";
import * as _76 from "./types/evidence.js";
import * as _77 from "./types/params.js";
import * as _78 from "./types/types.js";
import * as _79 from "./types/validator.js";
import * as _80 from "./version/types.js";
export namespace tendermint {
  export const abci = {
    ..._70
  };
  export const crypto = {
    ..._71,
    ..._72
  };
  export namespace libs {
    export const bits = {
      ..._73
    };
  }
  export const p2p = {
    ..._74
  };
  export const types = {
    ..._75,
    ..._76,
    ..._77,
    ..._78,
    ..._79
  };
  export const version = {
    ..._80
  };
}