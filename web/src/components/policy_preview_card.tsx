import { policyById } from "@/client/policy";
import { useQuery } from "@tanstack/react-query";
import { Card, CardDescription, CardHeader } from "./ui/card";
import Policy from "./policy";

export default function PolicyPreviewCard({ id }: { id: string }) {
  const q = useQuery({
    queryKey: ["policy", id],
    queryFn: () => policyById(id),
    refetchInterval: Infinity,
    retry: false,
  });

  if (id === "0") {
    return (
      <Card>
        <CardHeader>
          <CardDescription>Default policy applied</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (q.status === "pending") {
    return (
      <Card>
        <CardHeader>
          <CardDescription>Loading policy #{id}...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (q.status === "error") {
    return (
      <Card>
        <CardHeader>
          <CardDescription>Error loading policy</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!q.data?.policy) {
    return null;
  }

  return (
    <Policy response={q.data.policy} />
  );
}
