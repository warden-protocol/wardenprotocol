import { useQuery } from "@tanstack/react-query"
import { Key, keys } from "../client/treasury"
import { prettyKeyType } from "../utils/formatting"

export default function Keys() {
  const wsQuery = useQuery({ queryKey: ['keys'], queryFn: keys })

  return (
    <div className="p-4 space-y-3">
      <span className="text-gray-800 italic">Key: a key managed by MPC network, belongs to a specific Workspace</span>
      {wsQuery.data?.wallets.map((key) => (
        <Key key={key.id} keyData={key} />
      ))}
    </div>
  )
}

function Key(props: { keyData: Key }) {
  return (
    <div className="border-2 border-blue-700 bg-blue-50 flex flex-col p-4 rounded">
      <span className="font-bold">Key #{props.keyData.id}</span>
      <span>Type: {prettyKeyType(props.keyData.type)}</span>
      <span>Public Key: {props.keyData.public_key}</span>
    </div>
  );
}

