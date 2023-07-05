import { useQuery } from "@tanstack/react-query"
import { workspaces } from "../client/identity"
import Workspace from "./workspace"

export default function Workspaces() {
  const wsQuery = useQuery({ queryKey: ['workspaces'], queryFn: workspaces })

  return (
    <div className="p-4 space-y-3">
      <span className="text-gray-800 italic">Workspace: a group of users managing a group of keys</span>
      {wsQuery.data?.workspaces.map((workspace) => (
        <Workspace key={workspace.id} workspace={workspace} />
      ))}
    </div>
  )
}

