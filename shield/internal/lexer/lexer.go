package lexer

import (
	"github.com/warden-protocol/wardenprotocol/shield/token"
)

type Lexer struct {
	input        string
	position     int  // current position in input (points to current char)
	readPosition int  // current reading position in input (after current char)
	ch           byte // current char under examination
}

func New(input string) *Lexer {
	l := &Lexer{input: input}
	l.readChar()
	return l
}

func (l *Lexer) NextToken() token.Token {
	var tok token.Token

	l.skipWhitespace()

	switch l.ch {
	case '(':
		tok = newToken(token.Type_LPAREN, l.ch)
	case ')':
		tok = newToken(token.Type_RPAREN, l.ch)
	case ',':
		tok = newToken(token.Type_COMMA, l.ch)
	case '[':
		tok = newToken(token.Type_LBRACKET, l.ch)
	case ']':
		tok = newToken(token.Type_RBRACKET, l.ch)
	case ';':
		tok = newToken(token.Type_SEMICOLON, l.ch)
	case '&':
		if l.peekChar() == '&' {
			ch := l.ch
			l.readChar()
			tok = token.Token{Type: token.Type_AND, Literal: string(ch) + string(l.ch)}
		} else {
			tok = newToken(token.Type_ILLEGAL, l.ch)
		}
	case '|':
		if l.peekChar() == '|' {
			ch := l.ch
			l.readChar()
			tok = token.Token{Type: token.Type_OR, Literal: string(ch) + string(l.ch)}
		} else {
			tok = newToken(token.Type_ILLEGAL, l.ch)
		}
	case '>':
		if l.peekChar() == '=' {
			ch := l.ch
			l.readChar()
			tok = token.Token{Type: token.Type_GTE, Literal: string(ch) + string(l.ch)}
		} else {
			tok = newToken(token.Type_GT, l.ch)
		}
	case '<':
		if l.peekChar() == '=' {
			ch := l.ch
			l.readChar()
			tok = token.Token{Type: token.Type_LTE, Literal: string(ch) + string(l.ch)}
		} else {
			tok = newToken(token.Type_LT, l.ch)
		}
	case '!':
		if l.peekChar() == '=' {
			ch := l.ch
			l.readChar()
			tok = token.Token{Type: token.Type_NEQ, Literal: string(ch) + string(l.ch)}
		} else {
			tok = newToken(token.Type_ILLEGAL, l.ch)
		}
	case '=':
		if l.peekChar() == '=' {
			ch := l.ch
			l.readChar()
			tok = token.Token{Type: token.Type_EQ, Literal: string(ch) + string(l.ch)}
		} else {
			tok = newToken(token.Type_ILLEGAL, l.ch)
		}
	case '"':
		l.readChar()
		tok = l.readString()
	case '+':
		tok = newToken(token.Type_ADD, l.ch)
	case '-':
		tok = newToken(token.Type_SUB, l.ch)
	case '*':
		tok = newToken(token.Type_MUL, l.ch)
	case '/':
		tok = newToken(token.Type_DIV, l.ch)
	case 0:
		tok.Literal = ""
		tok.Type = token.Type_EOF
	default:
		if isLetter(l.ch) {
			tok.Literal = l.readIdentifier()
			tok.Type = token.LookupIdent(tok.Literal)
			return tok
		} else if isDigit(l.ch) {
			tok.Type = token.Type_INT
			tok.Literal = l.readNumber()
			return tok
		} else {
			tok = newToken(token.Type_ILLEGAL, l.ch)
		}
	}

	l.readChar()

	return tok
}

func (l *Lexer) readChar() {
	if l.readPosition >= len(l.input) {
		l.ch = 0
	} else {
		l.ch = l.input[l.readPosition]
	}
	l.position = l.readPosition
	l.readPosition++
}

func (l *Lexer) peekChar() byte {
	if l.readPosition >= len(l.input) {
		return 0
	}
	return l.input[l.readPosition]
}

func (l *Lexer) readIdentifier() string {
	position := l.position
	for isLetter(l.ch) || isDigit(l.ch) || isDot(l.ch) {
		l.readChar()
	}
	return l.input[position:l.position]
}

func (l *Lexer) readNumber() string {
	position := l.position
	for isDigit(l.ch) {
		l.readChar()
	}
	return l.input[position:l.position]
}

func (l *Lexer) readString() token.Token {
	position := l.position
	for l.ch != '"' && l.ch != 0 {
		l.readChar()
	}

	if l.ch == 0 {
		return newToken(token.Type_ILLEGAL, l.input[position-1])
	}

	return token.Token{
		Type:    token.Type_STRING,
		Literal: l.input[position:l.position],
	}
}

func (l *Lexer) skipWhitespace() {
	for l.ch == ' ' || l.ch == '\t' || l.ch == '\n' || l.ch == '\r' {
		l.readChar()
	}
}

func newToken(tokenType token.Type, ch byte) token.Token {
	return token.Token{Type: tokenType, Literal: string(ch)}
}

func isLetter(ch byte) bool {
	return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z' || ch == '_'
}

func isDigit(ch byte) bool {
	return '0' <= ch && ch <= '9'
}

func isDot(ch byte) bool {
	return ch == '.'
}
