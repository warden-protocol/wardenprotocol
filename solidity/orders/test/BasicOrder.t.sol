// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Test } from "forge-std/src/Test.sol";
import { ISLINKY_PRECOMPILE_ADDRESS } from "precompile-slinky/ISlinky.sol";
import { IWARDEN_PRECOMPILE_ADDRESS } from "precompile-warden/IWarden.sol";
import { Types } from "../src/Types.sol";
import {
    OrderCreated,
    OrderFactory,
    OrderType,
    InvalidRegistryAddress,
    InvalidSchedulerAddress,
    SchedulerChanged
} from "../src/OrderFactory.sol";
import { Caller, IExecution } from "../src/IExecution.sol";
import { MockWardenPrecompile } from "./mocks/MockWardenPrecompile.sol";
import { MockSlinkyPrecompile } from "./mocks/MockSlinkyPrecompile.sol";
import { Types as CommonTypes } from "precompile-common/Types.sol";
import {
    BasicOrder,
    Executed,
    ConditionNotMet,
    ExecutedError,
    InvalidScheduler,
    InvalidSwapDataAmountIn,
    InvalidSwapDataTo,
    InvalidExpectedApproveExpression,
    InvalidExpectedRejectExpression,
    InvalidThresholdPrice,
    InvalidTxTo,
    Unauthorized
} from "../src/BasicOrder.sol";

struct TestData {
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
    Types.OrderData private _orderData;
    IExecution private _order;
    Caller[] private _expectedCallers;

    // @openzeppelin Ownable.sol
    error OwnableUnauthorizedAccount(address account);

    address private constant SEPOLIA_UNISWAP_V2_ROUTER =
        address(bytes20(bytes("0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3")));
    address private constant RECEIVER = address(bytes20(bytes("0x18517Cb2779186B86b1F8947dFdB6078C1B9C9db")));

    function beforeTestSetup(bytes4 testSelector) public pure returns (bytes[] memory beforeTestCalldata) {
        if (testSelector == this.test_BasicOrder_StateBeforeExecution.selector) {
            beforeTestCalldata = new bytes[](1);
            beforeTestCalldata[0] =
                abi.encodeWithSignature("test_BasicOrder_Create(bool,uint8)", true, Types.PriceCondition.LTE);
        } else if (testSelector == this.test_basicOrderRevertWhenConditionNotMet.selector) {
            beforeTestCalldata = new bytes[](1);
            beforeTestCalldata[0] =
                abi.encodeWithSignature("test_BasicOrder_Create(bool,uint8)", true, Types.PriceCondition.LTE);
        } else if (testSelector == this.test_basicOrderRevertWhenUnauthorized.selector) {
            beforeTestCalldata = new bytes[](1);
            beforeTestCalldata[0] =
                abi.encodeWithSignature("test_BasicOrder_Create(bool,uint8)", true, Types.PriceCondition.LTE);
        } else if (testSelector == this.test_basicOrderExecuteWhenPriceMovesDown.selector) {
            beforeTestCalldata = new bytes[](1);
            beforeTestCalldata[0] =
                abi.encodeWithSignature("test_BasicOrder_Create(bool,uint8)", true, Types.PriceCondition.LTE);
        } else if (testSelector == this.test_basicOrderExecuteWhenPriceMovesUp.selector) {
            beforeTestCalldata = new bytes[](1);
            beforeTestCalldata[0] =
                abi.encodeWithSignature("test_BasicOrder_Create(bool,uint8)", true, Types.PriceCondition.GTE);
        } else if (
            testSelector == this.test_BasicOrderRevertWhenInvalidScheduler.selector
                || testSelector == this.test_BasicOrderRevertWhenInvalidAmountIn.selector
                || testSelector == this.test_BasicOrderRevertWhenInvalidSwapDataTo.selector
                || testSelector == this.test_BasicOrderRevertWhenInvalidExpectedApproveExpression.selector
                || testSelector == this.test_BasicOrderRevertWhenInvalidExpectedRejectExpression.selector
                || testSelector == this.test_BasicOrderRevertWhenInvalidThresholdPrice.selector
                || testSelector == this.test_BasicOrderRevertWhenInvalidTxTo.selector
        ) {
            beforeTestCalldata = new bytes[](1);
            beforeTestCalldata[0] = abi.encodeWithSignature("saveOrderData()");
        }
    }

