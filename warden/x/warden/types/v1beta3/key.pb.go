// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: warden/warden/v1beta3/key.proto

package v1beta3

import (
	fmt "fmt"
	github_com_cosmos_cosmos_sdk_types "github.com/cosmos/cosmos-sdk/types"
	types "github.com/cosmos/cosmos-sdk/types"
	_ "github.com/cosmos/cosmos-sdk/types/tx/amino"
	_ "github.com/cosmos/gogoproto/gogoproto"
	proto "github.com/cosmos/gogoproto/proto"
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

// KeyRequestStatus indicates the status of a key request.
//
// The possible state transitions are:
//   - PENDING -> FULFILLED
//   - PENDING -> REJECTED
type KeyRequestStatus int32

const (
	// The request is missing the status field.
	KeyRequestStatus_KEY_REQUEST_STATUS_UNSPECIFIED KeyRequestStatus = 0
	// The request is waiting to be fulfilled. This is the initial state of a
	// request.
	KeyRequestStatus_KEY_REQUEST_STATUS_PENDING KeyRequestStatus = 1
	// The request was fulfilled. This is a final state for a request.
	KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED KeyRequestStatus = 2
	// The request was rejected. This is a final state for a request.
	KeyRequestStatus_KEY_REQUEST_STATUS_REJECTED KeyRequestStatus = 3
)

var KeyRequestStatus_name = map[int32]string{
	0: "KEY_REQUEST_STATUS_UNSPECIFIED",
	1: "KEY_REQUEST_STATUS_PENDING",
	2: "KEY_REQUEST_STATUS_FULFILLED",
	3: "KEY_REQUEST_STATUS_REJECTED",
}

var KeyRequestStatus_value = map[string]int32{
	"KEY_REQUEST_STATUS_UNSPECIFIED": 0,
	"KEY_REQUEST_STATUS_PENDING":     1,
	"KEY_REQUEST_STATUS_FULFILLED":   2,
	"KEY_REQUEST_STATUS_REJECTED":    3,
}

func (x KeyRequestStatus) String() string {
	return proto.EnumName(KeyRequestStatus_name, int32(x))
}

func (KeyRequestStatus) EnumDescriptor() ([]byte, []int) {
	return fileDescriptor_ea87ed804a1dfb88, []int{0}
}

// Scheme is signing crypto scheme of a Key.
type KeyType int32

const (
	// The key type is missing.
	KeyType_KEY_TYPE_UNSPECIFIED KeyType = 0
	// The key is an ECDSA secp256k1 key.
	KeyType_KEY_TYPE_ECDSA_SECP256K1 KeyType = 1
	// The key is an EdDSA Ed25519 key.
	KeyType_KEY_TYPE_EDDSA_ED25519 KeyType = 2
)

var KeyType_name = map[int32]string{
	0: "KEY_TYPE_UNSPECIFIED",
	1: "KEY_TYPE_ECDSA_SECP256K1",
	2: "KEY_TYPE_EDDSA_ED25519",
}

var KeyType_value = map[string]int32{
	"KEY_TYPE_UNSPECIFIED":     0,
	"KEY_TYPE_ECDSA_SECP256K1": 1,
	"KEY_TYPE_EDDSA_ED25519":   2,
}

func (x KeyType) String() string {
	return proto.EnumName(KeyType_name, int32(x))
}

func (KeyType) EnumDescriptor() ([]byte, []int) {
	return fileDescriptor_ea87ed804a1dfb88, []int{1}
}

type AddressType int32

const (
	// The address type is missing.
	AddressType_ADDRESS_TYPE_UNSPECIFIED AddressType = 0
	// Ethereum address type (e.g. 0x71C7656EC7ab88b098defB751B7401B5f6d8976F).
	AddressType_ADDRESS_TYPE_ETHEREUM AddressType = 1
	// Osmosis address type (e.g. osmo10kmgv5gzygnecf46x092ecfe5xcvvv9rlt823n).
	AddressType_ADDRESS_TYPE_OSMOSIS AddressType = 2
)

var AddressType_name = map[int32]string{
	0: "ADDRESS_TYPE_UNSPECIFIED",
	1: "ADDRESS_TYPE_ETHEREUM",
	2: "ADDRESS_TYPE_OSMOSIS",
}

var AddressType_value = map[string]int32{
	"ADDRESS_TYPE_UNSPECIFIED": 0,
	"ADDRESS_TYPE_ETHEREUM":    1,
	"ADDRESS_TYPE_OSMOSIS":     2,
}

func (x AddressType) String() string {
	return proto.EnumName(AddressType_name, int32(x))
}

func (AddressType) EnumDescriptor() ([]byte, []int) {
	return fileDescriptor_ea87ed804a1dfb88, []int{2}
}

// KeyRequest is the request from a user (creator) to a Keychain to create a
// new Key that will belong to a Space.
//
// The request can be:
//   - fulfilled by the Keychain, in which case a Key will be created;
//   - rejected, in which case the request reject_reason field will be set.
type KeyRequest struct {
	// Unique id for the request.
	// If the request is fulfilled, the new Key will be created with this id.
	Id uint64 `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	// Address of the creator of the request.
	Creator string `protobuf:"bytes,2,opt,name=creator,proto3" json:"creator,omitempty"`
	// Space ID of the Space that the Key will belong to.
	SpaceId uint64 `protobuf:"varint,3,opt,name=space_id,json=spaceId,proto3" json:"space_id,omitempty"`
	// Keychain ID of the Keychain that will create the Key.
	KeychainId uint64 `protobuf:"varint,4,opt,name=keychain_id,json=keychainId,proto3" json:"keychain_id,omitempty"`
	// Crypto scheme of the Key.
	KeyType KeyType `protobuf:"varint,5,opt,name=key_type,json=keyType,proto3,enum=warden.warden.v1beta3.KeyType" json:"key_type,omitempty"`
	// Status of the request.
	Status KeyRequestStatus `protobuf:"varint,6,opt,name=status,proto3,enum=warden.warden.v1beta3.KeyRequestStatus" json:"status,omitempty"`
	// If the request is rejected, this field will contain the reason.
	RejectReason string `protobuf:"bytes,7,opt,name=reject_reason,json=rejectReason,proto3" json:"reject_reason,omitempty"`
	// ID of the Rule that the resulting Key will use.
	RuleId uint64 `protobuf:"varint,8,opt,name=rule_id,json=ruleId,proto3" json:"rule_id,omitempty"`
	// Amount of fees deducted during new key request
	DeductedKeychainFees github_com_cosmos_cosmos_sdk_types.Coins `protobuf:"bytes,9,rep,name=deducted_keychain_fees,json=deductedKeychainFees,proto3,castrepeated=github.com/cosmos/cosmos-sdk/types.Coins" json:"deducted_keychain_fees"`
}

func (m *KeyRequest) Reset()         { *m = KeyRequest{} }
func (m *KeyRequest) String() string { return proto.CompactTextString(m) }
func (*KeyRequest) ProtoMessage()    {}
func (*KeyRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_ea87ed804a1dfb88, []int{0}
}
func (m *KeyRequest) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *KeyRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_KeyRequest.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *KeyRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_KeyRequest.Merge(m, src)
}
func (m *KeyRequest) XXX_Size() int {
	return m.Size()
}
func (m *KeyRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_KeyRequest.DiscardUnknown(m)
}

var xxx_messageInfo_KeyRequest proto.InternalMessageInfo

func (m *KeyRequest) GetId() uint64 {
	if m != nil {
		return m.Id
	}
	return 0
}

func (m *KeyRequest) GetCreator() string {
	if m != nil {
		return m.Creator
	}
	return ""
}

func (m *KeyRequest) GetSpaceId() uint64 {
	if m != nil {
		return m.SpaceId
	}
	return 0
}

func (m *KeyRequest) GetKeychainId() uint64 {
	if m != nil {
		return m.KeychainId
	}
	return 0
}

func (m *KeyRequest) GetKeyType() KeyType {
	if m != nil {
		return m.KeyType
	}
	return KeyType_KEY_TYPE_UNSPECIFIED
}

func (m *KeyRequest) GetStatus() KeyRequestStatus {
	if m != nil {
		return m.Status
	}
	return KeyRequestStatus_KEY_REQUEST_STATUS_UNSPECIFIED
}

func (m *KeyRequest) GetRejectReason() string {
	if m != nil {
		return m.RejectReason
	}
	return ""
}

func (m *KeyRequest) GetRuleId() uint64 {
	if m != nil {
		return m.RuleId
	}
	return 0
}

func (m *KeyRequest) GetDeductedKeychainFees() github_com_cosmos_cosmos_sdk_types.Coins {
	if m != nil {
		return m.DeductedKeychainFees
	}
	return nil
}

// Key is a public key that can be used to sign data.
type Key struct {
	// ID of the key.
	Id uint64 `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	// ID of the space that the key belongs to.
	SpaceId uint64 `protobuf:"varint,2,opt,name=space_id,json=spaceId,proto3" json:"space_id,omitempty"`
	// ID of the keychain that created the key.
	KeychainId uint64 `protobuf:"varint,3,opt,name=keychain_id,json=keychainId,proto3" json:"keychain_id,omitempty"`
	// Scheme of the key.
	Type KeyType `protobuf:"varint,4,opt,name=type,proto3,enum=warden.warden.v1beta3.KeyType" json:"type,omitempty"`
	// Public key of the key. The private key is only known to the Keychain that
	// generated it.
	PublicKey []byte `protobuf:"bytes,5,opt,name=public_key,json=publicKey,proto3" json:"public_key,omitempty"`
	// ID of the Rule that will need to be satisfied for using this key to sign
	// data.
	// If this is not set, the key will use the signing Rule of the Space.
	RuleId uint64 `protobuf:"varint,6,opt,name=rule_id,json=ruleId,proto3" json:"rule_id,omitempty"`
}

func (m *Key) Reset()         { *m = Key{} }
func (m *Key) String() string { return proto.CompactTextString(m) }
func (*Key) ProtoMessage()    {}
func (*Key) Descriptor() ([]byte, []int) {
	return fileDescriptor_ea87ed804a1dfb88, []int{1}
}
func (m *Key) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *Key) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_Key.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *Key) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Key.Merge(m, src)
}
func (m *Key) XXX_Size() int {
	return m.Size()
}
func (m *Key) XXX_DiscardUnknown() {
	xxx_messageInfo_Key.DiscardUnknown(m)
}

