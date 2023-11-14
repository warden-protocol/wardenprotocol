/*
The MIT License (MIT)

Copyright (c) 2015 Marc Abi Khalil

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Original Source : https://github.com/marcmak/calc			2015
Updated & Modified: Christopher Morris chris@qredo.com 		2020

*/

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
