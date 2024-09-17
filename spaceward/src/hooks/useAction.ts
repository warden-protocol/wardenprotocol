import { TxOptions, useQueryHooks, useTx } from "./useClient";
import { useAddressContext } from "./useAddressContext";
import { useModuleAccount } from "./useModuleAccount";
import { Msg, packAny } from "@/utils/any";
import { warden } from "@wardenprotocol/wardenjs";
import { useSpaceId } from "./useSpaceId";
import { shieldStringify } from "@/utils/shield";

const { newAction: newActionMsg } =
	warden.act.v1beta1.MessageComposer.withTypeUrl;

const defaultExpression = "any(1, warden.space.owners)";

export function useNewAction<Data>(msg: Msg<Data>, admin?: boolean) {
	const { isReady, useSpaceById, useTemplateById } = useQueryHooks();
	const spaceId = BigInt(useSpaceId().spaceId ?? 0);

	const space = useSpaceById({
		request: { id: spaceId },
		options: { enabled: isReady },
	}).data?.space;

	const approveSignTemplate = useTemplateById({
		request: {
			id: (!admin
				? space?.approveSignTemplateId
				: space?.approveAdminTemplateId)!,
		},
		options: {
			enabled:
				isReady &&
				Boolean(
					!admin
						? space?.approveSignTemplateId
						: space?.approveAdminTemplateId,
				),
		},
	}).data?.template;

	const { address } = useAddressContext();
	const { tx } = useTx();

	const { account: authorityAccount } = useModuleAccount("act");
	const authority = authorityAccount?.baseAccount?.address;

	const getMessage = (data: Data, actionTimeoutHeight = 0) => {
		let expectedApproveExpression = defaultExpression;

		if (approveSignTemplate?.expression) {
			expectedApproveExpression = shieldStringify(
				approveSignTemplate.expression,
			);
		}

		return newActionMsg({
			creator: address,
			message: packAny(msg, data),
			actionTimeoutHeight: BigInt(actionTimeoutHeight),
			expectedApproveExpression,
			// todo if space.rejectSignTemplateId !== 0, fetch and stringify according rule
			expectedRejectExpression: defaultExpression,
		});
	};

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
