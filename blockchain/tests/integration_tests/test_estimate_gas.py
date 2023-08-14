import pytest

from .network import setup_ethermint
from .utils import ADDRS, CONTRACTS, deploy_contract


@pytest.fixture(scope="module")
def custom_ethermint(tmp_path_factory):
    path = tmp_path_factory.mktemp("estimate-gas")
    yield from setup_ethermint(path, 27010, long_timeout_commit=True)


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


def test_revert(cluster):
    w3 = cluster.w3
    call = w3.provider.make_request
    validator = ADDRS["validator"]
    erc20, _ = deploy_contract(
        w3,
        CONTRACTS["TestRevert"],
    )
    method = "eth_estimateGas"

    def do_call(data):
        params = {"from": validator, "to": erc20.address, "data": data}
        return call(method, [params])["error"]

    # revertWithMsg
    error = do_call("0x9ffb86a5")
    assert error["code"] == 3
    assert error["message"] == "execution reverted: Function has been reverted"
    assert (error["data"] == "0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001a46756e6374696f6e20686173206265656e207265766572746564000000000000")  # noqa: E501

    # revertWithoutMsg
    error = do_call("0x3246485d")
    assert error["code"] == -32000
    assert error["message"] == "execution reverted"
