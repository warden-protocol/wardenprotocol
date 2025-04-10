// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.5.1
// - protoc             (unknown)
// source: warden/act/v1beta1/tx.proto

package actv1beta1

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.64.0 or later.
const _ = grpc.SupportPackageIsVersion9

const (
	Msg_UpdateParams_FullMethodName   = "/warden.act.v1beta1.Msg/UpdateParams"
	Msg_NewAction_FullMethodName      = "/warden.act.v1beta1.Msg/NewAction"
	Msg_CheckAction_FullMethodName    = "/warden.act.v1beta1.Msg/CheckAction"
	Msg_NewTemplate_FullMethodName    = "/warden.act.v1beta1.Msg/NewTemplate"
	Msg_UpdateTemplate_FullMethodName = "/warden.act.v1beta1.Msg/UpdateTemplate"
	Msg_RevokeAction_FullMethodName   = "/warden.act.v1beta1.Msg/RevokeAction"
	Msg_VoteForAction_FullMethodName  = "/warden.act.v1beta1.Msg/VoteForAction"
)

// MsgClient is the client API for Msg service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
//
// Msg defines the Msg service.
type MsgClient interface {
	// UpdateParams defines a (governance) operation for updating the module
	// parameters. The authority defaults to the x/gov module account.
	UpdateParams(ctx context.Context, in *MsgUpdateParams, opts ...grpc.CallOption) (*MsgUpdateParamsResponse, error)
	// NewAction creates a new Action.
	NewAction(ctx context.Context, in *MsgNewAction, opts ...grpc.CallOption) (*MsgNewActionResponse, error)
	// Checks a pending action and executes it if its in a valid state.
	CheckAction(ctx context.Context, in *MsgCheckAction, opts ...grpc.CallOption) (*MsgCheckActionResponse, error)
	// Create a new Template.
	NewTemplate(ctx context.Context, in *MsgNewTemplate, opts ...grpc.CallOption) (*MsgNewTemplateResponse, error)
	// Update an existing act name and definition.
	UpdateTemplate(ctx context.Context, in *MsgUpdateTemplate, opts ...grpc.CallOption) (*MsgUpdateTemplateResponse, error)
	// Revoke an existing Action while in pending state.
	RevokeAction(ctx context.Context, in *MsgRevokeAction, opts ...grpc.CallOption) (*MsgRevokeActionResponse, error)
	// Vote for or against a particular Action.
	VoteForAction(ctx context.Context, in *MsgVoteForAction, opts ...grpc.CallOption) (*MsgVoteForActionResponse, error)
}

type msgClient struct {
	cc grpc.ClientConnInterface
}

func NewMsgClient(cc grpc.ClientConnInterface) MsgClient {
	return &msgClient{cc}
}

