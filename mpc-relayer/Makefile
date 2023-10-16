# This Makefile is meant to be used by people that do not usually work
# with Go source code. If you know what GOPATH is then you probably
# don't need to bother with make.


test:
	@echo "Running tests..."
	@ go test -cover ./...	

build:
	@cd cmd/mpc-relayer && ./build_static.sh && mv mpc-relayer ../../bin/mpc-relayer
	@echo "Run \"./bin/mpc-relayer --config {config_file}\" to launch mpc-relayer server."
	@echo "Done building."

run:
	@cd cmd/mpc-relayer && ./build_static.sh && ./mpc-relayer