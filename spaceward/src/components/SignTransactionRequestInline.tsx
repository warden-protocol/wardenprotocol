import { SignTransactionRequesterState } from "@/hooks/useRequestTransactionSignature";
import ProgressStep from "./ui/progress-step";
import { Button } from "./ui/button";

function progressForState(state: SignTransactionRequesterState) {
    switch (state) {
        case SignTransactionRequesterState.IDLE:
            return 0;
        case SignTransactionRequesterState.BROADCAST_SIGNATURE_REQUEST:
            return 10;
        case SignTransactionRequesterState.AWAITING_APPROVALS:
            return 25;
        case SignTransactionRequesterState.WAITING_KEYCHAIN:
            return 50;
        case SignTransactionRequesterState.SIGNATURE_FULFILLED:
            return 100;
        default:
            return 0;
    }
}

export default function SignTransactionRequestInline({
    state,
    error,
    reset,
}: {
    state: SignTransactionRequesterState;
    error: string | undefined;
    reset: () => void;
}) {
    return (
        <div className="flex flex-col gap-4">
            <ProgressStep
                loading={
                    state ===
                    SignTransactionRequesterState.BROADCAST_SIGNATURE_REQUEST
                }
                done={
                    progressForState(state) >
                    progressForState(
                        SignTransactionRequesterState.BROADCAST_SIGNATURE_REQUEST
                    )
                }
            >
                <span className="font-bold text-sm">Request signature</span>
                {/* <span>
                    Use your wallet to sign and broadcast a new signature
                    request for your key
                </span> */}
            </ProgressStep>

            <ProgressStep
                loading={
                    state === SignTransactionRequesterState.AWAITING_APPROVALS
                }
                done={
                    progressForState(state) >
                    progressForState(
                        SignTransactionRequesterState.AWAITING_APPROVALS
                    )
                }
            >
                <span className="font-bold text-sm">Awaiting approvals</span>
                {/* <span>
                    Your intent is not yet satisfied, and is awaiting approvals
                    from other members
                </span> */}
            </ProgressStep>

            <ProgressStep
                loading={
                    state === SignTransactionRequesterState.WAITING_KEYCHAIN
                }
                done={
                    progressForState(state) >
                    progressForState(
                        SignTransactionRequesterState.WAITING_KEYCHAIN
                    )
                }
            >
                <span className="font-bold text-sm">Waiting for keychain</span>
                {/* <span>
                    The keychain will pick up your request, sign your data, and
                    send it back to Warden
                </span> */}
            </ProgressStep>

            <ProgressStep
                loading={false}
                done={
                    progressForState(state) >=
                    progressForState(
                        SignTransactionRequesterState.SIGNATURE_FULFILLED
                    )
                }
            >
                <span className="font-bold text-sm">Signed</span>
                {/* <span>Your signature has been generated</span> */}
            </ProgressStep>

            {state === SignTransactionRequesterState.ERROR && (
                <div className="flex flex-col gap-2 mt-4">
                    <span className="text-red-800">{error}</span>
                    <div className="flex flex-row gap-4">
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => reset()}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}

            {/* {state === SignTransactionRequesterState.SIGNATURE_FULFILLED && (
                <div className="flex flex-col gap-2 mt-4">
                    <div className="flex flex-row gap-4">
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => reset()}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )} */}
        </div>
    );
}
