
from web3 import Web3

from .expected_constants import (
    EXPECTED_CALLTRACERS,
    EXPECTED_CONTRACT_CREATE_TRACER,
    EXPECTED_STRUCT_TRACER,
)
from .utils import (
    ADDRS,
    CONTRACTS,
    KEYS,
    deploy_contract,
    send_transaction,
    w3_wait_for_new_blocks,
)


def test_tracers(ethermint_rpc_ws):
    w3: Web3 = ethermint_rpc_ws.w3
    eth_rpc = w3.provider
    gas_price = w3.eth.gas_price
    tx = {"to": ADDRS["community"], "value": 100, "gasPrice": gas_price}
    tx_hash = send_transaction(w3, tx, KEYS["validator"])["transactionHash"].hex()

    tx_res = eth_rpc.make_request("debug_traceTransaction", [tx_hash])
    assert tx_res["result"] == EXPECTED_STRUCT_TRACER, ""

    tx_res = eth_rpc.make_request(
        "debug_traceTransaction", [tx_hash, {"tracer": "callTracer"}]
    )
    assert tx_res["result"] == EXPECTED_CALLTRACERS, ""

    tx_res = eth_rpc.make_request(
        "debug_traceTransaction",
        [tx_hash, {"tracer": "callTracer", "tracerConfig": "{'onlyTopCall':True}"}],
    )
    assert tx_res["result"] == EXPECTED_CALLTRACERS, ""

    _, tx = deploy_contract(
        w3,
        CONTRACTS["TestERC20A"],
    )
    tx_hash = tx["transactionHash"].hex()

    w3_wait_for_new_blocks(w3, 1)

    tx_res = eth_rpc.make_request(
        "debug_traceTransaction", [tx_hash, {"tracer": "callTracer"}]
    )
    tx_res["result"]["to"] = EXPECTED_CONTRACT_CREATE_TRACER["to"]
    assert tx_res["result"] == EXPECTED_CONTRACT_CREATE_TRACER, ""
