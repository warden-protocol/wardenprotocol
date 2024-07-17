//@ts-nocheck
import * as _84 from "./act/module/module.js";
import * as _85 from "./act/v1beta1/action.js";
import * as _86 from "./act/v1beta1/events.js";
import * as _87 from "./act/v1beta1/genesis.js";
import * as _88 from "./act/v1beta1/params.js";
import * as _89 from "./act/v1beta1/query.js";
import * as _90 from "./act/v1beta1/rule.js";
import * as _91 from "./act/v1beta1/tx.js";
import * as _92 from "./gmp/genesis.js";
import * as _93 from "./gmp/gmp.js";
import * as _94 from "./gmp/query.js";
import * as _95 from "./gmp/tx.js";
import * as _96 from "./warden/module/module.js";
import * as _97 from "./warden/v1beta3/events.js";
import * as _98 from "./warden/v1beta3/genesis.js";
import * as _99 from "./warden/v1beta3/key.js";
import * as _100 from "./warden/v1beta3/keychain.js";
import * as _101 from "./warden/v1beta3/params.js";
import * as _102 from "./warden/v1beta3/query.js";
import * as _103 from "./warden/v1beta3/signature.js";
import * as _104 from "./warden/v1beta3/space.js";
import * as _105 from "./warden/v1beta3/tx.js";
import * as _164 from "./act/v1beta1/tx.amino.js";
import * as _165 from "./gmp/tx.amino.js";
import * as _166 from "./warden/v1beta3/tx.amino.js";
import * as _167 from "./act/v1beta1/tx.registry.js";
import * as _168 from "./gmp/tx.registry.js";
import * as _169 from "./warden/v1beta3/tx.registry.js";
import * as _170 from "./act/v1beta1/query.lcd.js";
import * as _171 from "./gmp/query.lcd.js";
import * as _172 from "./warden/v1beta3/query.lcd.js";
import * as _173 from "./act/v1beta1/query.rpc.Query.js";
import * as _174 from "./gmp/query.rpc.Query.js";
import * as _175 from "./warden/v1beta3/query.rpc.Query.js";
import * as _176 from "./act/v1beta1/tx.rpc.msg.js";
import * as _177 from "./gmp/tx.rpc.msg.js";
import * as _178 from "./warden/v1beta3/tx.rpc.msg.js";
import * as _182 from "./lcd.js";
import * as _183 from "./rpc.query.js";
import * as _184 from "./rpc.tx.js";
export namespace warden {
  export namespace act {
    export const module = {
      ..._84
    };
    export const v1beta1 = {
      ..._85,
      ..._86,
      ..._87,
      ..._88,
      ..._89,
      ..._90,
      ..._91,
      ..._164,
      ..._167,
      ..._170,
      ..._173,
      ..._176
    };
  }
  export const gmp = {
    ..._92,
    ..._93,
    ..._94,
    ..._95,
    ..._165,
    ..._168,
    ..._171,
    ..._174,
    ..._177
  };
  export namespace warden {
    export const module = {
      ..._96
    };
    export const v1beta3 = {
      ..._97,
      ..._98,
      ..._99,
      ..._100,
      ..._101,
      ..._102,
      ..._103,
      ..._104,
      ..._105,
      ..._166,
      ..._169,
      ..._172,
      ..._175,
      ..._178
    };
  }
  export const ClientFactory = {
    ..._182,
    ..._183,
    ..._184
  };
}