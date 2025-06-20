// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: warden/async/v1beta1/task.proto

package v1beta1

import (
	fmt "fmt"
	github_com_cosmos_cosmos_sdk_types "github.com/cosmos/cosmos-sdk/types"
	types "github.com/cosmos/cosmos-sdk/types"
	_ "github.com/cosmos/cosmos-sdk/types/tx/amino"
	_ "github.com/cosmos/gogoproto/gogoproto"
	proto "github.com/cosmos/gogoproto/proto"
	github_com_cosmos_gogoproto_types "github.com/cosmos/gogoproto/types"
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

type TaskVoteType int32

const (
	// Unspecified vote type.
	TaskVoteType_VOTE_TYPE_UNSPECIFIED TaskVoteType = 0
	// Vote to approve the result of the Task.
	TaskVoteType_VOTE_TYPE_VERIFIED TaskVoteType = 1
	// Vote to reject the result of the Task.
	TaskVoteType_VOTE_TYPE_REJECTED TaskVoteType = 2
)

var TaskVoteType_name = map[int32]string{
	0: "VOTE_TYPE_UNSPECIFIED",
	1: "VOTE_TYPE_VERIFIED",
	2: "VOTE_TYPE_REJECTED",
}

var TaskVoteType_value = map[string]int32{
	"VOTE_TYPE_UNSPECIFIED": 0,
	"VOTE_TYPE_VERIFIED":    1,
	"VOTE_TYPE_REJECTED":    2,
}

func (x TaskVoteType) String() string {
	return proto.EnumName(TaskVoteType_name, int32(x))
}

func (TaskVoteType) EnumDescriptor() ([]byte, []int) {
	return fileDescriptor_4690a0e780221c72, []int{0}
}

// Task defines a task that will be executed asynchronously.
// A validator will be selected to be the "solver".
// The solver must include a result for the Task.
// Other validators will then be able to vote on the validity of the proposed
// result.
type Task struct {
	// Unique ID of the Task.
	Id uint64 `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	// Creator of the Task.
	Creator string `protobuf:"bytes,2,opt,name=creator,proto3" json:"creator,omitempty"`
	// Unique name of the plugin to be used to execute the Task.
	Plugin string `protobuf:"bytes,3,opt,name=plugin,proto3" json:"plugin,omitempty"`
	// Input data to be used by the plugin to execute the Task.
	// The actual format is determined by the plugin being used.
	Input []byte `protobuf:"bytes,4,opt,name=input,proto3" json:"input,omitempty"`
	// Deducted fee are the tokens collected this module when this Task was created.
	// When this Task is executed, the fees are distributed among the executor (the validator who included the result), and the plugin creator.
	Fee DeductedFee `protobuf:"bytes,6,opt,name=fee,proto3" json:"fee"`
	// Id of callback to be called when the Task is completed.
	CallbackId uint64 `protobuf:"varint,7,opt,name=callback_id,json=callbackId,proto3" json:"callback_id,omitempty"`
	// Solver is the consensus address of the validator selected to resolve this
	// Task.
	Solver github_com_cosmos_cosmos_sdk_types.ConsAddress `protobuf:"bytes,8,opt,name=solver,proto3,casttype=github.com/cosmos/cosmos-sdk/types.ConsAddress" json:"solver,omitempty"`
	// created_at is the timestamp of when this task was created.
	CreatedAt time.Time `protobuf:"bytes,9,opt,name=created_at,json=createdAt,proto3,stdtime" json:"created_at"`
}

func (m *Task) Reset()         { *m = Task{} }
func (m *Task) String() string { return proto.CompactTextString(m) }
func (*Task) ProtoMessage()    {}
func (*Task) Descriptor() ([]byte, []int) {
	return fileDescriptor_4690a0e780221c72, []int{0}
}
func (m *Task) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *Task) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_Task.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *Task) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Task.Merge(m, src)
}
func (m *Task) XXX_Size() int {
	return m.Size()
}
func (m *Task) XXX_DiscardUnknown() {
	xxx_messageInfo_Task.DiscardUnknown(m)
}

var xxx_messageInfo_Task proto.InternalMessageInfo

func (m *Task) GetId() uint64 {
	if m != nil {
		return m.Id
	}
	return 0
}

func (m *Task) GetCreator() string {
	if m != nil {
		return m.Creator
	}
	return ""
}

func (m *Task) GetPlugin() string {
	if m != nil {
		return m.Plugin
	}
	return ""
}

func (m *Task) GetInput() []byte {
	if m != nil {
		return m.Input
	}
	return nil
}

func (m *Task) GetFee() DeductedFee {
	if m != nil {
		return m.Fee
	}
	return DeductedFee{}
}

func (m *Task) GetCallbackId() uint64 {
	if m != nil {
		return m.CallbackId
	}
	return 0
}

func (m *Task) GetSolver() github_com_cosmos_cosmos_sdk_types.ConsAddress {
	if m != nil {
		return m.Solver
	}
	return nil
}

func (m *Task) GetCreatedAt() time.Time {
	if m != nil {
		return m.CreatedAt
	}
	return time.Time{}
}

// TaskResult is the result of the execution of a Task.
// It is submitted by validators as vote extensions.
// Only one TaskResult per Task is allowed to be submitted, subsequent attempts
// to submit a TaskResult will be rejected.
type TaskResult struct {
	// ID of the Task this result is for.
	Id uint64 `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	// Output of the Task.
	// The actual format is determined by the plugin being used.
	// If error is set, output will be empty.
	Output []byte `protobuf:"bytes,2,opt,name=output,proto3" json:"output,omitempty"`
	// Error reason if the Task could not be completed, in a human readable
	// format.
	// If error is set, the Task is considered failed and the output will be
	// empty.
	Error string `protobuf:"bytes,4,opt,name=error,proto3" json:"error,omitempty"`
	// created_at is the timestamp of when this result was added.
	CreatedAt time.Time `protobuf:"bytes,5,opt,name=created_at,json=createdAt,proto3,stdtime" json:"created_at"`
}

func (m *TaskResult) Reset()         { *m = TaskResult{} }
func (m *TaskResult) String() string { return proto.CompactTextString(m) }
func (*TaskResult) ProtoMessage()    {}
func (*TaskResult) Descriptor() ([]byte, []int) {
	return fileDescriptor_4690a0e780221c72, []int{1}
}
func (m *TaskResult) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *TaskResult) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_TaskResult.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *TaskResult) XXX_Merge(src proto.Message) {
	xxx_messageInfo_TaskResult.Merge(m, src)
}
func (m *TaskResult) XXX_Size() int {
	return m.Size()
}
func (m *TaskResult) XXX_DiscardUnknown() {
	xxx_messageInfo_TaskResult.DiscardUnknown(m)
}

