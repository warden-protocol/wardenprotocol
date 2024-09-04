// Code generated by protoc-gen-go-pulsar. DO NOT EDIT.
package actv1beta1

import (
	_ "cosmossdk.io/api/amino"
	fmt "fmt"
	runtime "github.com/cosmos/cosmos-proto/runtime"
	_ "github.com/cosmos/gogoproto/gogoproto"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoiface "google.golang.org/protobuf/runtime/protoiface"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"
	io "io"
	reflect "reflect"
	sync "sync"
)

var (
	md_ActionVote             protoreflect.MessageDescriptor
	fd_ActionVote_participant protoreflect.FieldDescriptor
	fd_ActionVote_voted_at    protoreflect.FieldDescriptor
	fd_ActionVote_vote        protoreflect.FieldDescriptor
)

func init() {
	file_warden_act_v1beta1_action_vote_proto_init()
	md_ActionVote = File_warden_act_v1beta1_action_vote_proto.Messages().ByName("ActionVote")
	fd_ActionVote_participant = md_ActionVote.Fields().ByName("participant")
	fd_ActionVote_voted_at = md_ActionVote.Fields().ByName("voted_at")
	fd_ActionVote_vote = md_ActionVote.Fields().ByName("vote")
}

var _ protoreflect.Message = (*fastReflection_ActionVote)(nil)

type fastReflection_ActionVote ActionVote

func (x *ActionVote) ProtoReflect() protoreflect.Message {
	return (*fastReflection_ActionVote)(x)
}

