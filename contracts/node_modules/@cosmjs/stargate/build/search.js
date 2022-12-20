"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSearchByTagsQuery = exports.isSearchBySentFromOrToQuery = exports.isSearchByHeightQuery = void 0;
function isSearchByHeightQuery(query) {
    return query.height !== undefined;
}
exports.isSearchByHeightQuery = isSearchByHeightQuery;
function isSearchBySentFromOrToQuery(query) {
    return query.sentFromOrTo !== undefined;
}
exports.isSearchBySentFromOrToQuery = isSearchBySentFromOrToQuery;
function isSearchByTagsQuery(query) {
    return query.tags !== undefined;
}
exports.isSearchByTagsQuery = isSearchByTagsQuery;
//# sourceMappingURL=search.js.map