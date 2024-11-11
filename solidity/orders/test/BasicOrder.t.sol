pragma solidity >=0.8.25 <0.9.0;

import {Test} from "forge-std/src/Test.sol";
import {Types} from "../src/Types.sol";
import {OrderFactory, OrderType} from "../src/OrderFactory.sol";
import {MockWardenPrecompile} from "./mocks/MockWardenPrecompile.sol";
import {Types as CommonTypes} from "precompile-common/Types.sol";

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

    address private constant SEPOLIA_UNISWAP_V2_ROUTER =
        address(bytes20(bytes("0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3")));
    address private constant RECEIVER = address(bytes20(bytes("0x18517Cb2779186B86b1F8947dFdB6078C1B9C9db")));

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
            scheduler: address(this)
        });
    }

    function test_createBasicOrder() public {
        address[] memory path;

        bytes[] memory analyzers;
        bytes memory encryptionKey; 

        Types.OrderData memory orderData = Types.OrderData({
            thresholdPrice: testData.thresholPrice,
            swapData: Types.SwapData({
            amountIn: 1,
            path: path,
            to: RECEIVER,
            deadline: 0}),
            signRequestData: Types.SignRequestData({
                keyId: testData.goodKeyId,
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

        testData.orderFactory.createOrder(
            orderData,
            maxKeychainFees,
            testData.scheduler,
            OrderType.Basic
        );

        // todo: check event
    }
}
