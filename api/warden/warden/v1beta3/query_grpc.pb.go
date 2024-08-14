// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             (unknown)
// source: warden/warden/v1beta3/query.proto

package wardenv1beta3

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	Query_Params_FullMethodName               = "/warden.warden.v1beta3.Query/Params"
	Query_Spaces_FullMethodName               = "/warden.warden.v1beta3.Query/Spaces"
	Query_SpacesByOwner_FullMethodName        = "/warden.warden.v1beta3.Query/SpacesByOwner"
	Query_Keychains_FullMethodName            = "/warden.warden.v1beta3.Query/Keychains"
	Query_SpaceById_FullMethodName            = "/warden.warden.v1beta3.Query/SpaceById"
	Query_KeychainById_FullMethodName         = "/warden.warden.v1beta3.Query/KeychainById"
	Query_KeyRequests_FullMethodName          = "/warden.warden.v1beta3.Query/KeyRequests"
	Query_KeyRequestById_FullMethodName       = "/warden.warden.v1beta3.Query/KeyRequestById"
	Query_AllKeys_FullMethodName              = "/warden.warden.v1beta3.Query/AllKeys"
	Query_KeysBySpaceId_FullMethodName        = "/warden.warden.v1beta3.Query/KeysBySpaceId"
	Query_KeyById_FullMethodName              = "/warden.warden.v1beta3.Query/KeyById"
	Query_SignRequests_FullMethodName         = "/warden.warden.v1beta3.Query/SignRequests"
	Query_SignRequestById_FullMethodName      = "/warden.warden.v1beta3.Query/SignRequestById"
	Query_InferenceRequests_FullMethodName    = "/warden.warden.v1beta3.Query/InferenceRequests"
	Query_InferenceRequestById_FullMethodName = "/warden.warden.v1beta3.Query/InferenceRequestById"
)

// QueryClient is the client API for Query service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type QueryClient interface {
	// Parameters queries the parameters of the module.
	Params(ctx context.Context, in *QueryParamsRequest, opts ...grpc.CallOption) (*QueryParamsResponse, error)
	// Queries a list of Spaces.
	Spaces(ctx context.Context, in *QuerySpacesRequest, opts ...grpc.CallOption) (*QuerySpacesResponse, error)
	// Queries a list of Spaces that have the specified owner.
	SpacesByOwner(ctx context.Context, in *QuerySpacesByOwnerRequest, opts ...grpc.CallOption) (*QuerySpacesResponse, error)
	// Queries a list of Keychains.
	Keychains(ctx context.Context, in *QueryKeychainsRequest, opts ...grpc.CallOption) (*QueryKeychainsResponse, error)
	// Queries a Space by its id.
	SpaceById(ctx context.Context, in *QuerySpaceByIdRequest, opts ...grpc.CallOption) (*QuerySpaceByIdResponse, error)
	// Queries a Keychain by its id.
	KeychainById(ctx context.Context, in *QueryKeychainByIdRequest, opts ...grpc.CallOption) (*QueryKeychainByIdResponse, error)
	// Queries a list of KeyRequests.
	KeyRequests(ctx context.Context, in *QueryKeyRequestsRequest, opts ...grpc.CallOption) (*QueryKeyRequestsResponse, error)
	// Queries a KeyRequest by its id.
	KeyRequestById(ctx context.Context, in *QueryKeyRequestByIdRequest, opts ...grpc.CallOption) (*QueryKeyRequestByIdResponse, error)
	// Queries a list of Keys.
	AllKeys(ctx context.Context, in *QueryAllKeysRequest, opts ...grpc.CallOption) (*QueryKeysResponse, error)
	// Queries a list of Keys by their Space ID.
	KeysBySpaceId(ctx context.Context, in *QueryKeysBySpaceIdRequest, opts ...grpc.CallOption) (*QueryKeysResponse, error)
	// Queries a Key by its ID.
	KeyById(ctx context.Context, in *QueryKeyByIdRequest, opts ...grpc.CallOption) (*QueryKeyResponse, error)
	// Queries a list of SignRequests.
	SignRequests(ctx context.Context, in *QuerySignRequestsRequest, opts ...grpc.CallOption) (*QuerySignRequestsResponse, error)
	// Queries a SignRequest by its id.
	SignRequestById(ctx context.Context, in *QuerySignRequestByIdRequest, opts ...grpc.CallOption) (*QuerySignRequestByIdResponse, error)
	InferenceRequests(ctx context.Context, in *QueryInferenceRequestsRequest, opts ...grpc.CallOption) (*QueryInferenceRequestsResponse, error)
	InferenceRequestById(ctx context.Context, in *QueryInferenceRequestByIdRequest, opts ...grpc.CallOption) (*QueryInferenceRequestByIdResponse, error)
}

