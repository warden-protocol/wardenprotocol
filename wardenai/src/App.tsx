import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import clsx from "clsx";
import { Wallet } from "@/components/wallet";
import { useChain } from "@cosmos-kit/react";
import { env } from "@/env";
import logo from "@/assets/logo.svg";
import useRequestInference from "@/hooks/useRequestInference";
import { useResponse } from "@/hooks/useResponse";

// Define the interface for the token object
interface Token {
    title: string;
    symbol: string;
    image: string;
    price?: number;
    predicted_price?: number;
    change?: number;
}

interface Validator {
    title: string;
}

// Function to generate a random price between 0 and 10
function getRandomPrice(predictedPrice: number) {
    const multiplier =
        predictedPrice < 0.9
            ? Math.random() * 0
            : predictedPrice > 1000
            ? Math.random() * 1000
            : Math.random() * 1;
    return (predictedPrice - multiplier).toFixed(2); // Fix to 2 decimal places for a currency-like format
}

// Function to calculate the percentage change between price and predicted price
function getPercentageChange(price: number, predictedPrice: number): number {
    return parseFloat((((predictedPrice - price) / price) * 100).toFixed(2)); // Fix to 2 decimal places for percentage
}

const tokens: Token[] = [
    {
        title: "1inch",
        symbol: "1INCH",
        image: "https://cryptologos.cc/logos/1inch-1inch-logo.svg",
    },
    {
        title: "Aave",
        symbol: "AAVE",
        image: "https://cryptologos.cc/logos/aave-aave-logo.svg",
    },
    {
        title: "Algorand",
        symbol: "ALGO",
        image: "https://cryptologos.cc/logos/algorand-algo-logo.svg",
    },
    {
        title: "ApeCoin",
        symbol: "APE",
        image: "https://cryptologos.cc/logos/apecoin-ape-ape-logo.svg?v=034",
    },
    // {
    //     title: "Arweave",
    //     symbol: "AR",
    //     image: "https://cryptologos.cc/logos/arweave-ar-logo.svg",
    // },
    {
        title: "avalanche",
        symbol: "AVAX",
        image: "https://cryptologos.cc/logos/avalanche-avax-logo.svg",
    },
    // {
    //     title: "Axie Infinity",
    //     symbol: "AXS",
    //     image: "https://cryptologos.cc/logos/axie-infinity-axs-logo.svg",
    // },
    // {
    //     title: "Basic Attention Token",
    //     symbol: "BAT",
    //     image: "https://cryptologos.cc/logos/basic-attention-token-bat-logo.svg",
    // },
    // {
    //     title: "Binance USD",
    //     symbol: "BUSD",
    //     image: "https://cryptologos.cc/logos/binance-usd-busd-logo.svg",
    // },
    {
        title: "bitcoin",
        symbol: "BTC",
        image: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg",
    },
    // {
    //     title: "Bitcoin Cash",
    //     symbol: "BCH",
    //     image: "https://cryptologos.cc/logos/bitcoin-cash-bch-logo.svg",
    // },
    // {
    //     title: "Bitcoin Gold",
    //     symbol: "BTG",
    //     image: "https://cryptologos.cc/logos/bitcoin-gold-btg-logo.svg",
    // },
    // {
    //     title: "Bitcoin SV",
    //     symbol: "BSV",
    //     image: "https://cryptologos.cc/logos/bitcoin-sv-bsv-logo.svg",
    // },
    // {
    //     title: "BitTorrent (New)",
    //     symbol: "BTT",
    //     image: "https://cryptologos.cc/logos/bittorrent-btt-logo.svg",
    // },
    {
        title: "BNB",
        symbol: "BNB",
        image: "https://cryptologos.cc/logos/binance-coin-bnb-logo.svg",
    },
    // {
    //     title: "Celo",
    //     symbol: "CELO",
    //     image: "https://cryptologos.cc/logos/celo-celo-logo.svg",
    // },
    // {
    //     title: "Celsius",
    //     symbol: "CEL",
    //     image: "https://cryptologos.cc/logos/celsius-cel-logo.svg",
    // },
    {
        title: "chainlink",
        symbol: "LINK",
        image: "https://cryptologos.cc/logos/chainlink-link-logo.svg",
    },
    // {
    //     title: "Convex Finance",
    //     symbol: "CVX",
    //     image: "https://cryptologos.cc/logos/convex-finance-cvx-logo.svg",
    // },
    {
        title: "Cronos",
        symbol: "CRO",
        image: "https://cryptologos.cc/logos/cronos-cro-logo.svg",
    },
    // {
    //     title: "Curve DAO Token",
    //     symbol: "CRV",
    //     image: "https://cryptologos.cc/logos/curve-dao-token-crv-logo.svg",
    // },
    {
        title: "dai",
        symbol: "DAI",
        image: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg",
    },
    // {
    //     title: "Dash",
    //     symbol: "DASH",
    //     image: "https://cryptologos.cc/logos/dash-dash-logo.svg",
    // },
    // {
    //     title: "Decentraland",
    //     symbol: "MANA",
    //     image: "https://cryptologos.cc/logos/decentraland-mana-logo.svg",
    // },
    // {
    //     title: "Decred",
    //     symbol: "DCR",
    //     image: "https://cryptologos.cc/logos/decred-dcr-logo.svg",
    // },
    {
        title: "dogecoin",
        symbol: "DOGE",
        image: "https://cryptologos.cc/logos/dogecoin-doge-logo.svg",
    },
    // {
    //     title: "Elrond",
    //     symbol: "EGLD",
    //     image: "https://cryptologos.cc/logos/elrond-egld-logo.svg",
    // },
    // {
    //     title: "eCash",
    //     symbol: "XEC",
    //     image: "https://cryptologos.cc/logos/ecash-xec-logo.svg",
    // },
    // {
    //     title: "Enjin Coin",
    //     symbol: "ENJ",
    //     image: "https://cryptologos.cc/logos/enjin-coin-enj-logo.svg",
    // },
    {
        title: "EOS",
        symbol: "EOS",
        image: "https://cryptologos.cc/logos/eos-eos-logo.svg",
    },
    {
        title: "ethereum",
        symbol: "ETH",
        image: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
    },
    // {
    //     title: "Ethereum Classic",
    //     symbol: "ETC",
    //     image: "https://cryptologos.cc/logos/ethereum-classic-etc-logo.svg",
    // },
    {
        title: "Fantom",
        symbol: "FTM",
        image: "https://cryptologos.cc/logos/fantom-ftm-logo.svg",
    },
    // {
    //     title: "Fei USD",
    //     symbol: "FEI",
    //     image: "https://cryptologos.cc/logos/fei-usd-fei-logo.svg",
    // },
    {
        title: "Filecoin",
        symbol: "FIL",
        image: "https://cryptologos.cc/logos/filecoin-fil-logo.svg",
    },
    // {
    //     title: "Flow",
    //     symbol: "FLOW",
    //     image: "https://cryptologos.cc/logos/flow-flow-logo.svg",
    // },
    // {
    //     title: "FTX Token",
    //     symbol: "FTT",
    //     image: "https://cryptologos.cc/logos/ftx-token-ftt-logo.svg",
    // },
    {
        title: "Gala",
        symbol: "GALA",
        image: "https://cryptologos.cc/logos/gala-gala-logo.svg",
    },
    {
        title: "Gnosis",
        symbol: "GNO",
        image: "https://cryptologos.cc/logos/gnosis-gno-logo.svg",
    },
    // {
    //     title: "Helium",
    //     symbol: "HNT",
    //     image: "https://cryptologos.cc/logos/helium-hnt-logo.svg",
    // },
    // {
    //     title: "Hedera",
    //     symbol: "HBAR",
    //     image: "https://cryptologos.cc/logos/hedera-hbar-logo.svg",
    // },
    // {
    //     title: "Holo",
    //     symbol: "HOT",
    //     image: "https://cryptologos.cc/logos/holocoin-hot-logo.svg",
    // },
    // {
    //     title: "Huobi Token",
    //     symbol: "HT",
    //     image: "https://cryptologos.cc/logos/huobi-token-ht-logo.svg",
    // },
    // {
    //     title: "Internet Computer",
    //     symbol: "ICP",
    //     image: "https://cryptologos.cc/logos/internet-computer-icp-logo.svg",
    // },
    // {
    //     title: "IOTA",
    //     symbol: "MIOTA",
    //     image: "https://cryptologos.cc/logos/iota-miota-logo.svg",
    // },
    {
        title: "Kava",
        symbol: "KAVA",
        image: "https://cryptologos.cc/logos/kava-kava-logo.svg",
    },
    {
        title: "Klaytn",
        symbol: "KLAY",
        image: "https://cryptologos.cc/logos/klaytn-klay-logo.svg",
    },
    // {
    //     title: "KuCoin Token",
    //     symbol: "KCS",
    //     image: "https://cryptologos.cc/logos/kucoin-token-kcs-logo.svg",
    // },
    // {
    //     title: "Kusama",
    //     symbol: "KSM",
    //     image: "https://cryptologos.cc/logos/kusama-ksm-logo.svg",
    // },
    // {
    //     title: "Lido DAO",
    //     symbol: "LDO",
    //     image: "https://cryptologos.cc/logos/lido-dao-ldo-logo.svg",
    // },
    {
        title: "litecoin",
        symbol: "LTC",
        image: "https://cryptologos.cc/logos/litecoin-ltc-logo.svg",
    },
    // {
    //     title: "Loopring",
    //     symbol: "LRC",
    //     image: "https://cryptologos.cc/logos/loopring-lrc-logo.svg",
    // },
    {
        title: "Maker",
        symbol: "MKR",
        image: "https://cryptologos.cc/logos/maker-mkr-logo.svg",
    },
    {
        title: "Mina",
        symbol: "MINA",
        image: "https://cryptologos.cc/logos/mina-mina-logo.svg",
    },
    {
        title: "monero",
        symbol: "XMR",
        image: "https://cryptologos.cc/logos/monero-xmr-logo.svg",
    },
    {
        title: "NEM",
        symbol: "XEM",
        image: "https://cryptologos.cc/logos/nem-xem-logo.svg",
    },
    {
        title: "Neo",
        symbol: "NEO",
        image: "https://cryptologos.cc/logos/neo-neo-logo.svg",
    },
    // {
    //     title: "Neutrino USD",
    //     symbol: "USDN",
    //     image: "https://cryptologos.cc/logos/neutrino-usd-usdn-logo.svg",
    // },
    {
        title: "Nexo",
        symbol: "NEXO",
        image: "https://cryptologos.cc/logos/nexo-nexo-logo.svg",
    },
    {
        title: "OKB",
        symbol: "OKB",
        image: "https://cryptologos.cc/logos/okb-okb-logo.svg",
    },
    {
        title: "PancakeSwap",
        symbol: "CAKE",
        image: "https://cryptologos.cc/logos/pancakeswap-cake-logo.svg",
    },
    // {
    //     title: "Pax Dollar",
    //     symbol: "USDP",
    //     image: "https://cryptologos.cc/logos/pax-dollar-usdp-logo.svg",
    // },
    // {
    //     title: "PAX Gold",
    //     symbol: "PAXG",
    //     image: "https://cryptologos.cc/logos/pax-gold-paxg-logo.svg",
    // },
    {
        title: "polkadot",
        symbol: "DOT",
        image: "https://cryptologos.cc/logos/polkadot-new-dot-logo.svg",
    },
    {
        title: "polygon",
        symbol: "MATIC",
        image: "https://cryptologos.cc/logos/polygon-matic-logo.svg",
    },
    // {
    //     title: "Qtum",
    //     symbol: "QTUM",
    //     image: "https://cryptologos.cc/logos/qtum-qtum-logo.svg",
    // },
    {
        title: "Quant",
        symbol: "QNT",
        image: "https://cryptologos.cc/logos/quant-qnt-logo.svg",
    },
    // {
    //     title: "Shiba Inu",
    //     symbol: "SHIB",
    //     image: "https://cryptologos.cc/logos/shiba-inu-shib-logo.svg",
    // },
    {
        title: "Stacks",
        symbol: "STX",
        image: "https://cryptologos.cc/logos/stacks-stx-logo.svg",
    },
    // {
    //     title: "STEPN",
    //     symbol: "GMT",
    //     image: "https://cryptologos.cc/logos/stepn-gmt-logo.svg",
    // },
    {
        title: "stellar",
        symbol: "XLM",
        image: "https://cryptologos.cc/logos/stellar-xlm-logo.svg",
    },
    // {
    //     title: "Synthetix",
    //     symbol: "SNX",
    //     image: "https://cryptologos.cc/logos/synthetix-snx-logo.svg",
    // },
    {
        title: "Tezos",
        symbol: "XTZ",
        image: "https://cryptologos.cc/logos/tezos-xtz-logo.svg",
    },
    // {
    //     title: "The Sandbox",
    //     symbol: "SAND",
    //     image: "https://cryptologos.cc/logos/the-sandbox-sand-logo.svg",
    // },
    // {
    //     title: "Theta Network",
    //     symbol: "THETA",
    //     image: "https://cryptologos.cc/logos/theta-theta-logo.svg",
    // },
    // {
    //     title: "THORChain",
    //     symbol: "RUNE",
    //     image: "https://cryptologos.cc/logos/thorchain-rune-logo.svg",
    // },
    // {
    //     title: "TrueUSD",
    //     symbol: "TUSD",
    //     image: "https://cryptologos.cc/logos/trueusd-tusd-logo.svg",
    // },
    // {
    //     title: "Trust Wallet Token",
    //     symbol: "TWT",
    //     image: "https://cryptologos.cc/logos/trust-wallet-token-twt-logo.svg",
    // },
    {
        title: "uniswap",
        symbol: "UNI",
        image: "https://cryptologos.cc/logos/uniswap-uni-logo.svg",
    },
    // {
    //     title: "Unus Sed Leo",
    //     symbol: "LEO",
    //     image: "https://cryptologos.cc/logos/unus-sed-leo-leo-logo.svg",
    // },
    // {
    //     title: "USD Coin",
    //     symbol: "USDC",
    //     image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg",
    // },
    // {
    //     title: "VeChain",
    //     symbol: "VET",
    //     image: "https://cryptologos.cc/logos/vechain-vet-logo.svg",
    // },
    // {
    //     title: "Waves",
    //     symbol: "WAVES",
    //     image: "https://cryptologos.cc/logos/waves-waves-logo.svg",
    // },
    // {
    //     title: "Wrapped Bitcoin",
    //     symbol: "WBTC",
    //     image: "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.svg",
    // },
    {
        title: "xrp",
        symbol: "XRP",
        image: "https://cryptologos.cc/logos/xrp-xrp-logo.svg",
    },
    // {
    //     title: "Zcash",
    //     symbol: "ZEC",
    //     image: "https://cryptologos.cc/logos/zcash-zec-logo.svg",
    // },
    // {
    //     title: "Zilliqa",
    //     symbol: "ZIL",
    //     image: "https://cryptologos.cc/logos/zilliqa-zil-logo.svg",
    // },
];

