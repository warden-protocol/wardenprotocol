app_name := "warden"
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
        -o {{ output_dir }}/{{ binary }} \
        ./cmd/{{ binary }}

# install (wardend|faucet|wardenkms|clichain). Eg. "just install wardend".
install binary="wardend":
    go install \
        {{ ldflags }} \
        ./cmd/{{ binary }}
