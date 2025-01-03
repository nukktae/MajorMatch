interface StatCardProps {
  label: string;
  value: string | number;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="p-4 rounded-xl bg-violet-50/50 text-center">
      <p className="text-sm text-slate-600">{label}</p>
      <p className="font-medium text-slate-800">{value}</p>
    </div>
  );
} 