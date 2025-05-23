// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: warden/async/v1beta1/plugin.proto

package v1beta1

import (
	cosmossdk_io_math "cosmossdk.io/math"
	fmt "fmt"
	_ "github.com/cosmos/cosmos-proto"
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

// Plugin represents an extension for adding new capabilities to the
// blockchain. As part of the x/async module, a plugin executes Tasks offchain,
// asynchronously.
//
// Validators register zero, one, or more, Plugins they're willing to execute.
//
// Plugins are divided in two categories: 1st party plugins that are shipped
// together with the Warden Protocol node binary, and 3rd party plugins
// developed by others.
type Plugin struct {
	// Unique ID of the Plugin.
	//
	// For 1st party plugins, it will just be its name, e.g.:
	// - foo
	// - bar
	// - http
	//
	// For 3rd party plugins, it will be a combination of the address of the creator and its name, e.g.:
	// - 0x4838B108FCe9647Bdf1A7877BF73cE8B0BAD5f97:foo
	// - 0x73f7b9124B2cD361cC0f7654998953E2a251dd58:foo
	// - 0x4838B108FCe9647Bdf1A7877BF73cE8B0BAD5f97:bar
	// - 0x73f7b9124B2cD361cC0f7654998953E2a251dd58:http
	Id string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	// Creator of the plugin. In case of 1st party plugins, this will be empty.
	Creator string `protobuf:"bytes,2,opt,name=creator,proto3" json:"creator,omitempty"`
	// Human-readable description of what this plugin can do.
	Description string `protobuf:"bytes,3,opt,name=description,proto3" json:"description,omitempty"`
	// Fees for creating and executing tasks.
	Fee PluginFee `protobuf:"bytes,4,opt,name=fee,proto3" json:"fee"`
}

func (m *Plugin) Reset()         { *m = Plugin{} }
func (m *Plugin) String() string { return proto.CompactTextString(m) }
func (*Plugin) ProtoMessage()    {}
func (*Plugin) Descriptor() ([]byte, []int) {
	return fileDescriptor_fa771fd44141666a, []int{0}
}
func (m *Plugin) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *Plugin) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_Plugin.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *Plugin) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Plugin.Merge(m, src)
}
func (m *Plugin) XXX_Size() int {
	return m.Size()
}
func (m *Plugin) XXX_DiscardUnknown() {
	xxx_messageInfo_Plugin.DiscardUnknown(m)
}

var xxx_messageInfo_Plugin proto.InternalMessageInfo

func (m *Plugin) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *Plugin) GetCreator() string {
	if m != nil {
		return m.Creator
	}
	return ""
}

func (m *Plugin) GetDescription() string {
	if m != nil {
		return m.Description
	}
	return ""
}

func (m *Plugin) GetFee() PluginFee {
	if m != nil {
		return m.Fee
	}
	return PluginFee{}
}

// Fees for creating and executing concrete task.
type PluginFee struct {
	// The percentage of the fee that goes to the creator of the plugin. The rest goes to the executor of the task.
	// Expressed as a number in the range [0, 1].
	PluginCreatorRewardInPercent cosmossdk_io_math.LegacyDec `protobuf:"bytes,1,opt,name=plugin_creator_reward_in_percent,json=pluginCreatorRewardInPercent,proto3,customtype=cosmossdk.io/math.LegacyDec" json:"plugin_creator_reward_in_percent"`
	// Fee for creating and executing new Task.
	Fee github_com_cosmos_cosmos_sdk_types.Coins `protobuf:"bytes,3,rep,name=fee,proto3,castrepeated=github.com/cosmos/cosmos-sdk/types.Coins" json:"fee"`
}

func (m *PluginFee) Reset()         { *m = PluginFee{} }
func (m *PluginFee) String() string { return proto.CompactTextString(m) }
func (*PluginFee) ProtoMessage()    {}
func (*PluginFee) Descriptor() ([]byte, []int) {
	return fileDescriptor_fa771fd44141666a, []int{1}
}
func (m *PluginFee) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *PluginFee) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_PluginFee.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *PluginFee) XXX_Merge(src proto.Message) {
	xxx_messageInfo_PluginFee.Merge(m, src)
}
func (m *PluginFee) XXX_Size() int {
	return m.Size()
}
func (m *PluginFee) XXX_DiscardUnknown() {
	xxx_messageInfo_PluginFee.DiscardUnknown(m)
}

var xxx_messageInfo_PluginFee proto.InternalMessageInfo

func (m *PluginFee) GetFee() github_com_cosmos_cosmos_sdk_types.Coins {
	if m != nil {
		return m.Fee
	}
	return nil
}

func init() {
	proto.RegisterType((*Plugin)(nil), "warden.async.v1beta1.Plugin")
	proto.RegisterType((*PluginFee)(nil), "warden.async.v1beta1.PluginFee")
}

func init() { proto.RegisterFile("warden/async/v1beta1/plugin.proto", fileDescriptor_fa771fd44141666a) }

