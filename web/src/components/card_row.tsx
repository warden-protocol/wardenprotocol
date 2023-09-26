export default function CardRow({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-row gap-4 items-center">
      <span className="font-bold text-sm w-[100px]">{label}</span>
      <span>{children}</span>
    </div>
  );
}

