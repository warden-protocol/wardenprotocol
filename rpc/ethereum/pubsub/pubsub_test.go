package pubsub

import (
	"log"
	"sort"
	"sync"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	coretypes "github.com/tendermint/tendermint/rpc/core/types"
)

func TestAddTopic(t *testing.T) {
	q := NewEventBus()
	err := q.AddTopic("kek", make(<-chan coretypes.ResultEvent))
	require.NoError(t, err)

	err = q.AddTopic("lol", make(<-chan coretypes.ResultEvent))
	require.NoError(t, err)

	err = q.AddTopic("lol", make(<-chan coretypes.ResultEvent))
	require.Error(t, err)

	topics := q.Topics()
	sort.Strings(topics)
	require.EqualValues(t, []string{"kek", "lol"}, topics)
}

func TestSubscribe(t *testing.T) {
	q := NewEventBus()
	kekSrc := make(chan coretypes.ResultEvent)

	q.AddTopic("kek", kekSrc)

	lolSrc := make(chan coretypes.ResultEvent)

	q.AddTopic("lol", lolSrc)

	kekSubC, _, err := q.Subscribe("kek")
	require.NoError(t, err)

	lolSubC, _, err := q.Subscribe("lol")
	require.NoError(t, err)

	lol2SubC, _, err := q.Subscribe("lol")
	require.NoError(t, err)

	wg := new(sync.WaitGroup)
	wg.Add(4)

	emptyMsg := coretypes.ResultEvent{}
	go func() {
		defer wg.Done()
		msg := <-kekSubC
		log.Println("kek:", msg)
		require.EqualValues(t, emptyMsg, msg)
	}()

	go func() {
		defer wg.Done()
		msg := <-lolSubC
		log.Println("lol:", msg)
		require.EqualValues(t, emptyMsg, msg)
	}()

	go func() {
		defer wg.Done()
		msg := <-lol2SubC
		log.Println("lol2:", msg)
		require.EqualValues(t, emptyMsg, msg)
	}()

	go func() {
		defer wg.Done()

		time.Sleep(time.Second)

		close(kekSrc)
		close(lolSrc)
	}()

	wg.Wait()
	time.Sleep(time.Second)
}
