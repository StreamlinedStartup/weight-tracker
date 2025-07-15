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

  // 1. Group entries into consecutive blocks by dose.
  const doseBlocks: WeightEntry[][] = [];
  if (sortedData.length > 0) {
    doseBlocks.push([sortedData[0]]);
    for (let i = 1; i < sortedData.length; i++) {
      const currentEntry = sortedData[i];
      const lastBlock = doseBlocks[doseBlocks.length - 1];
      if (currentEntry["Dose(mg)"] === lastBlock[0]["Dose(mg)"]) {
        lastBlock.push(currentEntry);
      } else {
        doseBlocks.push([currentEntry]);
      }
    }
  }

  // 2. Analyze each block.
  const analysis = doseBlocks
    .filter(block => block.length > 1) // Only analyze periods with more than one data point.
    .map(block => {
      const firstEntry = block[0];
      const lastEntry = block[block.length - 1];
      const entryCount = block.length;

      const totalChange = lastEntry.Weight - firstEntry.Weight;
      
      // The number of intervals is one less than the number of entries.
      const numberOfIntervals = entryCount - 1;
      const averageWeeklyChange = numberOfIntervals > 0 ? totalChange / numberOfIntervals : 0;

      return {
        dose: firstEntry["Dose(mg)"],
        startDate: format(new Date(firstEntry.Date), "PPP"),
        endDate: format(new Date(lastEntry.Date), "PPP"),
        durationInWeeks: entryCount, // As per user feedback, duration in weeks = number of entries.
        startingWeight: firstEntry.Weight,
        endingWeight: lastEntry.Weight,
        totalChange: totalChange,
        averageWeeklyChange: averageWeeklyChange,
        entryCount: entryCount,
      };
    });

  return analysis;
}