func (c *msgClient) UpdateParams(ctx context.Context, in *MsgUpdateParams, opts ...grpc.CallOption) (*MsgUpdateParamsResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(MsgUpdateParamsResponse)
	err := c.cc.Invoke(ctx, Msg_UpdateParams_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *msgClient) NewAction(ctx context.Context, in *MsgNewAction, opts ...grpc.CallOption) (*MsgNewActionResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(MsgNewActionResponse)
	err := c.cc.Invoke(ctx, Msg_NewAction_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *msgClient) CheckAction(ctx context.Context, in *MsgCheckAction, opts ...grpc.CallOption) (*MsgCheckActionResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(MsgCheckActionResponse)
	err := c.cc.Invoke(ctx, Msg_CheckAction_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *msgClient) NewTemplate(ctx context.Context, in *MsgNewTemplate, opts ...grpc.CallOption) (*MsgNewTemplateResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(MsgNewTemplateResponse)
	err := c.cc.Invoke(ctx, Msg_NewTemplate_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *msgClient) UpdateTemplate(ctx context.Context, in *MsgUpdateTemplate, opts ...grpc.CallOption) (*MsgUpdateTemplateResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(MsgUpdateTemplateResponse)
	err := c.cc.Invoke(ctx, Msg_UpdateTemplate_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *msgClient) RevokeAction(ctx context.Context, in *MsgRevokeAction, opts ...grpc.CallOption) (*MsgRevokeActionResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(MsgRevokeActionResponse)
	err := c.cc.Invoke(ctx, Msg_RevokeAction_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *msgClient) VoteForAction(ctx context.Context, in *MsgVoteForAction, opts ...grpc.CallOption) (*MsgVoteForActionResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(MsgVoteForActionResponse)
	err := c.cc.Invoke(ctx, Msg_VoteForAction_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// MsgServer is the server API for Msg service.
// All implementations must embed UnimplementedMsgServer
// for forward compatibility.
//
// Msg defines the Msg service.
type MsgServer interface {
	// UpdateParams defines a (governance) operation for updating the module
	// parameters. The authority defaults to the x/gov module account.
	UpdateParams(context.Context, *MsgUpdateParams) (*MsgUpdateParamsResponse, error)
	// NewAction creates a new Action.
	NewAction(context.Context, *MsgNewAction) (*MsgNewActionResponse, error)
	// Checks a pending action and executes it if its in a valid state.
	CheckAction(context.Context, *MsgCheckAction) (*MsgCheckActionResponse, error)
	// Create a new Template.
	NewTemplate(context.Context, *MsgNewTemplate) (*MsgNewTemplateResponse, error)
	// Update an existing act name and definition.
	UpdateTemplate(context.Context, *MsgUpdateTemplate) (*MsgUpdateTemplateResponse, error)
	// Revoke an existing Action while in pending state.
	RevokeAction(context.Context, *MsgRevokeAction) (*MsgRevokeActionResponse, error)
	// Vote for or against a particular Action.
	VoteForAction(context.Context, *MsgVoteForAction) (*MsgVoteForActionResponse, error)
	mustEmbedUnimplementedMsgServer()
}

// UnimplementedMsgServer must be embedded to have
// forward compatible implementations.
//
// NOTE: this should be embedded by value instead of pointer to avoid a nil
// pointer dereference when methods are called.
type UnimplementedMsgServer struct{}

func (UnimplementedMsgServer) UpdateParams(context.Context, *MsgUpdateParams) (*MsgUpdateParamsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateParams not implemented")
}
func (UnimplementedMsgServer) NewAction(context.Context, *MsgNewAction) (*MsgNewActionResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method NewAction not implemented")
}
func (UnimplementedMsgServer) CheckAction(context.Context, *MsgCheckAction) (*MsgCheckActionResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CheckAction not implemented")
}
func (UnimplementedMsgServer) NewTemplate(context.Context, *MsgNewTemplate) (*MsgNewTemplateResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method NewTemplate not implemented")
}
func (UnimplementedMsgServer) UpdateTemplate(context.Context, *MsgUpdateTemplate) (*MsgUpdateTemplateResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateTemplate not implemented")
}
func (UnimplementedMsgServer) RevokeAction(context.Context, *MsgRevokeAction) (*MsgRevokeActionResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method RevokeAction not implemented")
}
func (UnimplementedMsgServer) VoteForAction(context.Context, *MsgVoteForAction) (*MsgVoteForActionResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method VoteForAction not implemented")
}
func (UnimplementedMsgServer) mustEmbedUnimplementedMsgServer() {}
func (UnimplementedMsgServer) testEmbeddedByValue()             {}

// UnsafeMsgServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to MsgServer will
// result in compilation errors.
type UnsafeMsgServer interface {
	mustEmbedUnimplementedMsgServer()
}

func RegisterMsgServer(s grpc.ServiceRegistrar, srv MsgServer) {
	// If the following call pancis, it indicates UnimplementedMsgServer was
	// embedded by pointer and is nil.  This will cause panics if an
	// unimplemented method is ever invoked, so we test this at initialization
	// time to prevent it from happening at runtime later due to I/O.
	if t, ok := srv.(interface{ testEmbeddedByValue() }); ok {
		t.testEmbeddedByValue()
	}
	s.RegisterService(&Msg_ServiceDesc, srv)
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
		FullMethod: Msg_UpdateParams_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgServer).UpdateParams(ctx, req.(*MsgUpdateParams))
	}
	return interceptor(ctx, in, info, handler)
}

func _Msg_NewAction_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MsgNewAction)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgServer).NewAction(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Msg_NewAction_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgServer).NewAction(ctx, req.(*MsgNewAction))
	}
	return interceptor(ctx, in, info, handler)
}

func _Msg_CheckAction_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MsgCheckAction)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgServer).CheckAction(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Msg_CheckAction_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgServer).CheckAction(ctx, req.(*MsgCheckAction))
	}
	return interceptor(ctx, in, info, handler)
}

func _Msg_NewTemplate_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MsgNewTemplate)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgServer).NewTemplate(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Msg_NewTemplate_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgServer).NewTemplate(ctx, req.(*MsgNewTemplate))
	}
	return interceptor(ctx, in, info, handler)
}

func _Msg_UpdateTemplate_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MsgUpdateTemplate)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgServer).UpdateTemplate(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Msg_UpdateTemplate_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgServer).UpdateTemplate(ctx, req.(*MsgUpdateTemplate))
	}
	return interceptor(ctx, in, info, handler)
}

func _Msg_RevokeAction_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MsgRevokeAction)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgServer).RevokeAction(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Msg_RevokeAction_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgServer).RevokeAction(ctx, req.(*MsgRevokeAction))
	}
	return interceptor(ctx, in, info, handler)
}

func _Msg_VoteForAction_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MsgVoteForAction)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgServer).VoteForAction(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Msg_VoteForAction_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgServer).VoteForAction(ctx, req.(*MsgVoteForAction))
	}
	return interceptor(ctx, in, info, handler)
}

// Msg_ServiceDesc is the grpc.ServiceDesc for Msg service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Msg_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "warden.act.v1beta1.Msg",
	HandlerType: (*MsgServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "UpdateParams",
			Handler:    _Msg_UpdateParams_Handler,
		},
		{
			MethodName: "NewAction",
			Handler:    _Msg_NewAction_Handler,
		},
		{
			MethodName: "CheckAction",
			Handler:    _Msg_CheckAction_Handler,
		},
		{
			MethodName: "NewTemplate",
			Handler:    _Msg_NewTemplate_Handler,
		},
		{
			MethodName: "UpdateTemplate",
			Handler:    _Msg_UpdateTemplate_Handler,
		},
		{
			MethodName: "RevokeAction",
			Handler:    _Msg_RevokeAction_Handler,
		},
		{
			MethodName: "VoteForAction",
			Handler:    _Msg_VoteForAction_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "warden/act/v1beta1/tx.proto",
}
