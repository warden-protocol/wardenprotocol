from pathlib import Path

import pytest
from eth_abi import abi
from hexbytes import HexBytes
from web3 import Web3

from .network import setup_custom_ethermint, setup_ethermint
from .utils import (
    ADDRS,
    CONTRACTS,
    deploy_contract,
    send_successful_transaction,
    send_transaction,
    w3_wait_for_new_blocks,
)


@pytest.fixture(scope="module")
def custom_ethermint(tmp_path_factory):
    path = tmp_path_factory.mktemp("filters")
    yield from setup_ethermint(path, 26200, long_timeout_commit=True)


@pytest.fixture(scope="module")
def ethermint_indexer(tmp_path_factory):
    path = tmp_path_factory.mktemp("indexer")
    yield from setup_custom_ethermint(
        path, 26660, Path(__file__).parent / "configs/enable-indexer.jsonnet"
    )


@pytest.fixture(
    scope="module", params=["ethermint", "geth", "ethermint-ws", "enable-indexer"]
)
def cluster(request, custom_ethermint, ethermint_indexer, geth):
    """
    run on both ethermint and geth
    """
    provider = request.param
    if provider == "ethermint":
        yield custom_ethermint
    elif provider == "geth":
        yield geth
    elif provider == "ethermint-ws":
        ethermint_ws = custom_ethermint.copy()
        ethermint_ws.use_websocket()
        yield ethermint_ws
    elif provider == "enable-indexer":
        yield ethermint_indexer
    else:
        raise NotImplementedError


def test_basic(cluster):
    w3 = cluster.w3
    assert w3.eth.chain_id == 9000


# Smart contract names
GREETER_CONTRACT = "Greeter"
ERC20_CONTRACT = "TestERC20A"

# ChangeGreeting topic from Greeter contract calculated from event signature
CHANGE_GREETING_TOPIC = Web3.keccak(text="ChangeGreeting(address,string)")
# ERC-20 Transfer event topic
TRANSFER_TOPIC = Web3.keccak(text="Transfer(address,address,uint256)")


def test_get_logs_by_topic(cluster):
    w3: Web3 = cluster.w3

    contract, _ = deploy_contract(w3, CONTRACTS["Greeter"])

    topic = Web3.keccak(text="ChangeGreeting(address,string)")

    # with tx
    tx = contract.functions.setGreeting("world").build_transaction()
    receipt = send_transaction(w3, tx)
    assert receipt.status == 1

    # The getLogs method under the hood works as a filter
    # with the specified topics and a block range.
    # If the block range is not specified, it defaults
    # to fromBlock: "latest", toBlock: "latest".
    # Then, if we make a getLogs call within the same block that the tx
    # happened, we will get a log in the result. However, if we make the call
    # one or more blocks later, the result will be an empty array.
    logs = w3.eth.get_logs({"topics": [topic.hex()]})

    assert len(logs) == 1
    assert logs[0]["address"] == contract.address

    w3_wait_for_new_blocks(w3, 2)
    logs = w3.eth.get_logs({"topics": [topic.hex()]})
    assert len(logs) == 0


def test_pending_transaction_filter(cluster):
    w3: Web3 = cluster.w3
    flt = w3.eth.filter("pending")

    # without tx
    assert flt.get_new_entries() == []  # GetFilterChanges

    w3_wait_for_new_blocks(w3, 1, sleep=0.1)
    # with tx
    txhash = send_successful_transaction(w3)
    assert txhash in flt.get_new_entries()

    # check if tx_hash is valid
    tx = w3.eth.get_transaction(txhash)
    assert tx.hash == txhash

    # without new txs since last call
    assert flt.get_new_entries() == []


def test_block_filter(cluster):
    w3: Web3 = cluster.w3
    flt = w3.eth.filter("latest")

    # without tx
    assert flt.get_new_entries() == []

    # with tx
    send_successful_transaction(w3)
    block_hashes = flt.get_new_entries()
    assert len(block_hashes) >= 1

    # check if the returned block hash is correct
    # getBlockByHash
    block = w3.eth.get_block(block_hashes[0])
    # block should exist
    assert block.hash == block_hashes[0]

    # without new txs since last call
    assert flt.get_new_entries() == []


