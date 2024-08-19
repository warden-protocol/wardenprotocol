//@ts-nocheck
import { LCDClient } from "@cosmology/lcd";
export const createLCDClient = async ({
  restEndpoint
}: {
  restEndpoint: string;
}) => {
  const requestClient = new LCDClient({
    restEndpoint
  });
  return {
    cosmos: {
      auth: {
        v1beta1: new (await import("../cosmos/auth/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      authz: {
        v1beta1: new (await import("../cosmos/authz/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      bank: {
        v1beta1: new (await import("../cosmos/bank/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      base: {
        tendermint: {
          v1beta1: new (await import("../cosmos/base/tendermint/v1beta1/query.lcd.js")).LCDQueryClient({
            requestClient
          })
        }
      },
      distribution: {
        v1beta1: new (await import("../cosmos/distribution/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      feegrant: {
        v1beta1: new (await import("../cosmos/feegrant/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      gov: {
        v1: new (await import("../cosmos/gov/v1/query.lcd.js")).LCDQueryClient({
          requestClient
        }),
        v1beta1: new (await import("../cosmos/gov/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      group: {
        v1: new (await import("../cosmos/group/v1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      mint: {
        v1beta1: new (await import("../cosmos/mint/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      params: {
        v1beta1: new (await import("../cosmos/params/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      staking: {
        v1beta1: new (await import("../cosmos/staking/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      tx: {
        v1beta1: new (await import("../cosmos/tx/v1beta1/service.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      upgrade: {
        v1beta1: new (await import("../cosmos/upgrade/v1beta1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      }
    },
    slinky: {
      marketmap: {
        v1: new (await import("./marketmap/v1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      },
      oracle: {
        v1: new (await import("./oracle/v1/query.lcd.js")).LCDQueryClient({
          requestClient
        })
      }
    }
  };
};