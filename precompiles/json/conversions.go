package json

import (
	"fmt"
	"math/big"
	"strings"
)

func ToInteger(value string, decimalPoints int64) (*big.Int, error) {
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

func ToFloat(number *big.Int, decimalPoints int64) (string, error) {
	if decimalPoints < 0 {
		return "", fmt.Errorf("decimal points cannot be negative")
	}

	if decimalPoints == 0 {
		return number.String(), nil
	}

	// Convert the number to a string
	numberStr := number.String()

	// Handle the case where the number is negative
	isNegative := strings.HasPrefix(numberStr, "-")
	if isNegative {
		numberStr = numberStr[1:] // Remove the negative sign for processing
	}

	// Add leading zeros if the number of digits is less than decimalPoints
	if int64(len(numberStr)) <= decimalPoints {
		numberStr = strings.Repeat("0", int(decimalPoints)-len(numberStr)+1) + numberStr
	}

	// Split the number into integer and fractional parts
	integerPart := numberStr[:len(numberStr)-int(decimalPoints)]
	fractionalPart := numberStr[len(numberStr)-int(decimalPoints):]

	// Remove leading zeros from the integer part
	integerPart = strings.TrimLeft(integerPart, "0")
	if integerPart == "" {
		integerPart = "0"
	}

	// Remove trailing zeros from the fractional part
	fractionalPart = strings.TrimRight(fractionalPart, "0")
	if fractionalPart == "" {
		fractionalPart = "0"
	}

	// Combine the integer and fractional parts
	result := integerPart + "." + fractionalPart

	// Restore the negative sign if the number was negative
	if isNegative {
		result = "-" + result
	}

	return result, nil
}
