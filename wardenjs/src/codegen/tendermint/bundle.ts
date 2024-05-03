//@ts-nocheck
import * as _70 from "./abci/types";
import * as _71 from "./crypto/keys";
import * as _72 from "./crypto/proof";
import * as _73 from "./libs/bits/types";
import * as _74 from "./p2p/types";
import * as _75 from "./types/block";
import * as _76 from "./types/evidence";
import * as _77 from "./types/params";
import * as _78 from "./types/types";
import * as _79 from "./types/validator";
import * as _80 from "./version/types";
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