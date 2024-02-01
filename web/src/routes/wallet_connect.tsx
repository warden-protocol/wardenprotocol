import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Core } from '@walletconnect/core'
import { IWeb3Wallet, Web3Wallet } from '@walletconnect/web3wallet'
import { buildApprovedNamespaces } from '@walletconnect/utils'
import { ProposalTypes, PendingRequestTypes, SessionTypes } from "@walletconnect/types";
import { AuthEngineTypes } from "@walletconnect/auth-client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { keys } from '@/client/treasury';
import { WalletType } from '@/proto/wardenprotocol/treasury/wallet_pb';
import { useKeplrAddress } from '@/keplr';
import { fromHex } from '@cosmjs/encoding';
import Web3 from 'web3';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { spacesByOwner } from '@/client/identity';
import CardRow from '@/components/card_row';
import { ethers } from 'ethers';
import useRequestTransactionSignature from '@/hooks/useRequestTransactionSignature';
import SignTransactionRequestDialog from '@/components/sign-transaction-request-dialog';
import useRequestSignature from '@/hooks/useRequestSignature';
import SignatureRequestDialog from '@/components/signature-request-dialog';
import { MetadataEthereum } from '@/proto/wardenprotocol/treasury/tx_pb';

function useWeb3Wallet(relayUrl: string) {
  const [w, setW] = useState<IWeb3Wallet | null>(null);
  const [sessionProposals, setSessionProposals] = useState<ProposalTypes.Struct[]>([]);
  const [authRequests, setAuthRequests] = useState<AuthEngineTypes.PendingRequest[]>([]);
  const [sessionRequests, setSessionRequests] = useState<PendingRequestTypes.Struct[]>([]);
  const [activeSessions, setActiveSessions] = useState<SessionTypes.Struct[]>([]);

  useEffect(() => {
    if (w) {
      return;
    }

    const core = new Core({
      projectId: "4fda584de3c28e97dfa5847023e337c8",
      relayUrl,
      logger: "debug",
    })

    Web3Wallet.init({
      core,
      metadata: {
        name: 'Warden Protocol wallets',
        description: 'Warden Protocol WalletConnect',
        url: 'https://wardenprotocol.org/',
        icons: ['https://avatars.githubusercontent.com/u/37784886'],
      }
    }).then(async wallet => {
      try {
        const clientId = await wallet.engine.signClient.core.crypto.getClientId();
        console.log('WalletConnect ClientID: ', clientId);
        localStorage.setItem('WALLETCONNECT_CLIENT_ID', clientId);
        setW(wallet);
      } catch (error) {
        console.error('Failed to set WalletConnect clientId in localStorage: ', error)
      }
    });

    return () => {
      setW(null);
    };
  }, []);

  const updateState = useCallback(() => {
    if (!w) {
      return;
    }

    setSessionProposals([...w.getPendingSessionProposals() as any as ProposalTypes.Struct[]]);
    setAuthRequests([...w.getPendingAuthRequests() as any as AuthEngineTypes.PendingRequest[]]);
    setSessionRequests([...w.getPendingSessionRequests()]);
    setActiveSessions([...Object.values(w.getActiveSessions()) as any as SessionTypes.Struct[]]);
  }, [w])

  useEffect(() => {
    if (!w) {
      return;
    }

    w.on('session_proposal', updateState);
    w.on('auth_request', updateState);
    w.on('session_request', updateState);
    w.on('session_delete', updateState);

    // TODOs
    const onSessionPing = (data: any) => console.log('ping', data);
    w.engine.signClient.events.on('session_ping', onSessionPing);

    return () => {
      w.off('session_proposal', updateState);
      w.off('auth_request', updateState);
      w.off('session_request', updateState);
      w.off('session_delete', updateState);
      w.engine.signClient.events.off('session_ping', onSessionPing);
    };
  }, [w]);

  useEffect(() => {
    const t = setInterval(() => {
      if (!w) {
        return;
      }
      updateState();
    }, 1000);

    return () => {
      clearInterval(t);
    }
  });

  return {
    w,
    activeSessions,
    sessionProposals,
    authRequests,
    sessionRequests,
  };
}

