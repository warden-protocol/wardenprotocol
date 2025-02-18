// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: warden/async/v1beta1/tx.proto

package v1beta1

import (
	context "context"
	fmt "fmt"
	_ "github.com/cosmos/cosmos-proto"
	_ "github.com/cosmos/cosmos-sdk/codec/types"
	_ "github.com/cosmos/cosmos-sdk/types/msgservice"
	_ "github.com/cosmos/cosmos-sdk/types/tx/amino"
	_ "github.com/cosmos/gogoproto/gogoproto"
	grpc1 "github.com/cosmos/gogoproto/grpc"
	proto "github.com/cosmos/gogoproto/proto"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	io "io"
	math "math"
	math_bits "math/bits"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

// MsgUpdateParams is the Msg/UpdateParams request type.
type MsgUpdateParams struct {
	// authority is the address that controls the module (defaults to x/gov unless overwritten).
	Authority string `protobuf:"bytes,1,opt,name=authority,proto3" json:"authority,omitempty"`
	// NOTE: All parameters must be supplied.
	Params Params `protobuf:"bytes,2,opt,name=params,proto3" json:"params"`
}

func (m *MsgUpdateParams) Reset()         { *m = MsgUpdateParams{} }
func (m *MsgUpdateParams) String() string { return proto.CompactTextString(m) }
func (*MsgUpdateParams) ProtoMessage()    {}
func (*MsgUpdateParams) Descriptor() ([]byte, []int) {
	return fileDescriptor_9b79defe11b4babb, []int{0}
}
func (m *MsgUpdateParams) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgUpdateParams) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgUpdateParams.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgUpdateParams) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgUpdateParams.Merge(m, src)
}
func (m *MsgUpdateParams) XXX_Size() int {
	return m.Size()
}
func (m *MsgUpdateParams) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgUpdateParams.DiscardUnknown(m)
}

var xxx_messageInfo_MsgUpdateParams proto.InternalMessageInfo

func (m *MsgUpdateParams) GetAuthority() string {
	if m != nil {
		return m.Authority
	}
	return ""
}

func (m *MsgUpdateParams) GetParams() Params {
	if m != nil {
		return m.Params
	}
	return Params{}
}

// MsgUpdateParamsResponse defines the response structure for executing a
// MsgUpdateParams message.
type MsgUpdateParamsResponse struct {
}

func (m *MsgUpdateParamsResponse) Reset()         { *m = MsgUpdateParamsResponse{} }
func (m *MsgUpdateParamsResponse) String() string { return proto.CompactTextString(m) }
func (*MsgUpdateParamsResponse) ProtoMessage()    {}
func (*MsgUpdateParamsResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_9b79defe11b4babb, []int{1}
}
func (m *MsgUpdateParamsResponse) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgUpdateParamsResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgUpdateParamsResponse.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgUpdateParamsResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgUpdateParamsResponse.Merge(m, src)
}
func (m *MsgUpdateParamsResponse) XXX_Size() int {
	return m.Size()
}
func (m *MsgUpdateParamsResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgUpdateParamsResponse.DiscardUnknown(m)
}

var xxx_messageInfo_MsgUpdateParamsResponse proto.InternalMessageInfo

type MsgAddFuture struct {
	Creator  string    `protobuf:"bytes,1,opt,name=creator,proto3" json:"creator,omitempty"`
	Handler  string    `protobuf:"bytes,2,opt,name=handler,proto3" json:"handler,omitempty"`
	Input    []byte    `protobuf:"bytes,3,opt,name=input,proto3" json:"input,omitempty"`
	Callback *Callback `protobuf:"bytes,4,opt,name=callback,proto3" json:"callback,omitempty"`
}

func (m *MsgAddFuture) Reset()         { *m = MsgAddFuture{} }
func (m *MsgAddFuture) String() string { return proto.CompactTextString(m) }
func (*MsgAddFuture) ProtoMessage()    {}
func (*MsgAddFuture) Descriptor() ([]byte, []int) {
	return fileDescriptor_9b79defe11b4babb, []int{2}
}
func (m *MsgAddFuture) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgAddFuture) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgAddFuture.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgAddFuture) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgAddFuture.Merge(m, src)
}
func (m *MsgAddFuture) XXX_Size() int {
	return m.Size()
}
func (m *MsgAddFuture) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgAddFuture.DiscardUnknown(m)
}

var xxx_messageInfo_MsgAddFuture proto.InternalMessageInfo