var fileDescriptor_fa771fd44141666a = []byte{
	// 454 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x6c, 0x92, 0xbf, 0x6e, 0x13, 0x41,
	0x10, 0xc6, 0xbd, 0x76, 0x14, 0x94, 0x35, 0x42, 0xe2, 0xe4, 0xe2, 0x62, 0xd0, 0xf9, 0x48, 0x65,
	0x45, 0xf2, 0xae, 0x6c, 0x0a, 0x6a, 0x2e, 0x91, 0x25, 0x24, 0x8a, 0xe8, 0xe8, 0x68, 0x8e, 0xf3,
	0xde, 0x70, 0x59, 0xc5, 0xde, 0x3d, 0xed, 0x6e, 0x00, 0xbf, 0x05, 0x35, 0x2f, 0x00, 0xa2, 0x4a,
	0x91, 0x87, 0x48, 0x19, 0xa5, 0x42, 0x14, 0x01, 0xd9, 0x45, 0x1e, 0x82, 0x06, 0xed, 0x1f, 0x5b,
	0x11, 0xa2, 0xb1, 0x6f, 0x66, 0xbf, 0xf9, 0xcd, 0x7c, 0x3b, 0x8b, 0x9f, 0x7d, 0x2c, 0x55, 0x05,
	0x82, 0x96, 0x7a, 0x29, 0x18, 0xfd, 0x30, 0x9e, 0x81, 0x29, 0xc7, 0xb4, 0x99, 0x9f, 0xd7, 0x5c,
	0x90, 0x46, 0x49, 0x23, 0xa3, 0x9e, 0x97, 0x10, 0x27, 0x21, 0x41, 0xd2, 0x7f, 0x5c, 0x2e, 0xb8,
	0x90, 0xd4, 0xfd, 0x7a, 0x61, 0x3f, 0x61, 0x52, 0x2f, 0xa4, 0xa6, 0xb3, 0x52, 0xc3, 0x16, 0xc5,
	0xe4, 0x06, 0xd4, 0xdf, 0xf7, 0xe7, 0x85, 0x8b, 0xa8, 0x0f, 0xc2, 0x51, 0xaf, 0x96, 0xb5, 0xf4,
	0x79, 0xfb, 0xe5, 0xb3, 0x07, 0x5f, 0x11, 0xde, 0x3d, 0x71, 0xa3, 0x44, 0x8f, 0x70, 0x9b, 0x57,
	0x31, 0x4a, 0xd1, 0x70, 0x2f, 0x6f, 0xf3, 0x2a, 0x9a, 0xe0, 0x07, 0x4c, 0x41, 0x69, 0xa4, 0x8a,
	0xdb, 0x36, 0x99, 0xc5, 0x37, 0x97, 0xa3, 0x5e, 0x60, 0xbe, 0xac, 0x2a, 0x05, 0x5a, 0xbf, 0x31,
	0x8a, 0x8b, 0x3a, 0xdf, 0x08, 0xa3, 0x14, 0x77, 0x2b, 0xd0, 0x4c, 0xf1, 0xc6, 0x70, 0x29, 0xe2,
	0x8e, 0x83, 0xdd, 0x4f, 0x45, 0x2f, 0x70, 0xe7, 0x3d, 0x40, 0xbc, 0x93, 0xa2, 0x61, 0x77, 0x32,
	0x20, 0xff, 0x33, 0x4e, 0xfc, 0x40, 0x53, 0x80, 0x6c, 0xe7, 0xea, 0x76, 0xd0, 0xca, 0x6d, 0xc5,
	0xc1, 0x1f, 0x84, 0xf7, 0xb6, 0x07, 0xd1, 0x12, 0xa7, 0xfe, 0x06, 0x8b, 0xd0, 0xba, 0x50, 0x60,
	0x59, 0x05, 0x17, 0x45, 0x03, 0x8a, 0x81, 0x30, 0xde, 0x4a, 0x36, 0xb6, 0x88, 0x9f, 0xb7, 0x83,
	0x27, 0x7e, 0x72, 0x5d, 0x9d, 0x11, 0x2e, 0xe9, 0xa2, 0x34, 0xa7, 0xe4, 0x35, 0xd4, 0x25, 0x5b,
	0x1e, 0x03, 0xbb, 0xb9, 0x1c, 0xe1, 0x60, 0xec, 0x18, 0x58, 0xfe, 0xd4, 0xa3, 0x8f, 0x3c, 0x39,
	0x77, 0xe0, 0x57, 0xe2, 0xc4, 0x63, 0x23, 0xed, 0x1d, 0x74, 0xd2, 0xce, 0xb0, 0x3b, 0xd9, 0x27,
	0xa1, 0xce, 0x6e, 0x64, 0x6b, 0xe0, 0x48, 0x72, 0x91, 0x4d, 0x6d, 0xe3, 0xef, 0xbf, 0x06, 0xc3,
	0x9a, 0x9b, 0xd3, 0xf3, 0x19, 0x61, 0x72, 0x11, 0x36, 0x12, 0xfe, 0x46, 0xba, 0x3a, 0xa3, 0x66,
	0xd9, 0x80, 0x76, 0x05, 0xfa, 0xcb, 0xdd, 0xc5, 0xe1, 0xc3, 0xb9, 0x9b, 0xa9, 0xb0, 0x3b, 0xd5,
	0xdf, 0xee, 0x2e, 0x0e, 0x91, 0x73, 0x9f, 0xbd, 0xbb, 0x5a, 0x25, 0xe8, 0x7a, 0x95, 0xa0, 0xdf,
	0xab, 0x04, 0x7d, 0x5e, 0x27, 0xad, 0xeb, 0x75, 0xd2, 0xfa, 0xb1, 0x4e, 0x5a, 0x6f, 0xa7, 0xf7,
	0xf0, 0xfe, 0x36, 0x47, 0x6e, 0xb5, 0x4c, 0xce, 0x43, 0xfc, 0x4f, 0x48, 0x3f, 0x85, 0xa7, 0xe8,
	0x5a, 0x6f, 0x5e, 0xd1, 0x6c, 0xd7, 0xc9, 0x9e, 0xff, 0x0d, 0x00, 0x00, 0xff, 0xff, 0x56, 0xeb,
	0x6f, 0x52, 0xaf, 0x02, 0x00, 0x00,
}

