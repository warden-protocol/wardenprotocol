package keeper

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestTrimExcessBytes(t *testing.T) {
	type args struct {
		txs          [][]byte
		maxSizeBytes int64
	}

	tests := []struct {
		name string
		args args
		want [][]byte
	}{
		{
			name: "don't trim",
			args: args{
				txs:          [][]byte{[]byte("tx1"), []byte("tx2")},
				maxSizeBytes: 10,
			},
			want: [][]byte{[]byte("tx1"), []byte("tx2")},
		},
		{
			name: "trim one tx precise",
			args: args{
				txs:          [][]byte{[]byte("tx1"), []byte("tx2"), []byte("tx3")},
				maxSizeBytes: 6,
			},
			want: [][]byte{[]byte("tx1"), []byte("tx2")},
		},
		{
			name: "trim one tx with 1 byte excess",
			args: args{
				txs:          [][]byte{[]byte("tx1"), []byte("tx2"), []byte("tx3")},
				maxSizeBytes: 7,
			},
			want: [][]byte{[]byte("tx1"), []byte("tx2")},
		},
		{
			name: "trim one tx with 2 bytes excess",
			args: args{
				txs:          [][]byte{[]byte("tx1"), []byte("tx2"), []byte("tx3")},
				maxSizeBytes: 8,
			},
			want: [][]byte{[]byte("tx1"), []byte("tx2")},
		},
		{
			name: "empty list",
			args: args{
				txs:          [][]byte{},
				maxSizeBytes: 8,
			},
			want: nil,
		},
		{
			name: "nil list",
			args: args{
				txs:          nil,
				maxSizeBytes: 8,
			},
			want: nil,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			require.Equal(t, tt.want, trimExcessBytes(tt.args.txs, tt.args.maxSizeBytes))
		})
	}
}

func TestInjectTx(t *testing.T) {
	type args struct {
		newTx    []byte
		position int
		appTxs   [][]byte
	}

	tests := []struct {
		name string
		args args
		want [][]byte
	}{
		{
			name: "inject at the beginning, empty list",
			args: args{
				newTx:    []byte("newTx"),
				position: 0,
				appTxs:   [][]byte{},
			},
			want: [][]byte{[]byte("newTx")},
		},
		{
			name: "inject at the beginning, non-empty list",
			args: args{
				newTx:    []byte("newTx"),
				position: 0,
				appTxs:   [][]byte{[]byte("appTx1"), []byte("appTx2")},
			},
			want: [][]byte{[]byte("newTx"), []byte("appTx1"), []byte("appTx2")},
		},
		{
			name: "position is over the length of the list, empty list",
			args: args{
				newTx:    []byte("newTx"),
				position: 2,
				appTxs:   [][]byte{},
			},
			want: [][]byte{[]byte("newTx")},
		},
		{
			name: "position is over the length of the list, non-empty list",
			args: args{
				newTx:    []byte("newTx"),
				position: 4,
				appTxs:   [][]byte{[]byte("appTx1"), []byte("appTx2")},
			},
			want: [][]byte{[]byte("appTx1"), []byte("appTx2"), []byte("newTx")},
		},
		{
			name: "position in the middle",
			args: args{
				newTx:    []byte("newTx"),
				position: 1,
				appTxs:   [][]byte{[]byte("appTx1"), []byte("appTx2")},
			},
			want: [][]byte{[]byte("appTx1"), []byte("newTx"), []byte("appTx2")},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			require.Equal(t, tt.want, injectTx(tt.args.newTx, tt.args.position, tt.args.appTxs))
		})
	}
}
