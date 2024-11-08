import { useReadContract } from "wagmi";
import actPrecompileAbi from "@/contracts/actPrecompileAbi";
import { PRECOMPILE_ACT_ADDRESS } from "@/contracts/constants";
import { env } from "@/env";
import { DEFAULT_PAGINATION } from "./constants";
import type { Pagination, QueryOptions } from "./types";
import { selectWithExpression } from "./util";

// TODO lib should not be dependent on env
const chainId = env.evmChainId;

export const useActions = ({
	options,
	request,
}: {
	options?: QueryOptions;
	request?: { pagination?: Pagination };
}) => {
	const enabled = Boolean(options?.enabled ?? true);
	const pagination = request?.pagination ?? DEFAULT_PAGINATION;

	return useReadContract({
		address: enabled ? PRECOMPILE_ACT_ADDRESS : undefined,
		args: enabled ? [pagination] : undefined,
		abi: actPrecompileAbi,
		functionName: "actions",
		chainId,
	});
};

export const useActionById = ({
	options,
	request,
}: {
	options?: QueryOptions;
	request: { actionId?: bigint };
}) => {
	const enabled =
		Boolean(options?.enabled ?? true) && Boolean(request.actionId);

	return useReadContract({
		address: enabled ? PRECOMPILE_ACT_ADDRESS : undefined,
		args: enabled ? [request.actionId!] : undefined,
		abi: actPrecompileAbi,
		functionName: "actionById",
		chainId,
	});
};

export enum ActionStatus {
	Unspecified,
	Pending,
	Completed,
	Revoked,
	Timeout,
}

export const useActionsByAddress = ({
	options,
	request,
}: {
	options?: QueryOptions;
	request: {
		address?: `0x${string}`;
		status?: ActionStatus;
		pagination?: Pagination;
	};
}) => {
	const enabled =
		Boolean(options?.enabled ?? true) && Boolean(request.address);

	const pagination = request.pagination ?? DEFAULT_PAGINATION;

	return useReadContract({
		address: PRECOMPILE_ACT_ADDRESS,
		args: !enabled
			? undefined
			: [
					pagination,
					request.address!,
					request.status ?? ActionStatus.Unspecified,
				],
		abi: actPrecompileAbi,
		functionName: "actionsByAddress",
		chainId,
		query: {
			enabled,
			select: ({ pagination, actions }) => ({
				pagination,
				actions: actions.map((x) =>
					selectWithExpression(
						"rejectExpression",
						selectWithExpression("approveExpression", x),
					),
				),
			}),
		},
	});
};

export const useTemplates = ({
	options,
	request,
}: {
	options?: QueryOptions;
	request: { creator?: `0x${string}`; pagination?: Pagination };
}) => {
	const enabled =
		Boolean(options?.enabled ?? true) && Boolean(request.creator);

	const pagination = request.pagination ?? DEFAULT_PAGINATION;

	return useReadContract({
		address: PRECOMPILE_ACT_ADDRESS,
		args: enabled ? [pagination, request.creator!] : undefined,
		abi: actPrecompileAbi,
		functionName: "templates",
		chainId,
		query: {
			enabled,
			select: ({ pagination, templates }) => ({
				pagination,
				templates: templates.map((x) =>
					selectWithExpression("expression", x),
				),
			}),
		},
	});
};

export const useTemplateById = ({
	options,
	request,
}: {
	options?: QueryOptions;
	request: { id?: bigint };
}) => {
	const enabled = Boolean(options?.enabled ?? true) && Boolean(request.id);

	return useReadContract({
		address: PRECOMPILE_ACT_ADDRESS,
		args: [request.id!],
		abi: actPrecompileAbi,
		functionName: "templateById",
		chainId,
		query: {
			enabled,
			select: ({ template }) => ({
				template: selectWithExpression("expression", template),
			}),
		},
	});
};
