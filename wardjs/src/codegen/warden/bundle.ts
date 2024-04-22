//@ts-nocheck
import * as _83 from "./intent/action";
import * as _84 from "./intent/genesis";
import * as _85 from "./intent/intent";
import * as _86 from "./intent/params";
import * as _87 from "./intent/query";
import * as _88 from "./intent/tx";
import * as _89 from "./warden/module/module";
import * as _90 from "./warden/v1beta2/genesis";
import * as _91 from "./warden/v1beta2/key";
import * as _92 from "./warden/v1beta2/keychain";
import * as _93 from "./warden/v1beta2/params";
import * as _94 from "./warden/v1beta2/query";
import * as _95 from "./warden/v1beta2/signature";
import * as _96 from "./warden/v1beta2/space";
import * as _97 from "./warden/v1beta2/tx";
import * as _154 from "./intent/tx.amino";
import * as _155 from "./warden/v1beta2/tx.amino";
import * as _156 from "./intent/tx.registry";
import * as _157 from "./warden/v1beta2/tx.registry";
import * as _158 from "./intent/query.lcd";
import * as _159 from "./warden/v1beta2/query.lcd";
import * as _160 from "./intent/query.rpc.Query";
import * as _161 from "./warden/v1beta2/query.rpc.Query";
import * as _162 from "./intent/tx.rpc.msg";
import * as _163 from "./warden/v1beta2/tx.rpc.msg";
import * as _167 from "./lcd";
import * as _168 from "./rpc.query";
import * as _169 from "./rpc.tx";
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