func (m *Plugin) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *Plugin) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *Plugin) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	{
		size, err := m.Fee.MarshalToSizedBuffer(dAtA[:i])
		if err != nil {
			return 0, err
		}
		i -= size
		i = encodeVarintPlugin(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0x22
	if len(m.Description) > 0 {
		i -= len(m.Description)
		copy(dAtA[i:], m.Description)
		i = encodeVarintPlugin(dAtA, i, uint64(len(m.Description)))
		i--
		dAtA[i] = 0x1a
	}
	if len(m.Creator) > 0 {
		i -= len(m.Creator)
		copy(dAtA[i:], m.Creator)
		i = encodeVarintPlugin(dAtA, i, uint64(len(m.Creator)))
		i--
		dAtA[i] = 0x12
	}
	if len(m.Id) > 0 {
		i -= len(m.Id)
		copy(dAtA[i:], m.Id)
		i = encodeVarintPlugin(dAtA, i, uint64(len(m.Id)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *PluginFee) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *PluginFee) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *PluginFee) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.Fee) > 0 {
		for iNdEx := len(m.Fee) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.Fee[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintPlugin(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x1a
		}
	}
	{
		size := m.PluginCreatorRewardInPercent.Size()
		i -= size
		if _, err := m.PluginCreatorRewardInPercent.MarshalTo(dAtA[i:]); err != nil {
			return 0, err
		}
		i = encodeVarintPlugin(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0xa
	return len(dAtA) - i, nil
}

func encodeVarintPlugin(dAtA []byte, offset int, v uint64) int {
	offset -= sovPlugin(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *Plugin) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Id)
	if l > 0 {
		n += 1 + l + sovPlugin(uint64(l))
	}
	l = len(m.Creator)
	if l > 0 {
		n += 1 + l + sovPlugin(uint64(l))
	}
	l = len(m.Description)
	if l > 0 {
		n += 1 + l + sovPlugin(uint64(l))
	}
	l = m.Fee.Size()
	n += 1 + l + sovPlugin(uint64(l))
	return n
}

func (m *PluginFee) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = m.PluginCreatorRewardInPercent.Size()
	n += 1 + l + sovPlugin(uint64(l))
	if len(m.Fee) > 0 {
		for _, e := range m.Fee {
			l = e.Size()
			n += 1 + l + sovPlugin(uint64(l))
		}
	}
	return n
}

func sovPlugin(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozPlugin(x uint64) (n int) {
	return sovPlugin(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *Plugin) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowPlugin
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
			return fmt.Errorf("proto: Plugin: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: Plugin: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Id", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowPlugin
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
				return ErrInvalidLengthPlugin
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthPlugin
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Id = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Creator", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowPlugin
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
				return ErrInvalidLengthPlugin
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthPlugin
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Creator = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Description", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowPlugin
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
				return ErrInvalidLengthPlugin
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthPlugin
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Description = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Fee", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowPlugin
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
				return ErrInvalidLengthPlugin
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthPlugin
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.Fee.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipPlugin(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthPlugin
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
func (m *PluginFee) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowPlugin
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
			return fmt.Errorf("proto: PluginFee: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: PluginFee: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field PluginCreatorRewardInPercent", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowPlugin
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
				return ErrInvalidLengthPlugin
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthPlugin
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.PluginCreatorRewardInPercent.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Fee", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowPlugin
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
				return ErrInvalidLengthPlugin
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthPlugin
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Fee = append(m.Fee, types.Coin{})
			if err := m.Fee[len(m.Fee)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipPlugin(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthPlugin
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
func skipPlugin(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowPlugin
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
					return 0, ErrIntOverflowPlugin
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
					return 0, ErrIntOverflowPlugin
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
				return 0, ErrInvalidLengthPlugin
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupPlugin
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthPlugin
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthPlugin        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowPlugin          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupPlugin = fmt.Errorf("proto: unexpected end of group")
)
