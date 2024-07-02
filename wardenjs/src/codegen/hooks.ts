//@ts-nocheck
import { ProtobufRpcClient } from "@cosmjs/stargate";
import * as _CosmosAuthV1beta1Queryrpc from "./cosmos/auth/v1beta1/query.rpc.Query.js";
import * as _CosmosAuthzV1beta1Queryrpc from "./cosmos/authz/v1beta1/query.rpc.Query.js";
import * as _CosmosBankV1beta1Queryrpc from "./cosmos/bank/v1beta1/query.rpc.Query.js";
import * as _CosmosBaseTendermintV1beta1Queryrpc from "./cosmos/base/tendermint/v1beta1/query.rpc.Service.js";
import * as _CosmosDistributionV1beta1Queryrpc from "./cosmos/distribution/v1beta1/query.rpc.Query.js";
import * as _CosmosFeegrantV1beta1Queryrpc from "./cosmos/feegrant/v1beta1/query.rpc.Query.js";
import * as _CosmosGovV1Queryrpc from "./cosmos/gov/v1/query.rpc.Query.js";
import * as _CosmosGovV1beta1Queryrpc from "./cosmos/gov/v1beta1/query.rpc.Query.js";
import * as _CosmosGroupV1Queryrpc from "./cosmos/group/v1/query.rpc.Query.js";
import * as _CosmosMintV1beta1Queryrpc from "./cosmos/mint/v1beta1/query.rpc.Query.js";
import * as _CosmosParamsV1beta1Queryrpc from "./cosmos/params/v1beta1/query.rpc.Query.js";
import * as _CosmosStakingV1beta1Queryrpc from "./cosmos/staking/v1beta1/query.rpc.Query.js";
import * as _CosmosTxV1beta1Servicerpc from "./cosmos/tx/v1beta1/service.rpc.Service.js";
import * as _CosmosUpgradeV1beta1Queryrpc from "./cosmos/upgrade/v1beta1/query.rpc.Query.js";
import * as _SlinkyMarketmapV1Queryrpc from "./slinky/marketmap/v1/query.rpc.Query.js";
import * as _SlinkyOracleV1Queryrpc from "./slinky/oracle/v1/query.rpc.Query.js";
import * as _WardenActV1beta1Queryrpc from "./warden/act/v1beta1/query.rpc.Query.js";
import * as _WardenGmpQueryrpc from "./warden/gmp/query.rpc.Query.js";
import * as _WardenWardenV1beta2Queryrpc from "./warden/warden/v1beta2/query.rpc.Query.js";
export const createRpcQueryHooks = ({
  rpc
}: {
  rpc: ProtobufRpcClient | undefined;
}) => {
  return {
    cosmos: {
      auth: {
        v1beta1: _CosmosAuthV1beta1Queryrpc.createRpcQueryHooks(rpc)
      },
      authz: {
        v1beta1: _CosmosAuthzV1beta1Queryrpc.createRpcQueryHooks(rpc)
      },
      bank: {
        v1beta1: _CosmosBankV1beta1Queryrpc.createRpcQueryHooks(rpc)
      },
      base: {
        tendermint: {
          v1beta1: _CosmosBaseTendermintV1beta1Queryrpc.createRpcQueryHooks(rpc)
        }
      },
      distribution: {
        v1beta1: _CosmosDistributionV1beta1Queryrpc.createRpcQueryHooks(rpc)
      },
      feegrant: {
        v1beta1: _CosmosFeegrantV1beta1Queryrpc.createRpcQueryHooks(rpc)
      },
      gov: {
        v1: _CosmosGovV1Queryrpc.createRpcQueryHooks(rpc),
        v1beta1: _CosmosGovV1beta1Queryrpc.createRpcQueryHooks(rpc)
      },
      group: {
        v1: _CosmosGroupV1Queryrpc.createRpcQueryHooks(rpc)
      },
      mint: {
        v1beta1: _CosmosMintV1beta1Queryrpc.createRpcQueryHooks(rpc)
      },
      params: {
        v1beta1: _CosmosParamsV1beta1Queryrpc.createRpcQueryHooks(rpc)
      },
      staking: {
        v1beta1: _CosmosStakingV1beta1Queryrpc.createRpcQueryHooks(rpc)
      },
      tx: {
        v1beta1: _CosmosTxV1beta1Servicerpc.createRpcQueryHooks(rpc)
      },
      upgrade: {
        v1beta1: _CosmosUpgradeV1beta1Queryrpc.createRpcQueryHooks(rpc)
      }
    },
    slinky: {
      marketmap: {
        v1: _SlinkyMarketmapV1Queryrpc.createRpcQueryHooks(rpc)
      },
      oracle: {
        v1: _SlinkyOracleV1Queryrpc.createRpcQueryHooks(rpc)
      }
    },
    warden: {
      act: {
        v1beta1: _WardenActV1beta1Queryrpc.createRpcQueryHooks(rpc)
      },
      gmp: _WardenGmpQueryrpc.createRpcQueryHooks(rpc),
      warden: {
        v1beta2: _WardenWardenV1beta2Queryrpc.createRpcQueryHooks(rpc)
      }
    },
    /**
     * warden.act.v1beta1.useParams
     * Parameters queries the parameters of the module.
     */
    useParams: _WardenActV1beta1Queryrpc.createRpcQueryHooks(rpc).useParams,
    /**
     * warden.act.v1beta1.useActions
     * Queries a list of Actions items.
     */
    useActions: _WardenActV1beta1Queryrpc.createRpcQueryHooks(rpc).useActions,
    /**
     * warden.act.v1beta1.useRules
     * Queries a list of Rules items.
     */
    useRules: _WardenActV1beta1Queryrpc.createRpcQueryHooks(rpc).useRules,
    /**
     * warden.act.v1beta1.useSimulateRule
     * Queries to simulate a Rule
     */
    useSimulateRule: _WardenActV1beta1Queryrpc.createRpcQueryHooks(rpc).useSimulateRule,
    /**
     * warden.act.v1beta1.useRuleById
     * Queries a list of RuleById items.
     */
    useRuleById: _WardenActV1beta1Queryrpc.createRpcQueryHooks(rpc).useRuleById,
    /**
     * warden.act.v1beta1.useActionsByAddress
     * Queries a list of Actions items by one participant address.
     */
    useActionsByAddress: _WardenActV1beta1Queryrpc.createRpcQueryHooks(rpc).useActionsByAddress,
    /**
     * warden.act.v1beta1.useActionById
     * ActionById
     */
    useActionById: _WardenActV1beta1Queryrpc.createRpcQueryHooks(rpc).useActionById,
    /**
     * warden.warden.v1beta2.useParams
     * Parameters queries the parameters of the module.
     */
    useWardenWardenV1beta2Params: _WardenWardenV1beta2Queryrpc.createRpcQueryHooks(rpc).useParams,
    /**
     * warden.warden.v1beta2.useSpaces
     * Queries a list of Spaces.
     */
    useSpaces: _WardenWardenV1beta2Queryrpc.createRpcQueryHooks(rpc).useSpaces,
    /**
     * warden.warden.v1beta2.useSpacesByOwner
     * Queries a list of Spaces that have the specified owner.
     */
    useSpacesByOwner: _WardenWardenV1beta2Queryrpc.createRpcQueryHooks(rpc).useSpacesByOwner,
    /**
     * warden.warden.v1beta2.useKeychains
     * Queries a list of Keychains.
     */
    useKeychains: _WardenWardenV1beta2Queryrpc.createRpcQueryHooks(rpc).useKeychains,
    /**
     * warden.warden.v1beta2.useSpaceById
     * Queries a Space by its id.
     */
    useSpaceById: _WardenWardenV1beta2Queryrpc.createRpcQueryHooks(rpc).useSpaceById,
    /**
     * warden.warden.v1beta2.useKeychainById
     * Queries a Keychain by its id.
     */
    useKeychainById: _WardenWardenV1beta2Queryrpc.createRpcQueryHooks(rpc).useKeychainById,
    /**
     * warden.warden.v1beta2.useKeyRequests
     * Queries a list of KeyRequests.
     */
    useKeyRequests: _WardenWardenV1beta2Queryrpc.createRpcQueryHooks(rpc).useKeyRequests,
    /**
     * warden.warden.v1beta2.useKeyRequestById
     * Queries a KeyRequest by its id.
     */
    useKeyRequestById: _WardenWardenV1beta2Queryrpc.createRpcQueryHooks(rpc).useKeyRequestById,
    /**
     * warden.warden.v1beta2.useAllKeys
     * Queries a list of Keys.
     */
    useAllKeys: _WardenWardenV1beta2Queryrpc.createRpcQueryHooks(rpc).useAllKeys,
    /**
     * warden.warden.v1beta2.useKeysBySpaceId
     * Queries a list of Keys by their Space ID.
     */
    useKeysBySpaceId: _WardenWardenV1beta2Queryrpc.createRpcQueryHooks(rpc).useKeysBySpaceId,
    /**
     * warden.warden.v1beta2.useKeyById
     * Queries a Key by its ID.
     */
    useKeyById: _WardenWardenV1beta2Queryrpc.createRpcQueryHooks(rpc).useKeyById,
    /**
     * warden.warden.v1beta2.useSignRequests
     * Queries a list of SignRequests.
     */
    useSignRequests: _WardenWardenV1beta2Queryrpc.createRpcQueryHooks(rpc).useSignRequests,
    /**
     * warden.warden.v1beta2.useSignRequestById
     * Queries a SignRequest by its id.
     */
    useSignRequestById: _WardenWardenV1beta2Queryrpc.createRpcQueryHooks(rpc).useSignRequestById
  };
};