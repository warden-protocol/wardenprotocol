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
	"strconv"
	"strings"
)

var oprData = map[string]struct {
	prec  int
	rAsoc bool // true = right // false = left
	fx    func(x, y float64) float64
}{
	// "^": {4, true, func(x, y float64) float64 { return math.Pow(x, y) }},
	"*": {3, false, func(x, y float64) float64 { return x * y }},
	//	"/": {3, false, func(x, y float64) float64 { return x / y }},
	"+": {2, false, func(x, y float64) float64 { return x + y }},
	"-": {2, false, func(x, y float64) float64 { return x - y }},
	">": {2, false, func(x, y float64) float64 { return b2f(x > y) }},
	"<": {2, false, func(x, y float64) float64 { return b2f(x < y) }},
	"&": {2, false, func(x, y float64) float64 { return b2f(f2b(x) && f2b(y)) }},
	"|": {2, false, func(x, y float64) float64 { return b2f(f2b(x) || f2b(y)) }},
	// "!": {2, false, func(x, y float64) float64 { return b2f(!f2b(x)) }},
}

var unaryData = map[string]struct {
	fx func(x float64) float64
}{
	"!": {func(x float64) float64 { return b2f(!f2b(x)) }},
}

func f2b(f float64) bool {
	return f != 0
}
func b2f(b bool) float64 {
	if !b {
		return 0
	}
	return 1
}

// SolvePostfix evaluates and returns the answer of the expression converted to postfix
func SolvePostfix(tokens Stack) float64 {
	stack := Stack{}
	for _, v := range tokens.Values {
		switch v.Type {
		case NUMBER:
			stack.Push(v)
		case UNARY:
			// unary invert
			f := unaryData[v.Value].fx
			var x float64
			x, _ = strconv.ParseFloat(stack.Pop().Value, 64)
			result := f(x)
			stack.Push(Token{NUMBER, strconv.FormatFloat(result, 'f', -1, 64)})
		case OPERATOR:
			f := oprData[v.Value].fx
			var x, y float64
			y, _ = strconv.ParseFloat(stack.Pop().Value, 64)
			x, _ = strconv.ParseFloat(stack.Pop().Value, 64)
			result := f(x, y)
			stack.Push(Token{NUMBER, strconv.FormatFloat(result, 'f', -1, 64)})
		}
	}
	if len(stack.Values) == 0 {
		return 0
	}
	out, _ := strconv.ParseFloat(stack.Values[0].Value, 64)
	return out
}

func Solve(s string) float64 {
	p := NewParser(strings.NewReader(s))
	stack, _ := p.Parse()
	stack = ShuntingYard(stack)
	answer := SolvePostfix(stack)
	return answer
}

func BoolSolve(s string) bool {
	return f2b(Solve(s))
}
