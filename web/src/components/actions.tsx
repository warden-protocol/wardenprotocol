import { useQuery } from "@tanstack/react-query"
import { Action, Msg, actions } from "../client/identity";
import Address from "./address";

export default function Actions() {
  const wsQuery = useQuery({ queryKey: ['actions'], queryFn: actions })

  return (
    <div className="p-4 space-y-3">
      <span className="text-gray-800 italic">Action: intent started from an user that requires approvals from other users</span>
      {wsQuery.data?.actions.map((action) => (
        <Action key={action.id} action={action} />
      ))}
    </div>
  )
}

function Action(props: { action: Action }) {
  const color = props.action.completed ? "border-blue-700 bg-blue-50" : "border-yellow-700 bg-yellow-50";

  return (
    <div className={`border-2 flex flex-col p-4 rounded ${color}`}>
      <span className="font-bold">Action #{props.action.id} <span className="text-xs font-medium">{props.action.completed ? "completed" : "in progress"}</span></span>
      <ActionIntent msg={props.action.msg} />

      <ul className="list-disc list-inside">
        <span>Approvers:</span>
        {props.action.approvers.map((approver) => (
          <li key={approver}>
            <Address address={approver} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ActionIntent(props: { msg: Msg }) {
  switch (props.msg["@type"]) {
    case "/fusionchain.identity.MsgAddWorkspaceOwner":
      return (
        <div className="flex flex-col">
          <span>Creator: <Address address={props.msg.creator} /></span>
          <span>Intent: add new owner (<Address address={props.msg.new_owner} />)</span>
        </div>
      )
    case "/fusionchain.identity.MsgRemoveWorkspaceOwner":
      return (
        <div className="flex flex-col">
          <span>Creator: <Address address={props.msg.creator} /></span>
          <span>Intent: remove owner (<Address address={props.msg.owner} />)</span>
        </div>
      )
    default:
      return (
        <pre>{JSON.stringify(props.msg, null, 2)}</pre>
      )
    // case "/fusionchain.identity.MsgRemoveWorkspaceOwner":
    //   return (
    //   )
  }
}
