import "cmd/justfile"
import "proto/justfile"

_default:
    @just --list

# regenerate wardenjs and update spaceward
wardenjs:
    cd wardenjs && just build
    cd spaceward && pnpm add @wardenprotocol/wardenjs

# run docs website in developer mode
docusaurus:
    cd docs && just dev

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
