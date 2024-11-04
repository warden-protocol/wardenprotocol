import { useReadContract } from "wagmi";
import actPrecompileAbi from "@/contracts/actPrecompileAbi";
import { PRECOMPILE_ACT_ADDRESS } from "@/contracts/constants";
import { env } from "@/env";
import { DEFAULT_PAGINATION } from "./constants";
import type { Pagination, QueryOptions } from "./types";

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
		address: enabled ? PRECOMPILE_ACT_ADDRESS : undefined,
		args: enabled
			? [
					pagination,
					request.address!,
					request.status ?? ActionStatus.Unspecified,
				]
			: undefined,
		abi: actPrecompileAbi,
		functionName: "actionsByAddress",
		chainId,
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
		address: enabled ? PRECOMPILE_ACT_ADDRESS : undefined,
		args: enabled ? [pagination, request.creator!] : undefined,
		abi: actPrecompileAbi,
		functionName: "templates",
		chainId,
	});
};

export const useTemplateById = ({
	options,
	request,
}: {
	options?: QueryOptions;
	request: { templateId?: bigint };
}) => {
	const enabled =
		Boolean(options?.enabled ?? true) && Boolean(request.templateId);

	return useReadContract({
		address: enabled ? PRECOMPILE_ACT_ADDRESS : undefined,
		args: enabled ? [request.templateId!] : undefined,
		abi: actPrecompileAbi,
		functionName: "templateById",
		chainId,
	});
};
