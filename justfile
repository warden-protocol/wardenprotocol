import "cmd/justfile"

_default:
    @just --list

# regenerate wardenjs and update spaceward
wardenjs:
    cd wardenjs && just build
    cd spaceward && pnpm add @wardenprotocol/wardenjs

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
    	ghcr.io/goreleaser/goreleaser:v1.25.1 \
    	--clean --skip=publish -f ./.goreleaser-amd64.yaml

release_tag := `git tag --points-at HEAD`

# use goreleaser to build binaries, then create a GitHub release.
release-wardend: #_release-wardend-linux-amd64 _release-wardend-cross-arm64
    cat dist-linux-amd64/wardend_*_checksums.txt dist/wardend_*_checksums.txt > dist/checksums.txt
    if ! git diff-index --quiet HEAD -- || [ -z "{{release_tag}}" ]; then echo "Git working directory is dirty or current commit is not tagged"; exit 1; fi
    gh release create {{release_tag}} --title {{release_tag}} --verify-tag dist-linux-amd64/wardend_Linux_x86_64.zip dist/wardend_*.zip dist/checksums.txt


shulgin := "warden10kmgv5gzygnecf46x092ecfe5xcvvv9r870rq4"
shulgin_mnemonic := "exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge"

# run a single-node chain locally, a custom path to "wardend" can be configured
localnet bin="wardend": install
    #!/usr/bin/env bash
    set -euxo pipefail
    rm -rf ~/.warden
    {{bin}} init localnet --chain-id {{chain_id}} --default-denom uward > /dev/null
    {{bin}} config set client chain-id {{chain_id}}
    {{bin}} config set client keyring-backend test
    {{bin}} config set app minimum-gas-prices 0uward
    {{bin}} config set config consensus.timeout_commit 1s -s
    {{bin}} keys add val > /dev/null
    echo -n '{{shulgin_mnemonic}}' | {{bin}} keys add shulgin --recover > /dev/null
    {{bin}} genesis add-genesis-account val 10000000000000000000000000uward
    {{bin}} genesis add-genesis-account shulgin 10000000000000000000000000uward
    {{bin}} genesis gentx val 1000000000uward
    {{bin}} genesis collect-gentxs
    {{bin}} start --x-crisis-skip-assert-invariants
