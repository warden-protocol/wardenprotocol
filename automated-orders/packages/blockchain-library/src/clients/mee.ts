import axios from "axios";
import { 
    ExecuteSignedQuotePayload, 
    ExecuteSignedQuoteParams, 
    GetSupertransactionReceiptPayload, 
    FeeTokenInfo, 
    GetQuoteParams, 
    GetQuotePayload, 
    Instruction, 
    LARGE_DEFAULT_GAS_LIMIT, 
    PaymentInfo, 
    resolveInstructions, 
    toMultichainNexusAccount, 
    MultichainSmartAccount 
} from "@biconomy/abstractjs";
import { DEFAULT_MEE_NODE_URL } from "../types/biconomy/constants.js";
import { 
    GetTransactionType, 
    Hex, 
    IsNarrowable, 
    LocalAccount, 
    SerializeTransactionFn, 
    SignableMessage, 
    TransactionSerializable, 
    TransactionSerialized, 
    TypedData, 
    TypedDataDefinition, 
    extractChain, 
    http 
} from 'viem';
import * as chains from 'viem/chains';

/**
 * Internal structure for submitting a quote request to the MEE service
 * @internal
 */
type QuoteRequest = {
    /** Array of user operations to be executed */
    userOps: {
        /** Address of the account initiating the operation */
        sender: string
        /** Encoded transaction data */
        callData: string
        /** Gas limit for the call execution */
        callGasLimit: string
        /** Account nonce */
        nonce: string
        /** Chain ID where the operation will be executed */
        chainId: string
    }[]
    /** Payment details for the transaction */
    paymentInfo: PaymentInfo
}

export class BiconomyMEEClient {
    private url: string;

    constructor(url: string = DEFAULT_MEE_NODE_URL) {
        this.url = url;
    }

    async executeSignedQuote(params: ExecuteSignedQuoteParams): Promise<ExecuteSignedQuotePayload> {
        const response = await axios.post<ExecuteSignedQuotePayload>(`${this.url}/v1/exec`, params, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    }

    async transactionExists(hash: Hex): Promise<boolean> {
        const response = await axios.get<GetSupertransactionReceiptPayload>(`${this.url}/v1/explorer/${hash}`);

        if (response.status === 200) {
            return true;
        }
        return false;
    }

    public async getQuote(
        address: Hex,
        instructions: Instruction[],
        feeToken: FeeTokenInfo,
    ): Promise<GetQuotePayload> {
        const params: GetQuoteParams = {
            instructions: instructions,
            feeToken: feeToken,
        }

        const uniqueChainIds = instructions.map((instruction) => instruction.chainId);
        const resolvedChains = uniqueChainIds.map(chainId => extractChain({
            chains: Object.values(chains),
            /* eslint-disable @typescript-eslint/no-explicit-any */
            id: chainId as any,
            /* eslint-enable @typescript-eslint/no-explicit-any */
        }));
        
        const transports = resolvedChains.map(() => http());

        const account = new NoopLocalAccount(address);
        const mcNexus = await toMultichainNexusAccount({
            signer: account,
            chains: resolvedChains,
            transports: transports
        });

        return this.getQuoteInternal(mcNexus, params);
    }

    private async getQuoteInternal(
        account: MultichainSmartAccount,
        parameters: GetQuoteParams
    ): Promise<GetQuotePayload> {
        const {
            account: account_ = account,
            instructions,
            feeToken,
            path = "v1/quote",
            eoa
        } = parameters

        const resolvedInstructions = await resolveInstructions(instructions)
        const validPaymentAccount = account_.deploymentOn(feeToken.chainId)

        if (!validPaymentAccount) {
            throw Error(
                `Account is not deployed on necessary chain(s) ${feeToken.chainId}`
            )
        }

        const userOpResults = await Promise.all(
            resolvedInstructions.map((userOp) => {
                const deployment = account_.deploymentOn(userOp.chainId, true)
                return Promise.all([
                    userOp.calls.length > 1
                        ? deployment.encodeExecuteBatch(userOp.calls)
                        : deployment.encodeExecute(userOp.calls[0]),
                    deployment.getNonce(),
                    deployment.isDeployed(),
                    deployment.getInitCode(),
                    deployment.address,
                    userOp.calls
                        .map((uo) => uo?.gasLimit ?? LARGE_DEFAULT_GAS_LIMIT)
                        .reduce((curr, acc) => curr + acc)
                        .toString(),
                    userOp.chainId.toString()
                ])
            })
        )

        const userOps = userOpResults.map(
            ([
                callData,
                nonce_,
                isAccountDeployed,
                initCode,
                sender,
                callGasLimit,
                chainId
            ]) => ({
                sender,
                callData,
                callGasLimit,
                nonce: nonce_.toString(),
                chainId,
                ...(!isAccountDeployed && initCode ? { initCode } : {})
            })
        )

        const [nonce, isAccountDeployed, initCode] = await Promise.all([
            validPaymentAccount.getNonce(),
            validPaymentAccount.isDeployed(),
            validPaymentAccount.getInitCode()
        ])

        const paymentInfo: PaymentInfo = {
            sender: validPaymentAccount.address,
            token: feeToken.address,
            nonce: nonce.toString(),
            chainId: feeToken.chainId.toString(),
            ...(eoa ? { eoa } : {}),
            ...(!isAccountDeployed && initCode ? { initCode } : {})
        }

        const quoteRequest: QuoteRequest = { userOps, paymentInfo }

        const response = await axios.post<GetQuotePayload>(
            `${this.url}/${path}`,
            quoteRequest,
            { headers: { "Content-Type": "application/json" } }
        );

        return response.data;
    }
}

export class NoopLocalAccount implements LocalAccount {
    constructor(address: Hex) {
        this.address = address;
        this.publicKey = '0x';
        this.source = 'local';
    }

    public readonly address: Hex = '0x';
    public readonly publicKey: Hex = '0x';
    public readonly source: string = '';
    public readonly type = 'local';

    public signMessage({ message }: { message: SignableMessage; }): Promise<Hex> {
        console.log(message);
        throw new Error('Function not implemented.');
    }

    public signTransaction<serializer extends SerializeTransactionFn<TransactionSerializable> = SerializeTransactionFn<TransactionSerializable>, transaction extends Parameters<serializer>[0] = Parameters<serializer>[0]>(
        transac: transaction, options?: { serializer?: serializer | undefined; } | undefined): Promise<IsNarrowable<TransactionSerialized<GetTransactionType<transaction>>, Hex> extends true ? TransactionSerialized<GetTransactionType<transaction>> : Hex> {
        console.log(transac);
        console.log(options);
        throw new Error('Function not implemented.');
    }

    public signTypedData<const typedData extends TypedData | Record<string, unknown>, primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData>(
        parameters: TypedDataDefinition<typedData, primaryType>): Promise<Hex> {
        console.log(parameters);
        throw new Error('Function not implemented.');
    }
}