import { SimpleIntent } from "@/types/intent";
import type { Expression } from "@/types/shield";

const cp: Record<string, string | undefined> = {
	"(": ")",
	"[": "]",
	"{": "}",
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
		const { left, operator, right } = expression.infix_expression;

		if (!left || !right) {
			throw new Error("incorrect infix expression");
		}

		const result = `${shieldStringify(left)} ${operator} ${shieldStringify(right)}`;
		console.log(result);
		return result;
	}

	return "";
};

export const getSimpleIntent = (
	name: string,
	expression: Expression,
): SimpleIntent => {
	const intent: SimpleIntent = {
		name,
		addresses: [],
		conditions: [],
		operators: [],
	};

	const iterate = (expression: Expression) => {};
};
