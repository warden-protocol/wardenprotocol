package types

// SystemError captures all errors returned from the Rust code as SystemError.
// Exactly one of the fields should be set.
type SystemError struct {
	InvalidRequest     *InvalidRequest     `json:"invalid_request,omitempty"`
	InvalidResponse    *InvalidResponse    `json:"invalid_response,omitempty"`
	NoSuchContract     *NoSuchContract     `json:"no_such_contract,omitempty"`
	Unknown            *Unknown            `json:"unknown,omitempty"`
	UnsupportedRequest *UnsupportedRequest `json:"unsupported_request,omitempty"`
}

var (
	_ error = SystemError{}
	_ error = InvalidRequest{}
	_ error = InvalidResponse{}
	_ error = NoSuchContract{}
	_ error = Unknown{}
	_ error = UnsupportedRequest{}
)

func (a SystemError) Error() string {
	bz, _ := a.MarshalJSON()
	return string(bz)
}

type InvalidRequest struct {
	Err     string `json:"error"`
	Request []byte `json:"request"`
}

func (e InvalidRequest) Error() string {
	return "invalid_request: " + e.Err + " - original request: " + string(e.Request)
}

type InvalidResponse struct {
	Err      string `json:"error"`
	Response []byte `json:"response"`
}

func (e InvalidResponse) Error() string {
	return "invalid response: " + e.Err + " - original response: " + string(e.Response)
}

type NoSuchContract struct {
	Addr string `json:"addr,omitempty"`
}

func (e NoSuchContract) Error() string {
	return "no such contract: " + e.Addr
}

type Unknown struct{}

func (e Unknown) Error() string {
	return "unknown system error"
}

type UnsupportedRequest struct {
	Kind string `json:"kind,omitempty"`
}

func (e UnsupportedRequest) Error() string {
	return "unsupported request: " + e.Kind
}

// ToSystemError will try to convert the given error to an SystemError.
// This is important to returning any Go error back to Rust.
//
// If it is already StdError, return self.
// If it is an error, which could be a sub-field of StdError, embed it.
// If it is anything else, **return nil**
//
// This may return nil on an unknown error, whereas ToStdError will always create
// a valid error type.
func ToSystemError(err error) *SystemError {
	if err == nil {
		return nil
	}
	switch t := err.(type) {
	case SystemError:
		return &t
	case *SystemError:
		return t
	case InvalidRequest:
		return &SystemError{InvalidRequest: &t}
	case *InvalidRequest:
		return &SystemError{InvalidRequest: t}
	case InvalidResponse:
		return &SystemError{InvalidResponse: &t}
	case *InvalidResponse:
		return &SystemError{InvalidResponse: t}
	case NoSuchContract:
		return &SystemError{NoSuchContract: &t}
	case *NoSuchContract:
		return &SystemError{NoSuchContract: t}
	case Unknown:
		return &SystemError{Unknown: &t}
	case *Unknown:
		return &SystemError{Unknown: t}
	case UnsupportedRequest:
		return &SystemError{UnsupportedRequest: &t}
	case *UnsupportedRequest:
		return &SystemError{UnsupportedRequest: t}
	default:
		return nil
	}
}
