import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { WeightEntry, GalleryPhoto } from "@/types";
import { format } from "date-fns";
import { CheckCircle, XCircle } from "lucide-react";
import { PhotoComparison } from "./PhotoComparison";
import { showError } from "@/utils/toast";

interface PhotoGalleryProps {
  data: WeightEntry[];
}

export const PhotoGallery = ({ data }: PhotoGalleryProps) => {
  const [selectedPhotos, setSelectedPhotos] = useState<GalleryPhoto[]>([]);
  const [isComparisonOpen, setComparisonOpen] = useState(false);

  const allPhotos: GalleryPhoto[] = data
    .flatMap((entry) =>
      (entry.Photos || []).map((photo) => ({
        ...photo,
        date: entry.Date,
        weight: entry.Weight,
      }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleSelectPhoto = (photo: GalleryPhoto) => {
    setSelectedPhotos((prevSelected) => {
      const isSelected = prevSelected.some((p) => p.name === photo.name);
      if (isSelected) {
        return prevSelected.filter((p) => p.name !== photo.name);
      } else {
        if (prevSelected.length >= 4) {
          showError("You can select a maximum of 4 photos to compare.");
          return prevSelected;
        }
        return [...prevSelected, photo];
      }
    });
  };

  if (allPhotos.length === 0) {
    return null;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Photo Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allPhotos.map((photo) => {
              const isSelected = selectedPhotos.some((p) => p.name === photo.name);
              return (
                <div
                  key={photo.name}
                  className="relative group overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => handleSelectPhoto(photo)}
                >
                  <img
                    src={photo.url} // Using full-resolution image
                    alt={`Progress photo from ${format(new Date(photo.date), "PPP")}`}
                    className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p>{format(new Date(photo.date), "MMM d, yyyy")}</p>
                    <p>{photo.weight} kg/lbs</p>
                  </div>
                  {isSelected && (
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-50 flex items-center justify-center">
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {selectedPhotos.length > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-4 p-6 bg-background border rounded-full shadow-lg animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
            {selectedPhotos.length > 1 && (
              <Button size="sm" onClick={() => setComparisonOpen(true)}>
                Compare ({selectedPhotos.length})
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={() => setSelectedPhotos([])}>
              <XCircle className="h-4 w-4 mr-2" />
              Clear Selection
            </Button>
          </div>
        </div>
      )}

      <PhotoComparison
        isOpen={isComparisonOpen}
        onOpenChange={setComparisonOpen}
        photos={selectedPhotos}
      />
    </>
  );
};