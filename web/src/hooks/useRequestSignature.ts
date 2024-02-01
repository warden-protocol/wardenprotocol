import { useKeplrAddress } from "@/keplr";
import { useBroadcaster } from "./keplr";
import { MsgNewSignatureRequest, MsgNewSignatureRequestResponse } from "@/proto/wardenprotocol/treasury/tx_pb";
import { TxMsgData } from "cosmjs-types/cosmos/base/abci/v1beta1/abci";
import { signatureRequestByID } from "@/client/treasury";
import { SignRequest, SignRequestStatus } from "@/proto/wardenprotocol/treasury/signature_pb";
import { useState } from "react";
import { protoInt64 } from "@bufbuild/protobuf";

export enum SignatureRequesterState {
  IDLE = "idle",
  BROADCAST_SIGNATURE_REQUEST = "broadcast_signature_request",
  WAITING_KEYCHAIN = "waiting_keychain",
  SIGNATURE_FULFILLED = "signature_fulfilled",
  ERROR = "error",
}

export default function useRequestSignature() {
  const addr = useKeplrAddress();
  const { broadcast } = useBroadcaster();
  const [state, setState] = useState<SignatureRequesterState>(SignatureRequesterState.IDLE);
  const [error, setError] = useState<string | undefined>(undefined);
  const [signatureRequest, setSignatureRequest] = useState<SignRequest | undefined>(undefined);

  return {
    state,
    signatureRequest,
    error,
    requestSignature: async (keyId: number | bigint, data: Uint8Array) => {
      try {
        setState(SignatureRequesterState.BROADCAST_SIGNATURE_REQUEST);

        const res = await broadcast([
          new MsgNewSignatureRequest({
            creator: addr,
            keyId: protoInt64.parse(keyId),
            dataForSigning: data,
          }),
        ]);

        setState(SignatureRequesterState.WAITING_KEYCHAIN);

        if (!res || !res.result) {
          throw new Error('failed to broadcast tx');
        }

        if (res.result?.tx_result.code) {
          throw new Error(`tx failed with code ${res.result?.tx_result.code}`);
        }

        // parse tx msg response
        const bytes = Uint8Array.from(atob(res.result.tx_result.data), c => c.charCodeAt(0));
        const msgData = TxMsgData.decode(bytes);
        const newSignatureRequestResponse = MsgNewSignatureRequestResponse.fromBinary(msgData.msgResponses[0].value);
        const signatureRequestId = newSignatureRequestResponse.id;

        // wait for sign request to be processed
        while (true) {
          const res = await signatureRequestByID(signatureRequestId);
          setSignatureRequest(res.signRequest);
          if (res?.signRequest?.status === SignRequestStatus.PENDING) {
            await sleep(1000);
            continue;
          }

          if (res.signRequest?.status === SignRequestStatus.FULFILLED && res.signRequest?.result?.case === "signedData") {
            setState(SignatureRequesterState.SIGNATURE_FULFILLED);
            return res.signRequest?.result.value;
          }

          throw new Error(`sign request rejected with reason: ${res.signRequest?.result.value}`);
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
