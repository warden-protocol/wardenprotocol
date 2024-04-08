// import Intents from "@/components/intents";
import NewIntentButton from "@/components/new-intent-button";
import { useCallback, useMemo, useState } from "react";
import IntentComponent from "../components/intent";
import CreateIntentModal from "@/components/create-intent-modal";
import { useSpaceId } from "@/hooks/useSpaceId";
import useWardenWardenV1Beta2 from "@/hooks/useWardenWardenV1Beta2";
import useWardenIntent from "@/hooks/useWardenIntent";
import jsep, {
	type ArrayExpression,
	type BinaryExpression,
	type CallExpression,
	type Identifier,
	type Literal,
} from "jsep";
import { useClient } from "@/hooks/useClient";
import { monitorTx } from "@/hooks/keplr";
import { useToast } from "@/components/ui/use-toast";
import { TxMsgData } from "warden-protocol-wardenprotocol-client-ts/lib/cosmos.tx.v1beta1/types/cosmos/base/abci/v1beta1/abci";
import { MsgActionCreated } from "warden-protocol-wardenprotocol-client-ts/lib/warden.intent/module";
import { useAddressContext } from "@/def-hooks/useAddressContext";
import { isSet } from "@/utils/validate";
import { shieldStringify } from "@/utils/shield";

export type ConditionType = "joint" | `group:${number}` | "anyone";

export interface Intent {
	id?: number;
	name: string;
	addresses: string[];
	conditions: { type: ConditionType; group: string[] }[];
	operators: ("and" | "or")[];
}

