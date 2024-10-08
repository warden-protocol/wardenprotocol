// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: warden/act/v1beta1/template.proto

package v1beta1

import (
	fmt "fmt"
	_ "github.com/cosmos/cosmos-sdk/codec/types"
	proto "github.com/cosmos/gogoproto/proto"
	ast "github.com/warden-protocol/wardenprotocol/shield/ast"
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

type Template struct {
	Id      uint64 `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	Creator string `protobuf:"bytes,2,opt,name=creator,proto3" json:"creator,omitempty"`
	Name    string `protobuf:"bytes,3,opt,name=name,proto3" json:"name,omitempty"`
	// The expression to be evaluated for this template.
	Expression *ast.Expression `protobuf:"bytes,4,opt,name=expression,proto3" json:"expression,omitempty"`
}

func (m *Template) Reset()         { *m = Template{} }
func (m *Template) String() string { return proto.CompactTextString(m) }
func (*Template) ProtoMessage()    {}
func (*Template) Descriptor() ([]byte, []int) {
	return fileDescriptor_97dfdf8dfcd7e7bf, []int{0}
}
func (m *Template) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *Template) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_Template.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *Template) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Template.Merge(m, src)
}
func (m *Template) XXX_Size() int {
	return m.Size()
}
func (m *Template) XXX_DiscardUnknown() {
	xxx_messageInfo_Template.DiscardUnknown(m)
}

var xxx_messageInfo_Template proto.InternalMessageInfo

func (m *Template) GetId() uint64 {
	if m != nil {
		return m.Id
	}
	return 0
}

func (m *Template) GetCreator() string {
	if m != nil {
		return m.Creator
	}
	return ""
}

func (m *Template) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *Template) GetExpression() *ast.Expression {
	if m != nil {
		return m.Expression
	}
	return nil
}

func init() {
	proto.RegisterType((*Template)(nil), "warden.act.v1beta1.Template")
}

func init() { proto.RegisterFile("warden/act/v1beta1/template.proto", fileDescriptor_97dfdf8dfcd7e7bf) }

var fileDescriptor_97dfdf8dfcd7e7bf = []byte{
	// 266 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x5c, 0x90, 0xcd, 0x4a, 0xc4, 0x30,
	0x14, 0x85, 0x9b, 0x5a, 0xfc, 0x89, 0xe0, 0x22, 0x88, 0xd4, 0x59, 0x84, 0xea, 0xaa, 0x1b, 0x13,
	0x46, 0xc1, 0x07, 0x10, 0x7d, 0x81, 0xe2, 0xca, 0x85, 0x90, 0xb6, 0xd7, 0x4e, 0xa1, 0x6d, 0x4a,
	0x72, 0x47, 0x67, 0x76, 0x3e, 0x82, 0x8f, 0xe5, 0x72, 0x96, 0x2e, 0xa5, 0x7d, 0x11, 0x99, 0xa4,
	0x23, 0xe2, 0x22, 0x90, 0x73, 0xf2, 0x91, 0x73, 0xef, 0xa1, 0x17, 0x6f, 0xca, 0x94, 0xd0, 0x49,
	0x55, 0xa0, 0x7c, 0x9d, 0xe7, 0x80, 0x6a, 0x2e, 0x11, 0xda, 0xbe, 0x51, 0x08, 0xa2, 0x37, 0x1a,
	0x35, 0x63, 0x1e, 0x11, 0xaa, 0x40, 0x31, 0x21, 0xb3, 0xf3, 0x4a, 0xeb, 0xaa, 0x01, 0xe9, 0x88,
	0x7c, 0xf9, 0x22, 0x55, 0xb7, 0xf6, 0xf8, 0xec, 0xd4, 0x2e, 0x6a, 0x68, 0x4a, 0xa9, 0x2c, 0x6e,
	0x8f, 0x77, 0x2f, 0xdf, 0x09, 0x3d, 0x7c, 0x9c, 0xfe, 0x65, 0x27, 0x34, 0xac, 0xcb, 0x98, 0x24,
	0x24, 0x8d, 0xb2, 0xb0, 0x2e, 0x59, 0x4c, 0x0f, 0x0a, 0x03, 0x0a, 0xb5, 0x89, 0xc3, 0x84, 0xa4,
	0x47, 0xd9, 0x4e, 0x32, 0x46, 0xa3, 0x4e, 0xb5, 0x10, 0xef, 0x39, 0xdb, 0xdd, 0xd9, 0x2d, 0xa5,
	0xb0, 0xea, 0x0d, 0x58, 0x5b, 0xeb, 0x2e, 0x8e, 0x12, 0x92, 0x1e, 0x5f, 0x9f, 0x09, 0x9f, 0x2a,
	0xb6, 0x89, 0x0f, 0xbf, 0xaf, 0xd9, 0x1f, 0xf2, 0xee, 0xf9, 0x73, 0xe0, 0x64, 0x33, 0x70, 0xf2,
	0x3d, 0x70, 0xf2, 0x31, 0xf2, 0x60, 0x33, 0xf2, 0xe0, 0x6b, 0xe4, 0xc1, 0xd3, 0x7d, 0x55, 0xe3,
	0x62, 0x99, 0x8b, 0x42, 0xb7, 0xd2, 0x2f, 0x7b, 0xe5, 0xa6, 0x2e, 0x74, 0x33, 0xe9, 0x7f, 0x52,
	0xae, 0x5c, 0x61, 0xb8, 0xee, 0xc1, 0xee, 0x6a, 0xcb, 0xf7, 0x1d, 0x74, 0xf3, 0x13, 0x00, 0x00,
	0xff, 0xff, 0x76, 0x89, 0x49, 0x8e, 0x53, 0x01, 0x00, 0x00,
}

func (m *Template) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *Template) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *Template) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.Expression != nil {
		{
			size, err := m.Expression.MarshalToSizedBuffer(dAtA[:i])
			if err != nil {
				return 0, err
			}
			i -= size
			i = encodeVarintTemplate(dAtA, i, uint64(size))
		}
		i--
		dAtA[i] = 0x22
	}
	if len(m.Name) > 0 {
		i -= len(m.Name)
		copy(dAtA[i:], m.Name)
		i = encodeVarintTemplate(dAtA, i, uint64(len(m.Name)))
		i--
		dAtA[i] = 0x1a
	}
	if len(m.Creator) > 0 {
		i -= len(m.Creator)
		copy(dAtA[i:], m.Creator)
		i = encodeVarintTemplate(dAtA, i, uint64(len(m.Creator)))
		i--
		dAtA[i] = 0x12
	}
	if m.Id != 0 {
		i = encodeVarintTemplate(dAtA, i, uint64(m.Id))
		i--
		dAtA[i] = 0x8
	}
	return len(dAtA) - i, nil
}

func encodeVarintTemplate(dAtA []byte, offset int, v uint64) int {
	offset -= sovTemplate(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *Template) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.Id != 0 {
		n += 1 + sovTemplate(uint64(m.Id))
	}
	l = len(m.Creator)
	if l > 0 {
		n += 1 + l + sovTemplate(uint64(l))
	}
	l = len(m.Name)
	if l > 0 {
		n += 1 + l + sovTemplate(uint64(l))
	}
	if m.Expression != nil {
		l = m.Expression.Size()
		n += 1 + l + sovTemplate(uint64(l))
	}
	return n
}

func sovTemplate(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozTemplate(x uint64) (n int) {
	return sovTemplate(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *Template) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTemplate
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
			return fmt.Errorf("proto: Template: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: Template: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Id", wireType)
			}
			m.Id = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTemplate
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
					return ErrIntOverflowTemplate
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
				return ErrInvalidLengthTemplate
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTemplate
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Creator = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Name", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTemplate
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
				return ErrInvalidLengthTemplate
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTemplate
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Name = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Expression", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTemplate
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
				return ErrInvalidLengthTemplate
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthTemplate
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if m.Expression == nil {
				m.Expression = &ast.Expression{}
			}
			if err := m.Expression.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipTemplate(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTemplate
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
func skipTemplate(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowTemplate
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
					return 0, ErrIntOverflowTemplate
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
					return 0, ErrIntOverflowTemplate
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
				return 0, ErrInvalidLengthTemplate
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupTemplate
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthTemplate
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthTemplate        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowTemplate          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupTemplate = fmt.Errorf("proto: unexpected end of group")
)
