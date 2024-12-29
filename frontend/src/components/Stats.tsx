interface StatsProps {
  title: string;
  value: string;
  trend: string;
}

export function Stats({ title, value, trend }: StatsProps) {
  return (
    <div className="glass-card p-6">
      <h3 className="text-sm text-slate-600">{title}</h3>
      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-2xl font-semibold">{value}</span>
        <span className="text-xs text-emerald-600">{trend}</span>
      </div>
    </div>
  );
} 