package act

const (
	// EventTypeAddKeychainAdmin defines the event type for the x/warden AddKeychainAdmin transaction.
	EventTypeAddKeychainAdmin = "AddKeychainAdmin"
	// EventTypeAddKeychainWriter defines the event type for the x/warden AddKeychainWriter transaction.
	EventTypeAddKeychainWriter = "AddKeychainWriter"
	// EventTypeNewKey defines the event type for the fulfil branch of x/warden FulfilKeyRequest transaction.
	EventTypeNewKey = "NewKey"
	// EventRejectKeyRequest defines the event type for the reject branch of x/warden FulfilKeyRequest transaction.
	EventRejectKeyRequest = "RejectKeyRequest"
)

//
//func (p Precompile) EmitAddKeychainWriterEvent(ctx sdk.Context, stateDB vm.StateDB, writerAddres common.Address) error {
//	// Prepare the event topics
//	event := p.ABI.Events[EventTypeAddKeychainWriter]
//
//	topics := make([]common.Hash, 2)
//	// The first topic is always the signature of the event.
//	topics[0] = event.ID
//
//	sdkEvents := ctx.EventManager().Events()
//	eventAddKeychainWriter := sdkEvents[len(sdkEvents)-1]
//	var b bytes.Buffer
//	for _, attr := range eventAddKeychainWriter.Attributes {
//		key := attr.GetKey()
//		val := strings.Trim(attr.GetValue(), "\"")
//		switch key {
//		case "id":
//			keychainId, success := new(big.Int).SetString(val, 10)
//			if !success {
//				return fmt.Errorf("AddKeychainWriterEvent: invalid keychain id type")
//			}
//			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
//		case "writers_count":
//			keychainId, success := new(big.Int).SetString(val, 10)
//			if !success {
//				return fmt.Errorf("AddKeychainWriterEvent: invalid writers count type")
//			}
//			b.Write(cmn.PackNum(reflect.ValueOf(keychainId)))
//		}
//	}
//
//	var err error
//	topics[1], err = cmn.MakeTopic(writerAddres)
//	if err != nil {
//		return err
//	}
//
//	stateDB.AddLog(&ethtypes.Log{
//		Address:     p.Address(),
//		Topics:      topics,
//		Data:        b.Bytes(),
//		BlockNumber: uint64(ctx.BlockHeight()),
//	})
//
//	return nil
//}
