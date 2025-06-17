// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.8.25 <0.9.0;


import { TypeCasts } from "@hyperlane-xyz/contracts/libs/TypeCasts.sol";
import { Message } from "@hyperlane-xyz/contracts/libs/Message.sol";
import { StandardHookMetadata } from "@hyperlane-xyz/contracts/hooks/libs/StandardHookMetadata.sol";
import { IGasOracle } from "@hyperlane-xyz/contracts/interfaces/IGasOracle.sol";
import { IMessageDispatcher } from "@hyperlane-xyz/contracts/interfaces/hooks/IMessageDispatcher.sol";
import { AbstractMessageIdAuthHook } from "@hyperlane-xyz/contracts/hooks/libs/AbstractMessageIdAuthHook.sol";
import { InterchainGasPaymaster } from "@hyperlane-xyz/contracts/hooks/igp/InterchainGasPaymaster.sol";
import { AbstractMessageIdAuthorizedIsm } from "@hyperlane-xyz/contracts/isms/hook/AbstractMessageIdAuthorizedIsm.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { MessageDispatcher } from "./MessageDispatcher.sol";


/**
 * @title ERC5164PayableHook
 * @notice Modified version of Hyperlane's ERC5164Hook implementation:  
 * - Added a beneficiary address to receive the gas payment
 * Original implementation can be found at:
 * https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/hooks/aggregation/ERC5164Hook.sol
 * 
 * This contract is a message hook to inform the 5164 ISM of messages published through
 * any of the 5164 adapters.
 */
contract ERC5164PayableHook is OwnableUpgradeable, AbstractMessageIdAuthHook {
    using StandardHookMetadata for bytes;
    using Message for bytes;

    uint256 internal constant TOKEN_EXCHANGE_RATE_SCALE = 1e10;
    uint256 internal constant DEFAULT_GAS_USAGE = 50_000;

    IMessageDispatcher public immutable dispatcher;
    address public beneficiary;
    mapping(uint32 => InterchainGasPaymaster.DomainGasConfig) public destinationGasConfigs;


    event BeneficiarySet(address beneficiary);

    event GasPayment(
        bytes32 indexed messageId,
        uint32 indexed destinationDomain,
        uint256 gasAmount,
        uint256 payment
    );

    event DestinationGasConfigSet(
        uint32 remoteDomain,
        address gasOracle,
        uint96 gasOverhead
    );

    constructor(
        address _mailbox,
        uint32 _destinationDomain,
        bytes32 _ism
    ) AbstractMessageIdAuthHook(_mailbox, _destinationDomain, _ism) {
        dispatcher = new MessageDispatcher(_mailbox);
    }

    function initialize(
        address _owner,
        address _beneficiary
    ) public initializer {
        __Ownable_init();
        _transferOwnership(_owner);
        _setBeneficiary(_beneficiary);
    }

    function setBeneficiary(address _beneficiary) external onlyOwner {
        _setBeneficiary(_beneficiary);
    }

    function getExchangeRateAndGasPrice(
        uint32 _destinationDomain
    )
        public
        view
        returns (uint128 tokenExchangeRate, uint128 gasPrice)
    {
        IGasOracle _gasOracle = destinationGasConfigs[_destinationDomain]
            .gasOracle;

        if (address(_gasOracle) == address(0)) {
            revert(
                string.concat(
                    "ERC5164PayableHook doesn't support domain ",
                    Strings.toString(_destinationDomain)
                )
            );
        }
        return _gasOracle.getExchangeRateAndGasPrice(_destinationDomain);
    }

    function setDestinationGasConfigs(
        InterchainGasPaymaster.GasParam[] calldata _configs
    ) external onlyOwner {
        uint256 _len = _configs.length;
        for (uint256 i = 0; i < _len; i++) {
            _setDestinationGasConfig(
                _configs[i].remoteDomain,
                _configs[i].config.gasOracle,
                _configs[i].config.gasOverhead
            );
        }
    }

    function _setDestinationGasConfig(
        uint32 _remoteDomain,
        IGasOracle _gasOracle,
        uint96 _gasOverhead
    ) internal {
        destinationGasConfigs[_remoteDomain] = InterchainGasPaymaster.DomainGasConfig(
            _gasOracle,
            _gasOverhead
        );
        emit DestinationGasConfigSet(
            _remoteDomain,
            address(_gasOracle),
            _gasOverhead
        );
    }

    // ============ Internal Functions ============

    function _quoteDispatch(
        bytes calldata metadata,
        bytes calldata messageBody
    ) internal view override returns (uint256) {
        uint256 gasLimit = _gasLimit(metadata); 
        uint256 quote = gasLimit * tx.gasprice;
        uint256 destValueAsSource = destinationValueInLocalTokens(metadata.msgValue(0), messageBody.destination());
        return quote > destValueAsSource ? quote : destValueAsSource;
    }

    function _gasLimit(bytes calldata metadata) internal pure returns(uint256) {
        uint256 selfOverhead = 100000;
        uint256 gasLimit = metadata.gasLimit(DEFAULT_GAS_USAGE);
        return gasLimit + selfOverhead;
    }

    function _sendMessageId(
        bytes calldata metadata,
        bytes calldata message
    ) internal override {
        bytes32 _messageId = message.id();
        uint32 _destinationDomain = message.destination();

        uint256 quote = _quoteDispatch(metadata, message);

        require(msg.value >= quote, "ERC5164PayableHook: not enough to pay");

        uint256 destValueAsSource = destinationValueInLocalTokens(metadata.msgValue(0), _destinationDomain);

        require(msg.value >= destValueAsSource, "ERC5164PayableHook: not enough to pay on destination");
        require(destValueAsSource >= quote, "ERC5164PayableHook: not enough metadata.msgValue to pay");
        require(destValueAsSource != 0, "ERC5164PayableHook: metadata.msgValue can't be zero");
        (bool success, ) = beneficiary.call{value:destValueAsSource}("");
        require(
            success,
            "ERC5164PayableHook: gas payment failed.");

        // move msgValue and gasLimit into customMetadata?
        bytes memory payload = abi.encodeCall(
            AbstractMessageIdAuthorizedIsm.preVerifyMessage,
            (_messageId, metadata.msgValue(0))
        );

        dispatcher.dispatchMessage(
            _destinationDomain,
            TypeCasts.bytes32ToAddress(ism),
            payload
        );

        emit GasPayment(
            _messageId,
            _destinationDomain,
            _gasLimit(metadata),
            destValueAsSource
        );
    }

    function destinationValueInLocalTokens(
        uint256 destinationValue,
        uint32 _destinationDomain) public view returns (uint256 destValueAsSource) {
        (
            uint128 _tokenExchangeRate,
            uint128 _gasPrice
        ) = getExchangeRateAndGasPrice(_destinationDomain);
        
        destValueAsSource = 
            (destinationValue * _tokenExchangeRate) /
            TOKEN_EXCHANGE_RATE_SCALE;
    }

    function _setBeneficiary(address _beneficiary) internal {
        beneficiary = _beneficiary;
        emit BeneficiarySet(_beneficiary);
    }
}