func (x *ActionVote) slowProtoReflect() protoreflect.Message {
	mi := &file_warden_act_v1beta1_action_vote_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

var _fastReflection_ActionVote_messageType fastReflection_ActionVote_messageType
var _ protoreflect.MessageType = fastReflection_ActionVote_messageType{}

type fastReflection_ActionVote_messageType struct{}

func (x fastReflection_ActionVote_messageType) Zero() protoreflect.Message {
	return (*fastReflection_ActionVote)(nil)
}
func (x fastReflection_ActionVote_messageType) New() protoreflect.Message {
	return new(fastReflection_ActionVote)
}
func (x fastReflection_ActionVote_messageType) Descriptor() protoreflect.MessageDescriptor {
	return md_ActionVote
}

// Descriptor returns message descriptor, which contains only the protobuf
// type information for the message.
func (x *fastReflection_ActionVote) Descriptor() protoreflect.MessageDescriptor {
	return md_ActionVote
}

// Type returns the message type, which encapsulates both Go and protobuf
// type information. If the Go type information is not needed,
// it is recommended that the message descriptor be used instead.
func (x *fastReflection_ActionVote) Type() protoreflect.MessageType {
	return _fastReflection_ActionVote_messageType
}

// New returns a newly allocated and mutable empty message.
func (x *fastReflection_ActionVote) New() protoreflect.Message {
	return new(fastReflection_ActionVote)
}

// Interface unwraps the message reflection interface and
// returns the underlying ProtoMessage interface.
func (x *fastReflection_ActionVote) Interface() protoreflect.ProtoMessage {
	return (*ActionVote)(x)
}

// Range iterates over every populated field in an undefined order,
// calling f for each field descriptor and value encountered.
// Range returns immediately if f returns false.
// While iterating, mutating operations may only be performed
// on the current field descriptor.
func (x *fastReflection_ActionVote) Range(f func(protoreflect.FieldDescriptor, protoreflect.Value) bool) {
	if x.Participant != "" {
		value := protoreflect.ValueOfString(x.Participant)
		if !f(fd_ActionVote_participant, value) {
			return
		}
	}
	if x.VotedAt != nil {
		value := protoreflect.ValueOfMessage(x.VotedAt.ProtoReflect())
		if !f(fd_ActionVote_voted_at, value) {
			return
		}
	}
	if x.Vote != 0 {
		value := protoreflect.ValueOfEnum((protoreflect.EnumNumber)(x.Vote))
		if !f(fd_ActionVote_vote, value) {
			return
		}
	}
}

// Has reports whether a field is populated.
//
// Some fields have the property of nullability where it is possible to
// distinguish between the default value of a field and whether the field
// was explicitly populated with the default value. Singular message fields,
// member fields of a oneof, and proto2 scalar fields are nullable. Such
// fields are populated only if explicitly set.
//
// In other cases (aside from the nullable cases above),
// a proto3 scalar field is populated if it contains a non-zero value, and
// a repeated field is populated if it is non-empty.
func (x *fastReflection_ActionVote) Has(fd protoreflect.FieldDescriptor) bool {
	switch fd.FullName() {
	case "warden.act.v1beta1.ActionVote.participant":
		return x.Participant != ""
	case "warden.act.v1beta1.ActionVote.voted_at":
		return x.VotedAt != nil
	case "warden.act.v1beta1.ActionVote.vote":
		return x.Vote != 0
	default:
		if fd.IsExtension() {
			panic(fmt.Errorf("proto3 declared messages do not support extensions: warden.act.v1beta1.ActionVote"))
		}
		panic(fmt.Errorf("message warden.act.v1beta1.ActionVote does not contain field %s", fd.FullName()))
	}
}

// Clear clears the field such that a subsequent Has call reports false.
//
// Clearing an extension field clears both the extension type and value
// associated with the given field number.
//
// Clear is a mutating operation and unsafe for concurrent use.
func (x *fastReflection_ActionVote) Clear(fd protoreflect.FieldDescriptor) {
	switch fd.FullName() {
	case "warden.act.v1beta1.ActionVote.participant":
		x.Participant = ""
	case "warden.act.v1beta1.ActionVote.voted_at":
		x.VotedAt = nil
	case "warden.act.v1beta1.ActionVote.vote":
		x.Vote = 0
	default:
		if fd.IsExtension() {
			panic(fmt.Errorf("proto3 declared messages do not support extensions: warden.act.v1beta1.ActionVote"))
		}
		panic(fmt.Errorf("message warden.act.v1beta1.ActionVote does not contain field %s", fd.FullName()))
	}
}

// Get retrieves the value for a field.
//
// For unpopulated scalars, it returns the default value, where
// the default value of a bytes scalar is guaranteed to be a copy.
// For unpopulated composite types, it returns an empty, read-only view
// of the value; to obtain a mutable reference, use Mutable.
func (x *fastReflection_ActionVote) Get(descriptor protoreflect.FieldDescriptor) protoreflect.Value {
	switch descriptor.FullName() {
	case "warden.act.v1beta1.ActionVote.participant":
		value := x.Participant
		return protoreflect.ValueOfString(value)
	case "warden.act.v1beta1.ActionVote.voted_at":
		value := x.VotedAt
		return protoreflect.ValueOfMessage(value.ProtoReflect())
	case "warden.act.v1beta1.ActionVote.vote":
		value := x.Vote
		return protoreflect.ValueOfEnum((protoreflect.EnumNumber)(value))
	default:
		if descriptor.IsExtension() {
			panic(fmt.Errorf("proto3 declared messages do not support extensions: warden.act.v1beta1.ActionVote"))
		}
		panic(fmt.Errorf("message warden.act.v1beta1.ActionVote does not contain field %s", descriptor.FullName()))
	}
}

// Set stores the value for a field.
//
// For a field belonging to a oneof, it implicitly clears any other field
// that may be currently set within the same oneof.
// For extension fields, it implicitly stores the provided ExtensionType.
// When setting a composite type, it is unspecified whether the stored value
// aliases the source's memory in any way. If the composite value is an
// empty, read-only value, then it panics.
//
// Set is a mutating operation and unsafe for concurrent use.
func (x *fastReflection_ActionVote) Set(fd protoreflect.FieldDescriptor, value protoreflect.Value) {
	switch fd.FullName() {
	case "warden.act.v1beta1.ActionVote.participant":
		x.Participant = value.Interface().(string)
	case "warden.act.v1beta1.ActionVote.voted_at":
		x.VotedAt = value.Message().Interface().(*timestamppb.Timestamp)
	case "warden.act.v1beta1.ActionVote.vote":
		x.Vote = (ActionVoteType)(value.Enum())
	default:
		if fd.IsExtension() {
			panic(fmt.Errorf("proto3 declared messages do not support extensions: warden.act.v1beta1.ActionVote"))
		}
		panic(fmt.Errorf("message warden.act.v1beta1.ActionVote does not contain field %s", fd.FullName()))
	}
}

// Mutable returns a mutable reference to a composite type.
//
// If the field is unpopulated, it may allocate a composite value.
// For a field belonging to a oneof, it implicitly clears any other field
// that may be currently set within the same oneof.
// For extension fields, it implicitly stores the provided ExtensionType
// if not already stored.
// It panics if the field does not contain a composite type.
//
// Mutable is a mutating operation and unsafe for concurrent use.
func (x *fastReflection_ActionVote) Mutable(fd protoreflect.FieldDescriptor) protoreflect.Value {
	switch fd.FullName() {
	case "warden.act.v1beta1.ActionVote.voted_at":
		if x.VotedAt == nil {
			x.VotedAt = new(timestamppb.Timestamp)
		}
		return protoreflect.ValueOfMessage(x.VotedAt.ProtoReflect())
	case "warden.act.v1beta1.ActionVote.participant":
		panic(fmt.Errorf("field participant of message warden.act.v1beta1.ActionVote is not mutable"))
	case "warden.act.v1beta1.ActionVote.vote":
		panic(fmt.Errorf("field vote of message warden.act.v1beta1.ActionVote is not mutable"))
	default:
		if fd.IsExtension() {
			panic(fmt.Errorf("proto3 declared messages do not support extensions: warden.act.v1beta1.ActionVote"))
		}
		panic(fmt.Errorf("message warden.act.v1beta1.ActionVote does not contain field %s", fd.FullName()))
	}
}

// NewField returns a new value that is assignable to the field
// for the given descriptor. For scalars, this returns the default value.
// For lists, maps, and messages, this returns a new, empty, mutable value.
func (x *fastReflection_ActionVote) NewField(fd protoreflect.FieldDescriptor) protoreflect.Value {
	switch fd.FullName() {
	case "warden.act.v1beta1.ActionVote.participant":
		return protoreflect.ValueOfString("")
	case "warden.act.v1beta1.ActionVote.voted_at":
		m := new(timestamppb.Timestamp)
		return protoreflect.ValueOfMessage(m.ProtoReflect())
	case "warden.act.v1beta1.ActionVote.vote":
		return protoreflect.ValueOfEnum(0)
	default:
		if fd.IsExtension() {
			panic(fmt.Errorf("proto3 declared messages do not support extensions: warden.act.v1beta1.ActionVote"))
		}
		panic(fmt.Errorf("message warden.act.v1beta1.ActionVote does not contain field %s", fd.FullName()))
	}
}

// WhichOneof reports which field within the oneof is populated,
// returning nil if none are populated.
// It panics if the oneof descriptor does not belong to this message.
func (x *fastReflection_ActionVote) WhichOneof(d protoreflect.OneofDescriptor) protoreflect.FieldDescriptor {
	switch d.FullName() {
	default:
		panic(fmt.Errorf("%s is not a oneof field in warden.act.v1beta1.ActionVote", d.FullName()))
	}
	panic("unreachable")
}

// GetUnknown retrieves the entire list of unknown fields.
// The caller may only mutate the contents of the RawFields
// if the mutated bytes are stored back into the message with SetUnknown.
func (x *fastReflection_ActionVote) GetUnknown() protoreflect.RawFields {
	return x.unknownFields
}

// SetUnknown stores an entire list of unknown fields.
// The raw fields must be syntactically valid according to the wire format.
// An implementation may panic if this is not the case.
// Once stored, the caller must not mutate the content of the RawFields.
// An empty RawFields may be passed to clear the fields.
//
// SetUnknown is a mutating operation and unsafe for concurrent use.
func (x *fastReflection_ActionVote) SetUnknown(fields protoreflect.RawFields) {
	x.unknownFields = fields
}

// IsValid reports whether the message is valid.
//
// An invalid message is an empty, read-only value.
//
// An invalid message often corresponds to a nil pointer of the concrete
// message type, but the details are implementation dependent.
// Validity is not part of the protobuf data model, and may not
// be preserved in marshaling or other operations.
func (x *fastReflection_ActionVote) IsValid() bool {
	return x != nil
}

// ProtoMethods returns optional fastReflectionFeature-path implementations of various operations.
// This method may return nil.
//
// The returned methods type is identical to
// "google.golang.org/protobuf/runtime/protoiface".Methods.
// Consult the protoiface package documentation for details.
func (x *fastReflection_ActionVote) ProtoMethods() *protoiface.Methods {
	size := func(input protoiface.SizeInput) protoiface.SizeOutput {
		x := input.Message.Interface().(*ActionVote)
		if x == nil {
			return protoiface.SizeOutput{
				NoUnkeyedLiterals: input.NoUnkeyedLiterals,
				Size:              0,
			}
		}
		options := runtime.SizeInputToOptions(input)
		_ = options
		var n int
		var l int
		_ = l
		l = len(x.Participant)
		if l > 0 {
			n += 1 + l + runtime.Sov(uint64(l))
		}
		if x.VotedAt != nil {
			l = options.Size(x.VotedAt)
			n += 1 + l + runtime.Sov(uint64(l))
		}
		if x.Vote != 0 {
			n += 1 + runtime.Sov(uint64(x.Vote))
		}
		if x.unknownFields != nil {
			n += len(x.unknownFields)
		}
		return protoiface.SizeOutput{
			NoUnkeyedLiterals: input.NoUnkeyedLiterals,
			Size:              n,
		}
	}

	marshal := func(input protoiface.MarshalInput) (protoiface.MarshalOutput, error) {
		x := input.Message.Interface().(*ActionVote)
		if x == nil {
			return protoiface.MarshalOutput{
				NoUnkeyedLiterals: input.NoUnkeyedLiterals,
				Buf:               input.Buf,
			}, nil
		}
		options := runtime.MarshalInputToOptions(input)
		_ = options
		size := options.Size(x)
		dAtA := make([]byte, size)
		i := len(dAtA)
		_ = i
		var l int
		_ = l
		if x.unknownFields != nil {
			i -= len(x.unknownFields)
			copy(dAtA[i:], x.unknownFields)
		}
		if x.Vote != 0 {
			i = runtime.EncodeVarint(dAtA, i, uint64(x.Vote))
			i--
			dAtA[i] = 0x18
		}
		if x.VotedAt != nil {
			encoded, err := options.Marshal(x.VotedAt)
			if err != nil {
				return protoiface.MarshalOutput{
					NoUnkeyedLiterals: input.NoUnkeyedLiterals,
					Buf:               input.Buf,
				}, err
			}
			i -= len(encoded)
			copy(dAtA[i:], encoded)
			i = runtime.EncodeVarint(dAtA, i, uint64(len(encoded)))
			i--
			dAtA[i] = 0x12
		}
		if len(x.Participant) > 0 {
			i -= len(x.Participant)
			copy(dAtA[i:], x.Participant)
			i = runtime.EncodeVarint(dAtA, i, uint64(len(x.Participant)))
			i--
			dAtA[i] = 0xa
		}
		if input.Buf != nil {
			input.Buf = append(input.Buf, dAtA...)
		} else {
			input.Buf = dAtA
		}
		return protoiface.MarshalOutput{
			NoUnkeyedLiterals: input.NoUnkeyedLiterals,
			Buf:               input.Buf,
		}, nil
	}
	unmarshal := func(input protoiface.UnmarshalInput) (protoiface.UnmarshalOutput, error) {
		x := input.Message.Interface().(*ActionVote)
		if x == nil {
			return protoiface.UnmarshalOutput{
				NoUnkeyedLiterals: input.NoUnkeyedLiterals,
				Flags:             input.Flags,
			}, nil
		}
		options := runtime.UnmarshalInputToOptions(input)
		_ = options
		dAtA := input.Buf
		l := len(dAtA)
		iNdEx := 0
		for iNdEx < l {
			preIndex := iNdEx
			var wire uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, runtime.ErrIntOverflow
				}
				if iNdEx >= l {
					return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				wire |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			fieldNum := int32(wire >> 3)
			wireType := int(wire & 0x7)
			if wireType == 4 {
				return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, fmt.Errorf("proto: ActionVote: wiretype end group for non-group")
			}
			if fieldNum <= 0 {
				return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, fmt.Errorf("proto: ActionVote: illegal tag %d (wire type %d)", fieldNum, wire)
			}
			switch fieldNum {
			case 1:
				if wireType != 2 {
					return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, fmt.Errorf("proto: wrong wireType = %d for field Participant", wireType)
				}
				var stringLen uint64
				for shift := uint(0); ; shift += 7 {
					if shift >= 64 {
						return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, runtime.ErrIntOverflow
					}
					if iNdEx >= l {
						return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, io.ErrUnexpectedEOF
					}
					b := dAtA[iNdEx]
					iNdEx++
					stringLen |= uint64(b&0x7F) << shift
					if b < 0x80 {
						break
					}
				}
				intStringLen := int(stringLen)
				if intStringLen < 0 {
					return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, runtime.ErrInvalidLength
				}
				postIndex := iNdEx + intStringLen
				if postIndex < 0 {
					return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, runtime.ErrInvalidLength
				}
				if postIndex > l {
					return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, io.ErrUnexpectedEOF
				}
				x.Participant = string(dAtA[iNdEx:postIndex])
				iNdEx = postIndex
			case 2:
				if wireType != 2 {
					return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, fmt.Errorf("proto: wrong wireType = %d for field VotedAt", wireType)
				}
				var msglen int
				for shift := uint(0); ; shift += 7 {
					if shift >= 64 {
						return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, runtime.ErrIntOverflow
					}
					if iNdEx >= l {
						return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, io.ErrUnexpectedEOF
					}
					b := dAtA[iNdEx]
					iNdEx++
					msglen |= int(b&0x7F) << shift
					if b < 0x80 {
						break
					}
				}
				if msglen < 0 {
					return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, runtime.ErrInvalidLength
				}
				postIndex := iNdEx + msglen
				if postIndex < 0 {
					return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, runtime.ErrInvalidLength
				}
				if postIndex > l {
					return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, io.ErrUnexpectedEOF
				}
				if x.VotedAt == nil {
					x.VotedAt = &timestamppb.Timestamp{}
				}
				if err := options.Unmarshal(dAtA[iNdEx:postIndex], x.VotedAt); err != nil {
					return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, err
				}
				iNdEx = postIndex
			case 3:
				if wireType != 0 {
					return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, fmt.Errorf("proto: wrong wireType = %d for field Vote", wireType)
				}
				x.Vote = 0
				for shift := uint(0); ; shift += 7 {
					if shift >= 64 {
						return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, runtime.ErrIntOverflow
					}
					if iNdEx >= l {
						return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, io.ErrUnexpectedEOF
					}
					b := dAtA[iNdEx]
					iNdEx++
					x.Vote |= ActionVoteType(b&0x7F) << shift
					if b < 0x80 {
						break
					}
				}
			default:
				iNdEx = preIndex
				skippy, err := runtime.Skip(dAtA[iNdEx:])
				if err != nil {
					return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, err
				}
				if (skippy < 0) || (iNdEx+skippy) < 0 {
					return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, runtime.ErrInvalidLength
				}
				if (iNdEx + skippy) > l {
					return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, io.ErrUnexpectedEOF
				}
				if !options.DiscardUnknown {
					x.unknownFields = append(x.unknownFields, dAtA[iNdEx:iNdEx+skippy]...)
				}
				iNdEx += skippy
			}
		}

		if iNdEx > l {
			return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, io.ErrUnexpectedEOF
		}
		return protoiface.UnmarshalOutput{NoUnkeyedLiterals: input.NoUnkeyedLiterals, Flags: input.Flags}, nil
	}
	return &protoiface.Methods{
		NoUnkeyedLiterals: struct{}{},
		Flags:             protoiface.SupportMarshalDeterministic | protoiface.SupportUnmarshalDiscardUnknown,
		Size:              size,
		Marshal:           marshal,
		Unmarshal:         unmarshal,
		Merge:             nil,
		CheckInitialized:  nil,
	}
}

// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.27.0
// 	protoc        (unknown)
// source: warden/act/v1beta1/action_vote.proto

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// Type of a vote.
type ActionVoteType int32

const (
	// Unspecified vote type.
	ActionVoteType_VOTE_TYPE_UNSPECIFIED ActionVoteType = 0
	// Positive vote for an action.
	ActionVoteType_VOTE_TYPE_APPROVED ActionVoteType = 1
	// Negative vote for an action.
	ActionVoteType_VOTE_TYPE_REJECTED ActionVoteType = 2
)

// Enum value maps for ActionVoteType.
var (
	ActionVoteType_name = map[int32]string{
		0: "VOTE_TYPE_UNSPECIFIED",
		1: "VOTE_TYPE_APPROVED",
		2: "VOTE_TYPE_REJECTED",
	}
	ActionVoteType_value = map[string]int32{
		"VOTE_TYPE_UNSPECIFIED": 0,
		"VOTE_TYPE_APPROVED":    1,
		"VOTE_TYPE_REJECTED":    2,
	}
)

func (x ActionVoteType) Enum() *ActionVoteType {
	p := new(ActionVoteType)
	*p = x
	return p
}

func (x ActionVoteType) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (ActionVoteType) Descriptor() protoreflect.EnumDescriptor {
	return file_warden_act_v1beta1_action_vote_proto_enumTypes[0].Descriptor()
}

func (ActionVoteType) Type() protoreflect.EnumType {
	return &file_warden_act_v1beta1_action_vote_proto_enumTypes[0]
}

func (x ActionVoteType) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use ActionVoteType.Descriptor instead.
func (ActionVoteType) EnumDescriptor() ([]byte, []int) {
	return file_warden_act_v1beta1_action_vote_proto_rawDescGZIP(), []int{0}
}

type ActionVote struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// participant is the address of the voter.
	Participant string `protobuf:"bytes,1,opt,name=participant,proto3" json:"participant,omitempty"`
	// voted_at is a timestamp specifying when the voter voted on the action.
	VotedAt *timestamppb.Timestamp `protobuf:"bytes,2,opt,name=voted_at,json=votedAt,proto3" json:"voted_at,omitempty"`
	// vote is the type of the vote.
	Vote ActionVoteType `protobuf:"varint,3,opt,name=vote,proto3,enum=warden.act.v1beta1.ActionVoteType" json:"vote,omitempty"`
}

