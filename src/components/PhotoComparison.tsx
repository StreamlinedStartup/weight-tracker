import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Maximize, Minimize } from "lucide-react";
import type { GalleryPhoto } from "@/types";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface PhotoComparisonProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  photos: GalleryPhoto[];
}

export const PhotoComparison = ({ isOpen, onOpenChange, photos }: PhotoComparisonProps) => {
  const [isFullSize, setIsFullSize] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) {
        setIsFullSize(false); // Reset state on close
      }
    }}>
      <DialogContent className="max-w-7xl h-[90vh] flex flex-col">
        <DialogHeader className="flex-row justify-between items-start pr-6">
          <div>
            <DialogTitle>Compare Progress Photos</DialogTitle>
            <DialogDescription>
              View your selected photos side-by-side to track your progress.
            </DialogDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsFullSize(!isFullSize)}>
            {isFullSize ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            <span className="sr-only">{isFullSize ? "Fit to screen" : "View full size"}</span>
          </Button>
        </DialogHeader>
        <ScrollArea className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1 pr-6">
            {photos.map((photo) => (
              <div key={photo.name} className="flex flex-col items-center space-y-2">
                <img
                  src={photo.url}
                  alt={`Progress photo from ${format(new Date(photo.date), "PPP")}`}
                  className={cn(
                    "rounded-lg object-contain w-full",
                    !isFullSize && "max-h-[65vh]"
                  )}
                />
                <div className="text-center">
                  <p className="font-semibold">{format(new Date(photo.date), "PPP")}</p>
                  <p className="text-sm text-muted-foreground">{photo.weight} kg/lbs</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};