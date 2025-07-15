import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { WeightEntry } from "@/types";
import { analyzeDoseEffectiveness } from "@/utils/analytics";
import { TrendingDown, TrendingUp, Calendar, Hash } from "lucide-react";

interface DoseEfficacyProps {
  data: WeightEntry[];
}

const StatItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
    <div className="flex items-start text-sm">
        <Icon className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground flex-shrink-0" />
        <div>
            <span className="font-medium">{label}:</span>
            <span className="ml-1 text-muted-foreground">{value}</span>
        </div>
    </div>
);

export const DoseEfficacy = ({ data }: DoseEfficacyProps) => {
  const doseAnalyses = analyzeDoseEffectiveness(data);

  if (doseAnalyses.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Dose Efficacy Analysis</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {doseAnalyses.map((analysis) => {
          const isLoss = analysis.averageWeeklyChange < 0;
          return (
            <Card key={analysis.dose}>
              <CardHeader>
                <CardTitle>{analysis.dose} mg Period</CardTitle>
                <CardDescription>{analysis.startDate} - {analysis.endDate}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <StatItem 
                    icon={isLoss ? TrendingDown : TrendingUp}
                    label="Avg. Weekly Change"
                    value={`${analysis.averageWeeklyChange.toFixed(2)} kg/lbs`}
                />
                <StatItem 
                    icon={isLoss ? TrendingDown : TrendingUp}
                    label="Total Change"
                    value={`${analysis.totalChange.toFixed(1)} kg/lbs`}
                />
                <StatItem 
                    icon={Calendar}
                    label="Duration"
                    value={`${analysis.durationInWeeks} weeks`}
                />
                 <StatItem 
                    icon={Hash}
                    label="Data Points"
                    value={`${analysis.entryCount} entries`}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};