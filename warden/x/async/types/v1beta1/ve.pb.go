// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: warden/async/v1beta1/ve.proto

package v1beta1

import (
	fmt "fmt"
	types "github.com/cometbft/cometbft/abci/types"
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

type AsyncInjectedTx struct {
	// All the vote extensions gathered for this block.
	//
	// FIXME: slinky also does that, so technically we're duplicating information
	// and wasting block space.
	ExtendedVotesInfo []types.ExtendedVoteInfo `protobuf:"bytes,1,rep,name=extended_votes_info,json=extendedVotesInfo,proto3" json:"extended_votes_info"`
}

func (m *AsyncInjectedTx) Reset()         { *m = AsyncInjectedTx{} }
func (m *AsyncInjectedTx) String() string { return proto.CompactTextString(m) }
func (*AsyncInjectedTx) ProtoMessage()    {}
func (*AsyncInjectedTx) Descriptor() ([]byte, []int) {
	return fileDescriptor_e3e24cf4461cf67a, []int{0}
}
func (m *AsyncInjectedTx) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *AsyncInjectedTx) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_AsyncInjectedTx.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *AsyncInjectedTx) XXX_Merge(src proto.Message) {
	xxx_messageInfo_AsyncInjectedTx.Merge(m, src)
}
func (m *AsyncInjectedTx) XXX_Size() int {
	return m.Size()
}
func (m *AsyncInjectedTx) XXX_DiscardUnknown() {
	xxx_messageInfo_AsyncInjectedTx.DiscardUnknown(m)
}

var xxx_messageInfo_AsyncInjectedTx proto.InternalMessageInfo

func (m *AsyncInjectedTx) GetExtendedVotesInfo() []types.ExtendedVoteInfo {
	if m != nil {
		return m.ExtendedVotesInfo
	}
	return nil
}

// A vote extension coming from a validator. It contains results, votes for
// some futures and handlers that are supported by the validator.
type AsyncVoteExtension struct {
	Results        []*VEResultItem `protobuf:"bytes,1,rep,name=results,proto3" json:"results,omitempty"`
	Votes          []*VEVoteItem   `protobuf:"bytes,2,rep,name=votes,proto3" json:"votes,omitempty"`
	Handlers       []string        `protobuf:"bytes,3,rep,name=handlers,proto3" json:"handlers,omitempty"`
	UpdateHandlers bool            `protobuf:"varint,4,opt,name=update_handlers,json=updateHandlers,proto3" json:"update_handlers,omitempty"`
}

func (m *AsyncVoteExtension) Reset()         { *m = AsyncVoteExtension{} }
func (m *AsyncVoteExtension) String() string { return proto.CompactTextString(m) }
func (*AsyncVoteExtension) ProtoMessage()    {}
func (*AsyncVoteExtension) Descriptor() ([]byte, []int) {
	return fileDescriptor_e3e24cf4461cf67a, []int{1}
}
func (m *AsyncVoteExtension) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *AsyncVoteExtension) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_AsyncVoteExtension.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *AsyncVoteExtension) XXX_Merge(src proto.Message) {
	xxx_messageInfo_AsyncVoteExtension.Merge(m, src)
}
func (m *AsyncVoteExtension) XXX_Size() int {
	return m.Size()
}
func (m *AsyncVoteExtension) XXX_DiscardUnknown() {
	xxx_messageInfo_AsyncVoteExtension.DiscardUnknown(m)
}

var xxx_messageInfo_AsyncVoteExtension proto.InternalMessageInfo

func (m *AsyncVoteExtension) GetResults() []*VEResultItem {
	if m != nil {
		return m.Results
	}
	return nil
}

func (m *AsyncVoteExtension) GetVotes() []*VEVoteItem {
	if m != nil {
		return m.Votes
	}
	return nil
}

func (m *AsyncVoteExtension) GetHandlers() []string {
	if m != nil {
		return m.Handlers
	}
	return nil
}

func (m *AsyncVoteExtension) GetUpdateHandlers() bool {
	if m != nil {
		return m.UpdateHandlers
	}
	return false
}

