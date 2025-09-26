import { useCallback, useMemo } from "react";
import { toBytes } from "viem";
import { usePublicClient, useWriteContract } from "wagmi";
import { toBech32 } from "@cosmjs/encoding";
import { env } from "@/env";
import actPrecompileAbi from "@/contracts/actPrecompileAbi";
import wardenPrecompileAbi from "@/contracts/wardenPrecompileAbi";
import { useSpaceId } from "@/hooks/useSpaceId";
import type { IntentParams, SimpleIntent } from "@/types/intent";
import { assertChain, handleContractWrite } from "@/utils/contract";
import { shieldStringify, validateAddressNumber } from "@/utils/shield";
import { useModalState } from "../modals/state";
import { useActionHandler } from "../actions/hooks";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import {
	PRECOMPILE_ACT_ADDRESS,
	PRECOMPILE_WARDEN_ADDRESS,
} from "@/contracts/constants";
import { useTemplates } from "@/hooks/query/act";
import { useSpaceById } from "@/hooks/query/warden";
import type { TemplateModel } from "@/hooks/query/types";
import { useQueryClient } from "@tanstack/react-query";

export const DEFAULT_EXPRESSION = "any(1, warden.space.owners)";

const createDefinition = (intent: SimpleIntent) => {
	const conditions = intent.conditions.map((condition) => {
		const { type, group: _group, shield, expression } = condition;

		const group = _group.map((addr) =>
			addr.startsWith("0x") ? toBech32("warden", toBytes(addr)) : addr,
		);

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
	const [{ wallet }] = useConnectWallet();
	const address = wallet?.accounts[0].address;
	const { setData: setModal } = useModalState();
	const { spaceId } = useSpaceId();
	const client = usePublicClient();
	const queryClient = useQueryClient();
	const { writeContractAsync } = useWriteContract();
	const [{ chains, connectedChain }, setChain] = useSetChain();

	const space = useSpaceById({
		request: { id: BigInt(spaceId || "") },
	}).data;

	const rules = useTemplates({
		request: {
			creator: space?.creator,
		},
	});

	const {
		add,
		expectedApproveExpression,
		expectedApproveQueryKey,
		expectedRejectExpression,
		expectedRejectQueryKey,
	} = useActionHandler(
		PRECOMPILE_WARDEN_ADDRESS,
		wardenPrecompileAbi,
		"updateSpace",
		true,
	);

	const newRule = useCallback(
		async ({ simple, advanced }: IntentParams) => {
			await assertChain(chains, connectedChain, setChain);

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

			await handleContractWrite(
				() =>
					writeContractAsync({
						address: PRECOMPILE_ACT_ADDRESS,
						abi: actPrecompileAbi,
						functionName: "newTemplate",
						args: [name, definition],
						account: address,
						connector: wallet?.wagmiConnector,
					}),
				client,
			);

			queryClient.invalidateQueries({ queryKey: rules.queryKey });
		},
		[
			writeContractAsync,
			client,
			chains,
			connectedChain,
			setChain,
			address,
			wallet?.wagmiConnector,
			rules.queryKey,
		],
	);

	const updateRule = useCallback(
		async ({ simple, advanced }: IntentParams) => {
			await assertChain(chains, connectedChain, setChain);

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

			await handleContractWrite(
				() =>
					writeContractAsync({
						address: PRECOMPILE_ACT_ADDRESS,
						abi: actPrecompileAbi,
						functionName: "updateTemplate",
						args: [BigInt(id), name, definition],
						account: address,
						connector: wallet?.wagmiConnector,
					}),
				client,
			);

			queryClient.invalidateQueries({ queryKey: rules.queryKey });

			queryClient.invalidateQueries({
				queryKey: expectedApproveQueryKey,
			});

			queryClient.invalidateQueries({ queryKey: expectedRejectQueryKey });
		},
		[
			writeContractAsync,
			client,
			chains,
			connectedChain,
			setChain,
			address,
			wallet?.wagmiConnector,
			rules.queryKey,
			expectedApproveQueryKey,
			expectedRejectQueryKey,
		],
	);

	const rulesBySpace = rules.data?.templates ?? [];

	const rulesById = useMemo(() => {
		const rulesById: Record<string, TemplateModel> = {};

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

			let title = "Disabling current intent";

			if (id) {
				const rule = rulesById[id.toString()];
				title = `Enabling intent ${rule.name}`;
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

			await add(
				[
					BigInt(space.id),
					space.nonce,
					BigInt(0),
					BigInt(0),
					BigInt(id),
					BigInt(0),
					BigInt(0),
					expectedApproveExpression,
					expectedRejectExpression,
				],
				{ title },
			);
		},
		[
			add,
			space,
			rulesById,
			expectedApproveExpression,
			expectedRejectExpression,
		],
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
