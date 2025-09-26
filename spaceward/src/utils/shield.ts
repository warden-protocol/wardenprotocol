import { SimpleIntent } from "@/types/intent";
import type { Expression } from "@/types/shield";

const cp: Record<string, string | undefined> = {
	"": "",
	"(": ")",
	"[": "]",
	"{": "}",
};

const PRECEDENCE: Record<string, number | undefined> = {
	"&&": 1,
	"||": 2,
};

type ScalarTypes =
	| "identifier"
	| "integerLiteral"
	| "booleanLiteral"
	| "stringLiteral";
type ArrayTypes = "arrayLiteral" | "callExpression";

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

const defaultStringifyArray: StringifyPart<"arrayLiteral"> = (args) =>
	`[${args.join(", ")}]`;

const defaultStringifyFn: StringifyPart<"callExpression"> = (args, raw) => {
	const name = raw.function?.value;

	if (!name) {
		throw new Error("incorrect function name");
	}

	return `${name}(${args.join(", ")})`;
};

const defaultStringifyInfix: StringifyPart<"infixExpression"> = (
	[left, right],
	raw,
	parent,
) => {
	const _precedence = parent?.infixExpression
		? PRECEDENCE[parent.infixExpression.operator]
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
	integerLiteral: StringifyPart<"integerLiteral">;
	booleanLiteral: StringifyPart<"booleanLiteral">;
	stringLiteral: StringifyPart<"stringLiteral">;
	arrayLiteral: StringifyPart<"arrayLiteral">;
	callExpression: StringifyPart<"callExpression">;
	infixExpression: StringifyPart<"infixExpression">;
}

const defaultStringifyOpts: StringifyOpts = {
	identifier: defaultStringifyScalar,
	integerLiteral: defaultStringifyScalar,
	booleanLiteral: defaultStringifyScalar,
	stringLiteral: defaultStringifyScalar,
	arrayLiteral: defaultStringifyArray,
	callExpression: defaultStringifyFn,
	infixExpression: defaultStringifyInfix,
};

export const shieldStringify = (
	expression: Expression,
	opts: StringifyOpts = defaultStringifyOpts,
	parent?: Expression,
): string => {
	if (expression.identifier) {
		const { value } = expression.identifier;
		return opts.identifier(value, expression.identifier, parent);
	} else if (expression.integerLiteral) {
		const { value } = expression.integerLiteral;
		return opts.integerLiteral(
			value.toString(),
			expression.integerLiteral,
			parent,
		);
	} else if (expression.booleanLiteral) {
		const { value } = expression.booleanLiteral;

		return opts.booleanLiteral(
			value ? "true" : "false",
			expression.booleanLiteral,
			parent,
		);
	} else if (expression.stringLiteral) {
		const { value } = expression.stringLiteral;

		return opts.stringLiteral(
			`"${value}"`,
			expression.stringLiteral,
			parent,
		);
	} else if (expression.arrayLiteral) {
		const { elements, token } = expression.arrayLiteral;

		const open = token?.literal;
		const checkArrayToken = false;

		if (checkArrayToken) {
			// todo maybe an error
			if (typeof open === "undefined") {
				console.log({ expression, opts, parent });
				throw new Error("incorrect open token");
			}

			const close = cp[open];

			if (typeof close === "undefined") {
				throw new Error("incorrect close token");
			}
		}

		const args = elements.map((x) => shieldStringify(x, opts, expression));
		return opts.arrayLiteral(args, expression.arrayLiteral, parent);
	} else if (expression.callExpression) {
		const {
			function: fn,
			token,
			arguments: args,
		} = expression.callExpression;

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
		return opts.callExpression(_args, expression.callExpression, parent);
	} else if (expression.infixExpression) {
		const { left, right } = expression.infixExpression;

		if (!left || !right) {
			throw new Error("incorrect infix expression");
		}

		const Left = shieldStringify(left, opts, expression);
		const _right = shieldStringify(right, opts, expression);
		return opts.infixExpression(
			[Left, _right],
			expression.infixExpression,
			parent,
		);
	}

	return "";
};

export const getAddressesFromExpression = (expression: Expression) => {
	const addresses = new Set<string>();

	// fixme small hack
	shieldStringify(expression, {
		...defaultStringifyOpts,
		identifier: (v) => {
			if (!v.startsWith("warden.analyzer")) {
				addresses.add(v);
			}

			return v;
		},
	});

	return Array.from(addresses);
};

