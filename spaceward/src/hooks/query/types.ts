import type { useActionsByAddress, useTemplates } from "@/hooks/query/act";
import type { useKeychains, useKeysBySpaceId } from "./warden";

export interface QueryOptions {
	enabled?: boolean;
}

export interface Pagination {
	key: `0x${string}`;
	offset: bigint;
	limit: bigint;
	countTotal: boolean;
	reverse: boolean;
}

export type ActionModel = NonNullable<
	ReturnType<typeof useActionsByAddress>["data"]
>["actions"][number];

export type KeyModel = NonNullable<
	ReturnType<typeof useKeysBySpaceId>["data"]
>[0][number];

export type KeychainModel = NonNullable<
	ReturnType<typeof useKeychains>["data"]
>[0][number];

export type TemplateModel = NonNullable<
	ReturnType<typeof useTemplates>["data"]
>["templates"][number];