type VEResultItem struct {
	FutureId uint64 `protobuf:"varint,1,opt,name=future_id,json=futureId,proto3" json:"future_id,omitempty"`
	Output   []byte `protobuf:"bytes,2,opt,name=output,proto3" json:"output,omitempty"`
}

func (m *VEResultItem) Reset()         { *m = VEResultItem{} }
func (m *VEResultItem) String() string { return proto.CompactTextString(m) }
func (*VEResultItem) ProtoMessage()    {}
func (*VEResultItem) Descriptor() ([]byte, []int) {
	return fileDescriptor_e3e24cf4461cf67a, []int{2}
}
func (m *VEResultItem) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *VEResultItem) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_VEResultItem.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *VEResultItem) XXX_Merge(src proto.Message) {
	xxx_messageInfo_VEResultItem.Merge(m, src)
}
func (m *VEResultItem) XXX_Size() int {
	return m.Size()
}
func (m *VEResultItem) XXX_DiscardUnknown() {
	xxx_messageInfo_VEResultItem.DiscardUnknown(m)
}

var xxx_messageInfo_VEResultItem proto.InternalMessageInfo

func (m *VEResultItem) GetFutureId() uint64 {
	if m != nil {
		return m.FutureId
	}
	return 0
}

func (m *VEResultItem) GetOutput() []byte {
	if m != nil {
		return m.Output
	}
	return nil
}

type VEVoteItem struct {
	FutureId uint64         `protobuf:"varint,1,opt,name=future_id,json=futureId,proto3" json:"future_id,omitempty"`
	Vote     FutureVoteType `protobuf:"varint,2,opt,name=vote,proto3,enum=warden.async.v1beta1.FutureVoteType" json:"vote,omitempty"`
}

func (m *VEVoteItem) Reset()         { *m = VEVoteItem{} }
func (m *VEVoteItem) String() string { return proto.CompactTextString(m) }
func (*VEVoteItem) ProtoMessage()    {}
func (*VEVoteItem) Descriptor() ([]byte, []int) {
	return fileDescriptor_e3e24cf4461cf67a, []int{3}
}
func (m *VEVoteItem) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *VEVoteItem) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_VEVoteItem.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *VEVoteItem) XXX_Merge(src proto.Message) {
	xxx_messageInfo_VEVoteItem.Merge(m, src)
}
func (m *VEVoteItem) XXX_Size() int {
	return m.Size()
}
func (m *VEVoteItem) XXX_DiscardUnknown() {
	xxx_messageInfo_VEVoteItem.DiscardUnknown(m)
}

var xxx_messageInfo_VEVoteItem proto.InternalMessageInfo

func (m *VEVoteItem) GetFutureId() uint64 {
	if m != nil {
		return m.FutureId
	}
	return 0
}

func (m *VEVoteItem) GetVote() FutureVoteType {
	if m != nil {
		return m.Vote
	}
	return FutureVoteType_VOTE_TYPE_UNSPECIFIED
}

func init() {
	proto.RegisterType((*AsyncInjectedTx)(nil), "warden.async.v1beta1.AsyncInjectedTx")
	proto.RegisterType((*AsyncVoteExtension)(nil), "warden.async.v1beta1.AsyncVoteExtension")
	proto.RegisterType((*VEResultItem)(nil), "warden.async.v1beta1.VEResultItem")
	proto.RegisterType((*VEVoteItem)(nil), "warden.async.v1beta1.VEVoteItem")
}

func init() { proto.RegisterFile("warden/async/v1beta1/ve.proto", fileDescriptor_e3e24cf4461cf67a) }

