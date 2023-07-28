import type { FieldInfo, OneofInfo } from "../field.js";
export declare class InternalOneofInfo implements OneofInfo {
    readonly kind = "oneof";
    readonly name: string;
    readonly localName: string;
    readonly repeated = false;
    readonly packed = false;
    readonly opt = false;
    readonly default: undefined;
    readonly fields: FieldInfo[];
    private _lookup?;
    constructor(name: string);
    addField(field: FieldInfo): void;
    findField(localName: string): FieldInfo | undefined;
}
