package main

import (
	"fmt"
	"os"
	"path"
	"strings"

	"github.com/yoheimuta/go-protoparser/v4"
	"github.com/yoheimuta/go-protoparser/v4/parser"
)

var ProtoFiles = []Target{
	{
		ProtoFile:  "proto/warden/warden/v1beta2/tx.proto",
		ModuleFile: "warden/x/warden/keeper/msg_server.go",
	},
}

type Target struct {
	ProtoFile  string
	ModuleFile string
}

func main() {
	var isMissing bool
	for _, target := range ProtoFiles {
		f := target.ProtoFile
		msgTypes, err := findMessageTypes(f)
		if err != nil {
			panic(err)
		}

		goSrcBytes, err := os.ReadFile(target.ModuleFile)
		if err != nil {
			panic(err)
		}
		goSrc := string(goSrcBytes)

		for _, msgType := range msgTypes {
			if !strings.Contains(goSrc, msgType) {
				isMissing = true
				fmt.Printf("Not found: %s in %s\n", msgType, target.ModuleFile)
			}
		}
	}

	if isMissing {
		panic("You have proto RPCs that return an intent.MsgActionCreated but not registered in the server code.")
	}
}

func findMessageTypes(file string) ([]string, error) {
	var res []string
	reader, err := os.Open(file)
	if err != nil {
		return nil, err
	}
	defer reader.Close()

	got, err := protoparser.Parse(reader)
	if err != nil {
		return nil, err
	}

	for _, item := range got.ProtoBody {
		switch item := item.(type) {
		case *parser.Service:
			{
				for _, serviceItem := range item.ServiceBody {
					switch serviceItem := serviceItem.(type) {
					case *parser.RPC:
						if isReturningAction(serviceItem) {
							reqType := serviceItem.RPCRequest.MessageType
							res = append(res, buildTypeURL(file, reqType))
						}
					}
				}
			}
		}
	}

	return res, nil
}

func isReturningAction(rpc *parser.RPC) bool {
	return rpc.RPCResponse.MessageType == "intent.MsgActionCreated"
}

func buildTypeURL(file string, messageType string) string {
	p := path.Dir(file)
	p = strings.TrimPrefix(p, "proto/")
	p = strings.ReplaceAll(p, "/", ".")

	return fmt.Sprintf("/%s.%s", p, messageType)
}