var fileDescriptor_e3e24cf4461cf67a = []byte{
	// 428 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x7c, 0x52, 0x4f, 0x6f, 0xd3, 0x30,
	0x14, 0xaf, 0xd7, 0x32, 0x3a, 0x33, 0x6d, 0xc2, 0x4c, 0x28, 0xea, 0x44, 0xc8, 0x22, 0x24, 0x72,
	0xc1, 0xd6, 0x86, 0x84, 0x38, 0x70, 0x61, 0x68, 0x13, 0xbd, 0x5a, 0xd3, 0x90, 0xb8, 0x84, 0x24,
	0x7e, 0xed, 0x32, 0xb5, 0x76, 0x14, 0x3b, 0xa5, 0xfd, 0x16, 0x7c, 0xac, 0xdd, 0xd8, 0x91, 0x13,
	0x42, 0xed, 0x17, 0x41, 0x76, 0xbc, 0x3f, 0x42, 0x65, 0xb7, 0xbc, 0xf7, 0xfb, 0x1b, 0xeb, 0xe1,
	0x17, 0xdf, 0xb3, 0x5a, 0x80, 0x64, 0x99, 0x5e, 0xc8, 0x82, 0xcd, 0x0e, 0x73, 0x30, 0xd9, 0x21,
	0x9b, 0x01, 0xad, 0x6a, 0x65, 0x14, 0xd9, 0x6b, 0x61, 0xea, 0x60, 0xea, 0xe1, 0xc1, 0xde, 0x58,
	0x8d, 0x95, 0x23, 0x30, 0xfb, 0xd5, 0x72, 0x07, 0xfb, 0x06, 0xa4, 0x80, 0x7a, 0x5a, 0x4a, 0xc3,
	0xb2, 0xbc, 0x28, 0x99, 0x59, 0x54, 0xa0, 0x3d, 0x78, 0xb0, 0x36, 0x67, 0xd4, 0x98, 0xa6, 0xf6,
	0x59, 0xf1, 0x25, 0xde, 0xfd, 0x68, 0xd1, 0xa1, 0xbc, 0x84, 0xc2, 0x80, 0x38, 0x9b, 0x93, 0x2f,
	0xf8, 0x19, 0xcc, 0x9d, 0xad, 0x48, 0x67, 0xca, 0x80, 0x4e, 0x4b, 0x39, 0x52, 0x01, 0x8a, 0xba,
	0xc9, 0x93, 0xa3, 0x03, 0x7a, 0x17, 0x48, 0x6d, 0x20, 0x3d, 0xf1, 0xdc, 0x73, 0x65, 0x60, 0x28,
	0x47, 0xea, 0xb8, 0x77, 0xf5, 0xfb, 0x65, 0x87, 0x3f, 0x85, 0x7b, 0x7b, 0x6d, 0x81, 0xf8, 0x27,
	0xc2, 0xc4, 0x85, 0xd9, 0x95, 0x93, 0xe9, 0x52, 0x49, 0xf2, 0x01, 0x3f, 0xae, 0x41, 0x37, 0x13,
	0xa3, 0x7d, 0x46, 0x4c, 0xd7, 0x3d, 0x00, 0x3d, 0x3f, 0xe1, 0x8e, 0x36, 0x34, 0x30, 0xe5, 0x37,
	0x12, 0xf2, 0x0e, 0x3f, 0x72, 0x25, 0x83, 0x0d, 0xa7, 0x8d, 0xfe, 0xa7, 0x75, 0xf5, 0xac, 0xb2,
	0xa5, 0x93, 0x01, 0xee, 0x5f, 0x64, 0x52, 0x4c, 0xa0, 0xd6, 0x41, 0x37, 0xea, 0x26, 0x5b, 0xfc,
	0x76, 0x26, 0xaf, 0xf1, 0x6e, 0x53, 0x89, 0xcc, 0x40, 0x7a, 0x4b, 0xe9, 0x45, 0x28, 0xe9, 0xf3,
	0x9d, 0x76, 0xfd, 0xd9, 0x6f, 0xe3, 0x4f, 0x78, 0xfb, 0x7e, 0x2b, 0xb2, 0x8f, 0xb7, 0xda, 0xd7,
	0x4d, 0x4b, 0x11, 0xa0, 0x08, 0x25, 0x3d, 0xde, 0x6f, 0x17, 0x43, 0x41, 0x9e, 0xe3, 0x4d, 0xd5,
	0x98, 0xaa, 0x31, 0xc1, 0x46, 0x84, 0x92, 0x6d, 0xee, 0xa7, 0xb8, 0xc0, 0xf8, 0xae, 0xde, 0xc3,
	0x16, 0xef, 0x71, 0xcf, 0xb6, 0x77, 0x06, 0x3b, 0x47, 0xaf, 0xd6, 0xff, 0xeb, 0xa9, 0x63, 0x5b,
	0xc3, 0xb3, 0x45, 0x05, 0xdc, 0x29, 0x8e, 0xbf, 0x5d, 0x2d, 0x43, 0x74, 0xbd, 0x0c, 0xd1, 0x9f,
	0x65, 0x88, 0x7e, 0xac, 0xc2, 0xce, 0xf5, 0x2a, 0xec, 0xfc, 0x5a, 0x85, 0x9d, 0xaf, 0xa7, 0xe3,
	0xd2, 0x5c, 0x34, 0x39, 0x2d, 0xd4, 0x94, 0xb5, 0x7e, 0x6f, 0xdc, 0x69, 0x14, 0x6a, 0xe2, 0xe7,
	0x7f, 0x46, 0x36, 0xf7, 0x07, 0xe5, 0x4e, 0xed, 0xe6, 0xac, 0xf2, 0x4d, 0x47, 0x7b, 0xfb, 0x37,
	0x00, 0x00, 0xff, 0xff, 0x8d, 0x27, 0xb7, 0xfa, 0xdd, 0x02, 0x00, 0x00,
}