type queryClient struct {
	cc grpc.ClientConnInterface
}

func NewQueryClient(cc grpc.ClientConnInterface) QueryClient {
	return &queryClient{cc}
}

func (c *queryClient) Params(ctx context.Context, in *QueryParamsRequest, opts ...grpc.CallOption) (*QueryParamsResponse, error) {
	out := new(QueryParamsResponse)
	err := c.cc.Invoke(ctx, Query_Params_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) Spaces(ctx context.Context, in *QuerySpacesRequest, opts ...grpc.CallOption) (*QuerySpacesResponse, error) {
	out := new(QuerySpacesResponse)
	err := c.cc.Invoke(ctx, Query_Spaces_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) SpacesByOwner(ctx context.Context, in *QuerySpacesByOwnerRequest, opts ...grpc.CallOption) (*QuerySpacesResponse, error) {
	out := new(QuerySpacesResponse)
	err := c.cc.Invoke(ctx, Query_SpacesByOwner_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) Keychains(ctx context.Context, in *QueryKeychainsRequest, opts ...grpc.CallOption) (*QueryKeychainsResponse, error) {
	out := new(QueryKeychainsResponse)
	err := c.cc.Invoke(ctx, Query_Keychains_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) SpaceById(ctx context.Context, in *QuerySpaceByIdRequest, opts ...grpc.CallOption) (*QuerySpaceByIdResponse, error) {
	out := new(QuerySpaceByIdResponse)
	err := c.cc.Invoke(ctx, Query_SpaceById_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) KeychainById(ctx context.Context, in *QueryKeychainByIdRequest, opts ...grpc.CallOption) (*QueryKeychainByIdResponse, error) {
	out := new(QueryKeychainByIdResponse)
	err := c.cc.Invoke(ctx, Query_KeychainById_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) KeyRequests(ctx context.Context, in *QueryKeyRequestsRequest, opts ...grpc.CallOption) (*QueryKeyRequestsResponse, error) {
	out := new(QueryKeyRequestsResponse)
	err := c.cc.Invoke(ctx, Query_KeyRequests_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) KeyRequestById(ctx context.Context, in *QueryKeyRequestByIdRequest, opts ...grpc.CallOption) (*QueryKeyRequestByIdResponse, error) {
	out := new(QueryKeyRequestByIdResponse)
	err := c.cc.Invoke(ctx, Query_KeyRequestById_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) AllKeys(ctx context.Context, in *QueryAllKeysRequest, opts ...grpc.CallOption) (*QueryKeysResponse, error) {
	out := new(QueryKeysResponse)
	err := c.cc.Invoke(ctx, Query_AllKeys_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) KeysBySpaceId(ctx context.Context, in *QueryKeysBySpaceIdRequest, opts ...grpc.CallOption) (*QueryKeysResponse, error) {
	out := new(QueryKeysResponse)
	err := c.cc.Invoke(ctx, Query_KeysBySpaceId_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) KeyById(ctx context.Context, in *QueryKeyByIdRequest, opts ...grpc.CallOption) (*QueryKeyResponse, error) {
	out := new(QueryKeyResponse)
	err := c.cc.Invoke(ctx, Query_KeyById_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) SignRequests(ctx context.Context, in *QuerySignRequestsRequest, opts ...grpc.CallOption) (*QuerySignRequestsResponse, error) {
	out := new(QuerySignRequestsResponse)
	err := c.cc.Invoke(ctx, Query_SignRequests_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) SignRequestById(ctx context.Context, in *QuerySignRequestByIdRequest, opts ...grpc.CallOption) (*QuerySignRequestByIdResponse, error) {
	out := new(QuerySignRequestByIdResponse)
	err := c.cc.Invoke(ctx, Query_SignRequestById_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) InferenceRequests(ctx context.Context, in *QueryInferenceRequestsRequest, opts ...grpc.CallOption) (*QueryInferenceRequestsResponse, error) {
	out := new(QueryInferenceRequestsResponse)
	err := c.cc.Invoke(ctx, Query_InferenceRequests_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryClient) InferenceRequestById(ctx context.Context, in *QueryInferenceRequestByIdRequest, opts ...grpc.CallOption) (*QueryInferenceRequestByIdResponse, error) {
	out := new(QueryInferenceRequestByIdResponse)
	err := c.cc.Invoke(ctx, Query_InferenceRequestById_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// QueryServer is the server API for Query service.
// All implementations must embed UnimplementedQueryServer
// for forward compatibility
type QueryServer interface {
	// Parameters queries the parameters of the module.
	Params(context.Context, *QueryParamsRequest) (*QueryParamsResponse, error)
	// Queries a list of Spaces.
	Spaces(context.Context, *QuerySpacesRequest) (*QuerySpacesResponse, error)
	// Queries a list of Spaces that have the specified owner.
	SpacesByOwner(context.Context, *QuerySpacesByOwnerRequest) (*QuerySpacesResponse, error)
	// Queries a list of Keychains.
	Keychains(context.Context, *QueryKeychainsRequest) (*QueryKeychainsResponse, error)
	// Queries a Space by its id.
	SpaceById(context.Context, *QuerySpaceByIdRequest) (*QuerySpaceByIdResponse, error)
	// Queries a Keychain by its id.
	KeychainById(context.Context, *QueryKeychainByIdRequest) (*QueryKeychainByIdResponse, error)
	// Queries a list of KeyRequests.
	KeyRequests(context.Context, *QueryKeyRequestsRequest) (*QueryKeyRequestsResponse, error)
	// Queries a KeyRequest by its id.
	KeyRequestById(context.Context, *QueryKeyRequestByIdRequest) (*QueryKeyRequestByIdResponse, error)
	// Queries a list of Keys.
	AllKeys(context.Context, *QueryAllKeysRequest) (*QueryKeysResponse, error)
	// Queries a list of Keys by their Space ID.
	KeysBySpaceId(context.Context, *QueryKeysBySpaceIdRequest) (*QueryKeysResponse, error)
	// Queries a Key by its ID.
	KeyById(context.Context, *QueryKeyByIdRequest) (*QueryKeyResponse, error)
	// Queries a list of SignRequests.
	SignRequests(context.Context, *QuerySignRequestsRequest) (*QuerySignRequestsResponse, error)
	// Queries a SignRequest by its id.
	SignRequestById(context.Context, *QuerySignRequestByIdRequest) (*QuerySignRequestByIdResponse, error)
	InferenceRequests(context.Context, *QueryInferenceRequestsRequest) (*QueryInferenceRequestsResponse, error)
	InferenceRequestById(context.Context, *QueryInferenceRequestByIdRequest) (*QueryInferenceRequestByIdResponse, error)
	mustEmbedUnimplementedQueryServer()
}

// UnimplementedQueryServer must be embedded to have forward compatible implementations.
type UnimplementedQueryServer struct {
}

func (UnimplementedQueryServer) Params(context.Context, *QueryParamsRequest) (*QueryParamsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Params not implemented")
}
func (UnimplementedQueryServer) Spaces(context.Context, *QuerySpacesRequest) (*QuerySpacesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Spaces not implemented")
}
func (UnimplementedQueryServer) SpacesByOwner(context.Context, *QuerySpacesByOwnerRequest) (*QuerySpacesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SpacesByOwner not implemented")
}
func (UnimplementedQueryServer) Keychains(context.Context, *QueryKeychainsRequest) (*QueryKeychainsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Keychains not implemented")
}
func (UnimplementedQueryServer) SpaceById(context.Context, *QuerySpaceByIdRequest) (*QuerySpaceByIdResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SpaceById not implemented")
}
func (UnimplementedQueryServer) KeychainById(context.Context, *QueryKeychainByIdRequest) (*QueryKeychainByIdResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method KeychainById not implemented")
}
func (UnimplementedQueryServer) KeyRequests(context.Context, *QueryKeyRequestsRequest) (*QueryKeyRequestsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method KeyRequests not implemented")
}
func (UnimplementedQueryServer) KeyRequestById(context.Context, *QueryKeyRequestByIdRequest) (*QueryKeyRequestByIdResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method KeyRequestById not implemented")
}
func (UnimplementedQueryServer) AllKeys(context.Context, *QueryAllKeysRequest) (*QueryKeysResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AllKeys not implemented")
}
func (UnimplementedQueryServer) KeysBySpaceId(context.Context, *QueryKeysBySpaceIdRequest) (*QueryKeysResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method KeysBySpaceId not implemented")
}
func (UnimplementedQueryServer) KeyById(context.Context, *QueryKeyByIdRequest) (*QueryKeyResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method KeyById not implemented")
}
func (UnimplementedQueryServer) SignRequests(context.Context, *QuerySignRequestsRequest) (*QuerySignRequestsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SignRequests not implemented")
}
func (UnimplementedQueryServer) SignRequestById(context.Context, *QuerySignRequestByIdRequest) (*QuerySignRequestByIdResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SignRequestById not implemented")
}
func (UnimplementedQueryServer) InferenceRequests(context.Context, *QueryInferenceRequestsRequest) (*QueryInferenceRequestsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method InferenceRequests not implemented")
}
func (UnimplementedQueryServer) InferenceRequestById(context.Context, *QueryInferenceRequestByIdRequest) (*QueryInferenceRequestByIdResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method InferenceRequestById not implemented")
}
func (UnimplementedQueryServer) mustEmbedUnimplementedQueryServer() {}

// UnsafeQueryServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to QueryServer will
// result in compilation errors.
type UnsafeQueryServer interface {
	mustEmbedUnimplementedQueryServer()
}

func RegisterQueryServer(s grpc.ServiceRegistrar, srv QueryServer) {
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

func _Query_Spaces_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QuerySpacesRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).Spaces(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Query_Spaces_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).Spaces(ctx, req.(*QuerySpacesRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_SpacesByOwner_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QuerySpacesByOwnerRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).SpacesByOwner(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Query_SpacesByOwner_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).SpacesByOwner(ctx, req.(*QuerySpacesByOwnerRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_Keychains_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryKeychainsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).Keychains(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Query_Keychains_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).Keychains(ctx, req.(*QueryKeychainsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_SpaceById_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QuerySpaceByIdRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).SpaceById(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Query_SpaceById_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).SpaceById(ctx, req.(*QuerySpaceByIdRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_KeychainById_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryKeychainByIdRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).KeychainById(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Query_KeychainById_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).KeychainById(ctx, req.(*QueryKeychainByIdRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_KeyRequests_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryKeyRequestsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).KeyRequests(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Query_KeyRequests_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).KeyRequests(ctx, req.(*QueryKeyRequestsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_KeyRequestById_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryKeyRequestByIdRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).KeyRequestById(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Query_KeyRequestById_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).KeyRequestById(ctx, req.(*QueryKeyRequestByIdRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_AllKeys_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryAllKeysRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).AllKeys(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Query_AllKeys_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).AllKeys(ctx, req.(*QueryAllKeysRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_KeysBySpaceId_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryKeysBySpaceIdRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).KeysBySpaceId(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Query_KeysBySpaceId_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).KeysBySpaceId(ctx, req.(*QueryKeysBySpaceIdRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_KeyById_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryKeyByIdRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).KeyById(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Query_KeyById_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).KeyById(ctx, req.(*QueryKeyByIdRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_SignRequests_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QuerySignRequestsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).SignRequests(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Query_SignRequests_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).SignRequests(ctx, req.(*QuerySignRequestsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_SignRequestById_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QuerySignRequestByIdRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).SignRequestById(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Query_SignRequestById_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).SignRequestById(ctx, req.(*QuerySignRequestByIdRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_InferenceRequests_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryInferenceRequestsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).InferenceRequests(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Query_InferenceRequests_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).InferenceRequests(ctx, req.(*QueryInferenceRequestsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_InferenceRequestById_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QueryInferenceRequestByIdRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryServer).InferenceRequestById(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Query_InferenceRequestById_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryServer).InferenceRequestById(ctx, req.(*QueryInferenceRequestByIdRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Query_ServiceDesc is the grpc.ServiceDesc for Query service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Query_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "warden.warden.v1beta3.Query",
	HandlerType: (*QueryServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Params",
			Handler:    _Query_Params_Handler,
		},
		{
			MethodName: "Spaces",
			Handler:    _Query_Spaces_Handler,
		},
		{
			MethodName: "SpacesByOwner",
			Handler:    _Query_SpacesByOwner_Handler,
		},
		{
			MethodName: "Keychains",
			Handler:    _Query_Keychains_Handler,
		},
		{
			MethodName: "SpaceById",
			Handler:    _Query_SpaceById_Handler,
		},
		{
			MethodName: "KeychainById",
			Handler:    _Query_KeychainById_Handler,
		},
		{
			MethodName: "KeyRequests",
			Handler:    _Query_KeyRequests_Handler,
		},
		{
			MethodName: "KeyRequestById",
			Handler:    _Query_KeyRequestById_Handler,
		},
		{
			MethodName: "AllKeys",
			Handler:    _Query_AllKeys_Handler,
		},
		{
			MethodName: "KeysBySpaceId",
			Handler:    _Query_KeysBySpaceId_Handler,
		},
		{
			MethodName: "KeyById",
			Handler:    _Query_KeyById_Handler,
		},
		{
			MethodName: "SignRequests",
			Handler:    _Query_SignRequests_Handler,
		},
		{
			MethodName: "SignRequestById",
			Handler:    _Query_SignRequestById_Handler,
		},
		{
			MethodName: "InferenceRequests",
			Handler:    _Query_InferenceRequests_Handler,
		},
		{
			MethodName: "InferenceRequestById",
			Handler:    _Query_InferenceRequestById_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "warden/warden/v1beta3/query.proto",
}