var xxx_messageInfo_TaskResult proto.InternalMessageInfo

func (m *TaskResult) GetId() uint64 {
	if m != nil {
		return m.Id
	}
	return 0
}

func (m *TaskResult) GetOutput() []byte {
	if m != nil {
		return m.Output
	}
	return nil
}

func (m *TaskResult) GetError() string {
	if m != nil {
		return m.Error
	}
	return ""
}

func (m *TaskResult) GetCreatedAt() time.Time {
	if m != nil {
		return m.CreatedAt
	}
	return time.Time{}
}

// TaskVote is the vote of a validator on the validity of a Task result.
type TaskVote struct {
	// ID of the Task this vote is for.
	TaskId uint64 `protobuf:"varint,1,opt,name=task_id,json=taskId,proto3" json:"task_id,omitempty"`
	// Address of the validator who voted.
	Voter []byte `protobuf:"bytes,2,opt,name=voter,proto3" json:"voter,omitempty"`
	// Vote type.
	Vote TaskVoteType `protobuf:"varint,3,opt,name=vote,proto3,enum=warden.async.v1beta1.TaskVoteType" json:"vote,omitempty"`
}

func (m *TaskVote) Reset()         { *m = TaskVote{} }
func (m *TaskVote) String() string { return proto.CompactTextString(m) }
func (*TaskVote) ProtoMessage()    {}
func (*TaskVote) Descriptor() ([]byte, []int) {
	return fileDescriptor_4690a0e780221c72, []int{2}
}
func (m *TaskVote) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *TaskVote) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_TaskVote.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *TaskVote) XXX_Merge(src proto.Message) {
	xxx_messageInfo_TaskVote.Merge(m, src)
}
func (m *TaskVote) XXX_Size() int {
	return m.Size()
}
func (m *TaskVote) XXX_DiscardUnknown() {
	xxx_messageInfo_TaskVote.DiscardUnknown(m)
}