func (x *ActionVote) Reset() {
	*x = ActionVote{}
	if protoimpl.UnsafeEnabled {
		mi := &file_warden_act_v1beta1_action_vote_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ActionVote) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ActionVote) ProtoMessage() {}

// Deprecated: Use ActionVote.ProtoReflect.Descriptor instead.
func (*ActionVote) Descriptor() ([]byte, []int) {
	return file_warden_act_v1beta1_action_vote_proto_rawDescGZIP(), []int{0}
}

func (x *ActionVote) GetParticipant() string {
	if x != nil {
		return x.Participant
	}
	return ""
}

func (x *ActionVote) GetVotedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.VotedAt
	}
	return nil
}

func (x *ActionVote) GetVote() ActionVoteType {
	if x != nil {
		return x.Vote
	}
	return ActionVoteType_VOTE_TYPE_UNSPECIFIED
}

var File_warden_act_v1beta1_action_vote_proto protoreflect.FileDescriptor

var file_warden_act_v1beta1_action_vote_proto_rawDesc = []byte{
	0x0a, 0x24, 0x77, 0x61, 0x72, 0x64, 0x65, 0x6e, 0x2f, 0x61, 0x63, 0x74, 0x2f, 0x76, 0x31, 0x62,
	0x65, 0x74, 0x61, 0x31, 0x2f, 0x61, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x5f, 0x76, 0x6f, 0x74, 0x65,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x12, 0x77, 0x61, 0x72, 0x64, 0x65, 0x6e, 0x2e, 0x61,
	0x63, 0x74, 0x2e, 0x76, 0x31, 0x62, 0x65, 0x74, 0x61, 0x31, 0x1a, 0x11, 0x61, 0x6d, 0x69, 0x6e,
	0x6f, 0x2f, 0x61, 0x6d, 0x69, 0x6e, 0x6f, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x14, 0x67,
	0x6f, 0x67, 0x6f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x67, 0x6f, 0x67, 0x6f, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x1a, 0x1f, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x62, 0x75, 0x66, 0x2f, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x22, 0xac, 0x01, 0x0a, 0x0a, 0x41, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x56,
	0x6f, 0x74, 0x65, 0x12, 0x20, 0x0a, 0x0b, 0x70, 0x61, 0x72, 0x74, 0x69, 0x63, 0x69, 0x70, 0x61,
	0x6e, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x70, 0x61, 0x72, 0x74, 0x69, 0x63,
	0x69, 0x70, 0x61, 0x6e, 0x74, 0x12, 0x44, 0x0a, 0x08, 0x76, 0x6f, 0x74, 0x65, 0x64, 0x5f, 0x61,
	0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74,
	0x61, 0x6d, 0x70, 0x42, 0x0d, 0xc8, 0xde, 0x1f, 0x00, 0x90, 0xdf, 0x1f, 0x01, 0xa8, 0xe7, 0xb0,
	0x2a, 0x01, 0x52, 0x07, 0x76, 0x6f, 0x74, 0x65, 0x64, 0x41, 0x74, 0x12, 0x36, 0x0a, 0x04, 0x76,
	0x6f, 0x74, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x22, 0x2e, 0x77, 0x61, 0x72, 0x64,
	0x65, 0x6e, 0x2e, 0x61, 0x63, 0x74, 0x2e, 0x76, 0x31, 0x62, 0x65, 0x74, 0x61, 0x31, 0x2e, 0x41,
	0x63, 0x74, 0x69, 0x6f, 0x6e, 0x56, 0x6f, 0x74, 0x65, 0x54, 0x79, 0x70, 0x65, 0x52, 0x04, 0x76,
	0x6f, 0x74, 0x65, 0x2a, 0x5b, 0x0a, 0x0e, 0x41, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x56, 0x6f, 0x74,
	0x65, 0x54, 0x79, 0x70, 0x65, 0x12, 0x19, 0x0a, 0x15, 0x56, 0x4f, 0x54, 0x45, 0x5f, 0x54, 0x59,
	0x50, 0x45, 0x5f, 0x55, 0x4e, 0x53, 0x50, 0x45, 0x43, 0x49, 0x46, 0x49, 0x45, 0x44, 0x10, 0x00,
	0x12, 0x16, 0x0a, 0x12, 0x56, 0x4f, 0x54, 0x45, 0x5f, 0x54, 0x59, 0x50, 0x45, 0x5f, 0x41, 0x50,
	0x50, 0x52, 0x4f, 0x56, 0x45, 0x44, 0x10, 0x01, 0x12, 0x16, 0x0a, 0x12, 0x56, 0x4f, 0x54, 0x45,
	0x5f, 0x54, 0x59, 0x50, 0x45, 0x5f, 0x52, 0x45, 0x4a, 0x45, 0x43, 0x54, 0x45, 0x44, 0x10, 0x02,
	0x42, 0xe0, 0x01, 0x0a, 0x16, 0x63, 0x6f, 0x6d, 0x2e, 0x77, 0x61, 0x72, 0x64, 0x65, 0x6e, 0x2e,
	0x61, 0x63, 0x74, 0x2e, 0x76, 0x31, 0x62, 0x65, 0x74, 0x61, 0x31, 0x42, 0x0f, 0x41, 0x63, 0x74,
	0x69, 0x6f, 0x6e, 0x56, 0x6f, 0x74, 0x65, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01, 0x5a, 0x4b,
	0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x77, 0x61, 0x72, 0x64, 0x65,
	0x6e, 0x2d, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x63, 0x6f, 0x6c, 0x2f, 0x77, 0x61, 0x72, 0x64, 0x65,
	0x6e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x63, 0x6f, 0x6c, 0x2f, 0x61, 0x70, 0x69, 0x2f, 0x77, 0x61,
	0x72, 0x64, 0x65, 0x6e, 0x2f, 0x61, 0x63, 0x74, 0x2f, 0x76, 0x31, 0x62, 0x65, 0x74, 0x61, 0x31,
	0x3b, 0x61, 0x63, 0x74, 0x76, 0x31, 0x62, 0x65, 0x74, 0x61, 0x31, 0xa2, 0x02, 0x03, 0x57, 0x41,
	0x58, 0xaa, 0x02, 0x12, 0x57, 0x61, 0x72, 0x64, 0x65, 0x6e, 0x2e, 0x41, 0x63, 0x74, 0x2e, 0x56,
	0x31, 0x62, 0x65, 0x74, 0x61, 0x31, 0xca, 0x02, 0x12, 0x57, 0x61, 0x72, 0x64, 0x65, 0x6e, 0x5c,
	0x41, 0x63, 0x74, 0x5c, 0x56, 0x31, 0x62, 0x65, 0x74, 0x61, 0x31, 0xe2, 0x02, 0x1e, 0x57, 0x61,
	0x72, 0x64, 0x65, 0x6e, 0x5c, 0x41, 0x63, 0x74, 0x5c, 0x56, 0x31, 0x62, 0x65, 0x74, 0x61, 0x31,
	0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x14, 0x57,
	0x61, 0x72, 0x64, 0x65, 0x6e, 0x3a, 0x3a, 0x41, 0x63, 0x74, 0x3a, 0x3a, 0x56, 0x31, 0x62, 0x65,
	0x74, 0x61, 0x31, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_warden_act_v1beta1_action_vote_proto_rawDescOnce sync.Once
	file_warden_act_v1beta1_action_vote_proto_rawDescData = file_warden_act_v1beta1_action_vote_proto_rawDesc
)

