import { AbiFunction, Hex } from 'viem';

export enum SignRequestStatus {
  /** SIGN_REQUEST_STATUS_UNSPECIFIED - The request is missing the status field. */
  SIGN_REQUEST_STATUS_UNSPECIFIED = 0,
  /**
   * SIGN_REQUEST_STATUS_PENDING - The request is waiting to be fulfilled. This is the initial state of a
   * request.
   */
  SIGN_REQUEST_STATUS_PENDING = 1,
  /** SIGN_REQUEST_STATUS_FULFILLED - The request was fulfilled. This is a final state for a request. */
  SIGN_REQUEST_STATUS_FULFILLED = 2,
  /** SIGN_REQUEST_STATUS_REJECTED - The request was rejected. This is a final state for a request. */
  SIGN_REQUEST_STATUS_REJECTED = 3,
  UNRECOGNIZED = -1
};

export interface IPageRequest {
  key: Hex | undefined;
  offset: bigint | undefined;
  limit: bigint | undefined;
  countTotal: boolean;
  reverse: boolean;
};

export interface ICoin {
  denom: string;
  amount: bigint;
};

export interface ISignRequest {
  id: bigint;
  creator: string;
  keyId: bigint;
  dataForSigning: Hex;
  status: number;
  result: Hex;
  encryptionKey: Hex;
  deductedKeychainFees: ICoin[];
};

export interface IPageResponse {
  nextKey: Hex;
  total: bigint;
};

export interface ISignRequestResponse {
  signRequests: ISignRequest[];
  pageResponse: IPageResponse;
};

export const SignRequestsAbi: AbiFunction = {
  type: "function",
  name: "signRequests",
  inputs: [
    {
      components: [
        {
          internalType: "bytes",
          name: "key",
          type: "bytes"
        },
        {
          internalType: "uint64",
          name: "offset",
          type: "uint64"
        },
        {
          internalType: "uint64",
          name: "limit",
          type: "uint64"
        },
        {
          internalType: "bool",
          name: "countTotal",
          type: "bool"
        },
        {
          internalType: "bool",
          name: "reverse",
          type: "bool"
        }
      ],
      internalType: "struct Types.PageRequest",
      name: "pageRequest",
      type: "tuple"
    },
    {
      internalType: "uint64",
      name: "keychainId",
      type: "uint64"
    },
    {
      internalType: "int32",
      name: "status",
      type: "int32"
    }
  ],
  outputs: [
    {
      components: [
        {
          internalType: "uint64",
          name: "id",
          type: "uint64"
        },
        {
          internalType: "address",
          name: "creator",
          type: "address"
        },
        {
          internalType: "uint64",
          name: "keyId",
          type: "uint64"
        },
        {
          internalType: "bytes",
          name: "dataForSigning",
          type: "bytes"
        },
        {
          internalType: "int32",
          name: "status",
          type: "int32"
        },
        {
          internalType: "bytes",
          name: "result",
          type: "bytes"
        },
        {
          internalType: "bytes",
          name: "encryptionKey",
          type: "bytes"
        },
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
        }
      ],
      internalType: "struct SignRequest[]",
      name: "signRequests",
      type: "tuple[]"
    },
    {
      components: [
        {
          internalType: "bytes",
          name: "nextKey",
          type: "bytes"
        },
        {
          internalType: "uint64",
          name: "total",
          type: "uint64"
        }
      ],
      internalType: "struct Types.PageResponse",
      name: "pageResponse",
      type: "tuple"
    }
  ],
  stateMutability: "view",
};