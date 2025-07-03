// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

library Types {
    enum TransactionType {
        Undefined,
        Swap,
        Transfer,
        Other
    }
}
