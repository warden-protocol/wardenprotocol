package priority

import (
	"bytes"
	"fmt"
	"slices"
	"strings"
)

type Actor struct {
	ID     []byte
	Weight int

	priority int
}

type Queue struct {
	queue []*Actor

	p int
}

type QueueItem struct {
	ID     []byte
	Weight int
}

func NewQueue(items []QueueItem) Queue {
	actors := make([]*Actor, len(items))
	for i := range items {
		actors[i] = &Actor{
			ID:     items[i].ID,
			Weight: items[i].Weight,
		}
	}

	var p int
	for _, a := range actors {
		p += a.Weight
	}

	return Queue{
		queue: actors,
		p:     p,
	}
}

func (q *Queue) Add(id []byte, weight int) {
	a := &Actor{
		ID:     id,
		Weight: weight,
	}
	q.p += a.Weight
	a.priority = -(q.p + (q.p >> 3))
	q.queue = append(q.queue, a)
}

func (q *Queue) UpdateWeight(id []byte, newWeight int) {
	for _, a := range q.queue {
		if bytes.Equal(a.ID, id) {
			q.p -= a.Weight
			a.Weight = newWeight
			q.p += a.Weight
			break
		}
	}
	panic("item not found")
}

func (q *Queue) Remove(id []byte) {
	for i, a := range q.queue {
		if bytes.Equal(a.ID, id) {
			q.p -= a.Weight
			q.queue = slices.Delete(q.queue, i, i+1)

		}
	}
	panic("item not found")
}

func (q *Queue) Select() *Actor {
	// scale
	var (
		maxP = q.queue[0].priority
		minP = maxP
	)
	for _, a := range q.queue {
		if a.priority > maxP {
			maxP = a.priority
		}

		if a.priority < minP {
			minP = a.priority
		}
	}

	diff := maxP - minP
	threshold := 2 * q.p
	if diff > threshold {
		fmt.Println("scaling")
		scale := diff / threshold
		for _, a := range q.queue {
			a.priority /= scale
		}
	}

	// centering
	totalP := 0
	for _, a := range q.queue {
		totalP += a.priority
	}

	avgP := totalP / len(q.queue)
	for _, a := range q.queue {
		a.priority -= avgP
	}

	// slide
	for _, a := range q.queue {
		a.priority += a.Weight
	}
	slices.SortFunc(q.queue, func(a, b *Actor) int {
		if a.priority == b.priority {
			return bytes.Compare(b.ID, a.ID)
		}
		return int(a.priority - b.priority)
	})
	next := q.queue[len(q.queue)-1]
	next.priority -= q.p

	return next
}

func (q *Queue) String() string {
	var sb strings.Builder
	sb.WriteString("[")
	for _, a := range q.queue {
		sb.WriteString(fmt.Sprintf("%x(%d), ", a.ID, a.priority))
	}
	sb.WriteString("]")
	return sb.String()
}