const supportedNamespaces = {
  eip155: {
    chains: [
      'eip155:1', // ETH mainnet
      'eip155:5', // ETH Goerli testnet
      'eip155:11155111', // ETH Sepolia testnet
    ],
    methods: [
      'personal_sign',
      'eth_sign',
      'eth_signTransaction',
      'eth_signTypedData',
      'eth_signTypedData_v3',
      'eth_signTypedData_v4',
      'eth_sendRawTransaction',
      'eth_sendTransaction'
    ],
    events: ['accountsChanged', 'chainChanged'],
  },
}

async function fetchEthAddresses(wsAddr: string) {
  const res = await keys({ spaceAddr: wsAddr, walletType: WalletType.ETH });
  return res.keys.map((key) => key.wallets.map(w => w.address));
}

async function findKeyByAddress(wsAddr: string, address: string) {
  const res = await keys({ spaceAddr: wsAddr, walletType: WalletType.ETH });
  return res.keys.find((key) => key.wallets.map(w => w.address.toLowerCase()).includes(address.toLowerCase()));
}

async function approveSession(w: IWeb3Wallet, wsAddr: string, proposal: any) {
  console.log('approving session proposal', proposal)
  const { id, relays } = proposal;

  const ethereumAddresses = await fetchEthAddresses(wsAddr);
  console.log('ethereum addresses', ethereumAddresses)

  const namespaces = buildApprovedNamespaces({
    proposal,
    supportedNamespaces: {
      ...supportedNamespaces,
      eip155: {
        ...supportedNamespaces.eip155,
        accounts: [
          ...ethereumAddresses.map((address) => `eip155:1:${address}`),
          ...ethereumAddresses.map((address) => `eip155:5:${address}`),
          ...ethereumAddresses.map((address) => `eip155:11155111:${address}`),
        ],
      },
    },
  })

  try {
    const session = await w.approveSession({
      id,
      relayProtocol: relays[0].protocol,
      namespaces
    });
    localStorage.setItem(`WALLETCONNECT_SESSION_WS_${session.topic}`, wsAddr);
    console.log('session proposal approved. Session:', session)
  } catch (e) {
    console.error('Failed to approve session', e)
  }
}

const url = "https://sepolia.infura.io/v3/6484e0cc3e0447e386fb42ce19ea7155";

const provider = new ethers.JsonRpcProvider(url);

async function buildEthTransaction({ gas, value, from, to, data }: { gas: string, value: string, from: string, to: string, data: string }) {
  const nonce = await provider.getTransactionCount(from);
  const feeData = await provider.getFeeData();

  const tx = ethers.Transaction.from({
    type: 2,
    chainId: 11155111, // Sepolia chain ID; change if using another network
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    maxFeePerGas: feeData.maxFeePerGas,
    nonce,
    to,
    value,
    gasLimit: gas,
    data,
  });

  return tx;
}

export default function WalletConnectPage() {
  return (
    <div className="flex-1 flex-col space-y-8 p-8 md:flex">
      <WalletConnect />
    </div>
  );
}

