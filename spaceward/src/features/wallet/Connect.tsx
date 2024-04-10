import { MouseEventHandler } from "react";
import { Button as UIButton } from "@/components/ui/button";

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
            className="space-x-4 pl-2 border-foreground border-2 hover:border-accent w-full"
            onClick={onClick}
        >
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
