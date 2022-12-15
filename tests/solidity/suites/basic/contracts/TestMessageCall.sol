pragma solidity 0.5.17;

contract Inner {
    event TestEvent(uint256);
    function test() public returns (uint256) {
        emit TestEvent(42);
        return 42;
    }
}

contract TestMessageCall {
    Inner _inner;
    constructor() public {
        _inner = new Inner();
    }

    // benchmarks
    function benchmarkMessageCall(uint iterations) public returns (uint256) {
        uint256 n = 0;
        for (uint i=0; i < iterations; i++) {
            n += _inner.test();
        }
        return n;
    }
}
