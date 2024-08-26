import useRequestKey, { KeyRequesterState } from "@/hooks/useRequestKey";
import clsx from "clsx";
import { TEMP_KEY, useKeySettingsState } from "./state";
import Assets from "./assets";
import { KeyRequestStatus } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import { Button } from "@/components/ui/button";

const stateToPercent = (state: KeyRequesterState) => {
	switch (state) {
		case KeyRequesterState.IDLE:
		case KeyRequesterState.ERROR:
			return 0;
		case KeyRequesterState.BROADCAST_KEY_REQUEST:
			return 20;
		case KeyRequesterState.AWAITING_APPROVALS:
			return 30;
		case KeyRequesterState.WAITING_KEYCHAIN:
			return 50;
		case KeyRequesterState.KEY_FULFILLED:
			return 100;
	}
};

export default function KeyRequestStatusbar({
	className,
}: {
	className?: string;
}) {
	const { data: ks } = useKeySettingsState();
	const { error, keyRequest, reset, state } = useRequestKey();

	const settingId =
		keyRequest?.status === KeyRequestStatus.KEY_REQUEST_STATUS_FULFILLED
			? keyRequest.id.toString()
			: TEMP_KEY;

	const settings = ks?.settings[settingId];
	const themeIndex = settings?.themeIndex ?? 0;
	const percent = stateToPercent(state);

	return (
		<div
			className={clsx(
				"flex items-center rounded-xl mx-4",
				{
					"bg-fill-quaternary": state !== KeyRequesterState.ERROR,
					"bg-fill-negative-secondary":
						state === KeyRequesterState.ERROR,
				},
				className,
			)}
		>
			<Assets.themeSelector
				themeIndex={themeIndex}
				className="h-full w-auto"
			/>

			<p className="ml-4 font-display text-xl font-bold whitespace-nowrap">
				{state === KeyRequesterState.ERROR ? (
					<>
						Failed to create key{" "}
						<div className="text-base text-label-secondary">
							{error}
						</div>
					</>
				) : state === KeyRequesterState.KEY_FULFILLED ? (
					"Key created"
				) : (
					"Creating a new key"
				)}
			</p>

			{percent ? (
				<div className="mx-8 min-w-12 rounded bg-fill-quaternary h-[6px] overflow-hidden grow basis-auto">
					<div
						className={clsx("h-full bg-accent", {
							"w-1/5": percent <= 20,
							"w-1/3": percent > 20 && percent <= 40,
							"w-1/2": percent > 40 && percent <= 50,
							"w-full": percent === 100,
						})}
					></div>
				</div>
			) : null}

			<div className="ml-auto">
				{state === KeyRequesterState.ERROR ||
				state === KeyRequesterState.KEY_FULFILLED ? (
					<Button
						onClick={reset}
						className="my-4 rounded bg-fill-quaternary text-white h-10 px-5 hover:bg-fill-accent-secondary duration-200 font-semibold"
					>
						Close
					</Button>
				) : (
					<p className="font-display text-xs text-label-secondary whitespace-nowrap">
						{state === KeyRequesterState.BROADCAST_KEY_REQUEST
							? "New key request for this space..."
							: state === KeyRequesterState.AWAITING_APPROVALS
								? "Awaiting approvals"
								: state === KeyRequesterState.WAITING_KEYCHAIN
									? "Waiting for keychain"
									: ""}
					</p>
				)}
			</div>
		</div>
	);
}
