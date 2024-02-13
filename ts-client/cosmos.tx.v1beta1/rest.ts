/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ABCIMessageLog {
  /** @format int64 */
  msg_index?: number;
  log?: string;
  events?: { type?: string; attributes?: { key?: string; value?: string }[] }[];
}

export interface Any {
  "@type"?: string;
}

export interface Attribute {
  key?: string;
  value?: string;
}

export interface AuthInfo {
  signer_infos?: SignerInfo[];
  fee?: { amount?: { denom?: string; amount?: string }[]; gas_limit?: string; payer?: string; granter?: string };
  tip?: { amount?: { denom?: string; amount?: string }[]; tipper?: string };
}

export interface Block {
  header?: {
    version?: { block?: string; app?: string };
    chain_id?: string;
    height?: string;
    time?: string;
    last_block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
    last_commit_hash?: string;
    data_hash?: string;
    validators_hash?: string;
    next_validators_hash?: string;
    consensus_hash?: string;
    app_hash?: string;
    last_results_hash?: string;
    evidence_hash?: string;
    proposer_address?: string;
  };
  data?: { txs?: string[] };
  evidence?: {
    evidence?: {
      duplicate_vote_evidence?: {
        vote_a?: {
          type?:
            | "SIGNED_MSG_TYPE_UNKNOWN"
            | "SIGNED_MSG_TYPE_PREVOTE"
            | "SIGNED_MSG_TYPE_PRECOMMIT"
            | "SIGNED_MSG_TYPE_PROPOSAL";
          height?: string;
          round?: number;
          block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
          timestamp?: string;
          validator_address?: string;
          validator_index?: number;
          signature?: string;
          extension?: string;
          extension_signature?: string;
        };
        vote_b?: {
          type?:
            | "SIGNED_MSG_TYPE_UNKNOWN"
            | "SIGNED_MSG_TYPE_PREVOTE"
            | "SIGNED_MSG_TYPE_PRECOMMIT"
            | "SIGNED_MSG_TYPE_PROPOSAL";
          height?: string;
          round?: number;
          block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
          timestamp?: string;
          validator_address?: string;
          validator_index?: number;
          signature?: string;
          extension?: string;
          extension_signature?: string;
        };
        total_voting_power?: string;
        validator_power?: string;
        timestamp?: string;
      };
      light_client_attack_evidence?: {
        conflicting_block?: {
          signed_header?: {
            header?: {
              version?: { block?: string; app?: string };
              chain_id?: string;
              height?: string;
              time?: string;
              last_block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
              last_commit_hash?: string;
              data_hash?: string;
              validators_hash?: string;
              next_validators_hash?: string;
              consensus_hash?: string;
              app_hash?: string;
              last_results_hash?: string;
              evidence_hash?: string;
              proposer_address?: string;
            };
            commit?: {
              height?: string;
              round?: number;
              block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
              signatures?: {
                block_id_flag?:
                  | "BLOCK_ID_FLAG_UNKNOWN"
                  | "BLOCK_ID_FLAG_ABSENT"
                  | "BLOCK_ID_FLAG_COMMIT"
                  | "BLOCK_ID_FLAG_NIL";
                validator_address?: string;
                timestamp?: string;
                signature?: string;
              }[];
            };
          };
          validator_set?: {
            validators?: {
              address?: string;
              pub_key?: { ed25519?: string; secp256k1?: string };
              voting_power?: string;
              proposer_priority?: string;
            }[];
            proposer?: {
              address?: string;
              pub_key?: { ed25519?: string; secp256k1?: string };
              voting_power?: string;
              proposer_priority?: string;
            };
            total_voting_power?: string;
          };
        };
        common_height?: string;
        byzantine_validators?: {
          address?: string;
          pub_key?: { ed25519?: string; secp256k1?: string };
          voting_power?: string;
          proposer_priority?: string;
        }[];
        total_voting_power?: string;
        timestamp?: string;
      };
    }[];
  };
  last_commit?: {
    height?: string;
    round?: number;
    block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
    signatures?: {
      block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
      validator_address?: string;
      timestamp?: string;
      signature?: string;
    }[];
  };
}

export interface BlockID {
  /** @format byte */
  hash?: string;
  part_set_header?: { total?: number; hash?: string };
}

