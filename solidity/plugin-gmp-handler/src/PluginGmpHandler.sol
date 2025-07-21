// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {IJSON_CONTRACT, JsonOp, JsonUtils, FixedPoint} from "@warden-protocol/precompiled/json/IJson.sol";
import "@warden-protocol/precompiled/async/IAsync.sol";
import "@warden-protocol/precompiled/common/Types.sol";

contract PluginGmpHandler {
    using JsonUtils for JsonUtils.JsonBuilder;

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

    struct QuantkitOrder {
        string src;
        string dst;
        FixedPoint amount;
    }

    struct VeniceInput {
        string model;
        string message;
        int256 top_p;
        int256 temperature;
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

    function decodePluginInput(string memory plugin, bytes memory pluginPayload) public pure returns (bytes memory) {
        bytes32 p = keccak256(abi.encodePacked(plugin));

        if (p == Echo || p == Http || p == Pfp || p == PricePred) {
            return pluginPayload;
        } else if (p == Venice) {
            VeniceInput memory inp = abi.decode(pluginPayload, (VeniceInput));
            JsonUtils.JsonBuilder memory metadataBuilder = JsonUtils.newBuilder();
            metadataBuilder.startObject();
            metadataBuilder.pair("model", inp.model);
            metadataBuilder.pair("message", inp.message);
            metadataBuilder.pair("top_p", FixedPoint(inp.top_p, 1));
            metadataBuilder.pair("temperature", FixedPoint(inp.temperature, 1));
            metadataBuilder.endObject();
            return metadataBuilder.build();
        } else if (p == VeniceImg) {
            VeniceImgInput memory inp = abi.decode(pluginPayload, (VeniceImgInput));
            JsonUtils.JsonBuilder memory metadataBuilder = JsonUtils.newBuilder();
            metadataBuilder.startObject();
            metadataBuilder.pair("model", inp.model);
            metadataBuilder.pair("prompt", inp.prompt);
            metadataBuilder.pair("steps", inp.steps);
            metadataBuilder.pair("style_preset", inp.style_preset);
            metadataBuilder.endObject();
            return metadataBuilder.build();
        } else if (p == Quantkit) {
            QuantkitInput memory inp = abi.decode(pluginPayload, (QuantkitInput));
            JsonUtils.JsonBuilder memory metadataBuilder = JsonUtils.newBuilder();

            metadataBuilder.startObject();
            metadataBuilder.pair("begin", inp.beginTimestamp);
            metadataBuilder.pair("end", inp.endTimestamp);
            metadataBuilder.pair("horizon", inp.horizonTimestamp);
            metadataBuilder.pair("strategy_name", inp.strategyName);
            metadataBuilder.key("state");
            metadataBuilder.startObject();
            metadataBuilder.key("assets");
            metadataBuilder.startArray();
            for (uint256 i = 0; i < inp.assets.length; i++) {
                metadataBuilder.startObject();
                metadataBuilder.pair("coin_id", inp.assets[i].coinId);
                metadataBuilder.pair("amount", inp.assets[i].amount);
                metadataBuilder.endObject();
            }
            metadataBuilder.endArray();
            metadataBuilder.endObject();
            metadataBuilder.endObject();
            return metadataBuilder.build();
        }

        revert("unsupported plugin");
    }

    function encodePluginOutput(string memory plugin, bytes memory pluginPayload) public view returns (bytes memory) {
        bytes32 p = keccak256(abi.encodePacked(plugin));
        if (p == Quantkit) {
            string memory schema = "orders:(src:string,dst:string,amount:fp)[]";
            bytes[] memory ordersEnc = abi.decode(IJSON_CONTRACT.parse(pluginPayload, bytes(schema)), (bytes[]));
            QuantkitOrder[] memory orders = new QuantkitOrder[](ordersEnc.length);
            for (uint256 i = 0; i < orders.length; i++) {
                (string memory src, string memory dst, FixedPoint memory fp) =
                    abi.decode(ordersEnc[i], (string, string, FixedPoint));
                orders[i] = QuantkitOrder(src, dst, fp);
            }
            return abi.encode(orders);
        }

        return pluginPayload;
    }

    function Run(bytes calldata payload) public {
        Types.Coin[] memory maxFee;
        (string memory plugin, bytes memory pluginPayload) = abi.decode(payload, (string, bytes));

        bytes memory pluginInput = decodePluginInput(plugin, pluginPayload);
        lastTaskId = IASYNC_CONTRACT.addTask(plugin, pluginInput, maxFee, CallbackParams(address(this), 100000000));

        TaskByIdResponse memory taskResponse = IASYNC_CONTRACT.taskById(lastTaskId);
        lastCbId = taskResponse.taskResponse.task.callbackId;
    }

    struct PluginResponse {
        uint64 task_id;
        bytes data;
    }

    function cb(uint64 id, bytes calldata o) external returns (bytes memory) {
        if (msg.sender != ISCHED_PRECOMPILE_ADDRESS) {
            revert Unauthorized(msg.sender);
        }

        if (id == lastCbId) {
            TaskByIdResponse memory task = IASYNC_CONTRACT.taskById(lastTaskId);

            if (task.taskResponse.result.id == 0) revert NotReady();

            output = encodePluginOutput(task.taskResponse.task.plugin, task.taskResponse.result.output);
        }

        PluginResponse memory response = PluginResponse(lastTaskId, output);
        bytes memory data = abi.encode(response);
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
