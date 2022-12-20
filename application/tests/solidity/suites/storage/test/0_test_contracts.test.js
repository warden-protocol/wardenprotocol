const Storage = artifacts.require('Storage');


contract('Test Storage Contract', async function (accounts) {

  let storageInstance;

  before(function () {
    console.log(`Using Accounts (${accounts.length}): \n${accounts.join('\n')}`);
    console.log('==========================\n');
  })

  it('should deploy Stroage contract', async function () {
    storageInstance = await Storage.new();
    console.log(`Deployed Storage at: ${storageInstance.address}`);
    expect(storageInstance.address).not.to.be.undefined;
  });

  it('should succesfully stored a value', async function () {
    const tx = await storageInstance.store(888);
    console.log(`Stored value 888 by tx: ${tx.tx}`);
    expect(tx.tx).not.to.be.undefined;
  });

  it('should succesfully retrieve a value', async function () {
    const value = await storageInstance.retrieve();
    expect(value.toString()).to.equal('888');
  });

})