export enum BlockIDFlag {
  BLOCK_ID_FLAG_UNKNOWN = "BLOCK_ID_FLAG_UNKNOWN",
  BLOCK_ID_FLAG_ABSENT = "BLOCK_ID_FLAG_ABSENT",
  BLOCK_ID_FLAG_COMMIT = "BLOCK_ID_FLAG_COMMIT",
  BLOCK_ID_FLAG_NIL = "BLOCK_ID_FLAG_NIL",
}

export enum BroadcastMode {
  BROADCAST_MODE_UNSPECIFIED = "BROADCAST_MODE_UNSPECIFIED",
  BROADCAST_MODE_BLOCK = "BROADCAST_MODE_BLOCK",
  BROADCAST_MODE_SYNC = "BROADCAST_MODE_SYNC",
  BROADCAST_MODE_ASYNC = "BROADCAST_MODE_ASYNC",
}

export interface BroadcastTxRequest {
  /** @format byte */
  tx_bytes?: string;
  mode?: "BROADCAST_MODE_UNSPECIFIED" | "BROADCAST_MODE_BLOCK" | "BROADCAST_MODE_SYNC" | "BROADCAST_MODE_ASYNC";
}

export interface BroadcastTxResponse {
  tx_response?: {
    height?: string;
    txhash?: string;
    codespace?: string;
    code?: number;
    data?: string;
    raw_log?: string;
    logs?: {
      msg_index?: number;
      log?: string;
      events?: { type?: string; attributes?: { key?: string; value?: string }[] }[];
    }[];
    info?: string;
    gas_wanted?: string;
    gas_used?: string;
    tx?: { "@type"?: string };
    timestamp?: string;
    events?: { type?: string; attributes?: { key?: string; value?: string; index?: boolean }[] }[];
  };
}

export interface Coin {
  denom?: string;
  amount?: string;
}

export interface Commit {
  /** @format int64 */
  height?: string;

  /** @format int32 */
  round?: number;
  block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
  signatures?: {
    block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
    validator_address?: string;
    timestamp?: string;
    signature?: string;
  }[];
}

export interface CommitSig {
  block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";

  /** @format byte */
  validator_address?: string;

  /** @format date-time */
  timestamp?: string;

  /** @format byte */
  signature?: string;
}

export interface CompactBitArray {
  /** @format int64 */
  extra_bits_stored?: number;

  /** @format byte */
  elems?: string;
}

export interface Consensus {
  /** @format uint64 */
  block?: string;

  /** @format uint64 */
  app?: string;
}

export interface DuplicateVoteEvidence {
  vote_a?: {
    type?:
      | "SIGNED_MSG_TYPE_UNKNOWN"
      | "SIGNED_MSG_TYPE_PREVOTE"
      | "SIGNED_MSG_TYPE_PRECOMMIT"
      | "SIGNED_MSG_TYPE_PROPOSAL";
    height?: string;
    round?: number;
    block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
    timestamp?: string;
    validator_address?: string;
    validator_index?: number;
    signature?: string;
    extension?: string;
    extension_signature?: string;
  };
  vote_b?: {
    type?:
      | "SIGNED_MSG_TYPE_UNKNOWN"
      | "SIGNED_MSG_TYPE_PREVOTE"
      | "SIGNED_MSG_TYPE_PRECOMMIT"
      | "SIGNED_MSG_TYPE_PROPOSAL";
    height?: string;
    round?: number;
    block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
    timestamp?: string;
    validator_address?: string;
    validator_index?: number;
    signature?: string;
    extension?: string;
    extension_signature?: string;
  };

  /** @format int64 */
  total_voting_power?: string;

  /** @format int64 */
  validator_power?: string;

  /** @format date-time */
  timestamp?: string;
}

export interface Event {
  type?: string;
  attributes?: { key?: string; value?: string; index?: boolean }[];
}

export interface EventAttribute {
  key?: string;
  value?: string;
  index?: boolean;
}

