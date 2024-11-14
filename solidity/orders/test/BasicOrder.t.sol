// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Test } from "forge-std/src/Test.sol";
import { ISLINKY_PRECOMPILE_ADDRESS } from "precompile-slinky/ISlinky.sol";
import { IWARDEN_PRECOMPILE_ADDRESS } from "precompile-warden/IWarden.sol";
import { Types } from "../src/Types.sol";
import { OrderFactory, OrderType } from "../src/OrderFactory.sol";
import { IExecution } from "../src/IExecution.sol";
import { MockWardenPrecompile } from "./mocks/MockWardenPrecompile.sol";
import { MockSlinkyPrecompile } from "./mocks/MockSlinkyPrecompile.sol";
import { Types as CommonTypes } from "precompile-common/Types.sol";
import { ConditionNotMet, ExecutedError, Unauthorized } from "../src/BasicOrder.sol";

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
    TestData private testData;
    IExecution private order;

    address private constant SEPOLIA_UNISWAP_V2_ROUTER =
        address(bytes20(bytes("0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3")));
    address private constant RECEIVER = address(bytes20(bytes("0x18517Cb2779186B86b1F8947dFdB6078C1B9C9db")));

    event OrderCreated(address indexed orderCreator, OrderType indexed orderType, address orderContact);
    event Executed();

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
        }
    }

    function setUp() public {
        // placeholder till registry unimplemented
        address registry = address(this);
        OrderFactory orderFactory = new OrderFactory(registry);

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

        testData = TestData({
            orderFactory: orderFactory,
            wardenPrecompile: wardenPrecompile,
            mockSlinkyPrecompile: mockSlinkyPrecompile,
            thresholdPrice: 5,
            pricePair: Types.PricePair({ base: "ETH", quote: "DOGE" }),
            goodKeyId: goodKeyId,
            badKeyId: badKeyId,
            scheduler: address(this)
        });
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
            keyId = testData.goodKeyId;
        } else {
            keyId = testData.badKeyId;
        }

        Types.PriceCondition cond = Types.PriceCondition(condition);
        if (cond == Types.PriceCondition.LTE) {
            testData.mockSlinkyPrecompile.setPrice(
                testData.pricePair.base, testData.pricePair.quote, testData.thresholdPrice + 1
            );
        } else {
            testData.mockSlinkyPrecompile.setPrice(
                testData.pricePair.base, testData.pricePair.quote, testData.thresholdPrice - 1
            );
        }

        Types.OrderData memory orderData = Types.OrderData({
            thresholdPrice: testData.thresholdPrice,
            priceCondition: cond,
            pricePair: testData.pricePair,
            swapData: Types.SwapData({ amountIn: 1, path: path, to: RECEIVER, deadline: 0 }),
            signRequestData: Types.SignRequestData({
                keyId: keyId,
                analyzers: analyzers,
                encryptionKey: encryptionKey,
                spaceNonce: 0,
                actionTimeoutHeight: 0,
                expectedApproveExpression: "",
                expectedRejectExpression: ""
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

        address orderAddress =
            testData.orderFactory.createOrder(orderData, maxKeychainFees, testData.scheduler, OrderType.Basic);

        order = IExecution(orderAddress);
    }

    function test_BasicOrder_StateBeforeExecution() public {
        assert(!order.canExecute());
        assert(!order.isExecuted());
        assert(order.calledByScheduler());
        assert(!order.calledByAIService());
    }

    function test_basicOrderRevertWhenConditionNotMet() public {
        assert(!order.canExecute());
        assert(!order.isExecuted());

        vm.expectRevert(ConditionNotMet.selector);
        order.execute(1, 1, 1, 1, 1);
    }

    function test_basicOrderRevertWhenUnauthorized() public {
        vm.expectRevert(Unauthorized.selector);
        vm.broadcast(address(0));
        order.execute(1, 1, 1, 1, 1);
    }

    function test_basicOrderExecuteWhenPriceMovesDown() public {
        uint256 price = testData.thresholdPrice - 1;
        testData.mockSlinkyPrecompile.setPrice(testData.pricePair.base, testData.pricePair.quote, price);

        assert(order.canExecute());

        vm.expectEmit(false, false, false, false);
        emit Executed();

        // vm.prank(msgSender);
        bool executed = order.execute(1, 1, 1, 1, 1);

        assert(executed);

        assert(order.isExecuted());

        vm.expectRevert(ExecutedError.selector);
        order.execute(1, 1, 1, 1, 1);
    }

    function test_basicOrderExecuteWhenPriceMovesUp() public {
        uint256 price = testData.thresholdPrice + 1;
        testData.mockSlinkyPrecompile.setPrice(testData.pricePair.base, testData.pricePair.quote, price);

        assert(order.canExecute());

        vm.expectEmit(false, false, false, false);
        emit Executed();

        bool executed = order.execute(1, 1, 1, 1, 1);

        assert(executed);

        assert(order.isExecuted());

        vm.expectRevert(ExecutedError.selector);
        order.execute(1, 1, 1, 1, 1);
    }
}
