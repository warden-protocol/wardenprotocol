import {
	Box,
	ClipboardCopyText,
	Stack,
	useColorModeValue,
} from "@interchain-ui/react";
import { WalletStatus } from "cosmos-kit";
import { useChain } from "@cosmos-kit/react-lite";
import { User } from "./User";
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

export function Wallet() {
	const {
		chain,
		status,
		wallet,
		username,
		address,
		message,
		connect,
		openView,
	} = useChain("wardenprotocoltestnet");

	const ConnectButton = {
		[WalletStatus.Connected]: <ButtonConnected onClick={openView} />,
		[WalletStatus.Connecting]: <ButtonConnecting />,
		[WalletStatus.Disconnected]: <ButtonDisconnected onClick={connect} />,
		[WalletStatus.Error]: <ButtonError onClick={openView} />,
		[WalletStatus.Rejected]: <ButtonRejected onClick={connect} />,
		[WalletStatus.NotExist]: <ButtonNotExist onClick={openView} />,
	}[status] || <ButtonConnect onClick={connect} />;

	return (
		<Box py="$16">
			<Stack
				direction="vertical"
				attributes={{
					mx: "auto",
					px: "$8",
					py: "$15",
					maxWidth: "21rem",
					borderRadius: "$lg",
					justifyContent: "center",
					backgroundColor: useColorModeValue(
						"$white",
						"$blackAlpha500"
					),
					boxShadow: useColorModeValue(
						"0 0 2px #dfdfdf, 0 0 6px -2px #d3d3d3",
						"0 0 2px #363636, 0 0 8px -2px #4f4f4f"
					),
				}}
			>
				{username ? <User name={username} /> : null}
				{address ? (
					<ClipboardCopyText text={address} truncate="middle" />
				) : null}
				<Box
					my="$8"
					flex="1"
					width="full"
					display="flex"
					height="$16"
					overflow="hidden"
					justifyContent="center"
					px={{ mobile: "$8", tablet: "$10" }}
				>
					{ConnectButton}
				</Box>

				{message &&
				[WalletStatus.Error, WalletStatus.Rejected].includes(status) ? (
					<Warning text={`${wallet?.prettyName}: ${message}`} />
				) : null}
			</Stack>
		</Box>
	);
}
