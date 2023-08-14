import { Link } from "react-router-dom";
import { Workspace } from "../client/identity";
import Address from "./address";

export default function Workspace({ workspace }: { workspace: Workspace }) {
  return (
    <Link to={`/workspaces/${workspace.address}`}>
      <div className="border-2 border-black flex flex-col p-4 rounded">
        <span className="font-bold">{workspace.address}</span>
        <span>
          Creator: <Address address={workspace.creator} />
        </span>
        <ul className="list-disc list-inside">
          <span>Owners:</span>
          {workspace.owners.map((owner) => (
            <li key={owner}>
              <Address address={owner} />
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
