import { MouseEventHandler } from "react";
// import { Button as UIButton, IconName } from "@interchain-ui/react";
import { Button as UIButton } from "@/components/ui/button";

export type ButtonProps = {
    text?: string;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type ConnectProps = Pick<ButtonProps, "text" | "onClick">;

function noop() {}

export function Button({ text, disabled, onClick = noop }: ButtonProps) {
    return (
        // <UIButton onClick={onClick} disabled={disabled} variant="outline">
        //     {text}
        // </UIButton>
        <UIButton
            variant="outline"
            disabled={disabled}
            size="sm"
            className="space-x-4 pl-2 border-foreground border-2 hover:border-accent w-full"
            onClick={onClick}
        >
            {/* <div className="flex flex-row">
                <div className="h-8 w-8 rounded-full border-2 border-background overflow-clip">
                    <img src="/logos/keplr.svg" className="object-fill" />
                </div>
                <div className="h-8 w-8 rounded-full border-2 border-background overflow-clip -ml-2">
                    <img
                        src="/logos/cosmostation-bg.svg"
                        className="object-fill"
                    />
                </div>
                <div className="h-8 w-8 rounded-full p-1 bg-white border-2 border-background overflow-clip -ml-2">
                    <img src="/logos/leap.svg" className="object-cover" />
                </div>
                <div className="h-8 w-8 rounded-full p-1 bg-white border-2 border-background overflow-clip -ml-2">
                    <img src="/logos/metamask.svg" className="object-cover" />
                </div>
            </div> */}
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
