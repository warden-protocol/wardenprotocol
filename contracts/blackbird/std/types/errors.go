package types

import "strconv"

// question: do we need these types?
// they mirror cosmwasm_std:errors.rs useful if we use them in our internally libraries

func GenericError(msg string) error {
	return GenericErr{Msg: msg}
}

var (
	_ error = GenericErr{}
	_ error = InvalidBase64{}
	_ error = InvalidUtf8{}
	_ error = NotFound{}
	_ error = NullPointer{}
	_ error = ParseErr{}
	_ error = SerializeErr{}
	_ error = Unauthorized{}
	_ error = Underflow{}
	_ error = InvalidDataSize{}
	_ error = Overflow{}
	_ error = DivideByZero{}
	_ error = OutOfGasError{}
)

//tinyjson:skip
type GenericErr struct {
	Msg string
}

func (e GenericErr) Error() string {
	return "Generic error: " + e.Msg
}

//tinyjson:skip
type InvalidBase64 struct {
	Msg string
}

func (e InvalidBase64) Error() string {
	return "Invalid Base64 string: " + e.Msg
}

//tinyjson:skip
type InvalidUtf8 struct {
	Msg string
}

func (e InvalidUtf8) Error() string {
	return "Cannot decode UTF8 bytes into string: " + e.Msg
}

//tinyjson:skip
type NotFound struct {
	Kind string
}

func (e NotFound) Error() string {
	return e.Kind + " not found"
}

//tinyjson:skip
type NullPointer struct{}

func (e NullPointer) Error() string {
	return `NullPointer`
}

//tinyjson:skip
type ParseErr struct {
	Target string
	Msg    string
}

func (e ParseErr) Error() string {
	return "Error parsing into type " + e.Target + ": " + e.Msg
}

func ParseError(target string, msg string) ParseErr {
	return ParseErr{
		Target: target,
		Msg:    msg,
	}
}

//tinyjson:skip
type SerializeErr struct {
	Source string
	Msg    string
}

func (e SerializeErr) Error() string {
	return "Error serializing type " + e.Source + ": " + e.Msg
}

func SerializeError(source string, msg string) SerializeErr {
	return SerializeErr{
		Source: source,
		Msg:    msg,
	}
}

//tinyjson:skip
type Unauthorized struct{}

func (e Unauthorized) Error() string {
	return "Unauthorized"
}

//tinyjson:skip
type Underflow struct {
	Minuend    string
	Subtrahend string
}

func (e Underflow) Error() string {
	return "Underflow subtract " + e.Minuend + " from " + e.Subtrahend
}

//tinyjson:skip
type Overflow struct {
	Operation string
	Op1       string
	Op2       string
}

func (e Overflow) Error() string {
	return "Overflow: Cannot " + e.Operation + " with " + e.Op1 + " and " + e.Op2
}

func OverflowError(Operation string, Op1 string, Op2 string) Overflow {
	return Overflow{
		Operation: Operation,
		Op1:       Op1,
		Op2:       Op2,
	}
}

//tinyjson:skip
type DivideByZero struct{}

func (e DivideByZero) Error() string {
	return "Divide by zero"
}

//tinyjson:skip
type InvalidDataSize struct {
	Expected uint64
	Actual   uint64
}

func (e InvalidDataSize) Error() string {
	return "Invalid data size: expected=" + strconv.FormatUint(e.Expected, 10) + " actual=" + strconv.FormatUint(e.Actual, 10)
}

//tinyjson:skip
type OutOfGasError struct{}

func (o OutOfGasError) Error() string {
	return "Out of gas"
}