var xxx_messageInfo_Key proto.InternalMessageInfo

func (m *Key) GetId() uint64 {
	if m != nil {
		return m.Id
	}
	return 0
}

func (m *Key) GetSpaceId() uint64 {
	if m != nil {
		return m.SpaceId
	}
	return 0
}

func (m *Key) GetKeychainId() uint64 {
	if m != nil {
		return m.KeychainId
	}
	return 0
}

func (m *Key) GetType() KeyType {
	if m != nil {
		return m.Type
	}
	return KeyType_KEY_TYPE_UNSPECIFIED
}

func (m *Key) GetPublicKey() []byte {
	if m != nil {
		return m.PublicKey
	}
	return nil
}

func (m *Key) GetRuleId() uint64 {
	if m != nil {
		return m.RuleId
	}
	return 0
}

func init() {
	proto.RegisterEnum("warden.warden.v1beta3.KeyRequestStatus", KeyRequestStatus_name, KeyRequestStatus_value)
	proto.RegisterEnum("warden.warden.v1beta3.KeyType", KeyType_name, KeyType_value)
	proto.RegisterEnum("warden.warden.v1beta3.AddressType", AddressType_name, AddressType_value)
	proto.RegisterType((*KeyRequest)(nil), "warden.warden.v1beta3.KeyRequest")
	proto.RegisterType((*Key)(nil), "warden.warden.v1beta3.Key")
}

