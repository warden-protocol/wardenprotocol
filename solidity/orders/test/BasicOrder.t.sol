// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Test } from "forge-std/src/Test.sol";
import { ISLINKY_PRECOMPILE_ADDRESS } from "precompile-slinky/ISlinky.sol";
import { IWARDEN_PRECOMPILE_ADDRESS } from "precompile-warden/IWarden.sol";
import { Types } from "../src/types/Types.sol";
import {
    OrderCreated,
    OrderFactory,
    OrderType,
    InvalidRegistryAddress,
    InvalidSchedulerAddress,
    SchedulerChanged,
    SaltAlreadyUsed
} from "../src/factories/OrderFactory.sol";
import { BasicOrderFactory } from "../src/factories/BasicOrderFactory.sol";
import { AdvancedOrderFactory } from "../src/factories/AdvancedOrderFactory.sol";
import { IExecution } from "../src/types/IExecution.sol";
import { MockWardenPrecompile } from "../mocks/MockWardenPrecompile.sol";
import { MockSlinkyPrecompile } from "../mocks/MockSlinkyPrecompile.sol";
import { Types as CommonTypes } from "precompile-common/Types.sol";
import { InvalidScheduler } from "../src/orders/AbstractOrder.sol";
import { BasicOrder, Executed, ConditionNotMet, ExecutedError, Unauthorized } from "../src/orders/BasicOrder.sol";
import {
    BadCreatorAddress,
    ExecutionAlreadyRegistered,
    InvalidExecutionAddress,
    NewTx,
    Registry,
    Registered,
    UnauthorizedToAddTx,
    NotExecuted,
    TxAlreadyAdded,
    InvalidHash
} from "../src/Registry.sol";
import { Create3 } from "@0xsequence/create3/contracts/Create3.sol";

struct TestData {
    Registry registry;
    BasicOrderFactory basicOrderFactory;
    AdvancedOrderFactory advancedOrderFactory;
    OrderFactory orderFactory;
    MockWardenPrecompile wardenPrecompile;
    MockSlinkyPrecompile mockSlinkyPrecompile;
    uint256 thresholdPrice;
    Types.PricePair pricePair;
    uint64 goodKeyId;
    uint64 badKeyId;
    address scheduler;
}

