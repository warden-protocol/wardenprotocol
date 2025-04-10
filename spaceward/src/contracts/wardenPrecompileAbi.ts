export default (
	{
		abi: [
			{
				anonymous: false,
				inputs: [
					{
						indexed: false,
						internalType: "address",
						name: "newAdmin",
						type: "address",
					},
					{
						indexed: true,
						internalType: "uint64",
						name: "id",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "adminsCount",
						type: "uint64",
					},
				],
				name: "AddKeychainAdmin",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: false,
						internalType: "address",
						name: "newWriter",
						type: "address",
					},
					{
						indexed: true,
						internalType: "uint64",
						name: "id",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "writersCount",
						type: "uint64",
					},
				],
				name: "AddKeychainWriter",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "uint64",
						name: "spaceId",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "address",
						name: "newOwner",
						type: "address",
					},
				],
				name: "AddSpaceOwner",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "uint64",
						name: "id",
						type: "uint64",
					},
				],
				name: "FulfilSignRequest",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "uint64",
						name: "id",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "enum KeyType",
						name: "keyType",
						type: "uint8",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "spaceId",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "keychainId",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "approveTemplateId",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "rejectTemplateId",
						type: "uint64",
					},
				],
				name: "NewKey",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "uint64",
						name: "id",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "spaceId",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "keychainId",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "approveTemplateId",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "rejectTemplateId",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "enum KeyType",
						name: "keyType",
						type: "uint8",
					},
					{
						indexed: false,
						internalType: "address",
						name: "creator",
						type: "address",
					},
				],
				name: "NewKeyRequest",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "uint64",
						name: "id",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "address",
						name: "creator",
						type: "address",
					},
				],
				name: "NewKeychain",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "uint64",
						name: "id",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "keyId",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "address",
						name: "creator",
						type: "address",
					},
					{
						indexed: false,
						internalType: "enum BroadcastType",
						name: "broadcastType",
						type: "uint8",
					},
				],
				name: "NewSignRequest",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "uint64",
						name: "id",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "address",
						name: "creator",
						type: "address",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "ownersCount",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "approveAdminTemplateId",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "rejectAdminTemplateId",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "approveSignTemplateId",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "rejectSignTemplateId",
						type: "uint64",
					},
				],
				name: "NewSpace",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "uint64",
						name: "id",
						type: "uint64",
					},
				],
				name: "RejectKeyRequest",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "uint64",
						name: "id",
						type: "uint64",
					},
				],
				name: "RejectSignRequest",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "uint64",
						name: "keychainId",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "address",
						name: "admin",
						type: "address",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "adminsCount",
						type: "uint64",
					},
				],
				name: "RemoveKeychainAdmin",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "uint64",
						name: "spaceId",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "address",
						name: "removedOwner",
						type: "address",
					},
				],
				name: "RemoveSpaceOwner",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "uint64",
						name: "id",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "approveTemplateId",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "rejectTemplateId",
						type: "uint64",
					},
				],
				name: "UpdateKey",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "uint64",
						name: "id",
						type: "uint64",
					},
					{
						components: [
							{
								components: [
									{
										internalType: "string",
										name: "denom",
										type: "string",
									},
									{
										internalType: "uint256",
										name: "amount",
										type: "uint256",
									},
								],
								internalType: "struct Types.Coin[]",
								name: "keyReq",
								type: "tuple[]",
							},
							{
								components: [
									{
										internalType: "string",
										name: "denom",
										type: "string",
									},
									{
										internalType: "uint256",
										name: "amount",
										type: "uint256",
									},
								],
								internalType: "struct Types.Coin[]",
								name: "sigReq",
								type: "tuple[]",
							},
						],
						indexed: false,
						internalType: "struct KeychainFees",
						name: "keychainFees",
						type: "tuple",
					},
				],
				name: "UpdateKeychain",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "uint64",
						name: "spaceId",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "approveAdminTemplateId",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "rejectAdminTemplateId",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "approveSignTemplateId",
						type: "uint64",
					},
					{
						indexed: false,
						internalType: "uint64",
						name: "rejectSignTemplateId",
						type: "uint64",
					},
				],
				name: "UpdateSpace",
				type: "event",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "keychainId",
						type: "uint64",
					},
					{
						internalType: "address",
						name: "newAdmin",
						type: "address",
					},
				],
				name: "addKeychainAdmin",
				outputs: [
					{
						internalType: "bool",
						name: "success",
						type: "bool",
					},
				],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "keychainId",
						type: "uint64",
					},
					{
						internalType: "address",
						name: "newWriter",
						type: "address",
					},
				],
				name: "addKeychainWriter",
				outputs: [
					{
						internalType: "bool",
						name: "success",
						type: "bool",
					},
				],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "spaceId",
						type: "uint64",
					},
					{
						internalType: "address",
						name: "newOwner",
						type: "address",
					},
					{
						internalType: "uint64",
						name: "nonce",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "actionTimeoutHeight",
						type: "uint64",
					},
					{
						internalType: "string",
						name: "expectedApproveExpression",
						type: "string",
					},
					{
						internalType: "string",
						name: "expectedRejectExpression",
						type: "string",
					},
				],
				name: "addSpaceOwner",
				outputs: [
					{
						internalType: "bool",
						name: "success",
						type: "bool",
					},
				],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						components: [
							{
								internalType: "bytes",
								name: "key",
								type: "bytes",
							},
							{
								internalType: "uint64",
								name: "offset",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "limit",
								type: "uint64",
							},
							{
								internalType: "bool",
								name: "countTotal",
								type: "bool",
							},
							{
								internalType: "bool",
								name: "reverse",
								type: "bool",
							},
						],
						internalType: "struct Types.PageRequest",
						name: "pageRequest",
						type: "tuple",
					},
					{
						internalType: "int32[]",
						name: "deriveAddresses",
						type: "int32[]",
					},
				],
				name: "allKeys",
				outputs: [
					{
						components: [
							{
								components: [
									{
										internalType: "uint64",
										name: "id",
										type: "uint64",
									},
									{
										internalType: "uint64",
										name: "spaceId",
										type: "uint64",
									},
									{
										internalType: "uint64",
										name: "keychainId",
										type: "uint64",
									},
									{
										internalType: "enum KeyType",
										name: "keyType",
										type: "uint8",
									},
									{
										internalType: "bytes",
										name: "publicKey",
										type: "bytes",
									},
									{
										internalType: "uint64",
										name: "approveTemplateId",
										type: "uint64",
									},
									{
										internalType: "uint64",
										name: "rejectTemplateId",
										type: "uint64",
									},
								],
								internalType: "struct Key",
								name: "key",
								type: "tuple",
							},
							{
								components: [
									{
										internalType: "string",
										name: "addressValue",
										type: "string",
									},
									{
										internalType: "enum AddressType",
										name: "addressType",
										type: "uint8",
									},
								],
								internalType: "struct AddressesResponse[]",
								name: "addresses",
								type: "tuple[]",
							},
						],
						internalType: "struct KeyResponse[]",
						name: "keys",
						type: "tuple[]",
					},
					{
						components: [
							{
								internalType: "bytes",
								name: "nextKey",
								type: "bytes",
							},
							{
								internalType: "uint64",
								name: "total",
								type: "uint64",
							},
						],
						internalType: "struct Types.PageResponse",
						name: "pageResponse",
						type: "tuple",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "requestId",
						type: "uint64",
					},
					{
						internalType: "bytes",
						name: "pubKey",
						type: "bytes",
					},
				],
				name: "fulfilKeyRequest",
				outputs: [
					{
						internalType: "bool",
						name: "success",
						type: "bool",
					},
				],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "requestId",
						type: "uint64",
					},
					{
						internalType: "bytes",
						name: "signedData",
						type: "bytes",
					},
				],
				name: "fulfilSignRequest",
				outputs: [
					{
						internalType: "bool",
						name: "success",
						type: "bool",
					},
				],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "id",
						type: "uint64",
					},
					{
						internalType: "int32[]",
						name: "deriveAddresses",
						type: "int32[]",
					},
				],
				name: "keyById",
				outputs: [
					{
						components: [
							{
								components: [
									{
										internalType: "uint64",
										name: "id",
										type: "uint64",
									},
									{
										internalType: "uint64",
										name: "spaceId",
										type: "uint64",
									},
									{
										internalType: "uint64",
										name: "keychainId",
										type: "uint64",
									},
									{
										internalType: "enum KeyType",
										name: "keyType",
										type: "uint8",
									},
									{
										internalType: "bytes",
										name: "publicKey",
										type: "bytes",
									},
									{
										internalType: "uint64",
										name: "approveTemplateId",
										type: "uint64",
									},
									{
										internalType: "uint64",
										name: "rejectTemplateId",
										type: "uint64",
									},
								],
								internalType: "struct Key",
								name: "key",
								type: "tuple",
							},
							{
								components: [
									{
										internalType: "string",
										name: "addressValue",
										type: "string",
									},
									{
										internalType: "enum AddressType",
										name: "addressType",
										type: "uint8",
									},
								],
								internalType: "struct AddressesResponse[]",
								name: "addresses",
								type: "tuple[]",
							},
						],
						internalType: "struct KeyResponse",
						name: "key",
						type: "tuple",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "id",
						type: "uint64",
					},
				],
				name: "keyRequestById",
				outputs: [
					{
						components: [
							{
								internalType: "uint64",
								name: "id",
								type: "uint64",
							},
							{
								internalType: "address",
								name: "creator",
								type: "address",
							},
							{
								internalType: "uint64",
								name: "spaceId",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "keychainId",
								type: "uint64",
							},
							{
								internalType: "enum KeyType",
								name: "keyType",
								type: "uint8",
							},
							{
								internalType: "enum KeyRequestStatus",
								name: "status",
								type: "uint8",
							},
							{
								internalType: "string",
								name: "rejectReason",
								type: "string",
							},
							{
								internalType: "uint64",
								name: "approveTemplateId",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "rejectTemplateId",
								type: "uint64",
							},
							{
								components: [
									{
										internalType: "string",
										name: "denom",
										type: "string",
									},
									{
										internalType: "uint256",
										name: "amount",
										type: "uint256",
									},
								],
								internalType: "struct Types.Coin[]",
								name: "deductedKeychainFees",
								type: "tuple[]",
							},
						],
						internalType: "struct KeyRequest",
						name: "keyRequest",
						type: "tuple",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						components: [
							{
								internalType: "bytes",
								name: "key",
								type: "bytes",
							},
							{
								internalType: "uint64",
								name: "offset",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "limit",
								type: "uint64",
							},
							{
								internalType: "bool",
								name: "countTotal",
								type: "bool",
							},
							{
								internalType: "bool",
								name: "reverse",
								type: "bool",
							},
						],
						internalType: "struct Types.PageRequest",
						name: "pageRequest",
						type: "tuple",
					},
					{
						internalType: "uint64",
						name: "keychainId",
						type: "uint64",
					},
					{
						internalType: "enum KeyRequestStatus",
						name: "status",
						type: "uint8",
					},
					{
						internalType: "uint64",
						name: "spaceId",
						type: "uint64",
					},
				],
				name: "keyRequests",
				outputs: [
					{
						components: [
							{
								internalType: "uint64",
								name: "id",
								type: "uint64",
							},
							{
								internalType: "address",
								name: "creator",
								type: "address",
							},
							{
								internalType: "uint64",
								name: "spaceId",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "keychainId",
								type: "uint64",
							},
							{
								internalType: "enum KeyType",
								name: "keyType",
								type: "uint8",
							},
							{
								internalType: "enum KeyRequestStatus",
								name: "status",
								type: "uint8",
							},
							{
								internalType: "string",
								name: "rejectReason",
								type: "string",
							},
							{
								internalType: "uint64",
								name: "approveTemplateId",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "rejectTemplateId",
								type: "uint64",
							},
							{
								components: [
									{
										internalType: "string",
										name: "denom",
										type: "string",
									},
									{
										internalType: "uint256",
										name: "amount",
										type: "uint256",
									},
								],
								internalType: "struct Types.Coin[]",
								name: "deductedKeychainFees",
								type: "tuple[]",
							},
						],
						internalType: "struct KeyRequest[]",
						name: "keyRequests",
						type: "tuple[]",
					},
					{
						components: [
							{
								internalType: "bytes",
								name: "nextKey",
								type: "bytes",
							},
							{
								internalType: "uint64",
								name: "total",
								type: "uint64",
							},
						],
						internalType: "struct Types.PageResponse",
						name: "pageResponse",
						type: "tuple",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "id",
						type: "uint64",
					},
				],
				name: "keychainById",
				outputs: [
					{
						components: [
							{
								internalType: "uint64",
								name: "id",
								type: "uint64",
							},
							{
								internalType: "address",
								name: "creator",
								type: "address",
							},
							{
								internalType: "string",
								name: "name",
								type: "string",
							},
							{
								internalType: "address[]",
								name: "admins",
								type: "address[]",
							},
							{
								internalType: "address[]",
								name: "writers",
								type: "address[]",
							},
							{
								components: [
									{
										components: [
											{
												internalType: "string",
												name: "denom",
												type: "string",
											},
											{
												internalType: "uint256",
												name: "amount",
												type: "uint256",
											},
										],
										internalType: "struct Types.Coin[]",
										name: "keyReq",
										type: "tuple[]",
									},
									{
										components: [
											{
												internalType: "string",
												name: "denom",
												type: "string",
											},
											{
												internalType: "uint256",
												name: "amount",
												type: "uint256",
											},
										],
										internalType: "struct Types.Coin[]",
										name: "sigReq",
										type: "tuple[]",
									},
								],
								internalType: "struct KeychainFees",
								name: "fees",
								type: "tuple",
							},
							{
								internalType: "string",
								name: "description",
								type: "string",
							},
							{
								internalType: "string",
								name: "url",
								type: "string",
							},
							{
								internalType: "string",
								name: "keybaseId",
								type: "string",
							},
						],
						internalType: "struct Keychain",
						name: "keychain",
						type: "tuple",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						components: [
							{
								internalType: "bytes",
								name: "key",
								type: "bytes",
							},
							{
								internalType: "uint64",
								name: "offset",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "limit",
								type: "uint64",
							},
							{
								internalType: "bool",
								name: "countTotal",
								type: "bool",
							},
							{
								internalType: "bool",
								name: "reverse",
								type: "bool",
							},
						],
						internalType: "struct Types.PageRequest",
						name: "pageRequest",
						type: "tuple",
					},
				],
				name: "keychains",
				outputs: [
					{
						components: [
							{
								internalType: "uint64",
								name: "id",
								type: "uint64",
							},
							{
								internalType: "address",
								name: "creator",
								type: "address",
							},
							{
								internalType: "string",
								name: "name",
								type: "string",
							},
							{
								internalType: "address[]",
								name: "admins",
								type: "address[]",
							},
							{
								internalType: "address[]",
								name: "writers",
								type: "address[]",
							},
							{
								components: [
									{
										components: [
											{
												internalType: "string",
												name: "denom",
												type: "string",
											},
											{
												internalType: "uint256",
												name: "amount",
												type: "uint256",
											},
										],
										internalType: "struct Types.Coin[]",
										name: "keyReq",
										type: "tuple[]",
									},
									{
										components: [
											{
												internalType: "string",
												name: "denom",
												type: "string",
											},
											{
												internalType: "uint256",
												name: "amount",
												type: "uint256",
											},
										],
										internalType: "struct Types.Coin[]",
										name: "sigReq",
										type: "tuple[]",
									},
								],
								internalType: "struct KeychainFees",
								name: "fees",
								type: "tuple",
							},
							{
								internalType: "string",
								name: "description",
								type: "string",
							},
							{
								internalType: "string",
								name: "url",
								type: "string",
							},
							{
								internalType: "string",
								name: "keybaseId",
								type: "string",
							},
						],
						internalType: "struct Keychain[]",
						name: "keychains",
						type: "tuple[]",
					},
					{
						components: [
							{
								internalType: "bytes",
								name: "nextKey",
								type: "bytes",
							},
							{
								internalType: "uint64",
								name: "total",
								type: "uint64",
							},
						],
						internalType: "struct Types.PageResponse",
						name: "pageResponse",
						type: "tuple",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						components: [
							{
								internalType: "bytes",
								name: "key",
								type: "bytes",
							},
							{
								internalType: "uint64",
								name: "offset",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "limit",
								type: "uint64",
							},
							{
								internalType: "bool",
								name: "countTotal",
								type: "bool",
							},
							{
								internalType: "bool",
								name: "reverse",
								type: "bool",
							},
						],
						internalType: "struct Types.PageRequest",
						name: "pageRequest",
						type: "tuple",
					},
					{
						internalType: "uint64",
						name: "spaceId",
						type: "uint64",
					},
					{
						internalType: "int32[]",
						name: "deriveAddresses",
						type: "int32[]",
					},
				],
				name: "keysBySpaceId",
				outputs: [
					{
						components: [
							{
								components: [
									{
										internalType: "uint64",
										name: "id",
										type: "uint64",
									},
									{
										internalType: "uint64",
										name: "spaceId",
										type: "uint64",
									},
									{
										internalType: "uint64",
										name: "keychainId",
										type: "uint64",
									},
									{
										internalType: "enum KeyType",
										name: "keyType",
										type: "uint8",
									},
									{
										internalType: "bytes",
										name: "publicKey",
										type: "bytes",
									},
									{
										internalType: "uint64",
										name: "approveTemplateId",
										type: "uint64",
									},
									{
										internalType: "uint64",
										name: "rejectTemplateId",
										type: "uint64",
									},
								],
								internalType: "struct Key",
								name: "key",
								type: "tuple",
							},
							{
								components: [
									{
										internalType: "string",
										name: "addressValue",
										type: "string",
									},
									{
										internalType: "enum AddressType",
										name: "addressType",
										type: "uint8",
									},
								],
								internalType: "struct AddressesResponse[]",
								name: "addresses",
								type: "tuple[]",
							},
						],
						internalType: "struct KeyResponse[]",
						name: "keys",
						type: "tuple[]",
					},
					{
						components: [
							{
								internalType: "bytes",
								name: "nextKey",
								type: "bytes",
							},
							{
								internalType: "uint64",
								name: "total",
								type: "uint64",
							},
						],
						internalType: "struct Types.PageResponse",
						name: "pageResponse",
						type: "tuple",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "spaceId",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "keychainId",
						type: "uint64",
					},
					{
						internalType: "enum KeyType",
						name: "keyType",
						type: "uint8",
					},
					{
						internalType: "uint64",
						name: "approveTemplateId",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "rejectTemplateId",
						type: "uint64",
					},
					{
						components: [
							{
								internalType: "string",
								name: "denom",
								type: "string",
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256",
							},
						],
						internalType: "struct Types.Coin[]",
						name: "maxKeychainFees",
						type: "tuple[]",
					},
					{
						internalType: "uint64",
						name: "nonce",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "actionTimeoutHeight",
						type: "uint64",
					},
					{
						internalType: "string",
						name: "expectedApproveExpression",
						type: "string",
					},
					{
						internalType: "string",
						name: "expectedRejectExpression",
						type: "string",
					},
				],
				name: "newKeyRequest",
				outputs: [
					{
						internalType: "bool",
						name: "success",
						type: "bool",
					},
				],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
					{
						components: [
							{
								components: [
									{
										internalType: "string",
										name: "denom",
										type: "string",
									},
									{
										internalType: "uint256",
										name: "amount",
										type: "uint256",
									},
								],
								internalType: "struct Types.Coin[]",
								name: "keyReq",
								type: "tuple[]",
							},
							{
								components: [
									{
										internalType: "string",
										name: "denom",
										type: "string",
									},
									{
										internalType: "uint256",
										name: "amount",
										type: "uint256",
									},
								],
								internalType: "struct Types.Coin[]",
								name: "sigReq",
								type: "tuple[]",
							},
						],
						internalType: "struct KeychainFees",
						name: "keychainFees",
						type: "tuple",
					},
					{
						internalType: "string",
						name: "description",
						type: "string",
					},
					{
						internalType: "string",
						name: "url",
						type: "string",
					},
					{
						internalType: "string",
						name: "keybaseId",
						type: "string",
					},
				],
				name: "newKeychain",
				outputs: [
					{
						internalType: "uint64",
						name: "id",
						type: "uint64",
					},
				],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "keyId",
						type: "uint64",
					},
					{
						internalType: "bytes",
						name: "input",
						type: "bytes",
					},
					{
						internalType: "bytes[]",
						name: "analyzers",
						type: "bytes[]",
					},
					{
						internalType: "bytes",
						name: "encryptionKey",
						type: "bytes",
					},
					{
						components: [
							{
								internalType: "string",
								name: "denom",
								type: "string",
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256",
							},
						],
						internalType: "struct Types.Coin[]",
						name: "maxKeychainFees",
						type: "tuple[]",
					},
					{
						internalType: "uint64",
						name: "nonce",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "actionTimeoutHeight",
						type: "uint64",
					},
					{
						internalType: "string",
						name: "expectedApproveExpression",
						type: "string",
					},
					{
						internalType: "string",
						name: "expectedRejectExpression",
						type: "string",
					},
					{
						internalType: "enum BroadcastType",
						name: "broadcastType",
						type: "uint8",
					},
				],
				name: "newSignRequest",
				outputs: [
					{
						internalType: "bool",
						name: "success",
						type: "bool",
					},
				],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "approveAdminTemplateId",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "rejectAdminTemplateId",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "approveSignTemplateId",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "rejectSignTemplateId",
						type: "uint64",
					},
					{
						internalType: "address[]",
						name: "additionalOwners",
						type: "address[]",
					},
				],
				name: "newSpace",
				outputs: [
					{
						internalType: "uint64",
						name: "id",
						type: "uint64",
					},
				],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "requestId",
						type: "uint64",
					},
					{
						internalType: "string",
						name: "rejectReason",
						type: "string",
					},
				],
				name: "rejectKeyRequest",
				outputs: [
					{
						internalType: "bool",
						name: "success",
						type: "bool",
					},
				],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "requestId",
						type: "uint64",
					},
					{
						internalType: "string",
						name: "rejectReason",
						type: "string",
					},
				],
				name: "rejectSignRequest",
				outputs: [
					{
						internalType: "bool",
						name: "success",
						type: "bool",
					},
				],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "keychainId",
						type: "uint64",
					},
					{
						internalType: "address",
						name: "admin",
						type: "address",
					},
				],
				name: "removeKeychainAdmin",
				outputs: [
					{
						internalType: "bool",
						name: "success",
						type: "bool",
					},
				],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "spaceId",
						type: "uint64",
					},
					{
						internalType: "address",
						name: "owner",
						type: "address",
					},
					{
						internalType: "uint64",
						name: "nonce",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "actionTimeoutHeight",
						type: "uint64",
					},
					{
						internalType: "string",
						name: "expectedApproveExpression",
						type: "string",
					},
					{
						internalType: "string",
						name: "expectedRejectExpression",
						type: "string",
					},
				],
				name: "removeSpaceOwner",
				outputs: [
					{
						internalType: "bool",
						name: "success",
						type: "bool",
					},
				],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "id",
						type: "uint64",
					},
				],
				name: "signRequestById",
				outputs: [
					{
						components: [
							{
								internalType: "uint64",
								name: "id",
								type: "uint64",
							},
							{
								internalType: "address",
								name: "creator",
								type: "address",
							},
							{
								internalType: "uint64",
								name: "keyId",
								type: "uint64",
							},
							{
								internalType: "bytes",
								name: "dataForSigning",
								type: "bytes",
							},
							{
								internalType: "enum SignRequestStatus",
								name: "status",
								type: "uint8",
							},
							{
								internalType: "bytes",
								name: "result",
								type: "bytes",
							},
							{
								internalType: "bytes",
								name: "encryptionKey",
								type: "bytes",
							},
							{
								components: [
									{
										internalType: "string",
										name: "denom",
										type: "string",
									},
									{
										internalType: "uint256",
										name: "amount",
										type: "uint256",
									},
								],
								internalType: "struct Types.Coin[]",
								name: "deductedKeychainFees",
								type: "tuple[]",
							},
							{
								internalType: "enum BroadcastType",
								name: "broadcastType",
								type: "uint8",
							},
						],
						internalType: "struct SignRequest",
						name: "signRequest",
						type: "tuple",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						components: [
							{
								internalType: "bytes",
								name: "key",
								type: "bytes",
							},
							{
								internalType: "uint64",
								name: "offset",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "limit",
								type: "uint64",
							},
							{
								internalType: "bool",
								name: "countTotal",
								type: "bool",
							},
							{
								internalType: "bool",
								name: "reverse",
								type: "bool",
							},
						],
						internalType: "struct Types.PageRequest",
						name: "pageRequest",
						type: "tuple",
					},
					{
						internalType: "uint64",
						name: "keychainId",
						type: "uint64",
					},
					{
						internalType: "enum SignRequestStatus",
						name: "status",
						type: "uint8",
					},
					{
						internalType: "enum OptionalBroadcastType",
						name: "optionalBroadcastType",
						type: "uint8",
					},
				],
				name: "signRequests",
				outputs: [
					{
						components: [
							{
								internalType: "uint64",
								name: "id",
								type: "uint64",
							},
							{
								internalType: "address",
								name: "creator",
								type: "address",
							},
							{
								internalType: "uint64",
								name: "keyId",
								type: "uint64",
							},
							{
								internalType: "bytes",
								name: "dataForSigning",
								type: "bytes",
							},
							{
								internalType: "enum SignRequestStatus",
								name: "status",
								type: "uint8",
							},
							{
								internalType: "bytes",
								name: "result",
								type: "bytes",
							},
							{
								internalType: "bytes",
								name: "encryptionKey",
								type: "bytes",
							},
							{
								components: [
									{
										internalType: "string",
										name: "denom",
										type: "string",
									},
									{
										internalType: "uint256",
										name: "amount",
										type: "uint256",
									},
								],
								internalType: "struct Types.Coin[]",
								name: "deductedKeychainFees",
								type: "tuple[]",
							},
							{
								internalType: "enum BroadcastType",
								name: "broadcastType",
								type: "uint8",
							},
						],
						internalType: "struct SignRequest[]",
						name: "signRequests",
						type: "tuple[]",
					},
					{
						components: [
							{
								internalType: "bytes",
								name: "nextKey",
								type: "bytes",
							},
							{
								internalType: "uint64",
								name: "total",
								type: "uint64",
							},
						],
						internalType: "struct Types.PageResponse",
						name: "pageResponse",
						type: "tuple",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "id",
						type: "uint64",
					},
				],
				name: "spaceById",
				outputs: [
					{
						components: [
							{
								internalType: "uint64",
								name: "id",
								type: "uint64",
							},
							{
								internalType: "address",
								name: "creator",
								type: "address",
							},
							{
								internalType: "address[]",
								name: "owners",
								type: "address[]",
							},
							{
								internalType: "uint64",
								name: "nonce",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "approveAdminTemplateId",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "rejectAdminTemplateId",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "approveSignTemplateId",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "rejectSignTemplateId",
								type: "uint64",
							},
						],
						internalType: "struct Space",
						name: "space",
						type: "tuple",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						components: [
							{
								internalType: "bytes",
								name: "key",
								type: "bytes",
							},
							{
								internalType: "uint64",
								name: "offset",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "limit",
								type: "uint64",
							},
							{
								internalType: "bool",
								name: "countTotal",
								type: "bool",
							},
							{
								internalType: "bool",
								name: "reverse",
								type: "bool",
							},
						],
						internalType: "struct Types.PageRequest",
						name: "pageRequest",
						type: "tuple",
					},
				],
				name: "spaces",
				outputs: [
					{
						components: [
							{
								internalType: "uint64",
								name: "id",
								type: "uint64",
							},
							{
								internalType: "address",
								name: "creator",
								type: "address",
							},
							{
								internalType: "address[]",
								name: "owners",
								type: "address[]",
							},
							{
								internalType: "uint64",
								name: "nonce",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "approveAdminTemplateId",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "rejectAdminTemplateId",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "approveSignTemplateId",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "rejectSignTemplateId",
								type: "uint64",
							},
						],
						internalType: "struct Space[]",
						name: "spaces",
						type: "tuple[]",
					},
					{
						components: [
							{
								internalType: "bytes",
								name: "nextKey",
								type: "bytes",
							},
							{
								internalType: "uint64",
								name: "total",
								type: "uint64",
							},
						],
						internalType: "struct Types.PageResponse",
						name: "pageResponse",
						type: "tuple",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						components: [
							{
								internalType: "bytes",
								name: "key",
								type: "bytes",
							},
							{
								internalType: "uint64",
								name: "offset",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "limit",
								type: "uint64",
							},
							{
								internalType: "bool",
								name: "countTotal",
								type: "bool",
							},
							{
								internalType: "bool",
								name: "reverse",
								type: "bool",
							},
						],
						internalType: "struct Types.PageRequest",
						name: "pageRequest",
						type: "tuple",
					},
					{
						internalType: "address",
						name: "owner",
						type: "address",
					},
				],
				name: "spacesByOwner",
				outputs: [
					{
						components: [
							{
								internalType: "uint64",
								name: "id",
								type: "uint64",
							},
							{
								internalType: "address",
								name: "creator",
								type: "address",
							},
							{
								internalType: "address[]",
								name: "owners",
								type: "address[]",
							},
							{
								internalType: "uint64",
								name: "nonce",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "approveAdminTemplateId",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "rejectAdminTemplateId",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "approveSignTemplateId",
								type: "uint64",
							},
							{
								internalType: "uint64",
								name: "rejectSignTemplateId",
								type: "uint64",
							},
						],
						internalType: "struct Space[]",
						name: "spaces",
						type: "tuple[]",
					},
					{
						components: [
							{
								internalType: "bytes",
								name: "nextKey",
								type: "bytes",
							},
							{
								internalType: "uint64",
								name: "total",
								type: "uint64",
							},
						],
						internalType: "struct Types.PageResponse",
						name: "pageResponse",
						type: "tuple",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "keyId",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "approveTemplateId",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "rejectTemplateId",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "actionTimeoutHeight",
						type: "uint64",
					},
					{
						internalType: "string",
						name: "expectedApproveExpression",
						type: "string",
					},
					{
						internalType: "string",
						name: "expectedRejectExpression",
						type: "string",
					},
				],
				name: "updateKey",
				outputs: [
					{
						internalType: "bool",
						name: "success",
						type: "bool",
					},
				],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "keychainId",
						type: "uint64",
					},
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
					{
						components: [
							{
								components: [
									{
										internalType: "string",
										name: "denom",
										type: "string",
									},
									{
										internalType: "uint256",
										name: "amount",
										type: "uint256",
									},
								],
								internalType: "struct Types.Coin[]",
								name: "keyReq",
								type: "tuple[]",
							},
							{
								components: [
									{
										internalType: "string",
										name: "denom",
										type: "string",
									},
									{
										internalType: "uint256",
										name: "amount",
										type: "uint256",
									},
								],
								internalType: "struct Types.Coin[]",
								name: "sigReq",
								type: "tuple[]",
							},
						],
						internalType: "struct KeychainFees",
						name: "keychainFees",
						type: "tuple",
					},
					{
						internalType: "string",
						name: "description",
						type: "string",
					},
					{
						internalType: "string",
						name: "url",
						type: "string",
					},
					{
						internalType: "string",
						name: "keybaseId",
						type: "string",
					},
				],
				name: "updateKeychain",
				outputs: [
					{
						internalType: "bool",
						name: "success",
						type: "bool",
					},
				],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "uint64",
						name: "spaceId",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "nonce",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "approveAdminTemplateId",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "rejectAdminTemplateId",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "approveSignTemplateId",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "rejectSignTemplateId",
						type: "uint64",
					},
					{
						internalType: "uint64",
						name: "actionTimeoutHeight",
						type: "uint64",
					},
					{
						internalType: "string",
						name: "expectedApproveExpression",
						type: "string",
					},
					{
						internalType: "string",
						name: "expectedRejectExpression",
						type: "string",
					},
				],
				name: "updateSpace",
				outputs: [
					{
						internalType: "bool",
						name: "success",
						type: "bool",
					},
				],
				stateMutability: "nonpayable",
				type: "function",
			},
		],
	} as const
).abi;
