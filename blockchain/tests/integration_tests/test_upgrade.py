import configparser
import json
import re
import subprocess
from pathlib import Path

import pytest
from dateutil.parser import isoparse
from pystarport import ports
from pystarport.cluster import SUPERVISOR_CONFIG_FILE

from .network import Ethermint, setup_custom_ethermint
from .utils import (
    ADDRS,
    CONTRACTS,
    deploy_contract,
    parse_events,
    send_transaction,
    wait_for_block,
    wait_for_block_time,
    wait_for_port,
)


def init_cosmovisor(home):
    """
    build and setup cosmovisor directory structure in each node's home directory
    """
    cosmovisor = home / "cosmovisor"
    cosmovisor.mkdir()
    (cosmovisor / "upgrades").symlink_to("../../../upgrades")
    (cosmovisor / "genesis").symlink_to("./upgrades/genesis")


def post_init(path, base_port, config):
    """
    prepare cosmovisor for each node
    """
    chain_id = "ethermint_9000-1"
    cfg = json.loads((path / chain_id / "config.json").read_text())
    for i, _ in enumerate(cfg["validators"]):
        home = path / chain_id / f"node{i}"
        init_cosmovisor(home)

    # patch supervisord ini config
    ini_path = path / chain_id / SUPERVISOR_CONFIG_FILE
    ini = configparser.RawConfigParser()
    ini.read(ini_path)
    reg = re.compile(rf"^program:{chain_id}-node(\d+)")
    for section in ini.sections():
        m = reg.match(section)
        if m:
            i = m.group(1)
            ini[section].update(
                {
                    "command": f"cosmovisor start --home %(here)s/node{i}",
                    "environment": (
                        f"DAEMON_NAME=ethermintd,DAEMON_HOME=%(here)s/node{i}"
                    ),
                }
            )
    with ini_path.open("w") as fp:
        ini.write(fp)


@pytest.fixture(scope="module")
def custom_ethermint(tmp_path_factory):
    path = tmp_path_factory.mktemp("upgrade")
    cmd = [
        "nix-build",
        Path(__file__).parent / "configs/upgrade-test-package.nix",
        "-o",
        path / "upgrades",
    ]
    print(*cmd)
    subprocess.run(cmd, check=True)
    # init with genesis binary
    yield from setup_custom_ethermint(
        path,
        26100,
        Path(__file__).parent / "configs/cosmovisor.jsonnet",
        post_init=post_init,
        chain_binary=str(path / "upgrades/genesis/bin/ethermintd"),
    )


def test_cosmovisor_upgrade(custom_ethermint: Ethermint):
    """
    - propose an upgrade and pass it
    - wait for it to happen
    - it should work transparently
    - check that queries on legacy blocks still works after upgrade.
    """
    cli = custom_ethermint.cosmos_cli()

    w3 = custom_ethermint.w3
    contract, _ = deploy_contract(w3, CONTRACTS["TestERC20A"])
    old_height = w3.eth.block_number
    old_balance = w3.eth.get_balance(ADDRS["validator"], block_identifier=old_height)
    old_base_fee = w3.eth.get_block(old_height).baseFeePerGas
    old_erc20_balance = contract.caller.balanceOf(ADDRS["validator"])
    print("old values", old_height, old_balance, old_base_fee)

    target_height = w3.eth.block_number + 10
    print("upgrade height", target_height)

    plan_name = "integration-test-upgrade"
    rsp = cli.gov_propose(
        "community",
        "software-upgrade",
        {
            "name": plan_name,
            "title": "upgrade test",
            "description": "ditto",
            "upgrade-height": target_height,
            "deposit": "10000aphoton",
        },
    )
    assert rsp["code"] == 0, rsp["raw_log"]

    # get proposal_id
    ev = parse_events(rsp["logs"])["submit_proposal"]
    proposal_id = ev["proposal_id"]

    rsp = cli.gov_vote("validator", proposal_id, "yes")
    assert rsp["code"] == 0, rsp["raw_log"]
    # rsp = custom_ethermint.cosmos_cli(1).gov_vote("validator", proposal_id, "yes")
    # assert rsp["code"] == 0, rsp["raw_log"]

    proposal = cli.query_proposal(proposal_id)
    wait_for_block_time(cli, isoparse(proposal["voting_end_time"]))
    proposal = cli.query_proposal(proposal_id)
    assert proposal["status"] == "PROPOSAL_STATUS_PASSED", proposal

    # update cli chain binary
    custom_ethermint.chain_binary = (
        Path(custom_ethermint.chain_binary).parent.parent.parent
        / f"{plan_name}/bin/ethermintd"
    )
    cli = custom_ethermint.cosmos_cli()

    # block should pass the target height
    wait_for_block(cli, target_height + 1, timeout=480)
    wait_for_port(ports.rpc_port(custom_ethermint.base_port(0)))

    # test migrate keystore
    cli.migrate_keystore()

    # check basic tx works after upgrade
    wait_for_port(ports.evmrpc_port(custom_ethermint.base_port(0)))

    receipt = send_transaction(
        w3,
        {
            "to": ADDRS["community"],
            "value": 1000,
            "maxFeePerGas": 1000000000000,
            "maxPriorityFeePerGas": 10000,
        },
    )
    assert receipt.status == 1

    # check json-rpc query on older blocks works
    assert old_balance == w3.eth.get_balance(
        ADDRS["validator"], block_identifier=old_height
    )
    assert old_base_fee == w3.eth.get_block(old_height).baseFeePerGas

    # check eth_call on older blocks works
    assert old_erc20_balance == contract.caller(
        block_identifier=target_height - 2
    ).balanceOf(ADDRS["validator"])
