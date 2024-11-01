import { Warning } from "./Warning";
import {
	ButtonConnect,
	ButtonConnected,
	ButtonConnecting,
	ButtonDisconnected,
	ButtonError,
	ButtonNotExist,
	ButtonRejected,
} from "./Connect";
import { useConnectWallet } from "@web3-onboard/react";

export function Wallet() {
	const [{ wallet, connecting }, connect] = useConnectWallet();
	const message = "";

	const ConnectButton = connecting ? <ButtonConnecting /> : /*{
		[WalletStatus.Connected]: <ButtonConnected onClick={openView} />,
		[WalletStatus.Connecting]: <ButtonConnecting />,
		[WalletStatus.Disconnected]: <ButtonDisconnected onClick={connect} />,
		[WalletStatus.Error]: <ButtonError onClick={openView} />,
		[WalletStatus.Rejected]: <ButtonRejected onClick={connect} />,
		[WalletStatus.NotExist]: <ButtonNotExist onClick={openView} />,
	}[status] ||*/ <ButtonConnect onClick={async () => {
			const wallets = await connect()
			console.log(wallets)
		}} />;

	return (
		<div>
			<div>
				{ConnectButton}
				{message /* &&
					[WalletStatus.Error, WalletStatus.Rejected].includes(status) */ ? (
						<div className="text-sm pt-4 max-w-48">
							<Warning text={`${(wallet as any)?.prettyName}: ${message}`} />
						</div>
					) : null}
			</div>
		</div>
	);
}