export interface Evidence {
  duplicate_vote_evidence?: {
    vote_a?: {
      type?:
        | "SIGNED_MSG_TYPE_UNKNOWN"
        | "SIGNED_MSG_TYPE_PREVOTE"
        | "SIGNED_MSG_TYPE_PRECOMMIT"
        | "SIGNED_MSG_TYPE_PROPOSAL";
      height?: string;
      round?: number;
      block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
      timestamp?: string;
      validator_address?: string;
      validator_index?: number;
      signature?: string;
      extension?: string;
      extension_signature?: string;
    };
    vote_b?: {
      type?:
        | "SIGNED_MSG_TYPE_UNKNOWN"
        | "SIGNED_MSG_TYPE_PREVOTE"
        | "SIGNED_MSG_TYPE_PRECOMMIT"
        | "SIGNED_MSG_TYPE_PROPOSAL";
      height?: string;
      round?: number;
      block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
      timestamp?: string;
      validator_address?: string;
      validator_index?: number;
      signature?: string;
      extension?: string;
      extension_signature?: string;
    };
    total_voting_power?: string;
    validator_power?: string;
    timestamp?: string;
  };
  light_client_attack_evidence?: {
    conflicting_block?: {
      signed_header?: {
        header?: {
          version?: { block?: string; app?: string };
          chain_id?: string;
          height?: string;
          time?: string;
          last_block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
          last_commit_hash?: string;
          data_hash?: string;
          validators_hash?: string;
          next_validators_hash?: string;
          consensus_hash?: string;
          app_hash?: string;
          last_results_hash?: string;
          evidence_hash?: string;
          proposer_address?: string;
        };
        commit?: {
          height?: string;
          round?: number;
          block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
          signatures?: {
            block_id_flag?:
              | "BLOCK_ID_FLAG_UNKNOWN"
              | "BLOCK_ID_FLAG_ABSENT"
              | "BLOCK_ID_FLAG_COMMIT"
              | "BLOCK_ID_FLAG_NIL";
            validator_address?: string;
            timestamp?: string;
            signature?: string;
          }[];
        };
      };
      validator_set?: {
        validators?: {
          address?: string;
          pub_key?: { ed25519?: string; secp256k1?: string };
          voting_power?: string;
          proposer_priority?: string;
        }[];
        proposer?: {
          address?: string;
          pub_key?: { ed25519?: string; secp256k1?: string };
          voting_power?: string;
          proposer_priority?: string;
        };
        total_voting_power?: string;
      };
    };
    common_height?: string;
    byzantine_validators?: {
      address?: string;
      pub_key?: { ed25519?: string; secp256k1?: string };
      voting_power?: string;
      proposer_priority?: string;
    }[];
    total_voting_power?: string;
    timestamp?: string;
  };
}

export interface EvidenceList {
  evidence?: {
    duplicate_vote_evidence?: {
      vote_a?: {
        type?:
          | "SIGNED_MSG_TYPE_UNKNOWN"
          | "SIGNED_MSG_TYPE_PREVOTE"
          | "SIGNED_MSG_TYPE_PRECOMMIT"
          | "SIGNED_MSG_TYPE_PROPOSAL";
        height?: string;
        round?: number;
        block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
        timestamp?: string;
        validator_address?: string;
        validator_index?: number;
        signature?: string;
        extension?: string;
        extension_signature?: string;
      };
      vote_b?: {
        type?:
          | "SIGNED_MSG_TYPE_UNKNOWN"
          | "SIGNED_MSG_TYPE_PREVOTE"
          | "SIGNED_MSG_TYPE_PRECOMMIT"
          | "SIGNED_MSG_TYPE_PROPOSAL";
        height?: string;
        round?: number;
        block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
        timestamp?: string;
        validator_address?: string;
        validator_index?: number;
        signature?: string;
        extension?: string;
        extension_signature?: string;
      };
      total_voting_power?: string;
      validator_power?: string;
      timestamp?: string;
    };
    light_client_attack_evidence?: {
      conflicting_block?: {
        signed_header?: {
          header?: {
            version?: { block?: string; app?: string };
            chain_id?: string;
            height?: string;
            time?: string;
            last_block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
            last_commit_hash?: string;
            data_hash?: string;
            validators_hash?: string;
            next_validators_hash?: string;
            consensus_hash?: string;
            app_hash?: string;
            last_results_hash?: string;
            evidence_hash?: string;
            proposer_address?: string;
          };
          commit?: {
            height?: string;
            round?: number;
            block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
            signatures?: {
              block_id_flag?:
                | "BLOCK_ID_FLAG_UNKNOWN"
                | "BLOCK_ID_FLAG_ABSENT"
                | "BLOCK_ID_FLAG_COMMIT"
                | "BLOCK_ID_FLAG_NIL";
              validator_address?: string;
              timestamp?: string;
              signature?: string;
            }[];
          };
        };
        validator_set?: {
          validators?: {
            address?: string;
            pub_key?: { ed25519?: string; secp256k1?: string };
            voting_power?: string;
            proposer_priority?: string;
          }[];
          proposer?: {
            address?: string;
            pub_key?: { ed25519?: string; secp256k1?: string };
            voting_power?: string;
            proposer_priority?: string;
          };
          total_voting_power?: string;
        };
      };
      common_height?: string;
      byzantine_validators?: {
        address?: string;
        pub_key?: { ed25519?: string; secp256k1?: string };
        voting_power?: string;
        proposer_priority?: string;
      }[];
      total_voting_power?: string;
      timestamp?: string;
    };
  }[];
}

