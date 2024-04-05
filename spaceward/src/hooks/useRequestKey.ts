import { useState } from "react";
import { useClient } from "@/hooks/useClient";
import { monitorTx } from "@/hooks/keplr";
import { MsgNewKeyRequestResponse } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/module";
import { MsgActionCreated } from "warden-protocol-wardenprotocol-client-ts/lib/warden.intent/module";
import { KeyRequest, KeyRequestStatus } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/rest";
import { useToast } from "@/components/ui/use-toast";
import { TxMsgData } from "warden-protocol-wardenprotocol-client-ts/lib/cosmos.tx.v1beta1/types/cosmos/base/abci/v1beta1/abci";
import { KeyType } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/types/warden/warden/v1beta2/key";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export enum KeyRequesterState {
  IDLE = "idle",
  BROADCAST_KEY_REQUEST = "broadcast_key_request",
  AWAITING_APPROVALS = "awaiting_approvals",
  WAITING_KEYCHAIN = "waiting_keychain",
  KEY_FULFILLED = "key_fulfilled",
  ERROR = "error",
}

export default function useRequestKey() {
  const [state, setState] = useState<KeyRequesterState>(
    KeyRequesterState.IDLE
  );
  const [error, setError] = useState<string | undefined>(undefined);
  const [keyRequest, setKeyRequest] = useState<KeyRequest | undefined>(
    undefined
  );
  const { toast } = useToast();
  const client = useClient();

  const sendMsgNewKeyRequest = client.WardenWardenV1Beta2.tx.sendMsgNewKeyRequest;
  const queryKeyRequestsById = client.WardenWardenV1Beta2.query.queryKeyRequestById;
  
  return {
    state,
    keyRequest,
    error,
    requestKey: async (
      keychainId: string,
      addr: string,
      spaceId: string
    ) => {
      try {
        setState(KeyRequesterState.BROADCAST_KEY_REQUEST);

        const res = await monitorTx(sendMsgNewKeyRequest({
          value: {
            keychainId: keychainId,
            creator: addr,
            spaceId,
            keyType: KeyType.KEY_TYPE_ECDSA_SECP256K1,
            btl: 0,
          },
        }), toast);

        if (!res) {
          throw new Error("failed to broadcast tx");
        }

        if (res.tx_response?.code !== 0 || !res.tx_response.data) {
          throw new Error(`tx failed: ${JSON.stringify(res)}`);
        }

        // parse tx msg response
        const bytes = Uint8Array.from(res.tx_response.data.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []);
        const msgData = TxMsgData.decode(bytes);
        const actionCreated = MsgActionCreated.decode(msgData.msgResponses[0].value);
        const actionId = actionCreated.action?.id;

        // wait for action to be completed
        setState(KeyRequesterState.AWAITING_APPROVALS);
        let keyRequestId = null;
        while (true) {
          const res = await client.WardenIntent.query.queryActionById({ id: `${actionId}` });
          if (res.data.action?.status !== "ACTION_STATUS_PENDING" && res.data.action?.status !== "ACTION_STATUS_COMPLETED") {
            throw new Error(`action failed: ${JSON.stringify(res.data.action)}`);
          }

          keyRequestId = (res.data.action?.result as MsgNewKeyRequestResponse | null)?.id;
          if (keyRequestId) {
            break;
          }

          await sleep(1000);
        }

        // wait for request to be processed by keychain
        setState(KeyRequesterState.WAITING_KEYCHAIN);
        while (true) {
          const res = await queryKeyRequestsById({ id: `${keyRequestId}` });
          const keyRequest = res.data.key_request as Required<KeyRequest>;
          setKeyRequest(keyRequest);
          if (keyRequest?.status === KeyRequestStatus.KEY_REQUEST_STATUS_PENDING) {
            await sleep(1000);
            continue;
          }

          if (keyRequest?.status === KeyRequestStatus.KEY_REQUEST_STATUS_FULFILLED) {
            setState(KeyRequesterState.KEY_FULFILLED);
            return;
          }

          throw new Error(
            `key request rejected with reason: ${keyRequest?.reject_reason}`
          );
        }
      } catch (e) {
        setError(`${e}`);
        setState(KeyRequesterState.ERROR);
      }
    },
    reset: () => {
      if (
        state === KeyRequesterState.KEY_FULFILLED ||
        state === KeyRequesterState.ERROR ||
        state === KeyRequesterState.AWAITING_APPROVALS
      ) {
        setState(KeyRequesterState.IDLE);
      }
    },
  };
}

