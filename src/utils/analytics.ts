import type { WeightEntry } from "@/types";
import { differenceInWeeks } from "date-fns";

export interface Stats {
  startingWeight: number;
  currentWeight: number;
  totalChange: number;
  highestWeight: number;
  lowestWeight: number;
  averageWeeklyChange: number;
  durationInWeeks: number;
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