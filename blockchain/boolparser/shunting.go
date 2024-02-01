// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
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