def test_event_log_filter_by_contract(cluster):
    w3: Web3 = cluster.w3
    contract, _ = deploy_contract(w3, CONTRACTS["Greeter"])
    assert contract.caller.greet() == "Hello"

    # Create new filter from contract
    current_height = hex(w3.eth.get_block_number())
    flt = contract.events.ChangeGreeting.createFilter(fromBlock=current_height)

    # without tx
    assert flt.get_new_entries() == []  # GetFilterChanges
    assert flt.get_all_entries() == []  # GetFilterLogs

    # with tx
    tx = contract.functions.setGreeting("world").build_transaction(
        {"from": ADDRS["validator"]}
    )
    tx_receipt = send_transaction(w3, tx)
    assert tx_receipt.status == 1

    log = contract.events.ChangeGreeting().processReceipt(tx_receipt)[0]
    assert log["event"] == "ChangeGreeting"

    new_entries = flt.get_new_entries()
    assert len(new_entries) == 1
    assert new_entries[0] == log
    assert contract.caller.greet() == "world"

    # without new txs since last call
    assert flt.get_new_entries() == []
    assert flt.get_all_entries() == new_entries

    # Uninstall
    assert w3.eth.uninstall_filter(flt.filter_id)
    assert not w3.eth.uninstall_filter(flt.filter_id)
    with pytest.raises(Exception):
        flt.get_all_entries()


def test_event_log_filter_by_address(cluster):
    w3: Web3 = cluster.w3

    contract, _ = deploy_contract(w3, CONTRACTS["Greeter"])
    assert contract.caller.greet() == "Hello"

    flt = w3.eth.filter({"address": contract.address})
    flt2 = w3.eth.filter({"address": ADDRS["validator"]})

    # without tx
    assert flt.get_new_entries() == []  # GetFilterChanges
    assert flt.get_all_entries() == []  # GetFilterLogs

    # with tx
    tx = contract.functions.setGreeting("world").build_transaction(
        {"from": ADDRS["validator"]}
    )
    receipt = send_transaction(w3, tx)
    assert receipt.status == 1

    assert len(flt.get_new_entries()) == 1
    assert len(flt2.get_new_entries()) == 0


def test_event_log_filter_by_topic(cluster):
    w3: Web3 = cluster.w3

    new_greeting = "world"

    test_cases = [
        {
            "name": "one contract emiting one topic",
            "filters": [
                {"topics": [CHANGE_GREETING_TOPIC.hex()]},
                {
                    "fromBlock": 1,
                    "toBlock": "latest",
                    "topics": [CHANGE_GREETING_TOPIC.hex()],
                },
            ],
            "exp_len": 1,
            "exp_topics": [[CHANGE_GREETING_TOPIC]],
            "contracts": [GREETER_CONTRACT],
        },
        {
            "name": "multiple contracts emitting same topic",
            "filters": [
                {
                    "topics": [CHANGE_GREETING_TOPIC.hex()],
                },
                {
                    "fromBlock": 1,
                    "toBlock": "latest",
                    "topics": [CHANGE_GREETING_TOPIC.hex()],
                },
            ],
            "exp_len": 5,
            "exp_topics": [[CHANGE_GREETING_TOPIC]],
            "contracts": [GREETER_CONTRACT] * 5,
        },
        {
            "name": "multiple contracts emitting different topics",
            "filters": [
                {
                    "topics": [[CHANGE_GREETING_TOPIC.hex(), TRANSFER_TOPIC.hex()]],
                },
                {
                    "fromBlock": 1,
                    "toBlock": "latest",
                    "topics": [[CHANGE_GREETING_TOPIC.hex(), TRANSFER_TOPIC.hex()]],
                },
            ],
            "exp_len": 3,  # 2 transfer events, mint&transfer on deploy (2)tx in test
            "exp_topics": [
                [CHANGE_GREETING_TOPIC],
                [
                    TRANSFER_TOPIC,
                    HexBytes(pad_left("0x0")),
                    HexBytes(pad_left(ADDRS["validator"].lower())),
                ],
                [
                    TRANSFER_TOPIC,
                    HexBytes(pad_left(ADDRS["validator"].lower())),
                    HexBytes(pad_left(ADDRS["community"].lower())),
                ],
            ],
            "contracts": [GREETER_CONTRACT, ERC20_CONTRACT],
        },
    ]

    for tc in test_cases:
        print("\nCase: {}".format(tc["name"]))

        # register filters
        filters = []
        for fltr in tc["filters"]:
            filters.append(w3.eth.filter(fltr))

        # without tx: filters should not return any entries
        for flt in filters:
            assert flt.get_new_entries() == []  # GetFilterChanges

        # deploy all contracts
        # perform tx that emits event in all contracts
        for c in tc["contracts"]:
            tx = None
            if c == GREETER_CONTRACT:
                contract, _ = deploy_contract(w3, CONTRACTS[c])
                # validate deploy was successfull
                assert contract.caller.greet() == "Hello"
                # create tx that emits event
                tx = contract.functions.setGreeting(new_greeting).build_transaction(
                    {"from": ADDRS["validator"]}
                )
            elif c == ERC20_CONTRACT:
                contract, _ = deploy_contract(w3, CONTRACTS[c])
                # validate deploy was successfull
                assert contract.caller.name() == "TestERC20"
                # create tx that emits event
                tx = contract.functions.transfer(
                    ADDRS["community"], 10
                ).build_transaction({"from": ADDRS["validator"]})

            receipt = send_transaction(w3, tx)
            assert receipt.status == 1

        # check filters new entries
        for flt in filters:
            new_entries = flt.get_new_entries()  # GetFilterChanges
            assert len(new_entries) == tc["exp_len"]

            for log in new_entries:
                # check if the new_entries have valid information
                assert log["topics"] in tc["exp_topics"]
                assert_log_block(w3, log)

        # on next call of GetFilterChanges, no entries should be found
        # because there were no new logs that meet the filters params
        for flt in filters:
            assert flt.get_new_entries() == []  # GetFilterChanges
            w3.eth.uninstall_filter(flt.filter_id)