    function setUp() public {
        // placeholder till registry unimplemented
        address registry = address(this);
        address scheduler = address(this);
        address owner = address(this);
        OrderFactory orderFactory = new OrderFactory(registry, scheduler, owner);

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
            orderFactory: orderFactory,
            wardenPrecompile: wardenPrecompile,
            mockSlinkyPrecompile: mockSlinkyPrecompile,
            thresholdPrice: 5,
            pricePair: Types.PricePair({ base: "ETH", quote: "DOGE" }),
            goodKeyId: goodKeyId,
            badKeyId: badKeyId,
            scheduler: scheduler
        });

        _expectedCallers.push(Caller.Scheduler);
    }

    function test_BasicOrder_Create(bool goodOrder, uint8 condition) public {
        if (condition > 1) {
            condition = 0;
        }

        address[] memory path;
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

        Types.OrderData memory orderData = Types.OrderData({
            thresholdPrice: _testData.thresholdPrice,
            priceCondition: cond,
            pricePair: _testData.pricePair,
            swapData: Types.SwapData({ amountIn: 1, path: path, to: RECEIVER, deadline: 0 }),
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
                to: SEPOLIA_UNISWAP_V2_ROUTER
            })
        });

        CommonTypes.Coin[] memory maxKeychainFees;

        vm.expectEmit(true, true, false, false);

        emit OrderCreated(address(this), OrderType.Basic, address(this));

        address orderAddress = _testData.orderFactory.createOrder(orderData, maxKeychainFees, OrderType.Basic);

        _order = IExecution(orderAddress);
    }

    function test_BasicOrder_StateBeforeExecution() public {
        assert(!_order.canExecute());
        assert(!_order.isExecuted());
        assert(_order.callers().length == 1);
        assert(_order.callers()[0] == _expectedCallers[0]);
    }

    function test_basicOrderRevertWhenConditionNotMet() public {
        assert(!_order.canExecute());
        assert(!_order.isExecuted());

        vm.expectRevert(ConditionNotMet.selector);
        _order.execute(1, 1, 1, 1, 1);
    }

    function test_basicOrderRevertWhenUnauthorized() public {
        vm.expectRevert(Unauthorized.selector);
        vm.broadcast(address(0));
        _order.execute(1, 1, 1, 1, 1);
    }

    function test_basicOrderExecuteWhenPriceMovesDown() public {
        uint256 price = _testData.thresholdPrice - 1;
        _testData.mockSlinkyPrecompile.setPrice(_testData.pricePair.base, _testData.pricePair.quote, price);

        assert(_order.canExecute());

        vm.expectEmit(false, false, false, false);
        emit Executed();

        bool executed = _order.execute(1, 1, 1, 1, 1);

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

        bool executed = _order.execute(1, 1, 1, 1, 1);

        assert(executed);

        assert(_order.isExecuted());

        vm.expectRevert(ExecutedError.selector);
        _order.execute(1, 1, 1, 1, 1);
    }

    function saveOrderData() public {
        address[] memory path;
        bytes[] memory analyzers;
        bytes memory encryptionKey;
        Types.OrderData memory orderData = Types.OrderData({
            thresholdPrice: _testData.thresholdPrice,
            priceCondition: Types.PriceCondition.LTE,
            pricePair: _testData.pricePair,
            swapData: Types.SwapData({ amountIn: 1, path: path, to: RECEIVER, deadline: 0 }),
            signRequestData: Types.SignRequestData({
                keyId: 0,
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
                to: SEPOLIA_UNISWAP_V2_ROUTER
            })
        });

        _orderData = orderData;
    }

    function test_BasicOrderRevertWhenInvalidScheduler() public {
        CommonTypes.Coin[] memory maxKeychainFees;

        vm.expectRevert(InvalidScheduler.selector);

        new BasicOrder(_orderData, maxKeychainFees, address(0));
    }

    function test_BasicOrderRevertWhenInvalidAmountIn() public {
        CommonTypes.Coin[] memory maxKeychainFees;
        _orderData.swapData.amountIn = 0;
        vm.expectRevert(InvalidSwapDataAmountIn.selector);

        _testData.orderFactory.createOrder(_orderData, maxKeychainFees, OrderType.Basic);
    }

    function test_BasicOrderRevertWhenInvalidSwapDataTo() public {
        CommonTypes.Coin[] memory maxKeychainFees;
        _orderData.swapData.to = address(0);
        vm.expectRevert(InvalidSwapDataTo.selector);

        _testData.orderFactory.createOrder(_orderData, maxKeychainFees, OrderType.Basic);
    }

    function test_BasicOrderRevertWhenInvalidExpectedApproveExpression() public {
        CommonTypes.Coin[] memory maxKeychainFees;
        _orderData.signRequestData.expectedApproveExpression = "";
        vm.expectRevert(InvalidExpectedApproveExpression.selector);

        _testData.orderFactory.createOrder(_orderData, maxKeychainFees, OrderType.Basic);
    }

    function test_BasicOrderRevertWhenInvalidExpectedRejectExpression() public {
        CommonTypes.Coin[] memory maxKeychainFees;
        _orderData.signRequestData.expectedRejectExpression = "";
        vm.expectRevert(InvalidExpectedRejectExpression.selector);

        _testData.orderFactory.createOrder(_orderData, maxKeychainFees, OrderType.Basic);
    }

    function test_BasicOrderRevertWhenInvalidThresholdPrice() public {
        CommonTypes.Coin[] memory maxKeychainFees;
        _orderData.thresholdPrice = 0;
        vm.expectRevert(InvalidThresholdPrice.selector);

        _testData.orderFactory.createOrder(_orderData, maxKeychainFees, OrderType.Basic);
    }

    function test_BasicOrderRevertWhenInvalidTxTo() public {
        CommonTypes.Coin[] memory maxKeychainFees;
        _orderData.creatorDefinedTxFields.to = address(0);
        vm.expectRevert(InvalidTxTo.selector);

        _testData.orderFactory.createOrder(_orderData, maxKeychainFees, OrderType.Basic);
    }

    function test_FactoryConstructorRevertWhenInvalidRegistry() public {
        vm.expectRevert(InvalidRegistryAddress.selector);
        new OrderFactory(address(0), address(this), address(this));
    }

    function test_FactoryConstructorRevertWhenInvalidScheduler() public {
        vm.expectRevert(InvalidSchedulerAddress.selector);
        new OrderFactory(address(this), address(0), address(this));
    }

    function test_FactorySetScheduler() public {
        OrderFactory factory = new OrderFactory(address(this), address(this), address(this));

        vm.expectEmit(true, true, false, false);

        emit SchedulerChanged(address(this), RECEIVER);

        factory.setScheduler(RECEIVER);

        assertEq(factory.scheduler(), RECEIVER);
    }

    function test_FactoryRevertWhenSetSchedulerNotOwner() public {
        OrderFactory factory = new OrderFactory(address(this), address(this), address(this));

        vm.expectRevert(abi.encodeWithSelector(OwnableUnauthorizedAccount.selector, RECEIVER));
        vm.prank(RECEIVER);
        factory.setScheduler(RECEIVER);

        assertEq(factory.scheduler(), address(this));
    }

    function test_FactoryRevertWhenSetSchedulerInvalid() public {
        OrderFactory factory = new OrderFactory(address(this), address(this), address(this));

        vm.expectRevert(InvalidSchedulerAddress.selector);
        factory.setScheduler(address(0));

        assertEq(factory.scheduler(), address(this));
    }
}
