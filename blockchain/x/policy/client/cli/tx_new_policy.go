package cli

import (
	"fmt"
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/qredo/fusionchain/x/policy/types"
	"github.com/spf13/cobra"
	"gitlab.qredo.com/edmund/blackbird/verifier/golang/protobuf"
	"google.golang.org/protobuf/proto"
)

var _ = strconv.Itoa(0)

func CmdNewPolicy() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "new-policy [name] [blackbird policy]",
		Short: "Broadcast message new-policy",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			name := args[0]
			policy, err := Compile(args[1])
			if err != nil {
				return err
			}
			policyBz, err := proto.Marshal(policy)
			if err != nil {
				return err
			}
			bbirdWrap := &types.BlackbirdPolicy{
				Data: policyBz,
			}
			policyPayload, err := codectypes.NewAnyWithValue(bbirdWrap)
			if err != nil {
				return err
			}

			msg := types.NewMsgNewPolicy(
				clientCtx.GetFromAddress().String(),
				name,
				policyPayload,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func Compile(s string) (*protobuf.Policy, error) {
	tokens := tokenize(s)
	ast := parse(tokens)
	policy := eval(ast)
	return policy, nil
}

// tokenizer

type Token any

type OrToken struct{}

type AndToken struct{}

type Ident struct {
	name string
}

func tokenize(s string) []Token {
	pos := 0
	tokens := make([]Token, 0)

	for pos < len(s) {
		for s[pos] == ' ' {
			pos++
		}

		tokenStart := pos
		if s[pos] == '@' {
			for pos < len(s) && s[pos] != ' ' {
				pos++
			}
			tokenEnd := pos
			tokens = append(tokens, Ident{name: s[tokenStart:tokenEnd]})
		} else if s[pos:pos+2] == "or" {
			tokens = append(tokens, OrToken{})
			pos += 2
		} else if s[pos:pos+3] == "and" {
			tokens = append(tokens, AndToken{})
			pos += 3
		} else {
			panic("invalid token")
		}
	}

	return tokens
}

// parser

type AST struct {
	Root Node
}

type Node any

type IdentNode struct {
	Ident string
}

func (n IdentNode) String() string {
	return fmt.Sprintf("Ident(%s)", n.Ident)
}

type AndNode struct {
	Left  Node
	Right Node
}

func (n AndNode) String() string {
	return fmt.Sprintf("And(%s, %s)", n.Left, n.Right)
}

type OrNode struct {
	Left  Node
	Right Node
}

func (n OrNode) String() string {
	return fmt.Sprintf("Or(%s, %s)", n.Left, n.Right)
}

func parse(tokens []Token) Node {
	if len(tokens) == 0 {
		panic("empty tokens")
	}

	if len(tokens) == 1 {
		return parseIdent(tokens[0])
	}

	for i := 0; i < len(tokens); i++ {
		if _, ok := tokens[i].(OrToken); ok {
			return OrNode{
				Left:  parse(tokens[:i]),
				Right: parse(tokens[i+1:]),
			}
		}
	}

	for i := 0; i < len(tokens); i++ {
		if _, ok := tokens[i].(AndToken); ok {
			return AndNode{
				Left:  parse(tokens[:i]),
				Right: parse(tokens[i+1:]),
			}
		}
	}

	panic("invalid tokens")
}

func parseIdent(token Token) IdentNode {
	if ident, ok := token.(Ident); ok {
		return IdentNode{Ident: ident.name}
	}
	panic("invalid token")
}

// evaluator

func eval(root Node) *protobuf.Policy {
	return evalSubpolicies(root)
}

func evalSubpolicies(n Node) *protobuf.Policy {
	switch n := n.(type) {
	case IdentNode:
		return &protobuf.Policy{
			Tag:           protobuf.PolicyTag_POLICY_SIGNATURE,
			AddressPrefix: "",
			Address: &protobuf.Policy_CookedAddress{
				CookedAddress: n.Ident[1:], // strip leading @
			},
		}
	case AndNode:
		return &protobuf.Policy{
			Tag:       protobuf.PolicyTag_POLICY_ALL,
			Threshold: 2,
			Subpolicies: []*protobuf.Policy{
				evalSubpolicies(n.Left),
				evalSubpolicies(n.Right),
			},
		}
	case OrNode:
		return &protobuf.Policy{
			Tag:       protobuf.PolicyTag_POLICY_ANY,
			Threshold: 1,
			Subpolicies: []*protobuf.Policy{
				evalSubpolicies(n.Left),
				evalSubpolicies(n.Right),
			},
		}
	}
	panic("invalid node")
}
