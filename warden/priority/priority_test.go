package priority_test

import (
	"bytes"
	"strings"
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/warden-protocol/wardenprotocol/warden/priority"
)

func TestQueue_Select(t *testing.T) {
	tests := []struct {
		name        string
		actors      []priority.QueueItem
		wantActorID [][]byte
	}{
		{
			name: "simple",
			actors: []priority.QueueItem{
				{ID: []byte{1}, Weight: 1},
				{ID: []byte{2}, Weight: 3},
			},
			wantActorID: [][]byte{
				{2},
				{1},
				{2},
				{2},
			},
		},
		{
			name: "centering",
			actors: []priority.QueueItem{
				{ID: []byte{1}, Weight: 10},
				{ID: []byte{2}, Weight: 10},
				{ID: []byte{3}, Weight: 80000},
			},
			wantActorID: [][]byte{
				{3},
				{3},
				{3},
				{3},
				{3},
				{3},
				{3},
				{3},
				{3},
				{3},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			q := priority.NewQueue(tt.actors)
			for i, next := range tt.wantActorID {
				got := q.Select()
				t.Log(q.String())
				require.Equal(t, next, got.ID, "run #%d/%d", i+1, len(tt.wantActorID))
			}
		})
	}
}

func TestQueue_Selection1(t *testing.T) {
	queue := priority.NewQueue([]priority.QueueItem{
		{ID: []byte("foo"), Weight: 1000},
		{ID: []byte("bar"), Weight: 300},
		{ID: []byte("baz"), Weight: 330},
	})
	var elections []string
	for range 99 {
		next := queue.Select()
		elections = append(elections, string(next.ID))
	}
	expected := `foo baz foo bar foo foo baz foo bar foo foo baz foo foo bar foo baz foo foo bar` +
		` foo foo baz foo bar foo foo baz foo bar foo foo baz foo foo bar foo baz foo foo bar` +
		` foo baz foo foo bar foo baz foo foo bar foo baz foo foo foo baz bar foo foo foo baz` +
		` foo bar foo foo baz foo bar foo foo baz foo bar foo foo baz foo bar foo foo baz foo` +
		` foo bar foo baz foo foo bar foo baz foo foo bar foo baz foo foo`
	if expected != strings.Join(elections, " ") {
		t.Errorf("expected sequence of proposers was\n%v\nbut got \n%v", expected, strings.Join(elections, " "))
	}
}

func TestQueue_Selection3(t *testing.T) {
	vals := []priority.QueueItem{
		{ID: []byte("avalidator_address12"), Weight: 1},
		{ID: []byte("bvalidator_address12"), Weight: 1},
		{ID: []byte("cvalidator_address12"), Weight: 1},
		{ID: []byte("dvalidator_address12"), Weight: 1},
	}
	vset := priority.NewQueue(vals)

	// this is the order of the first 4 selection
	proposerOrder := make([]*priority.Actor, 4)
	for i := 0; i < 4; i++ {
		proposerOrder[i] = vset.Select()
	}

	// we expect that proposerOrder remains the same forever
	for i := 0; i < 10000; i++ {
		got := vset.Select()
		expected := proposerOrder[i%4].ID
		if !bytes.Equal(got.ID, expected) {
			t.Fatalf("vset.Proposer (%X) does not match expected proposer (%X) for i=%d", got, expected, i)
		}
	}
}
