from .expected_constants import (
    EXPECTED_FEE_HISTORY,
    EXPECTED_GET_PROOF,
    EXPECTED_GET_STORAGE_AT,
    EXPECTED_GET_TRANSACTION,
    EXPECTED_GET_TRANSACTION_RECEIPT,
)
from .utils import (
    ADDRS,
    CONTRACTS,
    KEYS,
    deploy_contract,
    send_transaction,
    w3_wait_for_block,
    w3_wait_for_new_blocks,
)


def test_block(ethermint, geth):
    get_blocks(ethermint, geth, False)
    get_blocks(ethermint, geth, True)


def get_blocks(ethermint, geth, with_transactions):
    eth_rpc = ethermint.w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(
        eth_rpc, geth_rpc, "eth_getBlockByNumber", ["0x0", with_transactions]
    )

    make_same_rpc_calls(
        eth_rpc, geth_rpc, "eth_getBlockByNumber", ["0x2710", with_transactions]
    )

    ethermint_blk = ethermint.w3.eth.get_block(1)
    # Get existing block, no transactions
    eth_rsp = eth_rpc.make_request(
        "eth_getBlockByHash", [ethermint_blk["hash"].hex(), with_transactions]
    )
    geth_rsp = geth_rpc.make_request(
        "eth_getBlockByHash",
        [
            "0x124d099a1f435d3a6155e5d157ff1078eaefb742435892677ee5b3cb5e6fa055",
            with_transactions,
        ],
    )
    res, err = same_types(eth_rsp, geth_rsp)
    assert res, err

    # Get not existing block
    make_same_rpc_calls(
        eth_rpc,
        geth_rpc,
        "eth_getBlockByHash",
        [
            "0x4e3a3754410177e6937ef1f84bba68ea139e8d1a2258c5f85db9f1cd715a1bdd",
            with_transactions,
        ],
    )

    # Bad call
    make_same_rpc_calls(
        eth_rpc, geth_rpc, "eth_getBlockByHash", ["0", with_transactions]
    )


def test_accounts(ethermint, geth):
    eth_rpc = ethermint.w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_accounts", [])


def test_syncing(ethermint, geth):
    eth_rpc = ethermint.w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_syncing", [])


def test_coinbase(ethermint, geth):
    eth_rpc = ethermint.w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_coinbase", [])


def test_max_priority_fee(ethermint, geth):
    eth_rpc = ethermint.w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_maxPriorityFeePerGas", [])


def test_gas_price(ethermint, geth):
    eth_rpc = ethermint.w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_gasPrice", [])


def test_block_number(ethermint, geth):
    eth_rpc = ethermint.w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_blockNumber", [])


def test_balance(ethermint, geth):
    eth_rpc = ethermint.w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(
        eth_rpc,
        geth_rpc,
        "eth_getBalance",
        ["0x57f96e6b86cdefdb3d412547816a82e3e0ebf9d2", "latest"],
    )
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_getBalance", ["0", "latest"])
    make_same_rpc_calls(
        eth_rpc,
        geth_rpc,
        "eth_getBalance",
        ["0x9907a0cf64ec9fbf6ed8fd4971090de88222a9ac", "latest"],
    )
    make_same_rpc_calls(
        eth_rpc,
        geth_rpc,
        "eth_getBalance",
        ["0x57f96e6b86cdefdb3d412547816a82e3e0ebf9d2", "0x0"],
    )
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_getBalance", ["0", "0x0"])
    make_same_rpc_calls(
        eth_rpc,
        geth_rpc,
        "eth_getBalance",
        ["0x9907a0cf64ec9fbf6ed8fd4971090de88222a9ac", "0x0"],
    )
    make_same_rpc_calls(
        eth_rpc,
        geth_rpc,
        "eth_getBalance",
        ["0x57f96e6b86cdefdb3d412547816a82e3e0ebf9d2", "0x10000"],
    )
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_getBalance", ["0", "0x10000"])
    make_same_rpc_calls(
        eth_rpc,
        geth_rpc,
        "eth_getBalance",
        ["0x9907a0cf64ec9fbf6ed8fd4971090de88222a9ac", "0x10000"],
    )


def deploy_and_wait(w3, number=1):
    contract = deploy_contract(
        w3,
        CONTRACTS["TestERC20A"],
    )

    w3_wait_for_new_blocks(w3, number)
    return contract


def test_get_storage_at(ethermint, geth):
    eth_rpc = ethermint.w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(
        eth_rpc,
        geth_rpc,
        "eth_getStorageAt",
        ["0x57f96e6b86cdefdb3d412547816a82e3e0ebf9d2", "0x0", "latest"],
    )

    contract = deploy_and_wait(ethermint.w3)
    res = eth_rpc.make_request("eth_getStorageAt", [contract.address, "0x0", "latest"])
    res, err = same_types(res["result"], EXPECTED_GET_STORAGE_AT)
    assert res, err


def send_and_get_hash(w3, tx_value=10):
    # Do an ethereum transfer
    gas_price = w3.eth.gas_price
    tx = {"to": ADDRS["community"], "value": tx_value, "gasPrice": gas_price}
    return send_transaction(w3, tx, KEYS["validator"])["transactionHash"].hex()


