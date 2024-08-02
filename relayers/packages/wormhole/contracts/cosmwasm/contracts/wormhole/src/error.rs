use thiserror::Error;

#[derive(Error, Debug)]
pub enum ContractError {
    /// Invalid VAA version
    #[error("InvalidVersion")]
    InvalidVersion,

    /// Guardian set with this index does not exist
    #[error("InvalidGuardianSetIndex")]
    InvalidGuardianSetIndex,

    /// Guardian set expiration date is zero or in the past
    #[error("GuardianSetExpired")]
    GuardianSetExpired,

    /// Not enough signers on the VAA
    #[error("NoQuorum")]
    NoQuorum,

    /// Wrong guardian index order, order must be ascending
    #[error("WrongGuardianIndexOrder")]
    WrongGuardianIndexOrder,

    /// Some problem with signature decoding from bytes
    #[error("CannotDecodeSignature")]
    CannotDecodeSignature,

    /// Some problem with public key recovery from the signature
    #[error("CannotRecoverKey")]
    CannotRecoverKey,

    /// Recovered pubkey from signature does not match guardian address
    #[error("GuardianSignatureError")]
    GuardianSignatureError,

    /// VAA action code not recognized
    #[error("InvalidVAAAction")]
    InvalidVAAAction,

    /// VAA guardian set is not current
    #[error("NotCurrentGuardianSet")]
    NotCurrentGuardianSet,

    /// Only 128-bit amounts are supported
    #[error("AmountTooHigh")]
    AmountTooHigh,

    /// Amount should be higher than zero
    #[error("AmountTooLow")]
    AmountTooLow,

    /// Source and target chain ids must be different
    #[error("SameSourceAndTarget")]
    SameSourceAndTarget,

    /// Target chain id must be the same as the current CHAIN_ID
    #[error("WrongTargetChain")]
    WrongTargetChain,

    /// Wrapped asset init hook sent twice for the same asset id
    #[error("AssetAlreadyRegistered")]
    AssetAlreadyRegistered,

    /// Guardian set must increase in steps of 1
    #[error("GuardianSetIndexIncreaseError")]
    GuardianSetIndexIncreaseError,

    /// VAA was already executed
    #[error("VaaAlreadyExecuted")]
    VaaAlreadyExecuted,

    /// Message sender not permitted to execute this operation
    #[error("PermissionDenied")]
    PermissionDenied,

    /// Could not decode target address from canonical to human-readable form
    #[error("WrongTargetAddressFormat")]
    WrongTargetAddressFormat,

    /// More signatures than active guardians found
    #[error("TooManySignatures")]
    TooManySignatures,

    /// Wrapped asset not found in the registry
    #[error("AssetNotFound")]
    AssetNotFound,

    /// Generic error when there is a problem with VAA structure
    #[error("InvalidVAA")]
    InvalidVAA,

    /// Thrown when fee is enabled for the action, but was not sent with the transaction
    #[error("FeeTooLow")]
    FeeTooLow,

    /// Registering asset outside of the wormhole
    #[error("RegistrationForbidden")]
    RegistrationForbidden,
}