var xxx_messageInfo_TaskVote proto.InternalMessageInfo

func (m *TaskVote) GetTaskId() uint64 {
	if m != nil {
		return m.TaskId
	}
	return 0
}

func (m *TaskVote) GetVoter() []byte {
	if m != nil {
		return m.Voter
	}
	return nil
}

func (m *TaskVote) GetVote() TaskVoteType {
	if m != nil {
		return m.Vote
	}
	return TaskVoteType_VOTE_TYPE_UNSPECIFIED
}

// Deducted fee for a task.
type DeductedFee struct {
	// Reward for the executor of a task
	ExecutorReward github_com_cosmos_cosmos_sdk_types.Coins `protobuf:"bytes,1,rep,name=executor_reward,json=executorReward,proto3,castrepeated=github.com/cosmos/cosmos-sdk/types.Coins" json:"executor_reward"`
	// Reward for the creator of the plugin
	PluginCreatorReward github_com_cosmos_cosmos_sdk_types.Coins `protobuf:"bytes,2,rep,name=plugin_creator_reward,json=pluginCreatorReward,proto3,castrepeated=github.com/cosmos/cosmos-sdk/types.Coins" json:"plugin_creator_reward"`
}

func (m *DeductedFee) Reset()         { *m = DeductedFee{} }
func (m *DeductedFee) String() string { return proto.CompactTextString(m) }
func (*DeductedFee) ProtoMessage()    {}
func (*DeductedFee) Descriptor() ([]byte, []int) {
	return fileDescriptor_4690a0e780221c72, []int{3}
}
func (m *DeductedFee) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *DeductedFee) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_DeductedFee.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *DeductedFee) XXX_Merge(src proto.Message) {
	xxx_messageInfo_DeductedFee.Merge(m, src)
}
func (m *DeductedFee) XXX_Size() int {
	return m.Size()
}
func (m *DeductedFee) XXX_DiscardUnknown() {
	xxx_messageInfo_DeductedFee.DiscardUnknown(m)
}

var xxx_messageInfo_DeductedFee proto.InternalMessageInfo

func (m *DeductedFee) GetExecutorReward() github_com_cosmos_cosmos_sdk_types.Coins {
	if m != nil {
		return m.ExecutorReward
	}
	return nil
}

func (m *DeductedFee) GetPluginCreatorReward() github_com_cosmos_cosmos_sdk_types.Coins {
	if m != nil {
		return m.PluginCreatorReward
	}
	return nil
}

func init() {
	proto.RegisterEnum("warden.async.v1beta1.TaskVoteType", TaskVoteType_name, TaskVoteType_value)
	proto.RegisterType((*Task)(nil), "warden.async.v1beta1.Task")
	proto.RegisterType((*TaskResult)(nil), "warden.async.v1beta1.TaskResult")
	proto.RegisterType((*TaskVote)(nil), "warden.async.v1beta1.TaskVote")
	proto.RegisterType((*DeductedFee)(nil), "warden.async.v1beta1.DeductedFee")
}

func init() { proto.RegisterFile("warden/async/v1beta1/task.proto", fileDescriptor_4690a0e780221c72) }

