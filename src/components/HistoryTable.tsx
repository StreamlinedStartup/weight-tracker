import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { WeightEntry } from "@/types";
import { format } from "date-fns";

interface HistoryTableProps {
  data: WeightEntry[];
}

export const HistoryTable = ({ data }: HistoryTableProps) => {
    const sortedData = [...data].sort(
        (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
      );

  return (
    <Card>
      <CardHeader>
        <CardTitle>History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Weight</TableHead>
              <TableHead className="text-right">Week</TableHead>
              <TableHead className="text-right">Dose (mg)</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{format(new Date(entry.Date), "PPP")}</TableCell>
                <TableCell className="text-right">{entry.Weight}</TableCell>
                <TableCell className="text-right">{entry.Week}</TableCell>
                <TableCell className="text-right">{entry["Dose(mg)"]}</TableCell>
                <TableCell>{entry.Notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};