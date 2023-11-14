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

func ShuntingYard(s Stack) Stack {
	postfix := Stack{}
	unary := Stack{}
	operators := Stack{}
	for _, v := range s.Values {
		switch v.Type {
		case OPERATOR:
			for !operators.IsEmpty() {
				val := v.Value
				top := operators.Peek().Value
				if (oprData[val].prec <= oprData[top].prec && !oprData[val].rAsoc) ||
					(oprData[val].prec < oprData[top].prec && oprData[val].rAsoc) {
					postfix.Push(operators.Pop())
					continue
				}
				break
			}
			operators.Push(v)
		case UNARY:
			for !unary.IsEmpty() {
				val := v.Value
				top := unary.Peek().Value
				if (oprData[val].prec <= oprData[top].prec && !oprData[val].rAsoc) ||
					(oprData[val].prec < oprData[top].prec && oprData[val].rAsoc) {
					postfix.Push(unary.Pop())
					continue
				}
				break
			}
			unary.Push(v)

		case LPAREN:
			operators.Push(v)
		case RPAREN:
			for i := operators.Length() - 1; i >= 0; i-- {
				if operators.Values[i].Type != LPAREN {
					postfix.Push(operators.Pop())

					if unary.Length() > 0 {
						postfix.Push(unary.Pop())
					}

					continue
				}
				operators.Pop()
				break
			}
		default:
			postfix.Push(v)
			// if unary.Length() != 0 {
			// 	val := unary.Pop()
			// 	postfix.Push(val)
			// }
		}
	}
	unary.EmptyInto(&postfix)
	operators.EmptyInto(&postfix)
	return postfix
}