var fileDescriptor_4690a0e780221c72 = []byte{
	// 687 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xbc, 0x54, 0xc1, 0x4e, 0xdb, 0x4a,
	0x14, 0xcd, 0x38, 0xc1, 0x90, 0x09, 0x8f, 0x97, 0x37, 0x0f, 0x78, 0x86, 0x85, 0x9d, 0x97, 0x55,
	0x84, 0x84, 0x2d, 0x52, 0xa9, 0x52, 0x97, 0x24, 0x38, 0x6a, 0x58, 0xb4, 0xc8, 0x4d, 0x91, 0xe8,
	0xc6, 0x75, 0xec, 0xc1, 0xb5, 0xe2, 0x78, 0x52, 0xcf, 0x98, 0x92, 0x5f, 0xe8, 0x8a, 0x4d, 0x37,
	0x7c, 0x41, 0xd5, 0x15, 0xea, 0x57, 0xb0, 0x64, 0x55, 0x75, 0x05, 0x15, 0x2c, 0xf8, 0x87, 0xae,
	0xaa, 0x99, 0xb1, 0x29, 0xa5, 0x2c, 0x2a, 0x55, 0xea, 0x26, 0x99, 0x73, 0xe7, 0xf8, 0xde, 0x73,
	0xcf, 0xbd, 0x36, 0x34, 0xde, 0x78, 0x69, 0x80, 0x13, 0xcb, 0xa3, 0xd3, 0xc4, 0xb7, 0x0e, 0x36,
	0x86, 0x98, 0x79, 0x1b, 0x16, 0xf3, 0xe8, 0xc8, 0x9c, 0xa4, 0x84, 0x11, 0xb4, 0x28, 0x09, 0xa6,
	0x20, 0x98, 0x39, 0x61, 0xf5, 0x1f, 0x6f, 0x1c, 0x25, 0xc4, 0x12, 0xbf, 0x92, 0xb8, 0xaa, 0xfb,
	0x84, 0x8e, 0x09, 0xb5, 0x86, 0x1e, 0xc5, 0x37, 0x89, 0x7c, 0x12, 0x25, 0xf9, 0xfd, 0x62, 0x48,
	0x42, 0x22, 0x8e, 0x16, 0x3f, 0xe5, 0x51, 0x23, 0x24, 0x24, 0x8c, 0xb1, 0x25, 0xd0, 0x30, 0xdb,
	0xb7, 0x58, 0x34, 0xc6, 0x94, 0x79, 0xe3, 0x89, 0x24, 0x34, 0x3f, 0x29, 0xb0, 0x32, 0xf0, 0xe8,
	0x08, 0x2d, 0x40, 0x25, 0x0a, 0x34, 0xd0, 0x00, 0xad, 0x8a, 0xa3, 0x44, 0x01, 0xd2, 0xe0, 0xac,
	0x9f, 0x62, 0x8f, 0x91, 0x54, 0x53, 0x1a, 0xa0, 0x55, 0x75, 0x0a, 0x88, 0x96, 0xa1, 0x3a, 0x89,
	0xb3, 0x30, 0x4a, 0xb4, 0xb2, 0xb8, 0xc8, 0x11, 0x5a, 0x84, 0x33, 0x51, 0x32, 0xc9, 0x98, 0x56,
	0x69, 0x80, 0xd6, 0xbc, 0x23, 0x01, 0x7a, 0x04, 0xcb, 0xfb, 0x18, 0x6b, 0x6a, 0x03, 0xb4, 0x6a,
	0xed, 0xff, 0xcd, 0xfb, 0xda, 0x35, 0xb7, 0x70, 0x90, 0xf9, 0x0c, 0x07, 0x3d, 0x8c, 0x3b, 0x95,
	0xd3, 0x73, 0xa3, 0xe4, 0xf0, 0x67, 0x90, 0x01, 0x6b, 0xbe, 0x17, 0xc7, 0x43, 0xcf, 0x1f, 0xb9,
	0x51, 0xa0, 0xcd, 0x0a, 0x6d, 0xb0, 0x08, 0xf5, 0x03, 0xb4, 0x0d, 0x55, 0x4a, 0xe2, 0x03, 0x9c,
	0x6a, 0x73, 0xbc, 0x64, 0xa7, 0xfd, 0xf5, 0xdc, 0x30, 0xc3, 0x88, 0xbd, 0xca, 0x86, 0xa6, 0x4f,
	0xc6, 0x56, 0x6e, 0x99, 0xfc, 0x5b, 0xa7, 0xc1, 0xc8, 0x62, 0xd3, 0x09, 0xa6, 0x66, 0x97, 0x24,
	0x74, 0x33, 0x08, 0x52, 0x4c, 0xa9, 0x93, 0x67, 0x40, 0x8f, 0x21, 0x14, 0x0d, 0xe2, 0xc0, 0xf5,
	0x98, 0x56, 0x15, 0x72, 0x57, 0x4d, 0x69, 0x9f, 0x59, 0xd8, 0x67, 0x0e, 0x0a, 0xfb, 0x3a, 0x7f,
	0x71, 0x9d, 0x47, 0x17, 0x06, 0x78, 0x7f, 0x7d, 0xb2, 0x06, 0x9c, 0x6a, 0xfe, 0xf0, 0x26, 0xdb,
	0xae, 0xcc, 0xcd, 0xd4, 0xd5, 0xe6, 0x31, 0x80, 0x90, 0x1b, 0xeb, 0x60, 0x9a, 0xc5, 0xec, 0x27,
	0x7b, 0x97, 0xa1, 0x4a, 0x32, 0xc6, 0xdd, 0x52, 0x84, 0x5b, 0x39, 0xe2, 0x26, 0xe2, 0x34, 0x25,
	0xa9, 0x30, 0xb1, 0xea, 0x48, 0x70, 0x47, 0xdc, 0xcc, 0x6f, 0x89, 0x2b, 0xd7, 0x2b, 0xcd, 0xd7,
	0x70, 0x8e, 0x6b, 0xdb, 0x25, 0x0c, 0xa3, 0xff, 0xe0, 0x2c, 0xdf, 0x47, 0xf7, 0x46, 0x9e, 0xca,
	0x61, 0x3f, 0xe0, 0x52, 0x0e, 0x08, 0xc3, 0x69, 0xae, 0x50, 0x02, 0xf4, 0x10, 0x56, 0xf8, 0x41,
	0xcc, 0x7e, 0xa1, 0xdd, 0xbc, 0x7f, 0xa0, 0x45, 0xf2, 0xc1, 0x74, 0x82, 0x1d, 0xc1, 0x6f, 0x7e,
	0x54, 0x60, 0xed, 0xd6, 0x9c, 0xd1, 0x5b, 0x00, 0xff, 0xc6, 0x87, 0xd8, 0xcf, 0x18, 0x49, 0xdd,
	0x14, 0xf3, 0x34, 0x1a, 0x68, 0x94, 0x5b, 0xb5, 0xf6, 0x8a, 0x29, 0x07, 0x66, 0xf2, 0x55, 0xbf,
	0x49, 0xd9, 0x25, 0x51, 0xd2, 0xe9, 0xf1, 0xbe, 0x3e, 0x5c, 0x18, 0xad, 0x5f, 0x1a, 0x72, 0x94,
	0xd0, 0xe3, 0xeb, 0x93, 0xb5, 0xf9, 0x18, 0x87, 0x9e, 0x3f, 0x75, 0xf9, 0xcb, 0x42, 0xa5, 0x21,
	0x0b, 0x45, 0x65, 0x47, 0x14, 0x46, 0xef, 0x00, 0x5c, 0x92, 0x5b, 0xec, 0xe6, 0x5b, 0x5e, 0x48,
	0x52, 0xfe, 0x94, 0xa4, 0x7f, 0x65, 0xfd, 0xae, 0x2c, 0x2f, 0x75, 0xad, 0xed, 0xc1, 0xf9, 0xdb,
	0x56, 0xa2, 0x15, 0xb8, 0xb4, 0xfb, 0x74, 0x60, 0xbb, 0x83, 0xbd, 0x1d, 0xdb, 0x7d, 0xfe, 0xe4,
	0xd9, 0x8e, 0xdd, 0xed, 0xf7, 0xfa, 0xf6, 0x56, 0xbd, 0x84, 0x96, 0x21, 0xfa, 0x7e, 0xb5, 0x6b,
	0x3b, 0x32, 0x0e, 0x7e, 0x8c, 0x3b, 0xf6, 0xb6, 0xdd, 0x1d, 0xd8, 0x5b, 0x75, 0xa5, 0xf3, 0xf2,
	0xf4, 0x52, 0x07, 0x67, 0x97, 0x3a, 0xf8, 0x72, 0xa9, 0x83, 0xa3, 0x2b, 0xbd, 0x74, 0x76, 0xa5,
	0x97, 0x3e, 0x5f, 0xe9, 0xa5, 0x17, 0xbd, 0x5b, 0x9d, 0xc8, 0xe9, 0xae, 0x8b, 0x15, 0xf3, 0x49,
	0x9c, 0xe3, 0x3b, 0xd0, 0x3a, 0xcc, 0xbf, 0x6f, 0xa2, 0xcb, 0xe2, 0xe3, 0x34, 0x54, 0x05, 0xed,
	0xc1, 0xb7, 0x00, 0x00, 0x00, 0xff, 0xff, 0x5f, 0xd5, 0x34, 0x8d, 0x04, 0x05, 0x00, 0x00,
}

