import Explorer from "@/components/explorer";

function ExplorerPage() {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Explorer</h2>
          <p className="text-muted-foreground">
            Informations about the current state of Fusion Chain
          </p>
        </div>
      </div>
      <Explorer />
    </div>
  )
}

export default ExplorerPage;
