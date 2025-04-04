package json

import (
	"errors"
)

func ensureValidDecimalPoints(decimalPoints int64) error {
	if decimalPoints < 0 {
		return errors.New("decimal points cannot be negative")
	}

	if decimalPoints > 18 {
		return errors.New("decimal points cannot exceed 18")
	}

	return nil
}
