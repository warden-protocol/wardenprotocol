//go:build cosmwasm
// +build cosmwasm

package std

import (
	"encoding/binary"
	"errors"
	"strconv"
	"unsafe"

	"github.com/CosmWasm/cosmwasm-go/std/types"
)

/*
#include "stdlib.h"
extern void* db_read(void* key);
extern void db_write(void* key, void* value);
extern void db_remove(void* key);

extern unsigned db_scan(void* start_ptr, void* end_ptr, int order);
extern void* db_next(unsigned iterator_id);

extern unsigned addr_canonicalize(void* human, void* canonical);
extern unsigned addr_humanize(void* canonical, void* human);
extern unsigned addr_validate(void* human);

extern unsigned secp256k1_verify(void* hash_ptr, void* signature_ptr, void* pubkey_ptr);
extern long long secp256k1_recover_pubkey(void* hash_ptr, void* signature_ptr, int recover_param);
extern unsigned ed25519_verify(void* message_ptr, void* signature_ptr, void* pubkey_ptr);
extern unsigned ed25519_batch_verify(void* messages_ptr, void* signatures_ptr, void* pubkeys_ptr);

extern void debug(void* msg);

extern void* query_chain(void* request);
*/
import "C"

const (
	// A kibi (kilo binary)
	KI uint32 = 1024

	// The number of bytes of the memory region we pre-allocate for the result data in ExternalIterator.next
	DB_READ_KEY_BUFFER_LENGTH uint32 = 64 * KI

	// The number of bytes of the memory region we pre-allocate for the result data in ExternalStorage.get and ExternalIterator.next
	DB_READ_VALUE_BUFFER_LENGTH uint32 = 128 * KI

	// The number of bytes of the memory region we pre-allocate for the result data in queries
	QUERY_RESULT_BUFFER_LENGTH uint32 = 128 * KI

	// An upper bound for typical canonical address lengths (e.g. 20 in Cosmos SDK/Ethereum or 32 in Nano/Substrate)
	CANONICAL_ADDRESS_BUFFER_LENGTH uint32 = 32

	// An upper bound for typical human readable address formats (e.g. 42 for Ethereum hex addresses or 90 for bech32)
	HUMAN_ADDRESS_BUFFER_LENGTH uint32 = 90
)

// ====== DB ======

var (
	_ ReadonlyStorage = (*ExternalStorage)(nil)
	_ Storage         = (*ExternalStorage)(nil)
)

// ExternalStorage provides the implementation to interact
// with the VM provided storage.
type ExternalStorage struct{}

// Get implements ReadonlyStorage.Get
func (s ExternalStorage) Get(key []byte) (value []byte) {
	keyPtr := C.malloc(C.ulong(len(key)))
	regionKey := TranslateToRegion(key, uintptr(keyPtr))

	read := C.db_read(unsafe.Pointer(regionKey))
	C.free(unsafe.Pointer(keyPtr))

	if read == nil {
		return nil
	}

	b := TranslateToSlice(uintptr(read))
	return b
}

// Range implements ReadonlyStorage.Range.
func (s ExternalStorage) Range(start, end []byte, order Order) (iter Iterator) {
	var startPtr, endPtr unsafe.Pointer
	var regionStart, regionEnd uintptr
	if len(start) > 0 {
		startPtr = C.malloc(C.ulong(len(start)))
		regionStart = TranslateToRegion(start, uintptr(startPtr))
	}
	if len(end) > 0 {
		endPtr = C.malloc(C.ulong(len(end)))
		regionEnd = TranslateToRegion(end, uintptr(endPtr))
	}

	iteratorID := C.db_scan(unsafe.Pointer(regionStart), unsafe.Pointer(regionEnd), C.int(order))
	if len(start) > 0 {
		C.free(startPtr)
	}
	if len(end) > 0 {
		C.free(endPtr)
	}

	iterator := ExternalIterator{
		IteratorId: uint32(iteratorID),
	}
	return iterator
}

