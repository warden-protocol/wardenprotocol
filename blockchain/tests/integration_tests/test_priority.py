import sys

import pytest

from .network import setup_ethermint
from .utils import ADDRS, KEYS, eth_to_bech32, sign_transaction, wait_for_new_blocks

PRIORITY_REDUCTION = 1000000


@pytest.fixture(scope="module")
def custom_ethermint(tmp_path_factory):
    path = tmp_path_factory.mktemp("priority")
    yield from setup_ethermint(path, 26800, long_timeout_commit=True)


def effective_gas_price(tx, base_fee):
    if "maxFeePerGas" in tx:
        # dynamic fee tx
        return min(base_fee + tx["maxPriorityFeePerGas"], tx["maxFeePerGas"])
    else:
        # legacy tx
        return tx["gasPrice"]


def tx_priority(tx, base_fee):
    if "maxFeePerGas" in tx:
        # dynamic fee tx
        return (
            min(tx["maxPriorityFeePerGas"], tx["maxFeePerGas"] - base_fee)
            // PRIORITY_REDUCTION
        )
    else:
        # legacy tx
        return (tx["gasPrice"] - base_fee) // PRIORITY_REDUCTION


def test_priority(ethermint):
    """
    test priorities of different tx types

    use a relatively large priority number to counter
    the effect of base fee change during the testing.
    """
    w3 = ethermint.w3
    amount = 10000
    base_fee = w3.eth.get_block("latest").baseFeePerGas

    # [ ( sender, tx ), ... ]
    # use different senders to avoid nonce conflicts
    test_cases = [
        (
            "validator",
            {
                "to": "0x0000000000000000000000000000000000000000",
                "value": amount,
                "gas": 21000,
                "maxFeePerGas": base_fee + PRIORITY_REDUCTION * 600000,
                "maxPriorityFeePerGas": 0,
            },
        ),
        (
            "community",
            {
                "to": "0x0000000000000000000000000000000000000000",
                "value": amount,
                "gas": 21000,
                "gasPrice": base_fee + PRIORITY_REDUCTION * 200000,
            },
        ),
        (
            "signer2",
            {
                "to": "0x0000000000000000000000000000000000000000",
                "value": amount,
                "gasPrice": base_fee + PRIORITY_REDUCTION * 400000,
                "accessList": [
                    {
                        "address": "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
                        "storageKeys": (
                            "0x00000000000000000000000000000000000000000000000000000000"
                            "00000003",
                            "0x00000000000000000000000000000000000000000000000000000000"
                            "00000007",
                        ),
                    }
                ],
            },
        ),
        (
            "signer1",
            {
                "to": "0x0000000000000000000000000000000000000000",
                "value": amount,
                "gas": 21000,
                "maxFeePerGas": base_fee + PRIORITY_REDUCTION * 600000,
                "maxPriorityFeePerGas": PRIORITY_REDUCTION * 600000,
            },
        ),
    ]

    # test cases are ordered by priority
    expect_priorities = [tx_priority(tx, base_fee) for _, tx in test_cases]
    assert expect_priorities == [0, 200000, 400000, 600000]

    signed = [sign_transaction(w3, tx, key=KEYS[sender]) for sender, tx in test_cases]
    # send the txs from low priority to high,
    # but the later sent txs should be included earlier.
    txhashes = [w3.eth.send_raw_transaction(tx.rawTransaction) for tx in signed]

    receipts = [w3.eth.wait_for_transaction_receipt(txhash) for txhash in txhashes]
    print(receipts)
    assert all(receipt.status == 1 for receipt in receipts), "expect all txs success"

    # the later txs should be included earlier because of higher priority
    # FIXME there's some non-deterministics due to mempool logic
    tx_indexes = [(r.blockNumber, r.transactionIndex) for r in receipts]
    print(tx_indexes)
    # the first sent tx are included later, because of lower priority
    assert all(i1 > i2 for i1, i2 in zip(tx_indexes, tx_indexes[1:]))


def test_native_tx_priority(ethermint):
    cli = ethermint.cosmos_cli()
    base_fee = cli.query_base_fee()
    print("base_fee", base_fee)
    test_cases = [
        {
            "from": eth_to_bech32(ADDRS["community"]),
            "to": eth_to_bech32(ADDRS["validator"]),
            "amount": "1000aphoton",
            "gas_prices": f"{base_fee + PRIORITY_REDUCTION * 600000}aphoton",
            "max_priority_price": 0,
        },
        {
            "from": eth_to_bech32(ADDRS["signer1"]),
            "to": eth_to_bech32(ADDRS["signer2"]),
            "amount": "1000aphoton",
            "gas_prices": f"{base_fee + PRIORITY_REDUCTION * 600000}aphoton",
            "max_priority_price": PRIORITY_REDUCTION * 200000,
        },
        {
            "from": eth_to_bech32(ADDRS["signer2"]),
            "to": eth_to_bech32(ADDRS["signer1"]),
            "amount": "1000aphoton",
            "gas_prices": f"{base_fee + PRIORITY_REDUCTION * 400000}aphoton",
            "max_priority_price": PRIORITY_REDUCTION * 400000,
        },
        {
            "from": eth_to_bech32(ADDRS["validator"]),
            "to": eth_to_bech32(ADDRS["community"]),
            "amount": "1000aphoton",
            "gas_prices": f"{base_fee + PRIORITY_REDUCTION * 600000}aphoton",
            "max_priority_price": None,  # no extension, maximum tipFeeCap
        },
    ]
    txs = []
    expect_priorities = []
    for tc in test_cases:
        tx = cli.transfer(
            tc["from"],
            tc["to"],
            tc["amount"],
            gas_prices=tc["gas_prices"],
            generate_only=True,
        )
        txs.append(
            cli.sign_tx_json(
                tx, tc["from"], max_priority_price=tc.get("max_priority_price")
            )
        )
        gas_price = int(tc["gas_prices"].removesuffix("aphoton"))
        expect_priorities.append(
            min(
                get_max_priority_price(tc.get("max_priority_price")),
                gas_price - base_fee,
            )
            // PRIORITY_REDUCTION
        )
    assert expect_priorities == [0, 200000, 400000, 600000]

    txhashes = []
    for tx in txs:
        rsp = cli.broadcast_tx_json(tx, broadcast_mode="sync")
        assert rsp["code"] == 0, rsp["raw_log"]
        txhashes.append(rsp["txhash"])

    print("wait for two new blocks, so the sent txs are all included")
    wait_for_new_blocks(cli, 2)

    tx_results = [cli.tx_search_rpc(f"tx.hash='{txhash}'")[0] for txhash in txhashes]
    tx_indexes = [(int(r["height"]), r["index"]) for r in tx_results]
    print(tx_indexes)
    # the first sent tx are included later, because of lower priority
    # ensure desc within continuous block
    assert all((
        b1 < b2 or (b1 == b2 and i1 > i2)
    ) for (b1, i1), (b2, i2) in zip(tx_indexes, tx_indexes[1:]))


def get_max_priority_price(max_priority_price):
    "default to max int64 if None"
    return max_priority_price if max_priority_price is not None else sys.maxsize
