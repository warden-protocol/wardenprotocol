import _m0 from "protobufjs/minimal";
import { PacketId } from "../../../core/channel/v1/channel";
import { IdentifiedPacketFees } from "./fee";
export declare const protobufPackage = "ibc.applications.fee.v1";
/** GenesisState defines the ICS29 fee middleware genesis state */
export interface GenesisState {
    /** list of identified packet fees */
    identifiedFees: IdentifiedPacketFees[];
    /** list of fee enabled channels */
    feeEnabledChannels: FeeEnabledChannel[];
    /** list of registered payees */
    registeredPayees: RegisteredPayee[];
    /** list of registered counterparty payees */
    registeredCounterpartyPayees: RegisteredCounterpartyPayee[];
    /** list of forward relayer addresses */
    forwardRelayers: ForwardRelayerAddress[];
}
/** FeeEnabledChannel contains the PortID & ChannelID for a fee enabled channel */
export interface FeeEnabledChannel {
    /** unique port identifier */
    portId: string;
    /** unique channel identifier */
    channelId: string;
}
/** RegisteredPayee contains the relayer address and payee address for a specific channel */
export interface RegisteredPayee {
    /** unique channel identifier */
    channelId: string;
    /** the relayer address */
    relayer: string;
    /** the payee address */
    payee: string;
}
/**
 * RegisteredCounterpartyPayee contains the relayer address and counterparty payee address for a specific channel (used
 * for recv fee distribution)
 */
