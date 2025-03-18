import axios from "axios";
import { ExecuteSignedQuotePayload, ExecuteSignedQuoteParams, GetSupertransactionReceiptPayload } from "@biconomy/abstractjs";
import { DEFAULT_MEE_NODE_URL } from "../types/biconomy/constants.js";
import { Hex } from "viem";

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
    // todo: getSupertransactionReceipt
    const response = await axios.get<GetSupertransactionReceiptPayload>(`${this.url}/v1/explorer/${hash}`);
    
    return false;
  }
}