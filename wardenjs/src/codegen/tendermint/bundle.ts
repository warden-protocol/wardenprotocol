//@ts-nocheck
import * as _82 from "./abci/types.js";
import * as _83 from "./crypto/keys.js";
import * as _84 from "./crypto/proof.js";
import * as _85 from "./libs/bits/types.js";
import * as _86 from "./p2p/types.js";
import * as _87 from "./types/block.js";
import * as _88 from "./types/evidence.js";
import * as _89 from "./types/params.js";
import * as _90 from "./types/types.js";
import * as _91 from "./types/validator.js";
import * as _92 from "./version/types.js";
export namespace tendermint {
  export const abci = {
    ..._82
  };
  export const crypto = {
    ..._83,
    ..._84
  };
  export namespace libs {
    export const bits = {
      ..._85
    };
  }
  export const p2p = {
    ..._86
  };
  export const types = {
    ..._87,
    ..._88,
    ..._89,
    ..._90,
    ..._91
  };
  export const version = {
    ..._92
  };
}