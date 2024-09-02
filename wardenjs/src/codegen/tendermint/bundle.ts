//@ts-nocheck
import * as _83 from "./abci/types.js";
import * as _84 from "./crypto/keys.js";
import * as _85 from "./crypto/proof.js";
import * as _86 from "./libs/bits/types.js";
import * as _87 from "./p2p/types.js";
import * as _88 from "./types/block.js";
import * as _89 from "./types/evidence.js";
import * as _90 from "./types/params.js";
import * as _91 from "./types/types.js";
import * as _92 from "./types/validator.js";
import * as _93 from "./version/types.js";
export namespace tendermint {
  export const abci = {
    ..._83
  };
  export const crypto = {
    ..._84,
    ..._85
  };
  export namespace libs {
    export const bits = {
      ..._86
    };
  }
  export const p2p = {
    ..._87
  };
  export const types = {
    ..._88,
    ..._89,
    ..._90,
    ..._91,
    ..._92
  };
  export const version = {
    ..._93
  };
}