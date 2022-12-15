export interface SearchByHeightQuery {
    readonly height: number;
}
export interface SearchBySentFromOrToQuery {
    readonly sentFromOrTo: string;
}
/**
 * This query type allows you to pass arbitrary key/value pairs to the backend. It is
 * more powerful and slightly lower level than the other search options.
 */
export interface SearchByTagsQuery {
    readonly tags: ReadonlyArray<{
        readonly key: string;
        readonly value: string;
    }>;
}
export declare type SearchTxQuery = SearchByHeightQuery | SearchBySentFromOrToQuery | SearchByTagsQuery;
export declare function isSearchByHeightQuery(query: SearchTxQuery): query is SearchByHeightQuery;
export declare function isSearchBySentFromOrToQuery(query: SearchTxQuery): query is SearchBySentFromOrToQuery;
export declare function isSearchByTagsQuery(query: SearchTxQuery): query is SearchByTagsQuery;
export interface SearchTxFilter {
    readonly minHeight?: number;
    readonly maxHeight?: number;
}
