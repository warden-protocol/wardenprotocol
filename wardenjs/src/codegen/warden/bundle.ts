//@ts-nocheck
import * as _112 from "./act/module/module.js";
import * as _113 from "./act/v1beta1/action_vote.js";
import * as _114 from "./act/v1beta1/action.js";
import * as _115 from "./act/v1beta1/events.js";
import * as _116 from "./act/v1beta1/genesis.js";
import * as _117 from "./act/v1beta1/params.js";
import * as _118 from "./act/v1beta1/query.js";
import * as _119 from "./act/v1beta1/template.js";
import * as _120 from "./act/v1beta1/tx.js";
import * as _121 from "./async/module/module.js";
import * as _122 from "./async/v1beta1/events.js";
import * as _123 from "./async/v1beta1/genesis.js";
import * as _124 from "./async/v1beta1/params.js";
import * as _125 from "./async/v1beta1/query.js";
import * as _126 from "./async/v1beta1/task.js";
import * as _127 from "./async/v1beta1/tx.js";
import * as _128 from "./async/v1beta1/ve.js";
import * as _129 from "./gmp/genesis.js";
import * as _130 from "./gmp/gmp.js";
import * as _131 from "./gmp/query.js";
import * as _132 from "./gmp/tx.js";
import * as _133 from "./vemanager/vemanager.js";
import * as _134 from "./warden/module/module.js";
import * as _135 from "./warden/v1beta3/events.js";
import * as _136 from "./warden/v1beta3/genesis.js";
import * as _137 from "./warden/v1beta3/key.js";
import * as _138 from "./warden/v1beta3/keychain.js";
import * as _139 from "./warden/v1beta3/params.js";
import * as _140 from "./warden/v1beta3/query.js";
import * as _141 from "./warden/v1beta3/signature.js";
import * as _142 from "./warden/v1beta3/space.js";
import * as _143 from "./warden/v1beta3/tx.js";
import * as _222 from "./act/v1beta1/tx.amino.js";
import * as _223 from "./async/v1beta1/tx.amino.js";
import * as _224 from "./gmp/tx.amino.js";
import * as _225 from "./warden/v1beta3/tx.amino.js";
import * as _226 from "./act/v1beta1/tx.registry.js";
import * as _227 from "./async/v1beta1/tx.registry.js";
import * as _228 from "./gmp/tx.registry.js";
import * as _229 from "./warden/v1beta3/tx.registry.js";
import * as _230 from "./act/v1beta1/query.lcd.js";
import * as _231 from "./async/v1beta1/query.lcd.js";
import * as _232 from "./gmp/query.lcd.js";
import * as _233 from "./warden/v1beta3/query.lcd.js";
import * as _234 from "./act/v1beta1/query.rpc.Query.js";
import * as _235 from "./async/v1beta1/query.rpc.Query.js";
import * as _236 from "./gmp/query.rpc.Query.js";
import * as _237 from "./warden/v1beta3/query.rpc.Query.js";
import * as _238 from "./act/v1beta1/tx.rpc.msg.js";
import * as _239 from "./async/v1beta1/tx.rpc.msg.js";
import * as _240 from "./gmp/tx.rpc.msg.js";
import * as _241 from "./warden/v1beta3/tx.rpc.msg.js";
import * as _251 from "./lcd.js";
import * as _252 from "./rpc.query.js";
import * as _253 from "./rpc.tx.js";
export namespace warden {
  export namespace act {
    export const module = {
      ..._112
    };
    export const v1beta1 = {
      ..._113,
      ..._114,
      ..._115,
      ..._116,
      ..._117,
      ..._118,
      ..._119,
      ..._120,
      ..._222,
      ..._226,
      ..._230,
      ..._234,
      ..._238
    };
  }
  export namespace async {
    export const module = {
      ..._121
    };
    export const v1beta1 = {
      ..._122,
      ..._123,
      ..._124,
      ..._125,
      ..._126,
      ..._127,
      ..._128,
      ..._223,
      ..._227,
      ..._231,
      ..._235,
      ..._239
    };
  }
  export const gmp = {
    ..._129,
    ..._130,
    ..._131,
    ..._132,
    ..._224,
    ..._228,
    ..._232,
    ..._236,
    ..._240
  };
  export const vemanager = {
    ..._133
  };
  export namespace warden {
    export const module = {
      ..._134
    };
    export const v1beta3 = {
      ..._135,
      ..._136,
      ..._137,
      ..._138,
      ..._139,
      ..._140,
      ..._141,
      ..._142,
      ..._143,
      ..._225,
      ..._229,
      ..._233,
      ..._237,
      ..._241
    };
  }
  export const ClientFactory = {
    ..._251,
    ..._252,
    ..._253
  };
}