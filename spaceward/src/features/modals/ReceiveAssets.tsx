import QRCode from "react-qr-code";
import { Copy } from "@/components/ui/copy";
import { TransferParams } from "./types";
import { Icons } from "../dashboard/icons";
import KeySelect from "./receiveAssets/KeySelect";
import { useMemo, useState } from "react";
import { useSpaceId } from "@/hooks/useSpaceId";
import { useAssetQueries } from "../assets/hooks";
import TokenSelect from "./receiveAssets/TokenSelect";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SelectAsset from "./receiveAssets/SelectAsset";

export default function ReceiveAssetsModal(props: TransferParams) {
	const { spaceId } = useSpaceId();
	const { queryKeys } = useAssetQueries(spaceId?.toString());

	const addresses = useMemo(
		() =>
			queryKeys.data?.keys.flatMap(({ addresses, key }) =>
				addresses.map((x) => ({ ...x, keyId: key.id })),
			),
		[queryKeys.data?.keys],
	);

	const [searchValue, setSearchValue] = useState("");
	const [currentNetwork, setCurrentNetwork] = useState("");

	const { queryBalances } = useAssetQueries(spaceId);

	const [currentKey, setCurrentKey] = useState(
		addresses?.find((item) => item.address == props.address) ?? addresses,
	);
	const _results = queryBalances
		.filter((result) => {
			if (result.data?.key.key.id !== currentKey?.keyId) {
				return false;
			}

			return true;
		})
		.flatMap((query) => query.data?.results ?? []);

	const { chains, results, withBalance } = useMemo(() => {
		const chainNames = new Set<string>();

		const withBalance: string[] = [];

		const results = _results.filter(({ balance, chainName, token }) => {
			chainNames.add(chainName);

			if (searchValue) {
				if (!token.includes(searchValue.toUpperCase())) {
					return false;
				}
			}

			if (currentNetwork) {
				if (chainName !== currentNetwork) {
					return false;
				}
			}

			if (balance) {
				withBalance.push(token);
			}

			return true;
		});

		return {
			chains: Array.from(chainNames),
			results,
			withBalance,
		};
	}, [_results, currentNetwork, searchValue]);

	const [isSelectAsset, setSelectAsset] = useState(false);

	const currentToken = results.find(
		(item) => item.token.toUpperCase() === props.token?.toUpperCase(),
	);

	const queryResults = queryBalances.flatMap(
		({ data }) => data?.results ?? [],
	);

	const balancesByCoin = queryResults.filter(
		({ token }) => token === props.token,
	);

	return (
		<div className="grid grid-cols-[1fr_520px] gap-12 pb-5 max-w-[928px] mx-auto">
			<div>
				<Icons.arrInCircle className="w-20 h-20 mt-6 mb-8 mx-auto" />
				<div className="font-bold text-2xl leading-[32px] tracking-[0.12px] mb-8 text-center">
					Choose a key and asset to receive
				</div>

				<div className="mb-5 font-bold text-xl">Key</div>

				<KeySelect
					currentKey={currentKey}
					setKey={(key) => setCurrentKey(key)}
					token={props?.token}
					balancesByCoin={balancesByCoin}
				/>

				<div className="mb-5 font-bold text-xl">Asset</div>

				<TokenSelect
					currentKey={currentKey}
					token={currentToken}
					switchToSelect={() => setSelectAsset(true)}
					isSelect={isSelectAsset}
				/>
			</div>

			<div className="bg-bg-elevated pt-12 px-4 pb-4 rounded-2xl">
				{isSelectAsset ? (
					<SelectAsset
						hideSelectAsset={() => setSelectAsset(false)}
						currentNetwork={currentNetwork}
						chains={chains}
						changeNetwork={(network) => setCurrentNetwork(network)}
						results={results}
						withBalance={withBalance}
						spaceId={spaceId ?? ""}
						changeSearchValue={(value) => setSearchValue(value)}
						searchValue={searchValue}
					/>
				) : (
					<div className="text-center flex flex-col gap-10">
						<div>
							<div className="font-bold mb-2 text-[32px]">
								Receive {currentToken?.token.toUpperCase()}
							</div>
							<div>
								Send only {currentToken?.token}{" "}
								{currentToken?.chainName} to the address below
							</div>
						</div>

						<QRCode
							size={240}
							style={{
								height: "auto",
								maxWidth: "240px",
								width: "240px",
								margin: "0 auto",
							}}
							value={props?.address ?? ""}
							viewBox={`0 0 240 240`}
						/>

						<div className="bg-fill-elevated rounded-lg	w-full pt-4 px-4 pb-6 text-center flex flex-col items-center">
							<div className="text-label-secondary text-xs mb-2">
								Your {currentToken?.token}{" "}
								{currentToken?.chainName} address
							</div>
							<div>
								<Copy value={props?.address} />
							</div>

							<CopyToClipboard text={props?.address ?? ""}>
								<button className="bg-pixel-pink cursor-pointer rounded px-5 h-10 flex items-center justify-center font-semibold text-black duration-300 hover:bg-fill-accent-hover mt-4">
									Copy Address
								</button>
							</CopyToClipboard>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
