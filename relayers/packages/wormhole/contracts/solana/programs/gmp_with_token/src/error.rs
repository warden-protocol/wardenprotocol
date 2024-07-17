use anchor_lang::prelude::error_code;

#[error_code]
pub enum GmpWithTokenError {
    #[msg("InvalidWormholeBridge")]
    /// Specified Wormhole bridge data PDA is wrong.
    InvalidWormholeBridge,

    #[msg("InvalidWormholeFeeCollector")]
    /// Specified Wormhole fee collector PDA is wrong.
    InvalidWormholeFeeCollector,

    #[msg("InvalidWormholeEmitter")]
    /// Specified program's emitter PDA is wrong.
    InvalidWormholeEmitter,

    #[msg("InvalidWormholeSequence")]
    /// Specified emitter's sequence PDA is wrong.
    InvalidWormholeSequence,

    #[msg("InvalidSysvar")]
    /// Specified sysvar is wrong.
    InvalidSysvar,

    #[msg("OwnerOnly")]
    /// Only the program's owner is permitted.
    OwnerOnly,

    #[msg("BumpNotFound")]
    /// Bump not found in `bumps` map.
    BumpNotFound,

    #[msg("InvalidForeignContract")]
    /// Specified foreign contract has a bad chain ID or zero address.
    InvalidForeignContract,

    #[msg("ZeroBridgeAmount")]
    /// Nothing to transfer if amount is zero.
    ZeroBridgeAmount,

    #[msg("InvalidTokenBridgeConfig")]
    /// Specified Token Bridge config PDA is wrong.
    InvalidTokenBridgeConfig,

    #[msg("InvalidTokenBridgeAuthoritySigner")]
    /// Specified Token Bridge authority signer PDA is wrong.
    InvalidTokenBridgeAuthoritySigner,

    #[msg("InvalidTokenBridgeCustodySigner")]
    /// Specified Token Bridge custody signer PDA is wrong.
    InvalidTokenBridgeCustodySigner,

    #[msg("InvalidTokenBridgeEmitter")]
    /// Specified Token Bridge emitter PDA is wrong.
    InvalidTokenBridgeEmitter,

    #[msg("InvalidTokenBridgeSequence")]
    /// Specified Token Bridge sequence PDA is wrong.
    InvalidTokenBridgeSequence,

    #[msg("InvalidTokenBridgeSender")]
    /// Specified Token Bridge sender PDA is wrong.
    InvalidTokenBridgeSender,

    #[msg("InvalidRecipient")]
    /// Specified recipient has a bad chain ID or zero address.
    InvalidRecipient,

    #[msg("InvalidTransferTokenAccount")]
    /// Deserialized token account from Token Bridge's Wormhole message does
    /// not match token account.
    InvalidTransferTokenAccount,

    #[msg("InvalidTransferTokenChain")]
    /// Deserialized token chain is invalid.
    InvalidTransferToChain,

    #[msg("InvalidTransferTokenChain")]
    /// Deserialized recipient chain is invalid.
    InvalidTransferTokenChain,

    #[msg("InvalidRelayerFee")]
    /// Specified relayer fee must be less than its precision.
    InvalidRelayerFee,

    #[msg("InvalidPayerAta")]
    /// To redeem transfers, the relayer (payer) must pass an associated token
    /// account.
    InvalidPayerAta,

    #[msg("InvalidTransferToAddress")]
    /// Deserialized recipient must be this program or the redeemer PDA.
    InvalidTransferToAddress,

    #[msg("AlreadyRedeemed")]
    /// Token Bridge program's transfer is already redeemed.
    AlreadyRedeemed,

    #[msg("InvalidTokenBridgeForeignEndpoint")]
    /// Token Bridge program's foreign endpoint disagrees with registered one.
    InvalidTokenBridgeForeignEndpoint,

    #[msg("NonExistentRelayerAta")]
    /// Relayer needs to create an associated token account before he can be
    /// paid.
    NonExistentRelayerAta,

    #[msg("InvalidTokenBridgeMintAuthority")]
    /// Specified Token Bridge mint authority PDA is wrong.
    InvalidTokenBridgeMintAuthority,
}