func init() { proto.RegisterFile("warden/warden/v1beta3/key.proto", fileDescriptor_ea87ed804a1dfb88) }

var fileDescriptor_ea87ed804a1dfb88 = []byte{
	// 700 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x8c, 0x54, 0xcd, 0x6e, 0xd3, 0x4a,
	0x14, 0x8e, 0x93, 0xdc, 0xa4, 0x3d, 0xed, 0xad, 0x7c, 0x47, 0x6d, 0xaf, 0x9b, 0xdb, 0xeb, 0x44,
	0x65, 0x41, 0x14, 0xa9, 0xb6, 0x92, 0xaa, 0x48, 0x5d, 0xa1, 0x34, 0x9e, 0x14, 0x93, 0xfe, 0x04,
	0x3b, 0x59, 0x14, 0x09, 0x19, 0xc7, 0x1e, 0x52, 0x93, 0x34, 0x0e, 0x1e, 0x07, 0xf0, 0x5b, 0xb0,
	0x43, 0xf0, 0x04, 0x88, 0x55, 0x5f, 0x80, 0x2d, 0xea, 0xb2, 0x4b, 0x56, 0x80, 0xda, 0x45, 0x5f,
	0x03, 0x79, 0xec, 0x94, 0xb4, 0x0d, 0x88, 0x8d, 0xe7, 0x9c, 0xf3, 0x7d, 0xc7, 0xe7, 0xe7, 0x1b,
	0x0d, 0xe4, 0x5f, 0x99, 0x9e, 0x4d, 0x06, 0x72, 0x7c, 0xbc, 0x2c, 0x77, 0x88, 0x6f, 0x6e, 0xc8,
	0x3d, 0x12, 0x48, 0x43, 0xcf, 0xf5, 0x5d, 0xb4, 0x14, 0x21, 0x52, 0x7c, 0xc4, 0x84, 0xdc, 0x3f,
	0xe6, 0xb1, 0x33, 0x70, 0x65, 0xf6, 0x8d, 0x98, 0x39, 0xd1, 0x72, 0xe9, 0xb1, 0x4b, 0xe5, 0x8e,
	0x49, 0x49, 0xfc, 0xa3, 0xb2, 0x6c, 0xb9, 0xce, 0x20, 0xc6, 0x17, 0xbb, 0x6e, 0xd7, 0x65, 0xa6,
	0x1c, 0x5a, 0x51, 0x74, 0xed, 0x73, 0x0a, 0xa0, 0x41, 0x02, 0x8d, 0xbc, 0x18, 0x11, 0xea, 0xa3,
	0x05, 0x48, 0x3a, 0xb6, 0xc0, 0x15, 0xb8, 0x62, 0x5a, 0x4b, 0x3a, 0x36, 0x12, 0x20, 0x6b, 0x79,
	0xc4, 0xf4, 0x5d, 0x4f, 0x48, 0x16, 0xb8, 0xe2, 0xac, 0x36, 0x76, 0xd1, 0x0a, 0xcc, 0xd0, 0xa1,
	0x69, 0x11, 0xc3, 0xb1, 0x85, 0x14, 0xe3, 0x67, 0x99, 0xaf, 0xda, 0x28, 0x0f, 0x73, 0x3d, 0x12,
	0x58, 0x47, 0xa6, 0x33, 0x08, 0xd1, 0x34, 0x43, 0x61, 0x1c, 0x52, 0x6d, 0xb4, 0x05, 0x33, 0x3d,
	0x12, 0x18, 0x7e, 0x30, 0x24, 0xc2, 0x5f, 0x05, 0xae, 0xb8, 0x50, 0x11, 0xa5, 0xa9, 0x73, 0x4a,
	0x0d, 0x12, 0xb4, 0x82, 0x21, 0xd1, 0xb2, 0xbd, 0xc8, 0x40, 0xf7, 0x21, 0x43, 0x7d, 0xd3, 0x1f,
	0x51, 0x21, 0xc3, 0x12, 0xef, 0xfe, 0x3a, 0x31, 0x9e, 0x49, 0x67, 0x74, 0x2d, 0x4e, 0x43, 0x77,
	0xe0, 0x6f, 0x8f, 0x3c, 0x27, 0x96, 0x6f, 0x78, 0xc4, 0xa4, 0xee, 0x40, 0xc8, 0xb2, 0xb9, 0xe6,
	0xa3, 0xa0, 0xc6, 0x62, 0xe8, 0x5f, 0xc8, 0x7a, 0xa3, 0x3e, 0x9b, 0x6d, 0x86, 0x75, 0x9f, 0x09,
	0x5d, 0xd5, 0x46, 0x6f, 0x39, 0x58, 0xb6, 0x89, 0x3d, 0xb2, 0x7c, 0x62, 0x1b, 0x57, 0x43, 0x3e,
	0x23, 0x84, 0x0a, 0xb3, 0x85, 0x54, 0x71, 0xae, 0xb2, 0x22, 0x45, 0x32, 0x48, 0xa1, 0x0c, 0x71,
	0x37, 0x65, 0xa9, 0xe6, 0x3a, 0x83, 0xed, 0xfa, 0xe9, 0xd7, 0x7c, 0xe2, 0xe3, 0xb7, 0x7c, 0xb1,
	0xeb, 0xf8, 0x47, 0xa3, 0x8e, 0x64, 0xb9, 0xc7, 0x72, 0xac, 0x59, 0x74, 0xac, 0x53, 0xbb, 0x27,
	0x87, 0x4b, 0xa1, 0x2c, 0x81, 0xbe, 0xbf, 0x3c, 0x29, 0xcd, 0xf7, 0x49, 0xd7, 0xb4, 0x02, 0x23,
	0x14, 0x92, 0x7e, 0xb8, 0x3c, 0x29, 0x71, 0xda, 0xe2, 0xb8, 0x81, 0x46, 0x5c, 0xbf, 0x4e, 0x08,
	0x5d, 0xfb, 0xc4, 0x41, 0xaa, 0x41, 0x82, 0x5b, 0x0a, 0x4e, 0xea, 0x94, 0xfc, 0xad, 0x4e, 0xa9,
	0x5b, 0x3a, 0x55, 0x20, 0xcd, 0x34, 0x4a, 0xff, 0x91, 0x46, 0x8c, 0x8b, 0xfe, 0x07, 0x18, 0x8e,
	0x3a, 0x7d, 0xc7, 0x0a, 0xd7, 0xc3, 0xd4, 0x9d, 0xd7, 0x66, 0xa3, 0x48, 0xd8, 0xde, 0xc4, 0x66,
	0x33, 0x93, 0x9b, 0x2d, 0xbd, 0xe3, 0x80, 0xbf, 0x29, 0x1a, 0x5a, 0x03, 0xb1, 0x81, 0x0f, 0x0d,
	0x0d, 0x3f, 0x6a, 0x63, 0xbd, 0x65, 0xe8, 0xad, 0x6a, 0xab, 0xad, 0x1b, 0xed, 0x7d, 0xbd, 0x89,
	0x6b, 0x6a, 0x5d, 0xc5, 0x0a, 0x9f, 0x40, 0x22, 0xe4, 0xa6, 0x70, 0x9a, 0x78, 0x5f, 0x51, 0xf7,
	0x77, 0x78, 0x0e, 0x15, 0x60, 0x75, 0x0a, 0x5e, 0x6f, 0xef, 0xd6, 0xd5, 0xdd, 0x5d, 0xac, 0xf0,
	0x49, 0x94, 0x87, 0xff, 0xa6, 0x30, 0x34, 0xfc, 0x10, 0xd7, 0x5a, 0x58, 0xe1, 0x53, 0xa5, 0x27,
	0x90, 0x8d, 0x87, 0x44, 0x02, 0x2c, 0x86, 0xdc, 0xd6, 0x61, 0x13, 0xdf, 0xe8, 0x63, 0x15, 0x84,
	0x2b, 0x04, 0xd7, 0x14, 0xbd, 0x6a, 0xe8, 0xb8, 0xd6, 0xac, 0x6c, 0xde, 0x6b, 0x94, 0x79, 0x0e,
	0xe5, 0x60, 0xf9, 0x27, 0xaa, 0x84, 0x28, 0x56, 0x2a, 0x9b, 0x9b, 0xe5, 0x2d, 0x3e, 0x59, 0x7a,
	0x0a, 0x73, 0x55, 0xdb, 0xf6, 0x08, 0xa5, 0xac, 0xc4, 0x2a, 0x08, 0x55, 0x45, 0xd1, 0xb0, 0xae,
	0x4f, 0x2b, 0xb3, 0x02, 0x4b, 0xd7, 0x50, 0xdc, 0x7a, 0x80, 0x35, 0xdc, 0xde, 0xe3, 0xb9, 0xb0,
	0xb7, 0x6b, 0xd0, 0x81, 0xbe, 0x77, 0xa0, 0xab, 0x3a, 0x9f, 0xdc, 0x36, 0x4f, 0xcf, 0x45, 0xee,
	0xec, 0x5c, 0xe4, 0xbe, 0x9f, 0x8b, 0xdc, 0x9b, 0x0b, 0x31, 0x71, 0x76, 0x21, 0x26, 0xbe, 0x5c,
	0x88, 0x89, 0xc7, 0x3b, 0x13, 0x97, 0x31, 0xd2, 0x75, 0x9d, 0x3d, 0x0c, 0x96, 0xdb, 0x8f, 0xfd,
	0x1b, 0xae, 0xfc, 0x7a, 0x6c, 0xb0, 0x9b, 0x3a, 0x7e, 0xb2, 0x3a, 0x19, 0xc6, 0xdb, 0xf8, 0x11,
	0x00, 0x00, 0xff, 0xff, 0x0a, 0xc1, 0xa9, 0xc4, 0xd2, 0x04, 0x00, 0x00,
}

