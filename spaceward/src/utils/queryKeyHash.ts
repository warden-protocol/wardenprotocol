export type QueryKey = string | readonly unknown[]
export type EnsuredQueryKey<T extends QueryKey> = T extends string
	? [T]
	: Exclude<T, string>

export function hashQueryKey(queryKey: QueryKey): string {
	const asArray = ensureQueryKeyArray(queryKey)
	return stableValueHash(asArray)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function stableValueHash(value: any): string {
	return JSON.stringify(value, (_, val) =>
		isBigInt(val)
			? val.toString()
			: isPlainObject(val)
				? Object.keys(val)
					.sort()
					.reduce((result, key) => {
						result[key] = val[key]
						return result
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
					}, {} as any)
				: val
	)
}

function isBigInt(value: unknown): value is bigint {
	return typeof value === 'bigint'
}

export function ensureQueryKeyArray<T extends QueryKey>(
	value: T
): EnsuredQueryKey<T> {
	return (Array.isArray(value)
		? value
		: ([value] as unknown)) as EnsuredQueryKey<T>
}

// Copied from: https://github.com/jonschlinkert/is-plain-object
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
export function isPlainObject(o: any): o is Object {
	if (!hasObjectPrototype(o)) {
		return false
	}

	// If has modified constructor
	const ctor = o.constructor
	if (typeof ctor === 'undefined') {
		return true
	}

	// If has modified prototype
	const prot = ctor.prototype
	if (!hasObjectPrototype(prot)) {
		return false
	}

	// If constructor does not have an Object-specific method
	// eslint-disable-next-line no-prototype-builtins
	if (!prot.hasOwnProperty('isPrototypeOf')) {
		return false
	}

	// Most likely a plain Object
	return true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasObjectPrototype(o: any): boolean {
	return Object.prototype.toString.call(o) === '[object Object]'
}
