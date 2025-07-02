import { createWalletClient, createPublicClient, http, parseAbi, encodeFunctionData, decodeFunctionResult, defineChain } from 'viem';
import { mnemonicToAccount } from 'viem/accounts';
import dotenv from 'dotenv';
import crypto from 'crypto';

async function main() {
    dotenv.config();

     const wardenChain = defineChain({
        id: 1337,
        name: "Warden",
        nativeCurrency: {
        decimals: 18,
        name: "Warden",
        symbol: "WARD"
        },
        rpcUrls: {
        default: {
            http: ["http://127.0.0.1:8545"]
        }
    }});

    // Setup provider and wallet
    const rpcUrl = process.env.RPC_URL || "http://127.0.0.1:8545";
    const publicClient = createPublicClient({ transport: http(rpcUrl) });
    const account = mnemonicToAccount(process.env.MNEMONIC as string);
    const walletClient = createWalletClient({ transport: http(rpcUrl), account, chain: wardenChain });

    const contractAddress = process.env.YOUR_CONTRACT_ADDRESS as `0x${string}`; // Replace with your contract address
    const abi = parseAbi([
        "function addInteraction(bytes32 txHash, string network, uint8 transactionType) public",
        "function getInteraction(string network, address account, bytes32 txHash) public view returns (uint8)"
    ]);

    // Generate txHash and network
    const txHash = `0x${crypto.randomBytes(32).toString('hex')}` as `0x${string}`;
    const network = "testNetwork1";
    const transactionType = 2; // Example transaction type

    // Encode function data for addInteraction
    const addInteractionData = encodeFunctionData({
        abi,
        functionName: "addInteraction",
        args: [txHash, network, transactionType],
    });

    // Send transaction
    const txHashSent = await walletClient.sendTransaction({
        to: contractAddress,
        data: addInteractionData,
        chain: wardenChain, // Add chain property to satisfy type requirements
    });
    console.log("Transaction sent:", txHashSent);

    // Wait for transaction receipt
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHashSent });
    console.log("Transaction mined:", receipt);

    // Encode function data for getInteraction
    const getInteractionData = encodeFunctionData({
        abi,
        functionName: "getInteraction",
        args: [network, account.address, txHash],
    });

    // Call getInteraction
    const result = await publicClient.call({
        to: contractAddress,
        data: getInteractionData,
    });

    // Decode result
    const interaction = decodeFunctionResult({
        abi,
        functionName: "getInteraction",
        data: result.data as unknown as `0x${string}`, // Convert to unknown first
    });
    console.log("Retrieved interaction:", interaction);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
