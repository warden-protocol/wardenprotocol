import { ADDRESS_ZERO, ExecuteSignedQuoteParams } from '@biconomy/abstractjs';
import { arbitrumSepolia, baseSepolia, sepolia } from "viem/chains";
import { http, createPublicClient, createWalletClient, Hex, defineChain, encodeFunctionData, hashMessage, decodeEventLog, parseSignature, serializeSignature, concatHex, serializeTransaction, parseEther, parseGwei, keccak256, encodeAbiParameters } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { BiconomyMEEClient } from '@warden-automated-orders/blockchain';
// import { privateKeyToAccount } from 'viem/accounts';

type WardenContractABI = readonly {
    inputs: readonly { name: string; type: string }[];
    name: string;
    outputs?: readonly { name: string; type: string; components?: readonly { name: string; type: string }[] }[];
    stateMutability?: string;
    type: string;
    anonymous?: boolean;
}[];

async function createAndWaitForSignRequest(
    wardenChainClient: ReturnType<typeof createPublicClient>,
    wardenWalletClient: ReturnType<typeof createWalletClient>,
    keyId: bigint,
    signRequestInput: Hex,
    nonce: bigint,
    wardenContractABI: WardenContractABI
): Promise<Hex> {
    const actionTimeoutHeight = (await wardenChainClient.getBlockNumber()) + 1000n;

    console.log("Creating new sign request...");
    const txHash = await wardenWalletClient.writeContract({
        address: "0x0000000000000000000000000000000000000900",
        abi: wardenContractABI,
        functionName: "newSignRequest",
        args: [
            keyId, // keyId
            signRequestInput, // input
            [], // analyzers
            "0x", // encryptionKey
            [], // maxKeychainFees
            nonce, // nonce
            actionTimeoutHeight, // actionTimeoutHeight
            "any(1, warden.space.owners)", // expectedApproveExpression
            "any(1, warden.space.owners)", // expectedRejectExpression
            0 // broadcastType
        ] as const,
        gas: 5000000n,
        chain: wardenChainClient.chain,
        account: wardenWalletClient.account ?? null
    });
    
    // Wait for transaction receipt
    const receipt = await wardenChainClient.waitForTransactionReceipt({ hash: txHash });
    if (receipt.status === 'reverted') {
        throw new Error("New sign request reverted");
    }
    // Get the NewSignRequest event from the receipt
    const newSignRequestEvent = receipt.logs
        .map(log => {
            try {
                return decodeEventLog({
                    abi: wardenContractABI,
                    data: log.data,
                    topics: log.topics
                });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) {
                return null;
            }
        })
        .find(event => event && event.eventName === 'NewSignRequest');
    
    if (!newSignRequestEvent) {
        throw new Error("No NewSignRequest event found in transaction");
    }

    const eventArgs = newSignRequestEvent.args as unknown;
    if (!eventArgs || typeof eventArgs !== 'object' || !('id' in eventArgs)) {
        throw new Error("Invalid event args structure");
    }
    const { id } = eventArgs as { id: bigint };
    console.log("Waiting for sign request to be processed...");
    
    // Poll for sign request status
    let signRequest;
    let attempts = 0;
    const maxAttempts = 200;
    
    while (attempts < maxAttempts) {
        signRequest = await wardenChainClient.readContract({
            address: "0x0000000000000000000000000000000000000900",
            abi: wardenContractABI,
            functionName: "signRequestById",
            args: [id]
        });
        
        // Status 1 = Pending
        if (signRequest.status !== 1) {
            if (signRequest.status === 3) {
                throw new Error('Sign request rejected');
            }

            return signRequest.result as Hex;
        }
        
        attempts++;
        if (attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 6000)); // Wait 6 seconds
        }
    }
    
    throw new Error("Timeout waiting for sign request to be processed");
}

