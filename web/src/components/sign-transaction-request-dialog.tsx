import { SignTransactionRequesterState } from "@/hooks/useRequestTransactionSignature";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import ProgressStep from "./ui/progress-step";
import { Button } from "./ui/button";

function progressForState(state: SignTransactionRequesterState) {
  switch (state) {
    case SignTransactionRequesterState.IDLE:
      return 0;
    case SignTransactionRequesterState.BROADCAST_SIGNATURE_REQUEST:
      return 10;
    case SignTransactionRequesterState.WAITING_KEYRING:
      return 50;
    case SignTransactionRequesterState.SIGNATURE_FULFILLED:
      return 100;
    default:
      return 0;
  }
}

export default function SignTransactionRequestDialog({ state, error, reset }: { state: SignTransactionRequesterState, error: string | undefined, reset: () => void }) {
  return (
    <AlertDialog open={state !== "idle"}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>New sign transaction request</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col gap-4">
              <ProgressStep loading={state === SignTransactionRequesterState.BROADCAST_SIGNATURE_REQUEST} done={progressForState(state) > progressForState(SignTransactionRequesterState.BROADCAST_SIGNATURE_REQUEST)}>
                <span className="font-bold">Request signature</span>
                <span>Use Keplr to sign and broadcast a new signature request for your key</span>
              </ProgressStep>

              <ProgressStep loading={state === SignTransactionRequesterState.WAITING_KEYRING} done={progressForState(state) > progressForState(SignTransactionRequesterState.WAITING_KEYRING)}>
                <span className="font-bold">Waiting for keyring</span>
                <span>The keyring will pick up your request, sign your data, and send it back to Fusion</span>
              </ProgressStep>

              <ProgressStep loading={false} done={progressForState(state) >= progressForState(SignTransactionRequesterState.SIGNATURE_FULFILLED)}>
                <span className="font-bold">Signed</span>
                <span>Your signature has been generated</span>
              </ProgressStep>

              {
                state === SignTransactionRequesterState.ERROR && (
                  <div className="flex flex-col gap-2 mt-4">
                    <span className="text-red-800">{error}</span>
                    <div className="flex flex-row gap-4">
                      <Button size="sm" variant="secondary" onClick={() => reset()}>
                        Close
                      </Button>
                    </div>
                  </div>
                )
              }

              {
                state === SignTransactionRequesterState.SIGNATURE_FULFILLED && (
                  <div className="flex flex-col gap-2 mt-4">
                    <div className="flex flex-row gap-4">
                      <Button size="sm" variant="secondary" onClick={() => reset()}>
                        Close
                      </Button>
                    </div>
                  </div>
                )
              }
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}
