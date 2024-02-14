import { useState } from "react";
import { useClient } from "@/hooks/useClient";
import { monitorTx } from "@/hooks/keplr";
import { MsgNewKeyRequestResponse } from "wardenprotocol-warden-client-ts/lib/warden.warden/module";
import { KeyRequest, KeyRequestStatus } from "wardenprotocol-warden-client-ts/lib/warden.warden/rest";
import { useToast } from "@/components/ui/use-toast";
import { TxMsgData } from "wardenprotocol-warden-client-ts/lib/cosmos.tx.v1beta1/types/cosmos/base/abci/v1beta1/abci";
import { KeyType } from "wardenprotocol-warden-client-ts/lib/warden.warden/types/warden/warden/key";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export enum KeyRequesterState {
  IDLE = "idle",
  BROADCAST_KEY_REQUEST = "broadcast_key_request",
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

  const sendMsgNewKeyRequest = client.WardenWarden.tx.sendMsgNewKeyRequest;
  const queryKeyRequestsById = client.WardenWarden.query.queryKeyRequestById;

  return {
    state,
    keyRequest,
    error,
    requestKey: async (
      keychainAddress: string,
      addr: string,
      spaceAddr: string
    ) => {
      try {
        setState(KeyRequesterState.BROADCAST_KEY_REQUEST);

        const res = await monitorTx(sendMsgNewKeyRequest({
          value: {
            keychainAddr: keychainAddress,
            creator: addr,
            spaceAddr,
            keyType: KeyType.KEY_TYPE_ECDSA_SECP256K1,
            btl: 0,
          },
        }), toast);

        setState(KeyRequesterState.WAITING_KEYCHAIN);

        if (!res) {
          throw new Error("failed to broadcast tx");
        }

        if (res.tx_response?.code !== 0 || !res.tx_response.data) {
          throw new Error(`tx failed: ${JSON.stringify(res)}`);
        }

        // parse tx msg response
        const bytes = Uint8Array.from(res.tx_response.data.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []);
        const msgData = TxMsgData.decode(bytes);
        const newKeyRequestResponse = MsgNewKeyRequestResponse.decode(msgData.msgResponses[0].value);
        const keyRequestId = newKeyRequestResponse.id;

        // wait for sign request to be processed
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
        state === KeyRequesterState.ERROR
      ) {
        setState(KeyRequesterState.IDLE);
      }
    },
  };
}

