// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

interface IAsyncCallback {
    function cb(uint64 id, bytes calldata output) external;
}