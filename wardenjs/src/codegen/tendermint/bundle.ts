//@ts-nocheck
import * as _99 from "./abci/types.js";
import * as _100 from "./crypto/keys.js";
import * as _101 from "./crypto/proof.js";
import * as _102 from "./libs/bits/types.js";
import * as _103 from "./p2p/types.js";
import * as _104 from "./types/block.js";
import * as _105 from "./types/evidence.js";
import * as _106 from "./types/params.js";
import * as _107 from "./types/types.js";
import * as _108 from "./types/validator.js";
import * as _109 from "./version/types.js";
export namespace tendermint {
  export const abci = {
    ..._99
  };
  export const crypto = {
    ..._100,
    ..._101
  };
  export namespace libs {
    export const bits = {
      ..._102
    };
  }
  export const p2p = {
    ..._103
  };
  export const types = {
    ..._104,
    ..._105,
    ..._106,
    ..._107,
    ..._108
  };
  export const version = {
    ..._109
  };
}