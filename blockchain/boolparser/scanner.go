// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package boolparser

import (
	"bufio"
	"bytes"
	"io"
	"strings"
	"unicode"
)

type Scanner struct {
	r *bufio.Reader
}

func NewScanner(r io.Reader) *Scanner {
	return &Scanner{r: bufio.NewReader(r)}
}

func (s *Scanner) Read() rune {
	ch, _, err := s.r.ReadRune()
	if err != nil {
		return eof
	}
	return ch
}

func (s *Scanner) Unread() {
	_ = s.r.UnreadRune()
}

func (s *Scanner) Scan() Token {
	ch := s.Read()

	if unicode.IsDigit(ch) {
		s.Unread()
		return s.ScanNumber()
	} else if unicode.IsLetter(ch) {
		s.Unread()
		return s.ScanWord()
	} else if IsOperator(ch) {
		return Token{OPERATOR, string(ch)}
	} else if IsUnary(ch) {
		return Token{UNARY, string(ch)}
	} else if IsWhitespace(ch) {
		s.Unread()
		return s.ScanWhitespace()
	}

	switch ch {
	case eof:
		return Token{EOF, ""}
	case '(':
		return Token{LPAREN, "("}
	case ')':
		return Token{RPAREN, ")"}
	}

	return Token{ERROR, string(ch)}
}

func (s *Scanner) ScanWord() Token {
	var buf bytes.Buffer
	_, _ = buf.WriteRune(s.Read())

	for {
		if ch := s.Read(); ch == eof {
			break
		} else if ch == '(' {
			s.openBracket(buf, ch)
		} else if !unicode.IsLetter(ch) && !unicode.IsDigit(ch) {
			s.Unread()
			break
		} else {
			_, _ = buf.WriteRune(ch)
		}
	}
	return s.TokenType(buf)
}

func (s *Scanner) openBracket(buf bytes.Buffer, ch rune) {
	_, _ = buf.WriteRune(ch)
	parentCount := 1
	for parentCount > 0 {
		fch := s.Read()
		if fch == '(' {
			parentCount++
			_, _ = buf.WriteRune(fch)
		} else if fch == ')' {
			parentCount--
			_, _ = buf.WriteRune(fch)
		} else {
			_, _ = buf.WriteRune(fch)
		}
	}
}

func (*Scanner) TokenType(buf bytes.Buffer) Token {
	value := strings.ToUpper(buf.String())
	if strings.ContainsAny(value, "()") {
		return Token{FUNCTION, value}
	}
	return Token{CONSTANT, value}
}

func (s *Scanner) ScanNumber() Token {
	var buf bytes.Buffer
	_, _ = buf.WriteRune(s.Read())

	for {
		if ch := s.Read(); ch == eof {
			break
		} else if !unicode.IsDigit(ch) && ch != '.' {
			s.Unread()
			break
		} else {
			_, _ = buf.WriteRune(ch)
		}
	}

	return Token{NUMBER, buf.String()}
}

func (s *Scanner) ScanWhitespace() Token {
	var buf bytes.Buffer
	_, _ = buf.WriteRune(s.Read())

	for {
		if ch := s.Read(); ch == eof {
			break
		} else if !IsWhitespace(ch) {
			s.Unread()
			break
		} else {
			_, _ = buf.WriteRune(ch)
		}
	}

	return Token{WHITESPACE, buf.String()}
}

func IsOperator(r rune) bool {
	return r == '+' || r == '-' || r == '*' || r == '/' || r == '^' || r == '&' || r == '|' || r == '>' || r == '<'
}

func IsUnary(r rune) bool {
	return r == '!'
}

func IsWhitespace(ch rune) bool {
	return ch == ' ' || ch == '\t' || ch == '\n'
}
