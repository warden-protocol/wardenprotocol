import Policies from "@/components/policies";

function PoliciesPage() {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Policies</h2>
          <p className="text-muted-foreground">
            Discover all the policies that have been created on Fusion Chain.
          </p>
        </div>
      </div>

      <Policies />
    </div>
  );
}

export default PoliciesPage;
