import { ADDRESS_ZERO, ExecuteSignedQuoteParams } from '@biconomy/abstractjs';
import { sepolia } from "viem/chains";
import { http, createPublicClient, createWalletClient, Hex, defineChain, encodeFunctionData, hashMessage, decodeEventLog, parseSignature, serializeSignature, concatHex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { BiconomyMEEClient } from '@warden-automated-orders/blockchain';
// import { privateKeyToAccount } from 'viem/accounts';

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
    console.log("1. Reading key data...");
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
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const deadline = Math.floor(nextYear.getTime() / 1000);

    // Encode swap function calldata
    const swapCalldata = encodeFunctionData({
        abi: [{
            inputs: [
                { name: "amountOutMin", type: "uint256" },
                { name: "path", type: "address[]" },
                { name: "to", type: "address" },
                { name: "deadline", type: "uint256" }
            ],
            name: "swapExactETHForTokens",
            type: "function"
        }],
        functionName: "swapExactETHForTokens",
        args: [
            1n, // amountOutMin
            [
                "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
                "0xE5a71132Ae99691ef35F68459aDde842118A86a5"
            ], // path
            keyAddress, // to
            BigInt(deadline) // deadline
        ]
    });

    const meeClient = new BiconomyMEEClient();
    const targetChainId = sepolia.id;
    // 1. construct super tx
    const instructions = [
        {
            chainId: targetChainId,
            calls: [
                {
                    to: '0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3' as Hex,
                    value: 100000000000000n, // 0.0001
                    data: swapCalldata,
                }
            ]
        },
    ];
    console.log("2. Prepare super tx...");
    console.log(JSON.stringify(instructions, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    , 2));
    console.log("3. Get hash from biconomy node...");
    const quote = await meeClient.getQuote(keyAddress, instructions, {
        address: ADDRESS_ZERO,
        chainId: targetChainId
    });
    console.log('Hash:', quote.hash);
    console.log('4. Prepare EIP191 hash...');
    const signRequestInput = hashMessage({ raw: quote.hash });
    console.log('Hash:', signRequestInput);
    const actionTimeoutHeight = (await wardenChainClient.getBlockNumber()) + 1000n;

    console.log("5. Creating new sign request with prepared hash...");
    const txHash = await wardenWalletClient.writeContract({
        address: "0x0000000000000000000000000000000000000900",
        abi: wardenContractABI,
        functionName: "newSignRequest",
        args: [
            BigInt(keyId), // keyId
            signRequestInput, // input
            [], // analyzers
            "0x", // encryptionKey
            [], // maxKeychainFees
            spaceData.nonce, // nonce
            actionTimeoutHeight, // actionTimeoutHeight
            "any(1, warden.space.owners)", // expectedApproveExpression
            "any(1, warden.space.owners)", // expectedRejectExpression
            0 // broadcastType
        ],
        gas: 5000000n
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
    let signRequestResult;
    if (newSignRequestEvent) {
        const { id } = newSignRequestEvent.args;
        console.log("6. Waiting for sign request to be processed...");
        
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

                signRequestResult = signRequest.result as Hex;
                break;
            }
            
            attempts++;
            if (attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 6000)); // Wait 6 seconds
            }
        }
        
        if (attempts === maxAttempts) {
            throw new Error("Timeout waiting for sign request to be processed");
        }
    } else {
        throw new Error("No NewSignRequest event found in transaction");
    }
    
    console.log(`Received signature ${signRequestResult}`);
    
    const parsedSignature = parseSignature(signRequestResult);
    const signature = serializeSignature({ ...parsedSignature, v: parsedSignature.v ? parsedSignature.v : 27n + BigInt(parsedSignature.yParity) });

    const params: ExecuteSignedQuoteParams = {
    signedQuote: { ...quote, signature: concatHex(["0x00", signature]) }
    };

    console.log("7. Send signed super tx to biconomy node...");
    try {
        const executePayload = await meeClient.executeSignedQuote(params);
        console.log(executePayload);
        
        console.log(`8. Link to super tx: https://meescan.biconomy.io/details/${executePayload.hash}`);
    } catch (e) {
        throw new Error(e.response ? e.response.data : e.message);
    }
}

main().catch(console.error)