func (m *KeyRequest) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *KeyRequest) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *KeyRequest) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.DeductedKeychainFees) > 0 {
		for iNdEx := len(m.DeductedKeychainFees) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.DeductedKeychainFees[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintKey(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x4a
		}
	}
	if m.RuleId != 0 {
		i = encodeVarintKey(dAtA, i, uint64(m.RuleId))
		i--
		dAtA[i] = 0x40
	}
	if len(m.RejectReason) > 0 {
		i -= len(m.RejectReason)
		copy(dAtA[i:], m.RejectReason)
		i = encodeVarintKey(dAtA, i, uint64(len(m.RejectReason)))
		i--
		dAtA[i] = 0x3a
	}
	if m.Status != 0 {
		i = encodeVarintKey(dAtA, i, uint64(m.Status))
		i--
		dAtA[i] = 0x30
	}
	if m.KeyType != 0 {
		i = encodeVarintKey(dAtA, i, uint64(m.KeyType))
		i--
		dAtA[i] = 0x28
	}
	if m.KeychainId != 0 {
		i = encodeVarintKey(dAtA, i, uint64(m.KeychainId))
		i--
		dAtA[i] = 0x20
	}
	if m.SpaceId != 0 {
		i = encodeVarintKey(dAtA, i, uint64(m.SpaceId))
		i--
		dAtA[i] = 0x18
	}
	if len(m.Creator) > 0 {
		i -= len(m.Creator)
		copy(dAtA[i:], m.Creator)
		i = encodeVarintKey(dAtA, i, uint64(len(m.Creator)))
		i--
		dAtA[i] = 0x12
	}
	if m.Id != 0 {
		i = encodeVarintKey(dAtA, i, uint64(m.Id))
		i--
		dAtA[i] = 0x8
	}
	return len(dAtA) - i, nil
}

