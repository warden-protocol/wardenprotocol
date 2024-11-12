import { Warning } from "./Warning";
import {
	ButtonConnect,
	ButtonConnecting,
	/* ButtonConnected,
	ButtonDisconnected,
	ButtonError,
	ButtonNotExist,
	ButtonRejected, */
} from "./Connect";
import { useConnectWallet } from "@web3-onboard/react";
import { useState } from "react";

export function Wallet() {
	const [{ connecting }, connect] = useConnectWallet();
	const [message, setMessage] = useState("");

	const ConnectButton = connecting ? <ButtonConnecting /> : <ButtonConnect onClick={async () => {
		setMessage("");

		try {
			const res = await connect();

			if (!res.length) {
				throw new Error("Connection refused")
			}
		} catch (e) {
			console.log("error", e)
			setMessage((e as Error)?.message)
		}
	}} />;

	return (
		<div>
			<div>
				{ConnectButton}
				{message /* &&
					[WalletStatus.Error, WalletStatus.Rejected].includes(status) */ ? (
						<div className="text-sm pt-4 max-w-48">
							<Warning text={`${message}`} />
						</div>
					) : null}
			</div>
		</div>
	);
}
