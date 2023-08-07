from web3 import Web3

from .expected_constants import (
    EXPECTED_ACCOUNT_PROOF,
    EXPECTED_FEE_HISTORY,
    EXPECTED_GET_PROOF,
    EXPECTED_GET_STORAGE_AT,
    EXPECTED_GET_TRANSACTION,
    EXPECTED_GET_TRANSACTION_RECEIPT,
    EXPECTED_STORAGE_PROOF,
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


def get_blocks(ethermint_rpc_ws, geth, with_transactions):
    w3: Web3 = ethermint_rpc_ws.w3
    eth_rpc = w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(
        eth_rpc, geth_rpc, "eth_getBlockByNumber", ["0x0", with_transactions]
    )

    make_same_rpc_calls(
        eth_rpc, geth_rpc, "eth_getBlockByNumber", ["0x2710", with_transactions]
    )

    ethermint_blk = w3.eth.get_block(1)
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
    compare_types(eth_rsp, geth_rsp)

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


def test_accounts(ethermint_rpc_ws, geth):
    w3: Web3 = ethermint_rpc_ws.w3
    eth_rpc = w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_accounts", [])


def test_syncing(ethermint_rpc_ws, geth):
    w3: Web3 = ethermint_rpc_ws.w3
    eth_rpc = w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_syncing", [])


def test_coinbase(ethermint_rpc_ws, geth):
    w3: Web3 = ethermint_rpc_ws.w3
    eth_rpc = w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_coinbase", [])


def test_max_priority_fee(ethermint_rpc_ws, geth):
    w3: Web3 = ethermint_rpc_ws.w3
    eth_rpc = w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_maxPriorityFeePerGas", [])


def test_gas_price(ethermint_rpc_ws, geth):
    w3: Web3 = ethermint_rpc_ws.w3
    eth_rpc = w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_gasPrice", [])


def test_block_number(ethermint_rpc_ws, geth):
    w3: Web3 = ethermint_rpc_ws.w3
    eth_rpc = w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_blockNumber", [])


def test_balance(ethermint_rpc_ws, geth):
    w3: Web3 = ethermint_rpc_ws.w3
    eth_rpc = w3.provider
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
    contract, _ = deploy_contract(
        w3,
        CONTRACTS["TestERC20A"],
    )

    w3_wait_for_new_blocks(w3, number)
    return contract


def test_get_storage_at(ethermint_rpc_ws, geth):
    w3: Web3 = ethermint_rpc_ws.w3
    eth_rpc = w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(
        eth_rpc,
        geth_rpc,
        "eth_getStorageAt",
        ["0x57f96e6b86cdefdb3d412547816a82e3e0ebf9d2", "0x0", "latest"],
    )

    contract = deploy_and_wait(w3)
    res = eth_rpc.make_request("eth_getStorageAt", [contract.address, "0x0", "latest"])
    compare_types(res["result"], EXPECTED_GET_STORAGE_AT)


def send_tnx(w3, tx_value=10):
    # Do an ethereum transfer
    gas_price = w3.eth.gas_price
    tx = {"to": ADDRS["community"], "value": tx_value, "gasPrice": gas_price}
    return send_transaction(w3, tx, KEYS["validator"])


def send_and_get_hash(w3, tx_value=10):
    return send_tnx(w3, tx_value)["transactionHash"].hex()


def test_get_proof(ethermint_rpc_ws, geth):
    # on ethermint the proof query will fail for block numbers <= 2
    # so we must wait for several blocks
    w3: Web3 = ethermint_rpc_ws.w3
    eth_rpc = w3.provider
    w3_wait_for_block(w3, 3)
    geth_rpc = geth.w3.provider
    validator = ADDRS["validator"]
    method = "eth_getProof"
    for quantity in ["latest", "0x1024"]:
        res = make_same_rpc_calls(
            eth_rpc,
            geth_rpc,
            method,
            [validator, ["0x0"], quantity],
        )
    res = send_tnx(w3)

    proof = (eth_rpc.make_request(
        method, [validator, ["0x0"], hex(res["blockNumber"])]
    ))["result"]
    compare_types(proof, EXPECTED_GET_PROOF["result"])
    assert proof["accountProof"], EXPECTED_ACCOUNT_PROOF
    assert proof["storageProof"][0]["proof"], EXPECTED_STORAGE_PROOF

    _ = send_and_get_hash(w3)
    proof = eth_rpc.make_request(
        method, [validator, ["0x0"], "latest"]
    )
    compare_types(proof, EXPECTED_GET_PROOF)


def test_get_code(ethermint_rpc_ws, geth):
    w3: Web3 = ethermint_rpc_ws.w3
    eth_rpc = w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(
        eth_rpc,
        geth_rpc,
        "eth_getCode",
        ["0x57f96e6b86cdefdb3d412547816a82e3e0ebf9d2", "latest"],
    )

    # Do an ethereum transfer
    contract = deploy_and_wait(w3)
    code = eth_rpc.make_request("eth_getCode", [contract.address, "latest"])
    expected = {"id": 4, "jsonrpc": "2.0", "result": "0x"}
    compare_types(code, expected)


def test_get_block_transaction_count(ethermint_rpc_ws, geth):
    w3: Web3 = ethermint_rpc_ws.w3
    eth_rpc = w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(
        eth_rpc, geth_rpc, "eth_getBlockTransactionCountByNumber", ["0x0"]
    )

    make_same_rpc_calls(
        eth_rpc, geth_rpc, "eth_getBlockTransactionCountByNumber", ["0x1000"]
    )

    tx_hash = send_and_get_hash(w3)

    tx_res = eth_rpc.make_request("eth_getTransactionByHash", [tx_hash])
    block_number = tx_res["result"]["blockNumber"]
    block_hash = tx_res["result"]["blockHash"]
    block_res = eth_rpc.make_request(
        "eth_getBlockTransactionCountByNumber", [block_number]
    )

    expected = {"id": 1, "jsonrpc": "2.0", "result": "0x1"}
    compare_types(block_res, expected)

    make_same_rpc_calls(
        eth_rpc,
        geth_rpc,
        "eth_getBlockTransactionCountByHash",
        ["0x4e3a3754410177e6937ef1f84bba68ea139e8d1a2258c5f85db9f1cd715a1bdd"],
    )
    block_res = eth_rpc.make_request("eth_getBlockTransactionCountByHash", [block_hash])
    expected = {"id": 1, "jsonrpc": "2.0", "result": "0x1"}
    compare_types(block_res, expected)


def test_get_transaction(ethermint_rpc_ws, geth):
    w3: Web3 = ethermint_rpc_ws.w3
    eth_rpc = w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(
        eth_rpc,
        geth_rpc,
        "eth_getTransactionByHash",
        ["0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060"],
    )

    tx_hash = send_and_get_hash(w3)

    tx_res = eth_rpc.make_request("eth_getTransactionByHash", [tx_hash])

    compare_types(EXPECTED_GET_TRANSACTION, tx_res)


def test_get_transaction_receipt(ethermint_rpc_ws, geth):
    w3: Web3 = ethermint_rpc_ws.w3
    eth_rpc = w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(
        eth_rpc,
        geth_rpc,
        "eth_getTransactionReceipt",
        ["0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060"],
    )

    tx_hash = send_and_get_hash(w3)

    tx_res = eth_rpc.make_request("eth_getTransactionReceipt", [tx_hash])
    compare_types(tx_res, EXPECTED_GET_TRANSACTION_RECEIPT)


def test_fee_history(ethermint_rpc_ws, geth):
    w3: Web3 = ethermint_rpc_ws.w3
    eth_rpc = w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_feeHistory", [4, "latest", [10, 90]])

    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_feeHistory", [4, "0x5000", [10, 90]])

    _ = send_and_get_hash(w3)
    fee_history = eth_rpc.make_request("eth_feeHistory", [4, "latest", [100]])

    compare_types(fee_history, EXPECTED_FEE_HISTORY)


def test_estimate_gas(ethermint_rpc_ws, geth):
    tx = {"to": ADDRS["community"], "from": ADDRS["validator"]}

    w3: Web3 = ethermint_rpc_ws.w3
    eth_rpc = w3.provider
    geth_rpc = geth.w3.provider
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_estimateGas", [tx])
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_estimateGas", [tx, "0x0"])
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_estimateGas", [tx, "0x5000"])
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_estimateGas", [{}])


def compare_types(actual, expected):
    res, err = same_types(actual, expected)
    if not res:
        print(err)
        print(actual)
        print(expected)
    assert res, err


def make_same_rpc_calls(rpc1, rpc2, method, params):
    res1 = rpc1.make_request(method, params)
    res2 = rpc2.make_request(method, params)
    compare_types(res1, res2)


def test_incomplete_send_transaction(ethermint_rpc_ws, geth):
    # Send ethereum tx with nothing in from field
    w3: Web3 = ethermint_rpc_ws.w3
    eth_rpc = w3.provider
    geth_rpc = geth.w3.provider
    gas_price = w3.eth.gas_price
    tx = {"from": "", "to": ADDRS["community"], "value": 0, "gasPrice": gas_price}
    make_same_rpc_calls(eth_rpc, geth_rpc, "eth_sendTransaction", [tx])


def same_types(given, expected):
    if isinstance(given, dict):
        if not isinstance(expected, dict):
            return False, "A is dict, B is not"
        keys = list(set(list(given.keys()) + list(expected.keys())))
        for key in keys:
            if key not in expected or key not in given:
                return False, key + " key not on both json"
            res, err = same_types(given[key], expected[key])
            if not res:
                return res, key + " key failed. Error: " + err
        return True, ""
    elif isinstance(given, list):
        if not isinstance(expected, list):
            return False, "A is list, B is not"
        if len(given) == 0 and len(expected) == 0:
            return True, ""
        if len(given) > 0 and len(expected) > 0:
            return same_types(given[0], expected[0])
        else:
            return True, ""
    elif given is None and expected is None:
        return True, ""
    elif type(given) is type(expected):
        return True, ""
    elif (
        type(given) is int
        and type(expected) is float
        and given == 0
        or type(expected) is int
        and type(given) is float
        and expected == 0
    ):
        return True, ""
    else:
        return (
            False,
            "different types. Given object is type "
            + type(given).__name__
            + " expected object is type "
            + type(expected).__name__,
        )
