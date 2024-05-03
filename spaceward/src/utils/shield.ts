import { SimpleIntent } from "@/types/intent";
import type { Expression } from "@/types/shield";

const cp: Record<string, string | undefined> = {
	"(": ")",
	"[": "]",
	"{": "}",
};

const PRECEDENCE: Record<string, number | undefined> = {
	"&&": 1,
	"||": 2,
};

type ScalarTypes = "identifier" | "integer_literal" | "boolean_literal";
type ArrayTypes = "array_literal" | "call_expression";

type StringifyPart<T extends keyof Expression> = (
	data: T extends ScalarTypes
		? string
		: T extends ArrayTypes
			? string[]
			: [string, string],
	raw: Required<Expression>[T],
	parent?: Expression,
) => string;

const defaultStringifyScalar: StringifyPart<ScalarTypes> = (x) => x;

const defaultStringifyArray: StringifyPart<"array_literal"> = (args) =>
	`[${args.join(", ")}]`;

const defaultStringifyFn: StringifyPart<"call_expression"> = (args, raw) => {
	const name = raw.function?.value;

	if (!name) {
		throw new Error("incorrect function name");
	}

	return `${name}(${args.join(", ")})`;
};

const defaultStringifyInfix: StringifyPart<"infix_expression"> = (
	[left, right],
	raw,
	parent,
) => {
	const _precedence = parent?.infix_expression
		? PRECEDENCE[parent.infix_expression.operator]
		: Infinity;

	if (!_precedence) {
		throw new Error("incorrect parent operator");
	}

	const precedence = PRECEDENCE[raw.operator];

	if (!precedence) {
		throw new Error("incorrect operator");
	}

	const wrap = precedence > _precedence;
	return `${wrap ? "(" : ""}${left} ${raw.operator} ${right}${wrap ? ")" : ""}`;
};

interface StringifyOpts {
	identifier: StringifyPart<"identifier">;
	integer_literal: StringifyPart<"integer_literal">;
	boolean_literal: StringifyPart<"boolean_literal">;
	array_literal: StringifyPart<"array_literal">;
	call_expression: StringifyPart<"call_expression">;
	infix_expression: StringifyPart<"infix_expression">;
}

const defaultStringifyOpts: StringifyOpts = {
	identifier: defaultStringifyScalar,
	integer_literal: defaultStringifyScalar,
	boolean_literal: defaultStringifyScalar,
	array_literal: defaultStringifyArray,
	call_expression: defaultStringifyFn,
	infix_expression: defaultStringifyInfix,
};

export const shieldStringify = (
	expression: Expression,
	opts: StringifyOpts = defaultStringifyOpts,
	parent?: Expression,
): string => {
	if (expression.identifier) {
		const { value } = expression.identifier;
		return opts.identifier(value, expression.identifier, parent);
	} else if (expression.integer_literal) {
		const { value } = expression.integer_literal;
		return opts.integer_literal(
			value.toString(),
			expression.integer_literal,
			parent,
		);
	} else if (expression.boolean_literal) {
		const { value } = expression.boolean_literal;
		return opts.boolean_literal(
			value ? "true" : "false",
			expression.boolean_literal,
			parent,
		);
	} else if (expression.array_literal) {
		const { elements, token } = expression.array_literal;

		const open = token?.literal;

		if (!open) {
			throw new Error("incorrect open token");
		}

		const close = cp[open];

		if (!close) {
			throw new Error("incorrect close token");
		}

		const args = elements.map((x) => shieldStringify(x, opts, expression));
		return opts.array_literal(args, expression.array_literal, parent);
	} else if (expression.call_expression) {
		const {
			function: fn,
			token,
			arguments: args,
		} = expression.call_expression;

		if (!fn) {
			throw new Error("incorrect function");
		}

		const open = token?.literal;

		if (!open) {
			throw new Error("incorrect open token");
		}

		const close = cp[open];

		if (!close) {
			throw new Error("incorrect close token");
		}

		const _args = args.map((x) => shieldStringify(x, opts, expression));
		return opts.call_expression(_args, expression.call_expression, parent);
	} else if (expression.infix_expression) {
		const { left, right } = expression.infix_expression;

		if (!left || !right) {
			throw new Error("incorrect infix expression");
		}

		const _left = shieldStringify(left, opts, expression);
		const _right = shieldStringify(right, opts, expression);
		return opts.infix_expression(
			[_left, _right],
			expression.infix_expression,
			parent,
		);
	}

	return "";
};

export const getAddressesFromExpression = (expression: Expression) => {
	const addresses: string[] = [];

	// fixme small hack
	shieldStringify(expression, {
		...defaultStringifyOpts,
		identifier: (v) => {
			addresses.push(v);
			return v;
		},
	});

	return addresses;
};

