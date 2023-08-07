package filters

import (
	"context"
	"os"
	"sync"
	"testing"
	"time"

	"github.com/cometbft/cometbft/libs/log"
	coretypes "github.com/cometbft/cometbft/rpc/core/types"
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/eth/filters"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/evmos/ethermint/rpc/ethereum/pubsub"
)

func makeSubscription(id, event string) *Subscription {
	return &Subscription{
		id:        rpc.ID(id),
		typ:       filters.LogsSubscription,
		event:     event,
		created:   time.Now(),
		logs:      make(chan []*ethtypes.Log),
		hashes:    make(chan []common.Hash),
		headers:   make(chan *ethtypes.Header),
		installed: make(chan struct{}),
		eventCh:   make(chan coretypes.ResultEvent),
		err:       make(chan error),
	}
}

func TestFilterSystem(t *testing.T) {
	index := make(filterIndex)
	for i := filters.UnknownSubscription; i < filters.LastIndexSubscription; i++ {
		index[i] = make(map[rpc.ID]*Subscription)
	}
	es := &EventSystem{
		logger:     log.NewTMLogger(log.NewSyncWriter(os.Stdout)),
		ctx:        context.Background(),
		lightMode:  false,
		index:      index,
		topicChans: make(map[string]chan<- coretypes.ResultEvent, len(index)),
		indexMux:   new(sync.RWMutex),
		install:    make(chan *Subscription),
		uninstall:  make(chan *Subscription),
		eventBus:   pubsub.NewEventBus(),
	}
	go es.eventLoop()

	event := "event"
	sub := makeSubscription("1", event)
	es.install <- sub
	<-sub.installed
	ch, ok := es.topicChans[sub.event]
	if !ok {
		t.Error("expect topic channel exist")
	}

	sub = makeSubscription("2", event)
	es.install <- sub
	<-sub.installed
	newCh, ok := es.topicChans[sub.event]
	if !ok {
		t.Error("expect topic channel exist")
	}

	if newCh != ch {
		t.Error("expect topic channel unchanged")
	}
}