export interface Fee {
  amount?: { denom?: string; amount?: string }[];

  /** @format uint64 */
  gas_limit?: string;
  payer?: string;
  granter?: string;
}

export interface GasInfo {
  /** @format uint64 */
  gas_wanted?: string;

  /** @format uint64 */
  gas_used?: string;
}

export interface GetBlockWithTxsResponse {
  txs?: Tx[];
  block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
  block?: {
    header?: {
      version?: { block?: string; app?: string };
      chain_id?: string;
      height?: string;
      time?: string;
      last_block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
      last_commit_hash?: string;
      data_hash?: string;
      validators_hash?: string;
      next_validators_hash?: string;
      consensus_hash?: string;
      app_hash?: string;
      last_results_hash?: string;
      evidence_hash?: string;
      proposer_address?: string;
    };
    data?: { txs?: string[] };
    evidence?: {
      evidence?: {
        duplicate_vote_evidence?: {
          vote_a?: {
            type?:
              | "SIGNED_MSG_TYPE_UNKNOWN"
              | "SIGNED_MSG_TYPE_PREVOTE"
              | "SIGNED_MSG_TYPE_PRECOMMIT"
              | "SIGNED_MSG_TYPE_PROPOSAL";
            height?: string;
            round?: number;
            block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
            timestamp?: string;
            validator_address?: string;
            validator_index?: number;
            signature?: string;
            extension?: string;
            extension_signature?: string;
          };
          vote_b?: {
            type?:
              | "SIGNED_MSG_TYPE_UNKNOWN"
              | "SIGNED_MSG_TYPE_PREVOTE"
              | "SIGNED_MSG_TYPE_PRECOMMIT"
              | "SIGNED_MSG_TYPE_PROPOSAL";
            height?: string;
            round?: number;
            block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
            timestamp?: string;
            validator_address?: string;
            validator_index?: number;
            signature?: string;
            extension?: string;
            extension_signature?: string;
          };
          total_voting_power?: string;
          validator_power?: string;
          timestamp?: string;
        };
        light_client_attack_evidence?: {
          conflicting_block?: {
            signed_header?: {
              header?: {
                version?: { block?: string; app?: string };
                chain_id?: string;
                height?: string;
                time?: string;
                last_block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
                last_commit_hash?: string;
                data_hash?: string;
                validators_hash?: string;
                next_validators_hash?: string;
                consensus_hash?: string;
                app_hash?: string;
                last_results_hash?: string;
                evidence_hash?: string;
                proposer_address?: string;
              };
              commit?: {
                height?: string;
                round?: number;
                block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
                signatures?: {
                  block_id_flag?:
                    | "BLOCK_ID_FLAG_UNKNOWN"
                    | "BLOCK_ID_FLAG_ABSENT"
                    | "BLOCK_ID_FLAG_COMMIT"
                    | "BLOCK_ID_FLAG_NIL";
                  validator_address?: string;
                  timestamp?: string;
                  signature?: string;
                }[];
              };
            };
            validator_set?: {
              validators?: {
                address?: string;
                pub_key?: { ed25519?: string; secp256k1?: string };
                voting_power?: string;
                proposer_priority?: string;
              }[];
              proposer?: {
                address?: string;
                pub_key?: { ed25519?: string; secp256k1?: string };
                voting_power?: string;
                proposer_priority?: string;
              };
              total_voting_power?: string;
            };
          };
          common_height?: string;
          byzantine_validators?: {
            address?: string;
            pub_key?: { ed25519?: string; secp256k1?: string };
            voting_power?: string;
            proposer_priority?: string;
          }[];
          total_voting_power?: string;
          timestamp?: string;
        };
      }[];
    };
    last_commit?: {
      height?: string;
      round?: number;
      block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
      signatures?: {
        block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
        validator_address?: string;
        timestamp?: string;
        signature?: string;
      }[];
    };
  };
  pagination?: { next_key?: string; total?: string };
}

