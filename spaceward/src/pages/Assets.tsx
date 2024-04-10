import { Params } from "react-router-dom";
import Assets from "@/components/assets";
import { useSpaceId } from "@/hooks/useSpaceId";
import { useCurrency } from "@/hooks/useCurrency";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import NoActiveSpace from "@/components/no-active-space";

function AssetsPage() {
	// const { state, error, keyRequest, reset } = useRequestKey();

	const { spaceId } = useSpaceId();
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
				{spaceId ? (
					<>
						<Assets spaceId={spaceId} />
					</>
				) : (
					<NoActiveSpace />
				)}
			</div>
		</div>
	);
}

export async function loader({ params }: { params: Params<string> }) {
	if (!params.spaceId) {
		throw new Error("No space address provided");
	}
	return {
		spaceId: params.spaceId,
	};
}

export default AssetsPage;
