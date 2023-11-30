import Policies from "@/components/policies";
import NewPolicyButton from "@/components/new_policy_button";

function PoliciesPage() {
  // return (
  //   <div className="flex-col flex-1 hidden h-full p-8 space-y-8 md:flex">
  //     <div className="flex items-center justify-between space-y-2">
  //       <div>
  //         <h2 className="text-2xl font-bold tracking-tight">Policies</h2>
  //         <p className="text-muted-foreground">
  //           Discover all the policies that have been created on Fusion Chain.
  //         </p>
  //       </div>
  //     </div>

  //     <Policies />
  //   </div>
  // );
  return (
    <div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
      <div className="flex items-center justify-between pb-4 space-y-2 border-b">
        <div>
          <h2 className="text-4xl">Policies</h2>
          <p className="text-muted-foreground">
            Discover all the policies that have been created on Fusion Chain.
          </p>
        </div>
        <div>
          <NewPolicyButton />
          {/* <Button onClick={() => {
            broadcast([
              new MsgNewWorkspace({ creator: addr }),
            ]);
          }}>
            Create
          </Button> */}
        </div>
      </div>
      <Policies />
    </div>
  )
}

export default PoliciesPage;