func (m *MsgAddFuture) GetCreator() string {
	if m != nil {
		return m.Creator
	}
	return ""
}

func (m *MsgAddFuture) GetHandler() string {
	if m != nil {
		return m.Handler
	}
	return ""
}

func (m *MsgAddFuture) GetInput() []byte {
	if m != nil {
		return m.Input
	}
	return nil
}

func (m *MsgAddFuture) GetCallback() *Callback {
	if m != nil {
		return m.Callback
	}
	return nil
}

type MsgAddFutureResponse struct {
	Id uint64 `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
}

func (m *MsgAddFutureResponse) Reset()         { *m = MsgAddFutureResponse{} }
func (m *MsgAddFutureResponse) String() string { return proto.CompactTextString(m) }
func (*MsgAddFutureResponse) ProtoMessage()    {}
func (*MsgAddFutureResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_9b79defe11b4babb, []int{3}
}
func (m *MsgAddFutureResponse) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgAddFutureResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgAddFutureResponse.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgAddFutureResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgAddFutureResponse.Merge(m, src)
}
func (m *MsgAddFutureResponse) XXX_Size() int {
	return m.Size()
}
func (m *MsgAddFutureResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgAddFutureResponse.DiscardUnknown(m)
}

var xxx_messageInfo_MsgAddFutureResponse proto.InternalMessageInfo

func (m *MsgAddFutureResponse) GetId() uint64 {
	if m != nil {
		return m.Id
	}
	return 0
}

type MsgAddHandler struct {
	Authority string   `protobuf:"bytes,1,opt,name=authority,proto3" json:"authority,omitempty"`
	Handler   *Handler `protobuf:"bytes,2,opt,name=handler,proto3" json:"handler,omitempty"`
}

func (m *MsgAddHandler) Reset()         { *m = MsgAddHandler{} }
func (m *MsgAddHandler) String() string { return proto.CompactTextString(m) }
func (*MsgAddHandler) ProtoMessage()    {}
func (*MsgAddHandler) Descriptor() ([]byte, []int) {
	return fileDescriptor_9b79defe11b4babb, []int{4}
}
func (m *MsgAddHandler) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgAddHandler) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgAddHandler.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgAddHandler) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgAddHandler.Merge(m, src)
}
func (m *MsgAddHandler) XXX_Size() int {
	return m.Size()
}
func (m *MsgAddHandler) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgAddHandler.DiscardUnknown(m)
}

var xxx_messageInfo_MsgAddHandler proto.InternalMessageInfo

func (m *MsgAddHandler) GetAuthority() string {
	if m != nil {
		return m.Authority
	}
	return ""
}

func (m *MsgAddHandler) GetHandler() *Handler {
	if m != nil {
		return m.Handler
	}
	return nil
}

type MsgAddHandlerResponse struct {
	Handler *Handler `protobuf:"bytes,1,opt,name=handler,proto3" json:"handler,omitempty"`
}

func (m *MsgAddHandlerResponse) Reset()         { *m = MsgAddHandlerResponse{} }
func (m *MsgAddHandlerResponse) String() string { return proto.CompactTextString(m) }
func (*MsgAddHandlerResponse) ProtoMessage()    {}
func (*MsgAddHandlerResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_9b79defe11b4babb, []int{5}
}
func (m *MsgAddHandlerResponse) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgAddHandlerResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgAddHandlerResponse.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgAddHandlerResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgAddHandlerResponse.Merge(m, src)
}
func (m *MsgAddHandlerResponse) XXX_Size() int {
	return m.Size()
}
func (m *MsgAddHandlerResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgAddHandlerResponse.DiscardUnknown(m)
}

var xxx_messageInfo_MsgAddHandlerResponse proto.InternalMessageInfo

func (m *MsgAddHandlerResponse) GetHandler() *Handler {
	if m != nil {
		return m.Handler
	}
	return nil
}

func init() {
	proto.RegisterType((*MsgUpdateParams)(nil), "warden.async.v1beta1.MsgUpdateParams")
	proto.RegisterType((*MsgUpdateParamsResponse)(nil), "warden.async.v1beta1.MsgUpdateParamsResponse")
	proto.RegisterType((*MsgAddFuture)(nil), "warden.async.v1beta1.MsgAddFuture")
	proto.RegisterType((*MsgAddFutureResponse)(nil), "warden.async.v1beta1.MsgAddFutureResponse")
	proto.RegisterType((*MsgAddHandler)(nil), "warden.async.v1beta1.MsgAddHandler")
	proto.RegisterType((*MsgAddHandlerResponse)(nil), "warden.async.v1beta1.MsgAddHandlerResponse")
}

func init() { proto.RegisterFile("warden/async/v1beta1/tx.proto", fileDescriptor_9b79defe11b4babb) }

var fileDescriptor_9b79defe11b4babb = []byte{
	// 562 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x94, 0x53, 0xbd, 0x8e, 0xd3, 0x4c,
	0x14, 0xcd, 0x64, 0x7f, 0xbe, 0x2f, 0xb3, 0x61, 0x11, 0x56, 0xd0, 0x7a, 0xa3, 0x5d, 0x13, 0x8c,
	0x40, 0x51, 0xa4, 0xd8, 0x4a, 0x90, 0x40, 0x4a, 0x83, 0x36, 0x48, 0x2b, 0x9a, 0x48, 0x2b, 0x23,
	0x1a, 0x28, 0x60, 0x62, 0x0f, 0x8e, 0x45, 0xe2, 0xb1, 0x66, 0xc6, 0x61, 0xd3, 0x21, 0x4a, 0x2a,
	0x9e, 0x81, 0x8a, 0x32, 0x05, 0x2d, 0xfd, 0x76, 0xac, 0xa8, 0xa8, 0x10, 0x4a, 0x8a, 0xbc, 0x06,
	0xf2, 0xcc, 0xd8, 0xf9, 0xc1, 0x08, 0x68, 0x12, 0x1f, 0x9f, 0x33, 0xf7, 0x9e, 0xe3, 0x7b, 0x07,
	0x1e, 0xbf, 0x46, 0xd4, 0xc3, 0xa1, 0x8d, 0xd8, 0x24, 0x74, 0xed, 0x71, 0xab, 0x8f, 0x39, 0x6a,
	0xd9, 0xfc, 0xdc, 0x8a, 0x28, 0xe1, 0x44, 0xab, 0x48, 0xda, 0x12, 0xb4, 0xa5, 0xe8, 0xea, 0x35,
	0x34, 0x0a, 0x42, 0x62, 0x8b, 0x5f, 0x29, 0xac, 0x1e, 0xb8, 0x84, 0x8d, 0x08, 0xb3, 0x47, 0xcc,
	0xb7, 0xc7, 0xad, 0xe4, 0x4f, 0x11, 0x87, 0x92, 0x78, 0x2e, 0x90, 0x2d, 0x81, 0xa2, 0x2a, 0x3e,
	0xf1, 0x89, 0x7c, 0x9f, 0x3c, 0xa5, 0x07, 0x7c, 0x42, 0xfc, 0x21, 0xb6, 0x05, 0xea, 0xc7, 0x2f,
	0x6d, 0x14, 0x4e, 0x14, 0x75, 0x2b, 0xd7, 0xac, 0x8b, 0x86, 0xc3, 0x3e, 0x72, 0x5f, 0x29, 0x91,
	0x99, 0x2b, 0x1a, 0xa0, 0xd0, 0x1b, 0x62, 0xaa, 0x34, 0x37, 0x73, 0x35, 0x11, 0xa2, 0x68, 0xa4,
	0xcc, 0x99, 0x9f, 0x01, 0xbc, 0xda, 0x63, 0xfe, 0x93, 0xc8, 0x43, 0x1c, 0x9f, 0x09, 0x46, 0xbb,
	0x07, 0x4b, 0x28, 0xe6, 0x03, 0x42, 0x03, 0x3e, 0xd1, 0x41, 0x0d, 0xd4, 0x4b, 0x5d, 0xfd, 0xeb,
	0xa7, 0x66, 0x45, 0xa5, 0x3a, 0xf1, 0x3c, 0x8a, 0x19, 0x7b, 0xcc, 0x69, 0x10, 0xfa, 0xce, 0x52,
	0xaa, 0x3d, 0x80, 0xbb, 0xb2, 0xb6, 0x5e, 0xac, 0x81, 0xfa, 0x5e, 0xfb, 0xc8, 0xca, 0xfb, 0xac,
	0x96, 0xec, 0xd2, 0x2d, 0x5d, 0x7c, 0xbf, 0x51, 0xf8, 0xb8, 0x98, 0x36, 0x80, 0xa3, 0x8e, 0x75,
	0x5a, 0x6f, 0x17, 0xd3, 0xc6, 0xb2, 0xe0, 0xbb, 0xc5, 0xb4, 0x61, 0xa8, 0x08, 0xe7, 0x2a, 0xc4,
	0x86, 0x57, 0xf3, 0x10, 0x1e, 0x6c, 0xbc, 0x72, 0x30, 0x8b, 0x48, 0xc8, 0xb0, 0xf9, 0x01, 0xc0,
	0x72, 0x8f, 0xf9, 0x27, 0x9e, 0x77, 0x1a, 0xf3, 0x98, 0x62, 0x4d, 0x87, 0xff, 0xb9, 0x14, 0x23,
	0x4e, 0xa8, 0x4c, 0xe5, 0xa4, 0x30, 0x61, 0xd4, 0x97, 0x13, 0xd6, 0x4b, 0x4e, 0x0a, 0xb5, 0x0a,
	0xdc, 0x09, 0xc2, 0x28, 0xe6, 0xfa, 0x56, 0x0d, 0xd4, 0xcb, 0x8e, 0x04, 0x5a, 0x07, 0xfe, 0x9f,
	0x8e, 0x43, 0xdf, 0x16, 0x59, 0x8d, 0xfc, 0xac, 0x0f, 0x95, 0xca, 0xc9, 0xf4, 0x9d, 0x72, 0x12,
	0x32, 0xed, 0x6c, 0xde, 0x81, 0x95, 0x55, 0x8f, 0xa9, 0x79, 0x6d, 0x1f, 0x16, 0x03, 0x4f, 0xd8,
	0xdc, 0x76, 0x8a, 0x81, 0x67, 0x8e, 0xe1, 0x15, 0xa9, 0x7b, 0xa4, 0x8c, 0x1d, 0xfd, 0x32, 0xa4,
	0xd5, 0x51, 0xdc, 0x5f, 0x0f, 0xb4, 0xd7, 0x3e, 0xce, 0xf7, 0xa7, 0xaa, 0x65, 0x79, 0x3b, 0xfb,
	0xeb, 0x23, 0x30, 0xcf, 0xe0, 0xf5, 0xb5, 0xbe, 0x99, 0xc1, 0x95, 0x0e, 0xe0, 0x5f, 0x3a, 0xb4,
	0xbf, 0x00, 0xb8, 0xd5, 0x63, 0xbe, 0xe6, 0xc1, 0xf2, 0xda, 0xd6, 0xdd, 0xce, 0x3f, 0xbf, 0x31,
	0xdd, 0x6a, 0xf3, 0xaf, 0x64, 0x99, 0xcd, 0x67, 0xb0, 0xb4, 0x5c, 0x00, 0xf3, 0xb7, 0x67, 0x33,
	0x4d, 0xb5, 0xf1, 0x67, 0x4d, 0x5a, 0xbc, 0xba, 0xf3, 0x26, 0x59, 0xdf, 0xee, 0x8b, 0x8b, 0x99,
	0x01, 0x2e, 0x67, 0x06, 0xf8, 0x31, 0x33, 0xc0, 0xfb, 0xb9, 0x51, 0xb8, 0x9c, 0x1b, 0x85, 0x6f,
	0x73, 0xa3, 0xf0, 0xf4, 0xd4, 0x0f, 0xf8, 0x20, 0xee, 0x5b, 0x2e, 0x19, 0xd9, 0xb2, 0x6c, 0x53,
	0x5c, 0x3b, 0x97, 0x0c, 0x15, 0xde, 0x80, 0xd9, 0x9e, 0xf3, 0x49, 0x84, 0x59, 0x7a, 0x65, 0xfb,
	0xbb, 0x42, 0x76, 0xf7, 0x67, 0x00, 0x00, 0x00, 0xff, 0xff, 0x67, 0xa4, 0xea, 0xb3, 0xc7, 0x04,
	0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// MsgClient is the client API for Msg service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type MsgClient interface {
	// UpdateParams defines a (governance) operation for updating the module
	// parameters. The authority defaults to the x/gov module account.
	UpdateParams(ctx context.Context, in *MsgUpdateParams, opts ...grpc.CallOption) (*MsgUpdateParamsResponse, error)
	// Create a new Future to be executed.
	AddFuture(ctx context.Context, in *MsgAddFuture, opts ...grpc.CallOption) (*MsgAddFutureResponse, error)
}

type msgClient struct {
	cc grpc1.ClientConn
}

func NewMsgClient(cc grpc1.ClientConn) MsgClient {
	return &msgClient{cc}
}

func (c *msgClient) UpdateParams(ctx context.Context, in *MsgUpdateParams, opts ...grpc.CallOption) (*MsgUpdateParamsResponse, error) {
	out := new(MsgUpdateParamsResponse)
	err := c.cc.Invoke(ctx, "/warden.async.v1beta1.Msg/UpdateParams", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *msgClient) AddFuture(ctx context.Context, in *MsgAddFuture, opts ...grpc.CallOption) (*MsgAddFutureResponse, error) {
	out := new(MsgAddFutureResponse)
	err := c.cc.Invoke(ctx, "/warden.async.v1beta1.Msg/AddFuture", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// MsgServer is the server API for Msg service.
type MsgServer interface {
	// UpdateParams defines a (governance) operation for updating the module
	// parameters. The authority defaults to the x/gov module account.
	UpdateParams(context.Context, *MsgUpdateParams) (*MsgUpdateParamsResponse, error)
	// Create a new Future to be executed.
	AddFuture(context.Context, *MsgAddFuture) (*MsgAddFutureResponse, error)
}

// UnimplementedMsgServer can be embedded to have forward compatible implementations.
type UnimplementedMsgServer struct {
}

func (*UnimplementedMsgServer) UpdateParams(ctx context.Context, req *MsgUpdateParams) (*MsgUpdateParamsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateParams not implemented")
}
func (*UnimplementedMsgServer) AddFuture(ctx context.Context, req *MsgAddFuture) (*MsgAddFutureResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AddFuture not implemented")
}

func RegisterMsgServer(s grpc1.Server, srv MsgServer) {
	s.RegisterService(&_Msg_serviceDesc, srv)
}

func _Msg_UpdateParams_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MsgUpdateParams)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgServer).UpdateParams(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/warden.async.v1beta1.Msg/UpdateParams",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgServer).UpdateParams(ctx, req.(*MsgUpdateParams))
	}
	return interceptor(ctx, in, info, handler)
}

func _Msg_AddFuture_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MsgAddFuture)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgServer).AddFuture(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/warden.async.v1beta1.Msg/AddFuture",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgServer).AddFuture(ctx, req.(*MsgAddFuture))
	}
	return interceptor(ctx, in, info, handler)
}

var Msg_serviceDesc = _Msg_serviceDesc
var _Msg_serviceDesc = grpc.ServiceDesc{
	ServiceName: "warden.async.v1beta1.Msg",
	HandlerType: (*MsgServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "UpdateParams",
			Handler:    _Msg_UpdateParams_Handler,
		},
		{
			MethodName: "AddFuture",
			Handler:    _Msg_AddFuture_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "warden/async/v1beta1/tx.proto",
}

func (m *MsgUpdateParams) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgUpdateParams) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgUpdateParams) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	{
		size, err := m.Params.MarshalToSizedBuffer(dAtA[:i])
		if err != nil {
			return 0, err
		}
		i -= size
		i = encodeVarintTx(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0x12
	if len(m.Authority) > 0 {
		i -= len(m.Authority)
		copy(dAtA[i:], m.Authority)
		i = encodeVarintTx(dAtA, i, uint64(len(m.Authority)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *MsgUpdateParamsResponse) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgUpdateParamsResponse) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgUpdateParamsResponse) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	return len(dAtA) - i, nil
}

func (m *MsgAddFuture) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgAddFuture) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgAddFuture) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.Callback != nil {
		{
			size, err := m.Callback.MarshalToSizedBuffer(dAtA[:i])
			if err != nil {
				return 0, err
			}
			i -= size
			i = encodeVarintTx(dAtA, i, uint64(size))
		}
		i--
		dAtA[i] = 0x22
	}
	if len(m.Input) > 0 {
		i -= len(m.Input)
		copy(dAtA[i:], m.Input)
		i = encodeVarintTx(dAtA, i, uint64(len(m.Input)))
		i--
		dAtA[i] = 0x1a
	}
	if len(m.Handler) > 0 {
		i -= len(m.Handler)
		copy(dAtA[i:], m.Handler)
		i = encodeVarintTx(dAtA, i, uint64(len(m.Handler)))
		i--
		dAtA[i] = 0x12
	}
	if len(m.Creator) > 0 {
		i -= len(m.Creator)
		copy(dAtA[i:], m.Creator)
		i = encodeVarintTx(dAtA, i, uint64(len(m.Creator)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *MsgAddFutureResponse) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgAddFutureResponse) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgAddFutureResponse) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.Id != 0 {
		i = encodeVarintTx(dAtA, i, uint64(m.Id))
		i--
		dAtA[i] = 0x8
	}
	return len(dAtA) - i, nil
}

func (m *MsgAddHandler) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgAddHandler) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgAddHandler) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.Handler != nil {
		{
			size, err := m.Handler.MarshalToSizedBuffer(dAtA[:i])
			if err != nil {
				return 0, err
			}
			i -= size
			i = encodeVarintTx(dAtA, i, uint64(size))
		}
		i--
		dAtA[i] = 0x12
	}
	if len(m.Authority) > 0 {
		i -= len(m.Authority)
		copy(dAtA[i:], m.Authority)
		i = encodeVarintTx(dAtA, i, uint64(len(m.Authority)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *MsgAddHandlerResponse) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgAddHandlerResponse) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgAddHandlerResponse) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.Handler != nil {
		{
			size, err := m.Handler.MarshalToSizedBuffer(dAtA[:i])
			if err != nil {
				return 0, err
			}
			i -= size
			i = encodeVarintTx(dAtA, i, uint64(size))
		}
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func encodeVarintTx(dAtA []byte, offset int, v uint64) int {
	offset -= sovTx(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *MsgUpdateParams) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Authority)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	l = m.Params.Size()
	n += 1 + l + sovTx(uint64(l))
	return n
}

func (m *MsgUpdateParamsResponse) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	return n
}

func (m *MsgAddFuture) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Creator)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	l = len(m.Handler)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	l = len(m.Input)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	if m.Callback != nil {
		l = m.Callback.Size()
		n += 1 + l + sovTx(uint64(l))
	}
	return n
}

func (m *MsgAddFutureResponse) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.Id != 0 {
		n += 1 + sovTx(uint64(m.Id))
	}
	return n
}

func (m *MsgAddHandler) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Authority)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	if m.Handler != nil {
		l = m.Handler.Size()
		n += 1 + l + sovTx(uint64(l))
	}
	return n
}

func (m *MsgAddHandlerResponse) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.Handler != nil {
		l = m.Handler.Size()
		n += 1 + l + sovTx(uint64(l))
	}
	return n
}

func sovTx(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozTx(x uint64) (n int) {
	return sovTx(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *MsgUpdateParams) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
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
			return fmt.Errorf("proto: MsgUpdateParams: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgUpdateParams: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Authority", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
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
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Authority = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Params", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
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
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.Params.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTx
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
func (m *MsgUpdateParamsResponse) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
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
			return fmt.Errorf("proto: MsgUpdateParamsResponse: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgUpdateParamsResponse: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTx
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
func (m *MsgAddFuture) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
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
			return fmt.Errorf("proto: MsgAddFuture: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgAddFuture: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Creator", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
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
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Creator = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Handler", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
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
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Handler = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Input", wireType)
			}
			var byteLen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
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
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + byteLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Input = append(m.Input[:0], dAtA[iNdEx:postIndex]...)
			if m.Input == nil {
				m.Input = []byte{}
			}
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Callback", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
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
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if m.Callback == nil {
				m.Callback = &Callback{}
			}
			if err := m.Callback.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTx
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
func (m *MsgAddFutureResponse) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
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
			return fmt.Errorf("proto: MsgAddFutureResponse: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgAddFutureResponse: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Id", wireType)
			}
			m.Id = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
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
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTx
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
func (m *MsgAddHandler) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
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
			return fmt.Errorf("proto: MsgAddHandler: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgAddHandler: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Authority", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
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
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Authority = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Handler", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
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
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if m.Handler == nil {
				m.Handler = &Handler{}
			}
			if err := m.Handler.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTx
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
func (m *MsgAddHandlerResponse) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
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
			return fmt.Errorf("proto: MsgAddHandlerResponse: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgAddHandlerResponse: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Handler", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
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
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if m.Handler == nil {
				m.Handler = &Handler{}
			}
			if err := m.Handler.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTx
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
func skipTx(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowTx
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
					return 0, ErrIntOverflowTx
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
					return 0, ErrIntOverflowTx
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
				return 0, ErrInvalidLengthTx
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupTx
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthTx
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthTx        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowTx          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupTx = fmt.Errorf("proto: unexpected end of group")
)
