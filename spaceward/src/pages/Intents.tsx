import { CreateIntentModal, Intent } from "@/features/intents";
import { useAddressContext } from "@/hooks/useAddressContext";
import { useQueryHooks, useTx } from "@/hooks/useClient";
import { useSpaceId } from "@/hooks/useSpaceId";
import { ConditionType, IntentParams, SimpleIntent } from "@/types/intent";
import { Expression } from "@/types/shield";
import { getSimpleIntent, shieldStringify } from "@/utils/shield";
import { isSet } from "@/utils/validate";
import { useCallback, useMemo, useState } from "react";
import { FilePlus2 } from "lucide-react";
import { env } from "@/env";
import { useNewAction } from "@/hooks/useAction";
import { warden } from "@wardenprotocol/wardenjs";
import { PageRequest } from "@wardenprotocol/wardenjs/codegen/cosmos/base/query/v1beta1/pagination";

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

export const useRules = () => {
	const { spaceId } = useSpaceId();
	const queryHooks = useQueryHooks();
	const useSpaceById = queryHooks.warden.warden.v1beta3.useSpaceById;
	const useRules = queryHooks.warden.act.v1beta1.useRules;
	const { tx } = useTx();

	const { newRule: msgNewRule, updateRule: msgUpdateRule } =
		warden.act.v1beta1.MessageComposer.withTypeUrl;

	const newRule = useCallback(
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

			const res = await tx(
				[msgNewRule({ creator, name, definition })],
				{},
			);

			if (!res) {
				throw new Error("failed to broadcast tx");
			}

			if (res.code !== 0) {
				throw new Error(`tx failed: ${JSON.stringify(res)}`);
			}
		},
		[msgNewRule, tx],
	);

	const updateRule = useCallback(
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
				: // fixme waiting for the correct contract address
					`contains(warden.analyzer.${env.ethereumAnalyzerContract}.to, [${whitelist.map((addr) => `"${addr}"`).join(", ")}]) && ${_definition}`;

			const res = await tx(
				[msgUpdateRule({ id: BigInt(id), creator, name, definition })],
				{},
			);

			if (!res) {
				throw new Error("failed to broadcast tx");
			}

			if (res.code !== 0) {
				throw new Error(`tx failed: ${JSON.stringify(res)}`);
			}
		},
		[msgUpdateRule, tx],
	);

	const space = useSpaceById({ request: { id: BigInt(spaceId || "") } }).data
		?.space;

	const { MsgUpdateSpace } = warden.warden.v1beta3;
	const { newAction, authority } = useNewAction(MsgUpdateSpace);

	const setActiveRule = useCallback(
		async (id: number) => {
			if (!space?.id) {
				return;
			}
			if (!authority) {
				throw new Error("authority is required");
			}

			await newAction(
				{
					authority,
					spaceId: BigInt(space.id),
					adminRuleId: BigInt(0),
					signRuleId: BigInt(id),
				},
				{},
			);
		},
		[authority, newAction, space?.id],
	);

	const rules = useRules({
		request: {
			pagination: PageRequest.fromPartial({ limit: BigInt(100) }),
		},
	});

	/** @deprecated would be nice to query intent by creator or space */
	const rulesBySpace = useMemo(
		() =>
			rules.data?.rules.filter((rule) => {
				return rule.creator === space?.creator;
			}),
		[rules.data, space?.creator],
	);

	return {
		newRule,
		updateRule,
		setActiveRule,
		rulesBySpace,
		activeRuleId: space?.signRuleId ? Number(space.signRuleId) : undefined,
	};
};

export function IntentsPage() {
	const { newRule, updateRule, rulesBySpace, activeRuleId, setActiveRule } =
		useRules();
	const { address } = useAddressContext();
	const [isCreateModal, setIsCreateModal] = useState(false);
	const [_rules, setRules] = useState<SimpleIntent[]>([]);

	const rules = useMemo(() => {
		if (!rulesBySpace) {
			return _rules;
		}

		const parsedRules = rulesBySpace
			.map((rule) => {
				// fixme get correct type from api
				const expression =
					(rule as { expression?: Expression })?.expression ?? {};

				if (!rule?.id) {
					return undefined;
				}

				try {
					return {
						id: rule.id ? Number(rule.id) : undefined,
						...getSimpleIntent(rule.name ?? "", expression),
					};
				} catch (e) {
					// if incorrect definition
					console.error(e);
					return undefined;
				}
			})
			.filter(isSet)
			.sort((a, b) => (b.id as number) - (a.id as number));

		return [..._rules, ...parsedRules];
	}, [_rules, rulesBySpace]);

	const onRuleCreate = useCallback(
		(name: string, condition: ConditionType) => {
			const newItem: SimpleIntent = {
				name: name,
				conditions: [{ type: condition, group: [], expression: {} }],
				addresses: [],
				operators: [],
				raw: {},
			};

			const newRulesArray = [..._rules];
			newRulesArray.push(newItem);
			setRules(newRulesArray);
		},
		[_rules],
	);

	const onRuleRemove = useCallback(
		(_index: number) => {
			const nextRules = [
				..._rules.filter((_, index) => index !== _index),
			];

			setRules(nextRules);
		},
		[_rules],
	);

	const onRuleSave = useCallback(
		async ({ simple, advanced }: IntentParams) => {
			const fn = simple?.id || advanced?.id ? updateRule : newRule;
			await fn(address, { simple, advanced });
		},
		[address, updateRule, newRule],
	);

	return (
		<div className="flex flex-col flex-1 px-8 py-4 space-y-8">
			<div className="flex items-center pb-4 space-x-6">
				<div>
					<h2 className="text-5xl">Rules</h2>
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
					handleCreateIntent={onRuleCreate}
					length={rules.length}
				/>
			)}
			{rules.length ? (
				<div className="flex flex-row space-x-4">
					<div className="w-full xl:w-8/12 flex flex-col space-y-4">
						{rules.map((rule, index) => (
							<Intent
								isActive={activeRuleId === rule.id}
								intent={rule}
								index={index}
								key={
									rule.id ? rule.id : `${rule.name}:${index}`
								}
								onIntentRemove={onRuleRemove}
								onIntentSave={onRuleSave}
								onIntentToggle={
									rule.id
										? setActiveRule.bind(
												null,
												activeRuleId === rule.id
													? 0
													: rule.id,
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
