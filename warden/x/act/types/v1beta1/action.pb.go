// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: warden/act/v1beta1/action.proto

package v1beta1

import (
	fmt "fmt"
	types "github.com/cosmos/cosmos-sdk/codec/types"
	_ "github.com/cosmos/cosmos-sdk/types/tx/amino"
	_ "github.com/cosmos/gogoproto/gogoproto"
	proto "github.com/cosmos/gogoproto/proto"
	github_com_cosmos_gogoproto_types "github.com/cosmos/gogoproto/types"
	ast "github.com/warden-protocol/wardenprotocol/shield/ast"
	_ "google.golang.org/protobuf/types/known/timestamppb"
	io "io"
	math "math"
	math_bits "math/bits"
	time "time"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf
var _ = time.Kitchen

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

// Current status of an action.
type ActionStatus int32

const (
	// Unspecified status.
	ActionStatus_ACTION_STATUS_UNSPECIFIED ActionStatus = 0
	// Action is pending approval. This is the initial status.
	ActionStatus_ACTION_STATUS_PENDING ActionStatus = 1
	// Rule has been satified, action has been executed.
	ActionStatus_ACTION_STATUS_COMPLETED ActionStatus = 2
	// Action has been revoked by its creator.
	ActionStatus_ACTION_STATUS_REVOKED ActionStatus = 3
	// Action has been rejected since TimeoutHeight has been reached.
	ActionStatus_ACTION_STATUS_TIMEOUT ActionStatus = 4
)

var ActionStatus_name = map[int32]string{
	0: "ACTION_STATUS_UNSPECIFIED",
	1: "ACTION_STATUS_PENDING",
	2: "ACTION_STATUS_COMPLETED",
	3: "ACTION_STATUS_REVOKED",
	4: "ACTION_STATUS_TIMEOUT",
}

var ActionStatus_value = map[string]int32{
	"ACTION_STATUS_UNSPECIFIED": 0,
	"ACTION_STATUS_PENDING":     1,
	"ACTION_STATUS_COMPLETED":   2,
	"ACTION_STATUS_REVOKED":     3,
	"ACTION_STATUS_TIMEOUT":     4,
}

func (x ActionStatus) String() string {
	return proto.EnumName(ActionStatus_name, int32(x))
}

func (ActionStatus) EnumDescriptor() ([]byte, []int) {
	return fileDescriptor_ed852fba5dd71480, []int{0}
}

type Approver struct {
	// address is the address of the approver
	Address string `protobuf:"bytes,1,opt,name=address,proto3" json:"address,omitempty"`
	// approved_at is a timestamp specifying when the approver approved an action
	ApprovedAt time.Time `protobuf:"bytes,2,opt,name=approved_at,json=approvedAt,proto3,stdtime" json:"approved_at"`
}

func (m *Approver) Reset()         { *m = Approver{} }
func (m *Approver) String() string { return proto.CompactTextString(m) }
func (*Approver) ProtoMessage()    {}
func (*Approver) Descriptor() ([]byte, []int) {
	return fileDescriptor_ed852fba5dd71480, []int{0}
}
func (m *Approver) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *Approver) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_Approver.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *Approver) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Approver.Merge(m, src)
}
func (m *Approver) XXX_Size() int {
	return m.Size()
}
func (m *Approver) XXX_DiscardUnknown() {
	xxx_messageInfo_Approver.DiscardUnknown(m)
}

var xxx_messageInfo_Approver proto.InternalMessageInfo

func (m *Approver) GetAddress() string {
	if m != nil {
		return m.Address
	}
	return ""
}

func (m *Approver) GetApprovedAt() time.Time {
	if m != nil {
		return m.ApprovedAt
	}
	return time.Time{}
}