export interface RegisteredCounterpartyPayee {
    /** unique channel identifier */
    channelId: string;
    /** the relayer address */
    relayer: string;
    /** the counterparty payee address */
    counterpartyPayee: string;
}
/** ForwardRelayerAddress contains the forward relayer address and PacketId used for async acknowledgements */
export interface ForwardRelayerAddress {
    /** the forward relayer address */
    address: string;
    /** unique packet identifer comprised of the channel ID, port ID and sequence */
    packetId: PacketId | undefined;
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        identifiedFees?: {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        }[];
        feeEnabledChannels?: {
            portId?: string;
            channelId?: string;
        }[];
        registeredPayees?: {
            channelId?: string;
            relayer?: string;
            payee?: string;
        }[];
        registeredCounterpartyPayees?: {
            channelId?: string;
            relayer?: string;
            counterpartyPayee?: string;
        }[];
        forwardRelayers?: {
            address?: string;
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
        }[];
    } & {
        identifiedFees?: {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        }[] & ({
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        } & {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & { [K in Exclude<keyof I["identifiedFees"][number]["packetId"], keyof PacketId>]: never; };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[] & ({
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            } & {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                } & {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_1 in Exclude<keyof I["identifiedFees"][number]["packetFees"][number]["fee"]["recvFee"][number], keyof import("../../../../cosmos/base/v1beta1/coin").Coin>]: never; })[] & { [K_2 in Exclude<keyof I["identifiedFees"][number]["packetFees"][number]["fee"]["recvFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_3 in Exclude<keyof I["identifiedFees"][number]["packetFees"][number]["fee"]["ackFee"][number], keyof import("../../../../cosmos/base/v1beta1/coin").Coin>]: never; })[] & { [K_4 in Exclude<keyof I["identifiedFees"][number]["packetFees"][number]["fee"]["ackFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_5 in Exclude<keyof I["identifiedFees"][number]["packetFees"][number]["fee"]["timeoutFee"][number], keyof import("../../../../cosmos/base/v1beta1/coin").Coin>]: never; })[] & { [K_6 in Exclude<keyof I["identifiedFees"][number]["packetFees"][number]["fee"]["timeoutFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                } & { [K_7 in Exclude<keyof I["identifiedFees"][number]["packetFees"][number]["fee"], keyof import("./fee").Fee>]: never; };
                refundAddress?: string;
                relayers?: string[] & string[] & { [K_8 in Exclude<keyof I["identifiedFees"][number]["packetFees"][number]["relayers"], keyof string[]>]: never; };
            } & { [K_9 in Exclude<keyof I["identifiedFees"][number]["packetFees"][number], keyof import("./fee").PacketFee>]: never; })[] & { [K_10 in Exclude<keyof I["identifiedFees"][number]["packetFees"], keyof {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[]>]: never; };
        } & { [K_11 in Exclude<keyof I["identifiedFees"][number], keyof IdentifiedPacketFees>]: never; })[] & { [K_12 in Exclude<keyof I["identifiedFees"], keyof {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        }[]>]: never; };
        feeEnabledChannels?: {
            portId?: string;
            channelId?: string;
        }[] & ({
            portId?: string;
            channelId?: string;
        } & {
            portId?: string;
            channelId?: string;
        } & { [K_13 in Exclude<keyof I["feeEnabledChannels"][number], keyof FeeEnabledChannel>]: never; })[] & { [K_14 in Exclude<keyof I["feeEnabledChannels"], keyof {
            portId?: string;
            channelId?: string;
        }[]>]: never; };
        registeredPayees?: {
            channelId?: string;
            relayer?: string;
            payee?: string;
        }[] & ({
            channelId?: string;
            relayer?: string;
            payee?: string;
        } & {
            channelId?: string;
            relayer?: string;
            payee?: string;
        } & { [K_15 in Exclude<keyof I["registeredPayees"][number], keyof RegisteredPayee>]: never; })[] & { [K_16 in Exclude<keyof I["registeredPayees"], keyof {
            channelId?: string;
            relayer?: string;
            payee?: string;
        }[]>]: never; };
        registeredCounterpartyPayees?: {
            channelId?: string;
            relayer?: string;
            counterpartyPayee?: string;
        }[] & ({
            channelId?: string;
            relayer?: string;
            counterpartyPayee?: string;
        } & {
            channelId?: string;
            relayer?: string;
            counterpartyPayee?: string;
        } & { [K_17 in Exclude<keyof I["registeredCounterpartyPayees"][number], keyof RegisteredCounterpartyPayee>]: never; })[] & { [K_18 in Exclude<keyof I["registeredCounterpartyPayees"], keyof {
            channelId?: string;
            relayer?: string;
            counterpartyPayee?: string;
        }[]>]: never; };
        forwardRelayers?: {
            address?: string;
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
        }[] & ({
            address?: string;
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
        } & {
            address?: string;
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & { [K_19 in Exclude<keyof I["forwardRelayers"][number]["packetId"], keyof PacketId>]: never; };
        } & { [K_20 in Exclude<keyof I["forwardRelayers"][number], keyof ForwardRelayerAddress>]: never; })[] & { [K_21 in Exclude<keyof I["forwardRelayers"], keyof {
            address?: string;
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
        }[]>]: never; };
    } & { [K_22 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        identifiedFees?: {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        }[];
        feeEnabledChannels?: {
            portId?: string;
            channelId?: string;
        }[];
        registeredPayees?: {
            channelId?: string;
            relayer?: string;
            payee?: string;
        }[];
        registeredCounterpartyPayees?: {
            channelId?: string;
            relayer?: string;
            counterpartyPayee?: string;
        }[];
        forwardRelayers?: {
            address?: string;
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
        }[];
    } & {
        identifiedFees?: {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        }[] & ({
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        } & {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & { [K_23 in Exclude<keyof I_1["identifiedFees"][number]["packetId"], keyof PacketId>]: never; };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[] & ({
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            } & {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                } & {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_24 in Exclude<keyof I_1["identifiedFees"][number]["packetFees"][number]["fee"]["recvFee"][number], keyof import("../../../../cosmos/base/v1beta1/coin").Coin>]: never; })[] & { [K_25 in Exclude<keyof I_1["identifiedFees"][number]["packetFees"][number]["fee"]["recvFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_26 in Exclude<keyof I_1["identifiedFees"][number]["packetFees"][number]["fee"]["ackFee"][number], keyof import("../../../../cosmos/base/v1beta1/coin").Coin>]: never; })[] & { [K_27 in Exclude<keyof I_1["identifiedFees"][number]["packetFees"][number]["fee"]["ackFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_28 in Exclude<keyof I_1["identifiedFees"][number]["packetFees"][number]["fee"]["timeoutFee"][number], keyof import("../../../../cosmos/base/v1beta1/coin").Coin>]: never; })[] & { [K_29 in Exclude<keyof I_1["identifiedFees"][number]["packetFees"][number]["fee"]["timeoutFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                } & { [K_30 in Exclude<keyof I_1["identifiedFees"][number]["packetFees"][number]["fee"], keyof import("./fee").Fee>]: never; };
                refundAddress?: string;
                relayers?: string[] & string[] & { [K_31 in Exclude<keyof I_1["identifiedFees"][number]["packetFees"][number]["relayers"], keyof string[]>]: never; };
            } & { [K_32 in Exclude<keyof I_1["identifiedFees"][number]["packetFees"][number], keyof import("./fee").PacketFee>]: never; })[] & { [K_33 in Exclude<keyof I_1["identifiedFees"][number]["packetFees"], keyof {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[]>]: never; };
        } & { [K_34 in Exclude<keyof I_1["identifiedFees"][number], keyof IdentifiedPacketFees>]: never; })[] & { [K_35 in Exclude<keyof I_1["identifiedFees"], keyof {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        }[]>]: never; };
        feeEnabledChannels?: {
            portId?: string;
            channelId?: string;
        }[] & ({
            portId?: string;
            channelId?: string;
        } & {
            portId?: string;
            channelId?: string;
        } & { [K_36 in Exclude<keyof I_1["feeEnabledChannels"][number], keyof FeeEnabledChannel>]: never; })[] & { [K_37 in Exclude<keyof I_1["feeEnabledChannels"], keyof {
            portId?: string;
            channelId?: string;
        }[]>]: never; };
        registeredPayees?: {
            channelId?: string;
            relayer?: string;
            payee?: string;
        }[] & ({
            channelId?: string;
            relayer?: string;
            payee?: string;
        } & {
            channelId?: string;
            relayer?: string;
            payee?: string;
        } & { [K_38 in Exclude<keyof I_1["registeredPayees"][number], keyof RegisteredPayee>]: never; })[] & { [K_39 in Exclude<keyof I_1["registeredPayees"], keyof {
            channelId?: string;
            relayer?: string;
            payee?: string;
        }[]>]: never; };
        registeredCounterpartyPayees?: {
            channelId?: string;
            relayer?: string;
            counterpartyPayee?: string;
        }[] & ({
            channelId?: string;
            relayer?: string;
            counterpartyPayee?: string;
        } & {
            channelId?: string;
            relayer?: string;
            counterpartyPayee?: string;
        } & { [K_40 in Exclude<keyof I_1["registeredCounterpartyPayees"][number], keyof RegisteredCounterpartyPayee>]: never; })[] & { [K_41 in Exclude<keyof I_1["registeredCounterpartyPayees"], keyof {
            channelId?: string;
            relayer?: string;
            counterpartyPayee?: string;
        }[]>]: never; };
        forwardRelayers?: {
            address?: string;
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
        }[] & ({
            address?: string;
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
        } & {
            address?: string;
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & { [K_42 in Exclude<keyof I_1["forwardRelayers"][number]["packetId"], keyof PacketId>]: never; };
        } & { [K_43 in Exclude<keyof I_1["forwardRelayers"][number], keyof ForwardRelayerAddress>]: never; })[] & { [K_44 in Exclude<keyof I_1["forwardRelayers"], keyof {
            address?: string;
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
        }[]>]: never; };
    } & { [K_45 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
};
export declare const FeeEnabledChannel: {
    encode(message: FeeEnabledChannel, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): FeeEnabledChannel;
    fromJSON(object: any): FeeEnabledChannel;
    toJSON(message: FeeEnabledChannel): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K in Exclude<keyof I, keyof FeeEnabledChannel>]: never; }>(base?: I): FeeEnabledChannel;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof FeeEnabledChannel>]: never; }>(object: I_1): FeeEnabledChannel;
};
export declare const RegisteredPayee: {
    encode(message: RegisteredPayee, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RegisteredPayee;
    fromJSON(object: any): RegisteredPayee;
    toJSON(message: RegisteredPayee): unknown;
    create<I extends {
        channelId?: string;
        relayer?: string;
        payee?: string;
    } & {
        channelId?: string;
        relayer?: string;
        payee?: string;
    } & { [K in Exclude<keyof I, keyof RegisteredPayee>]: never; }>(base?: I): RegisteredPayee;
    fromPartial<I_1 extends {
        channelId?: string;
        relayer?: string;
        payee?: string;
    } & {
        channelId?: string;
        relayer?: string;
        payee?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof RegisteredPayee>]: never; }>(object: I_1): RegisteredPayee;
};
export declare const RegisteredCounterpartyPayee: {
    encode(message: RegisteredCounterpartyPayee, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RegisteredCounterpartyPayee;
    fromJSON(object: any): RegisteredCounterpartyPayee;
    toJSON(message: RegisteredCounterpartyPayee): unknown;
    create<I extends {
        channelId?: string;
        relayer?: string;
        counterpartyPayee?: string;
    } & {
        channelId?: string;
        relayer?: string;
        counterpartyPayee?: string;
    } & { [K in Exclude<keyof I, keyof RegisteredCounterpartyPayee>]: never; }>(base?: I): RegisteredCounterpartyPayee;
    fromPartial<I_1 extends {
        channelId?: string;
        relayer?: string;
        counterpartyPayee?: string;
    } & {
        channelId?: string;
        relayer?: string;
        counterpartyPayee?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof RegisteredCounterpartyPayee>]: never; }>(object: I_1): RegisteredCounterpartyPayee;
};
export declare const ForwardRelayerAddress: {
    encode(message: ForwardRelayerAddress, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ForwardRelayerAddress;
    fromJSON(object: any): ForwardRelayerAddress;
    toJSON(message: ForwardRelayerAddress): unknown;
    create<I extends {
        address?: string;
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        };
    } & {
        address?: string;
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & { [K in Exclude<keyof I["packetId"], keyof PacketId>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof ForwardRelayerAddress>]: never; }>(base?: I): ForwardRelayerAddress;
    fromPartial<I_1 extends {
        address?: string;
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        };
    } & {
        address?: string;
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & { [K_2 in Exclude<keyof I_1["packetId"], keyof PacketId>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof ForwardRelayerAddress>]: never; }>(object: I_1): ForwardRelayerAddress;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
