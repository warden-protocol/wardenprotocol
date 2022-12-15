const Storage = artifacts.require('Storage');

async function expectRevert(promise) {
  try {
    await promise;
  } catch (error) {
    if (error.message.indexOf('revert') === -1) {
      expect('revert').to.equal(error.message, 'Wrong kind of exception received');
    }
    return;
  }
  expect.fail('Expected an exception but none was received');
}


contract('Test EVM Revert', async function (accounts) {

  before(function () {
    console.log(`Using Accounts (${accounts.length}): \n${accounts.join('\n')}`);
    console.log('==========================\n');
  })

  let storageInstance;
  it('should deploy Stroage contract', async function () {
    storageInstance = await Storage.new();
    console.log(`Deployed Storage at: ${storageInstance.address}`);
    expect(storageInstance.address).not.to.be.undefined;
  });

  it('should revert when call `shouldRevert()`', async function () {
    await expectRevert(storageInstance.shouldRevert());
  });

})