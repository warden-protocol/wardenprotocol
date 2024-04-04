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
import * as _98 from "./warden/v1beta2/wallet.js";
import * as _142 from "./intent/tx.amino.js";
import * as _143 from "./warden/v1beta2/tx.amino.js";
import * as _144 from "./intent/tx.registry.js";
import * as _145 from "./warden/v1beta2/tx.registry.js";
import * as _146 from "./intent/query.rpc.Query.js";
import * as _147 from "./warden/v1beta2/query.rpc.Query.js";
import * as _148 from "./intent/tx.rpc.msg.js";
import * as _149 from "./warden/v1beta2/tx.rpc.msg.js";
import * as _152 from "./rpc.query.js";
import * as _153 from "./rpc.tx.js";
export namespace warden {
  export const intent = {
    ..._83,
    ..._84,
    ..._85,
    ..._86,
    ..._87,
    ..._88,
    ..._142,
    ..._144,
    ..._146,
    ..._148
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
      ..._98,
      ..._143,
      ..._145,
      ..._147,
      ..._149
    };
  }
  export const ClientFactory = {
    ..._152,
    ..._153
  };
}