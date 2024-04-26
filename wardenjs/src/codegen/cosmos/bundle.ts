//@ts-nocheck
import * as _2 from "./auth/v1beta1/auth";
import * as _3 from "./auth/v1beta1/genesis";
import * as _4 from "./auth/v1beta1/query";
import * as _5 from "./authz/v1beta1/authz";
import * as _6 from "./authz/v1beta1/event";
import * as _7 from "./authz/v1beta1/genesis";
import * as _8 from "./authz/v1beta1/query";
import * as _9 from "./authz/v1beta1/tx";
import * as _10 from "./bank/v1beta1/authz";
import * as _11 from "./bank/v1beta1/bank";
import * as _12 from "./bank/v1beta1/genesis";
import * as _13 from "./bank/v1beta1/query";
import * as _14 from "./bank/v1beta1/tx";
import * as _15 from "./base/abci/v1beta1/abci";
import * as _16 from "./base/query/v1beta1/pagination";
import * as _17 from "./base/reflection/v2alpha1/reflection";
import * as _18 from "./base/v1beta1/coin";
import * as _19 from "./crypto/ed25519/keys";
import * as _20 from "./crypto/hd/v1/hd";
import * as _21 from "./crypto/keyring/v1/record";
import * as _22 from "./crypto/multisig/keys";
import * as _23 from "./crypto/secp256k1/keys";
import * as _24 from "./crypto/secp256r1/keys";
import * as _25 from "./distribution/v1beta1/distribution";
import * as _26 from "./distribution/v1beta1/genesis";
import * as _27 from "./distribution/v1beta1/query";
import * as _28 from "./distribution/v1beta1/tx";
import * as _29 from "./feegrant/v1beta1/feegrant";
import * as _30 from "./feegrant/v1beta1/genesis";
import * as _31 from "./feegrant/v1beta1/query";
import * as _32 from "./feegrant/v1beta1/tx";
import * as _33 from "./gov/v1/genesis";
import * as _34 from "./gov/v1/gov";
import * as _35 from "./gov/v1/query";
import * as _36 from "./gov/v1/tx";
import * as _37 from "./gov/v1beta1/genesis";
import * as _38 from "./gov/v1beta1/gov";
import * as _39 from "./gov/v1beta1/query";
import * as _40 from "./gov/v1beta1/tx";
import * as _41 from "./group/v1/events";
import * as _42 from "./group/v1/genesis";
import * as _43 from "./group/v1/query";
import * as _44 from "./group/v1/tx";
import * as _45 from "./group/v1/types";
import * as _46 from "./mint/v1beta1/genesis";
import * as _47 from "./mint/v1beta1/mint";
import * as _48 from "./mint/v1beta1/query";
import * as _49 from "./params/v1beta1/params";
import * as _50 from "./params/v1beta1/query";
import * as _51 from "./staking/v1beta1/authz";
import * as _52 from "./staking/v1beta1/genesis";
import * as _53 from "./staking/v1beta1/query";
import * as _54 from "./staking/v1beta1/staking";
import * as _55 from "./staking/v1beta1/tx";
import * as _56 from "./tx/signing/v1beta1/signing";
import * as _57 from "./tx/v1beta1/service";
import * as _58 from "./tx/v1beta1/tx";
import * as _59 from "./upgrade/v1beta1/query";
import * as _60 from "./upgrade/v1beta1/tx";
import * as _61 from "./upgrade/v1beta1/upgrade";
import * as _62 from "./vesting/v1beta1/tx";
import * as _63 from "./vesting/v1beta1/vesting";
import * as _98 from "./authz/v1beta1/tx.amino";
import * as _99 from "./bank/v1beta1/tx.amino";
import * as _100 from "./distribution/v1beta1/tx.amino";
import * as _101 from "./feegrant/v1beta1/tx.amino";
import * as _102 from "./gov/v1/tx.amino";
import * as _103 from "./gov/v1beta1/tx.amino";
import * as _104 from "./group/v1/tx.amino";
import * as _105 from "./staking/v1beta1/tx.amino";
import * as _106 from "./upgrade/v1beta1/tx.amino";
import * as _107 from "./vesting/v1beta1/tx.amino";
import * as _108 from "./authz/v1beta1/tx.registry";
import * as _109 from "./bank/v1beta1/tx.registry";
import * as _110 from "./distribution/v1beta1/tx.registry";
import * as _111 from "./feegrant/v1beta1/tx.registry";
import * as _112 from "./gov/v1/tx.registry";
import * as _113 from "./gov/v1beta1/tx.registry";
import * as _114 from "./group/v1/tx.registry";
import * as _115 from "./staking/v1beta1/tx.registry";
import * as _116 from "./upgrade/v1beta1/tx.registry";
import * as _117 from "./vesting/v1beta1/tx.registry";
import * as _118 from "./auth/v1beta1/query.lcd";
import * as _119 from "./authz/v1beta1/query.lcd";
import * as _120 from "./bank/v1beta1/query.lcd";
import * as _121 from "./distribution/v1beta1/query.lcd";
import * as _122 from "./feegrant/v1beta1/query.lcd";
import * as _123 from "./gov/v1/query.lcd";
import * as _124 from "./gov/v1beta1/query.lcd";
import * as _125 from "./group/v1/query.lcd";
import * as _126 from "./mint/v1beta1/query.lcd";
import * as _127 from "./params/v1beta1/query.lcd";
import * as _128 from "./staking/v1beta1/query.lcd";
import * as _129 from "./tx/v1beta1/service.lcd";
import * as _130 from "./upgrade/v1beta1/query.lcd";
import * as _131 from "./auth/v1beta1/query.rpc.Query";
import * as _132 from "./authz/v1beta1/query.rpc.Query";
import * as _133 from "./bank/v1beta1/query.rpc.Query";
import * as _134 from "./distribution/v1beta1/query.rpc.Query";
import * as _135 from "./feegrant/v1beta1/query.rpc.Query";
import * as _136 from "./gov/v1/query.rpc.Query";
import * as _137 from "./gov/v1beta1/query.rpc.Query";
import * as _138 from "./group/v1/query.rpc.Query";
import * as _139 from "./mint/v1beta1/query.rpc.Query";
import * as _140 from "./params/v1beta1/query.rpc.Query";
import * as _141 from "./staking/v1beta1/query.rpc.Query";
import * as _142 from "./tx/v1beta1/service.rpc.Service";
import * as _143 from "./upgrade/v1beta1/query.rpc.Query";
import * as _144 from "./authz/v1beta1/tx.rpc.msg";
import * as _145 from "./bank/v1beta1/tx.rpc.msg";
import * as _146 from "./distribution/v1beta1/tx.rpc.msg";
import * as _147 from "./feegrant/v1beta1/tx.rpc.msg";
import * as _148 from "./gov/v1/tx.rpc.msg";
import * as _149 from "./gov/v1beta1/tx.rpc.msg";
import * as _150 from "./group/v1/tx.rpc.msg";
import * as _151 from "./staking/v1beta1/tx.rpc.msg";
import * as _152 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _153 from "./vesting/v1beta1/tx.rpc.msg";
import * as _164 from "./lcd";
import * as _165 from "./rpc.query";
import * as _166 from "./rpc.tx";
export namespace cosmos {
  export namespace auth {
    export const v1beta1 = {
      ..._2,
      ..._3,
      ..._4,
      ..._118,
      ..._131
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._5,
      ..._6,
      ..._7,
      ..._8,
      ..._9,
      ..._98,
      ..._108,
      ..._119,
      ..._132,
      ..._144
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._10,
      ..._11,
      ..._12,
      ..._13,
      ..._14,
      ..._99,
      ..._109,
      ..._120,
      ..._133,
      ..._145
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
    export const v1beta1 = {
      ..._18
    };
  }
  export namespace crypto {
    export const ed25519 = {
      ..._19
    };
    export namespace hd {
      export const v1 = {
        ..._20
      };
    }
    export namespace keyring {
      export const v1 = {
        ..._21
      };
    }
    export const multisig = {
      ..._22
    };
    export const secp256k1 = {
      ..._23
    };
    export const secp256r1 = {
      ..._24
    };
  }
  export namespace distribution {
    export const v1beta1 = {
      ..._25,
      ..._26,
      ..._27,
      ..._28,
      ..._100,
      ..._110,
      ..._121,
      ..._134,
      ..._146
    };
  }
  export namespace feegrant {
    export const v1beta1 = {
      ..._29,
      ..._30,
      ..._31,
      ..._32,
      ..._101,
      ..._111,
      ..._122,
      ..._135,
      ..._147
    };
  }
  export namespace gov {
    export const v1 = {
      ..._33,
      ..._34,
      ..._35,
      ..._36,
      ..._102,
      ..._112,
      ..._123,
      ..._136,
      ..._148
    };
    export const v1beta1 = {
      ..._37,
      ..._38,
      ..._39,
      ..._40,
      ..._103,
      ..._113,
      ..._124,
      ..._137,
      ..._149
    };
  }
  export namespace group {
    export const v1 = {
      ..._41,
      ..._42,
      ..._43,
      ..._44,
      ..._45,
      ..._104,
      ..._114,
      ..._125,
      ..._138,
      ..._150
    };
  }
  export namespace mint {
    export const v1beta1 = {
      ..._46,
      ..._47,
      ..._48,
      ..._126,
      ..._139
    };
  }
  export namespace params {
    export const v1beta1 = {
      ..._49,
      ..._50,
      ..._127,
      ..._140
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._51,
      ..._52,
      ..._53,
      ..._54,
      ..._55,
      ..._105,
      ..._115,
      ..._128,
      ..._141,
      ..._151
    };
  }
  export namespace tx {
    export namespace signing {
      export const v1beta1 = {
        ..._56
      };
    }
    export const v1beta1 = {
      ..._57,
      ..._58,
      ..._129,
      ..._142
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._59,
      ..._60,
      ..._61,
      ..._106,
      ..._116,
      ..._130,
      ..._143,
      ..._152
    };
  }
  export namespace vesting {
    export const v1beta1 = {
      ..._62,
      ..._63,
      ..._107,
      ..._117,
      ..._153
    };
  }
  export const ClientFactory = {
    ..._164,
    ..._165,
    ..._166
  };
}