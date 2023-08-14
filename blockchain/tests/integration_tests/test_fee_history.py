from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import pytest
from web3 import Web3

from .network import setup_custom_ethermint
from .utils import ADDRS, send_transaction, w3_wait_for_new_blocks


@pytest.fixture(scope="module")
def custom_ethermint(tmp_path_factory):
    path = tmp_path_factory.mktemp("fee-history")
    yield from setup_custom_ethermint(
        path, 26500, Path(__file__).parent / "configs/fee-history.jsonnet"
    )


@pytest.fixture(scope="module", params=["ethermint", "geth"])
def cluster(request, custom_ethermint, geth):
    """
    run on both ethermint and geth
    """
    provider = request.param
    if provider == "ethermint":
        yield custom_ethermint
    elif provider == "geth":
        yield geth
    else:
        raise NotImplementedError


def test_basic(cluster):
    w3: Web3 = cluster.w3
    call = w3.provider.make_request
    tx = {"to": ADDRS["community"], "value": 10, "gasPrice": w3.eth.gas_price}
    send_transaction(w3, tx)
    size = 4
    # size of base fee + next fee
    max = size + 1
    # only 1 base fee + next fee
    min = 2
    method = "eth_feeHistory"
    field = "baseFeePerGas"
    percentiles = [100]
    height = w3.eth.block_number
    latest = dict(
        blocks=["latest", hex(height)],
        expect=max,
    )
    earliest = dict(
        blocks=["earliest", "0x0"],
        expect=min,
    )
    for tc in [latest, earliest]:
        res = []
        with ThreadPoolExecutor(len(tc["blocks"])) as exec:
            tasks = [
                exec.submit(call, method, [size, b, percentiles]) for b in tc["blocks"]
            ]
            res = [future.result()["result"][field] for future in as_completed(tasks)]
        assert len(res) == len(tc["blocks"])
        assert res[0] == res[1]
        assert len(res[0]) == tc["expect"]

    for x in range(max):
        i = x + 1
        fee_history = call(method, [size, hex(i), percentiles])
        # start to reduce diff on i <= size - min
        diff = size - min - i
        reduce = size - diff
        target = reduce if diff >= 0 else max
        res = fee_history["result"]
        assert len(res[field]) == target
        oldest = i + min - max
        assert res["oldestBlock"] == hex(oldest if oldest > 0 else 0)


def test_change(cluster):
    w3: Web3 = cluster.w3
    call = w3.provider.make_request
    tx = {"to": ADDRS["community"], "value": 10, "gasPrice": w3.eth.gas_price}
    send_transaction(w3, tx)
    size = 4
    method = "eth_feeHistory"
    field = "baseFeePerGas"
    percentiles = [100]
    for b in ["latest", hex(w3.eth.block_number)]:
        history0 = call(method, [size, b, percentiles])["result"][field]
        w3_wait_for_new_blocks(w3, 2, 0.1)
        history1 = call(method, [size, b, percentiles])["result"][field]
        if b == "latest":
            assert history1 != history0
        else:
            assert history1 == history0


def adjust_base_fee(parent_fee, gas_limit, gas_used, denominator, multiplier):
    "spec: https://eips.ethereum.org/EIPS/eip-1559#specification"
    gas_target = gas_limit // multiplier
    delta = parent_fee * (gas_target - gas_used) // gas_target // denominator
    return parent_fee - delta


def test_next(cluster, custom_ethermint):
    w3: Web3 = cluster.w3
    # geth default
    elasticity_multiplier = 2
    change_denominator = 8
    if cluster == custom_ethermint:
        params = cluster.cosmos_cli().get_params("feemarket")["params"]
        elasticity_multiplier = params["elasticity_multiplier"]
        change_denominator = params["base_fee_change_denominator"]
    call = w3.provider.make_request
    tx = {"to": ADDRS["community"], "value": 10, "gasPrice": w3.eth.gas_price}
    send_transaction(w3, tx)
    method = "eth_feeHistory"
    field = "baseFeePerGas"
    percentiles = [100]
    blocks = []
    histories = []
    for _ in range(3):
        b = w3.eth.block_number
        blocks.append(b)
        histories.append(tuple(call(method, [1, hex(b), percentiles])["result"][field]))
        w3_wait_for_new_blocks(w3, 1, 0.1)
    blocks.append(w3.eth.block_number)
    expected = []
    for b in blocks:
        next_base_price = w3.eth.get_block(b).baseFeePerGas
        blk = w3.eth.get_block(b - 1)
        assert next_base_price == adjust_base_fee(
            blk.baseFeePerGas,
            blk.gasLimit,
            blk.gasUsed,
            change_denominator,
            elasticity_multiplier,
        )
        expected.append(hex(next_base_price))
    assert histories == list(zip(expected, expected[1:]))


def test_beyond_head(cluster):
    end = hex(0x7fffffffffffffff)
    res = cluster.w3.provider.make_request("eth_feeHistory", [4, end, []])
    msg = f"request beyond head block: requested {int(end, 16)}"
    assert msg in res["error"]["message"]


def test_percentiles(cluster):
    w3: Web3 = cluster.w3
    call = w3.provider.make_request
    method = "eth_feeHistory"
    percentiles = [[-1], [101], [2, 1]]
    size = 4
    msg = "invalid reward percentile"
    with ThreadPoolExecutor(len(percentiles)) as exec:
        tasks = [
            exec.submit(call, method, [size, "latest", p]) for p in percentiles
        ]
        result = [future.result() for future in as_completed(tasks)]
        assert all(msg in res["error"]["message"] for res in result)
