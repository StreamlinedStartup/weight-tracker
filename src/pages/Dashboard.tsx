import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
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
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Your Data Will Appear Here</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Once you add some entries, you'll see your progress chart and photo gallery.</p>
        </div>
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Dashboard;