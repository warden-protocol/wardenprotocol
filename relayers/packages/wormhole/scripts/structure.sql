CREATE TABLE WormholeGmpRequests (
    Hash           NVARCHAR(250) NOT NULL,
    EmitterChain   INT           NOT NULL,
    EmitterAddress NVARCHAR(250) NOT NULL,
    Sequence       BIGINT        NOT NULL,
    Timestamp      BIGINT        NOT NULL,
    Status         NVARCHAR(50)  NOT NULL,
    Vaa            TEXT          NOT NULL,
    ErrorReason    TEXT          NULL,

    CONSTRAINT PK_WormholeGmpRequests_Hash PRIMARY KEY (Hash)
);