def test_multiple_filters(cluster):
    w3: Web3 = cluster.w3

    contract, _ = deploy_contract(w3, CONTRACTS["Greeter"])
    # test the contract was deployed successfully
    assert contract.caller.greet() == "Hello"

    new_greeting = "hello, world"

    # calculate topic from event signature
    topic = CHANGE_GREETING_TOPIC
    # another topic not related to the contract deployed
    another_topic = TRANSFER_TOPIC

    filters = [
        {
            "params": {"address": contract.address},
            "exp_len": 1,
        },
        {
            "params": {"topics": [topic.hex()]},
            "exp_len": 1,
        },
        {
            "params": {
                "topics": [
                    topic.hex(),
                    another_topic.hex(),
                ],  # 'with all topics' condition
            },
            "exp_len": 0,
        },
        {
            "params": {
                "topics": [
                    [topic.hex(), another_topic.hex()]
                ],  # 'with any topic' condition
            },
            "exp_len": 1,
        },
        {
            "params": {
                "address": contract.address,
                "topics": [[topic.hex(), another_topic.hex()]],
            },
            "exp_len": 1,
        },
        {
            "params": {
                "fromBlock": 1,
                "toBlock": 2,
                "address": contract.address,
                "topics": [[topic.hex(), another_topic.hex()]],
            },
            "exp_len": 0,
        },
        {
            "params": {
                "fromBlock": 1,
                "toBlock": "latest",
                "address": contract.address,
                "topics": [[topic.hex(), another_topic.hex()]],
            },
            "exp_len": 1,
        },
        {
            "params": {
                "fromBlock": 1,
                "toBlock": "latest",
                "topics": [[topic.hex(), another_topic.hex()]],
            },
            "exp_len": 1,
        },
    ]

    test_cases = [
        {"name": "register multiple filters and check for updates", "filters": filters},
        {
            "name": "register more filters than allowed (default: 200)",
            "register_err": "error creating filter: max limit reached",
            "filters": make_filter_array(205),
        },
        {
            "name": "register some filters, remove 2 filters and check for updates",
            "filters": filters,
            "rm_filters_post_tx": 2,
        },
    ]

    for tc in test_cases:
        print("\nCase: {}".format(tc["name"]))

        # register the filters
        fltrs = []
        try:
            for flt in tc["filters"]:
                fltrs.append(w3.eth.filter(flt["params"]))
        except Exception as err:
            if "register_err" in tc:
                # if exception was expected when registering filters
                # the test is finished
                assert tc["register_err"] in str(err)
                # remove the registered filters
                remove_filters(w3, fltrs, 300)
                continue
            else:
                print(f"Unexpected {err=}, {type(err)=}")
                raise

        # without tx: filters should not return any entries
        for flt in fltrs:
            assert flt.get_new_entries() == []  # GetFilterChanges

        # with tx
        tx = contract.functions.setGreeting(new_greeting).build_transaction(
            {"from": ADDRS["validator"]}
        )
        receipt = send_transaction(w3, tx)
        assert receipt.status == 1

        if "rm_filters_post_tx" in tc:
            # remove the filters
            remove_filters(w3, fltrs, tc["rm_filters_post_tx"])

        for i, flt in enumerate(fltrs):
            # if filters were removed, should get a 'filter not found' error
            try:
                new_entries = flt.get_new_entries()  # GetFilterChanges
            except Exception as err:
                if "rm_filters_post_tx" in tc and i < tc["rm_filters_post_tx"]:
                    assert_no_filter_err(flt, err)
                    # filter was removed and error checked. Continue to next filter
                    continue
                else:
                    print(f"Unexpected {err=}, {type(err)=}")
                    raise

            assert len(new_entries) == tc["filters"][i]["exp_len"]

            if tc["filters"][i]["exp_len"] == 1:
                # check if the new_entries have valid information
                log = new_entries[0]
                assert log["address"] == contract.address
                assert log["topics"] == [topic]
                assert_log_block(w3, log)
                assert_change_greet_log_data(log, new_greeting)

        # on next call of GetFilterChanges, no entries should be found
        # because there were no new logs that meet the filters params
        for i, flt in enumerate(fltrs):
            # if filters were removed, should get a 'filter not found' error
            try:
                assert flt.get_new_entries() == []  # GetFilterChanges
            except Exception as err:
                if "rm_filters_post_tx" in tc and i < tc["rm_filters_post_tx"]:
                    assert_no_filter_err(flt, err)
                    continue
                else:
                    print(f"Unexpected {err=}, {type(err)=}")
                    raise
            # remove the filters added on this test
            # because the node is not reseted for each test
            # otherwise may get a max-limit error for registering
            # new filters
            w3.eth.uninstall_filter(flt.filter_id)


