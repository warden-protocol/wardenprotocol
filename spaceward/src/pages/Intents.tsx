// import { TxMsgData } from "warden-protocol-wardenprotocol-client-ts/lib/cosmos.tx.v1beta1/types/cosmos/base/abci/v1beta1/abci";
// import { MsgActionCreated } from "warden-protocol-wardenprotocol-client-ts/lib/warden.intent/module";
import NewIntentButton from "@/features/intents/NewIntentButton";
import { useCallback, useMemo, useState } from "react";
import CreateIntentModal from "@/features/intents/IntentModalCreate";
import { useSpaceId } from "@/hooks/useSpaceId";
import useWardenWardenV1Beta2 from "@/hooks/useWardenWardenV1Beta2";
import useWardenIntent from "@/hooks/useWardenIntent";
import { useClient } from "@/hooks/useClient";
import { monitorTx } from "@/hooks/keplr";
import { Intent } from "@/features/intents";
import { useToast } from "@/components/ui/use-toast";
import { useAddressContext } from "@/hooks/useAddressContext";
import { ConditionType, SimpleIntent } from "@/types/intent";
import { isSet } from "@/utils/validate";
import { getSimpleIntent } from "@/utils/shield";
import { Expression } from "@/types/shield";

const createDefinition = (intent: SimpleIntent) => {
	const conditions = intent.conditions.map((condition) => {
		const { type, group } = condition;

		if (type === "joint") {
			return `all([${group.join(", ")}])`;
		} else if (type === "anyone") {
			return `any(1, [${group.join(", ")}])`;
		} else {
			return `any(${type.split(":")[1]}, [${group.join(", ")}])`;
		}
	});

	let result = "";

	for (let i = 0; i < conditions.length; i++) {
		if (i) {
			result += ` ${intent.operators[i - 1] === "and" ? "&&" : "||"} `;
		}

		result += conditions[i];
	}

	return result;
};

const useIntents = () => {
	const { spaceId } = useSpaceId();
	const { QuerySpaceById } = useWardenWardenV1Beta2();
	const { QueryIntents } = useWardenIntent();
	const client = useClient();
	const { toast } = useToast();

	const { sendMsgNewIntent, sendMsgUpdateIntent } = client.WardenIntent.tx;
	const sendMsgUpdateSpace = client.WardenWardenV1Beta2.tx.sendMsgUpdateSpace;

	const newIntent = useCallback(
		async (creator: string, intent: SimpleIntent) => {
			const { name } = intent;
			const definition = createDefinition(intent);

			const res = await monitorTx(
				sendMsgNewIntent({
					value: {
						creator,
						name,
						definition,
					},
				}),
				toast,
			);

			if (!res) {
				throw new Error("failed to broadcast tx");
			}

			if (res.tx_response?.code !== 0 || !res.tx_response.data) {
				throw new Error(`tx failed: ${JSON.stringify(res)}`);
			}
		},
		[sendMsgNewIntent, toast],
	);

	const updateIntent = useCallback(
		async (creator: string, intent: SimpleIntent) => {
			const { name, id } = intent;
			const definition = createDefinition(intent);

			if (!id) {
				throw new Error("id is required; intent not created yet");
			}

			const res = await monitorTx(
				sendMsgUpdateIntent({
					value: {
						id,
						addresses: intent.addresses,
						creator,
						name,
						definition,
					},
				}),
				toast,
			);

			if (!res) {
				throw new Error("failed to broadcast tx");
			}

			if (res.tx_response?.code !== 0 || !res.tx_response.data) {
				throw new Error(`tx failed: ${JSON.stringify(res)}`);
			}
		},
		[sendMsgUpdateIntent, toast],
	);

	const space = QuerySpaceById({ id: spaceId }, {}).data?.space;

	const setActiveIntent = useCallback(
		async (creator: string, id: number) => {
			if (!space?.id) {
				return;
			}

			await monitorTx(
				sendMsgUpdateSpace({
					value: {
						creator,
						spaceId: Number(space.id),
						adminIntentId: 0,
						signIntentId: id,
						btl: 0,
					},
				}),
				toast,
			);
		},
		[sendMsgUpdateSpace, toast, space?.id],
	);

	const intents = QueryIntents({ creator: space?.creator }, {}, 100);

	if (!intents.isFetchingNextPage && intents.hasNextPage) {
		intents.fetchNextPage();
	}

	/** @deprecated would be nice to query intent by creator or space */
	const intentsBySpace = useMemo(
		() =>
			intents.data?.pages.flatMap((x) =>
				x.intents?.filter((intent) => {
					return intent.creator === space?.creator;
				}),
			),
		[intents.data?.pages, space?.creator],
	);

	return {
		newIntent,
		updateIntent,
		setActiveIntent,
		intentsBySpace,
		activeIntentId: space?.sign_intent_id
			? Number(space?.sign_intent_id)
			: undefined,
	};
};

