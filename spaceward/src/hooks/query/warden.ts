import { useReadContract, useWatchContractEvent } from "wagmi";
import { PRECOMPILE_WARDEN_ADDRESS } from "@/contracts/constants";
import wardenPrecompileAbi from "@/contracts/wardenPrecompileAbi";
import { env } from "@/env";
import { DEFAULT_PAGINATION } from "./constants";
import type { Pagination, QueryOptions } from "./types";
import { useQueryClient } from "@tanstack/react-query";

export enum AddressType {
	Unspecified = 0,
	Ethereum = 1,
	Osmosis = 2,
}

const EMPTY_ARR: any[] = [];
// TODO lib should not be dependent on env
const chainId = env.evmChainId;

export const useAllKeys = ({
	options,
	request,
}: {
	options?: QueryOptions;
	request?: { pagination?: Pagination; deriveAddresses?: AddressType[] };
}) => {
	const enabled = Boolean(options?.enabled ?? true);
	const pagination = request?.pagination ?? DEFAULT_PAGINATION;

	return useReadContract({
		address: enabled ? PRECOMPILE_WARDEN_ADDRESS : undefined,
		args: enabled
			? [pagination, request?.deriveAddresses ?? EMPTY_ARR]
			: undefined,
		abi: wardenPrecompileAbi,
		functionName: "allKeys",
		chainId,
	});
};

export const useKeyById = ({
	options,
	request,
}: {
	options?: QueryOptions;
	request: { id?: bigint; deriveAddresses?: AddressType[] };
}) => {
	const enabled = Boolean(options?.enabled ?? true) && Boolean(request.id);

	return useReadContract({
		address: enabled ? PRECOMPILE_WARDEN_ADDRESS : undefined,
		args: enabled
			? [request.id!, request.deriveAddresses ?? EMPTY_ARR]
			: undefined,
		abi: wardenPrecompileAbi,
		functionName: "keyById",
		chainId,
	});
};

interface GetKeysBySpaceIdRequest {
	pagination?: Pagination;
	spaceId: bigint;
	deriveAddresses?: AddressType[];
}

const isGetKeysBySpaceIdRequestEnabled = (
	request: Partial<GetKeysBySpaceIdRequest>,
): request is GetKeysBySpaceIdRequest => Boolean(request.spaceId);

type Writeable<T> = { -readonly [P in keyof T]: T[P] };
const writable = <T>(obj: T): Writeable<T> => obj;

export const getKeysBySpaceIdArgs = (request: GetKeysBySpaceIdRequest) => {
	const pagination = request?.pagination ?? DEFAULT_PAGINATION;
	const deriveAddresses =
		request?.deriveAddresses ?? (EMPTY_ARR as AddressType[]);

	return writable([pagination, request.spaceId, deriveAddresses] as const);
};

export const useKeysBySpaceId = ({
	options,
	request,
}: {
	options?: QueryOptions;
	request: Partial<GetKeysBySpaceIdRequest>;
}) => {
	const enabled = Boolean(options?.enabled ?? true);

	return useReadContract({
		address: enabled ? PRECOMPILE_WARDEN_ADDRESS : undefined,
		args:
			enabled && isGetKeysBySpaceIdRequestEnabled(request)
				? getKeysBySpaceIdArgs(request)
				: undefined,
		abi: wardenPrecompileAbi,
		functionName: "keysBySpaceId",
		chainId,
	});
};

export const useKeyRequestById = ({
	options,
	request,
}: {
	options?: QueryOptions;
	request: { id?: bigint };
}) => {
	const enabled = Boolean(options?.enabled ?? true) && Boolean(request.id);

	return useReadContract({
		address: enabled ? PRECOMPILE_WARDEN_ADDRESS : undefined,
		args: enabled ? [request.id!] : undefined,
		abi: wardenPrecompileAbi,
		functionName: "keyRequestById",
		chainId,
	});
};

export enum KeyRequestStatus {
	Unspecified = 0,
	Pending = 1,
	Fulfilled = 2,
	Rejected = 3,
}

export const useKeyRequests = ({
	options,
	request,
}: {
	options?: QueryOptions;
	request: {
		pagination?: Pagination;
		keychainId?: bigint;
		status?: KeyRequestStatus;
		spaceId?: bigint;
	};
}) => {
	const enabled =
		Boolean(options?.enabled ?? true) &&
		Boolean(request.keychainId) &&
		Boolean(request.spaceId);

	const pagination = request?.pagination ?? DEFAULT_PAGINATION;

	return useReadContract({
		address: enabled ? PRECOMPILE_WARDEN_ADDRESS : undefined,
		args: enabled
			? [
					pagination,
					request.keychainId!,
					request.status ?? KeyRequestStatus.Unspecified,
					request.spaceId!,
				]
			: undefined,
		abi: wardenPrecompileAbi,
		functionName: "keyRequests",
		chainId,
	});
};

