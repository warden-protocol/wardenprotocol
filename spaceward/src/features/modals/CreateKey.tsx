import clsx from "clsx";
import { Circle, CircleCheck, Dice5Icon, RefreshCw, XIcon } from "lucide-react";
import { useState } from "react";
import type { Keychain } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/keychain";
import { Button } from "@/components/ui/button";
import { useQueryHooks } from "@/hooks/useClient";
import { pasteFromClipboard } from "@/utils/browser";
import type { CreateKeyParams, ModalParams } from "./types";
import Assets, { KEY_THEMES } from "../keys/assets";
import { TEMP_KEY, useKeySettingsState } from "../keys/state";
import useRequestKey from "@/hooks/useRequestKey";
import { useSpaceId } from "@/hooks/useSpaceId";
import { useModalState } from "./state";

const THEME_DISPLAY_COUNT = 4;

export default function CreateKeyModal({
	hidden,
	next,
}: ModalParams<CreateKeyParams>) {
	const { useKeychains, isReady } = useQueryHooks();
	const { data: ks, setData: setKeySettings } = useKeySettingsState();
	const { setData: setModal } = useModalState();
	const { requestKey } = useRequestKey();
	const { spaceId } = useSpaceId();

	const keychainsQuery = useKeychains({
		options: {
			enabled: isReady,
		},
	});

	const [keychain, setKeychain] = useState<Keychain>();
	const [selected, setSelected] = useState(-1);
	const [name, setName] = useState("");
	const [themeIndex, setThemeIndex] = useState(0);
	const [themeOffset, setThemeOffset] = useState(0);

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

	return hidden ? null : (
		<div className="max-w-[520px] w-[520px] text-center tracking-wide pb-5">
			<div className="font-bold text-5xl mb-6 leading-[56px]">
				{!keychain ? "Select Keychain" : "Create Key"}
			</div>

			{!keychain ? (
				<div>To store your key and sign transactions</div>
			) : null}

			{!keychain ? (
				<div className="mt-12 text-left">
					{keychainsQuery.data?.keychains.map((item, i) => (
						<div
							className="rounded-xl p-6 flex flex-col bg-fill-quaternary"
							key={item.id.toString()}
							onClick={setSelected.bind(null, i)}
						>
							<div className="flex items-center">
								<p>{item.description}</p>

								{selected === i ? (
									<CircleCheck className="ml-auto" />
								) : (
									<Circle className="ml-auto" />
								)}
							</div>
							{/* TODO get description from somewhere */}
							<p>
								Open Custody Protocol (OCP), a modular custody
								primitive to expand the original vision from
								Qredo by...
							</p>
							<a
								href="#"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									// TODO implement details state
								}}
							>
								Learn more
							</a>
						</div>
					))}
				</div>
			) : (
				<>
					<div
						className={clsx(
							"mt-12 text-left flex items-center justify-between gap-2 bg-[rgba(229,238,255,0.15)] border-[1px] px-4 h-[60px] border-white",
						)}
					>
						<div className="w-full">
							<label
								className="text-[rgba(229,238,255,0.60)] text-xs"
								htmlFor="address"
							>
								Key Name
							</label>
							<input
								className="block w-full bg-transparent outline-none foces:outline-none"
								id="address"
								onChange={(e) => setName(e.target.value)}
								value={name}
							/>
						</div>
						{!name ? (
							<button
								className="font-medium text-[rgba(229,238,255,0.60)] px-2 hover:text-white transition-all duration-200"
								onClick={async (e) => {
									e.preventDefault();
									const text = await pasteFromClipboard();
									setName(text);
								}}
							>
								Paste
							</button>
						) : (
							<XIcon
								className="cursor-pointer"
								onClick={() => setName("")}
							/>
						)}
					</div>

					<div className="flex items-center mt-12">
						{Array.from({ length: THEME_DISPLAY_COUNT }).map(
							(_, i) => {
								const index =
									(themeOffset + i) % KEY_THEMES.length;

								return (
									<div
										key={themeOffset + i}
										className={clsx(
											"w-16 h-10 rounded-md overflow-hidden m-1 border-2 cursor-pointer",
											{
												"border-transparent":
													index !== themeIndex,
												"border-accent":
													index === themeIndex,
											},
										)}
										onClick={() => setThemeIndex(index)}
									>
										<Assets.themeSelector
											className="w-full h-full"
											themeIndex={index}
										/>
									</div>
								);
							},
						)}
						<div
							className="w-16 h-10 rounded-md bg-fill-quaternary flex items-center justify-center cursor-pointer"
							onClick={() => {
								setThemeOffset(
									(offset) =>
										(offset + THEME_DISPLAY_COUNT) %
										KEY_THEMES.length,
								);
							}}
						>
							<RefreshCw />
						</div>

						<div
							className="w-10 h-10 rounded-full bg-fill-quaternary flex items-center justify-center ml-8 cursor-pointer"
							onClick={() => {
								const index = Math.floor(
									Math.random() * KEY_THEMES.length,
								);

								const offset =
									Math.floor(index / THEME_DISPLAY_COUNT) *
									THEME_DISPLAY_COUNT;

								setThemeIndex(index);
								setThemeOffset(offset);
							}}
						>
							<Dice5Icon />
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

						if (!keychain) {
							return;
						}

						setKeychain(keychain);
					}}
					className="flex items-center rounded-lg justify-center gap-2 h-[56px] font-semibold"
				>
					Use this keychain
				</Button>
			) : (
				<Button
					onClick={create}
					className="flex items-center rounded-lg justify-center gap-2 h-[56px] font-semibold"
				>
					Create key
				</Button>
			)}
		</div>
	);
}
