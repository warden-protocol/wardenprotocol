package debug

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"os"
	"runtime"
	"runtime/debug"
	"runtime/pprof"
	"sync"
	"time"

	"github.com/davecgh/go-spew/spew"

	evmtypes "github.com/evmos/ethermint/x/evm/types"

	stderrors "github.com/pkg/errors"

	"github.com/cosmos/cosmos-sdk/server"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/consensus/ethash"
	"github.com/ethereum/go-ethereum/rlp"
	"github.com/evmos/ethermint/rpc/backend"
	rpctypes "github.com/evmos/ethermint/rpc/types"
	"github.com/tendermint/tendermint/libs/log"
)

// HandlerT keeps track of the cpu profiler and trace execution
type HandlerT struct {
	cpuFilename   string
	cpuFile       io.WriteCloser
	mu            sync.Mutex
	traceFilename string
	traceFile     io.WriteCloser
}

// API is the collection of tracing APIs exposed over the private debugging endpoint.
type API struct {
	ctx     *server.Context
	logger  log.Logger
	backend backend.EVMBackend
	handler *HandlerT
}

// NewAPI creates a new API definition for the tracing methods of the Ethereum service.
func NewAPI(
	ctx *server.Context,
	backend backend.EVMBackend,
) *API {
	return &API{
		ctx:     ctx,
		logger:  ctx.Logger.With("module", "debug"),
		backend: backend,
		handler: new(HandlerT),
	}
}

// TraceTransaction returns the structured logs created during the execution of EVM
// and returns them as a JSON object.
func (a *API) TraceTransaction(hash common.Hash, config *evmtypes.TraceConfig) (interface{}, error) {
	a.logger.Debug("debug_traceTransaction", "hash", hash)
	return a.backend.TraceTransaction(hash, config)
}

// TraceBlockByNumber returns the structured logs created during the execution of
// EVM and returns them as a JSON object.
func (a *API) TraceBlockByNumber(height rpctypes.BlockNumber, config *evmtypes.TraceConfig) ([]*evmtypes.TxTraceResult, error) {
	a.logger.Debug("debug_traceBlockByNumber", "height", height)
	if height == 0 {
		return nil, errors.New("genesis is not traceable")
	}
	// Get Tendermint Block
	resBlock, err := a.backend.GetTendermintBlockByNumber(height)
	if err != nil {
		a.logger.Debug("get block failed", "height", height, "error", err.Error())
		return nil, err
	}

	return a.backend.TraceBlock(rpctypes.BlockNumber(resBlock.Block.Height), config, resBlock)
}

// TraceBlockByHash returns the structured logs created during the execution of
// EVM and returns them as a JSON object.
func (a *API) TraceBlockByHash(hash common.Hash, config *evmtypes.TraceConfig) ([]*evmtypes.TxTraceResult, error) {
	a.logger.Debug("debug_traceBlockByHash", "hash", hash)
	// Get Tendermint Block
	resBlock, err := a.backend.GetTendermintBlockByHash(hash)
	if err != nil {
		a.logger.Debug("get block failed", "hash", hash.Hex(), "error", err.Error())
		return nil, err
	}

	if resBlock == nil || resBlock.Block == nil {
		a.logger.Debug("block not found", "hash", hash.Hex())
		return nil, errors.New("block not found")
	}

	return a.backend.TraceBlock(rpctypes.BlockNumber(resBlock.Block.Height), config, resBlock)
}

// BlockProfile turns on goroutine profiling for nsec seconds and writes profile data to
// file. It uses a profile rate of 1 for most accurate information. If a different rate is
// desired, set the rate and write the profile manually.
func (a *API) BlockProfile(file string, nsec uint) error {
	a.logger.Debug("debug_blockProfile", "file", file, "nsec", nsec)
	runtime.SetBlockProfileRate(1)
	defer runtime.SetBlockProfileRate(0)

	time.Sleep(time.Duration(nsec) * time.Second)
	return writeProfile("block", file, a.logger)
}

