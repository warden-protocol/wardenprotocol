//@ts-nocheck
import * as _98 from "./abci/types.js";
import * as _99 from "./crypto/keys.js";
import * as _100 from "./crypto/proof.js";
import * as _101 from "./libs/bits/types.js";
import * as _102 from "./p2p/types.js";
import * as _103 from "./types/block.js";
import * as _104 from "./types/evidence.js";
import * as _105 from "./types/params.js";
import * as _106 from "./types/types.js";
import * as _107 from "./types/validator.js";
import * as _108 from "./version/types.js";
export namespace tendermint {
  export const abci = {
    ..._98
  };
  export const crypto = {
    ..._99,
    ..._100
  };
  export namespace libs {
    export const bits = {
      ..._101
    };
  }
  export const p2p = {
    ..._102
  };
  export const types = {
    ..._103,
    ..._104,
    ..._105,
    ..._106,
    ..._107
  };
  export const version = {
    ..._108
  };
}