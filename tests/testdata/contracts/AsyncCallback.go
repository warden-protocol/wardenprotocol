// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package contracts

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
	_ = abi.ConvertType
)

// AsyncCallbackMetaData contains all meta data concerning the AsyncCallback contract.
var AsyncCallbackMetaData = &bind.MetaData{
	ABI: "[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"coolNumber\",\"type\":\"uint256\"}],\"name\":\"storedNumber\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"\",\"type\":\"uint64\"},{\"internalType\":\"bytes\",\"name\":\"_output\",\"type\":\"bytes\"}],\"name\":\"cb\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"got1\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"got2\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"lastCbId\",\"outputs\":[{\"internalType\":\"uint64\",\"name\":\"\",\"type\":\"uint64\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"lastTaskId\",\"outputs\":[{\"internalType\":\"uint64\",\"name\":\"\",\"type\":\"uint64\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"output\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"output2\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"msg\",\"type\":\"string\"},{\"internalType\":\"uint64\",\"name\":\"callbackGasLimit\",\"type\":\"uint64\"}],\"name\":\"work\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
	Bin: "0x608060405234602257600e60ae565b60146026565b61198f6100c4823961198f90f35b602c565b60405190565b600080fd5b60801b90565b90604460ff60801b916031565b9181191691161790565b151590565b605a90604e565b90565b90565b906070606c6076926053565b605d565b82546037565b9055565b60001b90565b90608a60ff91607a565b9181191691161790565b9060a460a060aa926053565b605d565b82546080565b9055565b60b76000806060565b60c1600060026094565b56fe60806040526004361015610013575b6106d3565b61001e60003561009d565b8063138cd19d1461009857806315797cc7146100935780636d488b6a1461008e5780639b90a19014610089578063a4ee3eb614610084578063f1d564991461007f578063f20eaeb81461007a5763fcec0dfa0361000e5761069e565b610659565b610494565b61044f565b610409565b6102c8565b61022f565b610183565b60e01c90565b60405190565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b909182601f830112156101015781359167ffffffffffffffff83116100fc5760200192600183028401116100f757565b6100c2565b6100bd565b6100b8565b67ffffffffffffffff1690565b61011c81610106565b0361012357565b600080fd5b9050359061013582610113565b565b9160408383031261017857600083013567ffffffffffffffff811161017357610165836101709286016100c7565b939094602001610128565b90565b6100b3565b6100ae565b60000190565b346101b25761019c610196366004610137565b916111cf565b6101a46100a3565b806101ae8161017d565b0390f35b6100a9565b60009103126101c257565b6100ae565b1c90565b60ff1690565b6101e19060086101e693026101c7565b6101cb565b90565b906101f491546101d1565b90565b61020460006010906101e9565b90565b151590565b61021590610207565b9052565b919061022d9060006020850194019061020c565b565b3461025f5761023f3660046101b7565b61025b61024a6101f7565b6102526100a3565b91829182610219565b0390f35b6100a9565b67ffffffffffffffff1690565b61028190600861028693026101c7565b610264565b90565b906102949154610271565b90565b6102a2600080610289565b90565b6102ae90610106565b9052565b91906102c6906000602085019401906102a5565b565b346102f8576102d83660046101b7565b6102f46102e3610297565b6102eb6100a3565b918291826102b2565b0390f35b6100a9565b909182601f830112156103375781359167ffffffffffffffff831161033257602001926001830284011161032d57565b6100c2565b6100bd565b6100b8565b91909160408184031261037e576103568360008301610128565b92602082013567ffffffffffffffff81116103795761037592016102fd565b9091565b6100b3565b6100ae565b5190565b60209181520190565b60005b8381106103a4575050906000910152565b806020918301518185015201610393565b601f801991011690565b6103de6103e76020936103ec936103d581610383565b93848093610387565b95869101610390565b6103b5565b0190565b61040691602082019160008184039101526103bf565b90565b3461043a5761043661042561041f36600461033c565b9161177d565b61042d6100a3565b918291826103f0565b0390f35b6100a9565b61044c60026000906101e9565b90565b3461047f5761045f3660046101b7565b61047b61046a61043f565b6104726100a3565b91829182610219565b0390f35b6100a9565b6104916000600890610289565b90565b346104c4576104a43660046101b7565b6104c06104af610484565b6104b76100a3565b918291826102b2565b0390f35b6100a9565b634e487b7160e01b600052600060045260246000fd5b634e487b7160e01b600052602260045260246000fd5b9060016002830492168015610515575b602083101461051057565b6104df565b91607f1691610505565b60209181520190565b600052602060002090565b906000929180549061054e610547836104f5565b809461051f565b916001811690816000146105a7575060011461056a575b505050565b6105779192939450610528565b916000925b81841061058f5750500190388080610565565b6001816020929593955484860152019101929061057c565b92949550505060ff1916825215156020020190388080610565565b906105cc91610533565b90565b634e487b7160e01b600052604160045260246000fd5b906105ef906103b5565b810190811067ffffffffffffffff82111761060957604052565b6105cf565b9061062e6106279261061e6100a3565b938480926105c2565b03836105e5565b565b90600010610644576106419061060e565b90565b6104c9565b6106566001600090610630565b90565b34610689576106693660046101b7565b610685610674610649565b61067c6100a3565b918291826103f0565b0390f35b6100a9565b61069b6003600090610630565b90565b346106ce576106ae3660046101b7565b6106ca6106b961068e565b6106c16100a3565b918291826103f0565b0390f35b6100a9565b600080fd5b606090565b61090390565b60018060a01b031690565b90565b61070561070061070a926106e3565b6106ee565b6106e3565b90565b610716906106f1565b90565b6107229061070d565b90565b6107356107306106dd565b610719565b90565b610741906106f1565b90565b61074d90610738565b90565b91565b61075c90610738565b90565b9061077261076b6100a3565b92836105e5565b565b61077e604061075f565b90565b61078a906106e3565b90565b9061079790610781565b9052565b906107a590610106565b9052565b60e01b90565b905051906107bc82610113565b565b906020828203126107d8576107d5916000016107af565b90565b6100ae565b60209181520190565b60007f6563686f00000000000000000000000000000000000000000000000000000000910152565b61081b60046020926107dd565b610824816107e6565b0190565b90826000939282370152565b919061084e816108478161085395610387565b8095610828565b6103b5565b0190565b5190565b60209181520190565b60200190565b5190565b60209181520190565b61089661089f6020936108a49361088d8161086a565b9384809361086e565b95869101610390565b6103b5565b0190565b90565b6108b4906108a8565b9052565b906108e4906020806108d96040840160008701518582036000870152610877565b9401519101906108ab565b90565b906108f1916108b8565b90565b60200190565b9061090e61090783610857565b809261085b565b908161091f60208302840194610864565b926000915b83831061093357505050505090565b9091929394602061095561094f838560019503875289516108e7565b976108f4565b9301930191939290610924565b61096b90610781565b9052565b61097890610106565b9052565b906020806109a09361099660008201516000860190610962565b015191019061096f565b565b9493916109eb936109d56060936109e3936109c760a08b018b810360008d015261080e565b918a830360208c0152610834565b9087820360408901526108fa565b94019061097c565b565b6109f56100a3565b3d6000823e3d90fd5b60001b90565b90610a1767ffffffffffffffff916109fe565b9181191691161790565b610a35610a30610a3a92610106565b6106ee565b610106565b90565b90565b90610a55610a50610a5c92610a21565b610a3d565b8254610a04565b9055565b60001c90565b610a72610a7791610a60565b610264565b90565b610a849054610a66565b90565b600080fd5b600080fd5b610a9a81610781565b03610aa157565b600080fd5b90505190610ab382610a91565b565b600080fd5b67ffffffffffffffff8111610ad857610ad46020916103b5565b0190565b6105cf565b90929192610af2610aed82610aba565b61075f565b93818552602085019082840111610b0e57610b0c92610390565b565b610ab5565b9080601f83011215610b3157816020610b2e93519101610add565b90565b6100b8565b67ffffffffffffffff8111610b5457610b506020916103b5565b0190565b6105cf565b90929192610b6e610b6982610b36565b61075f565b93818552602085019082840111610b8a57610b8892610390565b565b610ab5565b9080601f83011215610bad57816020610baa93519101610b59565b90565b6100b8565b67ffffffffffffffff8111610bca5760208091020190565b6105cf565b610bd8816108a8565b03610bdf57565b600080fd5b90505190610bf182610bcf565b565b919091604081840312610c4857610c0a604061075f565b9260008201519167ffffffffffffffff8311610c4357610c2f82610c3c948301610b13565b6000860152602001610be4565b6020830152565b610a8c565b610a87565b929190610c61610c5c82610bb2565b61075f565b9381855260208086019202810191838311610cb85781905b838210610c87575050505050565b815167ffffffffffffffff8111610cb357602091610ca88784938701610bf3565b815201910190610c79565b6100b8565b6100c2565b9080601f83011215610cdb57816020610cd893519101610c4d565b90565b6100b8565b919091604081840312610d4c57610cf7604061075f565b92600082015167ffffffffffffffff8111610d475781610d18918401610cbd565b6000850152602082015167ffffffffffffffff8111610d4257610d3b9201610cbd565b6020830152565b610a8c565b610a8c565b610a87565b9190604083820312610d8d57610d8690610d6b604061075f565b93610d7982600083016107af565b60008601526020016107af565b6020830152565b610a87565b91909161012081840312610e9d57610dab61010061075f565b92610db981600084016107af565b6000850152610dcb8160208401610aa6565b6020850152604082015167ffffffffffffffff8111610e985781610df0918401610b13565b6040850152606082015167ffffffffffffffff8111610e935781610e15918401610b8f565b6060850152608082015167ffffffffffffffff8111610e8e5781610e3a918401610ce0565b6080850152610e4c8160a084016107af565b60a085015260c08201519167ffffffffffffffff8311610e8957610e7582610e82948301610b8f565b60c086015260e001610d51565b60e0830152565b610a8c565b610a8c565b610a8c565b610a8c565b610a87565b67ffffffffffffffff8111610eba5760208091020190565b6105cf565b60031115610ec957565b600080fd5b90505190610edb82610ebf565b565b919091606081840312610f4457610ef4606061075f565b92610f0281600084016107af565b600085015260208201519167ffffffffffffffff8311610f3f57610f2b82610f38948301610b8f565b6020860152604001610ece565b6040830152565b610a8c565b610a87565b929190610f5d610f5882610ea2565b61075f565b9381855260208086019202810191838311610fb45781905b838210610f83575050505050565b815167ffffffffffffffff8111610faf57602091610fa48784938701610edd565b815201910190610f75565b6100b8565b6100c2565b9080601f83011215610fd757816020610fd493519101610f49565b90565b6100b8565b91909160608184031261105a57610ff3606061075f565b9261100181600084016107af565b6000850152602082015167ffffffffffffffff81116110555781611026918401610b8f565b6020850152604082015167ffffffffffffffff8111611050576110499201610b13565b6040830152565b610a8c565b610a8c565b610a87565b9190916060818403126110f557611076606061075f565b92600082015167ffffffffffffffff81116110f05781611097918401610d92565b6000850152602082015167ffffffffffffffff81116110eb57816110bc918401610fb9565b6020850152604082015167ffffffffffffffff81116110e6576110df9201610fdc565b6040830152565b610a8c565b610a8c565b610a8c565b610a87565b91909160208184031261113c57611111602061075f565b92600082015167ffffffffffffffff811161113757611130920161105f565b6000830152565b610a8c565b610a87565b9060208282031261117257600082015167ffffffffffffffff811161116d5761116a92016110fa565b90565b6100b3565b6100ae565b6111819051610106565b90565b60401b90565b906111a56fffffffffffffffff000000000000000091611184565b9181191691161790565b906111c46111bf6111cb92610a21565b610a3d565b825461118a565b9055565b60209161124260006111df6106d8565b9361124d6112026111f66111f1610725565b610744565b956371a562f493610750565b98909661122e61121130610753565b9261122661121d610774565b9488860161078d565b8a840161079b565b6112366100a3565b998a98899788966107a9565b8652600486016109a2565b03925af180156113395761126b9160009161130b575b506000610a40565b6112b2600061128061127b610725565b610744565b63c7be4a58906112a761129284610a7a565b9261129b6100a3565b958694859384936107a9565b8352600483016102b2565b03915afa80156113065760a06000806112db936112e29582916112e4575b500151015101611177565b60006111af565b565b61130091503d8084833e6112f881836105e5565b810190611141565b386112d0565b6109ed565b61132c915060203d8111611332575b61132481836105e5565b8101906107be565b38611263565b503d61131a565b6109ed565b606090565b60801c90565b61135561135a91611343565b6101cb565b90565b6113679054611349565b90565b61137661137b91610a60565b6101cb565b90565b611388905461136a565b90565b60007f616c726561647920676f74207468652074776f2063616c6c6261636b73000000910152565b6113c0601d6020926107dd565b6113c98161138b565b0190565b6113e390602081019060008183039101526113b3565b90565b906113f260ff916109fe565b9181191691161790565b61140590610207565b90565b90565b9061142061141b611427926113fc565b611408565b82546113e6565b9055565b5090565b601f602091010490565b1b90565b9190600861145991029161145360001984611439565b92611439565b9181191691161790565b61147761147261147c926108a8565b6106ee565b6108a8565b90565b90565b91906114986114936114a093611463565b61147f565b90835461143d565b9055565b600090565b6114bb916114b56114a4565b91611482565b565b5b8181106114c9575050565b806114d760006001936114a9565b016114be565b9190601f81116114ed575b505050565b6114f961151e93610528565b9060206115058461142f565b83019310611526575b6115179061142f565b01906114bd565b3880806114e8565b91506115178192905061150e565b9061154590600019906008026101c7565b191690565b8161155491611534565b906002021790565b91611567908261142b565b9067ffffffffffffffff82116116295761158b8261158585546104f5565b856114dd565b600090601f83116001146115c0579180916115af936000926115b4575b505061154a565b90555b565b909150013538806115a8565b601f198316916115cf85610528565b9260005b818110611611575091600293918560019694106115f7575b505050020190556115b2565b611607910135601f841690611534565b90553880806115eb565b919360206001819287870135815501950192016115d3565b6105cf565b90611639929161155c565b565b9061164d61164883610aba565b61075f565b918252565b61165c600061163b565b90565b611667611652565b90565b90565b61168161167c6116869261166a565b6106ee565b6108a8565b90565b60801b90565b9061169e60ff60801b91611689565b9181191691161790565b906116bd6116b86116c4926113fc565b611408565b825461168f565b9055565b60007f68656c6c6f20616761696e000000000000000000000000000000000000000000910152565b6116fa600b61163b565b90611707602083016116c8565b565b6117116116f0565b90565b90565b61172b61172661173092611714565b6106ee565b610106565b90565b93929061177361177b9361176560609361175760a08a018a810360008c015261080e565b9089820360208b01526103bf565b9087820360408901526108fa565b94019061097c565b565b509061178761133e565b50611792600061135d565b80611949575b611927576117a6600061135d565b8061190e575b6118ec5761180991602a6117e07f1805c89be8180a2c588b9293e51480759fc5adada3e7502a14932ce5ca0a3ae99161166d565b906117e96100a3565b806117f38161017d565b0390a2611802600160006116a8565b600161162e565b6118116106d8565b602061182361181e610725565b610744565b916371a562f4926118856000611837611709565b939561189061184530610753565b6118716118696305f5e10061186461185b610774565b9488860161078d565b611717565b89830161079b565b6118796100a3565b988997889687956107a9565b855260048501611733565b03925af180156118e7576118ae916000916118b9575b506000610a40565b6118b661165f565b90565b6118da915060203d81116118e0575b6118d281836105e5565b8101906107be565b386118a6565b503d6118c8565b6109ed565b611903916118fc6001600261140b565b600361162e565b61190b61165f565b90565b5061192261191c600261137e565b15610207565b6117ac565b61192f6100a3565b62461bcd60e51b815280611945600482016113cd565b0390fd5b50611954600261137e565b61179856fea264697066735822122082c3318ca6642bda666883919939b2e7744b1f0befaedc7e608b09583e09fe4564736f6c634300081e0033",
}

