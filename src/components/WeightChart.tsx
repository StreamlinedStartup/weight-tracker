import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WeightEntry } from "@/types";
import { format } from "date-fns";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface WeightChartProps {
  data: WeightEntry[];
}

export const WeightChart = ({ data }: WeightChartProps) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
  );

  const chartData = sortedData.map((entry) => ({
    date: format(new Date(entry.Date), "MMM d"),
    Weight: entry.Weight,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weight Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              domain={["dataMin - 2", "dataMax + 2"]}
              allowDecimals={false}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="Weight"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ r: 4, fill: "hsl(var(--primary))" }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};