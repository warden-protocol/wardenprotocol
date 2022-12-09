def test_basic(cluster):
    w3 = cluster.w3
    assert w3.eth.chain_id == 9000
