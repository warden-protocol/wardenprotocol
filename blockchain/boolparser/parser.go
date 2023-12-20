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
	"fmt"
	"io"
)

type buf struct {
	tok Token
	n   int
}

type Parser struct {
	s   *Scanner
	buf buf
}

func NewParser(r io.Reader) *Parser {
	return &Parser{s: NewScanner(r)}
}

func (p *Parser) Scan() (tok Token) {
	if p.buf.n != 0 {
		p.buf.n = 0
		return p.buf.tok
	}

	tok = p.s.Scan()

	p.buf.tok = tok

	return
}

func (p *Parser) ScanIgnoreWhitespace() (tok Token) {
	tok = p.Scan()
	if tok.Type == WHITESPACE {
		tok = p.Scan()
	}
	return
}

func (p *Parser) UnScan() {
	p.buf.n = 1
}

func (p *Parser) Parse() (Stack, error) {
	stack := Stack{}
	for {
		tok := p.ScanIgnoreWhitespace()
		if tok.Type == ERROR {
			return Stack{}, fmt.Errorf("ERROR: %q", tok.Value)
		} else if tok.Type == EOF {
			break
		} else if tok.Type == OPERATOR && tok.Value == "-" {
			lastTok := stack.Peek()
			nextTok := p.ScanIgnoreWhitespace()
			if (lastTok.Type == OPERATOR || lastTok.Value == "" || lastTok.Type == LPAREN) && nextTok.Type == NUMBER {
				stack.Push(Token{NUMBER, "-" + nextTok.Value})
			} else {
				stack.Push(tok)
				p.UnScan()
			}
		} else {
			stack.Push(tok)
		}
	}
	return stack, nil
}
