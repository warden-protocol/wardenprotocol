import FaucetButton from "./faucet-button";
import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronsUpDown, Copy } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import AddressAvatar from "./address-avatar";
import { useAddressContext } from "@/def-hooks/useAddressContext";
import { useAsset } from "@/def-hooks/useAsset";
import { useDispatchWalletContext } from "../def-hooks/walletContext";
import { Wallet } from "./wallet";
import { useChain } from "@cosmos-kit/react";
import { env } from "@/env";

export function ConnectWallet() {
    const { wallet } = useChain(env.cosmoskitChainName);
    const { getActiveWallet } = useDispatchWalletContext();
    const { address } = useAddressContext();

    const { balance } = useAsset("uward");
    const ward = parseInt(balance?.amount || "0") / 10 ** 6;

    const activeWallet = getActiveWallet();

    return (
        <Popover>
            <PopoverTrigger asChild>
                {address ? (
                    <Button
                        asChild
                        variant="outline"
                        role="combobox"
                        className="justify-between cursor-pointer bg-card h-16 pl-0 md:pl-6 rounded-none gap-4 min-w-0 hover:bg-card hover:text-foreground border-0 pr-0"
                    >
                        <div>
                            <div className="relative">
                                <AddressAvatar seed={address} disableTooltip />
                                <div className="absolute h-5 w-5 rounded-full right-0 bottom-0 overflow-clip bg-white ring-2 ring-background">
                                    <img
                                        src={
                                            wallet?.logo?.major
                                                ? wallet?.logo.major
                                                : wallet?.logo
                                        }
                                        alt={wallet?.prettyName}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="md:flex flex-col text-left text-xs hidden">
                                <span className="block text-base">
                                    {"..." + address.slice(-8)}
                                </span>
                                <span className="block text-xs text-muted-foreground">
                                    {ward.toFixed(2)} WARD
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 hidden md:block" />
                        </div>
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        role="combobox"
                        className="justify-between cursor-pointer h-16 border-t-0 border-b-0 rounded-none gap-4 min-w-0 hover:bg-muted hover:border-b-accent hover:border-b-2"
                    >
                        <div>
                            <AlertCircle className="ml-2 h-8 w-8 shrink-0" />
                        </div>
                        <div className="flex flex-col text-left text-xs">
                            <span>Not Connected</span>
                            <span>Connect Wallet</span>
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                )}
            </PopoverTrigger>

            {address ? (
                <PopoverContent className="w-80 rounded-t-none border-t-0 -translate-y-1 bg-card">
                    <div className="grid gap-4">
                        <div className="flex flex-row text-left text-xs gap-2 justify-between items-center">
                            <span className="block text-base">
                                {address.slice(0, 12) +
                                    "..." +
                                    address.slice(-12)}
                            </span>
                            <span>
                                <Copy
                                    className="h-4 w-4 cursor-pointer"
                                    onClick={() =>
                                        navigator.clipboard.writeText(address)
                                    }
                                />
                            </span>
                        </div>
                        <div className="border rounded-lg">
                            <div className="px-6 py-3 text-sm border-b flex justify-between">
                                <span>Wallet</span>
                                <span>{activeWallet?.name || ""}</span>
                            </div>
                            <div className="px-6 py-3 text-sm flex justify-between">
                                <span>Balance</span>
                                <span>{ward.toFixed(2)} WARD</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 flex-grow">
                            <FaucetButton />
                            <Wallet />
                        </div>
                    </div>
                </PopoverContent>
            ) : (
                <PopoverContent className="w-80 rounded-t-none border-t-0 -translate-y-1 bg-card">
                    <div className="flex flex-col gap-4">
                        <Wallet />
                    </div>
                </PopoverContent>
            )}
        </Popover>
    );
}
