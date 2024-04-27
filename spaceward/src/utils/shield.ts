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

const shieldTraverseAst = (
	expression: Expression,
	callback: (expr: Expression, parent?: Expression) => void,
	parent?: Expression,
) => {
	if (
		expression.identifier ||
		expression.integer_literal ||
		expression.boolean_literal
	) {
		callback(expression, parent);
	} else if (expression.array_literal || expression.call_expression) {
		callback(expression, parent);

		const elements = expression.array_literal
			? expression.array_literal.elements
			: expression.call_expression?.arguments;

		for (const expr of elements ?? []) {
			shieldTraverseAst(expr, callback, expression);
		}
	} else if (expression.infix_expression) {
		callback(expression, parent);

		for (const expr of [
			expression.infix_expression.left,
			expression.infix_expression.right,
		]) {
			if (!expr) {
				throw new Error(
					`unexpected infix expression: ${JSON.stringify(expr)}`,
				);
			} else {
				shieldTraverseAst(expr, callback, expression);
			}
		}
	}
};

export const shieldStringify = (expression: Expression): string => {
	if (expression.identifier) {
		const { value } = expression.identifier;
		return value;
	} else if (expression.integer_literal) {
		const { value } = expression.integer_literal;
		return value.toString();
	} else if (expression.boolean_literal) {
		const { value } = expression.boolean_literal;
		return value ? "true" : "false";
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

		return `${open}${elements.map(shieldStringify).join(", ")}${close}`;
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

		return `${fn.value}${open}${args.map(shieldStringify).join(", ")}${close}`;
	} else if (expression.infix_expression) {
		let wrapLeft = false;
		let wrapRight = false;
		const { left, operator, right } = expression.infix_expression;

		if (!left || !right) {
			throw new Error("incorrect infix expression");
		}

		const precedence = PRECEDENCE[operator];

		if (!precedence) {
			throw new Error("incorrect infix operator");
		}

		if (left.infix_expression) {
			const _precedence = PRECEDENCE[left.infix_expression.operator];

			if (!_precedence) {
				throw new Error("incorect nested infix operator");
			}

			wrapLeft = _precedence > precedence;
		}

		if (right.infix_expression) {
			const _precedence = PRECEDENCE[right.infix_expression.operator];

			if (!_precedence) {
				throw new Error("incorect nested infix operator");
			}

			wrapRight = _precedence > precedence;
		}

		return `${wrapLeft ? "(" : ""}${shieldStringify(left)}${
			wrapLeft ? ")" : ""
		} ${operator} ${wrapRight ? "(" : ""}${shieldStringify(right)}${
			wrapRight ? ")" : ""
		}`;
	}

	return "";
};

export const getAddressesFromExpression = (expression: Expression) => {
	const addresses: string[] = [];

	shieldTraverseAst(expression, (ex) => {
		if (!ex.identifier) {
			return;
		}

		addresses.push(ex.identifier.value);
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
