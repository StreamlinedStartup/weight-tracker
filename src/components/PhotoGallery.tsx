import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WeightEntry } from "@/types";
import { format } from "date-fns";

interface PhotoGalleryProps {
  data: WeightEntry[];
}

export const PhotoGallery = ({ data }: PhotoGalleryProps) => {
  const allPhotos = data
    .flatMap((entry) =>
      (entry.Photos || []).map((photo) => ({
        ...photo,
        date: entry.Date,
        weight: entry.Weight,
      }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (allPhotos.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Photo Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allPhotos.map((photo, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg">
              <img
                src={photo.thumbnails.small.url}
                alt={`Progress photo from ${format(new Date(photo.date), "PPP")}`}
                className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p>{format(new Date(photo.date), "MMM d, yyyy")}</p>
                <p>{photo.weight} kg/lbs</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};