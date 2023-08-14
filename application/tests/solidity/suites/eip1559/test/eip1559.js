contract('Transaction', async function(accounts) {

  it('should send a transaction with EIP-1559 flag', async function() {
    console.log(`Accounts: `, accounts);
    console.log(web3.version);
    const tx = await web3.eth.sendTransaction({
      from: accounts[0],
      to: !!accounts[1] ? accounts[1] : "0x0000000000000000000000000000000000000000",
      value: '10000000',
      gas: '21000',
      type: "0x2",
      common: {
        hardfork: 'london'
      }
    });
    console.log(tx);
    assert.equal(tx.type, '0x2', 'Tx type should be 0x2');
  });

});