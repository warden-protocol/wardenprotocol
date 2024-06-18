import { useToast } from "@/components/ui/use-toast";
import { CreateIntentModal, Intent } from "@/features/intents";
import { monitorTx } from "@/hooks/keplr";
import { useAddressContext } from "@/hooks/useAddressContext";
import { useClient } from "@/hooks/useClient";
import { useSpaceId } from "@/hooks/useSpaceId";
import useWardenIntent from "@/hooks/useWardenIntent";
import useWardenWardenV1Beta2 from "@/hooks/useWardenWardenV1Beta2";
import { ConditionType, IntentParams, SimpleIntent } from "@/types/intent";
import { Expression } from "@/types/shield";
import { getSimpleIntent, shieldStringify } from "@/utils/shield";
import { isSet } from "@/utils/validate";
import { useCallback, useMemo, useState } from "react";
import { FilePlus2 } from "lucide-react";
import { env } from "@/env";
import { useNewAction } from "@/hooks/useAction";
import { warden } from "@wardenprotocol/wardenjs";

const createDefinition = (intent: SimpleIntent) => {
	const conditions = intent.conditions.map((condition) => {
		const { type, group, shield, expression } = condition;

		if (type === "joint") {
			return `all([${group.join(", ")}])`;
		} else if (type === "anyone") {
			return `any(1, [${group.join(", ")}])`;
		} else if (type === "advanced") {
			if (!shield) {
				return `(${shieldStringify(expression)})`;
				// throw new Error("advanced condition is empty");
			}

			return `(${shield})`;
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

export const useIntents = () => {
	const { spaceId } = useSpaceId();
	const { QuerySpaceById } = useWardenWardenV1Beta2();
	const { QueryIntents } = useWardenIntent();
	const client = useClient();
	const { toast } = useToast();

	const { sendMsgNewIntent, sendMsgUpdateIntent } = client.WardenIntent.tx;
	const newIntent = useCallback(
		async (creator: string, { simple, advanced }: IntentParams) => {
			const { name, definition: _definition } =
				(simple
					? { ...simple, definition: createDefinition(simple) }
					: advanced) ?? {};

			if (!name || !_definition) {
				throw new Error("name and definition are required");
			}

			const whitelist = simple ? simple.whitelist : advanced?.whitelist;

			const definition = !whitelist?.length
				? _definition
				: `contains(warden.analyzer.xxx.to, [${whitelist.map((addr) => `"${addr}"`).join(", ")}]) && ${_definition}`;

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
		async (creator: string, { simple, advanced }: IntentParams) => {
			const {
				id,
				name,
				definition: _definition,
			} = (simple
				? { ...simple, definition: createDefinition(simple) }
				: advanced) ?? {};

			if (!id) {
				throw new Error("id is required; intent not created yet");
			}

			if (!name || !_definition) {
				throw new Error("name and definition are required");
			}

			const whitelist = simple ? simple.whitelist : advanced?.whitelist;

			const definition = !whitelist?.length
				? _definition
				// fixme waiting for the correct contract address
				: `contains(warden.analyzer.${env.ethereumAnalyzerContract}.to, [${whitelist.map((addr) => `"${addr}"`).join(", ")}]) && ${_definition}`;

			console.log({ definition})

			const res = await monitorTx(
				sendMsgUpdateIntent({
					value: {
						id,
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

	const { MsgUpdateSpace } = warden.warden.v1beta2;
	const { newAction, authority } = useNewAction(MsgUpdateSpace);

	const setActiveIntent = useCallback(
		async (id: number) => {
			if (!space?.id) {
				return;
			}
			if (!authority) {
				throw new Error("authority is required");
			}

			await newAction({
				authority,
				spaceId: BigInt(space.id),
				adminIntentId: BigInt(0),
				signIntentId: BigInt(id),
			}, {});
		},
		[authority, newAction, space?.id],
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

export function IntentsPage() {
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
				const expression =
					(intent as { expression?: Expression })?.expression ?? {};

				if (!intent?.id) {
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
				conditions: [{ type: condition, group: [], expression: {} }],
				addresses: [],
				operators: [],
				raw: {},
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
		async ({ simple, advanced }: IntentParams) => {
			const fn = simple?.id || advanced?.id ? updateIntent : newIntent;
			await fn(address, { simple, advanced });
		},
		[address, updateIntent, newIntent],
	);

	return (
		<div className="flex flex-col flex-1 px-8 py-4 space-y-8">
			<div className="flex items-center pb-4 space-x-6">
				<div>
					<h2 className="text-5xl">Intents</h2>
					<p className="text-muted-foreground hidden xl:block text-sm">
						Rules that define who can operate or use its keys to
						generate and sign transactions.
					</p>
				</div>
				{/* <div>
					<NewIntentButton onClick={() => setIsCreateModal(true)} />
				</div> */}
			</div>

			{isCreateModal && (
				<CreateIntentModal
					index={-1}
					onClose={() => setIsCreateModal(false)}
					handleCreateIntent={onIntentCreate}
				/>
			)}
			{intents.length ? (
				<div className="flex flex-row space-x-4">
					<div className="w-full xl:w-8/12 flex flex-col space-y-4">
						{intents.map((intent, index) => (
							<Intent
								isActive={activeIntentId === intent.id}
								intent={intent}
								index={index}
								key={
									intent.id
										? intent.id
										: `${intent.name}:${index}`
								}
								onIntentRemove={onIntentRemove}
								onIntentSave={onIntentSave}
								onIntentToggle={
									intent.id
										? setActiveIntent.bind(
											null,
											activeIntentId === intent.id
												? 0
												: intent.id,
										)
										: undefined
								}
							/>
						))}
						<div
							className="w-full bg-card sticky cursor-pointer rounded-xl p-8 flex items-center justify-center border-card border-2 hover:border-foreground"
							onClick={() => setIsCreateModal(true)}
						>
							<div className="flex space-x-4 items-center justify-center h-full">
								<FilePlus2
									strokeWidth={1}
									className="h-8 w-8 text-foreground"
								/>
								<p className="text-base">Create a new intent</p>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="grid xl:grid-cols-2 gap-4">
					<div className="w-full flex flex-col space-y-4">
						<div className="bg-card rounded-xl p-8">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 dark:bg-[rgba(255,174,238,0.15)] rounded-full flex items-center justify-center text-accent text-xl">
									1
								</div>
								<p className="flex items-center gap-2">
									Create an Intent by pressing
									&#39;Create&#39; button
								</p>
							</div>

							<div className="flex items-center gap-3 mt-10">
								<div className="w-10 h-10 dark:bg-[rgba(255,174,238,0.15)] rounded-full flex items-center justify-center text-accent text-xl">
									2
								</div>
								<p className="flex items-center gap-2">
									Select an approval condition
								</p>
							</div>

							<div className="flex items-center gap-3 mt-10">
								<div className="w-10 h-10 dark:bg-[rgba(255,174,238,0.15)] rounded-full flex items-center justify-center text-accent text-xl">
									3
								</div>
								<p className="flex items-center gap-2">
									Add the approvers
								</p>
							</div>
						</div>
					</div>
					<div className="w-full h-full flex">
						<div
							className="w-full bg-card sticky cursor-pointer rounded-xl p-8 flex items-center justify-center border-card border-2 hover:border-foreground"
							onClick={() => setIsCreateModal(true)}
						>
							<div className="flex space-x-4 items-center justify-center h-full">
								<FilePlus2
									strokeWidth={1}
									className="h-8 w-8 text-foreground"
								/>
								<p className="text-base">Create a new intent</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