// Set implements Storage.Set.
func (s ExternalStorage) Set(key, value []byte) {
	ptrKey := C.malloc(C.ulong(len(key)))
	ptrVal := C.malloc(C.ulong(len(value)))
	regionKey := TranslateToRegion(key, uintptr(ptrKey))
	regionValue := TranslateToRegion(value, uintptr(ptrVal))

	C.db_write(unsafe.Pointer(regionKey), unsafe.Pointer(regionValue))
	C.free(ptrKey)
	C.free(ptrVal)
}

// Remove implements Storage.Remove.
func (s ExternalStorage) Remove(key []byte) {
	keyPtr := C.malloc(C.ulong(len(key)))
	regionKey := TranslateToRegion(key, uintptr(keyPtr))

	C.db_remove(unsafe.Pointer(regionKey))
	C.free(keyPtr)
}

var (
	_ Iterator = (*ExternalIterator)(nil)
)

type ExternalIterator struct {
	IteratorId uint32
}

func (iterator ExternalIterator) Next() (key, value []byte, err error) {
	nextResult := C.db_next(C.uint(iterator.IteratorId))
	kv := TranslateToSlice(uintptr(nextResult))
	if len(kv) == 0 {
		return nil, nil, ErrIteratorDone
	}
	head, value := splitTail(kv)
	if len(head) == 0 {
		return nil, nil, ErrIteratorDone
	}
	_, key = splitTail(head)
	if len(key) == 0 {
		return nil, nil, ErrIteratorDone
	}
	return key, value, nil
}

// ported from https://github.com/CosmWasm/cosmwasm/blob/main/packages/std/src/sections.rs#L38-L69
// format is (head, tail, len: 4 bytes)
// we read the last 4 bytes and use them to split off head and tail
func splitTail(input []byte) (head, tail []byte) {
	if len(input) < 4 {
		panic("Too short to split")
	}
	lenStart := len(input) - 4

	tailLen := int(binary.BigEndian.Uint32(input[lenStart:]))
	input = input[:lenStart]
	cut := len(input) - tailLen

	return input[:cut], input[cut:]
}

// ====== API ======

// ensure Api interface compliance at compile time
var (
	_ Api = (*ExternalApi)(nil)
)

type ExternalApi struct{}

func (api ExternalApi) CanonicalAddress(human string) (types.CanonicalAddress, error) {
	humanAddr := []byte(human)
	humanPtr := C.malloc(C.ulong(REGION_HEAD_SIZE))
	regionHuman := TranslateToRegion(humanAddr, uintptr(humanPtr))

	regionCanon, _ := Build_region(CANONICAL_ADDRESS_BUFFER_LENGTH, 0)

	ret := C.addr_canonicalize(unsafe.Pointer(regionHuman), unsafe.Pointer(regionCanon))
	C.free(humanPtr)

	if ret != 0 {
		msg := TranslateToString(uintptr(ret))
		return nil, types.GenericError("addr_canonicalize errored: " + msg)
	}

	canoAddress := TranslateToSlice(uintptr(regionCanon))

	return canoAddress, nil
}

func (api ExternalApi) HumanAddress(canonical types.CanonicalAddress) (string, error) {
	canonPtr := C.malloc(C.ulong(REGION_HEAD_SIZE))
	regionCanon := TranslateToRegion(canonical, uintptr(canonPtr))

	regionHuman, _ := Build_region(HUMAN_ADDRESS_BUFFER_LENGTH, 0)

	ret := C.addr_humanize(unsafe.Pointer(regionCanon), unsafe.Pointer(regionHuman))
	C.free(canonPtr)

	if ret != 0 {
		msg := TranslateToString(uintptr(ret))
		return "", types.GenericError("addr_humanize errored: " + msg)
	}

	humanAddress := TranslateToString(uintptr(regionHuman))

	return humanAddress, nil
}

func (api ExternalApi) ValidateAddress(human string) error {
	humanAddr := []byte(human)
	humanPtr := C.malloc(C.ulong(REGION_HEAD_SIZE))
	regionHuman := TranslateToRegion(humanAddr, uintptr(humanPtr))

	ret := C.addr_validate(unsafe.Pointer(regionHuman))
	C.free(humanPtr)

	if ret != 0 {
		msg := TranslateToString(uintptr(ret))
		return types.GenericError("addr_validate errored: " + msg)
	}
	return nil
}

