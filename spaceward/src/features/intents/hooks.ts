import { env } from "@/env";
import { useNewAction } from "@/hooks/useAction";
import { useQueryHooks, useTx } from "@/hooks/useClient";
import { useSpaceId } from "@/hooks/useSpaceId";
import type { IntentParams, SimpleIntent } from "@/types/intent";
import { shieldStringify, validateAddressNumber } from "@/utils/shield";
import { warden } from "@wardenprotocol/wardenjs";
import { Template } from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/template";
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
	const useRules = queryHooks.warden.act.v1beta1.useTemplates;
	const { tx } = useTx();

	const { newTemplate: msgNewRule, updateTemplate: msgUpdateRule } =
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
	const { newAction, authority } = useNewAction(MsgUpdateSpace, true);

	const rules = useRules({
		request: {
			creator: space?.creator,
		},
		options: {
			enabled: Boolean(space?.creator),
		},
	});

	const rulesBySpace = rules.data?.templates ?? [];

	const rulesById = useMemo(() => {
		const rulesById: Record<string, Template> = {};

		for (const rule of rules.data?.templates ?? []) {
			rulesById[rule.id.toString()] = rule;
		}

		return rulesById;
	}, [rules.data]);

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

				if (
					space.approveSignTemplateId &&
					space.approveSignTemplateId !== BigInt(id)
				) {
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
					approveAdminTemplateId: BigInt(0),
					approveSignTemplateId: BigInt(id),
					rejectAdminTemplateId: BigInt(0),
					rejectSignTemplateId: BigInt(0),
					nonce: space.nonce,
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
		activeRuleId: space?.approveSignTemplateId
			? Number(space.approveSignTemplateId)
			: undefined,
	};
};
