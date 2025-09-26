import { useCallback, useEffect, useState } from "react";
import { AuthEngineTypes } from "@walletconnect/auth-client";
import { Core } from "@walletconnect/core";

import {
	ProposalTypes,
	PendingRequestTypes,
	SessionTypes,
} from "@walletconnect/types";

import { getSdkError } from "@walletconnect/utils";

import { IWalletKit, WalletKit, WalletKitTypes } from "@reown/walletkit";
import { createGlobalState } from "./state";
import { IndexedDb as Storage } from "@/utils/custom-kv-storage";

interface Web3WalletState {
	w: IWalletKit | null;
	activeSessions: SessionTypes.Struct[];
	sessionProposals: ProposalTypes.Struct[];
	authRequests: AuthEngineTypes.PendingRequest[];
	sessionRequests: PendingRequestTypes.Struct[];
}

const initialState: Web3WalletState = {
	w: null,
	activeSessions: [],
	sessionProposals: [],
	authRequests: [],
	sessionRequests: [],
};

const useWeb3WalletState = createGlobalState("web3wallet-state", initialState);

export function useWeb3Wallet(relayUrl: string) {
	const { data, setData } = useWeb3WalletState();
	const w = data?.w ?? null;
	const sessionProposals = data?.sessionProposals ?? [];
	const authRequests = data?.authRequests ?? [];
	const sessionRequests = data?.sessionRequests ?? [];
	const activeSessions = data?.activeSessions ?? [];

	useEffect(() => {
		if (!w) {
			return;
		}
	}, [w]);

	useEffect(() => {
		if (w) {
			return;
		}

		const core = new Core({
			projectId: "4fda584de3c28e97dfa5847023e337c8",
			relayUrl,
			logger: "info",
			storage: new Storage(
				"WALLET_CONNECT_V2_INDEXED_DB_WARDEN_INTERNAL",
			),
		});

		WalletKit.init({
			core,
			metadata: {
				name: "Warden Protocol Wallets",
				description: "Warden Protocol WalletConnect",
				url: "https://wardenprotocol.org/",
				icons: ["https://avatars.githubusercontent.com/u/158038121"],
			},
		}).then(async (wallet) => {
			try {
				const clientId =
					await wallet.engine.signClient.core.crypto.getClientId();
				console.log("WalletConnect ClientID: ", clientId);
				localStorage.setItem("WALLETCONNECT_CLIENT_ID", clientId);
				setData({ w: wallet });
			} catch (error) {
				console.error(
					"Failed to set WalletConnect clientId in localStorage: ",
					error,
				);
			}
		});

		return () => {
			// setData(null);
		};
	}, []);

	const updateState = useCallback(() => {
		if (!w) {
			return;
		}
		setData({
			activeSessions: [
				...(Object.values(
					w.getActiveSessions(),
				) as any as SessionTypes.Struct[]),
			],
			authRequests: [
				...(w.getPendingAuthRequests() as any as AuthEngineTypes.PendingRequest[]),
			],
			sessionProposals: [
				...(w.getPendingSessionProposals() as any as ProposalTypes.Struct[]),
			],
			sessionRequests: [...w.getPendingSessionRequests()],
		});
	}, [w]);

	const expireProposal = async (event: Web3WalletTypes.ProposalExpire) => {
		await w!.rejectSession({
			id: event.id,
			reason: getSdkError("USER_REJECTED"),
		});

		updateState();
	};

	const expireRequest = async (
		event: Web3WalletTypes.SessionRequestExpire,
	) => {
		const request = w!
			.getPendingSessionRequests()
			.find((r) => r.id === event.id);

		if (!request) {
			return;
		}

		await w!.respondSessionRequest({
			topic: request.topic,
			response: {
				jsonrpc: "2.0",
				id: event.id,
				error: getSdkError("USER_REJECTED"),
			},
		});

		updateState();
	};

	useEffect(() => {
		if (!w) {
			return;
		}

		w.on("session_proposal", updateState);
		w.on("proposal_expire", expireProposal);
		w.on("auth_request", updateState);
		w.on("session_request", updateState);
		w.on("session_request_expire", expireRequest);
		w.on("session_delete", updateState);

		// keepalive for sessions
		const keepalive: number = setInterval(() => {
			const sessions = w.getActiveSessions();

			for (const session of Object.values(sessions)) {
				w.core.pairing.ping({ topic: session.pairingTopic });
			}
		}, 15000) as any;

		// TODO
		const onSessionPing = (data: any) => console.log("ping", data);
		w.engine.signClient.events.on("session_ping", onSessionPing);

		return () => {
			clearInterval(keepalive);

			w.off("session_proposal", updateState);
			w.off("proposal_expire", expireProposal);
			w.off("auth_request", updateState);
			w.off("session_request", updateState);
			w.off("session_request_expire", expireRequest);
			w.off("session_delete", updateState);
			w.engine.signClient.events.off("session_ping", onSessionPing);
		};
	}, [w]);

	useEffect(() => {
		const t: number = setInterval(() => {
			if (!w) {
				return;
			}
			updateState();
		}, 1000) as any;

		return () => {
			clearInterval(t);
		};
	}, [updateState]);

	return {
		w,
		activeSessions,
		sessionProposals,
		authRequests,
		sessionRequests,
	};
}
