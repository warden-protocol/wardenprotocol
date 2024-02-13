import _m0 from "protobufjs/minimal";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { PacketId } from "../../../core/channel/v1/channel";
export declare const protobufPackage = "ibc.applications.fee.v1";
/** Fee defines the ICS29 receive, acknowledgement and timeout fees */
export interface Fee {
    /** the packet receive fee */
    recvFee: Coin[];
    /** the packet acknowledgement fee */
    ackFee: Coin[];
    /** the packet timeout fee */
    timeoutFee: Coin[];
}
/** PacketFee contains ICS29 relayer fees, refund address and optional list of permitted relayers */
export interface PacketFee {
    /** fee encapsulates the recv, ack and timeout fees associated with an IBC packet */
    fee: Fee | undefined;
    /** the refund address for unspent fees */
    refundAddress: string;
    /** optional list of relayers permitted to receive fees */
    relayers: string[];
}
/** PacketFees contains a list of type PacketFee */
export interface PacketFees {
    /** list of packet fees */
    packetFees: PacketFee[];
}
/** IdentifiedPacketFees contains a list of type PacketFee and associated PacketId */
export interface IdentifiedPacketFees {
    /** unique packet identifier comprised of the channel ID, port ID and sequence */
    packetId: PacketId | undefined;
    /** list of packet fees */
    packetFees: PacketFee[];
}
export declare const Fee: {
    encode(message: Fee, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Fee;
    fromJSON(object: any): Fee;
    toJSON(message: Fee): unknown;
    create<I extends {
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
        } & { [K in Exclude<keyof I["recvFee"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["recvFee"], keyof {
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
        } & { [K_2 in Exclude<keyof I["ackFee"][number], keyof Coin>]: never; })[] & { [K_3 in Exclude<keyof I["ackFee"], keyof {
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
        } & { [K_4 in Exclude<keyof I["timeoutFee"][number], keyof Coin>]: never; })[] & { [K_5 in Exclude<keyof I["timeoutFee"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_6 in Exclude<keyof I, keyof Fee>]: never; }>(base?: I): Fee;
    fromPartial<I_1 extends {
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
        } & { [K_7 in Exclude<keyof I_1["recvFee"][number], keyof Coin>]: never; })[] & { [K_8 in Exclude<keyof I_1["recvFee"], keyof {
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
        } & { [K_9 in Exclude<keyof I_1["ackFee"][number], keyof Coin>]: never; })[] & { [K_10 in Exclude<keyof I_1["ackFee"], keyof {
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
        } & { [K_11 in Exclude<keyof I_1["timeoutFee"][number], keyof Coin>]: never; })[] & { [K_12 in Exclude<keyof I_1["timeoutFee"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_13 in Exclude<keyof I_1, keyof Fee>]: never; }>(object: I_1): Fee;
};
export declare const PacketFee: {
    encode(message: PacketFee, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PacketFee;
    fromJSON(object: any): PacketFee;
    toJSON(message: PacketFee): unknown;
    create<I extends {
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
            } & { [K in Exclude<keyof I["fee"]["recvFee"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["fee"]["recvFee"], keyof {
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
            } & { [K_2 in Exclude<keyof I["fee"]["ackFee"][number], keyof Coin>]: never; })[] & { [K_3 in Exclude<keyof I["fee"]["ackFee"], keyof {
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
            } & { [K_4 in Exclude<keyof I["fee"]["timeoutFee"][number], keyof Coin>]: never; })[] & { [K_5 in Exclude<keyof I["fee"]["timeoutFee"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_6 in Exclude<keyof I["fee"], keyof Fee>]: never; };
        refundAddress?: string;
        relayers?: string[] & string[] & { [K_7 in Exclude<keyof I["relayers"], keyof string[]>]: never; };
    } & { [K_8 in Exclude<keyof I, keyof PacketFee>]: never; }>(base?: I): PacketFee;
    fromPartial<I_1 extends {
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
            } & { [K_9 in Exclude<keyof I_1["fee"]["recvFee"][number], keyof Coin>]: never; })[] & { [K_10 in Exclude<keyof I_1["fee"]["recvFee"], keyof {
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
            } & { [K_11 in Exclude<keyof I_1["fee"]["ackFee"][number], keyof Coin>]: never; })[] & { [K_12 in Exclude<keyof I_1["fee"]["ackFee"], keyof {
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
            } & { [K_13 in Exclude<keyof I_1["fee"]["timeoutFee"][number], keyof Coin>]: never; })[] & { [K_14 in Exclude<keyof I_1["fee"]["timeoutFee"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_15 in Exclude<keyof I_1["fee"], keyof Fee>]: never; };
        refundAddress?: string;
        relayers?: string[] & string[] & { [K_16 in Exclude<keyof I_1["relayers"], keyof string[]>]: never; };
    } & { [K_17 in Exclude<keyof I_1, keyof PacketFee>]: never; }>(object: I_1): PacketFee;
};
export declare const PacketFees: {
    encode(message: PacketFees, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PacketFees;
    fromJSON(object: any): PacketFees;
    toJSON(message: PacketFees): unknown;
    create<I extends {
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
                } & { [K in Exclude<keyof I["packetFees"][number]["fee"]["recvFee"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["packetFees"][number]["fee"]["recvFee"], keyof {
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
                } & { [K_2 in Exclude<keyof I["packetFees"][number]["fee"]["ackFee"][number], keyof Coin>]: never; })[] & { [K_3 in Exclude<keyof I["packetFees"][number]["fee"]["ackFee"], keyof {
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
                } & { [K_4 in Exclude<keyof I["packetFees"][number]["fee"]["timeoutFee"][number], keyof Coin>]: never; })[] & { [K_5 in Exclude<keyof I["packetFees"][number]["fee"]["timeoutFee"], keyof {
                    denom?: string;
                    amount?: string;
                }[]>]: never; };
            } & { [K_6 in Exclude<keyof I["packetFees"][number]["fee"], keyof Fee>]: never; };
            refundAddress?: string;
            relayers?: string[] & string[] & { [K_7 in Exclude<keyof I["packetFees"][number]["relayers"], keyof string[]>]: never; };
        } & { [K_8 in Exclude<keyof I["packetFees"][number], keyof PacketFee>]: never; })[] & { [K_9 in Exclude<keyof I["packetFees"], keyof {
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
    } & { [K_10 in Exclude<keyof I, "packetFees">]: never; }>(base?: I): PacketFees;
    fromPartial<I_1 extends {
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
                } & { [K_11 in Exclude<keyof I_1["packetFees"][number]["fee"]["recvFee"][number], keyof Coin>]: never; })[] & { [K_12 in Exclude<keyof I_1["packetFees"][number]["fee"]["recvFee"], keyof {
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
                } & { [K_13 in Exclude<keyof I_1["packetFees"][number]["fee"]["ackFee"][number], keyof Coin>]: never; })[] & { [K_14 in Exclude<keyof I_1["packetFees"][number]["fee"]["ackFee"], keyof {
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
                } & { [K_15 in Exclude<keyof I_1["packetFees"][number]["fee"]["timeoutFee"][number], keyof Coin>]: never; })[] & { [K_16 in Exclude<keyof I_1["packetFees"][number]["fee"]["timeoutFee"], keyof {
                    denom?: string;
                    amount?: string;
                }[]>]: never; };
            } & { [K_17 in Exclude<keyof I_1["packetFees"][number]["fee"], keyof Fee>]: never; };
            refundAddress?: string;
            relayers?: string[] & string[] & { [K_18 in Exclude<keyof I_1["packetFees"][number]["relayers"], keyof string[]>]: never; };
        } & { [K_19 in Exclude<keyof I_1["packetFees"][number], keyof PacketFee>]: never; })[] & { [K_20 in Exclude<keyof I_1["packetFees"], keyof {
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
    } & { [K_21 in Exclude<keyof I_1, "packetFees">]: never; }>(object: I_1): PacketFees;
};
export declare const IdentifiedPacketFees: {
    encode(message: IdentifiedPacketFees, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): IdentifiedPacketFees;
    fromJSON(object: any): IdentifiedPacketFees;
    toJSON(message: IdentifiedPacketFees): unknown;
    create<I extends {
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
        } & { [K in Exclude<keyof I["packetId"], keyof PacketId>]: never; };
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
                } & { [K_1 in Exclude<keyof I["packetFees"][number]["fee"]["recvFee"][number], keyof Coin>]: never; })[] & { [K_2 in Exclude<keyof I["packetFees"][number]["fee"]["recvFee"], keyof {
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
                } & { [K_3 in Exclude<keyof I["packetFees"][number]["fee"]["ackFee"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I["packetFees"][number]["fee"]["ackFee"], keyof {
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
                } & { [K_5 in Exclude<keyof I["packetFees"][number]["fee"]["timeoutFee"][number], keyof Coin>]: never; })[] & { [K_6 in Exclude<keyof I["packetFees"][number]["fee"]["timeoutFee"], keyof {
                    denom?: string;
                    amount?: string;
                }[]>]: never; };
            } & { [K_7 in Exclude<keyof I["packetFees"][number]["fee"], keyof Fee>]: never; };
            refundAddress?: string;
            relayers?: string[] & string[] & { [K_8 in Exclude<keyof I["packetFees"][number]["relayers"], keyof string[]>]: never; };
        } & { [K_9 in Exclude<keyof I["packetFees"][number], keyof PacketFee>]: never; })[] & { [K_10 in Exclude<keyof I["packetFees"], keyof {
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
    } & { [K_11 in Exclude<keyof I, keyof IdentifiedPacketFees>]: never; }>(base?: I): IdentifiedPacketFees;
    fromPartial<I_1 extends {
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
        } & { [K_12 in Exclude<keyof I_1["packetId"], keyof PacketId>]: never; };
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
                } & { [K_13 in Exclude<keyof I_1["packetFees"][number]["fee"]["recvFee"][number], keyof Coin>]: never; })[] & { [K_14 in Exclude<keyof I_1["packetFees"][number]["fee"]["recvFee"], keyof {
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
                } & { [K_15 in Exclude<keyof I_1["packetFees"][number]["fee"]["ackFee"][number], keyof Coin>]: never; })[] & { [K_16 in Exclude<keyof I_1["packetFees"][number]["fee"]["ackFee"], keyof {
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
                } & { [K_17 in Exclude<keyof I_1["packetFees"][number]["fee"]["timeoutFee"][number], keyof Coin>]: never; })[] & { [K_18 in Exclude<keyof I_1["packetFees"][number]["fee"]["timeoutFee"], keyof {
                    denom?: string;
                    amount?: string;
                }[]>]: never; };
            } & { [K_19 in Exclude<keyof I_1["packetFees"][number]["fee"], keyof Fee>]: never; };
            refundAddress?: string;
            relayers?: string[] & string[] & { [K_20 in Exclude<keyof I_1["packetFees"][number]["relayers"], keyof string[]>]: never; };
        } & { [K_21 in Exclude<keyof I_1["packetFees"][number], keyof PacketFee>]: never; })[] & { [K_22 in Exclude<keyof I_1["packetFees"], keyof {
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
    } & { [K_23 in Exclude<keyof I_1, keyof IdentifiedPacketFees>]: never; }>(object: I_1): IdentifiedPacketFees;
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
