import { Bytes } from "web3";

export interface INewSignatureRequest {
  signedData: Bytes;
  dataForSigning: Bytes;
}
