from pathlib import Path

import pytest
from eth_bloom import BloomFilter
from eth_utils import abi, big_endian_to_int
from hexbytes import HexBytes
from web3.datastructures import AttributeDict

from .network import setup_custom_ethermint
from .utils import (
    ADDRS,
    CONTRACTS,
    KEYS,
    deploy_contract,
    sign_transaction,
    w3_wait_for_new_blocks,
)


@pytest.fixture(scope="module")
def pruned(request, tmp_path_factory):
    """start-cronos
    params: enable_auto_deployment
    """
    yield from setup_custom_ethermint(
        tmp_path_factory.mktemp("pruned"),
        26900,
        Path(__file__).parent / "configs/pruned_node.jsonnet",
    )


def test_pruned_node(pruned):
    """
    test basic json-rpc apis works in pruned node
    """
    w3 = pruned.w3
    erc20 = deploy_contract(
        w3,
        CONTRACTS["TestERC20A"],
        key=KEYS["validator"],
    )
    tx = erc20.functions.transfer(ADDRS["community"], 10).buildTransaction(
        {"from": ADDRS["validator"]}
    )
    signed = sign_transaction(w3, tx, KEYS["validator"])
    txhash = w3.eth.send_raw_transaction(signed.rawTransaction)
    print("wait for prunning happens")
    w3_wait_for_new_blocks(w3, 10)

    tx_receipt = w3.eth.get_transaction_receipt(txhash.hex())
    assert len(tx_receipt.logs) == 1
    expect_log = {
        "address": erc20.address,
        "topics": [
            HexBytes(
                abi.event_signature_to_log_topic("Transfer(address,address,uint256)")
            ),
            HexBytes(b"\x00" * 12 + HexBytes(ADDRS["validator"])),
            HexBytes(b"\x00" * 12 + HexBytes(ADDRS["community"])),
        ],
        "data": "0x000000000000000000000000000000000000000000000000000000000000000a",
        "transactionIndex": 0,
        "logIndex": 0,
        "removed": False,
    }
    assert expect_log.items() <= tx_receipt.logs[0].items()

    # check get_balance and eth_call don't work on pruned state
    # we need to check error message here.
    # `get_balance` returns unmarshallJson and thats not what it should
    res = w3.eth.get_balance(ADDRS["validator"], "latest")
    assert res > 0

    pruned_res = pruned.w3.provider.make_request(
        "eth_getBalance", [ADDRS["validator"], hex(tx_receipt.blockNumber)]
    )
    assert "error" in pruned_res
    assert (
        pruned_res["error"]["message"] == "couldn't fetch balance. Node state is pruned"
    )

    with pytest.raises(Exception):
        erc20.caller(block_identifier=tx_receipt.blockNumber).balanceOf(
            ADDRS["validator"]
        )

    # check block bloom
    block = w3.eth.get_block(tx_receipt.blockNumber)

    assert "baseFeePerGas" in block
    assert block.miner == "0x0000000000000000000000000000000000000000"
    bloom = BloomFilter(big_endian_to_int(block.logsBloom))
    assert HexBytes(erc20.address) in bloom
    for topic in expect_log["topics"]:
        assert topic in bloom

    tx1 = w3.eth.get_transaction(txhash)
    tx2 = w3.eth.get_transaction_by_block(
        tx_receipt.blockNumber, tx_receipt.transactionIndex
    )
    exp_tx = AttributeDict(
        {
            "from": "0x57f96e6B86CdeFdB3d412547816a82E3E0EbF9D2",
            "gas": 51542,
            "input": (
                "0xa9059cbb000000000000000000000000378c50d9264c63f3f92b806d4ee56e"
                "9d86ffb3ec000000000000000000000000000000000000000000000000000000"
                "000000000a"
            ),
            "nonce": 2,
            "to": erc20.address,
            "transactionIndex": 0,
            "value": 0,
            "type": "0x2",
            "accessList": [],
            "chainId": "0x2328",
        }
    )
    assert tx1 == tx2
    for name in exp_tx.keys():
        assert tx1[name] == tx2[name] == exp_tx[name]

    logs = w3.eth.get_logs(
        {
            "fromBlock": tx_receipt.blockNumber,
            "toBlock": tx_receipt.blockNumber,
        }
    )[0]
    assert (
        "address" in logs
        and logs["address"] == "0x68542BD12B41F5D51D6282Ec7D91D7d0D78E4503"
    )
    assert "topics" in logs and len(logs["topics"]) == 3
    assert logs["topics"][0] == HexBytes(
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
    )
    assert logs["topics"][1] == HexBytes(
        "0x00000000000000000000000057f96e6b86cdefdb3d412547816a82e3e0ebf9d2"
    )
    assert logs["topics"][2] == HexBytes(
        "0x000000000000000000000000378c50d9264c63f3f92b806d4ee56e9d86ffb3ec"
    )
