import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ProgressStep from "@/components/ui/progress-step";
import { KeyRequest } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden/types/warden/warden/key";
import { KeyRequesterState } from "@/hooks/useRequestKey";
import { Button } from "./ui/button";

function progressForState(state: KeyRequesterState) {
	switch (state) {
		case KeyRequesterState.IDLE:
			return 0;
		case KeyRequesterState.BROADCAST_KEY_REQUEST:
			return 10;
		case KeyRequesterState.AWAITING_APPROVALS:
			return 20;
		case KeyRequesterState.WAITING_KEYCHAIN:
			return 50;
		case KeyRequesterState.KEY_FULFILLED:
			return 100;
		default:
			return 0;
	}
}

export default function KeyRequestDialog({
	state,
	error,
	reset,
}: {
	state: KeyRequesterState;
	error: string | undefined;
	keyRequest: KeyRequest | undefined;
	reset: () => void;
}) {
	return (
		<AlertDialog open={state !== "idle"}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>New key request</AlertDialogTitle>
					<AlertDialogDescription>
						<div className="flex flex-col gap-4">
							<ProgressStep
								loading={
									state ===
									KeyRequesterState.BROADCAST_KEY_REQUEST
								}
								done={
									progressForState(state) >
									progressForState(
										KeyRequesterState.BROADCAST_KEY_REQUEST
									)
								}
							>
								<span className="font-bold">Request key</span>
								<span>
									Use wallet to sign and broadcast a new key
									request for this space
								</span>
							</ProgressStep>

							<ProgressStep
								loading={
									state === KeyRequesterState.AWAITING_APPROVALS
								}
								done={
									progressForState(state) >
									progressForState(
										KeyRequesterState.AWAITING_APPROVALS
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
									state === KeyRequesterState.WAITING_KEYCHAIN
								}
								done={
									progressForState(state) >
									progressForState(
										KeyRequesterState.WAITING_KEYCHAIN
									)
								}
							>
								<span className="font-bold">
									Waiting for keychain
								</span>
								<span>
									The keychain will pick up your request,
									generate a new key, and send it back to
									Warden
								</span>
							</ProgressStep>

							<ProgressStep
								loading={false}
								done={
									progressForState(state) >=
									progressForState(
										KeyRequesterState.KEY_FULFILLED
									)
								}
							>
								<span className="font-bold">Key generated</span>
								<span>Your new key is ready to be used</span>
							</ProgressStep>

							{state === KeyRequesterState.ERROR && (
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

							{state === KeyRequesterState.KEY_FULFILLED && (
								<div className="flex flex-col gap-2 mt-4">
									<div className="flex flex-row gap-4">
										{/* <Link to={`/keys/${keyRequest?.id}`}>
											<Button size="sm">
												Open key #
												{keyRequest?.id.toString()}
											</Button>
										</Link> */}
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
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
			</AlertDialogContent>
		</AlertDialog>
	);
}
