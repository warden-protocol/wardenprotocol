package rpc

import (
	"encoding/json"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/crypto"
)

func TestPersonal_ListAccounts(t *testing.T) {
	t.Skip("skipping TestPersonal_ListAccounts")

	rpcRes := Call(t, "personal_listAccounts", []string{})

	var res []hexutil.Bytes
	err := json.Unmarshal(rpcRes.Result, &res)
	require.NoError(t, err)
	require.Equal(t, 1, len(res))
}

func TestPersonal_NewAccount(t *testing.T) {
	t.Skip("skipping TestPersonal_NewAccount")

	rpcRes := Call(t, "personal_newAccount", []string{"password"})
	var addr common.Address
	err := json.Unmarshal(rpcRes.Result, &addr)
	require.NoError(t, err)

	rpcRes = Call(t, "personal_listAccounts", []string{})
	var res []hexutil.Bytes
	err = json.Unmarshal(rpcRes.Result, &res)
	require.NoError(t, err)
	require.Equal(t, 2, len(res))
}

func TestPersonal_Sign(t *testing.T) {
	t.Skip("skipping TestPersonal_Sign")

	rpcRes := Call(t, "personal_unlockAccount", []interface{}{hexutil.Bytes(from), ""})
	require.Nil(t, rpcRes.Error)

	rpcRes = Call(t, "personal_sign", []interface{}{hexutil.Bytes{0x88}, hexutil.Bytes(from), ""})
	require.Nil(t, rpcRes.Error)
	var res hexutil.Bytes
	err := json.Unmarshal(rpcRes.Result, &res)
	require.NoError(t, err)
	require.Equal(t, 65, len(res))
	// TODO: check that signature is same as with geth, requires importing a key
}

func TestPersonal_ImportRawKey(t *testing.T) {
	t.Skip("skipping TestPersonal_ImportRawKey")

	privkey, err := crypto.GenerateKey()
	require.NoError(t, err)

	// parse priv key to hex
	hexPriv := common.Bytes2Hex(crypto.FromECDSA(privkey))
	rpcRes := Call(t, "personal_importRawKey", []string{hexPriv, "password"})

	var res hexutil.Bytes
	err = json.Unmarshal(rpcRes.Result, &res)
	require.NoError(t, err)

	addr := crypto.PubkeyToAddress(privkey.PublicKey)
	resAddr := common.BytesToAddress(res)

	require.Equal(t, addr.String(), resAddr.String())
}

func TestPersonal_EcRecover(t *testing.T) {
	t.Skip("skipping TestPersonal_EcRecover")

	data := hexutil.Bytes{0x88}
	rpcRes := Call(t, "personal_sign", []interface{}{data, hexutil.Bytes(from), ""})

	var res hexutil.Bytes
	err := json.Unmarshal(rpcRes.Result, &res)
	require.NoError(t, err)
	require.Equal(t, 65, len(res))

	rpcRes = Call(t, "personal_ecRecover", []interface{}{data, res})
	var ecrecoverRes common.Address
	err = json.Unmarshal(rpcRes.Result, &ecrecoverRes)
	require.NoError(t, err)
	require.Equal(t, from, ecrecoverRes[:])
}

func TestPersonal_UnlockAccount(t *testing.T) {
	t.Skip("skipping TestPersonal_UnlockAccount")

	pswd := "nootwashere"
	rpcRes := Call(t, "personal_newAccount", []string{pswd})
	var addr common.Address
	err := json.Unmarshal(rpcRes.Result, &addr)
	require.NoError(t, err)

	// try to sign, should be locked
	_, err = CallWithError("personal_sign", []interface{}{hexutil.Bytes{0x88}, addr, ""})
	require.Error(t, err)

	rpcRes = Call(t, "personal_unlockAccount", []interface{}{addr, ""})
	var unlocked bool
	err = json.Unmarshal(rpcRes.Result, &unlocked)
	require.NoError(t, err)
	require.True(t, unlocked)

	// try to sign, should work now
	rpcRes = Call(t, "personal_sign", []interface{}{hexutil.Bytes{0x88}, addr, pswd})
	var res hexutil.Bytes
	err = json.Unmarshal(rpcRes.Result, &res)
	require.NoError(t, err)
	require.Equal(t, 65, len(res))
}

func TestPersonal_LockAccount(t *testing.T) {
	t.Skip("skipping TestPersonal_LockAccount")

	pswd := "nootwashere"
	rpcRes := Call(t, "personal_newAccount", []string{pswd})
	var addr common.Address
	err := json.Unmarshal(rpcRes.Result, &addr)
	require.NoError(t, err)

	rpcRes = Call(t, "personal_unlockAccount", []interface{}{addr, ""})
	var unlocked bool
	err = json.Unmarshal(rpcRes.Result, &unlocked)
	require.NoError(t, err)
	require.True(t, unlocked)

	rpcRes = Call(t, "personal_lockAccount", []interface{}{addr})
	var locked bool
	err = json.Unmarshal(rpcRes.Result, &locked)
	require.NoError(t, err)
	require.True(t, locked)

	// try to sign, should be locked
	_, err = CallWithError("personal_sign", []interface{}{hexutil.Bytes{0x88}, addr, ""})
	require.Error(t, err)
}

func TestPersonal_Unpair(t *testing.T) {
	_, err := CallWithError("personal_unpair", []interface{}{"", ""})
	require.Equal(t, "smartcard wallet not supported yet", err.Error())
}

func TestPersonal_InitializeWallet(t *testing.T) {
	_, err := CallWithError("personal_initializeWallet", []interface{}{""})
	require.Equal(t, "smartcard wallet not supported yet", err.Error())
}

func TestPersonal_ListWallets(t *testing.T) {
	rpcRes := Call(t, "personal_listWallets", []interface{}{})
	var res []hexutil.Bytes
	err := json.Unmarshal(rpcRes.Result, &res)
	require.NoError(t, err)
	require.Equal(t, ([]hexutil.Bytes)(nil), res)
}