func (m *Task) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *Task) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *Task) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	n1, err1 := github_com_cosmos_gogoproto_types.StdTimeMarshalTo(m.CreatedAt, dAtA[i-github_com_cosmos_gogoproto_types.SizeOfStdTime(m.CreatedAt):])
	if err1 != nil {
		return 0, err1
	}
	i -= n1
	i = encodeVarintTask(dAtA, i, uint64(n1))
	i--
	dAtA[i] = 0x4a
	if len(m.Solver) > 0 {
		i -= len(m.Solver)
		copy(dAtA[i:], m.Solver)
		i = encodeVarintTask(dAtA, i, uint64(len(m.Solver)))
		i--
		dAtA[i] = 0x42
	}
	if m.CallbackId != 0 {
		i = encodeVarintTask(dAtA, i, uint64(m.CallbackId))
		i--
		dAtA[i] = 0x38
	}
	{
		size, err := m.Fee.MarshalToSizedBuffer(dAtA[:i])
		if err != nil {
			return 0, err
		}
		i -= size
		i = encodeVarintTask(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0x32
	if len(m.Input) > 0 {
		i -= len(m.Input)
		copy(dAtA[i:], m.Input)
		i = encodeVarintTask(dAtA, i, uint64(len(m.Input)))
		i--
		dAtA[i] = 0x22
	}
	if len(m.Plugin) > 0 {
		i -= len(m.Plugin)
		copy(dAtA[i:], m.Plugin)
		i = encodeVarintTask(dAtA, i, uint64(len(m.Plugin)))
		i--
		dAtA[i] = 0x1a
	}
	if len(m.Creator) > 0 {
		i -= len(m.Creator)
		copy(dAtA[i:], m.Creator)
		i = encodeVarintTask(dAtA, i, uint64(len(m.Creator)))
		i--
		dAtA[i] = 0x12
	}
	if m.Id != 0 {
		i = encodeVarintTask(dAtA, i, uint64(m.Id))
		i--
		dAtA[i] = 0x8
	}
	return len(dAtA) - i, nil
}

func (m *TaskResult) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *TaskResult) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *TaskResult) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	n3, err3 := github_com_cosmos_gogoproto_types.StdTimeMarshalTo(m.CreatedAt, dAtA[i-github_com_cosmos_gogoproto_types.SizeOfStdTime(m.CreatedAt):])
	if err3 != nil {
		return 0, err3
	}
	i -= n3
	i = encodeVarintTask(dAtA, i, uint64(n3))
	i--
	dAtA[i] = 0x2a
	if len(m.Error) > 0 {
		i -= len(m.Error)
		copy(dAtA[i:], m.Error)
		i = encodeVarintTask(dAtA, i, uint64(len(m.Error)))
		i--
		dAtA[i] = 0x22
	}
	if len(m.Output) > 0 {
		i -= len(m.Output)
		copy(dAtA[i:], m.Output)
		i = encodeVarintTask(dAtA, i, uint64(len(m.Output)))
		i--
		dAtA[i] = 0x12
	}
	if m.Id != 0 {
		i = encodeVarintTask(dAtA, i, uint64(m.Id))
		i--
		dAtA[i] = 0x8
	}
	return len(dAtA) - i, nil
}