// AsyncCallbackABI is the input ABI used to generate the binding from.
// Deprecated: Use AsyncCallbackMetaData.ABI instead.
var AsyncCallbackABI = AsyncCallbackMetaData.ABI

// AsyncCallbackBin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use AsyncCallbackMetaData.Bin instead.
var AsyncCallbackBin = AsyncCallbackMetaData.Bin

// DeployAsyncCallback deploys a new Ethereum contract, binding an instance of AsyncCallback to it.
func DeployAsyncCallback(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *AsyncCallback, error) {
	parsed, err := AsyncCallbackMetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(AsyncCallbackBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &AsyncCallback{AsyncCallbackCaller: AsyncCallbackCaller{contract: contract}, AsyncCallbackTransactor: AsyncCallbackTransactor{contract: contract}, AsyncCallbackFilterer: AsyncCallbackFilterer{contract: contract}}, nil
}

// AsyncCallback is an auto generated Go binding around an Ethereum contract.
type AsyncCallback struct {
	AsyncCallbackCaller     // Read-only binding to the contract
	AsyncCallbackTransactor // Write-only binding to the contract
	AsyncCallbackFilterer   // Log filterer for contract events
}

// AsyncCallbackCaller is an auto generated read-only Go binding around an Ethereum contract.
type AsyncCallbackCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// AsyncCallbackTransactor is an auto generated write-only Go binding around an Ethereum contract.
type AsyncCallbackTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// AsyncCallbackFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type AsyncCallbackFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// AsyncCallbackSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type AsyncCallbackSession struct {
	Contract     *AsyncCallback    // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// AsyncCallbackCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type AsyncCallbackCallerSession struct {
	Contract *AsyncCallbackCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts        // Call options to use throughout this session
}

// AsyncCallbackTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type AsyncCallbackTransactorSession struct {
	Contract     *AsyncCallbackTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts        // Transaction auth options to use throughout this session
}

// AsyncCallbackRaw is an auto generated low-level Go binding around an Ethereum contract.
type AsyncCallbackRaw struct {
	Contract *AsyncCallback // Generic contract binding to access the raw methods on
}

// AsyncCallbackCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type AsyncCallbackCallerRaw struct {
	Contract *AsyncCallbackCaller // Generic read-only contract binding to access the raw methods on
}

// AsyncCallbackTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type AsyncCallbackTransactorRaw struct {
	Contract *AsyncCallbackTransactor // Generic write-only contract binding to access the raw methods on
}

// NewAsyncCallback creates a new instance of AsyncCallback, bound to a specific deployed contract.
func NewAsyncCallback(address common.Address, backend bind.ContractBackend) (*AsyncCallback, error) {
	contract, err := bindAsyncCallback(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &AsyncCallback{AsyncCallbackCaller: AsyncCallbackCaller{contract: contract}, AsyncCallbackTransactor: AsyncCallbackTransactor{contract: contract}, AsyncCallbackFilterer: AsyncCallbackFilterer{contract: contract}}, nil
}

// NewAsyncCallbackCaller creates a new read-only instance of AsyncCallback, bound to a specific deployed contract.
func NewAsyncCallbackCaller(address common.Address, caller bind.ContractCaller) (*AsyncCallbackCaller, error) {
	contract, err := bindAsyncCallback(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &AsyncCallbackCaller{contract: contract}, nil
}

// NewAsyncCallbackTransactor creates a new write-only instance of AsyncCallback, bound to a specific deployed contract.
func NewAsyncCallbackTransactor(address common.Address, transactor bind.ContractTransactor) (*AsyncCallbackTransactor, error) {
	contract, err := bindAsyncCallback(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &AsyncCallbackTransactor{contract: contract}, nil
}

// NewAsyncCallbackFilterer creates a new log filterer instance of AsyncCallback, bound to a specific deployed contract.
func NewAsyncCallbackFilterer(address common.Address, filterer bind.ContractFilterer) (*AsyncCallbackFilterer, error) {
	contract, err := bindAsyncCallback(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &AsyncCallbackFilterer{contract: contract}, nil
}

// bindAsyncCallback binds a generic wrapper to an already deployed contract.
func bindAsyncCallback(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := AsyncCallbackMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_AsyncCallback *AsyncCallbackRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _AsyncCallback.Contract.AsyncCallbackCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_AsyncCallback *AsyncCallbackRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _AsyncCallback.Contract.AsyncCallbackTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_AsyncCallback *AsyncCallbackRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _AsyncCallback.Contract.AsyncCallbackTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_AsyncCallback *AsyncCallbackCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _AsyncCallback.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_AsyncCallback *AsyncCallbackTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _AsyncCallback.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_AsyncCallback *AsyncCallbackTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _AsyncCallback.Contract.contract.Transact(opts, method, params...)
}

// Got1 is a free data retrieval call binding the contract method 0x15797cc7.
//
// Solidity: function got1() view returns(bool)
func (_AsyncCallback *AsyncCallbackCaller) Got1(opts *bind.CallOpts) (bool, error) {
	var out []interface{}
	err := _AsyncCallback.contract.Call(opts, &out, "got1")

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// Got1 is a free data retrieval call binding the contract method 0x15797cc7.
//
// Solidity: function got1() view returns(bool)
func (_AsyncCallback *AsyncCallbackSession) Got1() (bool, error) {
	return _AsyncCallback.Contract.Got1(&_AsyncCallback.CallOpts)
}

// Got1 is a free data retrieval call binding the contract method 0x15797cc7.
//
// Solidity: function got1() view returns(bool)
func (_AsyncCallback *AsyncCallbackCallerSession) Got1() (bool, error) {
	return _AsyncCallback.Contract.Got1(&_AsyncCallback.CallOpts)
}

// Got2 is a free data retrieval call binding the contract method 0xa4ee3eb6.
//
// Solidity: function got2() view returns(bool)
func (_AsyncCallback *AsyncCallbackCaller) Got2(opts *bind.CallOpts) (bool, error) {
	var out []interface{}
	err := _AsyncCallback.contract.Call(opts, &out, "got2")

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// Got2 is a free data retrieval call binding the contract method 0xa4ee3eb6.
//
// Solidity: function got2() view returns(bool)
func (_AsyncCallback *AsyncCallbackSession) Got2() (bool, error) {
	return _AsyncCallback.Contract.Got2(&_AsyncCallback.CallOpts)
}

// Got2 is a free data retrieval call binding the contract method 0xa4ee3eb6.
//
// Solidity: function got2() view returns(bool)
func (_AsyncCallback *AsyncCallbackCallerSession) Got2() (bool, error) {
	return _AsyncCallback.Contract.Got2(&_AsyncCallback.CallOpts)
}

// LastCbId is a free data retrieval call binding the contract method 0xf1d56499.
//
// Solidity: function lastCbId() view returns(uint64)
func (_AsyncCallback *AsyncCallbackCaller) LastCbId(opts *bind.CallOpts) (uint64, error) {
	var out []interface{}
	err := _AsyncCallback.contract.Call(opts, &out, "lastCbId")

	if err != nil {
		return *new(uint64), err
	}

	out0 := *abi.ConvertType(out[0], new(uint64)).(*uint64)

	return out0, err

}

// LastCbId is a free data retrieval call binding the contract method 0xf1d56499.
//
// Solidity: function lastCbId() view returns(uint64)
func (_AsyncCallback *AsyncCallbackSession) LastCbId() (uint64, error) {
	return _AsyncCallback.Contract.LastCbId(&_AsyncCallback.CallOpts)
}

// LastCbId is a free data retrieval call binding the contract method 0xf1d56499.
//
// Solidity: function lastCbId() view returns(uint64)
func (_AsyncCallback *AsyncCallbackCallerSession) LastCbId() (uint64, error) {
	return _AsyncCallback.Contract.LastCbId(&_AsyncCallback.CallOpts)
}

// LastTaskId is a free data retrieval call binding the contract method 0x6d488b6a.
//
// Solidity: function lastTaskId() view returns(uint64)
func (_AsyncCallback *AsyncCallbackCaller) LastTaskId(opts *bind.CallOpts) (uint64, error) {
	var out []interface{}
	err := _AsyncCallback.contract.Call(opts, &out, "lastTaskId")

	if err != nil {
		return *new(uint64), err
	}

	out0 := *abi.ConvertType(out[0], new(uint64)).(*uint64)

	return out0, err

}

// LastTaskId is a free data retrieval call binding the contract method 0x6d488b6a.
//
// Solidity: function lastTaskId() view returns(uint64)
func (_AsyncCallback *AsyncCallbackSession) LastTaskId() (uint64, error) {
	return _AsyncCallback.Contract.LastTaskId(&_AsyncCallback.CallOpts)
}

// LastTaskId is a free data retrieval call binding the contract method 0x6d488b6a.
//
// Solidity: function lastTaskId() view returns(uint64)
func (_AsyncCallback *AsyncCallbackCallerSession) LastTaskId() (uint64, error) {
	return _AsyncCallback.Contract.LastTaskId(&_AsyncCallback.CallOpts)
}

// Output is a free data retrieval call binding the contract method 0xf20eaeb8.
//
// Solidity: function output() view returns(bytes)
func (_AsyncCallback *AsyncCallbackCaller) Output(opts *bind.CallOpts) ([]byte, error) {
	var out []interface{}
	err := _AsyncCallback.contract.Call(opts, &out, "output")

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// Output is a free data retrieval call binding the contract method 0xf20eaeb8.
//
// Solidity: function output() view returns(bytes)
func (_AsyncCallback *AsyncCallbackSession) Output() ([]byte, error) {
	return _AsyncCallback.Contract.Output(&_AsyncCallback.CallOpts)
}

// Output is a free data retrieval call binding the contract method 0xf20eaeb8.
//
// Solidity: function output() view returns(bytes)
func (_AsyncCallback *AsyncCallbackCallerSession) Output() ([]byte, error) {
	return _AsyncCallback.Contract.Output(&_AsyncCallback.CallOpts)
}

// Output2 is a free data retrieval call binding the contract method 0xfcec0dfa.
//
// Solidity: function output2() view returns(bytes)
func (_AsyncCallback *AsyncCallbackCaller) Output2(opts *bind.CallOpts) ([]byte, error) {
	var out []interface{}
	err := _AsyncCallback.contract.Call(opts, &out, "output2")

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// Output2 is a free data retrieval call binding the contract method 0xfcec0dfa.
//
// Solidity: function output2() view returns(bytes)
func (_AsyncCallback *AsyncCallbackSession) Output2() ([]byte, error) {
	return _AsyncCallback.Contract.Output2(&_AsyncCallback.CallOpts)
}

// Output2 is a free data retrieval call binding the contract method 0xfcec0dfa.
//
// Solidity: function output2() view returns(bytes)
func (_AsyncCallback *AsyncCallbackCallerSession) Output2() ([]byte, error) {
	return _AsyncCallback.Contract.Output2(&_AsyncCallback.CallOpts)
}

// Cb is a paid mutator transaction binding the contract method 0x9b90a190.
//
// Solidity: function cb(uint64 , bytes _output) returns(bytes)
func (_AsyncCallback *AsyncCallbackTransactor) Cb(opts *bind.TransactOpts, arg0 uint64, _output []byte) (*types.Transaction, error) {
	return _AsyncCallback.contract.Transact(opts, "cb", arg0, _output)
}

// Cb is a paid mutator transaction binding the contract method 0x9b90a190.
//
// Solidity: function cb(uint64 , bytes _output) returns(bytes)
func (_AsyncCallback *AsyncCallbackSession) Cb(arg0 uint64, _output []byte) (*types.Transaction, error) {
	return _AsyncCallback.Contract.Cb(&_AsyncCallback.TransactOpts, arg0, _output)
}

// Cb is a paid mutator transaction binding the contract method 0x9b90a190.
//
// Solidity: function cb(uint64 , bytes _output) returns(bytes)
func (_AsyncCallback *AsyncCallbackTransactorSession) Cb(arg0 uint64, _output []byte) (*types.Transaction, error) {
	return _AsyncCallback.Contract.Cb(&_AsyncCallback.TransactOpts, arg0, _output)
}

// Work is a paid mutator transaction binding the contract method 0x138cd19d.
//
// Solidity: function work(string msg, uint64 callbackGasLimit) returns()
func (_AsyncCallback *AsyncCallbackTransactor) Work(opts *bind.TransactOpts, msg string, callbackGasLimit uint64) (*types.Transaction, error) {
	return _AsyncCallback.contract.Transact(opts, "work", msg, callbackGasLimit)
}

// Work is a paid mutator transaction binding the contract method 0x138cd19d.
//
// Solidity: function work(string msg, uint64 callbackGasLimit) returns()
func (_AsyncCallback *AsyncCallbackSession) Work(msg string, callbackGasLimit uint64) (*types.Transaction, error) {
	return _AsyncCallback.Contract.Work(&_AsyncCallback.TransactOpts, msg, callbackGasLimit)
}

// Work is a paid mutator transaction binding the contract method 0x138cd19d.
//
// Solidity: function work(string msg, uint64 callbackGasLimit) returns()
func (_AsyncCallback *AsyncCallbackTransactorSession) Work(msg string, callbackGasLimit uint64) (*types.Transaction, error) {
	return _AsyncCallback.Contract.Work(&_AsyncCallback.TransactOpts, msg, callbackGasLimit)
}

// AsyncCallbackStoredNumberIterator is returned from FilterStoredNumber and is used to iterate over the raw logs and unpacked data for StoredNumber events raised by the AsyncCallback contract.
type AsyncCallbackStoredNumberIterator struct {
	Event *AsyncCallbackStoredNumber // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *AsyncCallbackStoredNumberIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(AsyncCallbackStoredNumber)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(AsyncCallbackStoredNumber)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *AsyncCallbackStoredNumberIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *AsyncCallbackStoredNumberIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// AsyncCallbackStoredNumber represents a StoredNumber event raised by the AsyncCallback contract.
type AsyncCallbackStoredNumber struct {
	CoolNumber *big.Int
	Raw        types.Log // Blockchain specific contextual infos
}

// FilterStoredNumber is a free log retrieval operation binding the contract event 0x1805c89be8180a2c588b9293e51480759fc5adada3e7502a14932ce5ca0a3ae9.
//
// Solidity: event storedNumber(uint256 indexed coolNumber)
func (_AsyncCallback *AsyncCallbackFilterer) FilterStoredNumber(opts *bind.FilterOpts, coolNumber []*big.Int) (*AsyncCallbackStoredNumberIterator, error) {

	var coolNumberRule []interface{}
	for _, coolNumberItem := range coolNumber {
		coolNumberRule = append(coolNumberRule, coolNumberItem)
	}

	logs, sub, err := _AsyncCallback.contract.FilterLogs(opts, "storedNumber", coolNumberRule)
	if err != nil {
		return nil, err
	}
	return &AsyncCallbackStoredNumberIterator{contract: _AsyncCallback.contract, event: "storedNumber", logs: logs, sub: sub}, nil
}

// WatchStoredNumber is a free log subscription operation binding the contract event 0x1805c89be8180a2c588b9293e51480759fc5adada3e7502a14932ce5ca0a3ae9.
//
// Solidity: event storedNumber(uint256 indexed coolNumber)
func (_AsyncCallback *AsyncCallbackFilterer) WatchStoredNumber(opts *bind.WatchOpts, sink chan<- *AsyncCallbackStoredNumber, coolNumber []*big.Int) (event.Subscription, error) {

	var coolNumberRule []interface{}
	for _, coolNumberItem := range coolNumber {
		coolNumberRule = append(coolNumberRule, coolNumberItem)
	}

	logs, sub, err := _AsyncCallback.contract.WatchLogs(opts, "storedNumber", coolNumberRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(AsyncCallbackStoredNumber)
				if err := _AsyncCallback.contract.UnpackLog(event, "storedNumber", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseStoredNumber is a log parse operation binding the contract event 0x1805c89be8180a2c588b9293e51480759fc5adada3e7502a14932ce5ca0a3ae9.
//
// Solidity: event storedNumber(uint256 indexed coolNumber)
func (_AsyncCallback *AsyncCallbackFilterer) ParseStoredNumber(log types.Log) (*AsyncCallbackStoredNumber, error) {
	event := new(AsyncCallbackStoredNumber)
	if err := _AsyncCallback.contract.UnpackLog(event, "storedNumber", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
