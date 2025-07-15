import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { GalleryPhoto } from "@/types";
import { format } from "date-fns";

interface PhotoComparisonProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  photos: GalleryPhoto[];
}

export const PhotoComparison = ({ isOpen, onOpenChange, photos }: PhotoComparisonProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>Compare Progress Photos</DialogTitle>
          <DialogDescription>
            View your selected photos side-by-side to track your progress.
          </DialogDescription>
        </DialogHeader>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${photos.length > 2 ? '4' : '2'} gap-4 py-4`}>
          {photos.map((photo) => (
            <div key={photo.name} className="flex flex-col items-center">
              <img
                src={photo.url}
                alt={`Progress photo from ${format(new Date(photo.date), "PPP")}`}
                className="rounded-lg object-contain max-h-[60vh]"
              />
              <div className="mt-2 text-center">
                <p className="font-semibold">{format(new Date(photo.date), "PPP")}</p>
                <p className="text-sm text-muted-foreground">{photo.weight} kg/lbs</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};