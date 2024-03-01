import LoadingSpinner from "@/components/ui/spinner";
import Check from "@/components/ui/check";

export default function ProgressStep({ loading, done, children }: { loading: boolean, done: boolean, children: React.ReactNode }) {
  return (
    <div className="flex flex-row gap-4 items-center">
      <div className="w-6 h-6 shrink-0">
        {done ? <Check /> : loading ? <LoadingSpinner /> : null }
      </div>
      <div className="flex flex-col">
        {children}
      </div>
    </div>
  );
}
