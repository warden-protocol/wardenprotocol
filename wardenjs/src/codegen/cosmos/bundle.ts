//@ts-nocheck
import * as _2 from "./auth/v1beta1/auth.js";
import * as _3 from "./auth/v1beta1/genesis.js";
import * as _4 from "./auth/v1beta1/query.js";
import * as _5 from "./authz/v1beta1/authz.js";
import * as _6 from "./authz/v1beta1/event.js";
import * as _7 from "./authz/v1beta1/genesis.js";
import * as _8 from "./authz/v1beta1/query.js";
import * as _9 from "./authz/v1beta1/tx.js";
import * as _10 from "./bank/v1beta1/authz.js";
import * as _11 from "./bank/v1beta1/bank.js";
import * as _12 from "./bank/v1beta1/genesis.js";
import * as _13 from "./bank/v1beta1/query.js";
import * as _14 from "./bank/v1beta1/tx.js";
import * as _15 from "./base/abci/v1beta1/abci.js";
import * as _16 from "./base/query/v1beta1/pagination.js";
import * as _17 from "./base/reflection/v2alpha1/reflection.js";
import * as _18 from "./base/tendermint/v1beta1/query.js";
import * as _19 from "./base/v1beta1/coin.js";
import * as _20 from "./crypto/ed25519/keys.js";
import * as _21 from "./crypto/hd/v1/hd.js";
import * as _22 from "./crypto/keyring/v1/record.js";
import * as _23 from "./crypto/multisig/keys.js";
import * as _24 from "./crypto/secp256k1/keys.js";
import * as _25 from "./crypto/secp256r1/keys.js";
import * as _26 from "./distribution/v1beta1/distribution.js";
import * as _27 from "./distribution/v1beta1/genesis.js";
import * as _28 from "./distribution/v1beta1/query.js";
import * as _29 from "./distribution/v1beta1/tx.js";
import * as _30 from "./feegrant/v1beta1/feegrant.js";
import * as _31 from "./feegrant/v1beta1/genesis.js";
import * as _32 from "./feegrant/v1beta1/query.js";
import * as _33 from "./feegrant/v1beta1/tx.js";
import * as _34 from "./gov/module/v1/module.js";
import * as _35 from "./gov/v1/genesis.js";
import * as _36 from "./gov/v1/gov.js";
import * as _37 from "./gov/v1/query.js";
import * as _38 from "./gov/v1/tx.js";
import * as _39 from "./gov/v1beta1/genesis.js";
import * as _40 from "./gov/v1beta1/gov.js";
import * as _41 from "./gov/v1beta1/query.js";
import * as _42 from "./gov/v1beta1/tx.js";
import * as _43 from "./group/v1/events.js";
import * as _44 from "./group/v1/genesis.js";
import * as _45 from "./group/v1/query.js";
import * as _46 from "./group/v1/tx.js";
import * as _47 from "./group/v1/types.js";
import * as _48 from "./mint/v1beta1/genesis.js";
import * as _49 from "./mint/v1beta1/mint.js";
import * as _50 from "./mint/v1beta1/query.js";
import * as _51 from "./params/v1beta1/params.js";
import * as _52 from "./params/v1beta1/query.js";
import * as _53 from "./staking/v1beta1/authz.js";
import * as _54 from "./staking/v1beta1/genesis.js";
import * as _55 from "./staking/v1beta1/query.js";
import * as _56 from "./staking/v1beta1/staking.js";
import * as _57 from "./staking/v1beta1/tx.js";
import * as _58 from "./tx/signing/v1beta1/signing.js";
import * as _59 from "./tx/v1beta1/service.js";
import * as _60 from "./tx/v1beta1/tx.js";
import * as _61 from "./upgrade/v1beta1/query.js";
import * as _62 from "./upgrade/v1beta1/tx.js";
import * as _63 from "./upgrade/v1beta1/upgrade.js";
import * as _64 from "./vesting/v1beta1/tx.js";
import * as _65 from "./vesting/v1beta1/vesting.js";
import * as _144 from "./authz/v1beta1/tx.amino.js";
import * as _145 from "./bank/v1beta1/tx.amino.js";
import * as _146 from "./distribution/v1beta1/tx.amino.js";
import * as _147 from "./feegrant/v1beta1/tx.amino.js";
import * as _148 from "./gov/v1/tx.amino.js";
import * as _149 from "./gov/v1beta1/tx.amino.js";
import * as _150 from "./group/v1/tx.amino.js";
import * as _151 from "./staking/v1beta1/tx.amino.js";
import * as _152 from "./upgrade/v1beta1/tx.amino.js";
import * as _153 from "./vesting/v1beta1/tx.amino.js";
import * as _154 from "./authz/v1beta1/tx.registry.js";
import * as _155 from "./bank/v1beta1/tx.registry.js";
import * as _156 from "./distribution/v1beta1/tx.registry.js";
import * as _157 from "./feegrant/v1beta1/tx.registry.js";
import * as _158 from "./gov/v1/tx.registry.js";
import * as _159 from "./gov/v1beta1/tx.registry.js";
import * as _160 from "./group/v1/tx.registry.js";
import * as _161 from "./staking/v1beta1/tx.registry.js";
import * as _162 from "./upgrade/v1beta1/tx.registry.js";
import * as _163 from "./vesting/v1beta1/tx.registry.js";
import * as _164 from "./auth/v1beta1/query.lcd.js";
import * as _165 from "./authz/v1beta1/query.lcd.js";
import * as _166 from "./bank/v1beta1/query.lcd.js";
import * as _167 from "./base/tendermint/v1beta1/query.lcd.js";
import * as _168 from "./distribution/v1beta1/query.lcd.js";
import * as _169 from "./feegrant/v1beta1/query.lcd.js";
import * as _170 from "./gov/v1/query.lcd.js";
import * as _171 from "./gov/v1beta1/query.lcd.js";
import * as _172 from "./group/v1/query.lcd.js";
import * as _173 from "./mint/v1beta1/query.lcd.js";
import * as _174 from "./params/v1beta1/query.lcd.js";
import * as _175 from "./staking/v1beta1/query.lcd.js";
import * as _176 from "./tx/v1beta1/service.lcd.js";
import * as _177 from "./upgrade/v1beta1/query.lcd.js";
import * as _178 from "./auth/v1beta1/query.rpc.Query.js";
import * as _179 from "./authz/v1beta1/query.rpc.Query.js";
import * as _180 from "./bank/v1beta1/query.rpc.Query.js";
import * as _181 from "./base/tendermint/v1beta1/query.rpc.Service.js";
import * as _182 from "./distribution/v1beta1/query.rpc.Query.js";
import * as _183 from "./feegrant/v1beta1/query.rpc.Query.js";
import * as _184 from "./gov/v1/query.rpc.Query.js";
import * as _185 from "./gov/v1beta1/query.rpc.Query.js";
import * as _186 from "./group/v1/query.rpc.Query.js";
import * as _187 from "./mint/v1beta1/query.rpc.Query.js";
import * as _188 from "./params/v1beta1/query.rpc.Query.js";
import * as _189 from "./staking/v1beta1/query.rpc.Query.js";
import * as _190 from "./tx/v1beta1/service.rpc.Service.js";
import * as _191 from "./upgrade/v1beta1/query.rpc.Query.js";
import * as _192 from "./authz/v1beta1/tx.rpc.msg.js";
import * as _193 from "./bank/v1beta1/tx.rpc.msg.js";
import * as _194 from "./distribution/v1beta1/tx.rpc.msg.js";
import * as _195 from "./feegrant/v1beta1/tx.rpc.msg.js";
import * as _196 from "./gov/v1/tx.rpc.msg.js";
import * as _197 from "./gov/v1beta1/tx.rpc.msg.js";
import * as _198 from "./group/v1/tx.rpc.msg.js";
import * as _199 from "./staking/v1beta1/tx.rpc.msg.js";
import * as _200 from "./upgrade/v1beta1/tx.rpc.msg.js";
import * as _201 from "./vesting/v1beta1/tx.rpc.msg.js";
import * as _242 from "./lcd.js";
import * as _243 from "./rpc.query.js";
import * as _244 from "./rpc.tx.js";
export namespace cosmos {
  export namespace auth {
    export const v1beta1 = {
      ..._2,
      ..._3,
      ..._4,
      ..._164,
      ..._178
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._5,
      ..._6,
      ..._7,
      ..._8,
      ..._9,
      ..._144,
      ..._154,
      ..._165,
      ..._179,
      ..._192
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._10,
      ..._11,
      ..._12,
      ..._13,
      ..._14,
      ..._145,
      ..._155,
      ..._166,
      ..._180,
      ..._193
    };
  }
  export namespace base {
    export namespace abci {
      export const v1beta1 = {
        ..._15
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._16
      };
    }
    export namespace reflection {
      export const v2alpha1 = {
        ..._17
      };
    }
    export namespace tendermint {
      export const v1beta1 = {
        ..._18,
        ..._167,
        ..._181
      };
    }
    export const v1beta1 = {
      ..._19
    };
  }
  export namespace crypto {
    export const ed25519 = {
      ..._20
    };
    export namespace hd {
      export const v1 = {
        ..._21
      };
    }
    export namespace keyring {
      export const v1 = {
        ..._22
      };
    }
    export const multisig = {
      ..._23
    };
    export const secp256k1 = {
      ..._24
    };
    export const secp256r1 = {
      ..._25
    };
  }
  export namespace distribution {
    export const v1beta1 = {
      ..._26,
      ..._27,
      ..._28,
      ..._29,
      ..._146,
      ..._156,
      ..._168,
      ..._182,
      ..._194
    };
  }
  export namespace feegrant {
    export const v1beta1 = {
      ..._30,
      ..._31,
      ..._32,
      ..._33,
      ..._147,
      ..._157,
      ..._169,
      ..._183,
      ..._195
    };
  }
  export namespace gov {
    export namespace module {
      export const v1 = {
        ..._34
      };
    }
    export const v1 = {
      ..._35,
      ..._36,
      ..._37,
      ..._38,
      ..._148,
      ..._158,
      ..._170,
      ..._184,
      ..._196
    };
    export const v1beta1 = {
      ..._39,
      ..._40,
      ..._41,
      ..._42,
      ..._149,
      ..._159,
      ..._171,
      ..._185,
      ..._197
    };
  }
  export namespace group {
    export const v1 = {
      ..._43,
      ..._44,
      ..._45,
      ..._46,
      ..._47,
      ..._150,
      ..._160,
      ..._172,
      ..._186,
      ..._198
    };
  }
  export namespace mint {
    export const v1beta1 = {
      ..._48,
      ..._49,
      ..._50,
      ..._173,
      ..._187
    };
  }
  export namespace params {
    export const v1beta1 = {
      ..._51,
      ..._52,
      ..._174,
      ..._188
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._53,
      ..._54,
      ..._55,
      ..._56,
      ..._57,
      ..._151,
      ..._161,
      ..._175,
      ..._189,
      ..._199
    };
  }
  export namespace tx {
    export namespace signing {
      export const v1beta1 = {
        ..._58
      };
    }
    export const v1beta1 = {
      ..._59,
      ..._60,
      ..._176,
      ..._190
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._61,
      ..._62,
      ..._63,
      ..._152,
      ..._162,
      ..._177,
      ..._191,
      ..._200
    };
  }
  export namespace vesting {
    export const v1beta1 = {
      ..._64,
      ..._65,
      ..._153,
      ..._163,
      ..._201
    };
  }
  export const ClientFactory = {
    ..._242,
    ..._243,
    ..._244
  };
}