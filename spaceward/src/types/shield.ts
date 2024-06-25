enum Type {
	ILLEGAL = "ILLEGAL",
	EOF = "EOF",
	IDENT = "IDENT",
	INT = "INT",
	COMMA = "COMMA",
	SEMICOLON = "SEMICOLON",
	LPAREN = "LPAREN",
	RPAREN = "RPAREN",
	LBRACKET = "LBRACKET",
	RBRACKET = "RBRACKET",
	AND = "AND",
	OR = "OR",
	TRUE = "TRUE",
	FALSE = "FALSE",
	UNRECOGNIZED = "UNRECOGNIZED",
	STRING = "STRING"
}

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
	value: number;
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
	function: Identifier | undefined;
	arguments: Expression[];
}

export interface InfixExpression {
	token: Token | undefined;
	left: Expression | undefined;
	operator: string;
	right: Expression | undefined;
}