export interface GetTxResponse {
  tx?: Tx;
  tx_response?: {
    height?: string;
    txhash?: string;
    codespace?: string;
    code?: number;
    data?: string;
    raw_log?: string;
    logs?: {
      msg_index?: number;
      log?: string;
      events?: { type?: string; attributes?: { key?: string; value?: string }[] }[];
    }[];
    info?: string;
    gas_wanted?: string;
    gas_used?: string;
    tx?: { "@type"?: string };
    timestamp?: string;
    events?: { type?: string; attributes?: { key?: string; value?: string; index?: boolean }[] }[];
  };
}

export interface GetTxsEventResponse {
  txs?: Tx[];
  tx_responses?: {
    height?: string;
    txhash?: string;
    codespace?: string;
    code?: number;
    data?: string;
    raw_log?: string;
    logs?: {
      msg_index?: number;
      log?: string;
      events?: { type?: string; attributes?: { key?: string; value?: string }[] }[];
    }[];
    info?: string;
    gas_wanted?: string;
    gas_used?: string;
    tx?: { "@type"?: string };
    timestamp?: string;
    events?: { type?: string; attributes?: { key?: string; value?: string; index?: boolean }[] }[];
  }[];
  pagination?: { next_key?: string; total?: string };

  /** @format uint64 */
  total?: string;
}

export interface Header {
  version?: { block?: string; app?: string };
  chain_id?: string;

  /** @format int64 */
  height?: string;

  /** @format date-time */
  time?: string;
  last_block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };

  /** @format byte */
  last_commit_hash?: string;

  /** @format byte */
  data_hash?: string;

  /** @format byte */
  validators_hash?: string;

  /** @format byte */
  next_validators_hash?: string;

  /** @format byte */
  consensus_hash?: string;

  /** @format byte */
  app_hash?: string;

  /** @format byte */
  last_results_hash?: string;

  /** @format byte */
  evidence_hash?: string;

  /** @format byte */
  proposer_address?: string;
}

export interface LightBlock {
  signed_header?: {
    header?: {
      version?: { block?: string; app?: string };
      chain_id?: string;
      height?: string;
      time?: string;
      last_block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
      last_commit_hash?: string;
      data_hash?: string;
      validators_hash?: string;
      next_validators_hash?: string;
      consensus_hash?: string;
      app_hash?: string;
      last_results_hash?: string;
      evidence_hash?: string;
      proposer_address?: string;
    };
    commit?: {
      height?: string;
      round?: number;
      block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
      signatures?: {
        block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
        validator_address?: string;
        timestamp?: string;
        signature?: string;
      }[];
    };
  };
  validator_set?: {
    validators?: {
      address?: string;
      pub_key?: { ed25519?: string; secp256k1?: string };
      voting_power?: string;
      proposer_priority?: string;
    }[];
    proposer?: {
      address?: string;
      pub_key?: { ed25519?: string; secp256k1?: string };
      voting_power?: string;
      proposer_priority?: string;
    };
    total_voting_power?: string;
  };
}

export interface LightClientAttackEvidence {
  conflicting_block?: {
    signed_header?: {
      header?: {
        version?: { block?: string; app?: string };
        chain_id?: string;
        height?: string;
        time?: string;
        last_block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
        last_commit_hash?: string;
        data_hash?: string;
        validators_hash?: string;
        next_validators_hash?: string;
        consensus_hash?: string;
        app_hash?: string;
        last_results_hash?: string;
        evidence_hash?: string;
        proposer_address?: string;
      };
      commit?: {
        height?: string;
        round?: number;
        block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
        signatures?: {
          block_id_flag?:
            | "BLOCK_ID_FLAG_UNKNOWN"
            | "BLOCK_ID_FLAG_ABSENT"
            | "BLOCK_ID_FLAG_COMMIT"
            | "BLOCK_ID_FLAG_NIL";
          validator_address?: string;
          timestamp?: string;
          signature?: string;
        }[];
      };
    };
    validator_set?: {
      validators?: {
        address?: string;
        pub_key?: { ed25519?: string; secp256k1?: string };
        voting_power?: string;
        proposer_priority?: string;
      }[];
      proposer?: {
        address?: string;
        pub_key?: { ed25519?: string; secp256k1?: string };
        voting_power?: string;
        proposer_priority?: string;
      };
      total_voting_power?: string;
    };
  };

