package rpc

import (
	"encoding/json"
	"fmt"
	"net/url"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/gorilla/websocket"
	"github.com/stretchr/testify/require"
)

var (
	HOST_WS = os.Getenv("HOST_WS")
	wsUrl   string
)

func init() {
	if HOST_WS == "" {
		HOST_WS = "localhost:8542"
	}

	u := url.URL{Scheme: "ws", Host: HOST_WS, Path: ""}
	wsUrl = u.String()
}

func TestWsSingleRequest(t *testing.T) {
	t.Log("test simple rpc request net_version with Websocket")

	wc, _, err := websocket.DefaultDialer.Dial(wsUrl, nil)
	require.NoError(t, err)
	defer wc.Close()

	wsWriteMessage(t, wc, `{"jsonrpc":"2.0","method":"net_version","params":[],"id":1}`)

	time.Sleep(1 * time.Second)
	mb := readMessage(t, wc)
	msg := jsonUnmarshal(t, mb)
	result, ok := msg["result"].(string)
	require.True(t, ok)
	require.Equal(t, "9000", result)
}

func TestWsBatchRequest(t *testing.T) {
	t.Log("test batch request with Websocket")

	wc, _, err := websocket.DefaultDialer.Dial(wsUrl, nil)
	require.NoError(t, err)
	defer wc.Close()

	wsWriteMessage(t, wc, `[{"jsonrpc":"2.0","method":"net_version","params":[],"id":1},{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":2}]`)

	time.Sleep(1 * time.Second)
	mb := readMessage(t, wc)

	var msg []map[string]interface{}
	err = json.Unmarshal(mb, &msg)
	require.NoError(t, err)
	require.Equal(t, 2, len(msg))

	// net_version
	resNetVersion := msg[0]
	result, ok := resNetVersion["result"].(string)
	require.True(t, ok)
	require.Equal(t, "9000", result)
	id, ok := resNetVersion["id"].(float64)
	require.True(t, ok)
	require.Equal(t, 1, int(id))

	// eth_protocolVersion
	resEthProtocolVersion := msg[1]
	result, ok = resEthProtocolVersion["result"].(string)
	require.True(t, ok)
	require.Equal(t, "0x41", result)
	id, ok = resEthProtocolVersion["id"].(float64)
	require.True(t, ok)
	require.Equal(t, 2, int(id))
}

func TestWsEth_subscribe_newHeads(t *testing.T) {
	t.Log("test eth_subscribe newHeads with Websocket")

	wc, _, err := websocket.DefaultDialer.Dial(wsUrl, nil)
	require.NoError(t, err)
	defer wc.Close()

	wsWriteMessage(t, wc, `{"id":1,"method":"eth_subscribe","params":["newHeads",{}]}`)

	time.Sleep(1 * time.Second)
	mb := readMessage(t, wc)
	msg := jsonUnmarshal(t, mb)
	subscribeId, ok := msg["result"].(string)
	require.True(t, ok)
	require.True(t, strings.HasPrefix(subscribeId, "0x"))

	time.Sleep(3 * time.Second)
	mb = readMessage(t, wc)
	msg = jsonUnmarshal(t, mb)
	method, ok := msg["method"].(string)
	require.Equal(t, "eth_subscription", method)

	// id should not exist with eth_subscription event
	_, ok = msg["id"].(float64)
	require.False(t, ok)

	wsUnsubscribe(t, wc, subscribeId) // eth_unsubscribe
}

func TestWsEth_subscribe_log(t *testing.T) {
	t.Log("test eth_subscribe log with websocket")

	wc, _, err := websocket.DefaultDialer.Dial(wsUrl, nil)
	require.NoError(t, err)
	defer wc.Close()

	wsWriteMessage(t, wc, fmt.Sprintf(`{"jsonrpc":"2.0","id":1,"method":"eth_subscribe","params":["logs",{"topics":["%s", "%s"]}]}`, helloTopic, worldTopic))

	time.Sleep(1 * time.Second)
	mb := readMessage(t, wc)
	msg := jsonUnmarshal(t, mb)
	subscribeId, ok := msg["result"].(string)
	require.True(t, ok)
	require.True(t, strings.HasPrefix(subscribeId, "0x"))

	// do something here to receive subscription messages
	deployTestContractWithFunction(t)

	time.Sleep(3 * time.Second)
	mb = readMessage(t, wc)
	msg = jsonUnmarshal(t, mb)
	method, ok := msg["method"].(string)
	require.Equal(t, "eth_subscription", method)

	// id should not exist with eth_subscription event
	_, ok = msg["id"].(float64)
	require.False(t, ok)

	wsUnsubscribe(t, wc, subscribeId) // eth_unsubscribe
}

func wsWriteMessage(t *testing.T, wc *websocket.Conn, jsonStr string) {
	t.Logf("send: %s", jsonStr)
	err := wc.WriteMessage(websocket.TextMessage, []byte(jsonStr))
	require.NoError(t, err)
}

func wsUnsubscribe(t *testing.T, wc *websocket.Conn, subscribeId string) {
	t.Logf("eth_unsubscribe %s", subscribeId)
	wsWriteMessage(t, wc, fmt.Sprintf(`{"id":1,"method":"eth_unsubscribe","params":["%s"]}`, subscribeId))

	time.Sleep(1 * time.Second)
	mb := readMessage(t, wc)
	msg := jsonUnmarshal(t, mb)

	result, ok := msg["result"].(bool)
	require.True(t, ok)
	require.True(t, result)
}

func readMessage(t *testing.T, wc *websocket.Conn) []byte {
	_, mb, err := wc.ReadMessage()
	require.NoError(t, err)
	t.Logf("recv: %s", mb)
	return mb
}

func jsonUnmarshal(t *testing.T, mb []byte) map[string]interface{} {
	var msg map[string]interface{}
	err := json.Unmarshal(mb, &msg)
	require.NoError(t, err)
	return msg
}
