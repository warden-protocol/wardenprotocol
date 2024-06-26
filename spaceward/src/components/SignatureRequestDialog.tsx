import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "./ui/alert-dialog";
import ProgressStep from "./ui/progress-step";
import { Button } from "./ui/button";
import { SignatureRequesterState } from "@/hooks/useRequestSignature";

function progressForState(state: SignatureRequesterState) {
	switch (state) {
		case SignatureRequesterState.IDLE:
			return 0;
		case SignatureRequesterState.BROADCAST_SIGNATURE_REQUEST:
			return 10;
		case SignatureRequesterState.AWAITING_APPROVALS:
			return 25;
		case SignatureRequesterState.WAITING_KEYCHAIN:
			return 50;
		case SignatureRequesterState.SIGNATURE_FULFILLED:
			return 100;
		default:
			return 0;
	}
}

export default function SignatureRequestDialog({
	pending,
	state,
	step,
	error,
	reset,
}: {
	pending?: boolean;
	step?: {
		title: string;
		description: string;
	};
	state: SignatureRequesterState;
	error: string | undefined;
	reset: () => void;
}) {
	return (
		<AlertDialog open={state !== "idle"}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						New sign transaction request
					</AlertDialogTitle>
					<AlertDialogDescription>
						<div className="flex flex-col gap-4">
							<ProgressStep
								loading={
									state ===
									SignatureRequesterState.BROADCAST_SIGNATURE_REQUEST
								}
								done={
									progressForState(state) >
									progressForState(
										SignatureRequesterState.BROADCAST_SIGNATURE_REQUEST,
									)
								}
							>
								<span className="font-bold">
									Request signature
								</span>
								<span>
									Use your wallet to sign and broadcast a new
									signature request for your key
								</span>
							</ProgressStep>

							<ProgressStep
								loading={
									state ===
									SignatureRequesterState.AWAITING_APPROVALS
								}
								done={
									progressForState(state) >
									progressForState(
										SignatureRequesterState.AWAITING_APPROVALS,
									)
								}
							>
								<span className="font-bold">
									Awaiting approvals
								</span>
								<span>
									Your intent is not yet satisfied, and is
									awaiting approvals from other members
								</span>
							</ProgressStep>

							<ProgressStep
								loading={
									state ===
									SignatureRequesterState.WAITING_KEYCHAIN
								}
								done={
									progressForState(state) >
									progressForState(
										SignatureRequesterState.WAITING_KEYCHAIN,
									)
								}
							>
								<span className="font-bold">
									Waiting for keychain
								</span>
								<span>
									The keychain will pick up your request, sign
									your data, and send it back to Warden
								</span>
							</ProgressStep>

							<ProgressStep
								loading={false}
								done={
									progressForState(state) >=
									progressForState(
										SignatureRequesterState.SIGNATURE_FULFILLED,
									)
								}
							>
								<span className="font-bold">Signed</span>
								<span>Your signature has been generated</span>
							</ProgressStep>

							{step ? (
								<ProgressStep
									loading={
										Boolean(pending) &&
										progressForState(state) >=
											progressForState(
												SignatureRequesterState.SIGNATURE_FULFILLED,
											)
									}
									done={!pending}
								>
									<span className="font-bold">
										{step.title}
									</span>
									<span>{step.description}</span>
								</ProgressStep>
							) : null}

							{state === SignatureRequesterState.ERROR && (
								<div className="flex flex-col gap-2 mt-4">
									<span className="text-red-800">
										{error}
									</span>
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

							{(step ? !pending : true) &&
							state ===
								SignatureRequesterState.SIGNATURE_FULFILLED ? (
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
							) : null}
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
			</AlertDialogContent>
		</AlertDialog>
	);
}
