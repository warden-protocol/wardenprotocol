package warden

import (
	"cosmossdk.io/math"
	sdkTypes "github.com/cosmos/cosmos-sdk/types"
	sdkQuery "github.com/cosmos/cosmos-sdk/types/query"

	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func mapSdkKeychainFees(keychainFees v1beta3.KeychainFees) KeychainFees {
	keyReq := mapSdkCoins(keychainFees.KeyReq)
	sigReq := mapSdkCoins(keychainFees.SigReq)

	return KeychainFees{
		KeyReq: keyReq,
		SigReq: sigReq,
	}
}

func mapEthKeychainFees(keychainFees KeychainFees) v1beta3.KeychainFees {
	keyReq := make([]sdkTypes.Coin, 0, len(keychainFees.KeyReq))
	for _, kr := range keychainFees.KeyReq {
		keyReq = append(keyReq, sdkTypes.NewCoin(kr.Denom, math.NewIntFromBigInt(kr.Amount)))
	}

	sigReq := make([]sdkTypes.Coin, 0, len(keychainFees.SigReq))
	for _, sr := range keychainFees.SigReq {
		sigReq = append(sigReq, sdkTypes.NewCoin(sr.Denom, math.NewIntFromBigInt(sr.Amount)))
	}

	return v1beta3.KeychainFees{
		KeyReq: keyReq,
		SigReq: sigReq,
	}
}

func mapSdkCoins(coins sdkTypes.Coins) []TypesCoin {
	c := make([]TypesCoin, 0, len(coins))
	for _, sdkCoin := range coins {
		c = append(c, TypesCoin{Denom: sdkCoin.GetDenom(), Amount: sdkCoin.Amount.BigInt()})
	}

	return c
}

func mapSdkPageResponse(pageResponse sdkQuery.PageResponse) TypesPageResponse {
	return TypesPageResponse{
		NextKey: pageResponse.GetNextKey(),
		Total:   pageResponse.GetTotal(),
	}
}

func mapEthPageRequest(pageRequest TypesPageRequest) sdkQuery.PageRequest {
	return sdkQuery.PageRequest{
		Key:        pageRequest.Key,
		Offset:     pageRequest.Offset,
		Limit:      pageRequest.Limit,
		CountTotal: pageRequest.CountTotal,
		Reverse:    pageRequest.Reverse,
	}
}