async function main() {
    const wardenPrivate = process.env.PRIVATE_KEY!;
    const rpc = process.env.RPC!;
    const wardenChainId = parseInt(process.env.CHAIN_ID!, 10);
    const keyId = parseInt(process.env.KEY_ID!, 10);

    const wardenChain = defineChain({
        id: wardenChainId,
        name: 'Warden Protocol',
        network: 'warden',
        nativeCurrency: {
          decimals: 18,
          name: 'Warden',
          symbol: 'WARD',
        },
        rpcUrls: {
          default: {
            http: [rpc],
          },
          public: {
            http: [rpc],
          },
        }
    });
    
    const wardenChainClient = createPublicClient({
        chain: wardenChain,
        transport: http()
    });

    const account = privateKeyToAccount(wardenPrivate as Hex);
    const wardenWalletClient = createWalletClient({
        account,
        chain: wardenChain,
        transport: http()
    });

    // Define the contract ABI for the Warden contract
    const wardenContractABI = [{
        inputs: [
            { name: "keyId", type: "uint64" },
            { name: "keychainIds", type: "int32[]" }
        ],
        name: "keyById",
        outputs: [
            { 
                name: "keyResponse", 
                type: "tuple", 
                components: [
                    {
                        name: "key",
                        type: "tuple",
                        components: [
                            { name: "id", type: "uint64" },
                            { name: "spaceId", type: "uint64" },
                            { name: "keychainId", type: "uint64" },
                            { name: "keyType", type: "uint8" },
                            { name: "publicKey", type: "bytes" },
                            { name: "approveTemplateId", type: "uint64" },
                            { name: "rejectTemplateId", type: "uint64" }
                        ]
                    },
                    {
                        name: "addresses",
                        type: "tuple[]",
                        components: [
                            { name: "addressValue", type: "string" },
                            { name: "addressType", type: "uint8" }
                        ]
                    }
                ]
            }
        ],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [
            { name: "id", type: "uint64" }
        ],
        name: "spaceById",
        outputs: [
            { 
                name: "space", 
                type: "tuple", 
                components: [
                    { name: "id", type: "uint64" },
                    { name: "creator", type: "address" },
                    { name: "owners", type: "address[]" },
                    { name: "nonce", type: "uint64" },
                    { name: "approveAdminTemplateId", type: "uint64" },
                    { name: "rejectAdminTemplateId", type: "uint64" },
                    { name: "approveSignTemplateId", type: "uint64" },
                    { name: "rejectSignTemplateId", type: "uint64" },
                ]
            }
        ],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [
            { name: "keyId", type: "uint64" },
            { name: "input", type: "bytes" },
            { name: "analyzers", type: "bytes[]" },
            { name: "encryptionKey", type: "bytes" },
            { name: "maxKeychainFees", type: "tuple[]", components: [
                { name: "denom", type: "string" },
                { name: "amount", type: "uint256" }
            ]},
            { name: "nonce", type: "uint64" },
            { name: "actionTimeoutHeight", type: "uint64" },
            { name: "expectedApproveExpression", type: "string" },
            { name: "expectedRejectExpression", type: "string" },
            { name: "broadcastType", type: "uint8" }
        ],
        name: "newSignRequest",
        outputs: [
            { name: "success", type: "bool" }
        ],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [
            { name: "id", type: "uint64" }
        ],
        name: "signRequestById",
        outputs: [
            {
                name: "signRequest",
                type: "tuple",
                components: [
                    { name: "id", type: "uint64" },
                    { name: "creator", type: "address" },
                    { name: "keyId", type: "uint64" },
                    { name: "dataForSigning", type: "bytes" },
                    { name: "status", type: "uint8" },
                    { name: "result", type: "bytes" },
                    { name: "encryptionKey", type: "bytes" },
                    {
                        components: [
                          {
                            internalType: "string",
                            name: "denom",
                            type: "string"
                          },
                          {
                            internalType: "uint256",
                            name: "amount",
                            type: "uint256"
                          }
                        ],
                        internalType: "struct Types.Coin[]",
                        name: "deductedKeychainFees",
                        type: "tuple[]"
                    },
                    { name: "broadcastType", type: "uint8" }
                ]
            }
        ],
        stateMutability: "view",
        type: "function"
    }, {
        anonymous: false,
        inputs: [
            { indexed: true, name: "id", type: "uint64" },
            { indexed: false, name: "keyId", type: "uint64" },
            { indexed: false, name: "creator", type: "address" },
            { indexed: false, name: "broadcastType", type: "uint8" }
        ],
        name: "NewSignRequest",
        type: "event"
    }] as const;

    // Read key data from contract
    console.log("Reading key data...");
    const keyResponse = await wardenChainClient.readContract({
        address: "0x0000000000000000000000000000000000000900",
        abi: wardenContractABI,
        functionName: "keyById",
        args: [BigInt(keyId), [1]]
    });
    const keyAddress = keyResponse.addresses[0].addressValue as Hex;
    console.log("Key address:", keyAddress);

    const spaceData = await wardenChainClient.readContract({
        address: "0x0000000000000000000000000000000000000900",
        abi: wardenContractABI,
        functionName: "spaceById",
        args: [keyResponse.key.spaceId]
    });

    // Calculate deadline (timestamp for next year)
    // const nextYear = new Date();
    // nextYear.setFullYear(nextYear.getFullYear() + 1);
    // const deadline = Math.floor(nextYear.getTime() / 1000);

    // Encode swap function calldata
    // const swapCalldata = encodeFunctionData({
    //     abi: [{
    //         inputs: [
    //             { name: "amountOutMin", type: "uint256" },
    //             { name: "path", type: "address[]" },
    //             { name: "to", type: "address" },
    //             { name: "deadline", type: "uint256" }
    //         ],
    //         name: "swapExactETHForTokens",
    //         type: "function"
    //     }],
    //     functionName: "swapExactETHForTokens",
    //     args: [
    //         1n, // amountOutMin
    //         [
    //             "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
    //             "0xE5a71132Ae99691ef35F68459aDde842118A86a5"
    //         ], // path
    //         keyAddress, // to
    //         BigInt(deadline) // deadline
    //     ]
    // });

    const meeClient = new BiconomyMEEClient();
    // const targetChainId = sepolia.id;
    // const targetChain = arbitrumSepolia;
    const targetChain = baseSepolia;
    const targetChainClient = createPublicClient({
        chain: targetChain,
        transport: http()
    });
    // 1. construct super tx
    const value = 1n;
    const instructions = [
        {
            chainId: targetChain.id,
            calls: [
                {
                    to: '0xE85176CeBB04B4f10057BE76c6D95E8CDE583A70' as Hex,
                    value,
                    // data: swapCalldata,
                }
            ]
        },
    ];
    console.log("Prepare super tx...");
    console.log(JSON.stringify(instructions, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    , 2));
    console.log("Get hash from biconomy node...");
    let quote;
    try {
        quote = await meeClient.getQuote(keyAddress, instructions, {
            address: ADDRESS_ZERO,
            chainId: targetChain.id
        });
    }  catch (e) {
        console.log(JSON.stringify(JSON.parse(e.config.data), null, 2));
        throw new Error(JSON.stringify(e.response ? e.response.data : e.message, null, 2));
    }
    console.log('Hash:', quote.hash);

    const spendAmount = BigInt(quote.paymentInfo.tokenWeiAmount) + value;
    const sender = quote.userOps[0].userOp.sender;
    console.log('Estimate sender balance...');
    const senderBalance = await targetChainClient.getBalance({ address: sender });
    let signature;
    if (senderBalance < spendAmount) {
        console.log('Sender has not enough balance, funding by EOA...');
        const keyAddressBalance = await targetChainClient.getBalance({ address: keyAddress });
        if (keyAddressBalance + senderBalance < spendAmount) {
            throw new Error(`not enough balance. need ${spendAmount}, have ${keyAddressBalance + senderBalance}=sender ${senderBalance} + keyAccount ${keyAddressBalance}`);
        }

        const toSend = spendAmount - senderBalance;
        const gas = await targetChainClient.estimateGas({
            account: keyAddress,
            to: sender,
            value: toSend,
            data: quote.hash
        });
        const { maxFeePerGas, maxPriorityFeePerGas } = await targetChainClient.estimateFeesPerGas();
        
        const keyAddressNonce = await targetChainClient.getTransactionCount({ address: keyAddress });
        
        const tx = {
            chainId: targetChain.id,
            gas,
            maxFeePerGas,
            maxPriorityFeePerGas,
            nonce: keyAddressNonce,
            to: sender,
            value: toSend,
            data: quote.hash
        };
        const fundSenderTx = serializeTransaction(tx);

        const fundSenderUnsignedTxHash = keccak256(fundSenderTx);

        const signRequestResult = await createAndWaitForSignRequest(
            wardenChainClient,
            wardenWalletClient,
            BigInt(keyId),
            fundSenderUnsignedTxHash,
            spaceData.nonce,
            wardenContractABI
        );

        // check that transaction succeed
        const parsedSignature = parseSignature(signRequestResult);
        const signedTx = serializeTransaction(tx, parsedSignature);
        console.log("Send funding transaction...");
        const hash = await targetChainClient.sendRawTransaction({
            serializedTransaction: signedTx,
        });
        const receipt = await targetChainClient.waitForTransactionReceipt({ hash });
        if (receipt.status == 'reverted') {
            throw Error(`Funding reverted, receipt: ${JSON.stringify(receipt, (key, value) =>
                typeof value === 'bigint'
                    ? value.toString()
                    : value // return everything else unchanged
            , 2)}`);
        }

        signature = concatHex([
            "0x01", // add "0x01" prefix to denote it's an EOA tx signature
            encodeAbiParameters( // encoded EOA tx hash and the chain id where the EOA tx was executed
              [
                { name: "txHash", type: "bytes32" },
                { name: "chainId", type: "uint256" }
              ],
              [ hash, BigInt(targetChain.id) ]
            )
          ])
    } else {    
        console.log('Prepare EIP191 hash...');
        const signRequestInput = hashMessage({ raw: quote.hash });
        console.log('Hash:', signRequestInput);

        console.log("Creating new sign request with prepared hash...");
        const signRequestResult = await createAndWaitForSignRequest(
            wardenChainClient,
            wardenWalletClient,
            BigInt(keyId),
            signRequestInput,
            spaceData.nonce,
            wardenContractABI
        );

        console.log(`Received signature ${signRequestResult}`);

        const parsedSignature = parseSignature(signRequestResult);
        signature = concatHex(['0x00', serializeSignature({ ...parsedSignature, v: parsedSignature.v ? parsedSignature.v : 27n + BigInt(parsedSignature.yParity) })]);
    }
    const params: ExecuteSignedQuoteParams = {
        signedQuote: { ...quote, signature }
    };

    console.log("Send signed super tx to biconomy node...");
    try {
        const executePayload = await meeClient.executeSignedQuote(params);
        console.log(executePayload);

        console.log(`Link to super tx: https://meescan.biconomy.io/details/${executePayload.hash}`);
    } catch (e) {
        console.log(JSON.stringify(JSON.parse(e.config.data), null, 2));
        throw new Error(JSON.stringify(e.response ? e.response.data : e.message, null, 2));
    }
}

main().catch(console.error)