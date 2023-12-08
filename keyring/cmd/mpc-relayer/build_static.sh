# Executes a go build with git context build arguments
commit_hash=$(git rev-parse --short HEAD)
build_date="$(git show -s --format=%ci $commit_hash)" 
git diff-index --quiet $commit_hash
echo "Building mpc-relayer service (commit hash: $commit_hash, build date: $build_date, files modified: $? [1=true, 0=false])"
GO111MODULES=on \
GOPRIVATE=gitlab.qredo.com,github.com/qredo \
go build \
-ldflags "-w -linkmode external -extldflags '-static' -X 'github.com/qredo/fusionchain/mpc-relayer/pkg/common.linkedDate=$build_date' -X 'github.com/qredo/fusionchain/mpc-relayer/pkg/common.linkedCommit=$commit_hash'"