export const useKeychainById = ({
	options,
	request,
}: {
	options?: QueryOptions;
	request: { id?: bigint };
}) => {
	const enabled = Boolean(options?.enabled ?? true) && Boolean(request.id);

	return useReadContract({
		address: enabled ? PRECOMPILE_WARDEN_ADDRESS : undefined,
		args: enabled ? [request.id!] : undefined,
		abi: wardenPrecompileAbi,
		functionName: "keychainById",
		chainId,
	});
};

export const useKeychains = ({
	options,
	request,
}: {
	options?: QueryOptions;
	request?: { pagination?: Pagination };
}) => {
	const enabled = Boolean(options?.enabled ?? true);
	const pagination = request?.pagination ?? DEFAULT_PAGINATION;

	return useReadContract({
		address: enabled ? PRECOMPILE_WARDEN_ADDRESS : undefined,
		args: enabled ? [pagination] : undefined,
		abi: wardenPrecompileAbi,
		functionName: "keychains",
		chainId,
	});
};

export const useSignRequestById = ({
	options,
	request,
}: {
	options?: QueryOptions;
	request: { id?: bigint };
}) => {
	const enabled = Boolean(options?.enabled ?? true) && Boolean(request.id);

	return useReadContract({
		address: enabled ? PRECOMPILE_WARDEN_ADDRESS : undefined,
		args: enabled ? [request.id!] : undefined,
		abi: wardenPrecompileAbi,
		functionName: "signRequestById",
		chainId,
	});
};

export enum SignRequestStatus {
	Unspecified = 0,
	Pending = 1,
	Fulfilled = 2,
	Rejected = 3,
}

export const useSignRequests = ({
	options,
	request,
}: {
	options?: QueryOptions;
	request: {
		pagination?: Pagination;
		keychainId?: bigint;
		status?: SignRequestStatus;
	};
}) => {
	const enabled =
		Boolean(options?.enabled ?? true) && Boolean(request.keychainId);
	const pagination = request?.pagination ?? DEFAULT_PAGINATION;

	return useReadContract({
		address: enabled ? PRECOMPILE_WARDEN_ADDRESS : undefined,
		args: enabled
			? [
					pagination,
					request.keychainId!,
					request.status ?? SignRequestStatus.Unspecified,
				]
			: undefined,
		abi: wardenPrecompileAbi,
		functionName: "signRequests",
		chainId,
	});
};

export const useSpaceById = ({
	options,
	request,
}: {
	options?: QueryOptions;
	request: { id?: bigint };
}) => {
	const enabled = Boolean(options?.enabled ?? true) && Boolean(request.id);

	return useReadContract({
		address: PRECOMPILE_WARDEN_ADDRESS,
		args: [request.id!],
		abi: wardenPrecompileAbi,
		functionName: "spaceById",
		chainId,
		query: {
			enabled,
		},
	});
};

export const useSpaces = ({
	options,
	request,
}: {
	options?: QueryOptions;
	request?: { pagination?: Pagination };
}) => {
	const enabled = Boolean(options?.enabled ?? true);
	const pagination = request?.pagination ?? DEFAULT_PAGINATION;

	const query = useReadContract({
		address: enabled ? PRECOMPILE_WARDEN_ADDRESS : undefined,
		args: enabled ? [pagination] : undefined,
		abi: wardenPrecompileAbi,
		functionName: "spaces",
		chainId,
	});

	return query;
};

export const useSpacesByOwner = ({
	options,
	request,
}: {
	options?: QueryOptions;
	request: { pagination?: Pagination; owner?: `0x${string}` };
}) => {
	const enabled = Boolean(options?.enabled ?? true) && Boolean(request.owner);
	const pagination = request?.pagination ?? DEFAULT_PAGINATION;

	const query = useReadContract({
		address: enabled ? PRECOMPILE_WARDEN_ADDRESS : undefined,
		args: enabled ? [pagination, request.owner!] : undefined,
		abi: wardenPrecompileAbi,
		functionName: "spacesByOwner",
		chainId,
	});

	return query;
};