def test_register_filters_before_contract_deploy(cluster):
    w3: Web3 = cluster.w3

    new_greeting = "hello, world"

    # calculate topic from event signature
    topic = CHANGE_GREETING_TOPIC
    # another topic not related to the contract deployed
    another_topic = TRANSFER_TOPIC

    filters = [
        {
            "params": {"topics": [topic.hex()]},
            "exp_len": 1,
        },
        {
            "params": {
                "topics": [
                    topic.hex(),
                    another_topic.hex(),
                ],  # 'with all topics' condition
            },
            "exp_len": 0,
        },
        {
            "params": {
                "topics": [
                    [topic.hex(), another_topic.hex()]
                ],  # 'with any topic' condition
            },
            "exp_len": 1,
        },
        {
            "params": {
                "fromBlock": 1,
                "toBlock": "latest",
                "topics": [[topic.hex(), another_topic.hex()]],
            },
            "exp_len": 1,
        },
    ]

    # register the filters
    fltrs = []
    for flt in filters:
        fltrs.append(w3.eth.filter(flt["params"]))

    # deploy contract
    contract, _ = deploy_contract(w3, CONTRACTS["Greeter"])
    # test the contract was deployed successfully
    assert contract.caller.greet() == "Hello"

    # without tx: filters should not return any entries
    for flt in fltrs:
        assert flt.get_new_entries() == []  # GetFilterChanges

    # perform tx to call contract that emits event
    tx = contract.functions.setGreeting(new_greeting).build_transaction(
        {"from": ADDRS["validator"]}
    )
    receipt = send_transaction(w3, tx)
    assert receipt.status == 1

    for i, flt in enumerate(fltrs):
        new_entries = flt.get_new_entries()  # GetFilterChanges
        assert len(new_entries) == filters[i]["exp_len"]

        if filters[i]["exp_len"] == 1:
            # check if the new_entries have valid information
            log = new_entries[0]
            assert log["address"] == contract.address
            assert log["topics"] == [topic]
            assert_log_block(w3, log)
            assert_change_greet_log_data(log, new_greeting)

    # on next call of GetFilterChanges, no entries should be found
    # because there were no new logs that meet the filters params
    for flt in fltrs:
        assert flt.get_new_entries() == []  # GetFilterChanges
        w3.eth.uninstall_filter(flt.filter_id)


