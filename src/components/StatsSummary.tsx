import {
  ArrowDown,
  ArrowUp,
  BarChart,
  Calendar,
  ChevronsDown,
  ChevronsUp,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WeightEntry } from "@/types";
import { calculateStats } from "@/utils/analytics";

interface StatsSummaryProps {
  data: WeightEntry[];
}

const StatCard = ({
  title,
  value,
  unit,
  icon: Icon,
}: {
  title: string;
  value: string;
  unit?: string;
  icon: React.ElementType;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {value}
        {unit && <span className="text-xs text-muted-foreground ml-1">{unit}</span>}
      </div>
    </CardContent>
  </Card>
);

export const StatsSummary = ({ data }: StatsSummaryProps) => {
  const stats = calculateStats(data);

  if (!stats) {
    return null;
  }

  const isLoss = stats.totalChange < 0;
  const isWeeklyLoss = stats.averageWeeklyChange < 0;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Progress Summary</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Weight Change"
          value={stats.totalChange.toFixed(1)}
          unit="kg/lbs"
          icon={isLoss ? TrendingDown : TrendingUp}
        />
        <StatCard
          title="Avg. Weekly Change"
          value={stats.averageWeeklyChange.toFixed(2)}
          unit="kg/lbs"
          icon={isWeeklyLoss ? ArrowDown : ArrowUp}
        />
        <StatCard
          title="Highest Weight"
          value={stats.highestWeight.toFixed(1)}
          unit="kg/lbs"
          icon={ChevronsUp}
        />
        <StatCard
          title="Lowest Weight"
          value={stats.lowestWeight.toFixed(1)}
          unit="kg/lbs"
          icon={ChevronsDown}
        />
      </div>
    </div>
  );
};