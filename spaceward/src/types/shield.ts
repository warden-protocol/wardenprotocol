import type { Type } from "@wardenprotocol/wardenjs/codegen/shield/token/token";

export interface Token {
	type: Type;
	literal: string;
}

export interface Expression {
	identifier?: Identifier | undefined;
	integerLiteral?: IntegerLiteral | undefined;
	booleanLiteral?: BooleanLiteral | undefined;
	arrayLiteral?: ArrayLiteral | undefined;
	stringLiteral?: StringLiteral | undefined;
	callExpression?: CallExpression | undefined;
	infixExpression?: InfixExpression | undefined;
}

export interface Identifier {
	token: Token | undefined;
	value: string;
}

export interface IntegerLiteral {
	token: Token | undefined;
	value: string;
}

export interface BooleanLiteral {
	token: Token | undefined;
	value: boolean;
}

export interface ArrayLiteral {
	token: Token | undefined;
	elements: Expression[];
}

export interface StringLiteral {
	token: Token | undefined;
	value: string;
}

export interface CallExpression {
	token: Token | undefined;
	function?: Identifier;
	arguments: Expression[];
}

export interface InfixExpression {
	token: Token | undefined;
	left?: Expression;
	operator: string;
	right?: Expression;
}
