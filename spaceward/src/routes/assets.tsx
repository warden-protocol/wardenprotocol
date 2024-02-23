import { Params } from "react-router-dom";
import Assets from "@/components/assets";
import { useSpaceAddress } from "@/hooks/useSpaceAddress";
import { useCurrency } from "@/hooks/useCurrency";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

function AssetsPage() {
	// const { state, error, keyRequest, reset } = useRequestKey();

	const { spaceAddress } = useSpaceAddress();
	const { currency, setCurrency } = useCurrency();

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2 border-b">
				<div>
					<h2 className="text-4xl">Assets</h2>
					<p className="text-muted-foreground"></p>
				</div>
				<div>
					<Select value={currency} onValueChange={setCurrency}>
						<SelectTrigger className="w-[100px]">
							<SelectValue placeholder="Currency" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="usd">USD</SelectItem>
								<SelectItem value="eur">EUR</SelectItem>
								<SelectItem value="gbp">GBP</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="h-full flex-1 flex-col space-y-8 flex">
				{spaceAddress ? (
					<>
						<Assets spaceAddr={spaceAddress} />
					</>
				) : (
					<p>Select a Space</p>
				)}
			</div>
		</div>
	);
}

export async function loader({ params }: { params: Params<string> }) {
	if (!params.spaceAddr) {
		throw new Error("No space address provided");
	}
	return {
		spaceAddr: params.spaceAddr,
	};
}

export default AssetsPage;