func (m *TaskVote) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *TaskVote) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *TaskVote) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.Vote != 0 {
		i = encodeVarintTask(dAtA, i, uint64(m.Vote))
		i--
		dAtA[i] = 0x18
	}
	if len(m.Voter) > 0 {
		i -= len(m.Voter)
		copy(dAtA[i:], m.Voter)
		i = encodeVarintTask(dAtA, i, uint64(len(m.Voter)))
		i--
		dAtA[i] = 0x12
	}
	if m.TaskId != 0 {
		i = encodeVarintTask(dAtA, i, uint64(m.TaskId))
		i--
		dAtA[i] = 0x8
	}
	return len(dAtA) - i, nil
}

func (m *DeductedFee) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *DeductedFee) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *DeductedFee) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.PluginCreatorReward) > 0 {
		for iNdEx := len(m.PluginCreatorReward) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.PluginCreatorReward[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintTask(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x12
		}
	}
	if len(m.ExecutorReward) > 0 {
		for iNdEx := len(m.ExecutorReward) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.ExecutorReward[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintTask(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0xa
		}
	}
	return len(dAtA) - i, nil
}

func encodeVarintTask(dAtA []byte, offset int, v uint64) int {
	offset -= sovTask(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *Task) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.Id != 0 {
		n += 1 + sovTask(uint64(m.Id))
	}
	l = len(m.Creator)
	if l > 0 {
		n += 1 + l + sovTask(uint64(l))
	}
	l = len(m.Plugin)
	if l > 0 {
		n += 1 + l + sovTask(uint64(l))
	}
	l = len(m.Input)
	if l > 0 {
		n += 1 + l + sovTask(uint64(l))
	}
	l = m.Fee.Size()
	n += 1 + l + sovTask(uint64(l))
	if m.CallbackId != 0 {
		n += 1 + sovTask(uint64(m.CallbackId))
	}
	l = len(m.Solver)
	if l > 0 {
		n += 1 + l + sovTask(uint64(l))
	}
	l = github_com_cosmos_gogoproto_types.SizeOfStdTime(m.CreatedAt)
	n += 1 + l + sovTask(uint64(l))
	return n
}

func (m *TaskResult) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.Id != 0 {
		n += 1 + sovTask(uint64(m.Id))
	}
	l = len(m.Output)
	if l > 0 {
		n += 1 + l + sovTask(uint64(l))
	}
	l = len(m.Error)
	if l > 0 {
		n += 1 + l + sovTask(uint64(l))
	}
	l = github_com_cosmos_gogoproto_types.SizeOfStdTime(m.CreatedAt)
	n += 1 + l + sovTask(uint64(l))
	return n
}

