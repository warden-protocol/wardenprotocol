import { ClipboardCopyText } from "@interchain-ui/react";
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
import { env } from "@/env";

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
    } = useChain(env.cosmoskitChainName);

    const ConnectButton = {
        [WalletStatus.Connected]: <ButtonConnected onClick={openView} />,
        [WalletStatus.Connecting]: <ButtonConnecting />,
        [WalletStatus.Disconnected]: <ButtonDisconnected onClick={connect} />,
        [WalletStatus.Error]: <ButtonError onClick={openView} />,
        [WalletStatus.Rejected]: <ButtonRejected onClick={connect} />,
        [WalletStatus.NotExist]: <ButtonNotExist onClick={openView} />,
    }[status] || <ButtonConnect onClick={connect} />;

    return (
        <div>
            <div>
                {/* {username ? <User name={username} /> : null}
                {address ? (
                    <ClipboardCopyText text={address} truncate="middle" />
                ) : null} */}

                {ConnectButton}

                {message &&
                [WalletStatus.Error, WalletStatus.Rejected].includes(status) ? (
                    <div className="text-sm pt-4 max-w-48">
                        <Warning text={`${wallet?.prettyName}: ${message}`} />
                    </div>
                ) : null}
            </div>
        </div>
    );
}