func (m *AsyncInjectedTx) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *AsyncInjectedTx) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *AsyncInjectedTx) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.ExtendedVotesInfo) > 0 {
		for iNdEx := len(m.ExtendedVotesInfo) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.ExtendedVotesInfo[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintVe(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0xa
		}
	}
	return len(dAtA) - i, nil
}

func (m *AsyncVoteExtension) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *AsyncVoteExtension) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *AsyncVoteExtension) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.UpdateHandlers {
		i--
		if m.UpdateHandlers {
			dAtA[i] = 1
		} else {
			dAtA[i] = 0
		}
		i--
		dAtA[i] = 0x20
	}
	if len(m.Handlers) > 0 {
		for iNdEx := len(m.Handlers) - 1; iNdEx >= 0; iNdEx-- {
			i -= len(m.Handlers[iNdEx])
			copy(dAtA[i:], m.Handlers[iNdEx])
			i = encodeVarintVe(dAtA, i, uint64(len(m.Handlers[iNdEx])))
			i--
			dAtA[i] = 0x1a
		}
	}
	if len(m.Votes) > 0 {
		for iNdEx := len(m.Votes) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.Votes[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintVe(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x12
		}
	}
	if len(m.Results) > 0 {
		for iNdEx := len(m.Results) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.Results[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintVe(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0xa
		}
	}
	return len(dAtA) - i, nil
}

func (m *VEResultItem) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *VEResultItem) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *VEResultItem) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.Output) > 0 {
		i -= len(m.Output)
		copy(dAtA[i:], m.Output)
		i = encodeVarintVe(dAtA, i, uint64(len(m.Output)))
		i--
		dAtA[i] = 0x12
	}
	if m.FutureId != 0 {
		i = encodeVarintVe(dAtA, i, uint64(m.FutureId))
		i--
		dAtA[i] = 0x8
	}
	return len(dAtA) - i, nil
}

func (m *VEVoteItem) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *VEVoteItem) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *VEVoteItem) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.Vote != 0 {
		i = encodeVarintVe(dAtA, i, uint64(m.Vote))
		i--
		dAtA[i] = 0x10
	}
	if m.FutureId != 0 {
		i = encodeVarintVe(dAtA, i, uint64(m.FutureId))
		i--
		dAtA[i] = 0x8
	}
	return len(dAtA) - i, nil
}

func encodeVarintVe(dAtA []byte, offset int, v uint64) int {
	offset -= sovVe(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *AsyncInjectedTx) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if len(m.ExtendedVotesInfo) > 0 {
		for _, e := range m.ExtendedVotesInfo {
			l = e.Size()
			n += 1 + l + sovVe(uint64(l))
		}
	}
	return n
}

