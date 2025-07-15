import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WeightEntry } from "@/types";
import { format } from "date-fns";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DoseWeightChartProps {
  data: WeightEntry[];
}

export const DoseWeightChart = ({ data }: DoseWeightChartProps) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
  );

  const chartData = sortedData.map((entry) => ({
    date: format(new Date(entry.Date), "MMM d"),
    Weight: entry.Weight,
    Dose: entry["Dose(mg)"],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dose vs. Weight</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              yAxisId="left"
              label={{ value: "Weight", angle: -90, position: "insideLeft" }}
              domain={["dataMin - 2", "dataMax + 2"]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: "Dose (mg)", angle: 90, position: "insideRight" }}
            />
            <Tooltip />
            <Legend
              formatter={(value) => (
                <span className="text-muted-foreground">{value}</span>
              )}
            />
            <Bar
              yAxisId="right"
              dataKey="Dose"
              fill="hsl(var(--muted-foreground))"
              fillOpacity={0.4}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Weight"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};