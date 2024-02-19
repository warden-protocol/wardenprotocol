# Installation

## From binary

At this time we are not providing pre-built binaries. Please build from source
by following the instructions contained in the next paragraph.


## From source

### Prerequisites

- [Go](https://golang.org/dl/) 1.21 or later
- [Ignite](https://docs.ignite.com/welcome/install)

### Build

```bash
git clone https://github.com/warden-protocol/wardenprotocol --depth=1
cd wardenprotocol
ignite chain build
```

This will clone our repository and build the chain binary called `wardend`.

Verify the installation by running:

```bash
wardend version
```

If you can't find the `wardend` binary, make sure your `PATH` includes the
`$GOPATH/bin` directory (by default `$GOPATH` is `~/go`).
