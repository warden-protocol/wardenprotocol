import { TxOptions, useTx } from "./useClient";
import { useAddressContext } from "./useAddressContext";
import { useModuleAccount } from "./useModuleAccount";
import { Msg, packAny } from "@/utils/any";
import { warden } from "@wardenprotocol/wardenjs";

const { newAction: newActionMsg } = warden.intent.MessageComposer.withTypeUrl;

export function useNewAction<Data>(msg: Msg<Data>) {
	const { address } = useAddressContext();
	const { tx } = useTx();

	const { account: authorityAccount } = useModuleAccount("intent");
	const authority = authorityAccount?.baseAccount?.address;

	async function newAction(data: Data, opts: TxOptions, actionTimeoutHeight = 0) {
		const m = newActionMsg({
			creator: address,
			message: packAny(msg, data),
			actionTimeoutHeight: BigInt(actionTimeoutHeight),
		});
		const res = await tx([m], opts);
		return res;
	}

	return {
		newAction,
		authority,
	};
}