contract BasicOrderTest is Test {
    TestData private _testData;
    Types.BasicOrderData private _orderData;
    Types.CommonExecutionData private _executionData;
    IExecution private _order;
    bytes32 private _txHash;

    // @openzeppelin Ownable.sol
    error OwnableUnauthorizedAccount(address account);

    address private constant SEPOLIA_UNISWAP_V2_ROUTER = address(uint160(0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3));
    address private constant RECEIVER = address(uint160(0x18517Cb2779186B86b1F8947dFdB6078C1B9C9db));
    address private constant SEPOLIA_WETH = 0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14;
    address private constant SEPOLIA_TEST_TOKEN = 0xE5a71132Ae99691ef35F68459aDde842118A86a5;

    function beforeTestSetup(bytes4 testSelector) public pure returns (bytes[] memory beforeTestCalldata) {
        if (
            testSelector == this.test_BasicOrder_StateBeforeExecution.selector
                || testSelector == this.test_basicOrderRevertWhenConditionNotMet.selector
                || testSelector == this.test_basicOrderRevertWhenUnauthorized.selector
                || testSelector == this.test_basicOrderRevertGetTxWhenNotExecuted.selector
                || testSelector == this.test_basicOrderExecuteWhenPriceMovesDown.selector
                || testSelector == this.test_RegistryRevertAddTransactionWhenInvalidHash.selector
                || testSelector == this.test_RegistryRevertAddTransactionWhenNotExecuted.selector
                || testSelector == this.test_RegistryRevertWhenAlreadyRegistered.selector
        ) {
            beforeTestCalldata = new bytes[](1);
            beforeTestCalldata[0] =
                abi.encodeWithSignature("test_BasicOrder_Create(bool,uint8)", true, Types.PriceCondition.LTE);
        } else if (testSelector == this.test_basicOrderExecuteWhenPriceMovesUp.selector) {
            beforeTestCalldata = new bytes[](1);
            beforeTestCalldata[0] =
                abi.encodeWithSignature("test_BasicOrder_Create(bool,uint8)", true, Types.PriceCondition.GTE);
        } else if (testSelector == this.test_RegistryRevertAddTransactionWhenAlreadyAdded.selector) {
            beforeTestCalldata = new bytes[](2);
            beforeTestCalldata[0] =
                abi.encodeWithSignature("test_BasicOrder_Create(bool,uint8)", true, Types.PriceCondition.GTE);
            beforeTestCalldata[1] = abi.encodeWithSignature("test_basicOrderExecuteWhenPriceMovesUp()");
        } else if (
            testSelector == this.test_BasicOrderRevertWhenInvalidScheduler.selector
                || testSelector == this.test_BasicOrderRevertWhenInvalidExpectedApproveExpression.selector
                || testSelector == this.test_BasicOrderRevertWhenInvalidExpectedRejectExpression.selector
                || testSelector == this.test_BasicOrderRevertWhenInvalidThresholdPrice.selector
                || testSelector == this.test_BasicOrderRevertWhenInvalidTxTo.selector
        ) {
            beforeTestCalldata = new bytes[](1);
            beforeTestCalldata[0] = abi.encodeWithSignature("saveOrderData()");
        } else if (
            testSelector == this.test_computeOrderAddressMatchesCreateOrder.selector
                || testSelector == this.test_computeOrderAddressGuardedBySender.selector
        ) {
            beforeTestCalldata = new bytes[](1);
            beforeTestCalldata[0] =
                abi.encodeWithSignature("test_BasicOrder_Create(bool,uint8)", true, Types.PriceCondition.LTE);
        } else if (testSelector == this.test_computeOrderAddressBeforeDeployment.selector) {
            beforeTestCalldata = new bytes[](1);
            beforeTestCalldata[0] = abi.encodeWithSignature("saveOrderData()");
        } else if (
            testSelector == this.test_createOrderRevertsWithUsedSalt.selector
                || testSelector == this.test_createOrderWithDifferentSenderCanUseSameSalt.selector
        ) {
            beforeTestCalldata = new bytes[](1);
            beforeTestCalldata[0] =
                abi.encodeWithSignature("test_BasicOrder_Create(bool,uint8)", true, Types.PriceCondition.LTE);
        }
    }

    function setUp() public {
        Registry registry = new Registry();
        address scheduler = address(this);
        address owner = address(this);
        BasicOrderFactory basicOrderFactory = new BasicOrderFactory(address(registry));
        AdvancedOrderFactory advancedOrderFactory = new AdvancedOrderFactory(address(registry));
        OrderFactory orderFactory = new OrderFactory(
            address(registry), scheduler, owner, address(basicOrderFactory), address(advancedOrderFactory)
        );

        MockWardenPrecompile wPrecompile = new MockWardenPrecompile();
        vm.etch(IWARDEN_PRECOMPILE_ADDRESS, address(wPrecompile).code);
        MockWardenPrecompile wardenPrecompile = MockWardenPrecompile(IWARDEN_PRECOMPILE_ADDRESS);

        MockSlinkyPrecompile mSlinkyPrecompile = new MockSlinkyPrecompile();
        vm.etch(ISLINKY_PRECOMPILE_ADDRESS, address(mSlinkyPrecompile).code);
        MockSlinkyPrecompile mockSlinkyPrecompile = MockSlinkyPrecompile(ISLINKY_PRECOMPILE_ADDRESS);

        uint64 goodKeyId = 1;
        uint64 badKeyId = 2;
        wardenPrecompile.addKey(goodKeyId, true);
        wardenPrecompile.addKey(badKeyId, false);

        _testData = TestData({
            registry: registry,
            basicOrderFactory: basicOrderFactory,
            advancedOrderFactory: advancedOrderFactory,
            orderFactory: orderFactory,
            wardenPrecompile: wardenPrecompile,
            mockSlinkyPrecompile: mockSlinkyPrecompile,
            thresholdPrice: 5,
            pricePair: Types.PricePair({ base: "ETH", quote: "DOGE" }),
            goodKeyId: goodKeyId,
            badKeyId: badKeyId,
            scheduler: scheduler
        });

        // Initialize _orderData with valid values
        bytes[] memory analyzers;
        _orderData = Types.BasicOrderData({
            thresholdPrice: _testData.thresholdPrice,
            priceCondition: Types.PriceCondition.LTE,
            pricePair: _testData.pricePair
        });

        _executionData = Types.CommonExecutionData({
            signRequestData: Types.SignRequestData({
                keyId: _testData.goodKeyId,
                analyzers: analyzers,
                encryptionKey: "",
                spaceNonce: 0,
                actionTimeoutHeight: 0,
                expectedApproveExpression: "expectedApproveExpression",
                expectedRejectExpression: "expectedRejectExpression"
            }),
            creatorDefinedTxFields: Types.CreatorDefinedTxFields({
                value: 0,
                chainId: 11_155_111,
                to: SEPOLIA_UNISWAP_V2_ROUTER,
                data: getTestSwapData()
            })
        });
    }

    function test_BasicOrder_Create(bool goodOrder, uint8 condition) public {
        if (condition > 1) {
            condition = 0;
        }

        bytes[] memory analyzers;
        bytes memory encryptionKey;
        uint64 keyId;
        if (goodOrder) {
            keyId = _testData.goodKeyId;
        } else {
            keyId = _testData.badKeyId;
        }

        Types.PriceCondition cond = Types.PriceCondition(condition);
        if (cond == Types.PriceCondition.LTE) {
            _testData.mockSlinkyPrecompile.setPrice(
                _testData.pricePair.base, _testData.pricePair.quote, _testData.thresholdPrice + 1
            );
        } else {
            _testData.mockSlinkyPrecompile.setPrice(
                _testData.pricePair.base, _testData.pricePair.quote, _testData.thresholdPrice - 1
            );
        }

        bytes memory data = getTestSwapData();
        Types.BasicOrderData memory orderData = Types.BasicOrderData({
            thresholdPrice: _testData.thresholdPrice,
            priceCondition: cond,
            pricePair: _testData.pricePair
        });
        Types.CommonExecutionData memory executionData = Types.CommonExecutionData({
            signRequestData: Types.SignRequestData({
                keyId: keyId,
                analyzers: analyzers,
                encryptionKey: encryptionKey,
                spaceNonce: 0,
                actionTimeoutHeight: 0,
                expectedApproveExpression: "expectedApproveExpression",
                expectedRejectExpression: "expectedRejectExpression"
            }),
            creatorDefinedTxFields: Types.CreatorDefinedTxFields({
                value: 0,
                chainId: 11_155_111,
                to: SEPOLIA_UNISWAP_V2_ROUTER,
                data: data
            })
        });
        bytes32 orderSalt = keccak256(abi.encodePacked(address(this), block.number, "ValidOrder"));

        CommonTypes.Coin[] memory maxKeychainFees;

        vm.expectEmit(true, false, false, false);
        emit Registered(address(_testData.basicOrderFactory), address(this));

        vm.expectEmit(true, true, false, false);
        emit OrderCreated(address(this), OrderType.Basic, address(this));

        address orderAddress = _testData.orderFactory.createOrder(
            abi.encode(orderData), executionData, maxKeychainFees, OrderType.Basic, orderSalt
        );

        assertEq(address(_testData.basicOrderFactory), _testData.registry.executions(orderAddress));
        assertEq(address(this), _testData.orderFactory.orders(orderAddress));

        _order = IExecution(orderAddress);
    }

    function test_BasicOrder_StateBeforeExecution() public {
        assert(!_order.canExecute());
        assert(!_order.isExecuted());
    }

    function test_basicOrderRevertWhenConditionNotMet() public {
        assert(!_order.canExecute());
        assert(!_order.isExecuted());

        vm.expectRevert(ConditionNotMet.selector);
        _order.execute(1, 1, 1, 1, 1);
    }

    function test_basicOrderRevertWhenUnauthorized() public {
        vm.expectRevert(Unauthorized.selector);
        vm.prank(address(0));
        _order.execute(1, 1, 1, 1, 1);
    }

    function test_basicOrderRevertGetTxWhenNotExecuted() public {
        vm.expectRevert(ExecutedError.selector);
        _order.getTx();
    }

    function test_basicOrderExecuteWhenPriceMovesDown() public {
        uint256 price = _testData.thresholdPrice - 1;
        _testData.mockSlinkyPrecompile.setPrice(_testData.pricePair.base, _testData.pricePair.quote, price);

        assert(_order.canExecute());

        vm.expectEmit(false, false, false, false);
        emit Executed();

        vm.expectEmit(true, true, false, false);
        // solhint-disable-next-line
        emit NewTx(address(_order), tx.origin, bytes32(0));

        (bool executed, bytes32 txHash) = _order.execute(1, 1, 1, 1, 1);
        // solhint-disable-next-line
        assertEq(_testData.registry.transactions(tx.origin, txHash), _order.getTx());
        assert(executed);

        assert(_order.isExecuted());

        vm.expectRevert(ExecutedError.selector);
        _order.execute(1, 1, 1, 1, 1);
    }

    function test_basicOrderExecuteWhenPriceMovesUp() public {
        uint256 price = _testData.thresholdPrice + 1;
        _testData.mockSlinkyPrecompile.setPrice(_testData.pricePair.base, _testData.pricePair.quote, price);

        assert(_order.canExecute());

        vm.expectEmit(false, false, false, false);
        emit Executed();

        vm.expectEmit(true, true, false, false);
        // solhint-disable-next-line
        emit NewTx(address(_order), tx.origin, bytes32(0));

        (bool executed, bytes32 txHash) = _order.execute(1, 1, 1, 1, 1);
        // solhint-disable-next-line
        assertEq(_testData.registry.transactions(tx.origin, txHash), _order.getTx());
        assert(executed);

        assert(_order.isExecuted());

        vm.expectRevert(ExecutedError.selector);
        _order.execute(1, 1, 1, 1, 1);
        _txHash = txHash;
    }

    function saveOrderData() public {
        bytes[] memory analyzers;
        bytes memory encryptionKey;
        bytes memory data = getTestSwapData();
        Types.BasicOrderData memory orderData = Types.BasicOrderData({
            thresholdPrice: _testData.thresholdPrice,
            priceCondition: Types.PriceCondition.LTE,
            pricePair: _testData.pricePair
        });

        Types.CommonExecutionData memory executionData = Types.CommonExecutionData({
            signRequestData: Types.SignRequestData({
                keyId: _testData.goodKeyId,
                analyzers: analyzers,
                encryptionKey: encryptionKey,
                spaceNonce: 0,
                actionTimeoutHeight: 0,
                expectedApproveExpression: "expectedApproveExpression",
                expectedRejectExpression: "expectedRejectExpression"
            }),
            creatorDefinedTxFields: Types.CreatorDefinedTxFields({
                value: 0,
                chainId: 11_155_111,
                to: SEPOLIA_UNISWAP_V2_ROUTER,
                data: data
            })
        });

        _orderData = orderData;
        _executionData = executionData;
    }

    function test_BasicOrderRevertWhenInvalidScheduler() public {
        CommonTypes.Coin[] memory maxKeychainFees;

        vm.expectRevert(InvalidScheduler.selector);

        new BasicOrder(_orderData, _executionData, maxKeychainFees, address(0), address(_testData.registry));
    }

    function test_BasicOrderRevertWhenInvalidExpectedApproveExpression() public {
        CommonTypes.Coin[] memory maxKeychainFees;
        _executionData.signRequestData.expectedApproveExpression = "";
        vm.expectRevert(Create3.ErrorCreatingContract.selector);

        bytes32 orderSalt = keccak256(abi.encodePacked(address(this), block.number, "InvalidApproveExpression"));
        _testData.orderFactory.createOrder(
            abi.encode(_orderData), _executionData, maxKeychainFees, OrderType.Basic, orderSalt
        );
    }

    function test_BasicOrderRevertWhenInvalidExpectedRejectExpression() public {
        CommonTypes.Coin[] memory maxKeychainFees;
        _executionData.signRequestData.expectedRejectExpression = "";
        vm.expectRevert(Create3.ErrorCreatingContract.selector);

        bytes32 orderSalt = keccak256(abi.encodePacked(address(this), block.number, "InvalidRejectExpression"));
        _testData.orderFactory.createOrder(
            abi.encode(_orderData), _executionData, maxKeychainFees, OrderType.Basic, orderSalt
        );
    }

    function test_BasicOrderRevertWhenInvalidThresholdPrice() public {
        CommonTypes.Coin[] memory maxKeychainFees;
        _orderData.thresholdPrice = 0;
        vm.expectRevert(Create3.ErrorCreatingContract.selector);

        bytes32 orderSalt = keccak256(abi.encodePacked(address(this), block.number, "InvalidThresholdPrice"));
        _testData.orderFactory.createOrder(
            abi.encode(_orderData), _executionData, maxKeychainFees, OrderType.Basic, orderSalt
        );
    }

    function test_BasicOrderRevertWhenInvalidTxTo() public {
        CommonTypes.Coin[] memory maxKeychainFees;
        _executionData.creatorDefinedTxFields.to = address(0);
        vm.expectRevert(Create3.ErrorCreatingContract.selector);

        bytes32 orderSalt = keccak256(abi.encodePacked(address(this), block.number, "InvalidTxTo"));
        _testData.orderFactory.createOrder(
            abi.encode(_orderData), _executionData, maxKeychainFees, OrderType.Basic, orderSalt
        );
    }

    function test_FactoryConstructorRevertWhenInvalidRegistry() public {
        vm.expectRevert(InvalidRegistryAddress.selector);
        new OrderFactory(address(0), address(this), address(this), address(this), address(this));
    }

    function test_FactoryConstructorRevertWhenInvalidScheduler() public {
        vm.expectRevert(InvalidSchedulerAddress.selector);
        new OrderFactory(address(this), address(0), address(this), address(this), address(this));
    }

    function test_FactorySetScheduler() public {
        OrderFactory factory =
            new OrderFactory(address(this), address(this), address(this), address(this), address(this));

        vm.expectEmit(true, true, false, false);

        emit SchedulerChanged(address(this), RECEIVER);

        factory.setScheduler(RECEIVER);

        assertEq(factory.scheduler(), RECEIVER);
    }

    function test_FactoryRevertWhenSetSchedulerNotOwner() public {
        OrderFactory factory =
            new OrderFactory(address(this), address(this), address(this), address(this), address(this));

        vm.expectRevert(abi.encodeWithSelector(OwnableUnauthorizedAccount.selector, RECEIVER));
        vm.prank(RECEIVER);
        factory.setScheduler(RECEIVER);

        assertEq(factory.scheduler(), address(this));
    }

    function test_FactoryRevertWhenSetSchedulerInvalid() public {
        OrderFactory factory =
            new OrderFactory(address(this), address(this), address(this), address(this), address(this));

        vm.expectRevert(InvalidSchedulerAddress.selector);
        factory.setScheduler(address(0));

        assertEq(factory.scheduler(), address(this));
    }

    function test_RegistryRevertWhenBadAddress() public {
        vm.expectRevert(InvalidExecutionAddress.selector);
        _testData.registry.register(address(0));
    }

    function test_RegistryRevertWhenAlreadyRegistered() public {
        vm.expectRevert(ExecutionAlreadyRegistered.selector);
        _testData.registry.register(address(_order));
    }

    function test_RegistryRevertAddTransactionWhenNotOrder() public {
        vm.expectRevert(UnauthorizedToAddTx.selector);
        // solhint-disable-next-line
        _testData.registry.addTransaction(tx.origin, keccak256(bytes("test")));
    }

    function test_RegistryRevertAddTransactionWhenInvalidHash() public {
        vm.expectRevert(InvalidHash.selector);
        vm.prank(address(_order));
        // solhint-disable-next-line
        _testData.registry.addTransaction(tx.origin, bytes32(0));
    }

    function test_RegistryRevertAddTransactionWhenAlreadyAdded() public {
        vm.expectRevert(TxAlreadyAdded.selector);
        vm.prank(address(_order));
        // solhint-disable-next-line
        _testData.registry.addTransaction(tx.origin, _txHash);
    }

    function test_RegistryRevertAddTransactionWhenNotExecuted() public {
        vm.expectRevert(NotExecuted.selector);
        vm.prank(address(_order));
        // solhint-disable-next-line
        _testData.registry.addTransaction(tx.origin, keccak256(bytes("test")));
    }

    function test_RegistryRevertAddTransactionWhenBadCreatorAddress() public {
        vm.expectRevert(BadCreatorAddress.selector);
        vm.prank(address(_order));
        _testData.registry.addTransaction(address(0), keccak256(bytes("test")));
    }

    function test_computeOrderAddressMatchesCreateOrder() public {
        bytes32 salt = keccak256(abi.encodePacked("unique_salt"));

        // Compute the expected order address
        // solhint-disable-next-line
        address computedAddress = _testData.orderFactory.computeOrderAddress(tx.origin, salt, OrderType.Basic);

        // Create the order
        bytes memory orderData = abi.encode(_orderData);
        Types.CommonExecutionData memory executionData = _executionData;
        CommonTypes.Coin[] memory maxKeychainFees;
        address orderAddress =
            _testData.orderFactory.createOrder(orderData, executionData, maxKeychainFees, OrderType.Basic, salt);

        // Assert that the computed address matches the deployed order address
        assertEq(computedAddress, orderAddress, "Computed address does not match deployed order address");
    }

    function test_computeOrderAddressBeforeDeployment() public {
        bytes32 salt = keccak256(abi.encodePacked("another_unique_salt"));

        // Ensure that the MockSlinkyPrecompile is set up properly
        _testData.mockSlinkyPrecompile.setPrice(
            _testData.pricePair.base, _testData.pricePair.quote, _testData.thresholdPrice + 1
        );

        // Compute the expected order address before deployment
        // solhint-disable-next-line
        address computedAddress = _testData.orderFactory.computeOrderAddress(tx.origin, salt, OrderType.Basic);

        // Ensure that no contract is deployed at the computed address yet
        assertEq(computedAddress.code.length, 0, "Order address should not be deployed yet");

        // Create the order
        bytes memory orderData = abi.encode(_orderData);
        Types.CommonExecutionData memory executionData = _executionData;
        CommonTypes.Coin[] memory maxKeychainFees;
        _testData.orderFactory.createOrder(orderData, executionData, maxKeychainFees, OrderType.Basic, salt);

        // Now, the contract should be deployed
        assertEq(computedAddress.code.length > 0, true, "Order contract was not deployed at computed address");
    }

    function test_createOrderRevertsWithUsedSalt() public {
        bytes32 salt = keccak256(abi.encodePacked("reused_salt"));

        // First creation should succeed
        bytes memory orderData = abi.encode(_orderData);
        Types.CommonExecutionData memory executionData = _executionData;
        CommonTypes.Coin[] memory maxKeychainFees;
        _testData.orderFactory.createOrder(orderData, executionData, maxKeychainFees, OrderType.Basic, salt);

        // Expect revert when using the same salt again
        vm.expectRevert(SaltAlreadyUsed.selector);
        _testData.orderFactory.createOrder(orderData, executionData, maxKeychainFees, OrderType.Basic, salt);
    }

    function test_createOrderWithDifferentSenderCanUseSameSalt() public {
        bytes32 salt = keccak256(abi.encodePacked("shared_salt"));

        // Create order with original sender
        bytes memory orderData = abi.encode(_orderData);
        Types.CommonExecutionData memory executionData = _executionData;
        CommonTypes.Coin[] memory maxKeychainFees;
        _testData.orderFactory.createOrder(orderData, executionData, maxKeychainFees, OrderType.Basic, salt);

        // Change the caller to a different address
        address newSender = address(0xBEEF);
        vm.prank(address(this), newSender);

        // This should succeed because the salt is guarded by msg.sender
        _testData.orderFactory.createOrder(orderData, executionData, maxKeychainFees, OrderType.Basic, salt);
    }

    function test_computeOrderAddressGuardedBySender() public {
        bytes32 salt = keccak256(abi.encodePacked("guarded_salt"));

        // Compute order address with original sender
        // solhint-disable-next-line
        address computedAddressOriginal = _testData.orderFactory.computeOrderAddress(tx.origin, salt, OrderType.Basic);

        // Create order with original sender
        bytes memory orderData = abi.encode(_orderData);
        Types.CommonExecutionData memory executionData = _executionData;
        CommonTypes.Coin[] memory maxKeychainFees;
        address orderAddressOriginal =
            _testData.orderFactory.createOrder(orderData, executionData, maxKeychainFees, OrderType.Basic, salt);

        // Assert that the computed address matches the deployed address for original sender
        assertEq(
            computedAddressOriginal,
            orderAddressOriginal,
            "Computed address does not match deployed order address for original sender"
        );

        // Compute order address with a different sender
        address differentSender = address(0xDEAD);
        address computedAddressDifferent =
            _testData.orderFactory.computeOrderAddress(differentSender, salt, OrderType.Basic);

        // Create order with different sender
        vm.prank(address(this), differentSender);
        address orderAddressDifferent =
            _testData.orderFactory.createOrder(orderData, executionData, maxKeychainFees, OrderType.Basic, salt);

        // Assert that the computed address matches the deployed address for different sender
        assertEq(
            computedAddressDifferent,
            orderAddressDifferent,
            "Computed address does not match deployed order address for different sender"
        );

        // Ensure that the two order addresses are different
        assertEq(
            orderAddressOriginal == orderAddressDifferent,
            false,
            "Order addresses for different senders should not be the same"
        );
    }

    function getTestSwapData() internal pure returns (bytes memory) {
        // Encode Uniswap V2 swapExactTokensForTokens parameters
        address[] memory path = new address[](2);
        path[0] = SEPOLIA_WETH;
        path[1] = SEPOLIA_TEST_TOKEN;
        bytes4 functionSelector =
            bytes4(keccak256(abi.encodePacked("swapExactETHForTokens(uint256,address[],address, uint256)")));
        return abi.encodeWithSelector(
            functionSelector,
            1, // amountOutMin
            path,
            RECEIVER,
            type(uint256).max // deadline
        );
    }
}
