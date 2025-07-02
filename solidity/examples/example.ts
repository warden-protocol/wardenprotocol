import { ethers } from "ethers";
import dotenv from 'dotenv'; 
import crypto from 'crypto';

async function main() {
    dotenv.config();
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const mnemonicWallet = ethers.Wallet.fromPhrase(process.env.MNEMONIC as string);
    const privateKey =  mnemonicWallet.privateKey;
    const wallet = new ethers.Wallet(privateKey, provider);

    const contractAddress = process.env.YOUR_CONTRACT_ADDRESS as string; // Replace with your contract address
    const abi = [
        "function addInteraction(bytes32 txHash, string network, uint8 transactionType) public",
        "function getInteraction(string network, address account, bytes32 txHash) public view returns (uint8)"
    ];

    const contract = new ethers.Contract(contractAddress, abi, wallet);

    const storedTxHash = crypto.randomUUID();
    console.log("Stored Transaction Hash:", storedTxHash);

    const txHash = ethers.keccak256(ethers.toUtf8Bytes(storedTxHash));
    const network = "testNetwork1";
    const transactionType = 2; // Example transaction type

    const tx = await contract.addInteraction(txHash, network, transactionType);
    console.log("Transaction sent:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction mined:", receipt);

    // Call getInteraction
    const interaction = await contract.getInteraction(network, wallet.address, txHash);
    console.log("Retrieved interaction:", interaction);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