func (m *Key) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *Key) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *Key) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.RuleId != 0 {
		i = encodeVarintKey(dAtA, i, uint64(m.RuleId))
		i--
		dAtA[i] = 0x30
	}
	if len(m.PublicKey) > 0 {
		i -= len(m.PublicKey)
		copy(dAtA[i:], m.PublicKey)
		i = encodeVarintKey(dAtA, i, uint64(len(m.PublicKey)))
		i--
		dAtA[i] = 0x2a
	}
	if m.Type != 0 {
		i = encodeVarintKey(dAtA, i, uint64(m.Type))
		i--
		dAtA[i] = 0x20
	}
	if m.KeychainId != 0 {
		i = encodeVarintKey(dAtA, i, uint64(m.KeychainId))
		i--
		dAtA[i] = 0x18
	}
	if m.SpaceId != 0 {
		i = encodeVarintKey(dAtA, i, uint64(m.SpaceId))
		i--
		dAtA[i] = 0x10
	}
	if m.Id != 0 {
		i = encodeVarintKey(dAtA, i, uint64(m.Id))
		i--
		dAtA[i] = 0x8
	}
	return len(dAtA) - i, nil
}

func encodeVarintKey(dAtA []byte, offset int, v uint64) int {
	offset -= sovKey(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *KeyRequest) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.Id != 0 {
		n += 1 + sovKey(uint64(m.Id))
	}
	l = len(m.Creator)
	if l > 0 {
		n += 1 + l + sovKey(uint64(l))
	}
	if m.SpaceId != 0 {
		n += 1 + sovKey(uint64(m.SpaceId))
	}
	if m.KeychainId != 0 {
		n += 1 + sovKey(uint64(m.KeychainId))
	}
	if m.KeyType != 0 {
		n += 1 + sovKey(uint64(m.KeyType))
	}
	if m.Status != 0 {
		n += 1 + sovKey(uint64(m.Status))
	}
	l = len(m.RejectReason)
	if l > 0 {
		n += 1 + l + sovKey(uint64(l))
	}
	if m.RuleId != 0 {
		n += 1 + sovKey(uint64(m.RuleId))
	}
	if len(m.DeductedKeychainFees) > 0 {
		for _, e := range m.DeductedKeychainFees {
			l = e.Size()
			n += 1 + l + sovKey(uint64(l))
		}
	}
	return n
}