// CpuProfile turns on CPU profiling for nsec seconds and writes
// profile data to file.
func (a *API) CpuProfile(file string, nsec uint) error { //nolint: golint, stylecheck, revive
	a.logger.Debug("debug_cpuProfile", "file", file, "nsec", nsec)
	if err := a.StartCPUProfile(file); err != nil {
		return err
	}
	time.Sleep(time.Duration(nsec) * time.Second)
	return a.StopCPUProfile()
}

// GcStats returns GC statistics.
func (a *API) GcStats() *debug.GCStats {
	a.logger.Debug("debug_gcStats")
	s := new(debug.GCStats)
	debug.ReadGCStats(s)
	return s
}

// GoTrace turns on tracing for nsec seconds and writes
// trace data to file.
func (a *API) GoTrace(file string, nsec uint) error {
	a.logger.Debug("debug_goTrace", "file", file, "nsec", nsec)
	if err := a.StartGoTrace(file); err != nil {
		return err
	}
	time.Sleep(time.Duration(nsec) * time.Second)
	return a.StopGoTrace()
}

// MemStats returns detailed runtime memory statistics.
func (a *API) MemStats() *runtime.MemStats {
	a.logger.Debug("debug_memStats")
	s := new(runtime.MemStats)
	runtime.ReadMemStats(s)
	return s
}

// SetBlockProfileRate sets the rate of goroutine block profile data collection.
// rate 0 disables block profiling.
func (a *API) SetBlockProfileRate(rate int) {
	a.logger.Debug("debug_setBlockProfileRate", "rate", rate)
	runtime.SetBlockProfileRate(rate)
}

// Stacks returns a printed representation of the stacks of all goroutines.
func (a *API) Stacks() string {
	a.logger.Debug("debug_stacks")
	buf := new(bytes.Buffer)
	err := pprof.Lookup("goroutine").WriteTo(buf, 2)
	if err != nil {
		a.logger.Error("Failed to create stacks", "error", err.Error())
	}
	return buf.String()
}

// StartCPUProfile turns on CPU profiling, writing to the given file.
func (a *API) StartCPUProfile(file string) error {
	a.logger.Debug("debug_startCPUProfile", "file", file)
	a.handler.mu.Lock()
	defer a.handler.mu.Unlock()

	switch {
	case isCPUProfileConfigurationActivated(a.ctx):
		a.logger.Debug("CPU profiling already in progress using the configuration file")
		return errors.New("CPU profiling already in progress using the configuration file")
	case a.handler.cpuFile != nil:
		a.logger.Debug("CPU profiling already in progress")
		return errors.New("CPU profiling already in progress")
	default:
		fp, err := ExpandHome(file)
		if err != nil {
			a.logger.Debug("failed to get filepath for the CPU profile file", "error", err.Error())
			return err
		}
		f, err := os.Create(fp)
		if err != nil {
			a.logger.Debug("failed to create CPU profile file", "error", err.Error())
			return err
		}
		if err := pprof.StartCPUProfile(f); err != nil {
			a.logger.Debug("cpu profiling already in use", "error", err.Error())
			if err := f.Close(); err != nil {
				a.logger.Debug("failed to close cpu profile file")
				return stderrors.Wrap(err, "failed to close cpu profile file")
			}
			return err
		}

		a.logger.Info("CPU profiling started", "profile", file)
		a.handler.cpuFile = f
		a.handler.cpuFilename = file
		return nil
	}
}

// StopCPUProfile stops an ongoing CPU profile.
func (a *API) StopCPUProfile() error {
	a.logger.Debug("debug_stopCPUProfile")
	a.handler.mu.Lock()
	defer a.handler.mu.Unlock()

	switch {
	case isCPUProfileConfigurationActivated(a.ctx):
		a.logger.Debug("CPU profiling already in progress using the configuration file")
		return errors.New("CPU profiling already in progress using the configuration file")
	case a.handler.cpuFile != nil:
		a.logger.Info("Done writing CPU profile", "profile", a.handler.cpuFilename)
		pprof.StopCPUProfile()
		if err := a.handler.cpuFile.Close(); err != nil {
			a.logger.Debug("failed to close cpu file")
			return stderrors.Wrap(err, "failed to close cpu file")
		}
		a.handler.cpuFile = nil
		a.handler.cpuFilename = ""
		return nil
	default:
		a.logger.Debug("CPU profiling not in progress")
		return errors.New("CPU profiling not in progress")
	}
}