const createDefinition = (intent: Intent) => {
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

const parseSimpleIntent = (intent: string) => {
	const operators: ("and" | "or")[] = [];

	const conditions: {
		type: ConditionType;
		group: string[];
	}[] = [];

	const root = jsep(intent);
	const stack = [root];

	while (stack.length) {
		const current = stack.pop();
		console.log({ current, stack });

		if (!current) {
			break;
		}

		if (current.type === "BinaryExpression") {
			const { operator, left, right } = current as BinaryExpression;

			if (operator === "||") {
				operators.push("or");
			} else {
				operators.push("and");
			}

			stack.push(left);
			stack.push(right);
		} else if (current.type === "CallExpression") {
			const { arguments: args, callee } = current as CallExpression;

			if (callee.type !== "Identifier") {
				throw new Error(
					`Invalid identifier: ${JSON.stringify(callee)}`,
				);
			}

			const { name } = callee as Identifier;

			if (name === "all") {
				if (args.length !== 1) {
					throw new Error(
						`Invalid arguments: ${JSON.stringify(args)}`,
					);
				}

				const [addresses] = args;

				if (addresses.type !== "ArrayExpression") {
					throw new Error(
						`Invalid array expression: ${JSON.stringify(addresses)}`,
					);
				}

				const { elements } = addresses as ArrayExpression;

				const condition = "joint";
				const group = elements.map((element) => {
					if (element.type !== "Identifier") {
						throw new Error(
							`Invalid identifier: ${JSON.stringify(element)}`,
						);
					}

					const { name } = element as Identifier;
					return name;
				});

				conditions.push({ type: condition, group });
			} else if (name === "any") {
				if (args.length !== 2) {
					throw new Error(
						`Invalid arguments: ${JSON.stringify(args)}`,
					);
				}

				const [threshold, addresses] = args;

				if (threshold.type !== "Literal") {
					throw new Error(
						`Invalid literal: ${JSON.stringify(threshold)}`,
					);
				}

				const value = (threshold as Literal).value;

				if (typeof value !== "number") {
					throw new Error(`Invalid number: ${value}`);
				}

				const condition = (
					value === 1 ? "anyone" : `group:${value}`
				) as "anyone" | `group:${number}`;

				if (addresses.type !== "ArrayExpression") {
					throw new Error(
						`Invalid array expression: ${JSON.stringify(addresses)}`,
					);
				}

				const { elements } = addresses as ArrayExpression;
				const group = elements.map((element) => {
					if (element.type !== "Identifier") {
						throw new Error(
							`Invalid identifier: ${JSON.stringify(element)}`,
						);
					}

					const { name } = element as Identifier;
					return name;
				});

				conditions.push({ type: condition, group });
			} else {
				throw new Error(`Invalid function: ${name}`);
			}
		} else {
			continue;
		}
	}

	return {
		operators,
		conditions,
	};
};

const useIntents = () => {
	const { spaceId } = useSpaceId();
	const { QuerySpaceById } = useWardenWardenV1Beta2();
	const { QueryIntents } = useWardenIntent();
	const client = useClient();
	const { toast } = useToast();

	const { sendMsgNewIntent, sendMsgUpdateIntent } = client.WardenIntent.tx;

	const newIntent = useCallback(
		async (creator: string, intent: Intent) => {
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

			const bytes = Uint8Array.from(
				res.tx_response.data
					.match(/.{1,2}/g)
					?.map((byte) => parseInt(byte, 16)) || [],
			);

			const msgData = TxMsgData.decode(bytes);
			const actionCreated = MsgActionCreated.decode(
				msgData.msgResponses[0].value,
			);
			// const actionId = actionCreated.action?.id;

			console.log("newIntent", { res, msgData, actionCreated });
		},
		[sendMsgNewIntent, toast],
	);

	const updateIntent = useCallback(
		async (creator: string, intent: Intent) => {
			const { name, id } = intent;
			const definition = createDefinition(intent);
			console.log("updateIntent", { definition });

			if (!id) {
				throw new Error("id is required; intent not created yet");
			}

			// TODO not working yet
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

			const bytes = Uint8Array.from(
				res.tx_response.data
					.match(/.{1,2}/g)
					?.map((byte) => parseInt(byte, 16)) || [],
			);

			const msgData = TxMsgData.decode(bytes);
			const actionCreated = MsgActionCreated.decode(
				msgData.msgResponses[0].value,
			);
			// const actionId = actionCreated.action?.id;

			console.log("newIntent", { res, msgData, actionCreated });
		},
		[sendMsgUpdateIntent, toast],
	);

	const space = QuerySpaceById({ id: spaceId }, {}).data?.space;
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

	return { newIntent, updateIntent, intentsBySpace };
};

function IntentsPage() {
	const { newIntent, updateIntent, intentsBySpace } = useIntents();
	const { address } = useAddressContext();
	const [isCreateModal, setIisCreateModal] = useState(false);
	const [_intents, setIntents] = useState<Intent[]>([]);

	const intents = useMemo(() => {
		if (!intentsBySpace) {
			return _intents;
		}

		const parsedIntents = intentsBySpace
			.map((intent) => {
				let definition = intent?.definition;

				if (
					!definition &&
					/** @ts-expect-error on devnet we have expression; on alfama definition still */
					intent?.expression
				) {
					/** @ts-expect-error devnet hack */
					const expression = intent.expression;
					console.log({ expression });
					definition = shieldStringify(expression);
				}

				if (!definition || !intent?.id) {
					return undefined;
				}

				try {
					const { operators, conditions } =
						parseSimpleIntent(definition);

					return {
						id: intent.id ? Number(intent.id) : undefined,
						name: intent.name ?? "",
						addresses: intent.addresses ?? [],
						conditions,
						operators,
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
			const newItem: Intent = {
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
		async (intent: Intent) => {
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
					<NewIntentButton onClick={() => setIisCreateModal(true)} />
				</div>
			</div>

			{isCreateModal && (
				<CreateIntentModal
					index={-1}
					onClose={() => setIisCreateModal(false)}
					handleCreateIntent={onIntentCreate}
				/>
			)}

			{intents.length ? (
				intents.map((intent, index) => (
					<IntentComponent
						intent={intent}
						index={index}
						key={intent.id ? intent.id : `${intent.name}:${index}`}
						onIntentRemove={onIntentRemove}
						onIntentSave={onIntentSave}
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