  /** @format int64 */
  common_height?: string;
  byzantine_validators?: {
    address?: string;
    pub_key?: { ed25519?: string; secp256k1?: string };
    voting_power?: string;
    proposer_priority?: string;
  }[];

  /** @format int64 */
  total_voting_power?: string;

  /** @format date-time */
  timestamp?: string;
}

export interface ModeInfo {
  single?: {
    mode?:
      | "SIGN_MODE_UNSPECIFIED"
      | "SIGN_MODE_DIRECT"
      | "SIGN_MODE_TEXTUAL"
      | "SIGN_MODE_DIRECT_AUX"
      | "SIGN_MODE_LEGACY_AMINO_JSON"
      | "SIGN_MODE_EIP_191";
  };
  multi?: ModeInfoMulti;
}

export interface ModeInfoMulti {
  bitarray?: { extra_bits_stored?: number; elems?: string };
  mode_infos?: ModeInfo[];
}

export interface ModeInfoSingle {
  mode?:
    | "SIGN_MODE_UNSPECIFIED"
    | "SIGN_MODE_DIRECT"
    | "SIGN_MODE_TEXTUAL"
    | "SIGN_MODE_DIRECT_AUX"
    | "SIGN_MODE_LEGACY_AMINO_JSON"
    | "SIGN_MODE_EIP_191";
}

export enum OrderBy {
  ORDER_BY_UNSPECIFIED = "ORDER_BY_UNSPECIFIED",
  ORDER_BY_ASC = "ORDER_BY_ASC",
  ORDER_BY_DESC = "ORDER_BY_DESC",
}

export interface PageRequest {
  /** @format byte */
  key?: string;

  /** @format uint64 */
  offset?: string;

  /** @format uint64 */
  limit?: string;
  count_total?: boolean;
  reverse?: boolean;
}

export interface PageResponse {
  /** @format byte */
  next_key?: string;

  /** @format uint64 */
  total?: string;
}

export interface PartSetHeader {
  /** @format int64 */
  total?: number;

  /** @format byte */
  hash?: string;
}

export interface PublicKey {
  /** @format byte */
  ed25519?: string;

  /** @format byte */
  secp256k1?: string;
}

export enum SignMode {
  SIGN_MODE_UNSPECIFIED = "SIGN_MODE_UNSPECIFIED",
  SIGN_MODE_DIRECT = "SIGN_MODE_DIRECT",
  SIGN_MODE_TEXTUAL = "SIGN_MODE_TEXTUAL",
  SIGN_MODE_DIRECT_AUX = "SIGN_MODE_DIRECT_AUX",
  SIGN_MODE_LEGACY_AMINO_JSON = "SIGN_MODE_LEGACY_AMINO_JSON",
  SIGNMODEEIP191 = "SIGN_MODE_EIP_191",
}

export interface SignedHeader {
  header?: {
    version?: { block?: string; app?: string };
    chain_id?: string;
    height?: string;
    time?: string;
    last_block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
    last_commit_hash?: string;
    data_hash?: string;
    validators_hash?: string;
    next_validators_hash?: string;
    consensus_hash?: string;
    app_hash?: string;
    last_results_hash?: string;
    evidence_hash?: string;
    proposer_address?: string;
  };
  commit?: {
    height?: string;
    round?: number;
    block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };
    signatures?: {
      block_id_flag?: "BLOCK_ID_FLAG_UNKNOWN" | "BLOCK_ID_FLAG_ABSENT" | "BLOCK_ID_FLAG_COMMIT" | "BLOCK_ID_FLAG_NIL";
      validator_address?: string;
      timestamp?: string;
      signature?: string;
    }[];
  };
}