func (m *Key) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.Id != 0 {
		n += 1 + sovKey(uint64(m.Id))
	}
	if m.SpaceId != 0 {
		n += 1 + sovKey(uint64(m.SpaceId))
	}
	if m.KeychainId != 0 {
		n += 1 + sovKey(uint64(m.KeychainId))
	}
	if m.Type != 0 {
		n += 1 + sovKey(uint64(m.Type))
	}
	l = len(m.PublicKey)
	if l > 0 {
		n += 1 + l + sovKey(uint64(l))
	}
	if m.RuleId != 0 {
		n += 1 + sovKey(uint64(m.RuleId))
	}
	return n
}

func sovKey(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozKey(x uint64) (n int) {
	return sovKey(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *KeyRequest) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowKey
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
			return fmt.Errorf("proto: KeyRequest: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: KeyRequest: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Id", wireType)
			}
			m.Id = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowKey
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
					return ErrIntOverflowKey
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
				return ErrInvalidLengthKey
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthKey
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Creator = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 3:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field SpaceId", wireType)
			}
			m.SpaceId = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowKey
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.SpaceId |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 4:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field KeychainId", wireType)
			}
			m.KeychainId = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowKey
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.KeychainId |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 5:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field KeyType", wireType)
			}
			m.KeyType = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowKey
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.KeyType |= KeyType(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 6:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Status", wireType)
			}
			m.Status = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowKey
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Status |= KeyRequestStatus(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 7:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field RejectReason", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowKey
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
				return ErrInvalidLengthKey
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthKey
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.RejectReason = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 8:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field RuleId", wireType)
			}
			m.RuleId = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowKey
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.RuleId |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 9:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field DeductedKeychainFees", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowKey
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
				return ErrInvalidLengthKey
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthKey
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.DeductedKeychainFees = append(m.DeductedKeychainFees, types.Coin{})
			if err := m.DeductedKeychainFees[len(m.DeductedKeychainFees)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipKey(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthKey
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
func (m *Key) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowKey
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
			return fmt.Errorf("proto: Key: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: Key: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Id", wireType)
			}
			m.Id = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowKey
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
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field SpaceId", wireType)
			}
			m.SpaceId = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowKey
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.SpaceId |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 3:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field KeychainId", wireType)
			}
			m.KeychainId = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowKey
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.KeychainId |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 4:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Type", wireType)
			}
			m.Type = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowKey
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Type |= KeyType(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 5:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field PublicKey", wireType)
			}
			var byteLen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowKey
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
				return ErrInvalidLengthKey
			}
			postIndex := iNdEx + byteLen
			if postIndex < 0 {
				return ErrInvalidLengthKey
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.PublicKey = append(m.PublicKey[:0], dAtA[iNdEx:postIndex]...)
			if m.PublicKey == nil {
				m.PublicKey = []byte{}
			}
			iNdEx = postIndex
		case 6:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field RuleId", wireType)
			}
			m.RuleId = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowKey
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.RuleId |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		default:
			iNdEx = preIndex
			skippy, err := skipKey(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthKey
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
func skipKey(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowKey
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
					return 0, ErrIntOverflowKey
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
					return 0, ErrIntOverflowKey
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
				return 0, ErrInvalidLengthKey
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupKey
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthKey
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthKey        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowKey          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupKey = fmt.Errorf("proto: unexpected end of group")
)