func (m *TaskVote) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.TaskId != 0 {
		n += 1 + sovTask(uint64(m.TaskId))
	}
	l = len(m.Voter)
	if l > 0 {
		n += 1 + l + sovTask(uint64(l))
	}
	if m.Vote != 0 {
		n += 1 + sovTask(uint64(m.Vote))
	}
	return n
}

func (m *DeductedFee) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if len(m.ExecutorReward) > 0 {
		for _, e := range m.ExecutorReward {
			l = e.Size()
			n += 1 + l + sovTask(uint64(l))
		}
	}
	if len(m.PluginCreatorReward) > 0 {
		for _, e := range m.PluginCreatorReward {
			l = e.Size()
			n += 1 + l + sovTask(uint64(l))
		}
	}
	return n
}

func sovTask(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozTask(x uint64) (n int) {
	return sovTask(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *Task) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTask
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
			return fmt.Errorf("proto: Task: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: Task: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Id", wireType)
			}
			m.Id = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTask
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
				return fmt.Errorf("proto: wrong wireType = %d for field Creator", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTask
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
				return ErrInvalidLengthTask
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTask
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Creator = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Plugin", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTask
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
				return ErrInvalidLengthTask
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTask
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Plugin = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Input", wireType)
			}
			var byteLen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTask
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				byteLen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if byteLen < 0 {
				return ErrInvalidLengthTask
			}
			postIndex := iNdEx + byteLen
			if postIndex < 0 {
				return ErrInvalidLengthTask
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Input = append(m.Input[:0], dAtA[iNdEx:postIndex]...)
			if m.Input == nil {
				m.Input = []byte{}
			}
			iNdEx = postIndex
		case 6:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Fee", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTask
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
				return ErrInvalidLengthTask
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthTask
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.Fee.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 7:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field CallbackId", wireType)
			}
			m.CallbackId = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTask
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.CallbackId |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 8:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Solver", wireType)
			}
			var byteLen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTask
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				byteLen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if byteLen < 0 {
				return ErrInvalidLengthTask
			}
			postIndex := iNdEx + byteLen
			if postIndex < 0 {
				return ErrInvalidLengthTask
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Solver = append(m.Solver[:0], dAtA[iNdEx:postIndex]...)
			if m.Solver == nil {
				m.Solver = []byte{}
			}
			iNdEx = postIndex
		case 9:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field CreatedAt", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTask
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
				return ErrInvalidLengthTask
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthTask
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := github_com_cosmos_gogoproto_types.StdTimeUnmarshal(&m.CreatedAt, dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipTask(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTask
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
func (m *TaskResult) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTask
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
			return fmt.Errorf("proto: TaskResult: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: TaskResult: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Id", wireType)
			}
			m.Id = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTask
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
				return fmt.Errorf("proto: wrong wireType = %d for field Output", wireType)
			}
			var byteLen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTask
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				byteLen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if byteLen < 0 {
				return ErrInvalidLengthTask
			}
			postIndex := iNdEx + byteLen
			if postIndex < 0 {
				return ErrInvalidLengthTask
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Output = append(m.Output[:0], dAtA[iNdEx:postIndex]...)
			if m.Output == nil {
				m.Output = []byte{}
			}
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Error", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTask
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
				return ErrInvalidLengthTask
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTask
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Error = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 5:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field CreatedAt", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTask
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
				return ErrInvalidLengthTask
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthTask
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := github_com_cosmos_gogoproto_types.StdTimeUnmarshal(&m.CreatedAt, dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipTask(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTask
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
func (m *TaskVote) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTask
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
			return fmt.Errorf("proto: TaskVote: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: TaskVote: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field TaskId", wireType)
			}
			m.TaskId = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTask
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.TaskId |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Voter", wireType)
			}
			var byteLen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTask
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				byteLen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if byteLen < 0 {
				return ErrInvalidLengthTask
			}
			postIndex := iNdEx + byteLen
			if postIndex < 0 {
				return ErrInvalidLengthTask
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Voter = append(m.Voter[:0], dAtA[iNdEx:postIndex]...)
			if m.Voter == nil {
				m.Voter = []byte{}
			}
			iNdEx = postIndex
		case 3:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Vote", wireType)
			}
			m.Vote = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTask
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Vote |= TaskVoteType(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		default:
			iNdEx = preIndex
			skippy, err := skipTask(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTask
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
func (m *DeductedFee) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTask
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
			return fmt.Errorf("proto: DeductedFee: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: DeductedFee: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ExecutorReward", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTask
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
				return ErrInvalidLengthTask
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthTask
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.ExecutorReward = append(m.ExecutorReward, types.Coin{})
			if err := m.ExecutorReward[len(m.ExecutorReward)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field PluginCreatorReward", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTask
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
				return ErrInvalidLengthTask
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthTask
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.PluginCreatorReward = append(m.PluginCreatorReward, types.Coin{})
			if err := m.PluginCreatorReward[len(m.PluginCreatorReward)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipTask(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTask
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
func skipTask(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowTask
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
					return 0, ErrIntOverflowTask
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
					return 0, ErrIntOverflowTask
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
				return 0, ErrInvalidLengthTask
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupTask
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthTask
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthTask        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowTask          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupTask = fmt.Errorf("proto: unexpected end of group")
)
