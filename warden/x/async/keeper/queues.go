// Copyright (c) 2025 Warden Labs. All Rights Reserved.
//
// ** RESTRICTED LICENSE **
//
// This file is part of the 'async' module. It is NOT licensed
// under the Apache 2.0 license governing the rest of the project.
// Refer to the LICENSE file in this module's directory for full terms.
// Use, modification, and distribution are strictly limited.
// Do NOT use this file unless you agree to the terms stated in that license.
//
// SPDX-FileCopyrightText: 2025 Warden Labs
// SPDX-License-Identifier: LicenseRef-Proprietary-RestrictedModule

package keeper

import (
	"context"
	"errors"
	"math"

	"cosmossdk.io/collections"
	"cosmossdk.io/collections/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type (
	// QueueID uniquely identifies a priority queue.
	QueueID string

	// Weight represents how much a participant should be prioritized in a
	// priority queue.
	Weight int64

	// Priority is a [Weight] in specific point in time. It changes over
	// time to represent the current participant position in the queue.
	Priority = Weight

	// QueueWeightCollection maps all the participants of the queues into
	// their respective [Weight].
	QueueWeightCollection = collections.Map[collections.Pair[
		QueueID,
		sdk.ConsAddress,
	], Weight]

	// QueueWeightCollection maps all the participants of the queues into
	// their respective [Priority].
	QueuePriorityCollection = collections.Map[collections.Pair[
		QueueID,
		sdk.ConsAddress,
	], Priority]

	// QueueTotalWeightCollection track the sum of participants' [Weight]
	// for a queue.
	//
	// INVARIANT:
	// QueueTotalWeightCollection(queueID) = sum(
	//   QueueWeightCollection(queueID, addr) for each addr in QueueWeightCollection
	// ).
	QueueTotalWeightCollection = collections.Map[QueueID, Weight]
)

var (
	QueueIDKey = codec.NewStringKeyCodec[QueueID]()

	WeightKey   = codec.NewInt64Key[Weight]()
	WeightValue = codec.KeyToValueCodec(WeightKey)

	PriorityKey   = codec.NewInt64Key[Priority]()
	PriorityValue = codec.KeyToValueCodec(PriorityKey)
)

// QueueNext returns the next item of a queue.
//
// The algorithm implemented is described at:
// https://docs.cometbft.com/v1.0/spec/consensus/proposer-selection.
func (k *Keeper) QueueNext(ctx context.Context, id QueueID) (sdk.ConsAddress, error) {
	// the selection process has three phases:
	// - scale
	// - centering
	// - slide
	// after this, the participant with the highest priority value will be
	// returned, and pushed at the end of the queue

	totalWeight, err := k.queueTotalWeights.Get(ctx, id)
	if err != nil {
		return nil, err
	}

	if totalWeight == 0 {
		return nil, errors.New("queue is empty")
	}

	// load queuePriorities for QueueID into memory
	rng := collections.NewPrefixedPairRange[QueueID, sdk.ConsAddress](id)
	it, err := k.queuePriorities.Iterate(ctx, rng)
	if err != nil {
		return nil, err
	}
	m, err := it.KeyValues()
	if err != nil {
		return nil, err
	}
	if err := it.Close(); err != nil {
		return nil, err
	}

	// scale
	var (
		maxP Priority = math.MinInt64
		minP Priority = math.MaxInt64
	)
	for _, kv := range m {
		if kv.Value > maxP {
			maxP = kv.Value
		}

		if kv.Value < minP {
			minP = kv.Value
		}
	}

	diff := maxP - minP
	threshold := 2 * totalWeight
	if diff > threshold {
		scale := diff / threshold
		for i, kv := range m {
			kv.Value /= scale
			m[i] = kv
		}
	}

	// centering
	var totalP Priority
	for _, kv := range m {
		totalP += kv.Value
	}

	avgP := totalP / Priority(len(m))
	for i, kv := range m {
		kv.Value -= avgP
		m[i] = kv
	}

	// slide
	var (
		nextP Priority = math.MinInt64
		next  collections.Pair[QueueID, sdk.ConsAddress]
	)
	for i, kv := range m {
		weight, err := k.queueWeights.Get(ctx, kv.Key)
		if err != nil {
			return nil, err
		}

		newP := kv.Value + weight
		kv.Value = newP

		m[i] = kv

		if newP > nextP {
			nextP = newP
			next = kv.Key
		}
	}

	// persist updates in db
	for _, kv := range m {
		// push back the chosen participant by totalWeight
		if kv.Key == next {
			kv.Value -= totalWeight
		}

		if err := k.queuePriorities.Set(ctx, kv.Key, kv.Value); err != nil {
			return nil, err
		}
	}

	return next.K2(), nil
}

// newQueueParticipant adds a new participant to a queue.
func (k *Keeper) newQueueParticipant(ctx context.Context, id QueueID, addr sdk.ConsAddress, weight Weight) error {
	if err := k.queueWeights.Set(ctx, collections.Join(id, addr), weight); err != nil {
		return err
	}

	totalWeight, err := k.queueTotalWeights.Get(ctx, id)
	if err != nil && !errors.Is(err, collections.ErrNotFound) {
		return err
	}

	newQueueTotalWeight := totalWeight + weight
	if err := k.queueTotalWeights.Set(ctx, id, newQueueTotalWeight); err != nil {
		return err
	}

	// See https://github.com/tendermint/tendermint/pull/2785#discussion_r235038971
	// for more context on this small initial penalty.
	initialPriority := -(newQueueTotalWeight + (newQueueTotalWeight >> 3))

	return k.queuePriorities.Set(ctx, collections.Join(id, addr), initialPriority)
}

// removeQueueParticipant removes a participant from a queue.
func (k *Keeper) removeQueueParticipant(ctx context.Context, id QueueID, addr sdk.ConsAddress) error {
	weight, err := k.queueWeights.Get(ctx, collections.Join(id, addr))
	if err != nil {
		return err
	}

	totalWeight, err := k.queueTotalWeights.Get(ctx, id)
	if err != nil && !errors.Is(err, collections.ErrNotFound) {
		return err
	}

	newQueueTotalWeight := totalWeight - weight
	if err := k.queueTotalWeights.Set(ctx, id, newQueueTotalWeight); err != nil {
		return err
	}

	if err := k.queueWeights.Remove(ctx, collections.Join(id, addr)); err != nil {
		return err
	}

	if err := k.queuePriorities.Remove(ctx, collections.Join(id, addr)); err != nil {
		return err
	}

	return nil
}

// updateQueueWeight updates the [Weight] of a participant of a queue.
func (k *Keeper) updateQueueWeight(ctx context.Context, id QueueID, addr sdk.ConsAddress, newWeight Weight) error {
	oldWeight, err := k.queueWeights.Get(ctx, collections.Join(id, addr))
	if err != nil {
		return err
	}

	totalWeight, err := k.queueTotalWeights.Get(ctx, id)
	if err != nil && !errors.Is(err, collections.ErrNotFound) {
		return err
	}

	newQueueTotalWeight := totalWeight - oldWeight + newWeight
	if err := k.queueTotalWeights.Set(ctx, id, newQueueTotalWeight); err != nil {
		return err
	}

	if err := k.queueWeights.Set(ctx, collections.Join(id, addr), newWeight); err != nil {
		return err
	}

	return nil
}
