//@ts-nocheck
import * as _117 from "./act/module/module.js";
import * as _118 from "./act/v1beta1/action_vote.js";
import * as _119 from "./act/v1beta1/action.js";
import * as _120 from "./act/v1beta1/events.js";
import * as _121 from "./act/v1beta1/genesis.js";
import * as _122 from "./act/v1beta1/params.js";
import * as _123 from "./act/v1beta1/query.js";
import * as _124 from "./act/v1beta1/template.js";
import * as _125 from "./act/v1beta1/tx.js";
import * as _126 from "./gmp/genesis.js";
import * as _127 from "./gmp/gmp.js";
import * as _128 from "./gmp/query.js";
import * as _129 from "./gmp/tx.js";
import * as _130 from "./warden/module/module.js";
import * as _131 from "./warden/v1beta3/events.js";
import * as _132 from "./warden/v1beta3/genesis.js";
import * as _133 from "./warden/v1beta3/key.js";
import * as _134 from "./warden/v1beta3/keychain.js";
import * as _135 from "./warden/v1beta3/params.js";
import * as _136 from "./warden/v1beta3/query.js";
import * as _137 from "./warden/v1beta3/signature.js";
import * as _138 from "./warden/v1beta3/space.js";
import * as _139 from "./warden/v1beta3/tx.js";
import * as _223 from "./act/v1beta1/tx.amino.js";
import * as _224 from "./gmp/tx.amino.js";
import * as _225 from "./warden/v1beta3/tx.amino.js";
import * as _226 from "./act/v1beta1/tx.registry.js";
import * as _227 from "./gmp/tx.registry.js";
import * as _228 from "./warden/v1beta3/tx.registry.js";
import * as _229 from "./act/v1beta1/query.lcd.js";
import * as _230 from "./gmp/query.lcd.js";
import * as _231 from "./warden/v1beta3/query.lcd.js";
import * as _232 from "./act/v1beta1/query.rpc.Query.js";
import * as _233 from "./gmp/query.rpc.Query.js";
import * as _234 from "./warden/v1beta3/query.rpc.Query.js";
import * as _235 from "./act/v1beta1/tx.rpc.msg.js";
import * as _236 from "./gmp/tx.rpc.msg.js";
import * as _237 from "./warden/v1beta3/tx.rpc.msg.js";
import * as _250 from "./lcd.js";
import * as _251 from "./rpc.query.js";
import * as _252 from "./rpc.tx.js";
export namespace warden {
  export namespace act {
    export const module = {
      ..._117
    };
    export const v1beta1 = {
      ..._118,
      ..._119,
      ..._120,
      ..._121,
      ..._122,
      ..._123,
      ..._124,
      ..._125,
      ..._223,
      ..._226,
      ..._229,
      ..._232,
      ..._235
    };
  }
  export const gmp = {
    ..._126,
    ..._127,
    ..._128,
    ..._129,
    ..._224,
    ..._227,
    ..._230,
    ..._233,
    ..._236
  };
  export namespace warden {
    export const module = {
      ..._130
    };
    export const v1beta3 = {
      ..._131,
      ..._132,
      ..._133,
      ..._134,
      ..._135,
      ..._136,
      ..._137,
      ..._138,
      ..._139,
      ..._225,
      ..._228,
      ..._231,
      ..._234,
      ..._237
    };
  }
  export const ClientFactory = {
    ..._250,
    ..._251,
    ..._252
  };
}