app_name := "warden"
binary_name := app_name + "d"
chain_id := "warden_1337-1"
tag := `git describe --tags --always`
commit := `git rev-parse HEAD`
dirty := `git diff --quiet || echo "-dirty"`
version := tag + dirty
ldflags := '-ldflags "-s -w -X github.com/cosmos/cosmos-sdk/version.Name=' + app_name + ' -X github.com/cosmos/cosmos-sdk/version.AppName=' + app_name + 'd -X github.com/cosmos/cosmos-sdk/version.Version=' + version + ' -X github.com/cosmos/cosmos-sdk/version.Commit=' + commit + ' -X github.com/warden-protocol/wardenprotocol/cmd/wardend/cmd.ChainID=' + chain_id + '"'
output_dir := env("OUTPUT_DIR", "./build")

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

_release-wardend-cross-arm64:
    @docker run \
    	--rm \
    	-e CGO_ENABLED=1 \
    	-v /var/run/docker.sock:/var/run/docker.sock \
    	-v {{ invocation_directory() }}:/go/src/wardend \
    	-w /go/src/wardend \
    	ghcr.io/goreleaser/goreleaser-cross:v1.22 \
    	--clean --skip=validate --skip=publish

_release-wardend-linux-amd64:
    @docker run \
    	--platform linux/amd64 \
    	--rm \
    	-e CGO_ENABLED=1 \
    	-v /var/run/docker.sock:/var/run/docker.sock \
    	-v {{ invocation_directory() }}:/go/src/wardend \
    	-w /go/src/wardend \
    	ghcr.io/goreleaser/goreleaser:v2.1.0 \
    	--clean --skip=validate --skip=publish -f ./.goreleaser-amd64.yaml

release_tag := `git tag --points-at HEAD`

# use goreleaser to build binaries, then create a GitHub release.
release: _release-wardend-linux-amd64 _release-wardend-cross-arm64
    cat dist-linux-amd64/wardend_*_checksums.txt dist/wardend_*_checksums.txt > dist/checksums.txt
    if ! git diff-index --quiet HEAD -- || [ -z "{{release_tag}}" ]; then echo "Git working directory is dirty or current commit is not tagged"; exit 1; fi
    gh release create {{release_tag}} --title {{release_tag}} --verify-tag dist-linux-amd64/wardend_Linux_x86_64.zip dist/wardend_*.zip dist/checksums.txt

