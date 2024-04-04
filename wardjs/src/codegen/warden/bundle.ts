//@ts-nocheck
import * as _81 from "./intent/action.js";
import * as _82 from "./intent/genesis.js";
import * as _83 from "./intent/intent.js";
import * as _84 from "./intent/params.js";
import * as _85 from "./intent/query.js";
import * as _86 from "./intent/tx.js";
import * as _87 from "./warden/module/module.js";
import * as _88 from "./warden/v1beta1/genesis.js";
import * as _89 from "./warden/v1beta1/key.js";
import * as _90 from "./warden/v1beta1/keychain.js";
import * as _91 from "./warden/v1beta1/params.js";
import * as _92 from "./warden/v1beta1/query.js";
import * as _93 from "./warden/v1beta1/signature.js";
import * as _94 from "./warden/v1beta1/space.js";
import * as _95 from "./warden/v1beta1/tx.js";
import * as _96 from "./warden/v1beta1/wallet.js";
import * as _97 from "./warden/v1beta2/genesis.js";
import * as _98 from "./warden/v1beta2/key.js";
import * as _99 from "./warden/v1beta2/keychain.js";
import * as _100 from "./warden/v1beta2/params.js";
import * as _101 from "./warden/v1beta2/query.js";
import * as _102 from "./warden/v1beta2/signature.js";
import * as _103 from "./warden/v1beta2/space.js";
import * as _104 from "./warden/v1beta2/tx.js";
import * as _105 from "./warden/v1beta2/wallet.js";
import * as _149 from "./intent/tx.amino.js";
import * as _150 from "./warden/v1beta1/tx.amino.js";
import * as _151 from "./warden/v1beta2/tx.amino.js";
import * as _152 from "./intent/tx.registry.js";
import * as _153 from "./warden/v1beta1/tx.registry.js";
import * as _154 from "./warden/v1beta2/tx.registry.js";
import * as _155 from "./intent/query.rpc.Query.js";
import * as _156 from "./warden/v1beta1/query.rpc.Query.js";
import * as _157 from "./warden/v1beta2/query.rpc.Query.js";
import * as _158 from "./intent/tx.rpc.msg.js";
import * as _159 from "./warden/v1beta1/tx.rpc.msg.js";
import * as _160 from "./warden/v1beta2/tx.rpc.msg.js";
import * as _163 from "./rpc.query.js";
import * as _164 from "./rpc.tx.js";
export namespace warden {
  export const intent = {
    ..._81,
    ..._82,
    ..._83,
    ..._84,
    ..._85,
    ..._86,
    ..._149,
    ..._152,
    ..._155,
    ..._158
  };
  export namespace warden {
    export const module = {
      ..._87
    };
    export const v1beta1 = {
      ..._88,
      ..._89,
      ..._90,
      ..._91,
      ..._92,
      ..._93,
      ..._94,
      ..._95,
      ..._96,
      ..._150,
      ..._153,
      ..._156,
      ..._159
    };
    export const v1beta2 = {
      ..._97,
      ..._98,
      ..._99,
      ..._100,
      ..._101,
      ..._102,
      ..._103,
      ..._104,
      ..._105,
      ..._151,
      ..._154,
      ..._157,
      ..._160
    };
  }
  export const ClientFactory = {
    ..._163,
    ..._164
  };
}