const validators: Validator[] = [
    { title: "test 1" },
    { title: "test 2" },
    { title: "test 3" },
    { title: "test 4" },
    { title: "test 5" },
    { title: "test 6" },
    { title: "test 7" },
    { title: "test 8" },
    { title: "test 9" },
    { title: "test 10" },
    { title: "test 11" },
    { title: "test 12" },
    { title: "test 13" },
    { title: "test 14" },
    { title: "test 15" },
    { title: "test 16" },
    { title: "test 17" },
    { title: "test 18" },
    { title: "test 19" },
    { title: "test 20" },
    { title: "test 21" },
    { title: "test 22" },
    { title: "test 23" },
    { title: "test 24" },
    { title: "test 25" },
    { title: "test 26" },
    { title: "test 27" },
    { title: "test 28" },
    { title: "test 29" },
    { title: "test 30" },
    { title: "test 31" },
    { title: "test 32" },
    { title: "test 33" },
    { title: "test 34" },
    { title: "test 35" },
    { title: "test 36" },
    { title: "test 37" },
    { title: "test 38" },
    { title: "test 39" },
    { title: "test 40" },
    { title: "test 41" },
    { title: "test 42" },
    { title: "test 43" },
    { title: "test 44" },
    { title: "test 45" },
    { title: "test 46" },
    { title: "test 47" },
    { title: "test 48" },
    { title: "test 49" },
    { title: "test 50" },
    { title: "test 51" },
    { title: "test 52" },
    { title: "test 53" },
    { title: "test 54" },
    { title: "test 55" },
    { title: "test 56" },
    { title: "test 57" },
    { title: "test 58" },
    { title: "test 59" },
    { title: "test 60" },
    { title: "test 61" },
    { title: "test 62" },
    { title: "test 63" },
    { title: "test 64" },
    { title: "test 65" },
    { title: "test 66" },
    { title: "test 67" },
    { title: "test 68" },
    { title: "test 69" },
    { title: "test 70" },
    { title: "test 71" },
    { title: "test 72" },
    { title: "test 73" },
    { title: "test 74" },
    { title: "test 75" },
    { title: "test 76" },
    { title: "test 77" },
    { title: "test 78" },
    { title: "test 79" },
    { title: "test 80" },
    { title: "test 81" },
    { title: "test 82" },
    { title: "test 83" },
    { title: "test 84" },
    { title: "test 85" },
    { title: "test 86" },
    { title: "test 87" },
    { title: "test 88" },
    { title: "test 89" },
    { title: "test 90" },
    { title: "test 91" },
    { title: "test 92" },
    { title: "test 93" },
    { title: "test 94" },
    { title: "test 95" },
    { title: "test 96" },
    { title: "test 97" },
    { title: "test 98" },
    { title: "test 99" },
    { title: "test 100" },
];

