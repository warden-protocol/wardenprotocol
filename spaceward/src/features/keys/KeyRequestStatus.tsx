import useRequestKey from "@/hooks/useRequestKey";
import clsx from "clsx";
import { TEMP_KEY, useKeySettingsState } from "./state";
import Assets from "./assets";
import { KeyRequestStatus } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";

export default function KeyRequestStatusbar({ className }: { className?: string }) {
	const { data: ks } = useKeySettingsState();
	const { error, keyRequest, reset, state } = useRequestKey();

	const settingId =
		keyRequest?.status === KeyRequestStatus.KEY_REQUEST_STATUS_FULFILLED
			? keyRequest.id.toString()
			: TEMP_KEY;

	const settings = ks?.settings[settingId];
	const themeIndex = settings?.themeIndex ?? 0;

	return <div className={clsx(className, "flex items-center")}>
		<Assets.themeSelector themeIndex={themeIndex} />
	</div>;
}
