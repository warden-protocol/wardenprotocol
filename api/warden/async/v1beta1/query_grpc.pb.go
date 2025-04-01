// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.5.1
// - protoc             (unknown)
// source: warden/async/v1beta1/query.proto

package asyncv1beta1

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
	Query_Params_FullMethodName              = "/warden.async.v1beta1.Query/Params"
	Query_Futures_FullMethodName             = "/warden.async.v1beta1.Query/Futures"
	Query_FutureById_FullMethodName          = "/warden.async.v1beta1.Query/FutureById"
	Query_PendingFutures_FullMethodName      = "/warden.async.v1beta1.Query/PendingFutures"
	Query_HandlersByValidator_FullMethodName = "/warden.async.v1beta1.Query/HandlersByValidator"
)

// QueryClient is the client API for Query service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
//
// Query defines the gRPC querier service.
type QueryClient interface {
	// Parameters queries the parameters of the module.
	Params(ctx context.Context, in *QueryParamsRequest, opts ...grpc.CallOption) (*QueryParamsResponse, error)
	// Queries a list of Futures.
	Futures(ctx context.Context, in *QueryFuturesRequest, opts ...grpc.CallOption) (*QueryFuturesResponse, error)
	// Queries a Future by its id.
	FutureById(ctx context.Context, in *QueryFutureByIdRequest, opts ...grpc.CallOption) (*QueryFutureByIdResponse, error)
	// Queries Futures that do not have a result yet.
	PendingFutures(ctx context.Context, in *QueryPendingFuturesRequest, opts ...grpc.CallOption) (*QueryPendingFuturesResponse, error)
	// Queries Handlers by validator.
	HandlersByValidator(ctx context.Context, in *QueryHandlersByValidatorRequest, opts ...grpc.CallOption) (*QueryHandlersByValidatorResponse, error)
}

type queryClient struct {
	cc grpc.ClientConnInterface
}

func NewQueryClient(cc grpc.ClientConnInterface) QueryClient {
	return &queryClient{cc}
}

func (c *queryClient) Params(ctx context.Context, in *QueryParamsRequest, opts ...grpc.CallOption) (*QueryParamsResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(QueryParamsResponse)
	err := c.cc.Invoke(ctx, Query_Params_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) Futures(ctx context.Context, in *QueryFuturesRequest, opts ...grpc.CallOption) (*QueryFuturesResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(QueryFuturesResponse)
	err := c.cc.Invoke(ctx, Query_Futures_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) FutureById(ctx context.Context, in *QueryFutureByIdRequest, opts ...grpc.CallOption) (*QueryFutureByIdResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(QueryFutureByIdResponse)
	err := c.cc.Invoke(ctx, Query_FutureById_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) PendingFutures(ctx context.Context, in *QueryPendingFuturesRequest, opts ...grpc.CallOption) (*QueryPendingFuturesResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(QueryPendingFuturesResponse)
	err := c.cc.Invoke(ctx, Query_PendingFutures_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) HandlersByValidator(ctx context.Context, in *QueryHandlersByValidatorRequest, opts ...grpc.CallOption) (*QueryHandlersByValidatorResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(QueryHandlersByValidatorResponse)
	err := c.cc.Invoke(ctx, Query_HandlersByValidator_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// QueryServer is the server API for Query service.
// All implementations must embed UnimplementedQueryServer
// for forward compatibility.
//
// Query defines the gRPC querier service.
type QueryServer interface {
	// Parameters queries the parameters of the module.
	Params(context.Context, *QueryParamsRequest) (*QueryParamsResponse, error)
	// Queries a list of Futures.
	Futures(context.Context, *QueryFuturesRequest) (*QueryFuturesResponse, error)
	// Queries a Future by its id.
	FutureById(context.Context, *QueryFutureByIdRequest) (*QueryFutureByIdResponse, error)
	// Queries Futures that do not have a result yet.
	PendingFutures(context.Context, *QueryPendingFuturesRequest) (*QueryPendingFuturesResponse, error)
	// Queries Handlers by validator.
	HandlersByValidator(context.Context, *QueryHandlersByValidatorRequest) (*QueryHandlersByValidatorResponse, error)
	mustEmbedUnimplementedQueryServer()
}

// UnimplementedQueryServer must be embedded to have
// forward compatible implementations.
//
// NOTE: this should be embedded by value instead of pointer to avoid a nil
// pointer dereference when methods are called.
type UnimplementedQueryServer struct{}

func (UnimplementedQueryServer) Params(context.Context, *QueryParamsRequest) (*QueryParamsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Params not implemented")
}
func (UnimplementedQueryServer) Futures(context.Context, *QueryFuturesRequest) (*QueryFuturesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Futures not implemented")
}
func (UnimplementedQueryServer) FutureById(context.Context, *QueryFutureByIdRequest) (*QueryFutureByIdResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method FutureById not implemented")
}
func (UnimplementedQueryServer) PendingFutures(context.Context, *QueryPendingFuturesRequest) (*QueryPendingFuturesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PendingFutures not implemented")
}
func (UnimplementedQueryServer) HandlersByValidator(context.Context, *QueryHandlersByValidatorRequest) (*QueryHandlersByValidatorResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method HandlersByValidator not implemented")
}
func (UnimplementedQueryServer) mustEmbedUnimplementedQueryServer() {}
func (UnimplementedQueryServer) testEmbeddedByValue()               {}

// UnsafeQueryServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to QueryServer will
// result in compilation errors.
type UnsafeQueryServer interface {
	mustEmbedUnimplementedQueryServer()
}

func RegisterQueryServer(s grpc.ServiceRegistrar, srv QueryServer) {
	// If the following call pancis, it indicates UnimplementedQueryServer was
	// embedded by pointer and is nil.  This will cause panics if an
	// unimplemented method is ever invoked, so we test this at initialization
	// time to prevent it from happening at runtime later due to I/O.
	if t, ok := srv.(interface{ testEmbeddedByValue() }); ok {
		t.testEmbeddedByValue()
	}
	s.RegisterService(&Query_ServiceDesc, srv)
}

func _Query_Params_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryParamsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).Params(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Query_Params_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).Params(ctx, req.(*QueryParamsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_Futures_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryFuturesRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).Futures(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Query_Futures_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).Futures(ctx, req.(*QueryFuturesRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_FutureById_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryFutureByIdRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).FutureById(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Query_FutureById_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).FutureById(ctx, req.(*QueryFutureByIdRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_PendingFutures_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryPendingFuturesRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).PendingFutures(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Query_PendingFutures_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).PendingFutures(ctx, req.(*QueryPendingFuturesRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_HandlersByValidator_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryHandlersByValidatorRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).HandlersByValidator(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Query_HandlersByValidator_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).HandlersByValidator(ctx, req.(*QueryHandlersByValidatorRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Query_ServiceDesc is the grpc.ServiceDesc for Query service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Query_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "warden.async.v1beta1.Query",
	HandlerType: (*QueryServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Params",
			Handler:    _Query_Params_Handler,
		},
		{
			MethodName: "Futures",
			Handler:    _Query_Futures_Handler,
		},
		{
			MethodName: "FutureById",
			Handler:    _Query_FutureById_Handler,
		},
		{
			MethodName: "PendingFutures",
			Handler:    _Query_PendingFutures_Handler,
		},
		{
			MethodName: "HandlersByValidator",
			Handler:    _Query_HandlersByValidator_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "warden/async/v1beta1/query.proto",
}