function WalletConnect() {
  const addr = useKeplrAddress();
  const { state: reqSignatureState, error: reqSignatureError, requestSignature, reset: resetReqSignature } = useRequestSignature();
  const { state: reqTxSignatureState, error: reqTxSignatureError, requestTransactionSignature, reset: resetReqTxSignature } = useRequestTransactionSignature();
  const { w, sessionProposals, sessionRequests, activeSessions } = useWeb3Wallet('wss://relay.walletconnect.org');
  const [loading, setLoading] = useState(false)
  const [uri, setUri] = useState("");
  const [wsAddr, setWsAddr] = useState("");
  const wsQuery = useQuery({ queryKey: ["spaces", "owner", addr], queryFn: () => spacesByOwner(addr) });

  if (wsQuery.isLoading) {
    return <div>Loading...</div>
  }

  if (wsQuery.isError) {
    return <div>Error: {`${wsQuery.error}`}</div>
  }

  return (
    <>
      <SignatureRequestDialog state={reqSignatureState} error={reqSignatureError} reset={resetReqSignature} />
      <SignTransactionRequestDialog state={reqTxSignatureState} error={reqTxSignatureError} reset={resetReqTxSignature} />

      <Card>
        <CardHeader>
          <CardTitle>WalletConnect</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="w-[400px] flex flex-col gap-4" onSubmit={async (e) => {
            e.preventDefault();
            try {
              setLoading(true);
              await w?.pair({ uri });
              console.log('WalletConnect session paired');
            } catch (error) {
              console.error(error);
            } finally {
              setUri('');
              setLoading(false);
            }
          }}>
            <Input type="text" placeholder="Enter WalletConnect URI" value={uri} onChange={e => setUri(e.target.value)} />
            <Button disabled={loading} type="submit">Connect</Button>
          </form >
        </CardContent>
      </Card>

      {sessionProposals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Incoming session requests</CardTitle>
          </CardHeader>
          <CardContent>
            {sessionProposals.map((s) => (
              <Card key={s.proposer.publicKey}>
                <CardHeader>
                  <div className="flex flex-row gap-2">
                    <img className="w-8 h-8" src={s.proposer.metadata.icons[0]} />
                    <CardTitle>{s.proposer.metadata.name}</CardTitle>
                  </div>
                  <span>{s.proposer.metadata.description}</span>
                </CardHeader>

                <CardContent>
                  <Select onValueChange={(value) => { setWsAddr(value) }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select one space to pair" />
                    </SelectTrigger>
                    <SelectContent>
                      {wsQuery.error ? ("Error loading spaces") : !wsQuery.data ? ("Loading...") : wsQuery.data.spaces.map((w) => (
                        <SelectItem value={w.address} key={w.address}>{w.address}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>

                <CardFooter>
                  <Button disabled={!w || loading} onClick={() => {
                    try {
                      setLoading(true);
                      approveSession(w!, wsAddr, s)
                    } finally {
                      setLoading(false);
                    }
                  }}>
                    {loading ? "Loading..." : "Approve connection"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}

      {sessionRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Incoming sign requests</CardTitle>
          </CardHeader>
          <CardContent>
            {sessionRequests.map((req) => (
              <Card key={req.id}>
                <CardHeader>
                  <CardTitle>
                    Request from {activeSessions.find(s => s.topic === req.topic)?.peer.metadata.name}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <CardRow label="Method">{req.params.request.method}</CardRow>
                  <CardRow label="Params">
                    <span className="font-mono break-all">
                      {JSON.stringify(req.params.request.params)}
                    </span>
                  </CardRow>
                </CardContent>

                <CardFooter>
                  <Button disabled={!w || loading} onClick={async () => {
                    setLoading(true);
                    const topic = req.topic;

                    try {
                      const wsAddr = localStorage.getItem(`WALLETCONNECT_SESSION_WS_${topic}`);

                      if (!wsAddr) {
                        throw new Error(`Unknown space address for session topic: ${topic}`);
                      }

                      let response = null;
                      switch (req.params.request.method) {
                        case 'personal_sign': {
                          // find Warden Protocol key associated with the requested ETH address
                          const address = req.params.request.params[1];
                          const key = await findKeyByAddress(wsAddr, address);
                          if (!key) {
                            console.error('Unknown address', address);
                            return;
                          }

                          // prepare message
                          const msg = fromHex(req.params.request.params[0].slice(2));
                          const text = new TextDecoder().decode(msg);
                          const hash = Web3.utils.keccak256("\x19Ethereum Signed Message:\n" + text.length + text);

                          // send signature request to Warden Protocol and wait response
                          const sig = await requestSignature(key.key!.id, ethers.getBytes(hash));
                          if (!sig) {
                            return;
                          }

                          response = {
                            result: ethers.hexlify(sig),
                            id: req.id,
                            jsonrpc: "2.0",
                          };
                          break;
                        }
                        case 'eth_sendTransaction': {
                          const txParam = req.params.request.params[0];
                          const key = await findKeyByAddress(wsAddr, txParam.from);
                          if (!key) {
                            throw new Error(`Unknown address ${txParam.from}`);
                          }

                          const tx = await buildEthTransaction(txParam);
                          const signature = await requestTransactionSignature(key.key!.id, ethers.getBytes(tx.unsignedSerialized), new MetadataEthereum({
                            chainId: ethers.toBigInt(11155111),
                          }));
                          if (!signature) {
                            return;
                          }

                          // add the signature to the transaction
                          const signedTx = tx.clone()
                          signedTx.signature = ethers.hexlify(signature);

                          // instead of waiting for realyer-eth to pick this
                          // up, we broadcast it directly for a faster user
                          // experience
                          await provider.broadcastTransaction(signedTx.serialized);

                          response = {
                            result: signedTx.hash,
                            id: req.id,
                            jsonrpc: "2.0",
                          };
                          break;
                        }
                        case "eth_signTypedData_v4": {
                          const from = req.params.request.params[0];
                          const key = await findKeyByAddress(wsAddr, from);
                          if (!key) {
                            throw new Error(`Unknown address ${from}`);
                          }
                          const data = JSON.parse(req.params.request.params[1]);

                          // ethers.TypedDataEncoder tries to determine the
                          // primaryType automatically, but it fails because we
                          // have multiple "roots" in the DAG: one is
                          // EIP712Domain, one is specified in
                          // `data.primaryType` (e.g. "PermitSingle" for
                          // Uniswap, "dYdX", ...).
                          // I split the types into two objects and manually
                          // create two different encoders.
                          const typesWithoutDomain = { ...data.types };
                          delete typesWithoutDomain.EIP712Domain;
                          const domainEncoder = new ethers.TypedDataEncoder({ EIP712Domain: data.types.EIP712Domain });
                          const messageEncoder = new ethers.TypedDataEncoder(typesWithoutDomain);

                          // In short, we need to sign:
                          //   sign(keccak256("\x19\x01" ‖ domainSeparator ‖ hashStruct(message)))
                          //
                          // See EIP-712 for the definition of the message to be signed.
                          // https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator
                          const domainSeparator = domainEncoder.hashStruct("EIP712Domain", data.domain);
                          const message = messageEncoder.hashStruct(data.primaryType, data.message);
                          const toSign = ethers.keccak256(ethers.concat([
                            ethers.getBytes("0x1901"),
                            ethers.getBytes(domainSeparator),
                            ethers.getBytes(message),
                          ]));

                          const signature = await requestSignature(key.key!.id, ethers.getBytes(toSign));
                          if (!signature) {
                            return;
                          }

                          response = {
                            result: ethers.hexlify(signature),
                            id: req.id,
                            jsonrpc: "2.0",
                          };
                          break;
                        }
                        default:
                          throw new Error(`Unknown or unsupported method: ${req.params.request.method}`);
                      }

                      await w!.respondSessionRequest({
                        topic,
                        response,
                      });
                    } catch (error) {
                      console.error(error);
                      await w!.respondSessionRequest({
                        topic,
                        response: {
                          jsonrpc: '2.0',
                          id: req.id,
                          error: { code: 1, message: `${error}` },
                        },
                      });
                    } finally {
                      setLoading(false);
                    }
                  }}>
                    {loading ? 'Loading...' : 'Approve'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{activeSessions.length} Active sessions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row flex-wrap gap-4">
          {activeSessions.map((s) => (
            <Card key={s.peer.publicKey} className="grow">
              <CardHeader>
                <div className="flex flex-row gap-2">
                  <img className="w-8 h-8" src={
                    s.peer.metadata.icons[0].startsWith('http') ?
                      s.peer.metadata.icons[0] :
                      `${s.peer.metadata.url}${s.peer.metadata.icons[0]}`
                  } />
                  <CardTitle>{s.peer.metadata.name}</CardTitle>
                </div>
                <span>{s.peer.metadata.description}</span>
              </CardHeader>

              <CardContent>
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-sm">Linked space</span>
                  <span>{localStorage.getItem(`WALLETCONNECT_SESSION_WS_${s.topic}`) || "Unknown (an error occurred)"}</span>
                </div>
              </CardContent>

              <CardFooter>
                <Button disabled={!w} onClick={async () => {
                  await w!.disconnectSession({ topic: s.topic, reason: { code: 1, message: 'user disconnected' } });
                }} variant="destructive">Disconnect</Button>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>

      { /**
      <Card>
        <CardHeader>
          <CardTitle>Auth Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {authRequests.map((req, i) => (
            <div key={i}>
              <pre>{JSON.stringify(req, null, 2)}</pre>
              <Button disabled={!w}>Approve</Button>
            </div>
          ))}
        </CardContent>
      </Card>
      */}

    </>
  )
}
