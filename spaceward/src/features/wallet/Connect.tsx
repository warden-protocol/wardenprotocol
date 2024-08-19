import { MouseEventHandler } from "react";
import { Button as UIButton } from "@/components/ui/button";
import { WalletIcon } from "lucide-react";

export type ButtonProps = {
	text?: string;
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type ConnectProps = Pick<ButtonProps, "text" | "onClick">;

function noop() {
	return false;
}

export function Button({ text, disabled, onClick = noop }: ButtonProps) {
	return (
		<UIButton
			variant="outline"
			disabled={disabled}
			size="sm"
			className="space-x-4 px-6 rounded-lg h-12 bg-foreground text-background text-xl w-full"
			onClick={onClick}
		>
			<WalletIcon strokeWidth={1} className="h-6 w-6" />
			<span>{text}</span>
		</UIButton>
	);
}

export const ButtonConnect = ({
	text = "Connect",
	onClick = noop,
}: ConnectProps) => <Button text={text} onClick={onClick} />;

export const ButtonConnected = ({
	text = "My Wallet",
	onClick = noop,
}: ConnectProps) => <Button text={text} onClick={onClick} />;

export const ButtonDisconnected = ({
	text = "Connect",
	onClick = noop,
}: ConnectProps) => <Button text={text} onClick={onClick} />;

export const ButtonConnecting = ({ text = "Connecting ..." }: ConnectProps) => (
	<Button text={text} />
);

export const ButtonRejected = ({
	text = "Reconnect",
	onClick = noop,
}: ConnectProps) => <Button text={text} onClick={onClick} />;

export const ButtonError = ({
	text = "Change Wallet",
	onClick = noop,
}: ConnectProps) => <Button text={text} onClick={onClick} />;

export const ButtonNotExist = ({
	text = "Install Wallet",
	onClick = noop,
}: ConnectProps) => <Button text={text} onClick={onClick} />;
