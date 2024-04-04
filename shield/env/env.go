package env

import "github.com/warden-protocol/wardenprotocol/shield/object"

type Environment interface {
	Get(name string) (object.Object, bool)
}
