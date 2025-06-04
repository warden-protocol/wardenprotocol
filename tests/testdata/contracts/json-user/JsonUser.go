// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package json_user

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

// JsonUserMetaData contains all meta data concerning the JsonUser contract.
var JsonUserMetaData = &bind.MetaData{
	ABI: "[{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"int8\",\"name\":\"\",\"type\":\"int8\"}],\"name\":\"ErrorHappened\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"int8\",\"name\":\"\",\"type\":\"int8\"}],\"name\":\"Ok\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"doSomeJsonActions\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
	Bin: "0x608060405234601c57600e6020565b611cbe61002c8239611cbe90f35b6026565b60405190565b600080fdfe60806040526004361015610013575b6100b0565b61001e60003561002d565b63d0e5febb0361000e5761007b565b60e01c90565b60405190565b600080fd5b600080fd5b600091031261004e57565b61003e565b151590565b61006190610053565b9052565b919061007990600060208501940190610058565b565b346100ab5761008b366004610043565b6100a761009661114a565b61009e610033565b91829182610065565b0390f35b610039565b600080fd5b600090565b61090490565b60018060a01b031690565b90565b6100e26100dd6100e7926100c0565b6100cb565b6100c0565b90565b6100f3906100ce565b90565b6100ff906100ea565b90565b61011261010d6100ba565b6100f6565b90565b61011e906100ce565b90565b61012a90610115565b90565b601f801991011690565b634e487b7160e01b600052604160045260246000fd5b906101579061012d565b810190811067ffffffffffffffff82111761017157604052565b610137565b60e01b90565b600080fd5b600080fd5b600080fd5b9061019e610197610033565b928361014d565b565b67ffffffffffffffff81116101be576101ba60209161012d565b0190565b610137565b60005b8381106101d7575050906000910152565b8060209183015181850152016101c6565b909291926101fd6101f8826101a0565b61018b565b9381855260208501908284011161021957610217926101c3565b565b610186565b9080601f8301121561023c57816020610239935191016101e8565b90565b610181565b9060208282031261027257600082015167ffffffffffffffff811161026d5761026a920161021e565b90565b61017c565b61003e565b60000190565b610285610033565b3d6000823e3d90fd5b90565b90565b6102a86102a36102ad9261028e565b6100cb565b610291565b90565b67ffffffffffffffff81116102c85760208091020190565b610137565b906102df6102da836102b0565b61018b565b918252565b6102ee608061018b565b90565b606090565b606090565b600090565b6103086102e4565b906020808080856103176102f1565b8152016103226102f1565b81520161032d6102f6565b8152016103386102fb565b81525050565b610346610300565b90565b60005b82811061035857505050565b60209061036361033e565b818401520161034c565b9061039261037a836102cd565b9260208061038886936102b0565b9201910390610349565b565b61039e608061018b565b90565b67ffffffffffffffff81116103bf576103bb60209161012d565b0190565b610137565b906103d66103d1836103a1565b61018b565b918252565b60007f6b65793100000000000000000000000000000000000000000000000000000000910152565b61040d60046103c4565b9061041a602083016103db565b565b610424610403565b90565b52565b60007f626f6f6c00000000000000000000000000000000000000000000000000000000910152565b61045c60046103c4565b906104696020830161042a565b565b610473610452565b90565b52565b90565b60070b90565b61049661049161049b92610479565b6100cb565b61047c565b90565b906104a89061047c565b9052565b634e487b7160e01b600052603260045260246000fd5b5190565b906104d0826104c2565b8110156104e1576020809102010190565b6104ac565b6104fa6104f56104ff92610479565b6100cb565b610291565b90565b90565b61051961051461051e92610502565b6100cb565b610291565b90565b61052a90610291565b9052565b919061054290600060208501940190610521565b565b60007f6b65793200000000000000000000000000000000000000000000000000000000910152565b61057660046103c4565b9061058360208301610544565b565b61058d61056c565b90565b60007f75696e7432353600000000000000000000000000000000000000000000000000910152565b6105c260076103c4565b906105cf60208301610590565b565b6105d96105b8565b90565b90565b6105f36105ee6105f8926105dc565b6100cb565b610291565b90565b90565b61061261060d61061792610502565b6100cb565b6105fb565b90565b610623906105fb565b9052565b919061063b9060006020850194019061061a565b565b60007f6b65793300000000000000000000000000000000000000000000000000000000910152565b61066f60046103c4565b9061067c6020830161063d565b565b610686610665565b90565b60007f696e743235360000000000000000000000000000000000000000000000000000910152565b6106bb60066103c4565b906106c860208301610689565b565b6106d26106b1565b90565b90565b6106ec6106e76106f1926106d5565b6100cb565b610291565b90565b60007f68656c6c6f000000000000000000000000000000000000000000000000000000910152565b61072660056103c4565b90610733602083016106f4565b565b61073d61071c565b90565b5190565b60209181520190565b61076c61077560209361077a9361076381610740565b93848093610744565b958691016101c3565b61012d565b0190565b610794916020820191600081840391015261074d565b90565b60007f6b65793400000000000000000000000000000000000000000000000000000000910152565b6107c960046103c4565b906107d660208301610797565b565b6107e06107bf565b90565b60007f737472696e670000000000000000000000000000000000000000000000000000910152565b61081560066103c4565b90610822602083016107e3565b565b61082c61080b565b90565b90565b61084661084161084b9261082f565b6100cb565b610291565b90565b610857906100c0565b90565b6108639061084e565b9052565b919061087b9060006020850194019061085a565b565b60007f6b65793500000000000000000000000000000000000000000000000000000000910152565b6108af60046103c4565b906108bc6020830161087d565b565b6108c66108a5565b90565b60007f6164647265737300000000000000000000000000000000000000000000000000910152565b6108fb60076103c4565b90610908602083016108c9565b565b6109126108f1565b90565b90565b61092c61092761093192610915565b6100cb565b610291565b90565b90565b61094b61094661095092610934565b6100cb565b6105fb565b90565b60007f6b65793600000000000000000000000000000000000000000000000000000000910152565b61098560046103c4565b9061099260208301610953565b565b61099c61097b565b90565b90565b6109b66109b16109bb9261099f565b6100cb565b61047c565b90565b6109d26109cd6109d79261099f565b6100cb565b610291565b90565b5190565b60209181520190565b610a06610a0f602093610a14936109fd816109da565b938480936109de565b958691016101c3565b61012d565b0190565b60209181520190565b60200190565b60209181520190565b610a4f610a58602093610a5d93610a4681610740565b93848093610a27565b958691016101c3565b61012d565b0190565b60209181520190565b610a89610a92602093610a9793610a80816109da565b93848093610a61565b958691016101c3565b61012d565b0190565b610aa49061047c565b9052565b90610afe90606080610af3610ae1610acf6080860160008901518782036000890152610a30565b60208801518682036020880152610a30565b60408701518582036040870152610a6a565b940151910190610a9b565b90565b90610b0b91610aa8565b90565b60200190565b90610b28610b21836104c2565b8092610a18565b9081610b3960208302840194610a21565b926000915b838310610b4d57505050505090565b90919293946020610b6f610b6983856001950387528951610b01565b97610b0e565b9301930191939290610b3e565b9091610b97610ba593604084019084820360008601526109e7565b916020818403910152610b14565b90565b67ffffffffffffffff8111610bc05760208091020190565b610137565b90610bd7610bd283610ba8565b61018b565b918252565b610be6606061018b565b90565b610bf1610bdc565b906020808084610bff6102f1565b815201610c0a6102f1565b815201610c156102fb565b81525050565b610c23610be9565b90565b60005b828110610c3557505050565b602090610c40610c1b565b8184015201610c29565b90610c6f610c5783610bc5565b92602080610c658693610ba8565b9201910390610c26565b565b610c7b606061018b565b90565b5190565b90610c8c82610c7e565b811015610c9d576020809102010190565b6104ac565b67ffffffffffffffff8111610cba5760208091020190565b610137565b600080fd5b929190610cd8610cd382610ca2565b61018b565b9381855260208086019202810191838311610d2f5781905b838210610cfe575050505050565b815167ffffffffffffffff8111610d2a57602091610d1f878493870161021e565b815201910190610cf0565b610181565b610cbf565b9080601f83011215610d5257816020610d4f93519101610cc4565b90565b610181565b90602082820312610d8857600082015167ffffffffffffffff8111610d8357610d809201610d34565b90565b61017c565b61003e565b60209181520190565b60200190565b90610ddd90604080610dd2610dc06060850160008801518682036000880152610a30565b60208701518582036020870152610a30565b940151910190610a9b565b90565b90610dea91610d9c565b90565b60200190565b90610e07610e0083610c7e565b8092610d8d565b9081610e1860208302840194610d96565b926000915b838310610e2c57505050505090565b90919293946020610e4e610e4883856001950387528951610de0565b97610ded565b9301930191939290610e1d565b9091610e76610e8493604084019084820360008601526109e7565b916020818403910152610df3565b90565b5190565b90610e9582610e87565b811015610ea6576020809102010190565b6104ac565b610eb481610053565b03610ebb57565b600080fd5b90505190610ecd82610eab565b565b90602082820312610ee957610ee691600001610ec0565b90565b61003e565b610ef781610291565b03610efe57565b600080fd5b90505190610f1082610eee565b565b90602082820312610f2c57610f2991600001610f03565b90565b61003e565b610f3a816105fb565b03610f4157565b600080fd5b90505190610f5382610f31565b565b90602082820312610f6f57610f6c91600001610f46565b90565b61003e565b90929192610f89610f84826103a1565b61018b565b93818552602085019082840111610fa557610fa3926101c3565b565b610186565b9080601f83011215610fc857816020610fc593519101610f74565b90565b610181565b90602082820312610ffe57600082015167ffffffffffffffff8111610ff957610ff69201610faa565b90565b61017c565b61003e565b61100c906100c0565b90565b61101881611003565b0361101f57565b600080fd5b905051906110318261100f565b565b9060208282031261104d5761104a91600001611024565b90565b61003e565b61105b90610115565b90565b905090565b61108861107f9260209261107681610740565b9485809361105e565b938491016101c3565b0190565b61109591611063565b90565b60200190565b6110aa6005809261105e565b6110b3816106f4565b0190565b6110c09061109e565b90565b90565b60000b90565b6110e06110db6110e5926106d5565b6100cb565b6110c6565b90565b6110f1906110cc565b9052565b9190611109906000602085019401906110e8565b565b61111f61111a611124926105dc565b6100cb565b6110c6565b90565b6111309061110b565b9052565b919061114890600060208501940190611127565b565b6111526100b5565b5061117e6000611168611163610102565b610121565b63a12b6d3890611176610033565b938492610176565b8252818061118e60048201610277565b03915afa908115611c8357600091611c60575b5060006111b66111b16006610294565b61036d565b61125a6111d56111e460016111c9610033565b92839160208301610065565b6020820181038252038261014d565b61123561122c856112276111f6610394565b9461120a61120261041c565b8a8801610427565b61121e61121561046b565b60208801610427565b60408601610476565b610482565b6060830161049e565b6112548391859061124e611248836104e6565b856104c6565b526104e6565b906104c6565b515061130961128361129261126f607b610505565b611277610033565b9283916020830161052e565b6020820181038252038261014d565b6112e36112da856112d56112a4610394565b946112b86112b0610585565b8a8801610427565b6112cc6112c36105d1565b60208801610427565b60408601610476565b610482565b6060830161049e565b61130383916001906112fd6112f7836105df565b856104c6565b526105df565b906104c6565b51506113b861133261134161131e607b6105fe565b611326610033565b92839160208301610627565b6020820181038252038261014d565b61139261138985611384611353610394565b9461136761135f61067e565b8a8801610427565b61137b6113726106ca565b60208801610427565b60408601610476565b610482565b6060830161049e565b6113b283916002906113ac6113a6836106d8565b856104c6565b526106d8565b906104c6565b51506114656113df6113ee6113cb610735565b6113d3610033565b9283916020830161077e565b6020820181038252038261014d565b61143f61143685611431611400610394565b9461141461140c6107d8565b8a8801610427565b61142861141f610824565b60208801610427565b60408601610476565b610482565b6060830161049e565b61145f839160039061145961145383610832565b856104c6565b52610832565b906104c6565b515061151261148c61149b6114786100ba565b611480610033565b92839160208301610867565b6020820181038252038261014d565b6114ec6114e3856114de6114ad610394565b946114c16114b96108be565b8a8801610427565b6114d56114cc61090a565b60208801610427565b60408601610476565b610482565b6060830161049e565b61150c839160049061150661150083610918565b856104c6565b52610918565b906104c6565b51506115c561153e61154d61152a63499602d2610937565b611532610033565b92839160208301610627565b6020820181038252038261014d565b61159f6115966005611591611560610394565b9461157461156c610994565b8a8801610427565b61158861157f6106ca565b60208801610427565b60408601610476565b6109a2565b6060830161049e565b6115bf83916005906115b96115b3836109be565b856104c6565b526109be565b906104c6565b51506115d76115d2610102565b610121565b6115f9635d425d009492946116046115ed610033565b96879586948594610176565b845260048401610b7c565b03915afa908115611c5b57600091611c38575b50600061162c6116276006610294565b610c4a565b6116998261167461166b61163e610c71565b9261165261164a61041c565b888601610427565b61166661165d61046b565b60208601610427565b610482565b6040830161049e565b6116938391859061168d611687836104e6565b85610c82565b526104e6565b90610c82565b5150611709826116e36116da6116ad610c71565b926116c16116b961067e565b888601610427565b6116d56116cc6105d1565b60208601610427565b610482565b6040830161049e565b61170383916001906116fd6116f7836105df565b85610c82565b526105df565b90610c82565b51506117798261175361174a61171d610c71565b9261173161172961067e565b888601610427565b61174561173c6106ca565b60208601610427565b610482565b6040830161049e565b611773839160029061176d611767836106d8565b85610c82565b526106d8565b90610c82565b51506117e9826117c36117ba61178d610c71565b926117a16117996107d8565b888601610427565b6117b56117ac610824565b60208601610427565b610482565b6040830161049e565b6117e383916003906117dd6117d783610832565b85610c82565b52610832565b90610c82565b51506118598261183361182a6117fd610c71565b926118116118096108be565b888601610427565b61182561181c61090a565b60208601610427565b610482565b6040830161049e565b611853839160049061184d61184783610918565b85610c82565b52610918565b90610c82565b51506118ca60056118a461189b61186e610c71565b9261188261187a610994565b888601610427565b61189661188d6106ca565b60208601610427565b6109a2565b6040830161049e565b6118c483916005906118be6118b8836109be565b85610c82565b526109be565b90610c82565b51506118dc6118d7610102565b610121565b6118fe634dbca7bc9492946119096118f2610033565b96879586948594610176565b845260048401610e5b565b03915afa908115611c3357600091611c10575b5061194b6119348261192e60006104e6565b90610e8b565b516020611940826109da565b818301019101610ecf565b9061197a6119638261195d60016105df565b90610e8b565b51602061196f826109da565b818301019101610f12565b6119a86119918361198b60026106d8565b90610e8b565b51602061199d826109da565b818301019101610f55565b6119d66119bf846119b96003610832565b90610e8b565b5160206119cb826109da565b818301019101610fcd565b91611a3b611a24611a13611a0e6119f7886119f16004610918565b90610e8b565b516020611a03826109da565b818301019101611033565b611052565b95611a1e60056109be565b90610e8b565b516020611a30826109da565b818301019101610f55565b94611a4f611a496000610053565b91610053565b14908115611bf3575b50908115611bd6575b50908115611b44575b50908115611b21575b50908115611b01575b50611ac1576001611ab97fd8aab8e7aeed18e3edfed3aa89e02ce866fef38cad0d4d23704803e47a9b12c591611ab0610033565b91829182611134565b0390a1600190565b6002611af97f265e2b988dfc8e93a6429b673d378fb8914058e8a168f6bb3516c06ae771cac591611af0610033565b918291826110f5565b0390a1600090565b9050611b19611b1363499602d2610937565b916105fb565b141538611a7c565b9050611b3c611b36611b316100ba565b61084e565b9161084e565b141538611a73565b611b619150611b7090611b55610033565b9283916020830161108c565b6020820181038252038261014d565b611b82611b7c826109da565b91611098565b20611bce611bc8611b91610033565b611bb081611ba1602082016110b7565b6020820181038252038261014d565b611bc2611bbc826109da565b91611098565b206110c3565b916110c3565b141538611a6a565b9050611beb611be5607b6105fe565b916105fb565b141538611a61565b9050611c08611c02607b610505565b91610291565b141538611a58565b611c2d91503d806000833e611c25818361014d565b810190610d57565b3861191c565b61027d565b611c5591503d806000833e611c4d818361014d565b810190610241565b38611617565b61027d565b611c7d91503d806000833e611c75818361014d565b810190610241565b386111a1565b61027d56fea2646970667358221220ea76c7886a52df749c90580b3be9db01ee2a2da400873bb6c48bed973de8ada664736f6c634300081d0033",
}