export enum SignedMsgType {
  SIGNED_MSG_TYPE_UNKNOWN = "SIGNED_MSG_TYPE_UNKNOWN",
  SIGNED_MSG_TYPE_PREVOTE = "SIGNED_MSG_TYPE_PREVOTE",
  SIGNED_MSG_TYPE_PRECOMMIT = "SIGNED_MSG_TYPE_PRECOMMIT",
  SIGNED_MSG_TYPE_PROPOSAL = "SIGNED_MSG_TYPE_PROPOSAL",
}

export interface SignerInfo {
  public_key?: { "@type"?: string };
  mode_info?: ModeInfo;

  /** @format uint64 */
  sequence?: string;
}

export interface SimulateRequest {
  tx?: Tx;

  /** @format byte */
  tx_bytes?: string;
}

export interface SimulateResponse {
  gas_info?: { gas_wanted?: string; gas_used?: string };
  result?: {
    data?: string;
    log?: string;
    events?: { type?: string; attributes?: { key?: string; value?: string; index?: boolean }[] }[];
    msg_responses?: { "@type"?: string }[];
  };
}

export interface Status {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: { "@type"?: string }[];
}

export interface StringEvent {
  type?: string;
  attributes?: { key?: string; value?: string }[];
}

export interface Tip {
  amount?: { denom?: string; amount?: string }[];
  tipper?: string;
}

export interface Tx {
  body?: {
    messages?: { "@type"?: string }[];
    memo?: string;
    timeout_height?: string;
    extension_options?: { "@type"?: string }[];
    non_critical_extension_options?: { "@type"?: string }[];
  };
  auth_info?: AuthInfo;
  signatures?: string[];
}

export interface TxBody {
  messages?: { "@type"?: string }[];
  memo?: string;

  /** @format uint64 */
  timeout_height?: string;
  extension_options?: { "@type"?: string }[];
  non_critical_extension_options?: { "@type"?: string }[];
}

export interface TxDecodeAminoRequest {
  /** @format byte */
  amino_binary?: string;
}

export interface TxDecodeAminoResponse {
  amino_json?: string;
}

export interface TxDecodeRequest {
  /** @format byte */
  tx_bytes?: string;
}

export interface TxDecodeResponse {
  tx?: Tx;
}

export interface TxEncodeAminoRequest {
  amino_json?: string;
}

export interface TxEncodeAminoResponse {
  /** @format byte */
  amino_binary?: string;
}

export interface TxEncodeRequest {
  tx?: Tx;
}

export interface TxEncodeResponse {
  /** @format byte */
  tx_bytes?: string;
}

export interface TxResponse {
  /** @format int64 */
  height?: string;
  txhash?: string;
  codespace?: string;

  /** @format int64 */
  code?: number;
  data?: string;
  raw_log?: string;
  logs?: {
    msg_index?: number;
    log?: string;
    events?: { type?: string; attributes?: { key?: string; value?: string }[] }[];
  }[];
  info?: string;

  /** @format int64 */
  gas_wanted?: string;

  /** @format int64 */
  gas_used?: string;
  tx?: { "@type"?: string };
  timestamp?: string;
  events?: { type?: string; attributes?: { key?: string; value?: string; index?: boolean }[] }[];
}

export interface ValidatorSet {
  validators?: {
    address?: string;
    pub_key?: { ed25519?: string; secp256k1?: string };
    voting_power?: string;
    proposer_priority?: string;
  }[];
  proposer?: {
    address?: string;
    pub_key?: { ed25519?: string; secp256k1?: string };
    voting_power?: string;
    proposer_priority?: string;
  };

  /** @format int64 */
  total_voting_power?: string;
}

export interface Vote {
  type?:
    | "SIGNED_MSG_TYPE_UNKNOWN"
    | "SIGNED_MSG_TYPE_PREVOTE"
    | "SIGNED_MSG_TYPE_PRECOMMIT"
    | "SIGNED_MSG_TYPE_PROPOSAL";

  /** @format int64 */
  height?: string;

  /** @format int32 */
  round?: number;
  block_id?: { hash?: string; part_set_header?: { total?: number; hash?: string } };

  /** @format date-time */
  timestamp?: string;

  /** @format byte */
  validator_address?: string;

  /** @format int32 */
  validator_index?: number;

  /** @format byte */
  signature?: string;

  /** @format byte */
  extension?: string;

  /** @format byte */
  extension_signature?: string;
}

export interface TypesData {
  txs?: string[];
}

export interface TypesValidator {
  /** @format byte */
  address?: string;
  pub_key?: { ed25519?: string; secp256k1?: string };