// Action wraps a message that will be executed when its associated rule is
// satisfied.
type Action struct {
	Id        uint64       `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	Approvers []*Approver  `protobuf:"bytes,2,rep,name=approvers,proto3" json:"approvers,omitempty"`
	Status    ActionStatus `protobuf:"varint,3,opt,name=status,proto3,enum=warden.act.v1beta1.ActionStatus" json:"status,omitempty"`
	// Original message that started the action, it will be executed when the
	// rule is satisfied.
	Msg *types.Any `protobuf:"bytes,5,opt,name=msg,proto3" json:"msg,omitempty"`
	// Result of the action, it will be set when the action is completed.
	Result  *types.Any `protobuf:"bytes,6,opt,name=result,proto3" json:"result,omitempty"`
	Creator string     `protobuf:"bytes,7,opt,name=creator,proto3" json:"creator,omitempty"`
	// TimeoutHeight is the block height up until this action can be executed.
	TimeoutHeight uint64 `protobuf:"varint,8,opt,name=timeout_height,json=timeoutHeight,proto3" json:"timeout_height,omitempty"`
	// created_at is a timestamp specifying when the action was created
	CreatedAt time.Time `protobuf:"bytes,9,opt,name=created_at,json=createdAt,proto3,stdtime" json:"created_at"`
	// updated_at is a timestamp specifying when the action's status was updated
	UpdatedAt time.Time `protobuf:"bytes,10,opt,name=updated_at,json=updatedAt,proto3,stdtime" json:"updated_at"`
	// rule is the condition that this action is associated with. Instead of
	// storing the rule ID, we store the entire Rule object so that is immutable
	// and cannot be changed later.
	Rule Rule `protobuf:"bytes,11,opt,name=rule,proto3" json:"rule"`
	// mentions is a list of addresses that are mentioned in the rule.
	Mentions []string `protobuf:"bytes,12,rep,name=mentions,proto3" json:"mentions,omitempty"`
	// The expression to be evaluated for approval.
	ApproveExpression ast.Expression `protobuf:"bytes,13,opt,name=approve_expression,json=approveExpression,proto3" json:"approve_expression"`
	// The expression to be evaluated for rejection.
	RejectExpression ast.Expression `protobuf:"bytes,14,opt,name=reject_expression,json=rejectExpression,proto3" json:"reject_expression"`
}

func (m *Action) Reset()         { *m = Action{} }
func (m *Action) String() string { return proto.CompactTextString(m) }
func (*Action) ProtoMessage()    {}
func (*Action) Descriptor() ([]byte, []int) {
	return fileDescriptor_ed852fba5dd71480, []int{1}
}
func (m *Action) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *Action) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_Action.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *Action) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Action.Merge(m, src)
}
func (m *Action) XXX_Size() int {
	return m.Size()
}
func (m *Action) XXX_DiscardUnknown() {
	xxx_messageInfo_Action.DiscardUnknown(m)
}

var xxx_messageInfo_Action proto.InternalMessageInfo

func (m *Action) GetId() uint64 {
	if m != nil {
		return m.Id
	}
	return 0
}

func (m *Action) GetApprovers() []*Approver {
	if m != nil {
		return m.Approvers
	}
	return nil
}

func (m *Action) GetStatus() ActionStatus {
	if m != nil {
		return m.Status
	}
	return ActionStatus_ACTION_STATUS_UNSPECIFIED
}

func (m *Action) GetMsg() *types.Any {
	if m != nil {
		return m.Msg
	}
	return nil
}

func (m *Action) GetResult() *types.Any {
	if m != nil {
		return m.Result
	}
	return nil
}

func (m *Action) GetCreator() string {
	if m != nil {
		return m.Creator
	}
	return ""
}

func (m *Action) GetTimeoutHeight() uint64 {
	if m != nil {
		return m.TimeoutHeight
	}
	return 0
}

func (m *Action) GetCreatedAt() time.Time {
	if m != nil {
		return m.CreatedAt
	}
	return time.Time{}
}

func (m *Action) GetUpdatedAt() time.Time {
	if m != nil {
		return m.UpdatedAt
	}
	return time.Time{}
}

func (m *Action) GetRule() Rule {
	if m != nil {
		return m.Rule
	}
	return Rule{}
}

func (m *Action) GetMentions() []string {
	if m != nil {
		return m.Mentions
	}
	return nil
}

func (m *Action) GetApproveExpression() ast.Expression {
	if m != nil {
		return m.ApproveExpression
	}
	return ast.Expression{}
}

func (m *Action) GetRejectExpression() ast.Expression {
	if m != nil {
		return m.RejectExpression
	}
	return ast.Expression{}
}

func init() {
	proto.RegisterEnum("warden.act.v1beta1.ActionStatus", ActionStatus_name, ActionStatus_value)
	proto.RegisterType((*Approver)(nil), "warden.act.v1beta1.Approver")
	proto.RegisterType((*Action)(nil), "warden.act.v1beta1.Action")
}

func init() { proto.RegisterFile("warden/act/v1beta1/action.proto", fileDescriptor_ed852fba5dd71480) }

var fileDescriptor_ed852fba5dd71480 = []byte{
	// 642 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x94, 0x54, 0x3f, 0x6f, 0xd3, 0x40,
	0x14, 0x8f, 0x93, 0x34, 0x6d, 0x2e, 0x6d, 0x94, 0x9e, 0x0a, 0x5c, 0x03, 0x4d, 0xa2, 0x4a, 0xa0,
	0xa8, 0x02, 0x5b, 0x0d, 0x0b, 0x62, 0x73, 0x1b, 0x43, 0x43, 0x69, 0x52, 0x39, 0x2e, 0x03, 0x03,
	0xd1, 0x25, 0x3e, 0x1c, 0xa3, 0xd8, 0x67, 0xf9, 0xce, 0xa5, 0xfd, 0x16, 0xdd, 0x99, 0xd8, 0x18,
	0xf9, 0x18, 0x1d, 0x3b, 0x32, 0x01, 0x6a, 0x07, 0xbe, 0x06, 0xf2, 0xf9, 0xdc, 0x7f, 0x89, 0x10,
	0x1d, 0x12, 0xdd, 0x7b, 0xbf, 0x3f, 0x7e, 0xfe, 0xdd, 0x93, 0x41, 0xfd, 0x33, 0x0e, 0x6d, 0xe2,
	0x6b, 0x78, 0xc4, 0xb5, 0xc3, 0xcd, 0x21, 0xe1, 0x78, 0x33, 0x3e, 0xbb, 0xd4, 0x57, 0x83, 0x90,
	0x72, 0x0a, 0x61, 0x42, 0x50, 0xf1, 0x88, 0xab, 0x92, 0x50, 0x5d, 0xc6, 0x9e, 0xeb, 0x53, 0x4d,
	0xfc, 0x27, 0xb4, 0xea, 0x8a, 0x43, 0x1d, 0x2a, 0x8e, 0x5a, 0x7c, 0x92, 0xdd, 0x55, 0x87, 0x52,
	0x67, 0x42, 0x34, 0x51, 0x0d, 0xa3, 0x8f, 0x1a, 0xf6, 0x8f, 0x25, 0x54, 0xbf, 0x0d, 0x71, 0xd7,
	0x23, 0x8c, 0x63, 0x2f, 0x48, 0x1d, 0xd9, 0xd8, 0x25, 0x13, 0x5b, 0xc3, 0x8c, 0xc7, 0x3f, 0xd9,
	0x5d, 0x9b, 0x31, 0x6f, 0x18, 0x4d, 0x48, 0x02, 0xaf, 0x07, 0x60, 0x41, 0x0f, 0x82, 0x90, 0x1e,
	0x92, 0x10, 0x22, 0x30, 0x8f, 0x6d, 0x3b, 0x24, 0x8c, 0x21, 0xa5, 0xa1, 0x34, 0x8b, 0x66, 0x5a,
	0xc2, 0x37, 0xa0, 0x84, 0x13, 0x96, 0x3d, 0xc0, 0x1c, 0x65, 0x1b, 0x4a, 0xb3, 0xd4, 0xaa, 0xaa,
	0xc9, 0x44, 0x6a, 0x3a, 0x91, 0x6a, 0xa5, 0x13, 0x6d, 0x2d, 0x9d, 0xfe, 0xac, 0x67, 0x4e, 0x7e,
	0xd5, 0x95, 0x6f, 0x7f, 0xbe, 0x6f, 0x28, 0x26, 0x48, 0xd5, 0x3a, 0x5f, 0xff, 0x3a, 0x07, 0x0a,
	0xba, 0x08, 0x0c, 0x96, 0x41, 0xd6, 0xb5, 0xc5, 0xb3, 0xf2, 0x66, 0xd6, 0xb5, 0xe1, 0x4b, 0x50,
	0x94, 0xc4, 0x90, 0xa1, 0x6c, 0x23, 0xd7, 0x2c, 0xb5, 0x1e, 0xa9, 0xd3, 0x71, 0xaa, 0xe9, 0xc4,
	0xe6, 0x15, 0x1d, 0xbe, 0x00, 0x05, 0xc6, 0x31, 0x8f, 0x18, 0xca, 0x35, 0x94, 0x66, 0xb9, 0xd5,
	0x98, 0x29, 0x14, 0xcf, 0xed, 0x0b, 0x9e, 0x29, 0xf9, 0xf0, 0x09, 0xc8, 0x79, 0xcc, 0x41, 0x73,
	0xe2, 0xa5, 0x56, 0xa6, 0x5e, 0x4a, 0xf7, 0x8f, 0xcd, 0x98, 0x00, 0x9f, 0x82, 0x42, 0x48, 0x58,
	0x34, 0xe1, 0xa8, 0xf0, 0x0f, 0xaa, 0xe4, 0xc4, 0x61, 0x8e, 0x42, 0x82, 0x39, 0x0d, 0xd1, 0x7c,
	0x12, 0xa6, 0x2c, 0xe1, 0x63, 0x50, 0x8e, 0xaf, 0x8e, 0x46, 0x7c, 0x30, 0x26, 0xae, 0x33, 0xe6,
	0x68, 0x41, 0x24, 0xb0, 0x24, 0xbb, 0x3b, 0xa2, 0x09, 0x77, 0x00, 0x10, 0x8a, 0x24, 0xf2, 0xe2,
	0x5d, 0x23, 0x2f, 0x4a, 0xb1, 0x2e, 0x9c, 0xa2, 0xc0, 0x4e, 0x9d, 0xc0, 0x9d, 0x9d, 0xa4, 0x58,
	0xe7, 0xb0, 0x05, 0xf2, 0xf1, 0xee, 0xa0, 0x92, 0xf0, 0x40, 0xb3, 0x22, 0x36, 0xa3, 0x09, 0xd9,
	0xca, 0xc7, 0x0e, 0xa6, 0xe0, 0xc2, 0x2a, 0x58, 0xf0, 0x88, 0x1f, 0xe7, 0xce, 0xd0, 0x62, 0x23,
	0xd7, 0x2c, 0x9a, 0x97, 0x35, 0xdc, 0x05, 0x50, 0xde, 0xe0, 0x80, 0x1c, 0x05, 0xf1, 0xaa, 0xb9,
	0xd4, 0x47, 0x4b, 0xc2, 0xfd, 0xbe, 0x9a, 0xec, 0xb3, 0x1a, 0xef, 0xb2, 0x71, 0x89, 0x4a, 0xef,
	0x65, 0xa9, 0xbb, 0x02, 0x60, 0x07, 0x2c, 0x87, 0xe4, 0x13, 0x19, 0xf1, 0xeb, 0x5e, 0xe5, 0xff,
	0xf0, 0xaa, 0x24, 0xb2, 0xab, 0xfe, 0xc6, 0x17, 0x05, 0x2c, 0x5e, 0xdf, 0x15, 0xb8, 0x06, 0x56,
	0xf5, 0x6d, 0xab, 0xd3, 0xeb, 0x0e, 0xfa, 0x96, 0x6e, 0x1d, 0xf4, 0x07, 0x07, 0xdd, 0xfe, 0xbe,
	0xb1, 0xdd, 0x79, 0xd5, 0x31, 0xda, 0x95, 0x0c, 0x5c, 0x05, 0xf7, 0x6e, 0xc2, 0xfb, 0x46, 0xb7,
	0xdd, 0xe9, 0xbe, 0xae, 0x28, 0xf0, 0x21, 0x78, 0x70, 0x13, 0xda, 0xee, 0xed, 0xed, 0xbf, 0x35,
	0x2c, 0xa3, 0x5d, 0xc9, 0x4e, 0xeb, 0x4c, 0xe3, 0x5d, 0x6f, 0xd7, 0x68, 0x57, 0x72, 0xd3, 0x90,
	0xd5, 0xd9, 0x33, 0x7a, 0x07, 0x56, 0x25, 0xbf, 0xf5, 0xe1, 0xf4, 0xbc, 0xa6, 0x9c, 0x9d, 0xd7,
	0x94, 0xdf, 0xe7, 0x35, 0xe5, 0xe4, 0xa2, 0x96, 0x39, 0xbb, 0xa8, 0x65, 0x7e, 0x5c, 0xd4, 0x32,
	0xef, 0xdb, 0x8e, 0xcb, 0xc7, 0xd1, 0x50, 0x1d, 0x51, 0x4f, 0x4b, 0xee, 0xe6, 0x99, 0xb8, 0xdf,
	0x11, 0x9d, 0xc8, 0xfa, 0x56, 0xa9, 0x1d, 0x89, 0x0f, 0x03, 0x3f, 0x0e, 0x08, 0x4b, 0x3f, 0x0f,
	0xc3, 0x82, 0x20, 0x3d, 0xff, 0x1b, 0x00, 0x00, 0xff, 0xff, 0x32, 0xca, 0x93, 0x78, 0xeb, 0x04,
	0x00, 0x00,
}

func (m *Approver) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *Approver) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *Approver) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	n1, err1 := github_com_cosmos_gogoproto_types.StdTimeMarshalTo(m.ApprovedAt, dAtA[i-github_com_cosmos_gogoproto_types.SizeOfStdTime(m.ApprovedAt):])
	if err1 != nil {
		return 0, err1
	}
	i -= n1
	i = encodeVarintAction(dAtA, i, uint64(n1))
	i--
	dAtA[i] = 0x12
	if len(m.Address) > 0 {
		i -= len(m.Address)
		copy(dAtA[i:], m.Address)
		i = encodeVarintAction(dAtA, i, uint64(len(m.Address)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *Action) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *Action) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *Action) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	{
		size, err := m.RejectExpression.MarshalToSizedBuffer(dAtA[:i])
		if err != nil {
			return 0, err
		}
		i -= size
		i = encodeVarintAction(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0x72
	{
		size, err := m.ApproveExpression.MarshalToSizedBuffer(dAtA[:i])
		if err != nil {
			return 0, err
		}
		i -= size
		i = encodeVarintAction(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0x6a
	if len(m.Mentions) > 0 {
		for iNdEx := len(m.Mentions) - 1; iNdEx >= 0; iNdEx-- {
			i -= len(m.Mentions[iNdEx])
			copy(dAtA[i:], m.Mentions[iNdEx])
			i = encodeVarintAction(dAtA, i, uint64(len(m.Mentions[iNdEx])))
			i--
			dAtA[i] = 0x62
		}
	}
	{
		size, err := m.Rule.MarshalToSizedBuffer(dAtA[:i])
		if err != nil {
			return 0, err
		}
		i -= size
		i = encodeVarintAction(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0x5a
	n5, err5 := github_com_cosmos_gogoproto_types.StdTimeMarshalTo(m.UpdatedAt, dAtA[i-github_com_cosmos_gogoproto_types.SizeOfStdTime(m.UpdatedAt):])
	if err5 != nil {
		return 0, err5
	}
	i -= n5
	i = encodeVarintAction(dAtA, i, uint64(n5))
	i--
	dAtA[i] = 0x52
	n6, err6 := github_com_cosmos_gogoproto_types.StdTimeMarshalTo(m.CreatedAt, dAtA[i-github_com_cosmos_gogoproto_types.SizeOfStdTime(m.CreatedAt):])
	if err6 != nil {
		return 0, err6
	}
	i -= n6
	i = encodeVarintAction(dAtA, i, uint64(n6))
	i--
	dAtA[i] = 0x4a
	if m.TimeoutHeight != 0 {
		i = encodeVarintAction(dAtA, i, uint64(m.TimeoutHeight))
		i--
		dAtA[i] = 0x40
	}
	if len(m.Creator) > 0 {
		i -= len(m.Creator)
		copy(dAtA[i:], m.Creator)
		i = encodeVarintAction(dAtA, i, uint64(len(m.Creator)))
		i--
		dAtA[i] = 0x3a
	}
	if m.Result != nil {
		{
			size, err := m.Result.MarshalToSizedBuffer(dAtA[:i])
			if err != nil {
				return 0, err
			}
			i -= size
			i = encodeVarintAction(dAtA, i, uint64(size))
		}
		i--
		dAtA[i] = 0x32
	}
	if m.Msg != nil {
		{
			size, err := m.Msg.MarshalToSizedBuffer(dAtA[:i])
			if err != nil {
				return 0, err
			}
			i -= size
			i = encodeVarintAction(dAtA, i, uint64(size))
		}
		i--
		dAtA[i] = 0x2a
	}
	if m.Status != 0 {
		i = encodeVarintAction(dAtA, i, uint64(m.Status))
		i--
		dAtA[i] = 0x18
	}
	if len(m.Approvers) > 0 {
		for iNdEx := len(m.Approvers) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.Approvers[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintAction(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x12
		}
	}
	if m.Id != 0 {
		i = encodeVarintAction(dAtA, i, uint64(m.Id))
		i--
		dAtA[i] = 0x8
	}
	return len(dAtA) - i, nil
}

func encodeVarintAction(dAtA []byte, offset int, v uint64) int {
	offset -= sovAction(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *Approver) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Address)
	if l > 0 {
		n += 1 + l + sovAction(uint64(l))
	}
	l = github_com_cosmos_gogoproto_types.SizeOfStdTime(m.ApprovedAt)
	n += 1 + l + sovAction(uint64(l))
	return n
}

func (m *Action) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.Id != 0 {
		n += 1 + sovAction(uint64(m.Id))
	}
	if len(m.Approvers) > 0 {
		for _, e := range m.Approvers {
			l = e.Size()
			n += 1 + l + sovAction(uint64(l))
		}
	}
	if m.Status != 0 {
		n += 1 + sovAction(uint64(m.Status))
	}
	if m.Msg != nil {
		l = m.Msg.Size()
		n += 1 + l + sovAction(uint64(l))
	}
	if m.Result != nil {
		l = m.Result.Size()
		n += 1 + l + sovAction(uint64(l))
	}
	l = len(m.Creator)
	if l > 0 {
		n += 1 + l + sovAction(uint64(l))
	}
	if m.TimeoutHeight != 0 {
		n += 1 + sovAction(uint64(m.TimeoutHeight))
	}
	l = github_com_cosmos_gogoproto_types.SizeOfStdTime(m.CreatedAt)
	n += 1 + l + sovAction(uint64(l))
	l = github_com_cosmos_gogoproto_types.SizeOfStdTime(m.UpdatedAt)
	n += 1 + l + sovAction(uint64(l))
	l = m.Rule.Size()
	n += 1 + l + sovAction(uint64(l))
	if len(m.Mentions) > 0 {
		for _, s := range m.Mentions {
			l = len(s)
			n += 1 + l + sovAction(uint64(l))
		}
	}
	l = m.ApproveExpression.Size()
	n += 1 + l + sovAction(uint64(l))
	l = m.RejectExpression.Size()
	n += 1 + l + sovAction(uint64(l))
	return n
}

func sovAction(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozAction(x uint64) (n int) {
	return sovAction(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *Approver) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowAction
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
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
			return fmt.Errorf("proto: Approver: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: Approver: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Address", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowAction
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
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
				return ErrInvalidLengthAction
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthAction
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Address = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ApprovedAt", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowAction
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthAction
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthAction
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := github_com_cosmos_gogoproto_types.StdTimeUnmarshal(&m.ApprovedAt, dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipAction(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthAction
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *Action) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowAction
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
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
			return fmt.Errorf("proto: Action: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: Action: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Id", wireType)
			}
			m.Id = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowAction
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Id |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Approvers", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowAction
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthAction
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthAction
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Approvers = append(m.Approvers, &Approver{})
			if err := m.Approvers[len(m.Approvers)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 3:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Status", wireType)
			}
			m.Status = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowAction
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Status |= ActionStatus(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 5:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Msg", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowAction
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthAction
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthAction
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if m.Msg == nil {
				m.Msg = &types.Any{}
			}
			if err := m.Msg.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 6:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Result", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowAction
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthAction
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthAction
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if m.Result == nil {
				m.Result = &types.Any{}
			}
			if err := m.Result.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 7:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Creator", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowAction
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
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
				return ErrInvalidLengthAction
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthAction
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Creator = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 8:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field TimeoutHeight", wireType)
			}
			m.TimeoutHeight = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowAction
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.TimeoutHeight |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 9:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field CreatedAt", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowAction
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthAction
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthAction
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := github_com_cosmos_gogoproto_types.StdTimeUnmarshal(&m.CreatedAt, dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 10:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field UpdatedAt", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowAction
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthAction
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthAction
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := github_com_cosmos_gogoproto_types.StdTimeUnmarshal(&m.UpdatedAt, dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 11:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Rule", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowAction
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthAction
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthAction
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.Rule.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 12:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Mentions", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowAction
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
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
				return ErrInvalidLengthAction
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthAction
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Mentions = append(m.Mentions, string(dAtA[iNdEx:postIndex]))
			iNdEx = postIndex
		case 13:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ApproveExpression", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowAction
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthAction
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthAction
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.ApproveExpression.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 14:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field RejectExpression", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowAction
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthAction
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthAction
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.RejectExpression.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipAction(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthAction
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func skipAction(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowAction
			}
			if iNdEx >= l {
				return 0, io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		wireType := int(wire & 0x7)
		switch wireType {
		case 0:
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowAction
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				iNdEx++
				if dAtA[iNdEx-1] < 0x80 {
					break
				}
			}
		case 1:
			iNdEx += 8
		case 2:
			var length int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowAction
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				length |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if length < 0 {
				return 0, ErrInvalidLengthAction
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupAction
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthAction
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthAction        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowAction          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupAction = fmt.Errorf("proto: unexpected end of group")
)
