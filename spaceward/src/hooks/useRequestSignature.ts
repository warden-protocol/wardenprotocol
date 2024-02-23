import { TxMsgData } from "cosmjs-types/cosmos/base/abci/v1beta1/abci";
import { useState } from "react";
import { useAddressContext } from "@/def-hooks/useAddressContext";
import { useToast } from "@/components/ui/use-toast";
import { useClient } from "./useClient";
import { monitorTx } from "./keplr";
import { MsgNewSignatureRequestResponse } from "wardenprotocol-warden-client-ts/lib/warden.warden/module";
import { SignRequest, SignRequestStatus  } from "wardenprotocol-warden-client-ts/lib/warden.warden/rest";

export enum SignatureRequesterState {
  IDLE = "idle",
  BROADCAST_SIGNATURE_REQUEST = "broadcast_signature_request",
  WAITING_KEYCHAIN = "waiting_keychain",
  SIGNATURE_FULFILLED = "signature_fulfilled",
  ERROR = "error",
}

export default function useRequestSignature() {
  const { address } = useAddressContext();
  const [state, setState] = useState<SignatureRequesterState>(SignatureRequesterState.IDLE);
  const [error, setError] = useState<string | undefined>(undefined);
  const [signatureRequest, setSignatureRequest] = useState<SignRequest | undefined>(undefined);
  const { toast } = useToast();
  const client = useClient();
  const sendMsgNewSignatureRequest = client.WardenWarden.tx.sendMsgNewSignatureRequest;
  const querySignatureRequestById = client.WardenWarden.query.querySignatureRequestById;

  return {
    state,
    signatureRequest,
    error,
    requestSignature: async (keyId: number, data: Uint8Array) => {
      try {
        setState(SignatureRequesterState.BROADCAST_SIGNATURE_REQUEST);

        const res = await monitorTx(sendMsgNewSignatureRequest({
          value: {
            creator: address,
            keyId: keyId,
            dataForSigning: data,
            btl: 0,
          }
        }), toast);

        setState(SignatureRequesterState.WAITING_KEYCHAIN);

        if (!res) {
          throw new Error("failed to broadcast tx");
        }

        if (res.tx_response?.code !== 0 || !res.tx_response.data) {
          throw new Error(`tx failed: ${JSON.stringify(res)}`);
        }

        // parse tx msg response
        const bytes = Uint8Array.from(res.tx_response.data.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []);
        const msgData = TxMsgData.decode(bytes);
        const signatureRequest = MsgNewSignatureRequestResponse.decode(msgData.msgResponses[0].value);

        // wait for sign request to be processed
        while (true) {
          const res = await querySignatureRequestById({ id: signatureRequest.id.toString() });
          const signRequest = res?.data.sign_request as Required<SignRequest>;
          setSignatureRequest(signRequest);
          if (signRequest?.status === SignRequestStatus.SIGN_REQUEST_STATUS_PENDING) {
            await sleep(1000);
            continue;
          }

          if (signRequest?.status === SignRequestStatus.SIGN_REQUEST_STATUS_FULFILLED && signRequest.signed_data) {
            setState(SignatureRequesterState.SIGNATURE_FULFILLED);
            return signRequest.signed_data;
          }

          throw new Error(`sign request rejected with reason: ${signRequest?.reject_reason}`);
        }
      } catch (e) {
        setError(`${e}`);
        setState(SignatureRequesterState.ERROR);
      }
    },
    reset: () => {
      if (state === SignatureRequesterState.SIGNATURE_FULFILLED || state === SignatureRequesterState.ERROR) {
        setState(SignatureRequesterState.IDLE);
      }
    },
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
