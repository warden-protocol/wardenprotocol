import { useAddressContext } from "@/def-hooks/useAddressContext";

function Home() {
  const { address } = useAddressContext();
  if (!address) {
    return (
      <div className="px-6 mt-10">
        <h1 className="text-lg font-bold">Dashboard</h1>
        <p></p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
      <div className="flex items-center justify-between pb-4 space-y-2 border-b">
        <div>
          <h2 className="text-4xl">Dashboard</h2>
          <p className="text-muted-foreground">
            
          </p>
        </div>
        <div>
          {/* <Button onClick={() => {
            broadcast([
              new MsgNewSpace({ creator: addr }),
            ]);
          }}>
            Create
          </Button> */}
        </div>
      </div>
      {/* <Spaces owner={addr} /> */}
    </div>
  )
}

export default Home;
