/**
 * A single JSON value. This is the missing return type of JSON.parse().
 */
export declare type JsonCompatibleValue = JsonCompatibleDictionary | JsonCompatibleArray | string | number | boolean | null;
/**
 * An array of JsonCompatibleValue
 */
export interface JsonCompatibleArray extends ReadonlyArray<JsonCompatibleValue> {
}
/**
 * A string to json value dictionary.
 */
export interface JsonCompatibleDictionary {
    readonly [key: string]: JsonCompatibleValue | readonly JsonCompatibleValue[];
}
export declare function isJsonCompatibleValue(value: unknown): value is JsonCompatibleValue;
export declare function isJsonCompatibleArray(value: unknown): value is JsonCompatibleArray;
export declare function isJsonCompatibleDictionary(data: unknown): data is JsonCompatibleDictionary;
