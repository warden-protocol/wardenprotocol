const EventTest = artifacts.require('EventTest');
const truffleAssert = require('truffle-assertions');

contract('Test EventTest Contract', async function (accounts) {

  let eventInstance;

  before(function () {
    console.log(`Using Accounts (${accounts.length}): \n${accounts.join('\n')}`);
    console.log('==========================\n');
  })

  it('should deploy EventTest contract', async function () {
    eventInstance = await EventTest.new();
    console.log(`Deployed EventTest at: ${eventInstance.address}`);
    expect(eventInstance.address).not.to.be.undefined;
  });

  it('should emit events', async function () {
    const tx = await eventInstance.storeWithEvent(888);
    truffleAssert.eventEmitted(tx, 'ValueStored1', events => {
      return events['0'].toString() === '888';
    });
    truffleAssert.eventEmitted(tx, 'ValueStored2', events => {
      return events['0'].toString() === 'TestMsg' && events['1'].toString() === '888';
    });
    truffleAssert.eventEmitted(tx, 'ValueStored3', events => {
      return events['0'].toString() === 'TestMsg' && events['1'].toString() === '888' && events['2'].toString() === '888';
    });

  });

})