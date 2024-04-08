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
}

export interface Token {
	type: Type;
	literal: string;
}

export interface Expression {
	identifier?: Identifier | undefined;
	integer_literal?: IntegerLiteral | undefined;
	boolean_literal?: BooleanLiteral | undefined;
	array_literal?: ArrayLiteral | undefined;
	call_expression?: CallExpression | undefined;
	infix_expression?: InfixExpression | undefined;
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
