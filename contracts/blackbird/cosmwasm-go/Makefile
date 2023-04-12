.PHONY: examples test test-contracts test-std

# Set on the command line for verbose output, eg.
#   TEST_FLAG=-v make test
#   TEST_FLAG=-v -count=1

# Using a beta builder (stable version: 0.4.1)
VERSION := "0.5.0"
BUILDER := "cosmwasm/go-optimizer:${VERSION}"

tiny-build:
	rm -rf ./bin/tinyjson
	go build -o ./bin/tinyjson github.com/CosmWasm/tinyjson/tinyjson

clean:
	rm -f std/types/*_tinyjson.go
	rm -f example/hackatom/src/*_tinyjson.go

generate: tiny-build generate-std generate-contracts

generate-std:
	./bin/tinyjson -all -snake_case \
		./std/types/env.go \
		./std/types/fraction.go \
		./std/types/ibc.go \
		./std/types/msg.go \
		./std/types/query.go \
		./std/types/subcall.go \
		./std/types/systemerror.go \
		./std/types/types.go \

generate-contracts:
	./bin/tinyjson -all -snake_case \
		./example/hackatom/src/state.go \
		./example/hackatom/src/msg.go
	go generate ./example/...

test: test-std test-contracts

test-std:
	go test $(TEST_FLAG) ./std
	go test $(TEST_FLAG) ./std/mock

test-contracts:
	cd example/hackatom && $(MAKE) unit-test

examples: hackatom queue

build-docker:
	docker build -f Dockerfile -t $(BUILDER) .

# You can set a few flags via environmental variables, which are passed to docker/compile.sh eg.
#   CHECK=1 make hackatom
#
# CHECK=1 : show all imports and check for floating point ops
# PAGES=30: assign the contract more memory pages than the default 20
hackatom:
	docker run --rm -e CHECK=1 -e PAGES -v "$(CURDIR):/code" ${BUILDER} ./example/hackatom

queue:
	docker run --rm -e CHECK -e PAGES -v "$(CURDIR):/code" ${BUILDER} ./example/queue
