import clsx from "clsx";
import { Circle, Dice5Icon, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Keychain } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/keychain";
import { Button } from "@/components/ui/button";
import { useQueryHooks } from "@/hooks/useClient";
import { pasteFromClipboard } from "@/utils/browser";
import type { CreateKeyParams, ModalParams } from "./types";
import Assets, { KEY_THEMES } from "../keys/assets";
import { TEMP_KEY, useKeySettingsState } from "../keys/state";
import useRequestKey from "@/hooks/useRequestKey";
import { useSpaceId } from "@/hooks/useSpaceId";
import { useModalState } from "./state";
import { Icons } from "@/components/ui/icons-assets";
import descriptions from "../keychains/description";

const DESCRIPTION_MAP = Object.fromEntries(descriptions.map((d) => [d.key, d]));
const THEME_DISPLAY_COUNT = 4;

export default function CreateKeyModal({
	hidden,
	next,
	spaceId: selectedSpaceId,
	keychainId,
}: ModalParams<CreateKeyParams>) {
	const { useKeychains, isReady } = useQueryHooks();
	const { data: ks, setData: setKeySettings } = useKeySettingsState();
	const { setData: setModal } = useModalState();
	const { requestKey } = useRequestKey();
	const { spaceId: _spaceId } = useSpaceId();
	const spaceId = selectedSpaceId ?? _spaceId;

	const keychainsQuery = useKeychains({
		options: {
			enabled: isReady,
		},
	});

	const keychain = keychainsQuery.data?.keychains.find(
		(kc) => kc.id === keychainId,
	);
	const [selected, setSelected] = useState(-1);
	const [isDetails, setIsDetails] = useState(false);
	const [name, setName] = useState("Key #1");
	const [themeIndex, setThemeIndex] = useState(0);
	const [themeOffset, setThemeOffset] = useState(0);

	function setKeychain(keychain: Keychain | undefined) {
		const keychainId = keychain?.id;
		setModal({
			params: {
				next,
				spaceId,
				keychainId,
			},
		});
	}

	async function create() {
		if (!keychain || !ks || !spaceId) {
			return;
		}

		const settings = {
			name,
			themeIndex,
		};

		setKeySettings({ settings: { ...ks.settings, [TEMP_KEY]: settings } });

		try {
			setModal({
				background: { "create-key": { next } },
				type: next,
				params: {},
			});

			await requestKey(keychain.id, BigInt(spaceId));
		} catch (e) {
			console.error(e);
		}

		setModal({ background: {} });
	}

	const desc =
		selected >= 0
			? DESCRIPTION_MAP[
					keychainsQuery.data?.keychains[selected]?.description ?? ""
				]
			: undefined;

	return hidden ? null : isDetails ? (
		<div className="max-w-[520px] w-[520px] text-center tracking-wide pb-5">
			<button
				onClick={() => setIsDetails(false)}
				className="absolute top-10 left-10"
			>
				<Icons.arrowGoBack />
			</button>
			<div className="font-bold text-5xl mb-6 leading-[56px] tracking-[0.24px]">
				Keychain details
			</div>

			<div className="bg-fill-quaternary rounded-xl	p-6">
				<div className="flex items-center gap-[6px] font-bold text-2xl mb-1">
					{desc?.title ?? keychain?.description}

					{desc?.verified ? <Icons.verified /> : undefined}
				</div>

				<div className="text-muted-foreground text-left">
					{desc?.description ?? "Missing description"}
				</div>

				{/* <div className="my-4 h-[1px] w-full bg-border-quaternary" />

				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between py-1">
						<div>Created keys</div>
						<div>1,234</div>
					</div>
					<div className="flex items-center justify-between py-1">
						<div>Failed keys</div>
						<div>0</div>
					</div>
					<div className="flex items-center justify-between py-1">
						<div>Current keys backlog</div>
						<div>1,066</div>
					</div>
					<div className="flex items-center justify-between py-1">
						<div>Total transactions for keys</div>
						<div>1,234</div>
					</div>
					<div className="flex items-center justify-between py-1">
						<div>Last actvity</div>
						<div>Use this Keychain</div>
					</div>
				</div> */}
			</div>

			<Button
				onClick={() => {
					if (selected === -1 || desc?.disabled) {
						return;
					}

					const keychain = keychainsQuery.data?.keychains[selected];

					if (!keychain) {
						return;
					}

					setKeychain(keychain);
					setIsDetails(false);
				}}
				className={clsx(
					"flex items-center rounded-lg justify-center gap-2 h-[56px] font-semibold w-full mt-12 duration-200 hover:text-background",
					{
						"hover:bg-pixel-pink hover:text-background":
							!desc?.disabled,
					},
					{
						"bg-fill-quaternary text-muted-foreground":
							desc?.disabled,
					},
				)}
			>
				Use this keychain
			</Button>
		</div>
	) : (
		<div className="max-w-[520px] w-[520px] text-center tracking-wide pb-5">
			<div
				className="font-bold text-5xl mb-6
			 leading-[56px] tracking-[0.24px] font-display"
			>
				{!keychain ? "Select Keychain" : "Create Key"}
			</div>

			{!keychain ? (
				<div className="tracking-normal">
					To store the key and sign transactions
				</div>
			) : null}

			{!keychain ? (
				<div
					className={clsx(
						"mt-12 text-left flex flex-col gap-4 max-h-[400px]  relative",
						(keychainsQuery.data?.keychains.length ?? 0) >= 3
							? "before:content-[''] before:absolute no-scrollbar overflow-scroll before:left-0 before:bottom-0 before:w-full before:h-[90px] before:z-20 before:bg-gradient-to-b before:from-[transparent] before:to-[#222]							"
							: "",
					)}
				>
					{keychainsQuery.data?.keychains.map((item, i) => {
						const desc = DESCRIPTION_MAP[item.description];

						return (
							<div
								className="rounded-xl p-6 flex flex-col bg-fill-quaternary w-full"
								key={item.id.toString()}
								onClick={setSelected.bind(null, i)}
							>
								<div className="flex items-center mb-1">
									<div className="text-xl	font-bold flex items-center gap-[6px]">
										{desc?.title ?? item.description}
									</div>

									{selected === i ? (
										<div className="ml-auto relative w-6 h-6">
											<Circle
												stroke="#FFAEEE"
												stroke-width="1"
												cy={12}
												cx={12}
											/>
											<Circle
												className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4"
												fill="#FFAEEE"
												stroke="transparent"
												stroke-width="0"
											/>
										</div>
									) : (
										<Circle
											className="ml-auto opacity-60"
											stroke="#E5EEFF"
											stroke-width="1"
											cy={12}
											cx={12}
										/>
									)}
								</div>
								{/* TODO get description from somewhere */}
								<p className="m-0 text-muted-foreground">
									{desc?.description ?? "Missing description"}
								</p>
								<a
									href="#"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setSelected(i);
										setIsDetails(true);
									}}
									className="mt-2 duration-300 transition-all hover:text-pixel-pink font-semibold"
								>
									Learn more
								</a>
							</div>
						);
					})}
				</div>
			) : (
				<>
					<div>
						<div className="font-bold font-display tracking-[0.12px] text-2xl text-left mb-6">
							Add a name
						</div>

						<div
							className={clsx(
								"rounded-lg	 text-left flex items-center justify-between gap-2 bg-[rgba(229,238,255,0.15)] border-[1px] px-4 h-[60px] border-white",
							)}
						>
							<div className="w-full">
								<label
									className="text-label-secondary text-xs"
									htmlFor="address"
								>
									Key&apos;s name
								</label>
								<input
									className="block w-full bg-transparent outline-none foces:outline-none"
									id="address"
									onChange={(e) => setName(e.target.value)}
									value={name}
								/>
							</div>
							{!name ? (
								<></>
								// <button
								// 	className="font-medium text-label-secondary px-2 hover:text-white transition-all duration-200"
								// 	onClick={async (e) => {
								// 		e.preventDefault();
								// 		const text = await pasteFromClipboard();
								// 		setName(text);
								// 	}}
								// >
								// 	Paste
								// </button>
							) : (
								<Icons.clearCircle
									className="cursor-pointer"
									onClick={() => setName("")}
								/>
							)}
						</div>
					</div>

					<div className="mt-8">
						<div className="font-bold font-display tracking-[0.12px] text-2xl text-left mb-6">
							Select a style
						</div>

						<div className="flex items-center justify-between">
							{Array.from({ length: THEME_DISPLAY_COUNT }).map(
								(_, i) => {
									const index =
										(themeOffset + i) % KEY_THEMES.length;

									return (
										<div
											key={themeOffset + i}
											className={clsx(
												"w-14 h-10 rounded-lg overflow-hidden border-solid border-2 cursor-pointer",
												{
													"border-transparent":
														index !== themeIndex,
													"border-accent p-0.5":
														index === themeIndex,
												},
											)}
											onClick={() => setThemeIndex(index)}
										>
											<Assets.themeSelector
												className="w-full h-full object-cover rounded-sm overflow-hidden"
												themeIndex={index}
											/>
										</div>
									);
								},
							)}
							<div
								className="group relative w-16 h-10 hover:bg-fill-accent-secondary duration-200 rounded-md bg-fill-quaternary flex items-center justify-center cursor-pointer"
								onClick={() => {
									setThemeOffset(
										(offset) =>
											(offset + THEME_DISPLAY_COUNT) %
											KEY_THEMES.length,
									);
								}}
							>
								<RefreshCw />

								<div className="opacity-0 w-fit bg-fill-quaternary text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none whitespace-nowrap	backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%]  before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]">
									Switch Styles
								</div>
							</div>

							<div className="w-[1px] h-4 bg-label-tertiary" />
							<div
								className="w-10 h-10 hover:bg-fill-accent-secondary group relative duration-200 rounded-full bg-fill-quaternary flex items-center justify-center cursor-pointer"
								onClick={() => {
									const index = Math.floor(
										Math.random() * KEY_THEMES.length,
									);

									const offset =
										Math.floor(
											index / THEME_DISPLAY_COUNT,
										) * THEME_DISPLAY_COUNT;

									setThemeIndex(index);
									setThemeOffset(offset);
								}}
							>
								<Dice5Icon />

								<div className="opacity-0 w-fit bg-fill-quaternary text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none whitespace-nowrap	backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%]  before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]">
									Random style
								</div>
							</div>
						</div>
					</div>
				</>
			)}

			{!keychain ? (
				<Button
					onClick={() => {
						if (selected === -1) {
							return;
						}

						const keychain =
							keychainsQuery.data?.keychains[selected];

						if (!keychain || desc?.disabled) {
							return;
						}

						setKeychain(keychain);
					}}
					className={clsx(
						"flex items-center rounded-lg justify-center gap-2 h-[56px] font-semibold w-full mt-5 duration-200",
						{
							"hover:bg-pixel-pink hover:text-background":
								!desc?.disabled,
						},
						{
							"bg-fill-quaternary text-muted-foreground":
								desc?.disabled || selected === -1,
						},
					)}
				>
					Use this keychain
				</Button>
			) : (
				<div className="mt-12 flex flex-col gap-2">
					<Button
						onClick={create}
						className="flex items-center rounded-lg justify-center gap-2 h-[56px] font-semibold w-full hover:bg-pixel-pink duration-200 hover:text-background"
					>
						Create Key
					</Button>

					<Button
						onClick={() => setKeychain(undefined)}
						className="w-full flex items-center justify-center transition-colors focus-visible:outline-none hover:bg-accent hover:text-background rounded-lg h-[56px] bg-fill-quaternary text-display font-semibold shrink-0 "
					>
						Cancel
					</Button>
				</div>
			)}
		</div>
	);
}
