module gitlab.qredo.com/qrdochain/fusionchain/relayer-eth

go 1.20

require gitlab.qredo.com/qrdochain/fusionchain/go-client v0.0.0-00010101000000-000000000000

replace gitlab.qredo.com/qrdochain/fusionchain/go-client => ../go-client

// required by fusionchain/application
replace (
	github.com/99designs/keyring => github.com/cosmos/keyring v1.1.7-0.20210622111912-ef00f8ac3d76
	github.com/cosmos/cosmos-sdk v0.45.8 => ../application/cosmos-sdk
	github.com/gogo/protobuf => github.com/regen-network/protobuf v1.3.3-alpha.regen.1
	google.golang.org/grpc => google.golang.org/grpc v1.33.2
)
