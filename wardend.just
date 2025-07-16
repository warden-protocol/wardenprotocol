app_name := "warden"
commit := `git rev-parse HEAD`
version := `git describe --tags --always --dirty`
ldflags := "-ldflags \"
    -s -w
    -X github.com/cosmos/cosmos-sdk/version.Name=" + app_name + "
    -X github.com/cosmos/cosmos-sdk/version.AppName=" + app_name + "d
    -X github.com/cosmos/cosmos-sdk/version.Version=" + version + "
    -X github.com/cosmos/cosmos-sdk/version.Commit=" + commit + '"'
build_tags := "-tags ledger"
output_dir := env("OUTPUT_DIR", "./build")

# build (wardend|faucet|wardenkms|clichain). Eg. "just build wardend".
build binary="wardend":
    go build \
        {{ build_tags }} \
        {{ ldflags }} \
        -o {{ output_dir }}/{{ binary }} \
        ./cmd/{{ binary }}

# install (wardend|faucet|wardenkms|clichain). Eg. "just install wardend".
install binary="wardend":
    go install \
        {{ build_tags }} \
        {{ ldflags }} \
        ./cmd/{{ binary }}
