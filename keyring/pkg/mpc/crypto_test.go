package mpc

import (
	"encoding/hex"
	"testing"
)

func TestExtractSerialisedSig(t *testing.T) {
	tests := []struct {
		mpcResponse *SigResponse
		wantSig     string
	}{
		{&SigResponse{
			EcR: "f1af4026396fc2fcc01cca85682396bf36e6e5b59492da80b4ef1657ee572136",
			EcS: "27f2f162292aae7d7323a6ae783e0263ab74cdd34b5ae841eb83ed739180fe84",
		}, "f1af4026396fc2fcc01cca85682396bf36e6e5b59492da80b4ef1657ee57213627f2f162292aae7d7323a6ae783e0263ab74cdd34b5ae841eb83ed739180fe84"},
	}
	for _, tt := range tests {
		gotSig, err := ExtractSerializedSigECDSA(tt.mpcResponse)
		if err != nil {
			t.Errorf("ExtractSerialisedSig() error = %v", err)
			return
		}
		hexSig := hex.EncodeToString(gotSig)
		if hexSig != tt.wantSig {
			t.Errorf("ExtractSerialisedSig() gotSig = %v, want %v", hexSig, tt.wantSig)
		}
	}
}

func TestExtractSigWithRecoveryID(t *testing.T) {
	tests := []struct {
		mpcResponse *SigResponse
		wantSig     string
	}{
		{&SigResponse{
			EcR:       "e4899cc47ab30e84aed02fe91cac71fa4e89110e81158b612c3e21b02ca37ea6",
			EcS:       "56a5dcfd089c9b8e65c386c79433f4f2e66f0f7b4804c5dd6a6c002ab29c9d9c",
			EcMessage: "31f7a65e315586ac198bd798b6629ce4903d0899476d5741a9f32e2e521b6a66",
			Pk:        "03094781d60ed612edeaa122cfe01418c6c0f2c9fc9856f78daf4bf0ad06e3b0c2",
		}, "e4899cc47ab30e84aed02fe91cac71fa4e89110e81158b612c3e21b02ca37ea656a5dcfd089c9b8e65c386c79433f4f2e66f0f7b4804c5dd6a6c002ab29c9d9c00"},
		{&SigResponse{
			EcR:       "05e4ee8785f92487b81ba683c39fc79a23f270147d90685c852a4137c41c18dd",
			EcS:       "27b9bd8e79a7779f4a424319b1028659d6ddbe11046ead1e121d3457456aa430",
			EcMessage: "66687aadf862bd776c8fc18b8e9f8e20089714856ee233b3902a591d0d5f2925",
			Pk:        "0243311589af63c2adda04fcd7792c038a05c12a4fe40351b3eb1612ff6b2e5a0e",
		}, "05e4ee8785f92487b81ba683c39fc79a23f270147d90685c852a4137c41c18dd27b9bd8e79a7779f4a424319b1028659d6ddbe11046ead1e121d3457456aa43001"},
		{&SigResponse{
			EcR:       "dbf109fb1f03b1675fa75e56a68502351e3660dece1e4de92e41f24c0c057062",
			EcS:       "39ac327b769f425884bf54a546daeecc26014e16d9a6c17d78c1347f0ec5c4d3",
			EcMessage: "ec4916dd28fc4c10d78e287ca5d9cc51ee1ae73cbfde08c6b37324cbfaac8bc5",
			Pk:        "02d415b187c6e7ce9da46ac888d20df20737d6f16a41639e68ea055311e1535dd9",
		}, "dbf109fb1f03b1675fa75e56a68502351e3660dece1e4de92e41f24c0c05706239ac327b769f425884bf54a546daeecc26014e16d9a6c17d78c1347f0ec5c4d301"},
		{&SigResponse{
			EcR:       "8edb7f362e3d082a32dbb211b475220a3f4e3d54cc7e40594a9ff7ae584a519d",
			EcS:       "34fd280d35624f61cbd8a5925da2609bc79c08bdfa53524edb59089edf145bd6",
			EcMessage: "9267d3dbed802941483f1afa2a6bc68de5f653128aca9bf1461c5d0a3ad36ed2",
			Pk:        "02d27cd27dbff481bc6fc4aa39dd19405eb6010237784ecba13bab130a4a62df5d",
		}, "8edb7f362e3d082a32dbb211b475220a3f4e3d54cc7e40594a9ff7ae584a519d34fd280d35624f61cbd8a5925da2609bc79c08bdfa53524edb59089edf145bd601"},
		{&SigResponse{
			EcR:       "d8df483d7b31d1257e127f77eca119691746c1667f494fdfeff8be7ec6883d68",
			EcS:       "5016d29e28809430e2ebf76524f30bb9f69f2943d141b53241980909c0a0247d",
			EcMessage: "d9147961436944f43cd99d28b2bbddbf452ef872b30c8279e255e7daafc7f946",
			Pk:        "02a3e107fee8879f5cf901161dbf4ff61c252ba5fec6f6407fe81b9453d244c02c",
		}, "d8df483d7b31d1257e127f77eca119691746c1667f494fdfeff8be7ec6883d685016d29e28809430e2ebf76524f30bb9f69f2943d141b53241980909c0a0247d01"},
		{&SigResponse{
			EcR:       "a36ea165beee9eac08fe2d238debf21f2354cb4313bf43d41fd9182c181670b6",
			EcS:       "7ee97334d34592c800205104e934b1b8e524d51571e36193d09201076d33dea1",
			EcMessage: "e38990d0c7fc009880a9c07c23842e886c6bbdc964ce6bdd5817ad357335ee6f",
			Pk:        "03c45753e856ad0abb06f68947604f11476c157d13b7efd54499eaa0f6918cf716",
		}, "a36ea165beee9eac08fe2d238debf21f2354cb4313bf43d41fd9182c181670b67ee97334d34592c800205104e934b1b8e524d51571e36193d09201076d33dea100"},
		{&SigResponse{
			EcR:       "de26efd64f4e777de595f57b60accfc7db3de27bce3186532466996802774aa4",
			EcS:       "0d202c48da1a5a606f8b176ea50d943b72c47414fe88df252ef9abed42658c1c",
			EcMessage: "96de8fc8c256fa1e1556d41af431cace7dca68707c78dd88c3acab8b17164c47",
			Pk:        "03eafad12fc68f35045343d4882fc2bbd461ddac1cb5392dd64e6ce451e81ae019",
		}, "de26efd64f4e777de595f57b60accfc7db3de27bce3186532466996802774aa40d202c48da1a5a606f8b176ea50d943b72c47414fe88df252ef9abed42658c1c01"},
		{&SigResponse{
			EcR:       "eb03148c314d9972c53d48f14ab2520518b9bd1ffcd9d89789098864aa969960",
			EcS:       "3e777101989822bc7f3618ceb07b8c9b4b9afd4695476300a1f30d9542020cea",
			EcMessage: "d1ec675902ef1633427ca360b290b0b3045a0d9058ddb5e648b4c3c3224c5c68",
			Pk:        "033a319270c3fd8e5f4a48f27c7b7d51ed2e1dee9f65c98170aca65496861fe82d",
		}, "eb03148c314d9972c53d48f14ab2520518b9bd1ffcd9d89789098864aa9699603e777101989822bc7f3618ceb07b8c9b4b9afd4695476300a1f30d9542020cea01"},
	}
	for _, tt := range tests {
		gotSig, err := ExtractSigWithRecoveryID(tt.mpcResponse)
		if err != nil {
			t.Fatalf("ExtractSerialisedSig() error = %v", err)
		}

		hexSig := hex.EncodeToString(gotSig.Signature)
		if hexSig != tt.wantSig {
			t.Fatalf("ExtractSerialisedSig() gotSig = %v, want %v", hexSig, tt.wantSig)
		}
	}
}
