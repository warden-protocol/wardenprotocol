// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
package database

import (
	"fmt"
	"sync"
	"testing"
)

func TestDB(t *testing.T) {
	tests := []struct {
		name string
		db   func() Database
	}{
		{
			name: "memory",
			db: func() Database {
				return NewMemory()
			},
		},
		{
			name: "badger",
			db: func() Database {
				db, err := NewBadger("", true)
				if err != nil {
					t.Fatal(err)
				}
				return db
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			fooMaster := NewPrefixDB("foo", tt.db()) // foo.Key => Value
			foo := NewPrefixDB("sub", fooMaster)     // foo.sub.Key => Value
			bar := NewPrefixDB("bar", tt.db())
			t.Run("Upsert", func(t *testing.T) {
				if err := foo.Persist("foo", []byte("foo")); err != nil {
					t.Fatal(err)
				}

				if err := fooMaster.Persist("master", []byte("master")); err != nil {
					t.Fatal(err)
				}

				if err := bar.Persist("bar", []byte("bar")); err != nil {
					t.Fatal(err)
				}
			})

			t.Run("Get", func(t *testing.T) {
				value, err := foo.Get("foo")
				if err != nil {
					t.Fatal(err)
				}
				if got, want := string(value), "foo"; got != want {
					t.Errorf("got %v want %v", got, want)
				}

				_, err = foo.Get("bar")
				if got, want := err, ErrNotFound; got != want {
					t.Errorf("got %v want %v", got, want)
				}
			})

			t.Run("Has", func(t *testing.T) {
				exist, err := foo.Has("foo")
				if err != nil {
					t.Fatal(err)
				}
				if !exist {
					t.Errorf("missing key 'foo'")
				}
				exist, err = foo.Has("bar")
				if err != nil {
					t.Fatal(err)
				}
				if exist {
					t.Errorf("invalid key 'bar' present")
				}
			})

			t.Run("Read", func(t *testing.T) {
				result, err := foo.Read("")
				if err != nil {
					t.Fatal(err)
				}
				if len(result) != 1 {
					t.Errorf("got %d results", len(result))
				}
				if _, exist := result["foo"]; !exist {
					t.Errorf("missing key 'foo'")
				}
				if _, exist := result["bar"]; exist {
					t.Errorf("invalid key 'bar' present")
				}
			})

			t.Run("Delete", func(t *testing.T) {
				if err := foo.Delete("foo"); err != nil {
					t.Fatal(err)
				}

				err := foo.Delete("bar")
				if got, want := err, ErrNotFound; got != want {
					t.Errorf("got %v want %v", got, want)
				}
			})

			t.Run("Concurrent writing / reading", func(t *testing.T) {
				wg := sync.WaitGroup{}
				for i := 0; i < 100; i++ {
					index := i
					wg.Add(2)
					go func() {
						_ = foo.Persist("foo", []byte(fmt.Sprint(index)))
						wg.Done()
					}()
					go func() {
						_, _ = foo.Get("foo")
						wg.Done()
					}()
				}
				wg.Wait()
			})

			t.Run("Close", func(t *testing.T) {
				if err := foo.Close(); err != nil {
					t.Fatal(err)
				}
				if err := bar.Close(); err != nil {
					t.Fatal(err)
				}
			})
		})
	}
}
