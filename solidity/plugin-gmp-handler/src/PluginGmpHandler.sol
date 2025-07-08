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

    struct QuantkitAsset {
        string coinId;
        uint256 amount;
    }

    struct QuantkitInput {
        QuantkitAsset[] assets;
        string strategyName;
        string beginTimestamp;
        string endTimestamp;
        string horizonTimestamp;
    }

    struct VeniceInput {
        string model;
        string message;
        uint256 top_p;
        uint256 temperature;
    }

    struct VeniceImgInput {
        string model;
        string prompt;
        uint256 steps;
        string style_preset;
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

    function decodeAndProcessPluginInput(string memory plugin, bytes memory pluginPayload)
        public
        view
        returns (bytes memory)
    {
        bytes32 p = keccak256(abi.encodePacked(plugin));

        if (p == Echo || p == Http || p == Pfp || p == PricePred) {
            return pluginPayload;
        } else if (p == Venice) {
            VeniceInput memory inp = abi.decode(pluginPayload, (VeniceInput));
            bytes memory j = json.IJSON_CONTRACT.newJson();
            json.SetKeyValue[] memory setKeyValuePairs = new json.SetKeyValue[](4);
            setKeyValuePairs[0] = json.SetKeyValue("model", "string", abi.encode(inp.model), 0);
            setKeyValuePairs[1] = json.SetKeyValue("message", "string", abi.encode(inp.message), 0);
            setKeyValuePairs[2] = json.SetKeyValue("top_p", "float", abi.encode(inp.top_p), 1);
            setKeyValuePairs[3] = json.SetKeyValue("temperature", "float", abi.encode(inp.temperature), 1);
            return json.IJSON_CONTRACT.write(j, setKeyValuePairs);
        } else if (p == VeniceImg) {
            VeniceImgInput memory inp = abi.decode(pluginPayload, (VeniceImgInput));
            bytes memory j = json.IJSON_CONTRACT.newJson();
            json.SetKeyValue[] memory setKeyValuePairs = new json.SetKeyValue[](4);
            setKeyValuePairs[0] = json.SetKeyValue("model", "string", abi.encode(inp.model), 0);
            setKeyValuePairs[1] = json.SetKeyValue("prompt", "string", abi.encode(inp.prompt), 0);
            setKeyValuePairs[2] = json.SetKeyValue("steps", "uint256", abi.encode(inp.steps), 0);
            setKeyValuePairs[3] = json.SetKeyValue("style_preset", "string", abi.encode(inp.style_preset), 0);
            return json.IJSON_CONTRACT.write(j, setKeyValuePairs);
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
        }

        revert("unsupported plugin");
    }

    function Run(bytes calldata payload) public {
        Types.Coin[] memory maxFee;
        (string memory plugin, bytes memory pluginPayload) = abi.decode(payload, (string, bytes));

        bytes memory pluginInput = decodeAndProcessPluginInput(plugin, pluginPayload);
        lastTaskId = IASYNC_CONTRACT.addTask(plugin, pluginInput, maxFee, CallbackParams(address(this), 100000000));

        TaskByIdResponse memory taskResponse = IASYNC_CONTRACT.taskById(lastTaskId);
        lastCbId = taskResponse.taskResponse.task.callbackId;
    }

    function cb(uint64 id, bytes calldata o) external returns (bytes memory) {
        if (msg.sender != ISCHED_PRECOMPILE_ADDRESS) {
            revert Unauthorized(msg.sender);
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

error Unauthorized(address);
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