export default function App() {
    const response = useResponse();
    const { status, address } = useChain(env.cosmoskitChainName);
    const { requestInference } = useRequestInference();
    const [step, setStep] = useState("0");
    const [state, setState] = useState("idle");

    console.log(state);

    const [selectedTokens, setSelectedTokens] = useState<Token[]>(tokens);
    const [completedValidators, setCompletedValidators] =
        useState<Validator[]>(validators);

    const handleTokenSelect = (token: Token) => {
        setSelectedTokens((prevSelectedTokens) => {
            if (prevSelectedTokens.includes(token)) {
                // If the token is already selected, remove it
                return prevSelectedTokens.filter(
                    (t) => t.symbol !== token.symbol
                );
            } else {
                // Otherwise, add the token to the selected list
                return [...prevSelectedTokens, token];
            }
        });
    };

    const handleSelectedTokens = () => {
        requestInference(address, "", {
            tokens: selectedTokens.map((token) => token.title),
            adversaryMode: false,
        });
        setStep("2");
        setCompletedValidators([]);
    };

    useEffect(() => {
        setState(response.state);
        if (response.response !== null) {
            const responseData = response.response.solverOutput.forecasts;
            console.log(responseData);
            // Adding extra values to each token
            tokens.forEach((token) => {
                const predictedPrice = parseFloat(
                    responseData.filter(
                        (data: any) => data.key === token.title
                    )[0].value
                );
                const price = parseFloat(getRandomPrice(predictedPrice));
                const change = getPercentageChange(price, predictedPrice);

                token.price = price;
                token.predicted_price = predictedPrice;
                token.change = change;
            });
        }
    }, [response, state]);

    useEffect(() => {
        const interval = 100000;
        if (
            step === "2" &&
            (response.state === "processing" || response.state === "completed")
        ) {
            validators.forEach((validator) => {
                setTimeout(function () {
                    setCompletedValidators((prevCompletedValidators) => {
                        if (prevCompletedValidators.includes(validator)) {
                            return prevCompletedValidators;
                        } else {
                            return [...prevCompletedValidators, validator];
                        }
                    });
                }, Math.random() * interval);
            });
        }
        // if (step === "2" && completedValidators.length === validators.length) {
        //     // setStep("3");
        // }
        console.log(completedValidators.length);
        console.log(validators.length);
    }, [step, completedValidators, response.state]);

    const blocks = validators.map((validator, index) => (
        <div
            key={index}
            className={clsx(
                "border-accent rounded-lg col-span-1 w-10 h-10 border",
                completedValidators.includes(validator) ? "bg-accent" : ""
            )}
        >
            {/* {validator.title} */}
        </div>
    ));

    return (
        <div className="grid h-screen w-full">
            <div className="flex flex-col">
                <main className="">
                    {step === "0" && (
                        <div className="flex flex-col h-screen gap-8 w-full place-content-center items-center">
                            <div className="flex flex-col gap-8 w-full items-center">
                                <img src={logo} className="h-16" />
                                <div className="flex flex-col gap-3">
                                    <h1 className="text-2xl text-center ">
                                        Welcome to the WardenAI Demo
                                    </h1>
                                    {/* <p className="text-sm opacity-80 max-w-96 text-center">
                                        Some description text goes here. Lorem
                                        ipsum dolor sit amet, consectetur
                                        adipiscing elit. Pellentesque ac lectus
                                        vel ante fringilla facilisis id eu nibh.
                                    </p> */}
                                </div>
                            </div>
                            <div className="">
                                {status === "Connected" ? (
                                    <Button
                                        size={"lg"}
                                        className="rounded-xl uppercase bg-accent hover:bg-foreground hover:text-background"
                                        onClick={() => {
                                            setStep("1");
                                        }}
                                    >
                                        Select Tokens
                                    </Button>
                                ) : (
                                    <Wallet />
                                )}
                            </div>
                        </div>
                    )}
                    {step === "1" && (
                        <div className="flex flex-col gap-8 w-full place-content-center items-center mt-32 mb-60">
                            <div className="flex flex-col gap-6 w-full items-center">
                                <img src={logo} className="h-16" />
                                <p className="text-xl">
                                    Please select at least 30 tokens that you
                                    want a price prediction for.
                                </p>
                            </div>
                            <div className="grid grid-cols-4 gap-4 max-w-[80%]">
                                {tokens.map((token, index) => (
                                    <div
                                        onClick={() => handleTokenSelect(token)}
                                        key={index}
                                        className={clsx(
                                            "border border-accent rounded-lg col-span-1 flex flex-row px-2 py-1 items-center gap-2 cursor-pointer place-content-between",
                                            selectedTokens.includes(token)
                                                ? "bg-accent text-background"
                                                : "bg-background text-foreground"
                                        )}
                                    >
                                        <div className="flex flex-row gap-2">
                                            <div className="flex flex-col p-1 bg-white rounded-full">
                                                <img
                                                    src={token.image}
                                                    className="h-5 w-5"
                                                />
                                            </div>

                                            <div className="flex flex-col">
                                                <span className="text-xs uppercase">
                                                    {token.title}
                                                </span>
                                                <span className="text-xs opacity-80">
                                                    {token.symbol}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className={clsx(
                                                "border rounded-full  w-6 h-6 flex place-content-center items-center",
                                                selectedTokens.includes(token)
                                                    ? "border-background"
                                                    : "border-accent"
                                            )}
                                        >
                                            {selectedTokens.includes(token) ? (
                                                <CheckIcon
                                                    className={clsx(
                                                        "h-4",
                                                        selectedTokens.includes(
                                                            token
                                                        )
                                                            ? "text-background"
                                                            : "text-accent"
                                                    )}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="fixed bottom-20 px-4 flex flex-row gap-4 items-center border border-accent rounded-lg p-2 bg-foreground">
                                <div>
                                    <span className="text-base px-6 text-background">
                                        {selectedTokens.length} Tokens selected
                                    </span>
                                </div>
                                <Button
                                    size={"lg"}
                                    className="rounded-xl uppercase bg-accent hover:text-background"
                                    onClick={() => handleSelectedTokens()}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    )}
                    {step === "2" && (
                        <div className="flex flex-col gap-4 h-screen w-full place-content-center items-center">
                            <div className="flex flex-col gap-6 w-full items-center">
                                <img src={logo} className="h-16" />
                                <p className="text-xl"></p>
                            </div>
                            <div className="flex gap-4 max-w-[80%] place-content-center flex-wrap mt-10">
                                {blocks}
                            </div>
                            <div className="fixed bottom-20 px-4 flex flex-row gap-4 items-center border border-accent rounded-lg p-2 bg-foreground">
                                <div>
                                    <span className="text-base px-6 text-background">
                                        {state === "pending" &&
                                            "Please approve the transaction in your wallet."}
                                        {state === "processing" &&
                                            "Processing...."}
                                        {state === "completed" &&
                                            "Price predictions completed"}
                                    </span>
                                </div>
                                {completedValidators.length >=
                                    validators.length &&
                                    state === "completed" && (
                                        <Button
                                            size={"lg"}
                                            className="rounded-xl uppercase bg-accent hover:text-background"
                                            onClick={() => {
                                                setStep("3");
                                            }}
                                        >
                                            View results
                                        </Button>
                                    )}
                            </div>
                        </div>
                    )}
                    {step === "3" && (
                        <div className="flex flex-col gap-8 w-full place-content-center items-center mt-32 mb-60">
                            <div className="flex flex-col gap-6 w-full items-center">
                                <img src={logo} className="h-16" />
                            </div>
                            <div className="bg-background border border-accent min-w-[60%] rounded-2xl p-4 flex flex-col gap-4">
                                <Table className="text-lg">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-12"></TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Current price</TableHead>
                                            <TableHead>
                                                Predicted price
                                            </TableHead>
                                            <TableHead>Change</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tokens.map((token, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium p-1.5">
                                                    <div className="flex flex-col p-2 bg-white rounded-full">
                                                        <img
                                                            src={token.image}
                                                            className="h-5 w-5"
                                                        />
                                                    </div>
                                                </TableCell>
                                                <TableCell className="uppercase">
                                                    {token.title}
                                                </TableCell>
                                                <TableCell>
                                                    ${token.price}
                                                </TableCell>
                                                <TableCell>
                                                    $
                                                    {token.predicted_price?.toFixed(
                                                        2
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {token.change}%
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="fixed bottom-20 px-4 flex flex-row gap-4 items-center border border-accent rounded-lg p-2 bg-foreground">
                                <div>
                                    <span className="text-base px-6 text-background">
                                        {selectedTokens.length} Price
                                        predictions completed
                                    </span>
                                </div>

                                {/* <Button
                                    size={"lg"}
                                    className="rounded-xl uppercase bg-accent hover:text-background"
                                    onClick={() => {
                                        setStep("1"),
                                            setCompletedValidators([]),
                                            setSelectedTokens(tokens),
                                            setState("idle");
                                    }}
                                >
                                    Restart
                                </Button> */}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
