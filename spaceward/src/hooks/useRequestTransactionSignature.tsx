import { useState } from "react";
import { useAddressContext } from "@/def-hooks/useAddressContext";
import { SignRequest, SignRequestStatus } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden/rest";
import { monitorTx } from "./keplr";
import { useToast } from "@/components/ui/use-toast";
import { useClient } from "./useClient";
import { TxMsgData } from "warden-protocol-wardenprotocol-client-ts/lib/cosmos.tx.v1beta1/types/cosmos/base/abci/v1beta1/abci";
import { Any } from "cosmjs-types/google/protobuf/any";
import { WalletType } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden/types/warden/warden/wallet";
import { decodeBase64 } from "ethers";
import { MsgActionCreated } from "warden-protocol-wardenprotocol-client-ts/lib/warden.intent/module";

export enum SignTransactionRequesterState {
  IDLE = "idle",
  BROADCAST_SIGNATURE_REQUEST = "broadcast_signature_request",
  AWAITING_APPROVALS = "awaiting_approvals",
  WAITING_KEYCHAIN = "waiting_keychain",
  SIGNATURE_FULFILLED = "signature_fulfilled",
  ERROR = "error",
}

export default function useRequestTransactionSignature() {
  const { address } = useAddressContext();
  const [state, setState] = useState<SignTransactionRequesterState>(SignTransactionRequesterState.IDLE);
  const [error, setError] = useState<string | undefined>(undefined);
  const [signatureRequest, setSignatureRequest] = useState<SignRequest | undefined>(undefined);
  const { toast } = useToast();
  const client = useClient();
  const sendMsgNewSignTransactionRequest = client.WardenWarden.tx.sendMsgNewSignTransactionRequest;
  const querySignatureRequestById = client.WardenWarden.query.querySignatureRequestById;

  

  return {
    state,
    signatureRequest,
    error,
    requestTransactionSignature: async (keyId: number, unsignedTx: Uint8Array, metadata?: Any) => {
      try {
        setState(SignTransactionRequesterState.BROADCAST_SIGNATURE_REQUEST);

        const res = await monitorTx(sendMsgNewSignTransactionRequest({
          value: {
            creator: address,
            keyId: keyId,
            walletType: WalletType.WALLET_TYPE_ETH,
            unsignedTransaction: unsignedTx,
            btl: 0,
            metadata,
          },
          fee: {
            amount: [],
            gas: "400000",
          },
        }), toast);

        setState(SignTransactionRequesterState.WAITING_KEYCHAIN);

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
        setState(SignTransactionRequesterState.AWAITING_APPROVALS);
        let signatureRequestId = null;
        while (true) {
          const res = await client.WardenIntent.query.queryActionById({ id: `${actionId}` });
          if (res.data.action?.status !== "ACTION_STATUS_PENDING" && res.data.action?.status !== "ACTION_STATUS_COMPLETED") {
            throw new Error(`action failed: ${JSON.stringify(res.data.action)}`);
          }

          signatureRequestId = (res.data.action?.result as { signature_request_id: string, id: string } | null)?.signature_request_id;
          if (signatureRequestId) {
            break;
          }

          await sleep(1000);
        }

        // wait for sign request to be processed by keychain
        setState(SignTransactionRequesterState.WAITING_KEYCHAIN);
        while (true) {
          const res = await querySignatureRequestById({ id: signatureRequestId });
          const signRequest = res.data.sign_request as Required<SignRequest>;
          setSignatureRequest(signRequest);
          if (signRequest?.status === SignRequestStatus.SIGN_REQUEST_STATUS_PENDING) {
            await sleep(1000);
            continue;
          }

          if (signRequest?.status === SignRequestStatus.SIGN_REQUEST_STATUS_FULFILLED && signRequest.signed_data) {
            setState(SignTransactionRequesterState.SIGNATURE_FULFILLED);
            return decodeBase64(signRequest.signed_data);
          }

          throw new Error(`sign request rejected with reason: ${signRequest?.reject_reason}`);
        }
      } catch (e) {
        setError(`${e}`);
        setState(SignTransactionRequesterState.ERROR);
      }
    },
    reset: () => {
      if (state === SignTransactionRequesterState.SIGNATURE_FULFILLED || state === SignTransactionRequesterState.ERROR || state === SignTransactionRequesterState.AWAITING_APPROVALS) {
        setState(SignTransactionRequesterState.IDLE);
      }
    },
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
