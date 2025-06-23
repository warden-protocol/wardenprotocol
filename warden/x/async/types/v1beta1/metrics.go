package v1beta1

import (
	"errors"
	"time"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func NewPluginMetrics(pluginId string) PluginMetrics {
	return PluginMetrics{
		PluginId:             pluginId,
		TasksCount:           0,
		ResultsCount:         0,
		TotalInputSizeBytes:  math.ZeroInt(),
		TotalOutputSizeBytes: math.ZeroInt(),
		TotalResultTimeMsec:  math.ZeroInt(),
		TotalFees:            sdk.NewCoins(),
		Score: &PluginScoreMetric{
			TotalScore:  math.ZeroInt(),
			ScoresCount: 0,
		},
	}
}

func IsValidScore(score uint32) bool {
	// Check if the score is within the valid range
	return score >= 1 && score <= 5
}

func NewPluginScore(pluginId string, taskId uint64, score uint32) PluginScoreItem {
	return PluginScoreItem{
		PluginId: pluginId,
		TaskId:   taskId,
		Score:    score,
	}
}

func (m *PluginMetrics) UpdateScore(score uint32) error {
	if !IsValidScore(score) {
		return errors.New("invalid score")
	}

	m.Score.TotalScore = m.Score.TotalScore.Add(math.NewInt(int64(score)))
	m.Score.ScoresCount += 1

	return nil
}

func (m *PluginMetrics) UpdateUsageMetrics(inputSize int) {
	m.TasksCount += 1
	m.TotalInputSizeBytes = m.TotalInputSizeBytes.Add(math.NewInt(int64(inputSize)))
}

func (m *PluginMetrics) UpdateResultMetrics(outputSize int, responseTime time.Duration, fees sdk.Coins) {
	m.ResultsCount += 1
	m.TotalOutputSizeBytes = m.TotalOutputSizeBytes.Add(math.NewInt(int64(outputSize)))
	m.TotalResultTimeMsec = m.TotalResultTimeMsec.Add(math.NewInt(responseTime.Milliseconds()))
	m.TotalFees = m.TotalFees.Add(fees...)
}
