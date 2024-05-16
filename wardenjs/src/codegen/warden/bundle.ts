//@ts-nocheck
import * as _83 from "./intent/action.js";
import * as _84 from "./intent/genesis.js";
import * as _85 from "./intent/intent.js";
import * as _86 from "./intent/params.js";
import * as _87 from "./intent/query.js";
import * as _88 from "./intent/tx.js";
import * as _89 from "./warden/module/module.js";
import * as _90 from "./warden/v1beta2/genesis.js";
import * as _91 from "./warden/v1beta2/key.js";
import * as _92 from "./warden/v1beta2/keychain.js";
import * as _93 from "./warden/v1beta2/params.js";
import * as _94 from "./warden/v1beta2/query.js";
import * as _95 from "./warden/v1beta2/signature.js";
import * as _96 from "./warden/v1beta2/space.js";
import * as _97 from "./warden/v1beta2/tx.js";
import * as _154 from "./intent/tx.amino.js";
import * as _155 from "./warden/v1beta2/tx.amino.js";
import * as _156 from "./intent/tx.registry.js";
import * as _157 from "./warden/v1beta2/tx.registry.js";
import * as _158 from "./intent/query.lcd.js";
import * as _159 from "./warden/v1beta2/query.lcd.js";
import * as _160 from "./intent/query.rpc.Query.js";
import * as _161 from "./warden/v1beta2/query.rpc.Query.js";
import * as _162 from "./intent/tx.rpc.msg.js";
import * as _163 from "./warden/v1beta2/tx.rpc.msg.js";
import * as _167 from "./lcd.js";
import * as _168 from "./rpc.query.js";
import * as _169 from "./rpc.tx.js";
export namespace warden {
  export const intent = {
    ..._83,
    ..._84,
    ..._85,
    ..._86,
    ..._87,
    ..._88,
    ..._154,
    ..._156,
    ..._158,
    ..._160,
    ..._162
  };
  export namespace warden {
    export const module = {
      ..._89
    };
    export const v1beta2 = {
      ..._90,
      ..._91,
      ..._92,
      ..._93,
      ..._94,
      ..._95,
      ..._96,
      ..._97,
      ..._155,
      ..._157,
      ..._159,
      ..._161,
      ..._163
    };
  }
  export const ClientFactory = {
    ..._167,
    ..._168,
    ..._169
  };
}