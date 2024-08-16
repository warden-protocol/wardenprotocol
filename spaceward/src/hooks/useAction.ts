import { TxOptions, useTx } from "./useClient";
import { useAddressContext } from "./useAddressContext";
import { useModuleAccount } from "./useModuleAccount";
import { Msg, packAny } from "@/utils/any";
import { warden } from "@wardenprotocol/wardenjs";

const { newAction: newActionMsg } =
	warden.act.v1beta1.MessageComposer.withTypeUrl;

export function useNewAction<Data>(msg: Msg<Data>) {
	const { address } = useAddressContext();
	const { tx } = useTx();

	const { account: authorityAccount } = useModuleAccount("act");
	const authority = authorityAccount?.baseAccount?.address;

	const getMessage = (data: Data, actionTimeoutHeight = 0) =>
		newActionMsg({
			creator: address,
			message: packAny(msg, data),
			actionTimeoutHeight: BigInt(actionTimeoutHeight),
		});

	async function newAction(
		data: Data,
		opts: TxOptions,
		actionTimeoutHeight = 0,
	) {
		const m = getMessage(data, actionTimeoutHeight);
		const res = await tx([m], opts);
		return res;
	}

	return {
		getMessage,
		newAction,
		authority,
	};
}
