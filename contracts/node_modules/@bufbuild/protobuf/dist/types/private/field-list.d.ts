import type { FieldInfo, OneofInfo, PartialFieldInfo } from "../field.js";
import type { FieldList } from "../field-list.js";
export type FieldListSource = readonly PartialFieldInfo[] | readonly FieldInfo[] | (() => readonly PartialFieldInfo[]) | (() => readonly FieldInfo[]);
export declare class InternalFieldList implements FieldList {
    private readonly _fields;
    private readonly _normalizer;
    private all?;
    private numbersAsc?;
    private jsonNames?;
    private numbers?;
    private members?;
    constructor(fields: FieldListSource, normalizer: (p: FieldListSource) => FieldInfo[]);
    findJsonName(jsonName: string): FieldInfo | undefined;
    find(fieldNo: number): FieldInfo | undefined;
    list(): readonly FieldInfo[];
    byNumber(): readonly FieldInfo[];
    byMember(): readonly (FieldInfo | OneofInfo)[];
}
