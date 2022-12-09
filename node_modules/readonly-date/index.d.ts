/**
 * An object like JavaScript's Date, but immutable.
 *
 * Immutability is enforced at compile time by removing
 * all mutable methods in the type definition.
 */
export interface ReadonlyDate {
  toString(): string;
  toDateString(): string;
  toTimeString(): string;
  toLocaleString(): string;
  toLocaleDateString(): string;
  toLocaleTimeString(): string;
  valueOf(): number;
  getTime(): number;
  getFullYear(): number;
  getUTCFullYear(): number;
  getMonth(): number;
  getUTCMonth(): number;
  getDate(): number;
  getUTCDate(): number;
  getDay(): number;
  getUTCDay(): number;
  getHours(): number;
  getUTCHours(): number;
  getMinutes(): number;
  getUTCMinutes(): number;
  getSeconds(): number;
  getUTCSeconds(): number;
  getMilliseconds(): number;
  getUTCMilliseconds(): number;
  getTimezoneOffset(): number;
  toUTCString(): string;
  toISOString(): string;
  toJSON(key?: any): string;

  toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
  toLocaleDateString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
  toLocaleTimeString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;

  [Symbol.toPrimitive](hint: "default"): string;
  [Symbol.toPrimitive](hint: "string"): string;
  [Symbol.toPrimitive](hint: "number"): number;
  [Symbol.toPrimitive](hint: string): string | number;
}

interface ReadonlyDateConstructor {
  new(): ReadonlyDate;
  new(value: number | string): ReadonlyDate;
  new(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): ReadonlyDate;
  (): string;
  readonly prototype: Date;
  parse(s: string): number;
  UTC(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): number;
  now(): number;
}

declare const ReadonlyDate: ReadonlyDateConstructor;