// JsonUserABI is the input ABI used to generate the binding from.
// Deprecated: Use JsonUserMetaData.ABI instead.
var JsonUserABI = JsonUserMetaData.ABI

// JsonUserBin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use JsonUserMetaData.Bin instead.
var JsonUserBin = JsonUserMetaData.Bin

// DeployJsonUser deploys a new Ethereum contract, binding an instance of JsonUser to it.
func DeployJsonUser(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *JsonUser, error) {
	parsed, err := JsonUserMetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(JsonUserBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &JsonUser{JsonUserCaller: JsonUserCaller{contract: contract}, JsonUserTransactor: JsonUserTransactor{contract: contract}, JsonUserFilterer: JsonUserFilterer{contract: contract}}, nil
}

// JsonUser is an auto generated Go binding around an Ethereum contract.
type JsonUser struct {
	JsonUserCaller     // Read-only binding to the contract
	JsonUserTransactor // Write-only binding to the contract
	JsonUserFilterer   // Log filterer for contract events
}

// JsonUserCaller is an auto generated read-only Go binding around an Ethereum contract.
type JsonUserCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// JsonUserTransactor is an auto generated write-only Go binding around an Ethereum contract.
type JsonUserTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// JsonUserFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type JsonUserFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// JsonUserSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type JsonUserSession struct {
	Contract     *JsonUser         // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// JsonUserCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type JsonUserCallerSession struct {
	Contract *JsonUserCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts   // Call options to use throughout this session
}

// JsonUserTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type JsonUserTransactorSession struct {
	Contract     *JsonUserTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts   // Transaction auth options to use throughout this session
}

// JsonUserRaw is an auto generated low-level Go binding around an Ethereum contract.
type JsonUserRaw struct {
	Contract *JsonUser // Generic contract binding to access the raw methods on
}

// JsonUserCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type JsonUserCallerRaw struct {
	Contract *JsonUserCaller // Generic read-only contract binding to access the raw methods on
}

// JsonUserTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type JsonUserTransactorRaw struct {
	Contract *JsonUserTransactor // Generic write-only contract binding to access the raw methods on
}

// NewJsonUser creates a new instance of JsonUser, bound to a specific deployed contract.
func NewJsonUser(address common.Address, backend bind.ContractBackend) (*JsonUser, error) {
	contract, err := bindJsonUser(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &JsonUser{JsonUserCaller: JsonUserCaller{contract: contract}, JsonUserTransactor: JsonUserTransactor{contract: contract}, JsonUserFilterer: JsonUserFilterer{contract: contract}}, nil
}

// NewJsonUserCaller creates a new read-only instance of JsonUser, bound to a specific deployed contract.
func NewJsonUserCaller(address common.Address, caller bind.ContractCaller) (*JsonUserCaller, error) {
	contract, err := bindJsonUser(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &JsonUserCaller{contract: contract}, nil
}

// NewJsonUserTransactor creates a new write-only instance of JsonUser, bound to a specific deployed contract.
func NewJsonUserTransactor(address common.Address, transactor bind.ContractTransactor) (*JsonUserTransactor, error) {
	contract, err := bindJsonUser(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &JsonUserTransactor{contract: contract}, nil
}

// NewJsonUserFilterer creates a new log filterer instance of JsonUser, bound to a specific deployed contract.
func NewJsonUserFilterer(address common.Address, filterer bind.ContractFilterer) (*JsonUserFilterer, error) {
	contract, err := bindJsonUser(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &JsonUserFilterer{contract: contract}, nil
}

// bindJsonUser binds a generic wrapper to an already deployed contract.
func bindJsonUser(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := JsonUserMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_JsonUser *JsonUserRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _JsonUser.Contract.JsonUserCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_JsonUser *JsonUserRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _JsonUser.Contract.JsonUserTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_JsonUser *JsonUserRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _JsonUser.Contract.JsonUserTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_JsonUser *JsonUserCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _JsonUser.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_JsonUser *JsonUserTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _JsonUser.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_JsonUser *JsonUserTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _JsonUser.Contract.contract.Transact(opts, method, params...)
}

// DoSomeJsonActions is a paid mutator transaction binding the contract method 0xd0e5febb.
//
// Solidity: function doSomeJsonActions() returns(bool)
func (_JsonUser *JsonUserTransactor) DoSomeJsonActions(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _JsonUser.contract.Transact(opts, "doSomeJsonActions")
}

// DoSomeJsonActions is a paid mutator transaction binding the contract method 0xd0e5febb.
//
// Solidity: function doSomeJsonActions() returns(bool)
func (_JsonUser *JsonUserSession) DoSomeJsonActions() (*types.Transaction, error) {
	return _JsonUser.Contract.DoSomeJsonActions(&_JsonUser.TransactOpts)
}

// DoSomeJsonActions is a paid mutator transaction binding the contract method 0xd0e5febb.
//
// Solidity: function doSomeJsonActions() returns(bool)
func (_JsonUser *JsonUserTransactorSession) DoSomeJsonActions() (*types.Transaction, error) {
	return _JsonUser.Contract.DoSomeJsonActions(&_JsonUser.TransactOpts)
}

// JsonUserErrorHappenedIterator is returned from FilterErrorHappened and is used to iterate over the raw logs and unpacked data for ErrorHappened events raised by the JsonUser contract.
type JsonUserErrorHappenedIterator struct {
	Event *JsonUserErrorHappened // Event containing the contract specifics and raw log

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
func (it *JsonUserErrorHappenedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(JsonUserErrorHappened)
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
		it.Event = new(JsonUserErrorHappened)
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
func (it *JsonUserErrorHappenedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *JsonUserErrorHappenedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// JsonUserErrorHappened represents a ErrorHappened event raised by the JsonUser contract.
type JsonUserErrorHappened struct {
	Arg0 int8
	Raw  types.Log // Blockchain specific contextual infos
}

// FilterErrorHappened is a free log retrieval operation binding the contract event 0x265e2b988dfc8e93a6429b673d378fb8914058e8a168f6bb3516c06ae771cac5.
//
// Solidity: event ErrorHappened(int8 arg0)
func (_JsonUser *JsonUserFilterer) FilterErrorHappened(opts *bind.FilterOpts) (*JsonUserErrorHappenedIterator, error) {

	logs, sub, err := _JsonUser.contract.FilterLogs(opts, "ErrorHappened")
	if err != nil {
		return nil, err
	}
	return &JsonUserErrorHappenedIterator{contract: _JsonUser.contract, event: "ErrorHappened", logs: logs, sub: sub}, nil
}

// WatchErrorHappened is a free log subscription operation binding the contract event 0x265e2b988dfc8e93a6429b673d378fb8914058e8a168f6bb3516c06ae771cac5.
//
// Solidity: event ErrorHappened(int8 arg0)
func (_JsonUser *JsonUserFilterer) WatchErrorHappened(opts *bind.WatchOpts, sink chan<- *JsonUserErrorHappened) (event.Subscription, error) {

	logs, sub, err := _JsonUser.contract.WatchLogs(opts, "ErrorHappened")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(JsonUserErrorHappened)
				if err := _JsonUser.contract.UnpackLog(event, "ErrorHappened", log); err != nil {
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

// ParseErrorHappened is a log parse operation binding the contract event 0x265e2b988dfc8e93a6429b673d378fb8914058e8a168f6bb3516c06ae771cac5.
//
// Solidity: event ErrorHappened(int8 arg0)
func (_JsonUser *JsonUserFilterer) ParseErrorHappened(log types.Log) (*JsonUserErrorHappened, error) {
	event := new(JsonUserErrorHappened)
	if err := _JsonUser.contract.UnpackLog(event, "ErrorHappened", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// JsonUserOkIterator is returned from FilterOk and is used to iterate over the raw logs and unpacked data for Ok events raised by the JsonUser contract.
type JsonUserOkIterator struct {
	Event *JsonUserOk // Event containing the contract specifics and raw log

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
func (it *JsonUserOkIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(JsonUserOk)
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
		it.Event = new(JsonUserOk)
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
func (it *JsonUserOkIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *JsonUserOkIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// JsonUserOk represents a Ok event raised by the JsonUser contract.
type JsonUserOk struct {
	Arg0 int8
	Raw  types.Log // Blockchain specific contextual infos
}

// FilterOk is a free log retrieval operation binding the contract event 0xd8aab8e7aeed18e3edfed3aa89e02ce866fef38cad0d4d23704803e47a9b12c5.
//
// Solidity: event Ok(int8 arg0)
func (_JsonUser *JsonUserFilterer) FilterOk(opts *bind.FilterOpts) (*JsonUserOkIterator, error) {

	logs, sub, err := _JsonUser.contract.FilterLogs(opts, "Ok")
	if err != nil {
		return nil, err
	}
	return &JsonUserOkIterator{contract: _JsonUser.contract, event: "Ok", logs: logs, sub: sub}, nil
}

// WatchOk is a free log subscription operation binding the contract event 0xd8aab8e7aeed18e3edfed3aa89e02ce866fef38cad0d4d23704803e47a9b12c5.
//
// Solidity: event Ok(int8 arg0)
func (_JsonUser *JsonUserFilterer) WatchOk(opts *bind.WatchOpts, sink chan<- *JsonUserOk) (event.Subscription, error) {

	logs, sub, err := _JsonUser.contract.WatchLogs(opts, "Ok")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(JsonUserOk)
				if err := _JsonUser.contract.UnpackLog(event, "Ok", log); err != nil {
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

// ParseOk is a log parse operation binding the contract event 0xd8aab8e7aeed18e3edfed3aa89e02ce866fef38cad0d4d23704803e47a9b12c5.
//
// Solidity: event Ok(int8 arg0)
func (_JsonUser *JsonUserFilterer) ParseOk(log types.Log) (*JsonUserOk, error) {
	event := new(JsonUserOk)
	if err := _JsonUser.contract.UnpackLog(event, "Ok", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