func (api ExternalApi) Debug(msg string) {
	msgPtr := C.malloc(C.ulong(REGION_HEAD_SIZE))
	regionMsg := TranslateToRegion([]byte(msg), uintptr(msgPtr))
	C.debug(unsafe.Pointer(regionMsg))
	C.free(msgPtr)
}

func (api ExternalApi) VerifySecp256k1Signature(hash, signature, publicKey []byte) (ok bool, retErr error) {
	hashPtr := C.malloc(C.ulong(REGION_HEAD_SIZE))
	regionHash := TranslateToRegion(hash, uintptr(hashPtr))

	sigPtr := C.malloc(C.ulong(REGION_HEAD_SIZE))
	regionSig := TranslateToRegion(signature, uintptr(sigPtr))

	pubKeyPtr := C.malloc(C.ulong(REGION_HEAD_SIZE))
	regionPubKey := TranslateToRegion(publicKey, uintptr(pubKeyPtr))

	ret := C.secp256k1_verify(unsafe.Pointer(regionHash), unsafe.Pointer(regionSig), unsafe.Pointer(regionPubKey))
	C.free(hashPtr)
	C.free(sigPtr)
	C.free(pubKeyPtr)

	// Result is the u32 code
	var errMsg string
	switch retCode := uint32(ret); retCode {
	case 0:
		// OK: valid signature
		ok = true
	case 1:
		// OK: invalid signature
	case 3:
		errMsg = "invalid hash format"
	case 4:
		errMsg = "invalid signature format"
	case 5:
		errMsg = "invalid pubKey format"
	case 10:
		errMsg = "generic error"
	default:
		errMsg = "unknown error code (" + strconv.FormatUint(uint64(retCode), 10) + ")"
	}
	if errMsg != "" {
		retErr = types.GenericError("secp256k1_verify errored: " + errMsg)
	}

	return
}

func (api ExternalApi) RecoverSecp256k1PubKey(hash, signature []byte, recoveryParam Secp256k1RecoveryParam) (pubKey []byte, retErr error) {
	hashPtr := C.malloc(C.ulong(REGION_HEAD_SIZE))
	regionHash := TranslateToRegion(hash, uintptr(hashPtr))

	sigPtr := C.malloc(C.ulong(REGION_HEAD_SIZE))
	regionSig := TranslateToRegion(signature, uintptr(sigPtr))

	ret := C.secp256k1_recover_pubkey(unsafe.Pointer(regionHash), unsafe.Pointer(regionSig), C.int(recoveryParam))
	C.free(hashPtr)
	C.free(sigPtr)

	// Result is the u64 word (errorCode | pubKeyPtr)
	var errMsg string
	switch retCode := uint64(ret) >> 32; retCode {
	case 0:
		// OK: pubKey recovered
	case 3:
		errMsg = "invalid hash format"
	case 4:
		errMsg = "invalid signature format"
	case 6:
		errMsg = "invalid recovery param"
	case 10:
		errMsg = "generic error"
	default:
		errMsg = "unknown error code (" + strconv.FormatUint(retCode, 10) + ")"
	}
	if errMsg != "" {
		retErr = types.GenericError("secp256k1_recover_pubkey errored: " + errMsg)
		return
	}

	pubKey = TranslateToSlice(uintptr(ret & 0xFFFFFFFF))

	return
}