def test_get_logs(cluster):
    w3: Web3 = cluster.w3

    # deploy greeter contract
    contract, _ = deploy_contract(w3, CONTRACTS["Greeter"])
    # test the contract was deployed successfully
    assert contract.caller.greet() == "Hello"

    # calculate topic from event signature
    topic = CHANGE_GREETING_TOPIC

    # another topic not related to the contract deployed
    another_topic = TRANSFER_TOPIC

    # without tx - logs should be empty
    assert w3.eth.get_logs({"address": contract.address}) == []
    assert w3.eth.get_logs({"address": ADDRS["validator"]}) == []

    # with tx
    # update greeting
    new_greeting = "hello, world"
    tx = contract.functions.setGreeting(new_greeting).build_transaction(
        {"from": ADDRS["validator"]}
    )
    receipt = send_transaction(w3, tx)
    assert receipt.status == 1

    tx_block_num = w3.eth.block_number

    test_cases = [
        {
            "name": "get logs by block range - tx block number is within the range",
            "logs": w3.eth.get_logs({"fromBlock": 1, "toBlock": tx_block_num}),
            "exp_log": True,
            "exp_len": None,  # there are other events within the block range specified
        },
        {
            "name": "get logs by block range - tx block number outside the range",
            "logs": w3.eth.get_logs({"fromBlock": 1, "toBlock": 2}),
            "exp_log": False,
            "exp_len": 0,
        },
        {
            "name": "get logs by contract address",
            "logs": w3.eth.get_logs({"address": contract.address}),
            "exp_log": True,
            "exp_len": 1,
        },
        {
            "name": "get logs by topic",
            "logs": w3.eth.get_logs({"topics": [topic.hex()]}),
            "exp_log": True,
            "exp_len": 1,
        },
        {
            "name": "get logs by incorrect topic - should not have logs",
            "logs": w3.eth.get_logs({"topics": [another_topic.hex()]}),
            "exp_log": False,
            "exp_len": 0,
        },
        {
            "name": "get logs by multiple topics ('with all' condition)",
            "logs": w3.eth.get_logs(
                {
                    "topics": [
                        topic.hex(),
                        another_topic.hex(),
                    ]
                }
            ),
            "exp_log": False,
            "exp_len": 0,
        },
        {
            "name": "get logs by multiple topics ('match any' condition)",
            "logs": w3.eth.get_logs({"topics": [[topic.hex(), another_topic.hex()]]}),
            "exp_log": True,
            "exp_len": 1,
        },
        {
            "name": "get logs by topic and block range",
            "logs": w3.eth.get_logs(
                {
                    "fromBlock": tx_block_num,
                    "toBlock": "latest",
                    "topics": [topic.hex()],
                }
            ),
            "exp_log": True,
            "exp_len": 1,
        },
    ]

    for tc in test_cases:
        print("\nCase: {}".format(tc["name"]))

        # logs for validator address should remain empty
        assert len(w3.eth.get_logs({"address": ADDRS["validator"]})) == 0

        logs = tc["logs"]

        if tc["exp_len"] is not None:
            assert len(logs) == tc["exp_len"]

        if tc["exp_log"]:
            found_log = False

            for log in logs:
                if log["address"] == contract.address:
                    # for the current test cases,
                    # this event was emitted only once
                    # so one log from this contract should exist
                    # we check the flag to know it is not repeated
                    assert found_log is False

                    found_log = True

                    assert log["topics"] == [topic]
                    assert_log_block(w3, log)
                    assert_change_greet_log_data(log, new_greeting)

            assert found_log is True


#################################################
# Helper functions to assert logs information
#################################################


def assert_log_block(w3, log):
    block_hash = log["blockHash"]
    # check if the returned block hash is correct
    # getBlockByHash
    block = w3.eth.get_block(block_hash)
    # block should exist
    assert block.hash == block_hash

    # check tx hash is correct
    tx_data = w3.eth.get_transaction(log["transactionHash"])
    assert tx_data["blockHash"] == block.hash


def assert_change_greet_log_data(log, new_greeting):
    # check event log data ('from' and 'value' fields)
    types = ["address", "string"]
    names = ["from", "value"]
    values = abi.decode_abi(types, log["data"])
    log_data = dict(zip(names, values))

    # the address stored in the data field may defer on lower/upper case characters
    # then, set all as lowercase for assertion
    assert log_data["from"] == ADDRS["validator"].lower()
    assert log_data["value"] == new_greeting


def assert_no_filter_err(flt, err):
    msg_without_id = "filter not found" in str(err)
    msg_with_id = f"filter {flt.filter_id} not found" in str(err)
    assert msg_without_id or msg_with_id is True


#################################################
# Helper functions to add/remove filters
#################################################


def make_filter_array(array_len):
    filters = []
    for _ in range(array_len):
        filters.append(
            {
                "params": {"fromBlock": 1, "toBlock": "latest"},
                "exp_len": 1,
            },
        )
    return filters


# removes the number of filters defined in 'count' argument, starting from index 0
def remove_filters(w3, filters, count):
    # if number of filters to remove exceeds the amount of filters passed
    # update the 'count' to the length of the filters array
    if count > len(filters):
        count = len(filters)

    for i in range(count):
        assert w3.eth.uninstall_filter(filters[i].filter_id)


# adds a padding of '0's to a hex address based on the total byte length desired
def pad_left(address, byte_len=32):
    a = address.split("0x")
    b = a[1].zfill(byte_len * 2)
    return "0x" + b