export const validateAddressNumber = (expression?: Expression) => {
	let error: string | undefined;

	if (!expression) {
		throw new Error("expression is required");
	}

	shieldStringify(expression, {
		...defaultStringifyOpts,
		callExpression: (_, raw) => {
			const name = raw.function?.value;

			switch (name) {
				case "all": {
					const {
						arguments: [arr],
					} = raw;

					if (!arr.arrayLiteral) {
						error =
							"Validation failed: expected array literal in 'all' clause";
						break;
					}

					if ((arr.arrayLiteral?.elements.length ?? 0) < 1) {
						error =
							"Validation failed: expected at least 1 element in 'all' clause";
						break;
					}

					break;
				}
				case "any": {
					const {
						arguments: [thresholdExpr, arr],
					} = raw;

					if (!thresholdExpr.integerLiteral) {
						error =
							"Validation failed: expected integer literal in 'any' clause";
						break;
					}

					const threshold = Number(
						thresholdExpr.integerLiteral.value,
					);

					if (threshold < 1) {
						error =
							"Validation failed: expected threshold to be greater than 0 in `any` clause";
						break;
					}

					if (!arr.arrayLiteral) {
						error =
							"Validation failed: expected array literal in 'any' clause";
						break;
					}

					if (arr.arrayLiteral.elements.length < threshold + 1) {
						error = `Validation failed: expected at least ${threshold + 1} elements in 'any' clause`;
						break;
					}

					break;
				}
				// do not validate whitelist
				case "contains": {
					break;
				}
				default:
					error = `Validation failed: unknown function name: ${name}`;
					break;
			}

			return "";
		},
	});

	if (error) {
		throw new Error(error);
	}

	return true;
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
			if (current.infixExpression) {
				const { operator, left, right } = current.infixExpression;
				const precedence = PRECEDENCE[operator];
				let pushRight = true;
				let pushLeft = true;

				if (!left || !right) {
					throw new Error("incorrect infix expression");
				}

				if (!precedence) {
					throw new Error("incorrect operator");
				}

				if (left.infixExpression) {
					const _precedence =
						PRECEDENCE[left.infixExpression.operator];

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
				} else if (
					left.callExpression?.function?.value === "contains"
				) {
					const { arguments: args } = left.callExpression;
					const [identifier, array] = args;

					if (
						identifier.identifier?.value.startsWith(
							"warden.analyzer",
						)
					) {
						intent.whitelist = array.arrayLiteral?.elements
							.map((x) => x.stringLiteral?.value)
							.filter(Boolean) as string[] | undefined;

						stack.push(right);
						intent.raw = right;
						continue;
					} else {
						console.warn("incorrect whitelist");
					}
				}

				if (right.infixExpression) {
					const _precedence =
						PRECEDENCE[right.infixExpression.operator];

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
			} else if (current.callExpression) {
				const { function: fn, arguments: args } =
					current.callExpression;

				if (fn?.value === "all") {
					if (args.length !== 1) {
						throw new Error(
							"incorrect argument length, expected 1",
						);
					}

					if (!args[0].arrayLiteral) {
						throw new Error(
							"incorrect argument type, expected array",
						);
					} else {
						const group =
							args[0].arrayLiteral.elements.map(handleAddress);

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

					if (!args[0].integerLiteral) {
						throw new Error(
							"incorrect 1 argument type, expected integer",
						);
					}

					if (!args[1].arrayLiteral) {
						throw new Error(
							"incorrect 2 argument type, expected array",
						);
					}

					const threshold = Number(args[0].integerLiteral.value);
					const group =
						args[1].arrayLiteral.elements.map(handleAddress);

					intent.conditions.push({
						type: threshold > 1 ? `group:${threshold}` : "anyone",
						group,
						expression: current,
					});
				} else {
					throw new Error("incorrect function");
				}
			} else {
				throw new Error(
					`unexpected expression ${JSON.stringify(current)}`,
				);
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

const WHITELIST_PLACEHOLDER = "#WHITELIST#";

export const createHumanReadableCondition = (expr: Expression) => {
	let cAddr = 0;
	const sAddr: Record<string, AddressReference | undefined> = {};
	const references: Record<AddressReference, string> = {};

	const opts: StringifyOpts = {
		...defaultStringifyOpts,

		arrayLiteral: (args) => `(${args.join(", ")})`,
		callExpression: (args, raw) => {
			const name = raw.function?.value;

			if (!name) {
				throw new Error("function name missing");
			}

			// fixme whitelist
			if (name === "contains") {
				return WHITELIST_PLACEHOLDER;
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
		infixExpression: ([left, right], raw, parent) => {
			const _precedence = parent?.infixExpression
				? PRECEDENCE[parent.infixExpression.operator]
				: Infinity;

			if (!_precedence) {
				throw new Error("incorrect parent operator");
			}

			// fixme whitelist
			if (left === WHITELIST_PLACEHOLDER) {
				return right;
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
		references,
	};
};