func (api ExternalApi) VerifyEd25519Signature(message, signature, publicKey []byte) (ok bool, retErr error) {
	msgPtr := C.malloc(C.ulong(REGION_HEAD_SIZE))
	regionMsg := TranslateToRegion(message, uintptr(msgPtr))

	sigPtr := C.malloc(C.ulong(REGION_HEAD_SIZE))
	regionSig := TranslateToRegion(signature, uintptr(sigPtr))

	pubKeyPtr := C.malloc(C.ulong(REGION_HEAD_SIZE))
	regionPubKey := TranslateToRegion(publicKey, uintptr(pubKeyPtr))

	ret := C.ed25519_verify(unsafe.Pointer(regionMsg), unsafe.Pointer(regionSig), unsafe.Pointer(regionPubKey))
	C.free(msgPtr)
	C.free(sigPtr)
	C.free(pubKeyPtr)

	// Result is the u32 code
	var errMsg string
	switch retCode := uint32(ret); retCode {
	case 0:
		// OK: valid signature
		ok = true
	case 1:
		// OK: invalid signature
	case 4:
		errMsg = "invalid signature format"
	case 5:
		errMsg = "invalid pubKey format"
	case 10:
		errMsg = "generic error"
	default:
		errMsg = "unknown error code (" + strconv.FormatUint(uint64(retCode), 10) + ")"
	}
	if errMsg != "" {
		retErr = types.GenericError("ed25519_verify errored: " + errMsg)
	}

	return
}

func (api ExternalApi) VerifyEd25519Signatures(messages, signatures, publicKeys [][]byte) (ok bool, retErr error) {
	msgsPtr, regionMsgs := BuildSectionsRegion(messages)
	if msgsPtr == nil {
		retErr = errors.New("failed to build messages region")
		return
	}
	sigsPtr, regionSigs := BuildSectionsRegion(signatures)
	if sigsPtr == nil {
		retErr = errors.New("failed to build signatures region")
		return
	}
	pubKeysPtr, regionPubKeys := BuildSectionsRegion(publicKeys)
	if pubKeysPtr == nil {
		retErr = errors.New("failed to build pubKeys region")
		return
	}

	ret := C.ed25519_batch_verify(unsafe.Pointer(regionMsgs), unsafe.Pointer(regionSigs), unsafe.Pointer(regionPubKeys))
	C.free(msgsPtr)
	C.free(sigsPtr)
	C.free(pubKeysPtr)

	// Result is the u32 code
	var errMsg string
	switch retCode := uint32(ret); retCode {
	case 0:
		// OK: valid signature
		ok = true
	case 1:
		// OK: invalid signature
	case 4:
		errMsg = "invalid signature format"
	case 5:
		errMsg = "invalid pubKey format"
	case 7:
		errMsg = "batch error"
	case 10:
		errMsg = "generic error"
	default:
		errMsg = "unknown error code (" + strconv.FormatUint(uint64(retCode), 10) + ")"
	}
	if errMsg != "" {
		retErr = types.GenericError("ed25519_batch_verify errored: " + errMsg)
	}

	return
}

// ====== Querier ======

// ensure Api interface compliance at compile time
var (
	_ Querier = (*ExternalQuerier)(nil)
)

type ExternalQuerier struct{}

func (querier ExternalQuerier) RawQuery(request []byte) ([]byte, error) {
	reqPtr := C.malloc(C.ulong(len(request)))
	regionReq := TranslateToRegion(request, uintptr(reqPtr))

	ret := C.query_chain(unsafe.Pointer(regionReq))
	C.free(reqPtr)

	if ret == nil {
		return nil, types.SystemError{Unknown: &types.Unknown{}}
	}

	response := TranslateToSlice(uintptr(ret))
	// TODO: parse this into the proper structure
	// success looks like: {"ok":{"ok":"eyJhbW91bnQiOlt7ImRlbm9tIjoid2VpIiwiYW1vdW50IjoiNzY1NDMyIn1dfQ=="}}
	var qres types.QuerierResult
	err := qres.UnmarshalJSON(response)
	if err != nil {
		return nil, err
	}
	if qres.Err != nil {
		return nil, qres.Err
	}
	if qres.Ok.Err != "" {
		return nil, types.GenericError(qres.Ok.Err)
	}
	return qres.Ok.Ok, nil
}

// use for ezjson Logging
// TODO: I think we can remove???
func Wasmlog(msg []byte) int {
	msgPtr := C.malloc(C.ulong(len(msg)))
	regionMsg := TranslateToRegion(msg, uintptr(msgPtr))
	C.debug(unsafe.Pointer(regionMsg))
	C.free(msgPtr)
	return 0
}
