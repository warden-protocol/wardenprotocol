app_name := "warden"
binary_name := app_name + "d"
chain_id := "warden_1337-1"
tag := `git describe --tags --always`
commit := `git rev-parse HEAD`
dirty := `git diff --quiet || echo "-dirty"`
version := tag + dirty
ldflags := '-ldflags "-s -w -X github.com/cosmos/cosmos-sdk/version.Name=' + app_name + ' -X github.com/cosmos/cosmos-sdk/version.AppName=' + app_name + 'd -X github.com/cosmos/cosmos-sdk/version.Version=' + version + ' -X github.com/cosmos/cosmos-sdk/version.Commit=' + commit + ' -X github.com/warden-protocol/wardenprotocol/cmd/wardend/cmd.ChainID=' + chain_id + '"'
output_dir := env("OUTPUT_DIR", "./build")
libwasm_version := `go list -m -f '{{ .Version }}' github.com/CosmWasm/wasmvm/v2`
goreleaser_cross_version := 'v1.23.6'
goreleaser_version := 'v2.7.0'
release := env("RELEASE", "false")
github_token := env("GITHUB_TOKEN", "")
skip := env("SKIP", "")
current_dir := `pwd`

# build (wardend|faucet|wardenkms|clichain). Eg. "just build wardend".
build binary="wardend":
    go build \
        {{ ldflags }} \
        -o {{output_dir}}/{{binary}} \
        ./cmd/{{ binary }}

# install (wardend|faucet|wardenkms|clichain). Eg. "just install wardend".
install binary="wardend":
    go install \
        {{ ldflags }} \
        ./cmd/{{ binary }}

release-dryrun:
    @docker run \
    	--rm \
    	-e CGO_ENABLED=1 \
      -e LIBWASM_VERSION={{ libwasm_version }} \
      -e RELEASE={{ release }} \
      -e GITHUB_TOKEN={{ github_token }} \
    	-v /var/run/docker.sock:/var/run/docker.sock \
    	-v {{ current_dir }}:/go/src/wardend \
    	-w /go/src/wardend \
    	ghcr.io/goreleaser/goreleaser-cross:{{ goreleaser_cross_version }} \
      --clean \
      --skip=validate,publish

release:
    @docker run \
    	--rm \
    	-e CGO_ENABLED=1 \
      -e LIBWASM_VERSION={{ libwasm_version }} \
      -e RELEASE={{ release }} \
      -e GITHUB_TOKEN={{ github_token }} \
    	-v /var/run/docker.sock:/var/run/docker.sock \
    	-v {{ current_dir }}:/go/src/wardend \
    	-w /go/src/wardend \
    	ghcr.io/goreleaser/goreleaser-cross:{{ goreleaser_cross_version }} \
      --clean \
      --skip={{ skip }}
