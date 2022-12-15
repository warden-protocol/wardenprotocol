import json
import os
import signal
import subprocess
from pathlib import Path

import web3
from pystarport import ports
from web3.middleware import geth_poa_middleware

from .utils import wait_for_port


class Ethermint:
    def __init__(self, base_dir):
        self._w3 = None
        self.base_dir = base_dir
        self.config = json.loads((base_dir / "config.json").read_text())
        self.enable_auto_deployment = False
        self._use_websockets = False

    def copy(self):
        return Ethermint(self.base_dir)

    @property
    def w3_http_endpoint(self, i=0):
        port = ports.evmrpc_port(self.base_port(i))
        return f"http://localhost:{port}"

    @property
    def w3_ws_endpoint(self, i=0):
        port = ports.evmrpc_ws_port(self.base_port(i))
        return f"ws://localhost:{port}"

    @property
    def w3(self, i=0):
        if self._w3 is None:
            if self._use_websockets:
                self._w3 = web3.Web3(
                    web3.providers.WebsocketProvider(self.w3_ws_endpoint)
                )
            else:
                self._w3 = web3.Web3(web3.providers.HTTPProvider(self.w3_http_endpoint))
        return self._w3

    def base_port(self, i):
        return self.config["validators"][i]["base_port"]

    def node_rpc(self, i):
        return "tcp://127.0.0.1:%d" % ports.rpc_port(self.base_port(i))

    def use_websocket(self, use=True):
        self._w3 = None
        self._use_websockets = use


class Geth:
    def __init__(self, w3):
        self.w3 = w3


def setup_ethermint(path, base_port):
    cfg = Path(__file__).parent / "configs/default.jsonnet"
    yield from setup_custom_ethermint(path, base_port, cfg)


def setup_geth(path, base_port):
    with (path / "geth.log").open("w") as logfile:
        cmd = [
            "start-geth",
            path,
            "--http.port",
            str(base_port),
            "--port",
            str(base_port + 1),
        ]
        print(*cmd)
        proc = subprocess.Popen(
            cmd,
            preexec_fn=os.setsid,
            stdout=logfile,
            stderr=subprocess.STDOUT,
        )
        try:
            wait_for_port(base_port)
            w3 = web3.Web3(web3.providers.HTTPProvider(f"http://127.0.0.1:{base_port}"))
            w3.middleware_onion.inject(geth_poa_middleware, layer=0)
            yield Geth(w3)
        finally:
            os.killpg(os.getpgid(proc.pid), signal.SIGTERM)
            # proc.terminate()
            proc.wait()


def setup_custom_ethermint(path, base_port, config, post_init=None, chain_binary=None):
    cmd = [
        "pystarport",
        "init",
        "--config",
        config,
        "--data",
        path,
        "--base_port",
        str(base_port),
        "--no_remove",
    ]
    if chain_binary is not None:
        cmd = cmd[:1] + ["--cmd", chain_binary] + cmd[1:]
    print(*cmd)
    subprocess.run(cmd, check=True)
    if post_init is not None:
        post_init(path, base_port, config)
    proc = subprocess.Popen(
        ["pystarport", "start", "--data", path, "--quiet"],
        preexec_fn=os.setsid,
    )
    try:
        wait_for_port(ports.evmrpc_port(base_port))
        wait_for_port(ports.evmrpc_ws_port(base_port))
        yield Ethermint(path / "ethermint_9000-1")
    finally:
        os.killpg(os.getpgid(proc.pid), signal.SIGTERM)
        proc.wait()
