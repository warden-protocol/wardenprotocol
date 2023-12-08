package database

import (
	"strings"

	badger "github.com/dgraph-io/badger/v4"
	"github.com/sirupsen/logrus"
)

// Badger implements Database
type Badger struct {
	db *badger.DB
}

func NewBadger(path string, inMemory bool) (*Badger, error) {
	options := badger.DefaultOptions(path)
	options.Logger = nil
	if inMemory {
		options.InMemory = true
		options.Dir = ""
		options.ValueDir = ""
	}
	db, err := badger.Open(options)
	if err != nil {
		return nil, err
	}
	return &Badger{
		db: db,
	}, nil
}

func NewBadgerWithLogger(path string, inMemory bool, logger *logrus.Entry) (*Badger, error) {
	options := badger.DefaultOptions(path)
	options.Logger = logger.Logger
	if inMemory {
		options.InMemory = true
		options.Dir = ""
		options.ValueDir = ""
	}
	db, err := badger.Open(options)
	if err != nil {
		return nil, err
	}
	return &Badger{
		db: db,
	}, nil
}

func (b *Badger) Persist(key string, value []byte) error {
	err := b.db.Update(func(txn *badger.Txn) error {
		err := txn.Set([]byte(key), value)
		return err
	})
	return err
}

func (b *Badger) Get(key string) ([]byte, error) {
	var valCopy []byte
	if err := b.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get([]byte(key))
		if err != nil {
			return err
		}

		err = item.Value(func(val []byte) error {
			valCopy = append([]byte{}, val...)
			return nil
		})

		if err != nil {
			return err
		}
		return nil
	}); err != nil {
		if err == badger.ErrKeyNotFound {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return valCopy, nil
}

func (b *Badger) Has(key string) (bool, error) {
	_, err := b.Get(key)
	if err != nil {
		if err != ErrNotFound {
			return false, err
		}
		return false, nil
	}
	return true, nil
}

func (b *Badger) Read(prefix string) (map[string][]byte, error) {
	result := make(map[string][]byte)
	if err := b.db.View(func(txn *badger.Txn) error {
		it := txn.NewIterator(badger.DefaultIteratorOptions)
		defer it.Close()
		p := []byte(prefix)
		for it.Seek(p); it.ValidForPrefix(p); it.Next() {
			item := it.Item()
			k := item.Key()
			err := item.Value(func(v []byte) error {
				result[strings.TrimPrefix(string(k), prefix)] = v
				return nil
			})
			if err != nil {
				return err
			}
		}
		return nil
	}); err != nil {
		return nil, err
	}

	return result, nil
}

func (b *Badger) Delete(key string) error {
	if err := b.db.Update(func(txn *badger.Txn) error {
		item, err := txn.Get([]byte(key))
		if err != nil {
			return err
		}
		if err := txn.Delete(item.Key()); err != nil {
			return err
		}
		return nil
	}); err != nil {
		if err == badger.ErrKeyNotFound {
			return ErrNotFound
		}
		return err
	}
	return nil
}

func (b *Badger) Close() error {
	return b.db.Close()
}
