import { useState, useEffect } from 'react';
import CodeBlock from '@theme/CodeBlock';
import Admonition from '@theme/Admonition';

export default function PersistentPeers({ code, chainInfoUrl }: { code: string, chainInfoUrl: string }) {
    const [peers, setPeers] = useState<string[]>(["loading..."]);
    const [error, setError] = useState<Error | undefined>(undefined);

    useEffect(() => {
        const fetchPeers = async () => {
            try {
                const response = await fetch(chainInfoUrl);
                if (!response.ok) {
                    setError(new Error(`Failed to fetch peers from ${chainInfoUrl}`));
                    return;
                }

                const data = await response.json();
                const peers = data.peers.persistent_peers.map((p) => `${p.id}@${p.address}`);
                setPeers(peers);
            } catch (e) {
                setError(e);
            }
        };
        fetchPeers();
    }, []);

    if (error) {
        return (
            <Admonition type="error" title="Error" icon="🚨">
                <div>Error: {error.message}</div>
            </Admonition>
        );
    }

    const txt = code.replace(/{{persistent_peers}}/g, peers.join(','));
    return (
        <div>
            <CodeBlock language="bash">
                {txt}
            </CodeBlock>
        </div>
    );
}

