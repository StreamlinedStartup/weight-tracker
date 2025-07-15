import type { WeightEntry } from "@/types";
import { differenceInWeeks, format } from "date-fns";

export interface Stats {
  startingWeight: number;
  currentWeight: number;
  totalChange: number;
  highestWeight: number;
  lowestWeight: number;
  averageWeeklyChange: number;
  durationInWeeks: number;
}

export interface DoseAnalysis {
  dose: number;
  startDate: string;
  endDate: string;
  durationInWeeks: number;
  startingWeight: number;
  endingWeight: number;
  totalChange: number;
  averageWeeklyChange: number;
  entryCount: number;
}

export function calculateStats(data: WeightEntry[]): Stats | null {
  if (data.length < 2) {
    return null;
  }

  const sortedData = [...data].sort(
    (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
  );

  const startingWeight = sortedData[0].Weight;
  const currentWeight = sortedData[sortedData.length - 1].Weight;
  const totalChange = currentWeight - startingWeight;

  const weights = sortedData.map((d) => d.Weight);
  const highestWeight = Math.max(...weights);
  const lowestWeight = Math.min(...weights);

  const firstDate = new Date(sortedData[0].Date);
  const lastDate = new Date(sortedData[sortedData.length - 1].Date);
  const durationInWeeks = differenceInWeeks(lastDate, firstDate);

  const averageWeeklyChange =
    durationInWeeks > 0 ? totalChange / durationInWeeks : 0;

  return {
    startingWeight,
    currentWeight,
    totalChange,
    highestWeight,
    lowestWeight,
    averageWeeklyChange,
    durationInWeeks,
  };
}

export function analyzeDoseEffectiveness(data: WeightEntry[]): DoseAnalysis[] {
  if (data.length < 2) {
    return [];
  }

  const sortedData = [...data].sort(
    (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
  );

  const analysis: DoseAnalysis[] = [];
  let currentDoseBlock: WeightEntry[] = [];

  for (let i = 0; i < sortedData.length; i++) {
    const entry = sortedData[i];
    const currentDose = entry["Dose(mg)"];

    if (currentDoseBlock.length === 0) {
      currentDoseBlock.push(entry);
    } else if (currentDose === currentDoseBlock[0]["Dose(mg)"]) {
      currentDoseBlock.push(entry);
    }

    // If the dose changes or it's the last entry, process the block
    if (
      i === sortedData.length - 1 ||
      currentDose !== currentDoseBlock[0]["Dose(mg)"]
    ) {
      // Don't process if the block is for a new dose that just started
      if (currentDoseBlock.length > 1) {
        const firstEntry = currentDoseBlock[0];
        const lastEntry = currentDoseBlock[currentDoseBlock.length - 1];

        const startDate = new Date(firstEntry.Date);
        const endDate = new Date(lastEntry.Date);
        const durationInWeeks = differenceInWeeks(endDate, startDate);
        const totalChange = lastEntry.Weight - firstEntry.Weight;

        analysis.push({
          dose: firstEntry["Dose(mg)"],
          startDate: format(startDate, "PPP"),
          endDate: format(endDate, "PPP"),
          durationInWeeks: durationInWeeks,
          startingWeight: firstEntry.Weight,
          endingWeight: lastEntry.Weight,
          totalChange: totalChange,
          averageWeeklyChange:
            durationInWeeks > 0 ? totalChange / durationInWeeks : totalChange,
          entryCount: currentDoseBlock.length,
        });
      }
      
      // Start a new block with the current entry
      currentDoseBlock = [entry];
    }
  }

  return analysis;
}