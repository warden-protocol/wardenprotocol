import asyncio
import json
from collections import defaultdict

import websockets
from eth_utils import abi
from hexbytes import HexBytes
from pystarport import ports

from .network import Ethermint
from .utils import (
    ADDRS,
    CONTRACTS,
    build_batch_tx,
    deploy_contract,
    modify_command_in_supervisor_config,
    wait_for_new_blocks,
    wait_for_port,
)


class Client:
    def __init__(self, ws):
        self._ws = ws
        self._gen_id = 0
        self._subs = defaultdict(asyncio.Queue)
        self._rsps = defaultdict(asyncio.Queue)

    def gen_id(self):
        self._gen_id += 1
        return self._gen_id

    async def receive_loop(self):
        while True:
            msg = json.loads(await self._ws.recv())
            if "id" in msg:
                # responses
                await self._rsps[msg["id"]].put(msg)
            else:
                # subscriptions
                assert msg["method"] == "eth_subscription"
                sub_id = msg["params"]["subscription"]
                await self._subs[sub_id].put(msg["params"]["result"])

    async def recv_response(self, rpcid):
        rsp = await self._rsps[rpcid].get()
        del self._rsps[rpcid]
        return rsp

    async def recv_subscription(self, sub_id):
        return await self._subs[sub_id].get()

    async def subscribe(self, *args):
        rpcid = self.gen_id()
        await self._ws.send(
            json.dumps({"id": rpcid, "method": "eth_subscribe", "params": args})
        )
        rsp = await self.recv_response(rpcid)
        assert "error" not in rsp
        return rsp["result"]

    def sub_qsize(self, sub_id):
        return self._subs[sub_id].qsize()

    async def send(self, id):
        await self._ws.send(
            json.dumps({"id": id, "method": "web3_clientVersion", "params": []})
        )
        rsp = await self.recv_response(id)
        assert "error" not in rsp

    async def unsubscribe(self, sub_id):
        rpcid = self.gen_id()
        await self._ws.send(
            json.dumps({"id": rpcid, "method": "eth_unsubscribe", "params": [sub_id]})
        )
        rsp = await self.recv_response(rpcid)
        assert "error" not in rsp
        return rsp["result"]


def test_subscribe_basic(ethermint: Ethermint):
    """
    test basic subscribe and unsubscribe
    """
    modify_command_in_supervisor_config(
        ethermint.base_dir / "tasks.ini",
        lambda cmd: f"{cmd} --evm.max-tx-gas-wanted {0}",
    )
    ethermint.supervisorctl("update")
    wait_for_port(ports.evmrpc_ws_port(ethermint.base_port(0)))
    cli = ethermint.cosmos_cli()
    loop = asyncio.get_event_loop()

    async def assert_unsubscribe(c: Client, sub_id):
        assert await c.unsubscribe(sub_id)
        # check no more messages
        await loop.run_in_executor(None, wait_for_new_blocks, cli, 2)
        assert c.sub_qsize(sub_id) == 0
        # unsubscribe again return False
        assert not await c.unsubscribe(sub_id)

    async def logs_test(c: Client, w3, contract):
        method = "Transfer(address,address,uint256)"
        topic = f"0x{abi.event_signature_to_log_topic(method).hex()}"
        params = {"address": contract.address, "topics": [topic]}
        sub_id = await c.subscribe("logs", params)
        sender = ADDRS["validator"]
        recipient = ADDRS["community"]
        nonce = w3.eth.get_transaction_count(sender)
        total = 2
        txs = [
            contract.functions.transfer(recipient, 1000).build_transaction(
                {"from": sender, "nonce": nonce + n, "gas": 200000}
            )
            for n in range(total)
        ]
        cosmos_tx, _ = build_batch_tx(w3, cli, txs)
        rsp = cli.broadcast_tx_json(cosmos_tx)
        assert rsp["code"] == 0, rsp["raw_log"]
        msgs = [await c.recv_subscription(sub_id) for i in range(total)]
        assert len(msgs) == total
        for msg in msgs:
            assert topic in msg["topics"] == [
                topic,
                HexBytes(b"\x00" * 12 + HexBytes(sender)).hex(),
                HexBytes(b"\x00" * 12 + HexBytes(recipient)).hex(),
            ]
        await assert_unsubscribe(c, sub_id)

    async def async_test():
        async with websockets.connect(ethermint.w3_ws_endpoint) as ws:
            c = Client(ws)
            t = asyncio.create_task(c.receive_loop())
            # run send concurrently
            await asyncio.gather(*[c.send(id) for id in ["0", 1, 2.0]])
            contract, _ = deploy_contract(ethermint.w3, CONTRACTS["TestERC20A"])
            await asyncio.gather(*[logs_test(c, ethermint.w3, contract)])
            t.cancel()
            try:
                await t
            except asyncio.CancelledError:
                print("cancel")
                pass

    timeout = 50
    loop.run_until_complete(asyncio.wait_for(async_test(), timeout))
