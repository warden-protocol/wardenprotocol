import { Registry } from '@cosmjs/proto-signing';
import { IgniteClient } from "./client";
import { MissingWalletError } from "./helpers";
declare const Client: typeof IgniteClient & import("./helpers").Constructor<{
    CosmosBaseTendermintV1Beta1: {
        query: import("./cosmos.base.tendermint.v1beta1/rest").Api<unknown>;
        tx: {
            sendGetNodeInfoResponse({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetNodeInfoResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendVersionInfo({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").VersionInfo;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendABCIQueryRequest({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").ABCIQueryRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendValidator({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").Validator;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGetBlockByHeightResponse({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetBlockByHeightResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGetLatestBlockRequest({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetLatestBlockRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGetSyncingResponse({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetSyncingResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGetNodeInfoRequest({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetNodeInfoRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGetLatestValidatorSetRequest({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetLatestValidatorSetRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGetBlockByHeightRequest({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetBlockByHeightRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGetSyncingRequest({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetSyncingRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendProofOp({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").ProofOp;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendHeader({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").Header;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGetLatestValidatorSetResponse({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetLatestValidatorSetResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGetLatestBlockResponse({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetLatestBlockResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendModule({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").Module;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGetValidatorSetByHeightResponse({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetValidatorSetByHeightResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendABCIQueryResponse({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").ABCIQueryResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendBlock({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").Block;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendProofOps({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").ProofOps;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGetValidatorSetByHeightRequest({ value, fee, memo }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetValidatorSetByHeightRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            getNodeInfoResponse({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetNodeInfoResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            versionInfo({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").VersionInfo;
            }): import("@cosmjs/proto-signing").EncodeObject;
            abciqueryRequest({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").ABCIQueryRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            validator({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").Validator;
            }): import("@cosmjs/proto-signing").EncodeObject;
            getBlockByHeightResponse({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetBlockByHeightResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            getLatestBlockRequest({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetLatestBlockRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            getSyncingResponse({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetSyncingResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            getNodeInfoRequest({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetNodeInfoRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            getLatestValidatorSetRequest({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetLatestValidatorSetRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            getBlockByHeightRequest({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetBlockByHeightRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            getSyncingRequest({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetSyncingRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            proofOp({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").ProofOp;
            }): import("@cosmjs/proto-signing").EncodeObject;
            header({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").Header;
            }): import("@cosmjs/proto-signing").EncodeObject;
            getLatestValidatorSetResponse({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetLatestValidatorSetResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            getLatestBlockResponse({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetLatestBlockResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            module({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").Module;
            }): import("@cosmjs/proto-signing").EncodeObject;
            getValidatorSetByHeightResponse({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetValidatorSetByHeightResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            abciqueryResponse({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").ABCIQueryResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            block({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").Block;
            }): import("@cosmjs/proto-signing").EncodeObject;
            proofOps({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").ProofOps;
            }): import("@cosmjs/proto-signing").EncodeObject;
            getValidatorSetByHeightRequest({ value }: {
                value: import("./cosmos.base.tendermint.v1beta1/module").GetValidatorSetByHeightRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosBankV1Beta1: {
        query: import("./cosmos.bank.v1beta1/rest").Api<unknown>;
        tx: {
            sendMsgMultiSendResponse({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").MsgMultiSendResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParamsResponse({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").MsgUpdateParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendParams({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").Params;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryBalanceRequest({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QueryBalanceRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSend({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").MsgSend;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDenomOwnersResponse({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomOwnersResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDenomMetadataByQueryStringRequest({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomMetadataByQueryStringRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDenomOwnersByQueryResponse({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomOwnersByQueryResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgMultiSend({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").MsgMultiSend;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySpendableBalancesResponse({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QuerySpendableBalancesResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySpendableBalanceByDenomRequest({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QuerySpendableBalanceByDenomRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySendEnabledRequest({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QuerySendEnabledRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSetSendEnabled({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").MsgSetSendEnabled;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendOutput({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").Output;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDenomOwnersRequest({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomOwnersRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySupplyOfRequest({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QuerySupplyOfRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDenomsMetadataResponse({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomsMetadataResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParams({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").MsgUpdateParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSetSendEnabledResponse({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").MsgSetSendEnabledResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendSupply({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").Supply;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendSendAuthorization({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").SendAuthorization;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendSendEnabled({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").SendEnabled;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDenomUnit({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").DenomUnit;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryBalanceResponse({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QueryBalanceResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySpendableBalancesRequest({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QuerySpendableBalancesRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySpendableBalanceByDenomResponse({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QuerySpendableBalanceByDenomResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDenomMetadataResponse({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomMetadataResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDenomOwner({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").DenomOwner;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsRequest({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QueryParamsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDenomMetadataByQueryStringResponse({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomMetadataByQueryStringResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySupplyOfResponse({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QuerySupplyOfResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMetadata({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").Metadata;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSendResponse({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").MsgSendResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsResponse({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QueryParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySendEnabledResponse({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QuerySendEnabledResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDenomOwnersByQueryRequest({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomOwnersByQueryRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendInput({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").Input;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAllBalancesResponse({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QueryAllBalancesResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDenomsMetadataRequest({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomsMetadataRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDenomMetadataRequest({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomMetadataRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAllBalancesRequest({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QueryAllBalancesRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryTotalSupplyRequest({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QueryTotalSupplyRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryTotalSupplyResponse({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").QueryTotalSupplyResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendBalance({ value, fee, memo }: {
                value: import("./cosmos.bank.v1beta1/module").Balance;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            msgMultiSendResponse({ value }: {
                value: import("./cosmos.bank.v1beta1/module").MsgMultiSendResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParamsResponse({ value }: {
                value: import("./cosmos.bank.v1beta1/module").MsgUpdateParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            params({ value }: {
                value: import("./cosmos.bank.v1beta1/module").Params;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryBalanceRequest({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QueryBalanceRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSend({ value }: {
                value: import("./cosmos.bank.v1beta1/module").MsgSend;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDenomOwnersResponse({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomOwnersResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDenomMetadataByQueryStringRequest({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomMetadataByQueryStringRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDenomOwnersByQueryResponse({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomOwnersByQueryResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./cosmos.bank.v1beta1/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgMultiSend({ value }: {
                value: import("./cosmos.bank.v1beta1/module").MsgMultiSend;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySpendableBalancesResponse({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QuerySpendableBalancesResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySpendableBalanceByDenomRequest({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QuerySpendableBalanceByDenomRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySendEnabledRequest({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QuerySendEnabledRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSetSendEnabled({ value }: {
                value: import("./cosmos.bank.v1beta1/module").MsgSetSendEnabled;
            }): import("@cosmjs/proto-signing").EncodeObject;
            output({ value }: {
                value: import("./cosmos.bank.v1beta1/module").Output;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDenomOwnersRequest({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomOwnersRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySupplyOfRequest({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QuerySupplyOfRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDenomsMetadataResponse({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomsMetadataResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParams({ value }: {
                value: import("./cosmos.bank.v1beta1/module").MsgUpdateParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSetSendEnabledResponse({ value }: {
                value: import("./cosmos.bank.v1beta1/module").MsgSetSendEnabledResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            supply({ value }: {
                value: import("./cosmos.bank.v1beta1/module").Supply;
            }): import("@cosmjs/proto-signing").EncodeObject;
            sendAuthorization({ value }: {
                value: import("./cosmos.bank.v1beta1/module").SendAuthorization;
            }): import("@cosmjs/proto-signing").EncodeObject;
            sendEnabled({ value }: {
                value: import("./cosmos.bank.v1beta1/module").SendEnabled;
            }): import("@cosmjs/proto-signing").EncodeObject;
            denomUnit({ value }: {
                value: import("./cosmos.bank.v1beta1/module").DenomUnit;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryBalanceResponse({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QueryBalanceResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySpendableBalancesRequest({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QuerySpendableBalancesRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySpendableBalanceByDenomResponse({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QuerySpendableBalanceByDenomResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDenomMetadataResponse({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomMetadataResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            denomOwner({ value }: {
                value: import("./cosmos.bank.v1beta1/module").DenomOwner;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsRequest({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QueryParamsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDenomMetadataByQueryStringResponse({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomMetadataByQueryStringResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySupplyOfResponse({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QuerySupplyOfResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            metadata({ value }: {
                value: import("./cosmos.bank.v1beta1/module").Metadata;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSendResponse({ value }: {
                value: import("./cosmos.bank.v1beta1/module").MsgSendResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsResponse({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QueryParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySendEnabledResponse({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QuerySendEnabledResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDenomOwnersByQueryRequest({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomOwnersByQueryRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            input({ value }: {
                value: import("./cosmos.bank.v1beta1/module").Input;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAllBalancesResponse({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QueryAllBalancesResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDenomsMetadataRequest({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomsMetadataRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDenomMetadataRequest({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QueryDenomMetadataRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAllBalancesRequest({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QueryAllBalancesRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryTotalSupplyRequest({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QueryTotalSupplyRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryTotalSupplyResponse({ value }: {
                value: import("./cosmos.bank.v1beta1/module").QueryTotalSupplyResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            balance({ value }: {
                value: import("./cosmos.bank.v1beta1/module").Balance;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosStakingV1Beta1: {
        query: import("./cosmos.staking.v1beta1/rest").Api<unknown>;
        tx: {
            sendQueryDelegatorDelegationsRequest({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegatorDelegationsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendCommission({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").Commission;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgEditValidator({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").MsgEditValidator;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgDelegate({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").MsgDelegate;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDelegatorValidatorsResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegatorValidatorsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryValidatorUnbondingDelegationsResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryValidatorUnbondingDelegationsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDelegatorDelegationsResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegatorDelegationsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDVVTriplets({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").DVVTriplets;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendRedelegationEntryResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").RedelegationEntryResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendValidatorUpdates({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").ValidatorUpdates;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgDelegateResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").MsgDelegateResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParams({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").MsgUpdateParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryValidatorDelegationsResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryValidatorDelegationsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendStakeAuthorization({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").StakeAuthorization;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryPoolRequest({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryPoolRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendParams({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").Params;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendRedelegationResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").RedelegationResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendLastValidatorPower({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").LastValidatorPower;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDelegatorValidatorsRequest({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegatorValidatorsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryValidatorUnbondingDelegationsRequest({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryValidatorUnbondingDelegationsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryRedelegationsResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryRedelegationsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsRequest({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryParamsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendUnbondingDelegationEntry({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").UnbondingDelegationEntry;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUndelegateResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").MsgUndelegateResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryValidatorsRequest({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryValidatorsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendStakeAuthorization_Validators({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").StakeAuthorization_Validators;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDelegatorUnbondingDelegationsResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegatorUnbondingDelegationsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendValidator({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").Validator;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCancelUnbondingDelegation({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").MsgCancelUnbondingDelegation;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryValidatorResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryValidatorResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDescription({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").Description;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDVPairs({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").DVPairs;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryUnbondingDelegationRequest({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryUnbondingDelegationRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendRedelegation({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").Redelegation;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryValidatorDelegationsRequest({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryValidatorDelegationsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendHistoricalInfo({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").HistoricalInfo;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgBeginRedelegate({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").MsgBeginRedelegate;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUndelegate({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").MsgUndelegate;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDelegationResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegationResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendRedelegationEntry({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").RedelegationEntry;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryHistoricalInfoResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryHistoricalInfoResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDVPair({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").DVPair;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCreateValidatorResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").MsgCreateValidatorResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgBeginRedelegateResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").MsgBeginRedelegateResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCancelUnbondingDelegationResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").MsgCancelUnbondingDelegationResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryValidatorRequest({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryValidatorRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDelegationRequest({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegationRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDelegatorValidatorResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegatorValidatorResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryPoolResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryPoolResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendCommissionRates({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").CommissionRates;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryValidatorsResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryValidatorsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCreateValidator({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").MsgCreateValidator;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendPool({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").Pool;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgEditValidatorResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").MsgEditValidatorResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDelegatorUnbondingDelegationsRequest({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegatorUnbondingDelegationsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendUnbondingDelegation({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").UnbondingDelegation;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParamsResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").MsgUpdateParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryHistoricalInfoRequest({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryHistoricalInfoRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryRedelegationsRequest({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryRedelegationsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDelegatorValidatorRequest({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegatorValidatorRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendValAddresses({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").ValAddresses;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDVVTriplet({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").DVVTriplet;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryUnbondingDelegationResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").QueryUnbondingDelegationResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDelegation({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").Delegation;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDelegationResponse({ value, fee, memo }: {
                value: import("./cosmos.staking.v1beta1/module").DelegationResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            queryDelegatorDelegationsRequest({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegatorDelegationsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            commission({ value }: {
                value: import("./cosmos.staking.v1beta1/module").Commission;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgEditValidator({ value }: {
                value: import("./cosmos.staking.v1beta1/module").MsgEditValidator;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgDelegate({ value }: {
                value: import("./cosmos.staking.v1beta1/module").MsgDelegate;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDelegatorValidatorsResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegatorValidatorsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryValidatorUnbondingDelegationsResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryValidatorUnbondingDelegationsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDelegatorDelegationsResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegatorDelegationsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            dvvtriplets({ value }: {
                value: import("./cosmos.staking.v1beta1/module").DVVTriplets;
            }): import("@cosmjs/proto-signing").EncodeObject;
            redelegationEntryResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").RedelegationEntryResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            validatorUpdates({ value }: {
                value: import("./cosmos.staking.v1beta1/module").ValidatorUpdates;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgDelegateResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").MsgDelegateResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParams({ value }: {
                value: import("./cosmos.staking.v1beta1/module").MsgUpdateParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryValidatorDelegationsResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryValidatorDelegationsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            stakeAuthorization({ value }: {
                value: import("./cosmos.staking.v1beta1/module").StakeAuthorization;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryPoolRequest({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryPoolRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            params({ value }: {
                value: import("./cosmos.staking.v1beta1/module").Params;
            }): import("@cosmjs/proto-signing").EncodeObject;
            redelegationResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").RedelegationResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            lastValidatorPower({ value }: {
                value: import("./cosmos.staking.v1beta1/module").LastValidatorPower;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDelegatorValidatorsRequest({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegatorValidatorsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryValidatorUnbondingDelegationsRequest({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryValidatorUnbondingDelegationsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryRedelegationsResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryRedelegationsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsRequest({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryParamsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            unbondingDelegationEntry({ value }: {
                value: import("./cosmos.staking.v1beta1/module").UnbondingDelegationEntry;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUndelegateResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").MsgUndelegateResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryValidatorsRequest({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryValidatorsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            stakeAuthorizationValidators({ value }: {
                value: import("./cosmos.staking.v1beta1/module").StakeAuthorization_Validators;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDelegatorUnbondingDelegationsResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegatorUnbondingDelegationsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            validator({ value }: {
                value: import("./cosmos.staking.v1beta1/module").Validator;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCancelUnbondingDelegation({ value }: {
                value: import("./cosmos.staking.v1beta1/module").MsgCancelUnbondingDelegation;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryValidatorResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryValidatorResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            description({ value }: {
                value: import("./cosmos.staking.v1beta1/module").Description;
            }): import("@cosmjs/proto-signing").EncodeObject;
            dvpairs({ value }: {
                value: import("./cosmos.staking.v1beta1/module").DVPairs;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryUnbondingDelegationRequest({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryUnbondingDelegationRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            redelegation({ value }: {
                value: import("./cosmos.staking.v1beta1/module").Redelegation;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryValidatorDelegationsRequest({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryValidatorDelegationsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            historicalInfo({ value }: {
                value: import("./cosmos.staking.v1beta1/module").HistoricalInfo;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgBeginRedelegate({ value }: {
                value: import("./cosmos.staking.v1beta1/module").MsgBeginRedelegate;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUndelegate({ value }: {
                value: import("./cosmos.staking.v1beta1/module").MsgUndelegate;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDelegationResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegationResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            redelegationEntry({ value }: {
                value: import("./cosmos.staking.v1beta1/module").RedelegationEntry;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryHistoricalInfoResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryHistoricalInfoResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            dvpair({ value }: {
                value: import("./cosmos.staking.v1beta1/module").DVPair;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCreateValidatorResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").MsgCreateValidatorResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgBeginRedelegateResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").MsgBeginRedelegateResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCancelUnbondingDelegationResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").MsgCancelUnbondingDelegationResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryValidatorRequest({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryValidatorRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDelegationRequest({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegationRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDelegatorValidatorResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegatorValidatorResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryPoolResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryPoolResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            commissionRates({ value }: {
                value: import("./cosmos.staking.v1beta1/module").CommissionRates;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryValidatorsResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryValidatorsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCreateValidator({ value }: {
                value: import("./cosmos.staking.v1beta1/module").MsgCreateValidator;
            }): import("@cosmjs/proto-signing").EncodeObject;
            pool({ value }: {
                value: import("./cosmos.staking.v1beta1/module").Pool;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./cosmos.staking.v1beta1/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgEditValidatorResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").MsgEditValidatorResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDelegatorUnbondingDelegationsRequest({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegatorUnbondingDelegationsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            unbondingDelegation({ value }: {
                value: import("./cosmos.staking.v1beta1/module").UnbondingDelegation;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParamsResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").MsgUpdateParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryHistoricalInfoRequest({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryHistoricalInfoRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryRedelegationsRequest({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryRedelegationsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDelegatorValidatorRequest({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryDelegatorValidatorRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            valAddresses({ value }: {
                value: import("./cosmos.staking.v1beta1/module").ValAddresses;
            }): import("@cosmjs/proto-signing").EncodeObject;
            dvvtriplet({ value }: {
                value: import("./cosmos.staking.v1beta1/module").DVVTriplet;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryUnbondingDelegationResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").QueryUnbondingDelegationResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            delegation({ value }: {
                value: import("./cosmos.staking.v1beta1/module").Delegation;
            }): import("@cosmjs/proto-signing").EncodeObject;
            delegationResponse({ value }: {
                value: import("./cosmos.staking.v1beta1/module").DelegationResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosAuthV1Beta1: {
        query: import("./cosmos.auth.v1beta1/rest").Api<unknown>;
        tx: {
            sendMsgUpdateParams({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").MsgUpdateParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAccountInfoRequest({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").QueryAccountInfoRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAccountsResponse({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").QueryAccountsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryModuleAccountsResponse({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").QueryModuleAccountsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryModuleAccountByNameRequest({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").QueryModuleAccountByNameRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendAddressBytesToStringRequest({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").AddressBytesToStringRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendAddressStringToBytesResponse({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").AddressStringToBytesResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParamsResponse({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").MsgUpdateParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendParams({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").Params;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAccountsRequest({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").QueryAccountsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsResponse({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").QueryParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryModuleAccountByNameResponse({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").QueryModuleAccountByNameResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendAddressBytesToStringResponse({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").AddressBytesToStringResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendModuleCredential({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").ModuleCredential;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAccountResponse({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").QueryAccountResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryModuleAccountsRequest({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").QueryModuleAccountsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsRequest({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").QueryParamsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendBech32PrefixResponse({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").Bech32PrefixResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAccountRequest({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").QueryAccountRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendAddressStringToBytesRequest({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").AddressStringToBytesRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendBaseAccount({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").BaseAccount;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendModuleAccount({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").ModuleAccount;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAccountAddressByIDRequest({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").QueryAccountAddressByIDRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAccountAddressByIDResponse({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").QueryAccountAddressByIDResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAccountInfoResponse({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").QueryAccountInfoResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendBech32PrefixRequest({ value, fee, memo }: {
                value: import("./cosmos.auth.v1beta1/module").Bech32PrefixRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            msgUpdateParams({ value }: {
                value: import("./cosmos.auth.v1beta1/module").MsgUpdateParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAccountInfoRequest({ value }: {
                value: import("./cosmos.auth.v1beta1/module").QueryAccountInfoRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAccountsResponse({ value }: {
                value: import("./cosmos.auth.v1beta1/module").QueryAccountsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryModuleAccountsResponse({ value }: {
                value: import("./cosmos.auth.v1beta1/module").QueryModuleAccountsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryModuleAccountByNameRequest({ value }: {
                value: import("./cosmos.auth.v1beta1/module").QueryModuleAccountByNameRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            addressBytesToStringRequest({ value }: {
                value: import("./cosmos.auth.v1beta1/module").AddressBytesToStringRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            addressStringToBytesResponse({ value }: {
                value: import("./cosmos.auth.v1beta1/module").AddressStringToBytesResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParamsResponse({ value }: {
                value: import("./cosmos.auth.v1beta1/module").MsgUpdateParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            params({ value }: {
                value: import("./cosmos.auth.v1beta1/module").Params;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAccountsRequest({ value }: {
                value: import("./cosmos.auth.v1beta1/module").QueryAccountsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsResponse({ value }: {
                value: import("./cosmos.auth.v1beta1/module").QueryParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryModuleAccountByNameResponse({ value }: {
                value: import("./cosmos.auth.v1beta1/module").QueryModuleAccountByNameResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            addressBytesToStringResponse({ value }: {
                value: import("./cosmos.auth.v1beta1/module").AddressBytesToStringResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            moduleCredential({ value }: {
                value: import("./cosmos.auth.v1beta1/module").ModuleCredential;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAccountResponse({ value }: {
                value: import("./cosmos.auth.v1beta1/module").QueryAccountResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryModuleAccountsRequest({ value }: {
                value: import("./cosmos.auth.v1beta1/module").QueryModuleAccountsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./cosmos.auth.v1beta1/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsRequest({ value }: {
                value: import("./cosmos.auth.v1beta1/module").QueryParamsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            bech32PrefixResponse({ value }: {
                value: import("./cosmos.auth.v1beta1/module").Bech32PrefixResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAccountRequest({ value }: {
                value: import("./cosmos.auth.v1beta1/module").QueryAccountRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            addressStringToBytesRequest({ value }: {
                value: import("./cosmos.auth.v1beta1/module").AddressStringToBytesRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            baseAccount({ value }: {
                value: import("./cosmos.auth.v1beta1/module").BaseAccount;
            }): import("@cosmjs/proto-signing").EncodeObject;
            moduleAccount({ value }: {
                value: import("./cosmos.auth.v1beta1/module").ModuleAccount;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAccountAddressByIdrequest({ value }: {
                value: import("./cosmos.auth.v1beta1/module").QueryAccountAddressByIDRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAccountAddressByIdresponse({ value }: {
                value: import("./cosmos.auth.v1beta1/module").QueryAccountAddressByIDResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAccountInfoResponse({ value }: {
                value: import("./cosmos.auth.v1beta1/module").QueryAccountInfoResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            bech32PrefixRequest({ value }: {
                value: import("./cosmos.auth.v1beta1/module").Bech32PrefixRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosAuthzV1Beta1: {
        query: import("./cosmos.authz.v1beta1/rest").Api<unknown>;
        tx: {
            sendMsgExec({ value, fee, memo }: {
                value: import("./cosmos.authz.v1beta1/module").MsgExec;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGrant({ value, fee, memo }: {
                value: import("./cosmos.authz.v1beta1/module").Grant;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGranteeGrantsResponse({ value, fee, memo }: {
                value: import("./cosmos.authz.v1beta1/module").QueryGranteeGrantsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./cosmos.authz.v1beta1/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGrantAuthorization({ value, fee, memo }: {
                value: import("./cosmos.authz.v1beta1/module").GrantAuthorization;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgGrant({ value, fee, memo }: {
                value: import("./cosmos.authz.v1beta1/module").MsgGrant;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgRevokeResponse({ value, fee, memo }: {
                value: import("./cosmos.authz.v1beta1/module").MsgRevokeResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGrantQueueItem({ value, fee, memo }: {
                value: import("./cosmos.authz.v1beta1/module").GrantQueueItem;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendEventRevoke({ value, fee, memo }: {
                value: import("./cosmos.authz.v1beta1/module").EventRevoke;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGranterGrantsRequest({ value, fee, memo }: {
                value: import("./cosmos.authz.v1beta1/module").QueryGranterGrantsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenericAuthorization({ value, fee, memo }: {
                value: import("./cosmos.authz.v1beta1/module").GenericAuthorization;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgRevoke({ value, fee, memo }: {
                value: import("./cosmos.authz.v1beta1/module").MsgRevoke;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGrantsRequest({ value, fee, memo }: {
                value: import("./cosmos.authz.v1beta1/module").QueryGrantsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGranterGrantsResponse({ value, fee, memo }: {
                value: import("./cosmos.authz.v1beta1/module").QueryGranterGrantsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGranteeGrantsRequest({ value, fee, memo }: {
                value: import("./cosmos.authz.v1beta1/module").QueryGranteeGrantsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendEventGrant({ value, fee, memo }: {
                value: import("./cosmos.authz.v1beta1/module").EventGrant;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgGrantResponse({ value, fee, memo }: {
                value: import("./cosmos.authz.v1beta1/module").MsgGrantResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgExecResponse({ value, fee, memo }: {
                value: import("./cosmos.authz.v1beta1/module").MsgExecResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGrantsResponse({ value, fee, memo }: {
                value: import("./cosmos.authz.v1beta1/module").QueryGrantsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            msgExec({ value }: {
                value: import("./cosmos.authz.v1beta1/module").MsgExec;
            }): import("@cosmjs/proto-signing").EncodeObject;
            grant({ value }: {
                value: import("./cosmos.authz.v1beta1/module").Grant;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGranteeGrantsResponse({ value }: {
                value: import("./cosmos.authz.v1beta1/module").QueryGranteeGrantsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./cosmos.authz.v1beta1/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            grantAuthorization({ value }: {
                value: import("./cosmos.authz.v1beta1/module").GrantAuthorization;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgGrant({ value }: {
                value: import("./cosmos.authz.v1beta1/module").MsgGrant;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgRevokeResponse({ value }: {
                value: import("./cosmos.authz.v1beta1/module").MsgRevokeResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            grantQueueItem({ value }: {
                value: import("./cosmos.authz.v1beta1/module").GrantQueueItem;
            }): import("@cosmjs/proto-signing").EncodeObject;
            eventRevoke({ value }: {
                value: import("./cosmos.authz.v1beta1/module").EventRevoke;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGranterGrantsRequest({ value }: {
                value: import("./cosmos.authz.v1beta1/module").QueryGranterGrantsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genericAuthorization({ value }: {
                value: import("./cosmos.authz.v1beta1/module").GenericAuthorization;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgRevoke({ value }: {
                value: import("./cosmos.authz.v1beta1/module").MsgRevoke;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGrantsRequest({ value }: {
                value: import("./cosmos.authz.v1beta1/module").QueryGrantsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGranterGrantsResponse({ value }: {
                value: import("./cosmos.authz.v1beta1/module").QueryGranterGrantsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGranteeGrantsRequest({ value }: {
                value: import("./cosmos.authz.v1beta1/module").QueryGranteeGrantsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            eventGrant({ value }: {
                value: import("./cosmos.authz.v1beta1/module").EventGrant;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgGrantResponse({ value }: {
                value: import("./cosmos.authz.v1beta1/module").MsgGrantResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgExecResponse({ value }: {
                value: import("./cosmos.authz.v1beta1/module").MsgExecResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGrantsResponse({ value }: {
                value: import("./cosmos.authz.v1beta1/module").QueryGrantsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosBaseNodeV1Beta1: {
        query: import("./cosmos.base.node.v1beta1/rest").Api<unknown>;
        tx: {
            sendStatusRequest({ value, fee, memo }: {
                value: import("./cosmos.base.node.v1beta1/module").StatusRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendStatusResponse({ value, fee, memo }: {
                value: import("./cosmos.base.node.v1beta1/module").StatusResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendConfigRequest({ value, fee, memo }: {
                value: import("./cosmos.base.node.v1beta1/module").ConfigRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendConfigResponse({ value, fee, memo }: {
                value: import("./cosmos.base.node.v1beta1/module").ConfigResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            statusRequest({ value }: {
                value: import("./cosmos.base.node.v1beta1/module").StatusRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            statusResponse({ value }: {
                value: import("./cosmos.base.node.v1beta1/module").StatusResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            configRequest({ value }: {
                value: import("./cosmos.base.node.v1beta1/module").ConfigRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            configResponse({ value }: {
                value: import("./cosmos.base.node.v1beta1/module").ConfigResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosCircuitV1: {
        query: import("./cosmos.circuit.v1/rest").Api<unknown>;
        tx: {
            sendQueryAccountsRequest({ value, fee, memo }: {
                value: import("./cosmos.circuit.v1/module").QueryAccountsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDisabledListRequest({ value, fee, memo }: {
                value: import("./cosmos.circuit.v1/module").QueryDisabledListRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDisabledListResponse({ value, fee, memo }: {
                value: import("./cosmos.circuit.v1/module").DisabledListResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgAuthorizeCircuitBreakerResponse({ value, fee, memo }: {
                value: import("./cosmos.circuit.v1/module").MsgAuthorizeCircuitBreakerResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgTripCircuitBreaker({ value, fee, memo }: {
                value: import("./cosmos.circuit.v1/module").MsgTripCircuitBreaker;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgTripCircuitBreakerResponse({ value, fee, memo }: {
                value: import("./cosmos.circuit.v1/module").MsgTripCircuitBreakerResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgResetCircuitBreaker({ value, fee, memo }: {
                value: import("./cosmos.circuit.v1/module").MsgResetCircuitBreaker;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendPermissions({ value, fee, memo }: {
                value: import("./cosmos.circuit.v1/module").Permissions;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgResetCircuitBreakerResponse({ value, fee, memo }: {
                value: import("./cosmos.circuit.v1/module").MsgResetCircuitBreakerResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./cosmos.circuit.v1/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAccountRequest({ value, fee, memo }: {
                value: import("./cosmos.circuit.v1/module").QueryAccountRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgAuthorizeCircuitBreaker({ value, fee, memo }: {
                value: import("./cosmos.circuit.v1/module").MsgAuthorizeCircuitBreaker;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisAccountPermissions({ value, fee, memo }: {
                value: import("./cosmos.circuit.v1/module").GenesisAccountPermissions;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendAccountResponse({ value, fee, memo }: {
                value: import("./cosmos.circuit.v1/module").AccountResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendAccountsResponse({ value, fee, memo }: {
                value: import("./cosmos.circuit.v1/module").AccountsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            queryAccountsRequest({ value }: {
                value: import("./cosmos.circuit.v1/module").QueryAccountsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDisabledListRequest({ value }: {
                value: import("./cosmos.circuit.v1/module").QueryDisabledListRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            disabledListResponse({ value }: {
                value: import("./cosmos.circuit.v1/module").DisabledListResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgAuthorizeCircuitBreakerResponse({ value }: {
                value: import("./cosmos.circuit.v1/module").MsgAuthorizeCircuitBreakerResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgTripCircuitBreaker({ value }: {
                value: import("./cosmos.circuit.v1/module").MsgTripCircuitBreaker;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgTripCircuitBreakerResponse({ value }: {
                value: import("./cosmos.circuit.v1/module").MsgTripCircuitBreakerResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgResetCircuitBreaker({ value }: {
                value: import("./cosmos.circuit.v1/module").MsgResetCircuitBreaker;
            }): import("@cosmjs/proto-signing").EncodeObject;
            permissions({ value }: {
                value: import("./cosmos.circuit.v1/module").Permissions;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgResetCircuitBreakerResponse({ value }: {
                value: import("./cosmos.circuit.v1/module").MsgResetCircuitBreakerResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./cosmos.circuit.v1/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAccountRequest({ value }: {
                value: import("./cosmos.circuit.v1/module").QueryAccountRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgAuthorizeCircuitBreaker({ value }: {
                value: import("./cosmos.circuit.v1/module").MsgAuthorizeCircuitBreaker;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisAccountPermissions({ value }: {
                value: import("./cosmos.circuit.v1/module").GenesisAccountPermissions;
            }): import("@cosmjs/proto-signing").EncodeObject;
            accountResponse({ value }: {
                value: import("./cosmos.circuit.v1/module").AccountResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            accountsResponse({ value }: {
                value: import("./cosmos.circuit.v1/module").AccountsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosConsensusV1: {
        query: import("./cosmos.consensus.v1/rest").Api<unknown>;
        tx: {
            sendMsgUpdateParamsResponse({ value, fee, memo }: {
                value: import("./cosmos.consensus.v1/module").MsgUpdateParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParams({ value, fee, memo }: {
                value: import("./cosmos.consensus.v1/module").MsgUpdateParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsRequest({ value, fee, memo }: {
                value: import("./cosmos.consensus.v1/module").QueryParamsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsResponse({ value, fee, memo }: {
                value: import("./cosmos.consensus.v1/module").QueryParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            msgUpdateParamsResponse({ value }: {
                value: import("./cosmos.consensus.v1/module").MsgUpdateParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParams({ value }: {
                value: import("./cosmos.consensus.v1/module").MsgUpdateParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsRequest({ value }: {
                value: import("./cosmos.consensus.v1/module").QueryParamsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsResponse({ value }: {
                value: import("./cosmos.consensus.v1/module").QueryParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosCrisisV1Beta1: {
        query: import("./cosmos.crisis.v1beta1/rest").Api<unknown>;
        tx: {
            sendMsgUpdateParams({ value, fee, memo }: {
                value: import("./cosmos.crisis.v1beta1/module").MsgUpdateParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParamsResponse({ value, fee, memo }: {
                value: import("./cosmos.crisis.v1beta1/module").MsgUpdateParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./cosmos.crisis.v1beta1/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgVerifyInvariant({ value, fee, memo }: {
                value: import("./cosmos.crisis.v1beta1/module").MsgVerifyInvariant;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgVerifyInvariantResponse({ value, fee, memo }: {
                value: import("./cosmos.crisis.v1beta1/module").MsgVerifyInvariantResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            msgUpdateParams({ value }: {
                value: import("./cosmos.crisis.v1beta1/module").MsgUpdateParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParamsResponse({ value }: {
                value: import("./cosmos.crisis.v1beta1/module").MsgUpdateParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./cosmos.crisis.v1beta1/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgVerifyInvariant({ value }: {
                value: import("./cosmos.crisis.v1beta1/module").MsgVerifyInvariant;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgVerifyInvariantResponse({ value }: {
                value: import("./cosmos.crisis.v1beta1/module").MsgVerifyInvariantResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosDistributionV1Beta1: {
        query: import("./cosmos.distribution.v1beta1/rest").Api<unknown>;
        tx: {
            sendValidatorSlashEventRecord({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorSlashEventRecord;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgFundCommunityPool({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgFundCommunityPool;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDelegationTotalRewardsResponse({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryDelegationTotalRewardsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendCommunityPoolSpendProposalWithDeposit({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").CommunityPoolSpendProposalWithDeposit;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryValidatorOutstandingRewardsRequest({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryValidatorOutstandingRewardsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryValidatorSlashesRequest({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryValidatorSlashesRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDelegationRewardsResponse({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryDelegationRewardsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDelegatorValidatorsRequest({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryDelegatorValidatorsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDelegatorValidatorsResponse({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryDelegatorValidatorsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendCommunityPoolSpendProposal({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").CommunityPoolSpendProposal;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendValidatorHistoricalRewards({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorHistoricalRewards;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendFeePool({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").FeePool;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCommunityPoolSpend({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgCommunityPoolSpend;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgWithdrawValidatorCommissionResponse({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgWithdrawValidatorCommissionResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryValidatorDistributionInfoResponse({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryValidatorDistributionInfoResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDelegationRewardsRequest({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryDelegationRewardsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDelegatorStartingInfo({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").DelegatorStartingInfo;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendValidatorAccumulatedCommissionRecord({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorAccumulatedCommissionRecord;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCommunityPoolSpendResponse({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgCommunityPoolSpendResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgDepositValidatorRewardsPool({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgDepositValidatorRewardsPool;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgFundCommunityPoolResponse({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgFundCommunityPoolResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryValidatorCommissionRequest({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryValidatorCommissionRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDelegatorWithdrawAddressRequest({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryDelegatorWithdrawAddressRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDelegatorWithdrawAddressResponse({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryDelegatorWithdrawAddressResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendValidatorCurrentRewards({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorCurrentRewards;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendValidatorSlashEvent({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorSlashEvent;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendValidatorCurrentRewardsRecord({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorCurrentRewardsRecord;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSetWithdrawAddress({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgSetWithdrawAddress;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParams({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgUpdateParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsResponse({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgWithdrawValidatorCommission({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgWithdrawValidatorCommission;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryCommunityPoolResponse({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryCommunityPoolResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendValidatorHistoricalRewardsRecord({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorHistoricalRewardsRecord;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgWithdrawDelegatorRewardResponse({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgWithdrawDelegatorRewardResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendValidatorAccumulatedCommission({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorAccumulatedCommission;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSetWithdrawAddressResponse({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgSetWithdrawAddressResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendParams({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").Params;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendValidatorSlashEvents({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorSlashEvents;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendValidatorOutstandingRewardsRecord({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorOutstandingRewardsRecord;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryValidatorCommissionResponse({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryValidatorCommissionResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDelegatorWithdrawInfo({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").DelegatorWithdrawInfo;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParamsResponse({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgUpdateParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsRequest({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryParamsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryValidatorDistributionInfoRequest({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryValidatorDistributionInfoRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryValidatorOutstandingRewardsResponse({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryValidatorOutstandingRewardsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDelegationDelegatorReward({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").DelegationDelegatorReward;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDelegatorStartingInfoRecord({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").DelegatorStartingInfoRecord;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgWithdrawDelegatorReward({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgWithdrawDelegatorReward;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendValidatorOutstandingRewards({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorOutstandingRewards;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryValidatorSlashesResponse({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryValidatorSlashesResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDelegationTotalRewardsRequest({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryDelegationTotalRewardsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryCommunityPoolRequest({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryCommunityPoolRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgDepositValidatorRewardsPoolResponse({ value, fee, memo }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgDepositValidatorRewardsPoolResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            validatorSlashEventRecord({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorSlashEventRecord;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgFundCommunityPool({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgFundCommunityPool;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDelegationTotalRewardsResponse({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryDelegationTotalRewardsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            communityPoolSpendProposalWithDeposit({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").CommunityPoolSpendProposalWithDeposit;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryValidatorOutstandingRewardsRequest({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryValidatorOutstandingRewardsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryValidatorSlashesRequest({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryValidatorSlashesRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDelegationRewardsResponse({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryDelegationRewardsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDelegatorValidatorsRequest({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryDelegatorValidatorsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDelegatorValidatorsResponse({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryDelegatorValidatorsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            communityPoolSpendProposal({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").CommunityPoolSpendProposal;
            }): import("@cosmjs/proto-signing").EncodeObject;
            validatorHistoricalRewards({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorHistoricalRewards;
            }): import("@cosmjs/proto-signing").EncodeObject;
            feePool({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").FeePool;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCommunityPoolSpend({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgCommunityPoolSpend;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgWithdrawValidatorCommissionResponse({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgWithdrawValidatorCommissionResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryValidatorDistributionInfoResponse({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryValidatorDistributionInfoResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDelegationRewardsRequest({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryDelegationRewardsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            delegatorStartingInfo({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").DelegatorStartingInfo;
            }): import("@cosmjs/proto-signing").EncodeObject;
            validatorAccumulatedCommissionRecord({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorAccumulatedCommissionRecord;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCommunityPoolSpendResponse({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgCommunityPoolSpendResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgDepositValidatorRewardsPool({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgDepositValidatorRewardsPool;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgFundCommunityPoolResponse({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgFundCommunityPoolResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryValidatorCommissionRequest({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryValidatorCommissionRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDelegatorWithdrawAddressRequest({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryDelegatorWithdrawAddressRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDelegatorWithdrawAddressResponse({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryDelegatorWithdrawAddressResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            validatorCurrentRewards({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorCurrentRewards;
            }): import("@cosmjs/proto-signing").EncodeObject;
            validatorSlashEvent({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorSlashEvent;
            }): import("@cosmjs/proto-signing").EncodeObject;
            validatorCurrentRewardsRecord({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorCurrentRewardsRecord;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSetWithdrawAddress({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgSetWithdrawAddress;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParams({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgUpdateParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsResponse({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgWithdrawValidatorCommission({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgWithdrawValidatorCommission;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryCommunityPoolResponse({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryCommunityPoolResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            validatorHistoricalRewardsRecord({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorHistoricalRewardsRecord;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgWithdrawDelegatorRewardResponse({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgWithdrawDelegatorRewardResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            validatorAccumulatedCommission({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorAccumulatedCommission;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSetWithdrawAddressResponse({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgSetWithdrawAddressResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            params({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").Params;
            }): import("@cosmjs/proto-signing").EncodeObject;
            validatorSlashEvents({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorSlashEvents;
            }): import("@cosmjs/proto-signing").EncodeObject;
            validatorOutstandingRewardsRecord({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorOutstandingRewardsRecord;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryValidatorCommissionResponse({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryValidatorCommissionResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            delegatorWithdrawInfo({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").DelegatorWithdrawInfo;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParamsResponse({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgUpdateParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsRequest({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryParamsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryValidatorDistributionInfoRequest({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryValidatorDistributionInfoRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryValidatorOutstandingRewardsResponse({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryValidatorOutstandingRewardsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            delegationDelegatorReward({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").DelegationDelegatorReward;
            }): import("@cosmjs/proto-signing").EncodeObject;
            delegatorStartingInfoRecord({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").DelegatorStartingInfoRecord;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgWithdrawDelegatorReward({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgWithdrawDelegatorReward;
            }): import("@cosmjs/proto-signing").EncodeObject;
            validatorOutstandingRewards({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").ValidatorOutstandingRewards;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryValidatorSlashesResponse({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryValidatorSlashesResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDelegationTotalRewardsRequest({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryDelegationTotalRewardsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryCommunityPoolRequest({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").QueryCommunityPoolRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgDepositValidatorRewardsPoolResponse({ value }: {
                value: import("./cosmos.distribution.v1beta1/module").MsgDepositValidatorRewardsPoolResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosEvidenceV1Beta1: {
        query: import("./cosmos.evidence.v1beta1/rest").Api<unknown>;
        tx: {
            sendEquivocation({ value, fee, memo }: {
                value: import("./cosmos.evidence.v1beta1/module").Equivocation;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSubmitEvidence({ value, fee, memo }: {
                value: import("./cosmos.evidence.v1beta1/module").MsgSubmitEvidence;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSubmitEvidenceResponse({ value, fee, memo }: {
                value: import("./cosmos.evidence.v1beta1/module").MsgSubmitEvidenceResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAllEvidenceRequest({ value, fee, memo }: {
                value: import("./cosmos.evidence.v1beta1/module").QueryAllEvidenceRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./cosmos.evidence.v1beta1/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryEvidenceResponse({ value, fee, memo }: {
                value: import("./cosmos.evidence.v1beta1/module").QueryEvidenceResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAllEvidenceResponse({ value, fee, memo }: {
                value: import("./cosmos.evidence.v1beta1/module").QueryAllEvidenceResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryEvidenceRequest({ value, fee, memo }: {
                value: import("./cosmos.evidence.v1beta1/module").QueryEvidenceRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            equivocation({ value }: {
                value: import("./cosmos.evidence.v1beta1/module").Equivocation;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSubmitEvidence({ value }: {
                value: import("./cosmos.evidence.v1beta1/module").MsgSubmitEvidence;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSubmitEvidenceResponse({ value }: {
                value: import("./cosmos.evidence.v1beta1/module").MsgSubmitEvidenceResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAllEvidenceRequest({ value }: {
                value: import("./cosmos.evidence.v1beta1/module").QueryAllEvidenceRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./cosmos.evidence.v1beta1/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryEvidenceResponse({ value }: {
                value: import("./cosmos.evidence.v1beta1/module").QueryEvidenceResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAllEvidenceResponse({ value }: {
                value: import("./cosmos.evidence.v1beta1/module").QueryAllEvidenceResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryEvidenceRequest({ value }: {
                value: import("./cosmos.evidence.v1beta1/module").QueryEvidenceRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosFeegrantV1Beta1: {
        query: import("./cosmos.feegrant.v1beta1/rest").Api<unknown>;
        tx: {
            sendQueryAllowancesRequest({ value, fee, memo }: {
                value: import("./cosmos.feegrant.v1beta1/module").QueryAllowancesRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAllowancesByGranterResponse({ value, fee, memo }: {
                value: import("./cosmos.feegrant.v1beta1/module").QueryAllowancesByGranterResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgGrantAllowanceResponse({ value, fee, memo }: {
                value: import("./cosmos.feegrant.v1beta1/module").MsgGrantAllowanceResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgRevokeAllowance({ value, fee, memo }: {
                value: import("./cosmos.feegrant.v1beta1/module").MsgRevokeAllowance;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./cosmos.feegrant.v1beta1/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendPeriodicAllowance({ value, fee, memo }: {
                value: import("./cosmos.feegrant.v1beta1/module").PeriodicAllowance;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAllowanceRequest({ value, fee, memo }: {
                value: import("./cosmos.feegrant.v1beta1/module").QueryAllowanceRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAllowanceResponse({ value, fee, memo }: {
                value: import("./cosmos.feegrant.v1beta1/module").QueryAllowanceResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgRevokeAllowanceResponse({ value, fee, memo }: {
                value: import("./cosmos.feegrant.v1beta1/module").MsgRevokeAllowanceResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAllowancesResponse({ value, fee, memo }: {
                value: import("./cosmos.feegrant.v1beta1/module").QueryAllowancesResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAllowancesByGranterRequest({ value, fee, memo }: {
                value: import("./cosmos.feegrant.v1beta1/module").QueryAllowancesByGranterRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGrant({ value, fee, memo }: {
                value: import("./cosmos.feegrant.v1beta1/module").Grant;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendAllowedMsgAllowance({ value, fee, memo }: {
                value: import("./cosmos.feegrant.v1beta1/module").AllowedMsgAllowance;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgPruneAllowances({ value, fee, memo }: {
                value: import("./cosmos.feegrant.v1beta1/module").MsgPruneAllowances;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgPruneAllowancesResponse({ value, fee, memo }: {
                value: import("./cosmos.feegrant.v1beta1/module").MsgPruneAllowancesResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgGrantAllowance({ value, fee, memo }: {
                value: import("./cosmos.feegrant.v1beta1/module").MsgGrantAllowance;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendBasicAllowance({ value, fee, memo }: {
                value: import("./cosmos.feegrant.v1beta1/module").BasicAllowance;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            queryAllowancesRequest({ value }: {
                value: import("./cosmos.feegrant.v1beta1/module").QueryAllowancesRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAllowancesByGranterResponse({ value }: {
                value: import("./cosmos.feegrant.v1beta1/module").QueryAllowancesByGranterResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgGrantAllowanceResponse({ value }: {
                value: import("./cosmos.feegrant.v1beta1/module").MsgGrantAllowanceResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgRevokeAllowance({ value }: {
                value: import("./cosmos.feegrant.v1beta1/module").MsgRevokeAllowance;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./cosmos.feegrant.v1beta1/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            periodicAllowance({ value }: {
                value: import("./cosmos.feegrant.v1beta1/module").PeriodicAllowance;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAllowanceRequest({ value }: {
                value: import("./cosmos.feegrant.v1beta1/module").QueryAllowanceRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAllowanceResponse({ value }: {
                value: import("./cosmos.feegrant.v1beta1/module").QueryAllowanceResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgRevokeAllowanceResponse({ value }: {
                value: import("./cosmos.feegrant.v1beta1/module").MsgRevokeAllowanceResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAllowancesResponse({ value }: {
                value: import("./cosmos.feegrant.v1beta1/module").QueryAllowancesResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAllowancesByGranterRequest({ value }: {
                value: import("./cosmos.feegrant.v1beta1/module").QueryAllowancesByGranterRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            grant({ value }: {
                value: import("./cosmos.feegrant.v1beta1/module").Grant;
            }): import("@cosmjs/proto-signing").EncodeObject;
            allowedMsgAllowance({ value }: {
                value: import("./cosmos.feegrant.v1beta1/module").AllowedMsgAllowance;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgPruneAllowances({ value }: {
                value: import("./cosmos.feegrant.v1beta1/module").MsgPruneAllowances;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgPruneAllowancesResponse({ value }: {
                value: import("./cosmos.feegrant.v1beta1/module").MsgPruneAllowancesResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgGrantAllowance({ value }: {
                value: import("./cosmos.feegrant.v1beta1/module").MsgGrantAllowance;
            }): import("@cosmjs/proto-signing").EncodeObject;
            basicAllowance({ value }: {
                value: import("./cosmos.feegrant.v1beta1/module").BasicAllowance;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosGovV1: {
        query: import("./cosmos.gov.v1/rest").Api<unknown>;
        tx: {
            sendQueryParamsResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").QueryParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDeposit({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").Deposit;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSubmitProposal({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").MsgSubmitProposal;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgExecLegacyContentResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").MsgExecLegacyContentResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendVote({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").Vote;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgVoteWeighted({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").MsgVoteWeighted;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryVoteResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").QueryVoteResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsRequest({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").QueryParamsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParamsResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").MsgUpdateParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCancelProposalResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").MsgCancelProposalResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryProposalsRequest({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").QueryProposalsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDepositsRequest({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").QueryDepositsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDepositsResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").QueryDepositsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryTallyResultRequest({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").QueryTallyResultRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgExecLegacyContent({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").MsgExecLegacyContent;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgDeposit({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").MsgDeposit;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConstitutionResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").QueryConstitutionResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParams({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").MsgUpdateParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryProposalRequest({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").QueryProposalRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDepositRequest({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").QueryDepositRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgDepositResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").MsgDepositResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendProposal({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").Proposal;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDepositResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").QueryDepositResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendWeightedVoteOption({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").WeightedVoteOption;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTallyParams({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").TallyParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryProposalsResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").QueryProposalsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryVotesRequest({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").QueryVotesRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTallyResult({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").TallyResult;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryVotesResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").QueryVotesResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryVoteRequest({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").QueryVoteRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryTallyResultResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").QueryTallyResultResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDepositParams({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").DepositParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSubmitProposalResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").MsgSubmitProposalResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgVote({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").MsgVote;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgVoteResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").MsgVoteResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCancelProposal({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").MsgCancelProposal;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConstitutionRequest({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").QueryConstitutionRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryProposalResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").QueryProposalResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendParams({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").Params;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgVoteWeightedResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").MsgVoteWeightedResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendVotingParams({ value, fee, memo }: {
                value: import("./cosmos.gov.v1/module").VotingParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            queryParamsResponse({ value }: {
                value: import("./cosmos.gov.v1/module").QueryParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            deposit({ value }: {
                value: import("./cosmos.gov.v1/module").Deposit;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSubmitProposal({ value }: {
                value: import("./cosmos.gov.v1/module").MsgSubmitProposal;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgExecLegacyContentResponse({ value }: {
                value: import("./cosmos.gov.v1/module").MsgExecLegacyContentResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            vote({ value }: {
                value: import("./cosmos.gov.v1/module").Vote;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./cosmos.gov.v1/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgVoteWeighted({ value }: {
                value: import("./cosmos.gov.v1/module").MsgVoteWeighted;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryVoteResponse({ value }: {
                value: import("./cosmos.gov.v1/module").QueryVoteResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsRequest({ value }: {
                value: import("./cosmos.gov.v1/module").QueryParamsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParamsResponse({ value }: {
                value: import("./cosmos.gov.v1/module").MsgUpdateParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCancelProposalResponse({ value }: {
                value: import("./cosmos.gov.v1/module").MsgCancelProposalResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryProposalsRequest({ value }: {
                value: import("./cosmos.gov.v1/module").QueryProposalsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDepositsRequest({ value }: {
                value: import("./cosmos.gov.v1/module").QueryDepositsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDepositsResponse({ value }: {
                value: import("./cosmos.gov.v1/module").QueryDepositsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryTallyResultRequest({ value }: {
                value: import("./cosmos.gov.v1/module").QueryTallyResultRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgExecLegacyContent({ value }: {
                value: import("./cosmos.gov.v1/module").MsgExecLegacyContent;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgDeposit({ value }: {
                value: import("./cosmos.gov.v1/module").MsgDeposit;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConstitutionResponse({ value }: {
                value: import("./cosmos.gov.v1/module").QueryConstitutionResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParams({ value }: {
                value: import("./cosmos.gov.v1/module").MsgUpdateParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryProposalRequest({ value }: {
                value: import("./cosmos.gov.v1/module").QueryProposalRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDepositRequest({ value }: {
                value: import("./cosmos.gov.v1/module").QueryDepositRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgDepositResponse({ value }: {
                value: import("./cosmos.gov.v1/module").MsgDepositResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            proposal({ value }: {
                value: import("./cosmos.gov.v1/module").Proposal;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDepositResponse({ value }: {
                value: import("./cosmos.gov.v1/module").QueryDepositResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            weightedVoteOption({ value }: {
                value: import("./cosmos.gov.v1/module").WeightedVoteOption;
            }): import("@cosmjs/proto-signing").EncodeObject;
            tallyParams({ value }: {
                value: import("./cosmos.gov.v1/module").TallyParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryProposalsResponse({ value }: {
                value: import("./cosmos.gov.v1/module").QueryProposalsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryVotesRequest({ value }: {
                value: import("./cosmos.gov.v1/module").QueryVotesRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            tallyResult({ value }: {
                value: import("./cosmos.gov.v1/module").TallyResult;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryVotesResponse({ value }: {
                value: import("./cosmos.gov.v1/module").QueryVotesResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryVoteRequest({ value }: {
                value: import("./cosmos.gov.v1/module").QueryVoteRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryTallyResultResponse({ value }: {
                value: import("./cosmos.gov.v1/module").QueryTallyResultResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            depositParams({ value }: {
                value: import("./cosmos.gov.v1/module").DepositParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSubmitProposalResponse({ value }: {
                value: import("./cosmos.gov.v1/module").MsgSubmitProposalResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgVote({ value }: {
                value: import("./cosmos.gov.v1/module").MsgVote;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgVoteResponse({ value }: {
                value: import("./cosmos.gov.v1/module").MsgVoteResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCancelProposal({ value }: {
                value: import("./cosmos.gov.v1/module").MsgCancelProposal;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConstitutionRequest({ value }: {
                value: import("./cosmos.gov.v1/module").QueryConstitutionRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryProposalResponse({ value }: {
                value: import("./cosmos.gov.v1/module").QueryProposalResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            params({ value }: {
                value: import("./cosmos.gov.v1/module").Params;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgVoteWeightedResponse({ value }: {
                value: import("./cosmos.gov.v1/module").MsgVoteWeightedResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            votingParams({ value }: {
                value: import("./cosmos.gov.v1/module").VotingParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosGovV1Beta1: {
        query: import("./cosmos.gov.v1beta1/rest").Api<unknown>;
        tx: {
            sendMsgVote({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").MsgVote;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgVoteResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").MsgVoteResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryProposalRequest({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").QueryProposalRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryProposalsRequest({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").QueryProposalsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryProposalsResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").QueryProposalsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryVoteResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").QueryVoteResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTallyParams({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").TallyParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryVoteRequest({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").QueryVoteRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSubmitProposalResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").MsgSubmitProposalResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendWeightedVoteOption({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").WeightedVoteOption;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDepositsResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").QueryDepositsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgDepositResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").MsgDepositResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryTallyResultRequest({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").QueryTallyResultRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendVote({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").Vote;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTallyResult({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").TallyResult;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDepositParams({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").DepositParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsRequest({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").QueryParamsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").QueryParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDepositRequest({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").QueryDepositRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTextProposal({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").TextProposal;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDeposit({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").Deposit;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryVotesRequest({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").QueryVotesRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgDeposit({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").MsgDeposit;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgVoteWeightedResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").MsgVoteWeightedResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendProposal({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").Proposal;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendVotingParams({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").VotingParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSubmitProposal({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").MsgSubmitProposal;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgVoteWeighted({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").MsgVoteWeighted;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryProposalResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").QueryProposalResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryVotesResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").QueryVotesResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDepositResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").QueryDepositResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDepositsRequest({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").QueryDepositsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryTallyResultResponse({ value, fee, memo }: {
                value: import("./cosmos.gov.v1beta1/module").QueryTallyResultResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            msgVote({ value }: {
                value: import("./cosmos.gov.v1beta1/module").MsgVote;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgVoteResponse({ value }: {
                value: import("./cosmos.gov.v1beta1/module").MsgVoteResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryProposalRequest({ value }: {
                value: import("./cosmos.gov.v1beta1/module").QueryProposalRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryProposalsRequest({ value }: {
                value: import("./cosmos.gov.v1beta1/module").QueryProposalsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryProposalsResponse({ value }: {
                value: import("./cosmos.gov.v1beta1/module").QueryProposalsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryVoteResponse({ value }: {
                value: import("./cosmos.gov.v1beta1/module").QueryVoteResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            tallyParams({ value }: {
                value: import("./cosmos.gov.v1beta1/module").TallyParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryVoteRequest({ value }: {
                value: import("./cosmos.gov.v1beta1/module").QueryVoteRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSubmitProposalResponse({ value }: {
                value: import("./cosmos.gov.v1beta1/module").MsgSubmitProposalResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            weightedVoteOption({ value }: {
                value: import("./cosmos.gov.v1beta1/module").WeightedVoteOption;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./cosmos.gov.v1beta1/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDepositsResponse({ value }: {
                value: import("./cosmos.gov.v1beta1/module").QueryDepositsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgDepositResponse({ value }: {
                value: import("./cosmos.gov.v1beta1/module").MsgDepositResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryTallyResultRequest({ value }: {
                value: import("./cosmos.gov.v1beta1/module").QueryTallyResultRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            vote({ value }: {
                value: import("./cosmos.gov.v1beta1/module").Vote;
            }): import("@cosmjs/proto-signing").EncodeObject;
            tallyResult({ value }: {
                value: import("./cosmos.gov.v1beta1/module").TallyResult;
            }): import("@cosmjs/proto-signing").EncodeObject;
            depositParams({ value }: {
                value: import("./cosmos.gov.v1beta1/module").DepositParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsRequest({ value }: {
                value: import("./cosmos.gov.v1beta1/module").QueryParamsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsResponse({ value }: {
                value: import("./cosmos.gov.v1beta1/module").QueryParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDepositRequest({ value }: {
                value: import("./cosmos.gov.v1beta1/module").QueryDepositRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            textProposal({ value }: {
                value: import("./cosmos.gov.v1beta1/module").TextProposal;
            }): import("@cosmjs/proto-signing").EncodeObject;
            deposit({ value }: {
                value: import("./cosmos.gov.v1beta1/module").Deposit;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryVotesRequest({ value }: {
                value: import("./cosmos.gov.v1beta1/module").QueryVotesRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgDeposit({ value }: {
                value: import("./cosmos.gov.v1beta1/module").MsgDeposit;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgVoteWeightedResponse({ value }: {
                value: import("./cosmos.gov.v1beta1/module").MsgVoteWeightedResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            proposal({ value }: {
                value: import("./cosmos.gov.v1beta1/module").Proposal;
            }): import("@cosmjs/proto-signing").EncodeObject;
            votingParams({ value }: {
                value: import("./cosmos.gov.v1beta1/module").VotingParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSubmitProposal({ value }: {
                value: import("./cosmos.gov.v1beta1/module").MsgSubmitProposal;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgVoteWeighted({ value }: {
                value: import("./cosmos.gov.v1beta1/module").MsgVoteWeighted;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryProposalResponse({ value }: {
                value: import("./cosmos.gov.v1beta1/module").QueryProposalResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryVotesResponse({ value }: {
                value: import("./cosmos.gov.v1beta1/module").QueryVotesResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDepositResponse({ value }: {
                value: import("./cosmos.gov.v1beta1/module").QueryDepositResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDepositsRequest({ value }: {
                value: import("./cosmos.gov.v1beta1/module").QueryDepositsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryTallyResultResponse({ value }: {
                value: import("./cosmos.gov.v1beta1/module").QueryTallyResultResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosGroupV1: {
        query: import("./cosmos.group.v1/rest").Api<unknown>;
        tx: {
            sendGroupMember({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").GroupMember;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGroupPolicyInfoResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryGroupPolicyInfoResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGroupsByAdminResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryGroupsByAdminResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCreateGroupPolicyResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgCreateGroupPolicyResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgVote({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgVote;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCreateGroup({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgCreateGroup;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgWithdrawProposalResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgWithdrawProposalResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendEventSubmitProposal({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").EventSubmitProposal;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryProposalsByGroupPolicyResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryProposalsByGroupPolicyResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGroupsByMemberRequest({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryGroupsByMemberRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGroupsRequest({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryGroupsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateGroupPolicyMetadataResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupPolicyMetadataResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendEventWithdrawProposal({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").EventWithdrawProposal;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGroupInfoRequest({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryGroupInfoRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryProposalResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryProposalResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryTallyResultResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryTallyResultResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGroupsResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryGroupsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateGroupMembers({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupMembers;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCreateGroupWithPolicyResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgCreateGroupWithPolicyResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGroupInfoResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryGroupInfoResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGroupPolicyInfoRequest({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryGroupPolicyInfoRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGroupMembersRequest({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryGroupMembersRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryProposalsByGroupPolicyRequest({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryProposalsByGroupPolicyRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTallyResult({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").TallyResult;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendEventCreateGroupPolicy({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").EventCreateGroupPolicy;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryVotesByProposalResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryVotesByProposalResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryVotesByVoterRequest({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryVotesByVoterRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgLeaveGroup({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgLeaveGroup;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGroupPoliciesByAdminResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryGroupPoliciesByAdminResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSubmitProposal({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgSubmitProposal;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgExec({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgExec;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGroupInfo({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").GroupInfo;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDecisionPolicyWindows({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").DecisionPolicyWindows;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendEventExec({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").EventExec;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGroupPoliciesByGroupResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryGroupPoliciesByGroupResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryVotesByVoterResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryVotesByVoterResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateGroupPolicyAdminResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupPolicyAdminResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendPercentageDecisionPolicy({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").PercentageDecisionPolicy;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGroupsByAdminRequest({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryGroupsByAdminRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGroupsByMemberResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryGroupsByMemberResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryTallyResultRequest({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryTallyResultRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgExecResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgExecResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendThresholdDecisionPolicy({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").ThresholdDecisionPolicy;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendVote({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").Vote;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGroupMembersResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryGroupMembersResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryVoteByProposalVoterRequest({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryVoteByProposalVoterRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendProposal({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").Proposal;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateGroupMembersResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupMembersResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateGroupPolicyAdmin({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupPolicyAdmin;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateGroupPolicyMetadata({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupPolicyMetadata;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgLeaveGroupResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgLeaveGroupResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendEventCreateGroup({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").EventCreateGroup;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGroupPoliciesByGroupRequest({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryGroupPoliciesByGroupRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryGroupPoliciesByAdminRequest({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryGroupPoliciesByAdminRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryVotesByProposalRequest({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryVotesByProposalRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateGroupAdminResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupAdminResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMember({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").Member;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryProposalRequest({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryProposalRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateGroupMetadata({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupMetadata;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCreateGroupWithPolicy({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgCreateGroupWithPolicy;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCreateGroupResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgCreateGroupResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendEventVote({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").EventVote;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCreateGroupPolicy({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgCreateGroupPolicy;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateGroupPolicyDecisionPolicyResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupPolicyDecisionPolicyResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgVoteResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgVoteResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGroupPolicyInfo({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").GroupPolicyInfo;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMemberRequest({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MemberRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendEventUpdateGroupPolicy({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").EventUpdateGroupPolicy;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendEventProposalPruned({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").EventProposalPruned;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateGroupPolicyDecisionPolicy({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupPolicyDecisionPolicy;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryVoteByProposalVoterResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").QueryVoteByProposalVoterResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSubmitProposalResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgSubmitProposalResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgWithdrawProposal({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgWithdrawProposal;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendEventUpdateGroup({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").EventUpdateGroup;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendEventLeaveGroup({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").EventLeaveGroup;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateGroupAdmin({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupAdmin;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateGroupMetadataResponse({ value, fee, memo }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupMetadataResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            groupMember({ value }: {
                value: import("./cosmos.group.v1/module").GroupMember;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGroupPolicyInfoResponse({ value }: {
                value: import("./cosmos.group.v1/module").QueryGroupPolicyInfoResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGroupsByAdminResponse({ value }: {
                value: import("./cosmos.group.v1/module").QueryGroupsByAdminResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCreateGroupPolicyResponse({ value }: {
                value: import("./cosmos.group.v1/module").MsgCreateGroupPolicyResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgVote({ value }: {
                value: import("./cosmos.group.v1/module").MsgVote;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCreateGroup({ value }: {
                value: import("./cosmos.group.v1/module").MsgCreateGroup;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgWithdrawProposalResponse({ value }: {
                value: import("./cosmos.group.v1/module").MsgWithdrawProposalResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            eventSubmitProposal({ value }: {
                value: import("./cosmos.group.v1/module").EventSubmitProposal;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryProposalsByGroupPolicyResponse({ value }: {
                value: import("./cosmos.group.v1/module").QueryProposalsByGroupPolicyResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGroupsByMemberRequest({ value }: {
                value: import("./cosmos.group.v1/module").QueryGroupsByMemberRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGroupsRequest({ value }: {
                value: import("./cosmos.group.v1/module").QueryGroupsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateGroupPolicyMetadataResponse({ value }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupPolicyMetadataResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            eventWithdrawProposal({ value }: {
                value: import("./cosmos.group.v1/module").EventWithdrawProposal;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGroupInfoRequest({ value }: {
                value: import("./cosmos.group.v1/module").QueryGroupInfoRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryProposalResponse({ value }: {
                value: import("./cosmos.group.v1/module").QueryProposalResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryTallyResultResponse({ value }: {
                value: import("./cosmos.group.v1/module").QueryTallyResultResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGroupsResponse({ value }: {
                value: import("./cosmos.group.v1/module").QueryGroupsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateGroupMembers({ value }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupMembers;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCreateGroupWithPolicyResponse({ value }: {
                value: import("./cosmos.group.v1/module").MsgCreateGroupWithPolicyResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGroupInfoResponse({ value }: {
                value: import("./cosmos.group.v1/module").QueryGroupInfoResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGroupPolicyInfoRequest({ value }: {
                value: import("./cosmos.group.v1/module").QueryGroupPolicyInfoRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGroupMembersRequest({ value }: {
                value: import("./cosmos.group.v1/module").QueryGroupMembersRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryProposalsByGroupPolicyRequest({ value }: {
                value: import("./cosmos.group.v1/module").QueryProposalsByGroupPolicyRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            tallyResult({ value }: {
                value: import("./cosmos.group.v1/module").TallyResult;
            }): import("@cosmjs/proto-signing").EncodeObject;
            eventCreateGroupPolicy({ value }: {
                value: import("./cosmos.group.v1/module").EventCreateGroupPolicy;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryVotesByProposalResponse({ value }: {
                value: import("./cosmos.group.v1/module").QueryVotesByProposalResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryVotesByVoterRequest({ value }: {
                value: import("./cosmos.group.v1/module").QueryVotesByVoterRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgLeaveGroup({ value }: {
                value: import("./cosmos.group.v1/module").MsgLeaveGroup;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGroupPoliciesByAdminResponse({ value }: {
                value: import("./cosmos.group.v1/module").QueryGroupPoliciesByAdminResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSubmitProposal({ value }: {
                value: import("./cosmos.group.v1/module").MsgSubmitProposal;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgExec({ value }: {
                value: import("./cosmos.group.v1/module").MsgExec;
            }): import("@cosmjs/proto-signing").EncodeObject;
            groupInfo({ value }: {
                value: import("./cosmos.group.v1/module").GroupInfo;
            }): import("@cosmjs/proto-signing").EncodeObject;
            decisionPolicyWindows({ value }: {
                value: import("./cosmos.group.v1/module").DecisionPolicyWindows;
            }): import("@cosmjs/proto-signing").EncodeObject;
            eventExec({ value }: {
                value: import("./cosmos.group.v1/module").EventExec;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGroupPoliciesByGroupResponse({ value }: {
                value: import("./cosmos.group.v1/module").QueryGroupPoliciesByGroupResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryVotesByVoterResponse({ value }: {
                value: import("./cosmos.group.v1/module").QueryVotesByVoterResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateGroupPolicyAdminResponse({ value }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupPolicyAdminResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            percentageDecisionPolicy({ value }: {
                value: import("./cosmos.group.v1/module").PercentageDecisionPolicy;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGroupsByAdminRequest({ value }: {
                value: import("./cosmos.group.v1/module").QueryGroupsByAdminRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGroupsByMemberResponse({ value }: {
                value: import("./cosmos.group.v1/module").QueryGroupsByMemberResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryTallyResultRequest({ value }: {
                value: import("./cosmos.group.v1/module").QueryTallyResultRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgExecResponse({ value }: {
                value: import("./cosmos.group.v1/module").MsgExecResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            thresholdDecisionPolicy({ value }: {
                value: import("./cosmos.group.v1/module").ThresholdDecisionPolicy;
            }): import("@cosmjs/proto-signing").EncodeObject;
            vote({ value }: {
                value: import("./cosmos.group.v1/module").Vote;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGroupMembersResponse({ value }: {
                value: import("./cosmos.group.v1/module").QueryGroupMembersResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryVoteByProposalVoterRequest({ value }: {
                value: import("./cosmos.group.v1/module").QueryVoteByProposalVoterRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            proposal({ value }: {
                value: import("./cosmos.group.v1/module").Proposal;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateGroupMembersResponse({ value }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupMembersResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateGroupPolicyAdmin({ value }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupPolicyAdmin;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateGroupPolicyMetadata({ value }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupPolicyMetadata;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgLeaveGroupResponse({ value }: {
                value: import("./cosmos.group.v1/module").MsgLeaveGroupResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            eventCreateGroup({ value }: {
                value: import("./cosmos.group.v1/module").EventCreateGroup;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGroupPoliciesByGroupRequest({ value }: {
                value: import("./cosmos.group.v1/module").QueryGroupPoliciesByGroupRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryGroupPoliciesByAdminRequest({ value }: {
                value: import("./cosmos.group.v1/module").QueryGroupPoliciesByAdminRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryVotesByProposalRequest({ value }: {
                value: import("./cosmos.group.v1/module").QueryVotesByProposalRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateGroupAdminResponse({ value }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupAdminResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            member({ value }: {
                value: import("./cosmos.group.v1/module").Member;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryProposalRequest({ value }: {
                value: import("./cosmos.group.v1/module").QueryProposalRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateGroupMetadata({ value }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupMetadata;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCreateGroupWithPolicy({ value }: {
                value: import("./cosmos.group.v1/module").MsgCreateGroupWithPolicy;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCreateGroupResponse({ value }: {
                value: import("./cosmos.group.v1/module").MsgCreateGroupResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            eventVote({ value }: {
                value: import("./cosmos.group.v1/module").EventVote;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCreateGroupPolicy({ value }: {
                value: import("./cosmos.group.v1/module").MsgCreateGroupPolicy;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateGroupPolicyDecisionPolicyResponse({ value }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupPolicyDecisionPolicyResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgVoteResponse({ value }: {
                value: import("./cosmos.group.v1/module").MsgVoteResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            groupPolicyInfo({ value }: {
                value: import("./cosmos.group.v1/module").GroupPolicyInfo;
            }): import("@cosmjs/proto-signing").EncodeObject;
            memberRequest({ value }: {
                value: import("./cosmos.group.v1/module").MemberRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            eventUpdateGroupPolicy({ value }: {
                value: import("./cosmos.group.v1/module").EventUpdateGroupPolicy;
            }): import("@cosmjs/proto-signing").EncodeObject;
            eventProposalPruned({ value }: {
                value: import("./cosmos.group.v1/module").EventProposalPruned;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./cosmos.group.v1/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateGroupPolicyDecisionPolicy({ value }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupPolicyDecisionPolicy;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryVoteByProposalVoterResponse({ value }: {
                value: import("./cosmos.group.v1/module").QueryVoteByProposalVoterResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSubmitProposalResponse({ value }: {
                value: import("./cosmos.group.v1/module").MsgSubmitProposalResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgWithdrawProposal({ value }: {
                value: import("./cosmos.group.v1/module").MsgWithdrawProposal;
            }): import("@cosmjs/proto-signing").EncodeObject;
            eventUpdateGroup({ value }: {
                value: import("./cosmos.group.v1/module").EventUpdateGroup;
            }): import("@cosmjs/proto-signing").EncodeObject;
            eventLeaveGroup({ value }: {
                value: import("./cosmos.group.v1/module").EventLeaveGroup;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateGroupAdmin({ value }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupAdmin;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateGroupMetadataResponse({ value }: {
                value: import("./cosmos.group.v1/module").MsgUpdateGroupMetadataResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosMintV1Beta1: {
        query: import("./cosmos.mint.v1beta1/rest").Api<unknown>;
        tx: {
            sendQueryInflationRequest({ value, fee, memo }: {
                value: import("./cosmos.mint.v1beta1/module").QueryInflationRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAnnualProvisionsRequest({ value, fee, memo }: {
                value: import("./cosmos.mint.v1beta1/module").QueryAnnualProvisionsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAnnualProvisionsResponse({ value, fee, memo }: {
                value: import("./cosmos.mint.v1beta1/module").QueryAnnualProvisionsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./cosmos.mint.v1beta1/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParams({ value, fee, memo }: {
                value: import("./cosmos.mint.v1beta1/module").MsgUpdateParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsResponse({ value, fee, memo }: {
                value: import("./cosmos.mint.v1beta1/module").QueryParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMinter({ value, fee, memo }: {
                value: import("./cosmos.mint.v1beta1/module").Minter;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendParams({ value, fee, memo }: {
                value: import("./cosmos.mint.v1beta1/module").Params;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsRequest({ value, fee, memo }: {
                value: import("./cosmos.mint.v1beta1/module").QueryParamsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryInflationResponse({ value, fee, memo }: {
                value: import("./cosmos.mint.v1beta1/module").QueryInflationResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParamsResponse({ value, fee, memo }: {
                value: import("./cosmos.mint.v1beta1/module").MsgUpdateParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            queryInflationRequest({ value }: {
                value: import("./cosmos.mint.v1beta1/module").QueryInflationRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAnnualProvisionsRequest({ value }: {
                value: import("./cosmos.mint.v1beta1/module").QueryAnnualProvisionsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAnnualProvisionsResponse({ value }: {
                value: import("./cosmos.mint.v1beta1/module").QueryAnnualProvisionsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./cosmos.mint.v1beta1/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParams({ value }: {
                value: import("./cosmos.mint.v1beta1/module").MsgUpdateParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsResponse({ value }: {
                value: import("./cosmos.mint.v1beta1/module").QueryParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            minter({ value }: {
                value: import("./cosmos.mint.v1beta1/module").Minter;
            }): import("@cosmjs/proto-signing").EncodeObject;
            params({ value }: {
                value: import("./cosmos.mint.v1beta1/module").Params;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsRequest({ value }: {
                value: import("./cosmos.mint.v1beta1/module").QueryParamsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryInflationResponse({ value }: {
                value: import("./cosmos.mint.v1beta1/module").QueryInflationResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParamsResponse({ value }: {
                value: import("./cosmos.mint.v1beta1/module").MsgUpdateParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosParamsV1Beta1: {
        query: import("./cosmos.params.v1beta1/rest").Api<unknown>;
        tx: {
            sendQueryParamsRequest({ value, fee, memo }: {
                value: import("./cosmos.params.v1beta1/module").QueryParamsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySubspacesRequest({ value, fee, memo }: {
                value: import("./cosmos.params.v1beta1/module").QuerySubspacesRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendParamChange({ value, fee, memo }: {
                value: import("./cosmos.params.v1beta1/module").ParamChange;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsResponse({ value, fee, memo }: {
                value: import("./cosmos.params.v1beta1/module").QueryParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySubspacesResponse({ value, fee, memo }: {
                value: import("./cosmos.params.v1beta1/module").QuerySubspacesResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendSubspace({ value, fee, memo }: {
                value: import("./cosmos.params.v1beta1/module").Subspace;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendParameterChangeProposal({ value, fee, memo }: {
                value: import("./cosmos.params.v1beta1/module").ParameterChangeProposal;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            queryParamsRequest({ value }: {
                value: import("./cosmos.params.v1beta1/module").QueryParamsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySubspacesRequest({ value }: {
                value: import("./cosmos.params.v1beta1/module").QuerySubspacesRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            paramChange({ value }: {
                value: import("./cosmos.params.v1beta1/module").ParamChange;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsResponse({ value }: {
                value: import("./cosmos.params.v1beta1/module").QueryParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySubspacesResponse({ value }: {
                value: import("./cosmos.params.v1beta1/module").QuerySubspacesResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            subspace({ value }: {
                value: import("./cosmos.params.v1beta1/module").Subspace;
            }): import("@cosmjs/proto-signing").EncodeObject;
            parameterChangeProposal({ value }: {
                value: import("./cosmos.params.v1beta1/module").ParameterChangeProposal;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosSlashingV1Beta1: {
        query: import("./cosmos.slashing.v1beta1/rest").Api<unknown>;
        tx: {
            sendMsgUpdateParams({ value, fee, memo }: {
                value: import("./cosmos.slashing.v1beta1/module").MsgUpdateParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendValidatorMissedBlocks({ value, fee, memo }: {
                value: import("./cosmos.slashing.v1beta1/module").ValidatorMissedBlocks;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySigningInfosResponse({ value, fee, memo }: {
                value: import("./cosmos.slashing.v1beta1/module").QuerySigningInfosResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendParams({ value, fee, memo }: {
                value: import("./cosmos.slashing.v1beta1/module").Params;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./cosmos.slashing.v1beta1/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySigningInfoResponse({ value, fee, memo }: {
                value: import("./cosmos.slashing.v1beta1/module").QuerySigningInfoResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySigningInfosRequest({ value, fee, memo }: {
                value: import("./cosmos.slashing.v1beta1/module").QuerySigningInfosRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUnjailResponse({ value, fee, memo }: {
                value: import("./cosmos.slashing.v1beta1/module").MsgUnjailResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMissedBlock({ value, fee, memo }: {
                value: import("./cosmos.slashing.v1beta1/module").MissedBlock;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsRequest({ value, fee, memo }: {
                value: import("./cosmos.slashing.v1beta1/module").QueryParamsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsResponse({ value, fee, memo }: {
                value: import("./cosmos.slashing.v1beta1/module").QueryParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendValidatorSigningInfo({ value, fee, memo }: {
                value: import("./cosmos.slashing.v1beta1/module").ValidatorSigningInfo;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParamsResponse({ value, fee, memo }: {
                value: import("./cosmos.slashing.v1beta1/module").MsgUpdateParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendSigningInfo({ value, fee, memo }: {
                value: import("./cosmos.slashing.v1beta1/module").SigningInfo;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySigningInfoRequest({ value, fee, memo }: {
                value: import("./cosmos.slashing.v1beta1/module").QuerySigningInfoRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUnjail({ value, fee, memo }: {
                value: import("./cosmos.slashing.v1beta1/module").MsgUnjail;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            msgUpdateParams({ value }: {
                value: import("./cosmos.slashing.v1beta1/module").MsgUpdateParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            validatorMissedBlocks({ value }: {
                value: import("./cosmos.slashing.v1beta1/module").ValidatorMissedBlocks;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySigningInfosResponse({ value }: {
                value: import("./cosmos.slashing.v1beta1/module").QuerySigningInfosResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            params({ value }: {
                value: import("./cosmos.slashing.v1beta1/module").Params;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./cosmos.slashing.v1beta1/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySigningInfoResponse({ value }: {
                value: import("./cosmos.slashing.v1beta1/module").QuerySigningInfoResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySigningInfosRequest({ value }: {
                value: import("./cosmos.slashing.v1beta1/module").QuerySigningInfosRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUnjailResponse({ value }: {
                value: import("./cosmos.slashing.v1beta1/module").MsgUnjailResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            missedBlock({ value }: {
                value: import("./cosmos.slashing.v1beta1/module").MissedBlock;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsRequest({ value }: {
                value: import("./cosmos.slashing.v1beta1/module").QueryParamsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsResponse({ value }: {
                value: import("./cosmos.slashing.v1beta1/module").QueryParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            validatorSigningInfo({ value }: {
                value: import("./cosmos.slashing.v1beta1/module").ValidatorSigningInfo;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParamsResponse({ value }: {
                value: import("./cosmos.slashing.v1beta1/module").MsgUpdateParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            signingInfo({ value }: {
                value: import("./cosmos.slashing.v1beta1/module").SigningInfo;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySigningInfoRequest({ value }: {
                value: import("./cosmos.slashing.v1beta1/module").QuerySigningInfoRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUnjail({ value }: {
                value: import("./cosmos.slashing.v1beta1/module").MsgUnjail;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosTxV1Beta1: {
        query: import("./cosmos.tx.v1beta1/rest").Api<unknown>;
        tx: {
            sendSimulateResponse({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").SimulateResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendSignDocDirectAux({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").SignDocDirectAux;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendBroadcastTxResponse({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").BroadcastTxResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTxDecodeResponse({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").TxDecodeResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTxEncodeAminoResponse({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").TxEncodeAminoResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendSignerInfo({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").SignerInfo;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendSimulateRequest({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").SimulateRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTxDecodeAminoRequest({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").TxDecodeAminoRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendAuxSignerData({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").AuxSignerData;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGetBlockWithTxsResponse({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").GetBlockWithTxsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTxEncodeResponse({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").TxEncodeResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendSignDoc({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").SignDoc;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendFee({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").Fee;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGetTxRequest({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").GetTxRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGetBlockWithTxsRequest({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").GetBlockWithTxsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTxDecodeAminoResponse({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").TxDecodeAminoResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTxRaw({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").TxRaw;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendModeInfo({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").ModeInfo;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendModeInfo_Single({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").ModeInfo_Single;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTxDecodeRequest({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").TxDecodeRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendAuthInfo({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").AuthInfo;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTip({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").Tip;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGetTxsEventRequest({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").GetTxsEventRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendBroadcastTxRequest({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").BroadcastTxRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTxEncodeAminoRequest({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").TxEncodeAminoRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTx({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").Tx;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTxBody({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").TxBody;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGetTxsEventResponse({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").GetTxsEventResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGetTxResponse({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").GetTxResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTxEncodeRequest({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").TxEncodeRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendModeInfo_Multi({ value, fee, memo }: {
                value: import("./cosmos.tx.v1beta1/module").ModeInfo_Multi;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            simulateResponse({ value }: {
                value: import("./cosmos.tx.v1beta1/module").SimulateResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            signDocDirectAux({ value }: {
                value: import("./cosmos.tx.v1beta1/module").SignDocDirectAux;
            }): import("@cosmjs/proto-signing").EncodeObject;
            broadcastTxResponse({ value }: {
                value: import("./cosmos.tx.v1beta1/module").BroadcastTxResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            txDecodeResponse({ value }: {
                value: import("./cosmos.tx.v1beta1/module").TxDecodeResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            txEncodeAminoResponse({ value }: {
                value: import("./cosmos.tx.v1beta1/module").TxEncodeAminoResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            signerInfo({ value }: {
                value: import("./cosmos.tx.v1beta1/module").SignerInfo;
            }): import("@cosmjs/proto-signing").EncodeObject;
            simulateRequest({ value }: {
                value: import("./cosmos.tx.v1beta1/module").SimulateRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            txDecodeAminoRequest({ value }: {
                value: import("./cosmos.tx.v1beta1/module").TxDecodeAminoRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            auxSignerData({ value }: {
                value: import("./cosmos.tx.v1beta1/module").AuxSignerData;
            }): import("@cosmjs/proto-signing").EncodeObject;
            getBlockWithTxsResponse({ value }: {
                value: import("./cosmos.tx.v1beta1/module").GetBlockWithTxsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            txEncodeResponse({ value }: {
                value: import("./cosmos.tx.v1beta1/module").TxEncodeResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            signDoc({ value }: {
                value: import("./cosmos.tx.v1beta1/module").SignDoc;
            }): import("@cosmjs/proto-signing").EncodeObject;
            fee({ value }: {
                value: import("./cosmos.tx.v1beta1/module").Fee;
            }): import("@cosmjs/proto-signing").EncodeObject;
            getTxRequest({ value }: {
                value: import("./cosmos.tx.v1beta1/module").GetTxRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            getBlockWithTxsRequest({ value }: {
                value: import("./cosmos.tx.v1beta1/module").GetBlockWithTxsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            txDecodeAminoResponse({ value }: {
                value: import("./cosmos.tx.v1beta1/module").TxDecodeAminoResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            txRaw({ value }: {
                value: import("./cosmos.tx.v1beta1/module").TxRaw;
            }): import("@cosmjs/proto-signing").EncodeObject;
            modeInfo({ value }: {
                value: import("./cosmos.tx.v1beta1/module").ModeInfo;
            }): import("@cosmjs/proto-signing").EncodeObject;
            modeInfoSingle({ value }: {
                value: import("./cosmos.tx.v1beta1/module").ModeInfo_Single;
            }): import("@cosmjs/proto-signing").EncodeObject;
            txDecodeRequest({ value }: {
                value: import("./cosmos.tx.v1beta1/module").TxDecodeRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            authInfo({ value }: {
                value: import("./cosmos.tx.v1beta1/module").AuthInfo;
            }): import("@cosmjs/proto-signing").EncodeObject;
            tip({ value }: {
                value: import("./cosmos.tx.v1beta1/module").Tip;
            }): import("@cosmjs/proto-signing").EncodeObject;
            getTxsEventRequest({ value }: {
                value: import("./cosmos.tx.v1beta1/module").GetTxsEventRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            broadcastTxRequest({ value }: {
                value: import("./cosmos.tx.v1beta1/module").BroadcastTxRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            txEncodeAminoRequest({ value }: {
                value: import("./cosmos.tx.v1beta1/module").TxEncodeAminoRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            tx({ value }: {
                value: import("./cosmos.tx.v1beta1/module").Tx;
            }): import("@cosmjs/proto-signing").EncodeObject;
            txBody({ value }: {
                value: import("./cosmos.tx.v1beta1/module").TxBody;
            }): import("@cosmjs/proto-signing").EncodeObject;
            getTxsEventResponse({ value }: {
                value: import("./cosmos.tx.v1beta1/module").GetTxsEventResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            getTxResponse({ value }: {
                value: import("./cosmos.tx.v1beta1/module").GetTxResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            txEncodeRequest({ value }: {
                value: import("./cosmos.tx.v1beta1/module").TxEncodeRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            modeInfoMulti({ value }: {
                value: import("./cosmos.tx.v1beta1/module").ModeInfo_Multi;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosUpgradeV1Beta1: {
        query: import("./cosmos.upgrade.v1beta1/rest").Api<unknown>;
        tx: {
            sendQueryAuthorityRequest({ value, fee, memo }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryAuthorityRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAuthorityResponse({ value, fee, memo }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryAuthorityResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSoftwareUpgradeResponse({ value, fee, memo }: {
                value: import("./cosmos.upgrade.v1beta1/module").MsgSoftwareUpgradeResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendPlan({ value, fee, memo }: {
                value: import("./cosmos.upgrade.v1beta1/module").Plan;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryModuleVersionsRequest({ value, fee, memo }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryModuleVersionsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendModuleVersion({ value, fee, memo }: {
                value: import("./cosmos.upgrade.v1beta1/module").ModuleVersion;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryCurrentPlanRequest({ value, fee, memo }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryCurrentPlanRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryCurrentPlanResponse({ value, fee, memo }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryCurrentPlanResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAppliedPlanRequest({ value, fee, memo }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryAppliedPlanRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendSoftwareUpgradeProposal({ value, fee, memo }: {
                value: import("./cosmos.upgrade.v1beta1/module").SoftwareUpgradeProposal;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendCancelSoftwareUpgradeProposal({ value, fee, memo }: {
                value: import("./cosmos.upgrade.v1beta1/module").CancelSoftwareUpgradeProposal;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryModuleVersionsResponse({ value, fee, memo }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryModuleVersionsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCancelUpgradeResponse({ value, fee, memo }: {
                value: import("./cosmos.upgrade.v1beta1/module").MsgCancelUpgradeResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryUpgradedConsensusStateResponse({ value, fee, memo }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryUpgradedConsensusStateResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSoftwareUpgrade({ value, fee, memo }: {
                value: import("./cosmos.upgrade.v1beta1/module").MsgSoftwareUpgrade;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCancelUpgrade({ value, fee, memo }: {
                value: import("./cosmos.upgrade.v1beta1/module").MsgCancelUpgrade;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryAppliedPlanResponse({ value, fee, memo }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryAppliedPlanResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryUpgradedConsensusStateRequest({ value, fee, memo }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryUpgradedConsensusStateRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            queryAuthorityRequest({ value }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryAuthorityRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAuthorityResponse({ value }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryAuthorityResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSoftwareUpgradeResponse({ value }: {
                value: import("./cosmos.upgrade.v1beta1/module").MsgSoftwareUpgradeResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            plan({ value }: {
                value: import("./cosmos.upgrade.v1beta1/module").Plan;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryModuleVersionsRequest({ value }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryModuleVersionsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            moduleVersion({ value }: {
                value: import("./cosmos.upgrade.v1beta1/module").ModuleVersion;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryCurrentPlanRequest({ value }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryCurrentPlanRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryCurrentPlanResponse({ value }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryCurrentPlanResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAppliedPlanRequest({ value }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryAppliedPlanRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            softwareUpgradeProposal({ value }: {
                value: import("./cosmos.upgrade.v1beta1/module").SoftwareUpgradeProposal;
            }): import("@cosmjs/proto-signing").EncodeObject;
            cancelSoftwareUpgradeProposal({ value }: {
                value: import("./cosmos.upgrade.v1beta1/module").CancelSoftwareUpgradeProposal;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryModuleVersionsResponse({ value }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryModuleVersionsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCancelUpgradeResponse({ value }: {
                value: import("./cosmos.upgrade.v1beta1/module").MsgCancelUpgradeResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryUpgradedConsensusStateResponse({ value }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryUpgradedConsensusStateResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSoftwareUpgrade({ value }: {
                value: import("./cosmos.upgrade.v1beta1/module").MsgSoftwareUpgrade;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCancelUpgrade({ value }: {
                value: import("./cosmos.upgrade.v1beta1/module").MsgCancelUpgrade;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryAppliedPlanResponse({ value }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryAppliedPlanResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryUpgradedConsensusStateRequest({ value }: {
                value: import("./cosmos.upgrade.v1beta1/module").QueryUpgradedConsensusStateRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    CosmosVestingV1Beta1: {
        query: import("./cosmos.vesting.v1beta1/rest").Api<unknown>;
        tx: {
            sendMsgCreateVestingAccount({ value, fee, memo }: {
                value: import("./cosmos.vesting.v1beta1/module").MsgCreateVestingAccount;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCreatePeriodicVestingAccount({ value, fee, memo }: {
                value: import("./cosmos.vesting.v1beta1/module").MsgCreatePeriodicVestingAccount;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCreateVestingAccountResponse({ value, fee, memo }: {
                value: import("./cosmos.vesting.v1beta1/module").MsgCreateVestingAccountResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendBaseVestingAccount({ value, fee, memo }: {
                value: import("./cosmos.vesting.v1beta1/module").BaseVestingAccount;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCreatePermanentLockedAccount({ value, fee, memo }: {
                value: import("./cosmos.vesting.v1beta1/module").MsgCreatePermanentLockedAccount;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCreatePermanentLockedAccountResponse({ value, fee, memo }: {
                value: import("./cosmos.vesting.v1beta1/module").MsgCreatePermanentLockedAccountResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendContinuousVestingAccount({ value, fee, memo }: {
                value: import("./cosmos.vesting.v1beta1/module").ContinuousVestingAccount;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendPeriod({ value, fee, memo }: {
                value: import("./cosmos.vesting.v1beta1/module").Period;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendPermanentLockedAccount({ value, fee, memo }: {
                value: import("./cosmos.vesting.v1beta1/module").PermanentLockedAccount;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCreatePeriodicVestingAccountResponse({ value, fee, memo }: {
                value: import("./cosmos.vesting.v1beta1/module").MsgCreatePeriodicVestingAccountResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDelayedVestingAccount({ value, fee, memo }: {
                value: import("./cosmos.vesting.v1beta1/module").DelayedVestingAccount;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendPeriodicVestingAccount({ value, fee, memo }: {
                value: import("./cosmos.vesting.v1beta1/module").PeriodicVestingAccount;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            msgCreateVestingAccount({ value }: {
                value: import("./cosmos.vesting.v1beta1/module").MsgCreateVestingAccount;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCreatePeriodicVestingAccount({ value }: {
                value: import("./cosmos.vesting.v1beta1/module").MsgCreatePeriodicVestingAccount;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCreateVestingAccountResponse({ value }: {
                value: import("./cosmos.vesting.v1beta1/module").MsgCreateVestingAccountResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            baseVestingAccount({ value }: {
                value: import("./cosmos.vesting.v1beta1/module").BaseVestingAccount;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCreatePermanentLockedAccount({ value }: {
                value: import("./cosmos.vesting.v1beta1/module").MsgCreatePermanentLockedAccount;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCreatePermanentLockedAccountResponse({ value }: {
                value: import("./cosmos.vesting.v1beta1/module").MsgCreatePermanentLockedAccountResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            continuousVestingAccount({ value }: {
                value: import("./cosmos.vesting.v1beta1/module").ContinuousVestingAccount;
            }): import("@cosmjs/proto-signing").EncodeObject;
            period({ value }: {
                value: import("./cosmos.vesting.v1beta1/module").Period;
            }): import("@cosmjs/proto-signing").EncodeObject;
            permanentLockedAccount({ value }: {
                value: import("./cosmos.vesting.v1beta1/module").PermanentLockedAccount;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCreatePeriodicVestingAccountResponse({ value }: {
                value: import("./cosmos.vesting.v1beta1/module").MsgCreatePeriodicVestingAccountResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            delayedVestingAccount({ value }: {
                value: import("./cosmos.vesting.v1beta1/module").DelayedVestingAccount;
            }): import("@cosmjs/proto-signing").EncodeObject;
            periodicVestingAccount({ value }: {
                value: import("./cosmos.vesting.v1beta1/module").PeriodicVestingAccount;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    IbcApplicationsFeeV1: {
        query: import("./ibc.applications.fee.v1/rest").Api<unknown>;
        tx: {
            sendMetadata({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").Metadata;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgPayPacketFeeAsync({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").MsgPayPacketFeeAsync;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryIncentivizedPacketsForChannelRequest({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryIncentivizedPacketsForChannelRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryTotalTimeoutFeesRequest({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryTotalTimeoutFeesRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryPayeeResponse({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryPayeeResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryCounterpartyPayeeResponse({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryCounterpartyPayeeResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendPacketFees({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").PacketFees;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendFee({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").Fee;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgRegisterCounterpartyPayee({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").MsgRegisterCounterpartyPayee;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryIncentivizedPacketsRequest({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryIncentivizedPacketsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryIncentivizedPacketsForChannelResponse({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryIncentivizedPacketsForChannelResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryCounterpartyPayeeRequest({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryCounterpartyPayeeRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendIncentivizedAcknowledgement({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").IncentivizedAcknowledgement;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendForwardRelayerAddress({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").ForwardRelayerAddress;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendPacketFee({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").PacketFee;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgPayPacketFee({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").MsgPayPacketFee;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryTotalRecvFeesResponse({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryTotalRecvFeesResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryTotalTimeoutFeesResponse({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryTotalTimeoutFeesResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryFeeEnabledChannelsRequest({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryFeeEnabledChannelsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryFeeEnabledChannelResponse({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryFeeEnabledChannelResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgRegisterCounterpartyPayeeResponse({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").MsgRegisterCounterpartyPayeeResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendIdentifiedPacketFees({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").IdentifiedPacketFees;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryIncentivizedPacketRequest({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryIncentivizedPacketRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryIncentivizedPacketResponse({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryIncentivizedPacketResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryTotalAckFeesRequest({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryTotalAckFeesRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryTotalAckFeesResponse({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryTotalAckFeesResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgRegisterPayeeResponse({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").MsgRegisterPayeeResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendFeeEnabledChannel({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").FeeEnabledChannel;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgRegisterPayee({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").MsgRegisterPayee;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendRegisteredPayee({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").RegisteredPayee;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryPayeeRequest({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryPayeeRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryFeeEnabledChannelRequest({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryFeeEnabledChannelRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgPayPacketFeeResponse({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").MsgPayPacketFeeResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryTotalRecvFeesRequest({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryTotalRecvFeesRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendRegisteredCounterpartyPayee({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").RegisteredCounterpartyPayee;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryFeeEnabledChannelsResponse({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryFeeEnabledChannelsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgPayPacketFeeAsyncResponse({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").MsgPayPacketFeeAsyncResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryIncentivizedPacketsResponse({ value, fee, memo }: {
                value: import("./ibc.applications.fee.v1/module").QueryIncentivizedPacketsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            metadata({ value }: {
                value: import("./ibc.applications.fee.v1/module").Metadata;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgPayPacketFeeAsync({ value }: {
                value: import("./ibc.applications.fee.v1/module").MsgPayPacketFeeAsync;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryIncentivizedPacketsForChannelRequest({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryIncentivizedPacketsForChannelRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryTotalTimeoutFeesRequest({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryTotalTimeoutFeesRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryPayeeResponse({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryPayeeResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryCounterpartyPayeeResponse({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryCounterpartyPayeeResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            packetFees({ value }: {
                value: import("./ibc.applications.fee.v1/module").PacketFees;
            }): import("@cosmjs/proto-signing").EncodeObject;
            fee({ value }: {
                value: import("./ibc.applications.fee.v1/module").Fee;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgRegisterCounterpartyPayee({ value }: {
                value: import("./ibc.applications.fee.v1/module").MsgRegisterCounterpartyPayee;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryIncentivizedPacketsRequest({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryIncentivizedPacketsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryIncentivizedPacketsForChannelResponse({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryIncentivizedPacketsForChannelResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryCounterpartyPayeeRequest({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryCounterpartyPayeeRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            incentivizedAcknowledgement({ value }: {
                value: import("./ibc.applications.fee.v1/module").IncentivizedAcknowledgement;
            }): import("@cosmjs/proto-signing").EncodeObject;
            forwardRelayerAddress({ value }: {
                value: import("./ibc.applications.fee.v1/module").ForwardRelayerAddress;
            }): import("@cosmjs/proto-signing").EncodeObject;
            packetFee({ value }: {
                value: import("./ibc.applications.fee.v1/module").PacketFee;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgPayPacketFee({ value }: {
                value: import("./ibc.applications.fee.v1/module").MsgPayPacketFee;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryTotalRecvFeesResponse({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryTotalRecvFeesResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryTotalTimeoutFeesResponse({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryTotalTimeoutFeesResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryFeeEnabledChannelsRequest({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryFeeEnabledChannelsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryFeeEnabledChannelResponse({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryFeeEnabledChannelResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./ibc.applications.fee.v1/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgRegisterCounterpartyPayeeResponse({ value }: {
                value: import("./ibc.applications.fee.v1/module").MsgRegisterCounterpartyPayeeResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            identifiedPacketFees({ value }: {
                value: import("./ibc.applications.fee.v1/module").IdentifiedPacketFees;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryIncentivizedPacketRequest({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryIncentivizedPacketRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryIncentivizedPacketResponse({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryIncentivizedPacketResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryTotalAckFeesRequest({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryTotalAckFeesRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryTotalAckFeesResponse({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryTotalAckFeesResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgRegisterPayeeResponse({ value }: {
                value: import("./ibc.applications.fee.v1/module").MsgRegisterPayeeResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            feeEnabledChannel({ value }: {
                value: import("./ibc.applications.fee.v1/module").FeeEnabledChannel;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgRegisterPayee({ value }: {
                value: import("./ibc.applications.fee.v1/module").MsgRegisterPayee;
            }): import("@cosmjs/proto-signing").EncodeObject;
            registeredPayee({ value }: {
                value: import("./ibc.applications.fee.v1/module").RegisteredPayee;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryPayeeRequest({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryPayeeRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryFeeEnabledChannelRequest({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryFeeEnabledChannelRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgPayPacketFeeResponse({ value }: {
                value: import("./ibc.applications.fee.v1/module").MsgPayPacketFeeResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryTotalRecvFeesRequest({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryTotalRecvFeesRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            registeredCounterpartyPayee({ value }: {
                value: import("./ibc.applications.fee.v1/module").RegisteredCounterpartyPayee;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryFeeEnabledChannelsResponse({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryFeeEnabledChannelsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgPayPacketFeeAsyncResponse({ value }: {
                value: import("./ibc.applications.fee.v1/module").MsgPayPacketFeeAsyncResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryIncentivizedPacketsResponse({ value }: {
                value: import("./ibc.applications.fee.v1/module").QueryIncentivizedPacketsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    IbcApplicationsInterchainAccountsControllerV1: {
        query: import("./ibc.applications.interchain_accounts.controller.v1/rest").Api<unknown>;
        tx: {
            sendParams({ value, fee, memo }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").Params;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsRequest({ value, fee, memo }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").QueryParamsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsResponse({ value, fee, memo }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").QueryParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSendTxResponse({ value, fee, memo }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").MsgSendTxResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSendTx({ value, fee, memo }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").MsgSendTx;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryInterchainAccountRequest({ value, fee, memo }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").QueryInterchainAccountRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParamsResponse({ value, fee, memo }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").MsgUpdateParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgRegisterInterchainAccount({ value, fee, memo }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").MsgRegisterInterchainAccount;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryInterchainAccountResponse({ value, fee, memo }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").QueryInterchainAccountResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgRegisterInterchainAccountResponse({ value, fee, memo }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").MsgRegisterInterchainAccountResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParams({ value, fee, memo }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").MsgUpdateParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            params({ value }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").Params;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsRequest({ value }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").QueryParamsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsResponse({ value }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").QueryParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSendTxResponse({ value }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").MsgSendTxResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSendTx({ value }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").MsgSendTx;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryInterchainAccountRequest({ value }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").QueryInterchainAccountRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParamsResponse({ value }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").MsgUpdateParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgRegisterInterchainAccount({ value }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").MsgRegisterInterchainAccount;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryInterchainAccountResponse({ value }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").QueryInterchainAccountResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgRegisterInterchainAccountResponse({ value }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").MsgRegisterInterchainAccountResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParams({ value }: {
                value: import("./ibc.applications.interchain_accounts.controller.v1/module").MsgUpdateParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    IbcApplicationsInterchainAccountsHostV1: {
        query: import("./ibc.applications.interchain_accounts.host.v1/rest").Api<unknown>;
        tx: {
            sendParams({ value, fee, memo }: {
                value: import("./ibc.applications.interchain_accounts.host.v1/module").Params;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsResponse({ value, fee, memo }: {
                value: import("./ibc.applications.interchain_accounts.host.v1/module").QueryParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParams({ value, fee, memo }: {
                value: import("./ibc.applications.interchain_accounts.host.v1/module").MsgUpdateParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsRequest({ value, fee, memo }: {
                value: import("./ibc.applications.interchain_accounts.host.v1/module").QueryParamsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParamsResponse({ value, fee, memo }: {
                value: import("./ibc.applications.interchain_accounts.host.v1/module").MsgUpdateParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            params({ value }: {
                value: import("./ibc.applications.interchain_accounts.host.v1/module").Params;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsResponse({ value }: {
                value: import("./ibc.applications.interchain_accounts.host.v1/module").QueryParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParams({ value }: {
                value: import("./ibc.applications.interchain_accounts.host.v1/module").MsgUpdateParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsRequest({ value }: {
                value: import("./ibc.applications.interchain_accounts.host.v1/module").QueryParamsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParamsResponse({ value }: {
                value: import("./ibc.applications.interchain_accounts.host.v1/module").MsgUpdateParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    IbcApplicationsTransferV1: {
        query: import("./ibc.applications.transfer.v1/rest").Api<unknown>;
        tx: {
            sendQueryTotalEscrowForDenomRequest({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").QueryTotalEscrowForDenomRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgTransfer({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").MsgTransfer;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDenomTracesRequest({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").QueryDenomTracesRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDenomHashResponse({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").QueryDenomHashResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDenomTraceRequest({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").QueryDenomTraceRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsRequest({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").QueryParamsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgTransferResponse({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").MsgTransferResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParamsResponse({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").MsgUpdateParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDenomTraceResponse({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").QueryDenomTraceResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDenomTracesResponse({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").QueryDenomTracesResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryDenomHashRequest({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").QueryDenomHashRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParams({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").MsgUpdateParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendParams({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").Params;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendAllocation({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").Allocation;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryEscrowAddressResponse({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").QueryEscrowAddressResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryTotalEscrowForDenomResponse({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").QueryTotalEscrowForDenomResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendDenomTrace({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").DenomTrace;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTransferAuthorization({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").TransferAuthorization;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsResponse({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").QueryParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryEscrowAddressRequest({ value, fee, memo }: {
                value: import("./ibc.applications.transfer.v1/module").QueryEscrowAddressRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            queryTotalEscrowForDenomRequest({ value }: {
                value: import("./ibc.applications.transfer.v1/module").QueryTotalEscrowForDenomRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgTransfer({ value }: {
                value: import("./ibc.applications.transfer.v1/module").MsgTransfer;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDenomTracesRequest({ value }: {
                value: import("./ibc.applications.transfer.v1/module").QueryDenomTracesRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDenomHashResponse({ value }: {
                value: import("./ibc.applications.transfer.v1/module").QueryDenomHashResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./ibc.applications.transfer.v1/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDenomTraceRequest({ value }: {
                value: import("./ibc.applications.transfer.v1/module").QueryDenomTraceRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsRequest({ value }: {
                value: import("./ibc.applications.transfer.v1/module").QueryParamsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgTransferResponse({ value }: {
                value: import("./ibc.applications.transfer.v1/module").MsgTransferResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParamsResponse({ value }: {
                value: import("./ibc.applications.transfer.v1/module").MsgUpdateParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDenomTraceResponse({ value }: {
                value: import("./ibc.applications.transfer.v1/module").QueryDenomTraceResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDenomTracesResponse({ value }: {
                value: import("./ibc.applications.transfer.v1/module").QueryDenomTracesResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryDenomHashRequest({ value }: {
                value: import("./ibc.applications.transfer.v1/module").QueryDenomHashRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParams({ value }: {
                value: import("./ibc.applications.transfer.v1/module").MsgUpdateParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            params({ value }: {
                value: import("./ibc.applications.transfer.v1/module").Params;
            }): import("@cosmjs/proto-signing").EncodeObject;
            allocation({ value }: {
                value: import("./ibc.applications.transfer.v1/module").Allocation;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryEscrowAddressResponse({ value }: {
                value: import("./ibc.applications.transfer.v1/module").QueryEscrowAddressResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryTotalEscrowForDenomResponse({ value }: {
                value: import("./ibc.applications.transfer.v1/module").QueryTotalEscrowForDenomResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            denomTrace({ value }: {
                value: import("./ibc.applications.transfer.v1/module").DenomTrace;
            }): import("@cosmjs/proto-signing").EncodeObject;
            transferAuthorization({ value }: {
                value: import("./ibc.applications.transfer.v1/module").TransferAuthorization;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsResponse({ value }: {
                value: import("./ibc.applications.transfer.v1/module").QueryParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryEscrowAddressRequest({ value }: {
                value: import("./ibc.applications.transfer.v1/module").QueryEscrowAddressRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    IbcCoreChannelV1: {
        query: import("./ibc.core.channel.v1/rest").Api<unknown>;
        tx: {
            sendMsgAcknowledgement({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgAcknowledgement;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgTimeoutOnCloseResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgTimeoutOnCloseResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendIdentifiedChannel({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").IdentifiedChannel;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryChannelConsensusStateResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryChannelConsensusStateResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConnectionChannelsResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryConnectionChannelsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryPacketAcknowledgementsResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketAcknowledgementsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgChannelOpenAck({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelOpenAck;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendPacketId({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").PacketId;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendTimeout({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").Timeout;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryPacketAcknowledgementResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketAcknowledgementResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryUnreceivedAcksRequest({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryUnreceivedAcksRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryNextSequenceSendResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryNextSequenceSendResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryUnreceivedAcksResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryUnreceivedAcksResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgChannelCloseConfirm({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelCloseConfirm;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgChannelOpenInitResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelOpenInitResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendChannel({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").Channel;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryPacketCommitmentResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketCommitmentResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryNextSequenceReceiveResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryNextSequenceReceiveResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgChannelOpenInit({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelOpenInit;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgChannelOpenTry({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelOpenTry;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgChannelCloseInit({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelCloseInit;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgRecvPacketResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgRecvPacketResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendPacket({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").Packet;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryNextSequenceSendRequest({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryNextSequenceSendRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgTimeout({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgTimeout;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgChannelOpenTryResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelOpenTryResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryChannelsResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryChannelsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryPacketReceiptResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketReceiptResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendPacketSequence({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").PacketSequence;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgRecvPacket({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgRecvPacket;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendCounterparty({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").Counterparty;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryPacketCommitmentsResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketCommitmentsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryUnreceivedPacketsResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryUnreceivedPacketsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgAcknowledgementResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgAcknowledgementResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendPacketState({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").PacketState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryChannelClientStateResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryChannelClientStateResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConnectionChannelsRequest({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryConnectionChannelsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryPacketCommitmentRequest({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketCommitmentRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgChannelOpenConfirm({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelOpenConfirm;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendAcknowledgement({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").Acknowledgement;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryChannelConsensusStateRequest({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryChannelConsensusStateRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgTimeoutOnClose({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgTimeoutOnClose;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgChannelOpenAckResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelOpenAckResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgChannelOpenConfirmResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelOpenConfirmResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryPacketAcknowledgementsRequest({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketAcknowledgementsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryChannelRequest({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryChannelRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryPacketReceiptRequest({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketReceiptRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryNextSequenceReceiveRequest({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryNextSequenceReceiveRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgChannelCloseConfirmResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelCloseConfirmResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryUnreceivedPacketsRequest({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryUnreceivedPacketsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryChannelsRequest({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryChannelsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryPacketAcknowledgementRequest({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketAcknowledgementRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgChannelCloseInitResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelCloseInitResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgTimeoutResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").MsgTimeoutResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryChannelResponse({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryChannelResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryChannelClientStateRequest({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryChannelClientStateRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryPacketCommitmentsRequest({ value, fee, memo }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketCommitmentsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            msgAcknowledgement({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgAcknowledgement;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgTimeoutOnCloseResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgTimeoutOnCloseResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            identifiedChannel({ value }: {
                value: import("./ibc.core.channel.v1/module").IdentifiedChannel;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryChannelConsensusStateResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryChannelConsensusStateResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConnectionChannelsResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryConnectionChannelsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryPacketAcknowledgementsResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketAcknowledgementsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgChannelOpenAck({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelOpenAck;
            }): import("@cosmjs/proto-signing").EncodeObject;
            packetId({ value }: {
                value: import("./ibc.core.channel.v1/module").PacketId;
            }): import("@cosmjs/proto-signing").EncodeObject;
            timeout({ value }: {
                value: import("./ibc.core.channel.v1/module").Timeout;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryPacketAcknowledgementResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketAcknowledgementResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryUnreceivedAcksRequest({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryUnreceivedAcksRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryNextSequenceSendResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryNextSequenceSendResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryUnreceivedAcksResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryUnreceivedAcksResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgChannelCloseConfirm({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelCloseConfirm;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgChannelOpenInitResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelOpenInitResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            channel({ value }: {
                value: import("./ibc.core.channel.v1/module").Channel;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryPacketCommitmentResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketCommitmentResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryNextSequenceReceiveResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryNextSequenceReceiveResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgChannelOpenInit({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelOpenInit;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgChannelOpenTry({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelOpenTry;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./ibc.core.channel.v1/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgChannelCloseInit({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelCloseInit;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgRecvPacketResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgRecvPacketResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            packet({ value }: {
                value: import("./ibc.core.channel.v1/module").Packet;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryNextSequenceSendRequest({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryNextSequenceSendRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgTimeout({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgTimeout;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgChannelOpenTryResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelOpenTryResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryChannelsResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryChannelsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryPacketReceiptResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketReceiptResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            packetSequence({ value }: {
                value: import("./ibc.core.channel.v1/module").PacketSequence;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgRecvPacket({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgRecvPacket;
            }): import("@cosmjs/proto-signing").EncodeObject;
            counterparty({ value }: {
                value: import("./ibc.core.channel.v1/module").Counterparty;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryPacketCommitmentsResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketCommitmentsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryUnreceivedPacketsResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryUnreceivedPacketsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgAcknowledgementResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgAcknowledgementResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            packetState({ value }: {
                value: import("./ibc.core.channel.v1/module").PacketState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryChannelClientStateResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryChannelClientStateResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConnectionChannelsRequest({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryConnectionChannelsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryPacketCommitmentRequest({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketCommitmentRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgChannelOpenConfirm({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelOpenConfirm;
            }): import("@cosmjs/proto-signing").EncodeObject;
            acknowledgement({ value }: {
                value: import("./ibc.core.channel.v1/module").Acknowledgement;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryChannelConsensusStateRequest({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryChannelConsensusStateRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgTimeoutOnClose({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgTimeoutOnClose;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgChannelOpenAckResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelOpenAckResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgChannelOpenConfirmResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelOpenConfirmResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryPacketAcknowledgementsRequest({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketAcknowledgementsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryChannelRequest({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryChannelRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryPacketReceiptRequest({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketReceiptRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryNextSequenceReceiveRequest({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryNextSequenceReceiveRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgChannelCloseConfirmResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelCloseConfirmResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryUnreceivedPacketsRequest({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryUnreceivedPacketsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryChannelsRequest({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryChannelsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryPacketAcknowledgementRequest({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketAcknowledgementRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgChannelCloseInitResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgChannelCloseInitResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgTimeoutResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").MsgTimeoutResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryChannelResponse({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryChannelResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryChannelClientStateRequest({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryChannelClientStateRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryPacketCommitmentsRequest({ value }: {
                value: import("./ibc.core.channel.v1/module").QueryPacketCommitmentsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    IbcCoreClientV1: {
        query: import("./ibc.core.client.v1/rest").Api<unknown>;
        tx: {
            sendQueryClientStatusRequest({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").QueryClientStatusRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpgradeClientResponse({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").MsgUpgradeClientResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpgradeClient({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").MsgUpgradeClient;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConsensusStatesResponse({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").QueryConsensusStatesResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryClientStateRequest({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").QueryClientStateRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryUpgradedClientStateRequest({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").QueryUpgradedClientStateRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryUpgradedClientStateResponse({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").QueryUpgradedClientStateResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryUpgradedConsensusStateRequest({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").QueryUpgradedConsensusStateRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgIBCSoftwareUpgrade({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").MsgIBCSoftwareUpgrade;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParams({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").MsgUpdateParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConsensusStateHeightsResponse({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").QueryConsensusStateHeightsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConsensusStatesRequest({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").QueryConsensusStatesRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryClientParamsResponse({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").QueryClientParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateClientResponse({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").MsgUpdateClientResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgRecoverClientResponse({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").MsgRecoverClientResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCreateClient({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").MsgCreateClient;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendClientConsensusStates({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").ClientConsensusStates;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSubmitMisbehaviour({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").MsgSubmitMisbehaviour;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgCreateClientResponse({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").MsgCreateClientResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgIBCSoftwareUpgradeResponse({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").MsgIBCSoftwareUpgradeResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConsensusStateResponse({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").QueryConsensusStateResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendConsensusStateWithHeight({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").ConsensusStateWithHeight;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateClient({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").MsgUpdateClient;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryClientStatesResponse({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").QueryClientStatesResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisMetadata({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").GenesisMetadata;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryUpgradedConsensusStateResponse({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").QueryUpgradedConsensusStateResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendHeight({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").Height;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryClientParamsRequest({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").QueryClientParamsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendUpgradeProposal({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").UpgradeProposal;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSubmitMisbehaviourResponse({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").MsgSubmitMisbehaviourResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParamsResponse({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").MsgUpdateParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendParams({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").Params;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryClientStatesRequest({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").QueryClientStatesRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryClientStatusResponse({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").QueryClientStatusResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConsensusStateRequest({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").QueryConsensusStateRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConsensusStateHeightsRequest({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").QueryConsensusStateHeightsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendIdentifiedClientState({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").IdentifiedClientState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendClientUpdateProposal({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").ClientUpdateProposal;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendIdentifiedGenesisMetadata({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").IdentifiedGenesisMetadata;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgRecoverClient({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").MsgRecoverClient;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryClientStateResponse({ value, fee, memo }: {
                value: import("./ibc.core.client.v1/module").QueryClientStateResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            queryClientStatusRequest({ value }: {
                value: import("./ibc.core.client.v1/module").QueryClientStatusRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpgradeClientResponse({ value }: {
                value: import("./ibc.core.client.v1/module").MsgUpgradeClientResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpgradeClient({ value }: {
                value: import("./ibc.core.client.v1/module").MsgUpgradeClient;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConsensusStatesResponse({ value }: {
                value: import("./ibc.core.client.v1/module").QueryConsensusStatesResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryClientStateRequest({ value }: {
                value: import("./ibc.core.client.v1/module").QueryClientStateRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryUpgradedClientStateRequest({ value }: {
                value: import("./ibc.core.client.v1/module").QueryUpgradedClientStateRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryUpgradedClientStateResponse({ value }: {
                value: import("./ibc.core.client.v1/module").QueryUpgradedClientStateResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryUpgradedConsensusStateRequest({ value }: {
                value: import("./ibc.core.client.v1/module").QueryUpgradedConsensusStateRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgIbcsoftwareUpgrade({ value }: {
                value: import("./ibc.core.client.v1/module").MsgIBCSoftwareUpgrade;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParams({ value }: {
                value: import("./ibc.core.client.v1/module").MsgUpdateParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConsensusStateHeightsResponse({ value }: {
                value: import("./ibc.core.client.v1/module").QueryConsensusStateHeightsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConsensusStatesRequest({ value }: {
                value: import("./ibc.core.client.v1/module").QueryConsensusStatesRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryClientParamsResponse({ value }: {
                value: import("./ibc.core.client.v1/module").QueryClientParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateClientResponse({ value }: {
                value: import("./ibc.core.client.v1/module").MsgUpdateClientResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgRecoverClientResponse({ value }: {
                value: import("./ibc.core.client.v1/module").MsgRecoverClientResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCreateClient({ value }: {
                value: import("./ibc.core.client.v1/module").MsgCreateClient;
            }): import("@cosmjs/proto-signing").EncodeObject;
            clientConsensusStates({ value }: {
                value: import("./ibc.core.client.v1/module").ClientConsensusStates;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSubmitMisbehaviour({ value }: {
                value: import("./ibc.core.client.v1/module").MsgSubmitMisbehaviour;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgCreateClientResponse({ value }: {
                value: import("./ibc.core.client.v1/module").MsgCreateClientResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgIbcsoftwareUpgradeResponse({ value }: {
                value: import("./ibc.core.client.v1/module").MsgIBCSoftwareUpgradeResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConsensusStateResponse({ value }: {
                value: import("./ibc.core.client.v1/module").QueryConsensusStateResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            consensusStateWithHeight({ value }: {
                value: import("./ibc.core.client.v1/module").ConsensusStateWithHeight;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./ibc.core.client.v1/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateClient({ value }: {
                value: import("./ibc.core.client.v1/module").MsgUpdateClient;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryClientStatesResponse({ value }: {
                value: import("./ibc.core.client.v1/module").QueryClientStatesResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisMetadata({ value }: {
                value: import("./ibc.core.client.v1/module").GenesisMetadata;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryUpgradedConsensusStateResponse({ value }: {
                value: import("./ibc.core.client.v1/module").QueryUpgradedConsensusStateResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            height({ value }: {
                value: import("./ibc.core.client.v1/module").Height;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryClientParamsRequest({ value }: {
                value: import("./ibc.core.client.v1/module").QueryClientParamsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            upgradeProposal({ value }: {
                value: import("./ibc.core.client.v1/module").UpgradeProposal;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSubmitMisbehaviourResponse({ value }: {
                value: import("./ibc.core.client.v1/module").MsgSubmitMisbehaviourResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParamsResponse({ value }: {
                value: import("./ibc.core.client.v1/module").MsgUpdateParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            params({ value }: {
                value: import("./ibc.core.client.v1/module").Params;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryClientStatesRequest({ value }: {
                value: import("./ibc.core.client.v1/module").QueryClientStatesRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryClientStatusResponse({ value }: {
                value: import("./ibc.core.client.v1/module").QueryClientStatusResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConsensusStateRequest({ value }: {
                value: import("./ibc.core.client.v1/module").QueryConsensusStateRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConsensusStateHeightsRequest({ value }: {
                value: import("./ibc.core.client.v1/module").QueryConsensusStateHeightsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            identifiedClientState({ value }: {
                value: import("./ibc.core.client.v1/module").IdentifiedClientState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            clientUpdateProposal({ value }: {
                value: import("./ibc.core.client.v1/module").ClientUpdateProposal;
            }): import("@cosmjs/proto-signing").EncodeObject;
            identifiedGenesisMetadata({ value }: {
                value: import("./ibc.core.client.v1/module").IdentifiedGenesisMetadata;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgRecoverClient({ value }: {
                value: import("./ibc.core.client.v1/module").MsgRecoverClient;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryClientStateResponse({ value }: {
                value: import("./ibc.core.client.v1/module").QueryClientStateResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    IbcCoreConnectionV1: {
        query: import("./ibc.core.connection.v1/rest").Api<unknown>;
        tx: {
            sendMsgConnectionOpenInit({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").MsgConnectionOpenInit;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConnectionConsensusStateRequest({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionConsensusStateRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConnectionClientStateResponse({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionClientStateResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgConnectionOpenTry({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").MsgConnectionOpenTry;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgConnectionOpenTryResponse({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").MsgConnectionOpenTryResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgConnectionOpenAck({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").MsgConnectionOpenAck;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParamsResponse({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").MsgUpdateParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryClientConnectionsResponse({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").QueryClientConnectionsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConnectionRequest({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConnectionsResponse({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgConnectionOpenInitResponse({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").MsgConnectionOpenInitResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgConnectionOpenAckResponse({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").MsgConnectionOpenAckResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgConnectionOpenConfirm({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").MsgConnectionOpenConfirm;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendCounterparty({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").Counterparty;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConnectionClientStateRequest({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionClientStateRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendVersion({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").Version;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendParams({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").Params;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConnectionParamsResponse({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParams({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").MsgUpdateParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendConnectionPaths({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").ConnectionPaths;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConnectionsRequest({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConnectionResponse({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgConnectionOpenConfirmResponse({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").MsgConnectionOpenConfirmResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendConnectionEnd({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").ConnectionEnd;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendClientPaths({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").ClientPaths;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendIdentifiedConnection({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").IdentifiedConnection;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConnectionParamsRequest({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionParamsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryClientConnectionsRequest({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").QueryClientConnectionsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryConnectionConsensusStateResponse({ value, fee, memo }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionConsensusStateResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            msgConnectionOpenInit({ value }: {
                value: import("./ibc.core.connection.v1/module").MsgConnectionOpenInit;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConnectionConsensusStateRequest({ value }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionConsensusStateRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConnectionClientStateResponse({ value }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionClientStateResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgConnectionOpenTry({ value }: {
                value: import("./ibc.core.connection.v1/module").MsgConnectionOpenTry;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgConnectionOpenTryResponse({ value }: {
                value: import("./ibc.core.connection.v1/module").MsgConnectionOpenTryResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgConnectionOpenAck({ value }: {
                value: import("./ibc.core.connection.v1/module").MsgConnectionOpenAck;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParamsResponse({ value }: {
                value: import("./ibc.core.connection.v1/module").MsgUpdateParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./ibc.core.connection.v1/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryClientConnectionsResponse({ value }: {
                value: import("./ibc.core.connection.v1/module").QueryClientConnectionsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConnectionRequest({ value }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConnectionsResponse({ value }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgConnectionOpenInitResponse({ value }: {
                value: import("./ibc.core.connection.v1/module").MsgConnectionOpenInitResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgConnectionOpenAckResponse({ value }: {
                value: import("./ibc.core.connection.v1/module").MsgConnectionOpenAckResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgConnectionOpenConfirm({ value }: {
                value: import("./ibc.core.connection.v1/module").MsgConnectionOpenConfirm;
            }): import("@cosmjs/proto-signing").EncodeObject;
            counterparty({ value }: {
                value: import("./ibc.core.connection.v1/module").Counterparty;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConnectionClientStateRequest({ value }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionClientStateRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            version({ value }: {
                value: import("./ibc.core.connection.v1/module").Version;
            }): import("@cosmjs/proto-signing").EncodeObject;
            params({ value }: {
                value: import("./ibc.core.connection.v1/module").Params;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConnectionParamsResponse({ value }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParams({ value }: {
                value: import("./ibc.core.connection.v1/module").MsgUpdateParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            connectionPaths({ value }: {
                value: import("./ibc.core.connection.v1/module").ConnectionPaths;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConnectionsRequest({ value }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConnectionResponse({ value }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgConnectionOpenConfirmResponse({ value }: {
                value: import("./ibc.core.connection.v1/module").MsgConnectionOpenConfirmResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            connectionEnd({ value }: {
                value: import("./ibc.core.connection.v1/module").ConnectionEnd;
            }): import("@cosmjs/proto-signing").EncodeObject;
            clientPaths({ value }: {
                value: import("./ibc.core.connection.v1/module").ClientPaths;
            }): import("@cosmjs/proto-signing").EncodeObject;
            identifiedConnection({ value }: {
                value: import("./ibc.core.connection.v1/module").IdentifiedConnection;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConnectionParamsRequest({ value }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionParamsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryClientConnectionsRequest({ value }: {
                value: import("./ibc.core.connection.v1/module").QueryClientConnectionsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryConnectionConsensusStateResponse({ value }: {
                value: import("./ibc.core.connection.v1/module").QueryConnectionConsensusStateResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    WardenIntent: {
        query: import("./warden.intent/rest").Api<unknown>;
        tx: {
            sendAction({ value, fee, memo }: {
                value: import("./warden.intent/module").Action;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendIntent({ value, fee, memo }: {
                value: import("./warden.intent/module").Intent;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParamsResponse({ value, fee, memo }: {
                value: import("./warden.intent/module").MsgUpdateParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsRequest({ value, fee, memo }: {
                value: import("./warden.intent/module").QueryParamsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgActionCreated({ value, fee, memo }: {
                value: import("./warden.intent/module").MsgActionCreated;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryActionsResponse({ value, fee, memo }: {
                value: import("./warden.intent/module").QueryActionsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryIntentsRequest({ value, fee, memo }: {
                value: import("./warden.intent/module").QueryIntentsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryActionByIdRequest({ value, fee, memo }: {
                value: import("./warden.intent/module").QueryActionByIdRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryActionByIdResponse({ value, fee, memo }: {
                value: import("./warden.intent/module").QueryActionByIdResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendApprover({ value, fee, memo }: {
                value: import("./warden.intent/module").Approver;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgApproveActionResponse({ value, fee, memo }: {
                value: import("./warden.intent/module").MsgApproveActionResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendParams({ value, fee, memo }: {
                value: import("./warden.intent/module").Params;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsResponse({ value, fee, memo }: {
                value: import("./warden.intent/module").QueryParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryActionsRequest({ value, fee, memo }: {
                value: import("./warden.intent/module").QueryActionsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryIntentByIdRequest({ value, fee, memo }: {
                value: import("./warden.intent/module").QueryIntentByIdRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParams({ value, fee, memo }: {
                value: import("./warden.intent/module").MsgUpdateParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgNewIntent({ value, fee, memo }: {
                value: import("./warden.intent/module").MsgNewIntent;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgNewIntentResponse({ value, fee, memo }: {
                value: import("./warden.intent/module").MsgNewIntentResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryIntentsResponse({ value, fee, memo }: {
                value: import("./warden.intent/module").QueryIntentsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryActionsByAddressRequest({ value, fee, memo }: {
                value: import("./warden.intent/module").QueryActionsByAddressRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryActionsByAddressResponse({ value, fee, memo }: {
                value: import("./warden.intent/module").QueryActionsByAddressResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgRevokeAction({ value, fee, memo }: {
                value: import("./warden.intent/module").MsgRevokeAction;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./warden.intent/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryIntentByIdResponse({ value, fee, memo }: {
                value: import("./warden.intent/module").QueryIntentByIdResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgApproveAction({ value, fee, memo }: {
                value: import("./warden.intent/module").MsgApproveAction;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgRevokeActionResponse({ value, fee, memo }: {
                value: import("./warden.intent/module").MsgRevokeActionResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            action({ value }: {
                value: import("./warden.intent/module").Action;
            }): import("@cosmjs/proto-signing").EncodeObject;
            intent({ value }: {
                value: import("./warden.intent/module").Intent;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParamsResponse({ value }: {
                value: import("./warden.intent/module").MsgUpdateParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsRequest({ value }: {
                value: import("./warden.intent/module").QueryParamsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgActionCreated({ value }: {
                value: import("./warden.intent/module").MsgActionCreated;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryActionsResponse({ value }: {
                value: import("./warden.intent/module").QueryActionsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryIntentsRequest({ value }: {
                value: import("./warden.intent/module").QueryIntentsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryActionByIdRequest({ value }: {
                value: import("./warden.intent/module").QueryActionByIdRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryActionByIdResponse({ value }: {
                value: import("./warden.intent/module").QueryActionByIdResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            approver({ value }: {
                value: import("./warden.intent/module").Approver;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgApproveActionResponse({ value }: {
                value: import("./warden.intent/module").MsgApproveActionResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            params({ value }: {
                value: import("./warden.intent/module").Params;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsResponse({ value }: {
                value: import("./warden.intent/module").QueryParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryActionsRequest({ value }: {
                value: import("./warden.intent/module").QueryActionsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryIntentByIdRequest({ value }: {
                value: import("./warden.intent/module").QueryIntentByIdRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParams({ value }: {
                value: import("./warden.intent/module").MsgUpdateParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgNewIntent({ value }: {
                value: import("./warden.intent/module").MsgNewIntent;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgNewIntentResponse({ value }: {
                value: import("./warden.intent/module").MsgNewIntentResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryIntentsResponse({ value }: {
                value: import("./warden.intent/module").QueryIntentsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryActionsByAddressRequest({ value }: {
                value: import("./warden.intent/module").QueryActionsByAddressRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryActionsByAddressResponse({ value }: {
                value: import("./warden.intent/module").QueryActionsByAddressResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgRevokeAction({ value }: {
                value: import("./warden.intent/module").MsgRevokeAction;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./warden.intent/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryIntentByIdResponse({ value }: {
                value: import("./warden.intent/module").QueryIntentByIdResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgApproveAction({ value }: {
                value: import("./warden.intent/module").MsgApproveAction;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgRevokeActionResponse({ value }: {
                value: import("./warden.intent/module").MsgRevokeActionResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
} & {
    WardenWarden: {
        query: import("./warden.warden/rest").Api<unknown>;
        tx: {
            sendMsgAddKeychainParty({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgAddKeychainParty;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryKeyRequestByIdResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").QueryKeyRequestByIdResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendKeychain({ value, fee, memo }: {
                value: import("./warden.warden/module").Keychain;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgAddKeychainPartyResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgAddKeychainPartyResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryKeyRequestsResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").QueryKeyRequestsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySignatureRequestsRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").QuerySignatureRequestsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendKeyRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").KeyRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateSpace({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgUpdateSpace;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgFulfilSignatureRequestResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgFulfilSignatureRequestResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryKeychainByIdRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").QueryKeychainByIdRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendSignRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").SignRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgNewSignTransactionRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgNewSignTransactionRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendParams({ value, fee, memo }: {
                value: import("./warden.warden/module").Params;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryKeyRequestsRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").QueryKeyRequestsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendSpace({ value, fee, memo }: {
                value: import("./warden.warden/module").Space;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgNewSpace({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgNewSpace;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateKeychainResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgUpdateKeychainResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgNewSignTransactionRequestResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgNewSignTransactionRequestResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySpaceByIdResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").QuerySpaceByIdResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendWalletKeyResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").WalletKeyResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySignatureRequestsResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").QuerySignatureRequestsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").QueryParamsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySpacesResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").QuerySpacesResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendSignTransactionRequestResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").SignTransactionRequestResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParamsResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgUpdateParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMetadataEthereum({ value, fee, memo }: {
                value: import("./warden.warden/module").MetadataEthereum;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySpacesByOwnerRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").QuerySpacesByOwnerRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySignatureRequestByIdRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").QuerySignatureRequestByIdRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgAddSpaceOwnerResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgAddSpaceOwnerResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgFulfilSignatureRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgFulfilSignatureRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendGenesisState({ value, fee, memo }: {
                value: import("./warden.warden/module").GenesisState;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendKey({ value, fee, memo }: {
                value: import("./warden.warden/module").Key;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgNewKeyRequestResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgNewKeyRequestResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySignTransactionRequestsRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").QuerySignTransactionRequestsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySignTransactionRequestsResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").QuerySignTransactionRequestsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgNewKeychainResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgNewKeychainResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgNewSignatureRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgNewSignatureRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySpacesRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").QuerySpacesRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryKeysResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").QueryKeysResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySignatureRequestByIdResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").QuerySignatureRequestByIdResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgSignedData({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgSignedData;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryParamsResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").QueryParamsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryKeychainsRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").QueryKeychainsRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendSignTransactionRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").SignTransactionRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgNewSpaceResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgNewSpaceResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgRemoveSpaceOwner({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgRemoveSpaceOwner;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgNewKey({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgNewKey;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryKeysRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").QueryKeysRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgRemoveSpaceOwnerResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgRemoveSpaceOwnerResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgNewKeychain({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgNewKeychain;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateKeychain({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgUpdateKeychain;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateKeyRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgUpdateKeyRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryKeyRequestByIdRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").QueryKeyRequestByIdRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySignTransactionRequestByIdRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").QuerySignTransactionRequestByIdRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySignTransactionRequestByIdResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").QuerySignTransactionRequestByIdResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgAddSpaceOwner({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgAddSpaceOwner;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateSpaceResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgUpdateSpaceResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgNewKeyRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgNewKeyRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQuerySpaceByIdRequest({ value, fee, memo }: {
                value: import("./warden.warden/module").QuerySpaceByIdRequest;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryKeychainByIdResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").QueryKeychainByIdResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateParams({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgUpdateParams;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendKeychainFees({ value, fee, memo }: {
                value: import("./warden.warden/module").KeychainFees;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgUpdateKeyRequestResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgUpdateKeyRequestResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendMsgNewSignatureRequestResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").MsgNewSignatureRequestResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendQueryKeychainsResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").QueryKeychainsResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            sendKeyResponse({ value, fee, memo }: {
                value: import("./warden.warden/module").KeyResponse;
                fee?: import("@cosmjs/amino").StdFee;
                memo?: string;
            }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
            msgAddKeychainParty({ value }: {
                value: import("./warden.warden/module").MsgAddKeychainParty;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryKeyRequestByIdResponse({ value }: {
                value: import("./warden.warden/module").QueryKeyRequestByIdResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            keychain({ value }: {
                value: import("./warden.warden/module").Keychain;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgAddKeychainPartyResponse({ value }: {
                value: import("./warden.warden/module").MsgAddKeychainPartyResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryKeyRequestsResponse({ value }: {
                value: import("./warden.warden/module").QueryKeyRequestsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySignatureRequestsRequest({ value }: {
                value: import("./warden.warden/module").QuerySignatureRequestsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            keyRequest({ value }: {
                value: import("./warden.warden/module").KeyRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateSpace({ value }: {
                value: import("./warden.warden/module").MsgUpdateSpace;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgFulfilSignatureRequestResponse({ value }: {
                value: import("./warden.warden/module").MsgFulfilSignatureRequestResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryKeychainByIdRequest({ value }: {
                value: import("./warden.warden/module").QueryKeychainByIdRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            signRequest({ value }: {
                value: import("./warden.warden/module").SignRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgNewSignTransactionRequest({ value }: {
                value: import("./warden.warden/module").MsgNewSignTransactionRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            params({ value }: {
                value: import("./warden.warden/module").Params;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryKeyRequestsRequest({ value }: {
                value: import("./warden.warden/module").QueryKeyRequestsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            space({ value }: {
                value: import("./warden.warden/module").Space;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgNewSpace({ value }: {
                value: import("./warden.warden/module").MsgNewSpace;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateKeychainResponse({ value }: {
                value: import("./warden.warden/module").MsgUpdateKeychainResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgNewSignTransactionRequestResponse({ value }: {
                value: import("./warden.warden/module").MsgNewSignTransactionRequestResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySpaceByIdResponse({ value }: {
                value: import("./warden.warden/module").QuerySpaceByIdResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            walletKeyResponse({ value }: {
                value: import("./warden.warden/module").WalletKeyResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySignatureRequestsResponse({ value }: {
                value: import("./warden.warden/module").QuerySignatureRequestsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsRequest({ value }: {
                value: import("./warden.warden/module").QueryParamsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySpacesResponse({ value }: {
                value: import("./warden.warden/module").QuerySpacesResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            signTransactionRequestResponse({ value }: {
                value: import("./warden.warden/module").SignTransactionRequestResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParamsResponse({ value }: {
                value: import("./warden.warden/module").MsgUpdateParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            metadataEthereum({ value }: {
                value: import("./warden.warden/module").MetadataEthereum;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySpacesByOwnerRequest({ value }: {
                value: import("./warden.warden/module").QuerySpacesByOwnerRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySignatureRequestByIdRequest({ value }: {
                value: import("./warden.warden/module").QuerySignatureRequestByIdRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgAddSpaceOwnerResponse({ value }: {
                value: import("./warden.warden/module").MsgAddSpaceOwnerResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgFulfilSignatureRequest({ value }: {
                value: import("./warden.warden/module").MsgFulfilSignatureRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            genesisState({ value }: {
                value: import("./warden.warden/module").GenesisState;
            }): import("@cosmjs/proto-signing").EncodeObject;
            key({ value }: {
                value: import("./warden.warden/module").Key;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgNewKeyRequestResponse({ value }: {
                value: import("./warden.warden/module").MsgNewKeyRequestResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySignTransactionRequestsRequest({ value }: {
                value: import("./warden.warden/module").QuerySignTransactionRequestsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySignTransactionRequestsResponse({ value }: {
                value: import("./warden.warden/module").QuerySignTransactionRequestsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgNewKeychainResponse({ value }: {
                value: import("./warden.warden/module").MsgNewKeychainResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgNewSignatureRequest({ value }: {
                value: import("./warden.warden/module").MsgNewSignatureRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySpacesRequest({ value }: {
                value: import("./warden.warden/module").QuerySpacesRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryKeysResponse({ value }: {
                value: import("./warden.warden/module").QueryKeysResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySignatureRequestByIdResponse({ value }: {
                value: import("./warden.warden/module").QuerySignatureRequestByIdResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgSignedData({ value }: {
                value: import("./warden.warden/module").MsgSignedData;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryParamsResponse({ value }: {
                value: import("./warden.warden/module").QueryParamsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryKeychainsRequest({ value }: {
                value: import("./warden.warden/module").QueryKeychainsRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            signTransactionRequest({ value }: {
                value: import("./warden.warden/module").SignTransactionRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgNewSpaceResponse({ value }: {
                value: import("./warden.warden/module").MsgNewSpaceResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgRemoveSpaceOwner({ value }: {
                value: import("./warden.warden/module").MsgRemoveSpaceOwner;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgNewKey({ value }: {
                value: import("./warden.warden/module").MsgNewKey;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryKeysRequest({ value }: {
                value: import("./warden.warden/module").QueryKeysRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgRemoveSpaceOwnerResponse({ value }: {
                value: import("./warden.warden/module").MsgRemoveSpaceOwnerResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgNewKeychain({ value }: {
                value: import("./warden.warden/module").MsgNewKeychain;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateKeychain({ value }: {
                value: import("./warden.warden/module").MsgUpdateKeychain;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateKeyRequest({ value }: {
                value: import("./warden.warden/module").MsgUpdateKeyRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryKeyRequestByIdRequest({ value }: {
                value: import("./warden.warden/module").QueryKeyRequestByIdRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySignTransactionRequestByIdRequest({ value }: {
                value: import("./warden.warden/module").QuerySignTransactionRequestByIdRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySignTransactionRequestByIdResponse({ value }: {
                value: import("./warden.warden/module").QuerySignTransactionRequestByIdResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgAddSpaceOwner({ value }: {
                value: import("./warden.warden/module").MsgAddSpaceOwner;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateSpaceResponse({ value }: {
                value: import("./warden.warden/module").MsgUpdateSpaceResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgNewKeyRequest({ value }: {
                value: import("./warden.warden/module").MsgNewKeyRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            querySpaceByIdRequest({ value }: {
                value: import("./warden.warden/module").QuerySpaceByIdRequest;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryKeychainByIdResponse({ value }: {
                value: import("./warden.warden/module").QueryKeychainByIdResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateParams({ value }: {
                value: import("./warden.warden/module").MsgUpdateParams;
            }): import("@cosmjs/proto-signing").EncodeObject;
            keychainFees({ value }: {
                value: import("./warden.warden/module").KeychainFees;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgUpdateKeyRequestResponse({ value }: {
                value: import("./warden.warden/module").MsgUpdateKeyRequestResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            msgNewSignatureRequestResponse({ value }: {
                value: import("./warden.warden/module").MsgNewSignatureRequestResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            queryKeychainsResponse({ value }: {
                value: import("./warden.warden/module").QueryKeychainsResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
            keyResponse({ value }: {
                value: import("./warden.warden/module").KeyResponse;
            }): import("@cosmjs/proto-signing").EncodeObject;
        };
        structure: Record<string, unknown>;
        registry: [string, import("@cosmjs/proto-signing").GeneratedType][];
        updateTX(client: IgniteClient): void;
    };
}>;
declare const registry: Registry;
export { Client, registry, MissingWalletError };
