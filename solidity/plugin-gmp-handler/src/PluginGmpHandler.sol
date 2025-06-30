// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@warden-protocol/precompiled/json/IJson.sol" as json;
import "@warden-protocol/precompiled/async/IAsync.sol";
import "@warden-protocol/precompiled/common/Types.sol";

contract PluginGmpHandler {
    bytes32 public constant Echo = keccak256(abi.encodePacked("echo"));
    bytes32 public constant Http = keccak256(abi.encodePacked("http"));
    bytes32 public constant Pfp = keccak256(abi.encodePacked("pfp"));
    bytes32 public constant PricePred = keccak256(abi.encodePacked("pricepred"));
    bytes32 public constant Quantkit = keccak256(abi.encodePacked("quantkit"));
    bytes32 public constant Venice = keccak256(abi.encodePacked("venice"));
    bytes32 public constant VeniceImg = keccak256(abi.encodePacked("veniceimg"));

    struct QuantkitInput {
        QuantkitAsset[] assets;
        string strategyName;
        string beginTimestamp;
        string endTimestamp;
        string horizonTimestamp;
    }

    struct QuantkitAsset {
        string coinId;
        uint256 amount;
    }

    IMailbox public mailbox;
    bytes32 public destinationSender;
    bytes public destinationMsg;
    uint32 public origin;
    bytes32 public sender;
    bytes32 public msgId;
    uint64 public lastTaskId;
    uint64 public lastCbId;
    bytes public output;

    constructor(address _mailbox) {
        mailbox = IMailbox(_mailbox);
    }

    function Run(bytes calldata payload) public {
        Types.Coin[] memory maxFee;
        (string memory plugin, bytes memory pluginPayload) = abi.decode(payload, (string, bytes));

        bytes32 p = keccak256(abi.encodePacked(plugin));

        bytes memory pluginInput;
        if (p == Echo || p == Http || p == Pfp || p == PricePred) {
            pluginInput = pluginPayload;
        } else if (p == Venice) {
            (string memory model, string memory message) = abi.decode(pluginPayload, (string, string));
            bytes memory j = json.IJSON_CONTRACT.newJson();
            json.SetKeyValue[] memory setKeyValuePairs = new json.SetKeyValue[](4);
            setKeyValuePairs[0] = json.SetKeyValue("model", "string", abi.encode(model), 0);
            setKeyValuePairs[1] = json.SetKeyValue("message", "string", abi.encode(message), 0);
            setKeyValuePairs[2] = json.SetKeyValue("top_p", "float", abi.encode(9), 1);
            setKeyValuePairs[3] = json.SetKeyValue("temperature", "float", abi.encode(8), 1);
            pluginInput = json.IJSON_CONTRACT.write(j, setKeyValuePairs);
            // } else if (p == Quantkit) {
            // TODO: currently hitting a cosmos/evm limit:
            // https://github.com/cosmos/evm/issues/135
            //
            //     QuantkitInput memory inp = abi.decode(pluginPayload, (QuantkitInput));
            //
            //     bytes[] memory assetsJson = new bytes[](inp.assets.length);
            //     for (uint i = 0; i < inp.assets.length; i++) {
            //         bytes memory assetJ = json.IJSON_CONTRACT.newJson();
            //         assetJ = json.IJSON_CONTRACT.setString(assetJ, "coin_id", inp.assets[i].coinId);
            //         assetJ = json.IJSON_CONTRACT.setUint256(assetJ, "amount", inp.assets[i].amount);
            //         assetsJson[i] = assetJ;
            //     }
            //
            //     bytes memory state = json.IJSON_CONTRACT.newJson();
            //     state = json.IJSON_CONTRACT.setObjectsArray(state, "assets", assetsJson);
            //
            //     bytes memory j = json.IJSON_CONTRACT.newJson();
            //     json.SetKeyValue[] memory setKeyValuePairs = new json.SetKeyValue[](5);
            //     setKeyValuePairs[0] = json.SetKeyValue("begin", "string", abi.encode(inp.beginTimestamp), 0);
            //     setKeyValuePairs[1] = json.SetKeyValue("end", "string", abi.encode(inp.endTimestamp), 0);
            //     setKeyValuePairs[2] = json.SetKeyValue("horizon", "string", abi.encode(inp.horizonTimestamp), 0);
            //     setKeyValuePairs[3] = json.SetKeyValue("strategy_name", "string", abi.encode(inp.strategyName), 0);
            //     j = json.IJSON_CONTRACT.write(j, setKeyValuePairs);
            //     j = json.IJSON_CONTRACT.setObject(j, "state", state);
            //
            //     pluginInput = j;
        } else if (p == VeniceImg) {
            (string memory model, string memory prompt, int256 steps, string memory stylePreset) =
                abi.decode(pluginPayload, (string, string, int256, string));
            bytes memory j = json.IJSON_CONTRACT.newJson();
            json.SetKeyValue[] memory setKeyValuePairs = new json.SetKeyValue[](4);
            setKeyValuePairs[0] = json.SetKeyValue("model", "string", abi.encode(model), 0);
            setKeyValuePairs[1] = json.SetKeyValue("prompt", "string", abi.encode(prompt), 0);
            setKeyValuePairs[2] = json.SetKeyValue("steps", "int", abi.encode(steps), 0);
            setKeyValuePairs[3] = json.SetKeyValue("style_preset", "string", abi.encode(stylePreset), 0);
            pluginInput = json.IJSON_CONTRACT.write(j, setKeyValuePairs);
        } else {
            revert("unsupported plugin");
        }

        lastTaskId = IASYNC_CONTRACT.addTask(plugin, pluginInput, maxFee, CallbackParams(address(this), 100000000));

        TaskByIdResponse memory taskResponse = IASYNC_CONTRACT.taskById(lastTaskId);
        lastCbId = taskResponse.taskResponse.task.callbackId;
    }

    function cb(uint64 id, bytes calldata o) external returns (bytes memory) {
        if (msg.sender != ISCHED_CONTRACT.getAddress()) {
            revert Unauthorized();
        }

        if (id == lastCbId) {
            TaskByIdResponse memory task = IASYNC_CONTRACT.taskById(lastTaskId);

            if (task.taskResponse.result.id == 0) revert NotReady();

            output = task.taskResponse.result.output;
        }

        bytes memory data = abi.encode(output, id);
        uint256 fees = mailbox.quoteDispatch(origin, sender, data);
        msgId = mailbox.dispatch{value: fees}(origin, sender, data);
        return o;
    }

    function handle(uint32 _origin, bytes32 _sender, bytes calldata input) external payable {
        origin = _origin;
        sender = _sender;
        Run(input);
    }
}

error Unauthorized();
error NotReady();

interface IMailbox {
    function dispatch(uint32 destinationDomain, bytes32 recipientAddress, bytes calldata messageBody)
        external
        payable
        returns (bytes32 messageId);
    function quoteDispatch(uint32 destinationDomain, bytes32 recipientAddress, bytes calldata messageBody)
        external
        view
        returns (uint256 fee);
}
