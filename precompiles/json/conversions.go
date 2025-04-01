package json

import (
	"fmt"
	"math/big"
	"strings"
)

func GetIntegerFraction(value string, decimalPoints int64) (*big.Int, error) {
	// Check if the value is negative
	isNegative := strings.HasPrefix(value, "-")
	if isNegative {
		value = value[1:] // Remove the negative sign for processing
	}

	// Split the input value into integer and fractional parts
	parts := strings.Split(value, ".")
	if len(parts) > 2 {
		return nil, fmt.Errorf("invalid value format: %s", value)
	}

	// Handle the integer part
	integerPart := parts[0]
	if integerPart == "" {
		integerPart = "0"
	}

	// Handle the fractional part
	fractionalPart := ""
	if len(parts) == 2 {
		fractionalPart = parts[1]
	}

	// Combine the integer and fractional parts
	combined := integerPart + fractionalPart

	// Convert the combined string to a big.Int
	result, ok := new(big.Int).SetString(combined, 10)
	if !ok {
		return nil, fmt.Errorf("failed to convert string to big.Int: %s", combined)
	}

	// Calculate the scaling factor
	fractionLength := int64(len(fractionalPart))
	if decimalPoints > fractionLength {
		// Add trailing zeros to match the required decimal points
		scale := new(big.Int).Exp(big.NewInt(10), big.NewInt(decimalPoints-fractionLength), nil)
		result.Mul(result, scale)
	} else if decimalPoints < fractionLength {
		// Remove extra fractional digits
		scale := new(big.Int).Exp(big.NewInt(10), big.NewInt(fractionLength-decimalPoints), nil)
		result.Div(result, scale)
	}

	// Restore the negative sign if the value was negative
	if isNegative {
		result.Neg(result)
	}

	return result, nil
}
