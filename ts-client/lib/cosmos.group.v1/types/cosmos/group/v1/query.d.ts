import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { GroupInfo, GroupMember, GroupPolicyInfo, Proposal, TallyResult, Vote } from "./types";
export declare const protobufPackage = "cosmos.group.v1";
/** Since: cosmos-sdk 0.46 */
/** QueryGroupInfoRequest is the Query/GroupInfo request type. */
export interface QueryGroupInfoRequest {
    /** group_id is the unique ID of the group. */
    groupId: number;
}
/** QueryGroupInfoResponse is the Query/GroupInfo response type. */
export interface QueryGroupInfoResponse {
    /** info is the GroupInfo of the group. */
    info: GroupInfo | undefined;
}
/** QueryGroupPolicyInfoRequest is the Query/GroupPolicyInfo request type. */
export interface QueryGroupPolicyInfoRequest {
    /** address is the account address of the group policy. */
    address: string;
}
/** QueryGroupPolicyInfoResponse is the Query/GroupPolicyInfo response type. */
export interface QueryGroupPolicyInfoResponse {
    /** info is the GroupPolicyInfo of the group policy. */
    info: GroupPolicyInfo | undefined;
}
/** QueryGroupMembersRequest is the Query/GroupMembers request type. */
export interface QueryGroupMembersRequest {
    /** group_id is the unique ID of the group. */
    groupId: number;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryGroupMembersResponse is the Query/GroupMembersResponse response type. */
export interface QueryGroupMembersResponse {
    /** members are the members of the group with given group_id. */
    members: GroupMember[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryGroupsByAdminRequest is the Query/GroupsByAdmin request type. */
export interface QueryGroupsByAdminRequest {
    /** admin is the account address of a group's admin. */
    admin: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryGroupsByAdminResponse is the Query/GroupsByAdminResponse response type. */
export interface QueryGroupsByAdminResponse {
    /** groups are the groups info with the provided admin. */
    groups: GroupInfo[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryGroupPoliciesByGroupRequest is the Query/GroupPoliciesByGroup request type. */
export interface QueryGroupPoliciesByGroupRequest {
    /** group_id is the unique ID of the group policy's group. */
    groupId: number;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryGroupPoliciesByGroupResponse is the Query/GroupPoliciesByGroup response type. */
export interface QueryGroupPoliciesByGroupResponse {
    /** group_policies are the group policies info associated with the provided group. */
    groupPolicies: GroupPolicyInfo[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryGroupPoliciesByAdminRequest is the Query/GroupPoliciesByAdmin request type. */
export interface QueryGroupPoliciesByAdminRequest {
    /** admin is the admin address of the group policy. */
    admin: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryGroupPoliciesByAdminResponse is the Query/GroupPoliciesByAdmin response type. */
export interface QueryGroupPoliciesByAdminResponse {
    /** group_policies are the group policies info with provided admin. */
    groupPolicies: GroupPolicyInfo[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryProposalRequest is the Query/Proposal request type. */
export interface QueryProposalRequest {
    /** proposal_id is the unique ID of a proposal. */
    proposalId: number;
}
/** QueryProposalResponse is the Query/Proposal response type. */
export interface QueryProposalResponse {
    /** proposal is the proposal info. */
    proposal: Proposal | undefined;
}
/** QueryProposalsByGroupPolicyRequest is the Query/ProposalByGroupPolicy request type. */
export interface QueryProposalsByGroupPolicyRequest {
    /** address is the account address of the group policy related to proposals. */
    address: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryProposalsByGroupPolicyResponse is the Query/ProposalByGroupPolicy response type. */
export interface QueryProposalsByGroupPolicyResponse {
    /** proposals are the proposals with given group policy. */
    proposals: Proposal[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryVoteByProposalVoterRequest is the Query/VoteByProposalVoter request type. */
export interface QueryVoteByProposalVoterRequest {
    /** proposal_id is the unique ID of a proposal. */
    proposalId: number;
    /** voter is a proposal voter account address. */
    voter: string;
}
/** QueryVoteByProposalVoterResponse is the Query/VoteByProposalVoter response type. */
export interface QueryVoteByProposalVoterResponse {
    /** vote is the vote with given proposal_id and voter. */
    vote: Vote | undefined;
}
/** QueryVotesByProposalRequest is the Query/VotesByProposal request type. */
export interface QueryVotesByProposalRequest {
    /** proposal_id is the unique ID of a proposal. */
    proposalId: number;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryVotesByProposalResponse is the Query/VotesByProposal response type. */
export interface QueryVotesByProposalResponse {
    /** votes are the list of votes for given proposal_id. */
    votes: Vote[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryVotesByVoterRequest is the Query/VotesByVoter request type. */
export interface QueryVotesByVoterRequest {
    /** voter is a proposal voter account address. */
    voter: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryVotesByVoterResponse is the Query/VotesByVoter response type. */
export interface QueryVotesByVoterResponse {
    /** votes are the list of votes by given voter. */
    votes: Vote[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryGroupsByMemberRequest is the Query/GroupsByMember request type. */
export interface QueryGroupsByMemberRequest {
    /** address is the group member address. */
    address: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryGroupsByMemberResponse is the Query/GroupsByMember response type. */
export interface QueryGroupsByMemberResponse {
    /** groups are the groups info with the provided group member. */
    groups: GroupInfo[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryTallyResultRequest is the Query/TallyResult request type. */
export interface QueryTallyResultRequest {
    /** proposal_id is the unique id of a proposal. */
    proposalId: number;
}
/** QueryTallyResultResponse is the Query/TallyResult response type. */
export interface QueryTallyResultResponse {
    /** tally defines the requested tally. */
    tally: TallyResult | undefined;
}
/**
 * QueryGroupsRequest is the Query/Groups request type.
 *
 * Since: cosmos-sdk 0.47.1
 */
export interface QueryGroupsRequest {
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QueryGroupsResponse is the Query/Groups response type.
 *
 * Since: cosmos-sdk 0.47.1
 */
export interface QueryGroupsResponse {
    /** `groups` is all the groups present in state. */
    groups: GroupInfo[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
export declare const QueryGroupInfoRequest: {
    encode(message: QueryGroupInfoRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupInfoRequest;
    fromJSON(object: any): QueryGroupInfoRequest;
    toJSON(message: QueryGroupInfoRequest): unknown;
    create<I extends {
        groupId?: number;
    } & {
        groupId?: number;
    } & { [K in Exclude<keyof I, "groupId">]: never; }>(base?: I): QueryGroupInfoRequest;
    fromPartial<I_1 extends {
        groupId?: number;
    } & {
        groupId?: number;
    } & { [K_1 in Exclude<keyof I_1, "groupId">]: never; }>(object: I_1): QueryGroupInfoRequest;
};
export declare const QueryGroupInfoResponse: {
    encode(message: QueryGroupInfoResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupInfoResponse;
    fromJSON(object: any): QueryGroupInfoResponse;
    toJSON(message: QueryGroupInfoResponse): unknown;
    create<I extends {
        info?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        };
    } & {
        info?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & { [K in Exclude<keyof I["info"], keyof GroupInfo>]: never; };
    } & { [K_1 in Exclude<keyof I, "info">]: never; }>(base?: I): QueryGroupInfoResponse;
    fromPartial<I_1 extends {
        info?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        };
    } & {
        info?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & { [K_2 in Exclude<keyof I_1["info"], keyof GroupInfo>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "info">]: never; }>(object: I_1): QueryGroupInfoResponse;
};
export declare const QueryGroupPolicyInfoRequest: {
    encode(message: QueryGroupPolicyInfoRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupPolicyInfoRequest;
    fromJSON(object: any): QueryGroupPolicyInfoRequest;
    toJSON(message: QueryGroupPolicyInfoRequest): unknown;
    create<I extends {
        address?: string;
    } & {
        address?: string;
    } & { [K in Exclude<keyof I, "address">]: never; }>(base?: I): QueryGroupPolicyInfoRequest;
    fromPartial<I_1 extends {
        address?: string;
    } & {
        address?: string;
    } & { [K_1 in Exclude<keyof I_1, "address">]: never; }>(object: I_1): QueryGroupPolicyInfoRequest;
};
export declare const QueryGroupPolicyInfoResponse: {
    encode(message: QueryGroupPolicyInfoResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupPolicyInfoResponse;
    fromJSON(object: any): QueryGroupPolicyInfoResponse;
    toJSON(message: QueryGroupPolicyInfoResponse): unknown;
    create<I extends {
        info?: {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        };
    } & {
        info?: {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        } & {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["info"]["decisionPolicy"], keyof import("../../../google/protobuf/any").Any>]: never; };
            createdAt?: Date;
        } & { [K_1 in Exclude<keyof I["info"], keyof GroupPolicyInfo>]: never; };
    } & { [K_2 in Exclude<keyof I, "info">]: never; }>(base?: I): QueryGroupPolicyInfoResponse;
    fromPartial<I_1 extends {
        info?: {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        };
    } & {
        info?: {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        } & {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_3 in Exclude<keyof I_1["info"]["decisionPolicy"], keyof import("../../../google/protobuf/any").Any>]: never; };
            createdAt?: Date;
        } & { [K_4 in Exclude<keyof I_1["info"], keyof GroupPolicyInfo>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "info">]: never; }>(object: I_1): QueryGroupPolicyInfoResponse;
};
export declare const QueryGroupMembersRequest: {
    encode(message: QueryGroupMembersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupMembersRequest;
    fromJSON(object: any): QueryGroupMembersRequest;
    toJSON(message: QueryGroupMembersRequest): unknown;
    create<I extends {
        groupId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        groupId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryGroupMembersRequest>]: never; }>(base?: I): QueryGroupMembersRequest;
    fromPartial<I_1 extends {
        groupId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        groupId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryGroupMembersRequest>]: never; }>(object: I_1): QueryGroupMembersRequest;
};
export declare const QueryGroupMembersResponse: {
    encode(message: QueryGroupMembersResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupMembersResponse;
    fromJSON(object: any): QueryGroupMembersResponse;
    toJSON(message: QueryGroupMembersResponse): unknown;
    create<I extends {
        members?: {
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        members?: {
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            };
        }[] & ({
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            };
        } & {
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            } & {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            } & { [K in Exclude<keyof I["members"][number]["member"], keyof import("./types").Member>]: never; };
        } & { [K_1 in Exclude<keyof I["members"][number], keyof GroupMember>]: never; })[] & { [K_2 in Exclude<keyof I["members"], keyof {
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof QueryGroupMembersResponse>]: never; }>(base?: I): QueryGroupMembersResponse;
    fromPartial<I_1 extends {
        members?: {
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        members?: {
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            };
        }[] & ({
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            };
        } & {
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            } & {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            } & { [K_5 in Exclude<keyof I_1["members"][number]["member"], keyof import("./types").Member>]: never; };
        } & { [K_6 in Exclude<keyof I_1["members"][number], keyof GroupMember>]: never; })[] & { [K_7 in Exclude<keyof I_1["members"], keyof {
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_8 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof QueryGroupMembersResponse>]: never; }>(object: I_1): QueryGroupMembersResponse;
};
export declare const QueryGroupsByAdminRequest: {
    encode(message: QueryGroupsByAdminRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupsByAdminRequest;
    fromJSON(object: any): QueryGroupsByAdminRequest;
    toJSON(message: QueryGroupsByAdminRequest): unknown;
    create<I extends {
        admin?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        admin?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryGroupsByAdminRequest>]: never; }>(base?: I): QueryGroupsByAdminRequest;
    fromPartial<I_1 extends {
        admin?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        admin?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryGroupsByAdminRequest>]: never; }>(object: I_1): QueryGroupsByAdminRequest;
};
export declare const QueryGroupsByAdminResponse: {
    encode(message: QueryGroupsByAdminResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupsByAdminResponse;
    fromJSON(object: any): QueryGroupsByAdminResponse;
    toJSON(message: QueryGroupsByAdminResponse): unknown;
    create<I extends {
        groups?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        groups?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[] & ({
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & { [K in Exclude<keyof I["groups"][number], keyof GroupInfo>]: never; })[] & { [K_1 in Exclude<keyof I["groups"], keyof {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryGroupsByAdminResponse>]: never; }>(base?: I): QueryGroupsByAdminResponse;
    fromPartial<I_1 extends {
        groups?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        groups?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[] & ({
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & { [K_4 in Exclude<keyof I_1["groups"][number], keyof GroupInfo>]: never; })[] & { [K_5 in Exclude<keyof I_1["groups"], keyof {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_6 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryGroupsByAdminResponse>]: never; }>(object: I_1): QueryGroupsByAdminResponse;
};
export declare const QueryGroupPoliciesByGroupRequest: {
    encode(message: QueryGroupPoliciesByGroupRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupPoliciesByGroupRequest;
    fromJSON(object: any): QueryGroupPoliciesByGroupRequest;
    toJSON(message: QueryGroupPoliciesByGroupRequest): unknown;
    create<I extends {
        groupId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        groupId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryGroupPoliciesByGroupRequest>]: never; }>(base?: I): QueryGroupPoliciesByGroupRequest;
    fromPartial<I_1 extends {
        groupId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        groupId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryGroupPoliciesByGroupRequest>]: never; }>(object: I_1): QueryGroupPoliciesByGroupRequest;
};
export declare const QueryGroupPoliciesByGroupResponse: {
    encode(message: QueryGroupPoliciesByGroupResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupPoliciesByGroupResponse;
    fromJSON(object: any): QueryGroupPoliciesByGroupResponse;
    toJSON(message: QueryGroupPoliciesByGroupResponse): unknown;
    create<I extends {
        groupPolicies?: {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        groupPolicies?: {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        }[] & ({
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        } & {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["groupPolicies"][number]["decisionPolicy"], keyof import("../../../google/protobuf/any").Any>]: never; };
            createdAt?: Date;
        } & { [K_1 in Exclude<keyof I["groupPolicies"][number], keyof GroupPolicyInfo>]: never; })[] & { [K_2 in Exclude<keyof I["groupPolicies"], keyof {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof QueryGroupPoliciesByGroupResponse>]: never; }>(base?: I): QueryGroupPoliciesByGroupResponse;
    fromPartial<I_1 extends {
        groupPolicies?: {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        groupPolicies?: {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        }[] & ({
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        } & {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_5 in Exclude<keyof I_1["groupPolicies"][number]["decisionPolicy"], keyof import("../../../google/protobuf/any").Any>]: never; };
            createdAt?: Date;
        } & { [K_6 in Exclude<keyof I_1["groupPolicies"][number], keyof GroupPolicyInfo>]: never; })[] & { [K_7 in Exclude<keyof I_1["groupPolicies"], keyof {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_8 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof QueryGroupPoliciesByGroupResponse>]: never; }>(object: I_1): QueryGroupPoliciesByGroupResponse;
};
export declare const QueryGroupPoliciesByAdminRequest: {
    encode(message: QueryGroupPoliciesByAdminRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupPoliciesByAdminRequest;
    fromJSON(object: any): QueryGroupPoliciesByAdminRequest;
    toJSON(message: QueryGroupPoliciesByAdminRequest): unknown;
    create<I extends {
        admin?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        admin?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryGroupPoliciesByAdminRequest>]: never; }>(base?: I): QueryGroupPoliciesByAdminRequest;
    fromPartial<I_1 extends {
        admin?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        admin?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryGroupPoliciesByAdminRequest>]: never; }>(object: I_1): QueryGroupPoliciesByAdminRequest;
};
export declare const QueryGroupPoliciesByAdminResponse: {
    encode(message: QueryGroupPoliciesByAdminResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupPoliciesByAdminResponse;
    fromJSON(object: any): QueryGroupPoliciesByAdminResponse;
    toJSON(message: QueryGroupPoliciesByAdminResponse): unknown;
    create<I extends {
        groupPolicies?: {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        groupPolicies?: {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        }[] & ({
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        } & {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["groupPolicies"][number]["decisionPolicy"], keyof import("../../../google/protobuf/any").Any>]: never; };
            createdAt?: Date;
        } & { [K_1 in Exclude<keyof I["groupPolicies"][number], keyof GroupPolicyInfo>]: never; })[] & { [K_2 in Exclude<keyof I["groupPolicies"], keyof {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof QueryGroupPoliciesByAdminResponse>]: never; }>(base?: I): QueryGroupPoliciesByAdminResponse;
    fromPartial<I_1 extends {
        groupPolicies?: {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        groupPolicies?: {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        }[] & ({
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        } & {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_5 in Exclude<keyof I_1["groupPolicies"][number]["decisionPolicy"], keyof import("../../../google/protobuf/any").Any>]: never; };
            createdAt?: Date;
        } & { [K_6 in Exclude<keyof I_1["groupPolicies"][number], keyof GroupPolicyInfo>]: never; })[] & { [K_7 in Exclude<keyof I_1["groupPolicies"], keyof {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_8 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof QueryGroupPoliciesByAdminResponse>]: never; }>(object: I_1): QueryGroupPoliciesByAdminResponse;
};
export declare const QueryProposalRequest: {
    encode(message: QueryProposalRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryProposalRequest;
    fromJSON(object: any): QueryProposalRequest;
    toJSON(message: QueryProposalRequest): unknown;
    create<I extends {
        proposalId?: number;
    } & {
        proposalId?: number;
    } & { [K in Exclude<keyof I, "proposalId">]: never; }>(base?: I): QueryProposalRequest;
    fromPartial<I_1 extends {
        proposalId?: number;
    } & {
        proposalId?: number;
    } & { [K_1 in Exclude<keyof I_1, "proposalId">]: never; }>(object: I_1): QueryProposalRequest;
};
export declare const QueryProposalResponse: {
    encode(message: QueryProposalResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryProposalResponse;
    fromJSON(object: any): QueryProposalResponse;
    toJSON(message: QueryProposalResponse): unknown;
    create<I extends {
        proposal?: {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            title?: string;
            summary?: string;
        };
    } & {
        proposal?: {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            title?: string;
            summary?: string;
        } & {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[] & string[] & { [K in Exclude<keyof I["proposal"]["proposers"], keyof string[]>]: never; };
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            } & {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            } & { [K_1 in Exclude<keyof I["proposal"]["finalTallyResult"], keyof TallyResult>]: never; };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[] & ({
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_2 in Exclude<keyof I["proposal"]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_3 in Exclude<keyof I["proposal"]["messages"], keyof {
                typeUrl?: string;
                value?: Uint8Array;
            }[]>]: never; };
            title?: string;
            summary?: string;
        } & { [K_4 in Exclude<keyof I["proposal"], keyof Proposal>]: never; };
    } & { [K_5 in Exclude<keyof I, "proposal">]: never; }>(base?: I): QueryProposalResponse;
    fromPartial<I_1 extends {
        proposal?: {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            title?: string;
            summary?: string;
        };
    } & {
        proposal?: {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            title?: string;
            summary?: string;
        } & {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[] & string[] & { [K_6 in Exclude<keyof I_1["proposal"]["proposers"], keyof string[]>]: never; };
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            } & {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            } & { [K_7 in Exclude<keyof I_1["proposal"]["finalTallyResult"], keyof TallyResult>]: never; };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[] & ({
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_8 in Exclude<keyof I_1["proposal"]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_9 in Exclude<keyof I_1["proposal"]["messages"], keyof {
                typeUrl?: string;
                value?: Uint8Array;
            }[]>]: never; };
            title?: string;
            summary?: string;
        } & { [K_10 in Exclude<keyof I_1["proposal"], keyof Proposal>]: never; };
    } & { [K_11 in Exclude<keyof I_1, "proposal">]: never; }>(object: I_1): QueryProposalResponse;
};
export declare const QueryProposalsByGroupPolicyRequest: {
    encode(message: QueryProposalsByGroupPolicyRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryProposalsByGroupPolicyRequest;
    fromJSON(object: any): QueryProposalsByGroupPolicyRequest;
    toJSON(message: QueryProposalsByGroupPolicyRequest): unknown;
    create<I extends {
        address?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        address?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryProposalsByGroupPolicyRequest>]: never; }>(base?: I): QueryProposalsByGroupPolicyRequest;
    fromPartial<I_1 extends {
        address?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        address?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryProposalsByGroupPolicyRequest>]: never; }>(object: I_1): QueryProposalsByGroupPolicyRequest;
};
export declare const QueryProposalsByGroupPolicyResponse: {
    encode(message: QueryProposalsByGroupPolicyResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryProposalsByGroupPolicyResponse;
    fromJSON(object: any): QueryProposalsByGroupPolicyResponse;
    toJSON(message: QueryProposalsByGroupPolicyResponse): unknown;
    create<I extends {
        proposals?: {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            title?: string;
            summary?: string;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        proposals?: {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            title?: string;
            summary?: string;
        }[] & ({
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            title?: string;
            summary?: string;
        } & {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[] & string[] & { [K in Exclude<keyof I["proposals"][number]["proposers"], keyof string[]>]: never; };
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            } & {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            } & { [K_1 in Exclude<keyof I["proposals"][number]["finalTallyResult"], keyof TallyResult>]: never; };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[] & ({
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_2 in Exclude<keyof I["proposals"][number]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_3 in Exclude<keyof I["proposals"][number]["messages"], keyof {
                typeUrl?: string;
                value?: Uint8Array;
            }[]>]: never; };
            title?: string;
            summary?: string;
        } & { [K_4 in Exclude<keyof I["proposals"][number], keyof Proposal>]: never; })[] & { [K_5 in Exclude<keyof I["proposals"], keyof {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            title?: string;
            summary?: string;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_6 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_7 in Exclude<keyof I, keyof QueryProposalsByGroupPolicyResponse>]: never; }>(base?: I): QueryProposalsByGroupPolicyResponse;
    fromPartial<I_1 extends {
        proposals?: {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            title?: string;
            summary?: string;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        proposals?: {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            title?: string;
            summary?: string;
        }[] & ({
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            title?: string;
            summary?: string;
        } & {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[] & string[] & { [K_8 in Exclude<keyof I_1["proposals"][number]["proposers"], keyof string[]>]: never; };
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            } & {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            } & { [K_9 in Exclude<keyof I_1["proposals"][number]["finalTallyResult"], keyof TallyResult>]: never; };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[] & ({
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_10 in Exclude<keyof I_1["proposals"][number]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_11 in Exclude<keyof I_1["proposals"][number]["messages"], keyof {
                typeUrl?: string;
                value?: Uint8Array;
            }[]>]: never; };
            title?: string;
            summary?: string;
        } & { [K_12 in Exclude<keyof I_1["proposals"][number], keyof Proposal>]: never; })[] & { [K_13 in Exclude<keyof I_1["proposals"], keyof {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            title?: string;
            summary?: string;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_14 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_15 in Exclude<keyof I_1, keyof QueryProposalsByGroupPolicyResponse>]: never; }>(object: I_1): QueryProposalsByGroupPolicyResponse;
};
export declare const QueryVoteByProposalVoterRequest: {
    encode(message: QueryVoteByProposalVoterRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryVoteByProposalVoterRequest;
    fromJSON(object: any): QueryVoteByProposalVoterRequest;
    toJSON(message: QueryVoteByProposalVoterRequest): unknown;
    create<I extends {
        proposalId?: number;
        voter?: string;
    } & {
        proposalId?: number;
        voter?: string;
    } & { [K in Exclude<keyof I, keyof QueryVoteByProposalVoterRequest>]: never; }>(base?: I): QueryVoteByProposalVoterRequest;
    fromPartial<I_1 extends {
        proposalId?: number;
        voter?: string;
    } & {
        proposalId?: number;
        voter?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryVoteByProposalVoterRequest>]: never; }>(object: I_1): QueryVoteByProposalVoterRequest;
};
export declare const QueryVoteByProposalVoterResponse: {
    encode(message: QueryVoteByProposalVoterResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryVoteByProposalVoterResponse;
    fromJSON(object: any): QueryVoteByProposalVoterResponse;
    toJSON(message: QueryVoteByProposalVoterResponse): unknown;
    create<I extends {
        vote?: {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        };
    } & {
        vote?: {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        } & {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        } & { [K in Exclude<keyof I["vote"], keyof Vote>]: never; };
    } & { [K_1 in Exclude<keyof I, "vote">]: never; }>(base?: I): QueryVoteByProposalVoterResponse;
    fromPartial<I_1 extends {
        vote?: {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        };
    } & {
        vote?: {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        } & {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        } & { [K_2 in Exclude<keyof I_1["vote"], keyof Vote>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "vote">]: never; }>(object: I_1): QueryVoteByProposalVoterResponse;
};
export declare const QueryVotesByProposalRequest: {
    encode(message: QueryVotesByProposalRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryVotesByProposalRequest;
    fromJSON(object: any): QueryVotesByProposalRequest;
    toJSON(message: QueryVotesByProposalRequest): unknown;
    create<I extends {
        proposalId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        proposalId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryVotesByProposalRequest>]: never; }>(base?: I): QueryVotesByProposalRequest;
    fromPartial<I_1 extends {
        proposalId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        proposalId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryVotesByProposalRequest>]: never; }>(object: I_1): QueryVotesByProposalRequest;
};
export declare const QueryVotesByProposalResponse: {
    encode(message: QueryVotesByProposalResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryVotesByProposalResponse;
    fromJSON(object: any): QueryVotesByProposalResponse;
    toJSON(message: QueryVotesByProposalResponse): unknown;
    create<I extends {
        votes?: {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        votes?: {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        }[] & ({
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        } & {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        } & { [K in Exclude<keyof I["votes"][number], keyof Vote>]: never; })[] & { [K_1 in Exclude<keyof I["votes"], keyof {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryVotesByProposalResponse>]: never; }>(base?: I): QueryVotesByProposalResponse;
    fromPartial<I_1 extends {
        votes?: {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        votes?: {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        }[] & ({
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        } & {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        } & { [K_4 in Exclude<keyof I_1["votes"][number], keyof Vote>]: never; })[] & { [K_5 in Exclude<keyof I_1["votes"], keyof {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_6 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryVotesByProposalResponse>]: never; }>(object: I_1): QueryVotesByProposalResponse;
};
export declare const QueryVotesByVoterRequest: {
    encode(message: QueryVotesByVoterRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryVotesByVoterRequest;
    fromJSON(object: any): QueryVotesByVoterRequest;
    toJSON(message: QueryVotesByVoterRequest): unknown;
    create<I extends {
        voter?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        voter?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryVotesByVoterRequest>]: never; }>(base?: I): QueryVotesByVoterRequest;
    fromPartial<I_1 extends {
        voter?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        voter?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryVotesByVoterRequest>]: never; }>(object: I_1): QueryVotesByVoterRequest;
};
export declare const QueryVotesByVoterResponse: {
    encode(message: QueryVotesByVoterResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryVotesByVoterResponse;
    fromJSON(object: any): QueryVotesByVoterResponse;
    toJSON(message: QueryVotesByVoterResponse): unknown;
    create<I extends {
        votes?: {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        votes?: {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        }[] & ({
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        } & {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        } & { [K in Exclude<keyof I["votes"][number], keyof Vote>]: never; })[] & { [K_1 in Exclude<keyof I["votes"], keyof {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryVotesByVoterResponse>]: never; }>(base?: I): QueryVotesByVoterResponse;
    fromPartial<I_1 extends {
        votes?: {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        votes?: {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        }[] & ({
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        } & {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        } & { [K_4 in Exclude<keyof I_1["votes"][number], keyof Vote>]: never; })[] & { [K_5 in Exclude<keyof I_1["votes"], keyof {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_6 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryVotesByVoterResponse>]: never; }>(object: I_1): QueryVotesByVoterResponse;
};
export declare const QueryGroupsByMemberRequest: {
    encode(message: QueryGroupsByMemberRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupsByMemberRequest;
    fromJSON(object: any): QueryGroupsByMemberRequest;
    toJSON(message: QueryGroupsByMemberRequest): unknown;
    create<I extends {
        address?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        address?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryGroupsByMemberRequest>]: never; }>(base?: I): QueryGroupsByMemberRequest;
    fromPartial<I_1 extends {
        address?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        address?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryGroupsByMemberRequest>]: never; }>(object: I_1): QueryGroupsByMemberRequest;
};
export declare const QueryGroupsByMemberResponse: {
    encode(message: QueryGroupsByMemberResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupsByMemberResponse;
    fromJSON(object: any): QueryGroupsByMemberResponse;
    toJSON(message: QueryGroupsByMemberResponse): unknown;
    create<I extends {
        groups?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        groups?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[] & ({
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & { [K in Exclude<keyof I["groups"][number], keyof GroupInfo>]: never; })[] & { [K_1 in Exclude<keyof I["groups"], keyof {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryGroupsByMemberResponse>]: never; }>(base?: I): QueryGroupsByMemberResponse;
    fromPartial<I_1 extends {
        groups?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        groups?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[] & ({
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & { [K_4 in Exclude<keyof I_1["groups"][number], keyof GroupInfo>]: never; })[] & { [K_5 in Exclude<keyof I_1["groups"], keyof {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_6 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryGroupsByMemberResponse>]: never; }>(object: I_1): QueryGroupsByMemberResponse;
};
export declare const QueryTallyResultRequest: {
    encode(message: QueryTallyResultRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryTallyResultRequest;
    fromJSON(object: any): QueryTallyResultRequest;
    toJSON(message: QueryTallyResultRequest): unknown;
    create<I extends {
        proposalId?: number;
    } & {
        proposalId?: number;
    } & { [K in Exclude<keyof I, "proposalId">]: never; }>(base?: I): QueryTallyResultRequest;
    fromPartial<I_1 extends {
        proposalId?: number;
    } & {
        proposalId?: number;
    } & { [K_1 in Exclude<keyof I_1, "proposalId">]: never; }>(object: I_1): QueryTallyResultRequest;
};
export declare const QueryTallyResultResponse: {
    encode(message: QueryTallyResultResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryTallyResultResponse;
    fromJSON(object: any): QueryTallyResultResponse;
    toJSON(message: QueryTallyResultResponse): unknown;
    create<I extends {
        tally?: {
            yesCount?: string;
            abstainCount?: string;
            noCount?: string;
            noWithVetoCount?: string;
        };
    } & {
        tally?: {
            yesCount?: string;
            abstainCount?: string;
            noCount?: string;
            noWithVetoCount?: string;
        } & {
            yesCount?: string;
            abstainCount?: string;
            noCount?: string;
            noWithVetoCount?: string;
        } & { [K in Exclude<keyof I["tally"], keyof TallyResult>]: never; };
    } & { [K_1 in Exclude<keyof I, "tally">]: never; }>(base?: I): QueryTallyResultResponse;
    fromPartial<I_1 extends {
        tally?: {
            yesCount?: string;
            abstainCount?: string;
            noCount?: string;
            noWithVetoCount?: string;
        };
    } & {
        tally?: {
            yesCount?: string;
            abstainCount?: string;
            noCount?: string;
            noWithVetoCount?: string;
        } & {
            yesCount?: string;
            abstainCount?: string;
            noCount?: string;
            noWithVetoCount?: string;
        } & { [K_2 in Exclude<keyof I_1["tally"], keyof TallyResult>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "tally">]: never; }>(object: I_1): QueryTallyResultResponse;
};
export declare const QueryGroupsRequest: {
    encode(message: QueryGroupsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupsRequest;
    fromJSON(object: any): QueryGroupsRequest;
    toJSON(message: QueryGroupsRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, "pagination">]: never; }>(base?: I): QueryGroupsRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "pagination">]: never; }>(object: I_1): QueryGroupsRequest;
};
export declare const QueryGroupsResponse: {
    encode(message: QueryGroupsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupsResponse;
    fromJSON(object: any): QueryGroupsResponse;
    toJSON(message: QueryGroupsResponse): unknown;
    create<I extends {
        groups?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        groups?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[] & ({
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & { [K in Exclude<keyof I["groups"][number], keyof GroupInfo>]: never; })[] & { [K_1 in Exclude<keyof I["groups"], keyof {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryGroupsResponse>]: never; }>(base?: I): QueryGroupsResponse;
    fromPartial<I_1 extends {
        groups?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        groups?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[] & ({
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & { [K_4 in Exclude<keyof I_1["groups"][number], keyof GroupInfo>]: never; })[] & { [K_5 in Exclude<keyof I_1["groups"], keyof {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_6 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryGroupsResponse>]: never; }>(object: I_1): QueryGroupsResponse;
};
/** Query is the cosmos.group.v1 Query service. */
export interface Query {
    /** GroupInfo queries group info based on group id. */
    GroupInfo(request: QueryGroupInfoRequest): Promise<QueryGroupInfoResponse>;
    /** GroupPolicyInfo queries group policy info based on account address of group policy. */
    GroupPolicyInfo(request: QueryGroupPolicyInfoRequest): Promise<QueryGroupPolicyInfoResponse>;
    /** GroupMembers queries members of a group by group id. */
    GroupMembers(request: QueryGroupMembersRequest): Promise<QueryGroupMembersResponse>;
    /** GroupsByAdmin queries groups by admin address. */
    GroupsByAdmin(request: QueryGroupsByAdminRequest): Promise<QueryGroupsByAdminResponse>;
    /** GroupPoliciesByGroup queries group policies by group id. */
    GroupPoliciesByGroup(request: QueryGroupPoliciesByGroupRequest): Promise<QueryGroupPoliciesByGroupResponse>;
    /** GroupPoliciesByAdmin queries group policies by admin address. */
    GroupPoliciesByAdmin(request: QueryGroupPoliciesByAdminRequest): Promise<QueryGroupPoliciesByAdminResponse>;
    /** Proposal queries a proposal based on proposal id. */
    Proposal(request: QueryProposalRequest): Promise<QueryProposalResponse>;
    /** ProposalsByGroupPolicy queries proposals based on account address of group policy. */
    ProposalsByGroupPolicy(request: QueryProposalsByGroupPolicyRequest): Promise<QueryProposalsByGroupPolicyResponse>;
    /** VoteByProposalVoter queries a vote by proposal id and voter. */
    VoteByProposalVoter(request: QueryVoteByProposalVoterRequest): Promise<QueryVoteByProposalVoterResponse>;
    /** VotesByProposal queries a vote by proposal id. */
    VotesByProposal(request: QueryVotesByProposalRequest): Promise<QueryVotesByProposalResponse>;
    /** VotesByVoter queries a vote by voter. */
    VotesByVoter(request: QueryVotesByVoterRequest): Promise<QueryVotesByVoterResponse>;
    /** GroupsByMember queries groups by member address. */
    GroupsByMember(request: QueryGroupsByMemberRequest): Promise<QueryGroupsByMemberResponse>;
    /**
     * TallyResult returns the tally result of a proposal. If the proposal is
     * still in voting period, then this query computes the current tally state,
     * which might not be final. On the other hand, if the proposal is final,
     * then it simply returns the `final_tally_result` state stored in the
     * proposal itself.
     */
    TallyResult(request: QueryTallyResultRequest): Promise<QueryTallyResultResponse>;
    /**
     * Groups queries all groups in state.
     *
     * Since: cosmos-sdk 0.47.1
     */
    Groups(request: QueryGroupsRequest): Promise<QueryGroupsResponse>;
}
export declare const QueryServiceName = "cosmos.group.v1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    GroupInfo(request: QueryGroupInfoRequest): Promise<QueryGroupInfoResponse>;
    GroupPolicyInfo(request: QueryGroupPolicyInfoRequest): Promise<QueryGroupPolicyInfoResponse>;
    GroupMembers(request: QueryGroupMembersRequest): Promise<QueryGroupMembersResponse>;
    GroupsByAdmin(request: QueryGroupsByAdminRequest): Promise<QueryGroupsByAdminResponse>;
    GroupPoliciesByGroup(request: QueryGroupPoliciesByGroupRequest): Promise<QueryGroupPoliciesByGroupResponse>;
    GroupPoliciesByAdmin(request: QueryGroupPoliciesByAdminRequest): Promise<QueryGroupPoliciesByAdminResponse>;
    Proposal(request: QueryProposalRequest): Promise<QueryProposalResponse>;
    ProposalsByGroupPolicy(request: QueryProposalsByGroupPolicyRequest): Promise<QueryProposalsByGroupPolicyResponse>;
    VoteByProposalVoter(request: QueryVoteByProposalVoterRequest): Promise<QueryVoteByProposalVoterResponse>;
    VotesByProposal(request: QueryVotesByProposalRequest): Promise<QueryVotesByProposalResponse>;
    VotesByVoter(request: QueryVotesByVoterRequest): Promise<QueryVotesByVoterResponse>;
    GroupsByMember(request: QueryGroupsByMemberRequest): Promise<QueryGroupsByMemberResponse>;
    TallyResult(request: QueryTallyResultRequest): Promise<QueryTallyResultResponse>;
    Groups(request: QueryGroupsRequest): Promise<QueryGroupsResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
