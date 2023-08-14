import requests
from pystarport import ports

from .utils import (
    derive_new_account,
    send_transaction,
    sign_transaction,
    wait_for_new_blocks,
)


def test_trace_blk(ethermint):
    w3 = ethermint.w3
    cli = ethermint.cosmos_cli()
    acc = derive_new_account(3)
    sender = acc.address
    # fund new sender
    fund = 3000000000000000000
    tx = {"to": sender, "value": fund, "gasPrice": w3.eth.gas_price}
    send_transaction(w3, tx)
    assert w3.eth.get_balance(sender, "latest") == fund
    nonce = w3.eth.get_transaction_count(sender)
    blk = wait_for_new_blocks(cli, 1, sleep=0.1)
    txhashes = []
    total = 3
    for n in range(total):
        tx = {
            "to": "0x2956c404227Cc544Ea6c3f4a36702D0FD73d20A2",
            "value": fund // total,
            "gas": 21000,
            "maxFeePerGas": 6556868066901,
            "maxPriorityFeePerGas": 1500000000,
            "nonce": nonce + n,
        }
        signed = sign_transaction(w3, tx, acc.key)
        txhash = w3.eth.send_raw_transaction(signed.rawTransaction)
        txhashes.append(txhash)
    for txhash in txhashes[0 : total - 1]:
        res = w3.eth.wait_for_transaction_receipt(txhash)
        assert res.status == 1

    url = f"http://127.0.0.1:{ports.evmrpc_port(ethermint.base_port(0))}"
    params = {
        "method": "debug_traceBlockByNumber",
        "params": [hex(blk + 1)],
        "id": 1,
        "jsonrpc": "2.0",
    }
    rsp = requests.post(url, json=params)
    assert rsp.status_code == 200
    assert len(rsp.json()["result"]) == 2
