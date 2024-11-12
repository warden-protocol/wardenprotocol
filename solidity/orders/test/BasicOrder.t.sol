// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import {Test} from "forge-std/src/Test.sol";
import {Types} from "../src/Types.sol";
import {OrderFactory, OrderType} from "../src/OrderFactory.sol";
import {IExecution} from "../src/IExecution.sol";
import {MockWardenPrecompile} from "./mocks/MockWardenPrecompile.sol";
import {Types as CommonTypes} from "precompile-common/Types.sol";
import {ConditionNotMet} from "../src/BasicOrder.sol";

struct TestData {
    OrderFactory orderFactory;
    MockWardenPrecompile wardenPrecompile;
    uint256 thresholPrice;
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

    function beforeTestSetup(
        bytes4 testSelector
    ) public pure returns (bytes[] memory beforeTestCalldata) {
        if (testSelector == this.test_BasicOrder_StateBeforeExecution.selector) {
            beforeTestCalldata = new bytes[](1);
            beforeTestCalldata[0] = abi.encodeWithSignature(
                "test_BasicOrder_Create(bool,uint8)",
                true,
                Types.PriceCondition.LessOrEqual);
        } else if (testSelector == this.test_basicOrderRevertWhenConditionNotMet.selector) {
            beforeTestCalldata = new bytes[](1);
            beforeTestCalldata[0] = abi.encodeWithSignature(
                "test_BasicOrder_Create(bool,uint8)",
                true,
                Types.PriceCondition.LessOrEqual);
        }
        
        // TODO: after oracle integration
        // else if (testSelector == this.test_basicOrderRevertWhenUnauthorized.selector) {
        //     beforeTestCalldata = new bytes[](1);
        //     beforeTestCalldata[0] = abi.encodeWithSignature("test_BasicOrder_Create(bool)", true);
        // }
    }

    function setUp() public {
        // placeholder till registry unimplemented
        address registry = address(this);
        OrderFactory orderFactory = new OrderFactory(registry);
        
        MockWardenPrecompile wardenPrecompile = new MockWardenPrecompile();
        vm.etch(0x0000000000000000000000000000000000000900, address(wardenPrecompile).code);
        
        uint64 goodKeyId = 1;
        uint64 badKeyId = 2;
        wardenPrecompile.addKey(goodKeyId, true);
        wardenPrecompile.addKey(badKeyId, false);

        testData = TestData({
            orderFactory: orderFactory,
            wardenPrecompile: wardenPrecompile,
            thresholPrice: 2,
            goodKeyId: goodKeyId,
            badKeyId: badKeyId,
            scheduler: tx.origin
        });
    }

    function test_BasicOrder_Create(bool goodOrder, uint8 condition) public {
        if(condition > 1) {
            condition = 0;
        }

        address[] memory path;
        bytes[] memory analyzers;
        bytes memory encryptionKey; 
        uint64 keyId;
        if(goodOrder) {
            keyId = testData.goodKeyId;
        } else {
            keyId = testData.badKeyId;
        }
        Types.OrderData memory orderData = Types.OrderData({
            thresholdPrice: testData.thresholPrice,
            priceCondition: Types.PriceCondition(condition),
            swapData: Types.SwapData({
            amountIn: 1,
            path: path,
            to: RECEIVER,
            deadline: 0}),
            signRequestData: Types.SignRequestData({
                keyId: keyId,
                analyzers: analyzers,
                encryptionKey: encryptionKey,
                spaceNonce: 0,
                actionTimeoutHeight: 0,
                expectedApproveExpression: "",
                expectedRejectExpression: ""}),
            creatorDefinedTxFields: Types.CreatorDefinedTxFields({
                value: 0,
                chainId: 11155111,
                to: SEPOLIA_UNISWAP_V2_ROUTER})
        });

        CommonTypes.Coin[] memory maxKeychainFees;

        vm.expectEmit(true, true, false, false);

        emit OrderCreated(tx.origin, OrderType.Basic, address(this));

        address orderAddress = testData.orderFactory.createOrder(
            orderData,
            maxKeychainFees,
            testData.scheduler,
            OrderType.Basic
        );

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

    // TODO: after oracle integration
    // function test_basicOrderExecute() public {
    //     // move price to threshold
    //    order.execute(1, 1, 1, 1, 1);
    // }

    // function test_basicOrderRevertWhenUnauthorized() public {
    //    vm.expectRevert(Unauthorized.selector);
    //    vm.prank(address(0));
    //    order.execute(1, 1, 1, 1, 1);
    // }
}
