package ingress

import (
	lru "github.com/hashicorp/golang-lru/v2"
)

type getIDer interface {
	GetID() uint64
}

// dedup returns a channel that emits unique requests
func dedup[T getIDer](in <-chan T) (<-chan T, error) {
	seen, err := lru.New[uint64, struct{}](10000)
	if err != nil {
		return nil, err
	}
	out := make(chan T)

	go func() {
		defer close(out)
		for req := range in {
			if seen.Contains(req.GetID()) {
				continue
			}
			seen.Add(req.GetID(), struct{}{})
			out <- req
		}
	}()

	return out, nil
}
