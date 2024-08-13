import { Button } from "@/components/ui/button";
import { useAddressContext } from "@/hooks/useAddressContext";
import { useAsset } from "@/hooks/useAsset";
import FaucetButton from "@/components/FaucetButton";
import { useTx } from "@/hooks/useClient";
import { warden } from "@wardenprotocol/wardenjs";

export function NoSpaces() {
	const { address } = useAddressContext();
	const { balance } = useAsset("uward");
	const { tx } = useTx();
	const { newSpace } = warden.warden.v1beta3.MessageComposer.withTypeUrl;

	const ward = parseInt(balance?.amount || "0") / 10 ** 6;
	return (
		<div className="w-full min-h-[calc(100vh-20px)] bg-[url(/landing-bg-light.svg)] dark:bg-transparent  rounded-xl border-2 border-border-accent -mt-[20px] flex flex-col gap-4 items-center place-content-center text-center no-space">
			{ward > 0 ? (
				<>
					<h1 className="text-5xl font-bold tracking-[0.24px] leading-[120%]">
						Create your first space
					</h1>
					<p className="mb-8">
						A space functions as a management hub for a collection
						of keys, assets and rules.
					</p>
					<Button
						className="bg-fill-primary h-[56px] px-8 rounded-xl font-semibold"
						onClick={() => {
							tx(
								[
									newSpace({
										creator: address,
										signRuleId: BigInt(0),
										adminRuleId: BigInt(0),
										// eslint-disable-next-line @typescript-eslint/ban-ts-comment
										// @ts-ignore: telescope generated code doesn't handle empty array correctly, use `undefined` instead of `[]`
										additionalOwners: undefined,
									}),
								],
								{},
							);
						}}
					>
						Create Space
					</Button>
				</>
			) : (
				<>
					<h1 className="text-5xl font-bold tracking-[0.24px] leading-[120%]">
						Get WARD Token
					</h1>
					<p className="mb-8">
						To use SpaceWard you need some WARD tokens. You can get
						this using the faucet below.
					</p>
					<div>
						<FaucetButton />
					</div>
				</>
			)}
		</div>
	);
}
