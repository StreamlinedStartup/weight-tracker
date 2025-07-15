import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { AlertCircle, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { getEntries } from "@/services/baserow";
import { WeightChart } from "@/components/WeightChart";
import { PhotoGallery } from "@/components/PhotoGallery";
import { HistoryTable } from "@/components/HistoryTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { StatsSummary } from "@/components/StatsSummary";
import { DoseWeightChart } from "@/components/DoseWeightChart";

const DashboardSkeleton = () => (
    <div className="space-y-8">
        <Skeleton className="h-[120px] w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-[400px] w-full" />
        </div>
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
    </div>
);

const Dashboard = () => {
  const { data: entries, isLoading, isError, error } = useQuery({
    queryKey: ["entries"],
    queryFn: getEntries,
  });

  const hasEntries = entries && entries.length > 0;

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              WeightTrack Dashboard
            </h1>
            <Button asChild>
              <Link to="/add">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Entry
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {isLoading && <DashboardSkeleton />}
        {isError && (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Failed to load entries: {error.message}. Please check your Baserow credentials and configuration.
                </AlertDescription>
            </Alert>
        )}
        {!isLoading && !isError && !hasEntries && (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Your Data Will Appear Here</h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Once you add some entries, you'll see your progress chart and photo gallery.</p>
            </div>
        )}
        {!isLoading && !isError && hasEntries && (
            <div className="space-y-8">
                <StatsSummary data={entries} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <WeightChart data={entries} />
                    <DoseWeightChart data={entries} />
                </div>
                <PhotoGallery data={entries} />
                <HistoryTable data={entries} />
            </div>
        )}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Dashboard;