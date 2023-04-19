package main

import (
	"unsafe"

	"github.com/CosmWasm/cosmwasm-go/example/hackatom/src"
	"github.com/CosmWasm/cosmwasm-go/std"
)

func main() {}

//export instantiate
func instantiate(env_ptr, info_ptr, msg_ptr uint32) unsafe.Pointer {
	return std.DoInstantiate(src.Instantiate, env_ptr, info_ptr, msg_ptr)
}

//export execute
func execute(env_ptr, info_ptr, msg_ptr uint32) unsafe.Pointer {
	return std.DoExecute(src.Execute, env_ptr, info_ptr, msg_ptr)
}

//export migrate
func migrate(env_ptr, msg_ptr uint32) unsafe.Pointer {
	return std.DoMigrate(src.Migrate, env_ptr, msg_ptr)
}

//export query
func query(env_ptr, msg_ptr uint32) unsafe.Pointer {
	return std.DoQuery(src.Query, env_ptr, msg_ptr)
}
