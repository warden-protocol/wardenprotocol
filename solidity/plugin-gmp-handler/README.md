# PluginGmpHandler

This contract is receiving messages from Hyperlane for invoking Warden
Protocol's plugins.

The message sent to Hyperlane is an ABI-encoded tuple `<string, bytes>` where
the string is the ID of the plugin to invoke, and the bytes is the
plugin-specific payload.

## How to send a request

```sol
contract Example {
    IMailbox mailbox;
    uint32 wardenChainId;
    bytes32 pluginGmpHandler;

    constructor() {
        // address of the Hyperlane mailbox on your chain (e.g. Sepolia)
        mailbox = IMailbox(0x2e7FAb47da4AeE0A8b8F8AAfFAB1Ca698F864bdf);

        // address of this contract on the Warden Protocol chain
        pluginGmpHandler = bytes32(uint256(uint160(0xA6FF0EFd8E82dc79b01163B0d2B815E3AB5Cb713)));

        // chain id of Warden Protocol
        wardenChainId = 141414;
    }

    function echo() external payable returns (bytes32 messageId) {
        bytes memory echoPayload = abi.encode("hello world");

        // "echo" is the plugin name
        // echoPayload is the specific payload for the echo plugin
        bytes memory wardenPayload = abi.encode("echo", echoPayload);

        // use Hyperlane to dispatch the message
        return mailbox.dispatch{value: msg.value}(
            wardenChainId,
            pluginGmpHandler,
            wardenPayload
        );
    }
}
```

## How to receive a response

Hyperlane's mailbox expect a `handle(uint32, bytes32, bytes)` function to call
when a message is received.

The actual messages is a `tuple(bytes, uint64)` where the bytes are the output
from the plugin, and the uint64 is callback unique ID that generated it on the
Warden Protocol.

```sol
contract Example {
    ...

    function handle(
        uint32,
        bytes32 _sender,
        bytes calldata _message
    ) external payable {
        (bytes memory _output, uint64 _callbackId) = abi.decode(_message, (bytes, uint64));
    }
}
```

## Supported plugins

### echo

**Input payload**: `bytes`.

**Output payload**: `bytes`.

### pfp

**Input payload**: `string` (`prompt`).

**Output payload**: `string` (URL for the metadata file).

### venice

**Input payload**: `tuple(string, string)` (model, message).

**Output payload**: `string` (model output).

### veniceimg

**Input payload**: `tuple(string, string, int, string)` (`model`, `prompt`,
`steps`, `style_preset`).

**Output payload**: `bytes` (raw image bytes).
