//@ts-nocheck
import * as _97 from "./abci/types.js";
import * as _98 from "./crypto/keys.js";
import * as _99 from "./crypto/proof.js";
import * as _100 from "./libs/bits/types.js";
import * as _101 from "./p2p/types.js";
import * as _102 from "./types/block.js";
import * as _103 from "./types/evidence.js";
import * as _104 from "./types/params.js";
import * as _105 from "./types/types.js";
import * as _106 from "./types/validator.js";
import * as _107 from "./version/types.js";
export namespace tendermint {
  export const abci = {
    ..._97
  };
  export const crypto = {
    ..._98,
    ..._99
  };
  export namespace libs {
    export const bits = {
      ..._100
    };
  }
  export const p2p = {
    ..._101
  };
  export const types = {
    ..._102,
    ..._103,
    ..._104,
    ..._105,
    ..._106
  };
  export const version = {
    ..._107
  };
}