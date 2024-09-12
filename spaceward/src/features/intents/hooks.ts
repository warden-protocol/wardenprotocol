import { env } from "@/env";
import { useNewAction } from "@/hooks/useAction";
import { useQueryHooks, useTx } from "@/hooks/useClient";
import { useSpaceId } from "@/hooks/useSpaceId";
import type { IntentParams, SimpleIntent } from "@/types/intent";
import { shieldStringify, validateAddressNumber } from "@/utils/shield";
import { warden } from "@wardenprotocol/wardenjs";
import { PageRequest } from "@wardenprotocol/wardenjs/codegen/cosmos/base/query/v1beta1/pagination";
import { Rule } from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/rule";
import { useCallback, useMemo } from "react";
import { useModalState } from "../modals/state";

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
	const { setData: setModal } = useModalState();
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

	const rules = useRules({
		request: {
			pagination: PageRequest.fromPartial({ limit: BigInt(100000) }),
		},
	});

	/** @deprecated would be nice to query intent by creator or space */
	const { rulesBySpace, rulesById } = useMemo(() => {
		const rulesBySpace: Rule[] = [];
		const rulesById: Record<string, Rule> = {};

		for (const rule of rules.data?.rules ?? []) {
			if (rule.creator === space?.creator) {
				rulesBySpace.push(rule);
				rulesById[rule.id.toString()] = rule;
			}
		}

		return { rulesBySpace, rulesById };
	}, [rules.data, space?.creator]);

	const setActiveRule = useCallback(
		async (id: number) => {
			if (!space?.id) {
				return;
			}

			if (!authority) {
				throw new Error("authority is required");
			}

			if (id) {
				const rule = rulesById[id.toString()];
				validateAddressNumber(rule.expression);

				if (space.signRuleId && space.signRuleId !== BigInt(id)) {
					let resolve: undefined | (() => void);
					let reject: undefined | ((e: Error) => void);

					const promise = new Promise<void>((res, rej) => {
						resolve = res;
						reject = rej;
					});

					setModal({
						type: "confirm",
						params: {
							content:
								"Are you sure you want to change the active rule?",
							onConfirm: resolve,
							onCancel: reject?.bind(
								null,
								new Error("cancelled"),
							),
						},
					});

					await promise;
				}
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
		[authority, newAction, space, rulesById],
	);

	return {
		newRule,
		updateRule,
		setActiveRule,
		rulesBySpace,
		activeRuleId: space?.signRuleId ? Number(space.signRuleId) : undefined,
	};
};
