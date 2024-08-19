//@ts-nocheck
import { Tendermint34Client, HttpEndpoint } from "@cosmjs/tendermint-rpc";
import { QueryClient } from "@cosmjs/stargate";
export const createRPCQueryClient = async ({
  rpcEndpoint
}: {
  rpcEndpoint: string | HttpEndpoint;
}) => {
  const tmClient = await Tendermint34Client.connect(rpcEndpoint);
  const client = new QueryClient(tmClient);
  return {
    cosmos: {
      auth: {
        v1beta1: (await import("../cosmos/auth/v1beta1/query.rpc.Query.js")).createRpcQueryExtension(client)
      },
      authz: {
        v1beta1: (await import("../cosmos/authz/v1beta1/query.rpc.Query.js")).createRpcQueryExtension(client)
      },
      bank: {
        v1beta1: (await import("../cosmos/bank/v1beta1/query.rpc.Query.js")).createRpcQueryExtension(client)
      },
      base: {
        tendermint: {
          v1beta1: (await import("../cosmos/base/tendermint/v1beta1/query.rpc.Service.js")).createRpcQueryExtension(client)
        }
      },
      distribution: {
        v1beta1: (await import("../cosmos/distribution/v1beta1/query.rpc.Query.js")).createRpcQueryExtension(client)
      },
      feegrant: {
        v1beta1: (await import("../cosmos/feegrant/v1beta1/query.rpc.Query.js")).createRpcQueryExtension(client)
      },
      gov: {
        v1: (await import("../cosmos/gov/v1/query.rpc.Query.js")).createRpcQueryExtension(client),
        v1beta1: (await import("../cosmos/gov/v1beta1/query.rpc.Query.js")).createRpcQueryExtension(client)
      },
      group: {
        v1: (await import("../cosmos/group/v1/query.rpc.Query.js")).createRpcQueryExtension(client)
      },
      mint: {
        v1beta1: (await import("../cosmos/mint/v1beta1/query.rpc.Query.js")).createRpcQueryExtension(client)
      },
      params: {
        v1beta1: (await import("../cosmos/params/v1beta1/query.rpc.Query.js")).createRpcQueryExtension(client)
      },
      staking: {
        v1beta1: (await import("../cosmos/staking/v1beta1/query.rpc.Query.js")).createRpcQueryExtension(client)
      },
      tx: {
        v1beta1: (await import("../cosmos/tx/v1beta1/service.rpc.Service.js")).createRpcQueryExtension(client)
      },
      upgrade: {
        v1beta1: (await import("../cosmos/upgrade/v1beta1/query.rpc.Query.js")).createRpcQueryExtension(client)
      }
    },
    warden: {
      act: {
        v1beta1: (await import("./act/v1beta1/query.rpc.Query.js")).createRpcQueryExtension(client)
      },
      gmp: (await import("./gmp/query.rpc.Query.js")).createRpcQueryExtension(client),
      warden: {
        v1beta3: (await import("./warden/v1beta3/query.rpc.Query.js")).createRpcQueryExtension(client)
      }
    }
  };
};