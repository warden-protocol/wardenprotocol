.PHONY: test build unit-test integration-test

PACKAGE=hackatom

# Set on the command line for verbose output, eg.
# TEST_FLAG=-v make test
TEST_FLAG=-v -count=1

test: unit-test integration-test

unit-test:
	go test $(TEST_FLAG) ./src

integration-test: build
	go test $(TEST_FLAG) ./integration

build:
	../../scripts/compile.sh $(PACKAGE)
	@mv -f ../../$(PACKAGE).wasm .
	@rm -f ../../$(PACKAGE).wat

fmt:
	go fmt ./...