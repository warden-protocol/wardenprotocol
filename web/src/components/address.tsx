import ehg, { getHash } from 'emoji-hash-gen';

export default function Address(props: { address: string }) {
  return <span className="font-mono">{props.address} ({getHash(props.address, { length: 2, base: ehg.maxBase })})</span>
}

