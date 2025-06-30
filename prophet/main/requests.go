package main

import (
	"fmt"

	cosmosmath "cosmossdk.io/math"
)

func main() {
	// client := pricepred.NewClient(&http.Client{}, &url.URL{
	// 	Scheme: "https",
	// 	Host:   "tpc.devnet.wardenprotocol.org",
	// })

	// inputData := pricepred.PricePredictorInputData{
	// 	Date:              big.NewInt(1749254400),                   // Replace with actual date
	// 	Tokens:            []string{"bitcoin"},                      // Example tokens
	// 	Metrics:           []*big.Int{big.NewInt(0), big.NewInt(7)}, // Example metrics
	// 	FalsePositiveRate: [2]uint64{1, 100},                        // Example false positive rates
	// }

	// req, err := inputData.ToPredictRequest()
	// if err != nil {
	// 	panic(err)
	// }

	// res, err := client.Predict(context.TODO(), req)
	// if err != nil {
	// 	panic(err)
	// }

	// var backtestingRes *pricepred.BacktestingResponse

	// if len(inputData.Metrics) > 0 {
	// 	res, _ := client.Backtesting(context.TODO(), pricepred.BacktestingRequest(req))
	// 	backtestingRes = &res
	// }

	// outputData, err := pricepred.BuildOutputData(inputData, req, res, backtestingRes)
	// if err != nil {
	// 	panic(err)
	// }

	// encodedRes, err := json.Marshal(outputData)
	// if err != nil {
	// 	panic(err)
	// }

	// fmt.Println("Output Data:", string(encodedRes))
	precision := int64(6)
	res := cosmosmath.LegacyNewDecFromIntWithPrec(cosmosmath.NewIntFromUint64(100), precision)
	fmt.Println(res)
}