function IntentsPage() {
	const {
		newIntent,
		updateIntent,
		intentsBySpace,
		activeIntentId,
		setActiveIntent,
	} = useIntents();
	const { address } = useAddressContext();
	const [isCreateModal, setIsCreateModal] = useState(false);
	const [_intents, setIntents] = useState<SimpleIntent[]>([]);

	const intents = useMemo(() => {
		if (!intentsBySpace) {
			return _intents;
		}

		const parsedIntents = intentsBySpace
			.map((intent) => {
				// fixme get correct type from api
				const expression = (intent as { expression?: Expression })
					?.expression;

				if (!expression || !intent?.id) {
					return undefined;
				}

				try {
					return {
						id: intent.id ? Number(intent.id) : undefined,
						...getSimpleIntent(intent.name ?? "", expression),
					};
				} catch (e) {
					// if incorrect definition
					console.error(e);
					return undefined;
				}
			})
			.filter(isSet)
			.sort((a, b) => (b.id as number) - (a.id as number));

		return [..._intents, ...parsedIntents];
	}, [_intents, intentsBySpace]);

	const onIntentCreate = useCallback(
		(name: string, condition: ConditionType) => {
			const newItem: SimpleIntent = {
				name: name,
				conditions: [{ type: condition, group: [] }],
				addresses: [],
				operators: [],
			};

			const newIntentsArray = [..._intents];
			newIntentsArray.push(newItem);
			setIntents(newIntentsArray);
		},
		[_intents],
	);

	const onIntentRemove = useCallback(
		(_index: number) => {
			const nextIntents = [
				..._intents.filter((_, index) => index !== _index),
			];

			setIntents(nextIntents);
		},
		[_intents],
	);

	const onIntentSave = useCallback(
		async (intent: SimpleIntent) => {
			const fn = intent.id ? updateIntent : newIntent;
			await fn(address, intent);
		},
		[address, updateIntent, newIntent],
	);

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2">
				<div>
					<h2 className="text-4xl">Intents</h2>
					<p className="text-muted-foreground hidden xl:block">
						Rules that define who can operate or use its keys to
						generate and sign transactions.
					</p>
				</div>
				<div>
					<NewIntentButton onClick={() => setIsCreateModal(true)} />
				</div>
			</div>

			{isCreateModal && (
				<CreateIntentModal
					index={-1}
					onClose={() => setIsCreateModal(false)}
					handleCreateIntent={onIntentCreate}
				/>
			)}

			{intents.length ? (
				intents.map((intent, index) => (
					<Intent
						isActive={activeIntentId === intent.id}
						intent={intent}
						index={index}
						key={intent.id ? intent.id : `${intent.name}:${index}`}
						onIntentRemove={onIntentRemove}
						onIntentSave={onIntentSave}
						onIntentToggle={
							intent.id 
								? setActiveIntent.bind(
										null,
										address,
										activeIntentId === intent.id
											? 0
											: intent.id,
									)
								: undefined
						}
					/>
				))
			) : (
				<div>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-[rgba(255,174,238,0.15)] rounded-full flex items-center justify-center text-[#FFAEEE] text-xl">
							1
						</div>
						<p className="flex items-center gap-2">
							Create an Intent by pressing &#39;Create&#39; button
							<svg
								width="12"
								height="11"
								viewBox="0 0 12 11"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6.60227 11L5.72727 10.1364L9.32955 6.53409H0V5.28409H9.32955L5.72727 1.69318L6.60227 0.818182L11.6932 5.90909L6.60227 11Z"
									fill="white"
								/>
							</svg>
						</p>
					</div>

					<div className="flex items-center gap-3 mt-10">
						<div className="w-10 h-10 bg-[rgba(255,174,238,0.15)] rounded-full flex items-center justify-center text-[#FFAEEE] text-xl">
							2
						</div>
						<p className="flex items-center gap-2">
							Select an approval condition
						</p>
					</div>

					<div className="flex items-center gap-3 mt-10">
						<div className="w-10 h-10 bg-[rgba(255,174,238,0.15)] rounded-full flex items-center justify-center text-[#FFAEEE] text-xl">
							3
						</div>
						<p className="flex items-center gap-2">Have fun</p>
					</div>
				</div>
			)}

			{/* <Intents /> */}
		</div>
	);
}

export default IntentsPage;