func (m *AsyncVoteExtension) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if len(m.Results) > 0 {
		for _, e := range m.Results {
			l = e.Size()
			n += 1 + l + sovVe(uint64(l))
		}
	}
	if len(m.Votes) > 0 {
		for _, e := range m.Votes {
			l = e.Size()
			n += 1 + l + sovVe(uint64(l))
		}
	}
	if len(m.Handlers) > 0 {
		for _, s := range m.Handlers {
			l = len(s)
			n += 1 + l + sovVe(uint64(l))
		}
	}
	if m.UpdateHandlers {
		n += 2
	}
	return n
}

func (m *VEResultItem) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.FutureId != 0 {
		n += 1 + sovVe(uint64(m.FutureId))
	}
	l = len(m.Output)
	if l > 0 {
		n += 1 + l + sovVe(uint64(l))
	}
	return n
}

func (m *VEVoteItem) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.FutureId != 0 {
		n += 1 + sovVe(uint64(m.FutureId))
	}
	if m.Vote != 0 {
		n += 1 + sovVe(uint64(m.Vote))
	}
	return n
}

func sovVe(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozVe(x uint64) (n int) {
	return sovVe(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *AsyncInjectedTx) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowVe
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
			return fmt.Errorf("proto: AsyncInjectedTx: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: AsyncInjectedTx: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ExtendedVotesInfo", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowVe
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
				return ErrInvalidLengthVe
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthVe
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.ExtendedVotesInfo = append(m.ExtendedVotesInfo, types.ExtendedVoteInfo{})
			if err := m.ExtendedVotesInfo[len(m.ExtendedVotesInfo)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipVe(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthVe
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
func (m *AsyncVoteExtension) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowVe
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
			return fmt.Errorf("proto: AsyncVoteExtension: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: AsyncVoteExtension: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Results", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowVe
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
				return ErrInvalidLengthVe
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthVe
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Results = append(m.Results, &VEResultItem{})
			if err := m.Results[len(m.Results)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Votes", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowVe
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
				return ErrInvalidLengthVe
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthVe
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Votes = append(m.Votes, &VEVoteItem{})
			if err := m.Votes[len(m.Votes)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Handlers", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowVe
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
				return ErrInvalidLengthVe
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthVe
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Handlers = append(m.Handlers, string(dAtA[iNdEx:postIndex]))
			iNdEx = postIndex
		case 4:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field UpdateHandlers", wireType)
			}
			var v int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowVe
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				v |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			m.UpdateHandlers = bool(v != 0)
		default:
			iNdEx = preIndex
			skippy, err := skipVe(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthVe
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
func (m *VEResultItem) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowVe
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
			return fmt.Errorf("proto: VEResultItem: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: VEResultItem: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field FutureId", wireType)
			}
			m.FutureId = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowVe
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.FutureId |= uint64(b&0x7F) << shift
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
					return ErrIntOverflowVe
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
				return ErrInvalidLengthVe
			}
			postIndex := iNdEx + byteLen
			if postIndex < 0 {
				return ErrInvalidLengthVe
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Output = append(m.Output[:0], dAtA[iNdEx:postIndex]...)
			if m.Output == nil {
				m.Output = []byte{}
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipVe(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthVe
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
func (m *VEVoteItem) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowVe
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
			return fmt.Errorf("proto: VEVoteItem: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: VEVoteItem: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field FutureId", wireType)
			}
			m.FutureId = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowVe
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.FutureId |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 2:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Vote", wireType)
			}
			m.Vote = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowVe
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Vote |= FutureVoteType(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		default:
			iNdEx = preIndex
			skippy, err := skipVe(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthVe
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
func skipVe(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowVe
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
					return 0, ErrIntOverflowVe
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
					return 0, ErrIntOverflowVe
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
				return 0, ErrInvalidLengthVe
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupVe
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthVe
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthVe        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowVe          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupVe = fmt.Errorf("proto: unexpected end of group")
)