// WriteBlockProfile writes a goroutine blocking profile to the given file.
func (a *API) WriteBlockProfile(file string) error {
	a.logger.Debug("debug_writeBlockProfile", "file", file)
	return writeProfile("block", file, a.logger)
}

// WriteMemProfile writes an allocation profile to the given file.
// Note that the profiling rate cannot be set through the API,
// it must be set on the command line.
func (a *API) WriteMemProfile(file string) error {
	a.logger.Debug("debug_writeMemProfile", "file", file)
	return writeProfile("heap", file, a.logger)
}

// MutexProfile turns on mutex profiling for nsec seconds and writes profile data to file.
// It uses a profile rate of 1 for most accurate information. If a different rate is
// desired, set the rate and write the profile manually.
func (a *API) MutexProfile(file string, nsec uint) error {
	a.logger.Debug("debug_mutexProfile", "file", file, "nsec", nsec)
	runtime.SetMutexProfileFraction(1)
	time.Sleep(time.Duration(nsec) * time.Second)
	defer runtime.SetMutexProfileFraction(0)
	return writeProfile("mutex", file, a.logger)
}

// SetMutexProfileFraction sets the rate of mutex profiling.
func (a *API) SetMutexProfileFraction(rate int) {
	a.logger.Debug("debug_setMutexProfileFraction", "rate", rate)
	runtime.SetMutexProfileFraction(rate)
}

// WriteMutexProfile writes a goroutine blocking profile to the given file.
func (a *API) WriteMutexProfile(file string) error {
	a.logger.Debug("debug_writeMutexProfile", "file", file)
	return writeProfile("mutex", file, a.logger)
}

// FreeOSMemory forces a garbage collection.
func (a *API) FreeOSMemory() {
	a.logger.Debug("debug_freeOSMemory")
	debug.FreeOSMemory()
}

// SetGCPercent sets the garbage collection target percentage. It returns the previous
// setting. A negative value disables GC.
func (a *API) SetGCPercent(v int) int {
	a.logger.Debug("debug_setGCPercent", "percent", v)
	return debug.SetGCPercent(v)
}

// GetHeaderRlp retrieves the RLP encoded for of a single header.
func (a *API) GetHeaderRlp(number uint64) (hexutil.Bytes, error) {
	header, err := a.backend.HeaderByNumber(rpctypes.BlockNumber(number))
	if err != nil {
		return nil, err
	}

	return rlp.EncodeToBytes(header)
}

// GetBlockRlp retrieves the RLP encoded for of a single block.
func (a *API) GetBlockRlp(number uint64) (hexutil.Bytes, error) {
	block, err := a.backend.BlockByNumber(rpctypes.BlockNumber(number))
	if err != nil {
		return nil, err
	}

	return rlp.EncodeToBytes(block)
}

// PrintBlock retrieves a block and returns its pretty printed form.
func (a *API) PrintBlock(number uint64) (string, error) {
	block, err := a.backend.BlockByNumber(rpctypes.BlockNumber(number))
	if err != nil {
		return "", err
	}

	return spew.Sdump(block), nil
}

// SeedHash retrieves the seed hash of a block.
func (a *API) SeedHash(number uint64) (string, error) {
	_, err := a.backend.HeaderByNumber(rpctypes.BlockNumber(number))
	if err != nil {
		return "", err
	}

	return fmt.Sprintf("0x%x", ethash.SeedHash(number)), nil
}

// IntermediateRoots executes a block, and returns a list
// of intermediate roots: the stateroot after each transaction.
func (a *API) IntermediateRoots(hash common.Hash, _ *evmtypes.TraceConfig) ([]common.Hash, error) {
	a.logger.Debug("debug_intermediateRoots", "hash", hash)
	return ([]common.Hash)(nil), nil
}
