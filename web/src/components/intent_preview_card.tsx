import { intentById } from "@/client/intent";
import { useQuery } from "@tanstack/react-query";
import { Card, CardDescription, CardHeader } from "./ui/card";
import Intent from "./intent";

export default function IntentPreviewCard({ id }: { id: string }) {
  const q = useQuery({
    queryKey: ["intent", id],
    queryFn: () => intentById(id),
    refetchInterval: Infinity,
    retry: false,
  });

  if (id === "0") {
    return (
      <Card>
        <CardHeader>
          <CardDescription>Default intent applied</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (q.status === "pending") {
    return (
      <Card>
        <CardHeader>
          <CardDescription>Loading intent #{id}...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (q.status === "error") {
    return (
      <Card>
        <CardHeader>
          <CardDescription>Error loading intent</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!q.data?.intent) {
    return null;
  }

  return (
    <Intent response={q.data.intent} />
  );
}
