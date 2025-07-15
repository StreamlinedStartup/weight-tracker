import { EntryForm } from "@/components/EntryForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AddEntry = () => {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Add New Weight Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <EntryForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEntry;