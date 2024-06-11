import { expect, test } from "vitest";

import { autocomplete, findByPosition, hasEntries, parseCode } from "./code";

const getCaretPosition = (str: string, caret: string = "|") => {
	const pos = str.indexOf(caret);

	if (pos < 0) {
		throw new Error("caret not found");
	}

	return {
		str: str.slice(0, pos) + str.slice(pos + 1),
		pos,
	};
};

// const codeOk1 = "ANY 2 FROM (ADR1, ADR2, ADR3) AND (ADR4 OR ADR5) OR ANY|";
// const codeOk2 = "|(ADR1 AND (ADR2 OR ADR3) AND ADR4) AND ADR5";
// const codeErr1 = "ANY 2 FROM (ADR1, ADR2, ADR3 AND (ADR4 OR ADR5)|";
test("correct tokenization", () => {
	const v = "(ALL FROM (ADR1) AND| ANY 1 FROM (ADR1)) AND ADR1";
	const { str: code /*, pos */ } = getCaretPosition(v);
	const result = parseCode(code);

	expect(result.refs.R1.tokens).toEqual([
		"ALL",
		"FROM",
		"R2",
		"AND",
		"ANY",
		"1",
		"FROM",
		"R3",
	]);
});

test("blank cases give root autocomplete choices", () => {
	const cases = ["|", "|()", "(|)"];

	for (const v of cases) {
		const { str: code, pos } = getCaretPosition(v);
		const result = parseCode(code);
		const lookup = findByPosition(pos, result.refs, result.rootRef);
		const items = autocomplete(lookup, result);
		expect(items.length).toBe(4);
	}
});

test("autocomplete for empty array", () => {
	const v = "ANY 2 FROM (|)";
	const { str: code, pos } = getCaretPosition(v);
	const result = parseCode(code);
	const lookup = findByPosition(pos, result.refs, result.rootRef);
	const items = autocomplete(lookup, result);
	const { value, lookupSymbol, title } = items[0];
	expect(value).toBe(v.replace("|", `${title}${lookupSymbol}`));
});

test("parentheses hell", () => {
	const v = ")))()(((()))(((|";
	const { str: code, pos } = getCaretPosition(v);
	const result = parseCode(code);
	expect(hasEntries(result.errors)).toBe(true);
	const lookup = findByPosition(pos, result.refs, result.rootRef);
	expect(lookup.node.id).toBe(result.rootRef);
});