  /** @format int64 */
  voting_power?: string;

  /** @format int64 */
  proposer_priority?: string;
}

export interface V1Beta1Result {
  /** @format byte */
  data?: string;
  log?: string;
  events?: { type?: string; attributes?: { key?: string; value?: string; index?: boolean }[] }[];
  msg_responses?: { "@type"?: string }[];
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title HTTP API Console cosmos.tx.v1beta1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Service
   * @name ServiceTxDecode
   * @request POST:/cosmos/tx/v1beta1/decode
   */
  serviceTxDecode = (body: { tx_bytes?: string }, params: RequestParams = {}) =>
    this.request<TxDecodeResponse, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/cosmos/tx/v1beta1/decode`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Service
   * @name ServiceTxDecodeAmino
   * @request POST:/cosmos/tx/v1beta1/decode/amino
   */
  serviceTxDecodeAmino = (body: { amino_binary?: string }, params: RequestParams = {}) =>
    this.request<{ amino_json?: string }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/cosmos/tx/v1beta1/decode/amino`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Service
   * @name ServiceTxEncode
   * @request POST:/cosmos/tx/v1beta1/encode
   */
  serviceTxEncode = (body: TxEncodeRequest, params: RequestParams = {}) =>
    this.request<{ tx_bytes?: string }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/cosmos/tx/v1beta1/encode`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Service
   * @name ServiceTxEncodeAmino
   * @request POST:/cosmos/tx/v1beta1/encode/amino
   */
  serviceTxEncodeAmino = (body: { amino_json?: string }, params: RequestParams = {}) =>
    this.request<{ amino_binary?: string }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/cosmos/tx/v1beta1/encode/amino`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Service
   * @name ServiceSimulate
   * @request POST:/cosmos/tx/v1beta1/simulate
   */
  serviceSimulate = (body: SimulateRequest, params: RequestParams = {}) =>
    this.request<
      {
        gas_info?: { gas_wanted?: string; gas_used?: string };
        result?: {
          data?: string;
          log?: string;
          events?: { type?: string; attributes?: { key?: string; value?: string; index?: boolean }[] }[];
          msg_responses?: { "@type"?: string }[];
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/tx/v1beta1/simulate`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Service
   * @name ServiceGetTxsEvent
   * @request GET:/cosmos/tx/v1beta1/txs
   */
  serviceGetTxsEvent = (
    query?: {
      events?: string[];
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
      order_by?: "ORDER_BY_UNSPECIFIED" | "ORDER_BY_ASC" | "ORDER_BY_DESC";
      page?: string;
      limit?: string;
      query?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetTxsEventResponse, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/cosmos/tx/v1beta1/txs`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Service
   * @name ServiceBroadcastTx
   * @request POST:/cosmos/tx/v1beta1/txs
   */
  serviceBroadcastTx = (
    body: {
      tx_bytes?: string;
      mode?: "BROADCAST_MODE_UNSPECIFIED" | "BROADCAST_MODE_BLOCK" | "BROADCAST_MODE_SYNC" | "BROADCAST_MODE_ASYNC";
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        tx_response?: {
          height?: string;
          txhash?: string;
          codespace?: string;
          code?: number;
          data?: string;
          raw_log?: string;
          logs?: {
            msg_index?: number;
            log?: string;
            events?: { type?: string; attributes?: { key?: string; value?: string }[] }[];
          }[];
          info?: string;
          gas_wanted?: string;
          gas_used?: string;
          tx?: { "@type"?: string };
          timestamp?: string;
          events?: { type?: string; attributes?: { key?: string; value?: string; index?: boolean }[] }[];
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/cosmos/tx/v1beta1/txs`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Service
   * @name ServiceGetBlockWithTxs
   * @request GET:/cosmos/tx/v1beta1/txs/block/{height}
   */
  serviceGetBlockWithTxs = (
    height: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetBlockWithTxsResponse, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/cosmos/tx/v1beta1/txs/block/${height}`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Service
   * @name ServiceGetTx
   * @request GET:/cosmos/tx/v1beta1/txs/{hash}
   */
  serviceGetTx = (hash: string, params: RequestParams = {}) =>
    this.request<GetTxResponse, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/cosmos/tx/v1beta1/txs/${hash}`,
      method: "GET",
      ...params,
    });
}
