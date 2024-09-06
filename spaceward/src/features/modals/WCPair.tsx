import clsx from "clsx";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import QRCode from "react-qr-code";

interface WCPairProps {
	assistantUrl?: string;
	error?: Error;
	onWcUriChange: (uri: string) => void;
	wcUri: string;
}

export default function WCPair(props: WCPairProps) {
	async function pasteFromClipboard() {
		try {
			const clipboardItems = await navigator.clipboard.read();

			for (const clipboardItem of clipboardItems) {
				const textTypes =
					clipboardItem.types.filter((type) =>
						type.startsWith("text/"),
					) ?? [];

				for (const textType of textTypes) {
					const text = await (
						await clipboardItem.getType(textType)
					).text();

					props.onWcUriChange(text);
					break;
				}
			}
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<>
			<div className="flex flex-row w-full relative mt-10 mb-12">
				{props.wcUri && (
					<div className="absolute left-5 top-3 text-xs text-muted-foreground">
						Pairing code
					</div>
				)}
				<Input
					type="text"
					placeholder="Pairing code"
					value={props.wcUri}
					className={clsx(
						"h-[60px]  pr-[90px] pl-5 text-left bg-fill-elevated border-transparent rounded-lg focus-visible:!ring-0 focus-visible:!ring-offset-0 ring-0 focus-visible:border-2 border-2 focus-visible:border-border-secondary border-solid",
						{
							"pt-6 pb-1": props.wcUri,
							"py-3": !props.wcUri,
							"border-l-negative": props.error,
						},
					)}
					onChange={(e) => props.onWcUriChange(e.target.value)}
				/>
				<button
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						pasteFromClipboard();
					}}
					className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground px-1 font-semibold py-2 hover:text-foreground transition-all duration-200"
				>
					Paste
				</button>
			</div>

			<div>
				<form
					className="flex flex-row gap-4"
					onSubmit={async (e) => {
						e.preventDefault();
					}}
				></form>
			</div>
			<div>
				<div className="mb-6 h-[1px] bg-border-quaternary" />

				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="item-1" className="border-b-0 p-0">
						<AccordionTrigger className="font-sans text-xl font-bold p-0">
							How do I connect to a dApp?
						</AccordionTrigger>
						<AccordionContent className="pt-4">
							<ol className="list-decimal space-y-1">
								<li>Open a WalletConnect supported dApp</li>
								<li>Connect a wallet</li>
								<li>Select WalletConnect as the wallet</li>
								<li>
									Copy the pairing code, paste it into the
									input field above
								</li>
								<li>Approve the session</li>
								<li>Your dApp is now connected to SpaceWard</li>
							</ol>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<Accordion type="single" collapsible className="w-full mt-6">
					<AccordionItem value="item-1" className="border-b-0 p-0">
						<AccordionTrigger className="font-sans text-xl font-bold p-0">
							If I don&apos;t have a paring code
						</AccordionTrigger>
						<AccordionContent className="pt-4">
							<div className="w-full flex flex-col justify-center items-center">
								{props.assistantUrl ? (
									<a
										href={props.assistantUrl}
										target="_blank"
										className="grid grid-cols-[200px_1fr] gap-5 bg-border-quaternary p-4 rounded-2xl	w-full "
									>
										<div className="p-1 bg-white overflow-hidden rounded-lg">
											<QRCode
												value={props.assistantUrl}
												size={192}
											/>
										</div>
										<div className="flex flex-col justify-center text-left leading-[125%] text-secondary-text">
											<div className="text-xl	font-bold mb-2">
												Scan the QR and then follow the
												instructions on&nbsp;your mobile
											</div>
										</div>
									</a>
								) : (
									"Loading..."
								)}
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</>
	);
}