def test_get_proof(ethermint, geth):
    # on ethermint the proof query will fail for block numbers <= 2
    # so we must wait for several blocks
    w3_wait_for_block(ethermint.w3, 3)
    eth_rpc = ethermint.w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(
        eth_rpc,
        geth_rpc,
        "eth_getProof",
        ["0x57f96e6b86cdefdb3d412547816a82e3e0ebf9d2", ["0x0"], "latest"],
    )

    make_same_rpc_calls(
        eth_rpc,
        geth_rpc,
        "eth_getProof",
        ["0x57f96e6b86cdefdb3d412547816a82e3e0ebf9d2", ["0x0"], "0x1024"],
    )

    _ = send_and_get_hash(ethermint.w3)

    proof = eth_rpc.make_request(
        "eth_getProof", [ADDRS["validator"], ["0x0"], "latest"]
    )
    res, err = same_types(proof["result"], EXPECTED_GET_PROOF)
    assert res, err


def test_get_code(ethermint, geth):
    eth_rpc = ethermint.w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(
        eth_rpc,
        geth_rpc,
        "eth_getCode",
        ["0x57f96e6b86cdefdb3d412547816a82e3e0ebf9d2", "latest"],
    )

    # Do an ethereum transfer
    contract = deploy_and_wait(ethermint.w3)
    code = eth_rpc.make_request("eth_getCode", [contract.address, "latest"])
    expected = {"id": "4", "jsonrpc": "2.0", "result": "0x"}
    res, err = same_types(code, expected)
    assert res, err


def test_get_block_transaction_count(ethermint, geth):
    eth_rpc = ethermint.w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(
        eth_rpc, geth_rpc, "eth_getBlockTransactionCountByNumber", ["0x0"]
    )

    make_same_rpc_calls(
        eth_rpc, geth_rpc, "eth_getBlockTransactionCountByNumber", ["0x100"]
    )

    tx_hash = send_and_get_hash(ethermint.w3)

    tx_res = eth_rpc.make_request("eth_getTransactionByHash", [tx_hash])
    block_number = tx_res["result"]["blockNumber"]
    block_hash = tx_res["result"]["blockHash"]
    block_res = eth_rpc.make_request(
        "eth_getBlockTransactionCountByNumber", [block_number]
    )

    expected = {"id": "1", "jsonrpc": "2.0", "result": "0x1"}
    res, err = same_types(block_res, expected)
    assert res, err

    make_same_rpc_calls(
        eth_rpc,
        geth_rpc,
        "eth_getBlockTransactionCountByHash",
        ["0x4e3a3754410177e6937ef1f84bba68ea139e8d1a2258c5f85db9f1cd715a1bdd"],
    )
    block_res = eth_rpc.make_request("eth_getBlockTransactionCountByHash", [block_hash])
    expected = {"id": "1", "jsonrpc": "2.0", "result": "0x1"}
    res, err = same_types(block_res, expected)
    assert res, err


def test_get_transaction(ethermint, geth):
    eth_rpc = ethermint.w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(
        eth_rpc,
        geth_rpc,
        "eth_getTransactionByHash",
        ["0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060"],
    )

    tx_hash = send_and_get_hash(ethermint.w3)

    tx_res = eth_rpc.make_request("eth_getTransactionByHash", [tx_hash])
    res, err = same_types(tx_res, EXPECTED_GET_TRANSACTION)
    assert res, err


def test_get_transaction_receipt(ethermint, geth):
    eth_rpc = ethermint.w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(
        eth_rpc,
        geth_rpc,
        "eth_getTransactionReceipt",
        ["0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060"],
    )

    tx_hash = send_and_get_hash(ethermint.w3)

    tx_res = eth_rpc.make_request("eth_getTransactionReceipt", [tx_hash])
    res, err = same_types(tx_res["result"], EXPECTED_GET_TRANSACTION_RECEIPT)
    assert res, err


def test_fee_history(ethermint, geth):
    eth_rpc = ethermint.w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_feeHistory", [4, "latest", [10, 90]])

    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_feeHistory", [4, "0x5000", [10, 90]])

    fee_history = eth_rpc.make_request("eth_feeHistory", [4, "latest", [10, 90]])

    res, err = same_types(fee_history["result"], EXPECTED_FEE_HISTORY)
    assert res, err


def test_estimate_gas(ethermint, geth):
    tx = {"to": ADDRS["community"], "from": ADDRS["validator"]}

    eth_rpc = ethermint.w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_estimateGas", [tx])
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_estimateGas", [{}])


def make_same_rpc_calls(rpc1, rpc2, method, params):
    res1 = rpc1.make_request(method, params)
    res2 = rpc2.make_request(method, params)
    res, err = same_types(res1, res2)
    assert res, err


def same_types(object_a, object_b):

    if isinstance(object_a, dict):
        if not isinstance(object_b, dict):
            return False, "A is dict, B is not"
        keys = list(set(list(object_a.keys()) + list(object_b.keys())))
        for key in keys:
            if key in object_b and key in object_a:
                if not same_types(object_a[key], object_b[key]):
                    return False, key + " key on dict are not of same type"
            else:
                return False, key + " key on json is not in both results"
        return True, ""
    elif isinstance(object_a, list):
        if not isinstance(object_b, list):
            return False, "A is list, B is not"
        if len(object_a) == 0 and len(object_b) == 0:
            return True, ""
        if len(object_a) > 0 and len(object_b) > 0:
            return same_types(object_a[0], object_b[0])
        else:
            return True
    elif object_a is None and object_b is None:
        return True, ""
    elif type(object_a) is type(object_b):
        return True, ""
    else:
        return (
            False,
            "different types. A is type "
            + type(object_a).__name__
            + " B is type "
            + type(object_b).__name__,
        )
