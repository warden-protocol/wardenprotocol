package app

import (
	"testing"
	"time"

	"cosmossdk.io/core/comet"
	"github.com/stretchr/testify/require"
)

type stubEvidence struct {
	comet.Evidence
	height int64
}

func (e stubEvidence) Height() int64 { return e.height }
func (e stubEvidence) Time() time.Time {
	return time.Time{}
}

type stubEvidenceList []comet.Evidence

func (l stubEvidenceList) Len() int                 { return len(l) }
func (l stubEvidenceList) Get(i int) comet.Evidence { return l[i] }

type stubBlockInfo struct {
	comet.BlockInfo
	evidence stubEvidenceList
}

func (b stubBlockInfo) GetEvidence() comet.EvidenceList { return b.evidence }

func heights(l comet.EvidenceList) []int64 {
	out := make([]int64, 0, l.Len())
	for i := 0; i < l.Len(); i++ {
		out = append(out, l.Get(i).Height())
	}
	return out
}

func TestRecoveryFilteredBlockInfo(t *testing.T) {
	tests := []struct {
		name string
		in   []int64
		want []int64
	}{
		{
			name: "drops every replaced height",
			in:   []int64{10136089, 10136090, 10136091},
			want: []int64{},
		},
		{
			name: "drops anything below the bound",
			in:   []int64{1, recoveryEvidenceHeight - 1},
			want: []int64{},
		},
		{
			name: "keeps the first height above the bound",
			in:   []int64{recoveryEvidenceHeight + 1},
			want: []int64{recoveryEvidenceHeight + 1},
		},
		{
			name: "drops only at or below the bound from a mixed list",
			in: []int64{
				10136089, recoveryEvidenceHeight + 1,
				10136091, recoveryEvidenceHeight + 2,
			},
			want: []int64{recoveryEvidenceHeight + 1, recoveryEvidenceHeight + 2},
		},
		{
			name: "empty stays empty",
			in:   []int64{},
			want: []int64{},
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			ev := make(stubEvidenceList, 0, len(tc.in))
			for _, h := range tc.in {
				ev = append(ev, stubEvidence{height: h})
			}

			got := recoveryFilteredBlockInfo{stubBlockInfo{evidence: ev}}.GetEvidence()

			require.Equal(t, tc.want, heights(got))
		})
	}
}
