package cli

import (
	"fmt"
	"reflect"
	"strconv"
	"strings"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/cosmos/gogoproto/proto"
	"github.com/iancoleman/strcase"
	"github.com/spf13/cobra"

	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

const actionTimeoutHeightFlag = "action-timeout-height"

// RegisterActionCmd registers a CLI subcommand for the message of type T to be
// wrapped inside a new Action.
//
// The fields of msg are automatically mapped into flags.
func RegisterActionCmd[T sdk.Msg](msg T, short string) *cobra.Command {
	cmd := &cobra.Command{
		Use:   cmdName(msg),
		Short: short,
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg.Reset()
			if err := populateFromFlags(msg, cmd, clientCtx.Codec); err != nil {
				return err
			}

			msgAny, err := codectypes.NewAnyWithValue(msg)
			if err != nil {
				return err
			}

			actionTimeout, err := cmd.Flags().GetUint64(actionTimeoutHeightFlag)
			if err != nil {
				return err
			}

			msg := &types.MsgNewAction{
				Creator:             clientCtx.GetFromAddress().String(),
				Message:             msgAny,
				ActionTimeoutHeight: actionTimeout,
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)
	addFlagsFromMsg(msg, cmd)
	cmd.Flags().Uint64(actionTimeoutHeightFlag, 0, "Maximum block height after which this action is considered expired.")

	return cmd
}

func cmdName(msg sdk.Msg) string {
	v := reflect.ValueOf(msg).Elem()
	if v.Kind() == reflect.Interface {
		v = reflect.ValueOf(msg)
		if v.Kind() == reflect.Ptr {
			v = v.Elem()
		}
	}
	name := v.Type().Name()
	name = strings.TrimPrefix(name, "Msg")
	return strcase.ToKebab(name)
}

func addFlagsFromMsg(msg sdk.Msg, cmd *cobra.Command) {
	v := reflect.ValueOf(msg).Elem()
	if v.Kind() == reflect.Interface {
		v = reflect.ValueOf(msg)
		if v.Kind() == reflect.Ptr {
			v = v.Elem()
		}
	}

	for i := 0; i < v.NumField(); i++ {
		fieldName := strings.ToLower(v.Type().Field(i).Name)
		flagName := strcase.ToKebab(v.Type().Field(i).Name)

		// handle "authority" field manually by setting default value to
		// x/act's address
		if strings.EqualFold(fieldName, "authority") {
			actAuthority := authtypes.NewModuleAddress(types.ModuleName).String()
			cmd.Flags().String(flagName, actAuthority, "Authority address (defaults to x/act's address)")
			continue
		}

		isEnum := strings.Contains(v.Type().Field(i).Tag.Get("protobuf"), "enum")
		if isEnum {
			cmd.Flags().String(flagName, "", "")
			return
		}

		switch v.Field(i).Kind() {
		case reflect.String:
			cmd.Flags().String(flagName, "", "")
		case reflect.Int:
			cmd.Flags().Int(flagName, 0, "")
		case reflect.Int32:
			cmd.Flags().Int32(flagName, 0, "")
		case reflect.Uint64:
			cmd.Flags().Uint64(flagName, 0, "")
		case reflect.Slice:
			switch v.Field(i).Type().Elem().Kind() {
			case reflect.String:
				cmd.Flags().StringSlice(flagName, nil, "")
			case reflect.Uint8:
				cmd.Flags().BytesBase64(flagName, nil, "")
			case reflect.Struct:
				if v.Field(i).Type().Elem().AssignableTo(reflect.TypeOf(sdk.Coin{})) {
					cmd.Flags().StringSlice(flagName, nil, "(e.g. 10uward)")
				} else {
					panic(fmt.Sprintf("unsupported slice type %v (for field %s)", v.Field(i).Type().Elem().Kind(), fieldName))
				}
			default:
				panic(fmt.Sprintf("unsupported slice type %v (for field %s)", v.Field(i).Type().Elem().Kind(), fieldName))
			}
		case reflect.Pointer:
			switch v.Field(i).Type().Elem() {
			case reflect.TypeOf(codectypes.Any{}):
				cmd.Flags().String(flagName, "", "")
			default:
				panic(fmt.Sprintf("unsupported pointer type %v (for field %s)", v.Field(i).Type().Elem().Kind(), fieldName))
			}
		default:
			panic(fmt.Sprintf("unsupported type %v (for field %s)", v.Field(i).Type().Elem().Kind(), fieldName))
		}
	}
}

func populateFromFlags(msg sdk.Msg, cmd *cobra.Command, cdc codec.Codec) error {
	reflect.TypeOf(msg)
	v := reflect.ValueOf(msg).Elem()
	if v.Kind() == reflect.Interface {
		v = reflect.ValueOf(msg)
		if v.Kind() == reflect.Ptr {
			v = v.Elem()
		}
	}

	for i := 0; i < v.NumField(); i++ {
		fieldName := strings.ToLower(v.Type().Field(i).Name)
		flagName := strcase.ToKebab(v.Type().Field(i).Name)

		// try to parse enum type from protobuf tags
		var enumProtoType string
		tags := strings.Split(v.Type().Field(i).Tag.Get("protobuf"), ",")
		for _, tag := range tags {
			if strings.HasPrefix(tag, "enum") {
				enumProtoType = strings.TrimPrefix(tag, "enum=")
			}
		}

		// the field is an enum, handle it differently
		if enumProtoType != "" {
			value, err := cmd.Flags().GetString(flagName)
			if err != nil {
				return err
			}

			if value == "" {
				return nil
			}

			// if user provided a number, use it as-is
			valueN, err := strconv.ParseInt(value, 10, 64)
			if err == nil {
				v.Field(i).SetInt(valueN)
				return nil
			}

			// else, reverse lookup the enum value
			fmt.Println(enumProtoType)
			valsMap := proto.EnumValueMap(enumProtoType)
			for k, val := range valsMap {
				if strings.EqualFold(k, value) {
					v.Field(i).SetInt(int64(val))
					return nil
				}
			}

			possibleValues := make([]string, 0, len(valsMap))
			for k := range valsMap {
				possibleValues = append(possibleValues, k)
			}

			return fmt.Errorf("invalid enum value %s for flag %s; possible values: %s", value, flagName, strings.Join(possibleValues, ", "))
		}

		switch v.Field(i).Kind() {
		case reflect.String:
			value, err := cmd.Flags().GetString(flagName)
			if err != nil {
				return err
			}
			v.Field(i).SetString(value)
		case reflect.Int:
			value, err := cmd.Flags().GetInt(flagName)
			if err != nil {
				return err
			}
			v.Field(i).SetInt(int64(value))
		case reflect.Int32:
			value, err := cmd.Flags().GetInt32(flagName)
			if err != nil {
				return err
			}
			v.Field(i).SetInt(int64(value))
		case reflect.Uint64:
			value, err := cmd.Flags().GetUint64(flagName)
			if err != nil {
				return err
			}
			v.Field(i).SetUint(value)
		case reflect.Slice:
			switch v.Field(i).Type().Elem().Kind() {
			case reflect.String:
				value, err := cmd.Flags().GetStringSlice(flagName)
				if err != nil {
					return err
				}
				v.Field(i).Set(reflect.ValueOf(value))
			case reflect.Uint8:
				value, err := cmd.Flags().GetBytesBase64(flagName)
				if err != nil {
					return err
				}
				v.Field(i).Set(reflect.ValueOf(value))
			case reflect.Struct:
				if v.Field(i).Type().Elem().AssignableTo(reflect.TypeOf(sdk.Coin{})) {
					coinsStrings, err := cmd.Flags().GetStringSlice(flagName)
					if err != nil {
						return err
					}
					coins, err := sdk.ParseCoinsNormalized(strings.Join(coinsStrings, ","))
					if err != nil {
						return err
					}
					v.Field(i).Set(reflect.ValueOf(coins))
				} else {
					panic(fmt.Sprintf("unsupported slice type %v (for field %s)", v.Field(i).Type().Elem().Kind(), fieldName))
				}
			default:
				panic(fmt.Sprintf("unsupported slice type %v (for field %s)", v.Field(i).Type().Elem().Kind(), fieldName))
			}
		case reflect.Pointer:
			switch v.Field(i).Type().Elem() {
			case reflect.TypeOf(codectypes.Any{}):
				jvalue, err := cmd.Flags().GetString(flagName)
				if err != nil {
					return err
				}
				if jvalue == "" {
					return nil
				}
				v.Field(i).Set(reflect.ValueOf(&codectypes.Any{}))
				if err := cdc.UnmarshalJSON([]byte(jvalue), v.Field(i).Interface().(proto.Message)); err != nil {
					return err
				}
			default:
				panic(fmt.Sprintf("unsupported pointer type %v (for field %s)", v.Field(i).Type().Elem().Kind(), fieldName))
			}
		default:
			panic(fmt.Sprintf("unsupported type %v (for field %s)", v.Field(i).Type().Elem().Kind(), fieldName))
		}
	}

	return nil
}
