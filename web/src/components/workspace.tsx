import { Workspace } from "../client/identity";
import Address from "./address";

export default function Workspace({ workspace }: { workspace: Workspace }) {
  return (
    <div className="border-2 border-pink-700 bg-pink-50 flex flex-col p-4 rounded">
      <span className="font-bold">Workspace #{workspace.id}</span>
      <span>Creator: <Address address={workspace.creator} /></span>
      <ul className="list-disc list-inside">
        <span>Owners:</span>
        {workspace.owners.map((owner) => (
          <li key={owner}>
            <Address address={owner} />
          </li>
        ))}
      </ul>
    </div>
  )
}
