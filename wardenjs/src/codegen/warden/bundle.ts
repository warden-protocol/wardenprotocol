//@ts-nocheck
import * as _95 from "./act/module/module.js";
import * as _96 from "./act/v1beta1/action.js";
import * as _97 from "./act/v1beta1/events.js";
import * as _98 from "./act/v1beta1/genesis.js";
import * as _99 from "./act/v1beta1/params.js";
import * as _100 from "./act/v1beta1/query.js";
import * as _101 from "./act/v1beta1/rule.js";
import * as _102 from "./act/v1beta1/tx.js";
import * as _103 from "./gmp/genesis.js";
import * as _104 from "./gmp/gmp.js";
import * as _105 from "./gmp/query.js";
import * as _106 from "./gmp/tx.js";
import * as _107 from "./warden/module/module.js";
import * as _108 from "./warden/v1beta2/events.js";
import * as _109 from "./warden/v1beta2/genesis.js";
import * as _110 from "./warden/v1beta2/key.js";
import * as _111 from "./warden/v1beta2/keychain.js";
import * as _112 from "./warden/v1beta2/params.js";
import * as _113 from "./warden/v1beta2/query.js";
import * as _114 from "./warden/v1beta2/signature.js";
import * as _115 from "./warden/v1beta2/space.js";
import * as _116 from "./warden/v1beta2/tx.js";
import * as _185 from "./act/v1beta1/tx.amino.js";
import * as _186 from "./gmp/tx.amino.js";
import * as _187 from "./warden/v1beta2/tx.amino.js";
import * as _188 from "./act/v1beta1/tx.registry.js";
import * as _189 from "./gmp/tx.registry.js";
import * as _190 from "./warden/v1beta2/tx.registry.js";
import * as _191 from "./act/v1beta1/query.lcd.js";
import * as _192 from "./gmp/query.lcd.js";
import * as _193 from "./warden/v1beta2/query.lcd.js";
import * as _194 from "./act/v1beta1/query.rpc.Query.js";
import * as _195 from "./gmp/query.rpc.Query.js";
import * as _196 from "./warden/v1beta2/query.rpc.Query.js";
import * as _197 from "./act/v1beta1/tx.rpc.msg.js";
import * as _198 from "./gmp/tx.rpc.msg.js";
import * as _199 from "./warden/v1beta2/tx.rpc.msg.js";
import * as _206 from "./lcd.js";
import * as _207 from "./rpc.query.js";
import * as _208 from "./rpc.tx.js";
export namespace warden {
  export namespace act {
    export const module = {
      ..._95
    };
    export const v1beta1 = {
      ..._96,
      ..._97,
      ..._98,
      ..._99,
      ..._100,
      ..._101,
      ..._102,
      ..._185,
      ..._188,
      ..._191,
      ..._194,
      ..._197
    };
  }
  export const gmp = {
    ..._103,
    ..._104,
    ..._105,
    ..._106,
    ..._186,
    ..._189,
    ..._192,
    ..._195,
    ..._198
  };
  export namespace warden {
    export const module = {
      ..._107
    };
    export const v1beta2 = {
      ..._108,
      ..._109,
      ..._110,
      ..._111,
      ..._112,
      ..._113,
      ..._114,
      ..._115,
      ..._116,
      ..._187,
      ..._190,
      ..._193,
      ..._196,
      ..._199
    };
  }
  export const ClientFactory = {
    ..._206,
    ..._207,
    ..._208
  };
}