func file_warden_act_v1beta1_action_vote_proto_rawDescGZIP() []byte {
	file_warden_act_v1beta1_action_vote_proto_rawDescOnce.Do(func() {
		file_warden_act_v1beta1_action_vote_proto_rawDescData = protoimpl.X.CompressGZIP(file_warden_act_v1beta1_action_vote_proto_rawDescData)
	})
	return file_warden_act_v1beta1_action_vote_proto_rawDescData
}

var file_warden_act_v1beta1_action_vote_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_warden_act_v1beta1_action_vote_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_warden_act_v1beta1_action_vote_proto_goTypes = []interface{}{
	(ActionVoteType)(0),           // 0: warden.act.v1beta1.ActionVoteType
	(*ActionVote)(nil),            // 1: warden.act.v1beta1.ActionVote
	(*timestamppb.Timestamp)(nil), // 2: google.protobuf.Timestamp
}
var file_warden_act_v1beta1_action_vote_proto_depIdxs = []int32{
	2, // 0: warden.act.v1beta1.ActionVote.voted_at:type_name -> google.protobuf.Timestamp
	0, // 1: warden.act.v1beta1.ActionVote.vote:type_name -> warden.act.v1beta1.ActionVoteType
	2, // [2:2] is the sub-list for method output_type
	2, // [2:2] is the sub-list for method input_type
	2, // [2:2] is the sub-list for extension type_name
	2, // [2:2] is the sub-list for extension extendee
	0, // [0:2] is the sub-list for field type_name
}

func init() { file_warden_act_v1beta1_action_vote_proto_init() }
func file_warden_act_v1beta1_action_vote_proto_init() {
	if File_warden_act_v1beta1_action_vote_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_warden_act_v1beta1_action_vote_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ActionVote); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_warden_act_v1beta1_action_vote_proto_rawDesc,
			NumEnums:      1,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_warden_act_v1beta1_action_vote_proto_goTypes,
		DependencyIndexes: file_warden_act_v1beta1_action_vote_proto_depIdxs,
		EnumInfos:         file_warden_act_v1beta1_action_vote_proto_enumTypes,
		MessageInfos:      file_warden_act_v1beta1_action_vote_proto_msgTypes,
	}.Build()
	File_warden_act_v1beta1_action_vote_proto = out.File
	file_warden_act_v1beta1_action_vote_proto_rawDesc = nil
	file_warden_act_v1beta1_action_vote_proto_goTypes = nil
	file_warden_act_v1beta1_action_vote_proto_depIdxs = nil
}