/** @deprecated getting too hacky */
export const getSimpleIntent = (
	name: string,
	expression: Expression,
): SimpleIntent => {
	const intent: SimpleIntent = {
		name,
		addresses: getAddressesFromExpression(expression),
		conditions: [],
		operators: [],
		raw: expression,
	};

	const handleAddress = (addr: Expression) => {
		if (!addr.identifier) {
			throw new Error("incorrect address");
		}

		return addr.identifier.value;
	};

	const stack: Expression[] = [expression];

	while (stack.length) {
		const current = stack.pop();

		if (!current) {
			break;
		}

		try {
			if (current.infix_expression) {
				const { operator, left, right } = current.infix_expression;
				const precedence = PRECEDENCE[operator];
				let pushRight = true;
				let pushLeft = true;

				if (!left || !right) {
					throw new Error("incorrect infix expression");
				}

				if (!precedence) {
					throw new Error("incorrect operator");
				}

				if (left.infix_expression) {
					const _precedence =
						PRECEDENCE[left.infix_expression.operator];

					if (!_precedence) {
						throw new Error("incorrect nested infix operator");
					}

					if (_precedence > precedence) {
						pushLeft = false;

						intent.conditions.push({
							type: "advanced",
							group: getAddressesFromExpression(left),
							expression: left,
						});
					}
				}

				if (right.infix_expression) {
					const _precedence =
						PRECEDENCE[right.infix_expression.operator];

					if (!_precedence) {
						throw new Error("incorrect nested infix operator");
					}

					if (_precedence > precedence) {
						pushRight = false;
						intent.conditions.push({
							type: "advanced",
							group: getAddressesFromExpression(right),
							expression: left,
						});
					}
				}

				pushRight && stack.push(right);
				pushLeft && stack.push(left);

				if (operator === "&&") {
					intent.operators.push("and");
				} else if (operator === "||") {
					intent.operators.push("or");
				} else {
					// redundant
					throw new Error("incorrect operator");
				}
			} else if (current.call_expression) {
				const { function: fn, arguments: args } =
					current.call_expression;

				if (fn?.value === "all") {
					if (args.length !== 1) {
						throw new Error(
							"incorrect argument length, expected 1",
						);
					}

					if (!args[0].array_literal) {
						throw new Error(
							"incorrect argument type, expected array",
						);
					} else {
						const group =
							args[0].array_literal.elements.map(handleAddress);

						intent.conditions.push({
							type: "joint",
							group,
							expression: current,
						});
					}
				} else if (fn?.value === "any") {
					if (args.length !== 2) {
						throw new Error(
							"incorrect argument length, expected 2",
						);
					}

					if (!args[0].integer_literal) {
						throw new Error(
							"incorrect 1 argument type, expected integer",
						);
					}

					if (!args[1].array_literal) {
						throw new Error(
							"incorrect 2 argument type, expected array",
						);
					}

					const threshold = args[0].integer_literal.value;
					const group =
						args[1].array_literal.elements.map(handleAddress);

					intent.conditions.push({
						type: threshold > 1 ? `group:${threshold}` : "anyone",
						group,
						expression: current,
					});
				} else {
					throw new Error("incorrect function");
				}
			} else {
				throw new Error("unexpected expression");
			}
		} catch (e) {
			console.error(e); // fixme should be silent

			if ((e as Error)?.message.indexOf("operator") >= 0) {
				throw e; // fixme handle wrong operator
			}

			intent.conditions.push({
				type: "advanced",
				group: getAddressesFromExpression(current), // todo address extraction
				expression: current,
			});
		}
	}

	return intent;
};

type AddressReference = `ADR${number}`;

const ARG_NUM = {
	all: 1,
	any: 2,
} as const;
export const createHumanReadableCondition = (expr: Expression) => {
	let cAddr = 0;
	const sAddr: Record<string, AddressReference | undefined> = {};
	const references: Record<AddressReference, string> = {};

	const opts: StringifyOpts = {
		...defaultStringifyOpts,

		array_literal: (args) => `(${args.join(", ")})`,
		call_expression: (args, raw) => {
			const name = raw.function?.value;

			if (!name) {
				throw new Error("function name missing");
			}

			if (!(name in ARG_NUM)) {
				throw new Error("incorrect function name");
			}

			const argc = ARG_NUM[name as keyof typeof ARG_NUM];

			if (args.length !== argc) {
				throw new Error("argument length mismatch");
			}

			let result = name.toUpperCase();

			for (let i = 0; i < argc; i++) {
				const isLast = i === argc - 1;
				const arg = args[i];

				if (isLast) {
					result += ` FROM ${arg}`;
				} else {
					result += ` ${arg}`;
				}
			}

			return result;
		},

		identifier: (v) => {
			let ref = sAddr[v];

			if (!ref) {
				ref = `ADR${++cAddr}`;
				sAddr[v] = ref;
				references[ref] = v;
			}

			return ref;
		},
		infix_expression: ([left, right], raw, parent) => {
			const _precedence = parent?.infix_expression
				? PRECEDENCE[parent.infix_expression.operator]
				: Infinity;

			if (!_precedence) {
				throw new Error("incorrect parent operator");
			}

			const precedence = PRECEDENCE[raw.operator];

			if (!precedence) {
				throw new Error("incorrect operator");
			}

			const wrap = precedence > _precedence;
			return `${wrap ? "(" : ""}${left} ${raw.token?.type} ${right}${wrap ? ")" : ""}`;
		},
	};

	return {
		code: shieldStringify(expr, opts),
	};
};
