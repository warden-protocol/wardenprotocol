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
