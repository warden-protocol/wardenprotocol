/*
// Copyright 2021 Evmos Foundation
// This file is part of Evmos' Ethermint library.
//
// The Ethermint library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The Ethermint library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Ethermint library. If not, see https://github.com/evmos/ethermint/blob/main/LICENSE
package network implements and exposes a fully operational in-process Tendermint
test network that consists of at least one or potentially many validators. This
test network can be used primarily for integration tests or unit test suites.

The test network utilizes SimApp as the ABCI application and uses all the modules
defined in the Cosmos SDK. An in-process test network can be configured with any
number of validators as well as account funds and even custom genesis state.

When creating a test network, a series of Validator objects are returned. Each
Validator object has useful information such as their address and public key. A
Validator will also provide its RPC, P2P, and API addresses that can be useful
for integration testing. In addition, a Tendermint local RPC client is also provided
which can be handy for making direct RPC calls to Tendermint.

Note, due to limitations in concurrency and the design of the RPC layer in
Tendermint, only the first Validator object will have an RPC and API client
exposed. Due to this exact same limitation, only a single test network can exist
at a time. A caller must be certain it calls Cleanup after it no longer needs
the network.

A typical testing flow might look like the following:

	type IntegrationTestSuite struct {
		suite.Suite

		cfg     testutil.Config
		network *testutil.Network
	}

	func (s *IntegrationTestSuite) SetupSuite() {
		s.T().Log("setting up integration test suite")

		cfg := testutil.DefaultConfig()
		cfg.NumValidators = 1

		s.cfg = cfg
		s.network = testutil.New(s.T(), cfg)

		_, err := s.network.WaitForHeight(1)
		s.Require().NoError(err)
	}

	func (s *IntegrationTestSuite) TearDownSuite() {
		s.T().Log("tearing down integration test suite")

		// This is important and must be called to ensure other tests can create
		// a network!
		s.network.Cleanup()
	}

	func (s *IntegrationTestSuite) TestQueryBalancesRequestHandlerFn() {
		val := s.network.Validators[0]
		baseURL := val.APIAddress

		// Use baseURL to make API HTTP requests or use val.RPCClient to make direct
		// Tendermint RPC calls.
		// ...
	}

	func TestIntegrationTestSuite(t *testing.T) {
		suite.Run(t, new(IntegrationTestSuite))
	}
*/
// Copyright 2021 Evmos Foundation
// This file is part of Evmos' Ethermint library.
//
// The Ethermint library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The Ethermint library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Ethermint library. If not, see https://github.com/evmos/ethermint/blob/main/LICENSE
package network
